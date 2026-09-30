---
aliases:
- /ja/service_management/app_builder/tables/
- /ja/service_management/app_builder/components/tables
description: クライアント側でのフィルタリング、サーバー側でのフィルタリング、ローディングインジケーター、動的な値など、テーブルコンポーネントの高度な機能。
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: ドキュメント
  text: コンポーネント
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
title: テーブル
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

このページでは、App Builder アプリのテーブルコンポーネントを操作するために使用できる高度な機能について説明します。

## クライアント側でのフィルタリング{#client-side-filtering}

アイテムの一覧がすでに用意されており、その一覧をフィルタリングしたい場合、クライアント側で実行できる方法は複数あります。

### 列のフィルタリング{#column-filtering}

[{{< ui >}}Columns{{< /ui >}}] (列) の下で特定の列を展開し、[{{< ui >}}Filterable{{< /ui >}}] (フィルタリング可能) オプションを有効にすると、その列のエントリでフィルタリングできるようになります。有効にすると、テーブルヘッダーにドロップダウンメニューが表示され、その列からフィルタリング対象の項目を選択できるようになります。

### 日付範囲によるフィルタリング{#filter-by-date-range}

日付範囲のフィルタリングを許可するには、[{{< ui >}}Appearance{{< /ui >}}] (外観) の下で [{{< ui >}}Has Date Range Filter{{< /ui >}}] (日付範囲フィルターあり) オプションを有効にし、フィルタリング対象のデータパスを選択します。有効にすると、テーブルヘッダーにドロップダウンメニューが表示され、フィルタリング対象の時間範囲を選択できるようになります。

### 検索によるフィルタリング{#filter-with-search}

テーブルに検索バーを追加するには、[{{< ui >}}Appearance{{< /ui >}}] の下で [{{< ui >}}Is Searchable{{< /ui >}}] (検索可能) オプションを有効にします。

### テキスト入力コンポーネントまたは検索コンポーネントによるテーブルのフィルタリング{#filter-a-table-with-a-text-input-or-search-component}

よくある使用例として、テキスト入力コンポーネントの値を使用してテーブルコンポーネントをフィルタリングすることが挙げられます。

たとえば、テキスト入力コンポーネントを使用してフィルタリングできるテーブルにダッシュボードを一覧表示したい場合、次のようにします。

1. [{{< ui >}}\+{{< /ui >}}] ボタンを使用して新しいクエリを追加します。
1. “list dashboards”を検索し、[{{< ui >}}List Dashboards{{< /ui >}}] (ダッシュボードを一覧表示) アクションをクリックします。クエリに `listDashboards0` という名前を付けます。
1. テキスト入力コンポーネントまたは検索コンポーネントをアプリに追加します。名前は `searchInput` とします。
1. テーブルコンポーネントを追加します。
1. テーブルの [{{< ui >}}data source{{< /ui >}}] (データソース) プロパティを、作成したテキスト入力コンポーネントまたは検索コンポーネントでフィルタリングされたデータに設定します。この例では、[{{< ui >}}data source{{< /ui >}}] を次の式に設定します。

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(searchInput.value))}
    ```

テキスト入力コンポーネントにテキストを入力すると、テーブルの行がそのテキストでフィルタリングされます。

### 選択コンポーネントによるテーブルのフィルタリング{#filter-a-table-with-a-select-component}

もう一つの一般的な使用例は、選択コンポーネントを使用してテーブルをフィルタリングすることです。

たとえば、選択コンポーネントを使用してフィルタリングできるテーブルにダッシュボードを一覧表示したい場合、次のようにします。

1. [{{< ui >}}\+{{< /ui >}}] ボタンを使用して新しいクエリを追加します。
1. “list dashboards”を検索し、[{{< ui >}}List Dashboards{{< /ui >}}] (ダッシュボードを一覧表示) アクションをクリックします。クエリに `listDashboards0` という名前を付けます。
1. 選択コンポーネントをアプリに追加します。名前は `selectInput` とします。
1. テーブルコンポーネントを追加します。
1. テーブルの [{{< ui >}}data source{{< /ui >}}] プロパティを、選択コンポーネントでフィルタリングされたデータに設定します。この例では、[{{< ui >}}data source{{< /ui >}}] を次の式に設定します。

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(selectInput.value))}
    ```

選択コンポーネントから値を選択すると、テーブルの行がその値でフィルタリングされます。

### クエリ実行後の変換によるクエリ結果のフィルタリング{#filter-query-results-using-a-post-query-transformation}

クエリの結果自体をフィルタリングしたい場合は、テーブルでそのクエリの結果を使用し、以下の手順を実行します。

1. [{{< ui >}}\+{{< /ui >}}] ボタンを使用して新しいクエリを追加します。
1. “list dashboards”を検索し、[{{< ui >}}List Dashboards{{< /ui >}}] (ダッシュボードを一覧表示) アクションをクリックします。クエリに `listDashboards0` という名前を付けます。
1. テキスト入力コンポーネントまたは検索コンポーネントをアプリに追加します。名前は `searchInput` とします。
1. テーブルコンポーネントを追加し、その [{{< ui >}}data source{{< /ui >}}] プロパティを先ほど追加したクエリに設定します。
1. クエリの [{{< ui >}}Advanced{{< /ui >}}] (高度) セクションを展開し、[{{< ui >}}Post-query Transformation{{< /ui >}}] (クエリ後変換) を見つけます。
1. `return outputs` を次の行に置き換えます。

    ```
    outputs.dashboards.filter(row => row.title.includes(searchInput.value))
    ```

テキスト入力コンポーネントにテキストを入力すると、テーブルの行がそのテキストでフィルタリングされます。

変換前のクエリ結果が必要な場合は、`${listDashboards0.rawOutputs}` として参照できます。

## サーバー側でのフィルタリング{#server-side-filtering}

テキスト入力コンポーネントなどの入力にユーザーが値を入力した際に、サーバー側で値をフィルタリングし、新しいリクエストを発行したい場合があるかもしれません。

この場合、クエリを直接編集することで、サーバー側でのフィルタリングを有効にすることができます。

たとえば、[GitHub PR pipeline][4] ブループリントでは、`listOpenedPulls` クエリに以下の URL を取得する入力があります。

```
https://api.github.com/search/issues?q=org:${organizationInput.value}+author:${userNameInput.value}+type:pr+state:open
```

GitHub API は、組織、作成者、またはプルリクエストのタイプに基づくフィルタリングのためのクエリパラメーターを受け入れます。前述のクエリ入力 URL には、`organizationInput.value` (“Organization”テキスト入力コンポーネントの値) および `userNameInput.value` (“Username”テキスト入力コンポーネントの値) のテンプレート式が含まれています。クエリの実行設定を自動に設定すると、これらのテンプレート式の値が変更されたときにクエリが自動的に更新され、テーブルの値が更新されます。


## ローディングインジケーターの表示 {#showing-a-loading-indicator}

データをフェッチしている間にテーブルにローディングインジケーターを表示したい場合は、_テーブルの_ `isLoading` 値を_クエリの_ `isLoading` プロパティと等しく設定することができます。たとえば、次のようにします。

1. [テキスト入力によるフィルタリング][2]の手順に従います。
1. テーブルのプロパティで、[{{< ui >}}Appearance{{< /ui >}}] の下にある [{{< ui >}}Is Loading{{< /ui >}}] (読み込み中) の横の [{{< ui >}}&lt;/&gt;{{< /ui >}}] をクリックして、コードエディターを開きます。
1. テーブルの `isLoading` 値を次の式に設定します。

    ```
    ${listDashboards0.isLoading}
    ```

テキスト入力コンポーネントに新しいテキストを入力すると、テーブルにローディングインジケーターが表示されます。

## 動的なテーブル値 {#dynamic-table-values}

テーブルコンポーネントの [{{< ui >}}data source{{< /ui >}}] プロパティを使用して、テーブルの値を動的に入力し、テーブルに列として取り込むオブジェクトを制限することができます。

たとえば、[GitHub PR Summarizer][3] ブループリントでは、一連の GitHub クエリを使用してリポジトリ内のプルリクエストのリストを要約しています。このクエリは、以下のデータソースエントリを使用して、テーブルを `title`、`Summary`、`updated_at`、`user`、`html_url`、`state` の 6 列に制限しています。ハイライトされたコードは、各プルリクエストのユーザー列に、作成者のアバターと GitHub ユーザー名を動的に入力します。

{{< highlight js "hl_lines=17" >}}
${(() => {
    const summaryById = Object.fromEntries(
        summarizePulls.outputs.map(({id, summary}) => [id, summary])
    );
    return listPulls.outputs.map(result => {
        const {title, updated_at, user, state, html_url} = result;
        const updatedAt = new Date(result.updated_at);
        let summary;
        if (summarizePulls.isLoading) {
            summary = 'Summarizing';
        } else {
            summary = summaryById[result.id] ?? 'N/A';
        }
        return {
            title: `**${title}**`,
            updated_at: updatedAt.toLocaleString(),
            user: {label: user.login, src: user.avatar_url},
            summary,
            state, html_url};
    })
})()}
{{< /highlight >}}

テーブルの {{< ui >}}User{{< /ui >}} 列には、各 PR 作成者のアバターと GitHub ユーザー名が表示されます。



## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][0] の **#app-builder** チャンネルにご参加ください。

[0]: https://chat.datadoghq.com/
[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=pagerduty_oncall_manager&viewMode=preview
[2]: /ja/actions/app_builder/components/tables/#filtering-with-a-text-input
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=github-pr-dashboard&viewMode=preview