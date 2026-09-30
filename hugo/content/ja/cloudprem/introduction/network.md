---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: ドキュメント
  text: CloudPrem Ingress の設定
title: ネットワーク
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

このドキュメントでは、CloudPrem と Datadog がどのように通信するかを概説します。

### 既定の動作: CloudPrem 側から接続を開始する

既定では、CloudPrem は API キーを使って Datadog への WebSocket 接続を開始します。そのため、DNS レコードの追加やパブリック Ingress の設定は不要です。この構成は、受信リクエストを許可しない厳格なネットワーク ポリシーの環境に適しています。


### オプションの動作: パブリック Ingress を使う

CloudPrem を設定して、Datadog 側が接続できるようにパブリック Ingress をデプロイすることもできます。 

パブリック Ingress を使うと、Datadog のコントロール プレーンとクエリ サービスが、パブリック インターネット経由で CloudPrem クラスターを管理し、クエリを実行できるようになります。mTLS 認証により、CloudPrem gRPC API への安全なアクセスが提供されます。CloudPrem Ingress の詳細は、[設定ページ](/cloudprem/configure/ingress/) を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}