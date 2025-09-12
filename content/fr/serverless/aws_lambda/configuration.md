---
aliases:
- /fr/serverless/distributed_tracing/collect_lambda_payloads
- /fr/serverless/libraries_integrations/lambda_code_signing
- /fr/serverless/guide/forwarder_extension_migration/
- /fr/serverless/guide/extension_private_link/
- /fr/serverless/configuration
further_reading:
- link: /serverless/installation/
  tag: Documentation
  text: Installer la surveillance sans serveur pour AWS Lambda
- link: /serverless/troubleshooting/
  tag: Documentation
  text: Dépanner la surveillance sans serveur pour AWS Lambda
- link: /integrations/github
  tag: Documentation
  text: Intégration Datadog/GitHub
title: Configurer la surveillance sans serveur pour AWS Lambda
---

Commencez par [installer][1] la surveillance sans serveur Datadog afin de commencer à recueillir des métriques, traces et logs. Une fois cette première étape terminée, consultez les rubriques suivantes pour configurer votre installation afin de répondre à vos besoins en matière de surveillance.

- [Associer des données de télémétrie à l'aide de tags](#associer-des-donnees-de-telemetrie-a-l-aide-de-tags)
- [Recueillir les charges utiles des requêtes et réponses](#recueillir-les-charges-utiles-des-requetes-et-reponses)
- [Recueillir des traces à partir de ressources non Lambda](#recueillir-des-traces-a-partir-de-ressources-non-lambda)
- [Configurer le traceur Datadog](#configurer-le-traceur-datadog)
- [Choisir les taux d'échantillonnage pour l'ingestion des spans APM](#choisir-les-taux-d-echantillonnage-pour-l-ingestion-des-spans-apm)
- [Filtrer ou nettoyer des informations sensibles des traces](#filtrer-ou-nettoyer-des-informations-sensibles-des-traces)
- [Activer ou désactiver la collecte de traces](#activer-ou-desactiver-la-collecte-de-traces)
- [Associer des logs à des traces](#associer-des-logs-a-des-traces)
- [Associer des erreurs à votre code source](#associer-des-erreurs-a-votre-code-source)
- [Envoyer des métriques custom][27]
- [Recueillir des données de profiling](#recueillir-des-donnees-de-profiling)
- [Envoyer des données de télémétrie via PrivateLink ou un proxy](#envoyer-des-donnees-de-telemetrie-via-privatelink-ou-un-proxy)
- [Envoyer des données de télémétrie à plusieurs organisations Datadog](#envoyer-des donnees-de-telemetrie-a-plusieurs-organisations-Datadog)
- [Activer la conformité FIPS](#activer-la-conformite-fips)
- [Propager le contexte de traces vers des ressources AWS](#propager-le-contexte-de-traces-vers-des-ressources-aws)
- [Fusionner des traces X-Ray et Datadog](#fusionner-des-traces-x-ray-et-datadog)
- [Activer la signature de code pour AWS Lambda](#activer-la-signature-de-code-pour-aws-lambda)
- [Migrer vers l'extension Lambda Datadog](#migrer-vers-l-extension-lambda-datadog)
- [Migrer de x86 à arm64 avec l'extension Lambda Datadog](#migrer-de-x86-a-arm64-avec-l-extension-lambda-datadog)
- [Configurer l'extension Lambda Datadog pour effectuer des tests locaux](#configurer-l-extension-lambda-datadog-pour-effectuer-des-tests-locaux)
- [Instrumenter AWS Lambda avec l'API OpenTelemetry](#instrumenter-aws-lambda-avec-l-api-opentelemetry)
- [Utiliser l'extension Lambda Datadog v67+](#utiliser-l-extension-lambda-datadog-v67+)
- [Configurer l'association automatique pour DynamoDB PutItem](#configurer-l-association-automatique-pour-dynamodb-putitem)
- [Visualiser et modéliser correctement les services AWS](#visualiser-et-modeliser-correctement-les-services-aws)
- [Dépannage](#depannage)
- [Pour aller plus loin](#pour-aller-plus-loin)


## Activer la détection des menaces pour observer les tentatives d'attaque

Recevez des alertes lorsque des acteurs malveillants ciblent vos applications sans serveur et prenez rapidement des mesures.

Pour commencer, assurez-vous d'abord que le [tracing est activé][43] pour vos fonctions.

Pour activer la surveillance des menaces, ajoutez les variables d'environnement suivantes à votre déploiement :
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

Redéployez la fonction et invoquez-la. Après quelques minutes, elle apparaît dans les [vues AAP][49].

Pour voir la détection des menaces d'App and API Protection en action, envoyez des patterns d'attaque connus sur votre application. Par exemple, envoyez un en-tête HTTP avec la valeur `acunetix-product` pour déclencher une tentative d'[attaque par analyse des vulnérabilités][44] :
   ```sh
   curl -H 'My-AAP-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
Quelques minutes après avoir activé votre application et envoyé les patterns d'attaque, **des informations sur les menaces s'affichent dans l'[Application Signals Explorer][41]**.

## Associer des données de télémétrie à l'aide de tags

Associez entre elles les données de télémétrie Datadog à l'aide de tags réservés (`env`, `service` et `version`) et personnalisés. Ces tags vous permettent d'explorer facilement vos métriques, traces et logs. Ajoutez les paramètres supplémentaires ci-dessous en fonction de la méthode d'installation que vous avez suivie.

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

Vérifiez que vous utilisez la dernière version de l'[interface de ligne de commande Datadog][1] et exécutez la commande `datadog-ci lambda instrument` en spécifiant les arguments supplémentaires pertinents. Exemple :

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # … autres arguments requis, par exemple le nom des fonctions
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Vérifiez que vous utilisez la dernière version du [plug-in Serverless Datadog][1] et appliquez les tags à l'aide des paramètres `env`, `service`, `version` et `tags`. Exemple :

```yaml
custom:
  datadog:
    # … autres paramètres requis, comme la clé d'API et le site Datadog
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

Par défaut, si vous ne définissez pas `env` et `service`, le plug-in utilise automatiquement les valeurs `stage` et `service` de la définition de l'application sans serveur. Pour désactiver cette fonctionnalité, définissez `enableTags` sur `false`.

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Vérifiez que vous utilisez la dernière version de la [macro Serverless Datadog][1] et appliquez les tags à l'aide des paramètres `env`, `service`, `version` et `tags`. Exemple :

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # … autres paramètres requis, comme la clé d'API et le site Datadog
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Vérifiez que vous utilisez la dernière version du [CDK Construct sans serveur Datadog][1] et appliquez les tags à l'aide des paramètres `env`, `service`, `version` et `tags`. Exemple :

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    env: "dev",
    service: "web",
    version: "v1.2.3",
    tags: "team:avengers,project:marvel"
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Autres" %}}

Si vous recueillez des données de télémétrie à partir de vos fonctions Lambda à l'aide de l'[extension Lambda Datadog][1], définissez les variables d'environnement suivantes sur vos fonctions Lambda. Exemple :
- DD_ENV : dev
- DD_SERVICE : web
- DD_VERSION : v1.2.3
- DD_TAGS : team:avengers,project:marvel

Si vous recueillez des données de télémétrie à partir de vos fonctions Lambda à l'aide de la [fonction Lambda du Forwarder Datadog][2], définissez les tags `env`, `service` et `version`, ainsi que des tags supplémentaires, comme des tags de ressource AWS, sur vos fonctions Lambda. Assurez-vous que l'option `DdFetchLambdaTags` est définie sur `true` sur la pile CloudFormation pour votre Forwarder Datadog. Depuis la version 3.19.0, cette option prend par défaut la valeur true.

[1]: /fr/serverless/libraries_integrations/extension/
[2]: /fr/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

Datadog peut également enrichir les données de télémétrie recueillies à l'aide de tags de ressource AWS existants définis sur vos fonctions Lambda, avec un retard de quelques minutes.

- Si vous recueillez des données de télémétrie à partir de vos fonctions Lambda à l'aide de l'[extension Lambda Datadog][2], activez l'[intégration Datadog/AWS][3]. Cette fonctionnalité vise à enrichir vos données de télémétrie avec des tags **personnalisés**. Les tags réservés Datadog (`env`, `service` et `version`) doivent être définis via les variables d'environnement correspondantes (respectivement `DD_ENV`, `DD_SERVICE` et `DD_VERSION`). Il est également possible de les définir à l'aide des paramètres fournis par les intégrations Datadog et des outils de développement sans serveur. Cette approche n'est pas valable pour les fonctions Lambda déployées avec des images de conteneur.

- Si vous recueillez des données de télémétrie à partir de vos fonctions Lambda à l'aide de la [fonction Lambda du Forwarder Datadog][4], définissez l'option `DdFetchLambdaTags` sur `true` dans la pile CloudFormation pour votre Forwarder Datadog. Depuis la version 3.19.0, cette option prend par défaut la valeur true.

## Recueillir les charges utiles des requêtes et réponses

<div class="alert alert-info">Cette fonctionnalité est prise en charge pour les langages Python, Node.js, Go, Java et .NET.</div>

Datadog peut [recueillir et visualiser les charges utiles des requêtes et réponses JSON de vos fonctions AWS Lambda][5]. Vous bénéficiez ainsi d'informations pertinentes sur vos applications sans serveur, pour un dépannage simplifié des échecs de vos fonctions Lambda.

Cette fonctionnalité est désactivée par défaut. Suivez les instructions ci-dessous pour la méthode d'installation que vous avez suivie.

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

Vérifiez que vous utilisez la dernière version de l'[interface de ligne de commande Datadog][1] et exécutez la commande `datadog-ci lambda instrument` en spécifiant l'argument supplémentaire `--capture-lambda-payload`. Exemple :

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # … autres arguments requis, comme le nom des fonctions
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Vérifiez que vous utilisez la dernière version du [plug-in Serverless Datadog][1] et définissez `captureLambdaPayload` sur `true`. Exemple :

```yaml
custom:
  datadog:
    # … autres paramètres requis, comme la clé d'API et le site Datadog
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Vérifiez que vous utilisez la dernière version de la [macro Serverless Datadog][1] et définissez le paramètre `captureLambdaPayload` sur `true`. Exemple :

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # … autres paramètres requis, comme la clé d'API et le site Datadog
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Vérifiez que vous utilisez la dernière version du [CDK Construct sans serveur Datadog][1] et définissez le paramètre `captureLambdaPayload` sur `true`. Exemple :

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Autres" %}}

Définissez la variable d'environnement `DD_CAPTURE_LAMBDA_PAYLOAD` sur `true` sur vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

Pour éviter d'envoyer à Datadog des données sensibles dans les objets JSON des requêtes ou réponses, vous pouvez nettoyer certains paramètres.

Pour ce faire, ajoutez un nouveau fichier `datadog.yaml` dans le même dossier que le code de votre fonction Lambda. Pour obfusquer des champs dans la charge utile Lambda, utilisez le [bloc replace_tags][6] dans les paramètres `apm_config` du fichier `datadog.yaml` :

```yaml
apm_config:
  replace_tags:
    # Remplacer toutes les occurrences de « foobar » dans les tags par « CENSURÉ » :
    - name: "*"
      pattern: "foobar"
      repl: "CENSURÉ"
    # Remplacer « auth » dans les en-têtes des requêtes par une chaîne vide
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Remplacer « apiToken » dans la charge utile des réponses par « **** »
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

Il est également possible de définir la variable d'environnement `DD_APM_REPLACE_TAGS` sur votre fonction Lambda afin d'obfusquer certains champs :

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "CENSURÉ"
      },
      {
        "name": "function.request.headers.auth",
        "pattern": "(?s).*",
        "repl": ""
      },
      {
        "name": "function.response.apiToken",
        "pattern": "(?s).*"
        "repl": "****"
      }
]
```

Pour collecter les charges utiles depuis des services AWS, consultez la section [Capturer les requêtes et réponses des services AWS][54].



## Recueillir des traces à partir de ressources non Lambda

Datadog peut déduire des spans APM en fonction des événements Lambda reçus pour les ressources gérées par AWS qui déclenchent une fonction Lambda. Vous pouvez ainsi visualiser plus facilement la relation entre les ressources gérées par AWS et identifier plus rapidement les problèmes de performances de vos applications sans serveur. Consultez [cet article de blog][12] (en anglais) pour obtenir plus d'informations sur les solutions incluses.

Les ressources suivantes sont actuellement prises en charge :

- API Gateway (API REST, API HTTP et WebSocket)
- URL de fonction Lambda
- SQS
- SNS (les messages SNS distribués via SQS sont également pris en charge)
- Flux Kinesis (si les données correspondent  une chaîne JSON ou à une chaîne JSON codée en base64)
- EventBridge (événements personnalisés pour lesquels `Details` prend la forme d'une chaîne JSON)
- S3
- DynamoDB

Pour désactiver cette fonctionnalité, définissez `DD_TRACE_MANAGED_SERVICES` sur `false`.

### DD_SERVICE_MAPPING

La variable d'environnement `DD_SERVICE_MAPPING` sert à renommer les [noms des services][46] autres que Lambda en amont. Elle repose sur des paires dont le format est `ancien-service:nouveau-service`.

#### Syntaxe

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

Vous pouvez interagir avec cette variable de deux façons différentes :

#### Renommer tous les services d'un type

Pour renommer tous les services en amont associés à une intégration AWS Lambda, utilisez les identificateurs suivants :

| Intégration AWS Lambda | Valeur de DD_SERVICE_MAPPING |
|---|---|
| `lambda_api_gateway` | `"lambda_api_gateway:newServiceName"` |
| `lambda_sns` | `"lambda_sns:newServiceName"` |
| `lambda_sqs` | `"lambda_sqs:newServiceName"` |
| `lambda_s3` | `"lambda_s3:newServiceName"` |
| `lambda_eventbridge` | `"lambda_eventbridge:newServiceName"` |
| `lambda_kinesis` | `"lambda_kinesis:newServiceName"` |
| `lambda_dynamodb` | `"lambda_dynamodb:newServiceName"` |
| `lambda_url` | `"lambda_url:newServiceName"` |
| `lambda_msk` | `"lambda_msk:newServiceName"` |

#### Renommer des services spécifiques

Pour bénéficier d'un contrôle plus granulaire, utilisez les identificateurs suivants, qui sont propres à chaque service :

| Service | Identificateur | Valeur de DD_SERVICE_MAPPING |
|---|---|---|
| API Gateway | ID de l'API | `"r3pmxmplak:newServiceName"` |
| SNS | Nom du sujet | `"ExampleTopic:newServiceName"` |
| SQS | Nom de la file d'attente | `"MyQueue:newServiceName"` |
| S3 | Nom du compartiment | `"example-bucket:newServiceName"` |
| EventBridge | Source d'événements | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | Nom du flux | `"MyStream:newServiceName"` |
| DynamoDB | Nom de la table | `"ExampleTableWithStream:newServiceName"` |
| URL Lambda | ID de l'API | `"a8hyhsshac:newServiceName"` |
| MSK | Nom du cluster | `"ExampleCluster:newServiceName"` |

#### Exemples et explications

| Commande | Rôle |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | Remplace le nom de tous les services `lambda_api_gateway` en amont par `new-service-name`. |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | Remplace le nom du service en amont `08se3mvh28.execute-api.eu-west-1.amazonaws.com` par `new-service-name`. |

Pour renommer des services en aval, consultez la rubrique relative à `DD_SERVICE_MAPPING` dans la [documentation sur la configuration du traceur][45].

## Configurer le traceur Datadog

Pour découvrir quelles bibliothèques et quels frameworks sont automatiquement instrumentés par le client APM Datadog, consultez la section [Exigences de compatibilité pour APM][15]. Pour instrumenter des applications personnalisées, consultez le guide sur l'[instrumentation personnalisée][16] pour la solution APM de Datadog.

## Choisir les taux d'échantillonnage pour l'ingestion des spans APM

Pour gérer le [taux d'échantillonnage des invocations tracées par APM][17] pour des fonctions sans serveur, définissez la variable d'environnement `DD_TRACE_SAMPLING_RULES` de la fonction sur une valeur comprise entre 0.000 (aucun tracing des invocations de fonction Lambda) et 1.000 (tracing de toutes les invocations de fonction Lambda).

**Remarques** :
   - L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez plutôt `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]`.
   - Les métriques de trafic globales comme `trace.<OPERATION_NAME>.hits` sont calculées *uniquement* à partir des invocations échantillonnées dans Lambda.

Pour les services qui génèrent beaucoup de requêtes, puisque les données des traces sont très répétitives, vous n'avez généralement pas besoin de recueillir chaque requête : les problèmes suffisamment graves sont systématiquement détectables dans plusieurs traces. Les [paramètres d'ingestion][18] vous permettent de visualiser les données dont vous avez besoin pour diagnostiquer des problèmes tout en respectant votre marge d'erreur.

L'[échantillonnage en amont][19] constitue le mécanisme d'ingestion par défaut. La décision de conserver ou d'ignorer la trace est prise au tout début du cycle de vie de la trace, à la création de la span racine. Cette décision est ensuite propagée vers les autres services par l'intermédiaire du contexte de la requête (par exemple, sous la forme d'un en-tête de requête HTTP). La décision est prise au début de la trace, puis transmise durant toutes les étapes de la trace. Ainsi, vous devez configurer le taux d'échantillonnage sur le service root afin de l'appliquer.

Lorsque Datadog ingère les spans, le filtre de rétention intelligent Datadog indexe une partie de vos traces pour vous aider à surveiller l'intégrité de vos applications. Vous pouvez également définir des [filtres de rétention][20] personnalisés dans le but d'indexer les données des traces que vous souhaitez conserver plus longtemps, en accord avec les objectifs de votre organisation.

En savoir plus sur le [pipeline de traces Datadog][21].

## Filtrer ou nettoyer des informations sensibles des traces

Pour filtrer les traces avant de les envoyer à Datadog, consultez la section [Ignorer les ressources non désirées dans APM][22].

Si vous avez besoin de nettoyer les attributs de vos traces pour des raisons de sécurité, consultez la section [Configurer l'Agent Datadog ou le traceur pour assurer la sécurité des données][23].

## Activer ou désactiver la collecte de traces

Par défaut, la collecte de traces via l'extension Lambda Datadog est activée.

Si vous souhaitez commencer à recueillir des traces à partir de vos fonctions Lambda, appliquez les configurations ci-dessous :

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # … autres arguments requis, comme le nom des fonctions
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # … autres paramètres requis, comme la clé d'API et le site Datadog
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # … autres paramètres requis, comme la clé d'API et le site Datadog
      enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Autres" %}}

Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true` sur vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

#### Désactiver la collecte de logs

Si vous souhaitez interrompre la collecte de traces à partir de vos fonctions Lambda, appliquez les configurations ci-dessous :

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # … autres arguments requis, comme le nom des fonctions
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # … autres paramètres requis, comme la clé d'API et le site Datadog
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # … autres paramètres requis, comme la clé d'API et le site Datadog
      enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Autres" %}}

Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false` sur vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

## Associer vos logs à vos traces

Si vous utilisez l'[extension Lambda][2] pour recueillir des traces et des logs, Datadog ajoute automatiquement l'ID de la requête AWS Lambda à la span `aws.lambda` via le tag `request_id`. En outre, les logs Lambda d'une même requête partagent le même attribut `lambda.request_id`. L'ID de requête AWS Lambda permet d'associer les vues des traces et des logs Datadog.

Si vous utilisez la [fonction Lambda du Forwarder][4] pour recueillir des traces et des logs, `dd.trace_id` est automatiquement injecté dans les logs (par défaut avec la variable d'environnement `DD_LOGS_INJECTION`). L'ID de trace Datadog permet d'associer les vues des traces et des logs Datadog. Cette fonctionnalité est compatible avec la majorité des applications utilisant un runtime et un logger connus (voir la [prise en charge pour chaque runtime][24]).

Si vous utilisez un runtime ou un logger personnalisé qui n'est pas pris en charge, procédez comme suit :
- Si vos logs sont au format JSON, vous devez récupérer l'ID de trace Datadog à l'aide de `dd-trace`, puis l'ajouter à vos logs via le champ `dd.trace_id` :
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- Si vos logs sont en texte brut, procédez comme suit :
    1. Récupérez l'ID de trace Datadog à l'aide de `dd-trace`, puis ajoutez-le à votre log.
    2. Dupliquez le pipeline de logs Lambda par défaut, qui est en lecture seule uniquement.
    3. Activez le pipeline dupliqué et désactivez le pipeline par défaut.
    4. Modifiez les règles du [parser Grok][24] du pipeline dupliqué afin de parser l'ID de trace Datadog dans l'attribut `dd.trace_id`. Vous pouvez par exemple utiliser la règle `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` pour les logs dont le format est `[INFO] dd.trace_id=4887065908816661012 Mon message de log`.

## Associer des erreurs à votre code source

L'[intégration du code source Datadog][26] vous permet de lier vos données de télémétrie (comme les stack traces) au code source de vos fonctions Lambda dans vos référentiels Git.

Pour découvrir comment configurer l'intégration du code source dans vos applications serverless, consultez la section [Intégrer les informations Git dans vos artefacts de build][101].

[101]: /fr/integrations/guide/source-code-integration/?tab=go#serverless

## Collecter des données de profiling

Le [Continuous Profiler][42] de Datadog est disponible en version d'aperçu pour la version 4.62.0 du traceur Python et les versions 62 et antérieures de la couche. Cette fonctionnalité facultative est activée en définissant la variable d'environnement `DD_PROFILING_ENABLED` sur `true`.

Le profileur en continu fonctionne en générant un thread qui effectue régulièrement un snapshot du processeur et de l'ensemble du code Python exécuté. Cela peut inclure le profileur lui-même. Si vous voulez que le profileur s'ignore, définissez `DD_PROFILING_IGNORE_PROFILER` sur `true`.

## Envoyer des données de télémétrie via AWS PrivateLink ou un proxy

L'extension Lambda Datadog doit pouvoir accéder à Internet pour envoyer des données à Datadog. Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez [envoyer vos données via AWS PrivateLink][28] pour le [site Datadog][29] `datadoghq.com` ou [via un proxy][30] pour tous les autres sites.

Si vous utilisez le Forwarder Datadog, suivez [ces instructions][31].

## Envoyer des données de télémétrie à plusieurs organisations Datadog

Si vous souhaitez envoyer vos données à plusieurs organisations différentes, vous pouvez activer la transmission multiple à l'aide d'une clé d'API en clair, d'AWS Secrets Manager, ou d'AWS KMS.

{{< tabs >}}
{{% tab "Clé d'API en clair" %}}

Vous pouvez activer la transmission multiple à l'aide d'une clé d'API en clair en définissant les variables d'environnement suivantes sur votre fonction Lambda.

```bash
# Enable dual shipping for metrics
DD_ADDITIONAL_ENDPOINTS={"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (traces)
DD_APM_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (profiling)
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for logs
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS=[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]
```

{{% /tab %}}
{{% tab "AWS Secrets Manager" %}}

L'extension Datadog permet de récupérer automatiquement les valeurs [AWS Secrets Manager][1] pour toutes les variables d'environnement qui présentent le préfixe `_SECRET_ARN`. Vous pouvez utiliser cette méthode pour stocker sans risque vos variables d'environnement dans Secrets Manager et effectuer la transmission multiple avec Datadog.

1. Définissez la variable d'environnement `DD_LOGS_CONFIG_FORCE_USE_HTTP` sur votre fonction Lambda.
2. Ajoutez l'autorisation `secretsmanager:GetSecretValue` au rôle IAM de votre fonction Lambda.
3. Côté Secrets Manager, créez un nouveau secret pour stocker la variable d'environnement dédiée à la transmission multiple des métriques. Le contenu doit ressembler à ce qui suit : `{"https://app.datadoghq.com": ["<votre_clé_API_2>", "<votre_clé_API_3>"], "https://app.datadoghq.eu": ["<votre_clé_API_4>"]}`.
4. Définissez la variable d'environnement `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` associée à votre fonction Lambda sur l'ARN du secret précédent.
5. Côté Secrets Manager, créez un nouveau secret pour stocker la variable d'environnement dédiée à la transmission multiple des données APM (traces). Le contenu doit **ressembler** à ce qui suit : `{"https://trace.agent.datadoghq.com": ["<votre_clé_API_2>", "<votre_clé_API_3>"], "https://trace.agent.datadoghq.eu": ["<votre_clé_API_4>"]}`.
6. Définissez la variable d'environnement `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` associée à votre fonction Lambda sur l'ARN du secret précédent.
7. Côté Secrets Manager, créez un nouveau secret pour stocker la variable d'environnement dédiée à la transmission multiple des données APM (profiling). Le contenu doit **ressembler** à ce qui suit : `{"https://trace.agent.datadoghq.com": ["<votre_clé_API_2>", "<votre_clé_API_3>"], "https://trace.agent.datadoghq.eu": ["<votre_clé_API_4>"]}`.
8. Définissez la variable d'environnement `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` associée à votre fonction Lambda sur l'ARN du secret précédent.
9. Côté Secrets Manager, créez un nouveau secret pour stocker la variable d'environnement dédiée à la transmission multiple des logs. Le contenu doit **ressembler** à ce qui suit : `[{"api_key": "<votre_clé_API_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`.
10. Définissez la variable d'environnement `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` associée à votre fonction Lambda sur l'ARN du secret précédent.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

L'extension Datadog permet de déchiffrer automatiquement les valeurs [AWS KMS][41] pour toutes les variables d'environnement qui présentent le préfixe `_KMS_ENCRYPTED`. Vous pouvez utiliser cette méthode pour stocker sans risque vos variables d'environnement dans KMS et effectuer la transmission multiple avec Datadog.

1. Définissez la variable d'environnement `DD_LOGS_CONFIG_FORCE_USE_HTTP=true` sur votre fonction Lambda.
2. Ajoutez les autorisations `kms:GenerateDataKey` et `kms:Decrypt` au rôle IAM de votre fonction Lambda.
3. Pour configurer la transmission multiple des métriques, chiffrez `{"https://app.datadoghq.com": ["<votre_clé_API_2>", "<votre_clé_API_3>"], "https://app.datadoghq.eu": ["<votre_clé_API_4>"]}` avec KMS et définissez la variable d'environnement `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` sur la valeur obtenue.
4. Pour configurer la transmission multiple des traces, chiffrez `{"https://trace.agent.datadoghq.com": ["<votre_clé_API_2>", "<votre_clé_API_3>"], "https://trace.agent.datadoghq.eu": ["<votre_clé_API_4>"]}` avec KMS et définissez la variable d'environnement `DD_APM_ADDITIONAL_KMS_ENCRYPTED` sur la valeur obtenue.
5. Pour configurer la transmission multiple des données de profiling, chiffrez `{"https://trace.agent.datadoghq.com": ["<votre_clé_API_2>", "<votre_clé_API_3>"], "https://trace.agent.datadoghq.eu": ["<votre_clé_API_4>"]}` avec KMS et définissez la variable d'environnement `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` sur la valeur obtenue.
5. Pour configurer la transmission multiple des logs `[{"api_key": "<votre_clé_API_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` avec KMS et définissez la variable d'environnement `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` sur la valeur obtenue.

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

Pour découvrir des options d'utilisation plus avancées, consultez le [guide dédié à la transmission multiple][32].

## Assurer la conformité à la norme FIPS

<div class="alert alert-info">Pour une vue d'ensemble complète de la conformité FIPS pour les fonctions AWS Lambda, consultez la page dédiée <a href="/serverless/aws_lambda/fips-compliance">Conformité FIPS pour AWS Lambda</a>.</div>

Pour activer la conformité FIPS pour les fonctions AWS Lambda, procédez comme suit :

1. Utilisez une couche d'extension conforme FIPS en indiquant l'ARN approprié :

{{< tabs >}}
{{% tab "AWS GovCLoud" %}}
 ```sh
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer :Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer :Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{% tab "AWS Commercial" %}}
 ```sh
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{< /tabs >}}

2. Pour les fonctions Lambda utilisant Python, JavaScript ou Go, définissez la variable d'environnement `DD_LAMBDA_FIPS_MODE` sur `true`. Cette variable d'environnement :
   - En mode FIPS, les fonctions utilitaires de métriques Lambda nécessitent l'extension conforme FIPS pour l'envoi des métriques.
   - Utilise les endpoints FIPS d'AWS pour la récupération des clés d'API
   - Est activée par défaut dans les environnements GovCloud

3. Pour les fonctions Lambda utilisant Ruby, .NET ou Java, aucune configuration supplémentaire de variable d'environnement n'est nécessaire.

4. Pour garantir une conformité FIPS complète de bout en bout, configurez votre fonction Lambda pour utiliser le site Datadog US1-FED :
   - Définissez `DD_SITE` sur `ddog-gov.com` (requis pour une conformité FIPS complète de bout en bout)
   **Remarque** : bien que les composants Lambda conformes FIPS fonctionnent avec n'importe quel site Datadog, seul le site US1-FED dispose d'endpoints d'ingestion conformes FIPS.

## Propager le contexte de traces vers des ressources AWS

Datadog injecte automatiquement le contexte des traces dans les requêtes AWS SDK sortantes et extrait le contexte des traces à partir des événements Lambda. Cela permet de tracer une requête ou une transaction sur des services distribués. Pour en savoir plus, consultez la section [Propagation de traces sans serveur][33].

## Fusionner des traces X-Ray et Datadog

AWS X-Ray prend en charge le tracing par l'intermédiaire de certains services gérés par AWS, comme AppSync et Step Functions, qui ne sont pas nativement pris en charge par la solution APM Datadog. Vous pouvez néanmoins activer l'[intégration Datadog/X-Ray][34] et fusionner les traces X-Ray avec les traces natives Datadog. Pour obtenir plus d'informations à ce sujet, consultez [cette section][35].

## Activer la signature de code pour AWS Lambda

Grâce à la [signature de code pour AWS Lambda][36], vous êtes certain de ne déployer que du code fiable depuis vos fonctions Lambda vers AWS. Lorsque vous activez la signature de code sur vos fonctions, AWS vérifie que tout le code de vos déploiements est signé par une source fiable. Vous pouvez définir les sources auxquelles vous faites confiance depuis la configuration de la signature de code.

Si vos fonctions Lambda ont été configurées de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog à la configuration de signature de code de votre fonction avant de déployer les fonctions Lambda à l'aide des couches Lambda publiées par Datadog.

ARN du profil de signature de Datadog :

{{< site-region region="us,us3,us5,eu,gov" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}


## Migrer vers l'extension Lambda Datadog

Datadog peut recueillir les données de surveillance de vos fonctions Lambda via la [fonction Lambda du Forwarder][4] ou l'[extension Lambda][2]. Il est conseillé de privilégier l'extension Lambda pour les nouvelles installations. Si vous ne savez pas quelle approche adopter, consultez la section [Choisir s'il est pertinent de migrer vers l'extension Lambda Datadog][37].

Pour procéder à la migration, comparez les [instructions d'installation via l'extension Lambda Datadog][1] avec [celles via le Forwarder Datadog][38]. Pour vous faciliter la tâche, les principales différences sont répertoriées ci-dessous.

**Remarque** : Datadog vous conseille de migrer en premier vos applications dev et staging, puis de migrer vos applications de production une par une.

<div class="alert alert-info">L'extension Lambda Datadog active la collecte de logs par défaut. Si vous migrez du Forwarder vers l'extension, assurez-vous de supprimer votre abonnement aux logs. Sinon, vous risquez de voir des logs en double.</div>

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

1. Installez la dernière version de `@datadog/datadog-ci`.
2. Mettez à jour l'argument `--layer-version` en le définissant sur la dernière version de votre runtime.
3. Définissez l'argument `--extension-version` sur la dernière version de l'extension, à savoir `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Définissez les variables d'environnement requises `DATADOG_SITE` et `DATADOG_API_KEY_SECRET_ARN`.
5. Supprimez l'argument `--forwarder`.
6. Si vous avez configuré l'intégration Datadog/AWS afin d'abonner automatiquement le Forwarder aux groupes de logs Lambda, désactivez ce comportement après avoir migré l'_ensemble_ de vos fonctions Lambda dans la région en question.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. Installez la dernière version de `serverless-plugin-datadog`. L'extension Lambda Datadog est alors automatiquement installée, sauf si vous définissez `addExtension` sur `false`.
2. Définissez les paramètres requis `site` et `apiKeySecretArn`.
3. Définissez les paramètres `env`, `service` et `version` s'ils avaient été précédemment définis en tant que tags de ressource Lambda. Lorsque vous utilisez l'extension, le plug-in définit automatiquement ces paramètres via les variables d'environnement réservées de Datadog, par exemple `DD_ENV`.
4. Supprimez le paramètre `forwarderArn`, sauf si vous souhaitez continuer à utiliser le Forwarder pour recueillir des logs à partir de ressources non Lambda et si vous avez défini `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs` ou `subscribeToWebsocketLogs` sur `true`.
5. Si vous avez configuré l'intégration Datadog/AWS afin d'abonner automatiquement le Forwarder aux groupes de logs Lambda, désactivez ce comportement après avoir migré l'_ensemble_ de vos fonctions Lambda dans la région en question.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Mettez à jour la pile CloudFormation de `datadog-serverless-macro` pour récupérer la dernière version.
2. Définissez le paramètre `extensionLayerVersion` sur la dernière version de l'extension, à savoir `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Définissez les paramètres requis `site` et `apiKeySecretArn`.
4. Supprimez le paramètre `forwarderArn`.
5. Si vous avez configuré l'intégration Datadog/AWS afin d'abonner automatiquement le Forwarder aux groupes de logs Lambda, désactivez ce comportement après avoir migré l'_ensemble_ de vos fonctions Lambda dans la région en question.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Installez la dernière version de `datadog-cdk-constructs` ou `datadog-cdk-constructs-v2`.
2. Définissez le paramètre `extensionLayerVersion` sur la dernière version de l'extension, à savoir `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Définissez les paramètres requis `site` et `apiKeySecretArn`.
4. Définissez les paramètres `env`, `service` et `version` s'ils avaient été précédemment définis en tant que tags de ressource Lambda. Lorsque vous utilisez l'extension, le construct définit automatiquement ces paramètres via les variables d'environnement réservées de Datadog, par exemple `DD_ENV`.
5. Supprimez le paramètre `forwarderArn`.
6. Si vous avez configuré l'intégration Datadog/AWS afin d'abonner automatiquement le Forwarder aux groupes de logs Lambda, désactivez ce comportement après avoir migré l'_ensemble_ de vos fonctions Lambda dans la région en question.

{{% /tab %}}
{{% tab "Autres" %}}

1. Installez la dernière version de la couche de la bibliothèque Lambda Datadog pour votre runtime.
2. Installez la dernière version de l'extension Lambda Datadog.
3. Définissez les variables d'environnement requises `DD_SITE` et `DD_API_KEY_SECRET_ARN`.
3. Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` si vous les aviez précédemment définies en tant que tags de ressource Lambda.
4. Supprimez le filtre d'abonnement qui transmet des logs au Forwarder Datadog à partir du groupe de logs de votre fonction Lambda.
5. Si vous avez configuré l'intégration Datadog/AWS afin d'abonner automatiquement le Forwarder aux groupes de logs Lambda, désactivez ce comportement après avoir migré l'_ensemble_ de vos fonctions Lambda dans la région en question.

{{% /tab %}}
{{< /tabs >}}

## Migrer de x86 à arm64 avec l'extension Lambda Datadog

L'extension Datadog est un binaire compilé disponible en version x86 ou arm64. Si vous migrez une fonction Lambda x86 vers arm64 (ou arm64 vers x86) à l'aide d'un outil de déploiement tel que CDK, Serverless Framework ou SAM, assurez-vous que votre intégration de service (telle que API Gateway, SNS ou Kinesis) est configurée pour utiliser les versions ou les alias d'une fonction Lambda. Dans le cas contraire, la fonction risquerait d'être indisponible pendant une dizaine de secondes lors du déploiement.

Ce problème est dû au fait que la migration d'une fonction Lambda de x86 vers arm64 implique deux appels API parallèles, `updateFunction` et `updateFunctionConfiguration`. Lorsque ces appels ont lieu, on observe un court laps de temps où l'appel `updateFunction` est terminé et où le code est mis à jour pour utiliser la nouvelle architecture alors que l'appel `updateFunctionConfiguration` n'est lui pas encore terminé, ce qui signifie que l'ancienne architecture est toujours configurée pour l'extension.

Si vous ne pouvez pas utiliser les paramètres LayerVersion, Datadog vous recommander de configurer le [Forwarder Datadog][38] durant le processus de migration vers la nouvelle architecture.


## Configurer l'extension Lambda Datadog pour effectuer des tests locaux

Tous les émulateurs Lambda ne prennent pas en charge l'AWS Lambda Telemetry API. Pour tester l'image conteneur de votre fonction Lambda en local avec l'extension Lambda Datadog installée, vous devez définir `DD_SERVERLESS_FLUSH_STRATEGY` sur `periodically,1` dans votre environnement de test local. Sinon, l'extension attend les réponses de l'AWS Lambda Telemetry API et bloque l'invocation.

## Instrumenter AWS Lambda avec l'API OpenTelemetry

La bibliothèque de tracing Datadog, incluse dans l'extension Lambda Datadog lors de l'installation, accepte les spans et les traces générées par du code instrumenté avec OpenTelemetry, traite les données de télémétrie et les envoie à Datadog.

Vous pouvez par exemple utiliser cette approche si votre code a déjà été instrumenté avec l'API OpenTelemetry, ou si vous souhaitez effectuer une instrumentation avec du code indépendant de tout fournisseur à l'aide de l'API OpenTelemetry tout en exploitant les bibliothèques de tracing Datadog.

Pour instrumenter AWS Lambda avec l'API OpenTelemetry, définissez la variable d'environnement `DD_TRACE_OTEL_ENABLED` sur `true`. Consultez la section [Instrumentation personnalisée avec l'API OpenTelemetry][48] pour en savoir plus.

## Utiliser l'extension Lambda Datadog v67+
La version 67+ de [l'extension Datadog][53] est optimisée pour réduire significativement la durée des cold starts.
Pour utiliser l'extension optimisée, définissez la variable d'environnement `DD_SERVERLESS_APPSEC_ENABLED` sur `false`.
Lorsque la variable d'environnement `DD_SERVERLESS_APPSEC_ENABLED` est définie sur `true`, l'extension Datadog utilise par défaut l'ancienne version, entièrement compatible. Vous pouvez également forcer l'utilisation de cette ancienne version en définissant `DD_EXTENSION_VERSION` sur `compatibility`. Datadog vous encourage à signaler tout retour ou bug en créant un [ticket sur GitHub][54] et en le taguant avec `version/next`.

## Configurer l'association automatique pour DynamoDB PutItem
_Disponible pour les runtimes Python et Node.js_.
Lorsque certains segments de vos requêtes asynchrones ne peuvent pas propager le contexte de trace, la fonctionnalité [association automatique de spans][55] de Datadog détecte automatiquement les spans liés.
Pour activer l'association automatique de spans pour l'opération `PutItem` des [flux de modifications DynamoDB][56], configurez les noms de clés primaires de vos tables.

{{< tabs >}}
{{% tab "Python" %}}
```python
ddtrace.config.botocore['dynamodb_primary_key_names_for_tables'] = {
    'table_name': {'key1', 'key2'},
    'other_table': {'other_key'},
}
```
{{% /tab %}}
{{% tab "Node.js" %}}
```js
// Initialize the tracer with the configuration
const tracer = require('dd-trace').init({
  dynamoDb: {
    tablePrimaryKeys: {
      'table_name': ['key1', 'key2'],
      'other_table': ['other_key']
    }
  }
})
```
{{% /tab %}}
{{% tab "Environment variable" %}}
```sh
export DD_BOTOCORE_DYNAMODB_TABLE_PRIMARY_KEYS='{
    "table_name": ["key1", "key2"],
    "other_table": ["other_key"]
}'
```
{{% /tab %}}
{{< /tabs >}}

Cela permet d'instrumenter les appels `PutItem` de DynamoDB avec des pointeurs de span. De nombreux appels à l'API DynamoDB n'incluent pas les champs de clé primaire de l'élément en tant que valeurs distinctes, ils doivent donc être fournis séparément au tracer. La configuration ci-dessus est structurée comme un dictionnaire (`dict`) ou un objet dont les clés sont les noms de table sous forme de chaînes (`str`). Chaque valeur est l'ensemble des noms de champs de clé primaire (en chaînes de caractères) pour la table associée. Cet ensemble peut contenir exactement un ou deux éléments, selon le schéma de clé primaire de la table.

## Visualiser et modéliser les services AWS par nom de ressource

Ces versions des couches Lambda [Node.js][50], [Python][51] et [Java][52] incluent des modifications permettant de nommer, modéliser et visualiser correctement les services gérés par AWS.

Les noms de service reflètent le nom réel de la ressource AWS plutôt que seulement le service AWS :
* `aws.lambda` → `[function_name]`
* `aws.dynamodb` → `[table_name]`
* `aws.sns` → `[topic_name]`
* `aws.sqs` → `[queue_name]`
* `aws.kinesis` → `[stream_name]`
* `aws.s3` → `[bucket_name]`
* `aws.eventbridge` → `[event_name]`

Vous pouvez préférer l'ancien modèle de représentation des services si vos dashboards et monitors reposent sur l'ancienne convention de nommage. Pour rétablir le comportement précédent, définissez la variable d'environnement : `DD_TRACE_AWS_SERVICE_REPRESENTATION_ENABLED=false`

Il est recommandé d'utiliser la nouvelle configuration de modélisation des services.

## Dépannage

Si vous ne parvenez pas à configurer vos installations, définissez la variable d'environnement `DD_LOG_LEVEL` sur `debug` pour activer les logs de debugging. Si vous avez besoin d'aide supplémentaire pour le dépannage, consultez le guide [Dépannage de la surveillance sans serveur][39].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/serverless/installation/
[2]: /fr/serverless/libraries_integrations/extension/
[3]: /fr/integrations/amazon_web_services/
[4]: /fr/serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /fr/tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /fr/serverless/enhanced_lambda_metrics
[8]: /fr/integrations/amazon_api_gateway/#data-collected
[9]: /fr/integrations/amazon_appsync/#data-collected
[10]: /fr/integrations/amazon_sqs/#data-collected
[11]: /fr/integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /fr/agent/logs/advanced_log_collection/
[14]: /fr/logs/log_configuration/pipelines/
[15]: /fr/tracing/trace_collection/compatibility/
[16]: /fr/tracing/trace_collection/custom_instrumentation/
[17]: /fr/tracing/trace_pipeline/ingestion_controls/#configure-the-service-ingestion-rate
[18]: /fr/tracing/guide/trace_ingestion_volume_control#effects-of-reducing-trace-ingestion-volume
[19]: /fr/tracing/trace_pipeline/ingestion_mechanisms/?tabs=environmentvariables#head-based-sampling
[20]: /fr/tracing/trace_pipeline/trace_retention/
[21]: /fr/tracing/trace_pipeline/
[22]: /fr/tracing/guide/ignoring_apm_resources/
[23]: /fr/tracing/configure_data_security/
[24]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[25]: /fr/logs/log_configuration/parsing/
[26]: /fr/integrations/guide/source-code-integration
[27]: /fr/serverless/aws_lambda/metrics/#submit-custom-metrics
[28]: /fr/agent/guide/private-link/
[29]: /fr/getting_started/site/
[30]: /fr/agent/proxy/
[31]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[32]: /fr/agent/guide/dual-shipping/
[33]: /fr/serverless/distributed_tracing/#trace-propagation
[34]: /fr/integrations/amazon_xray/
[35]: /fr/serverless/distributed_tracing/#trace-merging
[36]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[37]: /fr/serverless/guide/extension_motivation/
[38]: /fr/serverless/guide#install-using-the-datadog-forwarder
[39]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[40]: /fr/serverless/libraries_integrations/extension/
[41]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[42]: /fr/profiler/
[43]: /fr/serverless/installation#installation-instructions
[44]: /fr/security/default_rules/security-scan-detected/
[45]: https://docs.datadoghq.com/fr/tracing/trace_collection/library_config/
[46]: https://docs.datadoghq.com/fr/tracing/glossary/#services
[47]: /fr/logs/
[48]: /fr/tracing/trace_collection/otel_instrumentation/
[49]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[50]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v12.127.0
[51]: https://github.com/DataDog/datadog-lambda-python/releases/tag/v8.113.0
[52]: https://github.com/DataDog/datadog-lambda-java/releases/tag/v24
[53]: https://github.com/DataDog/datadog-lambda-extension
[54]: https://github.com/DataDog/datadog-lambda-extension/issues
[55]: /fr/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[56]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[57]: /fr/tracing/guide/aws_payload_tagging/?code-lang=python&tab=nodejs