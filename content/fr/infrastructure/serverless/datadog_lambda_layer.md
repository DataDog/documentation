---
title: Couche Lambda Datadog
kind: documentation
aliases:
  - /fr/infrastructure/serverless/datadog-lambda-layer
  - /fr/infrastructure/serverless/lambda_layer
  - /fr/infrastructure/serverless/lambda-layer
further_reading:
  - link: /integrations/amazon_lambda/
    tag: "Intégration AWS\_Lambda"
    text: "Intégration AWS\_Lambda"
---
La couche Lambda Datadog est utilisée pour :

- La création en temps réel des [métriques Lambda optimisées][1] portant sur les appels, les erreurs, les démarrages à froid, etc.
- L'envoi (synchrone ou asynchrone) de métriques custom
- La propagation automatique des en-têtes de tracing entre les requêtes en amont et les services en aval. Il est ainsi possible de procéder au tracing distribué de l'ensemble de vos fonctions Lambda, hosts, conteneurs et autres infrastructures exécutant l'Agent Datadog.
- Le packaging de la bibliothèque `dd-trace` permet aux clients de tracer leurs fonctions Lambda avec les bibliothèques de tracing Datadog, actuellement disponibles pour Node.js, Python et Ruby. D'autres runtimes seront prochainement pris en charge.

Datadog propose plusieurs couches Lambda pour les langages Python, Node.js et Ruby. Go est également pris en charge avec un [package][7] à inclure dans votre projet. Nous travaillons actuellement à la prise en charge d'autres langages et runtimes. Si vous souhaitez que Datadog prenne en charge un certain runtime, contactez l'[équipe d'assistance][8].

# Configuration

## Console AWS

L'ARN de la couche Lambda Datadog comprend une région, le runtime du langage et la version. Pour créer votre propre ARN, utilisez le format suivant :

```text
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

Par exemple :

```text
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:11
```

| Langage | Runtime                                        | Versions             |
| -------- | ---------------------------------------------- | -------------------- |
| Python   | `Python27`, `Python36`, `Python37`, `Python38` | [Dernière version][3] |
| Node.js  | `Node8-10`, `Node10-x`, `Node12-x`             | [Dernière version][4] |
| Ruby     | `Ruby`                                         | [Dernière version][5] |

**Golang** : les liens vers les binaires Go étant statiques, Datadog propose un [package][7] qu'il vous suffit d'importer dans votre projet. Aucune couche Lambda n'est requise.

**Java** : Datadog propose une [bibliothèque][15] que vous pouvez importer dans votre projet. Aucune couche Lambda n'est requise.

**Remarque :** la couche Lambda Datadog et les bibliothèques client intègrent le X-Ray SDK en tant que dépendance. Vous n'avez donc pas besoin de l'installer dans vos projets.

Étapes d'installation :

1. Accédez à la fonction Lambda à laquelle vous souhaitez ajouter la couche dans votre console AWS.
2. Cliquez sur **Layers** sur la page principale de votre fonction.
3. Faites défiler la page et cliquez sur **Add a layer**.
3. Sélectionnez l'option **Provide a layer version ARN**.
4. Spécifiez l'ARN de couche Lambda Datadog à partir du tableau ci-dessus.
5. Accédez à la section **Environment Variables** de votre fonction pour configurer votre clé d'API Datadog ainsi que toute autre option (voir le tableau ci-dessous).

## Serverless Framework

Ce plug-in intègre les couches Lambda Datadog pour Node.js et Python à vos fonctions. Lors du déploiement, il génère de nouvelles fonctions handler qui enveloppent les fonctions existantes et initialisent les couches Lambda.

Le plug-in peut être installé avec l'une des commandes suivantes :

```bash
npm install --save-dev serverless-plugin-datadog  # pour les utilisateurs de NPM
yarn add --dev serverless-plugin-datadog          # pour les utilisateurs de Yarn
```

Ensuite, ajoutez ce qui suit dans votre fichier `serverless.yml` :

```yaml
plugins:
    - serverless-plugin-datadog
```

Configurez la bibliothèque en ajoutant la section suivante à votre fichier `serverless.yml`. Les valeurs par défaut y sont spécifiées, ainsi que le caractère obligatoire ou facultatif de chaque champ.

```yaml
custom:
  datadog:
    # Que ce soit pour ajouter les couches Lambda ou que l'utilisateur utilise les siennes. Valeur par défaut : true.
    addLayers: true

    # Le niveau de log. Définir sur DEBUG pour une journalisation étendue. Valeur par défaut : info.
    logLevel: "info"

    # Envoyer des métriques custom via les logs avec l'aide de la fonction Lambda du Forwarder Datadog (conseillé). Valeur par défaut : false.
    flushMetricsToLogs: false

    # Le site Datadog vers lequel envoyer des données, requis uniquement lorsque flushMetricsToLogs est défini sur false. Valeur par défaut : datadoghq.com.
    site: datadoghq.com # datadoghq.eu pour le site européen de Datadog

    # Clé API Datadog, requise uniquement lorsque flushMetricsToLogs est défini sur false.
    apiKey: ""

    # Clé API Datadog chiffrée à l'aide de KMS, requise uniquement lorsque flushMetricsToLogs est défini sur false.
    apiKMSKey: ""

    # Activer le tracing des fonctions Lambda et des intégrations API Gateway. Valeur par défaut : true.
    enableXrayTracing: true

    # Activer le tracing sur la fonction Lambda en utilisant dd-trace, la bibliothèque APM de Datadog. Nécessite de configurer le Forwarder de logs Datadog. Valeur par défaut : true.
    enableDDTracing: true

    # Lorsque ce paramètre est défini, le plug-in essaye d'abonner les groupes de logs CloudWatch Lambda au Forwarder avec l'ARN donné.
    forwarder: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

La configuration suivante `flushMetricsToLogs: true` est conseillée pour l'envoi de métriques custom via les logs CloudWatch avec l'aide du [Forwarder Datadog][2].

[Documentation de Serverless Framework][1]

[1]: https://serverless.com/framework/docs/providers/aws/

## AWS SAM

Pour activer le tracing via X-Ray par défaut pour vos fonctions Lambda et vos API Gateways, ajoutez les clés `Function::Tracing` et `Api::TracingEnabled` à la [section Globals][1] de votre fichier `template.yaml`. Ajoutez également votre clé d'API Datadog ainsi que les variables d'environnement de votre choix (voir le tableau ci-dessous) :

```yaml
Globals:
    Function:
        Tracing: Active
        Environment:
            Variables:
                DD_API_KEY: VOTRE_CLÉ_API_DATADOG
    Api:
        TracingEnabled: true
```

[Documentation AWS SAM][2]

[1]: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#globals-section
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html

## Développement local

Vous pouvez également inclure le package Lambda Datadog directement dans votre projet, que ce soit depuis les sources ou à l'aide du gestionnaire de paquets standard de votre runtime.

| Langage | Référentiel   | Taille approximative |
| -------- | ------------ | ---------------- |
| Node.js  | [GitHub][9] | 2,6 Mo           |
| Python   | [GitHub][10] | 10 Mo            |
| Ruby     | [GitHub][11] | 2,3 Mo           |
| Go       | [GitHub][12] | 68 Ko            |
| Java     | [GitHub][14] | 51 Ko            |


**Remarque** : AWS SAM prend en charge [le téléchargement de couches Lambda][13] pour le développement local.

## Variables d'environnement

Vous pouvez configurer la couche Lambda Datadog en ajoutant des [variables d'environnement][16] à vos fonctions Lambda :

| Variable d'environnement | Description                                                                              | Obligatoire | Valeur par défaut         | Valeurs acceptées                 |
| -------------------- | ---------------------------------------------------------------------------------------- | -------- | --------------- | ------------------------------- |
| `DD_API_KEY`         | Votre clé d'API Datadog                                                                     | Oui      |                 | Clé d'API Datadog                 |
| `DD_KMS_API_KEY`     | À utiliser à la place de `DD_API_KEY` si vous avez recours à KMS                                                 | Non       |                 | Clé d'API Datadog avec chiffrement KMS   |
| `DD_SITE`            | Définir si vous utilisez l'instance européenne de Datadog                                                  | Non       | `datadoghq.com` | `datadoghq.eu`, `datadoghq.com` |
| `DD_FLUSH_TO_LOG`    | Activer [les métriques custom asynchrones][17] sans latence.                                    | Non       | `False`         | `True`, `False`                 |
| `DD_LOG_LEVEL`       | Activer les logs détaillés pour la couche Lambda Datadog                                        | Non       | `INFO`          | `INFO`, `DEBUG`                 |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]:  https://docs.datadoghq.com/fr/integrations/amazon_lambda/#real-time-enhanced-lambda-metrics
[2]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[3]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[5]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[6]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[7]: https://github.com/DataDog/datadog-lambda-go/releases
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://github.com/DataDog/datadog-lambda-layer-js
[10]: https://github.com/DataDog/datadog-lambda-layer-python
[11]: https://github.com/DataDog/datadog-lambda-layer-rb
[12]: https://github.com/DataDog/datadog-lambda-go
[13]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-layers.html
[14]: https://github.com/DataDog/datadog-lambda-java/releases
[15]: https://github.com/DataDog/datadog-lambda-java
[16]: https://github.com/DataDog/datadog-lambda-layer-python#environment-variables
[17]:  https://docs.datadoghq.com/fr/integrations/amazon_lambda/#enabling-asynchronous-custom-metrics