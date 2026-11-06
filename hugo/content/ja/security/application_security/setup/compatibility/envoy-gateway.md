---
code_lang: envoy-gateway
code_lang_weight: 40
title: Envoy Gateway の互換性要件
type: multi-code-lang
---
以下のテーブルは、指定された Datadog External Processor イメージバージョンに応じた、Envoy Gateway インテグレーションの App and API Protection 機能の一覧です。

| App and API Protection 機能 | Datadog External Processor イメージの最小バージョン|
|------------------------------------------------|---------------------------------------------------|
| Threat Detection                               | v2.4.0                                            |
| Threat Protection                              | v2.4.0                                            |
| ブロックされたリクエストへの対応をカスタマイズする | v2.4.0 |
| 非ブロッキング非同期モード (オブザーバビリティ) | サポート対象外 |
| API Security                                   | v2.4.0                                            |
| スタンドアロンの App and API Protection | v2.4.0 |
| ユーザーアクティビティイベントの自動追跡 | サポート対象外 |

### ボディ処理サポート {#body-processing-support}

Datadog External Processor サービスは、以下のペイロードタイプのリクエストボディおよびレスポンスボディの処理をサポートしています。

| ペイロードタイプ | Datadog External Processor イメージの最小バージョン |
|--------------|---------------------------------------------------|
| JSON         | v2.4.0                                            |

## Envoy Gateway バージョンのサポート {#envoy-gateway-version-support}

### サポートされている Envoy Gateway バージョン {#supported-envoy-gateway-versions}

Envoy Gateway は Envoy Proxy および Gateway API に依存しており、Kubernetes クラスター内で実行されます。Datadog は、EOL (サポート終了) を迎えていない Envoy Gateway バージョンのみをサポートしています。サポートされているバージョンとアップストリームの依存関係 (Envoy Proxy、Gateway API、Kubernetes) の最新リストについては、公式の「[Envoy Gateway 互換性マトリックス][1]」を参照してください。


### Envoy バージョンのサポート {#envoy-version-support}

App and API Protection 向けの Datadog Envoy インテグレーションは、すべての Envoy バージョンに搭載されているわけではない機能に依存しています。以下のテーブルは、各機能がどの Envoy バージョンでサポートされているかを示しています。

| 機能 | 最小 Envoy バージョン |
|---------|-----------------------|
| 外部処理フィルター | v1.27.0 |
| Observability モード | v1.30.0 |

## Datadog Envoy Gateway インテグレーションのサポート {#datadog-envoy-gateway-integration-support}

サポートされているのは、Linux バージョンおよび amd64 と arm64 の両アーキテクチャのみです。

<div class="alert alert-info">サポートされていない機能の追加をご希望の場合は、
お知らせください。<a
href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの簡単なフォームに詳細をご記入の上、送信してください
</a>。</div>

[1]: https://gateway.envoyproxy.io/news/releases/matrix/