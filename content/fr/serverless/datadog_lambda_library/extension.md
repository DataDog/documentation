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

Les extensions AWS Lambda sont des processus complémentaires qui permettent d'enrichir vos fonctions Lambda. Elles s'exécutent dans l'environnement d'exécution Lambda, avec le code de votre fonction Lambda. L'extension Datadog est une version plus légère de l'Agent Datadog, conçue pour s'exécuter en même temps que votre code avec un impact minimal sur les performances.

L'extension Datadog prend en charge l'envoi de métriques custom et de logs [de manière synchrone][1] pendant l'exécution de votre fonction AWS Lambda. Cela signifie que vous pouvez envoyer une partie de vos données de télémétrie sans passer par le [Forwarder Datadog][2]. **Remarque** : le Forwarder Datadog reste nécessaire pour envoyer des traces à Datadog.

## Configuration

L'extension Datadog prend actuellement en charge les runtimes Node.js et Python.

### En tant que couche Lambda

L'extension Lambda Datadog est distribuée sous forme de couche Lambda autonome (distincte de la [bibliothèque Lambda Datadog][3]).

1. Instrumentez votre application [Python][4] ou [Node.js][5] en installant la bibliothèque Lambda Datadog.

2. Ajoutez la couche Lambda pour l'extension Datadog à votre fonction Lambda AWS avec l'ARN suivant :

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<VERSION_NUMBER>
    ```

    Remplacez les valeurs fictives de l'ARN comme suit :
    - Remplacez `<AWS_REGION>` par la même région AWS que votre fonction Lambda, par exemple `us-east-1`.
    - Remplacez `<VERSION_NUMBER>` par la version de l'extension Lambda Datadog que vous souhaitez utiliser `7`. Pour vérifier la version actuellement utilisée, consultez les derniers tags d'image du [référentiel Amazon ECR][6].

    **Remarque** : cette couche fonctionne indépendamment de la couche Lambda Datadog. Si vous avez installé la bibliothèque Lambda Datadog en tant que couche Lambda,
    deux couches Lambda sont désormais associées à votre fonction.

3. Consultez l'[exemple de code][7] pour découvrir comment envoyer une métrique custom.

### En tant qu'image de conteneur

Si votre fonction est déployée en tant qu'image de conteneur, vous ne pouvez pas ajouter de couche Lambda à votre fonction. Vous devez à la place installer directement la bibliothèque Lambda Datadog et l'extension Lambda Datadog dans l'image de votre fonction.

Commencez par suivre les instructions d'installation pour [Node.js][5] or [Python][4] afin d'installer la bibliothèque Lambda Datadog. Référez-vous aux instructions concernant les fonctions déployées en tant qu'images de conteneur.

Ajoutez ensuite l'extension Lambda Datadog à l'image de votre conteneur en indiquant ce qui suit dans votre Dockerfile :

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Remplacez `<TAG>` par un numéro de version spécifique (par exemple, `7`) ou par `latest`. Accédez au [référentiel Amazon ECR][6] pour consulter la liste complète des tags disponibles.

## Collecte de logs

Pour envoyer vos logs AWS Lambda à Datadog à l'aide de l'extension, définissez la variable d'environnement `DD_LOGS_ENABLED` sur `true` dans votre fonction.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[2]: /fr/serverless/forwarder
[3]: /fr/serverless/datadog_lambda_library
[4]: /fr/serverless/installation/python
[5]: /fr/serverless/installation/nodejs
[6]: https://gallery.ecr.aws/datadog/lambda-extension
[7]: /fr/serverless/custom_metrics#custom-metrics-sample-code