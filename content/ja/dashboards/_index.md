---
aliases:
- /ja/guides/templating/
- /ja/graphing/dashboards/
- /ja/guides/graphing
- /ja/graphing/miscellaneous/metrics_arithmetic
- /ja/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
- /ja/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
- /ja/graphing/
- /ja/dashboards/dashboards/
- /ja/dashboards/screenboards/
- /ja/dashboards/timeboards/
cascade:
  algolia:
    rank: 70
    tags:
    - スナップショット
    - serverless_aws_lambda
description: データを可視化して詳細な情報を把握
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: リリースノート
  text: Datadog ダッシュボードの最新リリースをチェック！ (アプリログインが必要です)。
- link: /dashboards/template_variables/
  tag: ドキュメント
  text: テンプレート変数を使用してダッシュボードを強化
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: ブログ
  text: 関連するテンプレート変数を使用してダッシュボードを調整
- link: /dashboards/sharing/
  tag: Documentation
  text: Datadogの外部でグラフを共有
- link: /dashboards/widgets/
  tag: Documentation
  text: ダッシュボードで利用可能なすべてのウィジェット
- link: /service_management/mobile/#dashboards
  tag: ドキュメント
  text: ダッシュボードをモバイルアプリで確認
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: ダッシュボードウィジェットをクリップボードに追加する
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: ブログ
  text: 新しい Datadog ダッシュボードエクスペリエンス
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: 開発者向けドキュメント
  text: 優れたインテグレーションダッシュボードを作成する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: ダッシュボードでより良い視覚化を実現するインタラクティブなセッションに参加できます

title: ダッシュボード
---

## 概要

ダッシュボードは、重要なパフォーマンスメトリクスを視覚的に追跡、分析、表示できる Datadog のツールです。ここでインフラストラクチャーの状態を監視します。

**注**: ダッシュボードの表示には [Datadog モバイルアプリ][1]を使用します。[Apple App Store][2] および [Google Play Store][3] で入手可能です。

{{< whatsnext desc="Dashboard features:">}}
    {{< nextlink href="/dashboards/configure" >}}構成: ダッシュボード構成オプションの概要{{< /nextlink >}}
{{< nextlink href="/dashboards/widgets" >}}ウィジェット: さまざまな視覚化の構成{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}クエリ: グラフクエリのフォーマットオプションを見る{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}関数: メトリクスクエリや結果のグラフを修正する{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}テンプレート変数: ダッシュボードのウィジェットを動的にフィルターする{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}オーバーレイ: 変更イベントをグラフに自動的にオーバーレイする{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: ダッシュボードをプログラムで管理する{{< /nextlink >}}
{{< /whatsnext >}}

## 新しいダッシュボード

ダッシュボードを作成するには、[ダッシュボードリスト][4]ページの **+New Dashboard** をクリックするか、ナビゲーションメニューから **New Dashboard** をクリックします。ダッシュボード名を入力し、レイアウトオプションを選択します。

{{< img src="dashboards/create-dashboard.png" alt="新しいダッシュボードの追加" style="width:70%;">}}

### ライブラリ
ダッシュボードは、画像、グラフ、ログなどのさまざまなオブジェクトを含めることができるグリッドベースのレイアウト上にあります。これは通常、ステータスボードやストーリーテリングビューとして使用され、リアルタイムで更新され、過去の定点を表すことができます。グリッドの幅は最大 12 マスで、デバッグにも適しています。

### 時間平均に基づくすべてのカスタムメトリクスを取得
タイムボードでは、ダッシュボード全体を定刻またはリアルタイムで自動レイアウトにより表示します。通常、トラブルシューティング、共同作業、一般データの調査に使用します。

### シグナルの詳細を取得する
スクリーンボードは自由形式のレイアウトのダッシュボードで、画像やグラフ、ログなど、様々なオブジェクトを含めることができます。リアルタイムに更新されたり、過去の定点を示すステータスボードやストーリーテリングビューとして使われるのが一般的です。

## リフレッシュレート

プライベートダッシュボードのリフレッシュレートは、表示している時間枠によって異なります。時間枠が短ければ短いほど、データの更新頻度は高くなります。公開共有ダッシュボードは、選択した時間枠に関係なく、30 秒ごとに更新されます。

| 時間枠   | リフレッシュレート |
|--------------|--------------|
| 1 分     | 10 秒   |
| 2 分    | 10 秒   |
| 5 分    | 10 秒   |
| 10 分   | 10 秒   |
| 30 分   | 20 秒   |
| 1 時間       | 20 秒   |
| 3 時間      | 1 分     |
| 4 時間      | 1 分     |
| 1 日        | 3 分     |
| 2 日       | 10 分    |
| 1 週間       | 1 時間       |
| 1 か月      | 1 時間       |
| 3 か月     | 1 時間       |
| 6 か月     | 1 時間       |
| 1 年       | 1 時間       |

## ダッシュボードリスト

[Dashboard List][4] ページでダッシュボードやリストを検索、表示、作成することができます。

### ヘルプ

**My Teams** トグルを使用して、すべてのダッシュボードを表示するか、自分の[チーム][5]が所有するダッシュボードのみを表示するかを切り替えることができます。

1 つまたは複数のダッシュボードに関連するチームを編集するには、次の手順を実行します。
1. 変更したい各ダッシュボードの横にあるチェックボックスを選択します。
1. 右上の **Edit Teams** ドロップダウンを開きます。
1. チェックボックスを使用して、ダッシュボードの適切なチームを選択します。
1. **Apply Changes** をクリックします。

### 新しいリスト

ダッシュボードリストを作成するには、右上にある **New List +** ボタンをクリックします。

リストのタイトルは、ユーザー名から自動的に設定されます。たとえば、John Doe さんがダッシュボードを作成した場合、タイトルはデフォルトで `John's list` (ジョンのリスト) になります。リストのタイトルを変更するには、タイトルをクリックするとテキストを編集できます。

ダッシュボードをリストに追加するには、メインのダッシュボードリストで、対応するチェックボックスをオンにします。次に、ダッシュボードリストの右上にある *Add to List* ボタンをクリックします。

{{< img src="dashboards/dash_to_list.png" alt="ダッシュボードをリストに追加" style="width:100%;">}}

### リスト

左側のサイドバーには、お気に入り、プリセット、編集可能な共有リストが表示されます。**Hide Controls** リンクを使用すると、このサイドバーを非表示にすることができます。

#### お気に入りリスト

Favorite lists (お気に入りリスト) は、現在ログインしているユーザーがスターを付けたダッシュボードのリストです。**注**: スター付きのリストがない場合、*Favorite Lists* のカテゴリは非表示になります。

#### プリセットリスト

Preset lists (プリセットリスト) は、Datadog でデフォルトのダッシュボードリストです。

| リスト                     | 説明                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom               | 組織アカウント内のチームメンバーによって作成されたカスタムダッシュボード。 |
| All Hosts                | ホストを追加すると Datadog で自動作成されるダッシュボード。              |
| All Integrations         | インテグレーションを設置すると Datadog で自動作成されるダッシュボード。  |
| All Shared               | 認証済みまたは公開リンクの共有が有効になっているダッシュボード。             |
| Created By You           | 現在のユーザーにより作成されたカスタムダッシュボード。                            |
| Frequently Viewed By You | 現在のユーザーが頻繁に表示するすべてのダッシュボード。                     |
| Recently Deleted         | 過去 30 日以内に削除されたダッシュボード。                               |

#### 削除されたダッシュボードの復元

削除されたダッシュボードを復元するには、プリセットの **Recently Deleted** リストを使用します。リストから、復元するすべてのダッシュボードを選択し、**Restore to** をクリックします。ダッシュボードを復元する特定のリストを選択するか、カスタムリストなしで復元する場合は **All Custom** を選択します。**Recently Deleted** にあるダッシュボードは、30 日後に完全に削除されます。

{{< img src="dashboards/recently_deleted.png" alt="削除したダッシュボードの復元" style="width:100%;">}}

#### 共有、編集可能リスト

このセクションには、編集可能な共有ダッシュボードのリストがダッシュボード数とともに表示されます。

### すべてのダッシュボード

ここに表示されるすべてのダッシュボードは、*スター*、*名前*、*変更日時*、*人気度*の列ヘッダーを使用して並べ替えることができます。すべての列とその説明は以下のとおりです。

| 列     | 説明                                                                              |
|------------|------------------------------------------------------------------------------------------|
| スター       | 現在のユーザーがスターを付けたすべてのダッシュボード。                                              |
| アイコン       | ダッシュボードの種類 (タイムボードまたはスクリーンボード) を示すアイコン。                     |
| 名前       | カスタムダッシュボードまたはプリセットダッシュボードの名前。                                              |
| Modified   | カスタムダッシュボードの最終更新日。                                            |
| 人気度 (Popularity) | 組織のダッシュボードの相対的な[人気度](#人気度)。           |
| Creator    | ダッシュボードの作成者のプロファイルアイコンです。プリセットダッシュボードでは、インテグレーションロゴを使用します。 |

#### 人気度 (Popularity)

組織で最も人気のあるダッシュボードに 5 つの人気度バーが表示されます。他のすべてのダッシュボードの人気度は、このダッシュボードを基準として評価されます。人気度は、ダッシュボードが受信するトラフィック量に基づきます。人気度は毎日更新され、新しいダッシュボードの人気度バーは最大 24 時間の間はゼロです。

**注**: 公開ダッシュボード URL のトラフィックは、人気度に反映されません。

## モバイルデバイスでダッシュボードを表示する

[Apple App Store][2] や [Google Play Store][3] で提供されている [Datadog モバイルアプリ][1]を利用すると、モバイルフレンドリーなフォーマットでダッシュボードを表示することができます。

ダッシュボードページでは、すべてのダッシュボードを表示、検索し、Datadog Web アプリで設定したものと同じテンプレート変数を使用してそれらをフィルタリングできます。テンプレート変数の保存済みビューを使用して、ダッシュボードをすばやくフィルタリングします。テンプレート変数を使った保存済みビューの詳細については、[ダッシュボード保存済みビュー][6]をご覧ください。個々のダッシュボードをクリックして表示します。

**注**: ダッシュボードの設定や編集を行うには、Datadog のブラウザ UI にログインする必要があります。

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS と Android のダッシュボード">}}

## モバイルホーム画面のダッシュボードを作成する

[Apple App Store][2] や [Google Play Store][3] で提供されている [Datadog モバイルアプリ][1]には、モバイルホーム画面のウィジェットも装備されています。これらのウィジェットを利用することで、モバイルアプリを開くことなく、サービスの健全性やインフラストラクチャーを監視することができます。

SLO、モニター、オープンインシデントのウィジェットを、他の開発ツールやコラボレーションツールと一緒にモバイルのホーム画面に追加して、トリアージとインシデント管理のワークフローを最適化することができます。

{{< img src="dashboards/dashboards-widget-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS と Android のウィジェット">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists
[5]: /ja/account_management/teams/
[6]: /ja/dashboards/template_variables/#saved-views
