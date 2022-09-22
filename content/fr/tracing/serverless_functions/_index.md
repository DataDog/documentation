---
title: Tracer des fonctions sans serveur
kind: documentation
description: Envoyer des traces issues de vos fonctions sans serveur à Datadog
further_reading:
  - link: serverless
    text: Surveillance sans serveur avec Datadog
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Tracer des fonctions sans serveur"  style="width:100%;">}}

Dans une architecture hybride, les fonctions sans serveur sont des éléments clés de votre application. Inclure ces fonctions dans vos traces distribuées peut s'avérer indispensable pour détecter les goulots d'étranglement et les pannes dans vos systèmes distribués.

## Choisir votre bibliothèque de tracing

En fonction de votre langage et de votre configuration, choisissez d'installer l'APM Datadog ou AWS X-Ray pour vos traces. Cliquez sur le lien dans le titre de colonne approprié pour afficher les instructions d'installation de la solution qui vous convient le mieux :

| [APM Datadog][1]          | [AWS X-Ray][2]                                                        |
|---------------------------------|-------------------------------------------------------------------------|
| Utilise les bibliothèques d'intégration de l'APM Datadog pour un tracing de bout en bout.  | Récupère les traces depuis AWS X-Ray.|
| Configuration à l'aide de vos outils de développement sans modifier votre code avec les intégrations Serverless Framework et AWS SAM. | Installation de la bibliothèque client AWS X-Ray pour votre runtime Lambda. |
| Prise en charge de Python, Node.js, Ruby. |  Prise en charge des runtimes Lambda. |

## Enrichir le tracing AWS X-Ray avec l'APM Datadog

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Diagramme de l'architecture de tracing d'AWS Lambda avec Datadog" >}}

Vous pouvez également configurer _à la fois_ le tracing AWS X-Ray et l'APM Datadog, mais notez que cela peut entraîner une augmentation de votre facture. Dans ce cas, utilisez les instructions de configuration ci-dessous :

- [Configurer le tracing dans un environnement principalement sans serveur](#tracing-in-a-serverless-first-environment)
- [Configurer le tracing de fonctions AWS Lambda et de hosts](#tracing-across-aws-lambda-and-hosts)

#### Configurer le tracing dans un environnement principalement sans serveur

AWS X-Ray propose à la fois un service AWS backend et un ensemble de bibliothèques client. Activé seul, le service AWS backend vous offre une span d'appel pour vos fonctions AWS Lambda ainsi que des traces pour vos API Gateways et files d'attente de messages Amazon.

Les bibliothèques client AWS X-Ray et APM Datadog tracent toutes les deux les intégrations dans votre code. Si vous utilisez la bibliothèque client de l'APM Datadog au lieu de la bibliothèque client AWS X-Ray pour tracer et visualiser les traces, suivez les deux étapes ci-dessous :

1. Activez l'[intégration AWS X-Ray][2] pour commencer à tracer vos fonctions Lambda.
2. [Configurez l'APM Datadog][1] sur vos fonctions Lambda.
3. Fusionnez les traces générées par l'intégration AWS X-Ray et l'APM Datadog.


{{< tabs >}}
{{< tab "Node.js" >}}
```javascript
module.exports.hello = datadog(
    (event, context, callback) => {
        longCalculation();

        callback(null, {
            statusCode: 200,
            body: 'Hello from serverless!'
        });
    },
    { mergeDatadogXrayTraces: true }
);
```
{{< /tab >}}

{{< tab "Python" >}}

Définissez la variable d'environnement `DD_MERGE_XRAY_TRACES` sur `True` sur votre fonction Lambda.

{{< /tab >}}

{{< tab "Ruby" >}}

Définissez la variable d'environnement `DD_MERGE_DATADOG_XRAY_TRACES` sur `True` sur votre fonction Lambda.

{{< /tab >}}

{{< /tabs >}}

#### Configurer le tracing de fonctions AWS Lambda et de hosts

Lorsque cela est approprié, Datadog associe les traces AWS X-Ray aux traces de l'APM Datadog natives. Vos traces peuvent ainsi dresser un tableau complet des requêtes qui franchissent les limites de votre infrastructure, qu'il s'agisse de fonctions Lambda AWS, de hosts sur site ou de services gérés.

1. Activez l'[intégration AWS X-Ray][2] pour commencer à tracer vos fonctions Lambda.
2. [Configurez l'APM Datadog][3] sur vos hosts et votre infrastructure à base de conteneurs.

**Remarque** : le tracing distribué est pris en charge pour tout runtime d'applications basé sur un host ou un conteneur.

**Remarque** : pour que les traces X-Ray apparaissent sur le même flamegraph que celles de l'APM de Datadog, tous les services doivent posséder le [même tag `env`](#tag-env).

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="tracing d'une requête entre un host et une fonction Lambda" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/
[2]: /fr/tracing/serverless_functions/enable_aws_xray/
[3]: /fr/tracing/send_traces/