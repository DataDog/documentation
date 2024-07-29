---
title: Ease Troubleshooting With Cross-Product Correlation

further_reading:
- link: '/getting_started/tagging/unified_service_tagging/'
  tag: 'Documentation'
  text: 'Learn about Unified Service Tagging'
- link: '/tracing/other_telemetry/connect_logs_and_traces'
  tag: 'Documentation'
  text: 'Connect Logs and Traces'
- link: '/real_user_monitoring/platform/connect_rum_and_traces/'
  tag: 'Documentation'
  text: 'Connect RUM & Session Replay and Traces'
- link: '/synthetics/apm/'
  tag: 'Documentation'
  text: 'Connect Synthetic Tests and Traces'
---

## Overview

[Unified service tagging][1] enables high-level correlation capabilities. There may be times when the starting point of your investigation is a single log, trace, view, or Synthetic test. Correlating logs, traces, and views with other data provides helpful context in estimating business impact and identifying the root cause of an issue in quickly.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/full-stack-cover.png" alt="Full stack correlation" style="width:100%;" >}}

This guide walks you through how to correlate your full stack data. Depending on your use case, you may skip certain steps below. Steps that are dependent on others are explicitly stated.

1. [Correlate server-side logs with traces](#correlate-server-side-logs-with-traces)
   * [Correlate application logs](#correlate-application-logs)
   * [Correlate proxy logs](#correlate-proxy-logs)
   * [Correlate database logs](#correlate-database-logs)
2. [Correlate frontend products](#correlate-frontend-products)
   * [Correlate browser logs with RUM](#correlate-browser-logs-with-rum)
3. [Correlate user experience with server behavior](#correlate-user-experience-with-server-behavior)
   * [Correlate RUM views with traces](#correlate-rum-views-with-traces)
   * [Leverage trace correlation to troubleshoot Synthetic tests](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

## Correlate server-side logs with traces

When your users are encountering errors or high latency in your application, viewing the specific logs from a problematic request can reveal exactly what went wrong. By pulling together all the logs pertaining to a given request, you can see in rich detail how it was handled from beginning to end so you can quickly diagnose the issue.

Correlating your logs with traces also eases [aggressive sampling strategy without losing entity-level consistency][2] with the use of `trace_id`.

[Correlating application logs](#correlate-application-logs) offers extensive visibility across your stack, but some specific use cases require correlation deeper into your stack. Follow the links to complete setup per use case:

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

#### NGINX

##### Setup opentracing

Follow [NGINX tracing integration][5].

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

2. Customize the first [grok parser][6]:
   - In **Parsing rules**, replace the first parsing rule with:
   ```text
   access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)
   ```
   - In **Advanced settings** under **Helper Rules**, add the line:
   ```text
   _trace_id %{notSpace:dd.trace_id:nullIf("-")}
   ```

3. Add a [trace ID remapper][7] on `dd.trace_id` attribute.

### Correlate database logs

#### Why?

Database logs are often hard to contextualize due to query similarities, variable anonymization, and high usage.

For example, production slow queries are hard to reproduce and analyze without investing a lot of time and resources. Below is an example of how to correlate slow query analysis with traces.

#### How?

#### PostgreSQL

##### Enrich your database logs

PostgreSQL default logs are not detailed. Follow [this integration guide][8] to enrich them.

Slow query best practices also suggests logging execution plans of slow statements automatically, so you don't have to run `EXPLAIN` by hand. To run `EXPLAIN` automatically, update `/etc/postgresql/<VERSION>/main/postgresql.conf` with:

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500ms'
```

Queries longer than 500ms log their execution plan.

**Note**: `auto_explain.log_analyze = 'true'` provides even more information, but greatly impacts performance. For more information, see the [official documentation][9].

##### Inject trace_id into your database logs

Inject `trace_id` into most of your database logs with [SQL comments][10]. Here is an example with Flask and SQLAlchemy:

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace import tracer
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_ctx = tracer.get_log_correlation_context()
        statement = f"{statement} -- dd.trace_id=<{trace_ctx['trace_id']}>"
        return statement, parameters
```

**Note**: This only correlates logs that include a query statement. Error logs like `ERROR:  duplicate key value violates unique constraint "<TABLE_KEY>"` stay out of context. Most of the time you can still get error information through your application logs.

Clone and customize the PostgreSQL pipeline:

1. Add a new [grok parser][6]:
   ```text
   extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+%{data}
   ```

2. Add a [trace ID remapper][7] on `dd.trace_id` attribute.

Here is an example of a slow query execution plan from a slow trace:

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/slow-query-root-cause.png" alt="Slow query logs correlation" style="width:100%;" >}}

## Correlate frontend products

### Correlate browser logs with RUM & Session Replay

#### Why?

[Browser logs][11] inside a RUM event give context and insight into an issue. In the following example, browser logs indicate that the root cause of the bad query is an invalid user ID.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/browser-logs-in-rum.png" alt="Browser logs in a RUM action" style="width:100%;" >}}

Correlating your browser logs with RUM also eases [aggressive sampling strategy without losing entity-level consistency][2] with the use of attributes like `session_id` and `view.id`.

#### How?

Browser logs and RUM events are automatically correlated. For more information, see [RUM & Session Replay Billing][12]. You must [match configurations between the RUM Browser SDK and Logs SDK][13].

## Correlate user experience with server behavior

Traditional backend and frontend monitoring are siloed and may require separate workflows to troubleshoot across a stack. Datadog's full stack correlations allow you to identify a root cause—whether it comes from a browser issue or a database downtime—and estimate the user impact.

This section walks you through how to enable these correlations:

* [Correlate RUM views with traces](#correlate-rum-views-with-traces)
* [Leverage the trace correlation to troubleshoot Synthetic tests](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

### Correlate RUM views with traces

#### Why?

The APM integration with RUM & Session Replay allows you to see your frontend and backend data in one lens, in addition to:

* Quickly pinpoint issues anywhere in your stack, including the frontend
* Fully understand what your users are experiencing

#### How?

You can access RUM views in the [Trace Explorer][14] and APM traces in the [RUM Explorer][15]. For more information, see [Connect RUM and Traces][16]. 

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/trace-details-rum.png" alt="RUM information in a trace" style="width:100%;" >}}

There is no direct correlation between RUM views and server logs. To see RUM events in a log and logs in a RUM event, click in the **Traces** tab. 

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/rum-action-server-logs.png" alt="Logs in a RUM action trace preview" style="width:100%;" >}}

### Leverage trace correlation to troubleshoot Synthetic tests

#### Why?

The APM integration with Synthetic Monitoring allows you to navigate from a failed test run to the root cause of the issue with the trace generated by the test.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/synthetic-trace-root-cause.png" alt="Root cause of a synthetic test fail" style="width:100%;" >}}

Having network-related specifics from your test, in addition to backend, infrastructure, and log information from your trace, and RUM events (for [browser tests][17] only) allows you to access additional details about your application's behavior and user experience.

#### How?

After enabling APM on your application's endpoint, you can access APM traces in the [Synthetic Monitoring & Continuous Testing page][18]. 

For more information, see [Connect Synthetic Tests and Traces][19].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: /logs/indexes/#sampling-consistently-with-higher-level-entities
[3]: /tracing/other_telemetry/connect_logs_and_traces
[4]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
[5]: /tracing/trace_collection/proxy_setup/?tab=nginx
[6]: /logs/log_configuration/processors/#grok-parser
[7]: /logs/log_configuration/processors/#trace-remapper
[8]: /integrations/postgres/?tab=host#log-collection
[9]: https://www.postgresql.org/docs/13/auto-explain.html
[10]: https://www.postgresql.org/docs/13/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
[11]: /logs/log_collection/javascript/
[12]: /account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[13]: /real_user_monitoring/browser/setup/#initialization-parameters
[14]: https://app.datadoghq.com/apm/traces
[15]: https://app.datadoghq.com/rum/explorer
[16]: /real_user_monitoring/platform/connect_rum_and_traces
[17]: /synthetics/browser_tests/
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /synthetics/apm
