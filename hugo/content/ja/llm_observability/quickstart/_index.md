---
aliases:
- /ja/tracing/llm_observability/quickstart
description: Agent Observability SDK を使用して Python、Node.js、または Java LLM アプリケーションをインスツルメントして、Agent
  Observability を使用します。
further_reading:
- link: /llm_observability/instrument/auto_instrumentation
  tag: ドキュメント
  text: サポートされている自動インスツルメンテーションフレームワークおよびライブラリ
- link: /llm_observability/instrument/sdk
  tag: ドキュメント
  text: 手動インスツルメンテーション用の Agent Observability SDK リファレンス
- link: /llm_observability/instrument/api
  tag: ドキュメント
  text: 全言語対応のインスツルメンテーション用の Agent Observability HTTP API
- link: /llm_observability/instrument/otel_instrumentation
  tag: ドキュメント
  text: OpenTelemetry によるインスツルメンテーション
- link: /llm_observability/configure/evaluations
  tag: 評価
  text: アプリケーションで評価を構成する
- link: /llm_observability/lapdog
  tag: ドキュメント
  text: Agent Observability 用ローカル開発ツール
title: クイックスタート
---
このページでは、Datadog の Agent Observability SDK を使用して、Python、Node.js、または Java LLM アプリケーションをインスツルメントする方法を紹介します。

### 前提条件 {#prerequisites}

Datadog Agent が実行されていない場合は、Agent Observability に Datadog API キーが必要です。[Datadog](https://app.datadoghq.com/organization-settings/api-keys) で API キーを確認してください。

### コーディングエージェントを使用して Agent Observability をインスツルメントする {#instrument-agent-observability-with-a-coding-agent}

以下のプロンプトを貼り付けて、任意のコーディングエージェントで Agent Observability をインスツルメントします。

```bash
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to instrument my application with Datadog Agent Observability. When configuring the environment, use the following values for variable entries:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_API_KEY=<your-dd-api-key>
```

**注:** API キーをプロンプトの中で指定することは任意であり、コーディングエージェントがアプリケーションをインスツルメントするために必須というわけではありません。

### 手動セットアップ {#manual-setup}

Datadog の [アプリ内オンボーディングフロー](https://app.datadoghq.com/llm/applications?setupMethod=manual&showOnboarding=true)のセットアップ手順に従うと、対話式にすばやく設定を行えます。

{{< tabs >}}
{{% tab "Python" %}}

1. SDK をインストールします。

   ```shell
   pip install ddtrace
   ```

2. Python の起動コマンドの先頭に `ddtrace-run` を付加します。

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

有効にすると、SDK は OpenAI、LangChain、LangGraph、Bedrock、Anthropic など、[サポートされている Python フレームワーク][auto-instr-py] への呼び出しを自動的にトレースします。お使いのフレームワークが示されない場合は、[手動インスツルメンテーション][sdk] を追加して、LLM 呼び出しを直接トレースしてください。

[auto-instr-py]: /llm_observability/instrument/auto_instrumentation/?tab=python
[sdk]: /llm_observability/instrument/sdk?tab=python

{{% /tab %}}

{{% tab "Node.js" %}}
1. SDK をインストールします。

   ```shell
   npm install dd-trace
   ```

2. Agent Observability を使用して、アプリケーションのエントリポイントで最初の依存関係として `dd-trace` をインポートして初期化します。
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

有効にすると、SDK は OpenAI、LangChain、Vercel AI SDK、Bedrock、Anthropic など、[サポートされている Node.js フレームワーク][1] への呼び出しを自動的にトレースします。お使いのフレームワークが示されない場合は、[手動インスツルメンテーション][2] を追加して、LLM 呼び出しを直接トレースしてください。

**Next.js**: Agent Observability SDK を使用して Next.js アプリケーションを適切に構成する方法は、「[Agent Observability 用の Next.js アプリケーションのインスツルメンテーション][3]」を参照してください。

[1]: /ja/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[2]: /ja/llm_observability/instrument/sdk?tab=nodejs
[3]: /ja/llm_observability/guide/nextjs_guide

{{% /tab %}}
{{% tab "Java" %}}
1. SDK をインストールします。

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Java の起動コマンドに `-javaagent` JVM 引数を追加します。
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.site=<YOUR_DD_SITE> \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

有効にすると、SDK は [サポートされている Java フレームワーク][1] への呼び出しを自動的にトレースします。Java の自動インスツルメンテーションは、OpenAI および Azure OpenAI をサポートしています。Bedrock や LangChain4j などの他のライブラリでは、[手動インスツルメンテーション][2] を使用してください。

[1]: /ja/llm_observability/instrument/auto_instrumentation/?tab=java
[2]: /ja/llm_observability/instrument/sdk?tab=java

{{% /tab %}}
{{% tab "その他の言語 / HTTP API" %}}

Python、Node.js、Java 以外の言語では、SDK は使用せず、[Agent Observability HTTP API][1] を使用して Datadog にスパンを直接送信してください。

アプリケーションが [OpenTelemetry GenAI セマンティック規約][2] に準拠したスパンを出力する場合は、[OpenTelemetry インスツルメンテーション][2] を参照してください。

[1]: /ja/llm_observability/instrument/api
[2]: /ja/llm_observability/instrument/otel_instrumentation

{{% /tab %}}
{{< /tabs >}}

ご使用の Datadog サイトは {{< region-param key="dd_site" code="true" >}}です。`<YOUR_DATADOG_API_KEY>` をご使用の Datadog API キーに置き換えてください。

### トレースを表示する {#view-traces}

アプリケーションに対して LLM 呼び出しをトリガーするリクエストを行い、Datadog の [[{{< ui >}}Agent Observability{{< /ui >}}] ページ][3] の [{{< ui >}}Traces{{< /ui >}}] (トレース) タブでトレースを表示します。

トレースが表示されない場合は、次のようにします。

- **ライブラリが自動インスツルメンテーションされていることをチェックする**: 自動インスツルメンテーションは、[サポートされているフレームワークおよびライブラリ][6] に対する呼び出しのみをキャプチャします。[Python][7]、[Node.js][8]、または [Java][9] のサポートされているライブラリのリストをチェックしてください。ご使用のライブラリがリストにない場合は、手動でインスツルメンテーションを追加する必要があります。
- **手動インスツルメンテーションを追加する**: [Agent Observability SDK][5] を使用して、コード内で直接 LLM 呼び出しをスパンでラップします。この方法は、すべてのライブラリまたはモデルプロバイダーで使用できます。
- **HTTP API を使用する**: [Agent Observability HTTP API][10] は、あらゆる言語やフレームワークからのスパンを受け入れ、SDK を必要としません。
- **OpenTelemetry を使用する**: ご使用のフレームワークが [OpenTelemetry GenAI セマンティック規約][11] に準拠したスパンを出力する場合は、セットアップの詳細について「[OpenTelemetry インスツルメンテーション][11]」を参照してください。


### 次のステップ {#next-steps}

アプリケーションからトレースが送信されるようになったら、以下のことが可能になります。

- LLM アプリケーションの有効性を評価するために使用できる [評価を構成][4] します。
- [手動インスツルメンテーション][5] をアプリケーションに追加し、自動インスツルメンテーションでは取得できないデータを抽出します。


## 「Hello World」アプリケーションの例 {#example-hello-world-application}

Agent Observability 製品について学ぶために利用できるシンプルなアプリケーションを以下で紹介します。


{{< tabs >}}
{{% tab "Python" %}}

1. `pip install openai` を実行して OpenAI をインストールします。

2. サンプルスクリプト `app.py` を保存します。

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
   completion = oai_client.chat.completions.create(
       model="gpt-4o-mini",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. アプリケーションを実行します。

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. `npm install openai` を実行して OpenAI をインストールします。

2. サンプルスクリプト `app.js` を保存します。

   ```js
   const { OpenAI } = require('openai');
   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   async function main () {
       const completion = await oaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
             { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
             { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
          ]
       });
       return completion;
   }

   main().then(console.log)
   ```

3. アプリケーションを実行します。
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## lapdog を使用してローカルで Agent Observability を試す {#try-agent-observability-locally-with-lapdog}

Agent Observability をローカルで無料で試すには、[こちらの手順に従って][12] アプリケーションをインスツルメントし、[lapdog](https://lapdog.datadoghq.com) を使用してローカルでデータを表示します。


## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/llm/traces
[4]: /ja/llm_observability/configure/evaluations
[5]: /ja/llm_observability/instrument/sdk#manual-instrumentation
[6]: /ja/llm_observability/instrument/auto_instrumentation
[7]: /ja/llm_observability/instrument/auto_instrumentation/?tab=python
[8]: /ja/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[9]: /ja/llm_observability/instrument/auto_instrumentation/?tab=java
[10]: /ja/llm_observability/instrument/api
[11]: /ja/llm_observability/instrument/otel_instrumentation
[12]: /ja/llm_observability/lapdog