---
title: Ease troubleshooting with cross product correlation
kind: guide
---

## Overview

[Unified service tagging][1] permits high level correlation capabilities. However, there are times when the starting point of your investigation is a single log, trace, view or Synthetic test. Correlating logs, traces, and views with other data gives context to help estimate business impact and find the root cause of an issue in a few clicks.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/full-stack-cover.png" alt="Full stack correlation" style="width:80%;" >}}

This guide walks you through the steps to correlate your full stack data:

1. [Correlate server-side logs with traces](#correlate-server-side-logs-with-traces)
   * [Correlate application logs](#correlate-application-logs)
   * [Correlate proxy logs](#correlate-proxy-logs)
   * [Correlate database logs](#correlate-database-logs)
2. [Correlate frontend products](#correlate-frontend-products)
   * [Correlate browser logs with RUM](#correlate-browser-logs-with-rum)
3. [Correlate user experience with server behavior](#correlate-user-experience-with-server-behavior)
   * [Correlate RUM views with traces](#correlate-rum-views-with-traces)
   * [Leverage trace correlation to troubleshoot Synthetic tests](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

**Note**: Depending on your use case, you may skip certain steps below. Steps that are dependent on others are explicitly stated.

## Correlate server-side logs with traces

When your users are encountering errors or high latency in your application, drilling down to view the logs from a problematic request can reveal exactly what went wrong. By pulling together all the logs pertaining to a given request, you can see in rich detail how it was handled from beginning to end so you can quickly diagnose the issue.

Correlating your logs with traces also eases [aggressive sampling strategy without losing entity-level consistency][2] with the use of `trace_id`.

[Correlating application logs](#correlate-application-logs) offers extensive visibility across your stack, but some very specific use cases require correlation deeper into your stack. Follow the links to complete setup per use case:

* [Correlate proxy logs](#correlate-proxy-logs)
* [Correlate database logs](#correlate-database-logs)

### Correlate application logs

#### Why?

Application logs give the most context around most code and business logic issues. They can even help you solve other services issues. For example, most ORMs log database errors.

#### How?

Use one of the [various OOTB correlations][3]. If you use a custom tracer or if you have any issues, follow the [correlation FAQ][4].

### Correlate proxy logs

#### Why?

Proxy logs provide more information than application logs as they cover more entry points and give information on static content and redirections.

#### How?

The application tracer generates trace IDs by default. This can be changed by injecting `x-datadog-trace-id` into HTTP Request headers.

{{< tabs >}}
{{% tab "NGINX" %}}

##### Setup opentracing

Follow [NGINX tracing integration][1].

##### Inject trace ID in logs

Trace ID is stored as `opentracing_context_x_datadog_trace_id` variable. Update the NGINX log format by adding the following configuration block in the HTTP section of your NGINX configuration file `/etc/nginx/nginx.conf`:

```conf
http {
  log_format main '$remote_addr - $opentracing_context_x_datadog_trace_id $http_x_forwarded_user [$time_local] "$request" '
          '$status $body_bytes_sent "$http_referer" '
          '"$http_user_agent" "$http_x_forwarded_for" ';

  access_log /var/log/nginx/access.log;
}
```

##### Parse trace ID in pipelines

1. Clone the NGINX pipeline.

2. Customize the first [grok parser][2]:
   - In **Parsing rules**, replace the first parsing rule with:
   ```text
   access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)
   ```
   - In **Advanced settings** under **Helper Rules**, add the line:
   ```text
   _trace_id %{notSpace:dd.trace_id:nullIf("-")}
   ```

3. Add a [trace ID remapper][3] on `dd.trace_id` attribute.

[1]:/tracing/setup_overview/proxy_setup/?tab=nginx
[2]:/logs/processing/processors/?tab=ui#grok-parser
[3]:/logs/processing/processors/?tab=ui#trace-remapper
{{% /tab %}}
{{< /tabs >}}

### Correlate database logs

#### Why?

Database logs are often hard to contextualize due to query similarities, variable anonymization, and high usage.

For example, production slow queries are hard to reproduce and analyze without investing a lot of time and resources. Below is an example of how to correlate slow query analysis with traces.

#### How?

{{< tabs >}}
{{% tab "PostgreSQL" %}}

##### Enrich your database logs

PostgreSQL default logs are not detailed. Follow [this integration guide][1] to enrich them.

The slow query guideline also requires a rich plan explanation on slow queries. For execution plan results, update `/etc/postgresql/<VERSION>/main/postgresql.conf` with:

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500ms'
```

Queries longer than 500ms log their execution plan.

**Note**: `auto_explain.log_analyze = 'true'` provides even more information, but greatly impacts performance. For more information, see the [official documentation][2].

##### Inject trace_id into your database logs

Inject `trace_id` into most of your database logs with [SQL comments][3]. Here is an example with Flask and SQLAlchemy:

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace.helpers import get_correlation_ids
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_id, span_id = get_correlation_ids()
        statement = f"{statement} -- dd.trace_id=<{trace_id or 0}>"
        return statement, parameters
```

**Note**: This only correlates logs that include a query statement. Error logs like `ERROR:  duplicate key value violates unique constraint "<TABLE_KEY>"` stay out of context. Most of the time you can still get error information through your application logs.

Clone and customize the PostgreSQL pipeline:

1. Add a new [grok parser][4]:
   ```text
   extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+%{data}
   ```

2. Add a [trace ID remapper][5] on `dd.trace_id` attribute.

Here is an example of a slow query execution plan from a slow trace:

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/slow-query-root-cause.png" alt="Slow query logs correlation" style="width:80%;" >}}

[1]: /integrations/postgres/?tab=host#log-collection
[2]: https://www.postgresql.org/docs/13/auto-explain.html
[3]: https://www.postgresql.org/docs/13/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
[4]: /logs/processing/processors/?tab=ui#grok-parser
[5]: /logs/processing/processors/?tab=ui#trace-remapper
{{% /tab %}}
{{< /tabs >}}

## Correlate frontend products

### Correlate browser logs with RUM

#### Why?

[Browser logs][9] inside a RUM event give context and insight into an issue. As in the example below, browser logs indicate that the bad query root cause is an invalid user ID.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/browser-logs-in-rum.png" alt="Browser logs in a RUM action" style="width:80%;" >}}

Correlating your browser logs with RUM also eases [aggressive sampling strategy without losing entity-level consistency][2] with the use of attributes like `session_id` and `view.id`.

#### How?

Browser logs and RUM events are automatically correlated as explained in the [RUM billing FAQ][10]. [Matching configuration between RUM and logs SDK][11] is required.

## Correlate user experience with server behavior

Traditional backend and frontend monitoring are siloed and require separate workflows to troubleshoot across your stack. Datadog full stack correlations lets you identify a root cause (whether it comes from a browser issue or a database downtime) and estimate user impact.

This section walks you through the steps to enable these types of correlations:

* [Correlate RUM views with traces](#correlate-rum-views-with-traces)
* [Leverage the trace correlation to troubleshoot Synthetic tests](#leverage-the-trace-correlation-to-troubleshoot-synthetic-tests).

### Correlate RUM views with traces

#### Why?

APM and RUM together let you see your full frontend and backend data through one lens.

Use the RUM correlation to:

* Quickly pinpoint issues anywhere in your stack including frontend
* Fully understand what your users are experiencing

#### How?

Follow the [connect RUM and Traces][6] documentation. RUM view information is available in the [Trace view][7] and trace information is available in the [Session view][8].

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/trace-details-rum.png" alt="RUM information in a trace" style="width:80%;" >}}

**Note**: There is no direct correlation between RUM views and server logs. You can still see a RUM event from a log and logs from a RUM event by looking at Trace previews.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/rum-action-server-logs.png" alt="Logs in a RUM action trace preview" style="width:80%;" >}}

### Leverage trace correlation to troubleshoot Synthetic tests

#### Why?

The APM integration with Synthetic Monitoring allows you to go from a test run that has failed to the root cause of the issue by looking at the trace generated by the test.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/synthetic-trace-root-cause.png" alt="Root cause of a synthetic test fail" style="width:80%;" >}}

Having network-related specifics, thanks to your test, as well as backend, infrastructure, log information (thanks to your trace), and RUM events (for [browser tests][12] only) allows you to access a new level of detail about the way your application is behaving and how it is experienced by your users.

#### How?

For this feature, follow the [enable APM integration on Synthetic settings][5] documentation.

[1]: /getting_started/tagging/unified_service_tagging
[2]: /logs/indexes/#sampling-consistently-with-higher-level-entities
[3]: /tracing/connect_logs_and_traces
[4]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
[5]: /synthetics/apm
[6]: /real_user_monitoring/connect_rum_and_traces
[7]: https://app.datadoghq.com/apm/traces
[8]: https://app.datadoghq.com/rum/explorer
[9]: /logs/log_collection/javascript/
[10]: /account_management/billing/rum/#can-i-view-logs-from-the-browser-collector-in-rum
[11]: /real_user_monitoring/browser/#initialization-parameters
[12]: /synthetics/browser_tests/
