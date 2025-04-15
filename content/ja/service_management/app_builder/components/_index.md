---
disable_toc: true
further_reading:
- link: /service_management/app_builder/tables/
  tag: ドキュメント
  text: テーブル
- link: /service_management/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
- link: /service_management/app_builder/expressions/
  tag: ドキュメント
  text: JavaScript 式
title: コンポーネント
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では App Builder はサポートされていません。</div>
{{< /site-region >}}

このページでは、App Builder でアプリを作成する際に使用できる UI コンポーネントのリストを提供します。

多くのコンポーネントプロパティでは、提供された値から選択することができます。プロパティの値に式を使用する場合は、プロパティの横にある **&lt;/&gt;** をクリックしてコードエディタを使用します。App Builder で JavaScript を使用する詳細については、[JavaScript 式][7]を参照してください。
<br><br>

{{% collapse-content title="Button" level="h3" %}}
Button コンポーネントには、次のプロパティがあります。

### 一般

Label
: ボタンに表示されるテキスト。<br>
**値**: 文字列または式

### 外観

Intent
: ボタンの色を制御し、色はボタンの目的を表します。<br>
**提供される値**: default、danger、success、warning

Is Primary
: 指定されたページまたはワークフローの最も重要なアクションにユーザーの注意を喚起するように設計されています。<br>
**提供される値**: on、off

Is Borderless
: ボタンからボーダーを取り除きます。カーソルを合わせると、背景が塗りつぶされます。<br>
**提供される値**: on、off

Is Loading
: 読み込みインジケータを表示します。<br>
**提供される値**: on、off

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: click

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, open url, download file, set state variable value

State Function
: fetch<br>
**例**: [events][9] を参照してください。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer &amp; Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="Callout value" level="h3" %}}
Callout value コンポーネントには、次のプロパティがあります。

### 一般

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Value
: コールアウトがハイライトする値。<br>
**値**: 文字列または式

Unit
: 値に関連付けられた単位。<br>
**値**: 文字列または式

### Style

Style
: コンポーネントのビジュアルスタイル。<br>
**提供される値**: default、success、warning、danger、blue、purple、pink、orange、yellow、red、green、gray、vivid blue、vivid purple、vivid pink、vivid orange、vivid yellow、vivid red、vivid green

Size
: 値の大きさに比例するように、メトリクスをレスポンシブにサイズ調整します。<br>
**提供される値**: sm、md、lg、xl

### 外観

Is Loading
: 読み込みインジケータを表示します。<br>
**提供される値**: on、off

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Checkbox" level="h3" %}}
Checkbox コンポーネントには、次のプロパティがあります。

### 一般

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Options
: ユーザーが選択できるチェックボックスのリスト。形式はオブジェクトの配列で、各オブジェクトは `label` と `value` のキーと値のペアで構成されます。オプションの最小数は 1 です。<br>
**値**: 式<br>
**例**:<br>
: ```json
  ${[
    {
        "label": "Staging",
        "value": "staging"
    },
    {
        "label": "Production",
        "value": "production"
    }
  ]}
  ```

### 外観

Is Multiline
: チェックボックスのテキストが新しい行に折り返されるか、エリプシス (…) で省略されるかを決定します。<br>
**指定可能な値**: on, off

Is Disabled
: 無効 (disabled) スタイルを適用し、ユーザーとのやりとりを無効にします。<br>
**指定可能な値**: on, off

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### イベント

Event
: **値**: change<br>

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: fetch<br>
**例**: [events][9] を参照

イベントの詳細については、[Events][1] を参照してください。

### データの確認

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントがどのように使われているかを見るには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Container" level="h3" %}}
コンテナ (Container) コンポーネントには以下のプロパティがあります。

### 外観

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### データの確認

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントがどのように使われているかを見るには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Custom chart" level="h3" %}}
カスタムチャート (Custom chart) コンポーネントには以下のプロパティがあります。

### 一般

Vega Specification
: 有効な Vega-Lite または Vega の JSON 仕様を表す文字列です。

### 外観

Is Loading
: ローディングインジケーターを表示します。<br>
**指定可能な値**: on, off

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### データの確認

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントの使い方の例については、[Custom charts][10] を参照してください。

{{% /collapse-content %}}



{{% collapse-content title="Date range picker" level="h3" %}}
Date range picker コンポーネントには以下のプロパティがあります。

### 一般

Default timeframe
: Date picker がデフォルトで表示する期間です。<br>
**指定可能な値**: past 5 minutes, past 30 minutes, past 1 hour, past 4 hours, past 1 day

### 外観

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### イベント

Event
: **値**: change

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file

State Function
: fetch<br>
**例**: [events][9] を参照

イベントの詳細については、[Events][1] を参照してください。

### データの確認

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントがどのように使われているかを見るには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="File input" level="h3" %}}
File input コンポーネントには以下のプロパティがあります。

### 一般

Accepted File Types
: File input コンポーネントが受け付けるファイルタイプを指定します。<br>
**値**: .csv, .json

### 外観

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### イベント

Event
: **値**: change

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: fetch<br>
**例**: [events][9] を参照

イベントの詳細については、[Events][1] を参照してください。

### データの確認

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="Form" level="h3" %}}
フォーム (Form) コンポーネントには以下のプロパティがあります。

### 一般

Title
: フォームのタイトルです。<br>
**値**: 文字列または式

Default value
: フォームにあらかじめ入力される値です。特定のフィールドを指定して値を設定する場合は、`{"org":"frontend"}` のように JSON 記法を使って `org` フィールドに `frontend` を設定できます。<br>
**値**: 文字列または式

### フィールド

各項目はフォーム内のフィールドを表し、`textInput`, `select`, `textArea`, もしくは `text` のいずれかのタイプを持ちます。

フィールドはタイプに応じて、以下のいずれか、または複数のプロパティを持ちます:

Field name
: フィールドの一意の識別子です。式の中でこの識別子を使ってフィールドを参照できます。<br>
**値**: 文字列または式

Label
: フィールドの上に表示されるラベルです。<br>
**値**: 文字列または式

Content
: `text` フィールドで表示される内容です。<br>
**値**: 文字列または式

Options
: `select` フィールドで利用できる選択肢の配列です。各オブジェクトにはオプションの値を表す `const` キーと、オプションのラベルを表す `title` キーを含めることができます。<br>**値**: 各オブジェクトの `label` と `value` は 文字列または式<br>
GUI (デフォルト) を使ってオブジェクトを入力するか、**Raw** をオンにして生の JSON を入力してオブジェクトの配列全体を指定できます。

Placeholder text
: `textInput` または `textArea` フィールドで、値が未入力のときに表示されるテキストです。<br>
**値**: 文字列または式

Is Disabled
: 無効 (disabled) スタイルを適用し、ユーザーとのやりとりを無効にします。<br>
**指定可能な値**: on, off

Is Visible
: フィールドがフォーム内で表示されるかどうかを決定します。<br>
**指定可能な値**: on, off

Is Required
: フォームを送信する際に必須となるかどうかを決定します。<br>
**指定可能な値**: on, off

### 外観

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

Is Disabled
: 無効 (disabled) スタイルを適用し、ユーザーとのやりとりを無効にします。<br>
**指定可能な値**: on, off

### イベント

Event
: **値**: submit, change, validate

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: setValue<br>
**例**: `form0.setValue({name: 'node-group-1'})` は `form0` コンポーネントの値を `{name: 'node-group-1'}` に設定します。

イベントの詳細については、[Events][1] を参照してください。

### データの確認

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="JSON input" level="h3" %}}
JSON input コンポーネントには以下のプロパティがあります。

### 一般

Label
: コンポーネントの上部に表示されるテキストです。

Default value
: コンポーネントにデフォルトで表示される JSON 値です。

### 外観

Is Read Only
: コンポーネントを読み取り専用にするかどうかを決定します。<br>
**指定可能な値**: on, off

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### イベント

Event
: **値**: change

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Function
: fetch<br>
**例**: [events][9] を参照

イベントの詳細については、[Events][1] を参照してください。

### データの確認

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="Modal" level="h3" %}}
モーダル (Modal) コンポーネントには以下のプロパティがあります。

### 一般

Title
: モーダルのタイトルです。<br>
**値**: 文字列または式

### 外観

Size
: モーダルのサイズです。<br>
**指定可能な値**: sm, md, lg

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### イベント

Event
: **値**: toggleOpen, close, open

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照
: setIsOpen<br>
**例**: `modal0.setIsOpen(true)` は `modal0` を開いた状態に設定します。

イベントの詳細については、[Events][1] を参照してください。

### データの確認

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントがどのように使われているかを見るには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Number input" level="h3" %}}
Number input コンポーネントには以下のプロパティがあります。

Label
: コンポーネントの上部に表示されるテキストです。<br>
**値**: 文字列または式

Default value
: アプリが入力ボックスにデフォルトで設定する値です。<br>
**値**: 数値、または数値を返す式

Placeholder text
: 値が未入力のときに表示されるテキストです。<br>
**値**: 文字列または式

### バリデーション

Min
: Number input が受け付ける最小値です。<br>
**値**: 数値、または数値を返す式

Max
: Number input が受け付ける最大値です。<br>
**値**: 数値、または数値を返す式

### 外観

Is Disabled
: 無効 (disabled) スタイルを適用し、ユーザーとのやりとりを無効にします。<br>
**指定可能な値**: on, off

Is Visible
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが常に表示されます。<br>
**指定可能な値**: on, off

### イベント

Event
: **値**: change

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照
: setValue<br>
**例**: `numberInput0.setValue(3)` は `numberInput0` コンポーネントの値を `3` に設定します。

イベントの詳細については、[Events][1] を参照してください。

### データの確認

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントがどのように使われているかを見るには、[ECS Task Manager][4] アプリのブループリントを参照してください。
{{% /collapse-content %}}




{{% collapse-content title="Radio" level="h3" %}}
Radio コンポーネントには以下のプロパティがあります。

### 一般

Label
: コンポーネントの上部に表示されるテキストです。<br>
**値**: 文字列または式

Options
: ユーザーが選択できるラジオボタンオプションのリストです。形式はオブジェクトの配列で、各オブジェクトは `label` と `value` キーを持ちます。<br>
**値**: 式<br>
**例**:<br>
: ```json
${[
{
"label": "Staging",
"value": "staging"
},
{
"label": "Production",
"value": "production"
}
]}
```

デフォルト値
: ラジオがロードされたときに選択される値。<br>
**値**: 文字列または式

### 外観

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照してください。
: setValue<br>
**例**: `radioButtons0.setValue("production")` は `radioButtons0` コンポーネントの値を `"production"` に設定します。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="Search" level="h3" %}}
Search コンポーネントには、次のプロパティがあります。

### 一般

デフォルト値
: アプリが検索ボックスに入力するデフォルト値。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていない場合に表示されるテキスト。<br>
**値**: 文字列または式

### 外観

Size
: 検索コンポーネントのスケール。<br>
**提供される値**: sm、md、lg

Is Loading
: 読み込みインジケータを表示します。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change、submit

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照してください。
: setValue<br>
**例**: `search0.setValue("search query")` は `search0` コンポーネントの値を `"search query"` に設定します。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Select" level="h3" %}}
Select コンポーネントには、次のプロパティがあります。

### 一般

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていない場合に表示されるテキスト。<br>
**値**: 文字列または式

Options
: ユーザーが選択できるオプションのリスト。フォーマットはオブジェクトの配列で、各オブジェクトは `label` と `value` のキーと値のペアで構成されます。<br>
**値**: 式<br>
**例**:<br>
: ```json
  ${[
    {
        "label": "Staging",
        "value": "staging"
    },
    {
        "label": "Production",
        "value": "production"
    }
  ]}
  ```

デフォルト値
: セレクトがロードされたときに選択される値。<br>
**値**: 文字列または式

Is Multiselect
: ユーザーが一度に複数のオプションを選択できるかどうかを決定します。<br>
**提供される値**: on、off

### 外観

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照してください。
: setValue<br>
**例**: `select0.setValue("staging")` は `select0` コンポーネントの値を `"staging"` に設定します。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="Tab" level="h3" %}}
Tab コンポーネントには以下のプロパティがあります。

### Tabs 

タブビューのリストです。追加のビューを作成するには **+ (プラス)** を使用します。


### Style

Style
: タブコンポーネントに使用される配色スタイルを指定します。<br>
**指定可能な値**: Default, purple, pink, orange, red, green

Alignment
: タブコンポーネント内でタブをどのように配置するかを指定します。<br>
**指定可能な値**: Horizontal (→), vertical (↓)

Impact
: 選択中のタブの背景色を全面に適用するか、下部の小さな帯だけに適用するかを制御します。<br>
**指定可能な値**: High, low


### 外観

Hide Tabs
: タブのマーカー (タブ自体) を表示するかどうかを制御します。<br>
**指定可能な値**: on, off

Hide Body
: タブの本体部分を表示するかどうかを制御します。<br>
**指定可能な値**: on, off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照してください。
: setTabIndex<br>
**例**: `tab0.setTabIndex(0)` は `tab0` コンポーネントを最初のタブに切り替えます。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}

{{% collapse-content title="Table" level="h3" %}}
Table コンポーネントには、次のプロパティがあります。

### 一般

Data source
: テーブルに表示するオブジェクトの配列。<br>
**値**: query、demo data、components

### 列

データソースからのデータの各列はここで表され、以下のプロパティを持ちます。

Label
: 列の上部に表示されるテキスト。<br>
**値**: 文字列または式

Data path
: 指定された列のオブジェクトや配列内に入れ子になっている値にアクセスするための JSON パス。<br>
**値**: 文字列または式

Formatting
: 列が取る形式の種類。<br>
**提供される値**: 文字列、リンク、ステータスピル、日付/時刻、マークダウン、タグ、パーセントバー、数値、スコアバー、アバター

Sortable
: ユーザーが列でソートできるかどうかを決定します。<br>
**提供される値**: on、off

一部の列には、**Formatting** プロパティに基づく追加プロパティがあります。

### ページ区切り

Has summary
: テーブルの真上にページネーションのサマリーを表示するかどうかを決定します。<br>
**提供される値**: on、off

Page size
: 表示するページあたりの行数。<br>
**値**: 数値または数値に評価される式

Total count
: 表に表示される行の総数。<br>
**値**: 数値または数値に評価される式

Type
: ページネーションのタイプを決定します。<br>
**提供される値**: client side、server side

### 行アクション

行アクションを追加すると、テーブルに **Actions** 列が追加され、ユーザー定義のアクションボタンが含まれます。これらのボタンは、以下のプロパティを持ちます。

Label
: アクションボタンに表示されるテキスト。<br>
**値**: 文字列または式

Primary
: 指定されたページまたはワークフローの最も重要なアクションにユーザーの注意を喚起するように設計されています。<br>
**提供される値**: on、off

Borderless
: 任意のボタンからボーダーを取り除きます。カーソルを合わせると、背景が塗りつぶされます。<br>
**提供される値**: on、off

Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Level
: ボタンの意図に従って色を制御します。<br>
**提供される値**: default、danger、success、warning

Reaction
: ボタンがトリガーするリアクションタイプ。
**値**: custom、set component state、trigger query、open modal、close modal、open url、download file

State Function
: fetch<br>
**例**: [events][9] を参照してください。

### 外観

Is Loading
: 読み込みインジケータを表示します。<br>
**提供される値**: on、off

Has text wrapping
: セルのテキストが折り返されるかどうかを指定します。<br>
**提供される値**: on、off<br>

Scrollable
: テーブルがどのような方法でスクロール可能かを決定します。<br>
**提供される値**: both、vertical

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: pageChange、tableRowClick

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照してください。
: setSelectedRow<br>
**例**: <ul><li>`table0.setSelectedRow(0)` は `table0` の `selectedRow` プロパティを最初の行に設定します。</li><li>`table0.setSelectedRow(null)` は `selectedRow` プロパティをクリアします。</li></ul>
: setPageIndex<br>
**例**: `table0.setPageIndex(0)` は `table0` の `pageIndex` プロパティを最初のページに設定します。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。

テーブルの高度な機能の使用方法を示す例については、[テーブル][6]を参照してください。

{{% /collapse-content %}}



{{% collapse-content title="Text" level="h3" %}}
Text コンポーネントには、次のプロパティがあります。

### 一般

Content
: コンポーネントが表示する内容。<br>
**値**: 文字列または式

Content type
: テキストをレンダリングする方法を決定します。**Markdown** が選択されている場合、テキストコンポーネントは[基本的な Markdown 構文][8]をサポートし、他の場所にホストされている画像も含めることができます。<br>
**提供される値**: プレーンテキスト、Markdown

### 外観

Text alignment
: コンポーネント内のテキストの水平方向の配置を決定します。<br>
**提供される値**: align left、align center、align right

Vertical alignment
: コンポーネント内のテキストの垂直方向の配置を決定します。<br>
**提供される値**: align top、align center、align bottom

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="Text area" level="h3" %}}
Text area コンポーネントには以下のプロパティがあります。

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value
: テキストエリアが読み込まれたときにデフォルトで選択される値を指定します。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていない場合に表示されるテキスト。<br>
**値**: 文字列または式

### 外観

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change、submit

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照してください。
: setValue<br>
**例**: `textArea0.setValue("text")` は `textArea0` コンポーネントの値を `"text"` に設定します。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}


{{% collapse-content title="Text input" level="h3" %}}
Text input コンポーネントには、次のプロパティがあります。

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value
: テキスト入力がロードされたときに選択される値。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていない場合に表示されるテキスト。<br>
**値**: 文字列または式

### 外観

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change、submit

Reaction
: **値**: custom, set component state, trigger query, open modal, close modal, download file, set state variable value

State Functions
: fetch<br>
**例**: [events][9] を参照してください。
: setValue<br>
**例**: `textInput0.setValue("text")` は `textInput0` コンポーネントの値を `"text"` に設定します。

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>質問やフィードバックがありますか？[Datadog Community Slack][5] の **#app-builder** チャンネルに参加してください。


[1]: /ja/service_management/app_builder/events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://datadoghq.slack.com/
[6]: /ja/service_management/app_builder/components/tables/
[7]: /ja/service_management/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /ja/service_management/app_builder/events/#state-functions
[10]: /ja/service_management/app_builder/components/custom_charts/