---
dependencies:
- "https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md"
kind: documentation
title: CLI Serverless Datadog
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta ouverte. Si vous avez des questions ou des problèmes, faites-le-nous savoir en créant un <a href="https://github.com/DataDog/datadog-ci/issues">ticket</a> dans notre référentiel.
</div>

Vous pouvez utiliser l'interface de ligne de commande pour instrumenter vos fonctions AWS Lambda avec Datadog.

### Avant de commencer

Exécutez la commande suivante pour faire en sorte que vos identifiants AWS `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` soient disponibles dans votre environnement, ou utilisez l'une des méthodes d'authentification prises en charge par le [SDK AWS pour JS][1].

```bash

export AWS_ACCESS_KEY_ID="<ID CLÉ ACCÈS>"
export AWS_SECRET_ACCESS_KEY="<CLÉ ACCÈS>"
```

Téléchargez [Datadog CI][2].

### Configuration

La configuration se fait via un fichier JSON. Spécifiez le fichier `datadog-ci.json` en utilisant l'argument `--config` et la structure de fichier de configuration suivante :

```json
{
    "lambda": {
        "layerVersion": 10,
        "functions": ["arn:aws:lambda:us-east-1:000000000000:function:autoinstrument"],
        "region": "us-east-1",
        "tracing": true,
        "mergeXrayTraces": true,
        "forwarder": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
    }
}
```

#### Commandes

Utilisez `instrument` pour appliquer l'instrumentation Datadog à une fonction Lambda.

L'interface de ligne de commande accepte l'argument `--function` (ou `-f`) pour spécifier la fonction à instrumenter. Cette valeur doit être un ARN de fonction.

```bash
datadog-ci lambda instrument --function arn:aws:lambda:us-east-1:000000000000:function:autoinstrument --layerVersion 10
# Les arguments peuvent également être utilisés sous forme raccourcie
datadog-ci lambda instrument -f autoinstrument -f another-func -r us-east-1 -v 10
# Dry run de toutes les commandes de mise à jour
datadog-ci lambda instrument -f autoinstrument -r us-east-1 -v 10 --dry
```

Tous les arguments :

| Argument | Raccourci | Description | Valeur par défaut |
| -------- | --------- | ----------- | ------- |
| --function | -f | Permet de spécifier une fonction à instrumenter | |
| --region | -r | Région par défaut à utiliser, lorsque la région n'est pas spécifiée dans l'ARN de fonction | |
| --layerVersion | -v | Version de la couche Datadog à appliquer. La version dépend du runtime utilisé. Pour connaître la version de la couche la plus récente, consultez les notes de version du référentiel datadog-lambda-layer pour [JS][3] ou [python][4]. | |
| --tracing |  | Définit si le tracing dd-trace doit être activé ou non sur votre fonction Lambda. | true |
| --mergeXrayTraces | | Définit si les traces dd-trace doivent être associées ou non aux traces AWS X-Ray. Utile pour le tracing de spans API Gateway. | false |
| --flushMetricsToLogs | | Définit si les métriques doivent être envoyées de façon asynchrone ou non à Datadog via notre [Forwarder](https://docs.datadoghq.com/serverless/forwarder/) | true |
| --forwarder | | L'ARN du [Forwarder Datadog](https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring) auquel associer le LogGroup de cette fonction. | |
| --dry | -d | Prévisualiser les modifications que la commande exécutée appliquerait. | false |

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-python/releases
