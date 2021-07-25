import WidgetsIcon from '@material-ui/icons/Widgets';

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import DescriptionIcon from '@material-ui/icons/Description';

export default [
  {
    title: 'Management',
    pages: [
      {
        title: 'Categories',
        href: '/categories',
        icon: WidgetsIcon,
        children: [
          {
            title: 'Browse Categories',
            href: '/categories'
          },
          {
            title: 'Add Category',
            href: '/categories/create'
          }
        ]
      },
      {
        title: 'Gifts',
        href: '/gifts',
        icon: CardGiftcardIcon,
        children: [
          {
            title: 'Browse Gifts',
            href: '/gifts'
          },
          {
            title: 'Add Gift',
            href: '/gifts/create'
          }
        ]
      },
      {
        title: 'Footer file',
        href: '/footer-file',
        icon: DescriptionIcon
      }
    ]
  }
];
