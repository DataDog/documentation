---
title: Enabling App and API Protection for Azure Container Apps in Python
further_reading:
    - link: "/security/application_security/how-it-works/"
      tag: "Documentation"
      text: "How App and API Protection Works"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "App and API Protection"
---

<div class="alert alert-info">AAP support for Azure Container Apps is in Preview.</div>

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][6] to block IPs in your [WAF][7].

## Setup

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Follow these steps to enable App and API Protection with APM tracing on your Azure Container App.

1. **Install the Datadog Python tracer**.

   Add `ddtrace` to your `requirements.txt` or `pyproject.toml`. You can find the latest version on [PyPI][1]:
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   Alternatively, you can install the tracer in your Dockerfile:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   Then, wrap your start command with `ddtrace-run`:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   For more information, see [Tracing Python applications][2].

2. **Enable App and API Protection**.

   Set the following environment variable in your application container:

   ```
   DD_APPSEC_ENABLED=true
   ```

3. **Install serverless-init as a sidecar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% aca-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% aca-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "Bicep" %}}
   {{% aca-install-sidecar-bicep %}}
   {{% /tab %}}

   {{% tab "ARM Template" %}}
   {{% aca-install-sidecar-arm-template %}}
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% aca-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

4. **Set up logs**.

   In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. Datadog recommends setting the following environment variables:
   - `ENV PYTHONUNBUFFERED=1`: In your main container. Helps ensure Python outputs appear immediately in container logs instead of being buffered.
   - `ENV DD_LOGS_INJECTION=true`: In your main container. Enable log/trace correlation for supported loggers.
   - `DD_SOURCE=python`: In your sidecar container. Enable advanced Datadog log parsing.

   Then, update your logging library. For example, you can use Python's native `logging` library:
   {{< code-block lang="python" disable_copy="false" >}}
LOG_FILE = "/LogFiles/app.log"
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
        '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
        '- %(message)s')

logging.basicConfig(
    level=logging.INFO,
    format=FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

logger.info('Hello world!')
{{< /code-block >}}

   For more information, see [Correlating Python Logs and Traces][3].

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Follow the same steps as above, but set the following environment variables in your application container:

```
DD_APPSEC_ENABLED=true
DD_APM_TRACING_ENABLED=false
```

{{% /collapse-content %}}

## Testing threat detection

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][5] attempt:
```sh
curl -A 'dd-test-scanner-log' https://<YOUR_APP_URL>/existing-route
```
After you enable your application and exercise it, threat information appears in the [Application Signals Explorer][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /tracing/other_telemetry/connect_logs_and_traces/python/
[4]: https://app.datadoghq.com/security/appsec
[5]: /security/default_rules/security-scan-detected/
[6]: /actions/workflows/
[7]: /security/application_security/waf-integration/
