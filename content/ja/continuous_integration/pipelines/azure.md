---
aliases:
- /ja/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で Azure Pipelines を監視する
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: トラブルシューティング CI
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: Documentation
  text: カスタムタグとメトリクスを追加してパイプラインの可視性を拡張する
title: Azure パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 互換性

- **ランタイムのカスタムタグとメトリクス**: ランタイムの[カスタムタグ][6]とメトリクスを構成します

## Datadog インテグレーションの構成

[Azure Pipelines][1] の Datadog インテグレーションは、[サービスフック][2]を使って Datadog にデータを送信することで動作します。 

1. Azure Marketplace から [Datadog CI Visibility][8] の拡張機能をインストールします。

2. 各プロジェクトについて、Azure DevOps の **Project settings > Service hooks** に移動し、緑色のプラス (+) アイコンを選択し、サブスクリプションを作成します。

3. 以下の Webhook タイプごとに、`Datadog CI Visibility` サービスに対する新しいサブスクリプションを作成します。
    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**

4. **Next** をクリックして次のステップに進み、次のように設定します。
    - **Datadog Site**: {{< region-param key="dd_site" >}}
    - **Datadog API Key**: your [Datadog API key][3].

5. **Finish** をクリックします。

<div class="alert alert-info">
サポートされている 3 種類のイベントはすべて必須であり、個別に有効にする必要があります。
1 つ以上のイベントを有効にしないと、インストールが不完全になり、Datadog の予期せぬ動作につながります。
</div>


### 複数プロジェクトの一括構成


多くの、あるいはすべての Azure プロジェクトでフックを有効にしたい場合、Datadog は Azure API を通してそれを行うための[スクリプト](https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py)を提供します。

スクリプトを実行するには、以下が必要です。

- Azure DevOps のユーザー名
- Azure DevOps [API Token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat)
- Azure DevOps の組織名

このスクリプトに必要なのは、python3 とリクエストパッケージだけです。詳しくは、以下を実行してください。
```shell
./service_hooks.py --help
```

このスクリプトは環境変数 `DD_API_KEY` と `DD_SITE`、フラグパラメーター `--dd-api-key` と `--dd-site` をサポートします。

すべてのプロジェクトでフックを有効にする場合の例:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

指定したプロジェクトでフックを有効にする場合の例:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```

## Datadog でパイプラインデータを視覚化する

ワークフローが終了した後、[Pipelines][4] ページと [Pipeline Executions][5] ページにデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ja/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility