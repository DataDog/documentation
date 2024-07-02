---
"app_id": "drata-integration"
"app_uuid": "c06736af-282f-4b3c-a9e6-2b049dbc0e2a"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10311"
    "source_type_name": Drata
"author":
  "homepage": "https://www.drata.com/"
  "name": Drata
  "sales_email": sales@drata.com
  "support_email": support@drata.com
"categories":
- compliance
- log collection
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/drata/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "drata"
"integration_id": "drata-integration"
"integration_title": "Drata"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "drata"
"public_title": "Drata"
"short_description": "Ingest Datadog compliance information to Drata"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Compliance"
  - "Category::Log Collection"
  - "Category::Security"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Ingest Datadog compliance information to Drata
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Drata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Drata is a security and compliance automation platform that continuously monitors and collects evidence of a company's security controls, while streamlining compliance workflows end-to-end to ensure audit readiness.

This integration allows [Drata][1] customers to forward their compliance-related logs and events from Datadog to Drata through an API integration.

## セットアップ

To set up this integration, you must have an active [Drata account][2]. You must also have proper [admin permissions][3] in Datadog.

### インストール

1. To install this integration, you need to create an API and App key.
2. We recommend creating a Service Account in Datadog and applying the "Datadog Read Only" Role to give this connection limited permissions.
3. Navigate to your organization settings to [create an API key][4] in Datadog. Give the key a meaningful name such as `Drata`.
4. Copy and save your API `Key`.
5. Within your organization settings, [create an application key][5]. 
6. Copy and save your application key.
7. Paste your API key and application key into the Drata connection drawer for Datadog.
8. Drata will begin syncing user and configuration data from the Datadog API's and notify you if any compliance monitors are failing.


## Support

Need help? Contact [Datadog support][6] or [support@drata.com][7].


[1]: https://www.drata.com
[2]: https://drata.com/demo
[3]: https://docs.datadoghq.com/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#add-application-keys
[6]: https://docs.datadoghq.com/help/
[7]: mailto:support@drata.com

