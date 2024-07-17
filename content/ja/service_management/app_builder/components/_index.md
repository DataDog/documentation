---
disable_toc: true
further_reading:
- link: /service_management/app_builder/tables/
  tag: Documentation
  text: Tables
- link: /service_management/app_builder/build/
  tag: Documentation
  text: Build Apps
- link: /service_management/app_builder/expressions/
  tag: Documentation
  text: JavaScript Expressions
kind: documentation
title: Components
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では App Builder はサポートされていません。</div>
{{< /site-region >}}

このページでは、App Builder でアプリを作成する際に使用できる UI コンポーネントのリストを提供します。

多くのコンポーネントプロパティでは、提供された値から選択することができます。プロパティの値に式を使用する場合は、プロパティの横にある **&lt;/&gt;** をクリックしてコードエディタを使用します。App Builder で JavaScript を使用する詳細については、[JavaScript 式][7]を参照してください。
<br><br>

{{% collapse-content title="Button" level="h3" %}}
Button コンポーネントには、次のプロパティがあります。

### General

Label
: ボタンに表示されるテキスト。<br>
**値**: 文字列または式

### Appearance

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

### Events

Event
: **値**: click

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、open url、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### Example

このコンポーネントをコンテキストで表示するには、[Metrics Explorer &amp; Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="Callout value" level="h3" %}}
Callout value コンポーネントには、次のプロパティがあります。

### General

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

### Appearance

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

### Example

このコンポーネントをコンテキストで表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Checkbox" level="h3" %}}
Checkbox コンポーネントには、次のプロパティがあります。

### General

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
: チェックボックスのテキストを改行するか、省略記号で切り捨てるかを決定します。<br>
**提供される値**: on、off

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change<br>

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="24Container" level="h3" %}}
Container コンポーネントには、次のプロパティがあります。

### 外観

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Date range picker" level="h3" %}}
Date range picker コンポーネントには、次のプロパティがあります。

### 一般

Default timeframe
: 日付ピッカーが表示するデフォルトの時間枠。<br>
**提供される値**: 過去 5 分、過去 30 分、過去 1 時間、過去 4 時間、過去 1 日

### 外観

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="JSON input" level="h3" %}}
JSON input コンポーネントには、次のプロパティがあります。

### 一般

Label
: コンポーネントの上部に表示されるテキスト。

デフォルト値
: コンポーネントが表示するデフォルトの JSON 値。

### 外観

Is Read Only
: コンポーネントを読み取り専用にするかどうかを指定します。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: change

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="Modal" level="h3" %}}
Modal コンポーネントには、次のプロパティがあります。

### 一般

Title
: モーダルのタイトル。<br>
**値**: 文字列または式

### 外観

Size
: モーダルのスケール。<br>
**提供される値**: sm、md、lg

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### イベント

Event
: **値**: toggleOpen、close、open

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Number input" level="h3" %}}
Number input コンポーネントには、次のプロパティがあります。

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値** : 文字列または式

デフォルト値
: アプリが入力ボックスに入力するデフォルト値。<br>
**値**: 数値または数値として評価される式

Placeholder text
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

### バリデーション

Min
: 数値入力が受け付ける最小値。<br>
**値**: 数値または数値として評価される式

Max
: 数値入力が受け付ける最大値。<br>
**値** : 数値または数値として評価される式。

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
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### 例

このコンポーネントをコンテキストで表示するには、[ECS Task Manager][4] アプリのブループリントを参照してください。
{{% /collapse-content %}}




{{% collapse-content title="Radio" level="h3" %}}
Radio コンポーネントには、次のプロパティがあります。

### 一般

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Options
: ユーザーが選択できるラジオボタンのオプションのリスト。フォーマットはオブジェクトの配列で、各オブジェクトは `label` と `value` のキーと値のペアで構成されます。<br>
**値**: 式<br>
**例** :<br>
```json
${[
{
"label": "staging",
"value": "staging"
},
{
"label": "production",
"value": "production"
}
]}
```

デフォルト値
: ラジオがロードされたときに選択される値。<br>
**値**: 文字列または式

### Appearance

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### Events

Event
: **値**: change

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="Search" level="h3" %}}
Search コンポーネントには、次のプロパティがあります。

### General

デフォルト値
: アプリが検索ボックスに入力するデフォルト値。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていない場合に表示されるテキスト。<br>
**値**: 文字列または式

### Appearance

Size
: 検索コンポーネントのスケール。<br>
**提供される値**: sm、md、lg

Is Loading
: 読み込みインジケータを表示します。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### Events

Event
: **値**: change、submit

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### Example

このコンポーネントをコンテキストで表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Select" level="h3" %}}
Select コンポーネントには、次のプロパティがあります。

### General

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

### Appearance

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### Events

Event
: **値**: change

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### Example

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="Table" level="h3" %}}
Table コンポーネントには、次のプロパティがあります。

### General

Data source
: テーブルに表示するオブジェクトの配列。<br>
**値**: query、demo data、components

### Columns

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

### Pagination

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

### Appearance

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

### Events

Event
: **値**: pageChange、tableRowClick

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### Example

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。

テーブルの高度な機能の使用方法を示す例については、[テーブル][6]を参照してください。

{{% /collapse-content %}}



{{% collapse-content title="Text" level="h3" %}}
Text コンポーネントには、次のプロパティがあります。

### General

Content
: コンポーネントが表示する内容。<br>
**値**: 文字列または式

Content type
: テキストをレンダリングする方法を決定します。**Markdown** が選択されている場合、テキストコンポーネントは[基本的な Markdown 構文][8]をサポートし、他の場所にホストされている画像も含めることができます。<br>
**提供される値**: プレーンテキスト、Markdown

### Appearance

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

### Example

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
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

### Appearance

Is Disabled
: 無効なスタイリングを適用し、インタラクションを取り除きます。<br>
**提供される値**: on、off

Is Visible
: コンポーネントがエンドユーザーに見えるかどうかを決定します。編集モードでは、すべてのコンポーネントは表示されたままになります。<br>
**提供される値**: on、off

### Events

Event
: **値**: change、submit

Reaction
: **値**: custom、set component state、trigger query、open modal、close modal、download file

イベントの詳細については、[イベント][1]を参照してください。

### データの検査

プロパティと値のペアを JSON 形式で表示します。

### Example

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>質問やフィードバックがありますか？[Datadog Community Slack][5] の **#app-builder** チャンネルに参加してください。


[1]: /ja/service_management/app_builder/build/#events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://datadoghq.slack.com/
[6]: /ja/service_management/app_builder/components/tables/
[7]: /ja/service_management/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/