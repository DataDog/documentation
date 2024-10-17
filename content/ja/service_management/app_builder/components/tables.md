---
aliases:
- /ja/service_management/app_builder/tables/
disable_toc: false
further_reading:
- link: /service_management/workflows/components/
  tag: ドキュメント
  text: コンポーネント
- link: /service_management/workflows/build/
  tag: ドキュメント
  text: アプリの構築
title: テーブル
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では App Builder はサポートされていません。</div>
{{< /site-region >}}

このページでは、App Builder アプリのテーブルコンポーネントを操作するために使用できる高度な機能について説明します。

## クライアント側でのフィルタリング

アイテムの一覧がすでに用意されており、その一覧をフィルタリングしたい場合、クライアント側で実行できる方法は複数あります。

### テキスト入力または検索コンポーネントを使用してテーブルをフィルタリングする

よくある使用例として、テキスト入力コンポーネントの値を使用してテーブルコンポーネントをフィルタリングすることが挙げられます。

例えば、テキスト入力コンポーネントを使用してフィルタリングできるテーブルにダッシュボードを一覧表示したい場合、次のようにします。

1. **+** ボタンを使用して新しいクエリを追加します。
1. "list dashboards" を検索し、**List Dashboards** アクションをクリックします。クエリ名を `listDashboards0` とします。
1. テキスト入力または検索コンポーネントをアプリに追加します。名前は `searchInput` とします。
1. テーブルコンポーネントを追加します。
1. テーブルの **data source** プロパティを、作成したテキスト入力または検索コンポーネントでフィルタリングしたデータに設定します。この例では、**data source** を以下の式に設定します。

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(searchInput.value))}
    ```

テキスト入力コンポーネントにテキストを入力すると、テーブルの行がそのテキストでフィルタリングされます。

### 選択コンポーネントでテーブルをフィルタリング

もう一つの一般的な使用例は、選択コンポーネントを使用してテーブルをフィルタリングすることです。

例えば、選択コンポーネントを使用してフィルタリングできるテーブルにダッシュボードを一覧表示したい場合、次のようにします。

1. **+** ボタンを使用して新しいクエリを追加します。
1. "list dashboards" を検索し、**List Dashboards** アクションをクリックします。クエリ名を `listDashboards0` とします。
1. 選択コンポーネントをアプリに追加します。名前は `selectInput` とします。
1. テーブルコンポーネントを追加します。
1. テーブルの **data source** プロパティを、選択コンポーネントでフィルタリングしたデータに設定します。この例では、**data source** を次の式に設定します。

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(selectInput.value))}
    ```

選択コンポーネントから値を選択すると、テーブルの行がその値でフィルタリングされます。

### クエリ実行後の変換を使用してクエリ結果をフィルタリング

クエリの結果自体をフィルタリングしたい場合は、テーブルでそのクエリの結果を使用し、以下の手順を実行します。

1. **+** ボタンを使用して新しいクエリを追加します。
1. "list dashboards" を検索し、**List Dashboards** アクションをクリックします。クエリ名を `listDashboards0` とします。
1. テキスト入力または検索コンポーネントをアプリに追加します。名前は `searchInput` とします。
1. テーブルコンポーネントを追加し、その **data source** プロパティに追加したクエリを設定します。
1. クエリの **Advanced** セクションを展開し、**Post-query Transformation** を見つけます。
1. `return outputs` を次の行に置き換えます。

    ```
    outputs.dashboards.filter(row => row.title.includes(searchInput.value))
    ```

テキスト入力コンポーネントにテキストを入力すると、テーブルの行がそのテキストでフィルタリングされます。

変換前のクエリ結果が必要な場合は、`${listDashboards0.rawOutputs}` として参照できます。

## サーバー側でのフィルタリング

テキスト入力コンポーネントなどの入力にユーザーが値を入力した際に、サーバー側で値をフィルタリングし、新しいリクエストを発行したい場合があるかもしれません。

この場合、クエリを直接編集することで、サーバー側のフィルタリングを有効にすることができます。

例えば、[GitHub PR パイプライン][4]のブループリントでは、`listOpenedPulls` クエリには以下の URL を取得する入力があります。

```
https://api.github.com/search/issues?q=org:${organizationInput.value}+author:${userNameInput.value}+type:pr+state:open
```

GitHub API は、組織、作成者、またはプルリクエストの種類に基づいてフィルタリングするためのクエリパラメーターを受け入れます。前述のクエリ入力 URL には、"Organization" テキスト入力コンポーネントの値である `organizationInput.value` および "Username" テキスト入力コンポーネントの値である `userNameInput.value` のテンプレート式が含まれています。クエリ実行設定を自動に設定すると、これらのテンプレート式の値が変更されたときにクエリが自動的に更新され、テーブルの値が更新されます。


## ローディングインジケーターの表示

データをフェッチしている間にテーブルにローディングインジケーターを表示したい場合は、_テーブルの_ `isLoading` 値を_クエリの_ `isLoading` プロパティと等しく設定することができます。例:

1. [テキスト入力フィールドでのフィルタリング][2]の手順に従います。
1. テーブルのプロパティで、**Appearance** の下にある **Is Loading** の隣にある **&lt;/&gt;** をクリックして、コードエディタを開きます。
1. テーブルの `isLoading` の値を次の式に設定します。

    ```
    ${listDashboards0.isLoading}
    ```

テキスト入力コンポーネントに新しいテキストを入力すると、テーブルにローディングインジケーターが表示されます。

## 動的なテーブル値

テーブルコンポーネントの **data source** プロパティを使用して、テーブルの値を動的に入力し、テーブルに列として取り込むオブジェクトを制限することができます。

例えば、[GitHub PR Summarizer][3] ブループリントでは、GitHub クエリを連続して実行して、リポジトリ内のプルリクエストの一覧を要約します。このクエリでは、以下の data source エントリを使用して、テーブルを `title`、`Summary`、`updated_at`、`user`、`html_url`、`state` の 6 列に制限しています。ハイライトされたコードでは、各プルリクエストのユーザー列に、作成者のアバターと GitHub のユーザー名が動的に追加されます。

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

表の **User** 列には、各 PR の作成者のアバターと GitHub のユーザー名が表示されます。



## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>質問やフィードバックがありますか？[Datadog Community Slack][0] の **#app-builder** チャンネルに参加してください。

[0]: https://datadoghq.slack.com/
[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=pagerduty_oncall_manager&viewMode=preview
[2]: /ja/service_management/app_builder/components/tables/#filtering-with-a-text-input
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=github-pr-dashboard&viewMode=preview