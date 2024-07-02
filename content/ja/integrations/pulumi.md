---
"app_id": "pulumi"
"app_uuid": "7604c52b-dc07-4854-a5e4-799ab62798d8"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": pulumi.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10220"
    "source_type_name": Pulumi
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Pulumi
  "sales_email": team@pulumi.com
  "support_email": team@pulumi.com
"categories":
- aws
- automation
- cloud
- configuration & deployment
- developer tools
- orchestration
- provisioning
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/pulumi/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pulumi"
"integration_id": "pulumi"
"integration_title": "Pulumi"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "pulumi"
"public_title": "Pulumi"
"short_description": "Infrastructure as code for any cloud using your favorite programming languages"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Automation"
  - "Category::Cloud"
  - "Category::Configuration & Deployment"
  - "Category::Developer Tools"
  - "Category::Orchestration"
  - "Category::Provisioning"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Infrastructure as code for any cloud using your favorite programming languages
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Pulumi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Pulumi][1] is a modern infrastructure as code platform that enables cloud engineering teams to define, deploy, and manage cloud resources on any cloud using their favorite programming languages.

The Pulumi integration is used to provision any of the cloud resources available in Datadog. This integration must be configured with credentials to deploy and update resources in Datadog.

**Note**: You need to set AWS IAM Permissions for the integration to make changes. You can find steps on setting AWS IAM Permissions in our [AWS Integration documentation][2].

## セットアップ

### インストール

The [Pulumi Datadog integration][3] uses the Datadog SDK to manage and provision resources.

### 構成

1. [Sign up for a free or commercial Pulumi account][4]

2. [Install Pulumi][5]

3. Once obtained, there are two ways to set your Datadog authorization tokens for Pulumi:


Set the environment variables `DATADOG_API_KEY` and `DATADOG_APP_KEY`:

```
export DATADOG_API_KEY=XXXXXXXXXXXXXX && export DATADOG_APP_KEY=YYYYYYYYYYYYYY
```

Or, set them using configuration if you prefer that they be stored alongside your Pulumi stack for easier multi-user access:

```
pulumi config set datadog:apiKey XXXXXXXXXXXXXX --secret && pulumi config set datadog:appKey YYYYYYYYYYYYYY --secret
```

**Note**: Pass `--secret` when setting `datadog:apiKey` and `datadog:appKey` so that they are properly encrypted.

4. Run `pulumi new` to initialize a project directory for your infrastructure stack and follow the [API documentation][6] to define new metrics, monitors, dashboards, or other resources.

5. Once you have defined your cloud resources in code, run `pulumi up` to create the new resources defined in your Pulumi program. 

## 収集データ

### メトリクス

Pulumi does not include any metrics.

### サービスチェック

Pulumi does not include any service checks.

### イベント

Pulumi does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://pulumi.com
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#aws-iam-permissions
[3]: https://www.pulumi.com/docs/intro/cloud-providers/datadog/
[4]: https://www.pulumi.com/pricing/
[5]: https://www.pulumi.com/docs/get-started/
[6]: https://www.pulumi.com/docs/reference/pkg/datadog/
[7]: https://docs.datadoghq.com/help/

