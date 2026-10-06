---
description: Surveillez les jobs provenant d'outils internes, de pipelines personnalisés
  et d'orchestrateurs qui ne disposent pas d'intégrations Datadog natives.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
  tag: Documentation
  text: Configurez le Datadog Agent pour le proxy OpenLineage
title: Jobs personnalisés utilisant OpenLineage
---
<div class="alert alert-info"> Les jobs personnalisés utilisant OpenLineage sont en version préliminaire.</div>

## Présentation {#overview}

Les jobs personnalisés utilisent la norme [OpenLineage][1] pour envoyer des événements de job et de traçabilité à Datadog. Avec les jobs personnalisés, vous pouvez :

- Détecter les jobs en échec et ceux qui s'exécutent longuement
- Identifier et résoudre la cause profonde des jobs en échec et de ceux qui s'exécutent longuement
- Comprendre les dépendances en amont et les consommateurs de données en aval grâce à la traçabilité des données

Utilisez les jobs personnalisés lorsque vous devez :

- Capturer la traçabilité à partir de systèmes avec lesquels Datadog ne s'intègre pas nativement, tels que des outils internes ou des scripts ETL personnalisés
- Émettre des événements de traçabilité pour des jobs ou des orchestrateurs pour lesquels une intégration Datadog native n'est pas disponible

**Remarque** : Pour centraliser la configuration et éviter de distribuer des clés d'API à chaque application, vous pouvez [configurer le Datadog Agent en tant que proxy OpenLineage][4].

## Prérequis {#prerequisites}

- Une clé d'API Datadog. Consultez [Clés d'API et d'application][6].
- Votre [URL de site][3] Datadog. Les exemples sur cette page utilisent `datadoghq.com` ; remplacez le nom de host par l'endpoint d'ingestion de votre site.

## Étape 1 : Envoyer un événement `START` {#step-1-send-a-start-event}

Utilisez l'une des options suivantes pour envoyer des [événements OpenLineage][1] à Datadog :

**Remarque** : Datadog nécessite la `jobType` [facette de job][5] pour traiter les événements d'exécution.

Pour voir également les arêtes de traçabilité entre votre job et ses jeux de données, incluez `inputs` et `outputs` dans votre événement. Les espaces de noms des jeux de données doivent correspondre au format attendu par Datadog pour chaque plateforme. Voir [Conventions de nommage des jeux de données](#dataset-naming-conventions).

{{< tabs >}}
{{% tab "HTTP direct avec curl" %}}

Envoyez un [OpenLineage RunEvent](https://openlineage.io/docs/spec/run-cycle/) brut au format JSON vers l'endpoint d'ingestion de Datadog.

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:00:00Z",
        "eventType": "START",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "inputs": [
          {
            "namespace": "postgres://demo-db.example.com:5432",
            "name": "orders.public.orders"
          }
        ],
        "outputs": [
          {
            "namespace": "snowflake://myorg-myaccount",
            "name": "ANALYTICS.PUBLIC.ORDERS"
          }
        ],
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "Client Python OpenLineage (transport HTTP)" %}}

Utilisez le [client Python OpenLineage](https://openlineage.io/docs/client/python) avec un transport HTTP spécifié manuellement.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient, OpenLineageClientOptions
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job

client = OpenLineageClient(
    url="https://data-obs-intake.datadoghq.com",
    options=OpenLineageClientOptions(api_key="<DD_API_KEY>")
)

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

{{% /tab %}}

{{% tab "Client Python OpenLineage (transport Datadog)" %}}

Dans OpenLineage 1.37.0+, utilisez le [transport Datadog](https://openlineage.io/docs/client/python#datadog-transport) pour une configuration automatique et une livraison optimisée des événements.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job
from openlineage.client.transport.datadog import DatadogConfig, DatadogTransport

config = DatadogConfig(
    apiKey="<DD_API_KEY>",
    site="datadoghq.com"  # Change if using a different Datadog site
)

client = OpenLineageClient(transport=DatadogTransport(config))

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

Vous pouvez également configurer le transport Datadog avec des variables d'environnement au lieu de `DatadogConfig` :

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_SITE=datadoghq.com
export OPENLINEAGE__TRANSPORT__TYPE=datadog
```

```python
client = OpenLineageClient.from_environment()
```

{{% /tab %}}
{{< /tabs >}}

## Étape 2 : Envoyer un événement `RUNNING` (facultatif) {#step-2-send-a-running-event-optional}

**Remarque** : Cette étape est facultative. `RUNNING`Les événements vous permettent de voir le statut d'un job avant qu'il ne se termine. Si vous avez seulement besoin de capturer le statut d'achèvement du job, passez à l'[Étape 3](#step-3-send-a-complete-or-fail-event).

Pendant que le job est en cours, envoyez un événement `RUNNING` pour le suivre dans le Jobs Monitoring de Datadog. Utilisez le même `runId` que celui de l'événement `START`.

{{< tabs >}}
{{% tab "HTTP direct avec curl" %}}

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:02:00Z",
        "eventType": "RUNNING",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "Client Python OpenLineage (transport HTTP)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}

{{% tab "Client Python OpenLineage (transport Datadog)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}
{{< /tabs >}}

## Étape 3 : Envoyer un événement `COMPLETE` ou `FAIL` {#step-3-send-a-complete-or-fail-event}

Lorsque le job se termine, envoyez un événement `COMPLETE` ou `FAIL` en utilisant le même `runId` que celui de l'événement `START`.

{{< tabs >}}
{{% tab "HTTP direct avec curl" %}}

**Succès**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "COMPLETE",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

**Échec**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "FAIL",
        "run": {
          "runId": "<RUN_UUID>",
          "facets": {
            "errorMessage": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/ErrorMessageRunFacet.json",
              "message": "Job failed: division by zero",
              "programmingLanguage": "Python",
              "stackTrace": "Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            }
          }
        },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "Client Python OpenLineage (transport HTTP)" %}}

**Succès**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**Échec**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}

{{% tab "Client Python OpenLineage (transport Datadog)" %}}

**Succès**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**Échec**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job, error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}
{{< /tabs >}}

## Étape 4 : Vérifiez dans Datadog {#step-4-verify-in-datadog}

Après avoir envoyé vos événements, utilisez les pages suivantes pour vérifier que Datadog les a bien reçus et traités :

- [**Jobs Overview**][7] : Confirmez que l'exécution de votre job apparaît avec son heure de début, sa durée et son statut.
- [**Lineage**][9] : Recherchez le nom de votre job pour voir le job et ses connexions à tous les jeux de données inclus dans l'événement.
- [**OpenLineage events**][12] : Vérifiez le statut de validation de vos événements : `Ok`, `Warning` ou `Error`. Sélectionnez un événement pour voir la charge utile exacte reçue par Datadog, ou filtrez par statut de validation pour dépanner les événements qui n'ont pas été traités avec succès. Commencez ici si les résultats n'apparaissent pas comme prévu dans les deux autres vues.

## Corrélez les logs avec les exécutions de jobs {#correlate-logs-with-job-runs}

Pour corréler vos logs d'application avec une exécution de job dans Datadog, émettez vos logs avec l'ID d'exécution OpenLineage dans l'attribut `@openlineage.run_id`. Définissez sa valeur sur le même `runId` que celui que vous envoyez dans vos événements d'exécution OpenLineage. Datadog utilise cet attribut pour associer les logs à l'exécution de job correspondante.

La manière dont vous joignez l'ID d'exécution dépend de votre configuration de logs. Pour plus de détails sur l'envoi de logs avec des attributs personnalisés à Datadog, consultez [Collecte de logs et intégrations][10].

## Conventions de nommage des jeux de données {#dataset-naming-conventions}

Pour connecter la traçabilité de votre job personnalisé aux jeux de données déjà suivis par les intégrations natives de Datadog, incluez `inputs` et `outputs` dans votre événement en utilisant les `namespace` et `name` exacts attendus par Datadog pour cette plateforme. Par exemple, référencer une table Snowflake dans le `outputs` de votre job personnalisé avec l'espace de noms et le nom corrects la lie au nœud de jeu de données existant dans le graphe de traçabilité.

Datadog résout les jeux de données en une hiérarchie de compte, base de données, schéma et tableau. Si un nom comporte moins de parties que prévu (par exemple, `database.table` au lieu de `database.schema.table`), Datadog revient au nœud de niveau supérieur le plus proche dans le graphe de traçabilité.

| Plateforme   | Espace de noms                                        | Nom                          |
| ---------- | ------------------------------------------------ | ----------------------------- |
| BigQuery   | `bigquery`                                       | `{project}.{dataset}.{table}` |
| Snowflake | `snowflake://{org}-{account}`                    | `{database}.{schema}.{table}` |
| Redshift | `redshift://{aws_account_id}:{region}:{cluster}` | `{database}.{schema}.{table}` |
| PostgreSQL | `postgres://{host}:{port}`                       | `{database}.{schema}.{table}` |
| Databricks | `databricks://{workspace-url}`                   | `{database}.{schema}.{table}` |
| Trino | `trino://{host}:{port}`                          | `{catalog}.{schema}.{table}`  |
| AWS Glue | `arn:aws:glue:{region}:{accountId}`              | `{database}.{table}`          |
| S3 | `s3://{bucket}`                                  | `{path}`                      |

Pour les plateformes non listées ici, suivez les [conventions de nommage OpenLineage][8].

L'exemple suivant montre un job lisant depuis une table PostgreSQL et écrivant vers une table Snowflake :

```json
"inputs": [
  {
    "namespace": "postgres://db.example.com:5432",
    "name": "mydb.public.raw_orders"
  }
],
"outputs": [
  {
    "namespace": "snowflake://myorg-myaccount",
    "name": "ANALYTICS.PUBLIC.ORDERS"
  }
]
```

**Remarque** : Si un espace de noms de jeux de données n'est pas reconnu, Datadog crée tout de même un nœud de traçabilité pour celui-ci, mais ne l'affiche pas dans le produit Data Observability. Utilisez un format d'espace de noms reconnu pour que les jeux de données apparaissent dans le catalogue et le graphe de traçabilité.

## Facettes prises en charge {#supported-facets}

Les facettes sont des métadonnées structurées jointes aux événements OpenLineage. Chaque facette nécessite `_producer` (un URI identifiant le système qui l'a produite) et `_schemaURL` (un URI référençant son schéma JSON).

### `JobTypeJobFacet` {#jobtypejobfacet}

La facette de job `jobType` est **requise**. Elle détermine la manière dont Datadog classifie et affiche le job.

#### `integration` valeurs {#integration-values}

Pour les jobs exécutés sur une technologie non encore prise en charge par une intégration native, utilisez n'importe quelle valeur qui n'est pas réservée à une intégration native (par exemple, `my-pipeline`). Cette valeur est utilisée dans tout Datadog pour indiquer le type de job. Les valeurs réservées ci-dessous sont utilisées par les intégrations natives de Datadog. L'utilisation d'une valeur réservée pour un job personnalisé peut entraîner un comportement inattendu et n'est pas prise en charge.

| Valeur          | Plateforme                                                            |
| -------------- | -------------------------------------------------------------------- |
| `<YOUR_VALUE>` | Plateformes personnalisées ou non prises en charge                                     |
| `SPARK`        | Apache Spark (intégration native uniquement ; ne pas utiliser pour des jobs personnalisés) |
| `AIRFLOW`      | Apache Airflow                                                      |
| `DBT`          | dbt                                                                 |
| `BIGQUERY`     | Google BigQuery                                                     |
| `SNOWFLAKE`    | Snowflake                                                           |
| `TRINO`        | Trino                                                                |
| `ICEBERG`      | Apache Iceberg                                                      |
| `TABLEAU`      | Tableau                                                             |

#### `processingType` valeurs {#processingtype-values}

`BATCH` ou `STREAMING`.

#### `jobType` valeurs {#jobtype-values}

Les valeurs courantes incluent `JOB`, `TASK`, `DAG`, `MODEL`, `COMMAND` et `QUERY`.

**Remarque** : Si `jobType` est défini sur `QUERY`, Datadog ne génère pas de nœuds de lignage pour le job.

### Autres facettes prises en charge {#other-supported-facets}

| Facette          | Ce que fait Datadog                                                                  |
| -------------- | ---------------------------------------------------------------------------------- |
| `parent`       | Crée une hiérarchie de job parent-enfant dans le graphe de lignage |
| `errorMessage` | Génère des étendues d'erreur avec les tags `error.message` et `error.stack`                  |
| `tags`         | Ajoute des tags personnalisés au job ou à l'exécution ; `_dd.ol_service` la valeur correspond au nom du service Datadog |
| `sql`          | Analyse et masque la requête SQL ; génère des événements de requête |

**Remarque** : Chaque tag dans la [`tags` facette][2] doit inclure un `key`, un `value` et un `source`.

Pour rendre les tags OpenLineage personnalisés disponibles dans les monitors de jobs de données, définissez `source` exactement sur `USER`. Les tags avec un `source` manquant ou différent ne sont pas disponibles dans les monitors de jobs de données en tant que tags personnalisés.

Les tags sur `job.facets.tags` et `run.facets.tags` se comportent différemment :

- **Tags de facette de job** : Ajoutés en tant que tags aux traces de job sous-jacentes, vous permettant de les filtrer sur la page de vue d'ensemble des jobs et dans [Trace Explorer][11]. Lorsque `source` est `USER`, ils sont également disponibles dans les monitors de jobs de données. Utilisez les tags de facette de job pour les propriétés de job stables, telles que `team` ou `owner`.
- **Tags de facette d'exécution** : Disponibles dans les monitors de jobs de données lorsque `source` est `USER`. Ils ne sont pas ajoutés en tant que tags individuels pour la recherche et le filtrage sur la page d'aperçu des jobs ou dans [Trace Explorer][11]. Utilisez les tags de facette d'exécution pour les valeurs qui peuvent varier entre les exécutions.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/docs/spec/run-cycle/
[2]: https://openlineage.io/spec/facets/1-0-0/TagsRunFacet.json
[3]: /fr/getting_started/site/#access-the-datadog-site
[4]: /fr/data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[5]: https://openlineage.io/docs/spec/facets/job-facets/job-type/
[6]: /fr/account_management/api-app-keys/
[7]: https://app.datadoghq.com/data-jobs
[8]: https://openlineage.io/docs/spec/naming/
[9]: https://app.datadoghq.com/data-obs/lineage
[10]: /fr/logs/log_collection/
[11]: /fr/tracing/trace_explorer/?tab=listview
[12]: https://app.datadoghq.com/data-obs/settings/open-lineage