---
aliases:
- /ja/cloudprem/configure/ingress/
description: BYOC Logs デプロイメントのイングレスコントローラーの構成および管理方法を説明します。
further_reading:
- link: /byoc-logs/ingest/
  tag: ドキュメント
  text: ログ取り込みの設定
- link: /byoc-logs/operate/monitoring/
  tag: ドキュメント
  text: BYOC Logs を監視する
title: BYOC Logs イングレス構成
---
## 概要{#overview}

イングレスは、BYOC (Bring Your Own Cloud) Logs デプロイメントの重要なコンポーネントです。Helm チャートは、パブリックイングレスと内部イングレスと呼ばれる 2 つのイングレス構成を自動的に作成します。AWS Load Balancer Controller がクラスターにインストールされている場合、イングレス構成ごとに 1 つの ALB をプロビジョニングします。各ロードバランサーは、イングレスアノテーションを使用してさらに構成できます。

## パブリックイングレス{#public-ingress}

<div class="alert alert-danger">BYOC Logs gRPC API エンドポイント (パスが <code>/cloudprem</code>で始まるもの) のみが、相互 TLS 認証を実行します。パブリックイングレスを通じて他のエンドポイントを公開すると、認証なしでインターネット経由のアクセスが可能になるため、セキュリティリスクが生じます。非 gRPC エンドポイントは、常に内部イングレスを使用してください。</div>

パブリックイングレスは、Datadog がパブリックインターネット経由で BYOC Logs クラスターを管理およびクエリするために不可欠です。これは、以下のメカニズムを通じて BYOC Logs gRPC API への安全なアクセスを提供します。
- Datadog サービスからのトラフィックを受け入れる、インターネット向けの AWS Application Load Balancer (ALB) を作成します
- ロードバランサーレベルで TLS 暗号化と終端処理を実装します
- ALB と BYOC Logs クラスター間の通信に HTTP/2 (gRPC) を使用します
- Datadog サービスが有効なクライアント証明書を提示する必要がある、相互 TLS (mTLS) 認証を要求します
- ALB を TLS パススルーモードで構成し、`X-Amzn-Mtls-Clientcert` ヘッダーを使用してクライアント証明書を BYOC Logs ポッドに転送します
- 有効なクライアント証明書または証明書ヘッダーがないリクエストを拒否します

この設定により、認証された Datadog サービスのみが BYOC Logs クラスターにアクセスできるようになり、同時にエンドツーエンドの安全な暗号化通信が維持されます。

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="mTLS 認証を使用してインターネット向けの AWS ALB 経由で Datadog サービスが接続して、BYOC Logs gRPC API にアクセスする BYOC Logs パブリックイングレスアーキテクチャを示す図" style="width:100%;" >}}

### IP 許可リスト化{#ip-allowlisting}

Datadog は、固定 IP 範囲のセットを使用して BYOC Logs クラスターに接続します。この IP 範囲は、各 Datadog サイトについて Datadog の [IP Ranges API][1] (具体的には「webhooks」セクション) から取得できます。たとえば、datadoghq.eu サイトの IP 範囲を取得するには、次のように実行できます。

```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## 内部イングレス{#internal-ingress}

内部イングレスにより、Datadog Agents や環境内の他のログコレクターからの HTTP 経由のログ取り込みが可能になります。

{{< img src="/cloudprem/ingress/internal_ingress.png" alt=" Helm チャートによってプロビジョニングされた ALB を使用する内部イングレス" style="width:100%;" >}}

デフォルトでは、このチャートは内部 AWS Application Load Balancer (ALB) を作成し、要求された API エンドポイントパスに基づいて HTTP トラフィックを適切な BYOC Logs サービスにルーティングします。ただし、独自のイングレスコントローラー (HAProxy、NGINX、Traefik など) を使用する場合は、デフォルトの内部 ALB を無効にし、以下のルーティングルールでコントローラーを構成できます。

```
rules:
- http:
    paths:
      # Ingest (Quickwit, ES, Datadog) endpoints to indexers
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
      # Index management API endpoints to metastores
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-metastore
            port:
              name: rest
      # Everything else to searchers
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-searcher
            port:
              name: rest

```

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="indexer、metastore、searcher サービスへのパスルーティングを示す、NGINX イングレスコントローラーを使用した BYOC Logs 内部イングレス構成" style="width:100%;" >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/ip-ranges/