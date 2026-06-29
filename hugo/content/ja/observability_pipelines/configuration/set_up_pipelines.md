---
aliases:
- /ja/observability_pipelines/set_up_pipelines/
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: ドキュメント
  text: 既存のパイプラインを更新する
- link: observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: ドキュメント
  text: Observability Pipelines 用の高度なワーカー構成
- link: observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
  tag: ドキュメント
  text: ホストで複数のパイプラインを実行
- link: observability_pipelines/monitoring_and_troubleshooting/troubleshooting/
  tag: ドキュメント
  text: Observability Pipelines のトラブルシューティング
title: パイプラインをセットアップ
---
## 概要 {#overview}

<div class="alert alert-info">このドキュメントで説明しているパイプラインとプロセッサーは、オンプレミスのログ環境に特化しています。クラウドベースのログを集約、処理、ルーティングするには、<a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Log Management Pipelines</a> を参照してください。</div>

Observability Pipelines では、パイプラインは 3 種類のコンポーネントから構成される順次の経路です。
- [ソース][1]: データソース (例えば、Datadog Agent) からデータを受信します。
- [プロセッサー][2]: データを強化し、変換します。
- [送信先][3]: 処理されたデータの送信先。

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="1 つのソースが 2 つのプロセッサグループと 2 つの宛先に接続されたパイプライン" style="width:100%;" >}}

次のいずれかの方法でパイプラインを作成できます。

- [パイプライン UI](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

UI で作成したパイプラインをプログラムでデプロイしたい場合は、[パイプライン構成を JSON または Terraform にエクスポート][14]を参照してください。

## UI でパイプラインを設定する {#set-up-a-pipeline-in-the-ui}

### パイプラインコンポーネントを設定する {#set-up-pipeline-components}

{{< tabs >}}
{{% tab "ログ" %}}

1. [Observability Pipelines][1] に移動します。
1. ユースケースに基づいて[テンプレート][2]を選択します。
1. [ソース][3]を選択してセットアップします。
1. ログデータを変換、マスク、強化するために[プロセッサー][4]を追加します。**注**: パイプラインキャンバスには、プロセッサグループが 25、プロセッサが合計 150 という制限があります。
    - プロセッサをコピーしたい場合は、そのプロセッサのコピーアイコンをクリックし、次に `command-v` を使用して貼り付けます。
1. 処理されたログの[送信先][5]を選択して設定します。

#### コンポーネントを追加または削除する {#add-or-remove-components}

##### 別のプロセッサグループを追加する {#add-another-processor-group}

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="同じ宛先にログを送信する 2 つのプロセッサグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

##### 別のプロセッサと宛先のセットを追加する {#add-another-set-of-processors-and-destinations}

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="2 つの異なる宛先にログを送信する 2 つのプロセッサグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

##### プロセッサグループに別の宛先を追加する {#add-another-destination-to-a-processor-group}

{{< img src="observability_pipelines/setup/another_destination.png" alt="1 つのプロセッサグループが 2 つの異なる宛先にログを送信していることを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/explore_templates/
[3]: /ja/observability_pipelines/sources/
[4]: /ja/observability_pipelines/processors/
[5]: /ja/observability_pipelines/destinations/
[11]: /ja/observability_pipelines/search_syntax/logs/

{{% /tab %}}
{{% tab "メトリクス" %}}

<div class="alert alert-info">
Metric Tag Governance は Preview です。アクセスをリクエストするには、<a href="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/">フォーム</a>に記入します。</div>

1. [Observability Pipelines][1] に移動します。
1. [Metric Tag Governance][2] テンプレートを選択します。
1. [Datadog Agent][3] ソースを設定します。
1. メトリクスをフィルタリングおよび変換するために[プロセッサー][4]を追加します。**注**: パイプラインキャンバスには、プロセッサグループが 25、プロセッサが合計 150 という制限があります。
    - プロセッサをコピーしたい場合は、そのプロセッサのコピーアイコンをクリックし、次に貼り付けます (`Cmd+V` は Mac、`Ctrl+V` は Windows/Linux)。
1. [Datadog Metrics][5] 宛先を設定します。

#### 別のプロセッサグループを追加する {#add-another-processor-group-1}

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="同じ宛先にログを送信する 2 つのプロセッサグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /ja/observability_pipelines/sources/datadog_agent/?tab=metrics
[4]: /ja/observability_pipelines/processors/
[5]: /ja/observability_pipelines/destinations/datadog_metrics/
[11]: /ja/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### ワーカーをインストールしてパイプラインをデプロイする {#install-the-worker-and-deploy-the-pipeline}

ソース、プロセッサ、および宛先を設定した後、**Next: Install** をクリックします。プラットフォームに Worker をインストールする方法については、[Worker のインストール][12]を参照してください。ブートストラップオプションについては、[高度な Worker 構成][5]を参照してください。

デプロイ後にパイプラインに変更を加えたい場合は、[既存のパイプラインの更新][11]を参照してください。

### パイプラインのすぐに使えるモニターを有効化する {#enable-out-of-the-box-monitors-for-your-pipeline}

1. [Pipelines][4] ページに移動し、パイプラインを見つけます。
1. パイプラインの **Monitors** 列で **Enable monitors** をクリックします。
1. **Start** をクリックして、提示されたユースケースの 1 つについてモニターをセットアップします。<br>
    - メトリックモニターは、選択したユースケースに基づいて構成されます。構成を更新して、さらにカスタマイズできます。詳細については、[メトリクスモニタードキュメント][13]を参照してください。

## API を使用してパイプラインをセットアップする {#set-up-a-pipeline-with-the-api}

1. Observability Pipelines API を使用して[パイプラインを作成][6]します。リクエストペイロードの例については、API reference を参照してください。

1. パイプラインを作成した後、[Worker をインストール][7]して、パイプラインを通じてデータを送信します。
    - Worker をインストールする際に必要なソース、プロセッサ、および宛先ごとの環境変数のリストについては、[環境変数][9]を参照してください。

既存のパイプラインに変更を加えるには、[パイプラインを更新][8]エンドポイントを使用します。

ブートストラップオプションについては、[高度な Worker 構成][5]を参照してください。

## Terraform を使用してパイプラインをセットアップする {#set-up-a-pipeline-with-terraform}

<div class="alert alert-warning"><a href="https://github.com/DataDog/terraform-provider-datadog/releases/tag/v3.84.0">Terraform 3.84.0</a> は、スタンドアロンプロセッサを <a href="/observability_pipelines/processors/#processor-groups">プロセッサグループ</a> に置き換える破壊的変更です。Terraform 3.84.0 にアップグレードしたい場合は、既存のリソースを移行する方法についての指示は <a href="https://github.com/DataDog/terraform-provider-datadog/pull/3346">PR の説明</a>を参照してください。</div>

1. Terraform を使用してパイプラインを作成するには、[datadog_observability_pipeline][10] モジュールを使用します。

1. パイプラインを作成した後、[Worker をインストール][7]して、パイプラインを通じてデータを送信します。
    - Worker をインストールする際に必要なソース、プロセッサ、および宛先ごとの環境変数のリストについては、[環境変数][9]を参照してください。

既存のパイプラインに変更を加えるには、[datadog_observability_pipeline][10] モジュールを使用します。

ブートストラップオプションについては、[高度な Worker 構成][5]を参照してください。

## パイプラインを複製する {#clone-a-pipeline}

UI でパイプラインを複製するには:

1. [Observability Pipelines][4] に移動します。
1. 複製するパイプラインを選択します。
1. ページの右上にある歯車アイコンをクリックし、**Clone** を選択します。

## パイプラインを削除する {#delete-a-pipeline}

UI でパイプラインを削除するには:

1. [Observability Pipelines][4] に移動します。
1. 削除するパイプラインを選択します。
1. ページの右上にある歯車アイコンをクリックし、**Delete** を選択します。

**注**: アクティブなパイプラインは削除できません。削除する前に、そのパイプラインのすべての Worker を停止する必要があります。

## パイプラインの要件と制限 {#pipeline-requirements-and-limits}

- パイプラインには少なくとも 1 つの宛先が必要です。プロセッサグループに宛先が 1 つしかない場合、その宛先は削除できません。
- ログパイプラインの場合。
  - ログパイプラインには合計 3 つの宛先を追加できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/sources/
[2]: /ja/observability_pipelines/processors/
[3]: /ja/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /ja/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /ja/observability_pipelines/configuration/install_the_worker/?tab=docker#api-or-terraform-pipeline-setup
[8]: /ja/api/latest/observability-pipelines/#update-a-pipeline
[9]: /ja/observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /ja/observability_pipelines/configuration/update_existing_pipelines/?
[12]: /ja/observability_pipelines/configuration/install_the_worker/
[13]: /ja/monitors/types/metric/
[14]: /ja/observability_pipelines/configuration/export_pipeline_configuration/