---
aliases:
- /ja/monitors/monitor_uptime_widget/
- /ja/monitors/slos/
- /ja/monitors/service_level_objectives/
description: SLO のステータスを追跡する
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: ブログ
  text: Datadog で SLO のステータスとエラーバジェットを追跡する
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: ラーニングセンター
  text: サービスレベル目標入門
- link: https://www.datadoghq.com/blog/service-page/
  tag: ブログ
  text: サービステレメトリー、エラー追跡、SLO など
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: ブログ
  text: SLO アラートによるサービスパフォーマンスのプロアクティブな監視
- link: https://www.datadoghq.com/blog/slo-key-questions/
  tag: ブログ
  text: SLO を設定する際のキーとなる質問
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 効果的なモニターと SLO の作成に関するインタラクティブなセッションに参加できます
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: 外部サイト
  text: Terraform で SLO を作成・管理する
title: サービスレベル目標（SLO）
---

{{< jqmath-vanilla >}}

<br />

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}}
  Explore and register for Foundation Enablement sessions. Learn how you can prioritize and address the issues that matter most to your business with native SLO and SLA tracking.
{{< /learning-center-callout >}}

## 概要

サービスレベル目標 (SLO) は、サイト信頼性エンジニアリングツールキットの重要な要素です。SLO を使用し、アプリケーションのパフォーマンスに明確なターゲットを定義するためのフレームワークを整えることで、一貫したカスタマーエクスペリエンスを提供したり、プラットフォームの安定性を保ちつつ機能を開発したり、内部および外部ユーザーとのコミュニケーションを改善するために役立てることができます。

## 重要な用語

サービスレベル指標 (SLI)
: サービスのパフォーマンスまたは信頼性を定量的に測定するもの。Datadog SLO では、SLI はメトリクスまたは 1 つ以上のモニターの集合体です。

サービスレベル目標 (SLO)
: 特定の期間における SLI のターゲット割合。

サービスレベル契約 (SLA)
: クライアントとサービスプロバイダとの間で交わされる、明示的または暗示的な合意事項で、クライアントの信頼性に対する期待とそれを満たさない場合にサービスプロバイダ側が補償する内容について規定したもの。

エラーバジェット
: SLO のターゲット割合 (100% - ターゲット割合) から算出される許容範囲内の不確実性。これは製品開発における投資として見なされます。

## SLO タイプ

SLO を作成する際、以下のタイプから選択できます。
- **メトリクスベースの SLO**: SLI をカウントベースで計算したい場合に使用でき、SLI は優良イベントの合計を全イベントの合計で割った値として計算されます。
- **モニターベースの SLO**: SLI を時間ベースで計算したい場合に使用でき、SLI はモニターのアップタイムを基にしています。モニターベースの SLO は新規または既存の Datadog モニターに基づく必要があり、調整はそのモニターに対して行う必要があります (SLO の作成時にはできません)。
- **タイムスライス SLO**: SLI を時間ベースで計算したい場合に使用でき、SLI はカスタムアップタイム定義 (システムが正常な動作を示した時間を合計時間で割ったもの) に基づきます。タイムスライス SLO は、Datadog モニターを必要とせず、さまざまなメトリクスフィルターとしきい値を試して、SLO 作成中にダウンタイムを即座に調査することができます。

全体的な比較については、[SLO タイプ比較][1]チャートをご覧ください。

## セットアップ

Datadog の[サービスレベル目標ステータスページ][2]を利用して、新規 SLO の作成や既存のすべての SLO の表示・管理を行います。

### 構成

1. [SLO ステータスページ][2]で **New SLO +** を選択します。
2. SLO タイプを選択します。[メトリクスベース][3]、[モニターベース][4]、または[タイムスライス][5]のいずれかのタイプで SLO を作成できます。
3. SLO のターゲットとローリング期間 (7 日、30 日、90 日経過後) を設定します。Datadog では、SLO のターゲットを SLA で指定した値より厳し目に設定することを推奨しています。期間を複数設定する場合は、プライマリに設定する期間を 1 つ選択します。この期間が SLO 一覧に表示されます。デフォルトでは、最も短い期間が選択されます。
4. 最後に、SLO にタイトルを付け詳細を入力するか、説明にリンクを足しタグを追加して保存します。

SLO を設定したら、[サービスレベル目標リストビュー][2]から SLO を選択して、詳細サイドパネルを開きます。サイドパネルには、SLO の各ターゲットの全体的なステータス比率と残りのエラーバジェット、そして SLI の履歴を示すステータスバー (モニターベースの SLO 用) または棒グラフ (メトリクスベースの SLO 用) が表示されます。1 つの[マルチアラートモニター][6]を使用してグループ化されたモニターベースの SLO を作成した場合、または [`sum by` 句][7]を使用してグループ化されたメトリクスベースの SLO を作成した場合、全体的なステータスのパーセンテージと残りのエラーバジェットに加えて、個々のグループのステータスのパーセンテージと残りのエラーバジェットが表示されます。

**例:** アベイラビリティーゾーンごとにレイテンシを追跡するためにモニターベースの SLO 作成すると、全体的な SLO と SLO が追跡している個々のアベイラビリティーゾーンのステータス割合とエラーバジェットの残量が表示されます。

**注:** エラーバジェットの残りはパーセンテージで表示され、次の式で計算されます。

$$\text"エラーバジェットの残り" = 100 * {\text"現在のステータス" - \text" ターゲット"} / { 100 - \text"ターゲット"}$$

### SLO ターゲットの設定

エラーバジェットとエラーバジェットアラートの利点を活用するには、SLO ターゲット値を 100% 未満に厳密に設定する必要があります。

100% の目標を設定するということは、エラーバジェットが 100% に等しいため、エラーバジェットが 0% になることを意味します (SLO ターゲット)。許容可能なリスクを表すエラーバジェットがないと、顧客対応の信頼性を維持するという相反する優先順位と機能開発への投資との間の整合性を見つけることが困難になります さらに、目標値が 100% の SLO は、SLO アラート評価でゼロ除算エラーにつながります。

**注:** SLO で指定できる小数の桁数は、SLO の種類と選択するタイムウィンドウに応じて異なります。それぞれの SLO の種類について、詳しくは次のリンクを参照してください。

[モニターベースの SLO][8]: 7 日および 30 日目標の場合は小数第 2 位まで、90 日目標の場合は小数第 3 位まで。

[メトリクスベースの SLO][9]: すべての目標について小数第 3 位まで。

## SLO の変更

SLO を編集するには、リストビューで SLO の行にカーソルを合わせて、行の右側に表示される編集鉛筆アイコンをクリックするか、行をクリックして詳細なサイドパネルを開き、パネルの右上に表示される歯車アイコンから編集ボタンを選択します。

## 権限

### ロールベースのアクセス

すべてのユーザーは、関連付けられた[ロール][10]に関係なく、SLO と [SLO ステータス修正](#slo-status-corrections)を閲覧できます。SLO の作成、編集、削除は、`slos_write` 権限を持つロールにアタッチされたユーザーのみが行えます。

ステータス修正を作成、編集、および削除するには、ユーザーは `slos_corrections` 権限を必要とします。この権限を持つユーザーは、それらの SLO を編集する権限を持っていなくても、ステータスの修正を行うことができます。権限の完全なリストについては、[RBAC ドキュメント][11]を参照してください。

### きめ細かなアクセス制御

編集を許可する[ロール][10]のリストを指定することで、個々の SLO へのアクセスを制限します。

{{< img src="service_management/service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="歯車メニューの SLO 権限オプション">}}

1. SLO をクリックすると、詳細サイドパネルが表示されます。
1. パネル右上の歯車アイコンをクリックします。
1. **Permissions** を選択します。
1. **Restrict Access** をクリックします。
1. ダイアログボックスが更新され、組織のメンバーはデフォルトで **Viewer** アクセス権を持っていることが表示されます。
1. ドロップダウンを使用して、SLO を編集できる 1 つまたは複数のロール、チーム、ユーザーを選択します。
1. **Add** をクリックします。
1. ダイアログボックスが更新され、選択したロールに **Editor** 権限があることが表示されます。
1. **Save** をクリックします。

SLO への編集アクセス権を維持するために、システムは保存する前に、自分がメンバーであるロールを少なくとも 1 つ含めることを要求します。アクセス制御リストのユーザーは、ロールを追加することができ、自分以外のロールを削除することのみが可能です。

**注**: ユーザーは、モニターへの書き込み権限がなくても、任意のモニターに SLO を作成することができます。同様に、ユーザーは SLO への書き込み権限がなくても、SLO アラートを作成することができます。モニターの RBAC 権限の詳細については、[RBAC ドキュメント][12]または[モニターの RBAC の設定方法に関するガイド][13]を参照してください。

## SLO の検索

[サービスレベル目標ステータスページ][2]では、すべての SLO に対し高度な検索を実行して、検索結果から SLO を検索、表示、編集、複製、削除できます。

高度な検索を使用し、SLO の属性をどれでも組み合わせて SLO をクエリできます。

* `name` および `description` - テキスト検索
* `time window` - 7日、30日、90日
* `type` - メトリクス、モニター
* `creator`
* `tags` - datacenter、env、service、team, など。

検索を実行するには、左側のファセットチェックボックスと上部の検索バーを使用します。ボックスをチェックすると、それに合わせて検索バーのクエリが更新されます。同様に、検索バーのクエリを変更 (あるいは新規入力) すると、ボックスのチェックが更新されます。クエリ結果はクエリの変更に合わせてリアルタイムで更新されます。'検索'ボタンはありません。

## SLO の表示

SLO を*任意*のタグでグループ化すると、データのサマリービューが表示されます。各状態 (違反、警告、OK、データなし) にある SLO の数を、サービス、チーム、ユーザージャーニー、階層、または SLO に設定されたその他のタグでグループ化して、すばやく分析できます。

{{< img src="service_management/service_level_objectives/slo_group_by_new.png" alt="チームごとにグループ化された SLO のサマリービュー" style="width:100%;" >}}

ステータス*とエラー予算*の列で SLO を並べ替え、注意が必要な SLO に優先順位をつけることができます。SLO リストには、[構成](#configuration)で選択した主要なタイムウィンドウの SLO の詳細が表示されます。その他の構成タイムウィンドウはすべて、個別のサイドパネルで表示できます。それぞれのテーブル行をクリックして、SLO 詳細サイドパネルを開きます。

**注**: [Apple App Store][15] および [Google Play Store][16] で入手できる [Datadog モバイルアプリ][14]をダウンロードすれば、モバイルデバイスのホーム画面から SLO を表示することが可能です。

{{< img src="service_management/service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS と Android 上の SLO">}}

### SLO タグ

SLO タグは、[SLO ステータスページ][2]でのフィルタリング、[SLO 保存ビュー][17]の作成、または SLO をグループ化して表示するために使用できます。タグは以下の方法で SLO に追加できます。

- SLO を作成または編集する際にタグを追加できます。
- SLO リストビューから、SLO リストの上部にある *Edit Tags* および *[Edit Teams][18]* ドロップダウンオプションを使用して、タグを一括して追加および更新できます。

{{< img src="service_management/service_level_objectives/slo_bulk_tag.png" alt="SLO リストページには、タグの一括編集のための Edit Tag ドロップダウンが表示されます" >}}

### SLO のデフォルトビュー

SLO のリストビューに移動すると、デフォルトの SLO ビューが読み込まれます。

デフォルトビューには以下が含まれます。

- 空の検索クエリ
- オーガニゼーションで定義されているすべての SLO リスト
- 左側のファセットリストで利用可能なファセットのリスト

### 保存ビュー

以下を共有することで、チームに最も関連性の高い SLO についてカスタマイズした検索を保存ビューの SLO リストビューに保存し共有することができます。

- 検索クエリ
- 選択したファセットのサブセット

リストビューで SLO のサブセットを問い合わせると、そのクエリを保存ビューとして追加できるようになります。

#### 保存ビューの追加

保存ビューを追加するには、

1. SLO を問い合わせます。
2. ページ左上の **Save View +** をクリックします。
3. ビューに名前を付けて保存します。

#### 保存ビューのロード

保存済みビューを読み込むには、ページ左上の **Show Views** ボタンを押して *Saved Views* パネルを開き、リストから保存済みビューを選択します。保存済みビューは、同じ *Saved Views* パネルの上部にある *Filter Saved Views* 検索ボックスで検索することもできます。

#### 保存ビューの共有

リストから保存済みビューにカーソルを合わせハイパーリンクを選択し、保存済みビューにリンクをコピーすれば、チームメイトと共有できます。

#### 保存ビューの管理

使用済みビューは一旦使用すると、その保存済みビューを選択し、クエリを変更し、*Saved Views*パネルのその名前の下にある *Update* ボタンをクリックすることで、更新することができます。保存済みビューの名前を変更したり、保存済みビューを削除するには、*Saved Views* パネルでその行にカーソルを合わせ、それぞれ、鉛筆アイコンをクリックするか、ゴミ箱アイコンをクリックします。

## SLO および SLO ステータス補正の監査イベント

SLO 監査イベントでは、[Event Explorer][27] または SLO 詳細の **Audit History** タブを使用して、SLO 構成の履歴を追跡できます。監査イベントは、SLO または SLO ステータス補正を作成、変更、または削除するたびに、Event Explorer に追加されます。各イベントには、SLO または SLO ステータス補正の構成に関する情報が含まれ、ストリームには構成変更の履歴が表示されます。

### SLO 監査イベント

各イベントには、以下の SLO コンフィギュレーション情報が含まれます。

- 名前
- 説明
- ターゲットパーセンテージおよび時間枠
- データソース (モニター ID またはメトリクスクエリ)

イベントエクスプローラーに表示される 3 種類の SLO 監査イベント:

- `SLO Created` イベントは作成時の SLO 構成情報を示します。
- `SLO Modified` イベントは、変更時に変更された構成情報を示します。
- `SLO Deleted` イベントは、SLO が削除される前の構成情報を示します。

### ステータス補正の監査イベント

各イベントには、以下の SLO ステータス補正構成情報が含まれます。

- SLO 名
- ステータス補正の開始時刻と終了時刻 (タイムゾーン付き)
- ステータス補正カテゴリー

Event Explorer には、3 種類の SLO ステータス補正監査イベントが表示されます。

- `SLO Correction Created` イベントは、作成時のステータス補正構成情報を示します。
- `SLO Correction Modified` イベントは、変更時に変更された構成情報を示します。
- `SLO Correction Deleted` イベントは、ステータス補正が削除される前の構成情報を示します。

すべての SLO 監査イベントの完全なリストを取得するには、Event Explorer に検索クエリ `tags:(audit AND slo)` を入力します。特定の SLO の監査イベントのリストを表示するには、`tags:audit,slo_id:<SLO ID>` と目的の SLO の ID を入力します。また、[Datadog Events API][19] を使用して、Event Explorer をプログラムでクエリすることもできます。

**注:** UI にイベントが表示されない場合は、イベントエクスプローラーの時間枠を長くしてみてください（過去 7 日間など）。

{{< img src="service_management/service_level_objectives/slo-audit-events.png" alt="SLO 監査イベント" >}}

SLO 詳細の "Audit History" タブを使用して、個々の SLO のすべての監査イベントを表示することもできます。

{{< img src="service_management/service_level_objectives/slo_audit_history_tab.png" alt="SLO 詳細監査履歴タブ" >}}

[Event Monitor][28] では、SLO 監査イベントを追跡する通知をセットアップできます。例えば、特定の SLO の構成が変更されたときに通知を受けたい場合、Event Monitor を設定して、`audit,slo_id:<SLO ID>` タグ内の `[SLO Modified]` テキストを追跡します。

## SLO ウィジェット

{{< learning-center-callout header="ラーニングセンターでダッシュボードと SLO を使用してビジネスクリティカルなインサイトを作成してみる" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/dashboards-slos" >}}
実際のクラウドコンピューティング容量と Datadog トライアルアカウントで、コストをかけずに学ぶことができます。今すぐ登録して、SLO を追跡するダッシュボード構築の詳細をご覧ください。
{{< /learning-center-callout >}}

SLO を作成した後は、ダッシュボードやウィジェットを使ってデータを可視化することができます。
  - SLO ウィジェットを使用して単一の SLO のステータスを可視化する
  - SLO List ウィジェットを使用して、SLO のセットを可視化します
  - [SLO データソース][20]を使用して、15 か月分のメトリクスベースの SLO データを時系列とスカラー (クエリ値、トップリスト、テーブル、変化) の両方のウィジェットでグラフ化します。

SLO ウィジェットの詳細については、[SLO ウィジェット][21]および [SLO リストウィジェット][22]のページを参照してください。SLO データソースの詳細については、[ダッシュボードで過去の SLO データをグラフ化する][20]方法のガイドを参照してください。

## SLO ステータスの修正

ステータス修正により、SLO ステータスとエラーバジェットの計算から特定の期間を除外することができます。こうすることで、以下のことが可能になります。
- 定期メンテナンスなど、想定されるダウンタイムによるエラー予算の枯渇を防ぐ
- SLO に準拠することを期待されていない非営業時間は無視する
- デプロイメントによる一時的な問題が、SLO に悪影響を与えないようにする

修正を適用すると、指定した期間が SLO の計算から外れます。
- モニターベースの SLO の場合、修正時間ウィンドウはカウントされません。
- メトリクスベースの SLO の場合、修正ウィンドウ内のすべての良好イベントと不良イベントはカウントされません。
- タイムスライス SLO の場合、補正タイムウィンドウはアップタイムとして扱われます。

臨機応変に対応するための 1 回限りの修正と、定期的に発生する予測可能な修正を作成するオプションがあります。1 回限りの修正には開始時刻と終了時刻が必要であり、定期的な修正には開始時刻、期間、間隔が必要です。定期的な修正は、[iCalendar RFC 5545 の RRULE 仕様][24]に基づいています。サポートされているルールは `FREQ`、`INTERVAL`、`COUNT` および `UNTIL` です。定期的な修正の終了日の指定は、修正を無期限に繰り返す必要がある場合にオプションで指定できます。

どちらのタイプの修正でも、修正を行う理由を示す修正カテゴリーを選択する必要があります。選択可能なカテゴリーは、`Scheduled Maintenance` (定期メンテナンス)、`Outside Business Hours` (営業時間外)、`Deployment` (デプロイ)、`Other`(その他)です。必要であれば、説明文を追加することができます。

各 SLO には、クエリのパフォーマンスを確保するために構成可能な修正数の上限が設定されています。これらの制限は、SLO ごとに過去 90 日間にのみ適用されるため、過去 90 日間より前の期間の修正 は、制限に含まれません。つまり、以下の通りです。
- 1 回限りの修正の終了時刻が過去 90 日以前である場合、制限にカウントされます。
- 定期的な修正の最後の繰り返しの終了時刻が過去 90 日以前である場合、制限にカウントされません。

SLO ごとの 90 日制限は、以下の通りです。

| 修正タイプ   | SLO ごとの制限 |
| ----------------- | ------------- |
| 1 回限り          | 100           |
| 毎日繰り返し   | 2             |
| 毎週繰り返し  | 3             |
| 毎月繰り返し | 5             |

SLO のサイドパネルで `Correct Status` を選択するか、[SLO ステータス修正 API][25] または [Terraform リソース][26]を使用して、UI からステータス修正を構成することができます。

{{< img src="service_management/service_level_objectives/slo-corrections-ui.png" alt="SLO 補正 UI" style="width:80%;">}}

#### UI でのアクセス

UI で SLO ステータス修正にアクセスするには

1. 新しい SLO を作成するか、既存の SLO をクリックします。
2. SLO の詳細サイドパネルビューに移動します。
3. 歯車アイコンの下で、**Correct Status** を選択して、**Status Corrections** 作成モーダルにアクセスします。
4. **Select the Time Correction Window** で `One-Time` と `Recurring` のいずれかを選択し、修正したい期間を指定します。
5. **Correction Type** を選択します。
6. オプションで **Notes** を追加します。
7. **Apply Correction** をクリックします。

既存のステータス修正を表示、編集、削除するには、SLO の詳細サイドパネルビューの上部にある **Corrections** タブをクリックします。

## SLO カレンダービュー

SLO カレンダービューは、[SLO ステータスページ][2]で利用できます。右上隅で、"Primary" ビューから "Weekly" または "Monthly" ビューに切り替えると、12 か月分の SLO ステータスの履歴データが表示されます。カレンダービューは、メトリクスベースの SLO およびタイムスライス SLO に対応しています。

{{< img src="service_management/service_level_objectives/slo-calendar-view-cropped.png" alt="SLO カレンダービュー" >}}

## SLO CSV エクスポート

{{< callout url="https://forms.gle/GQkcHDqaL5qWMss38" btn_hidden="false" header="SLO の CSV エクスポート機能をお試しください">}}
CSV エクスポート機能は非公開ベータ版です。フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

SLO CSV エクスポート機能は、「週間」または「月間」カレンダービューに切り替えると、[SLO ステータスページ][2]で利用できます。これらのビューでは、新しい「CSV にエクスポート」オプションにアクセスして、以下の情報を含む過去の SLO データの CSV をダウンロードできます。

- SLO ID、名前、タイプ
- SLO タグ
- SLO ターゲット
- 過去の SLO ステータス値

{{< img src="service_management/service_level_objectives/slo-csv-export.png" alt="SLO カレンダービュー" >}}

CSV エクスポートで使用できるタイムウィンドウは次のとおりです。

- **週間:** SLO ステータスは、カレンダーに沿った週 (日曜日午前 12 時～土曜日午後 11 時 59 分) に基づいています。
- **月間:** SLO ステータスは、カレンダーに沿った月 (月初日午前 12 時～月末午後 11 時 59 分) に基づいています。

これらの時間は、Datadog のユーザーのタイムゾーン設定に基づいています。

SLO ステータスは、SLO タイプに基づいて計算されます。
- **メトリクスベースの SLO:** タイムウィンドウの全イベントのうち、良好なイベントの割合。
- **タイムスライス SLO:** タイムウィンドウの合計分数のうち、良好な分数の割合。

**注:**

- エクスポートされる SLO は、検索クエリに基づいています。
- カレンダービューは、メトリクスベースおよびタイムスライス SLO に対応しています。モニターベースの SLO をエクスポートする場合、SLO ID と名前のみが CSV に含まれます (SLO のステータス履歴データではありません)。
- 1 回のエクスポートにつき、SLO は 1000 件までです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/service_level_objectives/guide/slo_types_comparison/
[2]: https://app.datadoghq.com/slo
[3]: /ja/service_management/service_level_objectives/metric/
[4]: /ja/service_management/service_level_objectives/monitor/
[5]: /ja/service_management/service_level_objectives/time_slice/
[6]: /ja/monitors/types/metric/?tab=threshold#alert-grouping
[7]: /ja/service_management/service_level_objectives/metric/#define-queries
[8]: /ja/service_management/service_level_objectives/monitor/#set-your-slo-targets
[9]: /ja/service_management/service_level_objectives/metric/#set-your-slo-targets
[10]: /ja/account_management/rbac/
[11]: /ja/account_management/rbac/permissions/#service-level-objectives/
[12]: /ja/account_management/rbac/permissions/#monitors
[13]: /ja/monitors/guide/how-to-set-up-rbac-for-monitors/
[14]: /ja/mobile
[15]: https://apps.apple.com/app/datadog/id1391380318
[16]: https://play.google.com/store/apps/details?id=com.datadog.app
[17]: /ja/service_management/service_level_objectives/#saved-views
[18]: /ja/account_management/teams/#associate-resources-with-team-handles
[19]: /ja/api/latest/events/
[20]: /ja/dashboards/guide/slo_data_source/
[21]: /ja/dashboards/widgets/slo/
[22]: /ja/dashboards/widgets/slo_list/
[23]: /ja/monitors/types/event/
[24]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[25]: /ja/api/latest/service-level-objective-corrections/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction
[27]: /ja/service_management/events/explorer/
[28]: /ja/monitors/types/event/
