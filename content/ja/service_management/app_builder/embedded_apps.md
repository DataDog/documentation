---
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/app-builder/action-catalog
  tag: App
  text: Actions Catalog
title: 埋め込みアプリ
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では App Builder はサポートされていません。</div>
{{< /site-region >}}

Datadog App Builder アプリをダッシュボードに埋め込むと、リソースに対して直接アクションを実行でき、関連するデータやコンテキストがすべて即座に利用可能になります。アプリをダッシュボードの時間枠やテンプレート変数にリンクすることで、アプリのアクションのスコープを動的に設定でき、必要な範囲で環境内のアクションを実行することが可能です。

## ダッシュボードにアプリを追加する

以前に公開されたアプリをダッシュボードに追加するには、ダッシュボードのウィジェットトレイから **App** ウィジェットタイプをドラッグします。

{{< img src="/service_management/app_builder/embedded_apps/app_widget_select.png" alt="アプリウィジェットタイプがハイライトされたダッシュボードのウィジェットトレイ" style="width:80%;">}}

アプリエディタのモーダルウィンドウが表示され、アプリを選択し、タイトルを入力できます。

{{< img src="/service_management/app_builder/embedded_apps/app_editor.png" alt="アプリが選択され、ウィジェットのタイトルが表示されたアプリエディタモーダル" style="width:80%;">}}

## アプリをダッシュボードテンプレートと時間枠変数と同期させる

アプリをクエリやアプリ要素でテンプレート式をサポートする任意の場所でテンプレート変数にリンクすることが可能です。また、ダッシュボード上で選択された時間枠にもアプリをリンクできます。

ダッシュボードのテンプレート変数や時間枠の値を変更すると、リンクされたアプリ要素は自動的に更新されます。例えば、テンプレート変数のドロップダウンやグラフから `instance_id` の値を選択すると、その `instance_id` の値がアプリのフィルターに追加され、その特定のインスタンスに対してアクションを実行できるようになります。

{{< img src="service_management/app_builder/embedded_apps/template_variables.mp4" alt="グラフからテンプレート変数の値を選択している様子" video="true">}}


### テンプレート変数の例

すべての利用可能なテンプレート変数のリストを選択コンポーネントに表示するには、選択コンポーネントの **Options** フィールドに次のテンプレート式を追加します。

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.map(tvar => tvar.name )}
{{< /code-block >}}

特定のテンプレート変数のすべての利用可能な値を一覧表示するには、以下のテンプレート式を使用します。

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues}
{{< /code-block >}}

テンプレート変数の選択された値を取得するには、以下のテンプレート式を使用します。

- 単一選択のテンプレート変数の場合:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value}
{{< /code-block >}}
- 複数選択のテンプレート変数の場合:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.values}
{{< /code-block >}}

### 時間枠の例

時間枠の開始値を取得するには、以下のテンプレート式を使用します。

- 数値タイムスタンプの場合:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.start}
{{< /code-block >}}
- フォーマットされた日付と時刻の場合:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.start).toLocaleString()}
{{< /code-block >}}

時間枠の終了値を取得するには、以下のテンプレート式を使用します。

- 数値タイムスタンプの場合:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.end}
{{< /code-block >}}
- フォーマットされた日付と時刻の場合:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.end).toLocaleString()}
{{< /code-block >}}

日付範囲選択コンポーネントの値をダッシュボードの時間枠に設定するボタンを追加するには、次の手順を実行します。

1. 日付範囲選択コンポーネントをアプリに追加し、「dateRangePicker0」と名付けます。
1. アプリにボタンを追加します。
1. **Events** の項目に以下の値を入力します。
    - **Event**: click
    - **Reaction**: Set Component State
    - **Component**: dateRangePicker0
    - **State Function**: setValue
    - **Value**: `${global?.dashboard?.timeframe}`
1. アプリを保存して公開します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>質問やフィードバックがありますか？[Datadog Community Slack][1] の **#app-builder** チャンネルに参加してください。

[1]: https://datadoghq.slack.com/