---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-gitlab"
"app_uuid": "629973c5-63ac-4f17-a9c2-5bda5b6677b4"
"assets":
  "dashboards":
    "RapDev GitLab Overview": assets/dashboards/RapDevGitLabDashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.gitlab.users
      "metadata_path": metadata.csv
      "prefix": rapdev.gitlab.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10300"
    "source_type_name": RapDev GitLab
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- cloud
- metrics
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_gitlab"
"integration_id": "rapdev-gitlab"
"integration_title": "GitLab"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_gitlab"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.gitlab
  "product_id": gitlab
  "short_description": Unit price per project
  "tag": project_name
  "unit_label": GitLab Project
  "unit_price": !!int "1"
"public_title": "GitLab"
"short_description": "Monitor your GitLab projects, applications, and instances."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Marketplace"
  - "Category::Cloud"
  - "Category::Metrics"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor your GitLab projects, applications, and instances.
  "media":
  - "caption": General metrics about GitLab API Status, Project Metrics, and Sidekiq
    "image_url": images/RapDevGitLab_DB1.jpg
    "media_type": image
  - "caption": Metrics about any and all instances
    "image_url": images/RapDevGitLab_DB2.jpg
    "media_type": image
  - "caption": Metrics about specific runners and issues
    "image_url": images/RapDevGitLab_DB3.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": GitLab
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
GitLab is a DevOps software package that combines the ability to develop, secure, and operate software in a single application. This integration collects and reports the following GitLab metrics through different endpoints in the GitLab API:
+ Project metrics
+ Sidekiq stats
+ Instance metrics
+ Installed runners
+ Total and open issues

### ダッシュボード
This integration provides an out-of-the-box dashboard called **RapDev GitLab Dashboard** which displays data submitted to Datadog over time, and includes environment variables to further narrow down a search on a specific project or host.

## Support
For support or feature requests, contact RapDev.io through the following channels:
- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston
*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a 
[note][2], and we'll build it!!*

[1]: https://docs.datadoghq.com/getting_started/agent/
[2]: mailto:support@rapdev.io

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-gitlab" target="_blank">Click Here</a> to purchase this application.
