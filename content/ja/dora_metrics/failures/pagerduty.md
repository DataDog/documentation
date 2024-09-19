---
description: DORA Metrics のインシデントのデータソースとして PagerDuty を構成する方法を説明します。
further_reading:
- link: /dora_metrics/failures
  tag: ドキュメント
  text: 他のインシデントデータソースのオプションを見る
- link: /dora_metrics/deployments
  tag: ドキュメント
  text: DORA Metrics のデプロイメントのセットアップについて
- link: /service_management/events
  tag: ドキュメント
  text: Event Management については、
- link: /monitors/types/metric
  tag: ドキュメント
  text: Metric Monitors について
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
is_beta: true
title: DORA Metrics のための  PagerDuty の構成
---

{{< site-region region="gov" >}}
DORA Metrics は、選択されたサイト ({{< region-param key="dd_site_name" >}}) では現在利用できません。{{< /site-region >}} DORA Metrics は公開ベータ版です。

## 概要

[PagerDuty][7] は、IT チームにインシデントの即時可視性を提供し、運用上の安定性と回復力を維持するための積極的かつ効果的な対応を可能にするインシデント管理プラットフォームです。

[PagerDuty のインシデント][1]は、DORA Metrics の障害データソースとして構成できます。

## セットアップ

PagerDuty アカウントを DORA Metrics に統合するには、PagerDuty の **Integrations > Developer Tools** に移動し、**Generic Webhook (v3)** をクリックします。

1. **+ New Webhook** をクリックし、以下の詳細を入力します。

   | 変数 | 説明 |
   |---|---|
   | Webhook URL | `https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/` を追加します。 |
   | Scope Type | アカウント内のすべての PagerDuty サービスにインシデントを送信するには、**Account** を選択します。 または、異なるスコープタイプを選択することで、特定のサービスやチームにインシデントを送信することもできます。
   | Description | 説明を追加することで、Webhook を区別しやすくなります。`Datadog DORA Metrics integration` のような内容を追加します。
   | Event Subscription | 以下のイベントを選択します。<br>-`incident.acknowledged`<br>-`incident.annotated`<br>-`incident.custom_field_values.updated`<br>-`incident.delegated`<br>-`incident.escalated`<br>-`incident.priority_updated`<br>-`incident.reassigned`<br>-`incident.reopened`<br>-`incident.resolved`<br>-`incident.triggered`<br>-`incident.unacknowledged` |
   | Custom Headers | **Add custom header** をクリックし、名前に `DD-API-KEY` と入力し、値に [Datadog API キー][2]を入力します。<br> <br>オプションとして、Webhook から送信されたすべての PagerDuty インシデントに環境を追加するには、`dd_env` という名前の追加のカスタムヘッダーを作成し、希望する環境を値として指定します。

1. Webhook を保存するには、**Add Webhook** をクリックします。

DORA Metrics 製品におけるインシデントの重大度は、PagerDuty の[インシデント優先度][5]に基づきます。

**注:** Webhook の作成時に新しいシークレットが作成され、すべての Webhook ペイロードの署名に使用されますが、インテグレーションの動作には API キーを使用して認証が行われるため、そのシークレットは必要ありません。

### PagerDuty サービスを Datadog サービスにマッピングする

特定の [PagerDuty サービス][3]に対してインシデントイベントが受信されると、Datadog は[サービスカタログ][4]から関連する Datadog サービスとチームを取得しようと試みます。

一致するアルゴリズムは、以下のシナリオで機能します。

1. インシデントサービスの URL が、サービスカタログで 1 つ以上のサービスに対して構成された PagerDuty サービス URL と一致する場合:
   - インシデントサービス URL が単一の Datadog サービスと一致する場合、インシデントメトリクスとイベントは、サービスカタログから取得した Datadog サービス名とチームで発行されます。
   - インシデントサービス URL が複数の Datadog サービスと一致する場合、インシデントメトリクスとイベントは Datadog チーム名で発行されます。

Datadog サービス用の PagerDuty サービス URL の設定に関する詳細は、[サービスカタログとのインテグレーションを利用する][6]を参照してください。

2. インシデントの PagerDuty サービス名がサービスカタログ内の Datadog サービス名と一致する場合、インシデントメトリクスとイベントは、サービスカタログから取得した Datadog サービス名とチームで発行されます。
3. インシデントの PagerDuty チーム名がサービスカタログ内の Datadog チーム名と一致する場合、インシデントメトリクスとイベントは対応する Datadog チーム名で発行されます。
4. インシデントの PagerDuty サービス名がサービスカタログ内の Datadog チーム名と一致する場合、インシデントメトリクスとイベントは Datadog チーム名で発行されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/incidents
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://support.pagerduty.com/docs/services-and-integrations
[4]: /ja/service_catalog/
[5]: https://support.pagerduty.com/docs/incident-priority
[6]: /ja/service_catalog/integrations/#pagerduty-integration
[7]: /ja/integrations/pagerduty/