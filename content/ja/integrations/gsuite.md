---
"app_id": "gsuite"
"app_uuid": "a1ec70d4-dbe1-4e76-8e40-062df1fff1a5"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "601"
    "source_type_name": Google Workspace
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- collaboration
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "gsuite"
"integration_id": "gsuite"
"integration_title": "Google Workspace"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "gsuite"
"public_title": "Google Workspace"
"short_description": "Import your Google Workspace audit and security logs into Datadog"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Collaboration"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Import your Google Workspace audit and security logs into Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Google Workspace
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Import your Google Workspace security logs in Datadog. Upon enabling this integration, Datadog automatically starts pulling in logs for the following Google Workspace services:

|Service|Description|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Access Transparency|The Google Workspace Access Transparency activity reports return information about different types of Access Transparency activity events.|
|Admin|The Admin console application's activity reports return account information about different types of administrator activity events.|
|Calendar|The Google Calendar application's activity reports return information about various Calendar activity events.|
|Chrome|The Chrome activity report returns information about the ChromeOS activity of all of your account's users. Each report uses the basic endpoint request and provides report-specific parameters such as logins, adding or removing users, or unsafe browsing events.|
|Context-Aware Access|The context-aware access activity report returns information about denials of application access to your account's users. It uses the basic report endpoint request and provides specific parameters such as device ID and the application to which access was denied.|
|Drive|The Google Drive application's activity reports return information about various Google Drive activity events. The Drive activity report is only available for Google Workspace Business customers.|
|Google Chat|The Chat activity report returns information about how your account's users use and manage Spaces. Each report uses the basic endpoint request with report-specific parameters such as uploads or message operations.|
|Google Cloud|The Google Cloud activity report returns information about various activity events related to the Cloud OS Login API.|
|Google Keep|The Keep activity report returns information about how your account's users manage and modify their notes. Each report uses the basic endpoint request with report-specific parameters such as attachment upload information or note operations.|
|Google Meet|The Meet activity report returns information about various aspects of call events. Each report uses the basic endpoint request with report-specific parameters such as abuse report data or livestream watch data.|
|Gplus|The Google+ application's activity reports return information about various Google+ activity events.|
|Groups|The Google Groups application's activity reports return information about various Groups activity events.|
|Enterprise Groups|The Enterprise Groups activity reports return information about various Enterprise group activity events.|
|Jamboard|The Jamboard activity report returns information about changes to Jamboard device settings. Each report uses the basic endpoint request with report-specific parameters such as licensing or device pairing settings.|
|Login|The Login application's activity reports return account information about different types of Login activity events.|
|Mobile|The Mobile Audit activity reports return information about different types of Mobile Audit activity events.|
|Rules|The Rules activity reports return information about different types of Rules activity events.|
|Token|The Token application's activity reports return account information about different types of Token activity events.|
|SAML|The SAML activity report returns information about the results of SAML login attempted. Each report uses the basic endpoint request with report-specific parameters such as the failure type and SAML application name.|
|User Accounts|The User Accounts application's activity reports return account information about different types of User Accounts activity events|

## Setup
### Installation

Follow the Google Workspace Admin SDK [Reports API: Prerequisites][1] documentation before configuring the Datadog-Google Workspace integration.

**Note**: Certain OAuth scopes may be required for setup. See the Google Workspace Admin SDK [Authorize Requests][2] documentation.

To configure the Datadog Google Workspace integration, click on the *Connect a new Google Workspace domain* button in your [Datadog-Google Workspace integration tile][3] and authorize Datadog to access the Google Workspace Admin API.

## Data Collected
### Logs

See the [Google Workspace Admin SDK documentation][4] for the full list of collected logs and their content.

**Note**: The Groups, Enterprise Groups, Login, Token, and Calendar logs are on a 90 minute crawler because of a limitation in how often Google polls these logs on their side. Logs from this integration are only forwarded every 1.5-2 hours.

### Metrics

The Google Workspace integration does not include any metrics.

### Events

The Google Workspace integration does not include any events.

### Service Checks

The Google Workspace integration does not include any Service Checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites
[2]: https://developers.google.com/admin-sdk/reports/v1/guides/authorizing#OAuth2Authorizing
[3]: https://app.datadoghq.com/account/settings#integrations/gsuite
[4]: https://developers.google.com/admin-sdk/reports/v1/reference/activities/list
[5]: https://docs.datadoghq.com/help/

