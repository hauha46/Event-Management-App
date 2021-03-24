import { User } from './user.model';

export interface UserPagination{
    users: User[];
    maxPage: number;
    totalUsers: number;
}