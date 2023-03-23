---
app_id: f5-distributed-cloud-services
app_uuid: 74c33838-0310-4ef3-95db-c378aece9d8b
assets:
  dashboards:
    f5xc_access: assets/dashboards/f5xc_access.json
  saved_views:
    f5xc_all: assets/saved_views/all.json
author:
  homepage: https://www.f5.com/cloud
  name: F5 Distributed Cloud Services
  sales_email: sales@f5.com
  support_email: g.coward@f5.com
categories:
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/f5-distributed-cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: f5-distributed-cloud
integration_id: f5-distributed-cloud-services
integration_title: F5 Distributed Cloud Services
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: f5-distributed-cloud
oauth: {}
public_title: F5 Distributed Cloud Services
short_description: F5 Distributed Cloud Services のイベントログをストリーミングし、視覚化します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Notification
  configuration: README.md#Setup
  description: F5 Distributed Cloud Services のイベントログをストリーミングし、視覚化します。
  media:
  - caption: F5 Distributed Cloud Services グローバルログレシーバー
    image_url: images/logreceiver-config.png
    media_type: image
  - caption: F5 Distributed Cloud Services のアクセスログ概要ダッシュボードです。
    image_url: images/dashboard_image.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: F5 Distributed Cloud Services
---

## 概要

F5 Distributed Cloud (XC) Services は、ハイブリッド環境 (パブリッククラウド、プライベートデータセンター、コロケーション) において、アプリケーションをデプロイ、管理、保護できるグローバルなクラウドネイティブプラットフォームをお客様に提供します。また、ADN と CDN のサービスも利用可能です。

F5 XC プラットフォームには、Datadog HTTPS ロギングエンドポイントにログを安全に送信するよう構成できる Global Log Receiver が搭載されています。構成は、[F5 XC Console UI][1] から行うことができます。


このインテグレーションには、以下のものが含まれます。

- ダッシュボード - *アクセスログの概要*
- 保存ビュー - *よくクエリされるフィールドのためのファセットを含む*

## セットアップ

グローバルログストリーミングは、システムネームスペースまたは共有ネームスペースで利用できます。
- 共有ネームスペースは、アカウント内のすべての共有ネームスペース、または指定できる特定の共有ネームスペースのリストからのログのストリーミングをサポートしています。
- システムネームスペースは、システムネームスペースからのストリーミングログのみをサポートします。

以下は、システムネームスペースにグローバルログレシーバーを構成する例です。ステップバイステップのビデオは、[Datadog へのリモートログの構成の Datadog 公式 Youtube 説明書][2]をご覧ください。

**ステップ 1: グローバルログレシーバーを作成するには**

1. F5® Distributed Cloud Console で、Shared Configuration サービスに移動します。
2. Manage > Global Log Receiver を選択します。
3. Cloud and Edge Sites サービスの場合は、Global Log Receiver を選択します。
4. Global Log Receiver の追加ボタンをクリックします。



**ステップ 2: グローバルログレシーバーのプロパティを構成する**

Global Log Receiver セクションで以下を実行します。

1. Global Log Receiver セクション内で、メタデータセクションに名前を入力します。オプション: ラベルを設定し、説明を追加します。
2. Log Type フィールドで Request Logs または Security Events を選択します。注: デフォルトでリクエストログが設定されています。
3. 以下のオプションから、ネームスペースに基づいてストリームするイベントを選択します。
    a. Select logs from the current namespace - 共有ネームスペースからログをストリームします。 
    b. Select logs from all namespaces - すべてのネームスペースからログをストリームします。
    c. Select logs in specific namespaces - 指定したネームスペースからログをストリームします。表示されたネームスペースのリストにネームスペース名を入力します。複数のネームスペースを追加するには、Add item を選択します。注: ネームスペースは、分散クラウドテナント内のオブジェクトの論理的なグループ化と分離を提供します。 
4. Receiver Configuration ボックスで Datadog を選択します。Datadog レシーバーに以下を構成します。
    a. サイト名を datadoghq.com に設定します。
    b. Datadog に移動し、組織設定内で [API キーの作成][3]を行います。 
    c. API キーをコピーします。
    d.  F5 に戻り、Datadog の API キーを Datadog receiver フィールドに貼り付けます。 

**オプションステップ 3: 高度な設定の構成**

高度な設定には、バッチオプションと TLS の構成が含まれます。メッセージの最大バイト数や、ログのバッチがレシーバーに送信されるまでのタイムアウトなどの制限を適用することができます。

1. Show Advanced Fields トグルを選択します
2. Batch Options セクション内で
    a. Batch Timeout Options で Timeout Seconds を選択し、Timeout Seconds ボックスにタイムアウト値を入力します。 
    b. Batch Max Events で Max Events を選択し、Max Events のボックスに 32 から 2000 の値を入力します。 
    c. Batch Bytes で Max Bytes を選択し、Batch Bytes ボックスに 4096 から 1048576 の間の値を入力します。バッチサイズが指定されたバイトサイズと同じかそれ以上になると、ログが送信されます。 
3. TLS セクション内で
    a. TLS フィールドの Use TLS を選択します。 
    b. Trusted CA フィールドで Server CA Certificates を選択します。Server CA Certificates ボックスに、PEM または Base64 形式の証明書を入力します。 
    c. mTLS 構成で Enable mTLS を選択し、Client Certificate ボックスに PEM または Base64 形式のクライアント証明書を入力します。 
    d. Client Private Key フィールドで Configure を選択し、Type を Text にしたボックスに秘密鍵を入力します。 
    e. Blindfold を選択し、オペレーションが完了するのを待ち、Apply をクリックします。 

**ステップ 4: セットアップを終了する*

- Save & Exit を選択して、グローバルログレシーバーの作成を完了します。Datadog アカウントに[ログ][4]が受信されることを確認します。


## トラブルシューティング

ヘルプが必要ですか？[Datadog サポート][5]または [F5 サポート][6]にお問い合わせください。

## {{< partial name="whats-next/whats-next.html" >}}

[F5 Distributed Cloud Services][7] の詳細についてはこちらをご覧ください。

[1]: https://www.f5.com/cloud/products/distributed-cloud-console
[2]: https://youtu.be/VUtXCUngiw8
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[4]: https://app.datadoghq.com/logs
[5]: http://docs.datadoghq.com/help/
[6]: https://docs.cloud.f5.com/docs/support/support
[7]: https://www.f5.com/cloud