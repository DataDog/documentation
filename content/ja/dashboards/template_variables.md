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

テンプレート変数を使用すると、ダッシュボード内の 1 つまたは複数のウィジェットを動的にフィルターできます。テンプレート変数の選択から保存ビューを構築することができ、ドロップダウン選択によって視覚化を整理して操作することができます。

テンプレート変数は、以下のように定義されます。

* **Tag or Attribute**:
    * Tag: 推奨される[タグ付けフォーマット][1] (`<KEY>:<VALUE>`) に従う場合、*Tag* は `<KEY>` となります。
    * Attribute: [テンプレート変数のファセットまたはメジャー](#logs-apm-and-rum-queries)を使用します。
* **Name**: ダッシュボード上のクエリに表示されるテンプレート変数の一意の名前です。テンプレート変数は、選択されたタグまたは属性の後に自動的に名前が付けられます。
* **Default Value**: ダッシュボードが読み込まれたときに自動的に表示されるタグまたは属性の値です。デフォルトは `*` です。
* **Available Values**: ドロップダウンメニューで選択可能なタグまたは属性の値です。デフォルトは `(all)` です。利用可能な値のリストには、常に `*` が含まれており、タグや属性の全ての値をクエリすることができます。

## テンプレート変数の追加

ダッシュボードにテンプレート変数を追加するには
1. **Add Template Variables** をクリックします。
1. テンプレート変数がすでに定義されている場合は、*鉛筆*アイコンをクリックしてテンプレート変数エディタを開きます。
1. 編集モードで、**+ Add Template Variable** をクリックして、新しいテンプレート変数を作成します。
1. (オプション) テンプレート変数を作成すると、Datadog はその変数を使用しているソースの数を表示します。以下の例では、テンプレート変数 `team` がダッシュボード上の 2 つのグラフで使用されています。
{{< img src="dashboards/template_variables/stats_tv_modal.png" alt="複数の変数が設定されたテンプレート変数" style="width:90%;">}}
1. (オプション) このテンプレート変数をすべてのウィジェットフィルターに追加するには、**Add to All** オプションをクリックします。個々のウィジェットで[テンプレート変数をカスタマイズする](#usage)こともできます。
1. (オプション) すべてのウィジェットからテンプレート変数を削除するには、**Remove From All** オプションをクリックします。

## 保存ビュー

{{< img src="dashboards/template_variables/saved_views.mp4" alt="保存ビューの作成、削除、変更方法について説明します" style="width:100%;" video="true">}}

### 作成

ダッシュボードのテンプレート変数の左側にある **Saved Views** ドロップダウンメニューをクリックします。テンプレート変数の値を更新しても、その値が自動的にビューに保存されるわけではありません。

現在のテンプレート変数の値をビューに保存するには、**Saved Views** ドロップダウンメニューから **Save selections as view** を選択します。ビューの一意な名前を入力し、**Save** をクリックします。

保存ビューがドロップダウンメニューに表示されます。ビューをクリックすると、以前に保存したテンプレート変数の値が表示されます。

### 削除

ビューを削除するには、保存ビューのドロップダウンメニューをクリックし、**Manage views...** を選択します。それぞれのビューの横に、保存されているビューのポップアップがごみ箱アイコンとともに表示されます。ビューを削除するには、該当するごみ箱アイコンをクリックして下さい。

### 変更

**Default view** を変更するには、鉛筆アイコンをクリックしてテンプレート変数の値を更新します。次に、**Done** をクリックして保存します。他のビューで値を更新した場合は、その値を新規のビューとして保存し、元のビューを削除します。

## 使用方法

テンプレート変数は、ウィジェットとイベントオーバーレイに使用されます。

### ログ、APM、RUM クエリ

テンプレート変数は、ログ、APM、および RUM ウィジェットで動作します。ファセットに基づいて、ログ、APM、RUM のテンプレート変数を定義することができます。これらの変数は `@` で始まり、例えば `@http.status_code` のようになります。

ログ、APM、および RUM ウィジェットでは、値の途中でワイルドカードを使用したり (たとえば、`eng*@example.com`)、値の中で複数のワイルドカードを使用したり (たとえば、`*prod*`) することが可能です。

**注**: このタイプのテンプレート変数に **Add to all** を適用すると、すべてのログ、APM、RUM ウィジェットに変数が追加されます。

### ウィジェット

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

#### ウィジェット

以下のフォーマットで、ウィジェットからテンプレート変数を使用したイベントのタイミングをオーバーレイします。

```text
$<TEMPLATE_VARIABLE_NAME>
```

例えば、イベントオーバーレイ検索ボックスに `$region` と入力して、`region` テンプレート変数ドロップダウンメニューにある値のイベントを検索します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/#defining-tags
[2]: /ja/logs/explorer/facets/
[3]: /ja/real_user_monitoring/explorer/?tab=facets#setup-facets-measures