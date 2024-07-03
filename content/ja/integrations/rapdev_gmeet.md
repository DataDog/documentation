---
algolia:
  subcategory: Marketplace Integrations
app_id: rapdev-gmeet
app_uuid: 0aa39e5e-89dd-4437-8411-33ca5a69174f
assets:
  dashboards:
    Google Meet Dashboard: assets/dashboards/google_meet_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.gmeet.call_ended
      metadata_path: metadata.csv
      prefix: rapdev.gmeet.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10434
    source_type_name: RapDev Gmeet
  monitors:
    RapDev Google Meet Monitor: assets/monitors/rapdev_google_meet_monitor.json
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- collaboration
- event management
- marketplace
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_gmeet
integration_id: rapdev-gmeet
integration_title: Google Meet
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_gmeet
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.gmeet
  product_id: gmeet
  short_description: Unit price per active user
  tag: display_name
  unit_label: Active User
  unit_price: 1
public_title: Google Meet
short_description: Visualize Google Meet meeting details and performance as metrics
  and events.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Collaboration
  - Category::Event Management
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Visualize Google Meet meeting details and performance as metrics and
    events.
  media:
  - caption: RapDev Google Meet Overview Dashboard
    image_url: images/dashboard_example.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Google Meet
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
Google Meet is a video communication service for meetings and calls.

The Google Meet integration reports call performance metrics as soon as a call has ended. This integration monitors the performance of calls by reporting on latency across audio, video, and screen casting. An event is also sent to Datadog when users leave a meeting, which allows you to visualize demographics across an organization.
Insights collected include the following:
- The number of external users participating in meets hosted by your organization
- Breakdown of device types by region
- Breakdown of call duration per user
- Breakdown and summary of call quality ratings

Note: Setting up your internal service account to poll this information from your workspace requires your Google Workspace Admin to delegate domain-wide-authority to your service account.

### Metric Collection

Customize the parameters you want to report to Datadog in a `conf.yaml` file.

This integration sends metrics to Datadog based on what the [Google Activities API][2] reports back with. This integration utilizes the [caller leaving events][3]. 
To pull additional metrics, add additional fields in the `conf.yaml` such as `network_recv_jitter_msec_max`.

Each metric includes the following tags:
  - `meeting_code`: The meeting code for the Google Meet conference (for example, 'abc-hexp-tqy'). Recurring meetings have the same meeting code.
  - `location_country`: The country from which the participant joined.
  - `organizer_email`: The email address of the meeting creator.
  - `location_region`: The city or geographical region within a country from which the participant joined. For example: Boston.
  - `ip_address`: The participant's external IP address.
  - `device_type`: The participant's device type (for example: Android, Chromebox, iOS, Web, Jamboard, PSTN_IN).
  - `identifier`: The unique participant identifier (for example, an email address, phone number, or device ID).
  - `display_name`: Human readable name of the user that is displayed in the meeting.
  - `is_external`: Indicates if the participant is external to your organization. By default, the Google Admin API masks some of the external participants' identifiers.

The default metrics in the `conf.yaml` file should suffice for most use cases.

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][9]
- Sales: [sales@rapdev.io][1]
- Chat: [rapdev.io][10]
- Phone: 855-857-0222
---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: mailto:sales@rapdev.io
[2]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet
[3]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet#call_ended
[4]: https://console.cloud.google.com/projectcreate
[5]: https://console.cloud.google.com/apis/library/admin.googleapis.com
[6]: https://console.cloud.google.com/iam-admin/serviceaccounts/create
[7]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[8]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: mailto:support@rapdev.io
[10]: https://www.rapdev.io/#Get-in-touch

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-gmeet" target="_blank">Click Here</a> to purchase this application.