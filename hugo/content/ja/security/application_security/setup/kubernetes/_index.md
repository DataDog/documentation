---
disable_sidebar: true
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Protect against Threats with Datadog App and API Protection
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: ユーザーアクティビティの追跡
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection（AAP）ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection（AAP）のトラブルシューティング
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: How App and API Protection Works in Datadog
title: Kubernetes での App and API Protection（AAP）のセットアップ
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection（AAP）は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

最適な Kubernetes インテグレーションを選択して、Kubernetes クラスターで App and API Protection（AAP）をセットアップする方法を学びます。

<div class="alert alert-info">
  <p class="fs-bold m-0">環境が見当たりませんか？</p>
  <span>不足している環境については、<a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">こちら</a>からリクエストを送信してください。</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Istio" avatar="istio" link="./istio" >}}
  {{< appsec-integration name="Envoy Gateway" avatar="envoy" link="./envoy-gateway" >}}
  {{< appsec-integration name="Gateway API" src="integrations_logos/gateway-api_avatar.svg" link="./gateway-api" >}}
  {{< appsec-integration name="Ingress NGINX Controller" avatar="nginx" link="../nginx/ingress-controller" >}}
  {{< appsec-integration name="Google Kubernetes Engine (GKE)" src="integrations_logos/google_kubernetes_engine.png" link="./gke" >}}
{{< /appsec-integrations >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}