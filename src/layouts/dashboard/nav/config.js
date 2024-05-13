import WidgetsIcon from '@mui/icons-material/Widgets';
import SvgColor from '../../../components/svg-color';


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/counsellorDB',
    icon: icon('ic_analytics'),
  },

  {
    title: 'Simple Page 1',
    path: '/dashboard/s1',
    icon: <WidgetsIcon />,
  },
];

export default navConfig;
