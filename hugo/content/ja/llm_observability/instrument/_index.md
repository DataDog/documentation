---
aliases:
- /ja/llm_observability/instrumentation/
description: Python、Node.js、Java 向けの SDK ベースおよび API ベースのアプローチを含む、Agent Observability
  のインスツルメンテーションオプションの概要。
further_reading:
- link: /llm_observability/auto_instrumentation
  tag: 自動インスツルメンテーション
  text: 自動インスツルメンテーションですばやく始める
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は OpenTelemetry GenAI セマンティック規約をネイティブにサポート
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: ラーニングセンター
  text: Agent Observability を使い始める
title: Agent Observability のインスツルメンテーション
---
Agent Observability を開始するには、プログラミング言語とセットアップに応じていくつかの方法から選択し、LLM アプリケーションまたはエージェントをインスツルメントします。Datadog は、最小限のコード変更で LLM アプリケーションやエージェントから詳細なトレース、メトリクス、評価を収集できる、包括的なインスツルメンテーションオプションを提供します。

{{< skill-callout
    title="コーディングエージェントを使用した Agent Observability のセットアップ"
    text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided setup of Python and Node.js applications."
    action_name="copy_dd_orchestrator_agent_observability_setup_prompt"
    lang="text" >}}
https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md のスキルを使用して、私のプロジェクトで Datadog Agent Observability をインスツルメントします。
{{< /skill-callout >}}

## インスツルメンテーションオプション {#instrumentation-options}
Python、Node.js、または Java SDK を使用するか、Agent Observability API を使用して、アプリケーションをインスツルメントできます。

### SDK ベースのインスツルメンテーション (推奨) {#sdk-based-instrumentation-recommended}
Datadog は、最も包括的な Agent Observability 機能を提供するネイティブ SDK を提供しています。
| 言語 | 利用可能な SDK | 自動インスツルメンテーション | カスタムインスツルメンテーション |
| -------- | ------------- | -------------------- | ---------------------- |
| Python | Python 3.7+ | {{< X >}} | {{< X >}} |
| Node.js | Node.js 16+ | {{< X >}} | {{< X >}} |
| Java | Java 8+ | {{< X >}} | {{< X >}} |


SDK を使用して LLM アプリケーションをインスツルメントするには、以下の手順を実行します。
1. Agent Observability SDK をインストールします
2. アプリケーションの起動コマンドで[必要な環境変数][6]を指定するか、プログラムから[コード内][7]で SDK を設定します。Datadog API キー、Datadog サイト、および機械学習 (ML) アプリ名が設定されていることを確認してください。

#### 自動インスツルメンテーション {#auto-instrumentation}
自動インスツルメンテーションは、コードを変更することなく、Python、Node.js、および Java アプリケーションの LLM 呼び出しをキャプチャします。これにより、一般的なフレームワークやプロバイダーに対するすぐに使えるトレースとオブザーバビリティを取得できます。詳細およびサポートされているフレームワークとプロバイダーの全リストについては、[自動インスツルメンテーションのドキュメント][1]を参照してください。

自動インスツルメンテーションは、以下を自動的にキャプチャします。
- 入力プロンプトと出力補完
- トークンの使用量とコスト
- レイテンシーとエラー情報
- モデルパラメーター (temperature、max_tokens など)
- フレームワーク固有のメタデータ

<div class="alert alert-info">サポートされているフレームワークを使用する場合、LLM 呼び出しに対して手動でスパンを作成する必要はありません。SDK は、豊富なメタデータを含む適切なスパンを自動的に作成します。</div>

#### カスタムインスツルメンテーション {#custom-instrumentation}
サポートされているすべての SDK は、自動インスツルメンテーションに加えて、LLM アプリケーションのカスタムインスツルメンテーション向けの高度な機能を提供します。以下の機能が含まれます。
- 関数デコレータまたはコンテキストマネージャを使用した手動スパン作成
- 複数ステップの LLM アプリケーションにおける複雑なワークフローのトレース
- 自律型 LLM エージェントの監視
- カスタム評価および品質測定
- ユーザーインタラクションのセッショントラッキング

詳細については、[SDK リファレンスのドキュメント][2]を参照してください。

### HTTP API インスツルメンテーション {#http-api-instrumentation}
SDK でサポートされていない言語を使用している場合や、カスタムインテグレーションを使用している場合は、Datadog の HTTP API を使用してアプリケーションをインスツルメントできます。

API を使用すると、次のことが可能になります。
- HTTP API エンドポイント経由でスパンを直接送信する
- スパンに関連付けられたカスタム評価を送信する
- 複雑なアプリケーションの完全なトレース階層を含める
- 入力、出力、メタデータ、メトリクスでスパンに注釈を付ける

API エンドポイント:
- [スパン API][4]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`
- [評価 API][5]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

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