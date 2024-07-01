---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "statsig-statsig"
"app_uuid": "289b74cb-ad37-4a0e-98f5-4d5c6f3e3d19"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": statsig.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10188"
    "source_type_name": Statsig License
"author":
  "homepage": "https://www.statsig.com"
  "name": Statsig
  "sales_email": serviceadmin@statsig.com
  "support_email": support@statsig.com
  "vendor_id": statsig
"categories":
- configuration & deployment
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "statsig-statsig"
"integration_id": "statsig-statsig"
"integration_title": "Statsig"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "statsig-statsig"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.statsig.log
  "product_id": statsig
  "short_description": Unit price per thousand Statsig log events
  "tag": event
  "unit_label": Thousand Statsig log events
  "unit_price": !!float "0.1"
"public_title": "Statsig"
"short_description": "Build, measure and ship features your customers love, faster"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Marketplace"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Build, measure and ship features your customers love, faster
  "media":
  - "caption": Safely rollout and target new features using Feature Gates
    "image_url": images/tile_gates.png
    "media_type": image
  - "caption": Observe the impact of your features on your topline metrics from Pulse results generated automatically for any Feature Gate
    "image_url": images/tile_pulse.png
    "media_type": image
  - "caption": Identify features positively or negatively impacting your metrics using Ultrasound
    "image_url": images/tile_ultrasound.png
    "media_type": image
  - "caption": Identify how feature deployments affect the rest of your production stack on Datadog
    "image_url": images/tile_datadog_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/"
  "support": "README.md#Support"
  "title": Statsig
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[Statsig][1] helps companies safely A/B test features in production before rolling them out, avoiding product debates and costly ship mistakes. But what makes Statsig unique is that by simply logging events, experiments are run automatically, showing you the impact of all new features without extra configuration. Other platforms make it difficult to know how a feature is performing, requiring you to create metrics, calculate sample sizes and segment users for every experiment you want to run. Statsig is different: we automate the grunt work away such that A/B tests are always running, automatically, and you will always know how your features are performing.

As a team of former Facebook engineers, we created Statsig to give everyone the same infrastructure that enables hundreds of teams to launch thousands of features with precision.

This offering in the Datadog Marketplace provides access to Statsig's platform. If you are already a Statsig customer, you can connect your account to Datadog with the [Datadog Statsig integration][2] to set up the integration.

{{< img src="marketplace/statsig-statsig/images/statsig_pulse.png" alt="Statsig Pulse" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_gates.png" alt="Statsig Gates" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_metrics.png" alt="Statsig Metrics" >}}

## Data Collected

### Metrics

See [metadata.csv][3] for a list of metrics provided by this integration.

### Events

The Statsig integration sends configuration change events on Statsig to Datadog. For instance, new or updated feature gates or new integrations enabled.

## Support

For support or feature requests, contact Statsig Support through the following channels:

- Email: [support@statsig.com][4] 
- Support: [Statsig][5]

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor feature releases with Statsig's offering in the Datadog Marketplace][6]

[1]: https://www.statsig.com
[2]: https://app.datadoghq.com/integrations/statsig
[3]: https://console.statsig.com/sign_up
[4]: mailto:support@statsig.com
[5]: https://www.statsig.com/contact
[6]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/statsig-statsig" target="_blank">Click Here</a> to purchase this application.
