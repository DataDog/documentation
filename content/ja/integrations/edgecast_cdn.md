---
"app_id": "edgecast-cdn"
"app_uuid": "2b575f7f-4575-4618-8ebd-f35f7d6a5d22"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check": edgecast.request_count
      "metadata_path": metadata.csv
      "prefix": edgecast.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "619"
    "source_type_name": Edgecast
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- metrics
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "edgecast_cdn"
"integration_id": "edgecast-cdn"
"integration_title": "Edgecast"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "edgecast_cdn"
"public_title": "Edgecast"
"short_description": "Monitor Edgecast CDN traffic with Datadog Metrics"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor Edgecast CDN traffic with Datadog Metrics
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Edgecast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Edgecast is a global network platform that provides a content delivery network (CDN) and other solutions for edge computing, application security, and over-the-top video streaming. Collect Edgecast metrics to monitor your web traffic by origin.

## Setup


### Create Edgecast Client 

1. Login to your [Edgecast VDMS account][1] and navigate to the **Clients** tab.
2. Click **Create New Client** to bring up the New Client modal.
3. Input a unique identifying client name and click **Toggle all ec.analytics** to allow this client to collect metrics.
4. Navigate to **Settings** and modify **JWT Expiration in Seconds** to 600.
5. Click **Save** to save this client and the modified settings value.

### Configuration

1. Navigate to the configuration tab inside the Datadog [Edgecast integration tile][2].
2. Enter a unique identifying name for this client in Datadog. 
3. Paste the Client ID and Client Secret from the Edgecast Client created above.
   * Find the Client ID after `client_id=` in the **Getting an access token** request under the **Quick Start** tab of your configured Edgecast Client.
   * Find the Client Secret under the **Client Secrets** tab of your configured Edgecast Client.
4. Optionally, add custom tags to associate them with all metrics collected for this integration.
   * Metrics are automatically tagged with the Edgecast name associated with the origin. 

## Data Collected

### Metrics
{{< get-metrics-from-git "edgecast_cdn" >}}


### Events

The Edgecast integration does not include any events.

### Service Checks

The Edgecast integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://id.vdms.io
[2]: https://app.datadoghq.com/integrations/edgecast-cdn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/edgecast_cdn/edgecast_cdn_metadata.csv
[4]: https://docs.datadoghq.com/help

