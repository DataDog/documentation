---
title: Quickstart
aliases:
    - /tracing/llm_observability/quickstart
further_reading:
    - link: '/llm_observability/evaluations'
      tag: 'Evaluations'
      text: 'Configure Evaluations on your application'
    - link: '/llm_observability/instrumentation/custom_instrumentation'
      tag: 'Custom Instrumentation'
      text: 'Instrument your application with custom spans'
---

This guide walks you through instrumenting an LLM application and sending your first trace to Datadog.

### Prerequisites

Before you begin, make sure you have the following:

- A [Datadog account](https://app.datadoghq.com/)
- A [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys)
- Python 3.7+, Node.js 16+, or Java 8+
- An LLM provider API key (for example, an [OpenAI API key](https://platform.openai.com/api-keys)) if you want to run the example application

### Setup

{{< tabs >}}
{{% tab "Python" %}}

1. Install the SDK:

   ```shell
   pip install ddtrace
   ```

2. Prefix your Python start command with `ddtrace-run`:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key.


[1]: /llm_observability/instrumentation/sdk/python/#command-line-setup
[2]: /getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install the SDK:

   ```shell
   npm install dd-trace
   ```

2. Add `NODE_OPTIONS` to your Node.js start command:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key.

[1]: /llm_observability/instrumentation/sdk/nodejs/#command-line-setup
[2]: /getting_started/site/

{{% /tab %}}
{{% tab "Java" %}}
1. Install the SDK:

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Add the `-javaagent` JVM argument to your Java start command:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key.

[1]: /llm_observability/instrumentation/sdk/java/#command-line-setup
[2]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### View traces

Make requests to your application triggering LLM calls and then view traces in the **Traces** tab [of the **LLM Observability** page][3] in Datadog. If you don't see any traces, make sure you are using a supported library. Otherwise, you may need to instrument your application's LLM calls manually.


### Next steps

After traces are being submitted from your application:

1. **Add custom instrumentation**: Annotate your application with [custom spans][5] to capture business logic beyond auto-instrumented LLM calls.
2. **Configure evaluations**: Set up [evaluations][4] to assess quality, safety, and effectiveness of your LLM responses.
3. **Explore monitoring**: Use the [Monitoring][6] tools to query traces, track metrics, and analyze clusters.
4. **Run experiments**: Compare prompts and models with [Experiments][7] to optimize your application.

[6]: /llm_observability/monitoring
[7]: /llm_observability/experiments


## Example "Hello World" application

See below for a simple application that can be used to begin exploring the LLM Observability product.


{{< tabs >}}
{{% tab "Python" %}}

1. Install OpenAI with `pip install openai`.

2. Save example script `app.py`:

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

3. Run the application:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install OpenAI with `npm install openai`.

2. Save example script `app.js`:

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

3. Run the application:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}

{{% tab "Java" %}}
1. Create a Maven project with the OpenAI dependency, or add it to your existing project. Save example file `App.java`:

   ```java
   import com.openai.client.OpenAIClient;
   import com.openai.client.okhttp.OpenAIOkHttpClient;
   import com.openai.models.chat.completions.*;

   public class App {
       public static void main(String[] args) {
           OpenAIClient client = OpenAIOkHttpClient.fromEnv();
           ChatCompletion completion = client.chat().completions().create(
               ChatCompletionCreateParams.builder()
                   .model("gpt-4o-mini")
                   .addMessage(ChatCompletionMessageParam.ofSystem(
                       "You are a helpful customer assistant for a furniture store."))
                   .addMessage(ChatCompletionMessageParam.ofUser(
                       "I'd like to buy a chair for my living room."))
                   .build()
           );
           System.out.println(completion.choices().get(0).message().content());
       }
   }
   ```

2. Run the application:

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrumentation/sdk/python
[2]: /llm_observability/instrumentation/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: /llm_observability/evaluations
[5]: /llm_observability/instrumentation/custom_instrumentation
