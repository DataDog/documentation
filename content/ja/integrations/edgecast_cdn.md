---
categories:
- キャッシュ
- モニター
dependencies: []
description: Datadog メトリクスを使用して Edgecast の Web トラフィックを監視します。
doc_link: https://docs.datadoghq.com/integrations/edgecast_cdn/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-edgecast-cdn-with-datadog/
  tag: ブログ
  text: Datadog で Edgecast CDN を監視する
git_integration_title: edgecast_cdn
has_logo: false
integration_id: ''
integration_title: Edgecast
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: edgecast_cdn
public_title: Datadog-Edgecast インテグレーション
short_description: Edgecast のメトリクスを収集します。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Edgecast は、エッジコンピューティング、アプリケーションセキュリティ、オーバーザトップビデオストリーミングのためのコンテンツデリバリネットワーク (CDN) やその他のソリューションを提供するグローバルネットワークプラットフォームです。Edgecast のメトリクスを収集し、オリジン別に Web トラフィックを監視することができます。

## 計画と使用

### Edgecast クライアントの作成 

1. [Edgecast VDMS アカウント][1]にログインし、**Clients** タブに移動します。
2. **Create New Client** をクリックすると、New Client モーダルが表示されます。
3. 識別するための一意のクライアント名を入力し、**Toggle all ec.analytics** をクリックして、このクライアントがメトリクスを収集できるようにします。
4. **Settings** に移動し、**JWT Expiration in Seconds** を 600 に変更します。
5. **Save** をクリックすると、このクライアントと変更した設定値が保存されます。

### ブラウザトラブルシューティング

1. Datadog の [Edgecast インテグレーションタイル][2]内のコンフィギュレーションタブに移動します。
2. Datadog でこのクライアントを識別するための一意の名前を入力します。
3. 上記で作成した Edgecast クライアントからクライアント ID とクライアントシークレットを貼り付けます。
   * 構成した Edgecast クライアントの **Quick Start** タブにある **Getting an access token** リクエストで、`client_id=` の後にあるクライアント ID を探します。
   * 構成した Edgecast クライアントの **Client Secrets** タブで、クライアントシークレットを探します。
4. オプションで、カスタムタグを追加して、このインテグレーションのために収集されたすべてのメトリクスに関連付けます。
   * メトリクスには、オリジンに関連する Edgecast 名が自動的にタグ付けされます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "edgecast_cdn" >}}


### ヘルプ

Edgecast インテグレーションには、イベントは含まれません。

### ヘルプ

Edgecast インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://id.vdms.io
[2]: https://app.datadoghq.com/integrations/edgecast-cdn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/edgecast_cdn/edgecast_cdn_metadata.csv
[4]: https://docs.datadoghq.com/ja/help