---
algolia:
  tags:
  - bots
description: 受信した RUM リクエストを識別します。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
title: RUM エクスプローラーでボットを識別する
---

## 概要

実際のユーザーアクティビティと Synthetic アクティビティを区別するために、[RUM & セッションリプレイ][1]でロボットビューを見つけることができます。

## デバイスの種類でフィルターをかける

[RUM エクスプローラー][2]で、ドロップダウンメニューから **Views** を選択し、検索クエリに `@device.type:Bot` を入力します。

{{< img src="real_user_monitoring/guide/identify-bots/rum-explorer-bot-views-1.png" alt="RUM エクスプローラーで更新されたビューフィルターと指定された検索クエリ" style="width:100%" >}}

ビューのリストを検索し、ビューイベントをクリックすると、**View** サイドパネルが表示されます。**Attributes** タブをクリックし、**Session** の下にある **Browser Name** フィールドでボットを検証します。

## 取り込み時のボットセッションをフィルターにかける

ボットセッションをフィルターするために、アプリケーションが RUM ブラウザ SDK を初期化するときに、`user-agent` を[既知のロボットリスト][3]に対してチェックすることによって、条件付きで `sessionSampleRate` を `0` に設定することが可能です。

例えば、このスクリプト例では、既知のロボットのリストを使用して、ロボットのいるセッションをフィルターしています。

{{< code-block lang="java" disable_copy="false" collapsible="true" >}}
// 既知のボットインスタンスを識別するための正規表現パターン:
let botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";

let regex = new RegExp(botPattern, 'i');

// userAgent が botPatterns のパターンにマッチする場合、var conditionalSampleRate を 0 として定義します
// それ以外の場合は、conditionalSampleRate を 100 と定義します
let conditionalSampleRate = regex.test(navigator.userAgent) ? 0 : 100

// RUM ブラウザ SDK を初期化し、sessionSampleRate を conditionalSampleRate に設定します
datadogRum.init({
 // ... 構成オプション
  sessionSampleRate: conditionalSampleRate,
});
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/
[2]: https://app.datadoghq.com/rum/explorer
[3]: https://github.com/monperrus/crawler-user-agents