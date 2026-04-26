import { Dock } from './ui/Dock'
import { useTheme } from '../ThemeContext'
import {
  FiHome, FiBriefcase, FiCode, FiSun, FiMoon,
} from 'react-icons/fi'
import { PiGraduationCapBold } from 'react-icons/pi'
import { TbAtom } from 'react-icons/tb'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const { isDark, setIsDark } = useTheme()

  const items = [
    { icon: FiHome, label: 'Home', onClick: () => scrollTo('home') },
    { icon: FiBriefcase, label: 'Experience', onClick: () => scrollTo('experience') },
    { icon: PiGraduationCapBold, label: 'Education', onClick: () => scrollTo('education') },
    { icon: FiCode, label: 'Projects', onClick: () => scrollTo('projects') },
    { icon: TbAtom, label: 'Publications', onClick: () => scrollTo('publications') },
    {
      icon: isDark ? FiSun : FiMoon,
      label: isDark ? 'Light Mode' : 'Dark Mode',
      onClick: () => setIsDark((d) => !d),
    },
  ]

  return <Dock items={items} />
}
