---
further_reading:
- link: /integrations/servicenow/
  tag: ドキュメント
  text: ServiceNow インテグレーション
title: ServiceNow ITOM および ITSM のセットアップ
---
ServiceNow の ITOM/ITSM インテグレーションを使用すると、Datadog で生成されたアラート、作業項目、およびインシデントを、Incident または Event テーブルのレコードとして ServiceNow に送信することができます。このインテグレーションは、中間テーブルと変換マップに依存しています。

インテグレーションを使用するには、手順に従ってインストールし、各製品向けに構成してください。
1. [ServiceNow タイルを構成する](#tile)
1. [ITOM/ITSM インテグレーションをインストールする](#install)
1. インテグレーションを構成する
   1. [Datadog のテンプレート化されたモニター通知を構成する](#monitor-notifications)
   1. [Datadog Work Management を構成する](#case-management)
   1. [Datadog Incident Management を構成する](#incident-management)
1. [変換マップを使用してデータをカスタマイズする](#transform-maps)

## ServiceNow タイルを構成する {#tile}

インテグレーションをインストールする前に、Datadog で ServiceNow インスタンスを使用して [ServiceNow タイルが構成されている][3]ことを確認してください。

## ITOM/ITSM インテグレーションをインストールする {#install}

インテグレーションをインストールするには、次の 2 つの方法があります。
- Datadog では、ServiceNow ストアから [ITOM/ITSM Integration for Datadog][1] インテグレーションの最新バージョンをインストールすることを推奨しています。
- または、最新の更新セット ([Datadog-Snow_Update_Set_v2.8.0.xml][2]) をダウンロードし、ServiceNow インスタンスに手動でアップロードすることもできます。

## インテグレーションを構成する{#configure-the-integration}

### テンプレート化されたモニター通知を構成する {#monitor-notifications}

<div class="alert alert-info">これらの機能には、ITOM/ITSM インテグレーションのバージョン 2.6.0 以降が必要です。</a></div>

#### インスタンス優先度マッピングを構成する{#configure-instance-priority-mapping}

デフォルトでは、Datadog がイベントを ServiceNow に送信する際、ServiceNow の影響度および緊急度レベルは含まれません。ServiceNow の各設定で、それらの ServiceNow レベルと Datadog のモニター優先度レベルのマッピングを構成し、Datadog で生成されるイベントに含めることができます。

1. Datadog で、[ServiceNow インテグレーション設定][4]ページに移動します。
1. [**Configure**] (構成) タブに移動し、[**ITOM/ITSM**] タブ、[**Monitors**] (モニター) タブの順に選択します。
1. [**Instance Priority Mapping for Templates**] (テンプレートのインスタンス優先度マッピング) で、ServiceNow インスタンスの設定を開きます。
1. [**Use Instance Priority Mapping**] (インスタンス優先度マッピングを使用) トグルをオンにします。
1. [**ServiceNow Urgency**] (ServiceNow 緊急度) および [**ServiceNow Impact**] (ServiceNow 影響度) で、Datadog のモニター優先度レベルに対応させるレベルを選択します。例:
   - 影響度: 4
   - 緊急度: 5
1. [**Update**] (更新) をクリックします。

#### モニター通知用のカスタム ServiceNow @-handle を作成する{#create-a-custom-servicenow-handle-for-monitor-notifications}

モニターから ServiceNow レコードを作成するには、モニターの通知ルールまたは通知受信者内で使用する @-handle を構成する必要があります。

1. Datadog で、[ServiceNow インテグレーション設定][4]ページに移動します。
1. [**Configure**] (構成) タブに移動し、[**ITOM/ITSM**] タブ、[**Monitors**] (モニター) タブの順に選択します。
1. [**Templates**] (テンプレート) の横にある [**+ New**] (新規作成) をクリックして、新しいテンプレートを作成します。
1. @-handle の [**Name**] (名前)、[**Instance**] (インスタンス)、およびモニター通知の送信先となる [**Target Table**] (ターゲットテーブル) を定義します。
1. (オプション) テンプレートで [**Assignment Group**] (割り当てグループ)、[**Business Service**] (ビジネスサービス)、[**User**] (ユーザー) を設定します。<br />**注**: 割り当てグループとユーザーの両方を設定する場合、ServiceNow レコードの作成を正常に完了させるには、そのユーザーが選択した割り当てグループに属している必要があります。
1. (オプション) [**Customize notification payload**] (通知ペイロードのカスタマイズ) セクションを展開し、[**Add field**] (フィールドの追加) をクリックして、Datadog からの変数を追加します。
1. [**Save**] (保存) をクリックします。

新しいテンプレートを使用するには、モニターの説明に `@servicenow-<TEMPLATE_NAME>` を追加します。モニターがアラートを発すると、ServiceNow も対応するレコードを作成し、元のアラートが復旧すると自動的に **Resolved** (解決済み) に設定されます。

{{% collapse-content title="レガシーモニター通知を構成する" level="h4" expanded=false id="configure-legacy-monitor-notifications" %}}
`@servicenow-<INSTANCE_NAME>` を使用してレガシーモニター通知を構成するには、次のようにします。

1. Datadog で、[ServiceNow インテグレーション設定][4]ページに移動します。
1. [**Configure**] (構成) タブに移動し、[**ITOM/ITSM**] タブ、[**Monitors**] (モニター) タブの順に選択します。
1. [**Manage Legacy Monitor Notifications**] (レガシーモニター通知の管理) で、通知を構成するインスタンスを選択し、レガシーモニター通知が書き込まれるテーブルを選択します。
1. インテグレーションが正しく設定されていることを検証するには、モニターまたはイベントの通知に `@servicenow-<INSTANCE_NAME>` を追加します。`Impact` と `Urgency` の両方の値を定義すると、ServiceNow はそれらの値を使用してインシデントの優先度を計算できます。生データは中間テーブルの行に入力され、インテグレーションで指定した ServiceNow のテーブルに転送されます。
   {{< img src="integrations/guide/servicenow/servicenow-priority-field-mapping.png" alt="定義された影響度と緊急度の値を持つレガシーモニターの例" style="width:100%;" >}}
1. ServiceNow 内で[変換マップ](#transform-maps)を使用して、中間テーブルに送信されるデータの変換をカスタマイズします。
1. 利用可能な Datadog 変数またはカスタム文字列を使用して、通知ペイロードをカスタマイズします。

**注**: モニターの説明で `Impact` および `Urgency` を使用できるのは、レガシーモニター構成の場合のみです。テンプレート化されたモニターでは、インスタンスの優先度マッピングを構成します。ServiceNow インシデントの `priority` フィールドは読み取り専用で、[優先度ルックアップ規則][8]を使用してのみ更新することができます。
{{% /collapse-content %}}

{{% collapse-content title="テンプレート化されたモニターのテーブルフィールドおよび変換マップ" level="h4" expanded=false id="templated-monitor-table-fields-transform-maps" %}}
`action`
: **型**: 文字列<br>
モニターに対して実行されるアクション: `create`、`update`、`acknowledge`、または `resolve`

`additional_information`
: **型**: 文字列<br>
**ITOM Transform**: `additional_info`<br>
すべてのイベント詳細を含むフォーマット済み文字列

`aggreg_key`
: **型**: 文字列<br>
アラートを発生させたモニターの ID のハッシュを表す集約キー

`alert_cycle_key`
: **型**: 文字列<br>
単一モニターのアラートサイクルのハッシュを表すキー (アラート → 警告 → 解決を追跡)

`alert_id`
: **型**: 文字列<br>
アラートを発生させたモニターの ID

`alert_metric`
: **型**: 文字列<br>
**ITOM Transform**: `metric_name`<br>
アラートをトリガーしたメトリクス

`alert_query`
: **型**: 文字列<br>
アラートをトリガーしたクエリ

`alert_scope`
: **型**: 文字列<br>
アラートをトリガーしたスコープ

`alert_status`
: **型**: 文字列<br>
アラートの現在の状態

`alert_title`
: **型**: 文字列<br>
アラートの名前

`alert_transition`
: **型**: 文字列<br>
**ITSM Transform**: (script) -> state<br>
アラートの遷移状態: `Triggered`、`Warn`、または`Recovered`

`assignment_group_sys_id`
: **型**: 参照<br>
**ITSM Transform**: `assignment_group`<br>
**Reference Table**: Group<br>
テンプレート化されたハンドルの割り当てグループに対応する ServiceNow の sys_id

`business_service_sys_id`
: **型**: 参照<br>
**ITSM Transform**: `business_service`<br>
**Reference Table**: Service<br>
テンプレート化されたハンドルのビジネスサービスに対応する ServiceNow の sys_id

`custom_fields`
: **型**: 文字列<br>
JSON に変換可能な文字列としてフォーマットされた、ユーザー設定のキーと値のフィールド

`datadog_tags`
: **型**: 文字列<br>
アラートを発生させたモニターからの Datadog タグ

`description`
: **型**: 文字列<br>
**ITSM Transform**: `description`<br>
**ITOM Transform**: `description`<br>
モニターが発したアラートの概要説明

`event_details`
: **型**: 文字列<br>
**ITSM Transform**: `work_notes`<br>
Datadog へのクリック可能なリンクを含む、フォーマット済みのイベント詳細

`event_id`
: **型**: 文字列<br>
イベントの Datadog ID

`event_link`
: **型**: 文字列<br>
モニターアラートから作成されたイベントへのリンク

`event_msg`
: **型**: 文字列<br>
イベントからのメッセージ

`event_title`
: **型**: 文字列<br>
**ITSM Transform**: `short_description`<br>
イベントのタイトル

`event_type`
: **型**: 文字列<br>
**ITOM Transform**: `type`<br>
イベントのタイプ

`hostname`
: **型**: 文字列<br>
**ITSM Transform**: `cmdb_ci`<br>
**ITOM Transform**: `node`<br>
影響を受けたモニターのホスト

`impact`
: **型**: 整数<br>
**ITSM Transform**: `impact`<br>
ユーザーが定義したモニター優先度のマッピングに基づく影響度の値

`logs_sample`
: **型**: 文字列<br>
関連ログのサンプル

`monitor_priority`
: **型**: 整数<br>
**ITOM Transform**: `severity`<br>
アラートを発生させたモニターの優先度 (整数)

`org_name`
: **型**: 文字列<br>
アラートを発生させたモニターの組織名

`sys_created_by`
: **型**: 文字列<br>
**ITSM Transform**: `caller_id`<br>
レコードの作成者 (通常は設定された ServiceNow API アカウント)

`ticket_state`
: **型**: 文字列<br>
**ITSM Transform**: `state`、(script) -> close_code、(script) -> close_notes<br>
**ITOM Transform**: (script) -> resolution_notes<br>
ServiceNow レコードの状態: `new` または `resolved`

`u_correlation_id`
: **型**: 文字列<br>
**ITSM Transform**: `correlation_id`<br>
**ITOM Transform**: `message_key`<br>
レコードを同じターゲットインシデントに統合するために使用される、alert_cycle_key と aggreg_key の組み合わせ

`urgency`
: **型**: 整数<br>
**ITSM Transform**: `urgency`<br>
モニターに定義された優先度に基づき、インテグレーションタイルでユーザーが定義したマッピングから設定される緊急度

`user_sys_id`
: **型**: 参照<br>
**ITSM Transform**: `assigned_to`<br>
**Reference Table**: User <br>
ユーザー用に渡されたテンプレート化されたハンドルの sys_id。

{{% /collapse-content %}}

### Datadog Work Management を構成する {#case-management}

{{% site-region region="gov2" %}}
<div class="alert alert-warning">
Work Management インテグレーションは、 {{< region-param key=dd_datacenter code="true" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

Datadog から ServiceNow の Datadog Cases ITSM テーブルに作業項目を送信します。ServiceNow は受信したレコードを保存し、インストールされた更新セットを使用してインシデントテーブルのレコードに変換します。Datadog は、このテーブルのカスタムペイロードをサポートしていません。

<div class="alert alert-info">ServiceNow で設定を行うユーザーは、 <code>x_datad_datadog.user</code> と <code>admin</code> の両方のロールを持っている必要があります。</a></div>

1. Datadog で、[ServiceNow インテグレーション設定][4]ページに移動します。
1. [**Configure**] (構成) タブに移動し、[**ITOM/ITSM**] タブ、[**Work Management**] タブの順に選択します。
1. [**Sync ServiceNow with Work Management**] (Work Management と ServiceNow を同期) の下で、ServiceNow インスタンスの設定を開きます。
1. [**Case Table**] (ケーステーブル) の横で、作業項目を **Datadog Cases ITSM** に送信するように選択します。**注**: ITOM は Work Management ではサポートされていません。
1. [**[Work Management] > [Settings] (設定)**][5] ページに移動し、プロジェクトを展開します。次に、そのプロジェクトの [ServiceNow インテグレーションをセットアップ][6]します。

### Datadog Incident Managementを構成する {#incident-management}

Datadog ServiceNow インテグレーションを使用すると、Datadog のインシデントから ServiceNow でインシデントを作成し、2 つのプラットフォーム間で[データを双方向に同期](#sync-bidirectionally)できます。Datadog Incident Management とのこのインテグレーションにより、可視性が向上し、インシデントの状態、重大度、およびステータスの更新を自動的に双方向で同期でき、既存の ServiceNow ワークフローを利用できます。

インテグレーションをインストールした後、Datadog の[インテグレーション設定][9]ページに移動します。**ServiceNow** タイルをクリックして、ServiceNow のインシデント作成を設定します。

このインテグレーションを Incident Management 用にセットアップおよび構成する手順については、[ServiceNow と Datadog Incident Management のインテグレーション][12]を参照してください。

## ServiceNow と Work/Incident Management 間でデータを双方向に同期する {#sync-bidirectionally}

ServiceNow では、Work/Incident Management の両方で、状態、影響度、緊急度を双方向に同期できます。

**注**: データが ServiceNow から Datadog に同期されるのは、ITIL ロールを持ち、Datadog の ServiceNow インテグレーションタイルで設定されたユーザーとは**異なる**ユーザーが変更を行った場合のみです。

1. Datadog で、[サービスアカウントアプリケーションキーを作成][7]する手順に従います。<br />**注**: Datadog では、個人のキーを使用するのではなく、このキーを作成することを推奨しています。個人のキーを使用すると、ユーザーのアカウントが無効化されたり権限が変更されたりした場合に ServiceNow の同期が機能しなくなるリスクがあります。
1. ServiceNow で右上隅にある地球アイコンをクリックし、**アプリケーションスコープ**が **ITOM/ITSM Integration for Datadog** に設定されていることを確認します。
1. 左上のナビゲーションメニューで、[**All**] (すべて) をクリックします。
1. フィルターに「**ITOM/ITSM Integration for Datadog**」と入力します。
1. 絞り込まれた結果から [**Configuration**] (構成) リンクをクリックし、必要な設定を入力します。
   1. [**Datadog Data Center**] (Datadog データセンター) を選択します。
   1. **Datadog API キー**を貼り付けます。
   1. 作成した**サービスアカウントのアプリケーションキー**を貼り付けます。
   1. [**Enabled**] (有効) ボックスにチェックを入れます。
1. [**Save**] (保存) をクリックします。
1. (オプション) ITOM/ITSM インテグレーションのバージョン 2.7.0 以降を使用している場合、関連付けられたアラートの情報を使用して ServiceNow の値を入力できます。<br />その方法については、下記にある「**関連付けられたアラートデータを変換する**」を参照してください。



## 変換マップを使用してデータをカスタマイズする {#transform-maps}

ServiceNow インテグレーションは、Datadog から中間テーブルにデータを書き込み、それを ServiceNow のレコードに変換します。カスタマイズ (例: [カスタムフィールドのマッピング](#custom-field-mappings)) を行う場合は、変換マップを拡張して、Datadog から ServiceNow にマッピングするフィールドを指定できます。

## 追加の構成オプション {#additional-configuration-options}

{{% collapse-content title="Datadog インポートホストの AutoFlush ルール" level="h3" expanded=false id="import-host-auto-flush" %}}
import set テーブル `x_datad_datadog_import_host` に行が蓄積されすぎるのを防ぐため、Table Cleaner ツールに自動フラッシュルールが追加され、過去 24 時間分のデータのみが保持されるようになっています。この設定は必要に応じて変更できます。フィルターナビゲーターで `sys_auto_flush_list.do` に移動し、`x_datad_datadog_import_host` テーブルのルールにアクセスします。`Age in seconds` フィールドを適宜更新できます。
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow でカスタムフィールドのマッピングを作成する" level="h3" expanded=false id="custom-field-mappings" %}}
ServiceNow でカスタムフィールドのマッピングを作成するには、次のようにします。

1. テーブルの 1 つ (たとえば **Datadog Monitors ITSM Tables**) をクリックし、レコードの一番下までスクロールすると、関連付けられている変換マップへのリンクが表示されます。
1. 変換マップ名をクリックすると、レコードを確認できます。
   {{< img src="integrations/guide/servicenow/servicenow-click-transform-map.png" alt="Datadog Incident Table を Incident テーブルにマッピングする Datadog Incident Transform が表示された、ServiceNow のテーブル変換マップ。" style="width:100%;" >}}
   上部には、<code>Source table</code> と <code>Target table</code>という、Transform レコードに関する 2 つの重要なフィールドがあります。
   {{< img src="integrations/guide/servicenow/servicenow-source-target-fields.png" alt="ServiceNow の Datadog Incident Transform マップ。ソーステーブル Datadog Incident Table がターゲットテーブル Incident [incident] にマッピングされています。" style="width:100%;" >}}
1. [**New**] (新規作成) をクリックします。
   {{< img src="integrations/guide/servicenow/servicenow-click-new.png" alt="Datadog Incident Transform のソースフィールドとターゲットフィールドのマッピングを示す、ServiceNow の [Field Maps] (フィールドのマップ) タブ。ピンク色の矢印は、新しいフィールドマップを追加するために使用する [New] ボタンを指しています。" style="width:100%;" >}}
1. 1 対 1 のマッピングを行うソースフィールドとターゲットフィールドを選択します。
   {{< img src="integrations/guide/servicenow/servicenow-select-source-target.png" alt="ServiceNow の [Field Map] 設定。Datadog Incident Transform マップで、ソースフィールド「PRIORITY」がターゲットフィールド「Severity」にマッピングされています。" style="width:100%;" >}}
   または、[<strong>Use source script</strong>] (ソーススクリプトを使用する) チェックボックスをオンにして、変換を定義します。
   {{< img src="integrations/guide/servicenow/servicenow-script-example.png" alt="Datadog Incident Transform の ServiceNow Field Map スクリプト。source.priority 値を Incident テーブルの Priority フィールドの数値の重大度レベルにマッピングするソーススクリプトが表示されています。" style="width:100%;" >}}

インテグレーションタイルでカスタムフィールドをマッピングするには、Datadog Monitors ITOM および Datadog Monitors ITSM のいずれかの変換マップで次のスクリプトを使用できます。この例では、フィールド `my_field` はインテグレーションタイルのカスタムフィールドとして定義されています。

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

**注**:
- ソースは、選択したインポートセットテーブル (ここでは、Datadog Monitors ITSM Tables)、ターゲットは、イベントが保存される実際のインシデントテーブル (またはイベントテーブル) です。
- フィールドマッピングはレコードの下部にあります。いくつかの基本的なマッピングが含まれています。ここで、含めるフィールドを選択し、形式を定義し、ServiceNow インスタンスのターゲットフィールドを選択します。
{{% /collapse-content %}}

{{% collapse-content title="関連付けられたアラートデータを変換する" level="h3" expanded=false id="transform-correlated-alert-data" %}}
関連付けられたアラートの情報を使用して ServiceNow の値を設定するには、Datadog Cases ITSM/ITOM のテーブル変換マップの下に、新しい onBefore 変換スクリプトを追加します。

ServiceNow インシデントにデータを入力するには、Datadog から送信されて [EM Correlated Alert] (EM 相関アラート) 列に保存されたデータを解析するようにスクリプトを変更し、解析したデータをインシデントのどのフィールドに送信するかを指定する必要があります。以下は、ニーズに合わせてカスタマイズできるサンプルスクリプトです。

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

## トラブルシューティング {#troubleshooting}

{{% collapse-content title="Datadog インテグレーションのエラーメッセージ" level="h3" expanded=false id="troubleshooting-error-messages" %}}
Datadog インテグレーションタイルにエラーメッセージが表示される場合、または `Error while trying to post to your ServiceNow instance` 通知が表示される場合:
- インスタンス名の入力時に、サブドメインのみを使用したかを確認します。
- 作成したユーザーが必要なアクセス許可を持っているかを確認します。
- ユーザー名とパスワードが正しいかどうかを確認します。
{{% /collapse-content %}}

{{% collapse-content title="チケットが作成されない" level="h3" expanded=false id="troubleshooting-no-ticket" %}}
インテグレーションが構成され、アラートがトリガーされたにもかかわらず、チケットが作成されない場合:
- 中間テーブルにデータが入力されていることを確認します。入力されている場合は、マッピングと変換に問題があります。ServiceNow で [**Transform Errors**] (変換エラー) に移動すると、マッピングとスクリプトをさらにデバッグできます。
- タイルで指定した中間テーブルを使用していることを確認します。

ServiceNow ユーザーがインポートテーブルにアクセスできるようにするには、`rest_service` ロールと `x_datad_datadog.user` ロールが必要です。レガシー方式で Incident テーブルまたは Event テーブルのいずれかに直接通知を送信している場合は、`itil` および `evt_mgmt_integration` の権限が必要です。
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow から Datadog への更新がない" level="h3" expanded=false id="troubleshooting-no-updates" %}}
Datadog Work Management から ServiceNow への更新は確認できるものの、ServiceNow から Datadog への更新が確認できない場合、これは ServiceNow ITOM の想定される動作です。Work Management との双方向同期は、ServiceNow ITSM でのみサポートされています。
{{% /collapse-content %}}

{{% collapse-content title="モニターがインシデントを重複して作成する" level="h3" expanded=false id="troubleshooting-monitors-duplicating-incidents" %}}
モニターが警告ごとに新しいインシデントを作成するのではなく、同じインシデントを再オープンしている場合は、それがシンプルアラートとして設定されていないことを確認してください。メトリクス内のタグを使用してグループ化し、モニターを [multi-alert][11] に変換します。このようにすると、各アラートが個別のインシデントをトリガーするようになります。
{{% /collapse-content %}}

さらにサポートが必要な場合は、[Datadog サポート][10]にお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[2]: /ja/resources/xml/Datadog-Snow_Update_Set_v2.8.0.xml
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