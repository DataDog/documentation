---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - notification
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/configcat/README.md'
description: Datadog-ConfigCat インテグレーションにより、ConfigCat のすべての設定変更が確実にイベントとして Datadog に送信されます。この機能を使用すれば、設定を変更する際にシステムの挙動を確認することができます。製品の Datadog インテグレーションは ConfigCat で設定できます。
display_name: ConfigCat
draft: false
git_integration_title: configcat
guid: 5e98d95a-519d-460c-945a-5e3a4e1f8d72
integration_id: configcat
integration_title: ConfigCat
is_public: true
kind: インテグレーション
maintainer: developer@configcat.com
manifest_version: 1.0.0
name: configcat
public_title: Datadog-ConfigCat インテグレーション
short_description: Datadog により追跡する設定変更イベント
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[ConfigCat 機能フラグ][1]を使用すれば、コードを再デプロイすることなく、機能の管理やソフトウェアのコンフィギュレーション変更が可能になります。技術チーム以外のメンバーでも、[ダッシュボードから 10 分で習得][2]し機能を直接管理できるため、いつでもデプロイし、自信を持ってリリースできます。新しい機能の場合は、初めに特定のユーザーグループをターゲットにするとよいでしょう。A/B/n テストやソフトウェアの発売をサポートしているほか、ウェブ、モバイル、バックエンドアプリケーションと容易に統合が可能な[オープンソース SDK][3]  が提供されています。

このインテグレーションにより、ConfigCat のあらゆる設定変更が Datadog にイベントとして確実に送信されます。

*例:*
![Datadog イベント][4]

## セットアップ

1. [Datadog サブスクリプション][5]を入手します。
2. [Datadog API キー][6]を取得します。
    ![Datadog イベント][7] 
4. ConfigCat ダッシュボードで [integrations タブ][8]を開きます。
5. Datadog の _CONNECT_ ボタンをクリックし、Datadog API キーを設定します。
6. これで完了です。機能フラグに何かしらの変更を加え、次に Datadog でイベントをチェックします。


### アンインストール

1. ConfigCat ダッシュボードで [integrations タブ][8]を開きます。
2. Datadog の DISCONNECT ボタンをクリックし、Datadog API キーを設定します。

## 収集データ

### メトリクス

ConfigCat インテグレーションには、メトリクスは含まれません。

### イベント

収集されたすべての ConfigCat 関連のイベントは、`source:configcat` プロパティと一緒に Datadog イベントストリームに表示され、製品、コンフィギュレーション、環境の各名前でタグ付けされます。

これは、本番環境 `sources:configcat production` で発生したイベントを検索する方法を示した例です。

![フィルタリング][9]

### サービスのチェック

ConfigCat インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ヘルプが必要な場合は [ConfigCat ドキュメント][10]を確認するか、[ConfigCat サポート][11]にお問い合わせください。

[1]: https://configcat.com
[2]: https://app.configcat.com
[3]: https://github.com/configcat
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_event.png
[5]: https://www.datadoghq.com
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_apikey.png
[8]: https://app.configcat.com/product/integrations
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_filtering.png
[10]: https://configcat.com/docs/integrations/datadog/
[11]: https://configcat.com/support