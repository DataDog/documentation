---
aliases:
- /ja/observability_pipelines/split_logs/
disable_toc: false
title: ログの分割
---

## 概要

多くの組織では、異なるユースケースに応じて、複数の製品にログを送信する必要があります。例えば、セキュリティログを SIEM アプリケーションに送り、DevOps ログを Datadog に送ることがあります。Observability Pipelines を活用することで、ユースケースに基づいてログをそれぞれの宛先に送信することが可能です。

{{% observability_pipelines/use_case_images/split_logs %}}

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

[1]: /ja/observability_pipelines/split_logs/datadog_agent
[2]: /ja/observability_pipelines/split_logs/fluent
[3]: /ja/observability_pipelines/set_up_pipelines/split_logs/google_pubsub
[4]: /ja/observability_pipelines/split_logs/http_client
[5]: /ja/observability_pipelines/set_up_pipelines/split_logs/http_server
[6]: /ja/observability_pipelines/set_up_pipelines/split_logs/logstash
[7]: /ja/observability_pipelines/split_logs/splunk_hec
[8]: /ja/observability_pipelines/split_logs/splunk_tcp
[9]: /ja/observability_pipelines/split_logs/sumo_logic_hosted_collector
[10]: /ja/observability_pipelines/split_logs/syslog