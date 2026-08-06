---
aliases:
- /ja/tracing/code_origins/
- /ja/tracing/guide/code_origins/
description: Code Origin を使用して、コードベース内でスパンがどこから生成されているかを把握する方法を学ぶ
further_reading:
- link: /tracing/glossary/
  tag: ドキュメント
  text: APM の用語と概念について学ぶ
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/live_debugger/
  tag: ドキュメント
  text: Live Debugger を使用して、プロダクションサービスをデバッグする方法を学ぶ
- link: /dynamic_instrumentation/
  tag: ドキュメント
  text: Dynamic Instrumentation を使用して、カスタムスパンを追加する方法を学ぶ
title: スパンの Code Origin
---
## 概要 {#overview}

Code Origin は、APM スパンが生成されるコードベース内の正確な位置を特定します。互換性のあるサービスで有効にすると、各[サービスエントリスパン][12]にファイルパス、行番号、関数名が自動的に追加され、次のことが容易になります。

- パフォーマンスの問題をデバッグする
- コード実行フローを理解する
- パフォーマンスのボトルネックを特定する

Trace Explorer で、有効なサービスからスパンを選択すると、概要タブに Code Origin の詳細が表示されます。
{{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Code Origin の詳細" style="width:100%;">}}


## はじめに {#getting-started}

### 前提条件 {#prerequisites}
- [Datadog APM][6] はスパンをキャプチャするように構成されています。
- [Source Code Integration][7] は有効になっています (コードプレビューに必要)。
- あなたのサービスは[互換性要件](#compatibility-requirements)を満たしています。

### 互換性要件 {#compatibility-requirements}

{{% tabs %}}

{{% tab "Java" %}}

| SDK バージョン | フレームワーク |
|---|---|
| 1.47.0+ | Spring Boot/Data、gRPC サーバー、Micronaut 4、Kafka コンシューマー |

**制限:** JDK 18 以下では、`-parameters`フラグでコンパイルされたクラスはサポートされない場合があります。Spring 6+、Spring Boot 3+、および Scala は、このフラグをデフォルトで使用します。

{{% /tab %}}

{{% tab "Python" %}}

| SDK バージョン | フレームワーク |
|---|---|
| 2.15.0+ | Django、Flask、Starlette、およびその派生物 |

{{% /tab %}}

{{% tab "Node.js" %}}

| SDK バージョン | フレームワーク |
|---|---|
| 4.49.0+ | Fastify |
| 5.54.0+ | Express |

**注:** NestJS はサポートされていませんが、基盤となるフレームワークは Express または Fastify のいずれかです。

{{% /tab %}}

{{% tab ".NET" %}}

| SDK バージョン | フレームワーク |
|---|---|
| 3.15.0+ | ASP.NET、ASP.NET Core |

{{% /tab %}}

{{% tab "PHP" %}}

| SDK バージョン | フレームワーク |
|---|---|
| 1.11.0+ | すべてのサポートされている Web フレームワーク |

{{% /tab %}}

{{% /tabs %}}

### Code Origin を有効にする {#enable-code-origin}

次の環境変数を設定してサービスを実行します。

```shell
export DD_CODE_ORIGIN_FOR_SPANS_ENABLED=true
```

<div class="alert alert-info">
  トランスパイルされた Node.js アプリケーション (例えば TypeScript) の場合、デプロイされたアプリケーションとともにソースマップを生成して公開し、Node.js を <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a>フラグ付きで実行し、Node.js トレーサー v5.59.0 以降を使用します。そうしないと、コードプレビューは動作しません。詳細については、Node.js <a href="/integrations/guide/source-code-integration/?tab=nodejs#setup">ソースコードインテグレーション</a>のドキュメントを参照してください。
</div>

## Code Origin の使用方法 {#using-code-origin}

### トレースエクスプローラーで {#in-the-trace-explorer}

1. [Trace Explorer][1] に移動します。
1. Code Origin を有効にしたサービスから「Service Entry Spans」を検索します。

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Service Entry Spans の検索" style="width:100%;">}}

1. スパンをクリックして、その詳細を表示します。
1. トレース詳細のサイドパネルで、「Code Origin」セクションを探します。

    {{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Trace Explorer の Code Origin の詳細" style="width:100%;">}}

1. Code Origin セクションから:
    - Start Debug Session をクリックして実行中のサービスで [Live Debugger][11] セッションを開始し、Code Origin メソッドの位置でログをキャプチャします。または、コードプレビューのガターでブレークポイントを選択し、選択したコード行でログをキャプチャします。

        {{< img src="tracing/code_origin/code_origin_start_debug_session.png" alt="Code Origin - Live Debugger セッションの開始" style="width:100%;">}}

     - Click on source code variables to add them as attributes to future spans with [Dynamic Instrumentation][5].

        {{< img src="tracing/code_origin/code_origin_add_span_tag_spotlight.png" alt="Code Origin - Dynamic Instrumentation を使用してスパンタグを追加" style="width:100%;">}}


### IDE で{#in-your-ide}

1. [Datadog IDE Integration][4] を設定します。
    - サポートされている IDE: IntelliJ、VS Code
    - サポートされている言語: Java、Python
2. エンドポイントメソッドの上にインライン注釈として RED メトリクス (リクエスト、エラー、実行時間) を表示します。

    {{< img src="tracing/code_origin/code_origin_ide_details.png" alt="IDE の Code Origin の詳細" style="width:100%;">}}

## トラブルシューティング {#troubleshooting}

### Code Origin セクションが表示されません {#code-origin-section-is-missing}

- SDK 構成で Code Origin が[有効](#enable-code-origin)であることを確認してください。
- サービスがすべての[互換性要件](#compatibility-requirements) (すなわち、サービス言語、サポートされているフレームワーク、最小トレーサーバージョン) を満たしていることを確認してください。
- ほとんどのサービスでは、Code Origin データは[サービスエントリスパン][12]のみにキャプチャされます。[APM Trace Explorer][1] で「Service Entry Spans」にフィルターできます。

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Service Entry Spans の検索" style="width:100%;">}}

### コードプレビューが表示されないか、ファイルが見つかりません {#code-preview-is-not-visible-or-the-file-is-not-found}

- [ソースコードインテグレーション][7]のすべてのセットアップ要件が満たされていることを確認し、`DD_GIT_*`環境変数が正しい値で構成されていることを確認してください。
- トランスパイルされた Node.js アプリケーション (例えば TypeScript) の場合、デプロイされたアプリケーションとともにソースマップを生成および公開し、[`--enable-source-maps`][10] フラグを使用して Node.js を実行し、Node.js トレーサー v5.59.0 以降を使用してください。そうしないと、コードプレビューは動作しません。詳細については、Node.js [ソースコードインテグレーション][9]のドキュメントを参照してください。
- Code Origin はユーザーコードのみを参照するように設計されていますが、場合によってはサードパーティコードの参照が混入することがあります。これらのケースを [Datadog サポート][13]に報告し、これらの参照の改善にご協力ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /ja/tracing/services/service_page/
[3]: /ja/tracing/services/resource_page/
[4]: /ja/ide_plugins/
[5]: /ja/dynamic_instrumentation/
[6]: /ja/tracing/trace_collection/
[7]: /ja/integrations/guide/source-code-integration/
[8]: /ja/tracing/trace_collection/compatibility/nodejs#web-framework-compatibility
[9]: /ja/integrations/guide/source-code-integration/?tab=nodejs#setup
[10]: https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps
[11]: /ja/tracing/live_debugger/
[12]: /ja/glossary/#service-entry-span
[13]: https://www.datadoghq.com/support/