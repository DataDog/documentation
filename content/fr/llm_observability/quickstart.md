---
aliases:
- /fr/tracing/llm_observability/quickstart
further_reading:
- link: /llm_observability/evaluations
  tag: Évaluations
  text: Configurer les évaluations sur votre application
- link: /llm_observability/instrumentation/custom_instrumentation
  tag: Instrumentation personnalisée
  text: Instrumentez votre application avec des spans personnalisées
title: Prise en main
---

Cette page montre comment utiliser le SDK LLM Observability de Datadog pour instrumenter une application LLM en Python ou Node.js.

### Prérequis

LLM Observability nécessite une clé d'API Datadog si vous n’avez pas d'Agent Datadog en cours d'exécution. Retrouvez votre clé d'API [dans Datadog](https://app.datadoghq.com/organization-settings/api-keys).

### Configuration

{{< tabs >}}
{{% tab "Python" %}}

1. Installez le SDK :

   ```shell
   pip install ddtrace
   ```

2. Préfixez votre commande de démarrage Python avec ddtrace-run :

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

   Remplacez `<YOUR_DATADOG_API_KEY>` par votre clé d'API Datadog.


[1]: /fr/llm_observability/setup/sdk/python/#command-line-setup
[2]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. Installez le SDK :

   ```shell
   npm install dd-trace
   ```

2. Ajoutez NODE_OPTIONS à votre commande de démarrage Node.js :
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

   Remplacez `<YOUR_DATADOG_API_KEY>` par votre clé d'API Datadog.

[1]: /fr/llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /fr/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Afficher les traces

Envoyez des requêtes à votre application qui déclenchent des appels LLM, puis consultez les traces dans l'onglet Traces de la page LLM Observability dans Datadog. Si vous ne voyez aucune trace, assurez-vous d'utiliser une bibliothèque prise en charge. Sinon, vous devrez peut-être instrumenter manuellement les appels LLM de votre application.


### Étapes suivantes

Une fois que des traces sont envoyées depuis votre application, vous pouvez :

- [Configurer des évaluations][4] que vous pouvez utiliser pour évaluer l'efficacité de votre application LLM.
- Ajouter [une instrumentation personnalisée][5] à votre application et extraire des données que l'instrumentation automatique ne peut pas collecter.


## Exemple d'application "Hello World"

Vous trouverez ci-dessous une application simple que vous pouvez utiliser pour commencer à explorer LLM Observability.


{{< tabs >}}
{{% tab "Python" %}}

1. Installez OpenAI avec `pip install openai`.

2. Enregistrez l'exemple de script `app.py`.

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
   # Make sure you have the required environment variables listed above
   DD_...= \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Installez OpenAI avec `npm install openai`.

2. Enregistrez l'exemple de script sous `app.js`

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

3. Exécutez l'application :

   ```
   # Make sure you have the required environment variables listed above
   DD_...= \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```
{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/setup/sdk/python
[2]: /fr/llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: /fr/llm_observability/evaluations
[5]: /fr/llm_observability/instrumentation/custom_instrumentation