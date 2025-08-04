---
title: Setup App and API Protection for Node.js on Linux
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
{{% app_and_api_protection_nodejs_setup_options platform="linux" %}}

{{% app_and_api_protection_nodejs_overview %}}

## Prerequisites

- Linux operating system
- Node.js application
- Root or sudo privileges
- Systemd (for service management)
- Your Datadog API key
- Datadog Node.js tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Linux hosts](/agent/?tab=Linux).

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_nodejs_navigation_menu %}}
{{% aap_and_api_protection_nodejs_remote_config_activation %}}

### Manually enabling App and API Protection monitoring

Install the latest version of the Datadog Node.js library:

```bash
npm install dd-trace
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Start your Node.js application with the Datadog library and App and API Protection enabled:

```bash
DD_APPSEC_ENABLED=true DD_SERVICE=<YOUR_SERVICE_NAME> DD_ENV=<YOUR_ENVIRONMENT> node --require dd-trace/init app.js
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Start your Node.js application with the Datadog library and App and API Protection enabled:

```bash
DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false DD_SERVICE=<YOUR_SERVICE_NAME> DD_ENV=<YOUR_ENVIRONMENT> node --require dd-trace/init app.js
```

{{% /collapse-content %}}

## 3. Run your application

Start your Node.js application with the configured settings.

{{% aap_and_api_protection_nodejs_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Node.js application, see the [Node.js App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/nodejs/compatibility
[2]: /security/application_security/setup/nodejs/troubleshooting
