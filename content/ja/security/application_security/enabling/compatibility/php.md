---
code_lang: php
code_lang_weight: 40
kind: documentation
title: PHP 互換性要件
type: multi-code-lang
---

## 言語とフレームワークの互換性

Datadog PHP ライブラリは、以下のアーキテクチャの PHP バージョン 7.0 以降をサポートしています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64

Docker、Kubernetes、AWS ECS で動作する PHP アプリのアプリケーションセキュリティを監視することができます。

ライブラリはすべての PHP フレームワークの使用をサポートし、またフレームワークなしの使用も可能です。


## ASM の機能サポート

PHP ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | PHP トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 0.84.0 <br/>   |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | 0.86.0<br/><br/><br/>     |
| Risk Management <br/> --> サードパーティの脆弱性検出 <br/> --> カスタムコードの脆弱性検出 | 非対応<br/><br/> |

PHP でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 0.86.0 です。

**注**: Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

<div class="alert alert-info">サポートされていない機能のサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>


[1]: /ja/tracing/trace_collection/compatibility/php/
[2]: /ja/agent/guide/how_remote_config_works/#enabling-remote-configuration