import { IRole } from '@/stores/interfaces/roles/interface';
import { ModelDocuments, RequisiteUserZodType } from '@pksep/zod-shared';

export interface IUser {
  id: number;
  login: string;
  tabel: string;
  initial: string;
  role?: IRole;
  image?: string;
  ban: boolean;
  session_id?: number;
}
export type TCroppedUser = Pick<IUser, 'id' | 'tabel' | 'login' | 'initial'>;

export interface IFullUser extends IUser {
  remote_work: boolean;
  dateWork: string | null;
  dateUnWork: string | null;
  birthday: string | null;
  haracteristic: string;
  primetch: string;
  requisites: RequisiteUserZodType[];
  banReason: string | null;
  last_online?: string;
  rolesId: number;
  subdivision: string;
  createdAt: string;
  updatedAt: string;
}
export interface IUserData extends IFullUser {
  documents: ModelDocuments[];
}
