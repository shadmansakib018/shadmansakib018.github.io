import { MagicCard } from './ui/MagicCard'
import { BlurFade } from './ui/BlurFade'
import { useTheme } from '../ThemeContext'
import { projects } from '../data/resume'
import { FiCode, FiCpu } from 'react-icons/fi'
import { TbBrain, TbCloud, TbHandClick } from 'react-icons/tb'
import { SectionHeading } from './SectionHeading'

const iconMap = {
  ai: TbBrain,
  gesture: TbHandClick,
  cloud: TbCloud,
}

function Tag({ text, theme }) {
  return (
    <span
      className="text-xs font-mono px-2.5 py-1 rounded-lg"
      style={{
        background: `${theme.accent2}15`,
        color: theme.accent2,
        border: `1px solid ${theme.accent2}28`,
      }}
    >
      {text}
    </span>
  )
}

export function Projects() {
  const { theme } = useTheme()

  return (
    <section
      id="projects"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: theme.bgSecondary }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${theme.accent1}50, transparent)` }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading icon={<FiCode />} title="Projects" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((proj, i) => {
            const Icon = iconMap[proj.icon] ?? FiCpu
            return (
              <BlurFade key={i} delay={i * 0.12}>
                <MagicCard className="p-6 h-full flex flex-col">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
                    style={{
                      background: `${theme.accent1}18`,
                      border: `1px solid ${theme.accent1}30`,
                      color: theme.accent1,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-base font-bold mb-2" style={{ color: theme.text }}>
                    {proj.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textMuted }}>
                    {proj.description}
                  </p>

                  <ul className="flex flex-col gap-1.5 mb-4 flex-1">
                    {proj.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                        <span style={{ color: theme.accent2, marginTop: 2 }}>▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {proj.tags.map((t) => <Tag key={t} text={t} theme={theme} />)}
                  </div>
                </MagicCard>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
