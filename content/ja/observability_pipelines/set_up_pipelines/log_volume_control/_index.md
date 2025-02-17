---
aliases:
- /ja/observability_pipelines/log_volume_control/
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: documentation
  text: ログ量を削減するための戦略
title: ログボリューム制御
---

## 概要

インフラストラクチャーやアプリケーションが成長するにつれ、ログの量やデータの複雑性も増大します。大量のログはノイズを多く含み、ログの分析やトラブルシューティングを困難にします。ログを宛先に送信する前に、Observability Pipelines のプロセッサを使用して、どのログが価値があり、どのログがノイズが多く興味のないものかを判断します。Observability Pipelines Worker では、以下のプロセッサを使用してログを管理できます。

- **フィルター**: 条件に基づいてログのサブセットのみを送信するためのクエリを追加します。
- **サンプル**: ログのサブセットのみを送信するためのサンプリングレートを定義します。
- **クォータ**: ログデータの量またはログイベントの数に対して、1 日の制限を適用します。
- **デデュープ**: 例えば、ネットワーク問題による再試行などで生じる重複したログを削除します。
- **リマップ**: ログ内のフィールドを追加、削除、または名前変更します。

{{% observability_pipelines/use_case_images/log_volume_control %}}

開始するには、ログソースを選択してください。

- [Datadog Agent][1]
- [Fluentd または Fluent Bit][2]
- [Google Pub/Sub][3]
- [HTTP クライアント][4]
- [HTTP サーバー][5]
- [Logstash][6]
- [Splunk HTTP Event Collector (HEC)][7]
- [Splunk Heavy または Universal Forwarders (TCP)][8]
- [Sumo Logic ホスト型コレクター][9]
- [rsyslog または syslog-ng][10]

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/log_volume_control/datadog_agent
[2]: /ja/observability_pipelines/log_volume_control/fluent
[3]: /ja/observability_pipelines/set_up_pipelines/log_volume_control/google_pubsub
[4]: /ja/observability_pipelines/log_volume_control/http_client
[5]: /ja/observability_pipelines/set_up_pipelines/log_volume_control/http_server
[6]: /ja/observability_pipelines/set_up_pipelines/log_volume_control/logstash
[7]: /ja/observability_pipelines/log_volume_control/splunk_hec
[8]: /ja/observability_pipelines/log_volume_control/splunk_tcp
[9]: /ja/observability_pipelines/log_volume_control/sumo_logic_hosted_collector
[10]: /ja/observability_pipelines/log_volume_control/syslog