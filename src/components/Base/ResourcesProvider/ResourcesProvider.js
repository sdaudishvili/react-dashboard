import { AboutEdit } from '@/views/About';
import { AgenciesList, AgencyCreate } from '@/views/Agencies';
import { ContactEdit } from '@/views/Contact';
import { MerchCreate, MerchList } from '@/views/Merch';
import { PageCreate, PagesList } from '@/views/Pages';
import { ServiceCreate, ServicesList } from '@/views/Services';
import { SocialEdit } from '@/views/Social';
import { StudioCreate, StudiosList } from '@/views/Studios';
import { Resource } from '..';

const resources = [
  {
    name: 'Pages',
    resource: 'pages',
    list: PagesList,
    create: PageCreate,
    edit: PageCreate
  },
  {
    name: 'Agencies',
    resource: 'agencies',
    list: AgenciesList,
    create: AgencyCreate,
    edit: AgencyCreate
  },
  {
    name: 'Services',
    resource: 'services',
    list: ServicesList,
    create: ServiceCreate,
    edit: ServiceCreate
  },
  {
    name: 'Studios',
    resource: 'studios',
    list: StudiosList,
    create: StudioCreate,
    edit: StudioCreate
  },
  {
    name: 'Merch',
    resource: 'merches',
    list: MerchList,
    create: MerchCreate,
    edit: MerchCreate,
    hasApiPagination: false
  },
  {
    name: 'About',
    resource: 'about',
    staticEdit: AboutEdit
  },
  {
    name: 'Contact',
    resource: 'contact',
    staticEdit: ContactEdit
  },
  {
    name: 'Social',
    resource: 'social',
    staticEdit: SocialEdit
  }
  // {
  //   name: 'Open Graph',
  //   resource: 'opengraph',
  //   staticEdit: OpenGraphEdit
  // }
];

const ResourcesProvider = () => {
  return resources && resources.map((resource) => <Resource key={resource.name} {...resource} />);
};

export default ResourcesProvider;
