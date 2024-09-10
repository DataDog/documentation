---
aliases:
- /fr/serverless/datadog_lambda_library/
- /fr/serverless/serverless_integrations/cli/
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md
title: CLI Serverless Datadog
---
Vous pouvez utiliser l'interface de ligne de commande pour instrumenter vos fonctions AWS Lambda avec Datadog. L'interface de ligne de commande permet d'instrumenter vos fonctions Lambda existantes en modifiant leur configuration. De ce fait, elle ne nécessite *pas* un redéploiement. Il s'agit du moyen le plus rapide de profiter des fonctionnalités de surveillance sans serveur de Datadog.

Vous pouvez également ajouter la commande à vos pipelines de CI/CD pour instrumenter *toutes* vos applications sans serveur. Exécutez la commande *après* le déploiement normal de votre application sans serveur, de sorte que les modifications apportées par l'interface de ligne de commande Datadog ne soient pas écrasées.

## Installation

Pour instrumenter vos fonctions Lambda à l'aide de la commande `datadog-ci lambda instrument`, suivez les instructions ci-dessous pour le runtime de votre choix :

- [.NET](https://docs.datadoghq.com/serverless/installation/dotnet/?tab=datadogcli)
- [Go](https://docs.datadoghq.com/serverless/installation/go/?tab=datadogcli)
- [Java](https://docs.datadoghq.com/serverless/installation/java/?tab=datadogcli)
- [Node.js](https://docs.datadoghq.com/serverless/installation/nodejs/?tab=datadogcli)
- [Python](https://docs.datadoghq.com/serverless/installation/python/?tab=datadogcli)
- [Ruby](https://docs.datadoghq.com/serverless/installation/ruby/?tab=datadogcli)

## Commandes

### `instrument`

Exécutez `datadog-ci lambda instrument` pour appliquer l'instrumentation Datadog à une fonction Lambda. Cette commande ajoute la bibliothèque Lambda Datadog et/ou l'extension Lambda Datadog sous forme de couches Lambda aux fonctions Lambda instrumentées, et modifie la configuration de ces fonctions Lambda.

```bash

datadog-ci lambda instrument -f <nom-fonction> -f <autre-nom-fonction> -r us-east-1 -v 46 -e 10

# Instrumenter une ou plusieurs fonctions en mode interactif
datadog-ci lambda instrument -i

# Instrumenter plusieurs fonctions qui correspondent à une expression régulière
datadog-ci lambda instrument --functions-regex <expression-régulière-valide> -r us-east-1 -v 46 -e 10

# Tester toutes les mises à jour
datadog-ci lambda instrument -f <nom-fonction> -f <autre-nom-fonction> -r us-east-1 -v 46 -e 10 --dry
```

### `uninstrument`

Exécutez `datadog-ci lambda uninstrument` pour annuler l'instrumentation Datadog dans une fonction Lambda. Cette commande supprime automatiquement la configuration Datadog, comme la bibliothèque Lambda Datadog et les couches de l'extension Lambda Datadog, ainsi que les autres configurations appliquées par datadog-ci.

```bash
# Annuler l'instrumentation de plusieurs fonctions dont les noms sont indiqués
datadog-ci lambda uninstrument -f <nom-fonction> -f <autre-nom-fonction> -r us-east-1

# Annuler l'instrumentation d'une ou de plusieurs fonctions en mode interactif
datadog-ci lambda uninstrument -i

# Annuler l'instrumentation de plusieurs fonctions qui correspondent à une expression régulière
datadog-ci lambda uninstrument --functions-regex <expression-régulière-valide> -r us-east-1

# Tester toutes les mises à jour
datadog-ci lambda uninstrument -f <nom-fonction> -f <autre-nom-fonction> -r us-east-1 --dry
```

Consultez la section Configuration pour obtenir plus de paramètres.

## Configuration

### Identifiants AWS

Vous devez disposer d'[identifiants AWS](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) valides et autorisés à accéder aux services Lambda et CloudWatch dans lesquels vous exécutez les commandes `datadog-ci lambda`.

### Variables d'environnement

Vous devez exposer ces variables d'environnement dans l'environnement où vous exécutez `datadog-ci lambda instrument` :

| Variable d'environnement | Description | Exemple |
| --- | --- | --- |
| `DATADOG_API_KEY` | Clé d'API Datadog. Permet de définir la variable d'environnement `DD_API_KEY` sur la configuration de votre fonction Lambda. Pour savoir comment obtenir une clé d'API Datadog, consultez la [documentation dédiée aux clés d'API][6].  | `export DATADOG_API_KEY=<CLÉ_API>` |
| `DATADOG_API_KEY_SECRET_ARN` | L'ARN du secret stockant la clé d'API Datadog dans AWS Secrets Manager. Définit la variable `DD_API_KEY_SECRET_ARN` sur la configuration de votre fonction Lambda. Remarques : la variable `DD_API_KEY_SECRET_ARN` est ignorée lorsque la variable `DD_KMS_API_KEY` est définie. Ajoutez l'autorisation `secretsmanager:GetSecretValue` au rôle d'exécution Lambda. | `export DATADOG_API_KEY_SECRET_ARN=<ARN_RESSOURCE_SECRETS_MANAGER>` |
| `DATADOG_KMS_API_KEY` | La clé d'API Datadog chiffrée via KMS. Permet de définir la variable d'environnement `DD_KMS_API_KEY` sur la configuration de votre fonction Lambda. Remarque : `la variable `DD_API_KEY` est ignorée lorsque la variable `DD_KMS_API_KEY` est définie. | `export DATADOG_KMS_API_KEY=<CLÉ_API_CHIFFRÉE_VIA_KMS>` |
| `DATADOG_SITE` | Définit le site Datadog auquel envoyer les données. Nécessaire uniquement lors de l'utilisation de l'extension Lambda Datadog. Valeurs acceptées : `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com` et `ddog-gov.com`. Valeur par défaut : `datadoghq.com`. Définit la variable d'environnement `DD_SITE` sur les configurations de votre fonction Lambda. | `export DATADOG_SITE="datadoghq.com"` |


### Arguments

La configuration peut être effectuée à l'aide d'arguments de ligne de commande ou d'un fichier de configuration JSON (voir la section suivante).

#### `instrument`
Vous pouvez transmettre les arguments suivants à `instrument` pour spécifier son comportement. Ces arguments remplaceront les valeurs définies dans le fichier de configuration, le cas échéant.

| Argument | Raccourci | Description | Valeur par défaut |
| --- | --- | --- | --- |
| `--function` | `-f` | L'ARN de la fonction Lambda à **instrumenter**, ou le nom de la fonction Lambda (`--region` doit être défini). | |
| `--functions-regex` | | Une expression régulière à faire correspondre avec le nom de la fonction Lambda. | |
| `--interactive` | `-i` | Permet à l'utilisateur de choisir de façon interactive le type d'instrumentation de sa fonction. Avec ce mode, il n'est pas nécessaire de fournir d'autres flags, car vous serez invité à fournir les informations pertinentes. | |
| `--region` | `-r` | La région par défaut à utiliser, lorsque `--function` est spécifié par le nom de la fonction, et non par l'ARN. | |
| `--service` | | Utilisez `--service` pour regrouper les fonctions connexes appartenant à des workloads similaires. Consultez [cette page][9] pour en savoir plus sur le tag `service`. | |
| `--version` | | Ajoutez le tag `--version` pour mettre en corrélation des pics de latence, de charge ou d'erreurs avec les nouvelles versions. Consultez [cette page][8] pour en savoir plus sur le tag `version`. | |
| `--env` | | Utilisez `--env` pour séparer vos environnements de staging, développement et production. Consultez [cette page][7] pour en savoir plus sur le tag `env`. | |
| `--extra-tags` | | Ajoutez des tags personnalisés à votre fonction Lambda dans Datadog. Sa valeur doit correspondre à une liste de paires `<key>:<value>` séparées par des virgules, par exemple : `layer:api,team:intake`. | |
| `--layer-version` | `-v` | Version de la couche de la bibliothèque Lambda Datadog à appliquer. La version dépend du runtime utilisé. Pour connaître la version de la couche la plus récente, consultez les notes de version du référentiel datadog-lambda-layer [JS][3] ou [Python][4]. | |
| `--extension-version` | `-e` | Version de la couche de l'extension Lambda Datadog à appliquer. Lorsque le paramètre `extension-version` est défini, assurez-vous d'exporter également `DATADOG_API_KEY` (ou en cas de clé chiffrée, `DATADOG_KMS_API_KEY` ou `DATADOG_API_KEY_SECRET_ARN`) dans votre environnement. Lorsque vous utilisez `extensionVersion`, ne définissez pas `forwarder`. Consultez [cette page][5] pour en savoir plus sur l'extension Lambda. | |
| `--tracing` |  | Définit si le tracing dd-trace doit être activé ou non sur votre fonction Lambda. | `true` |
| `--merge-xray-traces` | | Définit si les traces dd-trace doivent être associées ou non aux traces AWS X-Ray. Utile pour le tracing de spans API Gateway. | `false` |
| `--flush-metrics-to-logs` | | Définit si les métriques doivent être envoyées de façon [asynchrone][11] ou non via le Forwarder Datadog. Si vous désactivez ce paramètre, vous devez exporter `DATADOG_API_KEY` (ou en cas de clé chiffrée, `DATADOG_KMS_API_KEY` ou `DATADOG_API_KEY_SECRET_ARN`). | `true` |
| `--capture-lambda-payload` | | Définit si la charge utile et la réponse d'une invocation Lambda sont enregistrées et stockées. | `false` |
| `--forwarder` | | L'ARN du [Forwarder Datadog][10] auquel associer le groupe de logs de cette fonction. | |
| `--dry` | `-d` | Prévisualiser les modifications que la commande exécutée appliquerait. | `false` |
| `--log-level` | | Définir la valeur sur `debug` pour voir une autre sortie provenant de la bibliothèque Lambda Datadog et/ou de l'extension Lambda à des fins de dépannage. | |
| `--source-code-integration` | `-s` | Définit si l'intégration du code source de Datadog doit être activée ou non. Ce paramètre permet d'envoyer à Datadog les métadonnées Git dans le répertoire local actuel et de taguer vos fonctions lambda avec le dernier commit. Indiquez une valeur pour `DATADOG_API_KEY` si vous utilisez cette fonctionnalité. **Remarque** : le référentiel Git ne doit pas se trouver avant un élément distant et ne doit pas être corrompu. | `false` |

<br />

#### `uninstrument`
Les arguments suivants sont transmis à `uninstrument` pour spécifier son comportement. Ces arguments remplaceront les valeurs définies dans le fichier de configuration, le cas échéant.

Tout autre argument indiqué dans le tableau `instrument`, mais pas en dessous, sera ignoré afin de vous permettre d'annuler l'instrumentation plus rapidement, si besoin.

| Argument | Raccourci | Description | Valeur par défaut |
| --- | --- | --- | --- |
| `--function` | `-f` | L'ARN de la fonction Lambda dont il faut **annuler l'instrumentation**, ou le nom de la fonction Lambda (`--region` doit être défini). | |
| `--functions-regex` | | Une expression régulière à faire correspondre avec la fonction Lambda dont il faut **annuler l'instrumentation**. | |
| `--region` | `-r` | La région par défaut à utiliser, lorsque `--function` est spécifié par le nom de la fonction, et non par l'ARN. | |
| `--forwarder` | | L'ARN du [Forwarder Datadog][10] à supprimer de cette fonction. | |
| `--dry` | `-d` | Prévisualiser les modifications que la commande exécutée appliquerait. | `false` |

<br/>

### Fichier de configuration

Au lieu de fournir des arguments, vous pouvez créer un fichier de configuration dans votre projet et exécuter simplement la commande `datadog-ci lambda {instrument|uninstrument} --config datadog-ci.json` sur chaque déploiement. Spécifiez le `datadog-ci.json` en utilisant l'argument `--config` et utilisez cette structure de fichier de configuration :

```json
{
    "lambda": {
        "layerVersion": 10,
        "extensionVersion": 8,
        "functions": ["arn:aws:lambda:us-east-1:000000000000:function:autoinstrument"],
        "region": "us-east-1",
        "tracing": true,
        "mergeXrayTraces": true,
        "captureLambdaPayload": true,
        "forwarder": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
        "logLevel": "debug",
        "service":"some-service",
        "version":"b17s47h3w1n",
        "environment":"staging",
        "extraTags":"layer:api,team:intake"
    }
}
```
## Communauté

Si vous avez des commentaires ou des questions concernant les fonctionnalités, rejoignez le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[5]: https://docs.datadoghq.com/fr/serverless/datadog_lambda_library/extension
[6]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[7]: https://docs.datadoghq.com/fr/serverless/troubleshooting/serverless_tagging/#the-env-tag
[8]: https://docs.datadoghq.com/fr/serverless/troubleshooting/serverless_tagging/#the-version-tag
[9]: https://docs.datadoghq.com/fr/serverless/troubleshooting/serverless_tagging/#the-service-tag
[10]: https://docs.datadoghq.com/fr/serverless/forwarder/
[11]: https://docs.datadoghq.com/fr/serverless/custom_metrics?tab=python#enabling-asynchronous-custom-metrics