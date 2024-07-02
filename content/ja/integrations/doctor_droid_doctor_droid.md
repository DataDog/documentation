---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "doctor-droid-doctor-droid"
"app_uuid": "21cab2f6-0f10-4302-9b61-7d99433a9294"
"assets": {}
"author":
  "homepage": "https://drdroid.io/"
  "name": Doctor Droid
  "sales_email": sales@drdroid.io
  "support_email": support@drdroid.io
  "vendor_id": doctor-droid
"categories":
- ai/ml
- automation
- incidents
- alerting
- marketplace
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "doctor_droid_doctor_droid"
"integration_id": "doctor-droid-doctor-droid"
"integration_title": "Doctor Droid"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "doctor_droid_doctor_droid"
"pricing":
- "billing_type": tag_count
  "includes_assets": false
  "metric": ""
  "product_id": doctor-droid
  "short_description": $10 per 100 queries (Free for first 100 queries)
  "tag": ""
  "unit_label": queries
  "unit_price": !!float "10.0"
"public_title": "Doctor Droid"
"short_description": "Alert Enrichment & Automated Investigation for Production issues"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AI/ML"
  - "Category::Automation"
  - "Category::Incidents"
  - "Category::Alerting"
  - "Category::Marketplace"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Software License"
  "configuration": "README.md#Setup"
  "description": Alert Enrichment & Automated Investigation for Production issues
  "media":
  - "caption": Add the Doctor Droid's slack integration in your workspace
    "image_url": images/1.png
    "media_type": image
  - "caption": Go to your monitor settings and add the Doctor Droid webhook as a destination.
    "image_url": images/2.png
    "media_type": image
  - "caption": Connect any of your existing playbooks in Doctor Droid.
    "image_url": images/3.png
    "media_type": image
  - "caption": Receive response of the playbook analysis, directly in your inbox.
    "image_url": images/4.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Doctor Droid
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

At Doctor Droid, we are building tools to help teams solve challenges in their monitoring & observability. Doctor Droid Playbooks is an automation tool designed to eliminate toil for engineers by streamlining repetitive, manual tasks.

Doctor Droid seamlessly integrates with a multitude of data sources and provides a platform for creating powerful, user-defined playbooks. Whether you're dealing with log searches, database queries, monitoring metrics, or needing a consolidated view of your operational metrics, Doctor Droid has you covered.

Doctor Droid enriches alerts and auto-analyses your Datadog account for other anomalies across your system.

**How it works?**

1.  Install the [Doctor Droid integration](https://app.datadoghq.com/integrations/doctordroid)
2.  Define investigation steps in Doctor Droid as a playbook (for example, define steps like check downstream metrics, check recent deployments, check error logs, and so on).
3.  Add a Doctor Droid webhook to your monitor.
4.  Automatically get an investigation summary and insights when your monitor is triggered.

## Support

You can reach out to our team at support@drdroid.io for any support queries.


---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/doctor-droid-doctor-droid" target="_blank">Click Here</a> to purchase this application.
