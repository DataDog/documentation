---
app_id: salesforce
app_uuid: 791208ed-fdbb-47ce-bd70-9c3cab7a51ef
assets:
  dashboards:
    salesforce: assets/dashboards/salesforce.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: salesforce.limits.max
      metadata_path: metadata.csv
      prefix: salesforce.limits.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 607
    source_type_name: セールスフォース・ドットコム
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- モニター
- security
- コラボレーション
- log collection
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: salesforce
integration_id: salesforce
integration_title: セールスフォース・ドットコム
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: salesforce
public_title: セールスフォース・ドットコム
short_description: Salesforce のリアルタイムプラットフォームイベントを Datadog ログとして収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Metrics
  - Category::Security
  - Category::Collaboration
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Salesforce のリアルタイムプラットフォームイベントを Datadog ログとして収集します。
  media:
  - caption: Salesforce 概要ダッシュボード
    image_url: images/overview-dashboard.png
    media_type: image
  - caption: Salesforce イベント ログ
    image_url: images/logs-screenshot.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-salesforce-logs-datadog/
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/salesforce/
  support: README.md#Support
  title: セールスフォース・ドットコム
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
!["Salesforce ダッシュボード"][1]

## 概要

Salesforce は、顧客関係管理 (CRM) サービスを提供するほか、カスタマーサービス、マーケティングオートメーション、分析、アプリケーション開発に特化したエンタープライズ向けアプリケーションの補完的なスイートも提供しています。

Salesforce インテグレーションは、[Event Log File (ELF)][2] API および [Real-Time Event Monitoring][3] ストリームを通じてイベント ログを収集し、Salesforce 環境を可視化します。このインテグレーションにより、ログイン、ログアウト、本人確認などのユーザー アクションを追跡できます。これには、標準イベント、ログ ファイル、カスタム プラットフォーム イベントなど、さまざまなイベント タイプのサポートが含まれます。カスタム オブジェクト[21]やカスタム プラットフォーム イベント[25]をログとして取り込むこともできます。カスタム オブジェクトは定期的なポーリングによって収集され、カスタム プラットフォーム イベントは Salesforce の Pub/Sub API を使用してリアルタイムでストリーミングされます。これにより、カスタム ビジネス イベントが発生した際に、ほぼ瞬時に可視化することができます。このインテグレーションは、Salesforce によって定義されたデフォルトのイベントと、顧客が独自のインスタンスで特別に設定したカスタム イベントやオブジェクトの両方でシームレスに機能します。

Salesforce と Datadog の統合により次のことが行えます:


-   [Datadog のログ管理機能][4]を使用して、Salesforce のユーザー アクティビティ、プラットフォーム アクセス アクティビティ、セキュリティ ログを表示・解析する。
-   Salesforce プラットフォームからの[イベント][6]に[モニター][5]を設定する。
-   Salesforce API の使用量を監視し、API の制限以下で運用を行っていることを確認し、API の制限に達するなどの問題を防止する。
-   [Cloud SIEM][7] を使用して、イベントを相関させ、高度な脅威を検出し、疑わしいアクティビティをより効率的に調査する。
-   Datadog [Reference Tables][8] を使用して、Salesforce インスタンスのメタデータでテレメトリを自動的に拡張(エンリッチ)する。値フィールドを主キーにマッピングしておくことで、そのキーを含むログやイベントにこれらのフィールドを自動的に追加できます。

Datadog は Salesforce のログを自動で解析するため、ユーザー ID、IP アドレス、Salesforce エンティティでフィルタリングして、不審なログイン試行や通常と異なるアクティビティなどの異常を特定することができます。このインテグレーションには、アクティビティ監視のためのすぐに使えるダッシュボードも含まれており、ニーズに合わせてカスタマイズできます。
Salesforce のログの監視を今すぐ開始し、Datadog の分析ツールを活用してセキュリティ、パフォーマンス、運用のインサイトを強化しましょう。

## セットアップ

### インストール

インストールは必要ありません。

### 設定

Datadog にデータを送信するよう Salesforce を構成するには、[Salesforce イベント モニタリング][9]にアクセスし、Salesforce イベント上のストレージを有効化して Salesforce の組織を Datadog に接続する必要があります。

#### 権限

[Salesforce Shield][10] を使用している場合、すべてのイベントに対して必要な権限が設定されています。Shield をご利用でない場合は、[イベント モニタリング アドオン][11]が必要です。

#### イベントストレージを有効化する

プラットフォームまたはリアルタイムイベントの使用を計画している場合、イベントマネージャーでこれを設定する必要があります。イベントログファイルイベントの場合は、このステップは必要ありません。

1. (Lightning インターフェースを使用して) Salesforce のアカウントに[ログイン][12]します。
2. **Event Manager** を検索します。
3. Event Manager ページで、クロールしたい各イベントについて右矢印をクリックして **Enable Storage** を選択します。**Enable Streaming** を有効にする必要はありません。サポートされているイベントの一覧は、[Salesforce インテグレーション タイル][13]の **Configuration** タブにある **Platform Events** セクションで確認できます。

#### 組織を接続する

1. Salesforce 組織内で一意のシステムアカウントを作成してください。
2. [Salesforce インテグレーション タイル][13]の **Configuration** タブにある **New Production Org** または **New Sandbox Org** をクリックします。
3. これらのイベントに付けたいカスタムタグを、カンマ区切りのリストとして設定します。有効にするイベントを選択することができます。

!["Salesforce 接続成功ダッシュボード"][14]

4. **Save** をクリックすると、Salesforce アカウントへのログインと Datadog へのアクセス許可の付与が求められます。
5. ログイン フローが完了したら、Datadog の [Salesforce インテグレーション タイル][13]に戻ります。組織には、すぐに使えるデフォルト タグが含まれています。

!["Salesforce のデフォルト タグ"][15]


6. 使用したいタグを選択し、**Connect** をクリックします。
7. 同様の手順を繰り返して、他の組織を接続します。追加対象の組織へのアクセス権が必要です。

**注**: Salesforce 組織 ID 付きのデフォルト タグが追加されますが、[タグ][16]は自社にとってより意味のあるものになるよう編集することができます。

#### Salesforce カスタムオブジェクトの追加

[Salesforce カスタム オブジェクト][17]は Datadog に取り込むことが可能です。

1. Salesforce インテグレーションタイルで、Custom Objects セクションを開きます。
2. Salesforce API 形式 (`CustomObject__c`) で記述したカスタムオブジェクトを 1 つ以上、`CustomObject1__c, CustomObject2__c` のようにカンマ区切りで追加します。
3. これらのカスタムオブジェクトは、他の Salesforce イベントと同様に有効または無効にできます。

カスタムオブジェクトは変更日を基準にログとして取り込まれます。すべてのカスタムオブジェクトログには、自動的に `salesforce_custom_object:true` タグが付与されます。

#### Salesforce プラットフォーム カスタム イベントの追加

[Salesforce カスタム プラットフォーム イベント][18]は Datadog にリアルタイムでストリーミングすることが可能です。

1. Salesforce インテグレーション タイルで、Custom Events セクションを開きます。
2. Salesforce API 形式 (`CustomEvent__e`) で記述したカスタム プラットフォーム イベントを 1 つ以上、`CustomEvent1__e, CustomEvent2__e` のようにカンマ区切りで追加します。
3. これらのカスタム イベントは、他の Salesforce イベントと同様に有効または無効にできます。

カスタム イベントは Salesforce の Pub/Sub API を使用してログとして取り込まれ、リアルタイムでストリーミングされます。すべてのカスタム イベント ログには、自動的に `salesforce_custom_event:true` タグが付与されます。

#### 結果

しばらくすると、`salesforce` のソース下に[ログ][4]が表示されます。Salesforce は頻繁にイベント ログ ファイルに書き込むわけではないため、イベント ログ ファイル ベースのイベントが Datadog に表示されるまでに、1 時間以上かかる場合があります。

!["Salesforce ログ ストリーム ウィジェット"][19]


#### Enabling Ingestion of Reference Tables

##### インポートしたいテーブルとフィールドを特定する

1. Salesforce で **Object Manager** を開きます
2. Datadog に取り込むオブジェクトを選択します
3. オブジェクトの**項目とリレーション**を選択します

##### Salesforce クエリを定義して検証する

1. Salesforce で[開発者コンソール][20]を開きます
2. **開発者コンソール**でオブジェクトから目的の項目を選択し、クエリの構築とテストを行います。

##### Salesforce クエリを使って Datadog リファレンス テーブルを定義する

1. Datadog で、Salesforce タイルに移動し、既存のアカウントを選択するか、新しいアカウントを追加します
2. **Add New Reference Table** ボタンをクリックします
3. **Table Name** に一意の名前を入力します
4. 一意の値を持つクエリ内の項目を選択し、**Primary Key** として入力します
5. 正常に動作するクエリを **Salesforce 開発者コンソール**から **Salesforce Query** にコピーします。
6. **Save All Changes** をクリックします

##### トラブルシューティング

-   **Reference Table** フィールドを保存した後は変更できません。必要な場合は、削除してから新しいテーブルを追加してください。
-   クエリがスケジュール実行された後、数分以内に Datadog 側にサービスデータが反映されるはずです。
-   Datadog の [イベント エクスプローラー][21] で、検索クエリのスコープを `source:salesforce` に設定して、取り込みプロセスを監視します。
-   [Reference Tables][22] に移動し、**Table Name** を使って新しく作成したテーブルを検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "salesforce" >}}


### ログ

このインテグレーションにより、[Datadog Log Management][4] を使用して Salesforce ユーザー アクティビティ、プラットフォーム アクセス アクティビティ、セキュリティ関連のログを閲覧できます。対応アクティビティの完全な一覧については、[Real-Time Event Monitoring Data Storage][24] および [EventLogFile Events][25] を参照してください。これらの情報は、Salesforce インテグレーション タイルの **Data Collected** タブでも確認できます。

### サービス チェック

Salesforce インテグレーションには、サービスのチェック機能は含まれません。

### イベント

このインテグレーションには、イベントは含まれません。

## トラブルシューティング

Configuration タブで `The authenticated connection does not have access` エラーが発生した場合、要求されたイベントにアクセスするための権限が欠落している可能性があります。Salesforce の Datadog ロールの管理者権限を一時的に有効にして、不足しているアクセス権限を確認することができます。

最低限、ユーザーには以下の権限が必要です。

-   API Enabled
-   View Setup and Configuration
-   View Real-Time Event Monitoring Events
-   View Event Log Files
-   View Threat Detection Events

ユーザーは、構成で選択されている基礎となるイベントオブジェクトの読み取り権限も持っている必要があります。

ご不明な点は、[Datadog のサポートチーム][26]までお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: images/salesforce_dashboard.png
[2]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile.htm
[3]: https://help.salesforce.com/s/articleView?id=xcloud.real_time_event_monitoring_overview.htm&type=5
[4]: https://docs.datadoghq.com/ja/logs/
[5]: https://docs.datadoghq.com/ja/monitors/monitor_types/
[6]: https://docs.datadoghq.com/ja/events/
[7]: https://www.datadoghq.com/dg/security/siem-solution/?utm_source=google&utm_medium=paid-search&utm_campaign=dg-security-na-siem&utm_keyword=cloud%20siem&utm_matchtype=p&igaag=132461095403&igaat=&igacm=15832880540&igacr=596304643080&igakw=cloud%20siem&igamt=p&igant=g&utm_campaignid=15832880540&utm_adgroupid=132461095403&gad_source=1&gad_campaignid=15832880540&gbraid=0AAAAADFY9Nk4R9kufMZrEHHWbK5eqZZx2&gclid=CjwKCAjw9anCBhAWEiwAqBJ-c0nfgfSoSTYESZQYWMFFq8d9Rci-lAqvm2nd_v7dFV-xfXHk4XeEiBoCXJ4QAvD_BwE
[8]: https://docs.datadoghq.com/ja/reference_tables/?tab=manualupload
[9]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[10]: https://www.salesforce.com/editions-pricing/platform/shield
[11]: https://help.salesforce.com/s/articleView?id=000339868&type=1
[12]: https://login.salesforce.com/
[13]: https://app.datadoghq.com/integrations/salesforce
[14]: images/salesforce-config.png
[15]: images/salesforce-default-tags.png
[16]: https://docs.datadoghq.com/ja/getting_started/tagging/using_tags/
[17]: https://help.salesforce.com/s/articleView?id=platform.dev_objectcreate_task_parent.htm&type=5
[18]: https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm
[19]: images/salesforce_dashboard_logs.png
[20]: https://help.salesforce.com/s/articleView?id=platform.code_dev_console_tab_query_editor.htm&type=5
[21]: https://app.datadoghq.com/event/explorer
[22]: https://app.datadoghq.com/reference-tables
[23]: https://github.com/DataDog/integrations-internal-core/blob/main/salesforce/metadata.csv
[24]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[25]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_supportedeventtypes.htm
[26]: https://docs.datadoghq.com/ja/help/