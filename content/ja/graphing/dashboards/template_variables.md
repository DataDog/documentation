---
title: テンプレート変数
kind: documentation
aliases:
  - /ja/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
  - /ja/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
further_reading:
  - link: graphing/dashboards/
    tag: Documentation
    text: Datadog でダッシュボードを作成
  - link: graphing/dashboards/shared_graph
    tag: Documentation
    text: Datadog の外でグラフを共有する
  - link: graphing/widgets
    tag: Documentation
    text: ダッシュボードのウィジェットについて
---
テンプレート変数により、ダッシュボード内の 1 つ以上のウィジェットを動的にフィルタリングすることができます。

## 作成

ダッシュボードに最初のテンプレート変数を作成するには、**Add Template Variables** をクリックします。テンプレート変数が既に定義されている場合は、*鉛筆* アイコンをクリックしてテンプレート変数エディタを開きます。編集モードで**Add Variable +** をクリックしてテンプレート変数を追加します。

テンプレート変数は、以下のように定義されます。

* **Name**: テンプレート変数固有の名前です。この名前はダッシュボードの内容をフィルタリングするのに使用されます。
* **Tag or Attribute**:
    * Tag: 推奨される[タグ付けフォーマット][1] (`<KEY>:<VALUE>`) に従う場合、*Tag* は `<KEY>` となります。
    * Attribute: [テンプレート変数のファセットまたはメジャー](#logs-and-apm-queries) を使用します。
* **Default Value**:
    テンプレート変数のタグまたは属性のデフォルト値。

テンプレート変数を作成後、その変数を使用しているソースの数がDatadog に表示されます。下の例では、2 つのグラフの内の 1 つでテンプレート変数が使用されています。

{{< img src="graphing/dashboards/template_variables/stats_tv.png" alt="統計的 TV"  style="width:85%;">}}

個々のウィジェットで[テンプレート変数を使用](#use) するか、**Add to All** オプションをクリックします。すべてのウィジェットからテンプレート変数を削除するには、**Remove From All** オプションをクリックします。

### ログと APM クエリ

メトリクスとログ、APM は同じタグを共有するため、テンプレート変数はログおよび APM ウィジェットと共に作用します。
さらに、[ログ][2]または APM ファセットに基づきログまたは APM テンプレート変数を定義することができます。これらの変数の先頭には、`@` が付きます（例: `@http.status_code`）。

**注**: このタイプのテンプレート変数に **Add to all** を使用すると、すべてのログと APM ウィジェットに変数が追加されます。

### 保存済みビュー

#### 作成

{{< img src="graphing/dashboards/template_variables/default_view.png" alt="デフォルトの保存済みビュー"  style="width:85%;">}}

ダッシュボードのテンプレート変数の左側に *(Default Value)* と付いたドロップダウンリストがあります。テンプレート変数値を変更する場合、その値は自動的にビューに保存されません。
ビューでテンプレート変数の現在値を保存するには、ドロップダウンメニューをクリックし、*Save selections as view* をクリックします。次に、そのビュー固有の名前を入力するよう指示されます。保存すると、このビューはドロップダウンメニューに表示されます。テンプレート変数の過去に保存された値を取り出すには、このビューをクリックして下さい、

#### Delete

ビューを削除するには、保存済みビューのドロップダウンをクリックし、*Manage views...* を選択します。それぞれのビューの横に、保存されているビューのポップアップがごみ箱アイコンとともに表示されます。ビューを削除するには、該当するごみ箱アイコンをクリックして下さい。

{{< img src="graphing/dashboards/template_variables/manage_views.png" alt="ポップアップビューの管理"  style="width:75%;">}}

#### 変更

*(Default Value)* のビューを変更するには、鉛筆アイコンをクリックし、テンプレート変数値を更新します。次に、*Done* をクリックして保存します。他のビューのいずれかの値を変更する場合、値を新規のビューとして保存し、元のビューを削除します。

## 使用

テンプレート変数は、ウィジェットとイベントオーバーレイに使用されます。

### ウィジェット

ウィジェットを作成または編集する場合、既存のテンプレート変数が `from` フィールドにオプションとして表示されます。例えば、テンプレート変数 `env` を作成する場合、オプション `$env` が利用可能です。

ウィジェットが保存されると、テンプレート変数の値はダッシュボードの上から選択されたものとなります。

{{< img src="graphing/dashboards/template_variables/selecting_template_variables.png" alt="Selecting template variables"  style="width:75%;">}}

#### テキスト

テキストベースのウィジェットには、テンプレート変数の名前と値を `$<テンプレート変数名>` と共に、または値だけを `$<テンプレート変数名>` と共に表示できます。例として、名前が `env`、選択された値が `dev` のテンプレート変数の場合、

* `$env` には `env:dev` と表示されます
* `$env.value` には `dev` が表示されます

### イベントオーバーレイ

ダッシュボードでメトリクス付きの特定タグを共有するイベントを探すには、テンプレート変数で[イベントオーバーレイ][3]検索をします。

イベント検索フィールドで `$<TEMPLATE_VARIABLE_KEY>.value` 構文を使用すると、ダッシュボードテンプレート変数の値を直接キャプチャできます。

**注**: ダッシュボードのテンプレート変数は、イベントタグではなく、メトリクスタグである必要があります。

#### ダッシュボード  

ダッシュボードから、以下のフォーマットを用いたテンプレート変数のイベントストリームを検索します。

```
tags:<タグキー>:$<テンプレートの変数名>.value
```

例えば、`tags:region:$region.value` を、`region` テンプレート変数についての `us-east1` の値で検索すると、`region:us-east1` でタグ付けされたイベントが表示されます。さらに、イベントのタイミングがグラフ上にピンクのバーで示されます。

{{< img src="graphing/dashboards/template_variables/search_dashboard.png" alt="検索ダッシュボード"  style="width:85%;">}}

複数のテンプレート変数で検索するには、コンマを入れます（例: `tags:role:$role.value,env:$env.value`）

**注**: 検索を実行する際に *enter* を押すと、`$region.value` がテンプレート変数ドロップダウンの値に更新されます。

#### ウィジェット

以下のフォーマットで、ウィジェットからテンプレート変数を使用したイベントのタイミングをオーバーレイします。

```
tags:$<テンプレートの_変数名>
```

例えば、イベントオーバーレイ検索ボックスに `tags:$region` と入力して、`region` テンプレート変数ドロップダウンにある値のイベントを検索します。

{{< img src="graphing/dashboards/template_variables/search_widget.png" alt="検索ウィジェット"  style="width:85%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tagging/#defining-tags
[2]: /ja/logs/explorer/?tab=facets#setup
[3]: /ja/graphing/dashboards/timeboard/#events