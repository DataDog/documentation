---
app_id: nobl9
app_uuid: 678f6805-2038-4705-80b3-de7cc143baef
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: nobl9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10230
    source_type_name: Nobl9
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Nobl9
  sales_email: support@nobl9.com
  support_email: support@nobl9.com
categories:
- metrics
- notifications
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nobl9/README.md
display_on_public_website: true
draft: false
git_integration_title: nobl9
integration_id: nobl9
integration_title: Nobl9
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nobl9
public_title: Nobl9
short_description: Nobl9 enables SLI collection, SLO calculation, and error budget
  alerts
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Nobl9 enables SLI collection, SLO calculation, and error budget alerts
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nobl9
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
Nobl9 is a SLO platform that provides real-time, historical SLO reports. Nobl9 integrates with Datadog to collect SLI metrics and measure them against SLO targets. Since Nobl9 calculates error budgets of acceptable thresholds, it can trigger workflows and alerts when the error burn rate is too high or has been exceeded.

With the Datadog Nobl9 integration, you can:

- Pass business context through monitoring data
- Define and measure reliability goals
- Align activities against priorities set by the error budget

### SLO grid view
![SLO Grid View][1]

### SLO detail
![Detail][2]

### SLO report
![SLO Report][3]

### Service health dashboard
![Service Health Dashboard][4]

## セットアップ

All configuration happens on the Nobl9 SLO Platform.

1. Add the Datadog API endpoint to connect to your data source, either `https://api.datadoghq.com/` or `https://api.datadoghq.eu/` (required).
2. Enter a **Project** name. This field is intended for situations where multiple users are spread across multiple teams or projects. When the field is left blank, a default value appears.
3. The **Display Name** appears automatically when a name is entered in the **Name** field.
4. Enter a name for your data source (required). Metadata names are unique within each project and are validated against some RFC and DNS names. The data source name must contain only lowercase alphanumeric characters and dashes. For example: `my-datadog-data-source`.
5. Enter a description (optional). Add the team or owner details and explain why you created this specific data source. Descriptions provide immediate context for any team member.

For more information about creating SLOs on the Nobl9 platform, see Nobl9's [User Guide][5].

## トラブルシューティング

Need help? Contact [Nobl9 Support][6] or [Datadog Support][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/grid_view.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_detail.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_report.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/service_health.png
[5]: https://nobl9.github.io/techdocs_User_Guide/#service-level-objectives-38
[6]: https://nobl9.com/about/#contact
[7]: https://docs.datadoghq.com/ja/help/