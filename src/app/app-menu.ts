import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/app/home',
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
    children: [
      {
        title: 'Category',
        link: '/app/setting/category',
      },
      {
        title: 'Products',
        link: '/app/setting/product',
      },
      {
        title: 'Sizes',
        link: '/app/setting/size',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Users',
        link: '/app/security/user',
      },
      {
        title: 'Roles',
        link: '/app/security/role',
      }
    ],
  },
  
];
