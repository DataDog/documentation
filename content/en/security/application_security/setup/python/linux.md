---
title: Set up App and API Protection for Python on Linux
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
{{% app_and_api_protection_python_setup_options platform="linux" %}}

{{% app_and_api_protection_python_overview %}}

## Prerequisites

- Linux operating system
- Python application
- Root or sudo privileges
- Systemd (for service management)
- Your Datadog API key
- Datadog Python tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Linux hosts](/agent/?tab=Linux).

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Install the Datadog Python tracing library:

```bash
pip install ddtrace
```

Configure and run your service with Datadog:

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Set the required environment variables and start your Python application:

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

ddtrace-run python app.py
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Set the required environment variables and start your Python application:

```bash
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

ddtrace-run python app.py
```

{{% /collapse-content %}}

## 3. Run your application

Start your Python application with the settings described above.

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Python application, see the [Python App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/python/compatibility
[2]: /security/application_security/setup/python/troubleshooting
