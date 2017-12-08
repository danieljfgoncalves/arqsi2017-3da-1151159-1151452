import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/full-layout', title: 'Dashboard', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    // { // FIXME: Remove
    //     path: '/content-layout', title: 'Content Layout', icon: 'ft-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    {
        path: '', title: 'Receipts', icon: 'ft-clipboard', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: 'javascript:;', title: 'Consult', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
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
    },
    //{ // FIXME: Remove after main structure is done.
    //    path: '/changelog', title: 'ChangeLog', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    //}
    // FIZME: Remove Link example
    //, { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
];
