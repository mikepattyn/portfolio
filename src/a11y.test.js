import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { en } from './i18n/en.js';
import { nl } from './i18n/nl.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rabbit = readFileSync(join(root, 'rabbithole.html'), 'utf8');
const workflows = readFileSync(join(root, 'workflows.html'), 'utf8');
const thanksPath = join(root, 'thanks.html');
const thanks = existsSync(thanksPath) ? readFileSync(thanksPath, 'utf8') : '';
const classicCss = readFileSync(join(root, 'src/styles.classic.css'), 'utf8');
const stitchCss = readFileSync(join(root, 'src/styles.stitch.css'), 'utf8');
const skinCss = readFileSync(join(root, 'src/styles.skin.css'), 'utf8');
const shader = readFileSync(join(root, 'src/shader.js'), 'utf8');
const css = `${classicCss}\n${stitchCss}\n${skinCss}`;

function count(html, pattern) {
  return (html.match(pattern) ?? []).length;
}

function navHrefs(html) {
  const nav = html.match(/<nav\b[\s\S]*?\bid="site-nav-menu"[\s\S]*?<\/nav>/);
  assert.ok(nav, 'primary nav landmark is present');
  return [...nav[0].matchAll(/href="([^"]+)"/g)].map((match) => match[1].replace(/^\//, ''));
}

function footerBlock(html) {
  const match = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/);
  assert.ok(match, 'footer landmark is present');
  return match[0];
}

function assertSlimFooter(html) {
  const footer = footerBlock(html);
  assert.match(footer, /class="site-footer__brand"/);
  assert.match(footer, /data-i18n-aria="footer\.ariaLabel"/);
  assert.match(footer, /href="mailto:info@mikepattyn\.nl"/);
  assert.match(footer, /linkedin\.com\/in\/mike-pattyn-033681103/);
  assert.match(footer, /href="\/cv\.html"/);
  assert.match(footer, /data-i18n="footer\.cv"/);
  assert.doesNotMatch(footer, /framer\.website/);
  assert.match(footer, /href="\/thanks\.html"/);
  assert.match(footer, /data-i18n="nav\.thanks"/);
  assert.equal(count(footer, /data-skin-toggle/g), 1);
  assert.match(footer, /data-i18n="footer\.skinToStitch"/);
  assert.match(footer, /data-i18n-aria="footer\.skinAria"/);
  assert.doesNotMatch(footer, /data-i18n="footer\.thanks"/);
  assert.doesNotMatch(footer, /data-i18n="footer\.thanksEyebrow"/);
  assert.doesNotMatch(footer, /data-i18n-aria="footer\.partnersAria"/);
  assert.doesNotMatch(footer, /data-i18n="footer\.platform"/);
  assert.doesNotMatch(footer, /data-i18n="footer\.madeWith"/);
  assert.doesNotMatch(footer, /SETTL/);
}

function articleById(html, id) {
  const match = html.match(new RegExp(`<article\\b[^>]*\\bid="${id}"[\\s\\S]*?</article>`));
  assert.ok(match, `article #${id} is present`);
  return match[0];
}

describe.skip('Portfolio home (replaced by V03 React)', () => {
  test('has a single page-level h1 that the skip link targets', () => {
    assert.equal(count(home, /<h1\b/g), 1);
    assert.match(home, /href="#hero-headline"/);
    assert.match(home, /id="hero-headline"[^>]*tabindex="-1"/);
    assert.match(home, /data-i18n="skip\.toContent"/);
  });

  test('exposes header, primary nav, main, and footer landmarks', () => {
    assert.match(home, /<header class="site-nav"/);
    assert.match(home, /<nav\b[\s\S]*?\bid="site-nav-menu"[\s\S]*?\baria-label="Primary"/);
    assert.match(home, /<main id="top"/);
    assert.match(home, /<footer class="site-footer"/);
    assert.match(home, /data-i18n-aria="footer\.ariaLabel"/);
  });

  test('keeps a slim SiteFooter and leaves SETTL thanks off the home page', () => {
    assertSlimFooter(home);
    assert.doesNotMatch(home, /teams-coda|teams-partners|data-i18n="teams\.thanks"/);
    const teams = home.match(/<section\b[^>]*\bid="teams"[\s\S]*?<\/section>/);
    assert.ok(teams, 'Companies section is present');
    assert.doesNotMatch(teams[0], /SETTL/);
    assert.doesNotMatch(teams[0], /authress\.io/);
    assert.doesNotMatch(home, /SETTL/);
  });

  test('names the menu toggle before JavaScript runs', () => {
    assert.match(home, /aria-controls="site-nav-menu"/);
    assert.match(home, /aria-expanded="false"/);
    assert.match(home, /aria-label="Open menu"/);
    assert.match(home, /data-i18n-aria="nav\.openMenu"/);
  });

  test('leaves Under the Hood on its own page and still points at it', () => {
    assert.doesNotMatch(home, /id="single-table"/);
    assert.doesNotMatch(home, /id="agent-skills"/);
    assert.doesNotMatch(home, /id="publish-here"/);
    assert.match(home, /href="\/underhood.html"/);
    assert.match(home, /href="\/underhood.html#single-table"/);
    assert.match(home, /href="\/underhood.html#publish-here"/);
    assert.match(home, /'under-the-hood': '\/underhood.html'/);
    assert.match(home, /'agent-skills': '\/underhood.html#agent-skills'/);
  });

  test('promotes companies and specialists to top-level sections, with mentor names as h3', () => {
    assert.equal(count(home, /<h2\b/g), 6);
    assert.match(home, /<h2 id="teams-title"/);
    assert.match(home, /<h2 id="specialists-title"/);
    assert.equal(count(home, /<h3 class="mentor__heading/g), 4);
    assert.match(home, /id="teams"/);
    assert.match(home, /id="toolkit"/);
    assert.match(home, /id="specialists"/);
    assert.match(home, /id="authress"/);
    assert.match(home, /id="anthony"/);
    assert.ok(home.indexOf('id="teams"') < home.indexOf('id="toolkit"'));
    assert.ok(home.indexOf('id="toolkit"') < home.indexOf('id="specialists"'));
    assert.match(home, /data-toolkit-banner/);
    assert.match(home, /data-i18n-aria="toolkit\.ariaLabel"/);
    assert.match(home, /src="\/images\/logos\/aws\.svg"/);
    assert.match(home, /src="\/images\/logos\/authress\.svg"/);
    assert.match(home, /src="\/images\/logos\/discord\.svg"/);
    assert.match(home, /src="\/images\/logos\/slack\.svg"/);
    assert.match(home, /src="\/images\/logos\/cursor\.svg"/);
    assert.doesNotMatch(home, /id="back"/);
    assert.doesNotMatch(home, /href="#back"/);
  });

  test('contact form has labels, live status, and a hidden honeypot', () => {
    assert.match(home, /<form[\s\S]*?class="contact-form"[\s\S]*?id="contact-form"/);
    assert.match(home, /aria-describedby="contact-form-status"/);
    assert.match(home, /autocomplete="email"/);
    assert.match(home, /<textarea name="message"[^>]*required/);
    assert.match(home, /data-i18n="contact\.form\.email"/);
    assert.match(home, /\(required\)/);
    assert.match(
      home,
      /id="contact-form-status"[^>]*role="status"[^>]*aria-live="polite"[^>]*tabindex="-1"/,
    );
    assert.match(home, /data-i18n-aria="contact\.form\.turnstileAria"/);
    assert.match(home, /name="_honey"[^>]*tabindex="-1"[^>]*aria-hidden="true"/);
  });
});

describe.skip('Under the hood (replaced by V03 React)', () => {
  test('has a single page-level h1 that the skip link targets', () => {
    assert.equal(count(underhood, /<h1\b/g), 1);
    assert.match(underhood, /href="#underhood-title"/);
    assert.match(underhood, /id="underhood-title"[^>]*tabindex="-1"/);
    assert.match(underhood, /data-i18n="skip\.toContent"/);
  });

  test('exposes header, primary nav, main, and footer landmarks', () => {
    assert.match(underhood, /<header class="site-nav"/);
    assert.match(underhood, /<nav\b[\s\S]*?\bid="site-nav-menu"[\s\S]*?\baria-label="Primary"/);
    assert.match(underhood, /<main id="top"/);
    assert.match(underhood, /<footer class="site-footer"/);
    assert.match(underhood, /data-i18n-aria="footer\.ariaLabel"/);
    assertSlimFooter(underhood);
  });

  test('marks the current page and keeps the same primary nav items as home', () => {
    assert.match(underhood, /href="\/underhood.html" aria-current="page"/);
    assert.deepEqual(navHrefs(rabbit), navHrefs(underhood));
  });

  test('names the quality orchestrators group and links to the workflows page', () => {
    assert.match(underhood, /aria-labelledby="skill-group-orchestrators"/);
    assert.match(underhood, /id="skill-group-orchestrators"/);
    assert.match(underhood, /href="\/workflows.html"/);
  });

  test('uses a native key-shape table with caption and headers', () => {
    const article = articleById(underhood, 'single-table');
    assert.match(article, /<table class="key-example__table"/);
    assert.match(article, /<caption data-i18n="underhood\.figureCaption"/);
    assert.equal(count(article, /scope="col"/g), 2);
    assert.equal(count(article, /scope="row"/g), 3);
    assert.doesNotMatch(underhood, /role="table"/);
  });

  test('names the publish-here topic in the underhood nav and heading', () => {
    assert.match(underhood, /href="#publish-here"/);
    assert.match(underhood, /id="publish-here"[^>]*aria-labelledby="publish-here-title"/);
    const article = articleById(underhood, 'publish-here');
    assert.match(article, /<h2[^>]*id="publish-here-title"/);
    assert.match(article, /<table class="key-example__table"/);
    assert.match(article, /<caption data-i18n="underhood\.publishHere\.figureCaption"/);
    assert.doesNotMatch(article, /key-example--wide/);
    assert.equal(count(article, /scope="col"/g), 3);
    assert.equal(count(article, /scope="row"/g), 2);
    assert.match(article, /data-i18n="underhood\.publishHere\.figureSource"/);
    assert.match(article, /data-i18n="underhood\.publishHere\.figureRegistry"/);
    assert.doesNotMatch(article, /figureRemote/);
    assert.match(article, /github.com\/mikepattyn\/authress-angular/);
    assert.match(article, /github.com\/mikepattyn\/authress-flutter/);
    assert.match(article, /npmjs.com\/package\/@mikepattyn\/authress-angular/);
    assert.match(article, /pub.dev\/packages\/mikepattyn_authress_login/);
  });
});

describe('Rabbit hole', () => {
  test('has a single page-level h1 that the skip link targets', () => {
    assert.equal(count(rabbit, /<h1\b/g), 1);
    assert.match(rabbit, /href="#echo-title"/);
    assert.match(rabbit, /id="echo-title"[^>]*tabindex="-1"/);
    assert.match(rabbit, /data-i18n="skip\.toContent"/);
  });

  test('exposes header, primary nav, main, and footer landmarks', () => {
    assert.match(rabbit, /<header class="site-nav"/);
    assert.match(rabbit, /<nav\b[\s\S]*?\bid="site-nav-menu"[\s\S]*?\baria-label="Primary"/);
    assert.match(rabbit, /<main id="top"/);
    assert.match(rabbit, /<footer class="site-footer"/);
    assert.match(rabbit, /data-i18n-aria="footer\.ariaLabel"/);
    assertSlimFooter(rabbit);
  });

  test('marks the current page and keeps the same primary nav items as home', () => {
    assert.match(rabbit, /href="\/rabbithole.html" aria-current="page"/);
    assert.doesNotMatch(rabbit, /data-i18n="echo\.elon/);
    assert.doesNotMatch(rabbit, /data-i18n="echo\.hurting/);
    assert.doesNotMatch(rabbit, /data-i18n="echo\.trust/);
    assert.deepEqual(navHrefs(rabbit), navHrefs(rabbit));
    assert.ok(navHrefs(rabbit).includes('thanks.html'));
    assert.ok(!navHrefs(rabbit).some((href) => href.includes('#back')));
    const thanksIndex = navHrefs(rabbit).indexOf('thanks.html');
    const contactIndex = navHrefs(rabbit).findIndex((href) => href.includes('contact'));
    assert.ok(thanksIndex !== -1 && contactIndex === thanksIndex + 1);
  });
});

describe('Workflows', () => {
  test('has a single page-level h1 that the skip link targets', () => {
    assert.equal(count(workflows, /<h1\b/g), 1);
    assert.match(workflows, /href="#workflows-title"/);
    assert.match(workflows, /id="workflows-title"[^>]*tabindex="-1"/);
    assert.match(workflows, /data-i18n="skip\.toContent"/);
  });

  test('exposes header, primary nav, main, and footer landmarks', () => {
    assert.match(workflows, /<header class="site-nav"/);
    assert.match(workflows, /<nav\b[\s\S]*?\bid="site-nav-menu"[\s\S]*?\baria-label="Primary"/);
    assert.match(workflows, /<main id="top"/);
    assert.match(workflows, /<footer class="site-footer"/);
    assert.match(workflows, /data-i18n-aria="footer\.ariaLabel"/);
    assertSlimFooter(workflows);
  });

  test('uses a native waves table with caption and headers', () => {
    assert.match(workflows, /<table class="key-example__table"/);
    assert.match(workflows, /<caption data-i18n="workflows\.waves\.caption"/);
    assert.equal(count(workflows, /scope="col"/g), 3);
    assert.equal(count(workflows, /scope="row"/g), 4);
    assert.doesNotMatch(workflows, /role="table"/);
  });

  test('keeps the same primary nav items as home and stays out of that nav', () => {
    assert.ok(!navHrefs(workflows).some((href) => href.includes('workflows.html')));
    assert.deepEqual(navHrefs(rabbit), navHrefs(workflows));
  });
});

describe('Thanks page', () => {
  test('has a single page-level h1 that the skip link targets', () => {
    assert.equal(count(thanks, /<h1\b/g), 1);
    assert.match(thanks, /href="#thanks-title"/);
    assert.match(thanks, /id="thanks-title"[^>]*tabindex="-1"/);
    assert.match(thanks, /data-i18n="skip\.toContent"/);
  });

  test('exposes header, primary nav, main, and footer landmarks', () => {
    assert.match(thanks, /<header class="site-nav"/);
    assert.match(thanks, /<nav\b[\s\S]*?\bid="site-nav-menu"[\s\S]*?\baria-label="Primary"/);
    assert.match(thanks, /<main id="top"/);
    assert.match(thanks, /<footer class="site-footer"/);
    assertSlimFooter(thanks);
  });

  test('marks Thanks as the current page and keeps the same primary nav as home', () => {
    assert.match(thanks, /href="\/thanks\.html" aria-current="page"/);
    assert.deepEqual(navHrefs(rabbit), navHrefs(thanks));
  });

  test('owns the SETTL house story and logos, not the footer', () => {
    assert.match(thanks, /id="house"/);
    assert.match(thanks, /data-i18n="thanks\.house\.body"/);
    assert.match(thanks, /data-i18n-aria="thanks\.house\.partnersAria"/);
    assert.match(thanks, /src="\/images\/logos\/settl\.png"/);
    assert.match(thanks, /src="\/images\/logos\/financieel-fit\.svg"/);
    assert.match(thanks, /href="https:\/\/settl\.today"/);
    assert.match(thanks, /href="https:\/\/www\.financieelfit\.nl"/);
    assert.doesNotMatch(footerBlock(thanks), /SETTL/);
  });

  test('lists Cursor, Fork, and Grok Bot as equal tools', () => {
    assert.match(thanks, /id="tools"/);
    assert.match(thanks, /data-i18n="thanks\.tools\.lede"/);
    assert.match(thanks, /data-i18n="thanks\.tools\.cursor\.name"/);
    assert.match(thanks, /data-i18n="thanks\.tools\.fork\.name"/);
    assert.match(thanks, /data-i18n="thanks\.tools\.grok\.name"/);
    assert.match(thanks, /href="https:\/\/cursor\.com"/);
    assert.match(thanks, /href="https:\/\/git-fork\.com"/);
    assert.match(thanks, /href="https:\/\/x\.ai"/);
  });
});

describe.skip('CV page (replaced by V03 React)', () => {
  test('has a single page-level h1 that the skip link targets', () => {
    assert.equal(count(cv, /<h1\b/g), 1);
    assert.match(cv, /href="#cv-title"/);
    assert.match(cv, /id="cv-title"[^>]*tabindex="-1"/);
    assert.match(cv, /data-i18n="skip\.toContent"/);
  });

  test('exposes header, primary nav, main, and footer landmarks', () => {
    assert.match(cv, /<header class="site-nav"/);
    assert.match(cv, /<nav\b[\s\S]*?\bid="site-nav-menu"[\s\S]*?\baria-label="Primary"/);
    assert.match(cv, /<main id="top"/);
    assert.match(cv, /<footer class="site-footer"/);
    assertSlimFooter(cv);
  });

  test('marks the footer CV as current and stays out of the primary nav', () => {
    assert.match(cv, /href="\/cv\.html" aria-current="page"/);
    assert.ok(!navHrefs(cv).some((href) => href.includes('cv.html')));
    assert.deepEqual(navHrefs(rabbit), navHrefs(cv));
    assert.doesNotMatch(cv, /github\.com/);
    assert.doesNotMatch(cv, /06 26|1989|date of birth/i);
  });
});

describe('Shared shell', () => {
  test('sets document language before the module bundle loads', () => {
    const boot = /document\.documentElement\.lang/;
    assert.match(rabbit, boot);
    assert.match(workflows, boot);
    assert.match(thanks, boot);
  });

  test('shows scrolled-off reveals when they receive keyboard focus', () => {
    assert.match(css, /html\.js \.reveal:focus-within/);
  });

  test('loads classic and Electric Emerald type, and hides decorative shader chrome', () => {
    assert.match(rabbit, /Newsreader/);
    assert.match(rabbit, /Bricolage\+Grotesque/);
    assert.match(rabbit, /JetBrains\+Mono/);
    assert.match(rabbit, /Material\+Symbols\+Outlined/);
    assert.doesNotMatch(rabbit, /Hanken\+Grotesk/);
    assert.match(classicCss, /--font-body:\s*'Newsreader'/);
    assert.match(stitchCss, /--font-display:\s*'JetBrains Mono'/);
    assert.match(stitchCss, /--neon-glow:\s*#ccff00/i);
    assert.match(stitchCss, /\.contact-form__label[\s\S]*?color:\s*var\(--on-surface\)/);
    assert.match(stitchCss, /\.section__lede--onDark[\s\S]*?color:\s*var\(--on-surface-variant\)/);
    assert.match(stitchCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.status-live__dot/);
    assert.match(classicCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.toolkit-banner__track/);
    assert.match(stitchCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.toolkit-banner__track/);
    assert.match(stitchCss, /\.site-shader/);
    assert.match(shader, /prefers-reduced-motion/);
    assert.match(shader, /document\.hidden/);
    assert.match(shader, /DPR_CAP/);
    assert.match(shader, /aria-hidden/);
    assert.match(shader, /setShaderEnabled/);
  });

  test('defaults to classic and keeps Electric Emerald chrome stitch-only', () => {
    for (const page of [rabbit, workflows, thanks]) {
      assert.match(page, /data-skin="classic"/);
      assert.match(page, /id="skin-classic"[^>]*\bdisabled/);
      assert.match(page, /id="skin-stitch"[^>]*\bdisabled/);
      assert.match(page, /classicSheet\.disabled = false/);
      assert.match(page, /localStorage\.getItem\('skin'\)/);
      assert.match(page, /class="site-cursor-chip"/);
      assert.match(page, /data-skin-only="stitch"/);
      assert.match(page, /data-i18n="hero\.builtWithCursor"/);
      assert.match(page, /class="hero__brand"/);
      assert.match(page, /data-skin-only="classic"/);
      assert.doesNotMatch(page, /hero__chip/);
      const header = page.match(/<header class="site-nav"[\s\S]*?<\/header>/);
      assert.ok(header, 'header is present');
      assert.doesNotMatch(header[0], /data-skin-toggle/);
    }
    assert.match(rabbit, /class="site-nav"/);
    assert.match(skinCss, /\[data-skin-only='stitch'\]/);
    assert.match(stitchCss, /\.site-cursor-chip[\s\S]*?position:\s*fixed/);
    assert.match(stitchCss, /\.hero__actions[\s\S]*?margin-top:\s*1\.25rem/);
  });
});

describe('Copy', () => {
  test('EN and NL both name the skip link and footer landmark', () => {
    assert.equal(typeof en.skip.toContent, 'string');
    assert.equal(typeof nl.skip.toContent, 'string');
    assert.equal(typeof en.footer.ariaLabel, 'string');
    assert.equal(typeof nl.footer.ariaLabel, 'string');
    assert.equal(typeof en.footer.skinToStitch, 'string');
    assert.equal(typeof nl.footer.skinToClassic, 'string');
    assert.equal(typeof en.footer.skinAria, 'string');
    assert.equal(typeof en.nav.thanks, 'string');
    assert.equal(typeof nl.nav.thanks, 'string');
    assert.equal(en.footer.thanks, undefined);
    assert.equal(nl.footer.thanks, undefined);
    assert.equal(en.footer.platform, undefined);
    assert.equal(en.footer.madeWith, undefined);
    assert.equal(typeof en.thanks.title, 'string');
    assert.equal(typeof nl.thanks.title, 'string');
    assert.match(en.thanks.house.body, /SETTL/);
    assert.match(nl.thanks.house.body, /SETTL/);
    assert.equal(typeof en.thanks.house.partnersAria, 'string');
    assert.equal(typeof en.thanks.tools.lede, 'string');
    assert.equal(typeof nl.thanks.tools.lede, 'string');
    assert.equal(typeof en.thanks.tools.cursor.name, 'string');
    assert.equal(typeof nl.thanks.tools.fork.why, 'string');
    assert.equal(typeof en.thanks.tools.grok.name, 'string');
    assert.match(en.thanks.tools.grok.name, /Grok/);
    assert.match(en.thanks.tools.fork.why, /Dan and Tanya/);
    assert.equal(typeof en.underhood.meta.title, 'string');
    assert.equal(typeof nl.underhood.meta.description, 'string');
    assert.equal(typeof en.underhood.ctaTopics, 'string');
    assert.equal(typeof nl.underhood.back, 'string');
    assert.equal(typeof en.underhood.figureProduct, 'string');
    assert.equal(typeof nl.underhood.figureKeys, 'string');
    assert.equal(typeof en.underhood.publishHere.nav, 'string');
    assert.equal(typeof nl.underhood.publishHere.title, 'string');
    assert.equal(typeof en.underhood.publishHere.p1.body, 'string');
    assert.equal(typeof nl.underhood.publishHere.source, 'string');
    assert.equal(typeof en.underhood.publishHere.figureRegistry, 'string');
    assert.equal(typeof nl.underhood.publishHere.figureSource, 'string');
    assert.equal(en.underhood.publishHere.figureRemote, undefined);
    assert.equal(en.underhood.publishHere.angularShip, undefined);
    assert.equal(en.teams.thanks, undefined);
    assert.equal(nl.teams.thanks, undefined);
    assert.equal(en.teams.authress, undefined);
    assert.equal(en.authress, undefined);
    assert.equal(typeof en.specialists.warren, 'string');
    assert.equal(typeof nl.specialists.lede, 'string');
    assert.match(en.specialists.anthony, /The Coding Base/);
    assert.match(en.specialists.anthony, /infrastructure in code/);
    assert.match(en.specialists.anthony, /single-table design/);
    assert.match(en.specialists.anthony, /AWS ecosystem/);
    assert.match(en.specialists.anthony, /low-cost/);
    assert.match(en.specialists.anthony, /Givt/);
    assert.match(en.specialists.warren, /While I never worked/);
    assert.match(en.specialists.warren, /his service/);
    assert.match(nl.specialists.warren, /Terwijl ik nooit/);
    assert.match(nl.specialists.warren, /zijn dienst/);
    assert.match(en.specialists.warren, /exactly what to say/);
    assert.match(nl.specialists.warren, /precies wat te zeggen/);
    assert.match(nl.specialists.anthony, /single-table design/);
    assert.match(nl.specialists.anthony, /AWS-ecosysteem/);
    assert.match(nl.specialists.anthony, /kosteneffectief/);
    assert.equal(typeof en.toolkit.ariaLabel, 'string');
    assert.equal(typeof nl.toolkit.ariaLabel, 'string');
    assert.match(nl.specialists.title, /Specialisten waarvan ik geleerd heb/);
    assert.doesNotMatch(en.specialists.anthony, /Maarten/);
    assert.doesNotMatch(en.specialists.anthony, /Barbershop|Gofish|Lumen/);
    assert.equal(typeof en.echo.specialists.p1, 'string');
    assert.match(en.echo.specialists.p1, /#specialists/);
    assert.doesNotMatch(en.echo.teams.p1, /Authress/);
    assert.equal(en.back, undefined);
    assert.equal(nl.back, undefined);
    assert.equal(typeof en.workflows.title, 'string');
    assert.equal(typeof nl.workflows.title, 'string');
    assert.match(en.contact.form.email, /required/);
    assert.match(nl.contact.form.email, /verplicht/);
    assert.equal(typeof en.contact.form.turnstileAria, 'string');
    assert.equal(typeof nl.contact.form.turnstileAria, 'string');
    assert.equal(en.hud.approach, nl.hud.approach);
    assert.equal(en.hud.footerLog, nl.hud.footerLog);
    assert.match(en.hud.approach, /^SYS\./);
    assert.equal(typeof en.hero.builtWithCursor, 'string');
    assert.equal(typeof nl.hero.builtWithCursor, 'string');
    assert.equal(typeof en.work.statusLive, 'string');
    assert.equal(typeof nl.work.statusLive, 'string');
    assert.equal(typeof en.work.statusLocal, 'string');
    assert.equal(typeof nl.work.statusLocal, 'string');
    assert.equal(typeof en.other.memries, 'string');
    assert.equal(typeof nl.other.memries, 'string');
    assert.match(en.other.memries, /photo library like it should be/);
    assert.match(en.other.memries, /neeohw/);
    assert.match(en.other.memries, /Maarten Vergouwe/);
    assert.match(en.other.memries, /https:\/\/github\.com\/neeohw\/memries/);
    assert.doesNotMatch(en.other.memries, /mikepattyn\/memries/);
    assert.match(nl.other.memries, /fotobibliotheek zoals die hoort te zijn/);
    assert.match(nl.other.memries, /https:\/\/github\.com\/neeohw\/memries/);
    assert.equal(typeof en.work.toolsTitle, 'string');
    assert.match(en.work.learn, /Grok/);
    assert.match(nl.work.learn, /Grok/);
    assert.match(en.work.learn, /learn\.mikepattyn\.nl/);
    assert.equal(typeof nl.work.lumenPrivacy, 'string');
    assert.equal(typeof en.cv.title, 'string');
    assert.equal(typeof nl.cv.lede, 'string');
    assert.match(en.cv.experience.givt.body, /€1/);
    assert.doesNotMatch(en.teams.givt, /€1/);
    assert.equal(en.echo.elon, undefined);
    assert.equal(en.echo.hurting, undefined);
    assert.equal(en.echo.trust, undefined);
    assert.equal(nl.echo.elon, undefined);
    assert.match(en.nav.mentors, /essay/);
    assert.doesNotMatch(en.hero.lede, /pieces in between/);
    assert.doesNotMatch(rabbit, /data-i18n="hero\.ctaCv"/);
  });
});

describe.skip('Work cards (replaced by V03 React)', () => {
  test('uses local Electric Emerald placeholders, not stitch CDN images', () => {
    assert.match(home, /src="\/images\/work\/barbershop\.png"/);
    assert.match(home, /src="\/images\/work\/flyingdarts\.png"/);
    assert.match(home, /src="\/images\/work\/gofish\.png"/);
    assert.match(home, /src="\/images\/work\/lumen\.png"/);
    assert.doesNotMatch(home, /src="\/images\/work\/dashboard\.png"/);
    assert.match(home, /data-i18n="work\.lumenPrivacy"/);
    assert.match(home, /data-i18n="work\.toolsTitle"/);
    assert.match(home, /src="\/images\/work\/viewports\.png"/);
    assert.match(home, /src="\/images\/work\/theming\.png"/);
    assert.match(home, /src="\/images\/work\/canvas\.png"/);
    assert.match(home, /src="\/images\/work\/memries\.png"/);
    assert.match(home, /data-i18n="other\.memries"/);
    assert.match(home, /https:\/\/github\.com\/neeohw\/memries/);
    assert.doesNotMatch(home, /github\.com\/mikepattyn\/memries/);
    assert.doesNotMatch(home, /lh3\.googleusercontent\.com/);
    assert.match(home, /class="status-live"/);
  });
});
