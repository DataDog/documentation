---
aliases:
- /ja/observability_pipelines/configuration/export_pipeline_configuration/
description: ドラフト段階またはデプロイ済みのパイプラインの構成を JSON または Terraform にエクスポートする方法、そして JSON 構成を
  Observability Pipelines UI にインポートする方法について説明します。
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: ドキュメント
  text: 既存のパイプラインを更新する
- link: https://docs.datadoghq.com/api/latest/observability-pipelines/
  tag: ドキュメント
  text: Observability Pipelines API
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
  tag: ドキュメント
  text: Observability Pipelines Terraform リソース
title: パイプライン構成のエクスポートとインポート
---
## 概要{#overview}

Terraform や API を使用してパイプラインをセットアップおよび更新する作業は時間のかかる手作業であり、構文エラーのもとになることも少なくありません。UI でパイプラインを作成したり既存のパイプラインを更新したりしてその構成を JSON または Terraform にエクスポートすれば、プログラムでパイプラインを作成したり更新したりできます。さらに、パイプラインの JSON 構成を UI にインポートすることもできます。


## ドラフトモードのパイプライン構成のエクスポート {#export-the-configuration-of-a-pipeline-in-draft-mode}

まだデプロイされていないパイプラインを構築する際に、UI でパイプラインをセットアップし、そのパイプライン構成を JSON または Terraform にエクスポートすれば、プログラムによりそれを作成することができます。

1. [Observability Pipelines][1] に移動します。
1. [パイプラインをセットアップ][2]し、ソース、プロセッサー、および送信先を追加します。
1. パイプラインの構成が完了したら、{{< ui >}}Export Pipeline{{< /ui >}}をクリックします。
   {{< img src="observability_pipelines/export_pipeline/export_draft_pipeline.png" alt="パイプライン UI で強調表示されるエクスポートボタン" style="width:100%;" >}}
1. 構成を JSON または Terraform としてエクスポートするには、コピーまたはダウンロードのボタンをクリックします。
   {{< img src="observability_pipelines/export_pipeline/export_json_modal.png" alt="JSON 形式でパイプライン設定を表示するエクスポートモーダル" style="width:100%;" >}}
1. [API][3] または [Terraform][4] を使ってパイプライン設定をデプロイします。
1. パイプライン経由でデータの送信と処理を開始するため、[Worker をインストール][7]します。

## デプロイ済みパイプラインの設定のエクスポート {#export-the-configuration-of-a-deployed-pipeline}

デプロイ済みのパイプラインには、パイプライン経由でデータを送信するための Worker がインストールされています。アクティブ状態の場合と非アクティブ状態の場合があります。

### パイプラインの設定のエクスポート {#export-a-pipelines-configuration}

デプロイ済みのパイプラインを UI で表示すれば、その設定を JSON または Terraform にエクスポートして、プログラムでそれを作成することができます。

1. [Observability Pipelines][1] に移動します。
1. デプロイ済みのパイプライン (ステータスは`active`または`inactive`) を選択し、構成を表示します。
1. {{< ui >}}Export Pipeline{{< /ui >}}をクリックします。
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline.png" alt="デプロイ済みパイプラインのページのエクスポートボタン" style="width:100%;" >}}
1. 構成を JSON または Terraform としてエクスポートするには、コピーまたはダウンロードのボタンをクリックします。
1. 追加の変更を加えるには JSON または Terraform の構成を更新し、プログラムで構成をデプロイします。
   - [API ドキュメント][5]
   - [Terraform ドキュメント][4]

### パイプライン編集後にパイプライン構成をエクスポートする {#export-a-pipelines-configuration-after-making-edits-to-the-pipeline}

デプロイ済みのパイプラインを編集すれば、[Packs][6] などの新しいコンポーネントを追加したり、UI でボリューム制御ルールを更新したりした後、構成を JSON または Terraform にエクスポートし、プログラムで変更をデプロイできます。

1. [Observability Pipelines][1] に移動します。
1. デプロイ済みのパイプライン (ステータスは `active` または `inactive`) を選択し、構成を表示します。
1. ソース、送信先、またはプロセッサーに変更を加えます。
1. パイプラインを終了する前に、{{< ui >}}Export Pipeline{{< /ui >}} をクリックします。
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline_edit.png" alt="パイプライン編集ページで強調表示されているエクスポートボタン" style="width:100%;" >}}
1. 構成を JSON または Terraform としてエクスポートするには、コピーまたはダウンロードのボタンをクリックします。
   - **注**: UI でパイプラインに更新を加えた後、変更内容の保存もデプロイもしていない状態でも、エクスポートされた構成には最新の変更内容が含まれています。
   {{< img src="observability_pipelines/export_pipeline/export_terraform_modal.png" alt="Terraform でのパイプライン構成を示すエクスポートモーダル" style="width:100%;" >}}
1. UI で行った変更を保存せずにパイプラインを終了するには、ページ左上にある Observability Pipelines のロゴをクリックします。
   {{< img src="observability_pipelines/export_pipeline/exit_export_deployed_pipeline.png" alt="パイプラインページで強調表示されている Observability Pipelines ロゴ" style="width:100%;" >}}
1. コピーまたはダウンロードした構成を使用して、プログラムによりパイプラインを更新します。
   - [API ドキュメント][5]
   - [Terraform ドキュメント][4]

## パイプラインの JSON 構成を UI にインポートする {#import-a-pipelines-json-configuration-to-the-ui}

パイプラインの構築を支援し、Datadog の複数の組織の間でパイプライン設定を転送するため、パイプラインの JSON を UI にインポートすることができます。

1. [Observability Pipelines][1] に移動します。
1. ドラフトパイプラインを選択して、構成を表示します。
1. 設定をクリックし、{{< ui >}}Import Pipeline{{< /ui >}}を選択します。
   {{< img src="observability_pipelines/export_pipeline/import_access.png" alt="設定メニューに表示される [パイプラインのインポート] (Import Pipeline)" style="width:100%;" >}}
1. JSON ファイルとして、コンピューター上のパイプライン構成を選択します。
   {{< img src="observability_pipelines/export_pipeline/import_select.png" alt="JSON ファイルを選択するオプションが表示されているインポートモーダル" style="width:100%;" >}}
1. {{< ui >}}Import{{< /ui >}}をクリックします。これにより、現在のパイプライン構成が、インポートされた JSON のパイプライン構成に置き換わります。
1. [Observability Pipelines Worker をインストールし、UI を使用してパイプラインをデプロイします][8]。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-in-the-ui
[3]: https://docs.datadoghq.com/ja/api/latest/observability-pipelines/#create-a-new-pipeline
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://docs.datadoghq.com/ja/api/latest/observability-pipelines/#update-a-pipeline
[6]: /ja/observability_pipelines/packs/
[7]: /ja/observability_pipelines/configuration/install_the_worker/#api-or-terraform-pipeline-setup
[8]: https://docs.datadoghq.com/ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management