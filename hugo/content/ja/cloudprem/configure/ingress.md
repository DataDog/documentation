---
description: CloudPrem デプロイメント向けに Ingress コントローラーを設定 / 管理する方法を説明します。
further_reading:
- link: /cloudprem/ingest/
  tag: ドキュメント
  text: ログ取り込みを設定する
- link: /cloudprem/operate/monitoring/
  tag: ドキュメント
  text: CloudPrem を監視する
title: CloudPrem Ingress の設定
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

Ingress は、CloudPrem デプロイメントの中でも特に重要なコンポーネントです。Helm チャートは、public ingress と internal ingress という 2 つの Ingress 設定を自動的に作成します。クラスターに AWS Load Balancer Controller がインストールされている場合は、それぞれの Ingress 設定に対して 1 つずつ ALB がプロビジョニングされます。各ロード バランサーは、Ingress アノテーションを使ってさらに細かく調整できます。

## パブリック Ingress

<div class="alert alert-danger"><code>/cloudprem</code> で始まる CloudPrem gRPC API エンドポイントだけが、相互 TLS 認証を行います。それ以外のエンドポイントをパブリック Ingress 経由で公開すると、認証なしでインターネットからアクセスできてしまうため、セキュリティ上のリスクになります。gRPC 以外のエンドポイントは、必ず内部 Ingress のみに限定してください。</div>

パブリック Ingress は、Datadog 側のコントロール プレーンとクエリ サービスが、パブリック インターネット経由で CloudPrem クラスターを管理し、クエリを実行できるようにするために欠かせません。これにより、次の仕組みを通じて CloudPrem の gRPC API へ安全にアクセスできます:
- Datadog サービスからのトラフィックを受け付ける、インターネット向けの AWS Application Load Balancer (ALB) を作成します。
- TLS はロード バランサー側で終端されます。
- ALB と CloudPrem クラスターの間の通信には HTTP/2 (gRPC) を使用します。
- Datadog のサービスが有効なクライアント証明書を提示する必要がある相互 TLS (mTLS) 認証を必須にします。
- ALB を TLS passthrough モードで構成し、クライアント証明書を `X-Amzn-Mtls-Clientcert` ヘッダーに載せて CloudPrem Pod に転送します。
- 有効なクライアント証明書がない、または証明書ヘッダーが欠けているリクエストを拒否します。

この構成により、Datadog の認証済みサービスだけが CloudPrem クラスターにアクセスでき、通信全体を通じて安全な暗号化も維持されます。

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="mTLS 認証を使って、インターネット向けの AWS ALB 経由で Datadog サービスが CloudPrem gRPC API に接続する、CloudPrem パブリック Ingress のアーキテクチャ図" style="width:100%;" >}}

### IP 許可リスト

Datadog のコントロール プレーンとクエリ サービスは、固定の IP レンジ群を使って CloudPrem クラスターに接続します。これらの IP レンジは、Datadog の各 site ごとに Datadog の [IP Ranges API][1] から取得でき、具体的には "webhooks" セクションに含まれています。たとえば datadoghq.eu サイトの IP レンジを取得するには、次のコマンドを実行します:
```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## 内部 Ingress

内部 Ingress では、Datadog Agent や、環境内のその他のログ コレクターから、HTTP 経由でログを取り込みます。

{{< img src="/cloudprem/ingress/internal_ingress.png" alt="Helm チャートによって ALB がプロビジョニングされた内部 Ingress" style="width:100%;" >}}

既定では、チャートは内部向けの AWS Application Load Balancer (ALB) を作成し、要求された API エンドポイント パスに応じて HTTP トラフィックを適切な CloudPrem サービスへルーティングします。一方、HAProxy、NGINX、Traefik など、独自の Ingress コントローラーを使いたい場合は、既定の内部 ALB を無効にして、次のルーティング ルールでコントローラーを設定できます:

```
rules:
- http:
    paths:
      # 取り込み (Quickwit、ES、Datadog) 用エンドポイントは indexer へ
      - path: /api/v1/*/ingest
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/bulk
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/*/_bulk
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v2/logs
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      # インデックス管理 API のエンドポイントは metastore へ
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-metastore
            port:
              name: rest
      # それ以外はすべて searcher へ
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-searcher
            port:
              name: rest

```

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="パス ベース ルーティングで indexer、metastore、searcher に振り分ける、NGINX Ingress Controller を使った CloudPrem 内部 Ingress の構成図" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/ip-ranges/