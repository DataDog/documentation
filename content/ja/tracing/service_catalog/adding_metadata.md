---
aliases:
- /ja/tracing/error_tracking/explorer/
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog サービスカタログ
- link: /api/latest/service-definition/
  tag: ドキュメント
  text: サービス定義 API
- link: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
  tag: GitHub
  text: サービス定義スキーマ
kind: ドキュメント
title: メタデータの追加
---

## 概要

Datadog の UI や API を通じて、または GitHub インテグレーションや Terraform 経由で自動化パイプラインを使用することで、既存のサービスカタログにメタデータを追加することができます。

## メタデータの構造とサポートされるバージョン

サービスカタログは、サービス定義スキーマを使用して、サービスに関連するメタデータを保存および表示します。スキーマには、有効な値のみが受け入れられるようにするための検証ルールが組み込まれており、選択したサービスのサイドパネルの **Definition** タブで警告を表示することができます。

スキーマのサポートバージョンは 2 つあります。

- V2 は最も初期のバージョンで、`dd-team` などの実験的な機能が含まれていますが、これらは v2.1 では削除されています。
- V2.1 では、サービスのグルーピングや `application`、`tier`、`lifecycle` などのフィールドなど、追加の UI 要素をサポートしています。`Application` は、Teams と一緒に、サービスカタログでグループ化変数として使用することができます。`Lifecycle` は、`production`、`experimental`、`deprecated` でサービスを区別して開発ステージを示し、信頼性と可用性に関して異なる要件を適用するのに役立ちます。`Tier` は、インシデントのトリアージ中に優先順位を決めるためのサービスの重要度を示します。例えば、`tier 1` は通常、最も重要なサービスを表し、障害が発生すると顧客に深刻な影響を与えますが、`tier 4` サービスは通常、実際のカスタマーエクスペリエンスに影響を及ぼしません。


最新の更新については、GitHub 上のスキーマをご覧ください。

### サービス定義スキーマ (v2.1)

サービス定義スキーマは、サービスの基本情報を格納する構造です。[GitHub 上の完全なスキーマ][1]を参照してください。

#### 例
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.1
dd-service: web-store
team: shopist
contacts:
 - type: slack
   contact: https://datadogincidents.slack.com/archives/C01EWN6319S
application: shopist
description: shopist.com storefront
tier: tier1
lifecycle: production
links:
 - name: Demo Dashboard
   type: dashboard
   url: https://app.datadoghq.com/dashboard/krp-bq6-362
 - name: Common Operations
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Disabling Deployments
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Rolling Back Deployments
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Source
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
 - name: Deployment
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
 - name: Deployment Information
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
 - name: Service Documentation
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
tags: []
integrations:
 pagerduty:
   service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
外部リソース (オプション)
{{< /code-block >}}

### サービス定義スキーマ (v2)

サービス定義スキーマは、サービスの基本情報を格納する構造です。[GitHub 上の完全なスキーマ][2]を参照してください。

#### 例
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2
dd-service: web-store
team: shopist
contacts:
  - type: slack
    contact: https://exampleincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.examplehq.com/dashboard/krp-bq6-362
  - name: Common Operations
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Disabling Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Rolling Back Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
repos:
  - name: Source
    provider: github
    url: https://github.com/Example/shopist/tree/prod/rails-storefront
  - name: Deployment
    provider: github
    url: https://github.com/Example/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
docs:
  - name: Deployment Information
    provider: link
    url: https://docs.datadoghq.com/
  - name: Service Documentation
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
    pagerduty: https://example.pagerduty.com/service-directory/XYZYX
外部リソース (オプション)
{{< /code-block >}}

## Datadog UI からメタデータを追加する

サービスがサービスカタログにリストされ、すでにメタデータが関連付けられている場合、元のソースは、**Ownership** ビューの **Metadata Source** 列にリストされています。そのソースに戻り、必要な更新を行います。

サービスにサービス定義のメタデータが割り当てられていない場合、またはサービスがまだサービスカタログにリストされていない場合は、追加することができます。

1. [サービスカタログ][10]ページで、**Setup & Config** をクリックします。**Manage Entries** タブには、メタデータがないサービスの数が表示されます。

2. **Create New Entry** をクリックします。

3. メタデータを追加するサービスを指定します。これは、サービスカタログにすでにリストされている、まだサービス定義のメタデータが定義されていないサービスの名前、または、データを送信していないサービスの名前にすることができます。

4. チーム、オンコール、連絡先、ドキュメント、コードリポジトリ、その他のリンクの詳細を入力してください。

4. **Code** ビューに切り替えると、入力したメタデータに対して生成された JSON と cURL が表示されます。このコードをコピーすれば、サービス定義のスキーマを学ぶことなく、API や Terraform、GitHub でプログラム的にサービス定義を提供するための出発点として利用することができます。

5. [Service Catalog Write][13] 権限を持っている場合、**Save Entry** をクリックするか、**Code** ビューで提供される cURL コマンドを実行することで、メタデータを送信することができます。

## メタデータ追加の自動化オプション

### サービス定義の GitHub への保存と編集

[GitHub インテグレーション][6]を構成し、サービスカタログでサービスの定義を表示する場所から、GitHub で保存・編集可能な場所に直接リンクするようにします。

GitHub インテグレーションをインストールするには、[インテグレーションタイル][7]に移動し、**Repo Configuration** タブにある **Link GitHub Account** をクリックします。

#### サービス定義 YAML ファイル

Datadog は各リポジトリのルートにある `service.datadog.yaml` ファイルを読み取り権限でスキャンします。複数の YAML ドキュメントを作成することで、1 つの YAML ファイルに複数のサービスを登録することができます。各ドキュメントは 3 つのダッシュ (`---`) で区切ります。

#### サービス定義の変更

サービス定義に GitHub インテグレーションを設定すると、サービスの **Definition** タブに **Edit in Github** ボタンが表示され、GitHub にリンクして変更をコミットすることができるようになります。

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="サービスカタログのサービスの Definition タブに Edit in Github ボタンが表示されるようになった" style="width:90%;" >}}

リポジトリの YAML ファイルを更新すると、その変更はサービスカタログに伝搬されます。

誤って上書きされることを防ぐため、サービス定義ファイルの作成と変更は、GitHub インテグレーションまたは [Service Definition API エンドポイント][3]のどちらかを使用してください。GitHub と API の両方を使用して同じサービスを更新すると、意図しない上書きが発生する可能性があります。

### Terraform でサービス定義の更新を自動化する

サービスカタログは、[Terraform リソース][14]としてサービス定義を提供します。自動化されたパイプラインによるサービスカタログのサービスの作成と管理には、[Datadog Provider][8] v3.16.0 以降が必要です。

詳細については、[Datadog Provider のドキュメント][9]を参照してください。

### オープンソースのメタデータプロバイダー

GitHub インテグレーションや Terraform の代わりに、オープンソースの GitHub Action ソリューションである [Datadog サービスカタログメタデータプロバイダー][12]を利用することができます。

この GitHub Action を使用すると、Datadog にこの情報を送信するタイミングを完全に制御しながら、GitHub Action を使用してサービスカタログにサービスを登録し、組織独自のその他のコンプライアンスチェックを実装することができます。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/schema/blob/main/service-catalog/v2.1/schema.json
[2]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[3]: /ja/tracing/service_catalog/service_definition_api/
[6]: /ja/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[10]: https://app.datadoghq.com/services
[12]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[13]: https://app.datadoghq.com/personal-settings/profile
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml