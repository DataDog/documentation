---
description: Datadog CD Visibility で CI Providers のデプロイメントを監視する方法をご紹介します。
further_reading:
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: デプロイメントをクエリして視覚化する方法
is_beta: true
title: CI Providers デプロイメントの監視
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility はプレビュー版です。アクセスは、すでに登録されている組織に限定されています。
{{< /callout >}}

## 概要 {#overview}

[デプロイメント][10] は、継続的インテグレーション (CI) のパイプラインで実行できます。通常、これらのパイプラインには、ソースコードのテストとイメージのビルドの後に実行されるデプロイメントステップがあります。

CI プロバイダーを使用してデプロイメントを実行している場合は、Deployment Visibility でデプロイメントを監視できます。以下の要件が満たされていることを確認してください。

1. [Pipeline Visibility][1] を使用して CI パイプラインを監視していること。
2. CI プロバイダーが**実行時のカスタムタグと測定値**機能をサポートしていること。この機能を使うと、Pipeline Visibility のパイプラインとジョブに [ユーザー定義のテキストタグと数値タグ][2] を追加できます。
3. CI ジョブ (または CI プロバイダーの [関連レベル][9]) でデプロイメントを実行していること。CI ジョブの概念は、プロバイダーによって異なる場合があります。Datadog における CI ジョブの定義の詳細については、[用語セクション][9] を参照してください。

## セットアップ {#setup}

<div class="alert alert-info">
セットアップには <a href="https://www.npmjs.com/package/@datadog/datadog-ci"> が必要です<code>datadog-ci</code> CLI </a> バージョン `2.26.0` 以降。
</div>

CD Visibility をセットアップするには、デプロイメントを実行している CI ジョブ内で `datadog-ci deployment mark` コマンドを使用します。

2 つの環境変数が必要です。

1. `DD_API_KEY`: [Datadog API キー][4] をポイントします。
2. `DD_BETA_COMMANDS_ENABLED`: 1 に設定します。

オプションとして、`DD_SITE` 環境変数を特定の [Datadog サイト][3] に設定できます。ご利用のサイトは {{< region-param key="dd_site" code="true" >}}です。

以下のパラメーターを使用して、`datadog-ci deployment mark` コマンドによって生成されるデプロイメントイベントを拡張することができます。

| パラメーター       | 説明                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `--env`         | このデプロイメントが実行される環境。たとえば、`prod` です。                                                            |
| `--service`     | デプロイされるサービスの名前。たとえば、`transaction-service` です。このオプションには `datadog-ci` バージョン `2.31.1` 以降が必要です|
| `--revision`    | デプロイされるリビジョンまたはバージョン。たとえば、`1.0.0` や `v123-456` などです。                                                    |
| `--is-rollback` | デプロイメントがロールバックであることを指定します。                                                                                           |
| `--tags`        | `key:value` 形式のキーと値のペアの配列。これらのタグは、Datadog に表示されるデプロイメントイベントに追加されます。                  |

`--no-fail` (デフォルト: `false`) を使用すると、データの送信に問題があった場合にデプロイメントコマンドが失敗しないようにすることができます。

GitHub Actions を CI プロバイダーとして使用している場合は、追加の考慮事項について [以下のセクション][11] を参照してください。

CI ジョブにコマンドを追加すると、パイプラインの実行後に [**Deployments** ページ][5] と [Deployment Executions ページ][6] にデータが表示されます。
詳細については、[CD Visibility のデプロイメントを調査する][8] を参照してください。

### 例 {#examples}

この一連のコマンドは、CI ジョブが `prod` 環境へのバージョン `1.0.0` のデプロイメントを実行することを指定します。

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --revision 1.0.0
```

この一連のコマンドは、CI ジョブが `prod` 環境へのロールバックデプロイメントを実行することを指定します。

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --is-rollback
```

この一連のコマンドは、CI ジョブが `prod` 環境へのデプロイメントを実行し、デプロイメントイベントに `team:backend` および `reason:scheduled` タグを追加することを指定します。

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --tags team:backend --tags reason:scheduled
```

## GitHub Actions ジョブをデプロイメントとしてマークする {#mark-github-actions-jobs-as-deployments}


`datadog-ci` バージョン `4.1.1` 以降では、カスタム名やマトリックス戦略を使用する場合でも、追加のアクションは必要ありません。

{{% collapse-content title="datadog-ci バージョン 4.1.1 より前の場合" level="h3" expanded=false %}}

`datadog-ci` バージョン `2.29.0` から `4.1.0` を使用しており、ジョブ名がワークフロー構成ファイルで定義されたエントリ (GitHub [ジョブ ID][12]) と一致しない場合は、`DD_GITHUB_JOB_NAME` 環境変数を公開し、ジョブ名を指し示す必要があります。例:

1. ジョブ名が [name プロパティ][13] を使って変更された場合:
    ```yaml
    jobs:
      deploy:
        name: My deployment job name
        env:
          DD_GITHUB_JOB_NAME: My deployment job name
        steps:
        - run: datadog-ci deployment mark ...
    ```
2. [マトリックス戦略][14] を使用すると、GitHub はジョブ名の末尾にマトリックス値を追加して、複数のジョブ名を生成します。
   追加された値は括弧で囲まれます。その場合、`DD_GITHUB_JOB_NAME` 環境変数はマトリックス値に応じて条件付きにする必要があります。

    ```yaml
    jobs:
      deployment:
        strategy:
          matrix:
            env: [dev, staging]
        env:
          DD_GITHUB_JOB_NAME: deployment (${{ matrix.env }})
        steps:
        - run: datadog-ci deployment mark ...
    ```

{{% /collapse-content %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/pipelines/
[2]: /ja/continuous_integration/pipelines/custom_tags_and_measures/
[3]: /ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/ci/deployments
[6]: https://app.datadoghq.com/ci/deployments/executions
[7]: /ja/continuous_delivery/search
[8]: /ja/continuous_delivery/explorer
[9]: /ja/continuous_integration/pipelines/#terminology
[10]: /ja/continuous_delivery/deployments
[11]: /ja/continuous_delivery/deployments/ciproviders#mark-github-actions-jobs-as-deployments
[12]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[13]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[14]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy