---
title: Extension Lambda Datadog (en préversion)
kind: documentation
further_reading:
  - link: serverless/custom_metrics
    tag: Documentation
    text: Envoyer des métriques custom à partir d'AWS Lambda
---
## Présentation

<div class="alert alert-warning"> L'extension AWS Lambda Datadog est disponible sous forme de préversion publique. Si vous souhaitez nous faire part de vos remarques, contactez l'<a href="/help">assistance Datadog</a>.</div>

Les extensions AWS Lambda sont des processus complémentaires qui permettent d'enrichir vos fonctions Lambda. Elles s'exécutent dans l'environnement d'exécution Lambda, avec le code de votre fonction Lambda. L'extension Datadog est une version plus légère de l'Agent Datadog, conçue pour s'exécuter en même temps que votre code avec un impact minimal sur les performances.

L'extension Datadog prend en charge l'envoi de métriques custom et de logs [de manière synchrone][1] pendant l'exécution de votre fonction AWS Lambda. Cela signifie que vous pouvez envoyer une partie de vos données de télémétrie sans passer par le [Forwarder Datadog][2]. **Remarque** : le Forwarder Datadog reste nécessaire pour envoyer des traces à Datadog.

## Configuration

L'extension Datadog est distribuée sous forme de couche Lambda autonome (distincte de la [bibliothèque Lambda Datadog][3]) et prend en charge les runtimes Node.js et Python.

1. Instrumentez votre application [Python][4] ou [Node.js][5].

2. Ajoutez la couche Lambda pour l'extension Datadog à votre fonction AWS Lambda :

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:7
    ```

    Remplacez le paramètre fictif `AWS_REGION` dans l'ARN de la couche Lambda par les valeurs adéquates.

3. Si vous utilisez Node.js ou Python, ajoutez la couche Lambda pour la [bibliothèque Datadog][7] à votre fonction AWS Lambda :

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
    ```

    Les options de `RUNTIME` disponibles sont `Node10-x`, `Node12-x`, `Python37` et `Python38`. Pour `VERSION`, consultez la dernière version de [Node.js][8] ou [Python][9].

4. Reportez-vous à l'[exemple de code][10] pour envoyer une métrique custom.

### Collecte de logs

Pour envoyer vos logs Lambda AWS à Datadog à l'aide de l'extension, définissez la variable d'environnement `DD_LOGS_ENABLED` sur `true` dans votre fonction. Cela générera en outre des [métriques Datadog optimisées][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[2]: /fr/serverless/forwarder
[3]: /fr/serverless/datadog_lambda_library
[4]: /fr/serverless/installation/python
[5]: /fr/serverless/installation/nodejs
[6]: /fr/serverless/installation/go
[7]: https://docs.datadoghq.com/fr/serverless/datadog_lambda_library
[8]: https://github.com/DataDog/datadog-lambda-js/releases
[9]: https://github.com/DataDog/datadog-lambda-python/releases
[10]: /fr/serverless/custom_metrics#custom-metrics-sample-code
[11]: /fr/serverless/enhanced_lambda_metrics
