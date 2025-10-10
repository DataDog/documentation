---
categories:
- alerting
- incidents
- issue tracking
- notifications
custom_kind: インテグレーション
dependencies: []
description: Datadog アラートからチケットを自動的に生成および更新
doc_link: https://docs.datadoghq.com/integrations/servicenow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/
  tag: ブログ
  text: Datadog アラートからの ServiceNow チケットの作成
- link: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/
  tag: ブログ
  text: ServiceNow CMDB と Datadog を使用してインフラストラクチャーを管理する
git_integration_title: servicenow
has_logo: true
integration_id: ''
integration_title: ServiceNow
integration_version: ''
is_public: true
manifest_version: '1.0'
name: servicenow
public_title: Datadog-ServiceNow インテグレーション
short_description: Datadog アラートからチケットを自動的に生成および更新
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

ServiceNow は、企業のエンタープライズレベルの IT プロセスを 1 か所で記録、追跡、管理するための IT サービス管理プラットフォームです。

Datadog ServiceNow インテグレーションは双方向インテグレーションです。これを使用すると、以下のことが可能です。

-   Datadog で生成されたイベントを ServiceNow のチケットに送信し、また IT サービス管理 (ITSM) および IT 運用管理 (ITOM) を通じて Datadog 内部で解決ワークフローを管理します
-   サービスグラフコネクタを使用して、ServiceNow Configuration Management Database (CMDB) の構成アイテム (CI) の発見メカニズムとして Datadog を使用します
-   Datadog からのホスト、サービス、およびデバイスの情報を使用して、ServiceNow CMDB に CI として保存されているビジネス固有の情報を充実させることで、インフラストラクチャーの利用状況をより深く理解し、トラブルシューティングを加速し、リソース利用を最大化することができます

Datadog は、以下の ServiceNow ツールと統合されます。

-   ITOM
-   ITSM
-   CMDB

**注**: Datadog ServiceNow インテグレーションは、サポート終了と記載されていない [ServiceNow リリース][1]をサポートしています。

### Datadog で ServiceNow タイルを構成する

1. Datadog で、Integrations ページの [ServiceNow インテグレーションタイル][2]に移動します。
2. **Add New Instance** をクリックします。
3. ServiceNow ドメインのサブドメインであるインスタンス名、`<インスタンス>.service-now.com` を追加します。
4. ServiceNow インスタンスのユーザー名とパスワードを追加します。

**注**: Datadog のためだけに ServiceNow で制限ユーザーを作成できます。

{{< img src="integrations/servicenow/servicenow-configuration-new-instance-12-23.png" alt="servicenow インテグレーション新規インスタンス" >}}

## CMDB のセットアップ

### Datadog 用サービスグラフコネクタ

[Observability - Datadog 用サービスグラフコネクタ][3]により、Datadog によって検出された新しいリソースの CMDB に、サーバーとデータベースの構成アイテム (CI) が自動的に入力されます。サービスグラフコネクタは ServiceNow [ストア][4]から入手可能です。

コンフィギュレーションについては、サービスグラフコネクタのガイドに記載されたセットアップ手順に従ってください。

サポートされる CI の種類

-   サーバー
-   Amazon RDS

下記の記述は、すでに ServiceNow ITOM/ITSM インテグレーションを構成済みの場合のみ適用されます。

-   サービスグラフコネクタでは、コンフィギュレーションタイルの `Target table` 値と `Custom table` 値を使用しません。Target テーブルのデフォルト値とのインテグレーションを保存できます。
-   サービスグラフコネクタのセットアップ手順に記載されているように、ユーザーに cmdb_import_api_admin ロールを付与することで、同じ ITOM/ITSM ユーザーをサービスグラフコネクタで使用できます。

### ホストのタグ付け

ホストのタグ付けにより、ServiceNow CMDB のメタデータで Datadog ホストをリッチ化します。

ホストタグの取り込みを有効にするには

1. ServiceNow インスタンスで、Datadog でタグ付けしたいすべてのホストを返す [Query Builder][5] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーションタイルに移動します。**CMDB Enrichment** タブの **Host Tagging** を選択します。
1. **Query Configuration** の下にある、**Add New Query** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. クエリの root CI のホスト名フィールドを Datadog のホスト名フィールドにマッピングする **Hostname Column** の値を選択します。
1. **Column Name Maps** で任意のフィールド名の再マッピングを選択します。
1. **Save** をクリックします。

クエリのスケジュール実行後すぐにホストタグが Datadog に入力されます。

{{< img src="integrations/servicenow/host-tags.jpg" alt="ServiceNow のホストタグを表示するホスト情報タブのスクリーンショット" >}}

Datadog の[イベントエクスプローラー][6]で、検索クエリを `source:servicenow` にスコープして、取り込みプロセスを監視します。

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="取り込み実行中のスクリーンショット" >}}

#### トラブルシューティング

ホストのタグ付けが正しく機能するためには、以下のことがシステムで正しいことを確認してください。

-   Query Builder クエリを作成・実行するユーザが、Datadog 構成のユーザ名と一致している。ServiceNow のユーザーは `cmdb_query_builder_read` というロールを持っている必要があります。
-   クエリが返す結果の数は、ServiceNow の `glide.cmdb.query.max_results_limit` 設定以下でなければなりません。デフォルトでは、結果の最大数は 10000 です。設定を変更するには、**Configuration** -> **CMDB Properties** -> **Query Builder Properties** に移動します。
-   Query Builder クエリで構成されるすべての CI には **1** ラベルが必要です。これにより、パーサーがサポートしない重複した CI を作成していないことを確認できます。

#### 制限

-   取り込みは 1 回の実行につき 100k ホストに制限されています。
-   ホストへの更新は 1 時間あたり数千件に制限されます。スケジュール間隔を選択する際にはこの制限を考慮してください。
-   Datadog のホストエイリアスは大文字と小文字を区別するため、小文字のホスト名を持つ Linux マシンではタグ付けが機能しません。

### サービスのタグ付け

サービスのタグ付けにより、ServiceNow CMDB メタデータで Datadog サービスカタログを充実させます。

サービスのタグ付けを使用すると、ServiceNow CMDB から Datadog [サービスカタログ][7]にサービスを取り込むことができます。

#### セットアップ

サービスデータの取り込みを有効にするには

1. ServiceNow インスタンスで、サービスカタログをリッチ化したいすべてのサービスを返す [Query Builder][5] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーションタイルに移動します。**CMDB Enrichment** タブの **Service Tagging** を選択します。
1. **Query Configuration** の下にある、**Add New Query** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. **Service Name Column** ドロップダウンメニューから値を選択します。この値は、クエリのルートサービス CI 上の列名と一致し、サービスカタログのサービス名を入力します。
1. スキーママッピングを構成して、サービスに関する追加のメタデータをサービスカタログに取り込みます。詳細は[サービス定義][8]を参照してください。Datadog が取り込みを受け入れるためには、マッピングの各フィールドが、サービスカタログのサービス定義スキーマにマッピングされる正しいタイプである必要があります。
1. **Save** をクリックします。

Datadog にサービスデータが反映されるのは、クエリのスケジュール実行の数分後です。取り込みエラーを表示するには、[イベントエクスプローラー][6]で `source:servicenow` でイベントを検索します。

{{< img src="integrations/servicenow/service-metadata.jpg" alt="ServiceNow から入力されたメタデータを示す Service Configuration パネルのスクリーンショット" >}}

#### トラブルシューティング

サービスの取り込みが正しく機能するためには、以下のことがシステムで正しいことを確認してください。

-   Query Builder クエリを作成・実行するユーザが、Datadog 構成のユーザ名と一致している。ServiceNow のユーザーは `cmdb_query_builder_read` というロールを持っている必要があります。
-   クエリが返す結果の数は、ServiceNow の `glide.cmdb.query.max_results_limit` 設定以下でなければなりません。デフォルトでは、結果の最大数は 10000 です。設定を変更するには、**Configuration** -> **CMDB Properties** -> **Query Builder Properties** に移動します。
-   Query Builder クエリで構成されるすべての CI には **1** ラベルが必要です。これにより、パーサーがサポートしない重複した CI を作成していないことを確認できます。

### ネットワークデバイスのタグ付け

ServiceNow CMDB のデータを用いて、Datadog 内のネットワークデバイスにタグを追加してください。

デバイスタグ付けを利用することで、Datadog の [Network Device Monitoring][9] で監視しているネットワークデバイスに、ServiceNow CMDB 由来のデバイスメタデータを動的に付与できます。

デバイスタグの取り込みを有効にするには

1. ServiceNow インスタンスで [Query Builder][5] を使用してクエリを構成し、そのクエリがデバイスの IP アドレスを返すことを確認してください。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. Datadog でカスタム IP ネームスペースを使用している場合は、ServiceNow にそれを追加する必要があります。Network device CI 上に **u_dd_device_namespace** という列を作成し、各デバイスに対応するネームスペースを入力します。この列が存在しない場合は、デフォルトのネームスペースが使用されます。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーションタイルに移動します。**CMDB Enrichment** タブの **Device Tagging** を選択します。
1. **Query Configuration** の下にある、**Add New Query** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. クエリの IP Address フィールドを Datadog の IP Address フィールドにマッピングする IP Address 列を選択します。
1. 任意のフィールド名の再マッピングを選択します。
1. **Save** をクリックします。

クエリがスケジュール実行された後、数分以内にはネットワークデバイスタグが Datadog 上に反映されます。取り込みエラーが発生した場合は、イベントエクスプローラーで表示できるイベントを通じて報告されます。

Datadog の[イベントエクスプローラー][6]で、検索クエリを `source:servicenow` にスコープして、取り込みプロセスを監視します。

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="取り込み実行中のスクリーンショット" >}}

#### トラブルシューティング

-   querybuilder のクエリを作成または実行するユーザーが、Datadog 構成で指定されているユーザーと同一であり、かつ `cmdb_query_builder_read` ロールを持っていることを確認してください。
-   クエリが ServiceNow の `glide.cmdb.query.max_results_limit` 設定で許可される結果件数を超えていないことを確認してください。
    querybuilder クエリで構成するすべての CI に '1' のラベルが付いていることを確認してください。また、パーサーが重複した CI をサポートしていないため、重複 CI を作成しないようご注意ください。

#### 制限

-   取り込みは 1 回の実行につき 100k ホストに制限されています。
-   ネットワークデバイスのタグ付けは [SNMP デバイス][10]に限定されます。
-   デバイスへの更新は 1 時間あたり数千件に制限されます。スケジュール間隔を選択する際にはこのことを考慮してください。

### リファレンステーブル

ServiceNow の CI からの追加フィールドを使用してログやイベントを自動的に拡充するには [Reference Tables][11] を使用します。Reference Tables を使用すると、ホスト名などのプライマリキーに値フィールドのセットをマッピングし、指定したキーを含むすべてのログやイベントにこれらのフィールドを自動的に付与できます。

リファレンステーブルの取り込みを有効にするには

1. ServiceNow インスタンスで [Query Builder][12] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを保存してください。
1. **Add New Query** を選択し、ドロップダウンメニューから該当するクエリを選択してください。
1. プライマリキーを選択するドロップダウンで、プライマリキーとして使用する列名を選んでください。
    1. 任意で、このプライマリキーを用いて [Processing Pipeline][13] を作成し、ログやイベントの拡充および相関付けを行うことができます。
1. リファレンステーブルに名前を入力してください。
1. **Save** をクリックします。

[Reference Table][11] はクエリ保存後、間もなくそのデータで充填されます。

#### 注意事項および制限事項

-   Reference Table 名は一意でなければなりません。
-   既存テーブルの削除およびスキーマ更新はサポートされません。

## ITOM と ITSM のセットアップ

{{% site-region region="gov,ap1" %}}

<div class="alert alert-danger">
Case Management インテグレーションは {{< region-param key=dd_datacenter code="true" >}} サイトではサポートされません。
</div>
{{% /site-region %}}


{{% site-region region="gov" %}}
<div class="alert alert-danger">
Incident Management インテグレーションは {{< region-param key=dd_datacenter code="true" >}} サイトではサポートされません。
</div>
{{% /site-region %}}


{{% site-region region="gov" %}}

<div class="alert alert-danger">
Templated Monitor Notifications は {{< region-param key=dd_datacenter code="true" >}} サイトではサポートされません。
</div>
{{% /site-region %}}

Monitors、Case Management、および Incident Management 用の Datadog インテグレーションを利用するには、以下の手順に従ってください。
1. [アプリをインストールする](#install-the-app)
2. [Datadog に対して適切な権限を持つ ServiceNow アカウントを作成する](#create-a-servicenow-account-with-correct-permissions-for-datadog)
3. [ITOM および ITSM で使用する Datadog アプリケーションを構成する](#configure-datadog-applications-for-use-with-itom-and-itsm-modules)

### アプリをインストールする

アプリは次の 2 つの方法でインストールできます。

1. ServiceNow ストアから最新バージョンの `ITOM/ITSM Integration for Datadog` アプリをインストールします。

{{< img src="integrations/servicenow/servicenow-appstore-itxm-integration.png" alt="ServiceNow App Store ITSM/ITOM インテグレーション" >}}

2. 最新のアップデートセット [`Datadog-Snow_Update_Set_v2.6.1.xml`][14] をダウンロードし、手動で ServiceNow インスタンスにアップロードします。

**変更履歴**

- v2.4.0 >= Case Management との一方向同期
- v2.5.0 >= Case Management および ITSM テーブルとの双方向同期を実現し、Incident Management との統合が可能に。さらに、Case Management との双方向同期は ServiceNow ITSM のみサポートします。
- v2.6.0 >= ITOM/ITSM を用いた Templated Monitor Notifications に対応

ServiceNow でアップデートセットをインストールする手順

1. ダウンロードしたアップデートセットの XML ファイルを手動で ServiceNow インスタンスにインポートします。
2. インポート後、アップデートセットは `Loaded` 状態になります。アップデートセット名をクリックして変更内容をプレビューします。
3. プレビューでエラーがないことを確認したら、**Commit Update Set** を選択してアプリケーションをシステムに統合します。

アプリをインストールしたら、ServiceNow のナビゲーションメニューで **Datadog** を検索し、以下のテーブルや双方向同期設定用の構成ページへアクセスできます。

- `Configuration`
- `Datadog Incidents ITSM`
- `Cases ITOM` (旧 `Datadog Cases ITOM`)
- `Cases ITSM` (旧 `Datadog Cases ITSM`)
- `Legacy Monitors ITOM` (旧 `Datadog Monitors ITOM`)
- `Legacy Monitors ITSM` (旧 `Datadog Monitors ITSM`)
- `Templated Monitors ITOM`
- `Templated Monitors ITSM`

### Datadog 用に適切な権限を持つ ServiceNow アカウントを作成する

インテグレーションを利用するには、ServiceNow ユーザー (例: "datadog" または "datadog_integration") を作成し、以下のロールをすべて割り当ててください。
- `x_datad_datadog.user`
- `import_set_loader`
- `import_transformer`

#### インシデント解決およびクローズ

<div class="alert alert-info">Case Management との双方向同期は ServiceNow ITSM のみサポートしています。</div>

解決のためにインシデントの状態を同期する場合、ServiceNow ユーザーは次のロールのいずれかが必要です。

-   `ITIL` または
-   `list_updater` または
-   `sn_incident_write`

クローズのためにインシデントの状態を同期する場合、ServiceNow ユーザーは以下のロールが必要です。

-   `ITIL_admin`

#### モニター通知をインシデントおよびイベントテーブルへ直接送信する

ITOM モジュールの **Event** テーブルまたは ITSM モジュールの **Incident** テーブルに直接通知を送信する場合、ServiceNow ユーザーは以下のロールのいずれかが必要です。

-   `ITIL` は ITSM 用
-   `evt_mgmt_integration` は ITOM 用

**注**: この ServiceNow ユーザー ("datadog" または "datadog_integration") によって ServiceNow でチケットに行われた手動更新は、Datadog へ同期されません。

### テンプレート化されたモニター通知

**注**: この機能にはアプリバージョンが v2.6.0 以上であることが必要です。また、下記の手順を完了する前に Datadog 内の ServiceNow タイルの構成ページでインスタンスを追加する必要があります。

##### インスタンス優先度マッピングの構成

{{< img src="integrations/servicenow/servicenow-priority-mapping.png" alt="インテグレーションタイル上の ServiceNow 優先度マッピングフォーム" >}}

特定のインスタンスに対してテンプレート化されたすべての @ ハンドルに対し、Datadog はこのマッピングに従い、ServiceNow 内でモニター優先度をインパクトおよび緊急度へ自動的にマップします。

`Use Instance Priority Mapping` をオフに切り替えると、ServiceNow レコードでのインパクトおよび緊急度設定が無効になります。

#### モニターテンプレートの構成

{{< img src="integrations/servicenow/servicenow-integration-tile.png" alt="新しい ServiceNow インテグレーションタイル" >}}

Datadog 内で `@servicenow-<TEMPLATE_NAME>` を使用するモニター通知の場合、Datadog 内の ServiceNow インテグレーションタイルの ITOM/ITSM タブにある新しいテンプレート作成 UI を使用して、ServiceNow 通知を作成します。

**注**: これはアプリバージョン 2.6.0 以上でのみ利用可能です。

##### カスタム ServiceNow @ ハンドルの作成 (モニター通知用)

{{< img src="integrations/servicenow/servicenow-monitors.png" alt="新しい ServiceNow インテグレーションタイル上のモニター通知手順" >}}

1. `+ New` ボタンをクリックして新しいテンプレートを作成します。
2. モニター通知が配信される @ ハンドル `Name`、`Instance`、`Target Table` を定義します。その後、`Assignment Group`、`Business Service`、`User`、または `Unassigned` のいずれかを選択してレコードに割り当てます。バージョン 2.6.0 で定義された変換マップは、ここで選択した値を用いてインシデント `INC` レコードを自動的に補完します。

新しいテンプレートを使用するには、モニターの説明内に `@servicenow-<TEMPLATE_NAME>` を追加します。

`Customize notification payload` セクションの `Add Field` をクリックして、ペイロードにカスタムフィールドを追加できます。

#### Case Management の構成

{{< img src="integrations/servicenow/servicenow-case-management.png" alt="新しい ServiceNow インテグレーションタイル上の Case Management 手順" >}}

`Case Management` タブから

1. Case Management 用に構成したいインスタンスを選択します。
2. ケースを送信するテーブルを `Datadog Cases ITOM` または `Datadog Cases ITSM` から選択します。
   **注**: デフォルトではいずれのテーブルも選択されていません。
3. Datadog 内の [Case Management][15] へ移動します。
4. Create ServiceNow Incident を選択します。
5. インスタンスおよびオプションの割り当てグループを選び、Create をクリックします。

##### 状態とコメントを Case Management と双方向に同期

ServiceNow での編集によって Datadog の関連するケースが更新されるようにするには、`x_datad_datadog.user` ロールと `admin` ロールを持つ ServiceNow ユーザーが、ServiceNow で **ITOM/ITSM Integration for Datadog** アプリのインストール設定を構成する必要があります。

1. 左上の **All** をクリックし、フィルターに `ITOM/ITSM Integration for Datadog` と入力し、フィルターリストに表示される **Configuration** リンクをクリックして、**ITOM/ITSM Integration for Datadog** アプリの構成設定ページに移動します。
1. Datadog データセンターサイトを選択します。
1. **Organization Settings** にある Datadog API キーを **API Key** フィールドに貼り付けます。
1. **Organization Settings** にある Datadog Service Account Application Key を **Application Key** フィールドに貼り付けます。
1. Enabled チェックボックスをチェックし、構成の変更を保存します。

ServiceNow のインストール設定を構成した後、Datadog Case Management に戻り、[インテグレーションを構成][16]します。

**注**: このセットアップでは、ユーザーの Application Key ではなく、Service Account Application Key を使用することが重要です。ユーザーの Application Key は、ユーザーのアカウント権限に紐付けられます。ユーザーの権限が減少したり、ユーザーが非アクティブになったりすると、ServiceNow と Datadog 間の双方向同期が停止します。 Service Account Application Key は、個々のユーザーには紐付けられないので、双方向同期がユーザーアカウントの変更によって影響を受けることはありません。

{{< img src="integrations/servicenow/datadog-sync-configuration.png" alt="ServiceNow の変更を Datadog で同期するための ServiceNow の構成設定" >}}

#### Incident Management の構成

アプリをインストールした後、[Integration Settings][17] へ移動し、インシデントアプリ内でセットアップを完了します。

#### レガシーモニター通知

Datadog で `@servicenow-<INSTANCE_NAME>` を使用するレガシーモニター通知の場合、ITOM/ITSM タイルの下部にある "Manage Legacy Monitor Notifications" と題されたセクションで、通知を送信する中間テーブルを選択します。

1. 通知を構成したいインスタンスを選択し、レガシーモニター通知が書き込まれるテーブルを選択します。
2. インテグレーションが正しくセットアップされているかを検証するには、モニターまたはイベント通知に `@servicenow-<INSTANCE_NAME>` を追加します。未加工のデータが中間テーブルの行に挿入され、アプリで指定されている ServiceNow テーブルに転送されます。
3. ServiceNow 内で[変換マップを使用](#customize-data-with-transform-maps)して、中間テーブルへ送信されるデータの変換をカスタマイズします。
4. Datadog 変数またはカスタム文字列を使用して、通知ペイロードをカスタマイズします。

#### 変換マップによるモニター通知データのカスタマイズ

**Templated Monitors ITSM**、**Legacy Monitors ITSM** および **Datadog Cases ITSM** テーブルは、変換マップを使用して Datadog レコードを ServiceNow インシデントに変換します。
同様に、**Datadog Monitors ITOM** および **Datadog Cases ITOM** は、Datadog レコードを ServiceNow イベントに変換します。

**Templated Monitors ITOM** および **Templated Monitors ITSM** テーブルでは、変換マップを使用して、Datadog レコードをそれぞれ ServiceNow イベントおよびインシデントに変換します。`New Template` UI で通知ペイロードをカスタマイズし、ServiceNow で変換マップを拡張することで、これらのテーブルの ServiceNow イベントとインシデント情報をカスタマイズすることができます。

**注**: **Datadog Cases ITOM** および **Datadog Cases ITSM** テーブルも同様に変換マップを使用しますが、Datadog ケースのペイロードはカスタマイズできないため、変換マップのカスタマイズは Case Management で使用することは推奨されません。

## トラブルシューティング

ServiceNow のテーブルにイベントが表示されず、代わりに

-   Datadog インテグレーションタイルにエラーメッセージが表示される、または `Error while trying to post to your ServiceNow instance` 通知を受け取った場合

    -   インスタンス名を入力したときに、サブドメインのみを使用したかを確認します。
    -   作成したユーザーが必要なアクセス許可を持っているかを確認します。
    -   ユーザー名とパスワードが正しいことを確認します。

-   インテグレーションが構成され、アラートがトリガーされているが、チケットが作成されない場合

    -   中間テーブルにデータが挿入されるかを確認します。データが挿入される場合、問題はマッピングと変換にあります。ServiceNow の **Transform Errors** に移動し、マッピングとスクリプトをさらにデバッグします。
    -   タイルで指定した中間テーブルを使用していることを確認します。

    ServiceNow ユーザーは、インポートテーブルにアクセスできるように、`rest_service` および `x_datad_datadog.user` ロールが必要です。インシデントテーブルまたはイベントテーブルのいずれかに直接通知を送信する従来の方法を使用している場合は、`itil` および `evt_mgmt_integration` のアクセス許可が必要です。

Datadog Case Management から ServiceNow への更新が見えても、ServiceNow から Datadog への更新が見えない場合、これは ServiceNow ITOM にとって想定される動作です。 Case Management との双方向同期は ServiceNow ITSM のみでサポートされています。

ご不明な点は、[Datadog のサポートチーム][18]までお問い合わせください。

## ナレッジベース

### テンプレート化されたモニター ITXM テーブルフィールドおよび変換マップ

### Datadog インポートホストのオートフラッシュルール

インポートセットテーブル `x_datad_datadog_import_host` が蓄積する行が増えすぎることを防ぐために、最後の 24 時間のデータのみを保持するオートフラッシュルールがテーブルクリーナーツールに追加されました。このコンフィギュレーション設定は、必要に応じて、フィルターナビゲーターで `sys_auto_flush_list.do` に移動し、`x_datad_datadog_import_host` テーブルのルールに入ることで変更できます。必要に応じて `Age in seconds` フィールドを更新できます。

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="インテグレーション構成設定" >}}

### Datadog アラートからのサポートチケットの自動生成

ServiceNow が Datadog アカウントに接続されると、受信したアラートから自動的にサポートチケットを作成し、それを ServiceNow のチケットキューに送信できます。そこから、サポートチームは、ServiceNow 内で既に確立されている通信ワークフローを使用して、問題の通知を受けます。アラートメッセージで `@servicenow` をメンションするか、モニターの通知リストに `@servicenow` を追加します。

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" >}}

### チケットペイロードとフィールドマッピングでの変数の使用

アラートの本文やフィールドマッピングで変数を使用して、ServiceNow にイベントの詳細を挿入することができます。たとえば、タイトルと重大度を該当する ServiceNow フィールドに含めたり、ServiceNow のチケットから Datadog 内の特定のインシデントに戻るリンクを入れたりすることができます。

{{< img src="integrations/servicenow/servicenow-variables-form.png" alt="ServiceNow 変数入力フォーム" >}}

{{< img src="integrations/servicenow/servicenow-variables.png" alt="ServiceNow 変数" >}}

### インシデント優先度のフィールドマッピング

ServiceNow インシデントの `priority` フィールドは読み取り専用で、[優先度ルックアップ規則][19]を使用してのみ更新することができます。

ServiceNow のインシデント優先度を計算するために、モニターで `Impact` と `Urgency` を定義します。

{{< img src="integrations/servicenow/servicenow-priority-field-mapping.png" alt="ServiceNow 優先度フィールドマッピング" >}}

### サポート解決ワークフローの自動化

モニターステータスが正常に戻ると、関連付けられているサポートチケットが自動的に「resolved」としてマークされます。

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow 解決済み" >}}

### カスタムマッピングの定義

テーブルの 1 つ、例えば **Datadog Monitors ITSM Tables** をクリックし、レコードの一番下までスクロールすると、関連付けられている変換マップへのリンクが表示されます。

### マッピングの確認

変換マップ名をクリックすると、レコードを確認できます。

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="servicenow インテグレーション" >}}

上部には、変換レコードに関する 2 つの重要なフィールド、`Source table` と `Target table` があります。

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="servicenow インテグレーション" >}}

**注**:

-   ソースは、選択したインポートセットテーブル (ここでは、Datadog Monitors ITSM Tables)、ターゲットは、イベントが格納される実際のインシデントテーブル (またはイベントテーブル) です。
-   フィールドマッピングは、レコードの下部にあります。いくつかの基本的なマッピングが含まれています。ここで、含めるフィールドを選択したり、形式を定義したり、ServiceNow インスタンス内のターゲットフィールドを選択したりします。

### 新しいフィールドマッピングの追加

**New** をクリックします。

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="servicenow インテグレーション" >}}

1 対 1 マッピングのソースフィールドとターゲットフィールドを選択します。

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="servicenow インテグレーション" >}}

または、**Use source script** チェックボックスをオンにして、変換を定義します。

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="servicenow インテグレーション" >}}

**注:** インテグレーションタイルのカスタムフィールドをマッピングする場合、Datadog Monitors ITSM マップと ITSM Transform マップのいずれかに次のマッピングスクリプトを使用できます。この例では、フィールド `my_field` がインテグレーションタイルのカスタムフィールドとして定義されています。

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.custom_my_field;
})(source);
```

### 複数のマッピングを定義する

**Mapping Assist** (関連リンクの下にあります) を使用すると、複数のソースとターゲットフィールドを一度にマップできます。

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="servicenow インテグレーション" >}}

### 検証

インテグレーションが正しくセットアップされているかを検証するには、モニターまたはイベント通知に `@servicenow` を追加します。未加工のデータが中間テーブルの行に挿入され、作成したマッピングと変換で指定されている ServiceNow テーブルに転送されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.servicenow.com/community/now-platform-articles/servicenow-versions-release/ta-p/2312014
[2]: https://app.datadoghq.com/integrations/servicenow
[3]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/c877cb86687e0050f8774bfad236c950/1.2.1
[4]: https://store.servicenow.com/
[5]: https://docs.servicenow.com/bundle/xanadu-servicenow-platform/page/product/configuration-management/concept/cmdb-query-builder-landing-page.html
[6]: https://app.datadoghq.com/event/explorer
[7]: https://docs.datadoghq.com/ja/tracing/service_catalog/
[8]: https://docs.datadoghq.com/ja/tracing/service_catalog/adding_metadata/
[9]: https://docs.datadoghq.com/ja/network_monitoring/devices/
[10]: https://docs.datadoghq.com/ja/network_monitoring/devices/snmp_metrics/
[11]: https://app.datadoghq.com/reference-tables
[12]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[13]: https://app.datadoghq.com/event/pipelines
[14]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.6.1.xml
[15]: https://app.datadoghq.com/cases
[16]: https://docs.datadoghq.com/ja/service_management/case_management/settings#servicenow
[17]: https://app.datadoghq.com/incidents/settings#Integrations
[18]: https://docs.datadoghq.com/ja/help/
[19]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html