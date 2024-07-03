---
app_id: terraform
app_uuid: 05198ed5-6fe5-417b-8711-e124718e9715
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10153
    source_type_name: terraform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- developer tools
- orchestration
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/terraform/README.md
display_on_public_website: true
draft: false
git_integration_title: terraform
integration_id: terraform
integration_title: Terraform
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: terraform
public_title: Terraform
short_description: Manage your Datadog account using Terraform
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Manage your Datadog account using Terraform
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Terraform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The Datadog Terraform provider allows you to interact with the Datadog API through a Terraform configuration. You can manage your Datadog resources, such as Dashboards, Monitors, Logs Configuration, etc, with this configuration.

## セットアップ

### インストール

The Datadog Terraform provider is available through the [Terraform Registry][1].

### 構成

1. [Install Terraform][2].
2. Create a directory to contain the Terraform configuration files, for example: `terraform_config/`.
3. Create a `main.tf` file in the `terraform_config/` directory with the following content:
    ```
    terraform {
      required_providers {
        datadog = {
          source = "DataDog/datadog"
        }
      }
    }

    # Configure the Datadog provider
    provider "datadog" {
      api_key = var.datadog_api_key
      app_key = var.datadog_app_key
    }
    ```

    **Note**: If you are not using the Datadog US1 site, you must set the `api_url` [optional parameter][3] with your [Datadog site][4]. Ensure the documentation site selector on the right of the page is set to your correct Datadog site, then use the following URL as the value of the `api_url` parameter:

    ```
    https://api.{{< region-param key="dd_site" code="true" >}}/
    ```
4. Run `terraform init`. This initializes the directory for use with Terraform and pulls the Datadog provider.
5. Create any `.tf` file in the `terraform_config/` directory and start creating Datadog resources. 

## Create a monitor

This example demonstrates a `monitor.tf` file that creates a [live process monitor][5].

    ```
    # monitor.tf
    resource "datadog_monitor" "process_alert_example" {
      name    = "Process Alert Monitor"
      type    = "process alert"
      message = "Multiple Java processes running on example-tag"
      query   = "processes('java').over('example-tag').rollup('count').last('10m') > 1"
      monitor_thresholds {
        critical          = 1.0
        critical_recovery = 0.0
      }

      notify_no_data    = false
      renotify_interval = 60
    }
    ```

Run `terraform apply` to create this monitor in your Datadog account.

## Send Events to Datadog

By installing `datadogpy`, you have access to the Dogwrap command line tool, which you can use to wrap any Terraform command and bind it to a custom event.

Install `datadogpy`:
  ```
  pip install datadog
  ```

For more information, see the [Datadog Python library][6].

Send a `terraform apply` event:

  ```
  dogwrap -n "terraform apply" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform apply -no-color"
  ```

Send a `terraform destroy` event:

  ```
  dogwrap -n "terraform destroy" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform destroy -no-color"
  ```

## 収集データ

### メトリクス

Terraform does not include any metrics.

### サービスチェック

Terraform does not include any service checks.

### イベント

Terraform does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs#optional
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://docs.datadoghq.com/ja/monitors/types/process/
[6]: https://github.com/DataDog/datadogpy
[7]: https://docs.datadoghq.com/ja/help/