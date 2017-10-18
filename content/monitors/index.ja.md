---
last_modified: 2017/08/24
translation_status: complete
language: ja
title: Monitoring レファレンス
kind: documentation
---

<!--
Monitoring in Datadog refers to the ability to notify your team when conditions are met. If you are just starting with monitors in Datadog, please refer to our [Guide to Monitors](/monitors) for an introduction.
-->

このMonitoringレファレンスでは、条件が満たされた時にチームが通知を受けるための設定について解説します。DatadogのMonitor(監視)機能を使い始めたばかりの場合、まずは入門編の[Monitor(監視)機能の設定ガイド](/ja/guides/monitors) ページを参照して下さい。

<!--
Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: [host](#host)-, [metric](#metric)-, [integration](#integration)-, [process](#process)-, [network](#network)-, [event](#event)-based, and [custom](#custom). See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/ja/guides/tagging) page for more details.
-->

## 用語集

以下は、このドキュメントで使用している用語の簡単な概要になります。

- **Status**: 各Agent Checkは、ホスト上で定期的に実行されOK, WARNING, CRITICALのステータスをDatadogに送信します。
- **Check**: Agent Checkのことで、複数のステータスを送信します。
- **Monitor**: Agent Checkのステータスやメトリクスの閾値の確認手順、その他のアラート条件を元に通知を送信します。
- **Monitorタイプ**: [ホスト](#ホストを対象にしたmonitor)-, [メトリクス](#メトリクスを対象にしたmonitor)-, [インテグレーション](#インテグレーションを対象にしたmonitor)-, [プロセス](#プロセスを対象にしたmonitor)-, [ネットワーク](#ネットワークを対象にしたmonitor)-, [イベント](#イベントを対象にしたmonitor)-, [カスタムチェック](#カスタムチェックを対象にしたmonitor), APM-, [コンポジット](#コンポジット-複合-monitor)-, があります。特定のMonitorタイプの詳細に関しては、サイドバーからそれぞれのタイプの項目を確認してください。
- **タグ**: 各メトリクスやホストに対して付けることができるラベルです。タグの詳細に関しては、[Tagging](/guides/tagging) ページを参照して下さい。

<!-- ## Creating a Monitor

Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by highlighting the "Monitors" tab in the main menu and selecting the
"Create Monitors" sub-tab (depending on your chosen theme, the main menu may be at the top or on the left).  You will be presented with a list of monitor types
on the left. This document will walk through the configuration of each type.
-->

## 新しい Monitor の作成

[Create Monitors](https://app.datadoghq.com/monitors#/create)のページへ移動するには、メインメニューの`Monitors`タブからドロップダウンメニューの`New Monitor`を選択します(テーマの選択次第により、メインメニューは画面の左側あるいは上部に配置されています)。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このドキュメントでは、これらの各Monitorタイプの設定方法について解説していきます。
