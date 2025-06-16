---
title: Setup App and API Protection for Java on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 30
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
---
{{< callout url="#" btn_hidden="true" header="false" >}}
You can enable App and API Protection for Java services with the following setup options:

1. If your Java service already has APM tracing, then skip to <a href="#2-configuring-your-java-application">service configuration</a>
2. Else, you can easily enable App and API Protection with Datadog's <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux/">Single Step Instrumentation</a>
3. Otherwise, keep reading for manual instructions
{{< /callout >}}

{{% app_and_api_protection_java_overview %}}

## Prerequisites

- Linux operating system
- Java application
- Root or sudo privileges
- Systemd (for service management)
- Your Datadog API key
- Datadog Java tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Linux hosts](/agent/?tab=Linux).

## 2. Enabling App and API Protection monitoring

{{< partial name="app_and_api_protection/java/navigation_menu.html" >}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Download the latest version of the Datadog Java library:

```bash
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Using system properties" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using system properties:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Set the required environment variables and start your Java application:

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.
{{< tabs >}}
{{% tab "Using system properties" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using system properties:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Set the required environment variables and start your Java application:

```bash
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Run your application

Start your Java application with above settings.

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/java/compatibility
[2]: /security/application_security/setup/java/troubleshooting

