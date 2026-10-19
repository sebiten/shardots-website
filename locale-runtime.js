// Keep this runtime after translationRows in i18n.js. No network requests are needed.
(() => {
  const indices = { es: 0, en: 1, de: 2, fr: 3, pt: 4 };
  const locales = { es: 'es_AR', en: 'en_US', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };
  const dictionary = new Map();
  translationRows.forEach((row) => { dictionary.set(row[0], row); dictionary.set(row[1], row); });
  let language = 'en';
  const selector = document.querySelector('#language-select');
  const translate = (key) => dictionary.get(key)?.[indices[language]] ?? key;
  const textEntries = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, select')) continue;
    const key = node.textContent.trim();
    if (dictionary.has(key)) textEntries.push({ node, key, original: node.textContent });
  }
  const attributeEntries = [];
  document.querySelectorAll('[alt], [aria-label]').forEach((element) => {
    for (const name of ['alt', 'aria-label']) {
      const key = element.getAttribute(name);
      if (dictionary.has(key)) attributeEntries.push({ element, name, key });
    }
  });
  const titleKey = 'Shardots | Soul Shards & Combo Points for WoW Forever';
  const descriptionKey = translationRows.find((row) => row[1].startsWith('Discover Shardot,'))[1];
  const imageAltKey = 'Shardot logo in purple, ivory and gold';
  const schemaElement = document.querySelector('script[type="application/ld+json"]');
  const schema = JSON.parse(schemaElement.textContent);
  function applyLanguage(next, persist = false) {
    language = Object.hasOwn(indices, next) ? next : 'en';
    document.documentElement.lang = language;
    selector.value = language;
    textEntries.forEach(({ node, key, original }) => { node.textContent = original.replace(key, translate(key)); });
    attributeEntries.forEach(({ element, name, key }) => element.setAttribute(name, translate(key)));
    document.title = translate(titleKey);
    for (const name of ['description', 'og:description', 'twitter:description']) {
      document.querySelector(`meta[name="${name}"], meta[property="${name}"]`).content = translate(descriptionKey);
    }
    for (const name of ['og:title', 'twitter:title']) {
      document.querySelector(`meta[name="${name}"], meta[property="${name}"]`).content = translate(titleKey);
    }
    document.querySelector('meta[property="og:locale"]').content = locales[language];
    document.querySelector('meta[property="og:image:alt"]').content = translate(imageAltKey);
    schema.description = translate(descriptionKey);
    schemaElement.textContent = JSON.stringify(schema);
    if (persist) {
      try { localStorage.setItem('shardot-language', language); } catch { /* Storage may be unavailable. */ }
      try {
        const url = new URL(window.location.href);
        if (language === 'en') url.searchParams.delete('lang');
        else url.searchParams.set('lang', language);
        history.replaceState(null, '', url);
      } catch { /* Local files may not support history updates. */ }
    }
    window.dispatchEvent(new Event('languagechange'));
  }
  window.shardotI18n = { t: translate };
  selector.addEventListener('change', () => applyLanguage(selector.value, true));
  let saved;
  try { saved = localStorage.getItem('shardot-language'); } catch { /* Default to English. */ }
  applyLanguage(new URLSearchParams(window.location.search).get('lang') || saved || 'en');
})();
