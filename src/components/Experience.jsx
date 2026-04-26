import { MagicCard } from './ui/MagicCard'
import { BlurFade } from './ui/BlurFade'
import { useTheme } from '../ThemeContext'
import { experience } from '../data/resume'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'
import { SectionHeading } from './SectionHeading'

function Tag({ text, theme }) {
  return (
    <span
      className="text-xs font-mono px-2.5 py-1 rounded-lg"
      style={{
        background: `${theme.accent1}18`,
        color: theme.accent1,
        border: `1px solid ${theme.accent1}30`,
      }}
    >
      {text}
    </span>
  )
}

export function Experience() {
  const { theme } = useTheme()

  return (
    <section
      id="experience"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: theme.bgSecondary }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${theme.accent1}50, transparent)` }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading icon={<FiBriefcase />} title="Work Experience" />

        <div className="relative mt-14">
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${theme.accent1}70, transparent)` }}
          />

          <div className="flex flex-col gap-10">
            {experience.map((job, i) => (
              <BlurFade key={i} delay={i * 0.15}>
                <div className="flex gap-8 items-start">
                  <div className="hidden md:flex flex-col items-center mt-2 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: theme.accent1,
                        boxShadow: `0 0 0 3px ${theme.bgSecondary}, 0 0 0 5px ${theme.accent1}60`,
                      }}
                    />
                  </div>

                  <MagicCard className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: theme.text }}>
                          {job.role}
                        </h3>
                        <p className="font-semibold mt-0.5" style={{ color: theme.accent1 }}>
                          {job.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 text-xs font-mono" style={{ color: theme.textMuted }}>
                        <span className="flex items-center gap-1"><FiCalendar size={11} /> {job.period}</span>
                        <span className="flex items-center gap-1"><FiMapPin size={11} /> {job.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-5">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                          <span style={{ color: theme.accent1, marginTop: 2 }}>▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((t) => <Tag key={t} text={t} theme={theme} />)}
                    </div>
                  </MagicCard>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
