import {User} from "./User";

export interface Board {
  id?: number;
  title: string;
  content: string;
  created?: string;
  updated?: string;
  user?: User;
}
