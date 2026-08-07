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
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centre d'apprentissage
  text: Configurer AWS Lambda pour la surveillance sans serveur avec Datadog
title: Configurer la surveillance sans serveur pour AWS Lambda
---
Tout d'abord, [installez][1] Datadog Serverless Monitoring pour commencer à collecter des métriques, des traces et des journaux. Une fois l'installation terminée, consultez les sujets suivants pour configurer votre installation selon vos besoins de surveillance.

- [Connecter la télémétrie à l'aide de balises](#connect-telemetry-using-tags)
- [Collecter les charges utiles de requête et de réponse](#collect-the-request-and-response-payloads)
- [Collecter des traces à partir de ressources non-Lambda](#collect-traces-from-non-lambda-resources)
- [Configurer le SDK Datadog](#configure-the-datadog-sdk)
- [Sélectionner les taux d'échantillonnage pour ingérer les spans APM](#select-sampling-rates-for-ingesting-apm-spans)
- [Filtrer ou supprimer les informations sensibles des traces](#filter-or-scrub-sensitive-information-from-traces)
- [Activer/désactiver la collecte de traces](#enabledisable-trace-collection)
- [Connecter les journaux et les traces](#connect-logs-and-traces)
- [Lier les erreurs à votre code source](#link-errors-to-your-source-code)
- [Soumettre des métriques personnalisées][27]
- [Collecter des données de profilage](#collect-profiling-data)
- [Envoyer la télémétrie via PrivateLink ou un proxy](#send-telemetry-over-privatelink-or-proxy)
- [Envoyer la télémétrie à plusieurs organisations Datadog](#send-telemetry-to-multiple-datadog-organizations)
- [Activer la conformité FIPS](#enable-fips-compliance)
- [Propager le contexte de trace sur les ressources AWS](#propagate-trace-context-over-aws-resources)
- [Fusionner les traces X-Ray et Datadog](#merge-x-ray-and-datadog-traces)
- [Activer la signature de code AWS Lambda](#enable-aws-lambda-code-signing)
- [Migrer vers l'extension Datadog Lambda](#migrate-to-the-datadog-lambda-extension)
- [Migration de x86 vers arm64 avec l'extension Datadog Lambda](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [Configurer l'extension Datadog Lambda pour les tests locaux](#configure-the-datadog-lambda-extension-for-local-testing)
- [Instrumenter AWS Lambda avec l'API OpenTelemetry](#instrument-aws-lambda-with-the-opentelemetry-api)
- [Utiliser l'extension Datadog Lambda v67+](#using-datadog-lambda-extension-v67)
- [Configurer le lien automatique pour DynamoDB PutItem](#configure-auto-linking-for-dynamodb-putitem)
- [Visualiser et modéliser correctement les services AWS](#visualize-and-model-aws-services-by-resource-name)
- [Envoyer des journaux vers les pipelines d'observabilité](#send-logs-to-observability-pipelines)
- [Recharger périodiquement le secret de la clé API](#reload-api-key-secret-periodically)
- [Déboguer](#troubleshoot)
- [Lectures complémentaires](#further-reading)


## Activer la détection des menaces pour observer les tentatives d'attaque {#enable-threat-detection-to-observe-attack-attempts}

Recevez des alertes lorsque des acteurs malveillants ciblent vos applications sans serveur et prenez rapidement des mesures.

Pour commencer, assurez-vous d'abord que le [tracing est activé][43] pour vos fonctions.

Pour activer la surveillance des menaces, ajoutez les variables d'environnement suivantes à votre déploiement :
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

Redéployez la fonction et invoquez-la. Après quelques minutes, elle apparaît dans [les vues AAP][49].

Pour voir la détection des menaces de protection des applications et des API en action, envoyez des modèles d'attaque connus à votre application. Par exemple, envoyez un en-tête HTTP avec la valeur `acunetix-product` pour déclencher une tentative d'[attaque de scanner de sécurité][44] :
   ```sh
   curl -H 'My-AAP-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
Quelques minutes après avoir activé votre application et envoyé les modèles d'attaque, les informations de menace **apparaissent dans l'[Explorateur de signaux d'application][41]**.

## Connecter la télémétrie à l'aide de balises {#connect-telemetry-using-tags}

Connectez la télémétrie Datadog grâce à l'utilisation de balises réservées (`env`, `service` et `version`) et de balises personnalisées. Vous pouvez utiliser ces balises pour naviguer sans effort à travers les métriques, les traces et les journaux. Ajoutez les paramètres supplémentaires ci-dessous pour la méthode d'installation que vous utilisez.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Assurez-vous d'utiliser la dernière version du [Datadog CLI][1] et exécutez la commande `datadog-ci lambda instrument` avec les arguments supplémentaires appropriés. Exemple :

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Assurez-vous d'utiliser la dernière version du [plugin serverless Datadog][1] et appliquez les balises en utilisant les paramètres `env`, `service`, `version` et `tags`. Exemple :

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

Par défaut, si vous ne définissez pas `env` et `service`, le plugin utilise automatiquement les valeurs `stage` et `service` de la définition de l'application serverless. Pour désactiver cette fonctionnalité, définissez `enableTags` sur `false`.

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Assurez-vous d'utiliser la dernière version de la [macro serverless Datadog][1] et appliquez les balises en utilisant les paramètres `env`, `service`, `version` et `tags`. Exemple :

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Assurez-vous d'utiliser la dernière version du [construct CDK serverless Datadog][1] et appliquez les balises en utilisant les paramètres `env`, `service`, `version` et `tags`. Exemple :

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

Si vous collectez de la télémétrie de vos fonctions Lambda en utilisant l'[extension Datadog Lambda][1], définissez les variables d'environnement suivantes sur vos fonctions Lambda. Exemple :
- DD_ENV : dev
- DD_SERVICE : web
- DD_VERSION : v1.2.3
- DD_TAGS : team:avengers,project:marvel

Si vous collectez de la télémétrie de vos fonctions Lambda en utilisant la [fonction Lambda Forwarder Datadog][2], définissez les `env`, `service`, `version` et des balises supplémentaires en tant que balises de ressources AWS sur vos fonctions Lambda. Assurez-vous que l'option `DdFetchLambdaTags` est définie sur `true` dans la pile CloudFormation pour votre Forwarder Datadog. Cette option est par défaut à vrai depuis la version 3.19.0.

[1]: /fr/serverless/libraries_integrations/extension/
[2]: /fr/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

Datadog peut également enrichir les données de télémétrie recueillies à l'aide de tags de ressource AWS existants définis sur vos fonctions Lambda, avec un retard de quelques minutes.

- Si vous collectez de la télémétrie de vos fonctions Lambda en utilisant l'[extension Datadog Lambda][2], activez l'[intégration AWS Datadog][3]. Cette fonctionnalité est destinée à enrichir votre télémétrie avec des balises **personnalisées**. Les balises réservées de Datadog (`env`, `service` et `version`) doivent être définies via les variables d'environnement correspondantes (`DD_ENV`, `DD_SERVICE` et `DD_VERSION` respectivement). Les balises réservées peuvent également être définies avec les paramètres fournis par les intégrations Datadog avec les outils de développement serverless. Cette fonctionnalité ne fonctionne pas pour les fonctions Lambda déployées avec des images de conteneur.

- Si vous collectez la télémétrie de vos fonctions Lambda en utilisant la [fonction Lambda Datadog Forwarder][4], définissez l'option `DdFetchLambdaTags` sur `true` dans la pile CloudFormation pour votre Datadog Forwarder. Cette option est par défaut à vrai depuis la version 3.19.0.

## Collectez les charges utiles de requête et de réponse {#collect-the-request-and-response-payloads}

<div class="alert alert-info">Cette fonctionnalité est prise en charge pour Python, Node.js, Go, Java et .NET.</div>

Datadog peut [recueillir et visualiser les charges utiles des requêtes et réponses JSON de vos fonctions AWS Lambda][5]. Vous bénéficiez ainsi d'informations pertinentes sur vos applications sans serveur, pour un dépannage simplifié des échecs de vos fonctions Lambda.

Cette fonctionnalité est désactivée par défaut. Suivez les instructions ci-dessous pour la méthode d'installation que vous utilisez.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Assurez-vous d'utiliser la dernière version de la [Datadog CLI][1] et exécutez la commande `datadog-ci lambda instrument` avec l'argument supplémentaire `--capture-lambda-payload`. Exemple :

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Assurez-vous d'utiliser la dernière version du [plugin serverless Datadog][1] et définissez le `captureLambdaPayload` sur `true`. Exemple :

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Assurez-vous d'utiliser la dernière version de la [macro serverless Datadog][1] et définissez le paramètre `captureLambdaPayload` sur `true`. Exemple :

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Assurez-vous d'utiliser la dernière version du [construct CDK serverless Datadog][1] et définissez le paramètre `captureLambdaPayload` sur `true`. Exemple :

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

Définissez la variable d'environnement `DD_CAPTURE_LAMBDA_PAYLOAD` sur `true` dans vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

Pour éviter d'envoyer à Datadog des données sensibles dans les objets JSON des requêtes ou réponses, vous pouvez nettoyer certains paramètres.

Pour ce faire, ajoutez un nouveau fichier `datadog.yaml` dans le même dossier que le code de votre fonction Lambda. L'obfuscation des champs dans la charge utile Lambda est alors disponible via [le bloc replace_tags][6] dans les paramètres `apm_config` dans `datadog.yaml` :

```yaml
apm_config:
  replace_tags:
    # Replace all the occurrences of "foobar" in any tag with "REDACTED":
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # Replace "auth" from request headers with an empty string
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Replace "apiToken" from response payload with "****"
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

En alternative, vous pouvez également définir la variable d'environnement `DD_APM_REPLACE_TAGS` sur votre fonction Lambda pour obfusquer des champs spécifiques :

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "REDACTED"
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

Pour collecter des charges utiles des services AWS, voir [Capturer les requêtes et les réponses des services AWS][54].



## Collectez des traces à partir de ressources non-Lambda {#collect-traces-from-non-lambda-resources}

Datadog peut inférer des spans APM en fonction des événements Lambda entrants pour les ressources gérées par AWS qui déclenchent la fonction Lambda. Cela peut aider à visualiser la relation entre les ressources gérées par AWS et à identifier les problèmes de performance dans vos applications serverless. Voir [détails supplémentaires sur le produit][12].

Les ressources suivantes sont actuellement prises en charge :

- Passerelle API (API REST, API HTTP et WebSocket)
- URLs de fonction
- SQS
- SNS (les messages SNS livrés via SQS sont également pris en charge)
- Flux Kinesis (si les données sont une chaîne JSON ou une chaîne JSON encodée en base64)
- EventBridge (événements personnalisés, où `Details` est une chaîne JSON)
- S3
- DynamoDB

Pour désactiver cette fonctionnalité, définissez `DD_TRACE_MANAGED_SERVICES` sur `false`.

### DD_SERVICE_MAPPING {#dd-service-mapping}

`DD_SERVICE_MAPPING` est une variable d'environnement qui renomme les noms de [services non-Lambda][46] en amont. Il fonctionne avec `old-service:new-service` paires.

#### Syntaxe {#syntax}

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

Vous pouvez interagir avec cette variable de deux façons différentes :

#### Renommer tous les services d'un type {#rename-all-services-of-a-type}

Pour renommer tous les services en amont associés à une intégration AWS Lambda, utilisez les identificateurs suivants :

| Intégration AWS Lambda | Valeur DD_SERVICE_MAPPING |
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

#### Renommer des services spécifiques {#rename-specific-services}

Pour bénéficier d'un contrôle plus granulaire, utilisez les identificateurs suivants, qui sont propres à chaque service :

| Identifiant de service | |  Valeur DD_SERVICE_MAPPING |
|---|---|---|
| Passerelle API | ID de l'API | `"r3pmxmplak:newServiceName"` |
| SNS | Nom du sujet | `"ExampleTopic:newServiceName"` |
| Nom de la file SQS |  | `"MyQueue:newServiceName"` |
| Nom du compartiment S3 |  | `"example-bucket:newServiceName"` |
| Source d'événements EventBridge |  | `"eventbridge.custom.event.sender:newServiceName"` |
| Nom du flux Kinesis |  | `"MyStream:newServiceName"` |
| Nom de la table DynamoDB |  | `"ExampleTableWithStream:newServiceName"` |
| Lambda URLs | API ID | `"a8hyhsshac:newServiceName"` |
| Nom du cluster MSK |  | `"ExampleCluster:newServiceName"` |

#### Exemples avec description {#examples-with-description}

| Commande | Description |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | Renomme tous les services en amont en `lambda_api_gateway``new-service-name` |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | Renomme le service spécifique en amont `08se3mvh28.execute-api.eu-west-1.amazonaws.com` en `new-service-name` |

Pour renommer les services en aval, voir `DD_SERVICE_MAPPING` dans la [documentation de configuration du traceur][45].

## Configurer le SDK Datadog {#configure-the-datadog-sdk}

Pour voir quelles bibliothèques et frameworks sont automatiquement instrumentés par le client APM de Datadog, voir [Exigences de compatibilité pour APM][15]. Pour instrumenter des applications personnalisées, voir le guide APM de Datadog pour [l'instrumentation personnalisée][16].

## Sélectionner les taux d'échantillonnage pour l'ingestion des spans APM {#select-sampling-rates-for-ingesting-apm-spans}

Pour gérer le [taux d'échantillonnage des invocations tracées APM][17] pour les fonctions sans serveur, définissez la variable d'environnement `DD_TRACE_SAMPLING_RULES` sur une valeur comprise entre 0.000 (aucun traçage des invocations de la fonction Lambda) et 1.000 (traçage de toutes les invocations de la fonction Lambda).

**Notes**:
   - L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]` à la place.
   - Les métriques de trafic global telles que `trace.<OPERATION_NAME>.hits` sont calculées sur la base des invocations échantillonnées *uniquement* dans Lambda.

Pour les services à fort débit, il n'est généralement pas nécessaire de collecter chaque requête, car les données de trace sont très répétitives—un problème suffisamment important devrait toujours montrer des symptômes dans plusieurs traces. [Les contrôles d'ingestion][18] vous aident à avoir la visibilité dont vous avez besoin pour résoudre les problèmes tout en restant dans le budget.

Le mécanisme d'échantillonnage par défaut pour l'ingestion est appelé [échantillonnage basé sur l'en-tête][19]. La décision de conserver ou de supprimer une trace est prise dès le début de la trace, au début du span racine. Cette décision est ensuite propagée à d'autres services dans le cadre de leur contexte de requête, par exemple sous forme d'en-tête de requête HTTP. Parce que la décision est prise au début de la trace et ensuite transmise à toutes les parties de la trace, vous devez configurer le taux d'échantillonnage sur le service racine pour qu'il prenne effet.

Après que les spans ont été ingérés par Datadog, le Filtre de Rétention Intelligent de Datadog indexe une proportion de traces pour vous aider à surveiller la santé de vos applications. Vous pouvez également définir des [filtres de rétention][20] personnalisés pour indexer les données de trace que vous souhaitez conserver plus longtemps pour soutenir les objectifs de votre organisation.

En savoir plus sur le [pipeline de traces Datadog][21].

## Filtrer ou supprimer les informations sensibles des traces {#filter-or-scrub-sensitive-information-from-traces}

Pour filtrer les traces avant de les envoyer à Datadog, consultez la section [Ignorer les ressources non désirées dans APM][22].

Si vous avez besoin de nettoyer les attributs de vos traces pour des raisons de sécurité, consultez la section [Configurer l'Agent Datadog ou le traceur pour assurer la sécurité des données][23].

## Activer/désactiver la collecte de traces {#enabledisable-trace-collection}

Par défaut, la collecte de traces via l'extension Lambda Datadog est activée.

Si vous souhaitez commencer à recueillir des traces à partir de vos fonctions Lambda, appliquez les configurations ci-dessous :

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
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

Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true` dans vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

#### Désactiver la collecte de traces {#disable-trace-collection}

Si vous souhaitez interrompre la collecte de traces à partir de vos fonctions Lambda, appliquez les configurations ci-dessous :

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
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

Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false` dans vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

## Connecter les journaux et les traces {#connect-logs-and-traces}

Si vous utilisez l'[extension Lambda][2] pour collecter des traces et des journaux, Datadog ajoute automatiquement l'ID de requête AWS Lambda au span `aws.lambda` sous le tag `request_id`. De plus, les journaux Lambda pour la même requête sont ajoutés sous l'attribut `lambda.request_id`. Les vues de traces et de journaux de Datadog sont connectées en utilisant l'ID de requête AWS Lambda.

Si vous utilisez la [fonction Lambda Forwarder][4] pour collecter des traces et des journaux, `dd.trace_id` est automatiquement injecté dans les journaux (activé par défaut avec la variable d'environnement `DD_LOGS_INJECTION`). Les vues de traces et de journaux de Datadog sont connectées en utilisant l'ID de trace Datadog. Cette fonctionnalité est prise en charge pour la plupart des applications utilisant un runtime et un logger populaires (voir le [support par runtime][24]).

Si vous utilisez un runtime ou un logger personnalisé qui n'est pas pris en charge, procédez comme suit :
- Lors de la journalisation en JSON, vous devez obtenir l'ID de trace Datadog en utilisant `dd-trace` et l'ajouter à vos journaux sous le champ `dd.trace_id` :
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- Lors de la journalisation en texte brut, vous devez :
    1. Obtenez l'ID de trace Datadog en utilisant `dd-trace` et ajoutez-le à votre journal.
    2. Clonez le pipeline de journalisation Lambda par défaut, qui est en lecture seule.
    3. Activez le pipeline cloné et désactivez celui par défaut.
    4. Mettez à jour les règles du [parseur Grok][25] du pipeline cloné pour analyser l'ID de trace Datadog dans l'attribut `dd.trace_id`. Par exemple, utilisez la règle `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` pour les journaux qui ressemblent à `[INFO] dd.trace_id=4887065908816661012 My log message`.

## Liez les erreurs à votre code source {#link-errors-to-your-source-code}

L'[intégration du code source Datadog][26] vous permet de lier votre télémétrie (comme les traces de pile) au code source de vos fonctions Lambda dans vos dépôts Git.

Pour des instructions sur la configuration de l'intégration du code source sur vos applications sans serveur, consultez la section [Intégrer les informations Git dans vos artefacts de construction][101].

[101]: /fr/integrations/guide/source-code-integration/?tab=go#serverless

## Collectez des données de profilage {#collect-profiling-data}

Le [Profilage Continu][42] de Datadog est disponible en aperçu pour la version 4.62.0 du traceur Python et la version 62 de la couche et antérieures. Cette fonctionnalité optionnelle est activée en définissant la variable d'environnement `DD_PROFILING_ENABLED` sur `true`.

Le Profilage Continu fonctionne en créant un thread qui prend périodiquement un instantané du CPU et du tas de tout le code Python en cours d'exécution. Cela peut inclure le profiler lui-même. Si vous souhaitez que le profiler s'ignore, définissez `DD_PROFILING_IGNORE_PROFILER` sur `true`.

## Envoyez la télémétrie via PrivateLink ou via un proxy {#send-telemetry-over-privatelink-or-proxy}

L'Extension Lambda de Datadog a besoin d'un accès à Internet public pour envoyer des données à Datadog. Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet public, vous pouvez [envoyer des données via AWS PrivateLink][28] vers le site `datadoghq.com` [Datadog][29], ou [envoyer des données via un proxy][30] pour tous les autres sites.

Si vous utilisez le Forwarder Datadog, suivez [ces instructions][31].

## Envoyez la télémétrie à plusieurs organisations Datadog {#send-telemetry-to-multiple-datadog-organizations}

Si vous souhaitez envoyer vos données à plusieurs organisations différentes, vous pouvez activer la transmission multiple à l'aide d'une clé d'API en clair, d'AWS Secrets Manager, ou d'AWS KMS.

{{< tabs >}}
{{% tab "Clé API en texte&nbsp;brut" %}}

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

L'extension Datadog prend en charge la récupération automatique des valeurs de [AWS Secrets Manager][1] pour toutes les variables d'environnement préfixées par `_SECRET_ARN`. Vous pouvez utiliser cela pour stocker en toute sécurité vos variables d'environnement dans Secrets Manager et expédier en double avec Datadog.

1. Définissez la variable d'environnement `DD_LOGS_CONFIG_FORCE_USE_HTTP` sur votre fonction Lambda.
2. Ajoutez la permission `secretsmanager:GetSecretValue` aux autorisations de rôle IAM de votre fonction Lambda.
3. Créez un nouveau secret dans Secrets Manager pour stocker la variable d'environnement des métriques d'expédition en double. Le contenu doit être similaire à `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`.
4. Définissez la variable d'environnement `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` sur votre fonction Lambda à l'ARN du secret mentionné ci-dessus.
5. Créez un nouveau secret dans Secrets Manager pour stocker la variable d'environnement APM (traces) d'expédition en double. Le contenu doit être **similaire** à `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
6. Définissez la variable d'environnement `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` sur votre fonction Lambda égale à l'ARN du secret mentionné ci-dessus.
7. Créez un nouveau secret dans Secrets Manager pour stocker la variable d'environnement APM (profilage) d'expédition en double. Le contenu doit être **similaire** à `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
8. Définissez la variable d'environnement `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` sur votre fonction Lambda égale à l'ARN du secret mentionné ci-dessus.
9. Créez un nouveau secret dans Secrets Manager pour stocker la variable d'environnement des journaux d'expédition en double. Le contenu doit être **similaire** à `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`.
10. Définissez la variable d'environnement `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` sur votre fonction Lambda égale à l'ARN du secret mentionné ci-dessus.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS&nbsp;KMS" %}}

L'extension Datadog prend en charge le déchiffrement des valeurs de [AWS KMS][41] automatiquement pour toutes les variables d'environnement préfixées par `_KMS_ENCRYPTED`. Vous pouvez utiliser cela pour stocker en toute sécurité vos variables d'environnement dans KMS et expédier en double avec Datadog.

1. Définissez la variable d'environnement `DD_LOGS_CONFIG_FORCE_USE_HTTP=true` sur votre fonction Lambda.
2. Ajoutez les autorisations `kms:GenerateDataKey` et `kms:Decrypt` à votre rôle IAM de fonction Lambda.
3. Pour les métriques d'expédition duale, cryptez `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` en utilisant KMS et définissez la variable d'environnement `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` égale à sa valeur.
4. Pour les traces d'expédition duale, cryptez `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` en utilisant KMS et définissez la variable d'environnement `DD_APM_ADDITIONAL_KMS_ENCRYPTED` égale à sa valeur.
5. Pour le profilage d'expédition duale, cryptez `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` en utilisant KMS et définissez la variable d'environnement `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` égale à sa valeur.
5. Pour les journaux d'expédition duale, cryptez `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` en utilisant KMS et définissez la variable d'environnement `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` égale à sa valeur.

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

Pour découvrir des options d'utilisation plus avancées, consultez le [guide dédié à la transmission multiple][32].

## Activez la conformité FIPS {#enable-fips-compliance}

<div class="alert alert-info">Pour un aperçu complet de la conformité FIPS pour les fonctions AWS Lambda, consultez la page dédiée <a href="/serverless/aws_lambda/fips-compliance">Conformité FIPS AWS Lambda</a>.</div>

Pour activer la conformité FIPS pour les fonctions AWS Lambda, suivez ces étapes :

1. Utilisez une couche d'extension conforme à FIPS en référencant l'ARN approprié :

{{< tabs >}}
{{% tab "AWS GovCloud" %}}
 ```sh
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{% tab "AWS Commercial" %}}
 ```sh
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{< /tabs >}}

2. Pour les fonctions Lambda utilisant Python, JavaScript ou Go, définissez la variable d'environnement `DD_LAMBDA_FIPS_MODE` sur `true`. Cette variable d'environnement :
   - En mode FIPS, les fonctions d'aide aux métriques Lambda nécessitent l'extension conforme à FIPS pour la soumission des métriques.
   - Utilise les points de terminaison FIPS d'AWS pour les recherches de clés API.
   - Est activé par défaut dans les environnements GovCloud.

3. Pour les fonctions Lambda utilisant Ruby, .NET ou Java, aucune configuration supplémentaire de la variable d'environnement n'est nécessaire.

4. Pour une conformité FIPS complète de bout en bout, configurez votre fonction Lambda pour utiliser un site Datadog pour le gouvernement :
   - Définir `DD_SITE` sur `ddog-gov.com` (US1-FED) ou `us2.ddog-gov.com` (US2-FED)
   **Remarque** : Bien que les composants Lambda conformes FIPS fonctionnent avec n'importe quel site Datadog, seuls les sites Datadog pour le gouvernement disposent de points de terminaison d'ingestion conformes FIPS.

## Propager le contexte de trace sur les ressources AWS {#propagate-trace-context-over-aws-resources}

Datadog injecte automatiquement le contexte de trace dans les requêtes sortantes du SDK AWS et extrait le contexte de trace de l'événement Lambda. Cela permet à Datadog de tracer une requête ou une transaction à travers des services distribués. Voir [Propagation de trace sans serveur][33].

## Fusionner les traces X-Ray et Datadog {#merge-x-ray-and-datadog-traces}

AWS X-Ray prend en charge le traçage à travers certains services gérés par AWS tels qu'AppSync et Step Functions, ce qui n'est pas pris en charge nativement par Datadog APM. Vous pouvez activer l'[intégration Datadog X-Ray][34] et fusionner les traces X-Ray avec les traces natives de Datadog. Voir [détails supplémentaires][35].

## Activer la signature de code AWS Lambda {#enable-aws-lambda-code-signing}

[La signature de code pour AWS Lambda][36] aide à garantir que seul un code de confiance est déployé depuis vos fonctions Lambda vers AWS. Lorsque vous activez la signature de code sur vos fonctions, AWS valide que tout le code de vos déploiements est signé par une source de confiance, que vous définissez dans votre configuration de signature de code.

Si vos fonctions Lambda ont été configurées de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog à la configuration de signature de code de votre fonction avant de déployer les fonctions Lambda à l'aide des couches Lambda publiées par Datadog.

ARN du profil de signature de Datadog :

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```


## Migrer vers l'extension Datadog Lambda {#migrate-to-the-datadog-lambda-extension}

Datadog peut collecter les données de surveillance de vos fonctions Lambda soit en utilisant la [fonction Lambda Forwarder][4], soit l'[extension Lambda][2]. Datadog recommande l'extension Lambda pour les nouvelles installations. Si vous n'êtes pas sûr, voir [Décider de migrer vers l'extension Datadog Lambda][37].

Pour migrer, comparez les [instructions d'installation utilisant l'extension Datadog Lambda][1] avec les [instructions utilisant le Forwarder Datadog][38]. Pour votre commodité, les principales différences sont résumées ci-dessous.

**Remarque** : Datadog recommande de migrer d'abord vos applications de développement et de staging, puis de migrer les applications de production une par une.

<div class="alert alert-info">L'extension Datadog Lambda permet la collecte des journaux par défaut. Si vous migrez du Forwarder vers l'extension, assurez-vous de supprimer votre abonnement aux journaux. Sinon, vous pourriez voir des journaux en double.</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. Mettez à jour `@datadog/datadog-ci` vers la dernière version
2. Mettez à jour l'argument `--layer-version` et définissez-le sur la dernière version pour votre environnement d'exécution.
3. Définissez l'argument `--extension-version` sur la dernière version de l'extension. La dernière version de l'extension est `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Set the required environment variables `DATADOG_SITE` and `DATADOG_API_KEY_SECRET_ARN`.
5. Remove the `--forwarder` argument.
6. Si vous avez configuré l'intégration Datadog AWS pour abonner automatiquement le Forwarder aux groupes de journaux Lambda, désactivez cela après avoir migré _toutes_ les fonctions Lambda dans cette région.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. Mettez à jour `serverless-plugin-datadog` vers la dernière version, qui installe par défaut l'extension Datadog Lambda, sauf si vous définissez `addExtension` sur `false`.
2. Définissez les paramètres requis `site` et `apiKeySecretArn`.
3. Définissez les paramètres `env`, `service` et `version` si vous les avez précédemment définis comme des balises de ressources Lambda. Le plugin les définira automatiquement via les variables d'environnement réservées de Datadog, comme `DD_ENV`, lors de l'utilisation de l'extension.
4. Supprimez le paramètre `forwarderArn`, sauf si vous souhaitez conserver le Forwarder pour collecter des journaux à partir de ressources non-Lambda et que vous avez `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs` ou `subscribeToWebsocketLogs` définis sur `true`.
5. Si vous avez configuré l'intégration Datadog AWS pour abonner automatiquement le Forwarder aux groupes de journaux Lambda, désactivez cela après avoir migré _toutes_ les fonctions Lambda dans cette région.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Mettez à jour la pile CloudFormation `datadog-serverless-macro` pour prendre la dernière version.
2. Définissez le paramètre `extensionLayerVersion` sur la dernière version de l'extension. La dernière version de l'extension est `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Remove the `paramètre forwarderArn`.
5. Si vous avez configuré l'intégration Datadog AWS pour abonner automatiquement le Forwarder aux groupes de journaux Lambda, désactivez cela après avoir migré _toutes_ les fonctions Lambda dans cette région.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Mettez à jour `datadog-cdk-constructs` ou `datadog-cdk-constructs-v2` vers la dernière version :
2. Définissez le paramètre `extensionLayerVersion` sur la dernière version de l'extension : La dernière version de l'extension est `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Set the `env`, `service`, and `version` parameters if you previously set them as Lambda resource tags. The construct will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
5. Remove the `paramètre forwarderArn` :
6. Si vous avez configuré l'intégration Datadog AWS pour abonner automatiquement le Forwarder aux groupes de journaux Lambda, désactivez cela après avoir migré _toutes_ les fonctions Lambda dans cette région.

{{% /tab %}}
{{% tab "Autres" %}}

1. Mettez à jour la couche de bibliothèque Lambda Datadog pour votre runtime vers la dernière version.
2. Installez la dernière version de l'extension Lambda Datadog.
3. Définissez les variables d'environnement requises `DD_SITE` et `DD_API_KEY_SECRET_ARN`.
3. Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` si vous les avez précédemment définies comme balises de ressource Lambda.
4. Supprimez le filtre d'abonnement qui diffuse les journaux du groupe de journaux de votre fonction Lambda vers le Forwarder Datadog.
5. Si vous avez configuré l'intégration Datadog AWS pour abonner automatiquement le Forwarder aux groupes de journaux Lambda, désactivez cela après avoir migré _toutes_ les fonctions Lambda dans cette région.

{{% /tab %}}
{{< /tabs >}}

## Migration entre x86 et arm64 avec l'extension Lambda Datadog {#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension}

L'extension Datadog est un binaire compilé, disponible en variantes x86 et arm64. Si vous migrez une fonction Lambda x86 vers arm64 (ou arm64 vers x86) en utilisant un outil de déploiement tel que CDK, Serverless Framework ou SAM, assurez-vous que votre intégration de service (comme API Gateway, SNS ou Kinesis) est configurée pour utiliser les versions ou alias d'une fonction Lambda, sinon la fonction peut être indisponible pendant environ dix secondes pendant le déploiement.

Cela se produit parce que la migration d'une fonction Lambda de x86 vers arm64 consiste en deux appels API parallèles, `updateFunction` et `updateFunctionConfiguration`. Pendant ces appels, il y a une brève fenêtre où l'appel Lambda `updateFunction` est terminé et le code est mis à jour pour utiliser la nouvelle architecture tandis que l'appel `updateFunctionConfiguration` n'est pas encore terminé, donc l'ancienne architecture est toujours configurée pour l'Extension.

Si vous ne pouvez pas utiliser les paramètres LayerVersion, Datadog vous recommander de configurer le [Forwarder Datadog][38] durant le processus de migration vers la nouvelle architecture.


## Configurez l'extension Lambda Datadog pour les tests locaux {#configure-the-datadog-lambda-extension-for-local-testing}

Tous les émulateurs Lambda ne prennent pas en charge l'API de télémétrie AWS Lambda. Pour tester l'image de conteneur de votre fonction Lambda localement avec l'extension Lambda Datadog installée, vous devez définir `DD_SERVERLESS_FLUSH_STRATEGY` sur `periodically,1` dans votre environnement de test local. Sinon, l'extension attend des réponses de l'API de télémétrie AWS Lambda et bloque l'invocation.

## Instrumenter AWS Lambda avec l'API OpenTelemetry {#instrument-aws-lambda-with-the-opentelemetry-api}

Le SDK Datadog, qui est inclus dans l'extension Datadog Lambda lors de l'installation, accepte les spans et les traces générés par le code instrumenté avec OpenTelemetry, traite la télémétrie et l'envoie à Datadog.

Vous pouvez utiliser cette approche si, par exemple, votre code a déjà été instrumenté avec l'API OpenTelemetry. Vous pouvez également utiliser cette approche si vous souhaitez instrumenter en utilisant du code indépendant du fournisseur avec l'API OpenTelemetry tout en bénéficiant des avantages des SDK Datadog.

Pour instrumenter AWS Lambda avec l'API OpenTelemetry, définissez la variable d'environnement `DD_TRACE_OTEL_ENABLED` sur `true`. Voir [Instrumentation personnalisée avec l'API OpenTelemetry][48] pour plus de détails.

## Utilisation de l'extension Datadog Lambda v67+ {#using-datadog-lambda-extension-v67}
La version 67+ de [l'extension Datadog][53] est optimisée pour réduire considérablement la durée de démarrage à froid.
Pour utiliser l'extension optimisée, définissez la variable d'environnement `DD_SERVERLESS_APPSEC_ENABLED` sur `false`.
Lorsque la variable d'environnement `DD_SERVERLESS_APPSEC_ENABLED` est définie sur `true`, l'extension Datadog par défaut utilise la version plus ancienne entièrement compatible. Vous pouvez également forcer votre extension à utiliser la version plus ancienne en définissant `DD_EXTENSION_VERSION` sur `compatibility`. Datadog vous encourage à signaler tout retour d'information ou tout bogue en ajoutant une [issue sur GitHub][54] et en taguant votre issue avec `version/next`.

## Configurer l'auto-linking pour DynamoDB PutItem {#configure-auto-linking-for-dynamodb-putitem}
_Disponible pour les environnements d'exécution Python et Node.js_
Lorsque des segments de vos requêtes asynchrones ne peuvent pas propager le contexte de trace, la fonctionnalité [Span Auto-linking][55] de Datadog détecte automatiquement les spans liés. 
Pour activer le Span Auto-linking pour l'opération `PutItem` des [Flux de changement DynamoDB][56], configurez les noms des clés primaires pour vos tables.

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
{{% tab "Variable d'environnement" %}}

```sh
export DD_BOTOCORE_DYNAMODB_TABLE_PRIMARY_KEYS='{
    "table_name": ["key1", "key2"],
    "other_table": ["other_key"]
}'
```
{{% /tab %}}
{{< /tabs >}}

Cela permet d'instrumenter les appels DynamoDB `PutItem` avec des pointeurs de span. De nombreux appels API DynamoDB n'incluent pas les champs de clé primaire de l'élément en tant que valeurs séparées, donc ils doivent être fournis au SDK séparément. La configuration ci-dessus est structurée comme un dictionnaire (`dict`) ou un objet indexé par les noms des tables sous forme de chaînes (`str`). Chaque valeur est l'ensemble des noms de champs de clé primaire (sous forme de chaînes) pour la table associée. L'ensemble peut avoir exactement un ou deux éléments, selon le schéma de clé primaire de la table.

## Visualisez et modélisez les services AWS par nom de ressource {#visualize-and-model-aws-services-by-resource-name}

Ces versions des couches Lambda [Node.js][50], [Python][51] et [Java][52] ont apporté des modifications pour nommer, modéliser et visualiser correctement les services gérés par AWS. 

Les noms de service reflètent le nom réel de la ressource AWS plutôt que seulement le service AWS :
* `aws.lambda` → `[function_name]`
* `aws.dynamodb` → `[table_name]`
* `aws.sns` → `[topic_name]`
* `aws.sqs` → `[queue_name]`
* `aws.kinesis` → `[stream_name]`
* `aws.s3` → `[bucket_name]`
* `aws.eventbridge` → `[event_name]`

Vous pouvez préférer l'ancien modèle de représentation des services si vos tableaux de bord et vos moniteurs dépendent de la convention de nommage héritée. Pour restaurer le comportement précédent, définissez la variable d'environnement : `DD_TRACE_AWS_SERVICE_REPRESENTATION_ENABLED=false`

La configuration de modélisation des services mise à jour est recommandée.

## Envoyez les journaux vers les pipelines d'observabilité {#send-logs-to-observability-pipelines}

{{% observability_pipelines/lambda_extension_source %}}

Voir [Envoyer les journaux de l'extension Lambda Datadog vers les pipelines d'observabilité][58] pour plus d'informations.

## Rechargez périodiquement le secret de la clé API {#reload-api-key-secret-periodically}

Si vous spécifiez la clé API Datadog en utilisant `DD_API_KEY_SECRET_ARN`, vous pouvez également définir `DD_API_KEY_SECRET_RELOAD_INTERVAL` pour recharger périodiquement le secret. Par exemple, si vous définissez `DD_API_KEY_SECRET_RELOAD_INTERVAL` sur `43200`, alors le secret est rechargé lorsque la clé API est nécessaire pour envoyer des données, et qu'il s'est écoulé plus de 43200 secondes depuis le dernier chargement.

Exemple de cas d'utilisation : Pour des raisons de sécurité, chaque jour (86400 secondes), la clé API est renouvelée et le secret est mis à jour avec la nouvelle clé, tandis que l'ancienne clé API reste valide pendant un jour supplémentaire en tant que période de grâce. Dans ce cas, vous pouvez définir `DD_API_KEY_SECRET_RELOAD_INTERVAL` sur `43200`, de sorte que la clé API soit rechargée pendant la période de grâce de l'ancienne clé.

Ceci est disponible pour la version 88+ de l'extension Datadog Lambda.

## Déboguer {#troubleshoot}

Si vous rencontrez des difficultés pour configurer vos installations, définissez la variable d'environnement `DD_LOG_LEVEL` sur `debug` pour les journaux de débogage. Pour des conseils supplémentaires de dépannage, consultez le [guide de dépannage de la surveillance sans serveur][39].

## Lectures complémentaires {#further-reading}

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
[58]: /fr/observability_pipelines/sources/lambda_extension/