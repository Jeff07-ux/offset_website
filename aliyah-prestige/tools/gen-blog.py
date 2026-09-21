"""Generates blog.html (Journal page). Mobile-first; `jn:` (>=720px) = the 730px-wide comp scaled by viewport.
All px in the markup become rem (root 16px on mobile, comp-scaled on desktop). See src/input.css.
Run: python tools/gen-blog.py && npm run build:css
"""
import re

SERIF = "font-['Cormorant_Garamond',serif]"
JOST = "font-['Inter',sans-serif]"  # blog small text is Inter-width in the comp

HEAD = '''<!doctype html>
<html lang="en" class="jn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Our Journal | Aliyah Prestige</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&family=Jost:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="dist/output.css">
</head>
<body class="m-0 bg-[#f3eee3] font-['Inter',sans-serif] antialiased">
'''

nav_items = [("HOME", 253, "index.html"), ("SERVICES", 289.5, "services.html"), ("EXPERIENCES", 337, "#blog-hero"),
             ("ABOUT", 398, "#blog-hero"), ("BLOG", 438, "blog.html"), ("CONTACT", 474, "#blog-footer")]
nav_html = "\n".join(
    f'          <a href="{h}" class="shrink-0 D:absolute D:left-[{x - 0}px] D:top-[22px]">{t}</a>' for t, x, h in nav_items)

hero = f'''
  <!-- SECTION: blog-hero  (reference: refs/blog-hero.png) -->
  <!-- Hero photo derived from the mockup with text removed (tools/make-blog-assets.mjs). Replace assets/blog-hero-bg.png with the original photo. -->
  <section id="blog-hero" class="relative isolate overflow-hidden bg-[#1a0d05] text-white D:h-[262px]">
    <img src="assets/blog-hero-bg.png" alt="" class="absolute inset-0 -z-20 size-full object-cover object-[60%_center]">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,8,3,.6)_0%,rgba(15,8,3,.35)_38%,rgba(15,8,3,.78)_100%)] D:hidden"></div>

    <div class="relative mx-auto flex min-h-[560px] w-full max-w-[1100px] flex-col px-6 pb-14 pt-5 sm:px-10 D:block D:h-full D:min-h-0 D:max-w-[730px] D:p-0">
      <header class="flex flex-wrap items-center justify-between gap-y-3 D:absolute D:inset-x-0 D:top-0 D:block D:h-[50px]">
        <a href="index.html" class="block whitespace-nowrap text-center D:absolute D:left-[44px] D:top-[6px] D:w-[132px]">
          <svg class="mx-auto block size-[14px] text-[#e8d7b0] D:size-[12px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width=".8" aria-hidden="true"><path d="M6 0.5 7.6 4.4 11.5 6 7.6 7.6 6 11.5 4.4 7.6 0.5 6 4.4 4.4Z"/><circle cx="6" cy="6" r="1.6"/></svg>
          <span class="mt-[3px] block {SERIF} text-[17px] font-normal leading-[18px] tracking-[0.12em] text-[#f3ece0] D:mt-[2px] D:text-[14.5px] D:leading-[14px] D:tracking-[0.1em]">ALIYAH PRESTIGE</span>
          <span class="mt-[4px] block text-[7px] leading-[8px] tracking-[0.16em] text-[#e6d8c0] D:mt-[5px] D:text-[4.3px] D:leading-[5px] D:tracking-[0.2em]">PRIVATE CONCIERGE MARRAKECH</span>
        </a>
        <a href="#blog-articles" class="flex h-[36px] items-center justify-center gap-[8px] rounded-full border border-white/55 px-[16px] text-[10px] font-medium leading-[12px] tracking-[0.12em] text-[#f5eee4] transition-colors hover:bg-white/10 D:absolute D:left-[609px] D:top-[15px] D:h-[23px] D:w-[93px] D:gap-[10px] D:px-0 D:text-[5.6px] D:leading-[8px]">ENQUIRE NOW <span aria-hidden="true">→</span></a>
        <nav aria-label="Main" class="-mx-1 flex w-full flex-wrap justify-between gap-x-[14px] gap-y-[6px] px-1 pb-1 text-[10px] leading-[14px] tracking-[0.1em] text-[#f5eee4] D:contents D:text-[5.6px] D:leading-[8px] D:tracking-[0.08em]">
{nav_html}
        </nav>
      </header>

      <div class="mt-auto pt-24 D:absolute D:left-[60px] D:top-[86px] D:mt-0 D:p-0">
        <p class="m-0 text-[10px] leading-[12px] tracking-[0.2em] text-[#e6d8c0] D:text-[4.6px] D:leading-[6px]">OUR JOURNAL</p>
        <h1 class="m-0 mt-[14px] {SERIF} text-[clamp(30px,9.5vw,50px)] font-medium leading-[1.1] text-[#f7f1e6] D:mt-[9px] D:text-[30.5px] D:leading-[31px]">Stories, inspiration<br class="hidden D:inline"> and insider views<br class="hidden D:inline"> of Marrakech</h1>
        <p class="m-0 mt-[18px] max-w-[36ch] text-[15px] font-light leading-[24px] text-[#f0e8da] D:mt-[7px] D:max-w-none D:text-[8.1px] D:leading-[14px]">Travel tips, cultural insights, and curated experiences<br class="hidden D:inline"> to help you discover the real Marrakech.</p>
      </div>
    </div>
  </section>
'''

# ---- articles ---------------------------------------------------------------
cards = [
    ("TRAVEL TIPS", "How to Choose the Perfect Riad|in Marrakech", "From location to atmosphere, here's what to|look for when selecting your ideal riad.", "APR 12, 2025", "Traditional riad courtyard with a pool"),
    ("EXPERIENCES", "The Best Desert Escapes|Near Marrakech", "From Agafay to the Atlas, discover our favorite|desert experiences for every type of traveler.", "MAR 28, 2025", "Quad bikes crossing the desert at sunset"),
    ("CULTURE", "The Art of Moroccan Tea:|More Than Just a Drink", "A cultural ritual, a symbol of hospitality,|and a taste of tradition.", "MAR 15, 2025", "Moroccan tea and pastries on a table"),
    ("LUXURY", "Inside the Most Exclusive|Riads in Marrakech", "Discover the hidden gems of the medina,|where history meets modern luxury.", "FEB 28, 2025", "Arched hallway of a luxury riad"),
    ("GASTRONOMY", "Where to Dine in Marrakech:|Our Top 10 Addresses", "From traditional Moroccan cuisine to modern|fusion, these are our favorite spots.", "FEB 10, 2025", "Candlelit dinner table with Moroccan dishes"),
    ("CULTURE", "A Day in the Atlas Mountains", "An unforgettable journey through Berber villages,|waterfalls, and breathtaking landscapes.", "JEN 22, 2025", "Atlas Mountains valley"),
]
cols = [(62, 193), (270, 194), (479, 194)]
lis = []
for i, (cat, title, exc, date, alt) in enumerate(cards):
    r, c = divmod(i, 3)
    x, w = cols[c]
    top = 75 if r == 0 else 323
    ph = 126 if r == 0 else 120
    mt_cat = 8 if r == 0 else 6
    mt_title = 7 if r == 0 else 5
    arrow_top = (297 - 75) if r == 0 else (527 - 323)
    t1, *t2 = title.split('|')
    title_html = t1 + (f'<br class="hidden D:inline"> {t2[0]}' if t2 else '')
    e1, e2 = exc.split('|')
    lis.append(f'''        <li class="group relative D:absolute D:left-[{x}px] D:top-[{top}px] D:w-[{w}px]">
          <a href="#blog-articles" class="block">
            <img src="assets/blog-{i+1}.png" alt="{alt}" class="block aspect-[193/126] w-full rounded-[4px] object-cover transition-transform duration-500 group-hover:scale-[1.02] D:aspect-auto D:h-[{ph}px] D:rounded-[2px]">
            <p class="m-0 mt-[14px] {JOST} text-[10px] font-medium leading-[12px] tracking-[0.14em] text-[#6b5c4f] D:ml-[1px] D:mt-[{mt_cat}px] D:text-[5.6px] D:leading-[6px] D:tracking-[0.08em]">{cat}</p>
            <h3 class="m-0 mt-[8px] {SERIF} text-[22px] font-medium leading-[26px] text-[#2f221c] D:ml-[1px] D:mt-[{mt_title}px] D:text-[12.9px] D:font-normal D:leading-[14px]">{title_html}</h3>
            <p class="m-0 mt-[10px] {JOST} text-[15px] leading-[24px] text-[#7d776f] D:ml-[1px] D:mt-[3px] D:text-[7.6px] D:leading-[13px]">{e1}<br class="hidden D:inline"> {e2}</p>
            <p class="m-0 mt-[14px] {JOST} text-[10px] leading-[12px] tracking-[0.1em] text-[#8b857e] D:ml-[1px] D:mt-[10px] D:text-[5.6px] D:leading-[6px] D:tracking-[0.06em]">{date}</p>
            <svg class="absolute bottom-0 right-0 hidden size-[10px] text-[#3b2f27] D:right-[2px] D:top-[{arrow_top}px] D:bottom-auto D:block D:size-[8px]" viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width=".7" aria-hidden="true"><path d="M0.5 4h7M4.5 1l3 3-3 3"/></svg>
          </a>
        </li>''')

tabs = [("All", 70, True), ("Travel Tips", 107, False), ("Experiences", 172, False), ("Culture", 243, False), ("Luxury", 298, False)]
tab_html = "\n".join(
    f'''          <a href="#blog-articles" class="shrink-0 {JOST} text-[13px] leading-[16px] {'text-[#2f221c] border-b border-[#a48a6f] pb-[8px]' if act else 'text-[#7d746b] pb-[8px]'} D:absolute D:top-[33px] D:pb-0 D:text-[7.2px] D:leading-[10px] D:left-[{x}px]{' D:border-b-0' if act else ''}" {'aria-current="page"' if act else ''}>{t}</a>'''
    for t, x, act in tabs)

articles = f'''
  <!-- SECTION: blog-articles  (reference: refs/blog-articles.png) -->
  <!-- Article photos are cut from the mockup (tools/make-blog-assets.mjs). -->
  <section id="blog-articles" class="relative overflow-hidden bg-[#f3eee3] px-5 pb-[56px] pt-[32px] sm:px-8 D:h-[556px] D:p-0">
    <div class="relative mx-auto w-full max-w-[1100px] D:h-full D:max-w-[730px]">
      <div class="mb-[28px] flex flex-col gap-[18px] sm:flex-row sm:items-end sm:justify-between D:mb-0 D:block">
        <nav aria-label="Article categories" class="-mx-1 flex gap-[24px] overflow-x-auto border-b border-[#e3d8c6] px-1 D:contents">
{tab_html}
          <span class="absolute left-[61px] top-[50px] hidden h-px w-[28px] bg-[#a48a6f] D:block" aria-hidden="true"></span>
        </nav>
        <form role="search" class="relative flex items-center gap-[8px] border-b border-[#d9cdb9] pb-[8px] sm:w-[240px] D:absolute D:left-[538px] D:top-[30px] D:h-[19px] D:w-[134px] D:gap-[5px] D:pb-0">
          <svg class="size-[14px] shrink-0 text-[#6b5c4f] D:size-[8px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="5" cy="5" r="3.6"/><path d="M8 8l3 3"/></svg>
          <label class="sr-only" for="q">Search articles</label>
          <input id="q" type="search" placeholder="Search articles..." class="w-full min-w-0 border-0 bg-transparent p-0 {JOST} text-[14px] text-[#2f221c] outline-none placeholder:text-[#7d776f] D:text-[7.6px]">
        </form>
      </div>
      <ul class="m-0 grid list-none grid-cols-1 gap-x-[20px] gap-y-[36px] p-0 sm:grid-cols-2 D:absolute D:inset-0 D:block">
{chr(10).join(lis)}
      </ul>
    </div>
  </section>
'''

# ---- newsletter -------------------------------------------------------------
newsletter = f'''
  <!-- SECTION: blog-newsletter  (reference: refs/blog-newsletter.png) -->
  <section id="blog-newsletter" class="relative isolate overflow-hidden bg-[#1a0d05] text-white D:h-[116px]">
    <img src="assets/blog-newsletter-bg.png" alt="" class="absolute inset-0 -z-10 size-full object-cover object-[70%_center]">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,8,3,.72)_0%,rgba(15,8,3,.55)_100%)] D:hidden"></div>
    <div class="relative mx-auto w-full max-w-[1100px] px-6 py-[48px] sm:px-10 D:h-full D:max-w-[730px] D:p-0">
      <div class="D:absolute D:left-[63px] D:top-[13px]">
        <p class="m-0 text-[10px] leading-[12px] tracking-[0.2em] text-[#d3a86f] D:text-[4.6px] D:leading-[6px] D:tracking-[0.18em]">STAY INSPIRED</p>
        <h2 class="m-0 mt-[12px] {SERIF} text-[clamp(28px,8vw,40px)] font-normal leading-[1.15] text-[#f7f1e6] D:mt-[8px] D:text-[17px] D:leading-[18px]">Get our latest stories<br class="hidden D:inline"> in your inbox</h2>
        <p class="m-0 mt-[14px] max-w-[34ch] text-[14px] font-light leading-[22px] text-[#f0e8da] D:mt-[9px] D:max-w-none D:text-[7.5px] D:leading-[14px]">Be the first to receive new articles, travel tips<br class="hidden D:inline"> and exclusive experiences.</p>
      </div>
      <form class="mt-[28px] flex h-[52px] items-center rounded-full border border-white/60 bg-black/20 pl-[20px] pr-[6px] D:absolute D:left-[463px] D:top-[51px] D:mt-0 D:h-[27px] D:w-[210px] D:pl-[16px] D:pr-[5px]">
        <label class="sr-only" for="email">Email address</label>
        <input id="email" type="email" placeholder="Your email address" class="w-full min-w-0 border-0 bg-transparent p-0 {JOST} text-[14px] text-white outline-none placeholder:text-white/75 D:text-[6px]">
        <button type="submit" aria-label="Subscribe" class="grid size-[40px] shrink-0 place-items-center rounded-full bg-white text-[#3b2f27] transition-colors hover:bg-[#f0e6d6] D:size-[18px]">
          <svg class="size-[14px] D:size-[6px]" viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M2.5 1l3 3-3 3"/></svg>
        </button>
      </form>
    </div>
  </section>
'''

# ---- footer -----------------------------------------------------------------
foot_nav = [("HOME", 238), ("ABOUT US", 270), ("SERVICES", 313), ("EXPERIENCES", 354), ("BLOG", 404), ("CONTACT", 436)]
foot_nav_html = "\n".join(
    f'          <a href="#blog-hero" class="D:absolute D:top-[24.5px] D:left-[{x}px]">{t}</a>' for t, x in foot_nav)
footer = f'''
  <!-- SECTION: blog-footer  (reference: refs/blog-footer.png) -->
  <footer id="blog-footer" class="relative bg-[#f3eee3] px-6 py-[36px] text-[#3b2f27] sm:px-10 D:h-[51px] D:p-0">
    <div class="relative mx-auto flex w-full max-w-[1100px] flex-col items-center gap-[22px] text-center D:block D:h-full D:max-w-[730px] D:text-left">
      <a href="index.html" class="block whitespace-nowrap D:absolute D:left-[63px] D:top-[19px]">
        <span class="block {SERIF} text-[18px] font-semibold leading-[20px] tracking-[0.1em] D:text-[8.1px] D:leading-[10px]">ALIYAH PRESTIGE</span>
        <span class="mt-[4px] block text-[8px] leading-[10px] tracking-[0.14em] text-[#6b5c4f] D:mt-[2px] D:text-[3.9px] D:leading-[5px] D:tracking-[0.18em]">PRIVATE CONCIERGE MARRAKECH</span>
      </a>
      <nav aria-label="Footer" class="flex flex-wrap justify-center gap-x-[22px] gap-y-[10px] {JOST} text-[11px] leading-[14px] tracking-[0.1em] text-[#6b5c4f] D:contents D:text-[4.5px] D:leading-[6px]">
{foot_nav_html}
      </nav>
      <div class="flex items-center gap-[18px] {JOST} text-[10px] tracking-[0.12em] text-[#6b5c4f] D:absolute D:left-[545px] D:top-[21.5px] D:gap-[0px] D:text-[4.4px]">
        <span class="D:w-[85px]">MARRAKECH · SINCE 1986</span>
        <span class="flex items-center gap-[16px] text-[#3b2f27] D:contents">
          <a href="#blog-footer" aria-label="Instagram" class="D:absolute D:left-[87px] D:top-[1px]"><svg class="size-[16px] D:size-[7px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="1.5" y="1.5" width="9" height="9" rx="2.5"/><circle cx="6" cy="6" r="2.1"/><circle cx="8.6" cy="3.4" r=".4" fill="currentColor"/></svg></a>
          <a href="#blog-footer" aria-label="LinkedIn" class="D:absolute D:left-[104px] D:top-[1px]"><svg class="size-[16px] D:size-[7px]" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="1.5" y="4.5" width="2" height="6.5"/><circle cx="2.5" cy="2.4" r="1.2"/><path d="M5.2 4.5h1.9v.9c.4-.7 1.1-1.1 2-1.1 1.7 0 2.2 1.1 2.2 2.6V11h-2V7.6c0-.7-.2-1.2-.9-1.2s-1.2.5-1.2 1.3V11h-2z"/></svg></a>
          <a href="#blog-footer" aria-label="Search" class="D:absolute D:left-[121px] D:top-[1px]"><svg class="size-[16px] D:size-[7px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="7.4" cy="4.6" r="3"/><path d="M5.2 6.8 1.5 10.5"/></svg></a>
        </span>
      </div>
    </div>
  </footer>
'''

out = (HEAD + hero + articles + newsletter + footer + '\n</body>\n</html>\n').replace('D:', 'jn:')


def conv(m):
    v = float(m.group(1)) / 16
    return (('%.5f' % v).rstrip('0').rstrip('.') or '0') + 'rem'


head, body = out.split('<body', 1)
body = re.sub(r'(?<![\w.])(\d+(?:\.\d+)?)px', conv, body)
open('blog.html', 'w', encoding='utf-8').write(head + '<body' + body)
print('blog.html written')
