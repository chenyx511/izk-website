import { trpc } from "@/providers/trpc";
import type { ProductRecord } from "@contracts/product";

export type Product = ProductRecord;

export function useSiteContent() {
  const utils = trpc.useUtils();
  const query = trpc.content.getAll.useQuery();
  const mutation = trpc.content.updateMany.useMutation({
    onSuccess: () => utils.content.getAll.invalidate(),
  });

  return {
    data: query.data ?? {},
    isLoading: query.isLoading,
    updateContent: (updates: Record<string, string>) =>
      mutation.mutateAsync(updates),
    isSaving: mutation.isPending,
  };
}

export function useProducts(forAdmin = false) {
  const utils = trpc.useUtils();
  const publicQuery = trpc.product.list.useQuery(undefined, {
    enabled: !forAdmin,
  });
  const adminQuery = trpc.product.listAll.useQuery(undefined, {
    enabled: forAdmin,
  });
  const query = forAdmin ? adminQuery : publicQuery;

  const createMutation = trpc.product.create.useMutation({
    onSuccess: () => {
      utils.product.list.invalidate();
      utils.product.listAll.invalidate();
    },
  });
  const updateMutation = trpc.product.update.useMutation({
    onSuccess: () => {
      utils.product.list.invalidate();
      utils.product.listAll.invalidate();
    },
  });
  const deleteMutation = trpc.product.delete.useMutation({
    onSuccess: () => {
      utils.product.list.invalidate();
      utils.product.listAll.invalidate();
    },
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    addProduct: (product: Omit<Product, "id">) =>
      createMutation.mutateAsync(product),
    updateProduct: (id: number, updates: Partial<Omit<Product, "id">>) =>
      updateMutation.mutateAsync({ id, data: updates }),
    deleteProduct: (id: number) => deleteMutation.mutateAsync({ id }),
    isSaving:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}

export function useSettings() {
  const utils = trpc.useUtils();
  const query = trpc.settings.getAll.useQuery();
  const mutation = trpc.settings.set.useMutation({
    onSuccess: () => utils.settings.getAll.invalidate(),
  });

  return {
    data: query.data ?? { template: "dark-industrial" },
    isLoading: query.isLoading,
    setSetting: (key: string, value: string) =>
      mutation.mutateAsync({ key, value }),
    isSaving: mutation.isPending,
  };
}

export function getProductName(product: Product, lang: string): string {
  if (lang === "zh" && product.nameZh) return product.nameZh;
  if (lang === "en" && product.nameEn) return product.nameEn;
  if (lang === "ko" && product.nameKo) return product.nameKo;
  return product.nameJa;
}

export function getProductShortDesc(product: Product, lang: string): string {
  if (lang === "zh" && product.shortDescZh) return product.shortDescZh;
  if (lang === "en" && product.shortDescEn) return product.shortDescEn;
  if (lang === "ko" && product.shortDescKo) return product.shortDescKo;
  return product.shortDesc;
}
