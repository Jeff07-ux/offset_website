"""Generates index.html. Mobile-first; `desk:` (>=1100px) = the 1672x941 screenshot comp scaled with the viewport.
Every px value on a `desk:` utility is converted to rem (1rem = 16 comp-px; root = 100vw*16/1672 on desktop).
Run: python tools/gen-index.py && npm run build:css
"""
import re


def rem(m):
    v = float(m.group(1)) / 16
    return '[' + ('%.6f' % v).rstrip('0').rstrip('.') + 'rem]'


def D(s):
    """Prefix each utility with desk: and convert px -> rem (tokens with max( keep their px floor)."""
    out = []
    for t in s.split():
        if 'max(' not in t:
            t = re.sub(r'\[(-?[\d.]+)px\]', rem, t)
        out.append('desk:' + t)
    return ' '.join(out)


def mid(y):
    """Comp y (px) -> a top offset relative to the vertical centre of the section (comp centre = 470.5)."""
    d = (y - 470.5) / 16
    return 'top-[calc(50%%_%s_%srem)]' % ('+' if d >= 0 else '-', ('%.6f' % abs(d)).rstrip('0').rstrip('.'))


def midx(x):
    """Comp x (px) -> a left offset relative to the horizontal centre of the section (comp centre = 836)."""
    d = (x - 836) / 16
    return 'left-[calc(50%%_%s_%srem)]' % ('+' if d >= 0 else '-', ('%.6f' % abs(d)).rstrip('0').rstrip('.'))


def c(*parts):
    return ' '.join(p for p in parts if p)


HEAD = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OFFSET</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&family=Jost:wght@300;400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="dist/output.css">
</head>
<body class="m-0 bg-white font-['Hanken_Grotesk',sans-serif] antialiased">
'''

ARROW = '<svg class="%s" viewBox="0 0 16 9" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M0 4.5H15M10.5 0.5l4.5 4-4.5 4"/></svg>'


def arrow(left):
    return ARROW % c('h-[9px] w-[16px] shrink-0', D('absolute left-[%spx] top-[25px]' % left))


def word(left, top, ls, text):
    return '<span class="%s">%s</span>' % (D('absolute left-[%spx] top-[%spx] tracking-[%spx]' % (left, top, ls)), text)


def nav_link(href, left, label):
    cls = c('block py-1 text-[15px] leading-[20px] tracking-[0.12em] text-[#152328]',
            D('absolute top-[48px] py-0 text-[max(11px,0.9375rem)] font-normal leading-[20px] tracking-[0.175em]'), 'desk:' + midx(left))
    return '<a href="%s" class="%s">%s</a>' % (href, cls, label)


def micro():
    return 'desk:text-[max(10.5px,0.78125rem)]'


BODY = '''
  <!-- SECTION: hero  (reference: refs/sheet-1.png, 1672x941). Desktop >=1100px = the comp scaled with the viewport; below = stacked layout. -->
  <!-- Background photo derived from the reference with UI erased (tools/make-hero-bg.mjs). Replace assets/hero-bg.png with the original photo/video when available. -->
  <section id="hero" class="%(section)s">
    <img src="assets/hero-bg.png" alt="" class="absolute inset-0 -z-20 size-full object-cover object-[64%%_center]">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,28,0)_30%%,rgba(8,18,28,.6)_100%%)] desk:hidden"></div>

    <div class="%(wrap)s">
      <header class="%(header)s">
        <input id="menu" type="checkbox" class="peer sr-only" aria-label="Toggle menu">
        <a href="#hero" class="%(logo)s">OFFSET</a>
        <label for="menu" class="%(burger)s" role="button" aria-label="Menu">
          <span class="%(b1)s"></span>
          <span class="%(b2)s"></span>
          <span class="%(b3)s"></span>
        </label>
        <nav aria-label="Main" class="%(nav)s">
          %(navlinks)s
        </nav>
      </header>

      <p class="%(rtag)s">SPACES<br>PEOPLE<br>POSSIBILITIES</p>
      <span class="%(rline)s"></span>

      <div class="%(content)s">
        <p class="%(ltag)s">VISUAL &amp; DIGITAL STUDIO<br>FOR REAL ESTATE</p>

        <h1 class="%(h1)s">
          %(h1words)s
        </h1>

        <p class="%(sub)s">
          %(subwords)s
        </p>

        <div class="%(btns)s">
          <a href="#work" class="%(btn1)s">
            <span class="%(btn1t)s">VIEW OUR WORK</span>
            %(arrow1)s
          </a>
          <a href="#contact" class="%(btn2)s">
            <span class="%(btn2t)s">START A PROJECT</span>
            %(arrow2)s
          </a>
        </div>

        <p class="%(trusted)s"><span class="%(tr1)s">TRUSTED BY PROPERTY OWNERS,</span> <span class="%(tr2)s">REALTORS AND HOSPITALITY BRANDS.</span></p>
      </div>

      <div class="%(pager)s" aria-hidden="true">
        <div class="%(pl1)s"></div>
        <p class="%(p01)s">01</p>
        <div class="%(pl2)s"></div>
        <p class="%(p03)s">03</p>
      </div>

      <div class="%(video)s">
        <svg class="%(play)s" viewBox="0 0 18 20" fill="currentColor" aria-hidden="true"><path d="M0 0L18 10 0 20Z"/></svg>
        <p class="%(time)s">0:00 / 0:30</p>
        <div class="%(track)s"><div class="h-full w-[6.86%%] bg-white"></div></div>
        <svg class="%(mute)s" viewBox="0 0 26 22" fill="currentColor" aria-hidden="true"><path d="M0 7h5l8-6v20l-8-6H0Z"/><path d="M18 8l6 6M24 8l-6 6" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>
        <svg class="%(full)s" viewBox="0 0 19 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M0 5.5V0h5.5M13.5 0H19v5.5M19 12.5V18h-5.5M5.5 18H0v-5.5"/></svg>
      </div>
    </div>
  </section>

</body>
</html>
'''

SEP = '\n          '
v = dict(
    section=c('relative isolate bg-[#386f96] text-white', 'desk:h-dvh desk:w-full'),
    wrap=c('relative flex min-h-[max(100dvh,620px)] flex-col px-5 pb-6 pt-5 sm:px-10 short:min-h-dvh short:pb-3 short:pt-3', 'desk:contents'),
    header=c('relative z-10 flex items-center justify-between', 'desk:contents'),
    logo=c("font-['Jost',sans-serif] text-[26px] font-normal leading-none tracking-[0.3em] text-[#181c1c]",
           D('absolute left-[53px] top-[29px] text-[40px] leading-[60px] tracking-[0.335em]')),
    burger=c('relative block h-[22px] w-[34px] shrink-0 cursor-pointer peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#181c1c]',
             D('absolute right-[55px] top-[47px]')),
    b1=c('absolute left-0 top-[2px] h-[2px] w-[33px] bg-[#1a1e20]', D('top-[2px] w-[33px] h-[2px]')),
    b2=c('absolute left-0 top-[10px] h-[2px] w-[33px] bg-[#1a1e20]', D('top-[10px] w-[33px] h-[2px]')),
    b3=c('absolute left-0 top-[19px] h-[2px] w-[33px] bg-[#1a1e20]', D('top-[19px] w-[33px] h-[2px]')),
    nav='absolute inset-x-0 top-full mt-3 hidden flex-col z-20 rounded-[4px] bg-white px-5 py-3 shadow-lg peer-checked:flex desk:peer-checked:contents desk:contents',
    navlinks=SEP.join([nav_link('#work', 575, 'WORK'), nav_link('#services', 697, 'SERVICES'),
                       nav_link('#about', 854, 'ABOUT'), nav_link('#contact', 988, 'CONTACT')]),
    rtag=c('hidden m-0 font-normal text-[#5a5e62]',
           D('block absolute right-[80.9px] top-[98px] leading-[21.5px] tracking-[0.315em]'), micro()),
    rline=c('hidden', D('block absolute right-[54px] top-[103px] h-[52px] w-[2px] bg-[#7b8489]')),
    content=c('mt-auto flex flex-col pt-16 short:pt-2', 'desk:contents'),
    ltag=c('short:hidden m-0 text-[11px] font-normal leading-[1.9] tracking-[0.3em] text-white/85',
           D('absolute left-[66px] leading-[21.5px] tracking-[0.36em]'), 'desk:' + mid(205), 'desk:text-[#384753]', micro()),
    h1=c("m-0 mt-4 font-['Hanken_Grotesk',sans-serif] text-[min(10vw,88px)] short:text-[min(8vw,13dvh)] font-light leading-[0.98] tracking-[-0.02em] text-white",
         D('absolute left-[0px] mt-0 h-[194px] w-[800px] text-[107.1px] leading-[97px]'), 'desk:' + mid(308)),
    h1words=SEP.join([word(65, 0, -2.44, 'Real'), word(286, 0, -3.26, 'estate,'), '<br class="desk:hidden">',
                      word(66, 97, -2.5, 'seen'), word(305, 97, -4.1, 'differently.')]),
    sub=c("m-0 mt-5 short:mt-2 max-w-[30ch] short:max-w-none font-['Hanken_Grotesk',sans-serif] text-[clamp(19px,4.8vw,30px)] font-light leading-[1.35] text-white",
          D('absolute left-[0px] mt-0 h-[40px] w-[800px] max-w-none text-[30px] leading-[40px]'), 'desk:' + mid(522)),
    subwords=SEP.join([word(65, 0, -0.44, 'Digital'), word(157, 0, 0.6, 'presence'), word(294, 0, -1.59, 'for'),
                       word(339, 0, 0.07, 'properties'), word(489, 0, -0.6, 'worth'), word(574, 0, 0.7, 'noticing.')]),
    btns=c('mt-8 short:mt-3 flex flex-wrap gap-3', 'desk:contents'),
    btn1=c('relative flex h-[52px] min-w-[200px] flex-1 items-center justify-between gap-4 rounded-[4px] bg-white px-5 text-[#111] sm:flex-none sm:px-6',
           D('absolute left-[66px] h-[57px] w-[236px] min-w-0 flex-none justify-start px-0'), 'desk:' + mid(600)),
    btn1t=c('text-[13px] font-medium leading-[20px] tracking-[0.14em]', D('absolute left-[26px] text-[max(11px,0.875rem)]')),
    arrow1=arrow(193),
    btn2=c('relative flex h-[52px] min-w-[200px] flex-1 items-center justify-between gap-4 border border-white/80 px-5 text-white sm:flex-none sm:px-6',
           D('absolute left-[326px] h-[57px] w-[235px] min-w-0 flex-none justify-start px-0'), 'desk:' + mid(600)),
    btn2t=c('text-[13px] font-medium leading-[20px] tracking-[0.115em]', D('absolute left-[24px] text-[max(11px,0.875rem)]')),
    arrow2=arrow(193),
    trusted=c('short:hidden m-0 mt-8 text-[11px] font-normal leading-[1.9] text-white/90',
              D('absolute left-[65px] bottom-[137px] mt-0 leading-[21.5px] text-white'), micro()),
    tr1=c('tracking-[0.2em]', D('block tracking-[0.341em]')),
    tr2=c('tracking-[0.2em]', D('block tracking-[0.342em]')),
    pager=c('hidden', 'desk:contents'),
    pl1=D('block absolute right-[62px] bottom-[249px] h-[24px] w-[2px] bg-white/55'),
    p01=c('m-0', D('absolute right-[44px] bottom-[208px] w-[40px] text-center text-[20px] font-normal leading-[24px] tracking-[0.05em] text-white')),
    pl2=D('block absolute right-[62px] bottom-[166px] h-[30px] w-[2px] bg-white/55'),
    p03=c('m-0', D('absolute right-[44px] bottom-[138px] w-[40px] text-center text-[12px] font-normal leading-[16px] tracking-[0.1em] text-white')),
    video=c('mt-6 short:mt-3 flex items-center gap-3', 'desk:contents'),
    play=c('h-[18px] w-[16px] shrink-0', D('absolute left-[66px] bottom-[46px] h-[20px] w-[18px]')),
    time=c('m-0 shrink-0 text-[13px] font-normal leading-[20px] tracking-[0.06em] text-white',
           D('absolute left-[106px] bottom-[46px] text-[14px]')),
    track=c('relative h-[3px] min-w-0 flex-1 bg-white/60', D('absolute left-[205px] right-[198px] bottom-[55px] h-[3px] w-auto flex-none')),
    mute=c('h-[20px] w-[24px] shrink-0', D('absolute right-[127px] bottom-[45px] h-[22px] w-[26px]')),
    full=c('h-[16px] w-[17px] shrink-0', D('absolute right-[55px] bottom-[47px] h-[18px] w-[19px]')),
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(HEAD + BODY % v)
print('index.html written')
