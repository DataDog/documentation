---
aliases:
- /ja/security/application_security/threats/setup/
- /ja/security/application_security/threats/threat_management_setup/
- /ja/security/application_security/threats_detection/
- /ja/security/application_security/serverless
- /ja/security/application_security/serverless/compatibility
- /ja/security/application_security/setup/threat_detection
disable_sidebar: true
disable_toc: false
title: App と API Protection を有効にする
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

以下のすべてのサポート対象プラットフォームおよび環境で App and API Protection を有効にする方法を学びます。

<div class="alert alert-info">
  <p class="fs-bold m-0">お使いの環境が見当たりませんか？</p>
  <span>お使いの環境が見当たらない場合は、<a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">こちら</a>からリクエストをお送りください。</span>
</div>

## 言語 {#languages}

{{< appsec-integrations >}}
  {{< appsec-integration name="Python" avatar="python" link="./python" >}}
  {{< appsec-integration name="Node.js" avatar="node" link="./nodejs" >}}
  {{< appsec-integration name="Java" avatar="java" link="./java" >}}
  {{< appsec-integration name="Go" avatar="go" link="./go" >}}
  {{< appsec-integration name="Ruby" avatar="ruby" link="./ruby" >}}
  {{< appsec-integration name=".NET" avatar="dotnet" link="./dotnet" >}}
  {{< appsec-integration name="PHP" avatar="php" link="./php" >}}
{{< /appsec-integrations >}}

## プロキシ {#proxies}

{{< appsec-integrations >}}
  {{< appsec-integration name="NGINX" avatar="nginx" link="./nginx" >}}
  {{< appsec-integration name="Envoy" avatar="envoy" link="./envoy" >}}
  {{< appsec-integration name="HAProxy" avatar="haproxy" link="./haproxy" >}}
{{< /appsec-integrations >}}

## ホスト {#hosts}

{{< appsec-integrations >}}
  {{< appsec-integration name="Docker" avatar="docker" link="./docker" >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
  {{< appsec-integration name="macOS" avatar="apple" link="./macos" >}}
  {{< appsec-integration name="Windows" avatar="windows" link="./windows" >}}
{{< /appsec-integrations >}}

## Kubernetes (K8s) {#kubernetes-k8s}

{{< appsec-integrations >}}
  {{< appsec-integration name="Istio" avatar="istio" link="./kubernetes/istio" >}}
  {{< appsec-integration name="Envoy Gateway" avatar="envoy" link="./kubernetes/envoy-gateway" >}}
  {{< appsec-integration name="Gateway API" src="integrations_logos/gateway-api_avatar.svg" link="./kubernetes/gateway-api" >}}
  {{< appsec-integration name="Ingress NGINX Controller" avatar="nginx" link="./nginx/ingress-controller" >}}
  {{< appsec-integration name="Google Kubernetes Engine (GKE)" src="integrations_logos/google_kubernetes_engine.png" link="./kubernetes/gke" >}}
{{< /appsec-integrations >}}

## クラウドプラットフォーム {#cloud-platforms}

### Amazon Web Services (AWS) {#amazon-web-services-aws}

{{< appsec-integrations >}}
  {{< appsec-integration name="AWS Lambda" avatar="amazon-lambda" link="./aws/lambda" >}}
  {{< appsec-integration name="AWS Fargate" avatar="aws-fargate" link="./aws/fargate" >}}
  {{< appsec-integration name="AWS WAF" avatar="amazon-waf" link="./aws/waf" >}}
{{< /appsec-integrations >}}

### Google Cloud Platform (GCP) {#google-cloud-platform-gcp}

{{< appsec-integrations >}}
  {{< appsec-integration name="Google Application Load Balancer" avatar="google-cloud-loadbalancing" link="./gcp/alb" >}}
  {{< appsec-integration name="Google Cloud Load Balancer" avatar="google-cloud-loadbalancing" link="./gcp/alb" >}}
  {{< appsec-integration name="Google Service Extensions" avatar="google-cloud-loadbalancing" link="./gcp/service-extensions" >}}
  {{< appsec-integration name="Google Cloud Run" avatar="google-cloud-run" link="./gcp/cloud-run" >}}
  {{< appsec-integration name="Google Kubernetes Engine (GKE)" src="integrations_logos/google_kubernetes_engine.png" link="./kubernetes/gke" >}}
{{< /appsec-integrations >}}

### Microsoft Azure {#microsoft-azure}

{{< appsec-integrations >}}
  {{< appsec-integration name="Azure App Service" avatar="azure-appserviceenvironment" link="./azure/app-service" >}}
  {{< appsec-integration name="Azure API Management" avatar="azure-apimanagement" link="./azure/api-management" >}}
{{< /appsec-integrations >}}