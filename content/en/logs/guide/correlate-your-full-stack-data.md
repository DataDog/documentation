---
title: Correlate your full stack data
kind: guide
aliases:
  - /logs/guide/xxx
further_reading:
  - link: /logs/guide/logs-rbac/
    tag: Documentation
    text: "Set up Roles Based Access Controls (RBAC) for Log Management"
  - link: /agent/logs/advanced_log_collection
    tag: Documentation
    text: "Filter and Redact logs with Advanced Log Collection"
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: "Exclude containers from Log Collection with Autodiscovery"

---

## Overview

Logs and traces may contain valuable information that truly shine when seen together. While [logs and traces OOTB connection](https://docs.datadoghq.com/tracing/connect_logs_and_traces/) already provide solid investigation possibilities, we can push it further.

Most of the time we have all needed information when troubleshooting. The biggest issue is to find the right information at the right place.

Temporal correlation may not be enough if you have a lot of customers or if you use [Logging without Limit sampling™](https://docs.datadoghq.com/logs/guide/getting-started-lwl/).

For example, production slow queries are hard to reproduce and analyze without investing a lot of time and resources. How often do we find ourselves slicing and dicing through logs to find one critical information? On the other hand, how can we evaluate one log criticity without its context? Let's see how we can easily correlate slow query analysis with traces.

{{< img src="logs/guide/correlate-your-full-stack-data/database-slow-query-correlation.png" alt="Slow query logs correlation" style="width:80%;" >}}

Note: This example will only be used as a redline for part of the guide. We will see how to correlate many kind of services information.

This guide will cover a specific stack (NGINX, Flask with SQLAlchemy, PostgreSQL). Each action item will be defined so that you can find an equivalent for your own stack.

## Prerequisites

### Correlate your application logs

Application logs are an added value for your traces. They can even help you solving other service issues. For example most ORMs will log for you database errors.

Datadog provides [various OOTB correlations](https://docs.datadoghq.com/tracing/connect_logs_and_traces/).

If you use a custom tracer or if you have any issues, you can go on our [FAQ](https://docs.datadoghq.com/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/).

### Apply unified service tagging

With [unified service tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging) you can:

* Identify deployment impact with trace and container metrics filtered by version
* Navigate seamlessly across traces, metrics, and logs with consistent tags
* View service data based on environment or version in a unified fashion within the Datadog app

## Correlate your webaccess logs

Webaccess logs can provide you higher-tier information than application logs.

For NGINX, you can update the NGINX log format by adding the following configuration block in the http section of your NGINX configuration file `/etc/nginx/nginx.conf`:

```conf
http {
  log_format main '$remote_addr - $opentracing_context_x_datadog_trace_id $http_x_forwarded_user [$time_local] "$request" '
          '$status $body_bytes_sent "$http_referer" '
          '"$http_user_agent" "$http_x_forwarded_for" ';

  access_log /var/log/nginx/access.log;
}
```

You can now customize NGINX pipeline first grok parser:

- Parsing rules:
```text
access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)

access.combined %{access.common} (%{number:duration:scale(1000000000)} )?"%{_referer}" "%{_user_agent}"( "%{_x_forwarded_for}")?.*

error.format %{date("yyyy/MM/dd HH:mm:ss"):date_access} \[%{word:level}\] %{data:error.message}(, %{data::keyvalue(": ",",")})?
```
- Advanced settings -> Helper Rules:
```text
_auth %{notSpace:http.auth:nullIf("-")}
_bytes_written %{integer:network.bytes_written}
_client_ip %{ipOrHost:network.client.ip}
_version HTTP\/%{regex("\\d+\\.\\d+"):http.version}
_url %{notSpace:http.url}
_ident %{notSpace:http.ident:nullIf("-")}
_user_agent %{regex("[^\\\"]*"):http.useragent}
_referer %{notSpace:http.referer}
_status_code %{integer:http.status_code}
_method %{word:http.method}
_date_access %{date("dd/MMM/yyyy:HH:mm:ss Z"):date_access}
_x_forwarded_for %{regex("[^\\\"]*"):http._x_forwarded_for:nullIf("-")}
_trace_id %{notSpace:dd.trace_id:nullIf("-")}
```

Do not forget to add a Trace Id remapper.

You should now see your NGINX logs in your traces.

## Correlate your database logs

As said in the introduction, database logs are hard to contextualize. Let's simplify it on PostgreSQL.

### Enrich your database logs

PostgreSQL default logs are not detailed. Follow [this integration guide](https://docs.datadoghq.com/integrations/postgres/?tab=host#log-collection) to enrich them.

Following our redline, we also want to have rich plan explanation on our slow queries. For having execution plan results, update `/etc/postgresql/<VERSION>/main/postgresql.conf` with:

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500s'
```

Your query longer than 500ms will now log their execution plan.

Note: `auto_explain.log_analyze = 'true'` provide even more information but greatly impact performance. You can learn more on the [official documentation](https://www.postgresql.org/docs/9.2/auto-explain.html).

### Inject trace_id into your database logs

SQL logs are now enriched, but still not correlated. Using SQL comments, we can inject `trace_id` into most of our database logs. Here is an example with Flask and SQLAlchemy:

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace.helpers import get_correlation_ids
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_id, span_id = get_correlation_ids()
        statement = f"{statement} -- dd.trace_id=<{trace_id or 0}> dd.span_id=<{span_id or 0}>"
        return statement, parameters
```

You can now customize PostgreSQL pipeline by adding a new grok parser:

```text
extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+dd.span_id=<%{notSpace:dd.span_id}>%{data}
```

Do not forget to add a Trace Id remapper.

Note: this will only correlate logs that include your statement. Error logs like `ERROR:  duplicate key value violates unique constraint "user_username_key"` will stay out of context. Most of the time you can still get error information through your application logs.

## Correlate your queuing logs

TODO

## Test the whole correlation from a Synthetic test

The APM integration with Synthetic Monitoring allows you to go from a test run that potentially failed to the root cause of the issue by looking at the trace generated by that very test run.

Having network-related specifics (thanks to your test) as well as backend, infrastructure, and log information (thanks to your trace) allows you to access a new level of details about the way your application is behaving, as experienced by your user.

For that, simply [enable APM integration on Synthetic settings](https://docs.datadoghq.com/synthetics/apm).

## Correlate your browser logs

TODO

## Correlate RUM views

TODO
