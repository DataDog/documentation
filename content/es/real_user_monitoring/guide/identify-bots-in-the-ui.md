---
algolia:
  tags:
  - robots
description: Identifica las solicitudes RUM entrantes.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Más información sobre el Explorador RUM
title: Identificar robots en el Explorador RUM
---

## Información general

Para distinguir entre la actividad real del usuario y la actividad Synthetic, puedes encontrar vistas de robot en [RUM y Session Replay][1].

## Filtrar por tipo de dispositivo

En el [Explorador RUM][2], selecciona **Vistas** en el menú desplegable e introduce `@device.type:Bot` en la consulta de búsqueda.

{{< img src="real_user_monitoring/guide/identify-bots/rum-explorer-bot-views-1.png" alt="Filtro de vistas actualizado y consulta de búsqueda especificada en el Explorador RUM" style="width:100%" >}}

Busca en la lista de vistas y haz clic en un evento de vista para abrir el panel lateral **Vista**. Haz clic en la pestaña **Atributos** para validar el robot en el campo **Nombre del navegador** en **Sesión**.

## Filtrar sesiones de robots durante la admisión

Para filtrar las sesiones de robots, puedes definir condicionalmente un `sessionSampleRate` de `0` para las sesiones de robots, comprobando el `user-agent` con una [lista de robots conocidos][3] cuando la aplicación inicializa el SDK del Navegador RUM.

Por ejemplo, este script de ejemplo utiliza un lista de robots conocidos para filtrar las sesiones con robots:

{{< code-block lang="java" disable_copy="false" collapsible="true" >}}
// patrones de expresiones regulares para identificar instancias de robot conocidas:
let botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";

let regex = new RegExp(botPattern, 'i');

// define la variable conditionalSampleRate en 0 si el Agent usuario coincide con un patrón en botPatterns
// si no, define conditionalSampleRate en 100
deja conditionalSampleRate = regex.test(navigator.userAgent) ? 0 : 100

// inicializa el SDK del Navegador RUM y define sessionSampleRate como conditionalSampleRate
datadogRum.init({
 // ... opciones de configuración
  sessionSampleRate: conditionalSampleRate,
});
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/
[2]: https://app.datadoghq.com/rum/explorer
[3]: https://github.com/monperrus/crawler-user-agents