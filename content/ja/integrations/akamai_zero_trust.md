---
app_id: akamai-zero-trust
app_uuid: d5f7fcaf-fab5-4944-af31-6df7f2efccb9
assets:
  dashboards:
    akamai-zero-trust-overview: assets/dashboards/akamai_zero_trust_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - akamai.eaa.active_dialout_count
      metadata_path: metadata.csv
      prefix: akamai.eaa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10423
    source_type_name: Akamai Zero Trust
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_zero_trust
integration_id: akamai-zero-trust
integration_title: Akamai Zero Trust
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_zero_trust
public_title: Akamai Zero Trust
short_description: Integrate with Akamai SIA and EAA products
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Integrate with Akamai SIA and EAA products
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai Zero Trust
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Akamai Zero Trust includes both Enterprise Application Access and Secure Internet Access.

Akamai Enterprise Application Access is a Zero Trust Network Access solution offering precise access to private applications based on identity and context. It uses identity-based policies and real-time data such as user location, time, and device security to ensure that users only have access to the applications they need and eliminates network level access. It works seamlessly with Akamai MFA for strong user authentication.

Secure Internet Access Enterprise is a cloud-based targeted threat protection solution. It safeguards your organization from DNS and web-based threats, enforces authentication and acceptable use policies, and audits user Internet access.

Akamai Zero Trust collects logs for both  Secure Internet Access (SIA) and  Enterprise Application Access (EAA). It also is able to gather collector metrics for SIA.

## Setup

### Configuration

1. Sign into your [Akamai Account][1]
2. Search for **Identity and Access Management**
3. Click **Create API Client**
4. Under **Select APIs**, search for **SIA and EAA** and provide **READ-ONLY** access.
5. After creating the API client, click **Create Credential** to generate your set of credentials.
6. Copy the **Access Token, Client Token, Host, and Client Secret** from the generated credentials.
7. If you are looking to collect EAA logs and metrics, provide the **Contract ID** for the account.

## Data Collected

### Metrics
{{< get-metrics-from-git "akamai_zero_trust" >}}


### Logs

Akamai SIA and EAA events will show up as logs under the source `akamai_zero_trust`.

### Service Checks

Akamai Zero Trust does not include any service checks.

### Events

Akamai Zero Trust does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://control.akamai.com/apps/auth/#/login
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/akamai_zero_trust/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/