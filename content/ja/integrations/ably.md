---
app_id: ably
categories:
- cloud
- metrics
custom_kind: integration
description: Ably メトリクスを収集してグラフ化
integration_version: 1.0.0
media:
- caption: Ably - ダッシュボード
  image_url: images/ably-dashboard.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Ably
---
## 概要

[Ably](https://ably.com) プラットフォームは、世界中の高いスケーラビリティが求められる Web / モバイル アプリケーションで、マルチ プレイヤー、チャット、データ 同期、データ ブロードキャスト、通知といったリアル タイムのユース ケースを支えています。API を利用すれば、エンジニアはサーバーやクラウド インフラの調達・運用に追われることなく、コア 機能の開発に集中できます。

Ably Datadog Integration は、[Ably 統計](https://ably.com/docs/general/statistics) のメトリクスを Datadog アカウントへ直接送信します。

Ably の Datadog Integration を使うと、次のことができます。

- Datadog でほかの主要メトリクスと並べて [Ably 統計](https://ably.com/docs/general/statistics) を活用する
- Datadog ダッシュ ボードで Ably のメッセージ、チャネル、接続の利用状況を関連付け、チームで分析する
- Datadog で Ably の利用統計を表示し、追跡する

## セット アップ

- **Datadog で**: **Integrations** に移動し、Ably タイルを選択して **Install Integration** をクリックします。

- **Connect Accounts** をクリックして、このインテグレーションの認可を開始します。[Ably](https://ably.com) にリダイレクトされます。

- **Ably で**: ログインし、**Your Apps** に移動します。

![Ably スクリーン ショット](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/your-apps.png)

- **Datadog Integration** を設定したい **Ably App** を選択し、**Integrations** をクリックします。

![Ably スクリーン ショット](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/integrations.png)

- **Connect to Datadog** ボタンをクリックして、このインテグレーションの認可を開始します。

- Datadog の認可ページにリダイレクトされます。

- **Authorise** をクリックしてセット アップを完了すると、Ably サイトに戻ります。

![Ably スクリーン ショット](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/setup-integration.png)

これで Ably App の統計が Datadog に表示されます。

## 収集データ

Ably の統計の詳細については、[アプリケーション 統計 ドキュメント](https://ably.com/docs/general/statistics) を参照してください。

### メトリクス

| | |
| --- | --- |
| **ably.apiRequests.all.failed** <br>(count) | 失敗したリクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.all.refused** <br>(count) | 拒否されたリクエストの総数 (アカウント制限による)。<br>_request として表示_ |
| **ably.apiRequests.all.succeeded** <br>(count) | 実行されたリクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.other.failed** <br>(count) | トークンおよび Push リクエストを除いた、失敗したリクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.other.refused** <br>(count) | トークンおよび Push リクエストを除いた、拒否されたリクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.other.succeeded** <br>(count) | トークンおよび Push リクエストを除いた、実行されたリクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.push.failed** <br>(count) | 失敗した Push リクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.push.refused** <br>(count) | 拒否された Push リクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.push.succeeded** <br>(count) | 実行された Push リクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.tokenRequests.failed** <br>(count) | 失敗したトークン リクエストの総数。<br>_request として表示_ |
| **ably.apiRequests.tokenRequests.refused** <br>(count) | 拒否されたトークン リクエストの総数 (権限またはレート制限による)。<br>_request として表示_ |
| **ably.apiRequests.tokenRequests.succeeded** <br>(count) | 実行されたトークン リクエストの総数。<br>_request として表示_ |
| **ably.channels.mean** <br>(gauge) | アクティブ チャネル数の平均。<br>_item として表示_ |
| **ably.channels.min** <br>(gauge) | アクティブ チャネル数の最小値。<br>_item として表示_ |
| **ably.channels.opened** <br>(count) | オープンされたチャネルの総数。<br>_item として表示_ |
| **ably.channels.peak** <br>(gauge) | アクティブ チャネル数のピーク値。<br>_item として表示_ |
| **ably.channels.refused** <br>(count) | 権限が原因で失敗したチャネル アタッチ リクエストの総数。<br>_request として表示_ |
| **ably.connections.all.mean** <br>(gauge) | 接続数の平均。<br>_connection として表示_ |
| **ably.connections.all.min** <br>(gauge) | 接続数の最小値。<br>_connection として表示_ |
| **ably.connections.all.opened** <br>(count) | オープンされた接続の総数。<br>_connection として表示_ |
| **ably.connections.all.peak** <br>(gauge) | 接続数のピーク値。<br>_connection として表示_ |
| **ably.connections.all.refused** <br>(count) | 拒否された接続の総数。<br>_connection として表示_ |
| **ably.messages.all.all.count** <br>(count) | メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.all.all.data** <br>(count) | メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.all.all.uncompressedData** <br>(count) | 圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.all.messages.count** <br>(count) | プレゼンス メッセージを除いたメッセージ数の総数。<br>_message として表示_ |
| **ably.messages.all.messages.data** <br>(count) | プレゼンス メッセージを除いたメッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.all.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.all.presence.count** <br>(count) | プレゼンス メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.all.presence.data** <br>(count) | プレゼンス メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.all.presence.uncompressedData** <br>(count) | 圧縮前のプレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.all.all.count** <br>(count) | インバウンド メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.all.all.data** <br>(count) | インバウンド メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.all.all.uncompressedData** <br>(count) | 圧縮前のインバウンド メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.all.messages.count** <br>(count) | プレゼンス メッセージを除いたインバウンド メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.all.messages.data** <br>(count) | プレゼンス メッセージを除いたインバウンド メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.all.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた圧縮前のインバウンド メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.all.presence.count** <br>(count) | インバウンド プレゼンス メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.all.presence.data** <br>(count) | インバウンド プレゼンス メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.all.presence.uncompressedData** <br>(count) | 圧縮前のインバウンド プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.realtime.all.count** <br>(count) | インバウンド リアル タイム メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.realtime.all.data** <br>(count) | インバウンド リアル タイム メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.realtime.all.uncompressedData** <br>(count) | 圧縮前のインバウンド リアル タイム メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.realtime.messages.count** <br>(count) | プレゼンス メッセージを除いたインバウンド リアル タイム メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.realtime.messages.data** <br>(count) | プレゼンス メッセージを除いたインバウンド リアル タイム メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.realtime.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた圧縮前のインバウンド リアル タイム メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.realtime.presence.count** <br>(count) | インバウンド リアル タイム プレゼンス メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.realtime.presence.data** <br>(count) | インバウンド リアル タイム プレゼンス メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.realtime.presence.uncompressedData** <br>(count) | 圧縮前のインバウンド リアル タイム プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.rest.all.count** <br>(count) | インバウンド REST メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.rest.all.data** <br>(count) | インバウンド REST メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.rest.all.uncompressedData** <br>(count) | 圧縮前のインバウンド REST メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.rest.messages.count** <br>(count) | プレゼンス メッセージを除いたインバウンド REST メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.rest.messages.data** <br>(count) | プレゼンス メッセージを除いたインバウンド REST メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.rest.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、圧縮前のインバウンド REST メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.inbound.rest.presence.count** <br>(count) | インバウンド REST プレゼンス メッセージ数の総数 (クライアントから Ably サービスが受信)。<br>_message として表示_ |
| **ably.messages.inbound.rest.presence.data** <br>(count) | インバウンド REST プレゼンス メッセージの総サイズ (クライアントから Ably サービスが受信)。<br>_byte として表示_ |
| **ably.messages.inbound.rest.presence.uncompressedData** <br>(count) | 圧縮前のインバウンド REST プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。クライアントから Ably サービスが受信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.all.all.count** <br>(count) | アウトバウンド メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.all.all.data** <br>(count) | アウトバウンド メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.all.all.uncompressedData** <br>(count) | 圧縮前のアウトバウンド メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.all.messages.count** <br>(count) | プレゼンス メッセージを除いたアウトバウンド メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.all.messages.data** <br>(count) | プレゼンス メッセージを除いたアウトバウンド メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.all.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、圧縮前のアウトバウンド メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.all.presence.count** <br>(count) | アウトバウンド プレゼンス メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.all.presence.data** <br>(count) | アウトバウンド プレゼンス メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.all.presence.uncompressedData** <br>(count) | 圧縮前のアウトバウンド プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.externalQueue.all.count** <br>(count) | Reactor Firehose を使って Ably サービスから外部ターゲットへ送信されたメッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.externalQueue.all.data** <br>(count) | Reactor Firehose を使って Ably サービスから外部ターゲットへ送信されたメッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.externalQueue.all.uncompressedData** <br>(count) | Reactor Firehose を使って Ably サービスから外部ターゲットへ送信された、圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.externalQueue.messages.count** <br>(count) | プレゼンス メッセージを除いた、Reactor Firehose によるメッセージ数の総数 (Ably サービスから外部ターゲットへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.externalQueue.messages.data** <br>(count) | プレゼンス メッセージを除いた、Reactor Firehose によるメッセージの総サイズ (Ably サービスから外部ターゲットへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.externalQueue.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、Reactor Firehose による圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスから外部ターゲットへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.externalQueue.presence.count** <br>(count) | Reactor Firehose を使って Ably サービスから外部ターゲットへ送信されたプレゼンス メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.externalQueue.presence.data** <br>(count) | Reactor Firehose を使って Ably サービスから外部ターゲットへ送信されたプレゼンス メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.externalQueue.presence.uncompressedData** <br>(count) | Reactor Firehose を使って Ably サービスから外部ターゲットへ送信された、圧縮前のプレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.httpEvent.all.count** <br>(count) | HTTP トリガーによって送信されたメッセージ数の総数 (通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数)。<br>_message として表示_ |
| **ably.messages.outbound.httpEvent.all.data** <br>(count) | HTTP トリガーによって送信されたメッセージの総サイズ (通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数)。<br>_byte として表示_ |
| **ably.messages.outbound.httpEvent.all.uncompressedData** <br>(count) | HTTP トリガーによって送信されたメッセージの圧縮前総サイズ (デルタ圧縮などの圧縮を除外。通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.httpEvent.messages.count** <br>(count) | プレゼンス メッセージを除いた、HTTP トリガーによって送信されたメッセージ数の総数 (通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数)。<br>_message として表示_ |
| **ably.messages.outbound.httpEvent.messages.data** <br>(count) | プレゼンス メッセージを除いた、HTTP トリガーによって送信されたメッセージの総サイズ (通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数)。<br>_message として表示_ |
| **ably.messages.outbound.httpEvent.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、HTTP トリガーによって送信されたメッセージの圧縮前総サイズ (デルタ圧縮などの圧縮を除外。通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_message として表示_ |
| **ably.messages.outbound.httpEvent.presence.count** <br>(count) | HTTP トリガーによって送信されたプレゼンス メッセージ数の総数 (通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数)。<br>_message として表示_ |
| **ably.messages.outbound.httpEvent.presence.data** <br>(count) | HTTP トリガーによって送信されたプレゼンス メッセージの総サイズ (通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数)。<br>_byte として表示_ |
| **ably.messages.outbound.httpEvent.presence.uncompressedData** <br>(count) | HTTP トリガーによって送信されたプレゼンス メッセージの圧縮前総サイズ (デルタ圧縮などの圧縮を除外。通常は AWS Lambda、Google Cloud Functions、Azure Functions などのサービス上のサーバーレス関数。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.push.all.count** <br>(count) | Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた Push メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.push.all.data** <br>(count) | Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた Push メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.push.all.uncompressedData** <br>(count) | Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた、圧縮前の Push メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.push.messages.count** <br>(count) | プレゼンス メッセージを除いた、Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた Push メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.push.messages.data** <br>(count) | プレゼンス メッセージを除いた、Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた Push メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.push.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた、圧縮前の Push メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.push.presence.count** <br>(count) | Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた Push プレゼンス メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.push.presence.data** <br>(count) | Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた Push プレゼンス メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.push.presence.uncompressedData** <br>(count) | Push Notifications のトランスポート (FCM や APNS など) を介してデバイスへプッシュされた、圧縮前の Push プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.realtime.all.count** <br>(count) | アウトバウンド リアル タイム メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.realtime.all.data** <br>(count) | アウトバウンド リアル タイム メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.realtime.all.uncompressedData** <br>(count) | 圧縮前のアウトバウンド リアル タイム メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.realtime.messages.count** <br>(count) | プレゼンス メッセージを除いたアウトバウンド リアル タイム メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.realtime.messages.data** <br>(count) | プレゼンス メッセージを除いたアウトバウンド リアル タイム メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.realtime.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、圧縮前のアウトバウンド リアル タイム メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.realtime.presence.count** <br>(count) | アウトバウンド リアル タイム プレゼンス メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.realtime.presence.data** <br>(count) | アウトバウンド リアル タイム プレゼンス メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.realtime.presence.uncompressedData** <br>(count) | 圧縮前のアウトバウンド リアル タイム プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.rest.all.count** <br>(count) | アウトバウンド REST メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.rest.all.data** <br>(count) | アウトバウンド REST メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.rest.all.uncompressedData** <br>(count) | 圧縮前のアウトバウンド REST メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.rest.messages.count** <br>(count) | プレゼンス メッセージを除いたアウトバウンド REST メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.rest.messages.data** <br>(count) | プレゼンス メッセージを除いたアウトバウンド REST メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.rest.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、圧縮前のアウトバウンド REST メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.rest.presence.count** <br>(count) | アウトバウンド REST プレゼンス メッセージ数の総数 (Ably サービスからクライアントへ送信)。<br>_message として表示_ |
| **ably.messages.outbound.rest.presence.data** <br>(count) | アウトバウンド REST プレゼンス メッセージの総サイズ (Ably サービスからクライアントへ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.rest.presence.uncompressedData** <br>(count) | 圧縮前のアウトバウンド REST プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスからクライアントへ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.sharedQueue.all.count** <br>(count) | Reactor Queue へ送信されたメッセージ数の総数 (Ably サービスから Reactor Queue へ送信)。<br>_message として表示_ |
| **ably.messages.outbound.sharedQueue.all.data** <br>(count) | Reactor Queue へ送信されたメッセージの総サイズ (Ably サービスから Reactor Queue へ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.sharedQueue.all.uncompressedData** <br>(count) | Reactor Queue へ送信された、圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスから Reactor Queue へ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.sharedQueue.messages.count** <br>(count) | プレゼンス メッセージを除いた、Reactor Queue へ送信されたメッセージ数の総数 (Ably サービスから Reactor Queue へ送信)。<br>_message として表示_ |
| **ably.messages.outbound.sharedQueue.messages.data** <br>(count) | プレゼンス メッセージを除いた、Reactor Queue へ送信されたメッセージの総サイズ (Ably サービスから Reactor Queue へ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.sharedQueue.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、Reactor Queue へ送信された圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスから Reactor Queue へ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.sharedQueue.presence.count** <br>(count) | Reactor Queue へ送信されたプレゼンス メッセージ数の総数 (Ably サービスから Reactor Queue へ送信)。<br>_message として表示_ |
| **ably.messages.outbound.sharedQueue.presence.data** <br>(count) | Reactor Queue へ送信されたプレゼンス メッセージの総サイズ (Ably サービスから Reactor Queue へ送信)。<br>_byte として表示_ |
| **ably.messages.outbound.sharedQueue.presence.uncompressedData** <br>(count) | Reactor Queue へ送信された、圧縮前のプレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。Ably サービスから Reactor Queue へ送信。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.webhook.all.count** <br>(count) | Webhooks を使用して Ably サービスからクライアントへ送信された Webhook メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.webhook.all.data** <br>(count) | Webhooks を使用して Ably サービスからクライアントへ送信された Webhook メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.webhook.all.uncompressedData** <br>(count) | Webhooks を使用して Ably サービスからクライアントへ送信された、圧縮前の Webhook メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.webhook.messages.count** <br>(count) | プレゼンス メッセージを除いた、Webhooks を使用して Ably サービスからクライアントへ送信された Webhook メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.webhook.messages.data** <br>(count) | プレゼンス メッセージを除いた、Webhooks を使用して Ably サービスからクライアントへ送信された Webhook メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.webhook.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、Webhooks を使用して Ably サービスからクライアントへ送信された圧縮前の Webhook メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.outbound.webhook.presence.count** <br>(count) | Webhooks を使用して Ably サービスからクライアントへ送信された Webhook プレゼンス メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.outbound.webhook.presence.data** <br>(count) | Webhooks を使用して Ably サービスからクライアントへ送信された Webhook プレゼンス メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.outbound.webhook.presence.uncompressedData** <br>(count) | Webhooks を使用して Ably サービスからクライアントへ送信された、圧縮前の Webhook プレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.persisted.all.count** <br>(count) | 設定したチャネル ルールに基づいて永続化されたメッセージ数の総数。<br>_message として表示_ |
| **ably.messages.persisted.all.data** <br>(count) | 設定したチャネル ルールに基づいて永続化されたメッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.persisted.all.uncompressedData** <br>(count) | 設定したチャネル ルールに基づいて永続化された、圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.persisted.messages.count** <br>(count) | プレゼンス メッセージを除いた、設定したチャネル ルールに基づいて永続化されたメッセージ数の総数。<br>_message として表示_ |
| **ably.messages.persisted.messages.data** <br>(count) | プレゼンス メッセージを除いた、設定したチャネル ルールに基づいて永続化されたメッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.persisted.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、設定したチャネル ルールに基づいて永続化された圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.persisted.presence.count** <br>(count) | 設定したチャネル ルールに基づいて永続化されたプレゼンス メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.persisted.presence.data** <br>(count) | 設定したチャネル ルールに基づいて永続化されたプレゼンス メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.persisted.presence.uncompressedData** <br>(count) | 設定したチャネル ルールに基づいて永続化された、圧縮前のプレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.processed.all.count** <br>(count) | 設定したチャネル ルールに基づいて処理されたメッセージ数の総数。<br>_message として表示_ |
| **ably.messages.processed.all.data** <br>(count) | 設定したチャネル ルールに基づいて処理されたメッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.processed.all.uncompressedData** <br>(count) | 設定したチャネル ルールに基づいて処理された、圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.processed.messages.count** <br>(count) | プレゼンス メッセージを除いた、設定したチャネル ルールに基づいて処理されたメッセージ数の総数。<br>_message として表示_ |
| **ably.messages.processed.messages.data** <br>(count) | プレゼンス メッセージを除いた、設定したチャネル ルールに基づいて処理されたメッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.processed.messages.uncompressedData** <br>(count) | プレゼンス メッセージを除いた、設定したチャネル ルールに基づいて処理された圧縮前のメッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.messages.processed.presence.count** <br>(count) | 設定したチャネル ルールに基づいて処理されたプレゼンス メッセージ数の総数。<br>_message として表示_ |
| **ably.messages.processed.presence.data** <br>(count) | 設定したチャネル ルールに基づいて処理されたプレゼンス メッセージの総サイズ。<br>_byte として表示_ |
| **ably.messages.processed.presence.uncompressedData** <br>(count) | 設定したチャネル ルールに基づいて処理された、圧縮前のプレゼンス メッセージ総サイズ (デルタ圧縮などの圧縮を除外。詳しくは https://ably.com/documentation/realtime/channels/channel-parameters/deltas を参照)。<br>_byte として表示_ |
| **ably.push.channelMessages** <br>(count) | Push チャネル メッセージ数の総数。<br>_message として表示_ |
| **ably.push.directPublishes** <br>(count) | ダイレクト パブリッシュの総数。<br>_operation として表示_ |
| **ably.push.notifications.all** <br>(count) | Push 通知数の総数。<br>_message として表示_ |
| **ably.push.notifications.delivered** <br>(count) | 配信された Push 通知数の総数。<br>_message として表示_ |
| **ably.push.notifications.failed** <br>(count) | 失敗した Push 通知数の総数。<br>_message として表示_ |
| **ably.push.notifications.refused** <br>(count) | 拒否された Push 通知数の総数。<br>_message として表示_ |

### イベント

Ably インテグレーションにはイベントは含まれません。

### サービス チェック

Ably インテグレーションにはサービス チェックは含まれません。

## アンインストール

- **Ably で**: https://ably.com にアクセスしてログインし、**Your Apps** に移動します。

- **Datadog Integration** をアンインストールしたい Ably App を選択します。

- **Datadog Integration** セクションの **Remove** ボタンをクリックします。

![Ably スクリーン ショット](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/uninstall-integration.png)

以後、Ably App の統計は Datadog へ送信されません。

- **Datadog で**: **Integrations** に移動し、Ably タイルを選択して **Uninstall Integration** をクリックします。

このインテグレーションをアンインストールすると、これまでの認可はすべて取り消されます。

さらに、[API Keys ページ](https://app.datadoghq.com/organization-settings/api-keys?filter=Ably) でインテグレーション名を検索し、このインテグレーションに関連付けられたすべての API キーが無効化されていることを確認してください。

## サポート

お困りですか？ [Ably サポート](https://ably.com/support) にお問い合わせください。