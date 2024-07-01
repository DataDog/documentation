---
"app_id": "backstage"
"app_uuid": "2b89148d-0938-46fc-a9dc-fd8a45e583a9"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": backstage.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10281"
    "source_type_name": backstage
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Roadie
  "sales_email": oss@roadie.io
  "support_email": oss@roadie.io
"categories":
- developer tools
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/backstage/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "backstage"
"integration_id": "backstage"
"integration_title": "Backstage"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "backstage"
"public_title": "Backstage"
"short_description": "Embed Datadog dashboards and graphs into your Backstage instance."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Developer Tools"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Embed Datadog dashboards and graphs into your Backstage instance.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Backstage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Backstage][1] is an open platform for building Developer Portals. This integration enables you to embed Datadog graphs and dashboards into your Backstage instance.

## Setup

### Installation

1. Install the Datadog plugin into Backstage:

```shell
cd packages/app
yarn add @roadiehq/backstage-plugin-datadog
```

2. Add the Datadog plugin widget to your Backstage Overview tab. See the [detailed instructions][2] for more information.
3. Find or create the [public URL][3] for your Datadog dashboard. 
4. Add the dashboard URL to the plugin's metadata:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-service
  description: |
    A sample service
  annotations:
    datadoghq.com/dashboard-url: <DATADOGURL>
```

### Verification

Open your Backstage instance Overview tab to confirm your Datadog dashboard or graph is rendered as expected.

## Data Collected

### Metrics

The Backstage integration does not include any metrics.

### Service Checks

The Backstage integration does not include any service checks.

### Events

The Backstage integration does not include any events.

## Troubleshooting

Need help? Reach out to the [Backstage Community][4].

[1]: https://backstage.io
[2]: https://roadie.io/backstage/plugins/datadog/
[3]: https://docs.datadoghq.com/dashboards/sharing/#share-a-dashboard-by-public-url
[4]: https://backstage.io/community

