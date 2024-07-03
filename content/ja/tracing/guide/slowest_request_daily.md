---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 mins
  text: Alert on anomalous p99 latency of a database service
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 mins
  text: Compare a service's latency to the previous week
- link: /tracing/guide/apm_dashboard/
  tag: 4 mins
  text: Create a Dashboard to track and correlate APM metrics
- link: /tracing/guide/
  tag: ''
  text: All guides
title: Debug the slowest trace on the slowest endpoint of a web service
---

_所要時間 3 分_

{{< img src="tracing/guide/slowest_request_daily/slowest_trace_1_cropped.mp4" video="true" alt="Identifying the slowest trace and finding the Host metrics for it" style="width:90%;">}}

Datadog APM を使用すると、エンドポイントのパフォーマンスを調査して遅いリクエストを特定し、レイテンシー問題の根本原因を調査できます。上記の例では、E コマースチェックポイントのエンドポイントについて、1 日のうちで最も遅い[トレース][1]と、CPU 使用率が高いためにそのトレースが遅くなっている様子を示しています。

1. **Open the [Service Catalog][2]**.

    This page contains a list of all services sending data to Datadog. Note you can search for keywords, filter by `env-tag`, and set the time frame.

2. **関連性があるアクティブなウェブサービスを検索し、そのサービス詳細画面を開きます**。

    The `web-store` service is used in this example because it is the primary server in the tech stack and it controls most calls to third party services.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_2_cropped.png" alt="Identifying the slowest trace and finding the bottleneck causing it" style="width:90%;">}}

    In addition to throughput, latency, and error rate information, the service details page contains a list of Resources (major operations like API endpoints, SQL queries, and web requests) identified for the service.

3. **リソース表を p99 レイテンシーで並べ替え**、最も遅いリソースをクリックして開きます。
    **注**: p99 レイテンシーの列が表示されていない場合は、歯車アイコン `Change Columns` をクリックして `p99` に切り替えます。

    [Resource][4] ページには、スループット、レイテンシー、エラー率、リソースからの各ダウンストリームサービスにかかった時間の内訳など、このリソースに関する上位のメトリクスが表示されます。また、リソースをパススルーする特定の[トレース][1]や、このトレースを構成する[スパン][5]の集計ビューも確認できます。

     {{< img src="tracing/guide/slowest_request_daily/slowest_trace_3_cropped.png" alt="Identifying the slowest trace and finding the bottleneck causing it" style="width:90%;">}}

4. 時間フィルターを `1d One Day` に設定します。トレース表までスクロールダウンし、**期間で並べ替え**、表の一番上のトレースにマウスを合わせ **View Trace をクリックします**。

    This is the flame graph and associated information. Here you can see the duration of each step in the trace and whether it is erroneous. This is useful in identifying slow components and error-prone ones. The flame graph can be zoomed, scrolled, and explored naturally. Under the flame graph you can see associated metadata, Logs, and Host information.

    The flame graph is a great way of identifying the precise piece of your stack that is erroneous or latent. Errors are marked with red highlights and duration is represented by the horizontal length of the span, meaning long spans are the slowest ones. Learn more about using the flame graph in the [Trace View guide][6].

    Under the flame graph you can see all of the tags (including [custom ones][7]). From here you can also see associated logs (if you [connected Logs to your Traces][8]), see host-level information such as CPU and memory usage.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_4_cropped.png" alt="Identifying the slowest trace and finding the bottleneck causing it" style="width:90%;">}}

5. **Host タブをクリックして開き**、リクエストがヒットしていた間の下層のホストの CPU とメモリのパフォーマンスを調査します。
6. **Open Host Dashboard をクリックして**、ホストに関するすべての関連データを表示します。

Datadog APM seamlessly integrates with the other Datadog metrics and information - like infrastructure metrics and Logs. Using the flame graph, this information is available to you as well as any [custom metadata][7] you are sending with your traces.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: https://app.datadoghq.com/services
[3]: /ja/tracing/glossary/#services
[4]: /ja/tracing/glossary/#resources
[5]: /ja/tracing/glossary/#spans
[6]: /ja/tracing/trace_explorer/trace_view/?tab=spanmetadata
[7]: /ja/tracing/guide/adding_metadata_to_spans/
[8]: /ja/tracing/other_telemetry/connect_logs_and_traces/