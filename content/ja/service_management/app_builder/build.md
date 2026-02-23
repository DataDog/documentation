---
aliases:
- /ja/app_builder/build
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: ドキュメント
  text: Actions Catalog
title: アプリの構築
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では App Builder はサポートされていません。</div>
{{< /site-region >}}

[App Builder][1] ページから、新しいアプリを作成したり、既存のアプリを編集したりできます。このページには、既存のアプリに関する情報が一覧表示されます。内容は次のとおりです:
- Author
- ステータス
- 各アプリの最終更新日
- アプリが公開済みかどうか

App Builder ページでは、アプリにアクセスしてフィルターできます。アプリにカーソルを合わせると、編集、削除、表示、複製の各オプションが表示されます。作成したアプリのみを表示したい場合は、**My apps** トグルを有効にします:

{{< img src="service_management/app_builder/app-builder-my-apps.png" alt="App Builder ページで 'My apps' のみが表示されるようにフィルターした状態" style="width:100%;" >}}

## アプリを作成する

### Blueprint からアプリを作成する

Blueprint は、一般的なユース ケースをカバーする便利なスターター アプリです。アプリに慣れるために使えるデモ データがあらかじめ含まれています。また、Blueprint はアプリの機能設定やビジュアル プレゼンテーションにおけるベスト プラクティスも示します。

1. [App Builder][1] から [Blueprints][2] タブをクリックします。
1. 使用したい Blueprint を見つけて **Preview** をクリックします。
1. **Use Blueprint** をクリックして、そのアプリの Blueprint を開きます。
1. アプリ名と説明を変更するには、アプリ名をクリックします。
1. 各 Blueprint テンプレートにはデモ データが含まれています。アプリをカスタマイズするには、各クエリの **Connection** を編集します。
1. アプリを保存するには **Save as New App** をクリックします。
1. アプリをプレビューするには **Preview** をクリックします。プレビュー画面から **Edit** をクリックすると設定ビューに戻ります。
1. アプリの変更が完了したら、テストのために **Run** をクリックします。
1. アプリを公開する準備ができたら **Publish** をクリックします。アプリを公開すると、あなたのダッシュ ボードで利用できるようになります。

### カスタムアプリを作成する

1. [App Builder][1] から **New App** をクリックします。
1. アプリ名と説明を変更するには、アプリ名をクリックします。
1. アプリ キャンバスに [UI コンポーネント](#app-canvas-and-components) を追加するには、プラス アイコン ({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}}) をクリックして **Components** タブを開き、コンポーネントをクリックするか、キャンバス上にドラッグします。
1. [クエリ](#queries) を使用して、キャンバスにデータを流し込んだり、キャンバスとやり取りします。
1. アプリを保存するには **Save as New App** をクリックします。
1. アプリをプレビューするには **Preview** をクリックします。プレビュー画面から **Edit** をクリックすると設定ビューに戻ります。
1. アプリの変更が完了したら、テストのために **Run** をクリックします。
1. アプリを公開する準備ができたら **Publish** をクリックします。アプリを公開すると、あなたのダッシュ ボードで利用できるようになります。

## アプリをカスタマイズする

アプリは、相互に連携する UI コンポーネントとクエリで構成され、各アプリのユーザー エクスペリエンスとロジックを形作ります。ページ左側にクエリ リストとエディタが表示され、右側にアプリ キャンバスと UI コンポーネントが配置されています。

基本的なカスタマイズ:
- アプリの **Name**、**Description**、**Canvas Color** を編集するには、左上のアプリ名をクリックします。
- **Preview** ボタンをクリックしてアプリをプレビューします。プレビュー モードでは、ユーザーの視点からアプリを確認できます。プレビュー モードを使ってアプリ UI と対話し、クエリをテストします。完了したら **Edit** をクリックして App Builder に戻ります。
- アプリを保存するには **Save** をクリックします。
- アプリを公開する準備ができたら **Publish** をクリックします。アプリを公開すると、あなたのダッシュ ボードで利用できるようになります。

### アプリ キャンバスとコンポーネント

アプリ キャンバスは、ユーザーが操作するグラフィカルなインターフェースを表します。コンポーネントをドラッグ アンド ドロップして、キャンバス上で移動できます。利用可能なコンポーネントをすべて表示するには、プラス アイコン ({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}}) をクリックして **Components** タブを開きます。

各コンポーネントには、ユーザーがアプリとやり取りする方法を制御する、対応する設定オプションの一覧があります。例えば、 **Text Input** コンポーネントでは、既定値、プレースホルダー テキスト、ラベルを設定できます。 **Button** コンポーネントには、ラベルと、ボタンが押されたときにトリガーされるイベントが含まれます。コンポーネントには、見た目や動作を変更する **Appearance** セクションもあります。例えば、ボタンを無効化したり、可視性を制御したりできます。

コンポーネントを削除または複製するには、コンポーネントを選択して、三点リーダー (*...*) をクリックし、**Delete** または **Duplicate** オプションを表示します。

利用可能な UI コンポーネントとそのプロパティの一覧は、 [コンポーネント][9] を参照してください。

UI コンポーネントは、 [イベント][11] 上でリアクションをトリガーできます。

[クエリ][12] は、Datadog API やサポートされているインテグレーションからデータを取得して、アプリをデータで満たします。他のクエリや UI コンポーネントから入力を受け取り、他のクエリや UI コンポーネントで使用するための出力を返します。

App Builder の任意の場所で [JavaScript Expressions][13] を使用して、アプリ内のさまざまな部分間でカスタム インタラクションを作成できます。

## アプリにタグを付ける

タグは [アプリ リスト][14] の列に表示されます。

アプリにタグを追加するには:

1. アプリで **App Properties** タブを開きます。
1. **Tags** で、ドロップ ダウンから既存のタグを選択するか、新しい値を入力して **Add option: [your text]** をクリックします。
1. アプリを保存します。

タグは、アプリ リスト内のこのアプリの行に表示されます。このリスト内のタグをクリックすると、クリップボードにコピーできます。

## アプリをお気に入りに追加する

アプリをお気に入りにしてアプリのリストの先頭に固定するには、 [アプリ リスト][14] のアプリ名の横にある星をクリックします:

{{< img src="service_management/app_builder/app-list-star.png" alt="4 つのアプリがあり、どれもスターが付いていないアプリ リスト" style="width:40%;" >}}

ページを更新すると、スター付きのアプリが、アプリのリストの先頭のセクションに表示されます:

{{< img src="service_management/app_builder/app-list-with-favorited-app.png" alt="4 つのアプリがあるアプリ リスト。1 つがスター付きでリストの先頭に固定されている" style="width:40%;" >}}

## アプリのバージョン履歴を表示する

App Builder は、アプリの保存済みの各バージョンを記録として保持します。

アプリのバージョン履歴を表示するには、アプリの左側メニューでバージョン履歴アイコン {{< img src="service_management/app_builder/version-history-icon.png" inline="true">}} をクリックします。

UI は、保存済みまたは公開済みのアプリのバージョンを最大 50 件まで表示し、さらにそのバージョンを保存または公開したユーザーのアイコンも表示します:

{{< img src="service_management/app_builder/version-history-example.png" alt="App Builder のバージョン履歴一覧の例。2 件の項目 (現在のバージョンと前のバージョン)" style="width:70%;" >}}

次の操作を実行できます:

* アプリのバージョンを表示するには、一覧の該当バージョンをクリックします。
* 既存のアプリを以前のバージョンで上書きするには、そのバージョンを選択し、右上の **Restore Version** をクリックします。
* バージョンのコピーとして新しいアプリを作成するには、そのバージョンを選択し、右上の **Clone Version** をクリックします。


## JSON でアプリを操作する

### アプリを編集する

JSON でアプリを編集するには、歯車 (**Settings**) アイコンをクリックし、**Switch to JSON** を選択します。設定メニューの **Switch to GUI** を選ぶと、GUI エディタに戻ります。

### アプリをエクスポートする

組織間でアプリのレイアウトをコピーしたりバックアップしたりするには、歯車 (**Settings**) アイコンをクリックして **Switch to JSON** を選択します。アプリ全体の JSON コードが表示されます。この JSON コードをコピーして、テキスト エディタに保存します。開発の途中段階を保存して、必要に応じて戻ることもできます。

アプリを別の組織にコピーするには:
1. アプリを作成します。 
1. 歯車 (**Settings**) アイコンをクリックし、**Switch to JSON** を選択します。 
1. 既存の JSON を、先ほどコピーした JSON に置き換えます。 

設定メニューの **Switch to GUI** を選ぶと、GUI エディタに戻ります。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br> ご質問やフィードバックはありますか? [Datadog Community Slack][8] の **#app-builder** チャンネルに参加してください。

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /ja/service_management/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /ja/service_management/workflows/connections
[6]: /ja/service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://datadoghq.slack.com/
[9]: /ja/service_management/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /ja/service_management/app_builder/events
[12]: /ja/service_management/app_builder/queries
[13]: /ja/service_management/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list