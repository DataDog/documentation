---
"app_id": "ably"
"app_uuid": "4596cd59-d3f2-4921-8133-3a448ccaea61"
"assets":
  "dashboards":
    "Ably": assets/dashboards/ably.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check":
      - ably.channels.mean
      - ably.channels.min
      - ably.channels.peak
      - ably.connections.all.mean
      - ably.connections.all.min
      - ably.connections.all.peak
      "metadata_path": metadata.csv
      "prefix": ably.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10340"
    "source_type_name": Ably
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://ably.com"
  "name": Ably
  "sales_email": sales@ably.com
  "support_email": support@ably.com
"categories":
- cloud
- metrics
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/ably/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ably"
"integration_id": "ably"
"integration_title": "Ably"
"integration_version": ""
"is_public": true
"kind": "integration"
"manifest_version": "2.0.0"
"name": "ably"
"public_title": "Ably"
"short_description": "Collect and graph Ably metrics"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Cloud"
  - "Category::Metrics"
  - "Submitted Data Type::Metrics"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Collect and graph Ably metrics
  "media":
  - "caption": Ably - Dashboard
    "image_url": images/ably-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Ably
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview
The [Ably][1] platform is used to power real-time use cases such as multiplayer, chat, data synchronization, data broadcast, and notifications for highly scalable web and mobile applications around the world. Using our APIs, engineers are free to focus on building core functionality, rather than having to provision and maintain servers and cloud infrastructure.

The Ably Datadog Integration sends [Ably statistics][2] metrics directly to your Datadog account.

Using Ably's Datadog Integration, you can:
- Use [Ably statistics][2] alongside other key metrics in Datadog
- Correlate Ably message, channel, and connection usage for collaborative analysis in Datadog dashboards
- View and track Ably usage statistics in Datadog

## セットアップ

- **In Datadog**: Go to **Integrations**, select the Ably tile and click **Install Integration**.

- Click **Connect Accounts** to begin authorization of this integration. You will be redirected to [Ably][1].

- **In Ably**: Log in and navigate to **Your Apps**.

![Ably Screenshot][3]

- Select the **Ably App** you would like to set up the **Datadog Integration** for and click **Integrations**.

![Ably Screenshot][4]

- Click the **Connect to Datadog** button to begin authorization of this integration.

- You will be redirected to the Datadog authorization page.

- Click the **Authorise** button to complete setup and be redirected back to the Ably site.

![Ably Screenshot][5]

Your Ably App statistics now appear in Datadog.

## 収集データ

For further details on the Ably statistics, read the [Application Statistics documentation][2].

### メトリクス
{{< get-metrics-from-git "ably" >}}


### イベント

The Ably integration does not include any events.

### サービスチェック

The Ably integration does not include any service checks.

## Uninstallation

- **In Ably**: Go to https://ably.com, log in and navigate to **Your Apps**.

- Select the Ably App you would like to uninstall the **Datadog Integration** for.

- Click the **Remove** button in the **Datadog Integration** section.

![Ably Screenshot][7]

Your Ably App statistics are no longer sent to Datadog.

- **In Datadog**: Go to **Integrations**, select the Ably tile and click **Uninstall Integration**.

Once this integration has been uninstalled, any previous authorizations are revoked.

Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys page][8].

## Support
Need help? Contact [Ably support][9].

[1]: https://ably.com
[2]: https://ably.com/docs/general/statistics
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/your-apps.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/integrations.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/setup-integration.png
[6]: https://github.com/DataDog/integrations-extras/blob/master/ably/metadata.csv
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/uninstall-integration.png
[8]: https://app.datadoghq.com/organization-settings/api-keys?filter=Ably
[9]: https://ably.com/support

