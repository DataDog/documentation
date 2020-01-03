---
title: アラート設定
kind: documentation
aliases:
  - /ja/guides/monitors/
  - /ja/guides/monitoring/
  - /ja/guides/alerting/
  - /ja/guides/monitors/the-conditions
description: 通知の作成と管理
---
## 概要

すべてのインフラストラクチャーを 1 か所から監視していても、重要な変更が発生したことを知る機能がなければ完全とは言えません。Datadog には、メトリクス、インテグレーションのアベイラビリティー、ネットワークエンドポイントなどをアクティブにチェックするモニターを作成する機能が用意されています。

モニターを作成すると、その条件が満たされたときに通知されます。また、電子メールを介してチームメンバーに、Webhooks を介してサードパーティサービス (Pagerduty など) や他のカスタムエンドポイントに通知できます。

トリガーされたモニターは[イベントストリーム][1]に表示されます。このため、アプリケーションまたはインフラストラクチャーの問題に共同で取り組むことができます。Datadog では、[Triggered Monitors][2] ページに未解決の問題の詳細を表示したり、[Manage Monitors][3] ページで一般的なモニター管理を行うことができます。

モニターはプログラムで管理できます。API で使用可能な[ライブラリ][5]または cURL を使用してモニターを管理する方法については、[Datadog API に関するドキュメント][4]をご参照ください。

このセクションでは、以下について説明します。

* [モニターの作成方法][6]
* [モニター通知の設定][7]
* [モニターの管理][8]
* [モニターをミュートするダウンタイムの設定][9]
* [すべてのチェックを 1 つの場所に表示する方法][10]

### 用語集

以下に、通常とは意味が異なる用語について簡単に説明します。

| 用語             | 説明                                                                                                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **ステータス**:        | 各チェックを実行すると送信されるステータスのこと。OK、WARNING、または CRITICAL があります。                                                                                                                                                                          |
| **チェック**:         | 1 つまたは複数のステータスを表示すること。                                                                                                                                                                                                          |
| **モニター**:       | 一連のチェックステータス、メトリクスのしきい値、または他のアラート条件に基づいて通知を送信すること。                                                                                                                            |
| **モニターの種類**:  | [ログ][11]、[予測値][12]、[ホスト][13]、[メトリクス][14]、[インテグレーション][15]、[処理][16]、[外れ値][17]、[異常値][18]、[APM][19]、[複合条件][20]、[ネットワーク][21]、[イベント][22]ベース、および [カスタム][23]があります。 |
| **タグ**:          | 各メトリクスとホストに適用できる設定可能なラベル。詳細については、[タグ付け][24]に関するページを参照してください。                                                                                                                        |

## モニターの作成

メインメニューの **Monitors** にカーソルを合わせ、サブメニューの **New Monitor** をクリックして[モニター作成][25]ページに移動します。選択したテーマまたは画面の解像度に応じて、メインメニューは上部または左側に表示されます。左側にモニターの種類のリストが表示されます。[モニターに関するリファレンス][6]で、すべてのモニターの種類を確認できます。

{{< img src="monitors/index/nav.png" alt="navigation"  >}}

## モニターのエクスポート

モニターの JSON 設定は、作成画面から直接、または右上隅の [Monitor Status ページ][26]からエクスポートできます。
モニターをプログラムで管理およびデプロイしている場合は、UI でモニターを定義して、JSON をエクスポートする方が簡単です。

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor"  >}}

## モニターの監査

モニターを変更すると、[イベントストリーム][27]にイベントが作成され、変更内容と実際に変更を行ったユーザーが表示されます。

モニターを変更した場合の例を表示するには、以下のようなイベント検索を実行してください。
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog には、自身が作成したモニターが変更されたことを通知する機能もあります。モニターエディターの下部に、モニターへのすべての変更をアラート受信者に通知するオプションがあります。

{{< img src="monitors/index/Monitor_Change_notifications.png" alt="Monitor Change Notifications"  >}}

このオプションを **Notify** に設定すると、モニター監査イベントに関する電子メールが、特定のモニターの全アラート受信者に送信されます。

## モニターを手動で Resolve する

モニターの Resolve 機能を使用すると、次回のモニター評価に備えて、モニターのステータスを意図的に `OK` に切り替えることができます。通常は、モニターの元データに基づいて、以下のモニター評価が実行されます。

現在のデータが `ALERT` 状態であるためにモニターでアラートが発生した場合は、Resolve によってモニターの状態が `ALERT -> OK -> ALERT` の順に切り替わります。単にアラートを確認したり、Datadog にアラートを無視させたりするだけでは不適切です。

データが断続的に報告される場合は、手動でモニターを Resolve しても問題ありません。アラートがトリガーされると、モニターはデータを受信しなくなります。このため、モニターはアラートの条件を評価することや、`OK` の状態に回復することができなくなります。このような場合は、Resolve 機能、またはタイマーにより自動的に Resolve する Automatically resolve monitor after X hours 機能を使用することで、モニターを `OK` の状態に戻すことができます。

一般的な使用例: エラーがない場合には生成されないエラーメトリクスに基づいたモニター (例: `aws.elb.httpcode_elb_5xx`、コード内に置かれて_エラーがある場合にのみ_エラーを報告する DogStatsD カウンター)

[1]: /ja/graphing/event_stream
[2]: https://app.datadoghq.com/monitors/triggered
[3]: https://app.datadoghq.com/monitors
[4]: /ja/api/#monitors
[5]: /ja/developers/libraries
[6]: /ja/monitors/monitor_types
[7]: /ja/monitors/notifications
[8]: /ja/monitors/manage_monitor
[9]: /ja/monitors/downtimes
[10]: /ja/monitors/check_summary
[11]: /ja/monitors/monitor_types/log
[12]: /ja/monitors/monitor_types/forecasts
[13]: /ja/monitors/monitor_types/host
[14]: /ja/monitors/monitor_types/metric
[15]: /ja/monitors/monitor_types/integration
[16]: /ja/monitors/monitor_types/process
[17]: /ja/monitors/monitor_types/outlier
[18]: /ja/monitors/monitor_types/anomaly
[19]: /ja/monitors/monitor_types/apm
[20]: /ja/monitors/monitor_types/composite
[21]: /ja/monitors/monitor_types/network
[22]: /ja/monitors/monitor_types/event
[23]: /ja/monitors/monitor_types/custom_check
[24]: /ja/tagging
[25]: https://app.datadoghq.com/monitors#/create
[26]: /ja/monitors/monitor_status
[27]: /ja/graphing/event_stream