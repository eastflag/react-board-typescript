import {User} from "./User";

export interface Comment {
  id?: number;
  content: string;
  created?: string;
  updated?: string;
  board_id?: number;
  user?: User;
}
