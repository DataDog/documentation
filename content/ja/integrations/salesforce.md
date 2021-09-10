---
categories:
  - モニタリング
  - network
  - cloud
ddtype: crawler
dependencies: []
description: セールスフォース・ドットコム
doc_link: 'https://docs.datadoghq.com/integrations/salesforce/'
draft: false
git_integration_title: salesforce
has_logo: true
integration_id: ''
integration_title: セールスフォース・ドットコム
is_public: true
kind: integration
manifest_version: '1.0'
name: salesforce
public_title: セールスフォース・ドットコム
short_description: Salesforce のリアルタイムプラットフォームイベントを Datadog ログとして収集します。
version: '1.0'
---
## 概要

Salesforce は顧客関係管理サービスに加えて、カスタマーサービス、マーケティングオートメーション、アナリティクス、アプリケーション開発に特化したエンタープライズ向けアプリケーションスイートを無料で提供しています。Salesforce と Datadog の統合により次のことが行えます:

- [Datadog のログ製品][1]を使用してログを表示およびパースする。
- Salesforce プラットフォームからの[イベント][3]に[モニター][2]を設定する。
- Datadogの[セキュリティプラットフォーム][4]を活用して、Salesforce プラットフォームに対する脅威を監視および検知する。
- Salesforce API の使用量を監視し、API の制限以下で運用を行っていることを確認する。

## セットアップ

### インストール

インストールは必要ありません。

### コンフィギュレーション

Datadog にデータを送信するよう Salesforce を構成するには、[Salesforce イベントモニタリング][5]にアクセスし、Salesforce イベント上のストレージを有効化して Salesforce の組織を Datadog に接続する必要があります。

#### イベントストレージを有効化する

1. (Lightning インターフェースを使用して) Salesforce のアカウントに[ログイン][6]します。
2. “Event Manager” を探します。
3. Event Manager ページで、クロールしたい各イベントについて右矢印をクリックして “Enable Storage” を選択します。

#### 組織を接続する

1. [Salesforce インテグレーションタイル][7] の Configuration タブで **Connect a Salesforce org** をクリックします。
2. Salesforce のアカウントにログインするよう画面がリダイレクトされ、Datadog のアクセス権限が付与されます。一連のフローを完了させてください。
3. フローを完了すると、Datadog の [Salesforce インテグレーションタイル][7]に戻ります。インテグレーションがインストールされ、組織が事前設定済みのデフォルトタグと接続されているはずです:
    {{< img src="integrations/salesforce/salesforce.png" alt=" Datadog 上で Salesforce org の構成が完了した際の成功画面" popup="true">}}
4. これらのステップを、接続したい組織の数だけ繰り返します。ログインしているユーザーは当該組織のアクセス権を有している必要があります。

**注**: Salesforce org ID にデフォルトタグが追加されますが、[このタグ][8]は企業にとってより意味の通りやすいものになるよう編集することができます。

#### 結果

ソース `salesforce` 下にタグが表示されるまで 5 分間待機します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "salesforce" >}}


### イベント

ログイベントの一覧は [Salesforce のドキュメント][10]を参照してください。

### サービスのチェック

Salesforce インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: /ja/logs/
[2]: /ja/monitors/monitor_types/
[3]: /ja/events/
[4]: /ja/security_platform/
[5]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[6]: https://login.salesforce.com/
[7]: https://app.datadoghq.com/account/settings#integrations/salesforce
[8]: /ja/getting_started/tagging/using_tags/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/salesforce/salesforce_metadata.csv
[10]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[11]: https://docs.datadoghq.com/ja/help/