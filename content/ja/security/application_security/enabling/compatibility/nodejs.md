---
code_lang: nodejs
code_lang_weight: 50
kind: documentation
title: Node.js 互換性要件
type: multi-code-lang
---

## 言語とフレームワークの互換性

### サポートされている Node.js バージョン

Datadog Node.js ライブラリは、Node 14 以降をサポートしています。一般的に、Datadog は Node.js LTS のポリシーに従います。詳細は、[APM ドキュメント][1]をお読みください。


これらは、以下のアーキテクチャでサポートされています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86、x86-64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Node.js アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |


## ASM の機能サポート

Node.js ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | NodeJS  トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 3.31.1 <br/>   |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | <br/> --> 3.11.0<br/> --> 3.19.0<br/> --> 3.11.0     |
| Risk Management <br/> --> サードパーティの脆弱性検出 <br/> --> カスタムコードの脆弱性検出 | NodeJS 12+ の場合は 2.23.0、NodeJS 14+ の場合は 3.10.0<br/><br/> |

Node.js でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 3.15.0 です。

**注**: Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

<div class="alert alert-info">サポートされていない機能または Node.js フレームワークのサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>


[1]: /ja/tracing/trace_collection/compatibility/nodejs/
[2]: /ja/agent/guide/how_remote_config_works/#enabling-remote-configuration