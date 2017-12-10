import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    // { // FIXME: Remove
    //     path: '/content-layout/login', title: 'Login', icon: 'ft-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    {
        path: '/main/dashboard', title: 'Dashboard', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/main/presentations', title: 'Presentations', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Receipts', icon: 'ft-clipboard', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/main/receipts-consult', title: 'Consult', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: 'javascript:;', title: 'Create', icon: 'ft-file-plus', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'javascript:;', title: 'Edit', icon: 'ft-edit', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'javascript:;', title: 'Fill', icon: 'ft-check-square', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },
    {
        path: '', title: 'Medicines', icon: 'fa fa-medkit', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: 'javascript:;', title: 'Posologies', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    }
];
