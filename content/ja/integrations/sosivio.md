---
"app_id": "sosivio"
"app_uuid": "d98f7912-e5a3-48bc-b63e-612d835bf6b4"
"assets":
  "dashboards":
    "sosivio_overview.json": ./assets/dashboards/sosivio_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": sosivio.healthchecks
      "metadata_path": metadata.csv
      "prefix": sosivio.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10285"
    "source_type_name": Sosivio
"author":
  "homepage": "https://www.sosiv.io"
  "name": Sosivio
  "sales_email": sales@sosiv.io
  "support_email": support@sosiv.io
"categories":
- alerting
- containers
- kubernetes
- network
- notifications
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sosivio/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sosivio"
"integration_id": "sosivio"
"integration_title": "Sosivio"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sosivio"
"public_title": "Sosivio"
"short_description": "Get Answers. Not Data. Predictive Troubleshooting for Kubernetes."
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Network"
  - "Category::Notifications"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Get Answers. Not Data. Predictive Troubleshooting for Kubernetes.
  "media":
  - "caption": Sosivios Dashboard in Datadog
    "image_url": images/datadog-sosivio-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Sosivio
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Sosivio is a Predictive Troubleshooting platform built specifically for Kubernetes environments and applications. Sosivio provides predictive troubleshooting tools, root cause determination, and instant remediation for any failures in Kubernetes environments. Instantly start observing all flavors of Kubernetes with real-time metrics and cluster health checks, and use lean AI to predict and prevent critical failures before they appear.

Sosivio's Datadog integration allows users to see Sosivio Failure Alerts directly in Datadog dashboards and instantly be redirected to the Sosivio UI to remediate those failures (with Sosivio Premium license). You can also add context around Datadog's signals with Sosivio's root cause determination for critical failures.

## Setup

If you don't have a Sosivio account, [create an account][1] and sign up for a free 4-week trial of Sosivio Premium directly from our website (no credit card required). At the end of the 4-week trial, your license converts to the Sosivio Community Version, which is free, forever. With the account set up, you are ready to start using the Sosivio integration in Datadog.


Sosivio is installed under one namespace (labeled "sosivio") which creates all the required components for the product. 


### Installation

1. In the Sosivio Dashboard Configuration page, add your [Datadog API key][2] and Datadog URL (if not the default datadoghq.com site). See [Datadog sites][3] to learn more.
2. Click **Install**.

For more information, view the [Sosivio documentation][4].

## Support

Need help? Contact [Datadog support][5] or reach out to [Sosivio][6].


[1]: https://www.sosiv.io/try-sosivio
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://docs.sosiv.io
[5]: https://docs.datadoghq.com/help/
[6]: mailto:info@sosiv.io

