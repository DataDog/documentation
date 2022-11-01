---
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Terraform
  text: Terraform によるサービス定義の作成と管理
- link: /tracing/service_catalog/service_definition_api/
  tag: ドキュメント
  text: サービス定義 API
- link: /integrations/github_apps
  tag: ドキュメント
  text: GitHub アプリのインテグレーション
kind: documentation
title: サービスカタログの設定
---

## 概要

サービスカタログには、サービスの一覧が表示されます。**Ownership** タブの **Registered** 列は、該当するサービスが登録されていることを緑色のチェックマークで表しています。

サービス定義の更新は、[Service Definition API][1] または [Terraform][2] を使用します。

## すでに APM データを送信しているサービスの場合

Datadog APM にトレースデータを送信するサービスは、自動的にサービスカタログに登録されます。登録するまでは、カーソルを合わせるとグレーのチェックマークが表示されます。

サービスを登録し、所有者情報、ランブックなどの関連リンク、ソースコードリポジトリへのリンクを追加するには、[サービス定義の更新][1]を行ってください。

[Service Catalog > Get Started][3] から、API で投稿するための有効な JSON を作成するためのヘルプを得ることができます。

## カタログにポストしたい他のすべてのサービスの場合

関心があるサービス、API、カスタムライブラリがカタログページに掲載されていない場合

1. [Get Started][3] に移動します。

2. **Register Services** フォームでは、Service Catalog API のエンドポイントにポストできる JSON を生成することができます。`dd-service` フィールドにサービス名を入力します。所有権、ソース、その他のサービス情報を、Service Definition スキーマに入力します。詳細については、[GitHub の JSON スキーマの全容][4]を参照してください。

3. 生成された JSON をコピーするために、**Copy** ボタンをクリックします。これを [Service Definition API][1] を使って `POST` API 呼び出しの `body` として送信します。


## 他の Datadog テレメトリーデータで報告されているサービスを発見する

<div class="alert alert-warning">これはベータ版の機能です。</div>

インフラストラクチャーメトリクスなど、既存の Datadog テレメトリーを通じて他のサービスを検出するには、**Discover Services** タブに移動し、そこにある指示に従ってください。ディスカバリーは、`DD_SERVICE` [統合サービスタグ付け規則][5]を使用して、Datadog の組織にデータを送信するサービスを探します。

## サービス定義の GitHub への保存と編集

[GitHub Apps インテグレーション][6]を構成し、Service Catalog でサービスの定義を表示する場所から、GitHub で保存・編集可能な場所に直接リンクするようにします。

GitHub Apps インテグレーションをインストールするには、[インテグレーションタイル][7]に移動し、**Repo Configuration** タブにある **Link GitHub Account** をクリックします。

### サービス定義 YAML ファイル

Datadog は各リポジトリのルートにある `service.datadog.yaml` ファイルを読み取り権限でスキャンします。複数の YAML ドキュメントを作成することで、1 つの YAML ファイルに複数のサービスを登録することができます。各ドキュメントは 3 つのダッシュ (`---`) で区切ります。

### サービス定義の変更

サービス定義に GitHub Apps インテグレーションを設定すると、サービスの **Definition** タブに **Edit in Github** ボタンが表示され、GitHub にリンクして変更をコミットすることができるようになります。

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="Service Catalog のサービスの Definition タブに Edit in Github ボタンが表示されるようになった" style="width:90%;" >}}

リポジトリの YAML ファイルを更新すると、その変更はサービスカタログに伝搬されます。

誤って上書きされることを防ぐため、サービス定義ファイルの作成と変更は、GitHub Apps インテグレーションまたは [Service Definition API エンドポイント][1]のどちらかを使用してください。GitHub と API の両方を使用して同じサービスを更新すると、意図しない上書きが発生する可能性があります。

## Terraform でサービス定義の更新を自動化する

サービスカタログは、Terraform リソースとしてサービス定義を提供します。自動化されたパイプラインによるサービスカタログのサービスの作成と管理には、[Datadog Provider][8] v3.16.0 以降が必要です。

詳細については、[Datadog Provider のドキュメント][9]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/service_catalog/service_definition_api/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[3]: https://app.datadoghq.com/services/setup
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/integrations/github_apps/
[7]: https://app.datadoghq.com/integrations/github-apps
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs