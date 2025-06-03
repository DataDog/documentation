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
  {{< appsec-integration name="Python" logo="{{.Site.Params.img_url}}images/logos/python_avatar.svg" link="/security/application_security/threats/setup/standalone/python" >}}
  {{< appsec-integration name="Node.js" logo="{{.Site.Params.img_url}}images/logos/node_avatar.svg" link="/security/application_security/threats/setup/standalone/nodejs" >}}
  {{< appsec-integration name="Java" logo="{{.Site.Params.img_url}}images/logos/java_avatar.svg" link="/security/application_security/threats/setup/standalone/java" >}}
  {{< appsec-integration name="Go" logo="{{.Site.Params.img_url}}images/logos/go_avatar.svg" link="/security/application_security/threats/setup/standalone/go" >}}
  {{< appsec-integration name="Ruby" logo="{{.Site.Params.img_url}}images/logos/ruby_avatar.svg" link="/security/application_security/threats/setup/standalone/ruby" >}}
  {{< appsec-integration name=".NET" logo="{{.Site.Params.img_url}}images/logos/dotnet_avatar.svg" link="/security/application_security/threats/setup/standalone/dotnet" >}}
  {{< appsec-integration name="PHP" logo="{{.Site.Params.img_url}}images/logos/php_avatar.svg" link="/security/application_security/threats/setup/standalone/php" >}}
{{< /appsec-integrations >}}

## Proxies

{{< appsec-integrations >}}
  {{< appsec-integration name="NGINX" logo="{{.Site.Params.img_url}}images/logos/nginx_avatar.svg" link="/security/application_security/threats/setup/standalone/nginx" >}}
  {{< appsec-integration name="Envoy" logo="{{.Site.Params.img_url}}images/logos/envoy_avatar.svg" link="/security/application_security/threats/setup/standalone/envoy" >}}
  {{< appsec-integration name="Istio" logo="{{.Site.Params.img_url}}images/logos/istio_avatar.svg" link="/security/application_security/threats/setup/standalone/istio" >}}
{{< /appsec-integrations >}}

## Host Platforms

{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" logo="{{.Site.Params.img_url}}images/logos/linux_avatar.svg" link="/security/application_security/threats/setup/standalone/linux" >}}
  {{< appsec-integration name="Docker" logo="{{.Site.Params.img_url}}images/logos/docker_avatar.svg" link="/security/application_security/threats/setup/standalone/docker" >}}
  {{< appsec-integration name="Windows" logo="{{.Site.Params.img_url}}images/logos/windows_avatar.svg" link="/security/application_security/threats/setup/standalone/windows" >}}
{{< /appsec-integrations >}}

## Cloud and Container Platforms

### Kubernetes

{{< appsec-integrations >}}
  {{< appsec-integration name="Kubernetes" logo="{{.Site.Params.img_url}}images/logos/kubernetes_avatar.svg" link="/security/application_security/threats/setup/standalone/kubernetes" >}}
  {{< appsec-integration name="NGINX Ingress Controller" logo="{{.Site.Params.img_url}}images/logos/nginx-ingress-controller_avatar.svg" link="/security/application_security/threats/setup/standalone/kubernetes/nginx-ingress-controller" >}}
  {{< appsec-integration name="Istio" logo="{{.Site.Params.img_url}}images/logos/istio_avatar.svg" link="/security/application_security/threats/setup/standalone/istio" >}}
{{< /appsec-integrations >}}

### Amazon Web Services (AWS)

{{< appsec-integrations >}}
  {{< appsec-integration name="AWS WAF" logo="{{.Site.Params.img_url}}images/logos/amazon-waf_avatar.svg" link="/security/application_security/threats/setup/standalone/aws/waf" >}}
  {{< appsec-integration name="AWS Lambda" logo="{{.Site.Params.img_url}}images/logos/amazon-lambda_avatar.svg" link="/security/application_security/threats/setup/standalone/aws/lambda" >}}
  {{< appsec-integration name="AWS Fargate" logo="{{.Site.Params.img_url}}images/logos/aws-fargate_avatar.svg" link="/security/application_security/threats/setup/standalone/aws/fargate" >}}
{{< /appsec-integrations >}}

### Google Cloud Platform (GCP)

{{< appsec-integrations >}}
  {{< appsec-integration name="Google Application Load Balancer" logo="{{.Site.Params.img_url}}images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/threats/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Google Cloud Load Balancer" logo="{{.Site.Params.img_url}}images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/threats/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Google Service Extensions" logo="{{.Site.Params.img_url}}images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/threats/setup/standalone/gcp/service-extensions" >}}
  {{< appsec-integration name="Google Cloud Run" logo="{{.Site.Params.img_url}}images/logos/google-cloud-run_avatar.svg" link="/security/application_security/threats/setup/standalone/gcp/cloud-run" >}}
{{< /appsec-integrations >}}

### Microsoft Azure

{{< appsec-integrations >}}
  {{< appsec-integration name="Azure App Service" logo="{{.Site.Params.img_url}}images/logos/azure-appserviceenvironment_avatar.svg" link="/security/application_security/threats/setup/standalone/azure/app_service" >}}
{{< /appsec-integrations >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
