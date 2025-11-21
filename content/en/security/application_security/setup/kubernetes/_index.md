---
title: Set up App and API Protection on Kubernetes
disable_sidebar: true
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

Learn how to set up App and API Protection (AAP) on your Kubernetes clusters by selecting the Kubernetes integration that suits you best.

<div class="alert alert-info">
  <p class="fs-bold m-0">Are you missing your environment?</p>
  <span>Send us a request for your missing environment <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">here</a>.</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Istio" avatar="istio" link="./istio" >}}
  {{< appsec-integration name="Envoy Gateway" avatar="envoy" link="./envoy-gateway" >}}
  {{< appsec-integration name="Gateway API" src="integrations_logos/gateway-api_avatar.svg" link="./gateway-api" >}}
  {{< appsec-integration name="Ingress NGINX Controller" avatar="nginx" link="../nginx/kubernetes" >}}
{{< /appsec-integrations >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
