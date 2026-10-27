---
aliases:
- /ja/app_builder/events
- /ja/service_management/app_builder/events
description: UI コンポーネントのイベントトリガーとリアクションを構成します。これには、動的なアプリのインタラクションや動作のための状態関数が含まれます。
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
- link: /actions/app_builder/components/
  tag: ドキュメント
  text: コンポーネント
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: ラーニングセンター
  text: App Builder を使用したサードパーティインテグレーション向けのセルフサービスアプリの構築
title: イベント
---
UI コンポーネントは、{{< ui >}}Event{{< /ui >}} でリアクションをトリガーできます。イベントトリガーはコンポーネントによって異なります。たとえば、ボタンコンポーネントはクリックイベントでリアクションをトリガーでき、テーブルコンポーネントはページ変更やテーブル行のクリックイベントでリアクションをトリガーできます。特定のコンポーネントで利用可能なイベントトリガーを確認するには、[コンポーネント][1]を参照してください。

イベントは、UI コンポーネントの状態の設定、モーダルの開閉、別のクエリのトリガー、さらにはカスタム JavaScript の実行も行うことができます。

たとえば、[GitHub PR summarizer][2] ブループリントでは、クリック時にトリガーされるイベントを含む {{< ui >}}Summarize{{< /ui >}} ボタンを使用します。このイベントは、`summarizePulls` クエリを実行する {{< ui >}}Trigger Query{{< /ui >}} リアクションを使用します。

イベントを手動で操作することに加えて、Bits AI を使用してイベントハンドラーの設定、イベント駆動型アクションの構成、イベントロジックの最適化を行うことができます。
   1. {{< ui >}}Build with AI{{< /ui >}}アイコン (**<i class="icon-bits-ai"></i>**) をクリックします。
   1. イベントのカスタムプロンプトを入力するか、プロンプト `How can you help me with events?` を試します。


## イベントとリアクション {#events-and-reactions}

App Builder では、イベントとリアクションが連携してコンポーネントの動作を決定します。

コンポーネント (ボタンクリックやフォーム送信など) とアクション (実行完了など) は、ともにイベントをトリガーできます。イベントは、使用するコンポーネントによって異なります。コンポーネント固有のイベントの詳細については、[コンポーネント][1]を参照してください。

リアクションは、イベントがトリガーされたときに発生する内容を指定します。イベントをトリガーできるすべてのコンポーネントでは、以下のリアクションが利用可能です: 
- {{< ui >}}Close Modal{{< /ui >}}
- {{< ui >}}Custom{{< /ui >}}
- {{< ui >}}Download File{{< /ui >}}
- {{< ui >}}Open Modal{{< /ui >}}
- {{< ui >}}Open Side Panel{{< /ui >}}
- {{< ui >}}Close Side Panel{{< /ui >}}
- {{< ui >}}Open URL{{< /ui >}}
- {{< ui >}}Set Component State{{< /ui >}}
- {{< ui >}}Set State Variable Value{{< /ui >}}
- {{< ui >}}Toast Notification{{< /ui >}}
- {{< ui >}}Trigger Action{{< /ui >}}

### カスタムリアクション {#custom-reactions}

カスタムリアクションを使用すると、ビルトインリアクションを超えた、より高度なユースケースやカスタム動作が可能になります。たとえば、アプリ内の他のデータに基づいて条件付きでアクションを実行できます。以下の例では、現在のユーザーのチームに基づいて異なるアクションをトリガーします。

```javascript
${() => {
    console.log("Trigger actions by team")
    const teams = global?.user?.teams ?? []
    if (teams.some(t => t?.name === "team1")) {
        makeRequest0?.fetch()
    } else if (teams.some(t => t?.name === "team2")) {
        makeRequest1?.fetch()
    } else {
        makeRequest2?.fetch()
    }
}}
```

## State Function (状態関数) {#state-functions}

App Builder は、一部のタイプのアプリの状態を変更するための関数を提供します。これらの関数は、特定のコンポーネントの {{< ui >}}Set Component State{{< /ui >}} リアクション、およびクエリ後のフックで利用可能です。

setIsOpen
: 入力するブール値に基づいて、モーダルのステータスを開くか閉じるかに設定します。<br>
**例**: **モーダル** コンポーネントの[コンポーネント][1]ドキュメントページセクションを参照してください。

setPageIndex
: テーブルコンポーネントの `pageIndex` プロパティを、指定したページに設定します。サーバー側のページネーションタイプで動作します。<br>
**例**: **テーブル** コンポーネントの[コンポーネント][1]ドキュメントページセクションを参照してください。

setSelectedRow
: テーブルコンポーネントの `selectedRow` プロパティを、指定した行に設定します。<br>
**例**: **テーブル**コンポーネントの[コンポーネント][1]ドキュメントページセクションを参照してください。

setTabIndex
: テーブルコンポーネントの `selectedTabIndex` プロパティを、指定したタブインデックスに設定します。<br>
**例**: **タブ** コンポーネントの[コンポーネント][1]ドキュメントページセクションを参照してください。

setValue
: 要素の値を、関数に入力する値に設定します。<br>
**例**: **フォーム**、**数値入力**、**ラジオボタン**、**検索**、**選択**、**テキスト領域**、および**テキスト入力**コンポーネントの[コンポーネント][1]ドキュメントページセクションを参照してください。

特定のコンポーネントで使用可能な状態関数を確認するには、[コンポーネント][1]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][8] の **#app-builder** チャンネルにご参加ください。

[1]: /ja/actions/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://chat.datadoghq.com/