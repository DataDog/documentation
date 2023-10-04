---
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Terraform
  text: Terraform によるサービス定義の作成と管理
- link: /api/latest/service-definition/
  tag: API
  text: サービス定義 API について
- link: /integrations/github
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: ブログ
  text: Backstage の YAML ファイルを Datadog にインポート
kind: documentation
title: サービスカタログの設定
---

## 概要

Datadog サービスカタログは、デフォルトで APM、USM、RUM から検出されたすべてのサービスを含みます。これらの製品のいずれかを使用している場合、カタログにはエントリが事前に入力されています。Datadog UI、[API][1] を使ってこれらのエントリにサービスのメタデータを追加したり、[GitHub インテグレーション][11]や [Terraform][2] を使って自動パイプラインを使用することができます。

## サービス定義メタデータの追加

サービスがサービスカタログにリストされ、すでにメタデータが関連付けられている場合、元のソースは、**Ownership** ビューの **Metadata Source** 列にリストされています。そのソースに戻り、必要な更新を行います。

サービスにサービス定義のメタデータが割り当てられていない場合、またはサービスがまだサービスカタログにリストされていない場合は、追加することができます。

1. [サービスカタログ][10]ページで、**Setup & Config** をクリックします。**Manage Entries** タブには、メタデータがないサービスの数が表示されます。

2. **Create New Entry** をクリックします。

3. メタデータを追加するサービスを指定します。これは、サービスカタログにすでにリストされている、まだサービス定義のメタデータが定義されていないサービスの名前、または、データを送信していないサービスの名前にすることができます。

4. Team、On-call、Contacts、Documentation、Code repo、Other links の詳細を入力してください。

4. **Code** ビューに切り替えると、入力したメタデータに対して生成された JSON と cURL が表示されます。このコードをコピーすれば、サービス定義のスキーマを学ぶことなく、API や Terraform、GitHub でプログラム的にサービス定義を提供するための出発点として利用することができます。

5. [Service Catalog Write][13] 権限を持っている場合、**Save Entry** をクリックするか、**Code** ビューで提供される cURL コマンドを実行することで、メタデータを送信することができます。

## サービス定義の GitHub への保存と編集

[GitHub インテグレーション][6]を構成し、サービスカタログでサービスの定義を表示する場所から、GitHub で保存・編集可能な場所に直接リンクするようにします。

GitHub インテグレーションをインストールするには、[インテグレーションタイル][7]に移動し、**Repo Configuration** タブにある **Link GitHub Account** をクリックします。

### サービス定義 YAML ファイル

Datadog は各リポジトリのルートにある `service.datadog.yaml` ファイルを読み取り権限でスキャンします。複数の YAML ドキュメントを作成することで、1 つの YAML ファイルに複数のサービスを登録することができます。各ドキュメントは 3 つのダッシュ (`---`) で区切ります。

### サービス定義の変更

サービス定義に GitHub インテグレーションを設定すると、サービスの **Definition** タブに **Edit in Github** ボタンが表示され、GitHub にリンクして変更をコミットすることができるようになります。

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="サービスカタログのサービスの Definition タブに Edit in Github ボタンが表示されるようになった" style="width:90%;" >}}

リポジトリの YAML ファイルを更新すると、その変更はサービスカタログに伝搬されます。

誤って上書きされることを防ぐため、サービス定義ファイルの作成と変更は、GitHub インテグレーションまたは [Service Definition API エンドポイント][1]のどちらかを使用してください。GitHub と API の両方を使用して同じサービスを更新すると、意図しない上書きが発生する可能性があります。

## Terraform でサービス定義の更新を自動化する

サービスカタログは、[Terraform リソース][14]としてサービス定義を提供します。自動化されたパイプラインによるサービスカタログのサービスの作成と管理には、[Datadog Provider][8] v3.16.0 以降が必要です。

詳細については、[Datadog Provider のドキュメント][9]を参照してください。

## オープンソースのメタデータプロバイダー

GitHub インテグレーションや Terraform の代わりに、オープンソースの GitHub Action ソリューションである [Datadog サービスカタログメタデータプロバイダー][12]を利用することができます。

この GitHub Action を使用すると、Datadog にこの情報を送信するタイミングを完全に制御しながら、GitHub Action を使用してサービスカタログにサービスを登録し、組織独自のその他のコンプライアンスチェックを実装することができます。


## Backstage からのデータのインポート

{{< img src="/tracing/service_catalog/service-catalog-backstage-import.png" alt="バックステージのメタデータ、リンク、定義をハイライトするサービスパネル" style="width:90%;" >}}

Backstage に登録されているデータやサービスをすでに使用している場合、これらのサービスを Datadog に直接インポートすることができます。

API や Terraform を使う場合は、リクエストの YAML を置き換えてください。

GitHub インテグレーションを使用する場合は、Backstage YAML を Datadog の読み取り権限を持つリポジトリに直接保存します。Datadog はリポジトリの root フォルダにある [`catalog-info.yaml`][15] という名前のファイルをスキャンします。

インポートの際は、以下の処理が行われます。
- Datadog は Backstage YAML 内の `kind:component` のみをサービスとして認識します。
- `name` は `DD-SERVICE` に変換されます
- `namespace` の値がカスタムタグとマッピングされます
- `lifecycle` は `lifecycle` にマッピングされます
- `owner` は `team` にマッピングされます
- `metadata.links` は `links` にマッピングされます
- `metadata.description` は `description` にマッピングされます
- その他の `specs` の値はカスタムタグにマッピングされます


## 他の Datadog テレメトリーデータで報告されているサービスを発見する

インフラストラクチャーメトリクスなどの既存の Datadog テレメトリーから他のサービスを検出するには、ページ上部の [**Setup &amp; Config** タブ][3]に移動して、**Import Entries** タブをクリックしてください。`DD_SERVICE` [タグ][5]を含む他の Datadog テレメトリーからサービスをインポートすることができます。

{{< img src="tracing/service_catalog/import_entries.png" alt="サービスカタログのセットアップと構成セクションのインポートエントリータブ" style="width:90%;" >}}

いくつかのエントリーをインポートすると、それらは **Explore** タブに表示されます。[API を使う][1]か [GitHub インテグレーション][6]で所有者や連絡先などのメタデータを追加しないと、エントリーが失効してしまうことがあります。

インポートしたサービスをデフォルトの **Explore** ビューから削除するには、**Clear Previously Imported Services** をクリックします。これにより、メタデータを持たないサービスや、APM、ユニバーサルサービスモニタリング (USM)、リアルユーザーモニタリング (RUM) のテレメトリーを持たないサービスがすべて削除されます。

{{< img src="tracing/service_catalog/clear_imported_services.png" alt="サービスカタログのセットアップと構成セクションで、以前にインポートしたサービスの削除を確認します" style="width:90%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/service_catalog/service_definition_api/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[10]: https://app.datadoghq.com/services
[11]: https://docs.datadoghq.com/ja/tracing/service_catalog/setup#store-and-edit-service-definitions-in-github
[12]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[13]: https://app.datadoghq.com/personal-settings/profile
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[15]: https://backstage.io/docs/features/software-catalog/descriptor-format/