---
app_id: terraform
app_uuid: 05198ed5-6fe5-417b-8711-e124718e9715
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: terraform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/terraform/README.md
display_on_public_website: true
draft: false
git_integration_title: terraform
integration_id: terraform
integration_title: terraform
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: terraform
oauth: {}
public_title: terraform
short_description: Terraform を使用して Datadog アカウントを管理する
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Orchestration
  configuration: README.md#Setup
  description: Terraform を使用して Datadog アカウントを管理する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: terraform
---



## 概要

Datadog Terraform プロバイダーは Terraform コンフィギュレーションを介して Datadog API とのやり取りを可能にします。このコンフィギュレーションによって、ダッシュボード、モニター、ログコンフィギュレーションといった Datadog のリソースを管理することができます。

## セットアップ

### インストール

Datadog Terraform プロバイダーは [Terraform レジストリ][1]を介して利用することができます。

### コンフィギュレーション

1. [Terraform のインストール][2]
2. Terraform のコンフィギュレーションファイルを含むディレクトリを作成します。例: `terraform_config/`
3. `terraform_config/` ディレクトリに、以下の内容の `main.tf` ファイルを作成します。
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

4. `terraform init` を実行します。これにより、Terraform での利用のためにディレクトリが初期化され、Datadog プロバイダーがプルされます。
5. `terraform_config/` ディレクトリ内に任意の `.tf` ファイルを作成し、Datadog リソースの作成を開始します。例:

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

6. `terraform apply` を実行して Datadog アカウントにこのモニターを作成します。

## Datadog にイベントを送信する

`datadogpy` をインストールすることで、Dogwrap コマンドラインツールにアクセスできるようになります。このツールを使って、任意の Terraform コマンドをラップして、カスタムイベントにバインドすることができます。

`datadogpy` をインストールします:
  ```
  pip install datadog
  ```

詳しくは、[Datadog Python ライブラリ][3]をご覧ください。

`terraform apply` イベントを送信します:

  ```
  dogwrap -n "terraform apply" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform apply -no-color"
  ```

`terraform destroy` イベントを送信します:

  ```
  dogwrap -n "terraform destroy" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform destroy -no-color"
  ```

## 収集データ

### メトリクス

Terraform には、メトリクスは含まれません。

### サービスのチェック

Terraform には、サービスのチェック機能は含まれません。

### イベント

Terraform には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[3]: https://github.com/DataDog/datadogpy
[4]: https://docs.datadoghq.com/ja/help/