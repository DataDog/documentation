---
title: Setup App and API Protection
disable_sidebar: true
type: multi-code-lang
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog Application & API Protection"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Tracking user activity"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB Application & API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application & API Protection"
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How Application & API Protection Works in Datadog"
---

Learn how to setup App and API Protection on all the supported platforms and environments.

<div class="alert alert-info">
  <p class="fs-bold m-0">Missing your environment?</p>
  <span>Send us a request for your missing environment <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">here</a>.</span>
</div>

## Languages

{{< appsec-integrations >}}
  {{< appsec-integration name="Python" logo="https://static.datadoghq.com/static/images/logos/python_avatar.svg" link="/security/application_security/setup/standalone/python" >}}
  {{< appsec-integration name="Node.js" logo="https://static.datadoghq.com/static/images/logos/node_avatar.svg" link="/security/application_security/setup/standalone/nodejs" >}}
  {{< appsec-integration name="Java" logo="https://static.datadoghq.com/static/images/logos/java_avatar.svg" link="/security/application_security/setup/standalone/java" >}}
  {{< appsec-integration name="Go" logo="https://static.datadoghq.com/static/images/logos/go_avatar.svg" link="/security/application_security/setup/standalone/go" >}}
  {{< appsec-integration name="Ruby" logo="https://static.datadoghq.com/static/images/logos/ruby_avatar.svg" link="/security/application_security/setup/standalone/ruby" >}}
  {{< appsec-integration name=".NET" logo="https://static.datadoghq.com/static/images/logos/dotnet_avatar.svg" link="/security/application_security/setup/standalone/dotnet" >}}
  {{< appsec-integration name="PHP" logo="https://static.datadoghq.com/static/images/logos/php_avatar.svg" link="/security/application_security/setup/standalone/php" >}}
{{< /appsec-integrations >}}

## Proxies

{{< appsec-integrations >}}
  {{< appsec-integration name="NGINX" logo="https://static.datadoghq.com/static/images/logos/nginx_avatar.svg" link="/security/application_security/setup/standalone/nginx" >}}
  {{< appsec-integration name="Envoy" logo="https://static.datadoghq.com/static/images/logos/envoy_avatar.svg" link="/security/application_security/setup/standalone/envoy" >}}
  {{< appsec-integration name="Istio" logo="https://static.datadoghq.com/static/images/logos/istio_avatar.svg" link="/security/application_security/setup/standalone/istio" >}}
{{< /appsec-integrations >}}

## Cloud and Container Platforms

### Kubernetes

{{< appsec-integrations >}}
  {{< appsec-integration name="NGINX Ingress Controller" logo="https://static.datadoghq.com/static/images/logos/nginx-ingress-controller_avatar.svg" link="/security/application_security/setup/standalone/nginx-ingress-controller" >}}
  {{< appsec-integration name="Istio" logo="https://static.datadoghq.com/static/images/logos/istio_avatar.svg" link="/security/application_security/setup/standalone/envoy" >}}
{{< /appsec-integrations >}}

### Amazon Web Services (AWS)

{{< appsec-integrations >}}
  {{< appsec-integration name="AWS WAF" logo="https://static.datadoghq.com/static/images/logos/amazon-waf_avatar.svg" link="/security/application_security/setup/standalone/aws/waf" >}}
  {{< appsec-integration name="AWS Lambda" logo="https://static.datadoghq.com/static/images/logos/amazon-lambda_avatar.svg" link="/security/application_security/setup/standalone/aws/lambda" >}}
  {{< appsec-integration name="AWS Fargate" logo="https://static.datadoghq.com/static/images/logos/aws-fargate_avatar.svg" link="/security/application_security/setup/standalone/aws/fargate" >}}
{{< /appsec-integrations >}}


### Google Cloud Platform (GCP)

{{< appsec-integrations >}}
  {{< appsec-integration name="Google Application Load Balancer" logo="https://static.datadoghq.com/static/images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/setup/standalone/gcp/service-extensions" >}}
  {{< appsec-integration name="Google Cloud Load Balancer" logo="https://static.datadoghq.com/static/images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Google Service Extension" logo="https://static.datadoghq.com/static/images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Google Cloud Run" logo="https://static.datadoghq.com/static/images/logos/google-cloud-run_avatar.svg" link="/security/application_security/setup/standalone/gcp/cloud-run" >}}
{{< /appsec-integrations >}}

### Microsoft Azure

{{< appsec-integrations >}}
  {{< appsec-integration name="Azure App Service" logo="https://static.datadoghq.com/static/images/logos/azure-appserviceenvironment_avatar.svg" link="/security/application_security/setup/standalone/azure/app_service" >}}
{{< /appsec-integrations >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
