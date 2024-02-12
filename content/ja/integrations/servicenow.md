---
categories:
- alerting
- incidents
- issue tracking
- notification
dependencies: []
description: Datadog アラートからチケットを自動的に生成および更新
doc_link: https://docs.datadoghq.com/integrations/servicenow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/
  tag: ブログ
  text: Datadog アラートからの ServiceNow チケットの作成
git_integration_title: servicenow
has_logo: true
integration_id: ''
integration_title: ServiceNow
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: servicenow
public_title: Datadog-ServiceNow インテグレーション
short_description: Datadog アラートからチケットを自動的に生成および更新
team: web-integrations
version: '1.0'
---

## 概要

ServiceNow は、企業のエンタープライズレベルの IT プロセスを 1 か所で記録、追跡、管理するための IT サービス管理プラットフォームです。

Datadog ServiceNow インテグレーションは双方向インテグレーションです。これを使用すると、以下のことが可能です。

1. ServiceNow で、豊富なコンテキスト情報を含むインシデントやイベントを Datadog アラートから作成できます。
1. Datadog から、[Datadog 対応サービスグラフコネクタ][1]を使用して、新しく検出されたホストのサーバー構成アイテム (CI) を CMDB に作成できます。

Datadog は、以下の ServiceNow ツールと統合されます。

- ITOM
- ITSM
- CMDB

## CMDB のセットアップ

### Datadog 用サービスグラフコネクタ

[Datadog 用サービスグラフコネクタ][1]により、Datadog によって検出された新しいリソースの CMDB に、サーバーとデータベースの構成アイテム (CI) が自動的に入力されます。サービスグラフコネクタは ServiceNow [ストア][2]から入手可能です。

コンフィギュレーションについては、サービスグラフコネクタのガイドに記載されたセットアップ手順に従ってください。

サポートされる CI の種類
* サーバー
* Amazon RDS

下記の記述は、すでに ServiceNow ITOM/ITSM インテグレーションを構成済みの場合のみ適用されます。

* サービスグラフコネクタでは、コンフィギュレーションタイルの `Target table` 値と `Custom table` 値を使用しません。Target テーブルのデフォルト値とのインテグレーションを保存できます。
* サービスグラフコネクタのセットアップ手順に記載されているように、ユーザーに cmdb_import_api_admin ロールを付与することで、同じ ITOM/ITSM ユーザーをサービスグラフコネクタで使用できます。

### ホストのタグ付け

ホストのタグ付けにより、ServiceNow CMDB のメタデータで Datadog ホストをリッチ化します。

ホストタグの取り込みを有効にするには
1. ServiceNow インスタンスで、Datadog でタグ付けしたいすべてのホストを返す Query Builder クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーションタイルに移動します。**Host Tagging** タブを選択します。
1. **Query Configuration** の下にある、**Add New Row** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. クエリの root CI のホスト名フィールドを Datadog のホスト名フィールドにマッピングする **Hostname Column** の値を選択します。
1. **Column Name Maps** で任意のフィールド名の再マッピングを選択します。
1. Save をクリックします。

クエリのスケジュール実行後すぐにホストタグが Datadog に入力されます。

{{< img src="integrations/servicenow/host-tags.jpg" alt="ServiceNow のホストタグを表示するホスト情報タブのスクリーンショット" >}}

Datadog の[イベントエクスプローラー][3]で、検索クエリを `source:servicenow` にスコープして、取り込みプロセスを監視します。

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="取り込み実行中のスクリーンショット" >}}

#### トラブルシューティング

ホストのタグ付けが正しく機能するためには、以下のことがシステムで正しいことを確認してください。

- Query Builder クエリを作成・実行するユーザが、Datadog 構成のユーザ名と一致している。ServiceNow のユーザーは `cmdb_query_builder_read` というロールを持っている必要があります。
- クエリが返す結果の数は、ServiceNow の `glide.cmdb.query.max_results_limit` 設定以下でなければなりません。デフォルトでは、結果の最大数は 10000 です。設定を変更するには、**Configuration** -> **CMDB Properties** -> **Query Builder Properties** に移動します。
- Query Builder クエリで構成されるすべての CI には **1** ラベルが必要です。これにより、パーサーがサポートしない重複した CI を作成していないことを確認できます。

#### 制限
- 取り込みは 1 回の実行につき 100k ホストに制限されています。
- ホストへの更新は 1 時間あたり数千件に制限されます。スケジュール間隔を選択する際にはこの制限を考慮してください。
- Datadog のホストエイリアスは大文字と小文字を区別するため、小文字のホスト名を持つ Linux マシンではタグ付けが機能しません。

### サービスの取り込み

サービスの取り込みにより、ServiceNow CMDB メタデータで Datadog サービスカタログをリッチ化します。

サービス取り込みを使用すると、ServiceNow CMDB から Datadog [サービスカタログ][4]にサービスを取り込むことができます。

#### セットアップ

サービスデータの取り込みを有効にするには
1. ServiceNow インスタンスで、サービスカタログをリッチ化したいすべてのサービスを返す [Query Builder][5] クエリを構成します。
1. 希望の更新間隔でクエリを実行するようにスケジュールします。
1. クエリを ServiceNow に保存したら、Datadog の ServiceNow インテグレーションタイルに移動します。**Service Ingestion** タブを選択します。
1. **Query Configuration** の下にある、**Add New Row** ボタンをクリックします。
1. ドロップダウンメニューから、**ServiceNow Instance** と **Query** を選択します。
1. **Service Name Column** ドロップダウンメニューから値を選択します。この値は、クエリのルートサービス CI 上の列名と一致し、サービスカタログのサービス名を入力します。
1. スキーママッピングを構成して、サービスに関する追加のメタデータをサービスカタログに取り込みます。詳細は[サービス定義][6]を参照してください。Datadog が取り込みを受け入れるためには、マッピングの各フィールドが、サービスカタログのサービス定義スキーマにマッピングされる正しいタイプである必要があります。
1. **保存**をクリックします。

Datadog にサービスデータが反映されるのは、クエリのスケジュール実行の数分後です。取り込みエラーを表示するには、[イベントエクスプローラー][3]で `source:servicenow` でイベントを検索します。

{{< img src="integrations/servicenow/service-metadata.jpg" alt="ServiceNow から入力されたメタデータを示す Service Configuration パネルのスクリーンショット" >}}

#### トラブルシューティング

サービスの取り込みが正しく機能するためには、以下のことがシステムで正しいことを確認してください。

- クエリビルダーのクエリを作成・実行するユーザが、Datadog 構成のユーザ名と一致している。ServiceNow のユーザーは `cmdb_query_builder_read` というロールを持っている必要があります。
- クエリが返す結果の数は、ServiceNow の `glide.cmdb.query.max_results_limit` 設定以下でなければなりません。デフォルトでは、結果の最大数は 10000 です。設定を変更するには、**Configuration** -> **CMDB Properties** -> **Query Builder Properties** に移動します。
- Query Builder クエリで構成されるすべての CI には **1** ラベルが必要です。これにより、パーサーがサポートしない重複した CI を作成していないことを確認できます。

## ITOM と ITSM のセットアップ

モジュールを使用するには、まず、ServiceNow インスタンスに最新の [Datadog 更新セット][7]をインストールし、Datadog で ServiceNow インテグレーションタイルを構成します。

1. [最新の Datadog Update Set のインストール](#install-the-datadog-update-set)
1. [Datadog アカウントのアクセス許可の設定](#permissions)
1. [ITOM と ITSM での使用手順](#configuring-datadog-for-use-with-itom-and-itsm-modules)

### Datadog Update Set のインストール

ServiceNow で以下を実行します。

1. **Update Set** を検索し、左側のメニューで **Retrieved Update Sets** を探します。
2. 提供された [`Datadog-SNow_Update_Set_vX.X.X.xml`][7] ファイルを手動でインポートします。
3. XML ファイルをアップロードすると、Update Set の状態が `Loaded` と表示されます。更新セットの名前をクリックして、コードをプレビューし、システムへコミットします。
4. Update Set をプレビューしてエラーがないことを確認します。その後、**Commit Update Set** を選択してアプリケーションをお使いのシステムにマージします。

設定完了後、ナビゲーションメニューで **Datadog** を検索すると、テーブルが表示されます。

### 権限

インポートテーブルにアクセスして変換マップを適用するには、ServiceNow ユーザーに次のアクセス許可が必要です。

- `x_datad_datadog.user`
- `import_set_loader`
- `import_transformer`

**Incident** テーブルまたは **Event** テーブルに直接通知を送信する場合は、`ITIL` および `evt_mgmt_integration` ロールが必要です。

### ITOM および ITSM モジュールで使用するために Datadog を構成する

Datadog で `@servicenow-<INSTANCE_NAME>` を使用する通知は、ServiceNow タイルで選択された中間テーブルに入力されます。以下の手順は、Datadog インテグレーションページで ServiceNow タイルを既にセットアップしていることを前提としています。それが完了したら、以下を行います。

1. ドロップダウンから、ドロップダウンから通知を送信する中間テーブルを選択します。
1. インテグレーションが正しくセットアップされているかを検証するには、モニターまたはイベント通知に `@servicenow-<INSTANCE_NAME>` を追加します。未加工のデータが中間テーブルの行に挿入され、作成したマッピングと変換で指定されている ServiceNow テーブルに転送されます。
1. [変換マップを使用](#customize-data-with-transform-maps)して、テーブルに送信されるデータのフォーマットをカスタマイズします。
1. [Datadog での ServiceNow インテグレーションタイルの構成](#configure-the-servicenow-tile-in-datadog-for-itomitsm)

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="servicenow インテグレーション" >}}

### ITOM/ITSM 対応 Datadog で ServiceNow タイルを構成する

1. Datadog で Integrations ページの [ServiceNow インテグレーションタイル][8]に移動します。
1. `Add New Instance` をクリックします。
1. ServiceNow ドメインのサブドメインであるインスタンス名、`<インスタンス>.service-now.com` を追加します。
1. ServiceNow インスタンスのユーザー名とパスワードを追加します。

**注**: Datadog のためだけに ServiceNow で制限ユーザーを作成できます。

{{< img src="integrations/servicenow/servicenow-configuration-new-instance.png" alt="servicenow インテグレーション新規インスタンス" >}}

### 変換マップを使用してデータをカスタマイズする

**Datadog Incident** および **Datadog Event** テーブルは、変換マップを使用して、Datadog イベントを ServiceNow の対応するインシデントおよびイベントに変換します。

## トラブルシューティング

ServiceNow のテーブルにイベントが表示されず、代わりに

- Datadog インテグレーションタイルにエラーメッセージが表示される、または `Error while trying to post to your ServiceNow instance` 通知を受け取った場合

  - インスタンス名を入力したときに、サブドメインのみを使用したかを確認します。
  - 作成したユーザーが必要なアクセス許可を持っているかを確認します。
  - ユーザー名とパスワードが正しいことを確認します。

- インテグレーションが構成され、アラートがトリガーされているが、チケットが作成されない場合

  - 中間テーブルにデータが挿入されるかを確認します。データが挿入される場合、問題はマッピングと変換にあります。ServiceNow の **Transform Errors** に移動し、マッピングとスクリプトをさらにデバッグします。
  - タイルで指定した中間テーブルを使用していることを確認します。

  ServiceNow ユーザーは、インポートテーブルにアクセスできるように、`rest_service` および `x_datad_datadog.user` ロールが必要です。インシデントテーブルまたはイベントテーブルのいずれかに直接通知を送信する従来の方法を使用している場合は、`itil` および `evt_mgmt_integration` のアクセス許可が必要です。

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

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

ServiceNow インシデントの `priority` フィールドは読み取り専用で、[優先度ルックアップ規則][10]を使用してのみ更新することができます。

ServiceNow のインシデント優先度を計算するために、モニターで `Impact` と `Urgency` を定義します。

{{< img src="integrations/servicenow/servicenow-priority-field-mapping.png" alt="ServiceNow 優先度フィールドマッピング" >}}

### サポート解決ワークフローの自動化

モニターステータスが正常に戻ると、関連付けられているサポートチケットが自動的に「resolved」としてマークされます。

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow 解決済み" >}}

### カスタムマッピングの定義

テーブルの 1 つ、例えば **Datadog Incident Tables** をクリックし、レコードの一番下までスクロールすると、関連付けられている変換マップへのリンクが表示されます。

### マッピングの確認

変換マップ名をクリックすると、レコードを確認できます。

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="servicenow インテグレーション" >}}

上部には、変換レコードに関する 2 つの重要なフィールド、`Source table` と `Target table` があります。

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="servicenow インテグレーション" >}}

**注**:

- ソースは、選択したインポートセットテーブル (ここでは、Datadog Incident Tables)、ターゲットは、イベントが格納される実際のインシデントテーブル (またはイベントテーブル) です。
- フィールドマッピングは、レコードの下部にあります。いくつかの基本的なマッピングが含まれています。ここで、含めるフィールドを選択したり、形式を定義したり、ServiceNow インスタンス内のターゲットフィールドを選択したりします。

### 新しいフィールドマッピングの追加

**New** をクリックします。

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="servicenow インテグレーション" >}}

1 対 1 マッピングのソースフィールドとターゲットフィールドを選択します。

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="servicenow インテグレーション" >}}

または、**Use source script** チェックボックスをオンにして、変換を定義します。

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="servicenow インテグレーション" >}}

**注:** インテグレーションタイルのカスタムフィールドをマッピングする場合、Datadog イベントマップとインシデント変換マップのいずれかに次のマッピングスクリプトを使用できます。この例では、フィールド `my_field` がインテグレーションタイルのカスタムフィールドとして定義されています。
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

[1]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/26b85b762f6a1010b6a0d49df699b6fe
[2]: https://store.servicenow.com/
[3]: https://app.datadoghq.com/event/explorer
[4]: https://docs.datadoghq.com/ja/tracing/service_catalog/
[5]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[6]: https://docs.datadoghq.com/ja/tracing/service_catalog/service_metadata_structure
[7]: https://docs.datadoghq.com/resources/xml/Datadog-SNow_Update_Set.xml
[8]: https://app.datadoghq.com/account/settings#integrations/servicenow
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html