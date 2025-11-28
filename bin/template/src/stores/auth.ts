import serverApi from '@/utils/api/server-api';
import { defineStore } from 'pinia';
import Cookies from 'universal-cookie';

interface ILoginAuthData {
  tabel: string;
  password: string;
  saveSession?: boolean;
}

interface IMessageType {
  status: number;
  message: string;
}

interface ISessionType {
  id: number;
  tabel: string;
  login: string;
}

const cookies = new Cookies(null, { path: '/', sameSite: 'lax' });

export const useAuthStore = defineStore('auth', {
  state: () => ({
    _auth: localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : null,
    _roleAccesses: null,
    _sessionHistory: null
  }),
  getters: {
    getAuth: state => state._auth,
    getRoleAccesses: state => state._roleAccesses,
    hasRoleAccess:
      state =>
      (relativeItem, acessType, childItem?, isChild = false) => {
        return isChild
          ? state._roleAccesses?.accesses[relativeItem]?.childrens[childItem][
              acessType
            ]
          : state._roleAccesses?.accesses[relativeItem][acessType];
      },
    getSessionHistory: state => state._sessionHistory
  },
  actions: {
    /**
     * @param data
     * @returns
     */
    async loginAuth(data: ILoginAuthData): Promise<IMessageType> {
      const res = await serverApi.post(`/auth/login`, data, {
        parsed: true
      });

      if (!res)
        return {
          status: 401,
          message: 'Пользователь не авторизирован'
        };

      const auth = res;

      if (auth && !auth.id) {
        return {
          status: res.status,
          message: auth.message
        };
      }

      if (auth.id) {
        this.updateAuth({ auth }, data.saveSession);
        return {
          status: 201,
          message: 'Пользователь авторизован'
        };
      }
      return {
        status: res.status,
        message: 'Произошла ошибка при авторизации'
      };
    },
    async loadRoleAccesses(): Promise<void> {
      if (this._auth && this._auth.role && this._auth.role.id) {
        const result = await serverApi.get(`/roles/one/${this._auth.role.id}`, {
          parsed: true
        });

        this.setRoleAccesses(result);
      }
    },
    updateAuth({ auth }, saveSession = false): void {
      if (!auth?.role || !auth?.role?.accesses) this.unAuth();
      this.setRoleAccesses({
        ...auth.role,
        accesses: auth.role.accesses
      });

      this._auth = auth;
      localStorage.setItem('auth', JSON.stringify(auth));
      if (saveSession) {
        this._sessionHistory = {
          id: auth.id,
          tabel: auth.tabel,
          login: auth.login,
          image: auth.image
        };
        cookies.set(`userSession-${auth.id}`, this._sessionHistory, {
          maxAge: 86400
        });
      }
    },
    unAuth(): void {
      this._auth = null;
      this._roleAccesses = null;
      localStorage.removeItem('auth');
    },
    setRoleAccesses(role): void {
      this._roleAccesses = role;
    },
    removeSession(id: number): void {
      this._sessionHistory = null;
      cookies.remove(`userSession-${id}`);
    },
    getSessions(): ISessionType[] {
      const allCookies = cookies.getAll();
      if (!allCookies) return [];

      const objectCookies: Record<string, ISessionType> = allCookies;

      if (!objectCookies) return [];

      const regex = /^userSession-\d+$/;
      const validSessions: ISessionType[] = [];

      for (const [key, value] of Object.entries(objectCookies)) {
        if (regex.test(key)) {
          if (
            value &&
            typeof value.id === 'number' &&
            typeof value.login === 'string' &&
            typeof value.tabel === 'string'
          ) {
            validSessions.push(value as ISessionType);
          }
        }
      }
      return validSessions;
    },
    getSession(id: number): void {
      if (cookies.get(`userSession-${id}`))
        this._sessionHistory = cookies.get(`userSession-${id}`);
    }
  }
});
