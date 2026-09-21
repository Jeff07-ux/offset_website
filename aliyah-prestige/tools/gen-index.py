"""Generates index.html. Mobile-first classes, `desk:` (>=800px) = screenshot comp scaled by viewport.
All px values in the markup are converted to rem (root 16px on mobile, comp-scaled on desktop).
Run: python tools/gen-index.py && npm run build:css
"""
import re

HEAD = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Aliyah Prestige</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&family=Jost:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="dist/output.css">
</head>
<body class="m-0 bg-[#f5efe7] font-['Inter',sans-serif] antialiased">
'''
SERIF = "font-['Cormorant_Garamond',serif]"

hero = '''
  <!-- SECTION: home-hero  (reference: refs/home-hero.png) -->
  <!-- Hero photo derived from refs/home-hero.png with text removed (tools/make-hero-bg.mjs). Replace assets/hero-bg.png with the original photo when available. -->
  <section id="home-hero" class="relative isolate overflow-hidden bg-[#1a0d05] text-white desk:h-[366px] desk:border-x-[2px] desk:border-t-[1px] desk:border-[#202020]">
    <img src="assets/hero-bg.png" alt="" class="absolute inset-0 -z-20 size-full object-cover object-[65%_center] desk:object-cover">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,8,3,.6)_0%,rgba(15,8,3,.35)_38%,rgba(15,8,3,.78)_100%)] desk:hidden"></div>

    <div class="relative mx-auto flex min-h-[620px] w-full max-w-[1100px] flex-col px-6 pb-14 pt-5 sm:px-10 desk:block desk:h-full desk:min-h-0 desk:max-w-[856px] desk:p-0">
      <header class="flex flex-wrap items-center justify-between gap-y-3 desk:absolute desk:inset-x-0 desk:top-0 desk:block desk:h-[52px]">
        <a href="#home-hero" class="block whitespace-nowrap text-center desk:absolute desk:left-[78px] desk:top-[5px] desk:w-[132px]">
          <svg class="mx-auto block size-[14px] text-[#e8d7b0] desk:size-[12px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width=".8" aria-hidden="true"><path d="M6 0.5 7.6 4.4 11.5 6 7.6 7.6 6 11.5 4.4 7.6 0.5 6 4.4 4.4Z"/><circle cx="6" cy="6" r="1.6"/></svg>
          <span class="mt-[3px] block SERIF text-[17px] font-normal leading-[18px] tracking-[0.12em] text-[#f3ece0] desk:text-[13px] desk:leading-[14px] desk:tracking-[0.1em]">ALIYAH PRESTIGE</span>
          <span class="mt-[4px] block text-[7px] leading-[8px] tracking-[0.16em] text-[#e6d8c0] desk:text-[5px] desk:leading-[6px] desk:tracking-[0.14em]">PRIVATE CONCIERGE MARRAKECH</span>
        </a>
        <a href="#home-hero" class="flex h-[36px] items-center justify-center gap-[8px] rounded-full border border-white/55 px-[16px] text-[10px] font-medium leading-[12px] tracking-[0.12em] text-[#f5eee4] transition-colors hover:bg-white/10 desk:absolute desk:left-[708px] desk:top-[14px] desk:h-[24px] desk:w-[85px] desk:px-0 desk:text-[6px] desk:leading-[8px]">ENQUIRE NOW <span aria-hidden="true">→</span></a>
        <nav aria-label="Main" class="-mx-1 flex w-full justify-between gap-[14px] overflow-x-auto px-1 pb-1 text-[10px] leading-[14px] tracking-[0.1em] text-[#f5eee4] desk:contents desk:text-[6px] desk:leading-[8px]">
          <a href="index.html" class="shrink-0 desk:absolute desk:left-[278px] desk:top-[22px]">HOME</a>
          <a href="#home-hero" class="relative shrink-0 desk:absolute desk:left-[318px] desk:top-[22px] desk:h-[8px] desk:w-[58px]"><span class="desk:absolute desk:left-0">ABOUT</span><span class="hidden desk:absolute desk:left-[3px] desk:block">EXPERIENCES</span></a>
          <a href="#services-section" class="shrink-0 desk:absolute desk:left-[398px] desk:top-[22px]">SERVICES</a>
          <a href="#home-hero" class="shrink-0 desk:absolute desk:left-[459px] desk:top-[22px]">CONTACT</a>
          <a href="blog.html" class="shrink-0 desk:absolute desk:left-[518px] desk:top-[22px]">BLOG</a>
        </nav>
      </header>

      <div class="mt-auto pt-24 desk:absolute desk:left-[78px] desk:top-[84px] desk:mt-0 desk:p-0">
        <p class="m-0 text-[10px] leading-[12px] tracking-[0.2em] text-[#e6d8c0] desk:text-[5px] desk:leading-[6px]">SINCE 1986</p>
        <p class="m-0 mt-[7px] hidden SERIF text-[23px] font-normal leading-[26px] tracking-[0.115em] text-[#f5eee4] desk:block">ALIYAH PRESTIGE</p>
        <p class="m-0 mt-[7px] hidden text-[8px] leading-[10px] tracking-[0.48em] text-[#eadfcc] desk:block">PRIVATE CONCIERGE MARRAKECH</p>
        <h1 class="m-0 mt-[14px] SERIF text-[clamp(28px,9vw,46px)] font-medium leading-[1.12] tracking-[0] text-[#f7f1e6] desk:mt-[17px] desk:text-[30.6px] desk:leading-[34px]">A WORLD OF PRIVILEGE,<br>ROOTED IN EXCELLENCE</h1>
        <p class="m-0 mt-[18px] max-w-[36ch] text-[15px] font-light leading-[24px] text-[#f0e8da] desk:mt-[8px] desk:max-w-none desk:text-[8.75px] desk:leading-[14px]">Bespoke experiences of rare elegance in Marrakech and beyond.<br class="hidden desk:inline"> With discretion, personalization and timeless sophistication,<br class="hidden desk:inline"> we turn your vision into unforgettable moments.</p>
        <a href="#services-section" class="mt-[28px] flex h-[46px] w-[172px] items-center justify-center gap-[10px] rounded-full border border-white/60 text-[11px] font-medium leading-[14px] tracking-[0.12em] text-[#f5eee4] transition-colors hover:bg-white/10 desk:mt-[17px] desk:h-[24px] desk:w-[102px] desk:text-[6px] desk:leading-[8px]">ENQUIRE NOW <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>
'''.replace('SERIF', SERIF)

cards = ["Luxury Private|Jet Charter", "Private Villas, Hotels|&amp; Riads", "Personal Chefs &amp;|Gastronomy",
         "Wellness &amp; Spa|Rituals", "Private Cultural|Experiences", "Luxury Events|Planner",
         "Luxury Transportation|&amp; Chauffeurs", "Private Souk Experience|&amp; Personal Curation",
         "Desert &amp; Atlas|Escapes", "24/7 Discreet Personal|Assistance"]
alts = ["Private jet at sunset", "Riad courtyard pool", "Chef plating a dish", "Wellness and spa terrace",
        "Cultural experience in a palace", "Luxury events table setting", "Chauffeur beside a luxury car",
        "Souk street in Marrakech", "Desert dunes with a quad bike", "Discreet personal assistant at a door"]
xs = [(23, 145), (178, 150), (337, 149), (495, 147), (652, 145)]
lis = []
for i, c in enumerate(cards):
    r, cc = divmod(i, 5)
    x, w = xs[cc]
    top = 100 if r == 0 else 268
    h = 156 if r == 0 else 155
    a, b = c.split('|')
    lis.append(f'''        <li class="relative aspect-[145/156] overflow-hidden rounded-[8px] shadow-[0_1px_2px_rgba(60,35,20,.28)] desk:absolute desk:aspect-auto desk:rounded-[6px] desk:left-[{x}px] desk:top-[{top}px] desk:h-[{h}px] desk:w-[{w}px]">
          <a href="{'services.html' if i == 6 else '#services-section'}" class="group block size-full text-[#efe8de]">
            <img src="assets/service-{i+1:02d}.png" alt="{alts[i]}" class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] desk:object-cover">
            <span class="absolute inset-x-0 bottom-0 block px-[12px] pb-[12px] desk:inset-x-auto desk:bottom-auto desk:left-[13px] desk:top-[101px] desk:p-0">
              <span class="block {SERIF} text-[11px] font-normal leading-[12px] tracking-[0.04em] desk:text-[8px] desk:leading-[10px]">{i+1:02d}.</span>
              <h3 class="m-0 mt-[4px] {SERIF} text-[15px] font-normal leading-[18px] desk:mt-[4.5px] desk:text-[12.2px] desk:leading-[14px]">{a}<br class="hidden desk:inline"> {b}</h3>
            </span>
          </a>
        </li>''')

services = f'''
  <!-- SECTION: services-section  (reference: refs/services-section.png) -->
  <section id="services-section" class="relative overflow-hidden bg-[#f5efe7] px-5 py-[56px] sm:px-8 desk:h-[432px] desk:p-0">
    <div class="relative mx-auto w-full max-w-[1100px] desk:h-full desk:max-w-[824px]">
      <header class="mb-[28px] grid gap-[14px] sm:grid-cols-[1fr_minmax(0,320px)] sm:items-end desk:mb-0 desk:block">
        <div>
          <div class="flex items-center gap-[12px] desk:contents">
            <p class="m-0 font-['Jost',sans-serif] text-[11px] font-medium leading-[14px] tracking-[0.2em] text-[#7a5643] desk:absolute desk:left-[26px] desk:top-[8px] desk:text-[7.5px] desk:leading-[10px] desk:tracking-[0.21em]">SIGNATURE SERVICES</p>
            <span class="block h-px w-[36px] bg-[#dfd0bd] desk:absolute desk:left-[139px] desk:top-[13px] desk:w-[26px]" aria-hidden="true"></span>
          </div>
          <h2 class="m-0 mt-[14px] {SERIF} text-[clamp(30px,8vw,42px)] font-normal leading-[1.1] text-[#2f221c] desk:absolute desk:left-[26px] desk:top-[30px] desk:mt-0 desk:text-[25px] desk:leading-[26px]">Exceptional services,<br class="hidden desk:inline"> for extraordinary moments.</h2>
        </div>
        <p class="m-0 font-['Jost',sans-serif] text-[15px] leading-[24px] text-[#6f6a65] desk:absolute desk:left-[469px] desk:top-[35px] desk:text-[8.4px] desk:leading-[14.4px] desk:tracking-[0.045em] desk:text-[#77726d]">From private jets to desert escapes, our concierge team<br class="hidden desk:inline"> curates seamless, bespoke experiences designed<br class="hidden desk:inline"> around your every desire.</p>
      </header>
      <ul class="m-0 grid list-none grid-cols-2 gap-[12px] p-0 sm:gap-[16px] mx-auto max-w-[620px] desk:absolute desk:max-w-none desk:inset-0 desk:block">
{chr(10).join(lis)}
      </ul>
    </div>
  </section>
'''

# services comp is 824px wide, hero comp 860px: rescale services desk: values so both fill the viewport width
def rescale(m):
    return re.sub(r'(?<![\w.])(\d+(?:\.\d+)?)px', lambda n: '%.4fpx' % (float(n.group(1)) * 860 / 824), m.group(0))


services = re.sub(r'desk:\S+', rescale, services)

out = HEAD + hero + services +'\n</body>\n</html>\n'


def conv(m):
    v = float(m.group(1)) / 16
    return (('%.5f' % v).rstrip('0').rstrip('.') or '0') + 'rem'


head, body = out.split('<body', 1)
body = re.sub(r'(?<![\w.])(\d+(?:\.\d+)?)px', conv, body)
open('index.html', 'w', encoding='utf-8').write(head + '<body' + body)
print('index.html written')
