# Shardots

Landing estática en HTML, CSS y JavaScript, sin dependencias ni compilación. Abrir `index.html` o servir la carpeta con cualquier servidor estático.

## Contenido

- Estética inspirada en DRPulse: carbón, violeta, marfil y dorado, tipografía compacta y bordes clásicos.
- Galería con ampliación accesible, probador de puntos de combo, instalación y preguntas frecuentes.
- Cinco capturas WebP seleccionadas de los archivos originales. `dots-.png` y `square-combo.png` representan la misma captura; se conserva una sola versión.
- Textos basados en la ficha oficial de Shardot, consultada el 19/10/2026: https://www.curseforge.com/wow/addons/shardot-soul-shards-combo-points
- El nombre de la web es Shardots; el nombre oficial del addon y sus comandos son Shardot y `/shardot` o `/sd`.

## SEO al publicar

La página incluye título, descripción, HTML semántico en español, textos alternativos, Open Graph, Twitter Card, robots y datos estructurados SoftwareApplication sin reseñas inventadas.

Cuando se confirme el dominio definitivo:

1. Agregar el enlace `canonical` y `og:url` con la URL pública real.
2. Convertir `og:image` y `twitter:image` a URLs absolutas del dominio.
3. Crear `sitemap.xml` con la URL canónica y agregar su dirección a `robots.txt`.
4. Registrar el dominio en Search Console y enviar el sitemap.

No se usa un dominio de ejemplo en metadatos para evitar indexar una dirección incorrecta. No se incluyen analítica, cookies, fuentes externas ni scripts de terceros.

## Identidad visual

Logos originales de Shardot optimizados en WebP para cabecera, portada y redes. Favicon PNG derivado del logo. La sección de DRPulse enlaza a su web y conserva el azul propio de esa marca.

## Idiomas y donaciones

Inglés predeterminado; español, alemán, francés y portugués seleccionables. Se recuerda la preferencia localmente y se admite `?lang=es|de|fr|pt|en`. El HTML base está en inglés, incluso sin JavaScript. `translations.json` contiene las traducciones; `i18n.js` incluye los datos y `locale-runtime.js` para funcionar sin peticiones adicionales. Tras editar traducciones o runtime, regenerar `i18n.js` concatenando la declaración `const translationRows = ...;` con el runtime. Los controles dinámicos usan `window.shardotI18n.t`.

Apoyo voluntario al desarrollo: https://paypal.me/sebiten. No se procesa ningún pago dentro del sitio.
