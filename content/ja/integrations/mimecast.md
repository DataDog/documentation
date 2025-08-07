---
app_id: mimecast
categories:
- ログの収集
- security
custom_kind: インテグレーション
description: Mimecast ログのインサイトを取得
integration_version: 1.0.0
media:
- caption: Mimecast - Audit
  image_url: images/mimecast_audit.png
  media_type: image
- caption: Mimecast - DLP
  image_url: images/mimecast_dlp.png
  media_type: image
- caption: Mimecast - Rejection
  image_url: images/mimecast_rejection.png
  media_type: image
- caption: Mimecast - TTP Attachment
  image_url: images/mimecast_ttp_attachment.png
  media_type: image
- caption: Mimecast - TTP Impersonation Protect
  image_url: images/mimecast_ttp_impersonation_protect.png
  media_type: image
- caption: Mimecast - TTP URL
  image_url: images/mimecast_ttp_url.png
  media_type: image
title: mimecast
---
## 概要

[Mimecast](https://www.mimecast.com/) は、電子メールベースのさまざまな脅威から組織を保護するように設計されたクラウドベースのソリューションです。この製品は、フィッシング、マルウェア、スパム、標的型攻撃などの高度な脅威から保護するための包括的なセキュリティ機能のほか、データ漏洩防止やメール継続性サービスも提供しています。

このインテグレーションは次のログを取り込みます。

- Audit : 監査ログでは、管理者によるアカウントアクセスや構成変更に関するログを検索、確認、エクスポートできます。
- DLP : データ損失防止 (DLP) とは、機密のビジネスデータを保護し、侵害や悪意のある攻撃から生じるデータ損失を検出・防止するように設計された一連の手法のことです。
- Rejection : 拒否されたメッセージは、ウイルスシグネチャが含まれていたり、存在しない受信者が宛先になっていたりします。このような場合、Mimecast はメールデータを受け付けず、拒否されたメッセージは取得できません。
- TTP Attachment : 標的型脅威対策 (TTP) Attachment Protection は、メールの添付ファイルを使用するスピアフィッシング攻撃から企業を保護します。
- TTP Impersonation : 標的型脅威対策 (TTP) Impersonation Protect は、メールをリアルタイムでスキャンして攻撃の兆候を検出することで、なりすまし攻撃を防ぎます。
- TTP URL : 標的型脅威対策 (TTP) URL Protection は、すべての受信メールのリンクを書き換え、ユーザーがクリックした際に、送信先のウェブサイトをリアルタイムでスキャンするメールセキュリティサービスです。

Mimecast インテグレーションは、上記のログをすべて収集して Datadog に取り込み、分析に役立てます。組み込みのログパイプラインを活用してログを解析・強化し、容易に検索・分析できます。これにより、監査ログ、DLP、メールに添付された悪質なファイル、なりすましユーザーから送信されたメール、フィッシングメールのリンクなどを、あらかじめ用意されたダッシュボードで可視化できます。

## セットアップ

### Mimecast で API 認証情報を生成する

1. **Mimecast のアカウント**にログインします。
1. **Administration Console** に移動し、**Services** を選択してから、**API and Platform Integrations** セクションを選択します。
1. **API 2.0 Applications** に進みます。
1. 提供されたリストからアプリケーションを検索します。
1. アプリケーションがない場合は、まだセットアップされていないことを意味します。以下の手順に従って構成を行う必要があります。
   - **API and Platform Integrations** ページで **Available Integrations** タブをクリックします。
   - Mimecast API 2.0 タイルの **Generate keys** ボタンをクリックします。
   - **I accept** のチェックボックスにチェックを入れ、**Next** をクリックします。
   - **Application Details** のステップで、指示に従って以下の詳細を入力します。
     - Application Name: アプリケーションに意味のある名前を付けます
     - Category: **SIEM Integration** を選択します
     - Products: **Select all** オプションをクリックします
     - Application Role: **Basic Administrator** を選択します
     - Description: 説明を自由に入力します
   - **Notifications** で技術管理者の連絡先情報を入力し、**Next** をクリックします
   - **Add and Generate Keys** をクリックします。ポップアップウィンドウが表示され、クライアント ID とクライアントシークレットが表示されます。
1. アプリケーションがリストに存在する場合は、その名前をクリックします。
1. **Manage API 2.0 credentials** ボタンをクリックし、**Generate** をクリックします。これにより、新しいクライアント ID とクライアントシークレットが生成されます。

### Mimecast アカウントを Datadog に接続する

1. Mimecast の認証情報を追加します。

   | パラメーター | 説明                                                     |
   | ------------------- | ------------------------------------------------------------ |
   | Client ID           | Mimecast に登録したアプリケーションのクライアント ID。     |
   | Client Secret       | Mimecast に登録したアプリケーションのクライアントシークレット。 |

1. Save ボタンをクリックして設定を保存します。

## 収集データ

### ログ

Mimecast インテグレーションは、Mimecast の Audit、DLP、Rejection、TTP Attachment、TTP Impersonation、TTP URL のログを収集し、Datadog に転送します。

### メトリクス

Mimecast インテグレーションにはメトリクスは含まれていません。

### サービス チェック

Mimecast インテグレーションにはサービスのチェック機能は含まれていません。

### イベント

Mimecast インテグレーションにはイベントは含まれていません。

## サポート

サポートが必要な場合は [Datadog サポート](https://docs.datadoghq.com/help/)にお問い合わせください。