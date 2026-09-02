---
further_reading:
- link: /integrations/servicenow/
  tag: ドキュメント
  text: ServiceNow 統合
title: ServiceNow ITOM および ITSM の設定
---
ServiceNow の ITOM/ITSM 統合を使用すると、Datadog で生成されたアラート、作業項目、およびインシデントを、ServiceNow のインシデントまたはイベントテーブルにレコードとして送信できます。この統合は、中間テーブルと変換マップを利用して動作します。

この統合を使用するには、手順に従ってインストールし、各製品の設定を行ってください。
1. [ServiceNow タイルを設定する](#tile)
1. [ITOM/ITSM 統合をインストールする](#install)
1. 統合を設定する
   1. [Datadog のテンプレート化モニター通知を設定する](#monitor-notifications)
   1. [Datadog Work Management を設定する](#case-management)
   1. [Datadog Incident Management を設定する](#incident-management)
1. [変換マップを使用してデータをカスタマイズする](#transform-maps)

## ServiceNow タイルを設定する{#tile}

統合をインストールする前に、Datadog で ServiceNow インスタンスを使用する [ServiceNow タイルが設定されている][3]ことを確認してください。

## ITOM/ITSM 統合をインストールする{#install}

この統合をインストールする方法は 2 つあります。
- Datadog では、ServiceNow ストアから [ITOM/ITSM Integration for Datadog][1] 統合の最新バージョンをインストールすることを推奨しています。
- または、最新の Update Set ([Datadog-Snow_Update_Set_v2.7.9.xml][2]) をダウンロードし、ServiceNow インスタンスに手動でアップロードすることもできます。

## 統合を設定する{#configure-the-integration}

### テンプレート化モニター通知を設定する{#monitor-notifications}

<div class="alert alert-info">これらの機能には、ITOM/ITSM インテグレーションバージョン 2.6.0 以降が必要です。</a></div>

#### インスタンス優先度マッピングを設定する{#configure-instance-priority-mapping}

デフォルトでは、Datadog は ServiceNow にイベントを送信する際、ServiceNow の影響度および緊急度のレベルは含まれません。ServiceNow の各設定において、これらの ServiceNow レベルと Datadog のモニター優先度レベルとの対応付けを設定し、Datadog が生成するイベントに含めることができます。

1. Datadog で、[ServiceNow 統合設定][4]ページに移動します。
1. [**設定**] タブ、[**ITOM/ITSM**] タブ、[**モニター**] タブの順に選択します。
1. [**テンプレートのインスタンス優先度マッピング**] の下で、ServiceNow インスタンスの設定を開きます。
1. [**インスタンス優先度マッピングを使用**] トグルをオンにします。
1. [**ServiceNow 緊急度**] および [**ServiceNow 影響度**] で、Datadog のモニター優先度レベルに対応させるレベルを選択します。例:
   - Impact: 4
   - Urgency: 5
1. [**Update**] をクリックします。

#### モニター通知用のカスタム ServiceNow @-handle を作成する{#create-a-custom-servicenow-handle-for-monitor-notifications}

モニターから ServiceNow のレコードを作成するには、モニター通知ルールまたは通知先で使用する @-handle を設定する必要があります。

1. Datadog で、[ServiceNow 統合設定][4]ページに移動します。
1. [**設定**] タブ、[**ITOM/ITSM**] タブ、[**モニター**] タブの順に選択します。
1. [**テンプレート**] の横にある [**+ 新規**] をクリックして、新しいテンプレートを作成します。
1. モニター通知の送信先となる @-handle の [**名前**]、[**インスタンス**]、および [**ターゲットテーブル**] を定義します。
1. (任意) テンプレートに、[**割り当てグループ**]、**ビジネスサービス**、および/または [**ユーザー**] を設定します。<br />**注**: 割り当てグループとユーザーの両方を設定する場合、ServiceNow でのレコード作成を正常に完了させるには、そのユーザーが選択した割り当てグループに所属している必要があります。
1. (任意) [**通知ペイロードのカスタマイズ**] セクションを展開し、[**フィールドの追加**] をクリックして、Datadog から変数を追加します。
1. [**保存**] をクリックします。

新しいテンプレートを使用するには、モニターの説明に `@servicenow-<TEMPLATE_NAME>` を追加します。モニターがアラートを発すると、ServiceNow は対応するレコードを作成し、元のアラートが解消すると、そのレコードは自動的に [**解決済み**] に設定されます。

{{% collapse-content title="レガシーモニター通知を設定する" level="h4" expanded=false id="configure-legacy-monitor-notifications" %}}
`@servicenow-<INSTANCE_NAME>` を使用してレガシーモニター通知を設定する手順は以下のとおりです。

1. Datadog で、[ServiceNow 統合設定][4]ページに移動します。
1. [**設定**] タブ、[**ITOM/ITSM**] タブ、[**モニター**] タブの順に選択します。
1. [**レガシーモニター通知の管理**] の下で、通知を設定するインスタンスを選択し、レガシーモニター通知の書き込み先となるテーブルを選択します。
1. 統合が正しく設定されていることを確認するには、モニターまたはイベントの通知に `@servicenow-<INSTANCE_NAME>` を追加します。ServiceNow がインシデントの優先度を計算できるように、`Impact` と `Urgency` の両方の値を定義できます。送信されたデータは中間テーブルの行に格納され、統合で指定された ServiceNow のテーブルに転送されます。
   {{< img src="integrations/guide/servicenow/servicenow-priority-field-mapping.png" alt="Impact と Urgency の値を定義したレガシーモニターの例" style="width:100%;" >}}
1. ServiceNow の [[transform maps](#transform-maps)] を使用して、中間テーブルに送信されるデータの変換処理をカスタマイズします。
1. 利用可能な Datadog 変数やカスタム文字列を使用して、通知ペイロードをカスタマイズします。

**注**: モニターの説明内の `Impact` と `Urgency` は、レガシーモニターの設定でのみ機能します。テンプレート化されたモニターの場合は、インスタンス優先度マッピングを設定します。ServiceNow インシデントの [`priority`] フィールドは読み取り専用で、[優先度ルックアップルール][8]を使用してのみ更新できます。
{{% /collapse-content %}}

{{% collapse-content title="テンプレート化されたモニターテーブルのフィールドと変換マップ" level="h4" expanded=false id="templated-monitor-table-fields-transform-maps" %}}
`action`
: **タイプ**: String<br>
モニターに対して実行されるアクション:  `create`、`update`、`acknowledge`、または `resolve`

`additional_information`
: **タイプ**: String<br>
**ITOM 変換**: `additional_info`<br>
すべてのイベント詳細を含むフォーマット済み文字列

`aggreg_key`
: **タイプ**: String<br>
アラートを発行したモニターの ID のハッシュを表す集約キー

`alert_cycle_key`
: **タイプ**: String<br>
単一モニターのアラートサイクル (Alert → Warn → Resolve の推移を追跡) のハッシュを表すキー

`alert_id`
: **タイプ**: String<br>
アラートを発行したモニターの ID

`alert_metric`
: **タイプ**: String<br>
**ITOM 変換**: `metric_name`<br>
アラートをトリガーしたメトリクス

`alert_query`
: **タイプ**: String<br>
アラートをトリガーしたクエリ

`alert_scope`
: **タイプ**: String<br>
アラートをトリガーしたスコープ

`alert_status`
: **タイプ**: String<br>
アラートの現在の状態

`alert_title`
: **タイプ**: String<br>
アラートの名前

`alert_transition`
: **タイプ**: String<br>
**ITSM 変換**:  (script) -> state<br>
アラートの遷移状態:  `Triggered`、`Warn`、または`Recovered`

`assignment_group_sys_id`
: **タイプ**: Reference<br>
**ITSM 変換**:  `assignment_group`<br>
**Reference Table**:  グループ<br>
テンプレート化されたハンドルの割り当てグループに対応する ServiceNow sys_id

`business_service_sys_id`
: **タイプ**: Reference<br>
**ITSM 変換**: `business_service`<br>
**Reference Table**: サービス<br>
テンプレート化されたハンドルのビジネスサービスの ServiceNow sys_id

`custom_fields`
: **タイプ**: String<br>
JSON 変換可能な文字列としてフォーマットされた、ユーザー設定のキーと値のフィールド

`datadog_tags`
: **タイプ**: String<br>
アラートを発したモニターの Datadog タグ

`description`
: **タイプ**: String<br>
**ITSM 変換**: `description`<br>
**ITOM 変換**: `description`<br>
モニターアラートの概要説明

`event_details`
: **タイプ**: String<br>
**ITSM 変換**: `work_notes`<br>
Datadog へのクリック可能なリンクを含むフォーマットされたイベント詳細

`event_id`
: **タイプ**: String<br>
イベントの Datadog ID

`event_link`
: **タイプ**: String<br>
モニターアラートから作成されたイベントへのリンク

`event_msg`
: **タイプ**: String<br>
イベントからのメッセージ

`event_title`
: **タイプ**: String<br>
**ITSM 変換**: `short_description`<br>
イベントのタイトル

`event_type`
: **タイプ**: String<br>
**ITOM 変換**: `type`<br>
イベントのタイプ

`hostname`
: **タイプ**: String<br>
**ITSM 変換**: `cmdb_ci`<br>
**ITOM 変換**: `node`<br>
影響を受けるモニターのホスト

`impact`
: **タイプ**: Integer<br>
**ITSM 変換**: `impact`<br>
モニター優先度に関するユーザー定義マッピングに基づく影響値

`logs_sample`
: **タイプ**: String<br>
関連ログのサンプル

`monitor_priority`
: **タイプ**: Integer<br>
**ITOM 変換**: `severity`<br>
アラートモニターの優先度 (整数値)

`org_name`
: **タイプ**: String<br>
アラートモニターの組織名

`sys_created_by`
: **タイプ**: String<br>
**ITSM 変換**: `caller_id`<br>
レコードの作成者 (通常は設定済みの ServiceNow API アカウント)

`ticket_state`
: **タイプ**: String<br>
**ITSM 変換**: `state`、(script) -> close_code、(script) -> close_notes<br>
**ITOM 変換**: (script) -> resolution_notes<br>
ServiceNow レコードの状態: `new` または `resolved`

`u_correlation_id`
: **タイプ**: String<br>
**ITSM 変換**: `correlation_id`<br>
**ITOM 変換**: `message_key`<br>
alert_cycle_key と aggreg_key を組み合わせて、レコードを同一のターゲットインシデントに統合します。

`urgency`
: **タイプ**: Integer<br>
**ITSM 変換**: `urgency`<br>
モニターで定義された優先度に基づき、統合タイル上のユーザー定義マッピングから設定される緊急度

`user_sys_id`
: **タイプ**: Reference<br>
**ITSM 変換**: `assigned_to`<br>
**Reference Table**: ユーザー <br>
ユーザーに対して渡されたテンプレート化されたハンドルからの sys_id

{{% /collapse-content %}}

### Datadog Work Management を設定する{#case-management}

{{% site-region region="gov2" %}}
<div class="alert alert-warning">
Work Management 統合は、サイト内ではサポートされていません {{< region-param key=dd_datacenter code="true" >}} 。
</div>
{{% /site-region %}}

Datadog から ServiceNow の Datadog Cases ITSM テーブルに作業項目を送信します。ServiceNow は受信したレコードを保存し、インストール済みの更新セットを使用してそれらのレコードをインシデントテーブルに変換します。Datadog は、このテーブルに対するカスタムペイロードをサポートしていません。

<div class="alert alert-info">ServiceNow で設定を行うユーザーは、以下の両方の権限を持っている必要があります。 <code>x_datad_datadog.user</code> および <code>admin</code> ロール。</a></div>

1. Datadog で、[ServiceNow 統合設定][4]ページに移動します。
1. [**設定**]タブ、[**ITOM/ITSM**] タブ、[**Work Management**] タブの順に移動します。
1. [**ServiceNow と Work Management を同期する**] で、ServiceNow インスタンスの設定を開きます。
1. Beside [**ケーステーブル**] の横で、作業項目を [**Datadog ケース ITSM**] に送信するよう選択します。**注**: Work Management では ITOM はサポートされていません。
1. [**Work Management > 設定**][5]ページに移動し、プロジェクトを展開します。次に、そのプロジェクトに対して [ServiceNow 統合][6]を設定します。

### Datadog Incident Management を設定する{#incident-management}

Datadog と ServiceNow の統合機能を使用すると、Datadog のインシデントから ServiceNow のインシデントを作成し、両プラットフォーム間で[データを双方向に同期](#sync-bidirectionally)できます。Datadog Incident Management とのこの統合により、可視性が向上し、インシデントの状態、重大度、およびステータスの更新が自動的に双方向で同期され、既存の ServiceNow ワークフローがサポートされます。

統合をインストールした後、Datadog で[統合設定][9]ページに移動します。**ServiceNow** タイルをクリックして、ServiceNow のインシデント作成を設定します。

インシデント管理のためのこの統合のセットアップおよび設定に関するステップバイステップの手順については、「[ServiceNow と Datadog Incident Management の統合][12]」を参照してください。

## ServiceNow と Work Management/Incident Management 間でデータを双方向に同期する{#sync-bidirectionally}

ServiceNow では、Work Management および Incident Management の両方と、状態、影響度、緊急度を双方向に同期できます。

**注**: Datadog の ServiceNow 統合タイルで設定されたユーザー**以外**の、ITIL ロールを持つユーザーによって変更が行われた場合にのみ、データは ServiceNow から Datadog へ同期されます。

1. Datadog で、手順に従って[サービスアカウントのアプリケーションキーを作成][7]します。<br />**注**: Datadog では、個人のキーを使用するのではなく、このキーを作成することを推奨しています。個人のキーを使用すると、そのユーザーのアカウントが無効化されたり、権限が変更されたりした場合に、ServiceNow との同期が中断されるリスクがあります。
1. ServiceNow で、右上隅にある地球アイコンをクリックし、**アプリケーションスコープ**が **ITOM/ITSM Integration for Datadog** に設定されていることを確認します。
1. 左上のナビゲーションメニューで、[**すべて**] をクリックします。
1. フィルターに「**ITOM/ITSM Integration for Datadog**」と入力します。
1. フィルターされた結果から**設定**リンクをクリックし、必要な設定を入力します。
   1. [**Datadog Data Center**] を選択します。
   1. [**Datadog API キー**] を貼り付けます。
   1. 作成した [**サービスアカウントアプリケーションキー**] を貼り付けます。
   1. [**有効**] ボックスにチェックを入れます。
1. [**保存**] をクリックします。
1. (任意) ITOM/ITSM 統合バージョン 2.7.0 以降を使用している場合は、相関アラートからの情報を使用して ServiceNow の値を入力できます。<br />その方法については、以下の「**相関アラートデータの変換**」を参照してください。



## 変換マップでデータをカスタマイズする{#transform-maps}

ServiceNow との統合では、Datadog からの中間テーブルへの書き込みが行われ、そのデータが ServiceNow のレコードへと変換されます。カスタマイズ (例: [カスタムフィールドマッピング](#custom-field-mappings)) を行う場合は、変換マップを拡張して、Datadog から ServiceNow へマッピングするフィールドを指定できます。

## 追加の設定オプション{#additional-configuration-options}

{{% collapse-content title="Datadog インポートホストの自動フラッシュルール" level="h3" expanded=false id="import-host-auto-flush" %}}
インポートテーブル `x_datad_datadog_import_host` に過剰な行が蓄積されるのを防ぐため、Table Cleaner ツールに自動フラッシュルールが追加され、過去 24 時間分のデータのみが保持されるようになりました。この設定は、フィルターナビゲーターで `sys_auto_flush_list.do` に移動し、`x_datad_datadog_import_host` テーブルのルールを開くことで、必要に応じて変更できます。[`Age in seconds`] フィールドを適宜更新してください。
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow でカスタムフィールドマッピングを作成する" level="h3" expanded=false id="custom-field-mappings" %}}
ServiceNow でカスタムフィールドマッピングを作成するには:

1. いずれかのテーブル (例: **Datadog Monitors ITSM Tables**) をクリックし、レコードの一番下までスクロールして、関連付けられた変換マップへのリンクを確認します。
1. 変換マップの名前をクリックして、レコードを表示します。
   {{< img src="integrations/guide/servicenow/servicenow-click-transform-map.png" alt="Datadog インシデントテーブルをインシデントテーブルにマッピングする Datadog インシデント変換を示す ServiceNow のテーブル変換マップ。" style="width:100%;" >}}
   上部には、変換レコードに関する 2 つの重要なフィールドがあります:<code>Source table</code> および <code>Target table</code>:
   {{< img src="integrations/guide/servicenow/servicenow-source-target-fields.png" alt="ServiceNow の Datadog インシデント変換マップ。ソーステーブル「Datadog Incident Table」がターゲットテーブル「Incident [incident]」にマッピングされている" style="width:100%;" >}}
1. [**新規**] をクリックします。
   {{< img src="integrations/guide/servicenow/servicenow-click-new.png" alt="ServiceNow の [Field Maps] タブ。Datadog インシデント変換のソースおよびターゲットフィールドのマッピングが表示されている。ピンク色の矢印は、新しいフィールドマップを追加するために使用する「新規」ボタンを指している。" style="width:100%;" >}}
1. 1 対 1 のマッピングを行うためのソースフィールドとターゲットフィールドを選択します。
   {{< img src="integrations/guide/servicenow/servicenow-select-source-target.png" alt="ServiceNow の Field Map 設定。Datadog インシデント変換マップにおいて、ソースフィールド [PRIORITY] がターゲットフィールド [Severity] にマッピングされている" style="width:100%;" >}}
   または、[<strong>ソーススクリプトを使用する</strong>] チェックボックスをオンにして、変換を定義します。
   {{< img src="integrations/guide/servicenow/servicenow-script-example.png" alt="Datadog インシデント変換における ServiceNow Field Map スクリプトの例。インシデントテーブルの [Priority] フィールドに対し、source.priority の値を数値の重大度レベルにマッピングするソーススクリプトを示している。" style="width:100%;" >}}

統合タイルでカスタムフィールドをマッピングするには、Datadog Monitors ITOM または Datadog Monitors ITSM のいずれかの変換マップに対して、以下のスクリプトを使用できます。この例では、`my_field` というフィールドが統合タイル内でカスタムフィールドとして定義されています。

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

**注**:
- ソースは選択したインポートセットテーブル (この例では Datadog Monitors ITSM Tables) であり、ターゲットはイベントが保存される実際のインシデントテーブル (またはイベントテーブル) です。
- フィールドマッピングはレコードの下部にあります。いくつかの基本的なマッピングが含まれています。ここで、含めるフィールドを選択し、形式を定義し、ServiceNow インスタンス内のターゲットフィールドを選択します。
{{% /collapse-content %}}

{{% collapse-content title="相関アラートデータを変換する" level="h3" expanded=false id="transform-correlated-alert-data" %}}
相関アラートからの情報を使用して ServiceNow の値を設定するには、Datadog Cases ITSM/ITOM テーブル変換マップの下に新しい onBefore 変換スクリプトを追加します。

ServiceNow インシデントにデータを反映させるには、Datadog から送信されて [EM Correlated Alert] 列に保存されたデータをパースし、パースしたデータをインシデントのどのフィールドに送信するかを指定するようにスクリプトを変更する必要があります。以下は、必要に応じてカスタマイズ可能なスクリプトのサンプルです。

```
(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
    // We do not need to process non-correlated-alert events
    if (!source.em_correlated_alert_id) {
        return;
    }

    // Create a GlideRecord for the table
    var gr = new GlideRecord('x_datad_datadog_case_incident_table');
    gr.addQuery('case_id', source.case_id);
    gr.addNotNullQuery('em_correlated_alert_id');
    gr.orderByDesc('sys_created_on');
    gr.query();

    // Ensure we process each alert_id only once
    var seenAlert = {};

    // Add relevant correlated alert fields here
    var alertNames = [];


    // Loop through list of correlated_alerts associated with the same case_id
    while (gr.next()) {
        var emAlertId = gr.getValue('em_correlated_alert_id');

        if (!seenAlert.hasOwnProperty(emAlertId)) {
            seenAlert[emAlertId] = true;
            var changeType = gr.getValue('em_change_type');
            if (changeType == "added") {
                var correlatedAlert = gr.getValue("em_correlated_alert");
                var jsonAlert = JSON.parse(correlatedAlert);

                // Get relevant fields from the JSON event
                var alertName = jsonAlert['alert_message'];
                alertNames.push(alertName);
            }
        }
    }

    // Set the corresponding value on the incident table
    // target.impact = 1;

})(source, map, log, target);
```

{{% /collapse-content %}}

## トラブルシューティング{#troubleshooting}

{{% collapse-content title="Datadog 統合でのエラーメッセージ" level="h3" expanded=false id="troubleshooting-error-messages" %}}
Datadog 統合タイルでエラーメッセージが表示される場合、または「`Error while trying to post to your ServiceNow instance`」という通知が表示される場合:
- インスタンス名を入力する際に、サブドメインのみが使用されたことを確認してください。
- 作成したユーザーに必要な権限があることを確認してください。
- ユーザー名とパスワードが正しいことを確認してください。
{{% /collapse-content %}}

{{% collapse-content title="チケットが作成されない" level="h3" expanded=false id="troubleshooting-no-ticket" %}}
統合が設定され、アラートがトリガーされたにもかかわらず、チケットが作成されない場合:
- 中間テーブルにデータが格納されているか確認してください。データが格納されている場合、問題はマッピングや変換にあります。ServiceNow の[**Transform Errors**] に移動することで、マッピングやスクリプトのデバッグをさらに進めることができます。
- タイルで指定した中間テーブルを使用していることを確認してください。

ServiceNow ユーザーがインポートテーブルにアクセスできるように、`rest_service` および `x_datad_datadog.user` ロールが必要です。通知を直接インシデントテーブルまたはイベントテーブルに送信する従来の方法を使用している場合は、`itil` および`evt_mgmt_integration` の権限が必要です。
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow から Datadog への更新が行われない" level="h3" expanded=false id="troubleshooting-no-updates" %}}
Datadog Work Management から ServiceNow への更新は確認できるものの、ServiceNow から Datadog への更新が反映されない場合、これは ServiceNow ITOM における仕様通りの動作です。Work Management との双方向同期は、ServiceNow ITSM でのみサポートされています。
{{% /collapse-content %}}

{{% collapse-content title="モニターによるインシデントの重複発生" level="h3" expanded=false id="troubleshooting-monitors-duplicating-incidents" %}}
警告のたびに新しいインシデントを作成するのではなく、同じインシデントが再オープンされてしまう場合は、そのモニターがシンプルアラートとして設定されていないか確認してください。メトリクス内のタグを使用してグループ化し、モニターを[マルチアラート][11]に変換してください。そうすることで、各アラートが個別のインシデントをトリガーするようになります。
{{% /collapse-content %}}

さらにサポートが必要ですか。[Datadog サポート][10]にお問い合わせください。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[2]: /ja/resources/xml/Datadog-Snow_Update_Set_v2.7.9.xml
[3]: /ja/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[4]: https://app.datadoghq.com/integrations?integrationId=servicenow
[5]: https://app.datadoghq.com/work/settings
[6]: /ja/incident_response/work_management/notifications_integrations/#servicenow
[7]: /ja/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[8]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
[9]: https://app.datadoghq.com/incidents/settings?section=integrations
[10]: /ja/help/
[11]: /ja/monitors/configuration/?tab=thresholdalert#multi-alert
[12]: /ja/incident_response/incident_management/integrations/servicenow