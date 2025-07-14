---
title: Set up App and API Protection for Java on Windows
code_lang: windows
type: multi-code-lang
code_lang_weight: 50
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
{{% app_and_api_protection_java_overview %}}

## Prerequisites

- Windows operating system
- Java application
- Administrator privileges for some configuration steps
- Your Datadog API key
- Datadog Java tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Windows][3].

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring
Download the latest version of the Datadog Java library:

```powershell
Invoke-WebRequest -Uri "https://dtdg.co/latest-java-tracer" -OutFile "dd-java-agent.jar"
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Using system properties" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using system properties:

```powershell
java -javaagent:path\to\dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path\to\app.jar
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Set the required environment variables and start your Java application:

```powershell
$env:DD_APPSEC_ENABLED="true"
$env:DD_SERVICE="<YOUR_SERVICE_NAME>"
$env:DD_ENV="<YOUR_ENVIRONMENT>"

java -javaagent:path\to\dd-java-agent.jar -jar path\to\app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.
{{< tabs >}}
{{% tab "Using system properties" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using system properties:

```powershell
java -javaagent:path\to\dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path\to\app.jar
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Set the required environment variables and start your Java application:

```powershell
$env:DD_APPSEC_ENABLED="true"
$env:DD_APM_TRACING_ENABLED="false"
$env:DD_SERVICE="<YOUR_SERVICE_NAME>"
$env:DD_ENV="<YOUR_ENVIRONMENT>"

java -javaagent:path\to\dd-java-agent.jar -jar path\to\app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Run your application

Start your Java application with the configured settings.

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/java/compatibility
[2]: /security/application_security/setup/java/troubleshooting
[3]: /agent/?tab=Windows
