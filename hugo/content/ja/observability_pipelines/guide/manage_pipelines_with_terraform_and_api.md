---
description: API または Terraform を使用してパイプラインを作成および更新する方法を学習します。
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /api/latest/observability-pipelines/
  tag: ドキュメント
  text: Observability Pipelines API
title: API または Terraform を使用して Observability Pipelines を管理する
---
## 概要 {#overview}

多数の Observability Pipelines デプロイメントを管理しており、手動構成によるエラーを減らしたい場合は、API または Terraform を使用してパイプラインをプログラムで管理できます。このガイドでは、[API](#manage-pipelines-with-the-api) または [Terraform](#manage-pipelines-with-terraform) を使用してパイプラインを構成および更新する方法について説明します。

## 前提条件 {#prerequisites}

開始する前に、以下を確認します。

- 認証用に Datadog API とアプリケーションキーを用意します。<br>**注**: API キーは [Remote Configuration 用に有効化][1]されている必要があります。
- Terraform を使用する場合:
  - マシンに最新バージョンの Terraform がインストールされていることを確認します。
  - [Datadog Terraform プロバイダー][2] および [Observability Pipelines リソース][3]を確認します。
- API を使用する場合は、[Observability Pipelines API][4] エンドポイントの仕様と追加の構成パラメーターを確認します。

## API でパイプラインを管理する {#manage-pipelines-with-the-api}

Observability Pipelines API を使用して、CRUD (作成、読み取り、更新、削除) 操作を実行できます。このセクションでは、ワークフローでこれらのエンドポイントを使用する方法について説明します。各リクエスト例について、以下のプレースホルダーを置き換えます。

- `<PIPELINE_ID>` をパイプライン作成時に取得した識別子に置き換えます
- `<DD_API_KEY>` を Datadog API キーに置き換えます
- `<DD_APP_KEY>` を Datadog アプリケーションキーに置き換えます

ペイロードの例には、ソース、プロセッサー、および送信先のサンプル `id` 値 (`my-processor-group` や `datadog-agent-source` など) も含まれています。これらは選択した名前であり、独自の規則に合わせて変更できます。`type` 値 (`datadog_agent`、`filter`、`datadog_logs` など) は固定されており、サポートされているコンポーネントタイプと一致する必要があります。


### パイプラインを作成する {#create-a-pipeline}

[パイプラインを作成][5]するには、パイプラインの名前と主要コンポーネント (ソース、プロセッサー、送信先) を定義した JSON ペイロードを含む `POST` リクエストを送信します。

リクエスト例:

```bash
curl -X POST "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "config": {
        "destinations": [
          { "id": "datadog-logs-destination", "type": "datadog_logs", "inputs": ["my-processor-group"] }
        ],
        "pipeline_type": "logs",
        "processor_groups": [
          {
            "enabled": true,
            "id": "my-processor-group",
            "include": "service:my-service",
            "inputs": [
              "datadog-agent-source"
            ],
            "processors": [
              { "id": "filter-processor", "enabled": true, "type": "filter", "include": "service:my-service" }
            ]
          }
        ],
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ]
      },
      "name": "Main Observability Pipeline"
    },
    "type": "pipelines"
  }
}'
```

### パイプライン設定を取得する {#retrieve-a-pipeline-configuration}

[既存のパイプライン設定を監査または検証][6]するには、特定のパイプライン ID を含む `GET` リクエストを送信します。

リクエスト例:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

### 既存のパイプラインを更新する {#update-an-existing-pipeline}

[既存のパイプライン設定を更新][7]するには、JSON ペイロードにパイプラインの変更内容を含めた `PUT` リクエストを送信します。

リクエスト例:

```bash
curl -X PUT "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "name": "Updated Pipeline Name",
      "config": {
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ],
        "processors": [
          { "id": "filter-processor", "type": "filter", "include": "service:my-updated-service", "inputs": ["datadog-agent-source"] }
        ],
        "destinations": [
          { "id": "updated-datadog-logs-destination", "type": "datadog_logs", "inputs": ["filter-processor"] }
        ]
      }
    },
    "type": "pipelines"
  }
}'
```

### パイプラインを削除する {#delete-a-pipeline}

[パイプラインを削除][8]するには、対応するエンドポイントに `DELETE` リクエストを送信します。削除が成功すると、パイプラインが削除されたことを示す `204` ステータスコードが返されます。

**注**: 削除操作は元に戻せません。このエンドポイントは、パイプラインが不要になったことを確認した場合にのみ使用します。

リクエスト例:

```bash
curl -X DELETE "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

## Terraform でパイプラインを管理する {#manage-pipelines-with-terraform}

Terraform リソースを使用して、パイプラインを作成およびデプロイできます。

### Terraform を使用してパイプラインを作成する {#create-a-pipeline-using-terraform}

[datadog_observability_pipeline][9] リソースを使用してパイプラインを定義します。変更を追跡するために、このファイルをバージョン管理システムで管理します。

Terraform を実行する前に、認証情報が設定ファイルに保存されないよう、以下の環境変数を設定します。

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_APP_KEY=<DD_APP_KEY>
export DD_HOST={{< region-param key="dd_api" code="true" >}}
```

Terraform パイプライン設定の例:

```hcl
terraform {
  required_providers {
    datadog = {
      source = "DataDog/datadog"
      version = "~> 3.84"
    }
  }
}

provider "datadog" {}

resource "datadog_observability_pipeline" "main" {
  name = "Main Observability Pipeline"

  config {
    source {
      id = "datadog-agent-source"

      datadog_agent {}
    }

    processor_group {
      id      = "filter-processor"
      enabled = true
      include = "service:my-service"
      inputs  = ["datadog-agent-source"]

      processor {
        id      = "filter-1"
        enabled = true
        include = "service:my-service"

        filter {}
      }
    }

    destination {
      id     = "datadog-logs-destination"
      inputs = ["filter-processor"]

      datadog_logs {}
    }
  }
}
```

`service:my-service` を、パイプラインで処理するログに一致する検索クエリに置き換えます。

### Terraform を使用してパイプラインをデプロイする {#deploy-a-pipeline-with-terraform}

新しいパイプライン構成を定義するか、既存の構成を更新した後、次の Terraform コマンドを実行してパイプライン構成をデプロイします。

```bash
terraform init
terraform plan
terraform apply
```

- `terraform init` は作業ディレクトリを初期化します。
- `terraform plan`実行される変更をプレビューします。
- `terraform apply`変更を適用し、それに応じてパイプラインを作成または更新します。

構成をデプロイした後、[Worker をインストール][10]して、パイプライン経由でデータを送信します。パイプラインは、少なくとも 1 つの Worker が実行されていない限り、データを処理しません。

**注**: アクティブなパイプラインは削除できません。パイプラインのリソースブロックを削除する前に、そのパイプラインのすべての Worker を停止します。詳細については、[パイプラインの削除][11]を参照してください。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /ja/api/latest/observability-pipelines/
[5]: /ja/api/latest/observability-pipelines/create-a-new-pipeline/
[6]: /ja/api/latest/observability-pipelines/get-a-specific-pipeline/
[7]: /ja/api/latest/observability-pipelines/update-a-pipeline/
[8]: /ja/api/latest/observability-pipelines/delete-a-pipeline/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[10]: /ja/observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-with-the-api
[11]: /ja/observability_pipelines/configuration/set_up_pipelines/?tab=logs#delete-a-pipeline