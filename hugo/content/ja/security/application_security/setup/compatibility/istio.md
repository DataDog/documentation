---
code_lang: istio
code_lang_weight: 40
title: Istio 互換性要件
type: multi-code-lang
---
以下のテーブルは、指定された Datadog External Processor イメージバージョンに応じた、Istio インテグレーションの App and API Protection 機能の一覧です。

| App and API Protection 機能 | Datadog External Processor イメージの最小バージョン|
|------------------------------------------------|---------------------------------------------------|
| Threat Detection                               | v1.71.0                                           |
| Threat Protection                              | v1.71.0                                           |
| ブロックされたリクエストへの対応をカスタマイズする         | v1.71.0                                           |
| 非ブロッキング非同期モード (オブザーバビリティ) | v2.1.0                                            |
| API セキュリティ                                   | v2.2.2                                            |
| スタンドアロンの App and API Protection              | v2.2.2                                            |
| ユーザーアクティビティイベントの自動追跡 | サポート対象外 |

### ボディ処理サポート {#body-processing-support}

Datadog External Processor サービスは、以下のペイロードタイプのリクエストボディおよびレスポンスボディの処理をサポートしています。

| ペイロードタイプ | Datadog External Processor イメージの最小バージョン |
|--------------|---------------------------------------------------|
| JSON         | v2.2.2                                            |

## Istio バージョンのサポート {#istio-version-support}

### サポートされている Envoy バージョン {#supported-envoy-versions}

Istio のデータプレーンは Envoy に基づいています。以下のテーブルは、Istio バージョンとそれに対応する Envoy リリースブランチの関係を示しています。

| Istio バージョン | Envoy リリースブランチ |
|---------------|----------------------|
| 1.26.x        | release/v1.34        |
| 1.25.x        | release/v1.33        |
| 1.24.x        | release/v1.32        |

Istio と Envoy のバージョンの関係についての詳細は、[Istio ドキュメント][1]で確認できます。

### Envoy バージョンのサポート {#envoy-version-support}

App and API Protection 向けの Datadog Envoy インテグレーションは、すべての Envoy バージョンに搭載されているわけではない機能に依存しています。以下のテーブルは、各機能がどの Envoy バージョンでサポートされているかを示しています。

| 機能 | 最小 Envoy バージョン |
|---------|-----------------------|
| 外部処理フィルター | v1.27.0 |
| Observability モード | v1.30.0 |

## Datadog Istio インテグレーションのサポート {#datadog-istio-integration-support}

Linux バージョンのみ、および arm64 と amd64 の両アーキテクチャがサポートされています。

<div class="alert alert-info">サポートされていない機能の追加をご希望の場合は、
お知らせください。<a
href="https://forms.gle/gHrxGQMEnAobukfn7">この簡単なフォームにご記入ください。
</a>。</div>

[1]: https://istio.io/latest/docs/releases/supported-releases/#supported-envoy-versions