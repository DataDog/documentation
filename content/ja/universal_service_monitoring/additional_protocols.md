---
further_reading:
- link: /universal_service_monitoring/
  tag: ドキュメント
  text: Universal Service Monitoring
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: ブログ
  text: ユニバーサルサービスモニタリングで数秒のうちにゴールデンシグナル
is_beta: true
private: true
title: クラウドサービスの検出と追加プロトコル
---

{{< callout url="https://docs.google.com/forms/d/1dYRQxWEAC3nFsv75tlG0hbiPXd899r36v5R2ar6hJLE/" btn_hidden="true" header="プレビューに参加する！" >}}
  クラウド サービスの検出と、追加のプロトコルおよびトラフィック暗号化方式のサポートは、現在プレビュー段階です。
{{< /callout >}}

## クラウド サービスとサード パーティ API の検出

Datadog 組織でプレビューへのアクセスが付与されると、Universal Service Monitoring は、AWS S3 などのクラウド サービスや、アプリケーションが依存するサード パーティ API エンドポイントを、これらのサービス宛てに送信されるアウトバウンド リクエストを観察することで検出します。これらのサービスは Service Map で表示でき、サービス間の依存関係を把握し、スループット、エラー数、レイテンシなどのヘルス メトリクスを取得できます。

{{< img src="universal_service_monitoring/usm-beta-cloud-service-discovery.png" alt="USM によって検出されたクラウド サービスのサマリー、メトリクス、Service Map" style="width:100%;" >}}

Universal Service Monitoring は、次のサード パーティ API エンドポイントを検出できます: Jira、Slack、Auth0、Splunk、HubSpot、Intercom、Stripe、SendGrid、Braintree、Mapbox、Twitter (X)、Palo Alto Networks、TowerData、SoundCloud、Amplitude、Render、Mixpanel、GitHub、OpenAI。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}