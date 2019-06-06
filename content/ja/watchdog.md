---
title: Watchdog
kind: Documentation
description: アプリケーションとインフラストラクチャーの潜在的な問題を自動的に検出
aliases:
  - /ja/tracing/watchdog
further_reading:
  - link: logs/
    tag: Documentation
    text: ログの収集
  - link: graphing/infrastructure/process
    tag: Documentation
    text: プロセスの収集
  - link: tracing
    tag: Documentation
    text: トレースの収集
---
{{< vimeo 278057125 >}}

## 概要

Watchdog は、APMからアプリケーションとインフラストラクチャーの潜在的な問題を自動的に検出する、アルゴリズムに基づいた機能です。Watchdog は、アプリケーションメトリクスに含まれる傾向やパターンを監視します。たとえば、エラー率、リクエスト率、レイテンシー等からの傾向やパターンと、予想外の変動などを監視します。Watchdog は、すべてのサービスとリソースが評価するため、各サービスのモニターを設定する必要はありません。

Watchdog は、適合率の急激な上昇などといったメトリクスの異常を検出します。[Watchdog ページ][1]には、それぞれの異常に関する「Watchdog ストーリー」が表示されます。各「ストーリー」には、検出されたメトリクスの異常を表すグラフが含まれ、関連する時間枠およびエンドポイントに関する詳細が表示されます。誤警報を避けるために、Watchdog は十分な時間をかけてデータを観察してから問題を報告しています。これにより、信頼度の高い警報を実現しています。

「ストーリー」は、環境、アベイラビリティーゾーン、サービスやリソースのタイプで絞り込むことができます。また、"Filter stories" 検索ボックスに入力することで、ストーリーをサービスまたはリソース名で絞り込むことができます。


{{< img src="watchdog/watchdog_overview.png" alt="Watchdog overview" responsive="true" >}}

Storyをクリックすると、異常が検出された時点のリクエスト、エラー、およびレイテンシーの詳細が表示されます。

{{< img src="watchdog/watchdog_story.png" alt="Watchdog story" responsive="true" >}}

隅の *Show expected bounds* を選択すると、予測された動作の上限/下限しきい値がグラフに表示されます。

{{< img src="watchdog/watchdog_expected_values.png" alt="Watchdog expected value" responsive="true" >}}

画面左のパネルにはファセットが一覧で表示されます。これを利用して Watchdog ストーリーをカテゴリ (`Service`、`Availability Zone`など) でフィルタリングし、それぞれのストーリー数を確認しましょう。

{{< img src="watchdog/watchdog-facets2.png" alt="Watchdog facets" responsive="true" style="width:60%;">}}


## サービス一覧画面内の Watchdog

メトリクスに異常が検出された場合、[APM サービス一覧][2]では、その異常が発生しているサービスの横に Watchdog の黄色い双眼鏡アイコンが表示されます。双眼鏡の横の数字は、Watchdog がそのサービス内で認識した問題の数を示しています。

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog story bis" responsive="true" >}}

特定のサービスで通常と異なる動作が検出された場合、対応する[サービスページ][2]を開くと、ページの中央、アプリケーションパフォーマンスのグラフとレイテンシー分散セクションの間に、その異常に関する Watchdog セクションが表示されます。このセクションには、関連する「Watchdog ストーリー」が表示されます。

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog story bis" responsive="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/watchdog
[2]: /ja/tracing/visualization/services_list