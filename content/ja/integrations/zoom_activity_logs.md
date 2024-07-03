---
app_id: zoom-activity-logs
app_uuid: 2297e963-5129-4711-bf04-767d5c929f5e
assets:
  dashboards:
    zoom-activity-logs: assets/dashboards/zoom_activity_logs_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10394
    source_type_name: Zoom Activity Logs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zoom_activity_logs
integration_id: zoom-activity-logs
integration_title: Zoom Activity Logs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zoom_activity_logs
public_title: Zoom Activity Logs
short_description: Consume Operation and Activity Logs from Zoom
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Consume Operation and Activity Logs from Zoom
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zoom Activity Logs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview
This integration enables the collection of Zoom Activity Logs to capture activity within your Zoom Account. This allows you to:

- Cross-reference Zoom events with data from other services in your environment. 
- Build custom widgets and dashboards with your Zoom event data. 
- Set up [Cloud SIEM][1] detection rules using the out-of-the-box Logs pipeline.

Datadog's Zoom integration collects logs using [sign in and sign out activities][1] and [operation logs][2], which provide insight into admin and user activity, including:
  - Adding a new user
  - Changing account settings
  - Deleting recordings
  - Sign in and sign out activities

## Availability
**Note**: This integration is currently in **beta**.
> Please reach out to [Datadog Support][3] with any feedback.



## Setup

### Installation

1. Navigate to the Integrations Page and search for the "Zoom Activity Log" Integration. 
3. Click the tile. 
4. To add an account which will install the integration, click the the "Add Account" button. 
5. After reading the instructions in the modal, click the "Authorize" Button which will redirect you to a Zoom Login Page. 
6. Using a Zoom Administrator's account, log in to Zoom. 
7. A screen requesting access to the 
`report:read:admin` scope which will allow Datadog to view audit report data will appear. Click "Accept".
8. You'll be redirected back to Datadog's Zoom Activity Log tile with a new account. We recommend changing the 'Account Name' to something easier to remember. 


## 権限

Datadog for Zoom requires the following OAuth Scopes. For more information, see the [Zoom OAuth scopes documentation][4].

### User-level Scopes

| Scopes                   | Request Reason                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `report:read:admin`          | Read audit admin and user activity logs which include events such as adding a new user, changing account settings, and deleting recordings. Read sign in / sign out activity logs of users under a Zoom account.                        |


### Removing the App
To uninstall the Zoom Activity Log integration, navigate to the Zoom Activity Log Tile and delete any existing accounts that appear in the account table.


## 収集データ

### Metrics

Zoom Activity Logs does not include any metrics.

### Service Checks

Zoom Activity Logs does not include any service checks.

### Logs
Zoom Activity Logs collects data from Zooms [Sign In and Out Activity Log][1] and [Operation Log][2] endpoint.s

### Events

Zoom Activity Logs does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][3].


[1]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportSignInSignOutActivities
[2]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportOperationLogs
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://developers.zoom.us/docs/integrations/oauth-scopes-granular/#reports