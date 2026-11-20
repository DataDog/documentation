---
aliases:
- /ja/observability_pipelines/set_up_pipelines/
description: Observability Pipelines パイプラインのソース、プロセッサー、および送信先を設定する方法を学びます。
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/pipeline_simulation/
  tag: ドキュメント
  text: Pipeline Simulation を使用して、プロセッサーを追加、更新、検証する
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: ドキュメント
  text: 既存のパイプラインを更新する
- link: observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: ドキュメント
  text: Observability Pipelines の高度なワーカー構成
- link: observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
  tag: ドキュメント
  text: ホストで複数のパイプラインを実行する
- link: observability_pipelines/monitoring_and_troubleshooting/troubleshooting/
  tag: ドキュメント
  text: Observability Pipelines のトラブルシューティング
title: パイプラインをセットアップする
---
## 概要 {#overview}

<div class="alert alert-info">このドキュメントで説明しているパイプラインとプロセッサーは、オンプレミスのログ環境に特化しています。クラウドベースのログを集約、処理、ルーティングするには、<a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Log Management Pipelines</a> を参照してください。</div>

Observability Pipelines では、パイプラインは 3 種類のコンポーネントから構成される順次の経路です。
- [ソース][1]: データソース (例: Datadog Agent) からデータを受信します。
- [プロセッサー][2]: データを強化し、変換します。
- [送信先][3]: 処理されたデータの送信先。

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="1 つのソースが 2 つのプロセッサーグループと 2 つの送信先に接続されたパイプライン" style="width:100%;" >}}

次のいずれかの方法でパイプラインを作成できます。

- [パイプライン UI](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

UI で作成したパイプラインをプログラムでデプロイしたい場合は、[パイプライン構成を JSON または Terraform にエクスポートする][14]を参照してください。

## UI でパイプラインをセットアップする {#set-up-a-pipeline-in-the-ui}

### パイプラインコンポーネントをセットアップする {#set-up-pipeline-components}

{{< tabs >}}
{{% tab "ログ" %}}

1. [Observability Pipelines][1] に移動します。
1. ユースケースに基づいて[テンプレート][2]を選択するか、{{< ui >}}New Pipeline{{< /ui >}} をクリックして {{< ui >}}Logs Pipeline{{< /ui >}} を選択します。
1. [ログソース][3]を選択してセットアップします。
1. 処理されたログの[送信先][5]を選択してセットアップします。
1. プロセッサーグループで {{< ui >}}Edit{{< /ui >}} をクリックし、[Pipeline Simulation][6] を使用して、[プロセッサー][4]を追加、更新、検証します。
    - **注**:
      - パイプラインキャンバスには、プロセッサーグループが 25、プロセッサーが合計 150 という制限があります。
      - プロセッサーをコピーしたい場合は、そのプロセッサーのコピーアイコンをクリックし、次に `command-v` を使用して貼り付けます。

#### 別のプロセッサーグループを追加する {#add-another-processor-group}

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="同じ送信先にログを送信する 2 つのプロセッサーグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### 別のプロセッサーと送信先のセットを追加する {#add-another-set-of-processors-and-destinations}

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="2 つの異なる送信先にログを送信する 2 つのプロセッサーグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### プロセッサーグループに別の送信先を追加する {#add-another-destination-to-a-processor-group}

{{< img src="observability_pipelines/setup/another_destination.png" alt="2 つの異なる送信先にログを送信する 1 つのプロセッサーグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/explore_templates/
[3]: /ja/observability_pipelines/sources/?tab=logs#sources
[4]: /ja/observability_pipelines/processors/
[5]: /ja/observability_pipelines/destinations/?tab=logs#destinations
[6]: /ja/observability_pipelines/configuration/pipeline_simulation/
[11]: /ja/observability_pipelines/search_syntax/logs/

{{% /tab %}}
{{% tab "メトリクス" %}}

1. [Observability Pipelines][1] に移動します。
1. [メトリクスタグガバナンス][2]テンプレートを選択するか、{{< ui >}}New Pipeline{{< /ui >}} をクリックして {{< ui >}}Metrics Pipeline{{< /ui >}} を選択します。
1. [メトリクスソース][3]を選択してセットアップします。
1. 処理されたメトリクスの[送信先][5]を選択してセットアップします。
1. プロセッサーグループで {{< ui >}}Edit{{< /ui >}} をクリックし、[Pipeline Simulation][6] を使用して、[プロセッサー][4]を追加、更新、検証します。
    - **注**:
      - パイプラインキャンバスには、プロセッサーグループが 25、プロセッサーが合計 150 という制限があります。
      - プロセッサーをコピーしたい場合は、そのプロセッサーのコピーアイコンをクリックし、次に貼り付けます (`Cmd+V` は Mac、`Ctrl+V` は Windows/Linux)。

#### 別のプロセッサーグループを追加する {#add-another-processor-group-1}

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="同じ送信先にメトリクスを送信する 2 つのプロセッサーグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### 別のプロセッサーと送信先のセットを追加する {#add-another-set-of-processors-and-destinations-1}

{{< img src="observability_pipelines/setup/another_set_processor_destination_metrics.png" alt="2 つの異なる送信先にメトリクスを送信する 2 つのプロセッサーグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### プロセッサーグループに別の送信先を追加する {#add-another-destination-to-a-processor-group-1}

{{< img src="observability_pipelines/setup/another_destination_metrics.png" alt="2 つの異なる送信先にメトリクスを送信する 1 つのプロセッサーグループを示す Pipelines ページ" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /ja/observability_pipelines/sources/?tab=metrics#sources
[4]: /ja/observability_pipelines/processors/?tab=metrics#processors
[5]: /ja/observability_pipelines/destinations/?tab=metrics#destinations
[6]: /ja/observability_pipelines/configuration/pipeline_simulation/
[11]: /ja/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### ワーカーをインストールしてパイプラインをデプロイする {#install-the-worker-and-deploy-the-pipeline}

ソース、プロセッサー、およびリンク先を設定した後、{{< ui >}}Next: Install{{< /ui >}} をクリックします。プラットフォームにワーカーをインストールする方法については、[ワーカーをインストールする][12]を参照してください。ブートストラップオプションについては、[高度なワーカー構成][5]を参照してください。

デプロイ後にパイプラインに変更を加えたい場合は、[既存のパイプラインを更新する][11]を参照してください。

### パイプラインのすぐに使えるモニターを有効化する {#enable-out-of-the-box-monitors-for-your-pipeline}

1. [Pipelines][4] ページに移動し、パイプラインを見つけます。
1. パイプラインの {{< ui >}}Monitors{{< /ui >}} 列にある {{< ui >}}Enable monitors{{< /ui >}} をクリックします。
1. {{< ui >}}Start{{< /ui >}} をクリックして、提示されたユースケースの 1 つについてモニターをセットアップします。<br>
    - メトリクスモニターは、選択されたユースケースに基づいて構成されます。構成を更新して、さらにカスタマイズできます。詳細については、[メトリクスモニタードキュメント][13]を参照してください。

## API を使用してパイプラインをセットアップする {#set-up-a-pipeline-with-the-api}

1. Observability Pipelines API を使用して[パイプラインを作成][6]します。リクエストペイロードの例については、API リファレンスを参照してください。

1. パイプラインを作成した後、[ワーカーをインストール][7]して、パイプライン経由でデータを送信します。
    - ワーカーをインストールする際に必要なソース、プロセッサー、および送信先ごとの環境変数のリストについては、[環境変数][9]を参照してください。

既存のパイプラインに変更を加えるには、[パイプラインを更新する][8]エンドポイントを使用します。

ブートストラップオプションについては、[高度なワーカー構成][5]を参照してください。

## Terraform を使用してパイプラインをセットアップする {#set-up-a-pipeline-with-terraform}

<div class="alert alert-warning"><a href="https://github.com/DataDog/terraform-provider-datadog/releases/tag/v3.84.0">Terraform 3.84.0</a> は、スタンドアロンプロセッサーを<a href="/observability_pipelines/processors/#processor-groups">プロセッサーグループ</a>に置き換える破壊的変更です。Terraform 3.84.0 にアップグレードしたい場合、既存のリソースを移行する方法についての指示は <a href="https://github.com/DataDog/terraform-provider-datadog/pull/3346">PR の説明</a>を参照してください。</div>

1. Terraform を使用してパイプラインを作成するには、[datadog_observability_pipeline][10] モジュールを使用することができます。

1. パイプラインを作成した後、[ワーカーをインストール][16]して、パイプライン経由でデータを送信します。
    - ワーカーをインストールする際に必要なソース、プロセッサー、および送信先ごとの環境変数のリストについては、[環境変数][9]を参照してください。

既存のパイプラインに変更を加えるには、[datadog_observability_pipeline][10] モジュールを使用します。

ブートストラップオプションについては、[高度なワーカー構成][5]を参照してください。

## パイプラインを複製する {#clone-a-pipeline}

UI でパイプラインを複製するには、以下を実行します。

1. [Observability Pipelines][4] に移動します。
1. 複製するパイプラインを選択します。
1. ページの右上にある歯車アイコンをクリックし、{{< ui >}}Clone{{< /ui >}} を選択します。

## パイプラインを削除する {#delete-a-pipeline}

UI でパイプラインを削除するには、以下を実行します。

1. [Observability Pipelines][4] に移動します。
1. 削除するパイプラインを選択します。
1. ページの右上にある歯車アイコンをクリックし、{{< ui >}}Delete{{< /ui >}} を選択します。

**注**: アクティブなパイプラインは削除できません。削除する前に、そのパイプラインのすべてのワーカーを停止する必要があります。

## パイプラインの要件と制限 {#pipeline-requirements-and-limits}

- パイプラインには少なくとも 1 つの送信先が必要です。プロセッサーグループに送信先が 1 つしかない場合、その送信先は削除できません。
- ログパイプラインの場合:
  - ログパイプラインには合計 20 個の送信先を追加できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/sources/
[2]: /ja/observability_pipelines/processors/
[3]: /ja/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /ja/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /ja/observability_pipelines/configuration/install_the_worker/?interface=api&platform=docker&secrets_source=secrets_management
[8]: /ja/api/latest/observability-pipelines/#update-a-pipeline
[9]: /ja/observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /ja/observability_pipelines/configuration/update_existing_pipelines/?
[12]: /ja/observability_pipelines/configuration/install_the_worker/
[13]: /ja/monitors/types/metric/
[14]: /ja/observability_pipelines/configuration/export_pipeline_configuration/
[16]: /ja/observability_pipelines/configuration/install_the_worker/?interface=terraform&platform=docker&secrets_source=secrets_management