---
aliases:
- /ja/app_builder/build
- /ja/service_management/app_builder/build
description: ドラッグ＆ドロップの UI コンポーネント、クエリ、JavaScript 式を使用して、ブループリントから、またはゼロからカスタムアプリを作成します。
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: ドキュメント
  text: Action Catalog
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: ラーニングセンター
  text: App Builder の概要
title: アプリの構築
---
[App Builder][1] ページから、アプリの作成や既存アプリの編集ができます。このページには、以下のような既存のアプリに関する情報が一覧表示されます。
- 作成者
- タグ
- 各アプリの最終更新日
- 各アプリが公開されているかどうか

App Builder ページでは、アプリへのアクセスや絞り込みができます。アプリにカーソルを合わせると、アプリの編集、削除、表示、複製のオプションが表示されます。{{< ui >}}My apps{{< /ui >}} トグルを有効にして、自身が作成したアプリのみを表示することもできます。

{{< img src="actions/app_builder/app-builder-my-apps-2025-11-19.png" alt="'My apps' のみに絞り込まれた App Builder ページ" style="width:100%;" >}}

## アプリの作成 {#create-an-app}

新しいアプリを作成する際は、[AI][22]、[ブループリント][18]、[レイアウト][19]、または[アクション][20]を使用して開始できます。または、[ゼロから作成][21]したり、[App Playground][23] を使用して App Builder について詳しく学習することもできます。

### AI によるアプリの構築 {#build-an-app-with-ai}

Bits AI を使用すると、1 つのプロンプトからアプリ全体を生成できます。作成したいアプリの内容を入力すると、UI エージェントが既存のデータや権限にマッピングされた UI、アクション、ロジックを自動的に生成します。その後、コードを記述することなく、チャットを通じてコンポーネント、フロー、スタイリングを調整し、反復的に改善できます。

Bits AI でアプリを構築するには、
1. [App Builder][1] から、{{< ui >}}New App{{< /ui >}} をクリックします。
1. 推奨プロンプトをクリックするか、作成したいアプリの内容を説明するプロンプトを入力します。精度を向上させるため、できるだけ詳細に入力します。プロンプトの例を以下に示します。
   - `Display a list of AWS Lambda functions in a table. Allow the user to filter by function name and specify the limit.`
   - `Display GitHub pull requests in a table.`
1. <kbd>Enter</kbd> を押してプロンプトを送信します。Bits AI は、既存のデータや権限にマッピングされたアプリの UI、アクション、ロジックを自動的に生成します。
    - Bits AI がアプリを生成している間、実際のデータを使用してアプリを構築するためのコネクションを設定する画面が表示される場合があります。このステップを完了することも、スキップしてデータなしでアプリのレイアウトをより迅速に構築することもできます。
    - Bits AI は、プロンプトに応答する際に確認の質問をすることがあります。その場合は、回答を入力してから <kbd>Enter</kbd> を押します。
    - Bits AI がアプリにアクションを追加した後、そのアクションでモックデータを使用するか、そのステップをスキップするかを選択できます。モックデータを使用すると、Bits AI はアクションの出力を推論し、そのデータをコンポーネントに自動的に接続できます (テーブルのデータソースの設定など)。このステップをスキップした場合は、後から手動で出力を接続できます。
1. Bits AI がアプリを生成した後、{{< ui >}}Edit with AI{{< /ui >}} をクリックするか、手動で[アプリをカスタマイズ][15]できます。

既存のアプリで反復改善を行うには、
1. [アプリ一覧][14]から、アプリにカーソルを合わせて編集 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} アイコンをクリックします。
1. AI **<i class="icon-bits-ai"></i>** アイコンをクリックします。
1. アプリに追加したい動作の詳細なプロンプトを入力します。使用したいインテグレーションとアクションを含めます。
1. <kbd>Enter</kbd> を押して、アプリに機能を追加します。

### ブループリントからのアプリの構築 {#build-an-app-from-a-blueprint}

ブループリントは、一般的なユースケースをカバーし、アプリ設定のベストプラクティスを示す便利なアプリテンプレートです。Blueprints にはデモデータがあらかじめ読み込まれており、アプリの機能を習得するのに役立ちます。[データストアの管理][24] や [Synthetics のエクスポート][25] のように、カスタマイズ可能なスターターアプリを作成するブループリントもあります。[方法: カスタムコード][26]のようにタイトルに "how to" が含まれるブループリントは、App Builder 機能のチュートリアルが組み込まれたテンプレートです。

1. [App Builder][1] から、[**Blueprints**][2] タブをクリックします。
1. 使用するブループリントをクリックします。
1. {{< ui >}}Open in Editor{{< /ui >}} をクリックします。
1. [アプリをカスタマイズ][15]。

<div class="alert alert-tip">ブループリントには、<a href="https://app.datadoghq.com/integrations">インテグレーションページ</a>からもアクセスできます。インテグレーションをクリックし、<b>Monitoring Resources</b> をクリックして、利用可能なブループリントを表示します。</div>

### レイアウトからのアプリの構築 {#build-an-app-from-a-layout}

レイアウトを選択することは、編集可能な最小限のアプリを最も素早く作成する方法です。

レイアウトからアプリを作成するには、
1. [App Builder][1] から、{{< ui >}}New App{{< /ui >}} をクリックします。
1. オンボーディングモーダルで {{< ui >}}Layouts{{< /ui >}} をクリックします。
1. レイアウトを選択します。次の 3 つのオプションがあります。
    - {{< ui >}}Table Manager{{< /ui >}}: クエリからのデータを一覧表示、絞り込み、並べ替えします。
    - {{< ui >}}Form{{< /ui >}}: 入力を収集し、アクション (作成、更新、リクエストなど) をトリガーします。より詳細なフォームテンプレートについては、[**フォーム**][27]を参照してください。
    - {{< ui >}}Custom Chart{{< /ui >}}: データをあらかじめ構築された棒グラフに入れ替えて、クエリを視覚化します。
1. {{< ui >}}Use Layout{{< /ui >}} をクリックします。
1. [アプリをカスタマイズ][15]。

### アクションからのアプリの構築 {#build-an-app-from-an-action}

[Action Catalog][17] からインテグレーションと特定のアクションを選択して、アプリを作成できます。App Builder はアクションとそのクエリを事前構成し、ライブデータをアプリキャンバスに取り込みます。その後、コンポーネントを接続してすぐにアプリをテストできます。この方法は、すでにインテグレーションやアクションが決まっている場合 ([Datadog データストア][28] との相互作用など) に最適です。

1. [App Builder][1] から、{{< ui >}}New App{{< /ui >}} をクリックします。
1. オンボーディングモーダルで **Action** をクリックします。
1. インテグレーションを選択し、**Continue** をクリックします。
1. 1 つまたは複数のアクションを選択します。各アクションセットは、選択したインテグレーションに固有のテンプレートです。選択できるアクションの数に制限はありません。
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。
1. [アプリをカスタマイズ][15]。

### カスタムアプリの作成 {#create-a-custom-app}

上記のいずれの方法も使用しない場合は、空の App Builder キャンバスから新しいアプリを作成できます。

1. [App Builder][1] から、{{< ui >}}New App{{< /ui >}} をクリックします。
1. {{< ui >}}Start From Scratch{{< /ui >}} をクリックするか、{{< ui >}}X{{< /ui >}} をクリックしてオンボーディングモーダルを閉じます。
1. [アプリをカスタマイズ][15]。

### App Playground で実現可能な機能 {#see-whats-possible-with-app-playground}

App Playground は、アプリの作成と使用方法をユーザーに案内するインタラクティブなデモです。App Builder を初めて使用する場合は、App Playground を使用して以下の主要な概念を学習できます。
- データの取得
- テーブルへのクエリデータの表示
- クエリを実行するためのボタンの構成
- クエリの読み込み状態を反映するためのコンポーネントの読み込み状態の構成
- グラフでのデータの視覚化

App Playground にアクセスするには、
1. [App Builder][1] から、{{< ui >}}New App{{< /ui >}} をクリックします。
1. {{< ui >}}App Playground{{< /ui >}} をクリックします。
1. 次の画面で、アプリキャンバス (右側のペイン) に App Builder のガイダンス情報が表示されます。{{< ui >}}Fetching Data{{< /ui >}} などの要素をクリックすると、その機能の使用方法に関する情報や手順が表示されます。

## アプリのカスタマイズ {#customize-your-app}

アプリは、相互に作用してユーザーエクスペリエンスと各アプリの背後にあるロジックを形成する UI コンポーネントとクエリで構成されています。クエリリストとエディターはページの左側に表示され、アプリキャンバスと UI コンポーネントはページの右側を構成します。

アプリの基本要素を変更するには、
1. [App Builder][1] から、アプリにカーソルを合わせて編集 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} アイコンをクリックします。
1. 必要に応じてアプリを編集します。
    1. アプリ名をクリックして、以下の要素を編集します。
        - 名前
        - 説明
        - タグ
        - 外観
    1. [入力パラメーター][29]を編集します。
    1. [UI コンポーネント](#app-canvas-and-components) をアプリキャンバスに追加するには、{{< ui >}}Add Component{{< /ui >}} <i class="icon-component-wui" style="position:relative; top:4px;"></i> アイコンをクリックして {{< ui >}}Components{{< /ui >}} タブを開きます。コンポーネントをクリックするか、キャンバス上にドラッグします。
1. {{< ui >}}View{{< /ui >}} ボタンをクリックして、ユーザーの視点からアプリを確認します。表示モードを使用して、アプリの UI を操作し、クエリをテストします。完了したら、{{< ui >}}Edit{{< /ui >}} をクリックして App Builder に戻ります。
1. アプリを保存するには、{{< ui >}}Save{{< /ui >}} をクリックします。
1. アプリを公開する準備ができたら、{{< ui >}}Publish{{< /ui >}} をクリックします。アプリを公開すると、ダッシュボードで利用できるようになります。

### アプリキャンバスとコンポーネント {#app-canvas-and-components}

アプリキャンバスは、ユーザーが操作するグラフィカルインターフェースを表します。コンポーネントをドラッグ & ドロップして、キャンバス上で移動できます。利用可能なすべてのコンポーネントを表示するには、プラス {{< img src="actions/app_builder/components-icon.png" inline="true" width="30px">}} アイコンをクリックして {{< ui >}}Components{{< /ui >}} タブを開きます。

各コンポーネントには、ユーザーによるアプリの操作方法を制御する、対応する構成オプションのリストがあります。たとえば、{{< ui >}}Text Input{{< /ui >}} コンポーネントでは、デフォルト値、プレースホルダーテキスト、ラベルを設定できます。{{< ui >}}Button{{< /ui >}} コンポーネントには、ラベルと、ボタンが押されたときにトリガーされるイベントが含まれています。コンポーネントには、コンポーネントの外観や動作を変更する {{< ui >}}Appearance{{< /ui >}} セクションもあります。たとえば、ボタンを無効にしたり、その表示を制御したりできます。

コンポーネントを削除または複製するには、コンポーネントを選択し、3 点リーダー (*...*) をクリックして {{< ui >}}Delete{{< /ui >}} または {{< ui >}}Duplicate{{< /ui >}} オプションを表示します。

利用可能な UI コンポーネントとそのプロパティのリストについては、[コンポーネント][9]を参照してください。

UI コンポーネントは、[イベント][11]でリアクションをトリガーできます。

[クエリ][12]は、Datadog API やサポートされているインテグレーションからのデータをアプリに入力します。クエリは他のクエリや UI コンポーネントから入力を受け取り、他のクエリや UI コンポーネントで使用するための出力を返します。

App Builder の任意の場所で [JavaScript 式][13]を使用して、アプリのさまざまな部分間でカスタムインタラクションを作成できます。

## アプリへのタグ付け {#tag-an-app}

タグは[アプリ一覧][14]の列に表示されます。

アプリにタグを追加するには、

1. アプリの {{< ui >}}App Properties{{< /ui >}} タブを開きます。
1. {{< ui >}}Tags{{< /ui >}} で、ドロップダウンを使用して既存のタグを選択するか、新しい値を入力して {{< ui >}}Add option: [your text]{{< /ui >}} をクリックします。
1. アプリを保存します。

タグは、アプリ一覧内のこのアプリの行に表示されます。この一覧内のタグをクリックすると、クリップボードにコピーできます。

## アプリのお気に入り登録 {#favorite-an-app}

アプリをお気に入り登録すると、[アプリ一覧][14]の上部に固定されます。

アプリをお気に入り登録するには、アプリ名の横にある星 <i class="icon-star-empty-wui" style="position:relative; top:4px;"></i> アイコンをクリックします。ページを更新すると、お気に入り登録したアプリがアプリ一覧の上部に表示されます。

## アプリのバージョン履歴の表示 {#view-app-version-history}

App Builder は、保存されたアプリのすべてのバージョンの記録を保持します。

アプリのバージョン履歴を表示するには、アプリの左側メニューでバージョン履歴 {{< img src="icons/version-history.png" inline="true" style="width:14px;">}} アイコンをクリックします。

UI には、以前に保存または公開されたアプリのバージョンと、そのバージョンを保存または公開したユーザーのアイコンが表示されます。

{{< img src="actions/app_builder/version-history-example.png" alt="現在のバージョンと以前のバージョンの 2 つの項目がある App Builder バージョン履歴一覧の例" style="width:70%;" >}}

以下の操作を実行できます。

* アプリのバージョンを表示するには、一覧内のバージョンをクリックします。
* 既存のアプリを以前のバージョンで上書きするには、そのバージョンを選択し、右上の {{< ui >}}Restore Version{{< /ui >}} をクリックします。
* 特定バージョンのコピーとして新しいアプリを作成するには、そのバージョンを選択し、右上の {{< ui >}}Clone Version{{< /ui >}} をクリックします。


## JSON でのアプリの操作 {#interact-with-an-app-in-json}

### アプリの編集 {#edit-an-app}

JSON でアプリを編集するには、設定 {{< img src="icons/settings.png" inline="true" style="width:14px;">}} アイコンをクリックし、{{< ui >}}Switch to JSON{{< /ui >}} を選択します。設定メニューの {{< ui >}}Switch to GUI{{< /ui >}} オプションを選択すると、GUI エディターに戻ります。

### アプリのコピー {#copy-an-app}

アプリのレイアウトを組織間でコピーしたり、アプリをバックアップしたりするには、設定 {{< img src="icons/settings.png" inline="true" style="width:14px;">}} アイコンをクリックし、{{< ui >}}Switch to JSON{{< /ui >}} を選択します。これにより、アプリ全体の JSON コードが表示されます。この JSON コードをコピーして、テキストエディターに保存します。開発中にアプリの中間状態を保存し、必要に応じてその状態に戻すことができます。

アプリを別の組織にコピーするには、
1. アプリを作成します。
1. {{< ui >}}Settings{{< /ui >}} をクリックし、{{< img src="icons/settings.png" inline="true" style="width:14px;">}} {{< ui >}}Switch to JSON{{< /ui >}} を選択します。
1. 既存の JSON を、以前にコピーした JSON に置き換えます。

設定メニューの {{< ui >}}Switch to GUI{{< /ui >}} オプションを選択すると、GUI エディターに戻ります。

## アプリのデバッグ {#debug-an-app}

App Builder デバッグコンソールは、リアルタイムのログ、アクションの実行、エラーを一元的に表示する場所を提供します。

デバッグコンソールにアクセスするには、[アプリ一覧][14]でアプリにカーソルを合わせ、編集 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} アイコンをクリックします。右下の展開アイコンをクリックすると、 {{< img src="icons/panel-bottom-grow.png" inline="true" style="width:14px;">}} デバッグコンソール全体が表示されます。コンソール内の情報には以下が含まれます。
- {{< ui >}}Action Executions{{< /ui >}}: アクション実行の成功と失敗を、関連する入力および出力とともに追跡します。
- {{< ui >}}Errors{{< /ui >}}: エラー、警告、および情報メッセージのログを表示します。
- {{< ui >}}Logs{{< /ui >}}: アクション、トランスフォーマー、変数、およびコンポーネントの構成エラーを表示します。
- {{< ui >}}App State{{< /ui >}}: リアルタイムのアプリケーション状態の変更にアクセスします。

{{< img src="actions/app_builder/app-builder-debug-console.png" alt="アプリのエディター表示内にあるデバッグコンソールの展開されたパネル" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][8] の **#app-builder** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /ja/actions/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /ja/actions/connections
[6]: /ja/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[9]: /ja/actions/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /ja/actions/app_builder/events
[12]: /ja/actions/app_builder/queries
[13]: /ja/actions/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list
[15]: /ja/actions/app_builder/build/#customize-your-app
[16]: /ja/getting_started/integrations/
[17]: /ja/actions/actions_catalog/
[18]: /ja/actions/app_builder/build/#build-an-app-from-a-blueprint
[19]: /ja/actions/app_builder/build/#build-an-app-from-a-layout
[20]: /ja/actions/app_builder/build/#build-an-app-from-an-action
[21]: /ja/actions/app_builder/build/#create-a-custom-app
[22]: /ja/actions/app_builder/build/#build-an-app-with-ai
[23]: /ja/actions/app_builder/build/#see-whats-possible-with-app-playground
[24]: https://app.datadoghq.com/app-builder/apps/edit?template=manage-datastore&viewMode=templatePreview
[25]: https://app.datadoghq.com/app-builder/apps/edit?template=export-synthetics&viewMode=templatePreview
[26]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to__write_custom_code&viewMode=templatePreview
[27]: /ja/actions/forms/
[28]: /ja/actions/datastores/
[29]: /ja/actions/app_builder/embedded_apps/input_parameters/