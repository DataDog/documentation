---
title: Setup App and API Protection
disable_sidebar: true
type: multi-code-lang
customClass: integrations # add the CSS class ".integrations" to the HTML body so the js loads accordingly
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

<script>
document.addEventListener('DOMContentLoaded', function() {
  const integrations = document.querySelectorAll('.integration');

  integrations.forEach(integration => {
    integration.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });

    integration.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
});
</script>

{{ .TableOfContents }}

## Language Integrations

{{< appsec-integrations integration-request-link="https://forms.gle/nMGq2Hhe7Z4sCKdy6" >}}
  {{< appsec-integration name="Python" description="Setup Application Security for Python applications" logo="https://static.datadoghq.com/static/images/logos/python_avatar.svg" link="/security/application_security/setup/standalone/python" >}}
  {{< appsec-integration name=".NET" description="Setup Application Security for .NET applications" logo="https://static.datadoghq.com/static/images/logos/dotnet_avatar.svg" link="/security/application_security/setup/standalone/dotnet" >}}
  {{< appsec-integration name="Java" description="Setup Application Security for Java applications" logo="https://static.datadoghq.com/static/images/logos/java_avatar.svg" link="/security/application_security/setup/standalone/java" >}}
  {{< appsec-integration name="Node.js" description="Setup Application Security for Node.js applications" logo="https://static.datadoghq.com/static/images/logos/node_avatar.svg" link="/security/application_security/setup/standalone/nodejs" >}}
  {{< appsec-integration name="PHP" description="Setup Application Security for PHP applications" logo="https://static.datadoghq.com/static/images/logos/php_avatar.svg" link="/security/application_security/setup/standalone/php" >}}
  {{< appsec-integration name="Go" description="Setup Application Security for Go applications" logo="https://static.datadoghq.com/static/images/logos/go_avatar.svg" link="/security/application_security/setup/standalone/go" >}}
  {{< appsec-integration name="Ruby" description="Setup Application Security for Ruby applications" logo="https://static.datadoghq.com/static/images/logos/ruby_avatar.svg" link="/security/application_security/setup/standalone/ruby" >}}
{{< /appsec-integrations >}}

## Proxy Integrations

{{< appsec-integrations integration-request-link="https://forms.gle/nMGq2Hhe7Z4sCKdy6" >}}
  {{< appsec-integration name="NGINX" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/nginx_avatar.svg" link="/security/application_security/setup/standalone/nginx" >}}
  {{< appsec-integration name="Envoy" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/envoy_avatar.svg" link="/security/application_security/setup/standalone/envoy" >}}
  {{< appsec-integration name="Istio" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/istio_avatar.svg" link="/security/application_security/setup/standalone/istio" >}}
{{< /appsec-integrations >}}

## Cloud and Containers Integrations

### Google Cloud Platform (GCP) Integrations

{{< appsec-integrations integration-request-link="https://forms.gle/nMGq2Hhe7Z4sCKdy6" >}}
  {{< appsec-integration name="Application Load Balancer" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Application Cloud Load Balancer" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Service Extension" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/google-cloud-loadbalancing_avatar.svg" link="/security/application_security/setup/standalone/gcp/alb" >}}
  {{< appsec-integration name="Cloud Run" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/google-cloud-run_avatar.svg" link="/security/application_security/setup/standalone/gcp/cloud_run" >}}
{{< /appsec-integrations >}}

### Microsoft Azure Integrations

{{< appsec-integrations integration-request-link="https://forms.gle/nMGq2Hhe7Z4sCKdy6" >}}
  {{< appsec-integration name="App Service" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/azure-appserviceenvironment_avatar.svg" link="/security/application_security/setup/standalone/azure/app_service" >}}
{{< /appsec-integrations >}}

### Amazon Web Services (AWS) Integrations

{{< appsec-integrations integration-request-link="https://forms.gle/nMGq2Hhe7Z4sCKdy6" >}}
  {{< appsec-integration name="AWS WAF" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/amazon-waf_avatar.svg" link="/security/application_security/setup/standalone/aws/waf" >}}
  {{< appsec-integration name="AWS Lambda" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/amazon-lambda_avatar.svg" link="/security/application_security/setup/standalone/aws/lambda" >}}
  {{< appsec-integration name="AWS Lambda" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/aws-fargate_avatar.svg" link="/security/application_security/setup/standalone/aws/fargate" >}}
{{< /appsec-integrations integration-request-link="https://forms.gle/nMGq2Hhe7Z4sCKdy6" >}}

### Kubernetes Integrations

{{< appsec-integrations integration-request-link="https://forms.gle/nMGq2Hhe7Z4sCKdy6" >}}
  {{< appsec-integration name="NGINX Ingress Controller" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/nginx-ingress-controller_avatar.svg" link="/security/application_security/setup/standalone/nginx-ingress-controller" >}}
  {{< appsec-integration name="Istio" description="Lorem Ipsum" logo="https://static.datadoghq.com/static/images/logos/istio_avatar.svg" link="/security/application_security/setup/standalone/envoy" >}}
{{< /appsec-integrations >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
