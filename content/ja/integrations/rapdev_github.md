---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-github"
"app_uuid": "37a265a0-fb4a-463b-aaea-653f5d950c2c"
"assets":
  "dashboards":
    "RapDev GitHub Overview": assets/dashboards/RapDevGitHubDashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.github.users.count
      "metadata_path": metadata.csv
      "prefix": rapdev.github.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10289"
    "source_type_name": RapDev GitHub
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- cloud
- collaboration
- marketplace
- metrics
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_github"
"integration_id": "rapdev-github"
"integration_title": "GitHub"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_github"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.github
  "product_id": github
  "short_description": Unit price per repository
  "tag": repo_name
  "unit_label": GitHub Repository
  "unit_price": !!int "1"
"public_title": "GitHub"
"short_description": "Monitor your GitHub organizations or enterprises"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Collaboration"
  - "Category::Marketplace"
  - "Category::Metrics"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor your GitHub organizations or enterprises
  "media":
  - "caption": General metrics about a GitHub Organization or Enterprise
    "image_url": images/RapDevGitHub_DB1.jpg
    "media_type": image
  - "caption": Metrics about any and all runners
    "image_url": images/RapDevGitHub_DB2.jpg
    "media_type": image
  - "caption": Metrics about specific repos
    "image_url": images/RapDevGitHub_DB3.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": GitHub
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
This integration collects and reports GitHub metrics to Datadog through
different endpoints in the GitHub API. The following varieties
of metrics are submitted:
+ Organization/Enterprise Stats
+ Repository Metrics
+ Self-hosted and Installed Runners
+ GitHub Workflow Monitoring

### ダッシュボード
This integration provides an out-of-the-box dashboard called
**RapDev GitHub Dashboard**.
This dashboard populates as data is submitted to Datadog over time and includes
environment variables to further narrow down a search
on a specific repo or author.

## Support
For support or feature requests, contact RapDev.io through the following channels:
- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston
*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a 
[note](mailto:support@rapdev.io), and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-github" target="_blank">Click Here</a> to purchase this application.
