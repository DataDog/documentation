---
"app_id": "servicenow"
"app_uuid": "5bd1d6c7-614b-4c49-95ad-d200041735c3"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "105"
    "source_type_name": "ServiceNow"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "alerting"
- "incidents"
- "notifications"
- "network"
- "collaboration"
- "security"
- "event management"
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "servicenow"
"integration_id": "servicenow"
"integration_title": "ServiceNow"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "servicenow"
"public_title": "ServiceNow"
"short_description": "ServiceNow のインシデントを作成し、CMDB の CI を取り込み、Datadog のリソース、ログ、イベントを CMDB データでエンリッチします。"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Alerting"
  - "Category::Incidents"
  - "Category::Notifications"
  - "Category::ネットワーク"
  - "Category::コラボレーション"
  - "Category::Security"
  - "Category::Event Management"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "ServiceNow インシデントを作成し、CMDB CI に入力し、Datadog のリソース、ログ、イベントを CMDB データで強化します。
  "media":
  - "caption": "CMDB メタデータで Datadog ホストをエンリッチします。"
    "image_url": "images/carousel_1.png"
    "media_type": "image"
  - "caption": "CMDB メタデータで Datadog ネットワーク デバイスをエンリッチします。"
    "image_url": "images/carousel_2.png"
    "media_type": "image"
  - "caption": "CMDB リファレンス テーブルでログとイベントをエンリッチします。"
    "image_url": "images/carousel_3.png"
    "media_type": "image"
  - "caption": "Datadog アラートから ServiceNow チケットを作成。"
    "image_url": "images/carousel_4.png"
    "media_type": "image"
  - "caption": "Datadog Incident Management で ServiceNow インシデントを作成。"
    "image_url": "images/carousel_5.png"
    "media_type": "image"
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/"
  - "resource_type": "ドキュメント"
    "url": "https://docs.datadoghq.com/integrations/servicenow/"
  "support": "README.md#Support"
  "title": "ServiceNow"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

## 概要

ServiceNow は、企業のエンタープライズ レベルの IT プロセスを 1 か所で記録、追跡、管理するための IT サービス管理プラットフォームです。
Datadog ServiceNow インテグレーションは双方向のインテグレーションで、以下のことが可能です:

ITOM/ITSM
- Datadog で生成されたイベントを ServiceNow のチケットに送信し、また IT サービス管理 (ITSM) および IT 運用管理 (ITOM) を通じて Datadog 内部で解決ワークフローを管理します。

サービス グラフ コネクタ
- Datadog サービス グラフ コネクタを使用して、ServiceNow Configuration Management Database (CMDB) の構成アイテム (CI) の検出に Datadog を使用します。

CMDB エンリッチメント
- Datadog からのホスト、サービス、およびデバイスの情報を使用して、ServiceNow CMDB に CI として保存されているビジネス固有の情報を充実させることで、インフラストラクチャーの利用状況をより深く理解し、トラブルシューティングを加速し、リソースを最大限活用することができます。
- ServiceNow の CI から取得した追加フィールドを使用してログやイベントを自動的にエンリッチするには Datadog Reference Tables を作成します。Reference Tables を使用すると、ホスト名などのプライマリ キーに値フィールドのセットをマッピングし、指定したキーを含むすべてのログやイベントにこれらのフィールドを自動的に追加できます。


**注**: Datadog ServiceNow インテグレーションは、サポート終了と記載されていない [ServiceNow リリース][1]をサポートしています。

### アプリのインストール

アプリは 2 つの方法でインストールできます。

1. ServiceNow ストアから `ITOM/ITSM Integration for Datadog` アプリの最新バージョンをインストールします。

![ServiceNow アプリ ストア ITSM/ITOM インテグレーション][2]

2. 最新の Update Set: [`Datadog-Snow_Update_Set_v2.7.2.xml`][3] をダウンロードして、ServiceNow インスタンスに手動でアップロードします。

**Changelog**
-   v2.4.0 >= Case Management との一方向同期
-   v2.5.0 >= Incident Management との統合のための Case Management および ITSM テーブルとの双方向同期。ただし、Case Management との双方向同期は、ServiceNow ITSM でのみサポートされています。
-   v2.6.0 >= ITOM/ITSM によるテンプレート化されたモニター通知
-   v2.7.0 >= 手動作成されたインシデントのサポート、相関するアラートの取り込み、追加属性の一方向同期により、Case Management が強化されました。Incident Management が双方向同期に対応しました。最後に、モニターの解決状態に関するバグが修正されました。

**ServiceNow で Update Set をインストールする:**

**注**: 変換マップをカスタマイズしている場合、競合が発生した際に通知され、要件に応じて適切な変更を選択することができます。更新を行う前に、既存の変換マップのカスタマイズをバックアップすることをお勧めします。

1. ダウンロードした Update Set の XML ファイルを ServiceNow インスタンスに手動でインポートします。
2. XML ファイルをインポートすると、Update Set の状態が `Loaded` になります。Update Set の名前をクリックして、変更をプレビューします。
3. Update Set をプレビューしてエラーがないことを確認したら、**Commit Update Set** を選択してアプリケーションをお使いのシステムにマージします。

アプリをインストールしたら、ServiceNow のナビゲーションメニューで **Datadog** を検索し、すべてのテーブルと双方向同期セットアップ用の構成ページにアクセスします。

-   `Configuration`
-   `Datadog Incidents ITSM`
-   `Cases ITOM` (旧称: `Datadog Cases ITOM`)
-   `Cases ITSM` (旧称: `Datadog Cases ITSM`)
-   `Legacy Monitors ITOM` (旧称: `Datadog Monitors ITOM`)
-   `Legacy Monitors ITSM` (旧称: `Datadog Monitors ITSM`)
-   `Templated Monitors ITOM`
-   `Templated Monitors ITSM`

### Datadog の適切な権限を持つ ServiceNow アカウントを作成

インテグレーションを使用するには、ServiceNow ユーザー (例えば、ユーザー名 “datadog” または "datadog_integration") を作成し、そのユーザーに次のロールを割り当てます。

-   `x_datad_datadog.user` および
-   `import_set_loader` および
-   `import_transformer`

#### インシデント解決

<div class="alert alert-info">Case Management との双方向同期は、ServiceNow ITSM でのみサポートされています。</div>

解決のためにインシデントの状態を同期する場合、ServiceNow ユーザーは次のロールのいずれかが必要です。

-   `ITIL` または
-   `list_updater` または
-   `sn_incident_write`

#### モニター通知をインシデントおよびイベントテーブルへ直接送信する

ITOM モジュールの **Event** テーブルまたは ITSM モジュールの **Incident** テーブルに直接通知を送信する場合、ServiceNow ユーザーは以下のロールのいずれかが必要です。

-   `ITIL` は ITSM 用
-   `evt_mgmt_integration` は ITOM 用

**注**: この ServiceNow ユーザー ("datadog" または "datadog_integration") によって ServiceNow でチケットに行われた手動更新は、Datadog へ同期されません。

## Datadog で ServiceNow タイルを構成する

1. Datadog で Integrations ページの [ServiceNow インテグレーション タイル][4] に移動します。
2. **Add New Instance** をクリックします。
3. ServiceNow ドメインのサブドメインであるインスタンス名、`<インスタンス>.service-now.com` を追加します。
4. ServiceNow インスタンスのユーザー名とパスワードを追加します。

**注**: Datadog のためだけに ServiceNow で制限ユーザーを作成できます。

![ServiceNow インテグレーションの新規インスタンス][5]

## CMDB のセットアップ

### Datadog 用サービスグラフコネクタ

[Observability - Datadog 用サービス グラフ コネクタ][6]により、Datadog によって検出された新しいリソースについて、CMDB 内のサーバーとデータベースの構成アイテム (CI) が自動的に作成/更新されます。サービス グラフ コネクタは ServiceNow [ストア][7]から入手可能です。

コンフィギュレーションについては、サービスグラフコネクタのガイドに記載されたセットアップ手順に従ってください。

サポートされる CI の種類

-   サーバー
-   Amazon RDS

下記の記述は、すでに ServiceNow ITOM/ITSM インテグレーションを構成済みの場合のみ適用されます。

-   サービスグラフコネクタでは、コンフィギュレーションタイルの `Target table` 値と `Custom table` 値を使用しません。Target テーブルのデフォルト値とのインテグレーションを保存できます。
-   サービス グラフ コネクタのガイド付きセットアップ手順に記載されているように、ユーザーに `cmdb_import_api_admin` ロールを付与することで、同じ ITOM/ITSM ユーザーをサービス グラフ コネクタで使用できます。

### CI フィールドのカスタマイズ

[Datadog ServiceNow][4] インテグレーション タイルで **Configure** タブをクリックし、次に **Service Graph Connector** タブをクリックします。**Customize CI fields** セクションを展開すると、以下のオプションが利用可能です。

CI Type
: このフィールドが適用される CI のタイプ。

ServiceNow Field
: 適用対象となる ServiceNow のフィールド。

Datadog Tag
: Datadog リソースから送信するタグ。(同じ名前のタグが複数見つかった場合は、カンマで区切られます。)

たとえば、CI Type が `Host`、ServiceNow Field が `Host Name` の CI フィールドを追加するには、`Datadog Tag` フィールドに任意の _host_ タグ属性を追加します。

**注**: `Datadog Tag` フィールドは、Datadog ホスト上に存在するホスト タグでなければなりません。ホスト上の属性タグではありません。

![Service Graph Connector タブが表示された ServiceNow インテグレーション タイルのスクリーンショット][8]


### ホストのタグ付け

ホストのタグ付けにより、ServiceNow CMDB のメタデータで Datadog ホストをリッチ化します。

ホストタグの取り込みを有効にするには

1. ServiceNow インスタンスで、Datadog でタグ付けしたいすべてのホストを返す [Query Builder][9] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーション タイルに移動します。**Configure** 内の **CMDB Enrichment** タブで **Host Tagging** を選択します。
1. **Query Configuration** の下にある、**Add New Query** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. クエリの root CI のホスト名フィールドを Datadog のホスト名フィールドにマッピングする **Hostname Column** の値を選択します。
1. **Column Name Maps** で任意のフィールド名の再マッピングを選択します。
1. **Save** をクリックします。

クエリのスケジュール実行後すぐにホストタグが Datadog に入力されます。

![ServiceNow のホスト タグが表示された Host info タブのスクリーンショット][10]

Datadog の [イベント エクスプローラー][11] で、検索クエリのスコープを `source:servicenow` に設定して、取り込みプロセスを監視します。

![実行中の取り込みが 1 件表示されたスクリーンショット][12]

#### その他の非 CMDB フィールドのタグ付け

一部の ServiceNow テーブルは非 CMDB であり、Query Builder で選択できません。これらのテーブルのタグで Datadog ホストをリッチ化するには、構成タイルの **Additional Fields** をクリックし、上記に従ってホストのタグ付けのためのクエリを構成します。その際には、ドットで連結された完全なパスを指定します。パスは、クエリで構成されたルートテーブルの最初の属性名から始める必要があります。たとえば、root CI が `cmdb_ci_server` のクエリに `vendor.manufacturer.name` と入力すると、ホストに `cmdb_ci_server_manufacturer_name` というタグが設定されます。

**注**: Additional Fields で使用できるのは、ServiceNow Table API でサポートされているドット連結パスのみです。多対多のリレーションシップはそのままでは動作せず、追加の設定が必要になる場合があります。

#### ホストのタグ付けに関するトラブルシューティング

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

サービスのタグ付けを使用すると、ServiceNow CMDB から Datadog [サービス カタログ][13] にサービスを取り込むことができます。

## セットアップ

サービスデータの取り込みを有効にするには

1. ServiceNow インスタンスで、サービス カタログを充実させるのに使用したいすべてのサービスを返す [Query Builder][9] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーション タイルに移動します。**Configure** 内の **CMDB Enrichment** タブで **Service Tagging** を選択します。
1. **Query Configuration** の下にある、**Add New Query** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. **Service Name Column** ドロップダウンメニューから値を選択します。この値は、クエリのルートサービス CI 上の列名と一致し、サービスカタログのサービス名を入力します。
1. スキーママッピングを構成して、サービスに関する追加のメタデータをサービス カタログに取り込みます。詳細は [サービス定義][14] を参照してください。Datadog が取り込みを受け入れるためには、マッピングの各フィールドが、サービス カタログのサービス定義スキーマにマッピングされる正しいタイプである必要があります。
1. **Save** をクリックします。

Datadog にサービスデータが反映されるのは、クエリがスケジュール実行されてから数分後です。取り込みエラーを表示するには、[イベント エクスプローラー][11] で `source:servicenow` のイベントを検索します。

![ServiceNow から入力されたメタデータを示す Service Configuration パネルのスクリーンショット][15]

#### セットアップに関するトラブルシューティング

サービスの取り込みが正しく機能するためには、以下のことがシステムで正しいことを確認してください。

-   Query Builder クエリを作成・実行するユーザが、Datadog 構成のユーザ名と一致している。ServiceNow のユーザーは `cmdb_query_builder_read` というロールを持っている必要があります。
-   クエリが返す結果の数は、ServiceNow の `glide.cmdb.query.max_results_limit` 設定以下でなければなりません。デフォルトでは、結果の最大数は 10000 です。設定を変更するには、**Configuration** -> **CMDB Properties** -> **Query Builder Properties** に移動します。
-   Query Builder クエリで構成されるすべての CI には **1** ラベルが必要です。これにより、パーサーがサポートしない重複した CI を作成していないことを確認できます。

### ネットワークデバイスのタグ付け

ServiceNow CMDB のデータを用いて、Datadog 内のネットワークデバイスにタグを追加してください。

デバイスのタグ付けを利用することで、Datadog の [Network Device Monitoring][16] で監視しているネットワーク デバイスを、ServiceNow CMDB 由来のデバイス メタデータで動的にエンリッチできます。

デバイスタグの取り込みを有効にするには

1. ServiceNow インスタンスで [Query Builder][9] を使用してクエリを構成し、そのクエリがデバイスの IP アドレスを返すことを確認してください。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. Datadog でカスタム IP ネームスペースを使用している場合は、ServiceNow にそれを追加する必要があります。Network device CI 上に **u_dd_device_namespace** という列を作成し、各デバイスに対応するネームスペースを入力します。この列が存在しない場合は、デフォルトのネームスペースが使用されます。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーション タイルに移動します。**Configure** 内の **CMDB Enrichment** タブで **Device Tagging** を選択します。
1. **Query Configuration** の下にある、**Add New Query** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. クエリの IP Address フィールドを Datadog の IP Address フィールドにマッピングする IP Address 列を選択します。
1. 任意のフィールド名の再マッピングを選択します。
1. **Save** をクリックします。

クエリがスケジュール実行された後、数分以内にはネットワークデバイスタグが Datadog 上に反映されます。取り込みエラーが発生した場合は、イベントエクスプローラーで表示できるイベントを通じて報告されます。

Datadog の[イベントエクスプローラー][11]で、検索クエリのスコープを `source:servicenow` に設定して、取り込みプロセスを監視します。

![実行中の取り込みが 1 件表示されたスクリーンショット][12]

#### ネットワーク デバイスのタグ付けに関するトラブルシューティング

-   querybuilder のクエリを作成または実行するユーザーが、Datadog 構成で指定されているユーザーと同一であり、かつ `cmdb_query_builder_read` ロールを持っていることを確認してください。
-   クエリが ServiceNow の `glide.cmdb.query.max_results_limit` 設定で許可される結果件数を超えていないことを確認してください。
    querybuilder クエリで構成するすべての CI に '1' のラベルが付いていることを確認してください。また、パーサーが重複した CI をサポートしていないため、重複 CI を作成しないようご注意ください。

#### 制限

-   取り込みは 1 回の実行につき 100k ホストに制限されています。
-   ネットワーク デバイスのタグ付けは [SNMP デバイス][17] に限定されます。
-   デバイスへの更新は 1 時間あたり数千件に制限されます。スケジュール間隔を選択する際にはこのことを考慮してください。

### 参照テーブル

ServiceNow の CI から取得した追加フィールドを使用してログやイベントを自動的にエンリッチするには [Reference Tables][18] を使用します。Reference Tables を使用すると、ホスト名などのプライマリ キーに値フィールドのセットをマッピングし、指定したキーを含むすべてのログやイベントにこれらのフィールドを自動的に追加できます。

リファレンステーブルの取り込みを有効にするには

1. ServiceNow インスタンスで [Query Builder][19] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを保存してください。
1. **Add New Query** を選択し、ドロップダウンメニューから該当するクエリを選択してください。
1. プライマリキーを選択するドロップダウンで、プライマリキーとして使用する列名を選んでください。
    1. 任意で、このプライマリ キーを用いて [Processing Pipeline][20] を作成し、ログやイベントのエンリッチおよび相関付けを行うことができます。
1. リファレンステーブルに名前を入力してください。
1. **Save** をクリックします。

保存後まもなく、[Reference Table][18] にクエリのデータが取り込まれます。

#### 注意事項および制限事項

-   Reference Table 名は一意でなければなりません。
-   既存テーブルの削除およびスキーマ更新はサポートされません。

## ITOM と ITSM のセットアップ
{{% site-region region="gov" %}}
<div class="alert alert-warning">
Case Management インテグレーションは、{{< region-param key=dd_datacenter code="true" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Incident Management インテグレーションは、{{< region-param key=dd_datacenter code="true" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
テンプレート化されたモニター通知は、{{< region-param key=dd_datacenter code="true" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

モニター、Case Management、Incident Management 向けの Datadog インテグレーションを使用するには、各製品の手順に従ってください:
1. [Datadog のテンプレート化されたモニター通知の構成](#configure-templated-monitor-notifications)
2. [Datadog Case Management の構成](#configure-case-management)
3. [Datadog Incident Management の構成](#configure-incident-management)

### テンプレート化されたモニター通知の構成

**注**: この機能にはアプリバージョンが v2.6.0 以上であることが必要です。また、下記の手順を完了する前に Datadog 内の ServiceNow タイルの構成ページでインスタンスを追加する必要があります。

##### インスタンス優先度マッピングの構成

![インテグレーション タイル上の ServiceNow 優先度マッピング フォーム][21]

特定のインスタンスに対してテンプレート化されたすべての @ ハンドルに対し、Datadog はこのマッピングに従い、ServiceNow 内でモニター優先度をインパクトおよび緊急度へ自動的にマップします。

`Use Instance Priority Mapping` をオフに切り替えると、ServiceNow レコードでのインパクトおよび緊急度設定が無効になります。

##### モニターテンプレートの構成
![新しい ServiceNow インテグレーション タイル][22]

Datadog 内で `@servicenow-<TEMPLATE_NAME>` を使用するモニター通知の場合、Datadog 内の ServiceNow インテグレーションタイルの ITOM/ITSM タブにある新しいテンプレート作成 UI を使用して、ServiceNow 通知を作成します。

**注**: これはアプリバージョン 2.6.0 以上でのみ利用可能です。

##### カスタム ServiceNow @ ハンドルの作成 (モニター通知用)

![新しい ServiceNow インテグレーション タイル上のモニター通知手順][23]

1. `+ New` ボタンをクリックして新しいテンプレートを作成します。
2. モニター通知が配信される @ ハンドル `Name`、`Instance`、`Target Table` を定義します。その後、`Assignment Group`、`Business Service`、`User`、または `Unassigned` のいずれかを選択してレコードに割り当てます。バージョン 2.6.0 で定義された変換マップは、ここで選択した値を用いてインシデント `INC` レコードを自動的に補完します。

新しいテンプレートを使用するには、モニターの説明内に `@servicenow-<TEMPLATE_NAME>` を追加します。

[チケット ペイロードとフィールド マッピングでの変数の使用](#use-variables-in-ticket-payload-and-field-mappings) セクションの `Add Field` をクリックして、ペイロードにカスタム フィールドを追加できます。

### Case Management の構成

![新しい ServiceNow インテグレーション タイル上の Case Management 手順][24]

`Case Management` タブから
1. Case Management 用に構成したいインスタンスを選択します。
2. ケースを送信するテーブルを `Datadog Cases ITOM` または `Datadog Cases ITSM` から選択します。
   **注**: デフォルトではいずれのテーブルも選択されていません。
3. Datadog の [Case Management][25] に移動します。
4. Create ServiceNow Incident を選択します。
5. インスタンスおよびオプションの割り当てグループを選び、Create をクリックします。

##### 状態とコメントを Case Management と双方向に同期

ServiceNow での編集によって Datadog の関連するケースが更新されるようにするには、`x_datad_datadog.user` ロールと `admin` ロールを持つ ServiceNow ユーザーが、ServiceNow で **ITOM/ITSM Integration for Datadog** アプリのインストール設定を構成する必要があります。

**注**: このセットアップでは、ユーザーの Application Key ではなく、Service Account Application Key を使用することが重要です。ユーザーの Application Key は、ユーザーのアカウント権限に紐付けられます。ユーザーの権限が減少したり、ユーザーが非アクティブになったりすると、ServiceNow と Datadog 間の双方向同期が停止します。 Service Account Application Key は、個々のユーザーには紐付けられないので、双方向同期がユーザーアカウントの変更によって影響を受けることはありません。

1. 左上の **All** をクリックし、フィルターに `ITOM/ITSM Integration for Datadog` と入力し、フィルター適用後のリストに表示される **Configuration** リンクをクリックして、**ITOM/ITSM Integration for Datadog** アプリの構成設定ページに移動します。
1. Datadog データセンターサイトを選択します。
1. **Organization Settings** にある Datadog API キーを **API Key** フィールドに貼り付けます。
1. **Organization Settings** にある Datadog Service Account Application Key を **Application Key** フィールドに貼り付けます。
1. Enabled チェックボックスをチェックし、構成の変更を保存します。

**注**: **Application Scope** (右上の地球儀アイコンからアクセス可能) が`Global` ではなく、`ITOM/ITSM Integration for Datadog` に設定されていることを確認してください。間違ったスコープを使用すると、上記のフィールドを設定する際に権限エラーが発生する可能性があります。
![Application Scope][26]

![ServiceNow の変更を Datadog に同期するための ServiceNow の構成設定][27]

ServiceNow でインストール設定を構成した後、Datadog Case Management に戻り、[インテグレーションを構成][28]します。

##### 相関アラートを使用して ServiceNow の値をカスタマイズする

**注**: この機能にはアプリ バージョン >= v2.7.0 が必要です。

相関アラートの情報を使用して ServiceNow の値を入力するために、Datadog Cases ITSM テーブルと Datadog Cases ITOM テーブルの変換マップに変換スクリプトの例 (`onBefore`) が含まれています。デフォルトでは、このスクリプトはコメント アウトされています。このスクリプトを有効にするには、**コメントを解除**し、ユース ケースに合わせて **修正**してください。スクリプトで ServiceNow インシデントの値を入力するには、修正が**必須**です。

### Incident Management の構成

アプリのインストール後、Incident Management の [Integration Settings][29] にアクセスしてセットアップを完了します。Incident Management と ServiceNow の間で同期されるフィールドの詳細については、[Incident Management フィールド マッピング](#incident-management-field-mappings) を参照してください。

##### 状態、影響度、緊急度を Incident Management と双方向に同期

ServiceNow での編集によって Datadog の関連するインシデントが更新されるようにするには、`x_datad_datadog.user` ロールと `admin` ロールを持つ ServiceNow ユーザーが、ServiceNow で **ITOM/ITSM Integration for Datadog** アプリのインストール設定を構成する必要があります:

**注**: このセットアップでは、ユーザーの Application Key ではなく、Service Account Application Key を使用することが重要です。ユーザーの Application Key は、ユーザーのアカウント権限に紐付けられます。ユーザーの権限が減少したり、ユーザーが非アクティブになったりすると、ServiceNow と Datadog 間の双方向同期が停止します。 Service Account Application Key は、個々のユーザーには紐付けられないので、双方向同期がユーザーアカウントの変更によって影響を受けることはありません。

1. 左上の **All** をクリックし、フィルターに `ITOM/ITSM Integration for Datadog` と入力し、フィルターリストに表示される **Configuration** リンクをクリックして、**ITOM/ITSM Integration for Datadog** アプリの構成設定ページに移動します。
1. Datadog データセンターサイトを選択します。
1. **Organization Settings** にある Datadog API キーを **API Key** フィールドに貼り付けます。
1. **Organization Settings** にある Datadog Service Account Application Key を **Application Key** フィールドに貼り付けます。
1. Enabled チェックボックスをチェックし、構成の変更を保存します。

**注**: **Application Scope** (右上の地球儀アイコンからアクセス可能) が`Global` ではなく、`ITOM/ITSM Integration for Datadog` に設定されていることを確認してください。間違ったスコープを使用すると、上記のフィールドを設定する際に権限エラーが発生する可能性があります。
![Application Scope][26]

ServiceNow でインストール設定を構成した後、Datadog Incident Management に戻り、[インテグレーションを構成][29]します。

### レガシーモニター通知

Datadog で `@servicenow-<INSTANCE_NAME>` を使用するレガシーモニター通知の場合、ITOM/ITSM タイルの下部にある "Manage Legacy Monitor Notifications" と題されたセクションで、通知を送信する中間テーブルを選択します。

1. 通知を構成したいインスタンスを選択し、レガシーモニター通知が書き込まれるテーブルを選択します。
2. インテグレーションが正しくセットアップされているかを検証するには、モニターまたはイベント通知に `@servicenow-<INSTANCE_NAME>` を追加します。未加工のデータが中間テーブルの行に挿入され、アプリで指定されている ServiceNow テーブルに転送されます。
3. ServiceNow で[変換マップを使用](#customize-data-for-monitor-notifications-with-transform-maps)して、中間テーブルへ送信されるデータの変換をカスタマイズします。
4. Datadog 変数またはカスタム文字列を使用して、通知ペイロードをカスタマイズします。
5. ServiceNow インシデントに優先度を設定するには、[インシデント優先度のフィールド マッピング](#incident-priority-field-mapping) の手順に従ってください。

### 変換マップによるモニター通知データのカスタマイズ

**Templated Monitors ITSM**、**Legacy Monitors ITSM** および **Datadog Cases ITSM** テーブルは、変換マップを使用して Datadog レコードを ServiceNow インシデントに変換します。
同様に、**Datadog Monitors ITOM** および **Datadog Cases ITOM** は、Datadog レコードを ServiceNow イベントに変換します。

**Templated Monitors ITOM** および **Templated Monitors ITSM** テーブルでは、変換マップを使用して、Datadog レコードをそれぞれ ServiceNow イベントおよびインシデントに変換します。`New Template` UI で通知ペイロードをカスタマイズし、ServiceNow で変換マップを拡張することで、これらのテーブルの ServiceNow イベントとインシデント情報をカスタマイズすることができます。

**注**: **Datadog Cases ITOM** および **Datadog Cases ITSM** テーブルも同様に変換マップを使用しますが、Datadog ケースのペイロードはカスタマイズできないため、変換マップのカスタマイズは Case Management で使用することは推奨されません。変換マップのカスタマイズが推奨される唯一のケースは、相関アラートのデータを使用する場合です。この方法について詳しくは、[上記](#use-correlated-alerts-to-customize-values-in-servicenow)を参照してください。

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

Datadog Case Management から ServiceNow への更新は確認できるものの、ServiceNow から Datadog への更新が確認できない場合、これは ServiceNow ITOM では想定される動作です。Case Management との双方向同期は ServiceNow ITSM のみでサポートされています。

ご不明な点は、[Datadog のサポート チーム][30] までお問い合わせください。

## ナレッジベース

### テンプレート化されたモニター ITXM テーブルフィールドおよび変換マップ

`action`
: **タイプ**: 文字列<br>
モニターで行われているアクション: `create`、`update`、`acknowledge`、`resolve`"

`additional_information`
: **タイプ**: 文字列<br>
**ITOM 変換**: `additional_info`<br>
すべてのイベントの詳細を含む整形された文字列

`aggreg_key`
: **タイプ**: 文字列<br>
アラートを発出しているモニターの ID のハッシュを表す集約キー

`alert_cycle_key`
: **タイプ**: 文字列<br>
1 つのモニターのアラート サイクル (アラート → 警告 → 解決を追跡) のハッシュを表すキー。

`alert_id`
: **タイプ**: 文字列<br>
アラートを発出しているモニターの ID

`alert_metric`
: **タイプ**: 文字列<br>
**ITOM 変換**: `metric_name`<br>
アラートのトリガーとなったメトリクス

`alert_query`
: **タイプ**: 文字列<br>
アラートのトリガーとなったクエリ

`alert_scope`
: **タイプ**: 文字列<br>
アラートのトリガーとなったスコープ

`alert_status`
: **タイプ**: 文字列<br>
アラートの現在の状態

`alert_title`
: **タイプ**: 文字列<br>
アラートの名前

`alert_transition`
: **タイプ**: 文字列<br>
**ITSM 変換**: (script) -> state<br>
アラートの遷移状態: `Triggered`、`Warn`、`Recovered`

`assignment_group_sys_id`
: **タイプ**: 参照<br>
**ITSM 変換**: `assignment_group`<br>
**Reference Table**: Group<br>
テンプレート化されたハンドルの割り当てグループの ServiceNow sys_id

`business_service_sys_id`
: **タイプ**: 参照<br>
**ITSM 変換**: `business_service`<br>
**Reference Table**: Service<br>
テンプレート化されたハンドルのビジネス サービスの ServiceNow sys_id

`custom_fields`
: **タイプ**: 文字列<br>
JSON 変換可能な文字列として整形された、ユーザー設定のキーと値のフィールド

`datadog_tags`
: **タイプ**: 文字列<br>
アラートを発出しているモニターからの Datadog タグ

`description`
: **タイプ**: 文字列<br>
**ITSM 変換**: `description`<br>
**ITOM 変換**: `description`<br>
モニター アラートの概要

`event_details`
: **タイプ**: 文字列<br>
**ITSM 変換**: `work_notes`<br>
整形されたクリック可能な Datadog へのリンクを含むイベント詳細

`event_id`
: **タイプ**: 文字列<br>
イベントの Datadog ID

`event_link`
: **タイプ**: 文字列<br>
モニター アラートから作成されたイベントへのリンク

`event_msg`
: **タイプ**: 文字列<br>
イベントからのメッセージ

`event_title`
: **タイプ**: 文字列<br>
**ITSM 変換**: `short_description`<br>
イベントのタイトル

`event_type`
: **タイプ**: 文字列<br>
**ITOM 変換**: `type`<br>
イベントのタイプ

`hostname`
: **タイプ**: 文字列<br>
**ITSM 変換**: `cmdb_ci`<br>
**ITOM 変換**: `node`<br>
影響を受けるモニターのホスト

`impact`
: **タイプ**: 整数<br>
**ITSM 変換**: `impact`<br>
モニター優先度のユーザー定義マッピングに基づく影響度の値

`logs_sample`
: **タイプ**: 文字列<br>
関連ログのサンプル

`monitor_priority`
: **タイプ**: 整数<br>
**ITOM 変換**: `severity`<br>
アラートを発出しているモニターの優先度を整数で表したもの

`org_name`
: **タイプ**: 文字列<br>
アラートを発出しているモニターの組織の名前

`sys_created_by`
: **タイプ**: 文字列<br>
**ITSM 変換**: `caller_id`<br>
レコードの作成者 (通常、構成済みの ServiceNow API アカウント)

`ticket_state`
: **タイプ**: 文字列<br>
**ITSM 変換**: `state`、(script) -> close_code、(script) -> close_notes<br>
**ITOM 変換**: (script) -> resolution_notes<br>
ServiceNow レコードの状態: `new` または `resolved`

`u_correlation_id`
: **タイプ**: 文字列<br>
**ITSM 変換**: `correlation_id`<br>
**ITOM 変換**: `message_key`<br>
レコードを同じターゲット インシデントに結合するために使用する alert_cycle_key と aggreg_key の組み合わせ

`urgency`
: **タイプ**: 整数<br>
**ITSM 変換**: `urgency`<br>
モニター定義の優先度に基づいて、インテグレーション タイルのユーザー定義マッピングから設定された緊急度

`user_sys_id`
: **タイプ**: 参照<br>
**ITSM 変換**: `assigned_to`<br>
**Reference Table**: User <br>
ユーザー用に渡されたテンプレート化されたハンドルから取得した sys_id


### Datadog インポートホストのオートフラッシュルール

インポートセットテーブル `x_datad_datadog_import_host` が蓄積する行が増えすぎることを防ぐために、最後の 24 時間のデータのみを保持するオートフラッシュルールがテーブルクリーナーツールに追加されました。このコンフィギュレーション設定は、必要に応じて、フィルターナビゲーターで `sys_auto_flush_list.do` に移動し、`x_datad_datadog_import_host` テーブルのルールに入ることで変更できます。必要に応じて `Age in seconds` フィールドを更新できます。

![インテグレーション構成設定][31]

### モニターによるインシデントの重複作成

モニターが警告ごとに新しいインシデントを作成するのではなく、同じインシデントを再オープンすることを防ぐには、モニターがシンプル アラートに設定されていないことを確認してください。メトリクスのタグを使用してグループ化することにより、モニターを[マルチ アラート][32]に変換します。こうすることで、各アラートは個別のインシデントをトリガーします。

### チケットペイロードとフィールドマッピングでの変数の使用

アラートの本文やフィールドマッピングで変数を使用して、ServiceNow にイベントの詳細を挿入することができます。たとえば、タイトルと重大度を該当する ServiceNow フィールドに含めたり、ServiceNow のチケットから Datadog 内の特定のインシデントに戻るリンクを入れたりすることができます。

![ServiceNow 変数入力フォーム][33]
![ServiceNow 変数][34]

### 従来のインシデント優先度のフィールド マッピング
**注**: モニターの説明の `Impact` と `Urgency` は、[従来のモニター構成](#legacy-monitor-notifications)でのみ使用できます。[テンプレート化されたモニター](#configure-templated-monitor-notifications)の場合は、[インスタンス優先度のマッピング](#configure-instance-priority-mapping)を構成してください。

ServiceNow インシデントの `priority` フィールドは読み取り専用で、[優先度ルックアップ規則][35] を使用してのみ更新することができます。

ServiceNow のインシデント優先度を計算するために、モニターで `Impact` と `Urgency` を定義します。

![ServiceNow 優先度のフィールド マッピング][36]

### サポート解決ワークフローの自動化

モニター ステータスが正常に戻ると、関連付けられているサポート チケットが自動的に "resolved" に変更されます。

![ServiceNow Resolved][37]

### カスタムマッピングの定義

テーブルの 1 つ、例えば **Datadog Monitors ITSM Tables** をクリックし、レコードの一番下までスクロールすると、関連付けられている変換マップへのリンクが表示されます。

### マッピングの確認

変換マップ名をクリックすると、レコードを確認できます。

![ServiceNow インテグレーション][38]

上部には、変換レコードに関する 2 つの重要なフィールド、`Source table` と `Target table` があります。

![ServiceNow インテグレーション][39]

**注**:

-   ソースは、選択したインポートセットテーブル (ここでは、Datadog Monitors ITSM Tables)、ターゲットは、イベントが格納される実際のインシデントテーブル (またはイベントテーブル) です。
-   フィールドマッピングは、レコードの下部にあります。いくつかの基本的なマッピングが含まれています。ここで、含めるフィールドを選択したり、形式を定義したり、ServiceNow インスタンス内のターゲットフィールドを選択したりします。

### 新しいフィールドマッピングの追加

**New** をクリックします。

![ServiceNow インテグレーション][40]

1 対 1 マッピングのソースフィールドとターゲットフィールドを選択します。

![ServiceNow インテグレーション][41]

または、**Use source script** チェックボックスをオンにして、変換を定義します。

![ServiceNow インテグレーション][42]

**注:** インテグレーションタイルのカスタムフィールドをマッピングする場合、Datadog Monitors ITSM マップと ITSM Transform マップのいずれかに次のマッピングスクリプトを使用できます。この例では、フィールド `my_field` がインテグレーションタイルのカスタムフィールドとして定義されています。

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

### 検証

インテグレーションが正しくセットアップされているかを検証するには、モニターまたはイベント通知に `@servicenow-<your-template-name>` を追加します。未加工のデータが中間テーブルの行に挿入され、作成したマッピングと変換で指定されている ServiceNow テーブルに転送されます。

### Incident Management フィールド マッピング
| **Incident Management**       | **ServiceNow ケース テーブル**                | **ServiceNow インシデント**          | **同期ステータス**                                            |
|-------------------------------|-------------------------------------------|----------------------------------|------------------------------------------------------------|
| タイトル                         | Title - 文字列                            | Short Description                | Datadog -> ServiceNow の一方向同期                    |
| What Happened                 | Description - 文字列                      | 説明                      | Datadog -> ServiceNow の一方向同期                    |
| 状態                         | State - 文字列                            | 状態                            | 双方向同期                                    |
| DD Incident URL               | Incident URL - 文字列                     | Work Notes                       | Datadog -> ServiceNow の一方向同期                    |
| 重大度                      | Incident Urgency (整数)                    | Urgency                          | 双方向同期                                    |
| 重大度                      | Incident Impact (整数)                     | 影響                           | 双方向同期                                    |

| **Datadog モニターの状態**                        | **ServiceNow インシデントの状態** |
|--------------------------------------------------|-------------------------------|
| Alert                                            | In Progress                   |
| Warn                                             | In Progress                   |
| OK                                               | Resolved                      |
| Completed *(オプションで設定にて構成)*   | Resolved                      |

| **Datadog インシデント重大度** | **ServiceNow 緊急度** | **ServiceNow インパクト** | **ServiceNow 優先度** |
|-------------------------------|-------------------------|------------------------|--------------------------|
| SEV-1                         | 1                       | 1                      | 1 - クリティカル             |
| SEV-2                         | 1                       | 2                      | 2 - 高                 |
| SEV-2                         | 2                       | 1                      | 2 - 高                 |
| SEV-3                         | 1                       | 3                      | 3 - 中             |
| SEV-3                         | 2                       | 2                      | 3 - 中             |
| SEV-3                         | 3                       | 1                      | 3 - 中             |
| SEV-4                         | 2                       | 3                      | 4 - 低                  |
| SEV-4                         | 3                       | 2                      | 4 - 低                  |
| SEV-5 (軽微)                 | 3                       | 3                      | 5 - 計画中             |
| Unknown                       | 3                       | 3                      | 5 - 計画中             |

**注**: Incident Management Settings で `Start at SEV-0` が有効になっている場合、`ServiceNow Urgency`、`ServiceNow Impact`、`ServiceNow Priority` の値はどれも変わりませんが、`Datadog Incident Severity` は 1 つ下がります。たとえば、1 行目は **Datadog インシデント重大度: SEV-0、ServiceNow 緊急度: 1、ServiceNow インパクト: 1、ServiceNow 優先度: 1 - 重大**になります。

## その他の参考資料

- [Datadog アラートから ServiceNow チケットを作成する][43]
- [ServiceNow CMDB と Datadog を使用してインフラストラクチャーを管理する][44] 

[1]: https://www.servicenow.com/community/now-platform-articles/servicenow-versions-release/ta-p/2312014
[2]: images/servicenow-appstore-itxm-integration.png
[3]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.7.2.xml
[4]: https://app.datadoghq.com/integrations/servicenow
[5]: images/servicenow-configuration-new-instance-12-23.png
[6]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/c877cb86687e0050f8774bfad236c950/1.2.1
[7]: https://store.servicenow.com/
[8]: images/SGC_datadog_tag.png
[9]: https://docs.servicenow.com/bundle/xanadu-servicenow-platform/page/product/configuration-management/concept/cmdb-query-builder-landing-page.html
[10]: images/host-tags.jpg
[11]: https://app.datadoghq.com/event/explorer
[12]: images/ingestion-progress.jpg
[13]: https://docs.datadoghq.com/tracing/service_catalog/
[14]: https://docs.datadoghq.com/tracing/service_catalog/adding_metadata/
[15]: images/service-metadata.jpg
[16]: https://docs.datadoghq.com/network_monitoring/devices/
[17]: https://docs.datadoghq.com/network_monitoring/devices/snmp_metrics/
[18]: https://app.datadoghq.com/reference-tables
[19]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[20]: https://app.datadoghq.com/event/pipelines
[21]: images/servicenow-priority-mapping.png
[22]: images/servicenow-integration-tile.png
[23]: images/servicenow-monitors.png
[24]: images/servicenow-case-management.png
[25]: https://app.datadoghq.com/cases
[26]: images/servicenow-application-scope.png
[27]: images/datadog-sync-configuration.png
[28]: https://docs.datadoghq.com/service_management/case_management/settings#servicenow
[29]: https://app.datadoghq.com/incidents/settings#Integrations
[30]: https://docs.datadoghq.com/help/
[31]: images/servicenow-cmdb-autoflush-rule.png
[32]: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#multi-alert
[33]: images/servicenow-variables-form.png
[34]: images/servicenow-variables.png
[35]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
[36]: images/servicenow-priority-field-mapping.png
[37]: images/servicenow-03-servicenow-resolved.png
[38]: images/servicenow-click-transform-map.png
[39]: images/servicenow-source-target-fields.png
[40]: images/servicenow-click-new.png
[41]: images/servicenow-select-source-target.png
[42]: images/servicenow-script-example.png
[43]: https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts
[44]: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog

