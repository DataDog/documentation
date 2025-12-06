---
title: Instrumenting Apache HTTP Server
code_lang: httpd
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: "https://github.com/DataDog/httpd-datadog"
  tag: "Source Code"
  text: "Datadog Module for Apache HTTP Server"
aliases:
- /tracing/proxies
- /tracing/proxies/httpd
- /tracing/setup_overview/httpd/
- /tracing/setup_overview/proxy_setup/
---

Datadog provides an HTTPd [module][1] to enhance [Apache HTTP Server][2] and [IHS HTTP Server][3] capabilities with APM Tracing.

## Compatibility

Since IHS HTTP Server is essentially a wrapper of the Apache HTTP Server, the module can also be used with IHS without any modifications.

## Installation

<div class="alert alert-danger">
  <strong>Note</strong>: Only Apache HTTP Server 2.4.x for x86_64 architecture is supported.
</div>

The module is provided as a shared library for dynamic loading by HTTPd. Each supported platform
and architecture has its own artifact hosted on [httpd-datadog's repository][1].

To install the module:

1. Run the following script to download the latest version of the module:

   ```bash
   cd /tmp && \
       # Get latest release info using curl and basic text processing
       RELEASE_DATA=$(curl -s https://api.github.com/repos/DataDog/httpd-datadog/releases/latest) && \
       
       # Extract download URL for the zip file using grep and sed
       DOWNLOAD_URL=$(echo "$RELEASE_DATA" | grep '"browser_download_url".*mod_datadog_artifact.zip' | sed 's/.*"browser_download_url": *"\([^"]*\)".*/\1/') && \
       
       # Download and install
       curl -Lf -o mod_datadog_artifact.zip "$DOWNLOAD_URL" && \
       unzip -j mod_datadog_artifact.zip -d /usr/lib/apache2/modules/ && \
       rm mod_datadog_artifact.zip
   ```

   This script downloads the latest release artifact zip file, extracts the `mod_datadog.so` shared library directly to the Apache modules directory, and cleans up the temporary files.

1. If you used a different installation method or need to place the file manually, ensure the `mod_datadog.so` file is in the directory where HTTPd searches for modules, typically `/usr/local/apache2/modules` or `/usr/lib/apache2/modules/`.

1. Load the module by adding the following line in the configuration file:

   ```nginx
   LoadModule datadog_module modules/mod_datadog.so
   ```

1. To enable the module, make sure to restart or reload HTTPd.

## Configuration

By default, all requests are traced and sent to the Datadog Agent.

To change the module default behavior, use `Datadog*` directives described in the Datadog module's [API documentation][3].

For example, the following configuration sets the service name to `my-service` and the sampling rate to 10%:

```nginx
LoadModule datadog_module modules/mod_datadog.so

DatadogServiceName my-app
DatadogSamplingRate 0.1
```

## Correlating traces to logs

After you've enabled APM tracing, you can connect your traces to the corresponding Apache logs. This correlation links each trace and span to the specific log events generated during that request, allowing you to pivot between them to troubleshoot issues.

### Prerequisites

Before you begin, ensure that you have:
- Enabled APM tracing for Apache HTTP Server by following the steps earlier in this guide.
- Configured Datadog log collection for Apache HTTP Server.

### Step 1: Inject trace and span IDs into Apache logs

Modify your `LogFormat` directive to include the trace ID and the span ID using the Apache-specific variables `%{Datadog-Trace-ID}e` and `%{Datadog-Span-ID}e`. These values are `-` for requests that are not traced.

Update your Apache configuration file (for example, `/etc/apache2/apache2.conf` or `/etc/httpd/httpd.conf`):

```apache
LogFormat "%h %l %u %t \"%r\" %>s %b %D \"%{Referer}i\" \"%{User-Agent}i\" \"%{X-Forwarded-For}i\" dd.trace_id=\"%{Datadog-Trace-ID}e\" dd.span_id=\"%{Datadog-Span-ID}e\"" datadog_combined

CustomLog /var/log/apache2/access.log datadog_combined
```

After saving your changes, reload the Apache configuration. For example:

```sh
sudo systemctl reload apache2
# or
sudo apachectl -k graceful
```

### Step 2: Configure the log pipeline to parse the trace and span IDs

By default, logs capture `dd.trace_id` and `dd.span_id` in hexadecimal format:

```
172.237.96.114 - - [25/Sep/2025:14:48:52 +0000] "GET / HTTP/1.1" 200 617 28248 "-" "curl/8.7.1" "-" dd.trace_id="68d5565400000000970bf1a70782d612" dd.span_id="10884058624158782994"
```

To enable log and trace correlation in Datadog, configure a log processing pipeline to convert these IDs from hexadecimal to decimal.

1. In Datadog, navigate to the [**Log Configuration**][4] page.
2. Hover over your active Apache pipeline and click the **Clone** icon to create an editable version.
3. Click the cloned pipeline.
4. Click **Add Processor**.
5. Select [Grok Parser][5] as the processor type.
6. Define the following parsing rule to extract the trace ID attribute from a log event:
   ```text
   extract_correlation_ids %{data} dd.trace_id="%{notSpace:dd.trace_id:nullIf("-")}" dd.span_id="%{notSpace:dd.span_id:nullIf("-")}"
   ```
7. Click **Create**.
8. Click **Add Processor** again.
9. Select [Trace ID Remapper][6] as the processor type. This processor associates the parsed ID with its corresponding APM trace.
10. In the **Set trace id attribute(s)** field, enter `dd.trace_id`.
11. Click **Create**.
12. Click **Add Processor** again.
13. Select [Span ID Remapper][7] as the processor type. This processor associates the parsed ID with its corresponding APM span.
14. In the **Set span id attribute(s)** field, enter `dd.span_id`.
15. Click **Create**.
16. Save and enable your new pipeline.

Once the pipeline is active, new Apache logs are automatically correlated with their traces and spans.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/httpd-datadog
[2]: https://httpd.apache.org/
[3]: https://github.com/DataDog/httpd-datadog/blob/main/doc/configuration.md
[4]: https://app.datadoghq.com/logs/pipelines
[5]: /logs/log_configuration/processors/?tab=ui#grok-parser
[6]: /logs/log_configuration/processors/?tab=ui#trace-remapper
[7]: /logs/log_configuration/processors/?tab=ui#span-remapper
