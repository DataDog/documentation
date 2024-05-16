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
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 構成 & デプロイ
- developer tools
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/terraform/README.md
display_on_public_website: true
draft: false
git_integration_title: terraform
integration_id: terraform
integration_title: Terraform
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: terraform
public_title: Terraform
short_description: Terraform を使用して Datadog アカウントを管理する
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
  description: Terraform を使用して Datadog アカウントを管理する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Terraform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog Terraform プロバイダーは Terraform コンフィギュレーションを介して Datadog API とのやり取りを可能にします。このコンフィギュレーションによって、ダッシュボード、モニター、ログコンフィギュレーションといった Datadog のリソースを管理することができます。

## 計画と使用

### インフラストラクチャーリスト

Datadog Terraform プロバイダーは [Terraform レジストリ][1]を介して利用することができます。

### ブラウザトラブルシューティング

1. [Terraform をインストールします][2]。
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

   **注**: Datadog US1 サイトを使用していない場合は、`api_url` [オプションパラメーター][3]を [Datadog サイト][4]に設定する必要があります。ページの右側にあるドキュメントサイトセレクタが正しい Datadog サイトに設定されていることを確認してから、`api_url` パラメーターの値として以下の URL を使用してください。

    ```
    https://api.{{< region-param key="dd_site" code="true" >}}/
    ```
4. `terraform init` を実行します。これにより、Terraform での利用のためにディレクトリが初期化され、Datadog プロバイダーがプルされます。
5. `terraform_config/` ディレクトリ内に任意の `.tf` ファイルを作成し、Datadog リソースの作成を開始します。

## ノートブックの更新

この例では、[ライブプロセスモニター][5]を作成する `monitor.tf` ファイルを示します。

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

`terraform apply` を実行して Datadog アカウントにこのモニターを作成します。

## Datadog にイベントを送信する

`datadogpy` をインストールすることで、Dogwrap コマンドラインツールにアクセスできるようになります。このツールを使って、任意の Terraform コマンドをラップして、カスタムイベントにバインドすることができます。

`datadogpy` をインストールします:
  ```
  pip install datadog
  ```

詳しくは、[Datadog Python ライブラリ][6]をご覧ください。

`terraform apply` イベントを送信します:

  ```
  dogwrap -n "terraform apply" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform apply -no-color"
  ```

`terraform destroy` イベントを送信します:

  ```
  dogwrap -n "terraform destroy" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform destroy -no-color"
  ```

## リアルユーザーモニタリング

### データセキュリティ

Terraform には、メトリクスは含まれません。

### ヘルプ

Terraform には、サービスのチェック機能は含まれません。

### ヘルプ

Terraform には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs#optional
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://docs.datadoghq.com/ja/monitors/types/process/
[6]: https://github.com/DataDog/datadogpy
[7]: https://docs.datadoghq.com/ja/help/