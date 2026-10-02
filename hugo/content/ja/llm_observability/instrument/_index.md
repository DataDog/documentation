---
aliases:
- /ja/llm_observability/instrumentation/
description: Python、Node.js、Java 向けの SDK ベースおよび API ベースの方法を含む、Agent Observability
  のインスツルメンテーションオプションの概要。
further_reading:
- link: /llm_observability/auto_instrumentation
  tag: 自動インスツルメンテーション
  text: 自動インスツルメンテーションをすぐに利用する
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は、OpenTelemetry GenAI セマンティック規約をネイティブにサポートしています。
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: ラーニングセンター
  text: Agent Observability の概要
title: Agent Observability のインスツルメンテーション
---
Agent Observability を初めて使用する場合は、ご使用のプログラミング言語とセットアップに基づいて複数のインスツルメンテーション方法の中から選択し、LLM アプリケーションまたはエージェントをインスツルメントします。Datadog は、最小限のコード変更で LLM アプリケーションやエージェントから詳細なトレース、メトリクス、評価をキャプチャするための、包括的なインスツルメンテーションオプションを提供します。

## インスツルメンテーションオプション {#instrumentation-options}
Python、Node.js、または Java SDK を使用するか、Agent Observability API を使用してアプリケーションをインスツルメントできます。

### SDK ベースのインスツルメンテーション (推奨) {#sdk-based-instrumentation-recommended}
Datadog のネイティブ SDK は、最も包括的な Agent Observability 機能を提供します。
| 言語 | 利用可能な SDK | 自動インスツルメンテーション | カスタムインスツルメンテーション |
| -------- | ------------- | -------------------- | ---------------------- |
| Python | Python 3.7 以上 | {{< X >}} | {{< X >}} |
| Node.js | Node.js 16 以上 | {{< X >}} | {{< X >}} |
| Java | Java 8 以上 | {{< X >}} | {{< X >}} |


SDK を使用して LLM アプリケーションをインスツルメントするには:
1. Agent Observability SDK をインストールします。
2. アプリケーションの起動コマンドで[必要な環境変数][6]を指定するか、プログラムの[コード内][7]で指定して、SDK を設定します。Datadog API キー、Datadog サイト、および ML (機械学習) アプリ名が設定されていることを確認してください。

#### 自動インスツルメンテーション {#auto-instrumentation}
自動インスツルメンテーションは、コード変更なしで、Python、Node.js、および Java アプリケーションの LLM 呼び出しをキャプチャします。そのため、一般的なフレームワークやプロバイダーに関するトレースと可観測性をすぐに利用できるようになります。詳細およびサポートされている全フレームワークとプロバイダーを確認するには、[自動インスツルメンテーションのドキュメント][1]を参照してください。

自動インスツルメンテーションでは、以下の項目が自動的にキャプチャされます。
- 入力プロンプトと出力補完
- トークンの使用量とコスト
- レイテンシーおよびエラー情報
- モデルパラメータ (temperature、max_tokens など)
- フレームワーク固有のメタデータ

<div class="alert alert-info">サポートされているフレームワークを使用する場合、LLM 呼び出しに対して手動でスパンを作成する必要はありません。SDK によって自動的に、豊富なメタデータを含む適切なスパンが作成されます。</div>

#### カスタムインスツルメンテーション {#custom-instrumentation}
サポートされるすべての SDK では、自動インスツルメンテーションに加え、LLM アプリケーションのカスタムインスツルメンテーションのための高度な機能を提供しています。たとえば、次のようなものがあります。
- 関数デコレーターまたはコンテキストマネージャーを使用した手動でのスパン作成
- マルチステップ LLM アプリケーション向けの複雑なワークフロートレース
- 自律型 LLM エージェント向けのエージェント監視
- カスタム評価および品質測定
- ユーザー操作のセッション追跡

詳細については、[SDK リファレンスドキュメント][2]を参照してください。

### HTTP API インスツルメンテーション {#http-api-instrumentation}
SDK でサポートされていない言語やカスタムインテグレーションを使用している場合は、Datadog の HTTP API を使用してアプリケーションをインスツルメントすることができます。

API では、以下を行うことができます。
- HTTP エンドポイントを介して直接スパンを送信する
- スパンに関連付けられているカスタム評価を送信する
- 複雑なアプリケーションの完全なトレース階層を含める
- 入力、出力、メタデータ、メトリクスを使用してスパンに注釈を付ける

API エンドポイント:
- [Spans API][4]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`
- [Evaluations API(API 評価)][5]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

詳細については、[HTTP API ドキュメント][3]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/llm_observability/auto_instrumentation
[2]: /ja/llm_observability/instrument/sdk
[3]: /ja/llm_observability/setup/api
[4]: /ja/llm_observability/instrument/api/?tab=model#spans-api
[5]: /ja/llm_observability/instrument/api/?tab=model#evaluations-api
[6]: /ja/llm_observability/instrument/sdk#command-line-setup
[7]: /ja/llm_observability/instrument/sdk#in-code-setup