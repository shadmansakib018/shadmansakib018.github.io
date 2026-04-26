import { useTheme } from '../ThemeContext'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { personal } from '../data/resume'

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className="py-12 px-6 border-t text-center"
      style={{ background: theme.bgSecondary, borderColor: theme.border, paddingBottom: '7rem' }}
    >
      <blockquote className="mb-4">
        <p
          className="text-base italic max-w-md mx-auto leading-relaxed"
          style={{ color: theme.text }}
        >
          "The secret of getting ahead is getting started."
        </p>
        <cite
          className="text-xs font-mono mt-2 block"
          style={{ color: theme.textMuted }}
        >
          — Mark Twain
        </cite>
      </blockquote>

      <div className="flex items-center justify-center gap-4 mt-6">
        {[
          { icon: FiGithub, href: personal.github },
          { icon: FiLinkedin, href: personal.linkedin },
          { icon: FiMail, href: `mailto:${personal.email}` },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: theme.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent1)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.textMuted)}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      <p className="text-xs mt-5" style={{ color: theme.textMuted }}>
        © {new Date().getFullYear()} {personal.name}
      </p>
    </footer>
  )
}
