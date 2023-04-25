---
code_lang: php
code_lang_weight: 50
kind: documentation
title: Python 互換性要件
type: multi-code-lang
---

## 言語とフレームワークの互換性

### サポート対象の Python バージョン

Datadog Python ライブラリは、以下の Python のバージョンをサポートしています。

- Python 2.7、3.5、またはそれ以上

これらは、以下のアーキテクチャでサポートされています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86、x86-64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Python アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server | フレームワークの最小バージョン |
|----------------------|---------------------------|
| Django               | 1.8                       |
| Flask                | 0.10                      |

Flask では、クエリ文字列のサポートはありません。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

## ASM の機能サポート

Python ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | Python トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.9.0<br/>   |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | 1.10.0<br/><br/><br/>     |
| Risk Management <br/> --> サードパーティの脆弱性検出 <br/> --> カスタムコードの脆弱性検出 | 1.5.0 <br/><br/> |

Python でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 1.10.0 です。

**注**: Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

[1]: /ja/tracing/trace_collection/compatibility/python/
[2]: /ja/agent/guide/how_remote_config_works/#enabling-remote-configuration