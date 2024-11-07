---
categories:
- alerting
- incidents
- issue tracking
- notifications
custom_kind: integration
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
  text: Manage your infrastructure with ServiceNow CMDB and Datadog
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
-   Enrich business-specific information stored as CIs in ServiceNow CMDB with your hosts, services, and devices information from Datadog, enabling you to better understand your infrastructure usage, accelerate troubleshooting, and maximize resource utilization

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

The notes below only apply if you have already configured the integration for ServiceNow ITOM/ITSM:

-   サービスグラフコネクタでは、コンフィギュレーションタイルの `Target table` 値と `Custom table` 値を使用しません。Target テーブルのデフォルト値とのインテグレーションを保存できます。
-   サービスグラフコネクタのセットアップ手順に記載されているように、ユーザーに cmdb_import_api_admin ロールを付与することで、同じ ITOM/ITSM ユーザーをサービスグラフコネクタで使用できます。

### ホストのタグ付け

ホストのタグ付けにより、ServiceNow CMDB のメタデータで Datadog ホストをリッチ化します。

ホストタグの取り込みを有効にするには

1. Configure a [Query Builder][5] query in your ServiceNow instance that returns all of the hosts you wish to tag in Datadog.
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. Once the query has been saved in ServiceNow, go to Datadog’s ServiceNow integration tile. Select the **Host Tagging** in the **CMDB Enrichment** tab.
1. Under **Query Configuration**, click the **Add New Query** button.
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. クエリの root CI のホスト名フィールドを Datadog のホスト名フィールドにマッピングする **Hostname Column** の値を選択します。
1. **Column Name Maps** で任意のフィールド名の再マッピングを選択します。
1. **Save** をクリックします。

クエリのスケジュール実行後すぐにホストタグが Datadog に入力されます。

{{< img src="integrations/servicenow/host-tags.jpg" alt="ServiceNow のホストタグを表示するホスト情報タブのスクリーンショット" >}}

Monitor the ingestion process in the Datadog [Events Explorer][6] by scoping your search query on `source:servicenow`.

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="取り込み実行中のスクリーンショット" >}}

#### トラブルシューティング

For host tagging to work correctly, ensure that the following are true in your system:

-   Query Builder クエリを作成・実行するユーザが、Datadog 構成のユーザ名と一致している。ServiceNow のユーザーは `cmdb_query_builder_read` というロールを持っている必要があります。
-   クエリが返す結果の数は、ServiceNow の `glide.cmdb.query.max_results_limit` 設定以下でなければなりません。デフォルトでは、結果の最大数は 10000 です。設定を変更するには、**Configuration** -> **CMDB Properties** -> **Query Builder Properties** に移動します。
-   Query Builder クエリで構成されるすべての CI には **1** ラベルが必要です。これにより、パーサーがサポートしない重複した CI を作成していないことを確認できます。

#### 制限

-   取り込みは 1 回の実行につき 100k ホストに制限されています。
-   ホストへの更新は 1 時間あたり数千件に制限されます。スケジュール間隔を選択する際にはこの制限を考慮してください。
-   Datadog のホストエイリアスは大文字と小文字を区別するため、小文字のホスト名を持つ Linux マシンではタグ付けが機能しません。

### Service tagging

Enrich your Datadog Service Catalog with ServiceNow CMDB metadata through service tagging.

With service tagging, you can populate your Datadog [Service Catalog][7] with services from your ServiceNow CMDB.

#### セットアップ

To enable ingestion of service data:

1. ServiceNow インスタンスで、サービスカタログをリッチ化したいすべてのサービスを返す [Query Builder][5] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. Once the query is saved in ServiceNow, go to Datadog’s ServiceNow integration tile. Select **Service Tagging** in the **CMDB Enrichment** tab.
1. Under **Query Configuration**, click the **Add New Query** button.
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. **Service Name Column** ドロップダウンメニューから値を選択します。この値は、クエリのルートサービス CI 上の列名と一致し、サービスカタログのサービス名を入力します。
1. スキーママッピングを構成して、サービスに関する追加のメタデータをサービスカタログに取り込みます。詳細は[サービス定義][8]を参照してください。Datadog が取り込みを受け入れるためには、マッピングの各フィールドが、サービスカタログのサービス定義スキーマにマッピングされる正しいタイプである必要があります。
1. Click **Save**.

Expect to see service data populated in Datadog a few minutes after your queries' scheduled executions. To view ingestion errors, go to the [Events Explorer][6] and search for events with `source:servicenow`.

{{< img src="integrations/servicenow/service-metadata.jpg" alt="ServiceNow から入力されたメタデータを示す Service Configuration パネルのスクリーンショット" >}}

#### トラブルシューティング

サービスの取り込みが正しく機能するためには、以下のことがシステムで正しいことを確認してください。

-   Query Builder クエリを作成・実行するユーザが、Datadog 構成のユーザ名と一致している。ServiceNow のユーザーは `cmdb_query_builder_read` というロールを持っている必要があります。
-   クエリが返す結果の数は、ServiceNow の `glide.cmdb.query.max_results_limit` 設定以下でなければなりません。デフォルトでは、結果の最大数は 10000 です。設定を変更するには、**Configuration** -> **CMDB Properties** -> **Query Builder Properties** に移動します。
-   Query Builder クエリで構成されるすべての CI には **1** ラベルが必要です。これにより、パーサーがサポートしない重複した CI を作成していないことを確認できます。

### Network device tagging

Add tags to your network devices in Datadog populated with data from your ServiceNow CMDB.

With device tagging, you can dynamically enrich network devices monitored by Datadog [Network Device Monitoring][9] with device metadata from your ServiceNow CMDB.

To enable ingestion of device tags:

1. Configure a [Query Builder][5] query in your ServiceNow instance. Make sure it is returning the device IP Address.
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. If you are using a custom IP namespace in Datadog, you need to add it to ServiceNow. Create a column on the Network device CI called **u_dd_device_namespace**, populated by the corresponding namespace for each device. If this column is not present, the default namespace is used.
1. Once the query is saved in ServiceNow, go to Datadog’s ServiceNow integration tile. Select **Device Tagging** in the **CMDB Enrichment** tab.
1. Under **Query Configuration**, click the **Add New Query** button.
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. Select the IP Address column that maps your query's IP Address field to Datadog's IP Address field.
1. Select any optional field name remappings.
1. **Save** をクリックします。

You can expect to see network device tags populated in Datadog within a few minutes after your queries' scheduled executions. Any ingestion errors are reported through events viewable in your events explorer.

Monitor the ingestion process in the Datadog [Events Explorer][6] by scoping your search query on `source:servicenow`.

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="取り込み実行中のスクリーンショット" >}}

#### トラブルシューティング

-   Verify that the user who created or is executing the querybuilder query is the same user in your Datadog configuration and has the role `cmdb_query_builder_read`.
-   Check that your query isn't returning more results than your `glide.cmdb.query.max_results_limit` setting in Servicenow is configured to allow.
    Make sure all CIs configured in your querybuilder query have a '1' label. Ensure you did not create any duplicate CIs, as the parser doesn't support them.

#### 制限

-   取り込みは 1 回の実行につき 100k ホストに制限されています。
-   Network device tagging is limited to [SNMP devices][10].
-   Updates to devices are throttled to a few thousand per hour. Take this into consideration when choosing your schedule interval.

### Reference Tables

Use [Reference Tables][11] to automatically enrich logs and events with additional fields from your ServiceNow CIs. With Reference Tables, you can map sets of value fields to a primary key, such as a hostname, and automatically append these fields to all logs or events that contain the specified key.

To enable ingestion of Reference Tables:

1. ServiceNow インスタンスで [Query Builder][5] クエリを構成します。
1. Schedule the query to run at your desired refresh interval.
1. Save the query.
1. Select, **Add New Query**, and choose your query from the dropdown menu.
1. In the primary key dropdown, select the column name you want to use as your primary key.
    1. Optionally, create a [Processing Pipeline][12] with this primary key to enrich and correlate logs and events.
1. Enter a name for your reference table.
1. **Save** をクリックします。

The [Reference Table][11] will be populated with the data from the query shortly after saving.

#### Caveats and restrictions

-   Reference Table name must be unique.
-   Deletions and schema updates of existing tables are not supported.

## ITOM と ITSM のセットアップ

{{% site-region region="gov,ap1" %}}

<div class="alert alert-warning">
Case Management インテグレーションは、{{< region-param key=dd_datacenter code="true" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Incident Management インテグレーションは、{{< region-param key=dd_datacenter code="true" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

Datadog インテグレーションをモニター、Case Management、および Incident Management に使用するには、以下の手順に従ってください。

1. [最新の Datadog Update Set のインストール](#install-the-datadog-update-set)
2. [Datadog 用の正しい権限を持つ ServiceNow アカウントの作成](#create-a-servicenow-account-with-correct-permissions-for-datadog)
3. [ITOM と ITSM で使用するための Datadog アプリケーションの構成](#configure-datadog-applications-for-use-with-itom-and-itsm-modules)

### Datadog Update Set のインストール

Download the latest Update Set here: [`Datadog-Snow_Update_Set_v2.5.3.xml`][13]

**注**: Case Management とのインテグレーションは、v2.4.0 以降でのみサポートされています。Incident Management とのインテグレーションおよび Case Management との双方向同期は、v2.5.0 以降でのみサポートされます。

ServiceNow で以下を実行します。

1. ダウンロードした Update Set XML ファイルを手動でインポートします。
2. XML ファイルをインポートすると、Update Set の状態が `Loaded` になります。Update Set の名前をクリックして、変更をプレビューします。
3. Update Set をプレビューしてエラーがないことを確認したら、**Commit Update Set** を選択してアプリケーションをお使いのシステムにマージします。

セットアップ完了後、ServiceNow のナビゲーションメニューで **Datadog** を検索し、5 つのテーブルと双方向同期セットアップ用の構成ページにアクセスします。

-   `Configuration`
-   `Datadog Incidents ITSM`
-   `Datadog Cases ITOM` (旧称: `Datadog Case Event`)
-   `Datadog Cases ITSM` (旧称: `Datadog Case Incident`)
-   `Datadog Monitors ITOM` (旧称: `Datadog Event`)
-   `Datadog Monitors ITSM` (旧称: `Datadog Incident`)

### Datadog の適切な権限を持つ ServiceNow アカウントを作成

インテグレーションを使用するには、ServiceNow ユーザー (例えば、ユーザー名 “datadog”) を作成し、次のすべてのロールを割り当てます。

-   `x_datad_datadog.user` および
-   `import_set_loader` および
-   `import_transformer`

#### ITOM および ITSM モジュールへのモニター通知の直接送信

ITOM モジュールの **Event** テーブルまたは ITSM モジュールの **Incident** テーブルに直接通知を送信する場合、ServiceNow ユーザーは以下のロールがどちらも必要です。

-   `ITIL` および
-   `evt_mgmt_integration`

#### Datadog Case Management との双方向同期

解決のためにインシデントの状態を同期する場合、ServiceNow ユーザーは次のロールのいずれかが必要です。

-   `ITIL` または
-   `list_updater` または
-   `sn_incident_write`

クローズのためにインシデントの状態を同期する場合、ServiceNow ユーザーは以下のロールが必要です。

-   `ITIL_admin`

**Note**: Manual updates made to a ticket in ServiceNow by this ServiceNow user will not be synced to Datadog.

### ITOM および ITSM モジュールで使用するために Datadog アプリケーションを構成する

**注**: 以下のステップを完了する前に、Datadog インテグレーションページで ServiceNow タイルをセットアップする必要があります。

For Monitor Notifications using `@servicenow-<INSTANCE_NAME>` in Datadog, select the interim table to send notifications to in the ServiceNow tile.

1. ServiceNow インテグレーションタイルの Monitor Notifications ドロップダウンから、モニター通知が書き込まれるテーブルを選択します。
2. インテグレーションが正しくセットアップされているかを検証するには、モニターまたはイベント通知に `@servicenow-<INSTANCE_NAME>` を追加します。未加工のデータが中間テーブルの行に挿入され、作成したマッピングと変換で指定されている ServiceNow テーブルに転送されます。
3. ServiceNow で[変換マップを使用](#customize-data-with-transform-maps)して、テーブルに送信されるデータのフォーマットをカスタマイズします。
4. Datadog 変数またはカスタム文字列を使用して、通知ペイロードをカスタマイズします。

Datadog の Case Management を使用している場合、ServiceNow タイルでケースを同期する中間テーブルを選択できます (デフォルトでは無効)。

1. Case Management ドロップダウンから、ケースのテーブルを選択します。
2. インテグレーションが正しくセットアップされていることを確認するには、Datadog の Case Management に移動し、Create ServiceNow Incident を選択します。インスタンスとオプションの割り当てグループを選択し、Create をクリックします。
3. ServiceNow で[変換マップを使用](#customize-data-with-transform-maps)して、テーブルに送信されるデータのフォーマットをカスタマイズします。

**注**: `Datadog Cases ITOM` テーブルは更新用にセットアップされていません。このバージョンでは `Datadog Cases ITSM` テーブルの使用を推奨します。

{{< img src="integrations/servicenow/servicenow-itxm-tile-setup-2024.png" alt="モニター通知、カスタム通知ペイロード、ケース管理を備えた ServiceNow インテグレーションタイルのインスタンス" >}}

#### 状態とコメントを Case Management と双方向に同期

ServiceNow での編集によって Datadog の関連するケースが更新されるようにするには、`x_datad_datadog.user` ロールと `admin` ロールを持つ ServiceNow ユーザーが、ServiceNow で **ITOM/ITSM Integration for Datadog** アプリのインストール設定を構成する必要があります。

1. 左上の **All** をクリックし、フィルターに `ITOM/ITSM Integration for Datadog` と入力し、フィルターリストに表示される **Configuration** リンクをクリックして、**ITOM/ITSM Integration for Datadog** アプリの構成設定ページに移動します。
1. Datadog データセンターサイトを選択します。
1. **Organization Settings** にある Datadog API キーを **API Key** フィールドに貼り付けます。
1. **Organization Settings** にある Datadog Service Account Application Key を **Application Key** フィールドに貼り付けます。
1. Enabled チェックボックスをチェックし、構成の変更を保存します。

After configuring the installation settings in ServiceNow, return to Datadog Case Management to [configure the integration][14].

**注**: このセットアップでは、ユーザーの Application Key ではなく、Service Account Application Key を使用することが重要です。ユーザーの Application Key は、ユーザーのアカウント権限に紐付けられます。ユーザーの権限が減少したり、ユーザーが非アクティブになったりすると、ServiceNow と Datadog 間の双方向同期が停止します。 Service Account Application Key は、個々のユーザーには紐付けられないので、双方向同期がユーザーアカウントの変更によって影響を受けることはありません。

{{< img src="integration/servicenow/datadog_sync_configuration.png" alt="ServiceNow の変更を Datadog で同期するための ServiceNow の構成設定" >}}

#### 変換マップによるモニター通知データのカスタマイズ

The **Datadog Monitors ITSM** and **Datadog Cases ITSM** tables use a transform map to transform Datadog records into ServiceNow incidents.
Similarly, the **Datadog Monitors ITOM** and **Datadog Cases ITOM** transform Datadog records into ServiceNow events.

**Datadog Monitors ITOM** および **Datadog Monitors ITSM** テーブルでは、変換マップを使用して、Datadog レコードをそれぞれ ServiceNow イベントおよびインシデントに変換します。Datadog 構成タイルで通知ペイロードをカスタマイズし、ServiceNow で変換マップを拡張することで、これらのテーブルの ServiceNow イベントとインシデント情報をカスタマイズすることができます。

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

Need additional help? Contact [Datadog support][15].

## ナレッジベース

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

The `priority` field in ServiceNow incidents is _read only_ and can only be updated using [priority lookup rules][16].

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
[5]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[6]: https://app.datadoghq.com/event/explorer
[7]: https://docs.datadoghq.com/ja/tracing/service_catalog/
[8]: https://docs.datadoghq.com/ja/tracing/service_catalog/adding_metadata/
[9]: https://docs.datadoghq.com/ja/network_monitoring/devices/
[10]: https://docs.datadoghq.com/ja/network_monitoring/devices/snmp_metrics/
[11]: https://app.datadoghq.com/reference-tables
[12]: https://app.datadoghq.com/event/pipelines
[13]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.5.3.xml
[14]: https://docs.datadoghq.com/ja/service_management/case_management/settings#servicenow
[15]: https://docs.datadoghq.com/ja/help/
[16]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
