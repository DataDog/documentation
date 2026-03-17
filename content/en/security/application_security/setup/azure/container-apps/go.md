---
title: Enabling App and API Protection for Azure Container Apps in Go
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

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

## Setup

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Follow these steps to enable App and API Protection with APM tracing on your Azure Container App.

1. **Install the Datadog Go tracer**.

   1. In your main application, add the tracing library from `dd-trace-go`.

      {{< code-block lang="shell" disable_copy="false" >}}
go get github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
{{< /code-block >}}

   2. Add the following to your application code to initialize the tracer:
      {{< code-block lang="go" disable_copy="false" >}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

   You can also add additional packages:
   {{< code-block lang="shell" disable_copy="false" >}}
# Enable Profiling
go get github.com/DataDog/dd-trace-go/v2/profiler

# Patch /net/http
go get github.com/DataDog/dd-trace-go/contrib/net/http/v2
{{< /code-block >}}

   For more information, see [Tracing Go Applications][1] and the [Tracer README][2].

   Compile your Go binary with the `appsec` build tag enabled:

   {{< code-block lang="shell" disable_copy="false" >}}
go build --tags "appsec" ...
{{< /code-block >}}

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

   In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Go, Datadog recommends writing logs in a JSON format. For example, you can use a third-party logging library such as `logrus`:
   {{< code-block lang="go" disable_copy="false" >}}
const LOG_FILE = "/LogFiles/app.log"

os.MkdirAll(filepath.Dir(LOG_FILE), 0755)
logFile, err := os.OpenFile(LOG_FILE, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
defer logFile.Close()

logrus.SetOutput(logFile)
logrus.SetFormatter(&logrus.JSONFormatter{})
logrus.AddHook(&dd_logrus.DDContextLogHook{})

logrus.WithContext(ctx).Info("Hello World!")
{{< /code-block >}}

   Datadog recommends setting the environment variable `DD_SOURCE=go` in your sidecar container to enable advanced Datadog log parsing.

   For more information, see [Correlating Go Logs and Traces][3].

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

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][4] attempt:
```sh
curl -A 'dd-test-scanner-log' https://<YOUR_APP_URL>/existing-route
```
After you enable your application and exercise it, threat information appears in the [Application Signals Explorer][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing
[3]: /tracing/other_telemetry/connect_logs_and_traces/go/
[4]: /security/default_rules/security-scan-detected/
[5]: /actions/workflows/
[6]: /security/application_security/waf-integration/
[8]: https://app.datadoghq.com/security/appsec
