---
aliases:
- /ja/continuous_integration/pipelines/custom_tags_and_metrics
- /ja/continuous_integration/setup_pipelines/custom_tags_and_metrics
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: ブログ
  text: Datadog CI モニターによるパイプラインアラートの構成
title: パイプライントレースへのカスタムタグとメジャーの追加
---

## 概要

[CI Pipeline Visibility][11] でカスタムタグとメジャーのコマンドを使用して、パイプライントレースにユーザー定義のテキストおよび数値のタグを追加できます。パイプライントレースやジョブスパンにカスタムタグやメジャーを追加するには、[`datadog-ci` NPM パッケージ][1]を使用できます。これらのカスタムタグとメジャーから、ファセット (文字列値のタグ) またはメジャー (数値のタグ) を作成できます。

ファセットとメジャーを使用して、[CI Visibility Explorer][10] 内でパイプラインをフィルタリング、可視化の作成、またはモニターの作成ができます。

### 互換性

カスタムタグとメジャーは、以下の CI プロバイダーで動作します。

- Buildkite
- CircleCI
- GitLab (SaaS またはセルフホスト >= 14.1)
- GitHub.com (SaaS): GitHub ジョブにタグとメジャーを追加するには、[下記のセクション](#add-tags-and-measures-to-github-jobs)を参照してください。
- Jenkins: Jenkins では、パイプラインでカスタムタグをセットアップするには、[こちらの手順][5]に従ってください。
- Azure DevOps パイプライン

## Datadog CI CLI のインストール

`npm` を使用して [`datadog-ci`][1] (>=v1.15.0) CLI をグローバルにインストールします。

```shell
npm install -g @datadog/datadog-ci
```

また、`npm` を使いたくない場合は、ベータ版の[スタンドアロンバイナリ][2]を使ってみることもできます。

{{< tabs >}}
{{% tab "Linux" %}}
Linux でスタンドアロンバイナリをインストールするには、以下を実行します。

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "MacOS" %}}
MacOS でスタンドアロンバイナリをインストールするには、以下を実行します。

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "Windows" %}}
Windows でスタンドアロンバイナリをインストールするには、以下を実行します。

```shell
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
```
{{% /tab %}}
{{< /tabs >}}

## パイプライントレースへのタグの追加

タグはパイプラインスパンまたはジョブスパンに追加できます。

これを行うには、`tag` コマンドを実行します。

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag [--level <pipeline|job>] [--tags <tags>]
```

有効な [Datadog API キー][3]を環境変数 `DATADOG_API_KEY` で、[Datadog サイト][12]を環境変数 `DATADOG_SITE` で指定する必要があります。

次の例では、タグ `team` をパイプラインスパンに追加します。

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level pipeline --tags team:backend
```

次の例では、現在のジョブのスパンに `go.version` というタグを追加しています。

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level job --tags "go.version:`go version`"
```

タグからファセットを作成するには、[Pipeline Executions ページ][4]でタグ名の横にある歯車アイコンをクリックし、**Create Facet** をクリックします。

{{< img src="ci/custom-tags-create-facet.mp4" alt="カスタムタグのファセット作成" style="width:100%;" video="true">}}

## パイプライントレースにメジャーを追加する

数値タグをパイプラインスパンまたはジョブスパンに追加するには、`measure` コマンドを実行します。

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure [--level <pipeline|job>] [--measures <measures>]
```

有効な [Datadog API キー][3]を環境変数 `DATADOG_API_KEY` で、[Datadog サイト][12]を環境変数 `DATADOG_SITE` で指定する必要があります。

次の例では、メジャー `error_rate` をパイプラインスパンに追加します。

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level pipeline --measures "error_rate:0.56"
```

次の例では、メジャー `binary.size` を現在実行中のジョブのスパンに追加します。

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level job --measures "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
```

メジャーを作成するには、[Pipeline Executions ページ][4]でメジャー名の横にある歯車アイコンをクリックし、**Create Measure** をクリックします。

## GitHub ジョブにタグとメジャーを追加する

GitHub ジョブにタグとメジャーを追加するには、`datadog-ci CLI` バージョン `2.29.0` 以上が必要です。
ジョブ名がワークフローコンフィギュレーションファイルで定義されたエントリ (GitHub の[ジョブ ID][7]) と一致しない場合、環境変数 `DD_GITHUB_JOB_NAME` を公開して、ジョブ名を指す必要があります。例:
1. ジョブ名が [name プロパティ][8]を使って変更された場合:
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci tag ...
    ```
2. [マトリックス戦略][9]が使用されている場合、GitHub はジョブ名の末尾にマトリックスの値を括弧内に追加して複数のジョブ名を生成します。その場合、環境変数 `DD_GITHUB_JOB_NAME` はマトリックスの値に応じて条件付きで設定する必要があります。

    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            version: [1, 2]
            os: [linux, macos]
        env:
          DD_GITHUB_JOB_NAME: build (${{ matrix.version }}, ${{ matrix.os }})
        steps:
        - run: datadog-ci tag ...
    ```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/datadog/datadog-ci#standalone-binary-beta
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ja/continuous_integration/pipelines/jenkins?tab=usingui#setting-custom-tags-for-your-pipelines
[6]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux#add-tags-and-measures-to-github-jobs
[7]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[8]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[9]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[10]: /ja/continuous_integration/explorer
[11]: /ja/continuous_integration/pipelines/
[12]: /ja/getting_started/site/