---
title: indexed
core_product:
  - log management
  - apm
---
Indexed logs are [logs][1] that have been collected, processed, and retained for analysis, alerting, and troubleshooting.

Indexed spans represent [spans][2] indexed by a [retention filter][3] stored in Datadog for 15 days that can be used to search, query, and monitor in [Search Spans][4] by the [tags][5] included on the span.

<div class="alert alert-info">
Creating <a href="/tracing/trace_pipeline/trace_retention/">tag-based retention filters</a> after ingestion allows you to control and visualize exactly how many spans are being indexed per service.
</div>

{{< img src="tracing/visualization/span_tag.png" alt="span tag" style="width:80%" >}}

In this example, the requests (`merchant.store_name` and `merchant.tier`) have been added as tags to the span.

To get started with tagging spans in your application, see the [Adding span tags][6] guide.

After a tag has been added to a span, search and query on the tag in Analytics by clicking on the tag to add it as a [facet][7]. Once this is done, the value of this tag is stored for all new traces and can be used in the search bar, facet panel, and trace graph query.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Create Facet" style="width:50%;">}}

[1]: /logs/
[2]: /glossary/#span
[3]: /glossary/#retention-filter
[4]: /tracing/trace_explorer/search
[5]: /getting_started/tagging
[6]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[7]: /glossary/#facet