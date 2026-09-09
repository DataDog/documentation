---
aliases:
- /ja/service_management/app_builder/components
description: ボタン、フォーム、テーブル、チャート、インタラクティブ要素など、App Builder UI コンポーネントの包括的なリファレンスです。
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
  text: JavaScript の式
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: ラーニングセンター
  text: App Builder を使用してサードパーティインテグレーション用のセルフサービスアプリを構築する
title: コンポーネント
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder は、Datadog の政府機関用サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

## 概要 {#overview}
このページでは、App Builder でアプリを作成する際に使用できる UI コンポーネントのリストを示します。

多くのコンポーネントプロパティでは、提供された値の中から選択できます。プロパティの値に式を使用する場合は、プロパティの横にある [{{< ui >}}&lt;/&gt;{{< /ui >}}] をクリックして、コードエディターを使用します。

イベントをトリガーできるすべてのコンポーネントに、[イベントとリアクション][13] で利用可能な複数のリアクションがあります。これらのコンポーネントでは、[カスタムリアクション][14] も使用できます。

App Builder での JavaScript の使用に関する詳細については、「[JavaScript の式][7]」を参照してください。コンポーネントをテンプレートとして保存する方法については、「[再利用可能なモジュール][12]」を参照してください。
<br>

## 使用可能なコンポーネント {#available-components}

{{% collapse-content title="ボタン" level="h3" %}}
ボタンコンポーネントには、以下のプロパティがあります。

#### 一般 {#general}

Label (ラベル)
: ボタンに表示されるテキスト。<br>
**値**: 文字列または式

#### 外観 {#appearance}

Intent (意図)
: ボタンの色を制御します。色はボタンの目的を表します。<br>
**提示される値**: default (デフォルト)、danger (危険)、success (成功)、warning (警告)

Is Primary (プライマリ)
: 特定のページやワークフローにおいて、最も重要なアクションにユーザーの注意を向けるために使用します。<br>
**提示される値**: on (オン)、off (オフ)

Is Borderless (枠線なし)
: ボタンから枠線を取り除きます。マウスを重ねると、背景が塗りつぶされます。<br>
**提示される値**: on、off

Is Loading (読み込み中)
: 読み込み中のインジケーターを表示します。<br>
**提示される値**: on、off

Is Disabled (無効)
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible (表示)
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events}

Event (イベント)
: **値**: click (クリック)

Reaction (リアクション)
: **値**: 例: open modal (モーダルを開く)、trigger action (アクションのトリガー)、set component state (コンポーネントの状態の設定)<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

#### データの検査 {#inspect-data}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="コールアウト値" level="h3" %}}
コールアウト値コンポーネントには、以下のプロパティがあります。

#### 一般 {#general-1}

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Value (値)
: コールアウトで強調される値。<br>
**値**: 文字列または式

Unit (単位)
: 値に関連付けられている単位。<br>
**値**: 文字列または式

#### スタイル {#style}

Style (スタイル)
: コンポーネントの視覚的なスタイル。<br>
**提示される値**: default、success、warning、danger、blue (青)、purple (紫)、pink (ピンク)、orange (オレンジ)、yellow (黄)、red (赤)、green (緑)、gray (グレー)、vivid blue (鮮やかな青)、vivid purple (鮮やかな紫)、vivid pink (鮮やかなピンク)、vivid orange (鮮やかなオレンジ)、vivid yellow (鮮やかな黄)、vivid red (鮮やかな赤)、vivid green (鮮やかな緑)

Size (サイズ)
: 値のサイズに比例するように、指標のサイズをレスポンシブに調整します。<br>
**提示される値**: sm、md、lg、xl

#### 外観 {#appearance-1}

Is Loading
: 読み込み中のインジケーターを表示します。<br>
**提示される値**: on、off

Is Disabled
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### データの検査 {#inspect-data-1}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-1}

このコンポーネントをコンテキスト内で表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="チェックボックス" level="h3" %}}
チェックボックスコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-2}

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Options (オプション)
: ユーザーが選択できるチェックボックスのリスト。形式はオブジェクトの配列であり、各オブジェクトは `label` と `value` のキーと値のペアで構成されます。指定できるオプション数の最小値は 1 です。<br>
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

#### 外観 {#appearance-2}

Is Multiline (複数行)
: チェックボックスのテキストを改行して次の行に表示するか、切り捨てて省略記号を表示するかを決定します。<br>
**提示される値**: on、off

Is Disabled
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-1}

Event
: **値**: change (変更)<br>

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

#### データの検査 {#inspect-data-2}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-2}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="コンテナ" level="h3" %}}
コンテナコンポーネントには、以下のプロパティがあります。

#### 外観 {#appearance-3}

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### データの検査 {#inspect-data-3}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-3}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="カスタムチャート" level="h3" %}}
カスタムチャートコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-3}

Vega Specification (Vega 仕様)
: 有効な Vega-Lite または Vega JSON 仕様を表す文字列。

#### 外観 {#appearance-4}

Is Loading
: 読み込み中のインジケーターを表示します。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### データの検査 {#inspect-data-4}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-4}

このコンポーネントの使用方法を示す例については、「[カスタムチャート][10]」を参照してください。

{{% /collapse-content %}}


{{% collapse-content title="日付ピッカー" level="h3" %}}
日付ピッカーコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-4}

Label
: 日付ピッカーの上部に表示されるラベル。<br>
**値**: 文字列または式

Tooltip (ツールチップ)
: 入力ラベルにカーソルを合わせたときに表示されるツールチップ。ツールチップにはマークダウンを含めることができます。<br>
**値**: 文字列または式

Default Value (デフォルト値)
: 日付ピッカーのデフォルトの日付。ミリ秒単位の UNIX タイムスタンプとして表示されます。<br>
**値**: 整数

Allow Future Dates (将来の日付を許可)
: 今日より後の日付を設定できるかどうかを決定します。<br>
**提示される値**: on、off

#### 外観 {#appearance-5}

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-2}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function (状態関数)
: setValue<br>
**例**: [状態関数][9] を参照してください。

#### データの検査 {#inspect-data-5}

プロパティと値を JSON 形式で表示します。値は、ミリ秒単位の UNIX タイムスタンプと ISO 形式 (年、月、日、時、分、秒、ミリ秒) の両方で表示されます。

{{% /collapse-content %}}


{{% collapse-content title="日付範囲ピッカー" level="h3" %}}
日付範囲ピッカーコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-5}

Default timeframe (デフォルト期間)
: 日付ピッカーに表示されるデフォルトの期間。<br>
**提示される値**: past 5 minutes (過去 5 分)、past 30 minutes (過去 30 分)、past 1 hour (過去 1 時間)、past 4 hours (過去 4 時間)、past 1 day (過去 1 日)

#### 外観 {#appearance-6}

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-3}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

#### データの検査 {#inspect-data-6}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-5}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="区切り線" level="h3" %}}
区切り線コンポーネントには、以下のプロパティがあります。

#### 外観 {#appearance-7}

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### データの検査 {#inspect-data-7}

プロパティを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="ファイル入力" level="h3" %}}
ファイル入力コンポーネントには、以下のプロパティがあります。

#### 一般 {#general-6}

Accepted File Types (受け入れられるファイルタイプ)
: ファイル入力コンポーネントが受け入れるファイルタイプを指定します。<br>
**値**: .csv、.json

#### 外観 {#appearance-8}

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-4}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

#### データの検査 {#inspect-data-8}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="画像" level="h3" %}}
画像コンポーネントには、以下のプロパティがあります。

#### 一般 {#general-7}

Source (ソース)
: 表示する画像。サポートされている形式は、JPG、PNG、GIF です。最大アップロードサイズは 4 MB です。<br>
**値**: URL またはファイル

#### 外観 {#appearance-9}

Fit (適合)
: 画像コンポーネントの境界内での画像の寸法を指定します。<br>
**提示される値**: fill (埋める)、contain (含める)、cover (重ねる)、none (なし)

Padding (パディング)
: 画像の境界と画像コンポーネントの境界との間のスペースの幅を指定します。<br>
**提示される値**: none、small (小)、medium (中)、large (大)

Vertical Alignment (垂直方向の配置)
: 画像コンポーネントの境界内での画像の垂直方向の位置を指定します。<br>
**提示される値**: align top (上揃え)、align center (中央揃え)、align bottom (下揃え)

Horizontal Alignment (水平方向の配置) 
: 画像コンポーネントの境界内での画像の水平方向の位置を指定します。<br>
**提示される値**: align left (左揃え)、align center (中央揃え)、align right (右揃え)

Border (境界線)
: 画像コンポーネントの端に目に見える境界線を表示するかどうかを指定します。<br>
**提示される値**: on、off

Transparent Background (透明な背景)
: 画像コンポーネント内の背景を透明にするかどうかを指定します。<br>
**提示される値**: on、off

Is Loading
: 画像の読み込み中に読み込み中アイコンを表示するかどうかを指定します。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### データの検査 {#inspect-data-9}

プロパティを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="統合ロゴ" level="h3" %}}
統合ロゴコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-8}

Integration Id (統合 ID)
: 表示する統合ロゴアイコンを指定します。<br>
**値**: 文字列または式<br>
**例**: datadog、amazon-s3、postgres、okta

#### 外観 {#appearance-10}

Horizontal Alignment
: コンポーネント内でのロゴの水平方向の配置を制御します。<br>
**提示される値**: align left、align center、align right

Vertical Alignment
: コンポーネント内でのロゴの垂直方向の配置を制御します。<br>
**提示される値**: align top、align center、align bottom

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

Is Loading
: 読み込み中のインジケーターを表示します。<br>
**提示される値**: on、off

#### データの検査 {#inspect-data-10}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="フォーム" level="h3" %}}
フォームコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-9}

Title (タイトル)
: フォームのタイトル。<br>
**値**: 文字列または式

Default value
: アプリがフォームに設定するデフォルト値。特定のフィールドに値を設定する際には、JSON 表記を使用できます。たとえば、`{"org":"frontend"}` を使用して、`org` フィールドに `frontend` の値を設定します。<br>
**値**: 文字列または式

#### フィールド {#fields}

各項目は、フォーム内のフィールドを表します。各フィールドのタイプは、: 、`textInput`、`select`、`textArea`、または`text` のいずれかです。

フィールドには、そのフィールドタイプに応じて、以下のプロパティのいずれかまたはすべてが指定されます。

Field name (フィールド名)
: フィールドの一意の識別子。この識別子を使用して、式の中でフィールドを参照できます。<br>
**値**: 文字列または式

Label
: フィールドの上に表示されるラベル。<br>
**値**: 文字列または式

Content (コンテンツ)
: `text` フィールドに表示されるコンテンツ。<br>
**値**: 文字列または式

Options
: `select` フィールドで使用可能なオプション。オプションはオブジェクトの配列である必要があり、オプション値には `const` キーを、オプションラベルにはオプションで `title` キーを使用します。<br>**値**: 各オブジェクトの `label` と `value` には、文字列または式を指定できます。<br>
GUI を使用して各オブジェクトに値を設定するか (デフォルト)、[{{< ui >}}Raw{{< /ui >}}] (生) に切り替えて、生の JSON 入力を使用してオブジェクトの配列全体を指定します。

Placeholder text (プレースホルダーテキスト)
: 値が入力されていない場合に、`textInput` または `textArea` フィールドに表示されるテキスト。<br>
**値**: 文字列または式

Is Disabled
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: フォーム内にフィールドを表示するかどうかを指定します。<br>
**提示される値**: on、off

Is Required (必須)
: フォームを送信するためにフィールドが必須かどうかを指定します。<br>
**提示される値**: on、off

#### 外観 {#appearance-11}

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

Is Disabled
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

#### イベント {#events-5}

Event
: **値**: submit (送信)、change (変更)、validate (検証)

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setValue<br>
**例**: `form0.setValue({name: 'node-group-1'})` は、`form0` コンポーネントの値を `{name: 'node-group-1'}` に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-11}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="JSON 入力" level="h3" %}}
JSON 入力コンポーネントには、以下のプロパティがあります。

#### 一般 {#general-10}

Label
: コンポーネントの上部に表示されるテキスト。

Default value
: コンポーネントに表示されるデフォルトの JSON 値です。

#### 外観 {#appearance-12}

Is Read Only (読み取り専用)
: コンポーネントを読み取り専用にするかどうかを指定します。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-6}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

#### データの検査 {#inspect-data-12}

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="モーダル" level="h3" %}}
モーダルコンポーネントには以下のプロパティがあります。

#### 一般 {#general-11}

Title
: モーダルのタイトル。<br>
**値**: 文字列または式

#### 外観 {#appearance-13}

Size
: モーダルのスケール。<br>
**提示される値**: sm、md、lg

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-7}

Event
: **値**: toggleOpen (オープンを切り替え)、close (クローズ)、open (オープン)

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setIsOpen<br>
**例**: `modal0.setIsOpen(true)` は `modal0` の状態を open に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-13}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-6}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}



{{% collapse-content title="数値入力" level="h3" %}}
数値入力コンポーネントには、以下のプロパティがあります。

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value
: 入力ボックスにアプリが設定するデフォルト値。<br>
**値**: 数値、または数値に評価される式

Placeholder text
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### 検証 {#validation}

Min (最小値)
: 数値入力で受け入れられる最小値。<br>
**値**: 数値、または数値に評価される式

Max (最大値)
: 数値入力で受け入れられる最大値。<br>
**値**: 数値、または数値に評価される式

#### 外観 {#appearance-14}

Is Disabled
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-8}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setValue<br>
**例**: `numberInput0.setValue(3)` は、`numberInput0` コンポーネントの値を `3` に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-14}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-7}

このコンポーネントをコンテキスト内で表示するには、[ECS Task Manager][4] アプリのブループリントを参照してください。
{{% /collapse-content %}}




{{% collapse-content title="ラジオボタン" level="h3" %}}
ラジオボタンコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-12}

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Options
: ユーザーが選択できるラジオボタンオプションのリスト。形式はオブジェクトの配列であり、各オブジェクトは `label` と `value` のキーと値のペアで構成されます。<br>
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

Default value
: ラジオボタンの読み込み時に選択される値。<br>
**値**: 文字列または式

#### 外観{#appearance-15}

Is Disabled
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-9}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setValue<br>
**例**: `radioButtons0.setValue("production")` は、`radioButtons0` コンポーネントの値を `"production"` に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-15}

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}



{{% collapse-content title="React レンダラー" level="h3" %}}
React レンダラーコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-13}

React Component Definition (React コンポーネント定義)
: React コンポーネントを作成するために実行されるコード。<br>

Component Input Props (コンポーネントの Input Props)
: React コンポーネントに渡され、コンポーネントの props オブジェクトからアクセスできる props。

Initial Component State (コンポーネントの初期状態)
: コンポーネントの初期状態の値を設定します。この状態は、コンポーネントが初めてレンダリングされるとき、または状態がまだ設定されていない場合に使用されます。コンポーネントは、 <code>props.state</code>からこのデータにアクセスできます。<br>

#### 外観 {#appearance-16}

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-10}
Event
: **値**: set component state、callback function (コールバック関数)

Function Name (関数名)
: **値**:<code>props.customFunctionName</code>

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

#### データの検査 {#inspect-data-16}

プロパティと値のペアを JSON 形式で表示します。

#### 関係 {#relationships}

React レンダラーとアプリ内のコンポーネント間のデータ依存関係を表示します。

#### 例 {#example-8}

このコンポーネントの使用方法を示す例は、「[React レンダラー][11]」を参照してください。

{{% /collapse-content %}}



{{% collapse-content title="検索" level="h3" %}}
検索コンポーネントには以下のプロパティがあります。

#### 一般 {#general-14}

Default value
: アプリが検索ボックスに設定するデフォルト値。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### 外観 {#appearance-17}

Size
: 検索コンポーネントのスケール。<br>
**提示される値**: sm、md、lg

Is Loading
: 読み込み中のインジケーターを表示します。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-11}

Event
: **値**: change、submit

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setValue<br>
**例**: `search0.setValue("search query")` は、`search0` コンポーネントの値を `"search query"` に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

イベントの詳細については、「[イベント][1]」を参照してください。

#### データの検査 {#inspect-data-17}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-9}

このコンポーネントをコンテキスト内で表示するには、[EC2 Instance Manager][3] アプリのブループリントを参照してください。
{{% /collapse-content %}}

{{% collapse-content title="選択" level="h3" %}}
選択コンポーネントには以下のプロパティがあります。

#### 一般 {#general-15}

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

Options
: ユーザーが選択できる選択肢のリスト。形式はオブジェクトの配列であり、各オブジェクトは `label` と `value` のキーと値のペアで構成されます。<br>
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

Default value
: 選択肢が読み込まれたときに選択されている値。<br>
**値**: 文字列または式

Is Multiselect (複数選択)
: ユーザーが一度に複数のオプションを選択できるかどうかを指定します。<br>
**提示される値**: on、off

#### 外観{#appearance-18}

Is Disabled
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-12}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setValue<br>
**例**: `select0.setValue("staging")` は、`select0` コンポーネントの値を `"staging"` に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-18}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-10}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="サイドパネル" level="h3" %}}
サイドパネルコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-16}

Title
: サイドパネルのタイトル。<br>
**値**: 文字列

#### 外観 {#appearance-19}

Width (幅)
: サイドパネルの幅を指定します。値の後にパーセント記号 (`%`) を含める必要があります。<br>
**値**: 整数

Hide Close Button (閉じるボタンを非表示)
: サイドパネルを閉じるための X を表示するかどうかを指定します。<br>
**提示される値**: on、off

#### イベント {#events-13}

Event
: **値**: toggle open、close、open

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setIsOpen<br>
**例**: `sidePanel0.setIsOpen(true)` は `sidePanel0` の状態を open に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-19}

プロパティと値を JSON 形式で表示します。

{{% /collapse-content %}}


{{% collapse-content title="タブ" level="h3" %}}

タブコンポーネントには以下のプロパティがあります。

#### Tabs (タブ) {#tabs}

タブビューのリスト。({{< ui >}}+{{< /ui >}}) を使用してビューを追加します。


#### スタイル {#style-1}

Style
: タブコンポーネントに使用される配色スタイル。<br>
**提示される値**: Default、purple、pink、orange、red、green

Alignment (配置)
: タブコンポーネント内でのタブの配置方法。<br>
**提示される値**: Horizontal (水平)(→)、vertical (垂直) (↓)

Impact (影響)
: 選択したタブの背景を完全に塗りつぶすか、下部の小さな帯のみに色を付けるかを制御します。<br>
**提示される値**: High (高)、low (低)


#### 外観 {#appearance-20}

Hide Tabs (タブを非表示)
: タブマーカーを表示するかどうかを制御します。<br>
**提示される値**: on、off

Hide Body (ボディを非表示)
: タブのボディを表示するかどうかを制御します。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-14}

Event
: **値**: change

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setTabIndex<br>
**例**: `tab0.setTabIndex(0)` は、`tab0` コンポーネントの値を最初のタブに設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-20}

プロパティと値のペアを JSON 形式で表示します。

{{% /collapse-content %}}

{{% collapse-content title="テーブル" level="h3" %}}

テーブルコンポーネントには以下のプロパティがあります。

#### 一般 {#general-17}

Title
: テーブルのタイトル。カスタム書式設定の場合は [{{< ui >}}Markdown{{< /ui >}}] (マークダウン) を選択します。<br>
**値**: 文字列

Data source (データソース)
: テーブルに表示するオブジェクトの配列。<br>
**値**: query (クエリ)、demo data (デモデータ)、components (コンポーネント)

#### 列 {#columns}

データソースからの各データ列がここに表示され、以下のプロパティを持ちます。

Label
: 列の最上部に表示されるテキスト。<br>
**値**: 文字列または式

Data path (データパス)
: オブジェクトおよび指定された列の配列内にネストされている値にアクセスするための JSON パス。<br>
**値**: 文字列または式

Formatting (書式設定)
: 列に適用される書式の種類。<br>
**提示される値**: string (文字列)、link (リンク)、status pill (ステータスアイコン)、date / time (日付/時刻)、markdown (マークダウン)、tags (タグ)、percent bar (パーセントバー)、number (数値)、score bar (スコアバー)、avatar (アバター)

Sortable (並べ替え可能)
: ユーザーが列で並べ替えを行えるかどうかを指定します。<br>

Copyable (コピー可能)
: ユーザーが列の内容をクリックしてコピーできるかどうかを指定します。<br>
**提示される値**: on、off

Filterable (フィルタリング可能)
: 列のフィルターオプションが利用可能かどうかを指定します。<br>
**提示される値**: on、off

一部の列には、その {{< ui >}}Formatting{{< /ui >}} プロパティに基づく追加のプロパティがあります。

#### ページネーション {#pagination}

Has summary (サマリーを表示)
: テーブルのすぐ上にページネーションのサマリーを表示するかどうかを指定します。<br>
**提示される値**: on、off

Page size (ページサイズ)
: 1 ページあたりに表示する行数。<br>
**値**: 数値、または数値に評価される式

Total count (合計数)
: テーブルに表示する行の合計数。<br>
**値**: 数値、または数値に評価される式

Type (タイプ)
: ページネーションのタイプを指定します。<br>
**提示される値**: client side (クライアントサイド)、server side (サーバーサイド)

#### 並べ替え {#sorting}

デフォルトのテーブルの並べ替えに使用する列と方向を選択します。
Column (列)
: 並べ替えの基準にする列。<br>
**値**: 列名

Direction (方向)
: 並べ替えの方向。<br>
**提示される値**: ascending (昇順)、descending (降順)

#### 行アクション {#row-actions}

行アクションを追加すると、ユーザー定義のアクションボタンを含む [{{< ui >}}Actions{{< /ui >}}] (アクション) 列がテーブルに追加されます。行には複数のアクションを追加できます。アクションには以下のプロパティがあります:

Label
: アクションボタンに表示されるテキスト。<br>
**値**: 文字列または式

Primary (プライマリ)
: 特定のページやワークフローにおいて、最も重要なアクションにユーザーの注意を向けるために使用します。<br>
**提示される値**: on、off

Borderless (枠線なし)
: ボタンから枠線を取り除きます。マウスを重ねると、背景が塗りつぶされます。<br>
**提示される値**: on、off

Disabled (無効)
: 無効時のスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Level (レベル)
: ボタンの意図に応じて色を制御します。<br>
**提示される値**: default、danger、success、warning

Reactions (リアクション)
: ボタンがトリガーするリアクション。ボタンには複数のリアクションを設定できます。<br>
**提示される値**: download file (ファイルのダウンロード)、open modal、close modal (モーダルを閉じる)、open side panel (サイドパネルを開く)、close side panel (サイドパネルを閉じる)、open URL (URL を開く)、set component state、set state variable value (ステート変数値の設定)、toast notification (トースト通知)、trigger action、custom (カスタム)<br>
一部のリアクションタイプには追加のプロパティがあります。

#### 外観 {#appearance-21}

Scrollable (スクロール可能)
: テーブルのスクロール方法を指定します。<br>
**提示される値**: both (両方)、vertical

Is Loading
: 読み込み中のインジケーターを表示します。<br>
**提示される値**: on、off

Has text wrapping (テキストを折り返す)
: セルのテキストを折り返すかどうかを指定します。<br>
**提示される値**: on、off

Has subrows (サブ行あり)
: 各行のサブ行を有効にします。データソースに `subRows` プロパティを含めます。<br>
**提示される値**: on、off

Is searchable (検索可能)
: テーブルに検索バーを追加するかどうかを指定します。<br>
**提示される値**: on、off

Show sort options (並べ替えオプションを表示)
: ユーザーに並べ替えオプションを提供する {{< ui >}}Sort{{< /ui >}} ボタンをテーブルに追加します。<br>
**提示される値**: on、off

Show column options (列オプションを表示)
: テーブルの列を表示、非表示にするか、編成し直すための {{< ui >}}Columns{{< /ui >}} ボタンをテーブルに追加します。<br>
**提示される値**: on、off

Has date range filter (日付範囲フィルターを追加)
: テーブルに日付範囲フィルターを追加します。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-15}

Event
: **値**: pageChange、tableRowClick

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setSelectedRow<br>
**例**: <ul><li>`table0.setSelectedRow(0)` は `table0` の `selectedRow` プロパティを最初の行に設定します。</li><li>`table0.setSelectedRow(null)` は、`selectedRow` プロパティをクリアします。</li></ul>
: setPageIndex<br>
**例**: `table0.setPageIndex(0)` は `table0` の `pageIndex` プロパティを最初のページに設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-21}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-11}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。

テーブルの高度な機能の使用方法を示す例は、「[テーブル][6]」を参照してください。

{{% /collapse-content %}}



{{% collapse-content title="テキスト" level="h3" %}}
テキストコンポーネントには、以下のプロパティがあります。

#### 一般 {#general-18}

Content (コンテンツ)
: コンポーネントが表示するコンテンツ。<br>
**値**: 文字列または式

Content type (コンテンツタイプ)
: テキストのレンダリング方法を指定します。[{{< ui >}}Markdown{{< /ui >}}] が選択されている場合、テキストコンポーネントは、外部でホストする画像も含め、[基本のマークダウン構文][8] をサポートします。<br>
**提示される値**: plain text (プレーンテキスト)、Markdown

#### 外観 {#appearance-22}

Text alignment (テキストの配置)
: コンポーネント内でのテキストの水平方向の配置を指定します。<br>
**提示される値**: align left、align center、align right

Vertical alignment
: コンポーネント内でのテキストの垂直方向の配置を指定します。<br>
**提示される値**: align top、align center、align bottom

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### データの検査 {#inspect-data-22}

プロパティと値のペアを JSON 形式で表示します。

#### 関係 {#relationships-1}

テーブルデータとアプリ内のコンポーネント間のデータ依存関係を表示します。

#### 例 {#example-12}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


{{% collapse-content title="テキストエリア" level="h3" %}}
テキストエリアコンポーネントには、以下のプロパティがあります。

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value
: テキストエリアが読み込まれたときに選択されている値。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### 外観 {#appearance-23}

Is Disabled
: 無効にしたスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-16}

Event
: **値**: change、submit

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setValue<br>
**例**: `textArea0.setValue("text")` は、`textArea0` コンポーネントの値を `"text"` に設定します。<br>
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-23}

プロパティと値のペアを JSON 形式で表示します。
{{% /collapse-content %}}


{{% collapse-content title="テキスト入力" level="h3" %}}
テキスト入力コンポーネントには、以下のプロパティがあります。

Label
: コンポーネントの上部に表示されるテキスト。<br>
**値**: 文字列または式

Default value
: テキスト入力が読み込まれたときに選択されている値。<br>
**値**: 文字列または式

Placeholder text
: 値が入力されていないときに表示されるテキスト。<br>
**値**: 文字列または式

#### 外観 {#appearance-24}

Is Disabled
: 無効にしたスタイルを適用し、操作を無効にします。<br>
**提示される値**: on、off

Is Visible
: コンポーネントがユーザーに対して表示されるかどうかを決定します。編集モードでは、すべてのコンポーネントが表示されたままになります。<br>
**提示される値**: on、off

#### イベント {#events-17}

Event
: **値**: change、submit

Reaction
: **値**: 例: open modal、trigger action、set component state<br>
すべての利用可能なリアクションは、「[イベント][1]」を参照してください。

State Function
: setValue<br>
**例**: `textInput0.setValue("text")` は、`textInput0` コンポーネントの値を `"text"` に設定します。
詳細については、「[状態関数][9]」を参照してください。

#### データの検査 {#inspect-data-24}

プロパティと値のペアを JSON 形式で表示します。

#### 例 {#example-13}

このコンポーネントをコンテキスト内で表示するには、[Metrics Explorer および Monitors Builder][2] アプリのブループリントを参照してください。
{{% /collapse-content %}}


## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やご意見がある場合は、[Datadog コミュニティ Slack][5] の {{< ui >}}#app-builder{{< /ui >}} チャンネルにご参加ください。


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