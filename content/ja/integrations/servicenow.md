---
categories:
  - issue tracking
  - notification
ddtype: crawler
dependencies: []
description: Datadog アラートからチケットを自動的に生成および更新
doc_link: 'https://docs.datadoghq.com/integrations/servicenow/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/'
    tag: ブログ
    text: Datadog アラートからの ServiceNow チケットの作成
git_integration_title: servicenow
has_logo: true
integration_title: ServiceNow
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: servicenow
public_title: Datadog-ServiceNow インテグレーション
short_description: Datadog アラートからチケットを自動的に生成および更新
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

### サービスグラフコネクタを構成する

[Datadog 用サービスグラフコネクタ][1]により、Datadog によって検出された新しいリソースの CMDB に、サーバーとデータベースの構成アイテム (CI) が自動的に入力されます。サービスグラフコネクタは ServiceNow [ストア][2]から入手可能です。

コンフィギュレーションについては、サービスグラフコネクタのガイドに記載されたセットアップ手順に従ってください。

サポートされる CI の種類
* サーバー
* Amazon RDS

下記の記述は、すでに ServiceNow ITOM/ITSM インテグレーションを構成済みの場合のみ適用されます。

* サービスグラフコネクタでは、コンフィギュレーションタイルの `Target table` 値と `Custom table` 値を使用しません。Target テーブルのデフォルト値とのインテグレーションを保存できます。
* サービスグラフコネクタのセットアップ手順に記載されているように、ユーザーに cmdb_import_api_admin ロールを付与することで、同じ ITOM/ITSM ユーザーをサービスグラフコネクタで使用できます。

## ITOM と ITSM のセットアップ

モジュールを使用するには、まず、ServiceNow インスタンスに最新の [Datadog 更新セット][3]をインストールし、Datadog で ServiceNow インテグレーションタイルを構成します。

1. [最新の Datadog 更新セットのインストール](#install-the-datadog-update-set)
1. [Datadog アカウントのアクセス許可の設定](#permissions)
1. [ITOM および ITSM での使用手順](#configuring-for-use-with-itom-and-itsm-modules)

### Datadog 更新セットのインストール

ServiceNow で以下を実行します。

- **Update Set (更新セット)** を検索します。
- メニューで、**取得された更新セット**を見つけます。
- `Datadog-SNow_Update_Set_vX.X.X.xml` ファイルを手動でインポートします。

提供されている [Datadog XML 更新セット][3]をインポートします。

{{< img src="integrations/servicenow/servicenow-import-update-set.png" alt="servicenow インテグレーション" >}}

XML ファイルをアップロードすると、状態が `Loaded` と表示されます。更新セットの名前をクリックして、コードをプレビューし、システムへコミットします。

{{< img src="integrations/servicenow/servicenow-loaded-update-set.png" alt="servicenow インテグレーション" >}}

更新セットをプレビューしてエラーがないことを確認します。

{{< img src="integrations/servicenow/servicenow-preview-update-set.png" alt="servicenow インテグレーション" >}}

**Commit Update Set** を選択して、アプリケーションをシステムにマージします。

{{< img src="integrations/servicenow/servicenow-commit-update-set.png" alt="servicenow インテグレーション" >}}

これで、ナビゲーションメニューで **Datadog** を検索すると、テーブルが表示されるようになります。

{{< img src="integrations/servicenow/servicenow-datadog-tables.png" alt="servicenow インテグレーション" >}}

### アクセス許可

インポートテーブルにアクセスして変換マップを適用するには、ServiceNow ユーザーに次のアクセス許可が必要です。

- `x_datad_datadog.user`
- `import_set_loader`
- `import_transformer`

**Incident** テーブルまたは **Event** テーブルに直接通知を送信する場合は、`ITIL` および `evt_mgmt_integration` ロールが必要です。

### ITOM および ITSM モジュールで使用するために Datadog を構成する

Datadog で @servicenow を使用する通知は、ServiceNow タイルで選択された中間テーブルに入力されます。以下の手順は、Datadog インテグレーションページで ServiceNow タイルを既にセットアップしていることを前提としています。それが完了したら、以下を行います。

1. ドロップダウンから、ドロップダウンから通知を送信する中間テーブルを選択します。
1. インテグレーションが正しくセットアップされているかを検証するには、モニターまたはイベント通知に `@servicenow` を追加します。未加工のデータが中間テーブルの行に挿入され、作成したマッピングと変換で指定されている ServiceNow テーブルに転送されます。
1. [変換マップを使用](#customize-data-with-transform-maps)して、テーブルに送信されるデータのフォーマットをカスタマイズします。
1. [Datadog で ServiceNow インテグレーションタイルを構成します](#configure-the-servicenow-tile-in-datadog)

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="servicenow インテグレーション" >}}

### ITOM/ITSM 対応 Datadog で ServiceNow タイルを構成する

1. Datadog で Integrations ページの [ServiceNow インテグレーションタイル][4]に移動します。
1. ServiceNow ドメインのサブドメインであるインスタンス名、`<インスタンス>.service-now.com` を追加します。
1. ServiceNow インスタンスのユーザー名とパスワードを追加します。ITSM または ITOM モジュールを使用していて、通知を中間テーブルに送信したい場合は、ドロップダウンから選択できます。

**注**: Datadog のためだけに ServiceNow で制限ユーザーを作成できます。

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="servicenow インテグレーション" >}}

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

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## ナレッジベース

### Datadog インポートホストの AutoFlush ルール

インポートセットテーブル `x_datad_datadog_import_host` が蓄積する行が増えすぎることを防ぐために、最後の 24 時間のデータのみを保持する AutoFlush ルールがテーブルクリーナーツールに追加されました。このコンフィギュレーション設定は、必要に応じて、フィルターナビゲーターで `sys_auto_flush_list.do` に移動し、`x_datad_datadog_import_host` テーブルのルールに入ることで変更できます。必要に応じて `Age in seconds` フィールドを更新できます。

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="インテグレーション構成設定" >}}

### Datadog アラートからのサポートチケットの自動生成

ServiceNow が Datadog アカウントに接続されると、受信したアラートから自動的にサポートチケットを作成し、それを ServiceNow のチケットキューに送信できます。そこから、サポートチームは、ServiceNow 内で既に確立されている通信ワークフローを使用して、問題の通知を受けます。アラートメッセージで `@servicenow` をメンションするか、モニターの通知リストに `@servicenow` を追加します。

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" >}}

### チケットペイロードとフィールドマッピングでの変数の使用

アラートの本文やフィールドマッピングで変数を使用して、ServiceNow にイベントの詳細を挿入することができます。たとえば、タイトルと重大度を該当する ServiceNow フィールドに含めたり、ServiceNow のチケットから Datadog 内の特定のインシデントに戻るリンクを入れたりすることができます。

{{< img src="integrations/servicenow/servicenow-variables.png" alt="ServiceNow 変数" >}}

### サポート解決ワークフローの自動化

モニターステータスが正常に戻ると、関連付けられているサポートチケットが自動的に「resolved」としてマークされます。

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow 解決済み" >}}

### カスタムマッピングの定義

たとえば、**Datadog Incident Tables** をクリックしてレコードの下部に移動すると、関連付けられている変換マップへのリンクが表示されます。

{{< img src="integrations/servicenow/servicenow-datadog-incident-table.png" alt="servicenow インテグレーション" >}}

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

[1]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/26b85b762f6a1010b6a0d49df699b6fe/1.0.4?referer=%2Fstore%2Fsearch%3Flistingtype%3Dallintegrations%25253Bancillary_app%25253Bcertified_apps%25253Bcontent%25253Bindustry_solution%25253Boem%25253Butility%26q%3Ddatadog&sl=sh
[2]: https://store.servicenow.com/
[3]: https://s3.amazonaws.com/dd-servicenow-update-sets/Datadog-SNow_Update_Set_v2.2.2.xml
[4]: https://app.datadoghq.com/account/settings#integrations/servicenow
[5]: https://docs.datadoghq.com/ja/help/