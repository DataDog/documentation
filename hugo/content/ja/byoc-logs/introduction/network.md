---
aliases:
- /ja/cloudprem/introduction/network/
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: ドキュメント
  text: BYOC Logs イングレス構成
title: ネットワーク
---
このドキュメントでは、BYOC (Bring Your Own Cloud) Logs と Datadog がどのように通信するかの概要を説明します。

## リバース接続 (デフォルト){#reverse-connection-default}

デフォルトでは、BYOC Logs の**サーチャー**ポッドは、API キーを使用して Datadog へのアウトバウンド WebSocket 接続を開始します。各サーチャーポッドは、`wss://<DD_SITE>/api/unstable/cloudprem-connection-gateway/connect` への独自の接続を維持します。

Datadog がこの設定を推奨する理由は以下の通りです。
ネットワーク内で- **インバウンドポートを開く必要はありません**。
- **DNS レコードやパブリックイングレスは不要です。**
- 接続はあなたのインフラストラクチャーから開始されるため、ファイアウォールやセキュリティポリシーが簡素化されます。

### リバース接続を介して流れるデータ{#what-flows-through-the-reverse-connection}

| データ | 方向 | 説明 |
|------|-----------|-------------|
| 検索クエリ | Datadog → BYOC Logs | ログエクスプローラー、ダッシュボード、モニターからのクエリ |
| クエリ結果 | BYOC Logs → Datadog | 表示用に返される一致するログエントリ |
| インデックス管理 | Datadog → BYOC Logs | インデックスの作成、更新、削除 |

### ネットワーク要件{#network-requirements}

サーチャーポッドには、Datadog サイト (例: `app.datadoghq.com`) への**アウトバウンド HTTPS (ポート 443)** アクセスが必要です。インバウンド接続は不要です。

環境で HTTP プロキシを使用している場合、BYOC Logs は`HTTPS_PROXY`、`ALL_PROXY`、および `NO_PROXY` 環境変数を使用した標準的なプロキシ構成をサポートしています。

### どのポッドが Datadog に接続するか{#which-pods-connect-to-datadog}

**サーチャー**ポッドのみがリバース接続を確立します。インデクサー、コントロールプレーン、メタストア、およびジャニターは、Datadog への接続を開始しません。

<div class="alert alert-warning">リバース接続を使用する場合は、少なくとも 1 つのサーチャーポッドを実行しておいてください。すべてのサーチャーポッドが利用できない、または <code>0</code>にスケールダウンされている場合、サーチャーポッドが起動して再接続されるまで、Datadog はリバース接続を介してクエリやインデックス管理リクエストをルーティングできません。</div>

## パブリックイングレス (オプション){#public-ingress-optional}

BYOC Logs を構成してパブリックイングレスをデプロイし、Datadog が反対方向の接続を確立できるようにすることも可能です。

パブリックイングレスにより、Datadog はパブリックインターネット経由で BYOC Logs クラスターを管理およびクエリできるようになります。これは、mTLS 認証を使用して BYOC Logs gRPC API への安全なアクセスを提供します。BYOC Logs イングレスの詳細については、その[構成ページ][1]をご覧ください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/byoc-logs/configure/ingress/