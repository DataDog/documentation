---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
creates_events: false
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/terraform/README.md
display_name: terraform
draft: false
git_integration_title: terraform
guid: d743cca9-e03e-481a-86d1-3ea15aa915cf
integration_id: terraform
integration_title: terraform
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ''
metric_to_check: ''
name: terraform
public_title: terraform
short_description: Terraform を使用して Datadog アカウントを管理する
support: コア
supported_os:
  - linux
  - mac_os
  - windows
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