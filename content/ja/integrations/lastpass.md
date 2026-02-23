---
app_id: lastpass
categories:
- ログの収集
- security
custom_kind: インテグレーション
description: LastPass のレポーティングログのインサイトを取得
integration_version: 1.0.0
media:
- caption: LastPass - レポーティングイベント 1
  image_url: images/lastpass_reporting_events_1.png
  media_type: image
- caption: LastPass - レポーティングイベント 2
  image_url: images/lastpass_reporting_events_2.png
  media_type: image
- caption: LastPass - レポーティングイベント 3
  image_url: images/lastpass_reporting_events_3.png
  media_type: image
title: LastPass
---
## 概要

[LastPass](https://www.lastpass.com/products/business) は、パスワードやその他の機密情報を安全に保管・管理するパスワード管理ソリューションです。LastPass は、パスワードの生成、複数デバイス間でのパスワードの同期、多要素認証によるセキュリティ強化などの機能をユーザーに提供します。

LastPass と Datadog を統合することで、LastPass Enterprise API を通じてレポーティングイベントログに関するインサイトを得ることができます。データは取り込む前に正規化され、強化されます。あらかじめ組み込まれているダッシュボードの視覚化機能により、LastPass のレポーティングイベントを即座に把握できると同時に、標準の検出ルールで検出と対応の機能が強化されています。

## セットアップ

### LastPass で API 認証情報を生成する

1. メールアドレスとマスターパスワードを使って [Admin Console](https://admin.lastpass.com/) にログインします。
1. **Advanced** > **Enterprise API** に移動します。
1. アカウント番号を確認し、プロビジョニングハッシュを作成します。

### LastPass のタイムゾーンを取得する

1. **Time Zone** ドロップダウンメニューのオプションは、LastPass のタイムゾーンの値に基づいています。
1. LastPass アカウントで設定されているタイムゾーンを選択する必要があります。
1. LastPass アカウントのタイムゾーンは、以下の手順で確認できます。
   - LastPass Business アカウントにログインします。
   - [Vault ページ](https://lastpass.com/vault/)にアクセスします。
   - **Account Settings** に移動します。
   - **Account Information** セクションで、選択したタイムゾーンを確認します。

### LastPass アカウントを Datadog に接続する

1. アカウント番号、プロビジョニングハッシュ、タイムゾーンを追加します。
   |パラメーター|説明|
   |--------------------|--------------------|
   |Account number|登録した LastPass アカウントのアカウント番号。|
   |Provisioning hash|LastPass の登録アカウントのプロビジョニングハッシュシークレット。|
   |Time zone|LastPass の登録アカウントのタイムゾーン。|

1. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### ログ

LastPass インテグレーションは、LastPass のレポーティングイベントログを収集し、Datadog に転送します。

### メトリクス

LastPass インテグレーションにはメトリクスは含まれていません。

### イベント

LastPass インテグレーションにはイベントは含まれていません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/)にお問い合わせください。