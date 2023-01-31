---
dependencies:
- "https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md"
kind: documentation
title: CLI Serverless Datadog
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta ouverte. Si vous avez des questions ou des problèmes, faites-le-nous savoir en créant un <a href="https://github.com/DataDog/datadog-ci/issues">ticket</a> dans notre référentiel.
</div>

Vous pouvez utiliser l'interface de ligne de commande pour instrumenter vos fonctions AWS Lambda avec Datadog. Seuls les runtimes Python Node.js sont actuellement pris en charge.

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

Utilisez `instrument` pour appliquer l'instrumentation Datadog à une fonction Lambda. Cette commande ajoute automatiquement la bibliothèque Lambda Datadog (en tant que couche Datadog) aux fonctions Lambda instrumentées et modifie leur configuration.

Cette commande constitue la solution la plus simple pour tester une instrumentation Datadog sur une fonction Lambda existante. Pour appliquer une instrumentation à un environnement de production, exécutez cette commande dans vos pipelines CI/CD afin de vous assurer que vos fonctions Lambda sont toujours mises à jour pour l'instrumentation.

```bash
# Instrumenter une fonction spécifiée par son ARN
datadog-ci lambda instrument --function arn:aws:lambda:us-east-1:000000000000:function:functionname --layerVersion 10

# Utiliser les formats abrégés
datadog-ci lambda instrument -f arn:aws:lambda:us-east-1:000000000000:function:functionname -v 10

# Instrumenter plusieurs fonctions spécifiées par leur nom (--region doit être défini)
datadog-ci lambda instrument -f functionname -f another-functionname -r us-east-1 -v 10

# Tester toutes les commandes de mise à jour
datadog-ci lambda instrument -f functionname -r us-east-1 -v 10 --dry
```

Tous les arguments :

| Argument | Raccourci | Description | Valeur par défaut |
| -------- | --------- | ----------- | ------- |
| --function | -f | L'ARN de la fonction Lambda à instrumenter, ou le nom de la fonction Lambda (--region doit être défini). | |
| --region | -r | La région par défaut à utiliser, lorsque `--function` est spécifié par le nom de la fonction, et non par l'ARN. | |
| --layerVersion | -v | La version de la couche Datadog à appliquer. La version dépend du runtime utilisé. Pour connaître la version de la couche la plus récente, consultez les notes de version du référentiel datadog-lambda-layer pour [JS][3] ou [Python][4]. | |
| --tracing |  | Définit si le tracing dd-trace doit être activé ou non sur votre fonction Lambda. | true |
| --mergeXrayTraces | | Définit si les traces dd-trace doivent être associées ou non aux traces AWS X-Ray. Utile pour le tracing de spans API Gateway. | false |
| --flushMetricsToLogs | | Définit si les métriques doivent être envoyées de façon [asynchrone](https://docs.datadoghq.com/serverless/custom_metrics?tab=python#activer-les-metriques-custom-asynchrones) ou non via le Forwarder Datadog. | true |
| --forwarder | | L'ARN du [Forwarder Datadog](https://docs.datadoghq.com/serverless/forwarder/) auquel associer le groupe de logs de cette fonction. | |
| --dry | -d | Prévisualiser les modifications que la commande exécutée appliquerait. | false |

## Communauté

Si vous avez des commentaires ou des questions concernant les fonctionnalités, rejoignez le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-python/releases
