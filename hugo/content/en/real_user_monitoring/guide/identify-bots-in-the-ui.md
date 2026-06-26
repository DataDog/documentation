---
title: Identify Bots in the RUM Explorer

description: Identify incoming RUM requests.
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
algolia:
  tags: ['bots']
---

## Overview

To distinguish between real user activity and synthetic activity, you can find robot views in [RUM & Session Replay][1].

## Filter on device type

In the [RUM Explorer][2], select **Views** from the dropdown menu and enter `@device.type:Bot` in the search query.

{{< img src="real_user_monitoring/guide/identify-bots/rum-explorer-bot-views-1.png" alt="Updated View filter and specified search query in the RUM Explorer" style="width:100%" >}}

Search through the list of views and click on a view event to open the **View** side panel. Click on the **Attributes** tab to validate the bot in the **Browser Name** field under **Session**.

## Filter out bot sessions on intake

To filter out bot sessions, you can conditionally set a `sessionSampleRate` of `0` for bot sessions by checking the `user-agent` against a [list of known robots][3] when the application initializes the RUM Browser SDK.

For example, this example script uses a list of known robots to filter out sessions with robots:

{{< code-block lang="java" disable_copy="false" collapsible="true" >}}
// regex patterns to identify known bot instances:
let botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";

let regex = new RegExp(botPattern, 'i');

// define var conditionalSampleRate as 0 if the userAgent matches a pattern in botPatterns
// otherwise, define conditionalSampleRate as 100
let conditionalSampleRate = regex.test(navigator.userAgent) ? 0 : 100

// initialize the RUM Browser SDK and set sessionSampleRate to conditionalSampleRate
datadogRum.init({
 // ... config options
  sessionSampleRate: conditionalSampleRate,
});
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/
[2]: https://app.datadoghq.com/rum/explorer
[3]: https://github.com/monperrus/crawler-user-agents
