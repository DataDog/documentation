---
algolia:
  tags:
  - 봇
description: 수신 RUM 요청 파악하기
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
kind: 가이드
title: RUM Explorer에서 봇 파악하기
---

## 개요

실제 사용자 활동과 가짜 활동을 구분하고 싶을 경우 [Rum & Session Replay][1]에서 로봇 보기를 찾으세요.

## 디바이스 유형으로 필터링

[RUM Explorer][2]의 드롭다운 메뉴에서 **Views**를 선택하고 검색 쿼리에 `@device.type:Bot`를 입력하세요.

{{< img src="real_user_monitoring/guide/identify-bots/rum-explorer-bot-views-1.png" alt="RUM Explorer의 업데이트된 보기 필터와 특정 검색 쿼리 기능" style="width:100%" >}}

보기 목록을 검토한 후 원하는 보기 이벤트를 클릭하면 **Views** 측면 패널이 열립니다. **Attributes** 탭을 클릭하고  **Session** 아래에 있는 **Browser Name** 필드에서 봇을 확인하세요.

## 수신 내역에서 봇 세션 필터링

봇 세션을 필터링하려면 애플리케이션에서 RUM Browser SDK를 초기 실행할 때 [알려진 로봇 목록][3]과 `user-agent`를 비교 확인하여 `sessionSampleRate`를 `0`으로 조건 설정할 수 있습니다. 

예를 들어 다음 스크립트에서는 알려진 로봇 목록을 사용해 로봇 세션을 필터링합니다.

{{< code-block lang="java" disable_copy="false" collapsible="true" >}}
// 알려진 봇 인스턴스와 일치하는 regex 패턴:
let botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";

let regex = new RegExp(botPattern, 'i');

//  userAgent가 botPatterns와 패턴이 일치하면 var conditionalSampleRate를 0으로 설정
// 그 외에는 conditionalSampleRate를 100으로 정의
let conditionalSampleRate = regex.test(navigator.userAgent) ? 0 : 100

// RUM Browser SDK를 초기 실행하고 sessionSampleRate를 conditionalSampleRate로 설정
datadogRum.init({
 // ... 설정 옵션
  sessionSampleRate: conditionalSampleRate,
});
{{< /code-block >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/
[2]: https://app.datadoghq.com/rum/explorer
[3]: https://github.com/monperrus/crawler-user-agents