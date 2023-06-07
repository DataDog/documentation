---
code_lang: ruby
code_lang_weight: 30
kind: documentation
title: Ruby 互換性要件
type: multi-code-lang
---

## 言語とフレームワークの互換性

### サポートされている Ruby バージョン

Datadog Ruby ライブラリは、以下の Ruby インタプリターの最新 gem をサポートしています。

- [MRI][2] バージョン 2.1～3.1

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、aarch64
- Alpine Linux (musl) x86-64、aarch64
- macOS (Darwin) x86-64、arm64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Ruby アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (Ruby のバージョンにも依存します) |
| Sinatra                 | 1.4                         |

## ASM の機能サポート

Ruby ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | Ruby トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.9.0<br/>   |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | 1.11.0<br/><br/><br/>     |
| Risk Management <br/> --> サードパーティの脆弱性検出 <br/> --> カスタムコードの脆弱性検出 | 非対応<br/><br/> |

Ruby でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 1.11.0 です。

<div class="alert alert-info">サポートされていない機能または Ruby フレームワークのサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

[1]: /ja/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/