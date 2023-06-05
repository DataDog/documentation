---
code_lang: dotnet
code_lang_weight: 10
kind: documentation
title: .NET 互換性要件
type: multi-code-lang
---

## 言語とフレームワークの互換性

### サポートされている .NET バージョン

以下の .NET バージョンに対応しています。
- .NET Core 6
- .NET Core 5
- .NET Framework 4.8
- .NET Framework 4.7.2
- .NET Framework 4.7
- .NET Framework 4.6.2
- .NET Framework 4.6.1

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86、x86-64
- Alpine Linux (musl) x86、x86-64
- macOS (Darwin) x86、x86-64
- Windows (msvc) x86、x86-64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する .NET アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

.NET トレーサーは .NET ベースのすべての言語 (C#、F#、Visual Basic など) をサポートしています。

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| ASP.NET                 | 4.6                         |
| ASP.NET Core            | 2.1                         |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

## ASM の機能サポート

.NET ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | .NET トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 2.23.0 <br/>   |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | 2.26.0<br/><br/><br/>     |
| Vulnerability Management <br/> --> オープンソースの脆弱性検出 <br/> | <br/> 2.16.0  |
| Vulnerability Management <br/> --> カスタムコードの脆弱性検出 <br/> | <br/> 非公開ベータ版  |

.NET でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 2.26.0 です。

**注**: Threat Protection では、[リモート構成][3]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

[1]: /ja/tracing/trace_collection/compatibility/dotnet-core/
[2]: /ja/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /ja/agent/remote_config/#enabling-remote-configuration