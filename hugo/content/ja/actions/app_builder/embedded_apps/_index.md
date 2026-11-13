---
aliases:
- /ja/service_management/app_builder/embedded_apps
description: 公開済みのアプリをダッシュボードに埋め込み、テンプレート変数や時間枠と同期させることで、動的でコンテキストに応じたアクションを実行できます。
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/actions/action-catalog/
  tag: アプリ
  text: Action Catalog
title: App Builder アプリを埋め込む
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}


Datadog App Builder アプリをダッシュボードに埋め込むと、リソースに対して直接アクションを実行でき、関連するすべてのデータとコンテキストをすぐに利用できます。アプリをダッシュボードの時間枠およびテンプレート変数と連携させることで、アプリのアクションのスコープを動的に設定できます。これにより、環境内で必要な範囲に応じてアクションを実行できます。

<div class="alert alert-info">このページでは、Datadog のローコードのドラッグ＆ドロップエディターで作成する App Builder アプリの埋め込みについて説明します。React と TypeScript を使用してローカルでコードとして記述する <a href="/actions/datadog_apps/">Datadog Apps</a> で構築されたアプリを埋め込む方法については、<a href="/actions/datadog_apps/embed_apps/">アプリを埋め込む</a>を参照してください。</div>

## ダッシュボードにアプリを追加する {#add-apps-to-your-dashboard}

以前に公開したアプリをダッシュボードに追加するには、ダッシュボードのウィジェットトレイから {{< ui >}}App{{< /ui >}} ウィジェットタイプをドラッグします。

{{< img src="/actions/app_builder/embedded_apps/app-widget-select.png" alt="App ウィジェットタイプが強調表示されたダッシュボードのウィジェットトレイ" style="width:30%;">}}

App Editor のモーダルウィンドウが表示され、アプリを選択し、タイトルを入力できます。

{{< img src="/actions/app_builder/embedded_apps/app-editor.png" alt="アプリが選択され、ウィジェットタイトルが設定された App Editor モーダル" style="width:80%;">}}

## アプリをダッシュボードテンプレートと時間枠変数と同期させる{#sync-your-app-with-dashboard-template-and-time-frame-variables}

クエリやアプリ要素でテンプレート式がサポートされている場所であれば、どこでもアプリをテンプレート変数にリンクできます。ダッシュボードで選択した時間枠にアプリをリンクすることもできます。

ダッシュボードでテンプレート変数や時間枠の値を変更すると、リンクされたアプリ要素が自動的に更新されます。たとえば、テンプレート変数のドロップダウンを使用して、またはグラフから直接 `instance_id` 値を選択すると、`instance_id` 値がアプリのフィルターに追加されます。これにより、その特定のインスタンスに対してアクションを実行できます。

{{< img src="actions/app_builder/embedded_apps/template_variables.mp4" alt="グラフからテンプレート変数の値を選択する" video="true">}}


### テンプレート変数の例 {#template-variable-examples}

利用可能なすべてのテンプレート変数のリストを選択コンポーネントに設定するには、選択コンポーネントの {{< ui >}}Options{{< /ui >}} フィールドに次のテンプレート式を追加します。

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.map(tvar => tvar.name )}
{{< /code-block >}}

特定のテンプレート変数のすべての利用可能な値を一覧表示するには、以下のテンプレート式を使用します。

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues}
{{< /code-block >}}

選択コンポーネントを使用する際に利用可能なすべての値を一覧表示するには、次のテンプレート式を使用します。

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues.map(availableValue => {return {label: availableValue, value:availableValue}})}
{{< /code-block >}}

テンプレート変数の選択された値を取得するには、以下のテンプレート式を使用します。

- 単一選択のテンプレート変数の場合、
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value}
{{< /code-block >}}
- 複数選択のテンプレート変数の場合、
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.values}
{{< /code-block >}}

### 時間枠の例 {#time-frame-examples}

時間枠の開始値を取得するには、以下のテンプレート式を使用します。

- 数値タイムスタンプの場合、
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.start}
{{< /code-block >}}
- フォーマットされた日付と時刻の場合、
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.start).toLocaleString()}
{{< /code-block >}}

時間枠の終了値を取得するには、以下のテンプレート式を使用します。

- 数値タイムスタンプの場合、
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.end}
{{< /code-block >}}
- フォーマットされた日付と時刻の場合、
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.end).toLocaleString()}
{{< /code-block >}}

日付範囲選択コンポーネントの値をダッシュボードの時間枠に設定するボタンを追加するには、次の手順を実行します。

1. 日付範囲選択コンポーネントをアプリに追加し、「dateRangePicker0」と名付けます。
1. アプリにボタンを追加します。
1. {{< ui >}}Events{{< /ui >}} の項目に以下の値を入力します。
    - {{< ui >}}Event{{< /ui >}}: {{< ui >}}click{{< /ui >}}
    - {{< ui >}}Reaction{{< /ui >}}: {{< ui >}}Set Component State{{< /ui >}}
    - {{< ui >}}Component{{< /ui >}}: {{< ui >}}dateRangePicker0{{< /ui >}}
    - {{< ui >}}State Function{{< /ui >}}: {{< ui >}}setValue{{< /ui >}}
    - {{< ui >}}Value{{< /ui >}}: `${global?.dashboard?.timeframe}`
1. アプリを保存して公開します。

## カタログにアプリを追加 {#add-apps-to-catalog}

公開されたアプリを [Catalog][3] の [Self-Service Actions][2] ダッシュボードに追加することで、開発者はインフラストラクチャーのプロビジョニング、サービスの構築、問題の対処などを一元的に行えるようになります。

Self-Service Actions に追加するには、まずアプリが公開されており、権限が定義されていることを確認してください。次に、{{< ui >}}Add to Self-Service Actions{{< /ui >}} をクリックします。

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Self-Service Actions" style="width:100%;" >}}

追加が完了すると、Catalog でアプリを表示して使用できるようになります。

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service Actions への公開" style="width:100%;" >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][1] の **#app-builder** チャンネルにご参加ください。

[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/software/self-service
[3]: https://app.datadoghq.com/software