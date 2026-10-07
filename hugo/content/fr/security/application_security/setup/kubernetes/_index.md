---
disable_sidebar: true
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protégez contre les menaces avec Datadog App and API Protection
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Suivi de l'activité des utilisateurs
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles App and API Protection prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage d'App and API Protection
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement d'App and API Protection dans Datadog
title: Configurer App and API Protection sur Kubernetes
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

Apprenez à configurer App and API Protection (AAP) sur vos clusters Kubernetes en sélectionnant l'intégration Kubernetes qui vous convient le mieux.

<div class="alert alert-info">
  <p class="fs-bold m-0">Votre environnement manque-t-il ?</p>
  <span>Envoyez-nous une demande pour votre environnement manquant <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">ici</a>.</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Istio" avatar="istio" link="./istio" >}}
  {{< appsec-integration name="Envoy Gateway" avatar="envoy" link="./envoy-gateway" >}}
  {{< appsec-integration name="Gateway API" src="integrations_logos/gateway-api_avatar.svg" link="./gateway-api" >}}
  {{< appsec-integration name="Ingress NGINX Controller" avatar="nginx" link="../nginx/ingress-controller" >}}
  {{< appsec-integration name="Google Kubernetes Engine (GKE)" src="integrations_logos/google_kubernetes_engine.png" link="./gke" >}}
{{< /appsec-integrations >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}