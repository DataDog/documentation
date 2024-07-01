---
"app_id": "fastly"
"app_uuid": "baa14f81-c988-4262-9a9f-e268e9476689"
"assets":
  "dashboards":
    "fastly": "assets/dashboards/fastly_overview.json"
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": "fastly.requests"
      "metadata_path": "metadata.csv"
      "prefix": "fastly."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "57"
    "source_type_name": "Fastly"
  "monitors":
    "[Fastly] 5xx Errors higher than usual for service: {{service.name}}": "assets/monitors/rec_monitor_5xx_errors.json"
    "[Fastly] Abnormal bandwidth being sent for service: {{service.name}}": "assets/monitors/rec_monitor_bandwidth.json"
    "[Fastly] High volume of requests triggering a Web Application Firewall rule on service: {{service.name}}": "assets/monitors/waf_rules.json"
    "[Fastly] Low Hit Ratio for service: {{service.name}}": "assets/monitors/rec_monitor_hit_ratio.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "log collection"
- "metrics"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "fastly"
"integration_id": "fastly"
"integration_title": "Fastly"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "fastly"
"public_title": "Fastly"
"short_description": "View key Fastly metrics in context with the rest of your Datadog metrics."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Category::Metrics"
  "configuration": "README.md#Setup"
  "description": "View key Fastly metrics in context with the rest of your Datadog metrics."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/"
  - "resource_type": "other"
    "url": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account"
  - "resource_type": "other"
    "url": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service"
  "support": "README.md#Troubleshooting"
  "title": "Fastly"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/fastly/fastly_dashboard.png" alt="Fastly dashboard showing cache hit ratio, success rate, and other metrics" popup="true">}}

## Overview

Connect Fastly to Datadog to view key Fastly metrics (for example, cache coverage and header size) in context with the rest of your Datadog metrics.

The integration includes out-of-the-box monitors and dashboard that enable you to view metrics in aggregate, pivot between Fastly metrics and related logs, and create monitors that alert you when a metric passes a user-defined threshold or behaves anomalously.

## Setup

### Installation

No installation steps required.

### Configuration

#### Metric collection

Create a Read-only access API token on Fastly's token management page, get your Service ID from the Dashboard and enter them in the [Fastly integration tile][1].

<div class="alert alert-info">
The ServiceID is the alphanumerical code, for example: <code>5VqE6MOOy1QFJbgmCK41pY</code> (example from the <a href="https://docs.fastly.com/api/auth">Fastly API documentation</a>).
</div>

If you are using multiple Service IDs from one account, enter an API token on each line.

The account name is a way for you to organize your accounts, and is not used as part of the data ingestion process.

#### Log collection


{{< site-region region="us3" >}}

Log collection is not supported for this site.

{{< /site-region >}}



{{< site-region region="us,us5,eu,gov" >}}

Configure the Datadog endpoint to forward Fastly logs to Datadog. You can choose the `Datadog` or `Datadog (via Syslog)` endpoint. The `Datadog` endpoint is recommended for more reliable delivery of logs over Syslog.

##### Select the logging endpoint

1. Log in to the Fastly web interface and click **Configure link**.
2. From the **Service** menu, select the appropriate service.
3. Click the **Configuration** button and then select **Clone active**. The Domains page appears.
4. Click the **Logging** link. The logging endpoints page appears. Click **Create Endpoint** under **Datadog** or the **Datadog (with Syslog)** options.

##### Configure the Datadog endpoint (recommended)

1. Give a name to the endpoint, for example: `Datadog`.
2. Configure the log format. By default, the recommended [Datadog-Fastly log format][2] is already provided and can be customized.
3. Select your region to match your Datadog account region: {{< region-param key="dd_site_name" code="true" >}}
4. Add your [Datadog API key][3].
5. Click **Create** at the bottom.
6. Click **Activate** at the top right to activate the new configuration. After a few minutes, logs should begin flowing into your account.

##### Configure the Syslog endpoint

1. Give a name to the endpoint, for example: `Datadog`.
2. Configure the log format to include the recommended [Datadog-Fastly log format][2] with [your Datadog API key][3] at the beginning.

    ```text
    <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
    ```

    **Note**: Your Datadog API key MUST be in front of the Datadog-Fastly log format for your logs to display in Datadog. See [Useful variables to log][4] for more details.

3. Set **Syslog Address** to: {{< region-param key="web_integrations_endpoint" code="true" >}}
4. Set **Port** to: {{< region-param key="web_integrations_port" code="true" >}}
5. Set **TLS** to `yes`
6. Set **TLS Hostname** to: {{< region-param key="web_integrations_endpoint" code="true" >}}
7. In the advanced option section, select `Blank` as **log line format**
8. Finally, save the endpoint and deploy the service. See the logs in your [Datadog Logs Explorer][5].

[2]: https://docs.datadoghq.com/resources/json/fastly_format.json
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://app.datadoghq.com/logs

{{< /site-region >}}


## Data Collected

### Metrics
{{< get-metrics-from-git "fastly" >}}


### Events

The Fastly integration does not include any events.

### Service Checks

The Fastly integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

## Further reading

- [Monitor Fastly performance with Datadog][4]
- [Create and manage your Fastly accounts with Terraform][5]
- [Create and manage your Fastly services with Terraform][6]

[1]: https://app.datadoghq.com/account/settings#integrations/fastly
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service

