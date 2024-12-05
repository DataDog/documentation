---
aliases:
- /ja/observability_pipelines/log_enrichment/
disable_toc: false
title: ログエンリッチメント
---

## 概要

組織が成長すると、サービス、システム、アプリケーションから生成されるログの量と複雑さが増大します。これらのログを効率的に管理するためには、検索や分析を容易にするためにフォーマットを標準化し、追加情報を付加することが必要になるかもしれません。例えば、各ログソースにはそれぞれ独自のフォーマットが存在するため、フォーマットの再構築や標準化が行われていない場合、調査時に検索や分析が難しくなる可能性があります。また、顧客 ID や IP アドレスといった追加情報をログに含めることも考えられます。Log Enrichment Template と Observability Pipelines のプロセッサを使用して、ログを拡充し、変換しましょう。

- **Enrichment Table**: ローカルファイルや GeoIP データベースなどのリファレンステーブルから情報を使用して、ログを拡充します。
- **Grok Parser**: ソースのセットに対応する grok パースルールを使用して、ログをパースします。
- **ホスト名の追加**: ログを送信したホストの名前を追加し、問題の根本原因の特定に役立てます。
- **JSON をパース**: フィールドを JSON オブジェクトに変換します。

{{% observability_pipelines/use_case_images/log_enrichment %}}

開始するには、ソースを選択してください。

- [Datadog Agent][1]
- [Fluentd または Fluent Bit][2]
- [HTTP クライアント][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy および Universal Forwarders (TCP)][5]
- [Sumo Logic ホスト型コレクター][6]
- [rsyslog または syslog-ng][7]

[1]: /ja/observability_pipelines/log_enrichment/datadog_agent
[2]: /ja/observability_pipelines/log_enrichment/fluent
[3]: /ja/observability_pipelines/log_enrichment/http_client
[4]: /ja/observability_pipelines/log_enrichment/splunk_hec
[5]: /ja/observability_pipelines/log_enrichment/splunk_tcp
[6]: /ja/observability_pipelines/log_enrichment/sumo_logic_hosted_collector
[7]: /ja/observability_pipelines/log_enrichment/syslog