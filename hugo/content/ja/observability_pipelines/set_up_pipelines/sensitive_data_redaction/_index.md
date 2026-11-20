---
aliases:
- /ja/observability_pipelines/sensitive_data_redaction/
disable_toc: false
title: 機密データのマスキング
---

## 概要

クレジットカード番号、銀行のルーティング番号、API キーなどの機密データは、ログに意図せず記録されることで、組織が金銭的およびプライバシーのリスクにさらされる可能性があります。

Observability Pipelines Worker を使用すると、ログを異なる宛先やインフラストラクチャー外にルーティングする前に、機密情報を特定し、タグ付けし、必要に応じてマスキングやハッシュ化が可能です。メールアドレス、クレジットカード番号、API キー、認証トークンなどの一般的なパターンを検出するためのすぐに使えるスキャンルールを使用できるほか、正規表現を利用して機密情報に一致するカスタムスキャンルールを作成することもできます。

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

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

[1]: /ja/observability_pipelines/sensitive_data_redaction/datadog_agent
[2]: /ja/observability_pipelines/sensitive_data_redaction/fluent
[3]: /ja/observability_pipelines/set_up_pipelines/sensitive_data_redaction/google_pubsub
[4]: /ja/observability_pipelines/sensitive_data_redaction/http_client
[5]: /ja/observability_pipelines/set_up_pipelines/sensitive_data_redaction/http_server
[6]: /ja/observability_pipelines/set_up_pipelines/sensitive_data_redaction/logstash
[7]: /ja/observability_pipelines/sensitive_data_redaction/splunk_hec
[8]: /ja/observability_pipelines/sensitive_data_redaction/splunk_tcp
[9]: /ja/observability_pipelines/sensitive_data_redaction/sumo_logic_hosted_collector
[10]: /ja/observability_pipelines/sensitive_data_redaction/syslog