import DataIcon from '@/assets/data-icon.svg';
import MonitorIcon from '@/assets/monitor-icon.svg';
import SettingsIcon from '@/assets/settings-icon.svg';

interface SidebarProps {
  onNewClick?: () => void;
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: string;
}

function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm transition-colors"
      >
        <img src={icon} alt="" className="w-5 h-5" />
        <span>{label}</span>
      </a>
    </li>
  );
}

const sidebarLinks = [
  {
    href: '#',
    label: 'Data Name',
    icon: DataIcon,
  },
  {
    href: '#',
    label: 'Monitoring',
    icon: MonitorIcon,
  },
  {
    href: '#',
    label: 'Settings',
    icon: SettingsIcon,
  },
];

export function Sidebar({ onNewClick }: SidebarProps) {
  return (
    <aside className="w-[240px] h-full flex flex-col">
      <div className="flex items-center gap-2 p-4">
        <div className="w-9 h-9 bg-violet-300 rounded"></div>
        <span className="text-sm font-semibold text-gray-900 leading-5 align-middle">AirOps</span>
      </div>
      <div className="p-3">
        <button
          onClick={onNewClick}
          className="w-full h-8 gap-1.5 py-1.5 pr-[10px] pl-3 rounded-md border border-gray-300 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors flex items-center justify-center"
        >
          New  +
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.label} {...link} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

