import Cookies from "../../node_modules/@types/js-cookie";
import { useRouter } from "next/navigation";

export const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 });
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const getToken = () => {
  return Cookies.get("token");
};

export const useAuth = () => {
  const router = useRouter();

  const isAuthenticated = !!getToken();

  const login = (token: string) => {
    setToken(token);
    router.push("/todos");
  };

  const logout = () => {
    removeToken();
    router.push("/");
  };

  return { isAuthenticated, login, logout };
};
