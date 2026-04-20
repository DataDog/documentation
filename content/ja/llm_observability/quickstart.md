---
aliases:
- /ja/tracing/llm_observability/quickstart
further_reading:
- link: /llm_observability/evaluations
  tag: 評価
  text: アプリケーションで Evaluations を設定する
- link: /llm_observability/instrumentation/custom_instrumentation
  tag: カスタムインストルメンテーション
  text: カスタム スパンでアプリケーションをインスツルメントする
title: クイックスタート
---

このページでは、Datadog の LLM Observability SDK を使って、Python、Node.js、または Java の LLM アプリケーションをインスツルメントする方法を紹介します。

### 前提条件

Datadog Agent が稼働していない場合、LLM Observability には Datadog の API キーが必要です。API キーは [Datadog で](https://app.datadoghq.com/organization-settings/api-keys) 確認できます。

### セットアップ

{{< tabs >}}
{{% tab "Python" %}}

1. SDK をインストールする

   ```shell
   pip install ddtrace
   ```

2. Python の起動コマンドの先頭に `ddtrace-run` を付けます。

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

   `<YOUR_DATADOG_API_KEY>` を Datadog の API キーに置き換えます。


[1]: /ja/llm_observability/setup/sdk/python/#command-line-setup
[2]: /ja/getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. SDK をインストールする

   ```shell
   npm install dd-trace
   ```

2. Node.js の起動コマンドに `NODE_OPTIONS` を追加します。
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

   `<YOUR_DATADOG_API_KEY>` を Datadog の API キーに置き換えます。

[1]: /ja/llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /ja/getting_started/site/

{{% /tab %}}
{{% tab "Java" %}}
1. SDK をインストールする

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Java の起動コマンドに JVM 引数 `-javaagent` を追加します。
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

   `<YOUR_DATADOG_API_KEY>` を Datadog の API キーに置き換えます。

[1]: /ja/llm_observability/setup/sdk/java/#command-line-setup
[2]: /ja/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### トレースを確認する

アプリケーションにリクエストを送って LLM 呼び出しが発生するようにしたうえで、Datadog の [**LLM Observability** ページ][3] にある **Traces** タブでトレースを確認します。トレースが表示されない場合は、サポート対象のライブラリを使っているか確認してください。サポート対象外の場合は、アプリケーションの LLM 呼び出しを手動でインスツルメントする必要があります。


### 次のステップ

アプリケーションからトレースが送信されるようになったら、次の操作ができます。

- [Evaluations を設定する][4]。LLM アプリケーションの有効性を評価するために利用できます。
- アプリケーションに [カスタム インスツルメンテーション][5] を追加し、自動インスツルメンテーションでは取得できないデータを抽出します。


## 「Hello World」アプリケーションの例

LLM Observability 製品を試し始めるためのシンプルなアプリケーション例を以下に示します。


{{< tabs >}}
{{% tab "Python" %}}

1. `pip install openai` で OpenAI をインストールします。

2. サンプル スクリプト `app.py` を保存します。

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
1. `npm install openai` で OpenAI をインストールします。

2. サンプル スクリプト `app.js` を保存します。

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

3. アプリケーションを実行します。
   ```
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/setup/sdk/python
[2]: /ja/llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: /ja/llm_observability/evaluations
[5]: /ja/llm_observability/instrumentation/custom_instrumentation