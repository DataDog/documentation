---
title: Watchdog モニター
kind: documentation
description: アプリケーションとインフラストラクチャーの問題をアルゴリズムで検出する
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: watchdog
    tag: Documentation
    text: Watchdog - アルゴリズムによるアプリケーションとインフラストラクチャーの問題の検出
---
## 概要

[Watchdog][1] は、アプリケーションやインフラストラクチャーの問題を自動的に検出する APM のアルゴリズム機能です。そのために、アプリケーションメトリクス (エラー率、リクエスト率、レイテンシーなど) の傾向やパターンを継続的に監視し、予期しない動作を探します。

Watchdog モニターをセットアップして、Watchdog がシステムで潜在的な問題を検出したときにアラート通知を受け取ることができます。

**注**: Watchdog は APM の機能です。Watchdog モニターは、APM をご利用のお客様だけがご使用いただけます。

## Watchdog モニターの作成
* [New Monitor][2] ページで「Watchdog」を選択します。

* [Create Monitor][3] ページの上部にあるグラフには、Watchdog イベントの数が経時的に表示され、イベントのリストも表示されます。

{{< img src="monitors/monitor_types/watchdog/wmonitor-create-top.png" alt="Watchdog"  style="width:80%;">}}

* Service と Infrastructure のどちらのストーリータイプに基づいて監視するかを選択します。

{{< img src="monitors/monitor_types/watchdog/wmonitor-1.png" alt="Select story type"  style="width:80%;">}}

* Service ストーリーを選択した場合は、アラートの対象とするソースを選択します。

{{< img src="monitors/monitor_types/watchdog/wmonitor-2.png" alt="Select sources"  style="width:80%;">}}

* 通知メッセージを構成します。[テンプレート変数][4]を使用してメッセージをカスタマイズできます。

{{< img src="monitors/monitor_types/watchdog/wmonitor-3.png" alt="Say what's happening"  style="width:80%;">}}

「Include triggering tags in notification title」オプションを選択すると、サービス名、リソース名、およびプライマリタグ (例: availability-zone) がタイトルに付加されます。

* 通知の受信者を構成します。

{{< img src="monitors/monitor_types/watchdog/wmonitor-4.png" alt="Notify your team"  style="width:80%;">}}

## 通知のテンプレート変数

* `{{event.id}}`: イベントの ID
* `{{event.title}}`: イベントのタイトル。ストーリーの詳細も示されます。

## Watchdog アラート

モニターを「Watchdog」タイプで絞り込むと、Watchdog モニターが [Manage Monitors][5] ページと [Triggered Monitors][6] ページに表示されます。

アラートを受け取ったら、[Triggered Monitors][6] ページをイベントセクションまで下へスクロールし、詳細リンクをクリックすることで、アラート発生の原因となった Watchdog ストーリーに関する詳細な情報を確認できます。

{{< img src="monitors/monitor_types/watchdog/wmonitor-triggered.png" alt="Events"  style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/watchdog
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/watchdog
[4]: /ja/monitors/notifications/?tab=is_alertis_warning#variables
[5]: https://app.datadoghq.com/monitors/manage
[6]: https://app.datadoghq.com/monitors/triggered