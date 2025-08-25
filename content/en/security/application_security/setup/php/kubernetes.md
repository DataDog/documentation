---
title: Set up App and API Protection for PHP in Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 20
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
{{% app_and_api_protection_php_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_php_overview %}}

## Prerequisites

- Kubernetes cluster
- PHP application containerized with Docker
- kubectl configured to access your cluster
- Helm (recommended for Agent installation)
- Your Datadog API key
- Datadog PHP tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Kubernetes](/agent/?tab=cloud_and_container).

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Install the Datadog PHP tracing library using an init container or in your application's Dockerfile:

```dockerfile
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
```

Configure and run your service with Datadog:

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Start your PHP application with App and API Protection enabled using environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-php-app
spec:
  template:
    spec:
      containers:
      - name: your-php-app
        image: <CONTAINER_IMAGE>/<TAG>
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Start your PHP application with App and API Protection enabled using environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-php-app
spec:
  template:
    spec:
      containers:
      - name: your-php-app
        image: <CONTAINER_IMAGE>/<TAG>
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

## 3. Run your application

Apply your updated deployment:

```bash
kubectl apply -f your-deployment.yaml
```

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your PHP application, see the [PHP App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/php/compatibility
[2]: /security/application_security/setup/php/troubleshooting
