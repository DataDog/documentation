---
"app_id": "firefly"
"app_uuid": "58481132-c79e-4659-8064-7cdaabbbc999"
"assets": {}
"author":
  "homepage": "https://gofirefly.io"
  "name": Firefly
  "sales_email": contact@gofirefly.io
  "support_email": contact@gofirefly.io
"categories":
- automation
- cloud
- configuration & deployment
- developer tools
- notifications
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/firefly/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "firefly"
"integration_id": "firefly"
"integration_title": "Firefly"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "firefly"
"public_title": "Firefly"
"short_description": "Bring your cloud Up-to-Code"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Cloud"
  - "Category::Configuration & Deployment"
  - "Category::Developer Tools"
  - "Category::Notifications"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Bring your cloud Up-to-Code
  "media":
  - "caption": Full Cloud Inventory
    "image_url": images/FF-inventory.png
    "media_type": image
  - "caption": Automatic Codification
    "image_url": images/FF-codification.png
    "media_type": image
  - "caption": Detect and Fix Drifts
    "image_url": images/FF-fix-drifts.png
    "media_type": image
  - "caption": Detect and Fix Policy Violations
    "image_url": images/FF-insights.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Firefly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
Firefly is a Cloud Asset Management solution that helps Cloud teams discover their cloud footprint (including AWS, GCP, Kubernetes, and Datadog), automatically transform resources to Infrastructure-as-Code, and detect drifts and policy violations to make sure their cloud is aligned with its desired state.
Firefly helps teams make their Datadog assets immutable, versioned, scalable, and monitored by managing them as code in any Infrastructure-as-Code (IaC) tool of their choice.

### Full cloud inventory
Get a fully searchable inventory of all Datadog assets alongside other cloud assets, such as AWS, K8s, GCP, Okta, and more.

### Automatic codification
Automatically turn single or multiple Datadog assets into code, including Terraform, Pulumi, Cloudformation, and CDK specifications.

### Detect and fix drift
Get real-time notifications of any discrepancy between your Infrastructure-as-Code and your actual state of cloud, and push a fix directly to your repository as drift occurs.

### Detect and fix policy violations
Use the Firefly unified policy engine to find hazardous misconfigurations or costly underutilizations, and get alerts on policy violations for both custom and pre-made policies.

## セットアップ

### Configure Firefly - Datadog integration
1. Create a new Datadog application key and API key.
2. In the Firefly UI, go to: **Settings > Integrations > Datadog**
3. Copy the application key and paste it into the dedicated line.
4. Copy the API key and paste it into the dedicated line.
5. Click **Done**.

## Support
Any questions? Email [contact@gofirefly.io][1] or use the in-app chat.

[1]: mailto:contact@gofirefly.io

