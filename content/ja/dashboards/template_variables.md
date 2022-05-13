---
aliases:
- /ja/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /ja/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /ja/graphing/dashboards/template_variables/
further_reading:
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: ブログ
  text: 関連するテンプレート変数を使用してダッシュボードを調整
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: ブログ
  text: 動的テンプレート変数構文でダッシュボードのワークフローを高速化
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: ブログ
  text: テンプレート変数で利用可能な値でダッシュボードのフィルタリングを高速化
- link: /dashboards/
  tag: Documentation
  text: Datadog でダッシュボードを作成
- link: /dashboards/sharing/
  tag: ドキュメント
  text: Datadogの外部でグラフを共有
- link: /dashboards/widgets/
  tag: ドキュメント
  text: ダッシュボードのウィジェットについて
kind: documentation
title: テンプレート変数
---

テンプレート変数により、ダッシュボード内の 1 つ以上のウィジェットを動的にフィルタリングすることができます。

## 作成

ダッシュボードに最初のテンプレート変数を作成するには、**Add Template Variables** をクリックします。テンプレート変数が既に定義されている場合は、*鉛筆* アイコンをクリックしてテンプレート変数エディタを開きます。編集モードで**Add Variable +** をクリックしてテンプレート変数を追加します。

テンプレート変数は、以下のように定義されます。

* **Tag or Attribute**:
    * Tag: 推奨される[タグ付けフォーマット][1] (`<KEY>:<VALUE>`) に従う場合、*Tag* は `<KEY>` となります。
    * Attribute: [テンプレート変数のファセットまたはメジャー](#logs-apm-and-rum-queries)を使用します。
* **Name**: ダッシュボード上のクエリに表示されるテンプレート変数の一意の名前です。テンプレート変数は、選択されたタグまたは属性の後に自動的に名前が付けられます。
* **Default Value**: ダッシュボードが読み込まれたときに自動的に表示されるタグまたは属性の値です。デフォルトは `*` です。
* **Available Values**: ドロップダウンで選択可能なタグまたは属性の値です。デフォルトは `(all)` です。利用可能な値のリストには、常に `*` が含まれており、タグや属性の全ての値をクエリすることができます。

テンプレート変数を作成すると、Datadog はその変数を使用しているソースの数を表示します。以下の例では、テンプレート変数 `team` がダッシュボード上の 2 つのグラフで使用されています。

{{< img src="dashboards/template_variables/stats_tv_modal.png" alt="複数の変数が設定されたテンプレート変数" style="width:90%;">}}

個々のウィジェットで[テンプレート変数を使用](#use) するか、**Add to All** オプションをクリックします。すべてのウィジェットからテンプレート変数を削除するには、**Remove From All** オプションをクリックします。

### ログ、APM、RUM クエリ

テンプレート変数はログ、APM、RUM ウィジェットと連動しています。これはメトリクス、ログ、APM、および RUM が同じタグを共有しているためです。
ログ、APM、RUM のテンプレート変数は[ログ][2]、APM、[RUM][3] ファセットに基づいて定義することができます。これらの変数は `@http.status_code` のように `@` から始まる値となります。

ログ、APM、および RUM ウィジェットでは、値の途中でワイルドカードを使用したり (たとえば、`eng*@example.com`)、値の中で複数のワイルドカードを使用したり (たとえば、`*prod*`) することが可能です。

**注**: このタイプのテンプレート変数に **Add to all** を適用すると、すべてのログ、APM、RUM ウィジェットに変数が追加されます。

### 保存済みビュー

#### 作成

{{< img src="dashboards/template_variables/default_view.png" alt="デフォルトの保存済みビュー" style="width:85%;">}}

ダッシュボードでは、テンプレート変数画面の左側に *(Default Value)* というドロップダウンリストが表示されています。テンプレート変数の値を変更しても、その値はビューに自動保存されません。
ビューでテンプレート変数の現在値を保存するには、ドロップダウンメニューをクリックし、*Save selections as view* をクリックします。次の画面でビューに一意の名前を入力し、保存するとそのビューがドロップダウンメニューに表示されます。過去に保存したテンプレート変数の値を復元する場合は、ここから該当するビューをクリックします。

#### 削除

ビューを削除するには、保存済みビューのドロップダウンをクリックし、*Manage views...* を選択します。それぞれのビューの横に、保存されているビューのポップアップがごみ箱アイコンとともに表示されます。ビューを削除するには、該当するごみ箱アイコンをクリックして下さい。

{{< img src="dashboards/template_variables/manage_views.png" alt="「Manage Views」ポップアップ" style="width:75%;">}}

#### 変更

*(Default Value)* のビューを変更するには、鉛筆アイコンをクリックしてテンプレート変数の値を更新します。次に、*Done* をクリックして保存します。他のビューで値を更新した場合は、その値を新規のビューとして保存し、元のビューを削除します。

## 使用

テンプレート変数は、ウィジェットとイベントオーバーレイに使用されます。

### ウィジェット

ウィジェットを作成または編集する場合、既存のテンプレート変数が `from` フィールドにオプションとして表示されます。例えば、テンプレート変数 `env` を作成する場合、オプション `$env` が利用可能です。

ウィジェットが保存されると、テンプレート変数の値はダッシュボードの上から選択されたものとなります。

{{< img src="dashboards/template_variables/selecting_template_variables.png" alt="テンプレート変数を選択" style="width:75%;">}}

接頭辞や接尾辞だけをもとにクエリするには、テンプレート変数の値の最初か最後にワイルドカード文字 (`*`) を使用します。例えば、 `us*` を使って `us` で始まるすべての地域を検索したり、 `*@example.com` を使って `example.com` ドメインに属するすべてのメールを検索したりできます。

テンプレート変数の値を変更する場合、ダッシュボード URL はそのテンプレート変数の値を反映するよう、`&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>` というフォーマットで更新されます。たとえば、テンプレート変数が `$env` のダッシュボードで値が `prod` に変更された場合、URL のパラメーターは `&tpl_var_env=prod` となります。

値だけをクエリに含めるには、`{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value` という構文を使用します。例えば、`env` という名前のテンプレート変数では、 `environment:$env.value` を使用します。

#### 関連するテンプレート変数
テンプレート変数の値を選択するときに、**Associated Values** および **Other Values** セクションが表示されます。Associated Values はページで選択されたその他のテンプレート変数の値から計算され、コンフィギュレーションなしで関連する値をシームレスに示します。

{{< img src="dashboards/template_variables/associated_template_variables.png" alt="関連するテンプレート変数" style="width:75%;">}}

#### テキスト

テキストベースのウィジェットでは、テンプレート変数のタグ/属性と値を `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>` で、キーだけを `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.key` で、または値だけを `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value` で表示させることができます。これは、英数字でない任意の文字の後に来ることができ、空白や以下の文字のいずれかが続くことができます: `#`、`{TX-PL-LABEL}#x60;、`%`、`=`、`;`、`"`、`(`、`)`、`[`、`]`、`{`、`}`、`^`、`*`、`+`、`|`、`?`

例えば、テンプレート変数が `env` で、タグ/属性が `environment` で、選択値が `dev` である場合:
* `$env` には `environment:dev` と表示されます
* `$env.key` には `environment` と表示されます
* `$env.value` には `dev` が表示されます

### イベントオーバーレイ

ダッシュボードで特定のタグとメトリクスに紐付くイベントを検索するには、テンプレート変数のイベントオーバーレイ検索が便利です。イベントオーバーレイ検索は個別のグラフに適用されます。

イベント検索フィールドで `$<TEMPLATE_VARIABLE_KEY>.value` 構文を使用すると、ダッシュボードテンプレート変数の値を直接キャプチャできます。

**注**: ダッシュボードのテンプレート変数は、イベントタグではなく、メトリクスタグである必要があります。

#### ダッシュボード  

ダッシュボードから、以下のフォーマットを使用してテンプレート変数を持つイベントを検索します。

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

例えば、`region:$region.value` を、`region` テンプレート変数についての `us-east1` の値で検索すると、`region:us-east1` でタグ付けされたイベントが表示されます。さらに、イベントのタイミングがグラフ上にピンクのバーで示されます。

複数のテンプレート変数で検索するには、コンマを入れます（例: `role:$role.value,env:$env.value`）

**注**: 検索を実行する際に *enter* を押すと、`$region.value` がテンプレート変数ドロップダウンの値に更新されます。

#### ウィジェット

以下のフォーマットで、ウィジェットからテンプレート変数を使用したイベントのタイミングをオーバーレイします。

```text
$<TEMPLATE_VARIABLE_NAME>
```

例えば、イベントオーバーレイ検索ボックスに `$region` と入力して、`region` テンプレート変数ドロップダウンにある値のイベントを検索します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/#defining-tags
[2]: /ja/logs/explorer/facets/
[3]: /ja/real_user_monitoring/explorer/?tab=facets#setup-facets-measures