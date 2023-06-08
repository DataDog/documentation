---
aliases:
- /ja/continuous_integration/setup_pipelines/custom_tags_and_metrics
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: GitHub
  text: Datadog CI モニターによるパイプラインアラートの構成
kind: documentation
title: パイプライントレースへのタグとメトリクスの追加
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では CI Visibility は利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">カスタムタグとメトリクスはベータ版機能であり、API はまだ変更可能です。</div>

カスタムタグとメトリクスコマンドは、CI Visibility パイプラインのトレースにユーザー定義のテキストや数値のタグを追加する方法を提供します。
これらのタグを使用して、ファセット (文字列値タグ) またはメジャー (数値タグ) を作成することができます。ファセットやメジャーは、パイプラインの検索、グラフ化、監視に使用することができます。

## 互換性

カスタムタグとメトリクスは、以下の CI プロバイダーで動作します。

- Buildkite
- CircleCI
- GitLab (SaaS またはセルフホスト >= 14.1)
- GitHub.com (SaaS) **注:** GitHub の場合、タグとメトリクスはパイプラインスパンにのみ追加可能です。
- Jenkins **注:** Jenkins の場合、[こちらの説明][5]に従って、パイプラインにカスタムタグを設定してください。
- Azure DevOps パイプライン

## Datadog CI CLI のインストール

`npm` を使用して [`datadog-ci`][1] (>=v1.15.0) CLI をグローバルにインストールします。

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

また、`npm` を使いたくない場合は、ベータ版の[スタンドアロンバイナリ][2]を使ってみることもできます。

{{< tabs >}}
{{% tab "Linux" %}}
Linux でスタンドアロンバイナリをインストールするには、以下を実行します。

{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}
{{% /tab %}}

{{% tab "MacOS" %}}
MacOS でスタンドアロンバイナリをインストールするには、以下を実行します。

{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}
{{% /tab %}}

{{% tab "Windows" %}}
Windows でスタンドアロンバイナリをインストールするには、以下を実行します。

{{< code-block lang="shell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## パイプライントレースへのタグの追加

タグは、パイプラインスパンまたはジョブスパンに追加することができます。これを行うには、以下を実行します。

{{< code-block lang="shell" >}}
datadog-ci tag [--level <pipeline|job>] [--tags <tags>]
{{< /code-block >}}

環境変数 `DATADOG_API_KEY` を使用して、有効な [Datadog API キー][3]を指定する必要があります。

{{< site-region region="us5,us3,eu,ap1" >}}
環境変数 `DATADOG_SITE` を使って [Datadog サイト][1]を指定する必要があります。

[1]: /ja/getting_started/site/
{{< /site-region >}}

次の例では、パイプラインスパンに `team` というタグを追加しています。

{{< code-block lang="shell" >}}
datadog-ci tag --level pipeline --tags team:backend
{{< /code-block >}}

次の例では、現在のジョブのスパンに `go.version` というタグを追加しています。

{{< code-block lang="shell" >}}
datadog-ci tag --level job --tags "go.version:`go version`"
{{< /code-block >}}

タグからファセットを作成するには、[パイプライン実行ページ][4]でタグ名の横にある歯車アイコンをクリックし、**create facet** (ファセットを作成する) オプションをクリックします。

{{< img src="ci/custom-tags-create-facet.mp4" alt="カスタムタグのファセット作成" style="width:100%;" video="true">}}

## パイプライントレースへのメトリクスの追加

パイプラインスパンやジョブスパンに数値タグを追加する場合は、以下を実行します。

{{< code-block lang="shell" >}}
datadog-ci metric [--level <pipeline|job>] [--metrics <metrics>]
{{< /code-block >}}

環境変数 `DATADOG_API_KEY` を使用して、有効な [Datadog API キー][3]を指定する必要があります。
{{< site-region region="us5,us3,eu,ap1" >}}
環境変数 `DATADOG_SITE` を使用して [Datadog サイト][1]を指定する必要があります。

[1]: /ja/getting_started/site/
{{< /site-region >}}

次の例では、パイプラインスパンに `error_rate` というメトリクスを追加しています。

{{< code-block lang="shell" >}}
datadog-ci metric --level pipeline --metrics "error_rate:0.56"
{{< /code-block >}}

次の例では、現在実行中のジョブのスパンに `binary.size` というメトリクスを追加しています。

{{< code-block lang="shell" >}}
datadog-ci metric --level job --metric "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
{{< /code-block >}}

メジャーを作成するには、[ パイプライン実行ページ ][4]でメトリクス名の横にある歯車アイコンをクリックし、**create measure** (メジャーを作成する) オプションをクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/datadog/datadog-ci#standalone-binary-beta
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ja/continuous_integration/pipelines/jenkins?tab=usingui#setting-custom-tags-for-your-pipelines