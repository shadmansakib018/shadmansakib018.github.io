import { BlurFade } from './ui/BlurFade'
import { MagicCard } from './ui/MagicCard'
import { useTheme } from '../ThemeContext'
import { publications } from '../data/resume'
import { TbAtom, TbAtom2 } from 'react-icons/tb'
import { SectionHeading } from './SectionHeading'
import { GiDna1 } from 'react-icons/gi'

const badgeColors = {
  IEEE: { bg: '#00629B', text: '#fff' },
  Springer: { bg: '#E3001B', text: '#fff' },
}

function SectionArt({ theme }) {
  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
      style={{ opacity: 0.04 }}
    >
      <TbAtom style={{ width: 380, height: 380, color: theme.accent1 }} />
    </div>
  )
}

export function Publications() {
  const { theme } = useTheme()

  return (
    <section
      id="publications"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: theme.bg }}
    >
      <SectionArt theme={theme} />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${theme.accent2}50, transparent)` }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading icon={<TbAtom />} title="Research Publications" />

        <div className="flex flex-col gap-5 mt-14">
          {publications.map((pub, i) => {
            const badge = badgeColors[pub.badge] ?? { bg: theme.accent1, text: theme.bg }
            return (
              <BlurFade key={i} delay={i * 0.12}>
                <MagicCard className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono"
                      style={{
                        background: `${theme.accent1}15`,
                        color: theme.accent1,
                        border: `1px solid ${theme.accent1}25`,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: badge.bg, color: badge.text }}
                        >
                          {pub.badge}
                        </span>
                        <span className="text-xs font-mono" style={{ color: theme.textMuted }}>
                          {pub.year}
                        </span>
                      </div>
                      <p className="text-base font-semibold leading-snug mb-1" style={{ color: theme.text }}>
                        {pub.title}
                      </p>
                      <p className="text-sm font-mono" style={{ color: theme.accent2 }}>
                        {pub.venue}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            )
          })}
        </div>

        {/* Stats row */}
        <BlurFade delay={0.4}>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { label: 'Publications', value: '3', icon: TbAtom2 },
              { label: 'IEEE Papers', value: '2', icon: TbAtom },
              { label: 'Springer Paper', value: '1', icon: GiDna1 },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="text-center py-6 rounded-2xl relative overflow-hidden"
                style={{ background: theme.card, border: `1px solid ${theme.border}` }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <Icon style={{ width: 80, height: 80, color: theme.accent1 }} />
                </div>
                <p className="text-3xl font-bold font-mono relative z-10" style={{ color: theme.accent1 }}>
                  {value}
                </p>
                <p className="text-xs mt-1 relative z-10" style={{ color: theme.textMuted }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
