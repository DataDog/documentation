---
algolia:
  tags:
  - bots
description: Identifier les requêtes RUM entrantes
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
kind: guide
title: Identifier les bots dans le RUM Explorer
---

## Présentation

Pour faire la distinction entre l'activité réelle de l'utilisateur et l'activité synthétique, des vues de bot sont disponibles dans [RUM et Session Replay][1].

## Filtrer par type d'appareil

Dans le [RUM Explorer][2], sélectionnez **Views** dans le menu déroulant et saisissez `@device.type:Bot` dans la requête de recherche.

{{< img src="real_user_monitoring/guide/identify-bots/rum-explorer-bot-views-1.png" alt="Filtre View mis à jour et requête de recherche spécifiée dans le RUM Explorer" style="width:100%" >}}

Parcourez la liste des vues et cliquez sur un événement de vue pour ouvrir le volet latéral **View**. Cliquez sur lʼonglet **Attributes** pour valider le bot dans le champ **Browser Name** , sous **Session**.

## Exclure les sessions de bots à l'admission

Pour exclure les sessions de bots, vous pouvez définir un `sessionSampleRate` de `0` pour les sessions de bots en comparant le `user-agent` avec une [liste de bots connus][3] lorsque l'application initialise le SDK du Browser RUM.

Par exemple, ce type de script utilise une liste de bots connus pour exclure les sessions avec des bots :

{{< code-block lang="java" disable_copy="false" collapsible="true" >}}
// regex patterns to identify known bot instances:
let botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";

let regex = new RegExp(botPattern, 'i');

// réglez var conditionalSampleRate sur 0 si lʼuserAgent correspond à un pattern dans botPatterns
// autrement, définissez conditionalSampleRate sur 100
let conditionalSampleRate = regex.test(navigator.userAgent) ? 0 : 100

// initialisez le SDK du Browser RUM et définissez sessionSampleRate sur conditionalSampleRate
datadogRum.init({
 // ... config options
  sessionSampleRate: conditionalSampleRate,
});
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/
[2]: https://app.datadoghq.com/rum/explorer
[3]: https://github.com/monperrus/crawler-user-agents