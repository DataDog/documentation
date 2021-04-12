---
title: テンプレート変数
kind: documentation
aliases:
  - /ja/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
  - /ja/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
  - /ja/graphing/dashboards/template_variables/
further_reading:
  - link: 'https://www.datadoghq.com/blog/template-variable-associated-values/'
    tag: ブログ
    text: 関連するテンプレート変数を使用してダッシュボードを調整
  - link: /dashboards/
    tag: ドキュメント
    text: Datadog でダッシュボードを作成
  - link: /dashboards/sharing/
    tag: ドキュメント
    text: Datadogの外部でグラフを共有
  - link: /dashboards/widgets/
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
    * Attribute: [テンプレート変数のファセットまたはメジャー](#logs-apm-and-rum-queries)を使用します。
* **Default Value**:
    テンプレート変数のタグまたは属性のデフォルト値。

テンプレート変数を作成後、その変数を使用しているソースの数がDatadog に表示されます。下の例では、2 つのグラフの内の 1 つでテンプレート変数が使用されています。

{{< img src="dashboards/template_variables/stats_tv.png" alt="テンプレート変数の統計"  style="width:85%;">}}

個々のウィジェットで[テンプレート変数を使用](#use) するか、**Add to All** オプションをクリックします。すべてのウィジェットからテンプレート変数を削除するには、**Remove From All** オプションをクリックします。

### ログ、APM、RUM クエリ

テンプレート変数はログ、APM、RUM ウィジェットと連動しています。これはメトリクス、ログ、APM、および RUM が同じタグを共有しているためです。
ログ、APM、RUM のテンプレート変数は[ログ][2]、APM、[RUM][3] ファセットに基づいて定義することができます。これらの変数は `@http.status_code` のように `@` から始まる値となります。

**注**: このタイプのテンプレート変数に **Add to all** を適用すると、すべてのログ、APM、RUM ウィジェットに変数が追加されます。

### 保存済みビュー

#### 作成

{{< img src="dashboards/template_variables/default_view.png" alt="デフォルトの保存済みビュー"  style="width:85%;">}}

ダッシュボードでは、テンプレート変数画面の左側に *(Default Value)* というドロップダウンリストが表示されています。テンプレート変数の値を変更しても、その値はビューに自動保存されません。
ビューでテンプレート変数の現在値を保存するには、ドロップダウンメニューをクリックし、*Save selections as view* をクリックします。次の画面でビューに一意の名前を入力し、保存するとそのビューがドロップダウンメニューに表示されます。過去に保存したテンプレート変数の値を復元する場合は、ここから該当するビューをクリックします。

#### 削除

ビューを削除するには、保存済みビューのドロップダウンをクリックし、*Manage views...* を選択します。それぞれのビューの横に、保存されているビューのポップアップがごみ箱アイコンとともに表示されます。ビューを削除するには、該当するごみ箱アイコンをクリックして下さい。

{{< img src="dashboards/template_variables/manage_views.png" alt="「Manage Views」ポップアップ"  style="width:75%;">}}

#### 変更

*(Default Value)* のビューを変更するには、鉛筆アイコンをクリックしてテンプレート変数の値を更新します。次に、*Done* をクリックして保存します。他のビューで値を更新した場合は、その値を新規のビューとして保存し、元のビューを削除します。

## 使用

テンプレート変数は、ウィジェットとイベントオーバーレイに使用されます。

### ウィジェット

ウィジェットを作成または編集する場合、既存のテンプレート変数が `from` フィールドにオプションとして表示されます。例えば、テンプレート変数 `env` を作成する場合、オプション `$env` が利用可能です。

ウィジェットが保存されると、テンプレート変数の値はダッシュボードの上から選択されたものとなります。

{{< img src="dashboards/template_variables/selecting_template_variables.png" alt="テンプレート変数を選択"  style="width:75%;">}}

#### 関連するテンプレート変数
テンプレート変数に値を選択する際、**Associated Values** と **Other Values** セクションが表示されます。関連する値は、ページに選択された他のテンプレート変数の値を考量して計算され、コンフィギュレーションせずに関連する値をシームレスに特定します。

{{< img src="dashboards/template_variables/associated_template_variables.png" alt="関連するテンプレート変数"  style="width:75%;">}}

#### テキスト

テキストベースのウィジェットには、テンプレート変数の名前と値を `$<テンプレート変数名>` と共に、または値だけを `$<テンプレート変数名>` と共に表示できます。例として、名前が `env`、選択された値が `dev` のテンプレート変数の場合、

* `$env` には `env:dev` と表示されます
* `$env.value` には `dev` が表示されます

### イベントオーバーレイ

ダッシュボードで特定のタグとメトリクスに紐付くイベントを検索するには、テンプレート変数の[イベントオーバーレイ][4]検索が便利です。イベントオーバーレイ検索は個別のグラフに適用されます。

イベント検索フィールドで `$<TEMPLATE_VARIABLE_KEY>.value` 構文を使用すると、ダッシュボードテンプレート変数の値を直接キャプチャできます。

**注**: ダッシュボードのテンプレート変数は、イベントタグではなく、メトリクスタグである必要があります。

#### ダッシュボード  

ダッシュボードから、以下のフォーマットを用いたテンプレート変数のイベントストリームを検索します。

```text
tags:<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

例えば、`tags:region:$region.value` を、`region` テンプレート変数についての `us-east1` の値で検索すると、`region:us-east1` でタグ付けされたイベントが表示されます。さらに、イベントのタイミングがグラフ上にピンクのバーで示されます。

{{< img src="dashboards/template_variables/search_dashboard.png" alt="検索ダッシュボード"  style="width:85%;">}}

複数のテンプレート変数で検索するには、コンマを入れます（例: `tags:role:$role.value,env:$env.value`）

**注**: 検索を実行する際に *enter* を押すと、`$region.value` がテンプレート変数ドロップダウンの値に更新されます。

#### ウィジェット

以下のフォーマットで、ウィジェットからテンプレート変数を使用したイベントのタイミングをオーバーレイします。

```text
tags:$<TEMPLATE_VARIABLE_NAME>
```

例えば、イベントオーバーレイ検索ボックスに `tags:$region` と入力して、`region` テンプレート変数ドロップダウンにある値のイベントを検索します。

{{< img src="dashboards/template_variables/search_widget.png" alt="検索ウィジェット"  style="width:85%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/#defining-tags
[2]: /ja/logs/explorer/facets/
[3]: /ja/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[4]: /ja/dashboards/timeboards/#events