---
title: Agent ホストとトレーサーホストの違いを理解する
---

## 概要

Datadog APM では、`host` タグがスパンやトレースをインフラストラクチャーモニタリングデータと相関させ、ホストメトリクスがスパンやトレースのホストに関連付けられます。

## Datadog Agent ホスト名とトレーサーホスト名の比較

**Agent ホスト**は、Datadog Agent が実行されているホストです。**トレーサーホスト**は、トレーシングライブラリでインスツルメントされたアプリケーションが実行されているホストです。

Agent ホストとトレーサーホストは、Datadog Agent をインフラストラクチャーにデプロイする方法によって異なる場合があります。


Agent がアプリケーションと同じホスト上にデプロイされている場合 (たとえば、[DaemonSet][1]を使用)、Agent ホストとトレーサーホストは同じです。

{{< img src="/tracing/guide/agent_tracer_hostnames/agent_host.png" alt="アプリケーションと同じホストにデプロイされた Agent" style="width:80%;" >}}

Agent がリモートホストにデプロイされている場合、Agent ホストはトレーサーホストとは異なります。

{{< img src="/tracing/guide/agent_tracer_hostnames/remote_host.png" alt="アプリケーションとは別のリモートホストにデプロイされた Agent" style="width:80%;" >}}

### トレーサーホストと Agent ホストがスパンに設定されるのはどのような場合ですか？

- Datadog Agent ホスト名は常にスパンに設定されます。
- トレーサーホスト名は、`DD_TRACE_REPORT_HOSTNAME` が `true` の場合、スパンに設定されます (デフォルトは`false`)。

 言語 | 構成 | 環境変数
----------|--------|---------------------
Ruby | `tracing.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
C++ | `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`
Node.js | `reportHostname` | `DD_TRACE_REPORT_HOSTNAME`
Go | - | `DD_TRACE_REPORT_HOSTNAME`
Python | - | `DD_TRACE_REPORT_HOSTNAME`
PHP | `datadog.trace.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
Java |  `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`

### APM がホスト情報を使用するのはどのような場合ですか？ 

APM がホスト情報を使用するのは、[保持フィルター][2]を作成する時、[スパンからメトリクス][3]を生成する時、またはクエリでホストタグフィルターを使って[機密データスキャナールール][4]を作成する時です。たとえば、`availability-zone` や `cluster-name` などのホストタグフィルターは、Datadog Agent ホスト情報で補完されます。






[1]: /ja/containers/kubernetes/apm/?tab=daemonset
[2]: /ja/tracing/trace_pipeline/trace_retention
[3]: /ja/tracing/trace_pipeline/generate_metrics
[4]: /ja/sensitive_data_scanner/