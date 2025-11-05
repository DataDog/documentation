---
title: Set up App and API Protection for PHP in Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
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
{{% app_and_api_protection_php_setup_options platform="docker" %}}

{{% app_and_api_protection_php_overview %}}

## Prerequisites

- Docker installed on your host
- PHP application containerized with Docker
- Your Datadog API key
- Datadog PHP tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Docker](/agent/?tab=cloud_and_container).

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Add the following to your Dockerfile:

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Add the following to your Dockerfile:

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Disable apm
ENV DD_APM_TRACING_ENABLED=false
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /collapse-content %}}

## 3. Run your application
Build your image and then run your container.

When running your container, ensure you do the following:
1. Connect the container to the same Docker network as the Datadog Agent.
2. Set the required environment variables.

```bash
docker run -d \
  --name your-php-app \
  your-php-app-image
```

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your PHP application, see the [PHP App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/php/compatibility
[2]: /security/application_security/setup/php/troubleshooting
