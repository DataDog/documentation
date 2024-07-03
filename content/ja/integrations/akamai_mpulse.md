---
categories:
- cloud
dependencies: []
description: Integrate Akamai mPulse with Datadog.
doc_link: https://docs.datadoghq.com/integrations/akamai_mpulse/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/integrate-akamai-mpulse-real-user-monitoring-with-datadog/
  tag: Blog
  text: Integrate Akamai mPulse real user monitoring with Datadog
git_integration_title: akamai_mpulse
has_logo: true
integration_id: akamai-mpulse
integration_title: Akamai mPulse
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: akamai_mpulse
public_title: Datadog-Akamai mPulse
short_description: Integrate Akamai mPulse with Datadog.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Datadog with Akamai mPulse to collect real user monitoring (RUM) metrics and gain visibility into how end users perceive performance of a website. Gain comprehensive visibility across your web stack by analyzing and correlating RUM metrics alongside performance data from your CDN and backend infrastructure.

Use Datadog's out-of-the-box dashboard and monitors to:
- Get an overview of key metrics like bounce rate, user sessions and page load times
- Investigate the source of user facing slowdown, whether frontend or backend
- Monitor page load times and page groups

Correlate metrics with real-time data from [Akamai DataStream 2][1], [NGINX][2], [MYSQL][3], and more than 600 other technologies for a frontend to backend view of your webstack.

## セットアップ

### インストール

Install the integration with the Datadog [Akamai mPulse integration tile][4].

### 構成

An `apiKey` and `apiToken` are required to configure the Akamai mPulse integration. 

#### Generate an API key

The `apiKey` is an auto-generated value that uniquely identifies your site's data (beacons) found in your mPulse portal. 

<div class="alert alert-warning">
The "Apps" menu option and  `apiKey` attribute are only visible to App Administrators. 
</div>

1. Find your `apiKey` by navigating to the "Central" page
2. Click **Apps** on the left panel. , 
3. Select the app name you want to monitor to open a configuration page that contains your `apiKey`.

#### Generate an API token

See the [Akamai documentation for API token][5] then:

1. Log into `mpulse.soasta.com`.
2. Go to My Settings on the leftmost panel.
3. Click "Generate" in the API token area.

## 収集データ

### メトリクス
{{< get-metrics-from-git "akamai_mpulse" >}}


### イベント

The Akamai mPulse integration does not include any events.

### サービスチェック

The Akamai mPulse integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/akamai_datastream_2/
[2]: https://docs.datadoghq.com/ja/integrations/nginx/
[3]: https://docs.datadoghq.com/ja/integrations/mysql/
[4]: https://app.datadoghq.com/integrations/akamai-mpulse
[5]: https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_mpulse/akamai_mpulse_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/