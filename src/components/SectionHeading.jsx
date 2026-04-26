import { BlurFade } from './ui/BlurFade'
import { useTheme } from '../ThemeContext'

export function SectionHeading({ icon, title }) {
  const { theme } = useTheme()

  return (
    <BlurFade>
      <div className="flex flex-col items-start gap-2">
        <div
          className="flex items-center gap-2.5 text-sm font-mono uppercase tracking-widest"
          style={{ color: theme.accent1 }}
        >
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: theme.text }}
        >
          {title}
        </h2>
        <div
          className="h-1 w-16 rounded-full mt-1"
          style={{
            background: `linear-gradient(to right, ${theme.accent1}, ${theme.accent2})`,
          }}
        />
      </div>
    </BlurFade>
  )
}
