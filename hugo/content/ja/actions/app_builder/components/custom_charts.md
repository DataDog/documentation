---
aliases:
- /ja/service_management/app_builder/custom_charts/
- /ja/service_management/app_builder/components/custom_charts
description: Vega-Lite 仕様を使用してアプリ内にカスタムチャートを作成し、さまざまなチャートタイプやスタイルでクエリのデータを視覚化します。
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: ドキュメント
  text: コンポーネント
- link: /actions/workflows/build/
  tag: ドキュメント
  text: アプリの構築
title: カスタムチャート
---
このページでは、App Builder アプリでカスタムチャートコンポーネントを使用する方法の例を紹介します。

カスタムチャートを作成するための基本的なワークフローは以下のとおりです。

1. グラフ化するデータを含むクエリを作成または選択する。
1. カスタムチャートコンポーネントを追加し、App Builder UI または [Vega-Lite example gallery][1] からチャートスタイルを選択する。
1. 例の値をクエリのデータと置き換える。

あるいは、Bits AI を使用してカスタムチャートを開始することもできます。
   1. {{< ui >}}Build with AI{{< /ui >}} アイコン ({{< ui >}}<i class="icon-bits-ai"></i>{{< /ui >}}) をクリックします。
   1. カスタムプロンプトを入力するか、プロンプト `Can you help me create a custom chart?` を試します。

## 設定フローの例 {#example-setup-flow}

以下の例は、サービスごとにグループ化された Datadog Logs を示すヒストグラムチャートの作成方法を示しています。

### データソースの設定 {#set-up-your-data-source}

1. {{< ui >}}\+ New Query{{< /ui >}} をクリックします。
1. 「Search Logs」を検索し、Datadog {{< ui >}}Search logs{{< /ui >}} アクションを選択して `searchLogs0` という名前のクエリを作成します。
1. 既存の Datadog アカウントコネクションを選択するか、新しいコネクションを作成します。
1. {{< ui >}}Inputs{{< /ui >}} の下で、{{< ui >}}Time period{{< /ui >}} に対して {{< ui >}}Past 2 Days{{< /ui >}} を選択します。
1. {{< ui >}}Run{{< /ui >}} をクリックします。<br>パネルの左下にクエリの出力結果が表示されます。
1. `logs` の下で `0` を展開し、次に `content` を展開します。これにより、各ログで利用可能なプロパティが表示されます。


### カスタムチャートコンポーネントを追加し、チャートスタイルを選択します {#add-the-custom-chart-component-and-choose-a-chart-style}

1. {{< ui >}}\+ All Components{{< /ui >}} をクリックし、{{< ui >}}Custom Chart{{< /ui >}} を選択して `customChart0` というコンポーネントを追加します。
1. {{< ui >}}Show Chart Examples{{< /ui >}} をクリックします。
1. {{< ui >}}Simple Histogram{{< /ui >}} を選択し、{{< ui >}}Confirm{{< /ui >}} をクリックします。<br>Vega-Lite Specification に以下の値が入力されます。

   {{< code-block lang="json" disable_copy="true" collapsible="true" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "url": "https://vega.github.io/editor/data/movies.json"
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "bin": true,
            "field": "IMDB Rating"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}{{< /code-block >}}


### サンプル値をデータに置き換える {#replace-example-values-with-your-data}

自動入力された Vega-Lite Specification を以下に置き換え、データソースと x 軸上にグラフ化される値を変更します。

{{< highlight json "hl_lines=4 12" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "values": searchLogs0.outputs.logs
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "field": "content.service"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}
{{< /highlight >}}

Datadog Logs のデータが表示されたヒストグラムチャート。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][0] の **#app-builder** チャンネルにご参加ください。

[0]: https://chat.datadoghq.com/
[1]: https://vega.github.io/vega-lite/examples/