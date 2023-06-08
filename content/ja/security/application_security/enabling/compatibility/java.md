---
code_lang: java
code_lang_weight: 0
kind: documentation
title: Java 互換性要件
type: multi-code-lang
---

## 言語とフレームワークの互換性

### サポートされている Java バージョン

Datadog ライブラリは、Oracle JDK と OpenJDK の両方の Java JRE 1.8 以降をサポートし、以下のアーキテクチャに対応しています。
- Linux (GNU) x86、x86-64
- Alpine Linux (musl) x86、x86-64
- macOS (Darwin) x86、x86-64
- Windows (msvc) x86、x86-64

Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Java アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Servlet 互換      | 2.3+、3.0+                  |
| Spring                  | 3.1                         |

**注**: WebSphere、WebLogic、JBoss など、多くのアプリケーションサーバーは Servlet と互換性があり、ASM でサポートされています。また、Spring Boot などのフレームワークは、サポートされている組み込みアプリケーションサーバー (Tomcat、Jetty、Netty など) を使用することでサポートされます。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

## ASM の機能サポート

Java ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | Java トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.8.0 <br/>   |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   | 1.9.0<br/><br/><br/>     |
| Vulnerability Management <br/> --> オープンソースの脆弱性検出 <br/>  | <br/> 1.1.4 |
| Vulnerability Management <br/> --> カスタムコードの脆弱性検出 <br/>  | <br/> 1.15.0|

Java でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 1.15.0 です。

**注**: Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

[1]: /ja/tracing/trace_collection/compatibility/java/
[2]: /ja/agent/remote_config/#enabling-remote-configuration