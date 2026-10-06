---
aliases:
- /ja/cloudprem/introduction/network/
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: ドキュメント
  text: BYOC Logs のイングレス構成
title: ネットワーク
---
このドキュメントでは、BYOC (Bring Your Own Cloud) Logs と Datadog が相互に通信する仕組みの概要を示します。

## リバースコネクション (デフォルト) {#reverse-connection-default}

デフォルトでは、BYOC Logs の**サーチャー** Pod が、API キーを使用して Datadog へのアウトバウンド WebSocket コネクションを開始します。各サーチャー Pod は、`wss://<DD_SITE>/api/unstable/cloudprem-connection-gateway/connect` への独自のコネクションを維持します。

Datadog では、次の理由からこのセットアップを推奨しています。
ネットワークで- **インバウンドポートを開く必要がない**。
- **DNS レコードやパブリックイングレスが不要である**。
- インフラストラクチャーからコネクションが開始されるため、ファイアウォールやセキュリティポリシーが簡潔になる。

### リバースコネクションを通じて流れるデータ{#what-flows-through-the-reverse-connection}

| データ | 方向 | 説明 |
|------|-----------|-------------|
| 検索クエリ | Datadog → BYOC Logs | ログエクスプローラー、ダッシュボード、モニターからのクエリ |
| クエリ結果 | BYOC Logs → Datadog | 表示用に返される一致するログエントリ |
| インデックス管理 | Datadog → BYOC Logs | インデックスの作成、更新、削除 |

### ネットワーク要件 {#network-requirements}

サーチャー Pod には、Datadog サイト (例: `app.datadoghq.com`) への**アウトバウンド HTTPS (ポート 443)** アクセスが必要です。インバウンド接続は不要です。

環境で HTTP プロキシを使用している場合、BYOC Logs は `HTTPS_PROXY`、`ALL_PROXY`、`NO_PROXY` 環境変数を使用した標準のプロキシ構成をサポートします。

### Datadog に接続するポッド {#which-pods-connect-to-datadog}

**サーチャー** Pod のみがリバースコネクションを確立します。インデクサー、コントロールプレーン、メタストア、およびジャニターは、Datadog へのコネクションを開始しません。

<div class="alert alert-warning">リバースコネクションを使用する場合は、少なくとも 1 つのサーチャー Pod を稼働させておいてください。すべてのサーチャー Pod が利用できない場合や <code>0</code>にスケーリングされている場合、サーチャー Pod が起動して再接続するまで、Datadog でリバースコネクションを介したクエリやインデックス管理リクエストのルーティングはできません。</div>

## パブリックイングレス (オプション) {#public-ingress-optional}

BYOC Logs は、パブリックイングレスをデプロイするように構成することも可能です。これにより、Datadog が反対方向からコネクションを確立できるようになります。

パブリックイングレスにより、Datadog のコントロールプレーンとクエリサービスは、パブリックインターネット経由で BYOC Logs クラスターを管理およびクエリできるようになります。mTLS 認証を使用して、BYOC Logs gRPC API への安全なアクセスを提供します。BYOC Logs のイングレスに関する詳細については、[構成ページ](/byoc-logs/configure/ingress/)を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}