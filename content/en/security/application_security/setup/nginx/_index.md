---
title: Enabling App and API Protection for Nginx
further_reading:
    - link: 'https://github.com/DataDog/nginx-datadog/'
      tag: "Source Code"
      text: "nginx integration's source code"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---
{{< partial name="app_and_api_protection/callout.html" >}}

## Overview
Learn how to set up App and API Protection (AAP) on your NGINX proxy by selecting the integration that suits you best.

## Environments

### Hosts
{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
{{< /appsec-integrations >}}

### Kubernetes
{{< appsec-integrations >}}
{{< appsec-integration name="Kubernetes" avatar="kubernetes" link="./ingress-controller" >}}
{{< /appsec-integrations >}}

## Additional Resources

- [Troubleshooting Guide][2]
- [Compatibility Information][3]

[1]: https://github.com/DataDog/nginx-datadog/
[2]: /security/application_security/setup/php/troubleshooting
[3]: /security/application_security/setup/php/compatibility
