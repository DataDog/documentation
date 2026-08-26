---
aliases:
- /fr/tracing/serverless_functions
- /fr/tracing/setup_overview/serverless_functions/
- /fr/serverless/troubleshooting/serverless_apm_metrics/
- /fr/serverless/distributed_tracing/serverless_trace_merging
- /fr/serverless/distributed_tracing/serverless_trace_propagation
- /fr/serverless/distributed_tracing
further_reading:
- link: /tracing/
  tag: Documentation
  text: Explorer l'APM Datadog
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: Documentation
  text: Recherche en direct
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: Blog
  text: Tracing distribué en temps réel pour des fonctions Lambda Go et Java
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Surveiller votre pile sans serveur dans la vue Serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: Blog
  text: Surveillance sans serveur Datadog pour les services AWS entièrement gérés
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: Blog
  text: Tracing distribué en temps réel pour des fonctions Lambda .NET
title: Tracing distribué avec des applications sans serveur AWS Lambda
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Tracer des fonctions sans serveur" style="width:100%;">}}

Associez vos traces sans serveur à vos métriques pour permettre à Datadog de vous offrir une vue d'ensemble détaillée et contextualisée des performances de votre application. Compte tenu de la nature distribuée des applications sans serveur, vous pouvez ainsi résoudre plus efficacement les problèmes de performance.

Les SDK Datadog pour Python, Node.js, Ruby, Go, Java et .NET prennent en charge le traçage distribué pour AWS Lambda.

## Envoyez des traces depuis votre application sans serveur {#send-traces-from-your-serverless-application}

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Diagramme d'architecture pour le traçage d'AWS Lambda avec Datadog" >}}

Les SDK Datadog pour Python, Node.js, Ruby, Go, Java et .NET prennent en charge le traçage distribué pour AWS Lambda. Vous pouvez installer le SDK en suivant les [instructions d'installation][5].

### Recommandations d'exécution {#runtime-recommendations}

{{< card-grid card_width="30%" image_width="200">}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/distributed_tracing#ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/distributed_tracing#java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/distributed_tracing#go" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/distributed_tracing#net" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

#### Python et Node.js {#python-and-nodejs}

La Datadog Lambda Library et les SDK pour Python et Node.js prennent en charge :
- Corrélation automatique des journaux et des traces Lambda avec l'ID de trace et injection de balises.
- Installation sans aucun changement de code en utilisant les intégrations Serverless Framework, AWS SAM et AWS CDK.
- Traçage des requêtes HTTP invoquant des fonctions ou des conteneurs Lambda en aval.
- Traçage des invocations consécutives de Lambda effectuées via le SDK AWS.
- Traçage des démarrages à froid
- Traçage des invocations asynchrones de Lambda via les services gérés par AWS
  - API Gateway
  - SQS
  - SNS
  - Intégration directe de SNS et SQS
  - Kinesis
  - EventBridge
  - DynamoDB
  - S3
  - Step Functions
- Traçage de dizaines de bibliothèques supplémentaires prêtes à l'emploi [Python][3] et [Node.js][4].

Pour les applications sans serveur Python et Node.js, Datadog vous recommande d'[installer les SDK Datadog][5].

*Vous cherchez à tracer des ressources sans serveur non listées ci-dessus ? [Ouvrez une demande de fonctionnalité][7].*

#### Ruby {#ruby}

La Datadog Lambda Library et les SDK pour Ruby prennent en charge :
- Corrélation automatique des journaux et des traces Lambda avec l'injection d'ID de trace et de balises.
- Traçage des requêtes HTTP invoquant des fonctions ou des conteneurs Lambda en aval.
- Traçage de dizaines de bibliothèques supplémentaires prêtes à l'emploi [Ruby][8].

Vous pouvez tracer vos fonctions sans serveur dans Datadog avec les [SDK Datadog][5].

*Vous cherchez à tracer des ressources sans serveur non listées ci-dessus ? [Ouvrez une demande de fonctionnalité][7].*

#### Go {#go}

La Datadog Lambda Library et les SDK pour Go prennent en charge :
- Corrélation manuelle des journaux et des traces Lambda avec l'injection d'ID de trace et de balises.
- Traçage des requêtes HTTP invoquant des fonctions ou des conteneurs Lambda en aval.
- Traçage de dizaines de bibliothèques supplémentaires prêtes à l'emploi [Go][9].

Pour les applications sans serveur Go, Datadog recommande d'installer les [SDK Datadog][5].

*Vous cherchez à tracer des ressources sans serveur non listées ci-dessus ? [Ouvrez une demande de fonctionnalité][7].*

#### Java {#java}

La Datadog Lambda Library et les SDK pour Java prennent en charge :
- Corrélation des journaux et des traces Lambda avec l'ID de trace et l'injection de balises. Voir [Connexion des journaux et des traces Java][10] pour plus de détails.
- Traçage des requêtes HTTP invoquant des fonctions ou des conteneurs Lambda en aval.
- Traçage de dizaines de bibliothèques supplémentaires prêtes à l'emploi [Java][11].

Pour les applications sans serveur Java, Datadog recommande [d'installer les SDK Datadog][5].

*Avez-vous des commentaires sur les SDK Datadog pour les fonctions Lambda Java ? Assurez-vous de consulter les discussions en cours dans le canal [#serverless][12] de la [communauté Slack Datadog][13].*

#### .NET {#net}

Le SDK pour .NET prend en charge :
- Traçage des requêtes HTTP invoquant des fonctions ou des conteneurs Lambda en aval.
- Traçage de dizaines de bibliothèques supplémentaires prêtes à l'emploi [.NET][14].

Pour les applications sans serveur .NET, Datadog recommande [d'installer les SDK Datadog][5].

En savoir plus sur le [tracing via des applications sans serveur Azure .NET][15].

## Auto-liaison des spans {#span-auto-linking}
{{< img src="serverless/lambda/tracing/autolink.png" alt="Dans Datadog, une trace DynamoDB. En haut, un message indique 'Cette trace est liée à d'autres traces'. L'onglet Liens de spans est ouvert et affiche un lien cliquable vers une autre trace DynamoDB." style="width:100%;" >}}

Datadog détecte automatiquement les spans liés lorsque des segments de vos requêtes asynchrones ne peuvent pas propager le contexte de trace. Par exemple, cela peut se produire lorsqu'une requête déclenche des [Événements de changement S3][28] ou des [Flux DynamoDB][29]. Vous pouvez voir les spans auto-liés apparaître dans l'[onglet Liens de spans][30]. Ceux-ci apparaissent comme **Retour** ou **Avance**.

_Retour_ : Le span lié a été causé par la trace que vous visualisez.

_Avance_ : Le span lié a causé la trace que vous visualisez.


<div class="alert alert-info">Les filtres d'échantillonnage et de <a href="/tracing/trace_pipeline/trace_retention/">rétention des traces</a> peuvent interférer avec l'auto-liaison. Pour améliorer vos chances de voir des spans auto-liés, augmentez votre taux d'échantillonnage ou ajustez vos filtres de rétention.</div>

### Technologies prises en charge {#supported-technologies}

L'auto-liaison des spans est disponible pour :
- Fonctions AWS Lambda Python instrumentées avec [`datadog-lambda-python`][33] la couche v101+
- Applications Python instrumentées avec [`dd-trace-py`][31] v2.16+
- Fonctions AWS Lambda Node.js instrumentées avec [`datadog-lambda-js`][34] la couche 118+
- Applications Node.js instrumentées avec [`dd-trace-js`][32] v4.53.0+ ou v5.29.0+

### Auto-liaison des flux de changement DynamoDB {#dynamodb-change-stream-auto-linking}

Pour [Flux de changement DynamoDB][29], l'auto-liaison des spans prend en charge les opérations suivantes :

- `PutItem`
- `UpdateItem`
- `DeleteItem`
- `BatchWriteItem`
- `TransactWriteItems`

<div class="alert alert-info">L'opération <code>PutItem</code> L'opération nécessite une configuration supplémentaire. Pour plus d'informations, consultez <a href="/serverless/aws_lambda/installation/python/#span-auto-linking">Instrumentation des applications serverless Python</a> ou <a href="/serverless/aws_lambda/installation/nodejs/#span-auto-linking">Instrumentation des applications serverless Node.js</a>.</div>

### Auto-liaison des notifications de changement S3 {#s3-change-notification-auto-linking}

Pour les [notifications de changement S3][28], la liaison automatique de Span prend en charge les opérations suivantes :

- `PutObject`
- `CompleteMultipartUpload`
- `CopyObject`


## Environnements hybrides {#hybrid-environments}

Pour une visibilité de bout en bout à travers les fonctions Lambda, les hôtes, les conteneurs et les services gérés, installez les SDK Datadog (`dd-trace`) à la fois sur vos fonctions Lambda et vos hôtes. Vos traces montrent alors une image complète des requêtes qui traversent les frontières de l'infrastructure.

Sur Lambda, installez `dd-trace` avec l'[Extension Datadog Lambda][35], qui exécute l'Agent Datadog à l'intérieur de l'environnement d'exécution Lambda et envoie les traces directement à Datadog avec un minimum de surcharge. L'Extension Lambda est la méthode d'installation recommandée pour les applications sans serveur nouvelles et existantes.

Consultez la [documentation APM de Datadog][16] pour la configuration du traçage dans les environnements basés sur des conteneurs et des hôtes.

## Profilage de vos Fonctions Lambda {#profiling-your-lambda-functions}

Le [Continuous Profiler][27] de Datadog est disponible en Preview pour Python dans la version 4.62.0 et avec la couche v62 et supérieure. Cette fonctionnalité optionnelle est activée en définissant la variable d'environnement `DD_PROFILING_ENABLED` sur `true`.

Le [Continuous Profiler][27] fonctionne en créant un thread qui se réveille périodiquement et prend un instantané du CPU et du tas de tout le code Python en cours d'exécution. Cela peut inclure le profiler lui-même. Si vous souhaitez que le profiler s'ignore lui-même, définissez `DD_PROFILING_IGNORE_PROFILER` sur `true`.

## Fusion de traces {#trace-merging}

### Cas d'utilisation {#use-cases}

Datadog recommande d'utiliser uniquement la [Datadog APM trace library] (`dd-trace`), mais dans certaines situations avancées, les utilisateurs peuvent combiner le traçage Datadog et AWS X-Ray en utilisant la fusion de traces. La fusion de traces est disponible pour les fonctions AWS Lambda en Node.js et Python. Si vous n'êtes pas sûr du SDK à utiliser, consultez [choisir votre SDK][17].

<div class="alert alert-info">Le traçage des AWS Step Functions est pris en charge nativement par Datadog et ne nécessite plus X-Ray. Voir <a href="/serverless/step_functions/">Surveillance sans serveur pour AWS Step Functions</a> et <a href="/serverless/step_functions/merge-step-functions-lambda/">Fusion des traces des Step Functions et Lambda</a>.</div>

Il y a deux raisons principales d'instrumenter à la fois `dd-trace` et les bibliothèques de traçage AWS X-Ray :
- Dans un environnement sans serveur AWS, vous tracez déjà vos fonctions Lambda avec `dd-trace`, vous avez besoin du traçage actif AWS X-Ray pour un service géré par AWS que Datadog APM n'instrumente pas encore (comme AppSync), et vous souhaitez visualiser les `dd-trace` et les spans AWS X-Ray dans une seule trace.
- Dans un environnement hybride avec à la fois des fonctions Lambda et des hôtes, `dd-trace` instrumente vos hôtes, AWS X-Ray instrumente vos fonctions Lambda, et vous souhaitez visualiser les traces connectées pour les transactions à travers les fonctions Lambda et les hôtes.

**Remarque :** Cela peut entraîner des factures d'utilisation plus élevées. Les spans X-Ray continuent d'être disponibles dans vos traces fusionnées après 2 à 5 minutes. Dans de nombreux cas, Datadog recommande d'utiliser uniquement un seul SDK. En savoir plus sur [le choix de votre SDK][17].

Voici des instructions de configuration pour les deux scénarios évoqués ci-dessus :

- [Fusion des traces dans un environnement serverless-first](#trace-merging-in-an-AWS-serverless-environment)
- [Fusion des traces entre AWS Lambda et les hôtes](#tracing-across-aws-lambda-and-hosts)

### Fusion des traces dans un environnement sans serveur AWS {#trace-merging-in-an-aws-serverless-environment}

AWS X-Ray fournit à la fois un service backend AWS (traçage actif AWS X-Ray) et un ensemble de bibliothèques clientes. [Activer uniquement le service backend AWS dans la console Lambda][18] vous donne des spans `Initialization` et `Invocation` pour vos fonctions AWS Lambda. Vous pouvez également activer le traçage actif AWS X-Ray depuis les consoles API Gateway et Step Function.

Les bibliothèques clientes AWS X-Ray et Datadog APM (`dd-trace`) ajoutent des métadonnées et des spans pour les appels en aval en accédant directement à la fonction. En supposant que vous utilisez `dd-trace` pour tracer au niveau du gestionnaire, votre configuration devrait être similaire à ce qui suit :

1. Vous avez activé [le traçage actif AWS X-Ray][18] sur vos fonctions Lambda depuis la console AWS Lambda et notre [intégration AWS X-Ray au sein de Datadog][19].
2. Vous avez instrumenté vos fonctions Lambda avec Datadog APM (`dd-trace`) en suivant [les instructions d'installation pour votre runtime Lambda][5].
3. Les bibliothèques tierces sont automatiquement patchées par `dd-trace`, donc les bibliothèques clientes AWS X-Ray n'ont pas besoin d'être installées.
4. Définissez la variable d'environnement `DD_MERGE_XRAY_TRACES` sur `true` sur vos fonctions Lambda pour fusionner les traces X-Ray et `dd-trace` (`DD_MERGE_DATADOG_XRAY_TRACES` en Ruby).

### Traçage entre AWS Lambda et les hôtes {#tracing-across-aws-lambda-and-hosts}

#### Propagation du contexte avec les SDK Datadog (recommandé) {#context-propagation-with-the-datadog-sdks-recommended}
Installez les SDK Datadog (`dd-trace`) sur vos fonctions Lambda et vos hôtes. Vos traces affichent alors automatiquement une vue complète des requêtes qui franchissent les limites de l'infrastructure, que ce soit AWS Lambda, des conteneurs, des hôtes sur site ou des services gérés.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="trace d'une requête d'un hôte vers une fonction Lambda" >}}

## Propagation des traces {#trace-propagation}
{{< img src="serverless/lambda-non-http-trace.png" alt="Trace distribuée sans serveur non-HTTP" style="width:100%;" >}}

### Configuration requise {#required-setup}

Une instrumentation supplémentaire est parfois nécessaire pour obtenir une trace unique et connectée dans les applications sans serveur Node et Python qui déclenchent des fonctions Lambda de manière asynchrone. Si vous débutez avec la surveillance des applications sans serveur dans Datadog, [suivez nos étapes d'installation principales][21] et [lisez cette page sur le choix de votre SDK][22]. Une fois que vous envoyez des traces de vos fonctions Lambda à Datadog en utilisant la [Bibliothèque Lambda Datadog][23], vous voudrez peut-être suivre ces étapes pour relier les traces entre deux fonctions Lambda dans des cas tels que :
- Déclenchement de fonctions Lambda via Step Functions
- Invocation de fonctions Lambda via des protocoles non-HTTP tels que MQTT

Le tracing d'un grand nombre de services AWS gérés ([liste complète][24]) est pris en charge par défaut. Il n'est pas nécessaire de suivre les étapes décrites sur cette page.

Pour associer le contexte des traces entre plusieurs ressources générant des traces, vous devez procéder comme suit :
- Inclure le contexte de trace Datadog dans les événements sortants. L'événement sortant peut provenir d'un hôte ou d'une fonction Lambda avec `dd-trace` installé.
- Extraction du contexte de trace dans la fonction Lambda du consommateur.

### Transmission du contexte de trace {#passing-trace-context}

Les extraits de code suivants permettent de transmettre le contexte des traces, par le biais des charges utiles sortantes, aux services qui ne prennent par en charge les en-têtes HTTP ou aux services gérés qui ne sont pas pris en charge [de façon native][24] par Datadog en Node et Python :

{{< tabs >}}
{{% tab "Python" %}}

En Python, vous pouvez utiliser la fonction d'aide `get_dd_trace_context` pour passer le contexte de trace aux événements sortants dans une fonction Lambda :

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing payload.
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

En Node, vous pouvez utiliser la fonction d'aide `getTraceHeaders` pour passer le contexte de trace aux événements sortants dans une fonction Lambda :

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // Captures current Datadog trace context.

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

#### Depuis les hôtes {#from-hosts}

Si vous ne passez pas le contexte de trace de vos fonctions Lambda, vous pouvez utiliser le modèle de code suivant à la place des fonctions d'aide `getTraceHeaders` et `get_dd_trace_context` pour obtenir le contexte de span actuel. Les instructions sur la façon de faire cela dans chaque runtime sont décrites [ici][25].

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### Extraction du contexte de trace {#extracting-trace-context}

Pour extraire le contexte de trace ci-dessus de la fonction Lambda du consommateur, vous devez définir une fonction d'extraction qui capture le contexte de trace avant l'exécution de votre gestionnaire de fonction Lambda. Pour ce faire, configurez la variable d'environnement `DD_TRACE_EXTRACTOR` pour pointer vers l'emplacement de votre fonction d'extraction. Le format pour cela est `<FILE NAME>.<FUNCTION NAME>`. Par exemple, `extractors.json` si l'extracteur `json` se trouve dans le fichier `extractors.js`. Datadog recommande de placer toutes vos méthodes d'extraction dans un seul fichier, car les extracteurs peuvent être réutilisés dans plusieurs fonctions Lambda. Ces extracteurs sont entièrement personnalisables pour s'adapter à tout cas d'utilisation.

**Remarques** :
- Si vous utilisez TypeScript ou un bundler comme webpack, vous devez `import` ou `require` votre module Node.js où les extracteurs sont définis. Cela garantit que le module est compilé et inclus dans votre package de déploiement Lambda.
- Si votre fonction Lambda Node.js s'exécute sur `arm64`, vous devez [définir l'extracteur dans le code de votre fonction][26] au lieu d'utiliser la variable d'environnement `DD_TRACE_EXTRACTOR`.

#### Exemples d'extracteurs {#sample-extractors}

Le code suivant comporte des extraits de fonction d'extraction que vous pouvez utiliser pour propager le contexte des traces à l'échelle d'un système tiers ou d'une API ne prenant pas en charge les en-têtes HTTP standard.

{{< tabs >}}
{{% tab "Python" %}}

```py
def extractor(payload):
    trace_headers = json.loads(payload["_datadog"]);
    trace_id = trace_headers["x-datadog-trace-id"];
    parent_id = trace_headers["x-datadog-parent-id"];
    sampling_priority = trace_headers["x-datadog-sampling-priority"];
    return trace_id, parent_id, sampling_priority
```
{{% /tab %}}
{{% tab "Node.js" %}}

```js
exports.json = (payload) => {
    const traceData = payload._datadog
    const traceID = traceData["x-datadog-trace-id"];
    const parentID = traceData["x-datadog-parent-id"];
    const sampledHeader = traceData["x-datadog-sampling-priority"];
    const sampleMode = parseInt(sampledHeader, 10);

    return {
      parentID,
      sampleMode,
      source: 'event',
      traceID,
    };
};
```
{{% /tab %}}
{{% tab "Go" %}}

```go
var exampleSQSExtractor = func(ctx context.Context, ev json.RawMessage) map[string]string {
	eh := events.SQSEvent{}

	headers := map[string]string{}

	if err := json.Unmarshal(ev, &eh); err != nil {
		return headers
	}

	// Using SQS as a trigger with a batchSize=1 so it's important we check
  // for this as a single SQS message will drive the execution of the handler.
	if len(eh.Records) != 1 {
		return headers
	}

	record := eh.Records[0]

	lowercaseHeaders := map[string]string{}
	for k, v := range record.MessageAttributes {
		if v.StringValue != nil {
			lowercaseHeaders[strings.ToLower(k)] = *v.StringValue
		}
	}

	return lowercaseHeaders
}

cfg := &ddlambda.Config{
    TraceContextExtractor: exampleSQSExtractor,
}
ddlambda.WrapFunction(handler, cfg)
```
{{% /tab %}}
{{< /tabs >}}

## Envoi de traces à Datadog avec l'intégration X-Ray {#sending-traces-to-datadog-with-the-x-ray-integration}

Si vous avez une instrumentation X-Ray existante et que vous souhaitez continuer à l'utiliser, [installez l'intégration AWS X-Ray][2] pour envoyer des traces de X-Ray à Datadog. Pour les nouvelles applications sans serveur, Datadog recommande d'instrumenter les fonctions Lambda avec l'[extension Datadog Lambda][35] à la place.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /fr/integrations/amazon_xray/#overview
[3]: /fr/tracing/trace_collection/compatibility/python
[4]: /fr/tracing/trace_collection/compatibility/nodejs
[5]: /fr/serverless/installation/
[6]: /fr/serverless/distributed_tracing/#trace-merging
[7]: https://docs.datadoghq.com/fr/help/
[8]: /fr/tracing/trace_collection/compatibility/ruby
[9]: /fr/tracing/trace_collection/compatibility/go
[10]: /fr/tracing/other_telemetry/connect_logs_and_traces/java/
[11]: /fr/tracing/trace_collection/compatibility/java
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /fr/tracing/trace_collection/compatibility/dotnet-core
[15]: /fr/serverless/azure_app_services
[16]: /fr/tracing/trace_collection/
[17]: /fr/serverless/distributed_tracing/
[18]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[19]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[20]: /fr/tracing/send_traces/
[21]: /fr/serverless/installation
[22]: /fr/serverless/distributed_tracing
[23]: /fr/serverless/datadog_lambda_library
[24]: /fr/serverless/distributed_tracing#runtime-recommendations
[25]: /fr/tracing/trace_collection/custom_instrumentation/
[26]: /fr/serverless/guide/handler_wrapper/
[27]: /fr/profiler/
[28]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html
[29]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[30]: https://docs.datadoghq.com/fr/tracing/trace_explorer/trace_view/?tab=spanlinksbeta
[31]: https://github.com/DataDog/dd-trace-py/
[32]: https://github.com/DataDog/dd-trace-js/
[33]: https://github.com/DataDog/datadog-lambda-python
[34]: https://github.com/DataDog/datadog-lambda-js
[35]: /fr/serverless/libraries_integrations/extension/