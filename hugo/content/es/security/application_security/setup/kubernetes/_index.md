---
disable_sidebar: true
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protéjase contra amenazas con Datadog App and API Protection
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Seguimiento de la actividad del usuario
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas OOTB de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection en Datadog
title: Configure App and API Protection en Kubernetes
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

Aprenda a configurar App and API Protection (AAP) en sus clústeres de Kubernetes seleccionando la integración de Kubernetes que mejor se adapte a sus necesidades.

<div class="alert alert-info">
  <p class="fs-bold m-0">¿No encuentra su entorno?</p>
  <span>Envíenos una solicitud para su entorno faltante <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">aquí</a>.</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Istio" avatar="istio" link="./istio" >}}
  {{< appsec-integration name="Envoy Gateway" avatar="envoy" link="./envoy-gateway" >}}
  {{< appsec-integration name="Gateway API" src="integrations_logos/gateway-api_avatar.svg" link="./gateway-api" >}}
  {{< appsec-integration name="Ingress NGINX Controller" avatar="nginx" link="../nginx/ingress-controller" >}}
  {{< appsec-integration name="Google Kubernetes Engine (GKE)" src="integrations_logos/google_kubernetes_engine.png" link="./gke" >}}
{{< /appsec-integrations >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}