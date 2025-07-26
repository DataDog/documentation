---
title: Set up App and API Protection for Python on Windows
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
{{% app_and_api_protection_python_overview %}}

## Prerequisites

- Windows operating system
- Python application
- Administrator privileges for some configuration steps
- Your Datadog API key
- Datadog Python tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Windows](/agent/?tab=Windows).

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Install the Datadog Python tracing library:

```powershell
pip install ddtrace
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Set the required environment variables and start your Python application:

```powershell
$env:DD_APPSEC_ENABLED="true"
$env:DD_SERVICE="<YOUR_SERVICE_NAME>"
$env:DD_ENV="<YOUR_ENVIRONMENT>"

ddtrace-run python app.py
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Set the required environment variables and start your Python application:

```powershell
$env:DD_APPSEC_ENABLED="true"
$env:DD_APM_TRACING_ENABLED="false"
$env:DD_SERVICE="<YOUR_SERVICE_NAME>"
$env:DD_ENV="<YOUR_ENVIRONMENT>"

ddtrace-run python app.py
```

{{% /collapse-content %}}

## 3. Run your application

Start your Python application with the configured settings.

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Python application, see the [Python App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/python/compatibility
[2]: /security/application_security/setup/python/troubleshooting
