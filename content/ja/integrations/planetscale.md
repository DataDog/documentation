---
"app_id": "planetscale"
"app_uuid": "ea670b69-7322-4c75-afbc-4ef1a6cf286c"
"assets":
  "dashboards":
    "planetscale_overview": assets/dashboards/planetscale_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": planetscale.tables.storage
      "metadata_path": metadata.csv
      "prefix": planetscale.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10264"
    "source_type_name": PlanetScale
"author":
  "homepage": "http://www.planetscale.com"
  "name": PlanetScale
  "sales_email": sales@planetscale.com
  "support_email": support@planetscale.com
"categories":
- data stores
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/planetscale/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "planetscale"
"integration_id": "planetscale"
"integration_title": "PlanetScale"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "planetscale"
"public_title": "PlanetScale"
"short_description": "Send your PlanetScale metrics to DataDog."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Data Stores"
  "configuration": "README.md#Setup"
  "description": Send your PlanetScale metrics to DataDog.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": PlanetScale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

PlanetScale can push metrics into Datadog to assist your team with understanding database usage and performance.

## セットアップ

Follow the steps below to configure your PlanetScale organization to push metrics into Datadog.

1. Create a Datadog API key in your [Datadog Organization Settings][1].
2. Supply PlanetScale with the Datadog API key in your [PlanetScale Organization Settings][2].

![PlanetScale Organization Settings][3]

## 収集データ

### メトリクス
{{< get-metrics-from-git "planetscale" >}}


### サービスチェック

Planetscale does not include any service checks.

### イベント

Planetscale does not include any events.

## Support

Need help? Contact [Datadog support][5].


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.planetscale.com/settings/integrations
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/planetscale/images/planetscale.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/planetscale/metadata.csv
[5]: https://docs.datadoghq.com/help/

