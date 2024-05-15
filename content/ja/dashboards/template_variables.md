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

## 概要

テンプレート変数により、ダッシュボード内の 1 つ以上のウィジェットを動的にフィルタリングできます。テンプレート変数の選択から保存ビューを構築し、ドロップダウン選択によって視覚化を整理して操作することができます。

テンプレート変数は、以下のように定義されます。

* **Tag or Attribute**:
    * Tag: 推奨される[タグ付けフォーマット][1] (`<KEY>:<VALUE>`) に従う場合、*Tag* は `<KEY>` となります。
    * Attribute: [テンプレート変数のファセットまたはメジャー](#logs-apm-and-rum-queries)を使用します。
* **Name**: ダッシュボード上のクエリに表示されるテンプレート変数の一意の名前です。テンプレート変数は、選択されたタグまたは属性の後に自動的に名前が付けられます。
* **Default Value**: ダッシュボードが読み込まれたときに自動的に表示されるタグまたは属性の値です。デフォルトは `*` です。
* **Available Values**: ドロップダウンメニューで選択可能なタグまたは属性の値です。デフォルトは `(all)` です。利用可能な値のリストには、常に `*` が含まれており、タグや属性の全ての値をクエリすることができます。

## テンプレート変数の追加

ダッシュボードにテンプレート変数を追加するには
1. **Add Variables** をクリックします。
1. テンプレート変数がすでに定義されている場合は、ダッシュボードのヘッダーにカーソルを合わせ、**Edit** ボタンをクリックして編集モードに入ります。
1. 編集モードで、**+ (プラス)** アイコンをクリックして、新しいテンプレート変数を作成します。
1. (オプション) タグを選択した後、**+ Configure Dropdown Values** ボタンをクリックして、変数名を変更し、デフォルト値または使用可能な値を設定します。
  {{< img src="dashboards/template_variables/add_template_variable_configure_dropdown_values.png" alt="Configure Dropdown Values ボタンを表示する Add Variable ポップオーバー" style="width:80%;" >}}

## テンプレート変数の編集

ダッシュボードでテンプレート変数を編集するには
1. ダッシュボードのヘッダーにある **Edit** ボタンをクリックします。
1. 編集モードで、テンプレート変数をクリックし、ポップオーバーで変更します。
1. ヘッダー内の変数を並べ替えるには、変数にカーソルを合わせ、ドラッグアイコンハンドルをクリックしてドラッグします。
  {{< img src="dashboards/template_variables/edit_template_variable_drag.png" alt="テンプレート変数編集モードのポップオーバーにドラッグアイコンが表示され、順序を並べ替えることができます" style="width:100%;" >}}

## テンプレート変数をウィジェットに適用する

ウィジェットクエリにテンプレート変数を追加するには
1. ダッシュボードのヘッダーにある **Edit** ボタンをクリックします。
1. 編集モードで、テンプレート変数をクリックして、そのポップオーバーを開きます。
1. **Select Widgets** をクリックして、ウィジェット選択モードに入ります。
1. バナーには、変数を使用しているソースの数が表示されます。以下の例では、テンプレート変数 `env` がダッシュボードの 20 個のグラフで使用されています。
  {{< img src="dashboards/template_variables/apply_template_variable_to_widgets.png" alt="テンプレート変数 'env’ を 20 個のウィジェットに適用する確認を表示するダッシュボードの例" style="width:100%;" >}}
1. 個々のウィジェットをクリックすると、テンプレート変数が補間されたグラフがプレビューされます。
1. グループ内のすべてのウィジェットを追加または削除するには、グループの右隅にあるチェックボックスを切り替えます。
1. ダッシュボード上のすべてのウィジェットを追加または削除するには、選択バナーの **Select All** または **Deselect All** をクリックします。
1. ウィジェット選択モードを終了するには、バナーの **Save** または **X** をクリックします。

## 保存ビュー

### 作成

ダッシュボードのテンプレート変数の左側にある **Saved Views** ドロップダウンメニューをクリックします。テンプレート変数の値を更新しても、その値が自動的にビューに保存されるわけではありません。

{{< img src="dashboards/template_variables/saved_views_dropdown_options.png" alt="選択したテンプレート変数をデフォルトビューまたは保存ビューとして設定する保存ビュードロップダウンオプション" style="width:90%;" >}}

現在のテンプレート変数の値をビューに保存するには、**Saved Views** ドロップダウンメニューから **Save selections as view** を選択します。ビューの一意な名前を入力し、**Save** をクリックします。

保存ビューがドロップダウンメニューに表示されます。ビューをクリックすると、以前に保存したテンプレート変数の値が表示されます。

### 削除

ビューを削除するには、保存ビューのドロップダウンメニューをクリックし、**Manage views...** を選択します。それぞれのビューの横に、保存されているビューのポップアップがごみ箱アイコンとともに表示されます。ビューを削除するには、該当するごみ箱アイコンをクリックして下さい。

### 変更

**Default view** を変更するには、鉛筆アイコンをクリックしてテンプレート変数の値を更新します。次に、**Done** をクリックして保存します。他のビューで値を更新した場合は、その値を新規のビューとして保存し、元のビューを削除します。

## API

テンプレート変数は、ウィジェットとイベントオーバーレイに使用されます。

### ログ、APM、RUM クエリ

テンプレート変数は、ログ、APM、および RUM ウィジェットで動作します。ファセットに基づいて、ログ、APM、RUM のテンプレート変数を定義することができます。これらの変数は `@` で始まり、例えば `@http.status_code` のようになります。

ログ、APM、および RUM ウィジェットでは、値の途中でワイルドカードを使用したり (たとえば、`eng*@example.com`)、値の中で複数のワイルドカードを使用したり (たとえば、`*prod*`) することが可能です。

**注**: このタイプのテンプレート変数に **Add to all** を適用すると、すべてのログ、APM、RUM ウィジェットに変数が追加されます。

### 分散型トレーシング

ウィジェットを作成または編集する場合、既存のテンプレート変数が `from` フィールドにオプションとして表示されます。例えば、テンプレート変数 `environment` を構成した場合、`$environment` オプションはウィジェット内の動的変数として利用できます。

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="Template variable can be set dynamically in widgets" style="width:100%;">}}

環境変数 `environment` に **production** を選択すると、`$environment` 変数を持つウィジェットが本番環境に動的にスコープされます。

テンプレート変数の値を変更する場合、ダッシュボード URL はそのテンプレート変数の値を反映するよう、`&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>` というフォーマットで更新されます。たとえば、テンプレート変数が `$env` のダッシュボードで値が `prod` に変更された場合、URL のパラメーターは `&tpl_var_env=prod` となります。

値をクエリに含めるには、`{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value` という構文で値を追加します。例えば、`service` という名前のテンプレート変数では、 `env:staging-$service.value` を使用します。

テンプレート変数のフィールドにカーソルを合わせると、その変数を使用するウィジェットがダッシュボード上でハイライト表示され、一目でわかります。

#### 関連するテンプレート変数

テンプレート変数の値を選択すると、セレクターの上部に関連値が表示されます。関連値は、ページ上で選択されている他のテンプレート変数の値から計算され、構成することなくシームレスに関連値を識別することができます。

#### テキスト

テキストベースのウィジェットでは、テンプレート変数のタグ/属性と値を `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>` で、キーを `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.key` で、または値を `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value` で表示させることができます。これは、英数字でない任意の文字の後に来ることができ、空白や以下の文字のいずれかが続くことができます: `#`、`{TX-PL-LABEL}#x60;、`%`、`=`、`;`、`"`、`(`、`)`、`[`、`]`、`{`、`}`、`^`、`*`、`+`、`|`、`?`

**注**: ワイルドカード構文は、テンプレート変数の後にはサポートされていません。

例えば、テンプレート変数が `env` で、タグ/属性が `environment` で、選択値が `dev` である場合:
* `$env` には `environment:dev` と表示されます
* `$env.key` には `environment` と表示されます
* `$env.value` には `dev` が表示されます
* `dev{dynamic-wildcard-value}` ではなく、`$env*` は `dev*` という正確な値を探します。

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

**注**: 検索を実行する際に *enter* を押すと、`$region.value` がテンプレート変数ドロップダウンメニューの値に更新されます。

#### 分散型トレーシング

以下のフォーマットで、ウィジェットからテンプレート変数を使用したイベントのタイミングをオーバーレイします。

```text
$<TEMPLATE_VARIABLE_NAME>
```

例えば、イベントオーバーレイ検索ボックスに `$region` と入力して、`region` テンプレート変数ドロップダウンメニューにある値のイベントを検索します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/#define-tags
[2]: /ja/logs/explorer/facets/
[3]: /ja/real_user_monitoring/explorer/?tab=facets#setup-facets-measures