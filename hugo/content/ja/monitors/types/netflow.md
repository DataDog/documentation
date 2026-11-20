---
further_reading:
- link: /network_monitoring/netflow/#visualization
  tag: ドキュメント
  text: NetFlow モニタリングについて
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスを確認
title: NetFlow モニター
---

{{< callout btn_hidden="true" header="プレビュー版にアクセス！">}}
NetFlow モニターはプレビュー版です。アクセスするには Datadog の担当者にお問い合わせください。
{{< /callout >}}

## 概要

Datadog の [Network Device Monitoring][1] (NDM) は、ルーター、スイッチ、ファイアウォールなどのオンプレミスおよび仮想ネットワークデバイスへの可視性を提供します。NDM の一部として、[NetFlow モニタリング][2]により、ネットワークトラフィックフローのデータを時間の経過とともに調査、解釈、分析し、ネットワーク輻輳の主な要因を特定できます。

NetFlow モニタリングを有効にした後、設定したしきい値をフローメトリクス (特定の送信元または宛先ペアのネットワークスループットなど) が超えたときにアラートを発する NetFlow モニターを作成できます。

## モニターの作成

Datadog で NetFlow モニターを作成するには、メインナビゲーションから [**Monitors** --> **New Monitor** --> **NetFlow**][3] を選択します。

### 検索クエリを定義する

検索クエリを定義すると、上部のグラフがリアルタイムで更新されます。

{{< img src="monitors/monitor_types/netflow/monitor.png" alt="NetFlow データを使用したモニター構成の例" style="width:100%;" >}}

1. ダッシュボードの [NetFlow ウィジェット][4]と同じロジックを使用して検索クエリを構築します。
1. トラフィックに対してバイト単位かパケット単位でアラートを出すかを選択します。
1. アラート対象のトラフィックをフィルタリングするためのタグを選択します。[利用可能なファセットの完全なリスト][4]をご覧ください。

### 数式と関数の使用

数式と関数を使用して NetFlow モニターを作成できます。例えば、送信元とデバイスによって送信されたトラフィックの量に基づいてモニターを作成することができます。

{{< img src="monitors/monitor_types/netflow/formula.png" alt="NetFlow データと数式を使用したモニター構成の例" style="width:100%;" >}}

詳細については、[関数][5]のドキュメントを参照してください。

### アラートの条件を設定する

クエリの値がしきい値を超えた場合にモニターがトリガーされるように構成し、回復しきい値や評価遅延などの高度なアラートオプションをカスタマイズします。詳細については[モニターの構成][6]を参照してください。

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][7] のページを参照してください。

## NetFlow イベントの監視

NetFlow モニターで作成できるイベントの詳細については、[NetFlow モニタリングのドキュメント][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/devices/
[2]: /ja/network_monitoring/netflow/
[3]: https://app.datadoghq.com/monitors/create/netflow
[4]: /ja/network_monitoring/netflow/#visualization
[5]: /ja/dashboards/functions/
[6]: /ja/monitors/configuration/
[7]: /ja/monitors/notify/