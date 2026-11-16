---
aliases:
- /ja/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で Azure Pipelines を監視する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: ドキュメント
  text: カスタムタグと測定値を追加して Pipeline Visibility を拡張する
title: CI Visibility 向けの Azure Pipelines セットアップ
---
<div class="alert alert-danger">
Azure DevOps Server は公式にはサポートされていません。
</div>

## 概要{#overview}

[Azure Pipelines][1] は、あらゆる言語、プラットフォーム、クラウドに対応している継続的インテグレーションおよびデリバリーサービスです。

Azure Pipelines 用に CI Visibility をセットアップして、CI/CD ワークフローに関するリアルタイムのインサイトを取得し、パイプラインのパフォーマンスを追跡し、非効率性を分析し、デプロイ操作を管理します。

### 互換性 {#compatibility}

| Pipeline Visibility                             | プラットフォーム                            | 定義                                                |
|-------------------------------------------------|-------------------------------------|-----------------------------------------------------------|
| [ログ分析][21] | ログ分析 | 関連するログに対して LLM モデルを使用して、失敗した CI ジョブの根本原因を分析します。|
| ログの相関付け                                | ログの相関付け                    | パイプラインとジョブのスパンをログに関連付けます。[ログストレージ](#logs-storage)が必要です。|
| [実行時のカスタムタグ][10][およびメジャー][11] | 実行時のカスタムタグおよびメジャー | 実行時の[カスタムタグおよびメジャー][6]を構成します。      |
| [カスタムスパン][15]                              | カスタムスパン                        | パイプラインのカスタムスパンを構成します。               |
| [クリティカルパスでの CI ジョブのフィルタリング][19] | クリティカルパスでの CI ジョブのフィルタリング | クリティカルパスでジョブでフィルタリングします。                     |
| [実行時間][20]                            | 実行時間                      | パイプラインによるジョブ実行時間を表示します。|

### 用語 {#terminology}

次の表に、Datadog CI Visibility と Azure Pipelines の概念の対応を示します。

| Datadog                    | Azure Pipelines |
|----------------------------|-----------------|
| パイプライン                   | パイプライン        |
| ステージ                      | ステージ           |
| ジョブ                        | ジョブ             |
| _Datadog では利用不可_ | ステップ            |

## Datadog インテグレーションの構成 {#configure-the-datadog-integration}
{{< tabs >}} {{% tab "Datadog インテグレーション (推奨)" %}}

### Datadog で CI Visibility を有効にする {#enable-ci-visibility-in-datadog}

Azure アプリを作成してインストールしたら、Datadog で監視する組織とプロジェクトで CI Visibility を有効にします。

1. Azure DevOps 組織が **Microsoft Entra テナント**にリンクされていることを確認します。Azure DevOps プロジェクトを Datadog に接続する方法については、[Azure ソースコードセットアップ手順][1]を参照してください。

2. Datadog で、[**[Software Delivery] → [CI Visibility] → [Add a Pipeline Provider] (パイプラインプロバイダーの追加) → [Azure Pipelines]**][2] に移動します。

3. 有効にする Azure DevOps 組織の横にある [{{< ui >}}Configure{{< /ui >}}] (構成) をクリックします。

4. 組織全体で CI Visibility を有効にするには、[{{< ui >}}Enable CI Visibility{{< /ui >}}] (CI Visibility の有効化) をオンにします。それ以降に Azure アプリによって検出されるプロジェクトは、自動的に有効になります。

5. 個別のプロジェクトで CI Visibility を有効にするには、次のようにします。
   - プロジェクトリストをスクロールします。
   - 監視するプロジェクトごとに [{{< ui >}}Enable CI Visibility{{< /ui >}}] をオンにします。

組織またはプロジェクトで CI Visibility が有効になるとすぐに、Datadog にパイプラインが表示されます。

<div class="alert alert-danger">すでにサービスフックサブスクリプションを使用して Azure Pipelines を構成している場合は、同じプロジェクトで CI Visibility を有効にする前に、そのインテグレーションを無効にしてください。両方のインテグレーションを同時に実行しても追加コストは発生しませんが、データが重複して作成されます。</div>

[1]: /ja/integrations/azure-devops-source-code/#setup
[2]: https://app.datadoghq.com/ci/setup/pipeline?provider=azurepipelines

{{% /tab %}}
{{% tab "サービスフックサブスクリプション" %}}

Datadog の [Azure Pipelines][16] インテグレーションは、[サービスフック][2]を使用してデータを Datadog に送信します。

1. Azure Marketplace から [Datadog CI Visibility][8] 拡張機能をインストールします。**Datadog** で始まる拡張機能がいくつかあります。[Datadog CI Visibility][8] 拡張機能をインストールしていることを確認してください。

2. プロジェクトごとに、Azure DevOps の [{{< ui >}}Project settings{{< /ui >}}] (プロジェクト設定) > [{{< ui >}}Service hooks{{< /ui >}}] (サービスフック) に移動し、緑色のプラス (+) アイコンを選択して、サブスクリプションを作成します。

3. 以下の各 Webhook タイプについて、`Datadog CI Visibility` サービスのサブスクリプションを作成します。これらのイベントタイプは必須であり、個別に有効にする必要があります。

    - [{{< ui >}}Run state changed{{< /ui >}}] (実行状態変更)
    - [{{< ui >}}Run stage state changed{{< /ui >}}] (実行ステージ状態変更)
    - [{{< ui >}}Run job state changed{{< /ui >}}] (実行ジョブ状態変更)
    - [{{< ui >}}Run stage approval completed{{< /ui >}}] (実行ステージ承認完了)
    - [{{< ui >}}Run stage waiting for approval{{< /ui >}}] (実行状態承認待機中)
    - [{{< ui >}}Build completed{{< /ui >}}] (ビルド完了)

4. [{{< ui >}}Next{{< /ui >}}] (次へ) をクリックして次のステップに進み、以下のように設定します。

    - [{{< ui >}}Datadog Site{{< /ui >}}] (Datadog サイト): `{{< region-param key="dd_site" >}}`
    - [{{< ui >}}Datadog API Key{{< /ui >}}] (Datadog API キー): ご使用の [Datadog API キー][3]。

5. [{{< ui >}}Finish{{< /ui >}}] (終了) をクリックします。

### 複数プロジェクトの一括構成 {#configuring-multiple-projects-in-bulk}

Datadog は、Azure API を使用して複数またはすべての Azure プロジェクトでサービスフックを有効にするために役立つ[スクリプト][12]を提供しています。このスクリプトには Python 3 と `requests` パッケージが必要です。

スクリプトを実行するには、以下が必要です。

- Azure DevOps のユーザー名
- Azure DevOps の [API トークン][13]
- Azure DevOps の組織名


このスクリプトでは、環境変数 `DD_API_KEY` および `DD_SITE` とフラグパラメーター `--dd-api-key` および `--dd-site` を使用できます。

詳細については、次のコマンドを実行してください。

```shell
./service_hooks.py --help
```

#### すべての Azure プロジェクト {#all-azure-projects}

すべてのプロジェクトでフックを有効にする場合の例:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

#### 特定の Azure プロジェクト {#specific-azure-projects}

指定したプロジェクトでフックを有効にする場合の例:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[16]: /ja/integrations/azure_devops/

{{% /tab %}}
{{< /tabs >}}


## 高度な構成 {#advanced-configuration}

### カスタムタグの設定 {#set-custom-tags}

Azure プロジェクトのすべてのパイプラインスパンとジョブスパンにカスタムタグを設定して、トレーサビリティを向上させることができます。詳細については、「[カスタムタグとメトリクス][6]」を参照してください。

### ジョブログを管理する {#manage-job-logs}

#### ログ分析 {#logs-analysis}

ログ分析は、LLM モデルを使用して、Azure Pipelines から取得する関連ログに基づき、ジョブの失敗を根本原因別に分類します。

詳細については、[ログ分析の使用][21]に関するガイドを参照してください。

ログ分析は、Datadog でデフォルトで有効になっています。Azure Pipelines ジョブのログを分析用に受信するには、[[Azure integration] (Azure インテグレーション) タイル][14]の手順に従って Datadog Azure DevOps インテグレーションをセットアップします。ログ分析の設定を管理するには、[CI/CD リポジトリの設定][23]に移動し、Datadog 組織レベルでまたは目的のリポジトリに対してログ分析を設定します。

ログ分析を PR コメントに追加することもできます。[PR コメントの使用][22]に関するガイドを参照してください。

#### ログストレージ {#logs-storage}

ログストレージを有効にするには、[CI/CD リポジトリの設定][23]に移動し、Datadog 組織レベルでまたは目的のリポジトリに対してログストレージを有効にします。

ログストレージは、CI Visibility とは別に課金されます。ログの保持、除外、インデックスは [Log Management][18] で構成されます。Azure ジョブのログは、`datadog.product:cipipeline` タグと `source:azurepipelines` タグで確認できます。

## Datadog でパイプラインデータを視覚化する{#visualize-pipeline-data-in-datadog}

[[**CI Pipeline List**] (CI パイプラインリスト)][4] ページおよび [[**Executions**] (実行)][5] ページには、ワークフローの完了後にデータが取り込まれます。

[{{< ui >}}CI Pipeline List{{< /ui >}}] ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳細については、「[CI パイプラインの検索と管理][17]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /ja/glossary/#custom-tag
[11]: /ja/glossary/#custom-measure
[14]: https://app.datadoghq.com/integrations/azure
[15]: /ja/glossary/#custom-span
[17]: /ja/continuous_integration/search/#search-for-pipelines
[18]: /ja/logs/guide/best-practices-for-log-management/
[19]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /ja/glossary/#pipeline-execution-time
[21]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[23]: https://app.datadoghq.com/ci/settings/ci-cd/repositories