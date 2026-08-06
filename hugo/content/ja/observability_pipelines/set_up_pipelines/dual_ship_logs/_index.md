---
aliases:
- /ja/observability_pipelines/dual_ship_logs/
disable_toc: false
title: デュアルシップログ
---

## 概要

インフラストラクチャーや組織が拡大すると、ログの量、データの複雑さ、そして可観測性アーキテクチャも増大します。ログ管理を最適化するには、さまざまなログ管理ツールやルーティングワークフローを試す必要が出てくるかもしれません。Observability Pipelines を使うことで、ログを複数の宛先に送信し、本番環境への影響を最小限に抑えながら、異なるツールやワークフローを評価することが可能です。

{{% observability_pipelines/use_case_images/dual_ship_logs %}}

開始するには、ソースを選択してください。

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

[1]: /ja/observability_pipelines/dual_ship_logs/datadog_agent
[2]: /ja/observability_pipelines/dual_ship_logs/fluent
[3]: /ja/observability_pipelines/set_up_pipelines/dual_ship_logs/google_pubsub
[4]: /ja/observability_pipelines/dual_ship_logs/http_client
[5]: /ja/observability_pipelines/set_up_pipelines/dual_ship_logs/http_server
[6]: /ja/observability_pipelines/set_up_pipelines/dual_ship_logs/logstash
[7]: /ja/observability_pipelines/dual_ship_logs/splunk_hec
[8]: /ja/observability_pipelines/dual_ship_logs/splunk_tcp
[9]: /ja/observability_pipelines/dual_ship_logs/sumo_logic_hosted_collector
[10]: /ja/observability_pipelines/dual_ship_logs/syslog