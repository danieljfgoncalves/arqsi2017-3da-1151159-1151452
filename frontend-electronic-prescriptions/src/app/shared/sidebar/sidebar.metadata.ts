import { Role } from "app/model/role";

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    allowedRoles: Role[];
    submenu : RouteInfo[];
}
