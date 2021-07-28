import MenuBookIcon from '@material-ui/icons/MenuBook';
import InfoIcon from '@material-ui/icons/Info';
import ContactsIcon from '@material-ui/icons/Contacts';
import EditIcon from '@material-ui/icons/Edit';
import MovieIcon from '@material-ui/icons/Movie';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import ShareIcon from '@material-ui/icons/Share';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export default [
  {
    title: 'Management',
    pages: [
      {
        title: 'Open Graph',
        href: '/opengraph',
        icon: ShareIcon
      },
      {
        title: 'Contact',
        href: '/contact',
        icon: ContactsIcon
      },
      {
        title: 'Social',
        href: '/social',
        icon: InfoIcon
      }
    ]
  },

  {
    title: 'Pages',
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
        icon: BrandingWatermarkIcon,
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
        icon: MovieIcon,
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
        icon: EditIcon
      }
    ]
  },
  {
    title: 'User',
    pages: [
      {
        title: 'Account',
        href: '/account',
        icon: SupervisorAccountIcon
      }
    ]
  }
];
