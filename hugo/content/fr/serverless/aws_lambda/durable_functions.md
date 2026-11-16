---
description: Configurez Datadog Serverless Monitoring pour les fonctions durables
  AWS Lambda.
further_reading:
- link: https://www.datadoghq.com/blog/trace-aws-lambda-durable-functions/
  tag: Blog
  text: Tracez les fonctions Lambda AWS durables avec Datadog
title: Surveillance des fonctions durables AWS Lambda
---
Datadog offre une visibilité complète sur les métriques, les logs et les traces des exécutions de fonctions durables AWS Lambda. Dans une vue unique, vous pouvez surveiller vos fonctions durables AWS Lambda parallèlement à vos autres services de calcul sans serveur pour identifier les goulots d'étranglement et corriger les erreurs.

**Runtimes pris en charge :** Node.js, Python

## Configuration {#setup}

### Instrumentez votre fonction Lambda {#instrument-your-lambda-function}

1. Suivez [les étapes pour instrumenter une fonction Lambda][1], en confirmant que la bibliothèque Lambda Datadog est installée et que le traçage ainsi que la [collecte de logs][9] sont activés (la collecte de logs est activée par défaut). Utilisez les versions suivantes :

    - Datadog Lambda Extension : v99+
    - Couche Lambda Datadog pour Node.js : v142+
    - Couche Lambda Datadog pour Python : v127+

2. Si vous utilisez Datadog Lambda Extension v99, définissez la variable d'environnement suivante sur votre fonction Lambda. Pour la v100+, la valeur par défaut est déjà `5`, vous n'avez donc pas besoin de la définir explicitement.

    ```text
    DD_LAMBDA_DURABLE_FUNCTION_LOG_BUFFER_SIZE=5
    ```

    This environment variable configures the Datadog Lambda Extension to buffer logs and enrich them with the durable execution context sent by the Datadog Lambda Library. Set its value to a non-negative integer specifying the maximum number of invocations whose logs are buffered. A value of `0` disables enrichment, so durable executions do not appear in Datadog. In v99, the default is `0`; in v100+, the default is `5`.

### Transférer les événements d'exécution durable {#forward-durable-execution-events}

**Déployer la pile CloudFormation**

Pour transférer les événements de changement d'état d'exécution durable vers Datadog, déployez la pile CloudFormation sur votre compte AWS :

1. Connectez-vous au compte et à la région AWS où vos fonctions durables s'exécutent, puis cliquez sur **Lancer la pile** pour ouvrir la pile :

    [![Lancer la pile](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)][2]

2. Fournissez votre clé d'API Datadog en utilisant exactement l'un des paramètres suivants :

    - `DdApiKey` : votre [clé d'API Datadog][3] en texte clair
    - `DdApiKeySecretArn` : l'ARN d'un secret AWS Secrets Manager dont la valeur est votre clé d'API Datadog
    - `DdApiKeySsmParameterName` : le nom d'un paramètre AWS Systems Manager Parameter Store `SecureString` qui contient votre clé d'API Datadog

3. Définissez `DdSite` sur votre [site Datadog][4]. La valeur par défaut est `datadoghq.com`.
4. Optionnellement, restreignez les événements transférés :

    - `Statuses` : une liste séparée par des virgules des statuts d'exécution à transférer. Les valeurs valides sont `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT` et `STOPPED`. Laissez ce champ vide pour transférer tous les statuts.
    - `FunctionArnFilter1` à `FunctionArnFilter5` : jusqu'à cinq ARN de fonctions Lambda non qualifiés ou modèles génériques EventBridge, tels que `arn:aws:lambda:us-east-2:123456789012:function:my-durable-*`. N'incluez pas de suffixe de version ou d'alias. Laissez les cinq champs vides pour transférer les événements de chaque fonction de la région.
    - `BufferIntervalSeconds` : l'intervalle de mise en tampon Amazon Data Firehose, en secondes (`60`-`900`, par défaut `60`). Des valeurs plus élevées réduisent le nombre de requêtes sortantes au détriment de la fraîcheur.

5. Cliquez sur **Create stack** et attendez que la pile finisse de se créer.
6. Si vos fonctions durables s'exécutent dans plusieurs régions AWS, répétez ces étapes dans chaque région.

**Installez l'intégration AWS Lambda**

Dans Datadog, installez l'[intégration AWS Lambda][5], qui fournit le pipeline de logs prêt à l'emploi qui transforme les événements transférés.

### Créez un filtre de rétention de traces {#create-a-trace-retention-filter}

Créez un [filtre de rétention de traces][6] avec la requête de rétention `operation_name:aws.durable.execute`.

## Requête dans Datadog {#querying-in-datadog}

L'onglet **Executions** sur la page de la fonction Lambda répertorie les exécutions durables. Utilisez les attributs de log, les tags de span et les métriques ci-dessous pour rechercher des exécutions durables, ou pour créer des dashboards et des monitors.

### Logs {#logs}

Pour limiter une requête de log à une fonction, filtrez sur l'ARN de la fonction :

```text
@lambda.arn:"<FUNCTION_ARN>"
```

Datadog Lambda Extension ajoute ces attributs aux logs d'une fonction durable :

| Attribut de log | Description |
|---|---|
| `@lambda.durable_function.execution_name` | Le nom de l'exécution. Regroupe tous les logs d'une même exécution. |
| `@lambda.durable_function.execution_id` | L'identifiant de l'exécution. |
| `@lambda.durable_function.first_invocation` | `true` sur les logs de la première invocation de l'exécution, `false` sinon. |
| `@lambda.durable_function.execution_status` | L'état de l'exécution à la fin de l'invocation : `SUCCEEDED`, `FAILED` ou `PENDING`, où `PENDING` signifie que l'exécution a été suspendue et reprendra lors d'une invocation ultérieure. Sur le log `END`, ou sur le log `REPORT` pour les exécutions sur [Lambda Managed Instances][10]. |

Exemples de requêtes (ajoutez `@lambda.arn:"<FUNCTION_ARN>"` pour limiter le périmètre à une fonction) :

- Tous les logs pour une exécution durable :

    ```text
    @lambda.durable_function.execution_name:"<EXECUTION_NAME>"
    ```

- Le log `START` de chaque exécution, qui indique quand elle a commencé :

    ```text
    "START RequestId:" @lambda.durable_function.first_invocation:true
    ```

- Le dernier log de chaque exécution, qui indique quand elle s'est terminée :

    ```text
    "END RequestId:" OR "REPORT RequestId:"
    ```

    Lambda Managed Instances emit no `END` log, so query both.

### Événements de changement d'état {#status-change-events}

Les événements transmis par la pile CloudFormation arrivent sous forme de logs, mis en correspondance par :

```text
@detail-type:"Durable Execution Status Change"
```

Le pipeline d'intégration AWS Lambda mappe ces événements sur les attributs suivants :

| Attribut de log | Description |
|---|---|
| `@lambda.durable_function.execution_status` | L'un de `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT` ou `STOPPED`. |
| `@lambda.durable_function.execution_start_time` | Au moment où l'exécution a démarré, en millisecondes UNIX. |
| `@lambda.durable_function.execution_end_time` | Au moment où l'exécution a atteint un état terminal, en millisecondes UNIX. |

Traitez ces événements comme la source de vérité pour l'état terminal, car les logs `END` et `REPORT` ne peuvent pas signaler `TIMED_OUT` ou `STOPPED`.

Les événements terminaux sont horodatés lorsque l'exécution est terminée, donc une plage temporelle sélectionne les exécutions qui se sont terminées au cours de celle-ci.

### Traces {#traces}

Pour limiter une requête de span à une fonction, filtrez sur l'ARN de la fonction :

```text
@function_arn:"<FUNCTION_ARN>"
```

**Le span d'exécution durable**

Le tracer crée un span `aws.durable.execute` par invocation et assemble les invocations d'une exécution en une seule trace.

| Tag de span | Description |
|---|---|
| `@aws.durable.execution_arn` | L'ARN complet de l'exécution durable, qui contient le nom de l'exécution. Ce span ne porte pas le nom de l'exécution en tant que tag distinct. |
| `@aws.durable.invocation_status` | L'état de l'exécution à la fin de cette invocation : `succeeded`, `failed` ou `pending`. `pending` signifie que l'exécution a été suspendue et reprend lors d'une invocation ultérieure. |
| `@aws.durable.replayed` | `false` sur l'invocation qui démarre une exécution, `true` sur chaque invocation ultérieure qui la reprend après une suspension. |

**Le span d'invocation Lambda**

Chaque invocation produit également le span `aws.lambda` standard, tagué avec le contexte d'exécution durable :

| Tag de span | Description |
|---|---|
| `@aws.durable.execution_name` | Le nom de l'exécution. |
| `@aws.durable.execution_id` | L'ID d'exécution. |
| `@aws.durable.first_invocation` | `true` lors de la première invocation d'une exécution. |
| `@aws.durable.execution_status` | L'état de l'exécution lorsque l'invocation s'est terminée : `SUCCEEDED`, `FAILED` ou `PENDING`. |

**Spans d'opération**

Chaque opération appelée sur le contexte durable produit un span enfant :

| Nom de l'opération | Méthode Node.js | Méthode Python |
|---|---|---|
| `aws.durable.step` | `step` | `step` |
| `aws.durable.invoke` | `invoke` | `invoke` |
| `aws.durable.wait` | `wait` | `wait` |
| `aws.durable.wait_for_condition` | `waitForCondition` | `wait_for_condition` |
| `aws.durable.wait_for_callback` | `waitForCallback` | `wait_for_callback` |
| `aws.durable.create_callback` | `createCallback` | `create_callback` |
| `aws.durable.map` | `map` | `map` |
| `aws.durable.parallel` | `parallel` | `parallel` |
| `aws.durable.child_context` | `runInChildContext` | `run_in_child_context` |

| Tag de span | Description |
|---|---|
| `@aws.durable.operation_name` | Le nom de l'opération. |
| `@aws.durable.operation_id` | Un hash de l'ID d'étape de l'opération. |
| `@aws.durable.operation_attempt` | Le numéro de tentative, sur les opérations pouvant être réessayées `aws.durable.step` et `aws.durable.wait_for_condition`. `0` est la tentative initiale, `1` le premier réessai. |
| `@aws.durable.replayed` | `true` lorsque le résultat de l'opération a été fourni à partir d'un point de contrôle au lieu d'être exécuté, que ce résultat stocké soit un succès ou un échec. |
| `@aws.durable.invoke.function_name` | La fonction cible, sur `aws.durable.invoke` spans. |

### Métriques {#metrics}

AWS publie ces métriques d'exécution durable vers CloudWatch. Elles atteignent Datadog via l'[AWS Lambda integration][5] et sont taguées avec `functionname`.

| Métrique | Description | Agrégation |
|---|---|---|
| `aws.lambda.durable_execution_started` | Nombre d'exécutions durables démarrées. | `sum` en tant que nombre |
| `aws.lambda.durable_execution_succeeded` | Nombre d'exécutions durables terminées avec succès. | `sum` en tant que nombre |
| `aws.lambda.durable_execution_failed` | Nombre d'exécutions durables ayant échoué. | `sum` en tant que nombre |
| `aws.lambda.durable_execution_timed_out` | Nombre d'exécutions durables ayant dépassé leur délai d'expiration. | `sum` en tant que nombre |
| `aws.lambda.durable_execution_stopped` | Nombre d'exécutions durables arrêtées avec l'API `StopDurableExecution`. | `sum` en tant que nombre |
| `aws.lambda.durable_execution_duration` | Temps réel passé par une exécution durable dans l'état `RUNNING`, en millisecondes. | `avg` |
| `aws.lambda.durable_execution_operations` | Nombre cumulé d'opérations effectuées par les exécutions durables. | `sum` en tant que nombre |
| `aws.lambda.durable_execution_storage_written_bytes` | Quantité cumulée de données conservées par les exécutions durables, en octets. | `sum` |
| `aws.lambda.approximate_running_durable_executions` | Nombre d'exécutions durables dans l'état `RUNNING`. | `avg` |
| `aws.lambda.approximate_running_durable_executions_utilization` | Pourcentage du quota d'exécution durable utilisé. | `avg` |

Par exemple, pour représenter graphiquement les exécutions ayant échoué pour une fonction :

```text
sum:aws.lambda.durable_execution_failed{functionname:<FUNCTION_NAME>}.as_count()
```

## Limitations et retours {#limitations-and-feedback}

Les environnements d'exécution autres que Node.js et Python ne sont pas pris en charge. Si vous rencontrez un problème avec un autre environnement d'exécution, signalez un problème dans le [dépôt GitHub datadog-lambda-extension][7].

Si vous rencontrez un problème avec la pile CloudFormation, signalez un problème dans le [dépôt GitHub cloudformation-template][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/aws_lambda/instrumentation
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-durable-function-event-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/lambda-durable-function-event-forwarder/latest.yaml
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/getting_started/site/
[5]: /fr/integrations/amazon_lambda/
[6]: /fr/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/cloudformation-template/tree/master/aws_durable_function_event_forwarder
[9]: /fr/serverless/aws_lambda/logs/#enable-log-collection
[10]: /fr/serverless/aws_lambda/managed_instances/