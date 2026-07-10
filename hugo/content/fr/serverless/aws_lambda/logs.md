---
title: Collecte de logs pour AWS Lambda
---

### Recueillir des logs à partir de ressources non Lambda

Les logs générés par des ressources gérées (outre les fonctions AWS Lambda) peuvent être utiles pour identifier la cause à l'origine des problèmes de vos applications sans serveur. Datadog vous conseille de [recueillir les logs][11] des ressources gérées par AWS suivantes dans votre environnement :
- API : API Gateway, AppSync et ALB
- Files d'attente et flux : SQS, SNS et Kinesis
- Datastores : DynamoDB, S3 et RDS

## Configuration

### Activer la collecte de logs

Par défaut, la collecte de logs via l'extension Lambda Datadog est activée.

{{< tabs >}}
{{% tab "Framework Serverless" %}}

```yaml
custom:
  datadog:
    # … autres paramètres requis, comme la clé d'API et le site Datadog
    enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # … autres paramètres requis, comme la clé d'API et le site Datadog
      enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // … autres paramètres requis, comme la clé d'API et le site Datadog
    enableDatadogLogs: true
});
datadog.addLambdaFunctions([<FONCTIONS_LAMBDA>]);
```

{{% /tab %}}
{{% tab "Autres" %}}

Définissez la variable d'environnement `DD_SERVERLESS_LOGS_ENABLED` sur `true` sur vos fonctions Lambda.

{{% /tab %}}
{{< /tabs >}}

### Désactiver la collecte de logs

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

Pour en savoir plus, consultez la section [Log Management][47].

### Filtrer ou nettoyer des données des logs

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

### Parser et transformer des logs

Pour parser et transformer vos logs dans Datadog, consultez la documentation relative aux [pipelines de logs Datadog][14].

### Associer vos logs à vos traces

Si vous utilisez l'[extension Lambda][2] pour recueillir des traces et des logs, Datadog ajoute automatiquement l'ID de la requête AWS Lambda à la span `aws.lambda` via le tag `request_id`. En outre, les logs Lambda d'une même requête partagent le même attribut `lambda.request_id`. L'ID de requête AWS Lambda permet d'associer les vues des traces et des logs Datadog.

Si vous utilisez la [fonction Lambda du Forwarder][4] pour recueillir des traces et des logs, `dd.trace_id` est automatiquement injecté dans les logs (grâce à la variable d'environnement `DD_LOGS_INJECTION`). L'ID de trace Datadog permet d'associer les vues des traces et des logs Datadog. Cette fonctionnalité est compatible avec la majorité des applications utilisant un runtime et un logger connus (voir la [prise en charge pour chaque runtime][24]).

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

[2]: /fr/serverless/libraries_integrations/extension/
[4]: /fr/serverless/libraries_integrations/forwarder/
[11]: /fr/integrations/amazon_web_services/#log-collection
[13]: /fr/agent/logs/advanced_log_collection/
[14]: /fr/logs/log_configuration/pipelines/
[24]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[25]: /fr/logs/log_configuration/parsing/
[47]: /fr/logs/