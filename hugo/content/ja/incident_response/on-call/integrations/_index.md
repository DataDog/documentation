---
description: ネイティブインテグレーションまたは汎用 Webhook を使用して、サードパーティの監視、アラート、インシデントツールから Datadog
  On-Call Pages をトリガーします。
further_reading:
- link: /incident_response/on-call/
  tag: ドキュメント
  text: Datadog On-Call
- link: /incident_response/on-call/pages/
  tag: ドキュメント
  text: Page
- link: /incident_response/on-call/routing_rules/
  tag: ドキュメント
  text: ルーティングルール
title: On-Call Integrations
---
## 概要 {#overview}

Datadog On-Call は、ネイティブの Datadog モニター以外にも、複数のトリガーソースをサポートしています。サードパーティの監視、アラート、インシデント管理ツールを使用して、On-Call Teams に直接 Page を送信します。スタックのあらゆる部分からの Alerts が、構成したエスカレーションポリシーを通じて適切な担当者に届きます。詳細については、[Page をトリガーする][1]を参照してください。

このページに記載されている各ネイティブインテグレーションには、それぞれのインテグレーションタイルに設定手順が記載されています。これらの手順では、Page を送信するようにサードパーティツールを構成する方法を説明しています。また、これらのアラートを Datadog On-Call Team にマッピングする方法についても説明しています。ツールにネイティブインテグレーションがない場合は、代わりに[汎用 Webhook インテグレーション](#generic-webhook-integration)を使用してください。

## 利用可能なインテグレーション{#available-integrations}

Datadog On-Callには、以下のツール向けのネイティブページングサポートが含まれています。

{{< card-grid >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" integration_id="amazon-sns" alt="Amazon SNS" title="Amazon SNS" style="catalog" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" integration_id="azure-monitor" alt="Azure Monitor" title="Azure Monitor" style="catalog" >}}
  {{< image-card href="/integrations/bugsnag/#page-a-datadog-on-call-team" integration_id="bugsnag" alt="Bugsnag" title="Bugsnag" style="catalog" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" integration_id="catchpoint" alt="Catchpoint" title="Catchpoint" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" integration_id="microsoft-teams" alt="Microsoft Teams" title="Microsoft Teams" style="catalog" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" integration_id="nagios" alt="Nagios" title="Nagios" style="catalog" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" integration_id="new-relic" alt="New Relic" title="New Relic" style="catalog" >}}
  {{< image-card href="/integrations/pingdom-v3/#page-a-datadog-on-call-team" integration_id="pingdom-v3" alt="Pingdom" title="Pingdom" style="catalog" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" integration_id="prometheus" alt="Prometheus Alertmanager" title="Prometheus Alertmanager" style="catalog" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" integration_id="sentry" alt="Sentry" title="Sentry" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" integration_id="slack" alt="Slack" title="Slack" style="catalog" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" integration_id="sumo-logic" alt="Sumo Logic" title="Sumo Logic" style="catalog" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" integration_id="zabbix" alt="Zabbix" title="Zabbix" style="catalog" >}}
{{< /card-grid >}}

## プレビューインテグレーション{#preview-integrations}

以下のインテグレーションは[プレビュー](https://www.datadoghq.com/product-preview/on-call-integrations/)として利用可能です。タイルを選択してアクセスをリクエストしてください。

<!-- Tiles below use `integration_id` so the logo renders the same way as a published integration tile. For vendors without a published logo, integration_id falls back to a matching static/images/integrations_logos/<id>.svg — 生成されたプレースホルダーアバター (ベンダーのブランドカラーにイニシャルを表示)。-->

{{< card-grid >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="bigpanda" alt="BigPanda" title="BigPanda" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="checkly" alt="Checkly" title="Checkly" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="chronosphere" alt="Chronosphere" title="Chronosphere" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="coralogix" alt="Coralogix" title="Coralogix" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="cronitor" alt="Cronitor" title="Cronitor" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="dynatrace-mcp" alt="Dynatrace" title="Dynatrace" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="grafana-mcp" alt="Grafana" title="Grafana" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jenkins" alt="Jenkins" title="Jenkins" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jira" alt="Jira" title="Jira" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="logicmonitor" alt="LogicMonitor" title="LogicMonitor" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="nodeping" alt="NodePing" title="NodePing" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="prtg-paessler" alt="PRTG (Paessler)" title="PRTG (Paessler)" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="servicenow" alt="ServiceNow" title="ServiceNow" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="site24x7" alt="Site24x7" title="Site24x7" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="splunk-mcp" alt="Splunk" title="Splunk" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="statuscake" alt="StatusCake" title="StatusCake" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptime" alt="Uptime.com" title="Uptime.com" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptimerobot" alt="UptimeRobot" title="UptimeRobot" style="catalog" >}}
{{< /card-grid >}}

## 汎用 Webhook インテグレーション {#generic-webhook-integration}

ツールがリストにない場合は、[Datadog Events API][2] を使用して、HTTP リクエストを送信できる任意のソースから On-Call Pages をトリガーしてください。

以下のパラメーターでイベントを投稿します。

| パラメーター | 値 |
|-----------|-------|
| <code style="white-space: nowrap;">aggregation_key</code> | アラートの一意のユーザー定義識別子。Datadog はこの値を重複排除に使用します。受信したアラートの `aggregation_key` がすでにトリガーされた Page と一致する場合、Datadog は Page を作成しません。Datadog は、この値を使用して復旧イベントをオープンな Page にリンクします。|
| <code style="white-space: nowrap;">category</code> | イベントのタイプ。Page をトリガーするには `alert` に設定します。|
| <code style="white-space: nowrap;">text</code> | アラートメッセージの本文。適切な On-Call Team に Page をルーティングするには `@oncall-<TEAM_HANDLE>` を含めます。|
| <code style="white-space: nowrap;">title</code> | アラートの短い概要。Page のタイトルとして表示されます。|

`@oncall-<TEAM_HANDLE>` のメンションが `text` に含まれていることで、Page を受け取る On-Call Team が決まります。`<TEAM_HANDLE>` を、Datadog で設定したチームのハンドルに置き換えてください。

{{% collapse-content title="例: リクエスト本文" level="h4" %}}

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "alert_unique_identifier",
      "attributes": {
        "priority": "1",
        "status": "error"
      },
      "category": "alert",
      "message": "@oncall-database Something is broken!",
      "title": "High memory usage"
    },
    "type": "event"
  }
}
```

{{% /collapse-content %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/on-call/pages/#trigger-a-page
[2]: https://docs.datadoghq.com/ja/api/latest/events/post-an-event/