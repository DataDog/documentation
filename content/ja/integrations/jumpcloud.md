---
"app_id": "jumpcloud"
"app_uuid": "37f8026f-e2ac-4a71-9270-0b03fab814cc"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "613"
    "source_type_name": Jumpcloud
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- event management
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "jumpcloud"
"integration_id": "jumpcloud"
"integration_title": "Jumpcloud"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "jumpcloud"
"public_title": "Jumpcloud"
"short_description": "View Jumpcloud events in Datadog"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Event Management"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": View Jumpcloud events in Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Jumpcloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

JumpCloud is a cloud-based directory platform that provides a unified approach to Active Directory and LDAP services centered around user authentication and network management. 

Using JumpCloud, companies can manage and provision user access to software, systems, and networks; enforce compliance with audit trails; and provide a unified login experience through single sign-on (SSO). As a cloud-native platform, JumpCloud enables a remote and flexible form of IT management by providing domainless security solutions for traditional directory needs.

The JumpCloud integration provides access to the following:

- Directory Events: Logs on activity in the Portal, including admin changes in
  the directory and admin/user authentications to the Portal.

- SAML Events: Logs on user authentications to SAML applications.

- RADIUS Events: Logs on user authentications to RADIUS used for wifi and VPNs.

- MacOS, Windows, and Linux Events: Logs about user authentications to systems
  including agent-related events on lockout, password changes, and File Disk
  Encryption key updates.

- LDAP Events: Logs about user authentications to LDAP, including LDAP bind and
  search events types.

- MDM Events: Logs about MDM command results.

For more information, see [Monitor your JumpCloud directory with Datadog][1] and the [Insights API Reference][2].

## Setup

### Installation

No installation is required.

### Configuration

See the integration tile for details. An API key is required from the JumpCloud
Administrator Portal.

## Data Collected

### Logs

Logs are collected from a single API endpoint. See the [Insights API][2].

### Metrics

The JumpCloud integration does not include any metrics.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://www.datadoghq.com/blog/monitor-jumpcloud-directory/
[2]: https://docs.jumpcloud.com/api/insights/directory/1.0/index.html
[3]: https://docs.datadoghq.com/help/

