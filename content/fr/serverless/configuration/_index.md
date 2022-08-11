---
aliases:
- /fr/serverless/distributed_tracing/collect_lambda_payloads
- /fr/serverless/libraries_integrations/lambda_code_signing
- /fr/serverless/guide/forwarder_extension_migration/
- /fr/serverless/guide/extension_private_link/
further_reading:
- link: /serverless/installation/
  tag: Documentation
  text: Installation de la surveillance sans serveur
- link: /serverless/troubleshooting/
  tag: Documentation
  text: Dépannage de la surveillance sans serveur
kind: documentation
title: Configurer la surveillance sans serveur
---

[Installez][1] premièrement la surveillance sans serveur Datadog afin de commencer à recueillir des métriques, traces et logs. Une fois cette première étape terminée, consultez les rubriques suivantes pour configurer votre installation afin de répondre à vos besoins en matière de surveillance.

### Métriques
- [Recueillir des métriques à partir de ressources non Lambda](#recueillir-des-metriques-a-partir-de-ressources-non-Lambda)
- [Envoyer des métriques custom](#envoyer-des-metriques-custom)

### Logs
- [Filtrer ou nettoyer des données des logs](#filtrer-ou-nettoyer-des-donnees-des-logs)
- [Désactiver la collecte de logs](#desactiver-la-collecte-de-logs)
- [Recueillir des logs à partir de ressources non Lambda](#recueillir-des-logs-a-partir-de-ressources-non-Lambda)
- [Parser et transformer des logs](#parser-et-transformer-des-logs)
- [Associer des logs à des traces](#associer-des-logs-a-des-traces)

### APM
- [Configurer le traceur Datadog](#configurer-le-traceur-datadog)
- [Choisir les taux d'échantillonnage du tracing APM](#choisir-les-taux-d-echantillonnage-pour-l-ingestion-des-spans-apm)
- [Filtrer ou nettoyer des informations sensibles des traces](#filtrer-ou-nettoyer-des-informations-sensibles-des-traces)
- [Désactiver la collecte de traces](#desactiver-la-collecte-de-traces)
- [Recueillir les charges utiles des requêtes et réponses](#recueillir-les-charges-utiles-des-requetes-et-reponses)
- [Recueillir des traces à partir de ressources non Lambda](#recueillir-des-traces-a-partir-de-ressources-non-lambda)
- [Propager le contexte de traces vers des ressources AWS](#propager-le-contexte-de-traces-vers-des-ressources-aws)
- [Fusionner des traces X-Ray et Datadog](#fusionner-des-traces-x-ray-et-datadog)
- [Associer des erreurs à votre code source](#associer-des-erreurs-a-votre-code-source)

### Autres
- [Associer des données de télémétrie à l'aide de tags](#associer-des-donnees-de-telemetrie-a-l-aide-de-tags)
- [Envoyer des données de télémétrie via AWS PrivateLink ou un proxy](#envoyer-des-donnees-de-telemetrie-via-aws-privatelink-ou-un-proxy)
- [Envoyer des données de télémétrie à plusieurs organisations Datadog](#envoyer-des donnees-de-telemetrie-a-plusieurs-organisations-Datadog)
- [Migrer vers l'extension Lambda Datadog](#migrer-vers-l-extension-lambda-datadog)
- [Activer la signature de code pour AWS Lambda](#activer-la-signature-de-code-pour-aws-lambda)
- [Configurer l'extension Lambda Datadog pour effectuer des tests locaux](#configurer-l-extension-lambda-datadog-pour-effectuer-des-tests-locaux)
- [Dépannage](#depannage)

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
const datadog = new Datadog(this, "Datadog", {
    // … autres paramètres requis, comme la clé d'API et le site Datadog
    env: "dev",
    service: "web",
    version: "v1.2.3",
    tags: "team:avengers,project:marvel"
});
datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);
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

<div class="alert alert-info">Cette fonctionnalité est actuellement prise en charge pour les langages Python, Node.js, Java et .NET.</div>

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
const datadog = new Datadog(this, "Datadog", {
    // … autres paramètres requis, comme la clé d'API et le site Datadog
    captureLambdaPayload: true
});
datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);
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

## Recueillir des métriques à partir de ressources non Lambda

Datadog peut non seulement recueillir en temps réel des [métriques Lambda optimisées][7], mais également vous aider à recueillir des métriques relatives aux ressources gérées par AWS, comme les ressources [API Gateway][8], [AppSync][9] et [SQS][10]. Vous pouvez ainsi surveiller l'intégralité de votre application sans serveur. Les tags de ressource AWS correspondants sont également ajoutés aux métriques.

Pour recueillir ces métriques, configurez l'[intégration Datadog/AWS][3].

## Recueillir des logs à partir de ressources non Lambda

Les logs générés par des ressources gérées (outre les fonctions Lambda AWS) peuvent être utiles pour identifier la cause à l'origine des problèmes de vos applications sans serveur. Datadog vous conseille de [recueillir les logs][11] des ressources gérées par AWS suivantes dans votre environnement :
- API : API Gateway, AppSync et ALB
- Files d'attente et flux : SQS, SNS et Kinesis
- Datastores : DynamoDB, S3 et RDS

## Recueillir des traces à partir de ressources non Lambda

<div class="alert alert-info">Cette fonctionnalité est actuellement prise en charge pour les langages Python, Node.js, Java et .NET.</div>

Datadog peut déduire des spans APM en fonction des événements Lambda reçus pour les ressources gérées par AWS qui déclenchent une fonction Lambda. Vous pouvez ainsi visualiser plus facilement la relation entre les ressources gérées par AWS et identifier plus rapidement les problèmes de performances de vos applications sans serveur. Consultez [cet article de blog][12] (en anglais) pour obtenir plus d'informations sur les solutions incluses.

Les ressources suivantes sont actuellement prises en charge :

- API Gateway (API REST, API HTTP et WebSocket)
- URL de fonction
- SQS
- SNS (les messages SNS distribués via SQS sont également pris en charge)
- Flux Kinesis (si les données correspondent  une chaîne JSON ou à une chaîne JSON codée en base64)
- EventBridge (événements personnalisés pour lesquels `Details` prend la forme d'une chaîne JSON)
- S3
- DynamoDB

Pour désactiver cette fonctionnalité, définissez `DD_TRACE_MANAGED_SERVICES` sur `false`.

## Filtrer ou nettoyer des données des logs

Pour exclure les logs `START` et `END`, définissez la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` sur `[{"type": "exclude_at_match", "name": "exclude_start_and_end_logs", "pattern": "(START|END) RequestId"}]`. Vous pouvez également ajouter un fichier `datadog.yaml` dans le répertoire racine de votre projet avec le contenu suivant :

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_start_and_end_logs
      pattern: (START|END) RequestId
```

Datadog vous conseille de conserver les logs `REPORT`. En effet, ils permettent de remplir la liste d'invocations des vues des fonctions sans serveur.

Pour nettoyer ou filtrer d'autres logs avant de les envoyer à Datadog, consultez la section [Collecte de logs avancée][13].

## Désactiver la collecte de logs

Par défaut, la collecte de logs via l'extension Lambda Datadog est activée.

Si vous ne souhaitez plus recueillir de logs à l'aide de la fonction Lambda du Forwarder Datadog, supprimez le filtre d'abonnement du groupe de logs CloudWatch de votre propre fonction Lambda.

Si vous ne souhaitez plus recueillir de logs à l'aide de l'extension Lambda Datadog, suivez les instructions ci-dessous pour la méthode d'installation que vous avez suivie :

{{< tabs >}}
{{% tab "Framework Serverless" %}}

```yaml
custom:
  datadog:
    # … autres paramètres requis, comme la clé d'API et le site Datadog
    enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # … autres paramètres requis, comme la clé d'API et le site Datadog
      enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // … autres paramètres requis, comme la clé d'API et le site Datadog
    enableDatadogLogs: false
});
datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);
```

{{% /tab %}}
{{% tab "Autres" %}}

Définissez la variable d'environnement `DD_SERVERLESS_LOGS_ENABLED` sur `false` sur vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

## Parser et transformer des logs

Pour parser et transformer vos logs dans Datadog, consultez la documentation relative aux [pipelines de logs Datadog][14].

## Configurer le traceur Datadog

Pour découvrir quelles bibliothèques et quels frameworks sont automatiquement instrumentés par le client APM Datadog, consultez la section [Exigences de compatibilité pour APM][15]. Pour instrumenter des applications personnalisées, consultez le guide sur l'[instrumentation personnalisée][16] pour la solution APM de Datadog.

## Choisir les taux d'échantillonnage pour l'ingestion des spans APM

Pour gérer le [taux d'échantillonnage des invocations tracées par APM][35] pour des fonctions sans serveur, définissez la variable d'environnement `DD_TRACE_SAMPLE_RATE` de la fonction sur une valeur comprise entre 0.000 (aucun tracing des invocations de fonction Lambda) et 1.000 (tracing de toutes les invocations de fonction Lambda).

Les métriques sont calculées en tenant compte de l'intégralité du trafic de l'application. Votre configuration d'échantillonnage ne nuit donc aucunement à leur justesse.

Pour les services à haut débit, puisque les données des traces sont très répétitives, vous n'avez généralement pas besoin de recueillir chaque requête : les problèmes suffisamment graves sont systématiquement détectables dans plusieurs traces. Les [contrôles d'ingestion][36] vous permettent de visualiser les données dont vous avez besoin pour diagnostiquer des problèmes tout en respectant votre marge d'erreur.

L'[échantillonnage en amont][37] constitue le mécanisme par défaut. La décision de conserver ou d'ignorer la trace est prise au tout début du cycle de vie de la trace, à la création de la span racine. Cette décision est ensuite propagée vers les autres services par l'intermédiaire du contexte de la requête (par exemple, sous la forme d'un en-tête de requête HTTP).

La décision est prise au début de la trace, puis transmise durant toutes les étapes de la trace. Ainsi, vous êtes certains de conserver ou d'ignorer l'ensemble de la trace.

## Filtrer ou nettoyer des informations sensibles des traces

Pour filtrer des traces avant de les envoyer à Datadog, consultez la section [Ignorer les ressources non désirées dans l'APM][17].

Si vous avez besoin de nettoyer les attributs de vos traces pour des raisons de sécurité, consultez la section [Configurer l'Agent Datadog ou le traceur pour assurer la sécurité des données][18].

## Désactiver la collecte de logs

La collecte de traces via l'extension Lambda Datadog est activée par défaut. Si vous ne souhaitez pas recueillir de traces à partir de vos fonctions Lambda, suivez les instructions ci-dessous :

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
const datadog = new Datadog(this, "Datadog", {
    //… autres paramètres requis, comme la clé d'API et le site Datadog
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);
```

{{% /tab %}}
{{% tab "Autres" %}}

Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false` sur vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

## Associer vos logs à vos traces

Si vous utilisez l'[extension Lambda][2] pour recueillir des traces et des logs, Datadog ajoute automatiquement l'ID de la requête AWS Lambda à la span `aws.lambda` via le tag `request_id`. En outre, les logs Lambda d'une même requête partagent le même attribut `lambda.request_id`. L'ID de requête AWS Lambda permet d'associer les vues des traces et des logs Datadog.

Si vous utilisez la [fonction Lambda du Forwarder][4] pour recueillir des traces et des logs, `dd.trace_id` est automatiquement injecté dans les logs (grâce à la variable d'environnement `DD_LOGS_INJECTION`). L'ID de trace Datadog permet d'associer les vues des traces et des logs Datadog. Cette fonctionnalité est compatible avec la majorité des applications utilisant un runtime et un logger connus (voir la [prise en charge pour chaque runtime][19]).

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
    4. Modifiez les règles du [parser Grok][20] du pipeline dupliqué afin de parser l'ID de trace Datadog dans l'attribut `dd.trace_id`. Vous pouvez par exemple utiliser la règle `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` pour les logs dont le format est `[INFO] dd.trace_id=4887065908816661012 Mon message de log`.

## Associer des erreurs à votre code source

<div class="alert alert-info">Cette fonctionnalité est actuellement prise en charge pour les langages Go et Java.</div>

Grâce à l'[intégration du code source Datadog][21], vous pouvez associer vos données de télémétrie (comme vos stack traces) au code source de vos fonctions Lambda dans GitHub. Suivez les instructions ci-dessous pour activer cette fonctionnalité. **Remarque** : vous devez procéder au déploiement depuis un référentiel Git local qui n'est ni « dirty » ni en avance par rapport à un référentiel distant.

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

Exécutez `datadog-ci lambda instrument` avec `--source-code-integration true` pour envoyer automatiquement des métadonnées Git au répertoire local actuel et ajouter les tags requis à vos fonctions Lambda.

**Remarque** : vous devez définir la variable d'environnement `DATADOG_API_KEY` pour `datadog-ci` afin d'importer les métadonnées Git. `DATADOG_API_KEY` est également défini sur vos fonctions Lambda pour l'envoi des données de télémétrie, sauf si vous avez également défini `DATADOG_API_KEY_SECRET_ARN`, qui est prioritaire par rapport à `DATADOG_API_KEY`.


```sh
# … autres variables d'environnement requises, comme DATADOG_SITE

# requis, permet d'importer les métadonnées Git
export DATADOG_API_KEY=<CLÉ_API_DATADOG>

# facultatif, DATADOG_API_KEY est utilisé si cette variable d'environnement n'est pas définie
export DATADOG_API_KEY_SECRET_ARN=<ARN_SECRET_CLÉ_API_DATADOG>

datadog-ci lambda instrument \
    --source-code-integration true
    # … autres arguments requis, comme le nom des fonctions
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Lorsque `enableSourceCodeIntegration` est défini sur `true`, le plug-in Serverless Datadog envoie automatiquement les métadonnées Git au répertoire local actuel et ajoute les tags requis à vos fonctions Lambda.

**Remarque** : vous devez définir le paramètre `apiKey` pour le plug-in afin d'importer les métadonnées Git. `apiKey` est également défini sur vos fonctions Lambda pour l'envoi de données de télémétrie, sauf si vous avez également défini `apiKeySecretArn`, qui est prioritaire par rapport à `apiKey`.

```yaml
custom:
  datadog:
    # … autres paramètres requis, comme le site Datadog
    apiKey: <CLÉ_API> # requis, permet d'importer les métadonnées Git
    apiKeySecretArn: <ARN_SECRET_CLÉ_API> # facultatif, apiKey est utilisé si ce paramètre n'est pas défini
    enableSourceCodeIntegration: true # valeur par défaut : true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

Remplacez votre fonction d'initialisation par ce qui suit pour passer la valeur gitHash à la pile CDK :

```typescript
async function main() {
  // Bien ajouter @datadog/datadog-ci via votre gestionnaire de packages
  const datadogCi = require("@datadog/datadog-ci");
  const gitHash = await datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

  const app = new cdk.App();
  // Passer la valeur au constructor ExampleStack dans le hash
  new ExampleStack(app, "ExampleStack", {}, gitHash);
}
```

Dans le constructor de votre pile, ajoutez un paramètre `gitHash` facultatif, puis appelez `addGitCommitMetadata()` :

```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
    ...
    ...
    datadog.addGitCommitMetadata([<VOS_FONCTIONS>], gitHash)
  }
}
```

{{% /tab %}}
{{% tab "Autres" %}}

1. Définissez la variable d'environnement `DD_TAGS="git.commit.sha:<HASH_COMMIT_GIT>,git.repository_url=<URL_RÉFÉRENTIEL>"` sur vos fonctions Lambda.
2. Exécutez [datadog-ci git-metadata upload][1] dans votre pipeline de CI pour importer les métadonnées Git.
3. Enfin, vous avez la possibilité d'[installer une app GitHub][2] pour intégrer des extraits de code source.

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[2]: https://app.datadoghq.com/account/settings#integrations/github-apps
{{% /tab %}}
{{< /tabs >}}

## Envoyer des métriques custom

Vous pouvez [envoyer des métriques custom][22] pour surveiller une logique opérationnelle personnalisée.

## Envoyer des données de télémétrie via AWS PrivateLink ou un proxy

L'extension Lambda Datadog doit pouvoir accéder à Internet pour envoyer des données à Datadog. Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez [envoyer vos données via AWS PrivateLink][23] pour le [site Datadog][24] `datadoghq.com` ou [via un proxy][25] pour tous les autres sites.

Si vous utilisez le Forwarder Datadog, suivez [ces instructions][26].

## Envoyer des données de télémétrie à plusieurs organisations Datadog

Pour envoyer des données à plusieurs organisations Datadog, suivez les instructions relatives à la [transmission multiple][27] et ajoutez le fichier `datadog.yaml` dans le répertoire racine de votre projet.

## Propager le contexte de traces vers des ressources AWS

Datadog injecte automatiquement le contexte des traces dans les requêtes AWS SDK sortantes et extrait le contexte des traces à partir des événements Lambda. Cela permet de tracer une requête ou une transaction sur des services distribués. Pour en savoir plus, consultez la section [Propagation des traces sans serveur][28].

## Fusionner des traces X-Ray et Datadog

AWS X-Ray prend en charge le tracing par l'intermédiaire de certains services gérés par AWS, comme AppSync et Step Functions, qui ne sont pas nativement pris en charge par la solution APM Datadog. Vous pouvez néanmoins activer l'[intégration Datadog/X-Ray][29] et fusionner les traces X-Ray avec les traces natives Datadog. Pour obtenir plus d'informations à ce sujet, consultez [cette section][30].

## Activer la signature de code pour AWS Lambda

Grâce à la [signature de code pour AWS Lambda][31], vous êtes certain de ne déployer que du code fiable depuis vos fonctions Lambda vers AWS. Lorsque vous activez la signature de code sur vos fonctions, AWS vérifie que tout le code de vos déploiements est signé par une source fiable. Vous pouvez définir les sources auxquelles vous faites confiance depuis la configuration de la signature de code.

Si vos fonctions Lambda ont été configurées de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog à la configuration de signature de code de votre fonction avant de déployer les fonctions Lambda à l'aide des couches Lambda publiées par Datadog.

ARN du profil de signature de Datadog :

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```

## Migrer vers l'extension Lambda Datadog

Datadog peut recueillir les données de surveillance de vos fonctions Lambda via la [fonction Lambda du Forwarder][4] ou l'[extension Lambda][2]. Il est conseillé de privilégier l'extension Lambda pour les nouvelles installations. Si vous ne savez pas quelle approche adopter, consultez la section [Choisir s'il est pertinent de migrer vers l'extension Lambda Datadog][32].

Pour procéder à la migration, comparez les [instructions d'installation via l'extension Lambda Datadog][1] avec [celles via le Forwarder Datadog][33]. Pour vous faciliter la tâche, les principales différences sont répertoriées ci-dessous.

**Remarque** : Datadog vous conseille de migrer en premier vos applications dev et staging, puis de migrer vos applications de production une par une.

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

## Configurer l'extension Lambda Datadog pour effectuer des tests locaux

Pour tester l'image du conteneur de votre fonction Lambda en local lorsque l'extension Lambda Datadog est installée, vous devez définir `DD_LOCAL_TEST` sur `true` dans votre environnement de test local. Si ce n'est pas le cas, l'extension attend des réponses de l'API d'extensions AWS et bloque l'appel.

## Dépannage

Si vous ne parvenez pas à configurer vos installations, définissez la variable d'environnement `DD_LOG_LEVEL` sur `debug` pour activer les logs de debugging. Si vous avez besoin d'aide supplémentaire pour le dépannage, consultez le guide [Dépannage de la surveillance sans serveur][34].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: /fr/serverless/installation/
[2]: /fr/serverless/libraries_integrations/extension/
[3]: /fr/integrations/amazon_web_services/
[4]: /fr/serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /fr/tracing/setup_overview/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /fr/serverless/enhanced_lambda_metrics
[8]: /fr/integrations/amazon_api_gateway/#data-collected
[9]: /fr/integrations/amazon_appsync/#data-collected
[10]: /fr/integrations/amazon_sqs/#data-collected
[11]: /fr/integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /fr/agent/logs/advanced_log_collection/
[14]: /fr/logs/log_configuration/pipelines/
[15]: /fr/tracing/setup_overview/compatibility_requirements/
[16]: /fr/tracing/setup_overview/custom_instrumentation/
[17]: /fr/tracing/guide/ignoring_apm_resources/
[18]: /fr/tracing/setup_overview/configure_data_security/
[19]: /fr/tracing/connect_logs_and_traces/
[20]: /fr/logs/log_configuration/parsing/
[21]: /fr/integrations/guide/source-code-integration
[22]: /fr/serverless/custom_metrics
[23]: /fr/agent/guide/private-link/
[24]: /fr/getting_started/site/
[25]: /fr/agent/proxy/
[26]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[27]: /fr/agent/guide/dual-shipping/
[28]: /fr/serverless/distributed_tracing/serverless_trace_propagation/
[29]: /fr/integrations/amazon_xray/
[30]: /fr/serverless/distributed_tracing/serverless_trace_merging
[31]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[32]: /fr/serverless/guide/extension_motivation/
[33]: /fr/serverless/guide#install-using-the-datadog-forwarder
[34]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[35]: /fr/tracing/trace_ingestion/ingestion_controls/#configure-the-service-ingestion-rate
[36]: /fr/tracing/guide/trace_ingestion_volume_control#effects-of-reducing-trace-ingestion-volume
[37]: /fr/tracing/trace_ingestion/mechanisms/?tabs=environmentvariables#head-based-sampling