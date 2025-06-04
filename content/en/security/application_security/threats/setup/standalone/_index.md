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

Learn how to setup App and API Protection on all the following supported platforms and environments.

<div class="alert alert-info">
  <p class="fs-bold m-0">Are you missing your environment?</p>
  <span>Send us a request for your missing environment <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">here</a>.</span>
</div>

## Languages

{{< appsec-integrations >}}
  {{< appsec-integration name="Python" avatar="python" link="python" >}}
  {{< appsec-integration name="Node.js" avatar="node link="nodejs" >}}
  {{< appsec-integration name="Java" avatar="java" link="/security/application_security/threats/setup/standalone/java" >}}
  {{< appsec-integration name="Go" avatar="go" link="/security/application_security/threats/setup/standalone/go" >}}
  {{< appsec-integration name="Ruby" avatar="ruby" link="/security/application_security/threats/setup/standalone/ruby" >}}
  {{< appsec-integration name=".NET" avatar="dotnet" link="/security/application_security/threats/setup/standalone/dotnet" >}}
  {{< appsec-integration name="PHP" avatar="php" link="/security/application_security/threats/setup/standalone/php" >}}
{{< /appsec-integrations >}}

## Proxies

{{< appsec-integrations >}}
  {{< appsec-integration name="NGINX" avatar="nginx" link="/security/application_security/threats/setup/standalone/nginx" >}}
  {{< appsec-integration name="Envoy" avatar="envoy" link="/security/application_security/threats/setup/standalone/envoy" >}}
  {{< appsec-integration name="Istio" avatar="istio" link="/security/application_security/threats/setup/standalone/istio" >}}
{{< /appsec-integrations >}}

## Host Platforms

{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" avatar="linux" link="/security/application_security/threats/setup/standalone/linux" >}}
  {{< appsec-integration name="Docker" avatar="docker" link="/security/application_security/threats/setup/standalone/docker" >}}
  {{< appsec-integration name="Windows" avatar="windows" link="/security/application_security/threats/setup/standalone/windows" >}}
{{< /appsec-integrations >}}

## Cloud and Container Platforms

### Kubernetes

{{< appsec-integrations >}}
  {{< appsec-integration name="Kubernetes" avatar="kubernetes" link="/security/application_security/threats/setup/standalone/kubernetes" >}}
  {{< appsec-integration name="NGINX Ingress Controller" avatar="nginx-ingress-controller" link="/security/application_security/threats/setup/standalone/kubernetes/nginx-ingress-controller" >}}
  {{< appsec-integration name="Istio" avatar="istio" link="/security/application_security/threats/setup/standalone/istio" >}}
{{< /appsec-integrations >}}

### Amazon Web Services (AWS)

{{< appsec-integrations >}}
  {{< appsec-integration name="AWS WAF" avatar="amazon-waf" link="/security/application_security/threats/setup/standalone/aws/waf" >}}
  {{< appsec-integration name="AWS Lambda" avatar="amazon-lambda" link="/security/application_security/threats/setup/standalone/aws/lambda" >}}
  {{< appsec-integration name="AWS Fargate" avatar="aws-fargate" link="/security/application_security/threats/setup/standalone/aws/fargate" >}}
{{< /appsec-integrations >}}

### Google Cloud Platform (GCP)

{{< appsec-integrations >}}
  {{< appsec-integration name="Google Application Load Balancer" avatar="google-cloud-loadbalancing" link="/security/application_security/threats/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Google Cloud Load Balancer" avatar="google-cloud-loadbalancing" link="/security/application_security/threats/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Google Service Extensions" avatar="google-cloud-loadbalancing" link="/security/application_security/threats/setup/standalone/gcp/service-extensions" >}}
  {{< appsec-integration name="Google Cloud Run" avatar="google-cloud-run" link="/security/application_security/threats/setup/standalone/gcp/cloud-run" >}}
{{< /appsec-integrations >}}

### Microsoft Azure

{{< appsec-integrations >}}
  {{< appsec-integration name="Azure App Service" avatar="azure-appserviceenvironment" link="/security/application_security/threats/setup/standalone/azure/app_service" >}}
{{< /appsec-integrations >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
