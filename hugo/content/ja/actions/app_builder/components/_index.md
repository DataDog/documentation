---
aliases:
- /ja/service_management/app_builder/components
description: App Builder UI コンポーネント (ボタン、フォーム、テーブル、チャート、インタラクティブ要素など) の総合リファレンスです。
disable_toc: true
further_reading:
- link: /actions/app_builder/components/tables/
  tag: ドキュメント
  text: テーブル
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
- link: /actions/app_builder/expressions/
  tag: ドキュメント
  text: JavaScript 式
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: ラーニングセンター
  text: App Builder を使用してサードパーティとのインテグレーション用のセルフサービスアプリを構築
title: コンポーネント
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

## 概要 {#overview}
このページには、App Builder でアプリを作成する際に使用できる UI コンポーネントのリストが掲載されています。

多くのコンポーネントプロパティでは、提供される値から選択できます。プロパティの値に式を使用する場合は、プロパティの横にある {{< ui >}}&lt;/&gt;{{< /ui >}} をクリックしてコードエディターを使用します。

イベントをトリガーできるすべてのコンポーネントには、[イベントとリアクション][13] で利用可能なリアクションのリストがあります。これらのコンポーネントは [カスタムリアクション][14] も使用できます。

App Builder での JavaScript の使用に関する詳細については、[JavaScript 式][7] を参照してください。コンポーネントをテンプレートとして保存する方法の詳細については、[再利用可能なモジュール][12] を参照してください。
<br>

## 利用可能なコンポーネント {#available-components}

{{% collapse-content title="ボタン" level="h3" %}}
ボタンコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general}

Label (ラベル)
: ボタンに表示されるテキストです。<br>
**値**: 文字列または式

#### Appearance (外観) {#appearance}

Intent (意図)
: ボタンの色を制御します。色はボタンの目的を表します。<br>
**提供される値**: default、danger、success、warning

Is Primary (主要)
: 指定されたページまたはワークフローの最も重要なアクションにユーザーが注目するように設計されています。<br>
**提供される値**: on、off

Is Borderless (枠線なし)
: ボタンの枠線を削除します。カーソルを合わせると背景が塗りつぶされます。<br>
**提供される値**: on、off

Is Loading (読み込み中)
: 読み込み中インジケーターを表示します。<br>
**提供される値**: on、off

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events}

Event (イベント)
: **値**: click

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

#### Inspect Data (データの検査) {#inspect-data}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="コールアウト値" level="h3" %}}
コールアウト値コンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-1}

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Value (値)
: コールアウトが強調する値。<br>
**値**: 文字列または式

Unit (単位)
: 値に関連付けられている単位。<br>
**値**: 文字列または式

#### スタイル {#style}

Style (スタイル)
: コンポーネントのビジュアルスタイル。<br>
**提供される値**: default、success、warning、danger、blue、purple、pink、orange、yellow、red、green、gray、vivid blue、vivid purple、vivid pink、vivid orange、vivid yellow、vivid red、vivid green

サイズ
: 値の大きさに比例するように、メトリクスをレスポンシブにサイズ調整します。<br>
**提供される値**: sm、md、lg、xl

#### Appearance (外観) {#appearance-1}

Is Loading (読み込み中)
: ローディングインジケーターを表示します。<br>
**提供される値**: on、off

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Inspect Data (データの検査) {#inspect-data-1}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-1}

このコンポーネントをコンテキストで表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="チェックボックス" level="h3" %}}
チェックボックスコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-2}

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Options (オプション)
: ユーザーが選択できるチェックボックスのリスト。形式はオブジェクトの配列です。これらの各オブジェクトは、`label` と `value` のキー値ペアで構成されます。オプションの最小数は 1 です。<br>
**値**: 式<br>
**例**:<br>
:     ```json
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

#### Appearance (外観) {#appearance-2}

Is Multiline (複数行)
: チェックボックスのテキストを新しい行に折り返すか、省略記号で切り詰めるかを決定します。<br>
**提供される値**: on、off

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-1}

Event (イベント)
: **値**: change<br>

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-2}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-2}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="コンテナ" level="h3" %}}
コンテナコンポーネントには、以下のプロパティがあります。

#### Appearance (外観) {#appearance-3}

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Inspect Data (データの検査) {#inspect-data-3}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-3}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="カスタムチャート" level="h3" %}}
カスタムチャートコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-3}

Vega Specification (Vega 仕様)
: 有効な Vega-Lite または Vega JSON 仕様を表す文字列。

#### Appearance (外観) {#appearance-4}

Is Loading (読み込み中)
: 読み込み中インジケーターを表示します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Inspect Data (データの検査) {#inspect-data-4}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-4}

このコンポーネントの使用方法を示す例については、[カスタムチャート][10] を参照してください。

{{% /collapse-content %}}


{{% collapse-content title="日付ピッカー" level="h3" %}}
日付ピッカーコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-4}

Label (ラベル)
: 日付ピッカーの上部に表示されるラベル。<br>
**値**: 文字列または式

Tooltip (ツールチップ)
: 入力ラベルにカーソルを合わせたときに表示されるツールチップ。ツールチップには Markdown を含めることができます。<br>
**値**: 文字列または式

デフォルト値
: 日付ピッカーのデフォルトの日付。UNIX タイムスタンプ (ミリ秒単位) で表示されます。<br>
**値**: integer

Allow Future Dates (未来の日付を許可)
: 今日以降の日付を設定できるかどうかを決定します。<br>
**提供される値**: on、off

#### Appearance (外観) {#appearance-5}

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-2}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: [状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-5}

プロパティと値を JSON 形式で表示します。値は UNIX タイムスタンプ (ミリ秒) と ISO 形式 (年、月、日、時、分、秒、ミリ秒) の両方で表示されます。

{{% /collapse-content %}}


{{% collapse-content title="日付範囲ピッカー" level="h3" %}}
日付範囲ピッカーコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-5}

Default timeframe (デフォルトの期間)
: 日付ピッカーに表示されるデフォルトの期間。<br>
**提供される値**:  past 5 minutes、past 30 minutes、past 1 hour、past 4 hours、past 1 day

#### Appearance (外観) {#appearance-6}

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-3}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-6}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-5}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="区切り線" level="h3" %}}
区切り線コンポーネントには、以下のプロパティがあります。

#### Appearance (外観) {#appearance-7}

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Inspect Data (データの検査) {#inspect-data-7}

プロパティを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="ファイル入力" level="h3" %}}
ファイル入力コンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-6}

Accepted File Types (許可されるファイルタイプ)
: ファイル入力コンポーネントが受け入れるファイルタイプを決定します。<br>
**値**: .csv、.json

#### Appearance (外観) {#appearance-8}

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-4}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-8}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="画像" level="h3" %}}
画像コンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-7}

Source (ソース)
: 表示する画像。サポートされている形式は、JPG、PNG、および GIF です。最大アップロードサイズは 4 MB です。<br>
**値**: URL またはファイル

#### Appearance (外観) {#appearance-9}

Fit (フィット)
: 画像コンポーネントの境界内での画像の寸法を決定します。<br>
**提供される値**: fill、contain、cover、none

Padding (パディング)
: 画像の境界と画像コンポーネントの境界との間のスペースの幅を決定します。<br>
**提供される値**: none、small、medium、large

Vertical Alignment (垂直方向の配置)
: 画像コンポーネントの境界内での画像の垂直方向の位置を決定します。<br>
**提供される値**: align top、align center、align bottom

Horizontal Alignment (水平方向の配置) 
: 画像コンポーネントの境界内での画像の水平方向の位置を決定します。<br>
**提供される値**: align left、align center、align right

Border (枠線)
: 画像コンポーネントの周囲に視覚的な枠線を表示するかどうかを決定します。<br>
**提供される値**: on、off

Transparent Background (透明な背景)
: 画像コンポーネント内の背景を透明にするかどうかを決定します。<br>
**提供される値**: on、off

Is Loading (読み込み中)
: 画像の読み込み中に読み込み中アイコンを表示するかどうかを決定します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Inspect Data (データの検査) {#inspect-data-9}

プロパティを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="インテグレーションロゴ" level="h3" %}}
インテグレーションロゴコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-8}

Integration Id (インテグレーション ID)
: 表示するインテグレーションロゴアイコンを指定します。<br>
**値**: 文字列または式<br>
**例**: datadog、amazon-s3、postgres、okta

#### Appearance (外観) {#appearance-10}

Horizontal Alignment (水平方向の配置)
: コンポーネント内でのロゴの水平方向の配置を制御します。<br>
**提供される値**: align left、align center、align right

Vertical Alignment (垂直方向の配置)
: コンポーネント内でのロゴの垂直方向の配置を制御します。<br>
**提供される値**: align top、align center、align bottom

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

Is Loading (読み込み中)
: ローディングインジケーターを表示します。<br>
**提供される値**: on、off

#### Inspect Data (データの検査) {#inspect-data-10}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="フォーム" level="h3" %}}
フォームコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-9}

Title (タイトル)
: フォームのタイトル。<br>
**値**: 文字列または式

Default value (デフォルト値)
: アプリがフォームに自動入力するデフォルト値。特定のフィールドに値を入力するには、JSON 表記を使用できます。たとえば、`org` フィールドに値 `frontend` を入力するには、`{"org":"frontend"}` を使用します。<br>
**値**: 文字列または式

#### フィールド {#fields}

各項目はフォーム内のフィールドを表します。フィールドには次のいずれかのタイプが設定されます: `textInput`、`select`、`textArea`、または `text`。

フィールドには、そのフィールドタイプに応じて、以下のプロパティの一部またはすべてが含まれます。

Field name (フィールド名)
: フィールドの一意の識別子。この識別子を使用して、式の中でフィールドを参照できます。<br>
**値**: 文字列または式

Label (ラベル)
: フィールドの上に表示されるラベル。<br>
**値**: 文字列または式

Content (内容)
: `text`フィールドに表示される内容。<br>
**値**: 文字列または式

Options (オプション)
: `select`フィールドで使用可能なオプション。オプションはオブジェクトの配列である必要があり、オプション値には `const` キー、オプションラベルには任意の `title` キーを使用します。<br>**値**: 各オブジェクトの `label` と `value` は、文字列または式にできます。<br>
GUI (デフォルト) を使用して各オブジェクトに値を入力するか、[{{< ui >}}Raw{{< /ui >}}] (未加工) を切り替えて未加工の JSON 入力を使用し、オブジェクトの配列全体を入力できます。

Placeholder text (プレースホルダーテキスト)
: `textInput` または `textArea` フィールドに値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: フィールドがフォーム内で表示されるかどうかを決定します。<br>
**提供される値**: on、off

Is Required (必須)
: フォームを送信するためにフィールドが必須かどうかを決定します。<br>
**提供される値**: on、off

#### Appearance (外観) {#appearance-11}

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

#### Events (イベント) {#events-5}

Event (イベント)
: **値**: submit、change、validate

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: `form0.setValue({name: 'node-group-1'})` は、`form0` コンポーネントの値を `{name: 'node-group-1'}` に設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-11}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="JSON 入力" level="h3" %}}
JSON 入力コンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-10}

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。

Default value (デフォルト値)
: コンポーネントが表示するデフォルトの JSON 値。

#### Appearance (外観) {#appearance-12}

Is Read Only (読み取り専用)
: コンポーネントが読み取り専用かどうかを決定します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-6}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-12}

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="モーダル" level="h3" %}}
モーダルコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-11}

Title (タイトル)
: モーダルのタイトル。<br>
**値**: 文字列または式

#### Appearance (外観) {#appearance-13}

サイズ
: モーダルのスケール。<br>
**提供される値**: sm、md、lg

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-7}

Event (イベント)
: **値**: toggleOpen、close、open

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setIsOpen<br>
**例**: `modal0.setIsOpen(true)` は `modal0` の状態を open に設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-13}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-6}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="数値入力" level="h3" %}}
数値入力コンポーネントには、以下のプロパティがあります。

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value (デフォルト値)
: アプリが入力ボックスに入力するデフォルト値。<br>
**値**: 数値、または数値として評価される式

Placeholder text (プレースホルダーテキスト)
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### Validation (検証) {#validation}

Min (最小値)
: 数値入力が受け入れる最小値。<br>
**値**: 数値、または数値として評価される式

Max (最大値)
: 数値入力が受け入れる最大値。<br>
**値**: 数値、または数値として評価される式

#### Appearance (外観) {#appearance-14}

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-8}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: `numberInput0.setValue(3)` は、`numberInput0` コンポーネントの値を `3` に設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-14}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-7}

このコンポーネントをコンテキストで表示するには、[ECS Task Manager][4] アプリのブループリントを参照してください。
{{% /collapse-content %}}




{{% collapse-content title="ラジオボタン" level="h3" %}}
ラジオボタンコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-12}

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Options (オプション)
: ユーザーが選択できるラジオボタンオプションのリスト。形式はオブジェクトの配列です。これらの各オブジェクトは、`label` と `value` のキー値ペアで構成されます。<br>
**値**: 式<br>
**例**:<br>
:    ```json
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

Default value (デフォルト値)
: ラジオボタンの読み込み時に選択される値。<br>
**値**: 文字列または式

#### Appearance (外観) {#appearance-15}

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-9}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: `radioButtons0.setValue("production")` は、`radioButtons0` コンポーネントの値を `"production"` に設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-15}

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="React レンダラー" level="h3" %}}
React レンダラーコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-13}

React Component Definition (React コンポーネント定義)
: React コンポーネントを作成するために実行されるコード。<br>

Component Input Props (コンポーネント入力 Props)
: React コンポーネントに渡され、コンポーネントの props オブジェクトでアクセスできる props です。

Initial Component State (コンポーネントの初期状態)
: コンポーネントの初期状態の値を設定します。この状態は、コンポーネントが最初にレンダリングされるとき、または状態がまだ設定されていないときに使用されます。コンポーネントは、 <code>props.state</code>からこのデータにアクセスできます。<br>

#### Appearance (外観) {#appearance-16}

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-10}
Event (イベント)
: **値**: コンポーネント状態の設定、コールバック関数

Function Name (関数名)
: **値**:<code>props.customFunctionName</code>

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-16}

プロパティと値のペアを JSON 形式で表示します。

#### Relationships (関係) {#relationships}

アプリ内の React レンダラーとコンポーネント間のデータ依存関係を表示します。

#### 例 {#example-8}

このコンポーネントの使用例については、[React レンダラー][11] を参照してください。

{{% /collapse-content %}}



{{% collapse-content title="検索" level="h3" %}}
検索コンポーネントには以下のプロパティがあります。

#### 一般 (General) {#general-14}

Default value (デフォルト値)
: アプリが検索ボックスに設定するデフォルト値。<br>
**値**: 文字列または式

Placeholder text (プレースホルダーテキスト)
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### Appearance (外観) {#appearance-17}

サイズ
: 検索コンポーネントのスケール。<br>
**提供される値**: sm、md、lg

Is Loading (読み込み中)
: 読み込み中インジケーターを表示します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-11}

Event (イベント)
: **値**: change、submit

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: `search0.setValue("search query")` は、`search0` コンポーネントの値を `"search query"` に設定します。<br>
詳細については、[状態関数][9] を参照してください。

イベントの詳細については、[イベント][1] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-17}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-9}

このコンポーネントをコンテキストで表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}

{{% collapse-content title="選択" level="h3" %}}
選択コンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-15}

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Placeholder text (プレースホルダーテキスト)
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

Options (オプション)
: ユーザーが選択できる選択肢のリスト。形式はオブジェクトの配列です。これらの各オブジェクトは、`label` と `value` のキー値ペアで構成されます。<br>
**値**: 式<br>
**例**:<br>
:     ```json
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

Default value (デフォルト値)
: コンポーネントの読み込み時に選択される値。<br>
**値**: 文字列または式

複数選択可
: ユーザーが一度に複数のオプションを選択できるかどうかを決定します。<br>
**提供される値**: on、off

#### Appearance (外観) {#appearance-18}

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-12}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: `select0.setValue("staging")` は、`select0` コンポーネントの値を `"staging"` に設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-18}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-10}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="サイドパネル" level="h3" %}}
サイドパネルコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-16}

Title (タイトル)
: サイドパネルのタイトル。<br>
**値**: 文字列

#### Appearance (外観) {#appearance-19}

Width (幅)
: サイドパネルの幅を決定します。値の後にパーセント記号 (`%`) を含める必要があります。<br>
**値**: integer

Hide Close Button (閉じるボタンを非表示にする)
: サイドパネルを閉じる [X] を表示するかどうかを決定します。<br>
**提供される値**: on、off

#### Events (イベント) {#events-13}

Event (イベント)
: **値**: toggle open、close、open

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setIsOpen<br>
**例**: `sidePanel0.setIsOpen(true)` は `sidePanel0` の状態を open に設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-19}

プロパティと値を JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="Tab (タブ)" level="h3" %}}

タブコンポーネントには、以下のプロパティがあります。

#### タブ (Tabs) {#tabs}

タブビューのリスト。({{< ui >}}\+{{< /ui >}}) を使用してビューを追加します。


#### Style (スタイル){#style-1}

Style (スタイル)
: タブコンポーネントに使用される配色スタイル。<br>
**提供される値**: Default、purple、pink、orange、red、green

Alignment (配置)
: タブコンポーネント内でのタブの配置方法。<br>
**提供される値**: Horizontal (→)、vertical (↓)

Impact (影響)
: 選択中のタブの背景色を全面に適用するか、下部の小さな帯のみに適用するかを制御します。<br>
**提供される値**: High、low


#### Appearance (外観) {#appearance-20}

Hide Tabs (タブを非表示にする)
: タブマーカーを表示するかどうかを制御します。<br>
**提供される値**: on、off

Hide Body (本文を非表示にする)
: タブの本文を表示するかどうかを制御します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-14}

Event (イベント)
: **値**: change

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setTabIndex<br>
**例**: `tab0.setTabIndex(0)` は、`tab0` コンポーネントの値を最初のタブに設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-20}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}

{{% collapse-content title="テーブル" level="h3" %}}

テーブルコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-17}

Title (タイトル)
: テーブルのタイトル。カスタムの形式として [{{< ui >}}Markdown{{< /ui >}}] を選択します。<br>
**値**: 文字列

Data source (データソース)
: テーブルに表示するオブジェクトの配列。<br>
**値**: query、demo、data、components

#### 列 {#columns}

データソースからのデータの各列はここで表され、以下のプロパティを持ちます。

Label (ラベル)
: 列の上部に表示されるテキスト。<br>
**値**: 文字列または式

Data path (データパス)
: 指定された列のオブジェクトや配列内に入れ子になっている値にアクセスするための JSON パス。<br>
**値**: 文字列または式

Formatting (形式設定)
: 列に適用される形式の種類。<br>
**提供される値**: string、link、status pill、date / time、markdown、tags、percent bar、number、score bar、avatar

Sortable (並べ替え可能)
: ユーザーが列で並べ替えを行えるかどうかを決定します。<br>

Copyable (コピー可能)
: ユーザーがクリックして列の内容をコピーできるかどうかを決定します。<br>
**提供される値**: on、off

Filterable (フィルタリング可能)
: 列に対してフィルターオプションを利用できるかどうかを決定します。<br>
**提供される値**: on、off

一部の列には、[{{< ui >}}Formatting{{< /ui >}}] (形式設定) プロパティに基づく追加プロパティがあります。

#### Pagination (ページ区切り) {#pagination}

Has summary (サマリーの有無)
: テーブルの真上にページ区切りのサマリーを表示するかどうかを決定します。<br>
**提供される値**: on、off

Page size (ページサイズ)
: 1 ページあたりに表示する行数。<br>
**値**: 数値、または数値として評価される式

Total count (合計数)
: テーブルに表示する行の合計数。<br>
**値**: 数値、または数値として評価される式

Type (タイプ)
: ページ区切りのタイプを決定します。<br>
**提供される値**: client side、server side

#### Sort (ソート){#sorting}

テーブルのデフォルトのソートに使用する列と順序を選択します。
Colum (列)
: ソートの基準となる列。<br>
**値**: 列名

Direction (方向)
: ソートの方向。<br>
**提供される値**: ascending、descending

#### Row actions (行アクション){#row-actions}

行アクションを追加すると、テーブルに [{{< ui >}}Actions{{< /ui >}}] (アクション) 列が追加されます。この列にはそこにユーザー定義のアクションボタンが含まれます。行に複数のアクションを設定できます。アクションには以下のプロパティがあります。

Label (ラベル)
: アクションボタンに表示されるテキスト。<br>
**値**: 文字列または式

Primary (主要)
: 指定されたページまたはワークフローの最も重要なアクションにユーザーが注目するように設計されています。<br>
**提供される値**: on、off

Borderless (枠線なし)
: ボタンの枠線を削除します。カーソルを合わせると背景が塗りつぶされます。<br>
**提供される値**: on、off

無効
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Level (レベル)
: 目的に応じてボタンの色を制御します。<br>
**提供される値**: default、danger、success、warning

Reactions (リアクション)
: ボタンがトリガーするリアクション。ボタンには複数のリアクションを設定できます。<br>
**提供される値**: download file、open modal、close modal、open side panel、close side panel、open URL、set component state、set state variable value、toast notification、trigger action、custom<br>
一部のリアクションタイプには追加のプロパティがあります。

#### Appearance (外観) {#appearance-21}

Scrollable (スクロール可能)
: テーブルのスクロール方法を決定します。<br>
**提供される値**: both、vertical

Is Loading (読み込み中)
: ローディングインジケーターを表示します。<br>
**提供される値**: on、off

Has text wrapping (テキストを折り返す)
: セルのテキストを折り返すかどうかを決定します。<br>
**提供される値**: on、off

Has subrows (サブ行を含む)
: 各行のサブ行を有効にします。データソースに `subRows` プロパティを含めます。<br>
**提供される値**: on、off

Is searchable (検索可能)
: テーブルに検索バーを追加するかどうかを決定します。<br>
**提供される値**: on、off

Show sort options (並べ替えオプションを表示)
: ユーザーがソートオプションを選択できる {{< ui >}}Sort{{< /ui >}} ボタンをテーブルに追加します。<br>
**提供される値**: on、off

Show column options (列オプションを表示)
: 列の表示、非表示、再編成のための {{< ui >}}Columns{{< /ui >}} ボタンをテーブルに追加します。<br>
**提供される値**: on、off

Has date range filter (日付範囲フィルターあり)
: テーブルに日付範囲フィルターを追加します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-15}

Event (イベント)
: **値**: pageChange、tableRowClick

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setSelectedRow<br>
**例**: <ul><li>`table0.setSelectedRow(0)` は `table0` の `selectedRow` プロパティを最初の行に設定します。</li><li>`table0.setSelectedRow(null)``selectedRow` プロパティをクリアします。</li></ul>
: setPageIndex<br>
**例**: `table0.setPageIndex(0)` は `table0` の `pageIndex` プロパティを最初のページに設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-21}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-11}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。

テーブルの高度な機能の使用方法を示す例については、[テーブル][6] を参照してください。

{{% /collapse-content %}}



{{% collapse-content title="テキスト" level="h3" %}}
テキストコンポーネントには、以下のプロパティがあります。

#### 一般 (General) {#general-18}

Content (内容)
: コンポーネントが表示する内容。<br>
**値**: 文字列または式

コンテンツ タイプ
: テキストのレンダリング方法を決定します。[{{< ui >}}Markdown{{< /ui >}}] (マークダウン) が選択されている場合、テキストコンポーネントは [基本的な Markdown 構文][8] をサポートします (任意の場所でホストする画像を含む)。<br>
**提供される値**: plain text、Markdown

#### Appearance (外観) {#appearance-22}

Text alignment (テキストの配置)
: コンポーネント内でのテキストの水平方向の配置を決定します。<br>
**提供される値**: align left、align center、align right

Vertical alignment (垂直方向の配置)
: コンポーネント内でのテキストの垂直方向の配置を決定します。<br>
**提供される値**: align top、align center、align bottom

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Inspect Data (データの検査) {#inspect-data-22}

プロパティと値のペアを JSON 形式で表示します。

#### Relationships (関係) {#relationships-1}

アプリ内のテーブルデータとコンポーネント間のデータ依存関係を表示します。

#### 例 {#example-12}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="テキストエリア" level="h3" %}}
テキストエリアコンポーネントには、以下のプロパティがあります。

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value (デフォルト値)
: テキストエリアの読み込み時に選択される値。<br>
**値**: 文字列または式

Placeholder text (プレースホルダーテキスト)
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### Appearance (外観) {#appearance-23}

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-16}

Event (イベント)
: **値**: change、submit

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: `textArea0.setValue("text")` は、`textArea0` コンポーネントの値を `"text"` に設定します。<br>
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-23}

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}


{{% collapse-content title="テキスト入力" level="h3" %}}
テキスト入力コンポーネントには、以下のプロパティがあります。

Label (ラベル)
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value (デフォルト値)
: テキスト入力の読み込み時に選択される値。<br>
**値**: 文字列または式

Placeholder text (プレースホルダーテキスト)
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### Appearance (外観) {#appearance-24}

Is Disabled (無効)
: 無効な場合のスタイルを適用し、インタラクションを削除します。<br>
**提供される値**: on、off

Is Visible (表示)
: コンポーネントがエンドユーザーに表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提供される値**: on、off

#### Events (イベント) {#events-17}

Event (イベント)
: **値**: change、submit

Reaction (リアクション)
: **値**: 例として、open modal、trigger action、set component state などがあります。<br>
利用可能なリアクションのリストについては、[イベント][1] を参照してください。

State Function (状態関数)
: setValue<br>
**例**: `textInput0.setValue("text")` は、`textInput0` コンポーネントの値を `"text"` に設定します。
詳細については、[状態関数][9] を参照してください。

#### Inspect Data (データの検査) {#inspect-data-24}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-13}

このコンポーネントをコンテキストで表示するには、[Metrics Explorer & Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][5] の {{< ui >}}#app-builder{{< /ui >}} チャンネルにご参加ください。


[1]: /ja/actions/app_builder/events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://chat.datadoghq.com/
[6]: /ja/actions/app_builder/components/tables/
[7]: /ja/actions/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /ja/actions/app_builder/events/#state-functions
[10]: /ja/actions/app_builder/components/custom_charts/
[11]: /ja/actions/app_builder/components/react_renderer/
[12]: /ja/actions/app_builder/components/reusable_modules/
[13]: /ja/actions/app_builder/events/#events-and-reactions
[14]: /ja/actions/app_builder/events/#custom-reactions