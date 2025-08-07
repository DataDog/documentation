---
app_id: ngrok
categories:
- developer tools
- クラウド
custom_kind: インテグレーション
description: ngrok HTTP イベントで貴重なアプリケーションインサイトを視覚化
further_reading:
- link: https://ngrok.com/solutions
  tag: その他
  text: og:title
integration_version: 1.0.0
media:
- caption: ngrok HTTP リクエストイベント概要ダッシュボード
  image_url: images/dashboard.png
  media_type: image
- caption: ngrok サービスプラットフォーム
  image_url: images/diag1.png
  media_type: image
- caption: ngrok + datadog
  image_url: images/diag2.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: ngrok
---
## 概要

ngrok は、認証、ロードバランシング、およびその他の重要な制御を備えたグローバルなプレゼンスポイントを使用して、あらゆるクラウド、プライベートネットワーク、またはデバイスにあるアプリケーションに即座にイングレスを提供します。

The ngrok platform includes a Datadog event destination integration. With ngrok HTTP events, you can visualize valuable application insights using Datadog Log Management including HTTP status code breakdown, top client IPs and most requested resources. You can use the Datadog HTTPS logging endpoint to set up the integration on the [ngrok dashboard UI](https://dashboard.ngrok.com).

## セットアップ

ngrok イベントを Datadog に転送するには、2 つの構成が必要です。

- ngrok Event Subscription: 転送されるイベントを含みます
- ngrok Event Destination: Event Subscriptionで定義されたイベントの転送先の構成。

The following example demonstrates how to configure an Event Subscription with a Datadog Event Destination for HTTP request events. For step-by-step instructions, see the [ngrok Datadog Event Destination documentation](https://ngrok.com/docs/integrations/datadog/event-destination/).

**ステップ 1: ngrok Event Subscription を作成する**

1. ngrok Dashboard Console で、Events ページに移動します。
1. "New Subscription" を選択します。
1. Description for Subscription を入力し、"Add Source" を選択します。
1. リストから "http_request_complete.v0" を選択し、Add Event Source を選択します。

**ステップ 2: Event Destination プロパティを構成する**

手順は、以前に作成した Event Subscription 構成内で実行されます。

1. "Event Destination" タブに移動し、"Add Destination" を選択します。
1. ドロップダウンメニューから Datadog を選択し、正しい情報を入力します。
   a. Select the correct [Datadog site](https://docs.datadoghq.com/getting_started/site/) for your data.\
   b. Navigate to Datadog and [create an API key](https://docs.datadoghq.com/account_management/api-app-keys/) within the organization settings.\
   c. Copy the API key and paste into the API Key field.\
   d. Optionally, define a Service Name, this be added as a key to the event data as **service:value**.\
   e. Optionally, define DD Tags, these are `key:value` pairs to be added as Datadog tags to the event data.\
   f. Optional, define a description, this is locally significant and helps identify the Datadog Event Destination.
1. "Send Test Event" を選択します。
1. 成功のメッセージが表示されたら、 "Done" を選択します。 エラーが表示された場合は、Datadog サイトと API キーが正しいことを確認します。

**Step 3: Create Datadog Log Facets**
Once logs begin to arrive, create [log facets](https://docs.datadoghq.com/logs/explorer/facets/) for data analysis and dashboard visualization. For more information about creating log facets, see the [Log Facets documentation](https://docs.datadoghq.com/logs/explorer/facets/#create-facets).

以下のフィールドに対してファセットを作成します。

- event_type
- object.conn.server_name
- object.conn.client_ip
- object.http.response.status_code
- object.http.request.method
- object.http.request.url.path

## トラブルシューティング

Need help? Contact [ngrok Support](mailto:support@ngrok.com) or reference the [ngrok documentation](https://ngrok.com/docs/integrations/datadog/).

## 参考情報

Learn more about [ngrok](https://ngrok.com/solutions).