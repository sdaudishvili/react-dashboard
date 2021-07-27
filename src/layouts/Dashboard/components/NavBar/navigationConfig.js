import MenuBookIcon from '@material-ui/icons/MenuBook';
import InfoIcon from '@material-ui/icons/Info';

export default [
  {
    title: 'Management',
    pages: [
      {
        title: 'Pages',
        href: '/pages',
        icon: MenuBookIcon,
        children: [
          {
            title: 'Browse Pages',
            href: '/pages'
          },
          {
            title: 'Add Page',
            href: '/pages/create'
          }
        ]
      },
      {
        title: 'Agencies',
        href: '/agencies',
        icon: MenuBookIcon,
        children: [
          {
            title: 'Browse Agencies',
            href: '/agencies'
          },
          {
            title: 'Add Agency',
            href: '/agencies/create'
          }
        ]
      },
      {
        title: 'Studios',
        href: '/studios',
        icon: MenuBookIcon,
        children: [
          {
            title: 'Browse Studios',
            href: '/studios'
          },
          {
            title: 'Add Studio',
            href: '/studios/create'
          }
        ]
      },
      {
        title: 'About',
        href: '/about',
        icon: InfoIcon
      }
    ]
  }
];
