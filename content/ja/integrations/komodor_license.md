---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "komodor-komodor"
"app_uuid": "d62310ba-c7a8-4c5b-ab9f-60bb46527f1b"
"assets": {}
"author":
  "homepage": "https://komodor.com"
  "name": Komodor
  "sales_email": datadogsales@komodor.com
  "support_email": support@komodor.com
  "vendor_id": komodor
"categories":
- configuration & deployment
- containers
- issue tracking
- kubernetes
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "komodor_license"
"integration_id": "komodor-komodor"
"integration_title": "Komodor"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "komodor_license"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.komodor.komodor
  "product_id": komodor
  "short_description": Pricing tiers based on node volume
  "tag": node
  "unit_label": Node monitored
  "unit_price": !!float "30.0"
"public_title": "Komodor"
"short_description": "Kubernetes Troubleshooting Platform"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Category::Issue Tracking"
  - "Category::Kubernetes"
  - "Category::Marketplace"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Kubernetes Troubleshooting Platform
  "media":
  - "caption": Komodor's main service view and full workload visibility
    "image_url": images/Komodor_screen_01.png
    "media_type": image
  - "caption": Correlate between several services and piece together the chain of events on a single timeline
    "image_url": images/Komodor_screen_02.png
    "media_type": image
  - "caption": Easily compare changes in the Kubernetes manifest and config changes through Komodor
    "image_url": images/Komodor_screen_03.png
    "media_type": image
  - "caption": Deep dive into Pod status and logs without a single kubectl command
    "image_url": images/Komodor_screen_04.png
    "media_type": image
  - "caption": Connect Datadog alerts, Kubernetes events, and availability issues in one simple view
    "image_url": images/Komodor_screen_06.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Komodor
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Komodor tracks changes across your entire K8s stack, analyzes their ripple effects, and provides you with the context you need to troubleshoot efficiently and independently. Komodor gives you insight into your Kubernetes deployments on a timeline with relevant information such as what changed, what code was pushed, and who pushed it. You can also view data from Git, config maps, your infrastructure, alerting, and other tools such as Datadog, in one centralized and easy-to-understand display. 

This offering in the Datadog Marketplace provides access to the Komodor platform. If you are already a Komodor customer and need to connect your instance to Datadog, [set up the integration][1].

## Support
At Komodor, we're committed to giving you the tools and information you need to be successful. So, we offer multiple ways to get the help you need, when you need it. You can send us messages from inside the Komodor application (the communication button in the bottom right), use the Docs and FAQs to find information, or open a ticket with support by sending an email to [support@komodor.com](mailto:support@komodor.com).


[1]: /integrations/komodor
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/komodor-komodor" target="_blank">Click Here</a> to purchase this application.
