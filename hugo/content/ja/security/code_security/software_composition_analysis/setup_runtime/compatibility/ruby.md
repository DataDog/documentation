---
code_lang: ruby
code_lang_weight: 30
title: Ruby 互換性要件
type: multi-code-lang
---
## Code Security 機能サポート {#code-security-capabilities-support}

Ruby ライブラリでは、指定されたトレーサーバージョンについて以下のコードセキュリティ機能がサポートされています。

| コードセキュリティ機能                    | Ruby トレーサーの最小バージョン |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.11.0                      |
| Runtime Code Analysis (IAST)                | サポート対象外               |

<div class="alert alert-info">サポートされていない機能や、Ruby フレームワークのサポートの追加をご希望の場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

### サポートされているデプロイメントタイプ {#supported-deployment-types}
| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | プレビュー (1.15.0)                    |
| AWS Lambda        |                                             |                                     |

## 言語とフレームワークの互換性 {#language-and-framework-compatibility}

**サポートされている Ruby インタープリター**
Datadog Ruby ライブラリは、以下の Ruby インタープリターの最新 gem をサポートしています。

- [MRI][2] バージョン 2.5 以降

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、aarch64
- Alpine Linux (musl) x86-64、aarch64
- macOS (Darwin) x86-64、arm64

### サポートされている Web サーバー {#supported-web-servers}
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散トレーシング

##### Code Security 機能に関する注意事項 {#code-security-capability-notes}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています。
- **Runtime Code Analysis (IAST)** はサポートされていません

### ネットワーキングフレームワークの互換性 {#networking-framework-compatibility}

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-1}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています。
- **Runtime Code Analysis (IAST)** はサポートされていません

### データストアの互換性 {#data-store-compatibility}

**データストアのトレーシングでは以下の確認が可能です。**

- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-2}
- **Runtime Software Composition Analysis (SCA)** はすべてのデータベースでサポートされています。
- **Runtime Code Analysis (IAST)** はサポートされていません

[1]: /ja/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/