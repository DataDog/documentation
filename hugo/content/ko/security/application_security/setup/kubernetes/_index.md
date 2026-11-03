---
disable_sidebar: true
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog App 및 API Protection을 사용하여 위협으로부터 보호하십시오.
- link: /security/application_security/add-user-info/
  tag: 설명서
  text: 사용자 활동 추적
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB 앱 및 API 보호 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: 앱 및 API 보호 트러블슈팅
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: Datadog에서 App 및 API Protection이 작동하는 방식
title: Kubernetes에 App 및 API Protection을 설정하십시오.
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

가장 적합한 Kubernetes 통합을 선택하여 Kubernetes 클러스터에 App 및 API Protection(AAP)을 설정하는 방법을 알아보십시오.

<div class="alert alert-info">
  <p class="fs-bold m-0">환경이 누락되었습니까?</p>
  <span>누락된 환경에 대한 요청을 <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">여기</a>로 보내주십시오.</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Istio" avatar="istio" link="./istio" >}}
  {{< appsec-integration name="Envoy Gateway" avatar="envoy" link="./envoy-gateway" >}}
  {{< appsec-integration name="Gateway API" src="integrations_logos/gateway-api_avatar.svg" link="./gateway-api" >}}
  {{< appsec-integration name="Ingress NGINX Controller" avatar="nginx" link="../nginx/ingress-controller" >}}
  {{< appsec-integration name="Google Kubernetes Engine (GKE)" src="integrations_logos/google_kubernetes_engine.png" link="./gke" >}}
{{< /appsec-integrations >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}