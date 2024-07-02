---
"app_id": "cloudflare"
"app_uuid": "e48a0b64-d3ad-436f-95d3-e0c81e6d51d1"
"assets":
  "dashboards":
    "Cloudflare-Overview": assets/dashboards/cloudflare_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check": cloudflare.requests.all
      "metadata_path": metadata.csv
      "prefix": cloudflare
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "215"
    "source_type_name": Cloudflare
  "monitors":
    "[Cloudflare] Abnormal bandwidth being sent for zone": assets/monitors/bandwidth.json
    "[Cloudflare] Error Rate is higher than normal in zone": assets/monitors/error_rate.json
    "[Cloudflare] Error count is unusually high for worker script": assets/monitors/worker_error.json
    "[Cloudflare] High number of detected threats for zone": assets/monitors/threats.json
    "[Cloudflare] Hit Ratio is abnormally low for zone": assets/monitors/hit_ratio.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- モニター
- log collection
- caching
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "cloudflare"
"integration_id": "cloudflare"
"integration_title": "Cloudflare"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "cloudflare"
"public_title": "Cloudflare"
"short_description": "Track your Cloudflare Web traffic and DNS metrics."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Log Collection"
  - "Category::Caching"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Track your Cloudflare Web traffic and DNS metrics.
  "media":
  - "caption": Cloudflare Overview Dashboard
    "image_url": images/overview-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cloudflare
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Integrate with Cloudflare to get your zone metrics, including web traffic, DNS queries, and threat insights. The integration is based on [Cloudflare's analytics API][1].

The out-of-the-box dashboard improves the security and performance of your applications. This single pane of glass gives you visibility into

- security threats
- HTTP request volume and error rates
- load balancing, including round-trip time and any changes in traffic flow
- performance issues in worker scripts

With enriched logs and detailed metrics giving you deep insight into your Cloudflare infrastructure, you can build the context you need to resolve issues.

The integration works with [Datadog Cloud SIEM][2] to provide out-of-the-box threat detection for
- impossible travel
- dangerous misconfigurations
- DDoS attacks

Mitigate security threats more quickly with the included Workflow Automation blueprints, such as blocking an IP address or creating a case in Datadog.

## セットアップ

Before you begin, you need a [Datadog account][3], with an [API key][4], and access to [Cloudflare Logpush][5], which requires an Enterprise account plan. 

When using a Cloudflare API token, ensure it has the **Zone** > **Zone** > **Read** and **Zone** > **Analytics** > **Read** permissions.

### インストール

Install the integration with the Datadog [Cloudflare integration tile][6].

### 構成

1. Go to the **Configuration** tab inside the Datadog [Cloudflare integration tile][6].
2. Enter the email addresses and API keys or token of the accounts you want to monitor. Your Cloudflare API key and API token are available in your Cloudflare account under **My profile** > **Api Tokens**.
3. Add a name for the account. This name is arbitrary and used in the `account` tag on your metrics.

### Log collection

Cloudflare allows customers to push logs directly into Datadog using Cloudflare Logpush. You can manage the Logpush job with the [Cloudflare API](#cloudflare-api) or with the [Cloudflare dashboard](#cloudflare-dashboard). 

If you install the Cloudflare integration pipeline, it automatically remaps certain attributes. To see which attributes are remapped:

1. Navigate to [Logs Pipelines][7].
2. Click **Browse Pipeline Library** on the top right.
3. Enter `Cloudflare` in the search bar.
4. Click **Cloudflare** to see the list of remappers and other processors that are installed.

#### Cloudflare API

1. Create a Logpush job by making a POST request to the Logpush jobs endpoint. Include the following fields:
    * `name` (optional): Use your domain name as the job name.
    * `destination_conf`: A log destination consisting of the following parameters:
        * `<DATADOG_ENDPOINT_URL>`: The Datadog HTTP logs intake endpoint. Your endpoint is `http-intake.logs.{{< region-param key="dd_site" >}}/v1/input`
        * `<DATADOG_API_KEY>`: Your Datadog API key.
        * `ddsource`: Set to `cloudflare`.
        * `service` (optional): Specify service name.
        * `host` (optional): Specify host name.
        * `ddtags` (optional): Specify tags.
    * `dataset`: The category of logs you want to receive. See the [Cloudflare Log fields][8] for a list of supported datasets.
    * `logpull_options` (optional): To configure fields, sample rate, and timestamp format, see the [Logpush API options][9]. Datadog mandates the use of **RFC 3339 format for timestamps** from Cloudflare, which is the default option used by Cloudflare.

    **Example request**:

    ```bash
    curl -s -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs' \
    --header 'X-Auth-Key: <CLOUDFLARE_AUTH_KEY>' \
    --header 'X-Auth-Email: <CLOUDFLARE_AUTH_EMAIL>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
       "name": "<NAME>",
       "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "dataset": "http_requests"
    }'
    ```

    **Example response**:

    ```bash
    {
     "errors": [],
     "messages": [],
     "result": {
       "id": 100,
       "dataset": "http_requests",
       "enabled": false,
       "name": "<DOMAIN_NAME>",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "destination_conf": "datadog://http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?header_DD-API-KEY=<DD-API-KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "last_complete": null,
       "last_error": null,
       "error_message": null
     },
     "success": true
    }
    ```

    Take note of the value of `id`. In the example above, it is `100`.

2. Enable the job. Use the job ID returned in the response and send `{"enabled": true}` in the request body.

    **Example request**:

    ```bash
    curl -s -X PUT \
    https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID> -d'{"enabled":true}' | jq .
    ```

    **Example response**:

    ```bash
    {
      "errors": [],
      "messages": [],
      "result": {
        "id": 100,
        "dataset": "http_requests",
        "enabled": true,
        "name": "<DOMAIN_NAME>",
        "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
        "destination_conf": "datadog://{{< region-param key="dd_site" >}}?header_DD-API-KEY=<DATADOG-API-KEY>",
        "last_complete": null,
        "last_error": null,
        "error_message": null
      },
      "success": true
    }
    ```

#### Cloudflare dashboard

1. Once you have Connected a service with the Logpush section of the Cloudflare dashboard, select the dataset, select data fields, and then, under select destination, choose Datadog.
2. Under **Enter destination information**, enter the Datadog URL Endpoint: 

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?ddsource=cloudflare
    ```
    **Note**: `ddsource=cloudflare` is required. To differentiate between logs, you can also add the optional parameters of `service`, `host`, and `ddtags`.

    **Example**:

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
    ```

3. Enter the Datadog API key you used to set-up your Datadog Cloudflare integration tile.
4. After validating access, you should see "Ready to push!" under **Prove ownership**. Click `Push` to complete.

## 収集データ

### メトリクス
{{< get-metrics-from-git "cloudflare" >}}


#### 権限
Verify your Cloudflare API token has these permissions enabled:

| Scope       | Permission         |   Status    |
| ----------- | ------------------ | ----------- |
| Account     | Account Analytics  |    Read     |
| Account     | Account Setting    |    Read     |
| Account     | Worker Scripts     |    Read     |
| Zone        | Zone               |    Read     |
| Zone        | 分析          |    Read     |
| Zone        | Worker Routes      |    Read     |
| Zone        | Load Balancers     |    Read     |

### イベント

The Cloudflare integration does not include any events.

### サービスチェック

The Cloudflare integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][11].

[1]: https://api.cloudflare.com/#zone-analytics-dashboard
[2]: https://docs.datadoghq.com/security/cloud_siem/
[3]: https://www.datadoghq.com/free-datadog-trial/
[4]: /account_management/api-app-keys/#api-keys
[5]: https://developers.cloudflare.com/logs/about
[6]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[7]: https://app.datadoghq.com/logs/pipelines
[8]: https://developers.cloudflare.com/logs/log-fields
[9]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[11]: https://docs.datadoghq.com/help/

