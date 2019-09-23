---
title: ホストモニター
kind: documentation
description: Datadog に報告を行っているホストがあるかどうかをチェックする
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

すべての Datadog Agent コレクションは、`datadog.agent.up` という名前の `UP` ステータスの
ハートビートを報告します。このハートビートを 1 つまたは複数のホストにまたがって監視できます。

## コンフィグレーション

1. **ホストを名前またはタグ**で選択します。タグを指定すると、そのタグまたはタグの組み合わせを持つすべてのホストが監視されます。
    {{< img src="monitors/monitor_types/host/host_monitor_pick_hosts.png" alt="host monitor pick hosts" responsive="true" style="width:80%;">}}

2. **Check Alert** と **Cluster Alert** のどちらかを選択します。

3. **Check Alert**: ホストが報告を停止すると、アラートがトリガーされます。
    **データなしのタイムフレーム**を選択します。選択した時間 (分数) より長くハートビートが報告を停止すると、通知が行われます。
    {{< img src="monitors/monitor_types/host/no_data_timeframe.png" alt="host monitor no data timeframe" responsive="true" style="width:80%;">}}

4. **Cluster Alert**: 一定の割合のホストが報告を停止すると、アラートがトリガーされます。
    * タグに基づいてホストをクラスター化するかどうかを決めます。
        {{< img src="monitors/monitor_types/host/cluster_alert.png" alt="Cluster alert" responsive="true" style="width:80%;">}}

    * ホストモニターのアラート/警告しきい値 (パーセント値) を選択します。
        {{< img src="monitors/monitor_types/host/cluster_alert_setup.png" alt="cluster alert setup" responsive="true" style="width:75%;">}} 

    * **データなしのタイムフレーム**を選択します。選択したクラスター内の選択した割合のホストで、選択した時間 (分数) より長くハートビートが報告を停止すると、通知が行われます。

5. **通知オプション**を構成します。
    よく使用される通知オプションの詳細な設定手順については、[通知に関するドキュメント][1]のページを参照してください。

## その他の参考資料 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/notifications