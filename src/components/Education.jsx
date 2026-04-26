import { MagicCard } from './ui/MagicCard'
import { BlurFade } from './ui/BlurFade'
import { useTheme } from '../ThemeContext'
import { education } from '../data/resume'
import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi'
import { PiGraduationCapBold } from 'react-icons/pi'
import { SectionHeading } from './SectionHeading'

function GpaBar({ gpa, theme }) {
  const val = parseFloat(gpa) / 4.0
  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs font-mono mb-1" style={{ color: theme.textMuted }}>
        <span className="flex items-center gap-1"><FiAward size={11} /> GPA</span>
        <span style={{ color: theme.accent1 }}>{gpa}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${theme.accent1}20` }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${val * 100}%`,
            background: `linear-gradient(to right, ${theme.accent1}, ${theme.accent2})`,
          }}
        />
      </div>
    </div>
  )
}

export function Education() {
  const { theme } = useTheme()

  return (
    <section
      id="education"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: theme.bg }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${theme.accent2}50, transparent)` }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading icon={<PiGraduationCapBold />} title="Education" />

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {education.map((edu, i) => (
            <BlurFade key={i} delay={i * 0.15}>
              <MagicCard className="p-6 h-full flex flex-col">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: `${theme.accent2}18`,
                    border: `1px solid ${theme.accent2}30`,
                    color: theme.accent2,
                  }}
                >
                  <PiGraduationCapBold size={24} />
                </div>

                <h3 className="text-lg font-bold mb-1" style={{ color: theme.text }}>
                  {edu.school}
                </h3>
                <p className="font-semibold text-sm mb-1" style={{ color: theme.accent1 }}>
                  {edu.degree}
                </p>
                {edu.extra && (
                  <p className="text-xs font-mono mb-1" style={{ color: theme.accent2 }}>
                    {edu.extra}
                  </p>
                )}
                <p className="text-xs font-mono flex items-center gap-1.5 mt-1" style={{ color: theme.textMuted }}>
                  <FiCalendar size={11} /> {edu.period}
                </p>
                <p className="text-xs font-mono flex items-center gap-1.5 mt-1" style={{ color: theme.textMuted }}>
                  <FiMapPin size={11} /> {edu.location}
                </p>
                <GpaBar gpa={edu.gpa} theme={theme} />
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
