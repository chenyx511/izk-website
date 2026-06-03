import { useMemo } from "react";
import { trpc } from "@/providers/trpc";

export function useAuth() {
  const utils = trpc.useUtils();
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: true,
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      void utils.auth.me.reset();
    },
  });
  const updateAccountMutation = trpc.auth.updateAccount.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });
  const createAdminMutation = trpc.auth.createAdmin.useMutation({
    onSuccess: () => utils.auth.listAdmins.invalidate(),
  });

  const user = meQuery.data;

  return useMemo(
    () => ({
      user: user ? { username: user.username, role: "admin" as const } : null,
      isAuthenticated: !!user,
      isLoading: meQuery.isLoading,
      isAdmin: !!user,
      login: (username: string, password: string) =>
        loginMutation.mutateAsync({ username, password }),
      logout: () => logoutMutation.mutateAsync(),
      updateCredentials: (
        currentPassword: string,
        newUsername: string,
        newPassword: string,
      ) =>
        updateAccountMutation.mutateAsync({
          currentPassword,
          newUsername: newUsername || undefined,
          newPassword: newPassword || undefined,
        }),
      createAdmin: (username: string, password: string) =>
        createAdminMutation.mutateAsync({ username, password }),
      loginError: loginMutation.error?.message,
      isLoggingIn: loginMutation.isPending,
    }),
    [
      user,
      meQuery.isLoading,
      loginMutation,
      logoutMutation,
      updateAccountMutation,
      createAdminMutation,
    ],
  );
}

export function useAdminList() {
  const { isAuthenticated } = useAuth();
  return trpc.auth.listAdmins.useQuery(undefined, {
    enabled: isAuthenticated,
  });
}
