---
"app_id": "typingdna-activelock"
"app_uuid": "e4eb4314-400c-4c30-8842-60d74e7f455a"
"assets":
  "dashboards":
    "TypingDNA ActiveLock": assets/dashboards/TypingDNAActiveLock.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10339"
    "source_type_name": TypingDNA ActiveLock
"author":
  "homepage": "https://www.typingdna.com/contact"
  "name": TypingDNA
  "sales_email": datadog.support@typingdna.com
  "support_email": datadog.support@typingdna.com
"categories":
- log collection
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/typingdna_activelock/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "typingdna_activelock"
"integration_id": "typingdna-activelock"
"integration_title": "TypingDNA ActiveLock"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "typingdna_activelock"
"public_title": "TypingDNA ActiveLock"
"short_description": "View and analyze your TypingDNA ActiveLock logs."
"supported_os":
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Offering::Integration"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": View and analyze your TypingDNA ActiveLock logs.
  "media":
  - "caption": View and analyze your TypingDNA ActiveLock logs in a custom Datadog dashboard.
    "image_url": images/TypingDNAActiveLock.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": TypingDNA ActiveLock
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->



## Overview

[TypingDNA ActiveLock][1] is a Continuous Endpoint Authentication app that helps prevent unauthorized access to your company computers by detecting typing patterns and locking computers to protect sensitive data.

This integration allows you to send logs from your ActiveLock apps to Datadog, and provides an out-of-the-box dashboard to monitor your organizations computers.

To visualize your data in Datadog, a custom ActiveLock app needs to be configured and installed. This is the same install for all of your company computers.


## Setup

### Configuration

To generate a Datadog API key:

1. Navigate to [Organization settings > API keys][2] in your Datadog account.
2. Click **+ New Key** to generate an API key.

To get your custom install app:

1. Complete [this custom install form][3] by submitting your newly generated API key, [Datadog site][4], and your company details.
2. You will receive an email including a custom ActiveLock app to install on your company computers, and installation instructions. 
    a. This install has an initial limit of 10 seats, and comes with a default 30-day trial period. To remove trial limitations you need a full commercial license. If you don't have a commercial license already, contact [TypingDNA][5] for licensing or the reseller/partner through which you found us.
3. After installation, your ActiveLock logs should start to appear in [Log Explorer][6].

Note that if you came through a reseller/partner you should follow their instructions to get your custom install app (and commercial license).


### Validation

To view your ActiveLock logs in Datadog, navigate to the [Log Explorer][6] and enter `source:typingdna` and/or `service:activelock` in the search query.

To access the dashboard, navigate to the [Dashboard List][7] and search for the **TypingDNA ActiveLock** dashboard.


## Data Collected

### Log collection

TypingDNA ActiveLock logs are collected and sent to Datadog directly from each application.

## Troubleshooting

Need help? Contact [Datadog][8] or [TypingDNA support][5].

[1]: https://www.typingdna.com/activelock
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://www.typingdna.com/clients/altrial
[4]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
[5]: https://www.typingdna.com/contact
[6]: https://app.datadoghq.com/logs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://docs.datadoghq.com/help/

