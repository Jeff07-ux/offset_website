"""Generates services.html (Private Transfers & Chauffeurs). Mobile-first; `sv:` (>=720px) = the 720px-wide comp scaled by viewport.
All px in the markup become rem (root 16px on mobile, comp-scaled on desktop). See src/input.css.
Run: python tools/gen-svc.py && npm run build:css
"""
import re

SERIF = "font-['Cormorant_Garamond',serif]"
SANS = "font-['Inter',sans-serif]"

HEAD = '''<!doctype html>
<html lang="en" class="sv">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Private Transfers &amp; Chauffeurs | Aliyah Prestige</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="dist/output.css">
</head>
<body class="m-0 bg-[#f3eee3] font-['Inter',sans-serif] antialiased">
'''

nav_items = [("HOME", 243, "index.html"), ("SERVICES", 279.5, "services.html"), ("EXPERIENCES", 327, "#svc-hero"),
             ("ABOUT", 388, "#svc-hero"), ("BLOG", 428, "blog.html"), ("CONTACT", 464, "#svc-footer")]
nav_html = "\n".join(
    f'          <a href="{h}" class="shrink-0 D:absolute D:left-[{x}px] D:top-[22px]">{t}</a>' for t, x, h in nav_items)

ICON_CLOCK = '<svg class="size-[11px] shrink-0 text-[#c79a5f] D:size-[8px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true"><circle cx="6" cy="6" r="4.8"/><path d="M6 3.4v3l1.6 1"/></svg>'
ICON_ROUTE = '<svg class="size-[11px] shrink-0 text-[#c79a5f] D:size-[8px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true"><path d="M2 9.5c3 0 1.5-3.5 4.5-3.5S8 3 10 2.5M2 9.5h3M9.5 2.5 8 2"/></svg>'
ICON_DOOR = '<svg class="size-[11px] shrink-0 text-[#c79a5f] D:size-[8px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true"><path d="M3 10.5V2.5h5v8M2 10.5h8M6.5 6.5h.01"/></svg>'
ICON_PIN = '<svg class="size-[11px] shrink-0 text-[#c79a5f] D:size-[8px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true"><path d="M6 10.5S2.5 7.3 2.5 5a3.5 3.5 0 0 1 7 0c0 2.3-3.5 5.5-3.5 5.5z"/><circle cx="6" cy="5" r="1.2"/></svg>'
chips = [(ICON_CLOCK, "Airport transfers"), (ICON_ROUTE, "City transfers"), (ICON_DOOR, "Day trips"), (ICON_PIN, "VIP service")]
chips_html = "\n".join(
    f'          <li class="flex items-center gap-[7px] D:gap-[6px]">{i}<span>{t}</span></li>' for i, t in chips)

hero = f'''
  <!-- SECTION: svc-hero  (reference: refs/svc-hero.png) -->
  <!-- Hero photo derived from the mockup with text removed (tools/make-svc-assets.mjs). Replace assets/svc-hero-bg.png with the original photo. -->
  <section id="svc-hero" class="relative isolate overflow-hidden bg-[#1a0d05] text-white D:h-[266px]">
    <img src="assets/svc-hero-bg.png" alt="" class="absolute inset-0 -z-20 size-full object-cover object-[72%_center]">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,8,3,.6)_0%,rgba(15,8,3,.35)_38%,rgba(15,8,3,.78)_100%)] D:hidden"></div>

    <div class="relative mx-auto flex min-h-[600px] w-full max-w-[1100px] flex-col px-6 pb-14 pt-5 sm:px-10 D:block D:h-full D:min-h-0 D:max-w-[720px] D:p-0">
      <header class="flex flex-wrap items-center justify-between gap-y-3 D:absolute D:inset-x-0 D:top-0 D:block D:h-[50px]">
        <a href="index.html" class="block whitespace-nowrap text-center D:absolute D:left-[31px] D:top-[6px] D:w-[132px]">
          <svg class="mx-auto block size-[14px] text-[#e8d7b0] D:size-[12px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width=".8" aria-hidden="true"><path d="M6 0.5 7.6 4.4 11.5 6 7.6 7.6 6 11.5 4.4 7.6 0.5 6 4.4 4.4Z"/><circle cx="6" cy="6" r="1.6"/></svg>
          <span class="mt-[3px] block {SERIF} text-[17px] font-normal leading-[18px] tracking-[0.12em] text-[#f3ece0] D:mt-[2px] D:text-[14.5px] D:leading-[14px] D:tracking-[0.1em]">ALIYAH PRESTIGE</span>
          <span class="mt-[4px] block text-[7px] leading-[8px] tracking-[0.16em] text-[#e6d8c0] D:mt-[5px] D:text-[4.3px] D:leading-[5px] D:tracking-[0.2em]">PRIVATE CONCIERGE MARRAKECH</span>
        </a>
        <a href="#svc-cta" class="flex h-[36px] items-center justify-center gap-[8px] rounded-full border border-white/55 px-[16px] text-[10px] font-medium leading-[12px] tracking-[0.12em] text-[#f5eee4] transition-colors hover:bg-white/10 D:absolute D:left-[599px] D:top-[14px] D:h-[23px] D:w-[93px] D:gap-[10px] D:px-0 D:text-[5.6px] D:leading-[8px]">ENQUIRE NOW <span aria-hidden="true">→</span></a>
        <nav aria-label="Main" class="-mx-1 flex w-full flex-wrap justify-between gap-x-[14px] gap-y-[6px] px-1 pb-1 text-[10px] leading-[14px] tracking-[0.1em] text-[#f5eee4] D:contents D:text-[5.6px] D:leading-[8px] D:tracking-[0.08em]">
{nav_html}
        </nav>
      </header>

      <div class="mt-auto pt-24 D:absolute D:left-[48px] D:top-[93px] D:mt-0 D:p-0">
        <p class="m-0 text-[10px] leading-[12px] tracking-[0.2em] text-[#e6d8c0] D:text-[5px] D:leading-[6px]">SIGNATURE SERVICES</p>
        <h1 class="m-0 mt-[14px] {SERIF} text-[clamp(30px,9.5vw,50px)] font-medium leading-[1.1] text-[#f7f1e6] D:mt-[13px] D:text-[29.5px] D:leading-[28px]">Private Transfers<br class="hidden D:inline"> &amp; Chauffeurs</h1>
        <p class="m-0 mt-[16px] max-w-[36ch] text-[15px] font-light leading-[24px] text-[#f0e8da] D:mt-[6px] D:max-w-none D:text-[7.9px] D:leading-[14px]">Travel in comfort, style and complete peace of mind.</p>
        <ul class="m-0 mt-[24px] grid list-none grid-cols-2 gap-x-[16px] gap-y-[12px] p-0 text-[13px] leading-[18px] text-[#f0e8da] D:mt-[31px] D:flex D:gap-[11px] D:text-[7px] D:leading-[10px]">
{chips_html}
        </ul>
      </div>
      <span class="absolute left-[47px] top-[208px] hidden h-px w-[218px] bg-[linear-gradient(90deg,rgba(199,154,95,.45),rgba(199,154,95,.2)_70%,transparent)] D:block" aria-hidden="true"></span>
    </div>
  </section>
'''

ICON_C = 'class="size-[16px] shrink-0 text-[#b8865f] D:size-[14px]" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true"'
list_items = [
    ('<svg ' + ICON_C + '><path d="M2 7 8 2l6 5v6.5H2zM6 13.5V9.5h4v4"/></svg>', "Professional, multilingual chauffeurs"),
    ('<svg ' + ICON_C + '><path d="M2.5 11.5V8l1.3-3.5h8.4L13.5 8v3.5zM2.5 8h11M4.5 11.5v1.5M11.5 11.5v1.5"/><circle cx="5" cy="9.7" r=".4"/><circle cx="11" cy="9.7" r=".4"/></svg>', "Luxury vehicles (Mercedes, Range Rover, etc.)"),
    ('<svg ' + ICON_C + '><path d="M3 6.5a5 4 0 0 1 10 0zM8 6.5V9M6 14l2-3 2 3"/><circle cx="8" cy="10" r="1"/></svg>', "Airport meet &amp; greet"),
    ('<svg ' + ICON_C + '><circle cx="8" cy="8" r="6"/><path d="M8 4.5V8l2.4 1.4"/></svg>', "Flexible schedules &amp; 24/7 availability"),
]
list_html = "\n".join(
    f'            <li class="flex items-center gap-[13px] D:absolute D:left-[0px] D:top-[{y}px] D:gap-[11px]">{i}<span>{t}</span></li>'
    for (i, t), y in zip(list_items, [-1, 23.5, 48, 72.5]))

intro = f'''
  <!-- SECTION: svc-intro  (reference: refs/svc-intro.png) -->
  <section id="svc-intro" class="relative overflow-hidden bg-[#f3eee3] px-5 py-[48px] sm:px-8 D:h-[288px] D:p-0">
    <div class="relative mx-auto grid w-full max-w-[1100px] gap-[32px] sm:grid-cols-2 sm:items-center D:block D:h-full D:max-w-[720px]">
      <img src="assets/svc-intro.png" alt="View of Marrakech through the window of a luxury car" class="block aspect-[329/244] w-full rounded-[8px] object-cover D:absolute D:left-[47px] D:top-[22px] D:aspect-auto D:h-[244px] D:w-[329px] D:rounded-[5px]">
      <div class="D:absolute D:left-[404px] D:top-[23px]">
        <p class="m-0 {SANS} text-[10px] leading-[12px] tracking-[0.18em] text-[#7a5643] D:mt-[1px] D:text-[5.8px] D:leading-[7px] D:tracking-[0.14em]">DISCOVER A HIGHER STANDARD</p>
        <h2 class="m-0 mt-[12px] {SERIF} text-[clamp(28px,7.5vw,38px)] font-normal leading-[1.12] text-[#2f221c] D:mt-[8px] D:text-[21.5px] D:leading-[22px]">More than a transfer,<br class="hidden D:inline"> a seamless experience.</h2>
        <p class="m-0 mt-[16px] text-[15px] leading-[24px] text-[#5c534b] D:mt-[7px] D:text-[8.4px] D:leading-[14px]">Our private transfer service offers a discreet, reliable<br class="hidden D:inline"> and comfortable way to move around Marrakech<br class="hidden D:inline"> and beyond. Whether you're arriving at the airport,<br class="hidden D:inline"> exploring the city or heading to the desert, our professional<br class="hidden D:inline"> chauffeurs ensure a smooth and effortless journey.</p>
        <ul class="m-0 mt-[22px] grid list-none gap-[14px] p-0 text-[14px] leading-[20px] text-[#4a3f38] D:relative D:mt-[14px] D:block D:h-[86px] D:text-[7.5px] D:leading-[13px]">
{list_html}
        </ul>
      </div>
    </div>
  </section>
'''

# ---- fleet ------------------------------------------------------------------
fleet_cards = [("Mercedes S-Class", "Up to 3 passengers", 49, 146), ("Mercedes V-Class", "Up to 6 passengers", 210, 144),
               ("Range Rover", "Up to 4 passengers", 369, 146), ("Luxury Van", "Up to 8 passengers", 530, 145)]
alts = ["Mercedes S-Class in front of a palace", "Mercedes V-Class in front of a palace", "Range Rover in front of a palace", "Luxury van in front of a palace"]
fleet_li = []
for i, (name, cap, x, w) in enumerate(fleet_cards):
    fleet_li.append(f'''        <li class="D:absolute D:left-[{x}px] D:top-[88px] D:w-[{w}px]">
          <a href="#svc-cta" class="group block">
            <img src="assets/svc-fleet-{i+1}.png" alt="{alts[i]}" class="block aspect-[146/77] w-full rounded-[4px] object-cover transition-transform duration-500 group-hover:scale-[1.02] D:aspect-auto D:h-[77px] D:rounded-[2px]">
            <h3 class="m-0 mt-[10px] {SERIF} text-[19px] font-medium leading-[22px] text-[#2f221c] D:mt-[4px] D:text-[10.7px] D:font-normal D:leading-[12px]">{name}</h3>
            <p class="m-0 mt-[2px] {SANS} text-[13px] leading-[18px] text-[#8b857e] D:mt-[3px] D:text-[6px] D:leading-[8px]">{cap}</p>
          </a>
        </li>''')

fleet = f'''
  <!-- SECTION: svc-fleet  (reference: refs/svc-fleet.png) -->
  <!-- Fleet photos are cut from the mockup (tools/make-svc-assets.mjs). -->
  <section id="svc-fleet" class="relative overflow-hidden bg-[#f3eee3] px-5 pb-[56px] pt-[8px] sm:px-8 D:h-[219px] D:p-0">
    <div class="relative mx-auto w-full max-w-[1100px] D:h-full D:max-w-[720px]">
      <div class="mb-[28px] grid gap-[16px] sm:grid-cols-[1fr_minmax(0,300px)] sm:items-end D:mb-0 D:block">
        <div>
          <p class="m-0 {SANS} text-[10px] leading-[12px] tracking-[0.18em] text-[#7a5643] D:absolute D:left-[49px] D:top-[20.5px] D:text-[5.7px] D:leading-[7px] D:tracking-[0.14em]">OUR FLEET</p>
          <h2 class="m-0 mt-[12px] {SERIF} text-[clamp(28px,7.5vw,38px)] font-normal leading-[1.12] text-[#2f221c] D:absolute D:left-[49px] D:top-[33.5px] D:mt-0 D:text-[20.3px] D:leading-[21px]">Exceptional comfort,<br class="hidden D:inline"> for your every journey.</h2>
        </div>
        <div class="flex flex-col items-start gap-[18px]">
          <p class="m-0 text-[15px] leading-[24px] text-[#7d776f] D:absolute D:left-[370px] D:top-[13.5px] D:text-[7.2px] D:leading-[14.5px]">From elegant sedans to spacious vans,<br class="hidden D:inline"> our fleet is selected for your comfort,<br class="hidden D:inline"> privacy and safety.</p>
          <a href="#svc-cta" class="flex h-[44px] items-center justify-center gap-[12px] rounded-full border border-[#3b2f27]/45 px-[24px] text-[11px] font-medium leading-[14px] tracking-[0.12em] text-[#3b2f27] transition-colors hover:bg-[#3b2f27]/5 D:absolute D:left-[545px] D:top-[25px] D:h-[24px] D:w-[131px] D:gap-[16px] D:px-0 D:text-[5.6px] D:leading-[8px]">VIEW ALL VEHICLES <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <ul class="m-0 grid list-none grid-cols-2 gap-x-[14px] gap-y-[24px] p-0 sm:grid-cols-4 D:absolute D:inset-0 D:block">
{chr(10).join(fleet_li)}
      </ul>
    </div>
  </section>
'''

# ---- CTA --------------------------------------------------------------------
cta = f'''
  <!-- SECTION: svc-cta  (reference: refs/svc-cta.png) -->
  <section id="svc-cta" class="relative isolate overflow-hidden bg-[#1a0d05] text-white D:h-[162px]">
    <img src="assets/svc-cta-bg.png" alt="" class="absolute inset-0 -z-20 size-full object-cover object-[35%_center]">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,8,3,.7)_0%,rgba(15,8,3,.55)_100%)] D:hidden"></div>
    <div class="relative mx-auto w-full max-w-[1100px] px-6 py-[56px] sm:px-10 D:h-full D:max-w-[720px] D:p-0">
      <div class="D:absolute D:left-[50px] D:top-[26px]">
        <p class="m-0 text-[10px] leading-[12px] tracking-[0.2em] text-[#d3a86f] D:text-[5px] D:leading-[7px] D:tracking-[0.16em]">READY TO BOOK?</p>
        <h2 class="m-0 mt-[12px] {SERIF} text-[clamp(30px,8.5vw,44px)] font-normal leading-[1.1] text-[#f7f1e6] D:mt-[5px] D:text-[23px] D:leading-[21px]">Your journey<br class="hidden D:inline"> starts here.</h2>
        <p class="m-0 mt-[14px] max-w-[34ch] text-[15px] font-light leading-[24px] text-[#f0e8da] D:mt-[11px] D:max-w-none D:text-[7.6px] D:leading-[13px]">Let us take care of every detail. Simply share your plans<br class="hidden D:inline"> and we'll arrange the perfect transfer for you.</p>
        <span class="mt-[20px] block h-px w-[14px] bg-[#d3a86f] D:absolute D:left-[0px] D:top-[108px] D:mt-0" aria-hidden="true"></span>
      </div>
      <a href="#svc-cta" class="mt-[28px] flex h-[48px] w-[180px] items-center justify-center gap-[14px] rounded-full border border-white/60 text-[11px] font-medium leading-[14px] tracking-[0.12em] text-[#f5eee4] transition-colors hover:bg-white/10 D:absolute D:left-[557px] D:top-[90px] D:mt-0 D:h-[24px] D:w-[117px] D:gap-[14px] D:text-[5.6px] D:leading-[8px]">ENQUIRE NOW <span aria-hidden="true">→</span></a>
    </div>
  </section>
'''

# ---- footer -----------------------------------------------------------------
foot_nav = [("HOME", 227), ("ABOUT US", 260), ("SERVICES", 303), ("EXPERIENCES", 344), ("BLOG", 395), ("CONTACT", 427)]
foot_hrefs = {"HOME": "index.html", "SERVICES": "services.html", "BLOG": "blog.html"}
foot_nav_html = "\n".join(
    f'          <a href="{foot_hrefs.get(t, "#svc-footer")}" class="D:absolute D:top-[24.5px] D:left-[{x}px]">{t}</a>' for t, x in foot_nav)
footer = f'''
  <!-- SECTION: svc-footer  (reference: refs/svc-footer.png) -->
  <footer id="svc-footer" class="relative bg-[#f3eee3] px-6 py-[36px] text-[#3b2f27] sm:px-10 D:h-[51px] D:p-0">
    <div class="relative mx-auto flex w-full max-w-[1100px] flex-col items-center gap-[22px] text-center D:block D:h-full D:max-w-[720px] D:text-left">
      <a href="index.html" class="block whitespace-nowrap D:absolute D:left-[50px] D:top-[19px]">
        <span class="block {SERIF} text-[18px] font-semibold leading-[20px] tracking-[0.1em] D:text-[8.1px] D:leading-[10px]">ALIYAH PRESTIGE</span>
        <span class="mt-[4px] block text-[8px] leading-[10px] tracking-[0.14em] text-[#6b5c4f] D:mt-[2px] D:text-[3.9px] D:leading-[5px] D:tracking-[0.18em]">PRIVATE CONCIERGE MARRAKECH</span>
      </a>
      <nav aria-label="Footer" class="flex flex-wrap justify-center gap-x-[22px] gap-y-[10px] {SANS} text-[11px] leading-[14px] tracking-[0.1em] text-[#6b5c4f] D:contents D:text-[4.5px] D:leading-[6px]">
{foot_nav_html}
      </nav>
      <div class="flex items-center gap-[18px] {SANS} text-[10px] tracking-[0.12em] text-[#6b5c4f] D:absolute D:left-[543px] D:top-[21.5px] D:gap-[0px] D:text-[4.4px]">
        <span class="D:w-[85px]">MARRAKECH · SINCE 1986</span>
        <span class="flex items-center gap-[16px] text-[#3b2f27] D:contents">
          <a href="#svc-footer" aria-label="Instagram" class="D:absolute D:left-[90px] D:top-[1px]"><svg class="size-[16px] D:size-[7px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="1.5" y="1.5" width="9" height="9" rx="2.5"/><circle cx="6" cy="6" r="2.1"/><circle cx="8.6" cy="3.4" r=".4" fill="currentColor"/></svg></a>
          <a href="#svc-footer" aria-label="LinkedIn" class="D:absolute D:left-[107px] D:top-[1px]"><svg class="size-[16px] D:size-[7px]" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="1.5" y="4.5" width="2" height="6.5"/><circle cx="2.5" cy="2.4" r="1.2"/><path d="M5.2 4.5h1.9v.9c.4-.7 1.1-1.1 2-1.1 1.7 0 2.2 1.1 2.2 2.6V11h-2V7.6c0-.7-.2-1.2-.9-1.2s-1.2.5-1.2 1.3V11h-2z"/></svg></a>
          <a href="#svc-footer" aria-label="Search" class="D:absolute D:left-[125px] D:top-[1px]"><svg class="size-[16px] D:size-[7px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="7.4" cy="4.6" r="3"/><path d="M5.2 6.8 1.5 10.5"/></svg></a>
        </span>
      </div>
    </div>
  </footer>
'''

out = (HEAD + hero + intro + fleet + cta + footer + '\n</body>\n</html>\n').replace('D:', 'sv:')


def conv(m):
    v = float(m.group(1)) / 16
    return (('%.5f' % v).rstrip('0').rstrip('.') or '0') + 'rem'


head, body = out.split('<body', 1)
body = re.sub(r'(?<![\w.])(\d+(?:\.\d+)?)px', conv, body)
open('services.html', 'w', encoding='utf-8').write(head + '<body' + body)
print('services.html written')
