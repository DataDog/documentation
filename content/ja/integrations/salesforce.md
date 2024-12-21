---
categories:
- クラウド
- network
custom_kind: インテグレーション
dependencies: []
description: Salesforce のリアルタイムプラットフォームイベントを Datadog ログとして収集します。
doc_link: https://docs.datadoghq.com/integrations/salesforce/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-salesforce-logs-datadog/
  tag: ブログ
  text: Datadog で Salesforce ログを監視する
git_integration_title: salesforce
has_logo: true
integration_id: ''
integration_title: セールスフォース・ドットコム
integration_version: ''
is_public: true
manifest_version: '1.0'
name: salesforce
public_title: セールスフォース・ドットコム
short_description: Salesforce のリアルタイムプラットフォームイベントを Datadog ログとして収集します。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/salesforce/salesforce_dashboard.png" alt="Datadog のすぐに使える Salesforce ダッシュボード" popup="true">}}

## 概要

Salesforce は、顧客関係管理 (CRM) サービスを提供するほか、カスタマーサービス、マーケティングオートメーション、分析、アプリケーション開発に特化したエンタープライズ向けアプリケーションの補完的なスイートも提供しています。

Salesforce と Datadog の統合により次のことが行えます:

- [Datadog ログ管理][1]を使用して、Salesforce のユーザーアクティビティ、プラットフォームアクセスアクティビティ、セキュリティログを表示し、パースします。
- Salesforce プラットフォームからの[イベント][3]に[モニター][2]を設定する。
- Datadogの[セキュリティプラットフォーム][4]を活用して、Salesforce プラットフォームに対する脅威を監視および検知する。
- Salesforce API の使用量を監視し、API の制限以下で運用を行っていることを確認する。

## セットアップ

### インストール

インストールは必要ありません。

### 構成

Datadog にデータを送信するよう Salesforce を構成するには、[Salesforce イベントモニタリング][5]にアクセスし、Salesforce イベント上のストレージを有効化して Salesforce の組織を Datadog に接続する必要があります。

#### 権限

[Salesforce Shield][6] を使用している場合、すべてのイベントに対して必要な権限が設定されています。Shield をご利用でない場合は、[イベントモニタリングアドオン][7]が必要です。

#### イベントストレージを有効化する

プラットフォームまたはリアルタイムイベントの使用を計画している場合、イベントマネージャーでこれを設定する必要があります。イベントログファイルイベントの場合は、このステップは必要ありません。

1. (Lightning インターフェースを使用して) Salesforce のアカウントに[ログイン][8]します。
2. **Event Manager** を検索します。
3. Event Manager ページで、クロールしたい各イベントについて右矢印をクリックして **Enable Storage** を選択します。**ストリーミングを有効にする**必要はありません。
サポートされているイベントの一覧は、[Salesforce インテグレーションタイル][9]の **Configuration** タブにある **Platform Events** セクションで確認できます。

#### 組織を接続する

1. Salesforce 組織内で一意のシステムアカウントを作成してください。
2. [Salesforce インテグレーションタイル][9]の ** Configuration** タブにある **New Production Org** または **New Sandbox Org** をクリックします。
3. これらのイベントに付けたいカスタムタグを、カンマ区切りのリストとして設定します。有効にするイベントを選択することができます。

    {{< img src="integrations/salesforce/salesforce-1.png" alt="Datadog 上で Salesforce org の構成が完了した際の成功画面" popup="true" style="width:90%" >}}

4. **Save** をクリックすると、Salesforce アカウントへのログインと Datadog へのアクセス許可の付与が求められます。
5. ログインフローが完了したら、Datadog の [Salesforce インテグレーションタイル][9]に戻ります。組織には、すぐに使えるデフォルトのタグが含まれています。

    {{< img src="integrations/salesforce/salesforce-default-tags.png" alt="Datadog 上で Salesforce org の構成が完了した際の成功画面" popup="true" style="width:90%" >}}

6. 使用したいタグを選択し、**Connect** をクリックします。
7. 同様の手順を繰り返して、他の組織を接続します。追加対象の組織へのアクセス権が必要です。

**注**: Salesforce org ID にデフォルトタグが追加されますが、[このタグ][10]は企業にとってより意味の通りやすいものになるよう編集することができます。

#### Salesforce カスタムオブジェクトの追加

[Salesforce Custom Objects][11] は Datadog に取り込むことが可能です。

1. Salesforce インテグレーションタイルで、Custom Objects セクションを開きます。
2. Salesforce API 形式 (`CustomObject__c`) で記述したカスタムオブジェクトを 1 つ以上、`CustomObject1__c, CustomObject2__c` のようにカンマ区切りで追加します。
3. これらのカスタムオブジェクトは、他の Salesforce イベントと同様に有効または無効にできます。

カスタムオブジェクトは変更日を基準にログとして取り込まれます。すべてのカスタムオブジェクトログには、自動的に `salesforce_custom_object:true` タグが付与されます。

#### 結果

しばらくすると、`salesforce` のソース下に[ログ][1]が表示されます。Salesforce は頻繁にイベントログファイルに書き込むわけではないため、イベントログファイルベースのイベントが Datadog に表示されるまでに、1 時間以上かかる場合があります。

{{< img src="integrations/salesforce/salesforce_dashboard_logs.png" alt="すぐに使える Salesforce ダッシュボードの Salesforce Log Stream ウィジェット" popup="true">}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "salesforce" >}}


### ログ

このインテグレーションにより、[Datadog Log Management][1] を使用して Salesforce ユーザーアクティビティ、プラットフォームアクセスアクティビティ、セキュリティ関連のログを閲覧できます。対応アクティビティの完全な一覧については、[Real-Time Event Monitoring Data Storage][13] および [EventLogFile Events][14] を参照してください。これらの情報は、Salesforce インテグレーションタイルの **Data Collected** タブでも確認できます。

### サービスチェック

Salesforce インテグレーションには、サービスのチェック機能は含まれません。

### イベント

このインテグレーションには、イベントは含まれません。

## トラブルシューティング

Configuration タブで `The authenticated connection does not have access` エラーが発生した場合、要求されたイベントにアクセスするための権限が欠落している可能性があります。Salesforce の Datadog ロールの管理者権限を一時的に有効にして、不足しているアクセス権限を確認することができます。

最低限、ユーザーには以下の権限が必要です。

* API Enabled
* View Setup and Configuration
* View Real-Time Event Monitoring Events
* View Event Log Files
* View Threat Detection Events

ユーザーは、構成で選択されている基礎となるイベントオブジェクトの読み取り権限も持っている必要があります。

ご不明な点は [Datadog サポート][15]までお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/
[2]: /ja/monitors/monitor_types/
[3]: /ja/events/
[4]: /ja/security_platform/
[5]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[6]: https://www.salesforce.com/editions-pricing/platform/shield
[7]: https://help.salesforce.com/s/articleView?id=000339868&type=1
[8]: https://login.salesforce.com/
[9]: https://app.datadoghq.com/integrations/salesforce
[10]: /ja/getting_started/tagging/using_tags/
[11]: https://help.salesforce.com/s/articleView?id=platform.dev_objectcreate_task_parent.htm&type=5
[12]: https://github.com/DataDog/integrations-internal-core/blob/main/salesforce/metadata.csv
[13]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[14]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_supportedeventtypes.htm
[15]: https://docs.datadoghq.com/ja/help/