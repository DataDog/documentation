---
aliases:
- /fr/tracing/llm_observability/quickstart
description: Démarrez avec Agent Observability en instrumentant une application LLM
  Python, Node.js ou Java à l'aide de l'Agent Observability SDK.
further_reading:
- link: /llm_observability/instrument/auto_instrumentation
  tag: Documentation
  text: Frameworks et bibliothèques d'auto-instrumentation pris en charge
- link: /llm_observability/instrument/sdk
  tag: Documentation
  text: Référence du SDK Agent Observability pour l'instrumentation manuelle
- link: /llm_observability/instrument/api
  tag: Documentation
  text: Agent Observability HTTP API pour une instrumentation indépendante du langage.
- link: /llm_observability/instrument/otel_instrumentation
  tag: Documentation
  text: Instrumenter avec OpenTelemetry
- link: /llm_observability/configure/evaluations
  tag: Évaluations
  text: Configurer les évaluations sur votre application
- link: /llm_observability/lapdog
  tag: Documentation
  text: Outil de développement local pour Agent Observability.
title: Démarrage rapide
---
Cette page montre comment utiliser le Agent Observability SDK de Datadog pour instrumenter une application LLM Python, Node.js ou Java.

### Prérequis {#prerequisites}

Agent Observability nécessite une clé d'API Datadog si vous n'avez pas de Datadog Agent en cours d'exécution. Trouvez votre clé d'API [dans Datadog](https://app.datadoghq.com/organization-settings/api-keys).

### Instrumentez Agent Observability avec un coding agent {#instrument-agent-observability-with-a-coding-agent}

Instrumentez Agent Observability avec le coding agent de votre choix en collant l'invite suivante :

```bash
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to instrument my application with Datadog Agent Observability. When configuring the environment, use the following values for variable entries:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_API_KEY=<your-dd-api-key>
```

**Remarque :** Fournir la clé d'API dans l'invite est facultatif et n'est pas requis pour que le coding agent instrumente votre application.

### Configuration manuelle {#manual-setup}

Suivez les instructions de configuration dans le [in-app onboarding flow](https://app.datadoghq.com/llm/applications?setupMethod=manual&showOnboarding=true) de Datadog pour une expérience de démarrage rapide interactive.

{{< tabs >}}
{{% tab "Python" %}}

1. Installez le SDK :

   ```shell
   pip install ddtrace
   ```

2. Faites précéder votre commande de démarrage Python par `ddtrace-run` :

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

Après l'activation, le SDK trace automatiquement les appels vers les [frameworks Python pris en charge][auto-instr-py] tels qu'OpenAI, LangChain, LangGraph, Bedrock, Anthropic, et plus encore. Si votre framework n'est pas répertorié, ajoutez une [instrumentation manuelle][sdk] pour tracer directement vos appels LLM.

[auto-instr-py]: /llm_observability/instrument/auto_instrumentation/?tab=python
[sdk]: /llm_observability/instrument/sdk?tab=python

{{% /tab %}}

{{% tab "Node.js" %}}
1. Installez le SDK :

   ```shell
   npm install dd-trace
   ```

2. Importez et initialisez `dd-trace` avec Agent Observability comme première dépendance dans le point d'entrée de votre application :
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

Après activation, le SDK trace automatiquement les appels vers les [frameworks Node.js pris en charge][1] tels qu'OpenAI, LangChain, Vercel AI SDK, Bedrock, Anthropic, et plus encore. Si votre framework n'est pas répertorié, ajoutez une [instrumentation manuelle][2] pour tracer vos appels LLM directement.

**Next.js** : Consultez [Instrumenter une application Next.js pour Agent Observability][3] pour configurer correctement vos applications Next.js avec le Agent Observability SDK.

[1]: /fr/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[2]: /fr/llm_observability/instrument/sdk?tab=nodejs
[3]: /fr/llm_observability/guide/nextjs_guide

{{% /tab %}}
{{% tab "Java" %}}
1. Installez le SDK :

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Ajoutez l'argument JVM `-javaagent` à votre commande de démarrage Java :
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.site=<YOUR_DD_SITE> \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

Après activation, le SDK trace automatiquement les appels vers les [frameworks Java pris en charge][1]. L'auto-instrumentation Java prend en charge OpenAI et Azure OpenAI. Pour d'autres bibliothèques telles que Bedrock ou LangChain4j, utilisez plutôt une [instrumentation manuelle][2] .

[1]: /fr/llm_observability/instrument/auto_instrumentation/?tab=java
[2]: /fr/llm_observability/instrument/sdk?tab=java

{{% /tab %}}
{{% tab "Autres langages / API HTTP" %}}

Pour les langages autres que Python, Node.js ou Java, utilisez l'[API HTTP Agent Observability][1] pour envoyer des spans directement à Datadog sans SDK.

Si votre application émet des spans conformes aux [conventions sémantiques OpenTelemetry GenAI][2], consultez plutôt [l'instrumentation OpenTelemetry][2].

[1]: /fr/llm_observability/instrument/api
[2]: /fr/llm_observability/instrument/otel_instrumentation

{{% /tab %}}
{{< /tabs >}}

Votre site Datadog est {{< region-param key="dd_site" code="true" >}}. Remplacez `<YOUR_DATADOG_API_KEY>` par votre clé d'API Datadog.

### Voir les traces {#view-traces}

Effectuez des requêtes vers votre application déclenchant des appels LLM, puis visualisez les traces dans l'onglet {{< ui >}}Traces{{< /ui >}} [de la page {{< ui >}}Agent Observability{{< /ui >}}][3] dans Datadog.

Si vous ne voyez aucune trace :

- **Vérifiez que votre bibliothèque est auto-instrumentée** : L'auto-instrumentation ne capture que les appels aux [frameworks et bibliothèques pris en charge][6]. Vérifiez la liste prise en charge pour [Python][7], [Node.js][8] ou [Java][9]. Si votre bibliothèque n'est pas répertoriée, vous devez ajouter l'instrumentation manuellement.
- **Ajoutez une instrumentation manuelle** : Utilisez le [Agent Observability SDK][5] pour encapsuler vos appels LLM avec des spans directement dans le code. Cela fonctionne pour n'importe quelle bibliothèque ou fournisseur de modèles.
- **Utilisez l'API HTTP** : L'[Agent Observability HTTP API][10] accepte les spans de n'importe quel langage ou framework et ne nécessite pas de SDK.
- **Utilisez OpenTelemetry** : Si votre framework émet des spans conformes aux [conventions sémantiques GenAI d'OpenTelemetry][11], consultez [l'instrumentation OpenTelemetry][11] pour les détails de configuration.


### Étapes suivantes {#next-steps}

Une fois que les traces sont soumises depuis votre application, vous pouvez :

- [Configurez des évaluations][4] que vous pouvez utiliser pour évaluer l'efficacité de votre application LLM.
- Ajoutez une [instrumentation manuelle][5] à votre application et extrayez des données que l'instrumentation automatique ne peut pas extraire.


## Exemple d'application « Hello World » {#example-hello-world-application}

Voir ci-dessous une application simple qui peut être utilisée pour commencer à explorer Agent Observability.


{{< tabs >}}
{{% tab "Python" %}}

1. Installez OpenAI avec `pip install openai`.

2. Enregistrez le script d'exemple `app.py` :

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

3. Exécutez l'application :

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Installez OpenAI avec `npm install openai`.

2. Enregistrez le script d'exemple `app.js` :

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

3. Exécutez l'application :
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## Essayez Agent Observability localement avec lapdog {#try-agent-observability-locally-with-lapdog}

Pour essayer Agent Observability localement et gratuitement, [suivez les étapes][12] pour instrumenter votre application et visualiser les données localement avec [lapdog](https://lapdog.datadoghq.com).


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/llm/traces
[4]: /fr/llm_observability/configure/evaluations
[5]: /fr/llm_observability/instrument/sdk#manual-instrumentation
[6]: /fr/llm_observability/instrument/auto_instrumentation
[7]: /fr/llm_observability/instrument/auto_instrumentation/?tab=python
[8]: /fr/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[9]: /fr/llm_observability/instrument/auto_instrumentation/?tab=java
[10]: /fr/llm_observability/instrument/api
[11]: /fr/llm_observability/instrument/otel_instrumentation
[12]: /fr/llm_observability/lapdog