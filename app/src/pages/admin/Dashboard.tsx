import { useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useAuth, useAdminList } from "@/hooks/useAuth";
import { useProducts, useSiteContent, useSettings, type Product } from "@/hooks/useSiteData";
import { uploadImage } from "@/lib/upload";
import { templates, type StyleVariant } from "@/config/templates";
import { motion } from "framer-motion";
import {
  FileText, Package, Palette, Save, Loader2, Check, LogOut, Shield,
  AlertTriangle, Plus, Pencil, Trash2, X, Eye, EyeOff,
  ExternalLink, Search, ArrowLeft, Home, LogIn, UserPlus, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { assetUrl } from "@/lib/asset";

type TabId = "content" | "products" | "templates" | "account";

const emptyProduct: Omit<Product, "id"> = {
  slug: "", nameJa: "", nameEn: "", shortDesc: "", image: "", detailImage: "",
  gallery: [], fullDesc: "", specs: [], features: [], downloads: [], videos: [],
  sortOrder: 0, isActive: "active",
};

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { user, isAuthenticated, isAdmin, isLoading: authLoading, logout, updateCredentials, createAdmin } = useAuth();
  const { data: adminList } = useAdminList();
  const { data: content, updateContent } = useSiteContent();
  const { data: products, addProduct, updateProduct, deleteProduct } = useProducts(true);
  const { data: settings, setSetting } = useSettings();

  const [activeTab, setActiveTab] = useState<TabId>("content");

  // Content edit state
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [contentSaving, setContentSaving] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);

  // Product edit state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Omit<Product, "id">>(emptyProduct);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState<StyleVariant>((settings?.template as StyleVariant) ?? "dark-industrial");
  const [pendingTemplate, setPendingTemplate] = useState<StyleVariant | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Account state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState(user?.username ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [accountSuccess, setAccountSuccess] = useState("");
  const [accountSaving, setAccountSaving] = useState(false);

  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminConfirm, setNewAdminConfirm] = useState("");
  const [newAdminError, setNewAdminError] = useState("");
  const [newAdminSuccess, setNewAdminSuccess] = useState("");
  const [newAdminSaving, setNewAdminSaving] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Show unauthorized page instead of auto-redirect to prevent loop
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
        <motion.div className="text-center space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Shield className="w-16 h-16 mx-auto text-gray-600" />
          <div>
            <h1 className="text-xl font-bold text-white mb-2">{t("login.title")}</h1>
            <p className="text-sm text-gray-500">{t("login.subtitle")}</p>
          </div>
          <Link to="/login" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
            <LogIn className="w-4 h-4" /> {t("login.login")}
          </Link>
        </motion.div>
      </div>
    );
  }

  const filteredProducts = products.filter((p) =>
    p.nameJa.includes(searchQuery) || p.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── Product ───
  const openEdit = (product?: Product) => {
    if (product) {
      setEditForm({ ...product });
      setEditingProduct(product);
    } else {
      setEditForm({ ...emptyProduct, slug: `product-${Date.now()}`, sortOrder: products.length + 1 });
      setEditingProduct(null);
    }
    setShowEditModal(true);
  };

  const handleSaveProduct = async () => {
    if (!editForm.nameJa || !editForm.slug) return;
    setSaveLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, editForm);
      } else {
        await addProduct(editForm);
      }
      setSaved(true);
      setShowEditModal(false);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("保存失败，请重试");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm(t("admin.products.deleteConfirm"))) {
      await deleteProduct(id);
    }
  };

  const addSpec = () => setEditForm((f) => ({ ...f, specs: [...f.specs, { label: "", value: "" }] }));
  const updateSpec = (i: number, field: "label" | "value", val: string) =>
    setEditForm((f) => ({ ...f, specs: f.specs.map((s, j) => j === i ? { ...s, [field]: val } : s) }));
  const removeSpec = (i: number) => setEditForm((f) => ({ ...f, specs: f.specs.filter((_, j) => j !== i) }));

  const addFeature = () => setEditForm((f) => ({ ...f, features: [...f.features, { title: "", desc: "" }] }));
  const updateFeature = (i: number, field: "title" | "desc", val: string) =>
    setEditForm((f) => ({ ...f, features: f.features.map((feat, j) => j === i ? { ...feat, [field]: val } : feat) }));
  const removeFeature = (i: number) => setEditForm((f) => ({ ...f, features: f.features.filter((_, j) => j !== i) }));

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: "image" | "detailImage",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setEditForm((f) => ({ ...f, [field]: url }));
    } catch {
      alert("图片上传失败");
    }
  };

  // ─── Template ───
  const openTemplateConfirm = (id: StyleVariant) => {
    if (id === selectedTemplate) return;
    setPendingTemplate(id);
    setShowConfirm(true);
  };
  const confirmTemplateChange = async () => {
    if (!pendingTemplate) return;
    setSelectedTemplate(pendingTemplate);
    await setSetting("template", pendingTemplate);
    setShowConfirm(false);
    setPendingTemplate(null);
  };

  const handleAccountSave = async () => {
    setAccountError("");
    setAccountSuccess("");
    if (!currentPassword) {
      setAccountError(t("admin.account.errorEmpty"));
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setAccountError(t("admin.account.errorMismatch"));
      return;
    }
    setAccountSaving(true);
    try {
      await updateCredentials(currentPassword, newUsername, newPassword);
      setAccountSuccess(t("admin.account.success"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setAccountError(t("admin.account.errorCurrent"));
    } finally {
      setAccountSaving(false);
    }
  };

  const handleCreateAdmin = async () => {
    setNewAdminError("");
    setNewAdminSuccess("");
    if (!newAdminUsername.trim() || !newAdminPassword) {
      setNewAdminError(t("admin.admins.errorEmpty"));
      return;
    }
    if (newAdminPassword !== newAdminConfirm) {
      setNewAdminError(t("admin.admins.errorMismatch"));
      return;
    }
    setNewAdminSaving(true);
    try {
      await createAdmin(newAdminUsername.trim(), newAdminPassword);
      setNewAdminSuccess(t("admin.admins.success"));
      setNewAdminUsername("");
      setNewAdminPassword("");
      setNewAdminConfirm("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setNewAdminError(
        msg.includes("exists") ? t("admin.admins.errorExists") : t("admin.admins.errorFailed"),
      );
    } finally {
      setNewAdminSaving(false);
    }
  };

  // ─── Content section data ───
  // CMS fields: only non-language config (images, contact info)
  const sectionKeys: Record<string, string[]> = {
    hero: ["hero_bg_image"],
    about: ["about_image"],
    products_sec: [],
    gateway: ["gateway_client_image", "gateway_recruit_image"],
    contact: ["contact_address", "contact_phone", "contact_fax", "contact_email"],
    footer: ["footer_company_name", "footer_company_name_en"],
  };
  const labelMap: Record<string, string> = {
    hero_bg_image: "背景图片URL",
    about_image: "图片URL",
    gateway_client_image: "客户入口图片",
    gateway_recruit_image: "招聘入口图片",
    contact_address: "地址", contact_phone: "电话", contact_fax: "Fax", contact_email: "邮箱",
    footer_company_name: "公司名", footer_company_name_en: "公司英文名",
  };

  const sectionMeta: Record<string, { title: string; desc: string; icon: typeof FileText; keys: string[] }> = {
    hero: { title: t("admin.content.sections.hero.title"), desc: t("admin.content.sections.hero.desc"), icon: FileText, keys: sectionKeys.hero },
    about: { title: t("admin.content.sections.about.title"), desc: t("admin.content.sections.about.desc"), icon: FileText, keys: sectionKeys.about },
    products_sec: { title: t("admin.content.sections.products.title"), desc: t("admin.content.sections.products.desc"), icon: Package, keys: sectionKeys.products_sec },
    gateway: { title: t("admin.content.sections.gateway.title"), desc: t("admin.content.sections.gateway.desc"), icon: FileText, keys: sectionKeys.gateway },
    contact: { title: t("admin.content.sections.contact.title"), desc: t("admin.content.sections.contact.desc"), icon: FileText, keys: sectionKeys.contact },
    footer: { title: t("admin.content.sections.footer.title"), desc: t("admin.content.sections.footer.desc"), icon: FileText, keys: sectionKeys.footer },
  };

  const openContentEdit = (section: string) => {
    setEditingSection(section);
    const currentEdits: Record<string, string> = {};
    sectionKeys[section]?.forEach((key) => {
      if (content[key] !== undefined) currentEdits[key] = content[key];
    });
    setEdits(currentEdits);
    setShowContentModal(true);
  };

  const handleSaveContentFromModal = async () => {
    if (Object.keys(edits).length === 0) return;
    setContentSaving(true);
    try {
      await updateContent(edits);
      setContentSaved(true);
      setEdits({});
      setShowContentModal(false);
      setEditingSection(null);
      setTimeout(() => setContentSaved(false), 2000);
    } catch {
      alert("内容保存失败");
    } finally {
      setContentSaving(false);
    }
  };

  const handleContentImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setEdits((prev) => ({ ...prev, [key]: url }));
    } catch {
      alert("图片上传失败");
    }
  };

  const confirmTpl = pendingTemplate ? templates[pendingTemplate] : null;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={assetUrl("/images/logo.png")} alt="IZK" className="h-8 w-auto rounded-sm" />
            <div><h1 className="text-sm font-bold">{t("admin.cms")}</h1><p className="text-[10px] text-gray-500">{t("admin.system")}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" />首页
            </Link>
            <LanguageSwitcher variant="admin" />
            <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400 flex items-center gap-1">
              <Shield className="w-3 h-3" />{user?.username ?? "Admin"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={logout} className="text-gray-400 hover:text-white"><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
          <TabsList className="bg-white/5 border border-white/10 mb-8 flex flex-wrap h-auto">
            <TabsTrigger value="content" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />内容管理
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />产品管理 {products.length > 0 && <span className="ml-1 text-[10px] opacity-60">({products.length})</span>}
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Palette className="w-4 h-4 mr-2" />模板选择
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />账号设置
            </TabsTrigger>
          </TabsList>

          {/* ─── Content Management Tab ─── */}
          <TabsContent value="content">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">页面内容{t("nav.admin")}</h2>
                  <p className="text-xs text-gray-500 mt-1">点击编辑按钮修改各区块内容，支持图片上传</p>
                </div>
                {Object.keys(edits).length > 0 && (
                  <Badge className="bg-yellow-600/80 text-white">有未保存的修改</Badge>
                )}
              </div>

              {contentSaved && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" />内容已保存
                </div>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(sectionMeta).map(([key, meta]) => {
                  const Icon = meta.icon;
                  const hasImages = meta.keys.some((k) => k.includes("_image") || k.includes("_bg"));
                  return (
                    <Card key={key} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(59,130,246,0.1)" }}>
                              <Icon className="w-5 h-5" style={{ color: "#3B82F6" }} />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm">{meta.title}</h3>
                              <p className="text-xs text-gray-500">{meta.keys.length} 个字段</p>
                            </div>
                          </div>
                          {hasImages && <Badge variant="outline" className="text-[10px] border-white/10 text-gray-400">含图片</Badge>}
                        </div>
                        <p className="text-xs text-gray-400 mb-4 line-clamp-2">{meta.desc}</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={() => openContentEdit(key)} className="bg-blue-600 hover:bg-blue-700 text-xs h-8">
                            <Pencil className="w-3.5 h-3.5 mr-1" />编辑内容
                          </Button>
                          <Link to="/" target="_blank" className="text-gray-400 hover:text-white h-8 w-8 flex items-center justify-center">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* ─── Products Tab ─── */}
          <TabsContent value="products">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold">产品{t("nav.admin")}</h2>
                  <Button size="sm" onClick={() => openEdit()} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-1" />新增产品
                  </Button>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input placeholder={t("admin.products.search")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 h-9 text-sm" />
                </div>
              </div>

              {saved && <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded text-sm flex items-center gap-2"><Check className="w-4 h-4" />保存成功</div>}

              <div className="grid gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-4 flex items-start gap-4">
                      <img src={product.image} alt={product.nameJa} className="w-24 h-24 object-contain bg-white/5 rounded shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-base">{product.nameJa}</h3>
                          <span className="text-[10px] font-mono text-gray-500">{product.nameEn}</span>
                          <Badge variant={product.isActive === "active" ? "default" : "secondary"} className="text-[10px]">{product.isActive === "active" ? t("admin.products.active") : t("admin.products.inactive")}</Badge>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">{product.shortDesc}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>规格: {product.specs.length}项</span><span className="mx-1">·</span>
                          <span>特徴: {product.features.length}项</span><span className="mx-1">·</span>
                          <span>资料: {product.downloads.length}个</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(product)} className="text-gray-400 hover:text-white h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button>
                        <Link to={`/product/${product.slug}`} target="_blank" className="text-gray-400 hover:text-white h-8 w-8 flex items-center justify-center"><ExternalLink className="w-4 h-4" /></Link>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)} className="text-gray-400 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-16 text-gray-500"><Package className="w-12 h-12 mx-auto mb-4 opacity-30" /><p>没有找到产品</p></div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ─── Templates Tab ─── */}
          <TabsContent value="templates">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{t("admin.templates.title")}</h2>
                <p className="text-xs text-gray-500">点击模板预览，确认后切换</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(templates).map((tpl) => (
                  <Card key={tpl.id}
                    className={`cursor-pointer transition-all duration-300 overflow-hidden ${selectedTemplate === tpl.id ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0A0A0F]" : "hover:ring-1 hover:ring-white/20"}`}
                    onClick={() => openTemplateConfirm(tpl.id as StyleVariant)}>
                    <div className="h-32 relative" style={{ backgroundColor: tpl.colors.bg }}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                        <div className="w-full h-3 rounded-full" style={{ backgroundColor: tpl.colors.navBg, border: `1px solid ${tpl.colors.border}` }} />
                        <div className="w-full flex-1 rounded flex items-center justify-center gap-2" style={{ backgroundColor: tpl.colors.bgSecondary }}>
                          <div className="w-8 h-8 rounded" style={{ backgroundColor: tpl.colors.primary }} />
                          <div className="space-y-1"><div className="w-16 h-2 rounded" style={{ backgroundColor: tpl.colors.text }} /><div className="w-12 h-1.5 rounded" style={{ backgroundColor: tpl.colors.textMuted }} /></div>
                        </div>
                        <div className="w-full h-6 rounded" style={{ backgroundColor: tpl.colors.primary }} />
                      </div>
                      {selectedTemplate === tpl.id && <div className="absolute top-2 right-2"><Badge className="bg-blue-600 text-white text-[10px]">当前使用</Badge></div>}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-sm">{tpl.name}</h3>
                      <p className="text-xs text-gray-500">{tpl.nameEn}</p>
                      <p className="text-xs text-gray-400 mt-1">{tpl.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ─── Account Tab ─── */}
          <TabsContent value="account">
            <div className="max-w-lg space-y-6">
              <h2 className="text-xl font-bold">{t("admin.account.title")}</h2>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    {t("admin.account.changeLogin")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">{t("admin.account.newUsername")}</label>
                    <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder={user?.username ?? "admin"} className="bg-white/5 border-white/10 text-white h-10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">{t("admin.account.currentPassword")} <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <Input type={showCurrentPw ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-white/5 border-white/10 text-white h-10 pr-10" />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" onClick={() => setShowCurrentPw(!showCurrentPw)}>{showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">{t("admin.account.newPassword")}</label>
                    <div className="relative">
                      <Input type={showNewPw ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-white/5 border-white/10 text-white h-10 pr-10" />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" onClick={() => setShowNewPw(!showNewPw)}>{showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">{t("admin.account.confirmPassword")}</label>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white/5 border-white/10 text-white h-10" />
                  </div>
                  {accountError && <p className="text-sm text-red-400">{accountError}</p>}
                  {accountSuccess && <p className="text-sm text-green-400">{accountSuccess}</p>}
                  <Button onClick={handleAccountSave} disabled={accountSaving} className="w-full bg-blue-600 hover:bg-blue-700">
                    {accountSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {accountSaving ? t("admin.account.saving") : t("admin.account.save")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-blue-400" />
                    {t("admin.admins.createTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">{t("admin.admins.username")}</label>
                    <Input value={newAdminUsername} onChange={(e) => setNewAdminUsername(e.target.value)} className="bg-white/5 border-white/10 text-white h-10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">{t("admin.admins.password")}</label>
                    <Input type="password" value={newAdminPassword} onChange={(e) => setNewAdminPassword(e.target.value)} className="bg-white/5 border-white/10 text-white h-10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">{t("admin.admins.confirmPassword")}</label>
                    <Input type="password" value={newAdminConfirm} onChange={(e) => setNewAdminConfirm(e.target.value)} className="bg-white/5 border-white/10 text-white h-10" />
                  </div>
                  {newAdminError && <p className="text-sm text-red-400">{newAdminError}</p>}
                  {newAdminSuccess && <p className="text-sm text-green-400">{newAdminSuccess}</p>}
                  <Button onClick={handleCreateAdmin} disabled={newAdminSaving} className="w-full bg-blue-600 hover:bg-blue-700">
                    {newAdminSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
                    {t("admin.admins.createBtn")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    {t("admin.admins.listTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(adminList ?? []).map((a) => (
                      <li key={a.id} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                        <span className="text-white font-medium">{a.username}</span>
                        {a.username === user?.username && (
                          <Badge variant="outline" className="text-[10px] border-blue-500/50 text-blue-400">{t("admin.admins.current")}</Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── Product Edit Modal ─── */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div className="relative min-h-screen md:min-h-0 md:absolute md:inset-4 md:overflow-y-auto bg-[#141419] border border-white/10 rounded-xl">
            <div className="sticky top-0 z-10 bg-[#141419] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-lg font-bold">{editingProduct ? `编辑: ${editingProduct.nameJa}` : t("admin.products.add")}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></Button>
            </div>
            <div className="p-6 space-y-6 max-w-3xl">
              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm text-gray-400">产品名称（日文）*</label><Input value={editForm.nameJa} onChange={(e) => setEditForm((f) => ({ ...f, nameJa: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2"><label className="text-sm text-gray-400">产品名称（英文）*</label><Input value={editForm.nameEn} onChange={(e) => setEditForm((f) => ({ ...f, nameEn: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2"><label className="text-sm text-gray-400">URL标识（slug）*</label><Input value={editForm.slug} onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2"><label className="text-sm text-gray-400">排序</label><Input type="number" value={editForm.sortOrder} onChange={(e) => setEditForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))} className="bg-white/5 border-white/10" /></div>
              </div>

              {/* Images */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2"><ArrowLeft className="w-4 h-4" />图片</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">列表图</label>
                    {editForm.image && <img src={editForm.image} alt="" className="w-full h-24 object-contain bg-white/5 rounded" />}
                    <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "image")} className="text-xs bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">详情页主图</label>
                    {editForm.detailImage && <img src={editForm.detailImage} alt="" className="w-full h-24 object-contain bg-white/5 rounded" />}
                    <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "detailImage")} className="text-xs bg-white/5 border-white/10" />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">描述</h4>
                <div className="space-y-2"><label className="text-xs text-gray-500">简短描述（列表页）</label><Textarea value={editForm.shortDesc} onChange={(e) => setEditForm((f) => ({ ...f, shortDesc: e.target.value }))} rows={2} className="bg-white/5 border-white/10 text-sm resize-none" /></div>
                <div className="space-y-2"><label className="text-xs text-gray-500">详细描述（支持 **粗体** 和分段）</label><Textarea value={editForm.fullDesc} onChange={(e) => setEditForm((f) => ({ ...f, fullDesc: e.target.value }))} rows={8} className="bg-white/5 border-white/10 text-sm resize-none font-mono" /></div>
              </div>

              {/* Specs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">技术规格</h4>
                  <Button variant="outline" size="sm" onClick={addSpec} className="border-white/20 text-xs h-7"><Plus className="w-3 h-3 mr-1" />添加</Button>
                </div>
                {editForm.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input placeholder={t("admin.products.form.specLabel")} value={spec.label} onChange={(e) => updateSpec(i, "label", e.target.value)} className="bg-white/5 border-white/10 text-sm flex-1" />
                    <Input placeholder={t("admin.products.form.specValue")} value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)} className="bg-white/5 border-white/10 text-sm flex-1" />
                    <Button variant="ghost" size="sm" onClick={() => removeSpec(i)} className="text-gray-500 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                ))}
                {editForm.specs.length === 0 && <p className="text-xs text-gray-500">{t("admin.products.form.noSpecs")}</p>}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">产品特点</h4>
                  <Button variant="outline" size="sm" onClick={addFeature} className="border-white/20 text-xs h-7"><Plus className="w-3 h-3 mr-1" />添加</Button>
                </div>
                {editForm.features.map((feat, i) => (
                  <div key={i} className="space-y-2 p-3 bg-white/5 rounded border border-white/5">
                    <div className="flex items-center gap-2">
                      <Input placeholder={t("admin.products.form.featTitle")} value={feat.title} onChange={(e) => updateFeature(i, "title", e.target.value)} className="bg-white/5 border-white/10 text-sm flex-1" />
                      <Button variant="ghost" size="sm" onClick={() => removeFeature(i)} className="text-gray-500 hover:text-red-400 h-8 w-8 p-0"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                    <Textarea placeholder={t("admin.products.form.featDesc")} value={feat.desc} onChange={(e) => updateFeature(i, "desc", e.target.value)} rows={2} className="bg-white/5 border-white/10 text-sm resize-none" />
                  </div>
                ))}
                {editForm.features.length === 0 && <p className="text-xs text-gray-500">{t("admin.products.form.noFeatures")}</p>}
              </div>

              {/* Status */}
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-400">状态</label>
                <div className="flex gap-2">
                  <button onClick={() => setEditForm((f) => ({ ...f, isActive: "active" }))}
                    className={`px-3 py-1 text-xs rounded ${editForm.isActive === "active" ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 border border-white/10"}`}>显示中</button>
                  <button onClick={() => setEditForm((f) => ({ ...f, isActive: "inactive" }))}
                    className={`px-3 py-1 text-xs rounded ${editForm.isActive === "inactive" ? "bg-gray-600 text-white" : "bg-white/5 text-gray-400 border border-white/10"}`}>已隐藏</button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button onClick={() => setShowEditModal(false)} variant="outline" className="flex-1 border-white/20">取消</Button>
                <Button onClick={handleSaveProduct} disabled={saveLoading || !editForm.nameJa || !editForm.slug} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {saveLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {editingProduct ? t("admin.content.save") : t("admin.products.form.create")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Content Edit Modal ─── */}
      {showContentModal && editingSection && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContentModal(false)} />
          <div className="relative min-h-screen md:min-h-0 md:absolute md:inset-4 md:overflow-y-auto bg-[#141419] border border-white/10 rounded-xl">
            <div className="sticky top-0 z-10 bg-[#141419] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-lg font-bold">编辑: {sectionMeta[editingSection]?.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowContentModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></Button>
            </div>
            <div className="p-6 space-y-5 max-w-3xl">
              {sectionKeys[editingSection]?.map((key) => {
                const value = edits[key] ?? content[key] ?? "";
                const isImage = key.includes("_image") || key.includes("_bg");
                const hasChanges = edits[key] !== undefined;
                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2 flex-wrap">
                      <span className="font-medium" style={{ color: "#C0C0C8" }}>{labelMap[key] ?? key}</span>
                      <span className="text-[10px] text-gray-600 font-mono">{key}</span>
                      {hasChanges && <Badge className="text-[9px] bg-yellow-600/80">已修改</Badge>}
                    </label>
                    {isImage ? (
                      <div className="space-y-2">
                        {value && <img src={value} alt="" className="w-full max-h-48 object-contain bg-white/5 rounded" />}
                        <div className="flex items-center gap-2">
                          <Input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, key)}
                            className="text-xs bg-white/5 border-white/10 flex-1" />
                          <Input value={value} onChange={(e) => setEdits((prev) => ({ ...prev, [key]: e.target.value }))}
                            className="bg-white/5 border-white/10 text-sm flex-1" placeholder="或输入图片URL" />
                        </div>
                      </div>
                    ) : value.length > 80 ? (
                      <Textarea value={value}
                        onChange={(e) => setEdits((prev) => ({ ...prev, [key]: e.target.value }))}
                        rows={4}
                        className="bg-white/5 border-white/10 text-sm resize-none focus:border-blue-500"
                      />
                    ) : (
                      <Input value={value}
                        onChange={(e) => setEdits((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="bg-white/5 border-white/10 text-sm h-10 focus:border-blue-500"
                      />
                    )}
                  </div>
                );
              })}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button onClick={() => setShowContentModal(false)} variant="outline" className="flex-1 border-white/20">取消</Button>
                <Button onClick={handleSaveContentFromModal} disabled={contentSaving || Object.keys(edits).length === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {contentSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {contentSaving ? t("admin.content.saving") : t("admin.content.save")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Template Confirm Dialog ─── */}
      {showConfirm && confirmTpl && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <motion.div className="relative bg-[#141419] border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-yellow-500" /></div>
              <h3 className="text-lg font-bold">确认切换模板？</h3>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg mb-4" style={{ backgroundColor: confirmTpl.colors.bg, border: `1px solid ${confirmTpl.colors.border}` }}>
              <div className="w-12 h-12 rounded" style={{ backgroundColor: confirmTpl.colors.primary }} />
              <div><p className="font-bold text-sm">{confirmTpl.name}</p><p className="text-xs text-gray-400">{confirmTpl.nameEn}</p></div>
            </div>
            <p className="text-sm text-gray-400 mb-6">切换后前台页面将立即应用新的布局和风格。此操作可随时撤销。</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1 border-white/20">取消</Button>
              <Button onClick={confirmTemplateChange} className="flex-1 bg-blue-600 hover:bg-blue-700">确认切换</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
