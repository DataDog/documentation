---
aliases:
- /ja/integrations/faq/how-to-import-datadog-resources-into-terraform
- /ja/agent/guide/how-to-import-datadog-resources-into-terraform
title: Importing Datadog Resources into Terraform
---

## 概要

Terraform はすぐに使える方法として、[`terraform import`][1] コマンドで既存のリソースを terraform の状態にインポートすることができます。
これは `terraform import <resource_type>.<resource_name> <existing_id>` というコマンドで実行することができます。

この方法は `state only` であり、HCL リソースを terraform のコンフィギュレーションファイルに完全に定義しておく必要があります。構成を完全にインポートするには、Terraformer のようなツールを使用することができます。

## Terraformer

[terraformer project][2] では、リソースを状態と HCL 構成の両方としてインポートすることができます。

インストールしたら、terraform ディレクトリに基本的な `main.tf` をセットアップします。

terraform 0.13+ の構文を使用していますが、その他の構成は [Datadog プロバイダー公式ドキュメント][3]に記載されています。

```hcl
# main.tf

terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
    }
  }
}

# Datadog プロバイダーの構成
provider "datadog" {}
```

次に、このディレクトリから `terraform init` を実行し、Datadog terraform プロバイダーを引き込みます。

これで `terraformer` を使ってリソースのインポートを開始することができるようになりました。例えば、Dashboard `abc-def-ghi` をインポートするには、次のように実行します。

`terraformer import datadog --resources=dashboard --filter=dashboard=abc-def-ghi --api-key <YOUR_API_KEY> --app-key <YOUR_APP_KEY> --api-url <YOUR_DATADOG_SITE_URL>`

これにより、terraform の状態ファイルと、インポートしたリソースを表す HCL terraform コンフィギュレーションファイルの両方を含むフォルダ `generated` が生成されます。

```
generated
└── datadog
    └── dashboard
        ├── dashboard.tf
        ├── outputs.tf
        ├── provider.tf
        └── terraform.tfstate
```

* `dashboard.tf`: 新しくインポートされたダッシュボードの HCL コンフィギュレーションファイル
* `outputs.tf`: 他の構成で潜在的に使用するための出力を含む HCL
* `provider.tf`: `main.tf` ファイルにあるような、プロバイダーの HCL 初期化
* `terraform.tfstate`: インポートしたダッシュボードを表す terraform の状態

## terraformer の他の実行例

すべての例のコマンドは `--api-key`、`--app-key`、`--api-url` フラグを必要とします。

* すべてのモニターをインポートします: `terraformer import datadog --resources=monitor`
* ID が 1234 のモニターをインポートします: `terraformer import datadog --resources=monitor --filter=monitor=1234`
* ID が 1234 と 12345 のモニターをインポートします: `terraformer import datadog --resources=monitor --filter=monitor=1234:12345`
* すべてのモニターとダッシュボードをインポートします: `terraformer import datadog --resources=monitor,dashboard`
* ID が 1234 のモニターと ID が abc-def-ghi のダッシュボードをインポートします: `terraformer import datadog --resources=monitor,dashboard --filter=monitor=1234,dashboard=abc-def-ghi`

## Terraform v0.13+ でのリソースの生成

バージョン `0.8.10` から、Terraformer は Terraform `v0.12.29` を使用して `tf`/`json` と `tfstate` ファイルを生成します。互換性を確保するために、Terraform `v0.13.x` を使用してアップグレードコマンド `terraform 0.13upgrade .` を実行します。アップグレードについては [Terraform 公式ドキュメント][4]を参照してください。

##### Terraform v0.13+ 用に生成されたファイルをアップグレード:

1. terraformer でリソースをインポートします。

2. Terraform `v0.13.x` を使用して、生成されたリソースディレクトリに `cd` して `terraform 0.13upgrade .` を実行します。

3. `terraform init` を実行して、プロバイダーのインストーラーを再実行します。

4. `terraform apply` を実行して、Terraform の状態ファイルにアップグレードを適用します。

[1]: https://www.terraform.io/docs/import/index.html
[2]: https://github.com/GoogleCloudPlatform/terraformer
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[4]: https://www.terraform.io/upgrade-guides/0-13.html