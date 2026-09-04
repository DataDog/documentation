---
app_id: adyen
categories:
- log collection
custom_kind: integration
description: Adyen Transactions / Disputes / Payouts のデータを可視化し、洞察を得られます
integration_version: 1.0.0
media:
- caption: Adyen Transactions
  image_url: images/adyen_transaction_1.png
  media_type: image
- caption: Adyen Transactions
  image_url: images/adyen_transaction_2.png
  media_type: image
- caption: Adyen Payouts
  image_url: images/adyen_payouts.png
  media_type: image
- caption: Adyen Disputes
  image_url: images/adyen_disputes.png
  media_type: image
title: Adyen
---
## 概要

[Adyen](https://www.adyen.com/) は、企業向けに幅広い決済ソリューションを提供するグローバルな決済プラットフォームです。オンライン、モバイル、店頭での支払い受付に対応しています。クレジット カード、モバイル ウォレット、各国のローカル決済など、多様な支払い方法をサポートし、不正防止やリスク管理といったサービスも提供します。

Adyen インテグレーションは、Adyen の webhook 機能を利用してトランザクション、ディスピュート、ペイアウトのデータを収集し、Datadog に取り込んで包括的な分析ができるようにします。

## セットアップ

以下の手順に従って、Adyen アカウント用にこのインテグレーションを設定してください。

### 設定

#### Webhook 設定

Datadog のエンドポイントを設定し、Adyen のイベントをログとして Datadog に転送します。詳細は、[Adyen webhook の概要](https://docs.adyen.com/development-resources/webhooks/) を参照してください。

1. Datadog の [Adyen integration tile](https://app.datadoghq.com/integrations/adyen) にある **Configuration** タブ内で生成された URL をコピーします。

1. [Adyen](https://www.adyen.com/) アカウントに、デフォルト ロールに加えて **Merchant technical integrator** ロールを持ち、さらに **Company account and all associated merchant accounts** にアクセスできるユーザーでサイン インします。

1. **Developers** セクションで **Webhooks** をクリックします。

1. **Create new webhook** をクリックします。

1. Recommended Webhooks セクションで、**Standard Webhook** の隣にある **Add** を選択します。

1. **General** で次の項目を設定します:
   |設定|設定内容|
   |------------------------------|-----------------------------|
   |Version|webhook バージョン 1 を選択します|
   |Description|webhook に説明を追加します|
   |Merchant accounts|すべてのマーチャント アカウントを対象にするか、Datadog に取り込む対象として特定のアカウントを選択します|

1. **Server configuration** で次の項目を設定します:
   |設定|設定内容|
   |------------------------------|-----------------------------|
   |URL|[Webhook 設定](#webhook-configuration) の手順 1 で生成したエンドポイント URL を入力します。|
   |Method|JSON|
   |Encryption protocol|TLSv1.3|

1. **Events** では、**Standard Webhook** に沿ってデフォルトで選択されているイベントをそのまま使用します。

1. **Save configuration** をクリックします。

## 収集データ

### ログ

Adyen インテグレーションは、トランザクション、ディスピュート、ペイアウトのログを収集して Datadog に転送します。

### メトリクス

Adyen インテグレーションにはメトリクスは含まれません。

### イベント

Adyen インテグレーションにはイベントは含まれません。

### サービス チェック

Adyen インテグレーションにはサービス チェックは含まれません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。