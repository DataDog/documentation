---
aliases:
- /fr/continuous_integration/setup_pipelines/custom
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/guides/pipeline_data_model
  tag: Documentation
  text: Découvrez le Modèle de données de pipeline et les types d'exécution
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Envoyez des pipelines personnalisés à Datadog
---
## Présentation {#overview}

Si votre fournisseur CI n'est pas pris en charge, vous pouvez envoyer des pipelines personnalisés via HTTP en utilisant l'[endpoint de l'API publique][1]. Pour plus d'informations sur la façon dont les exécutions de pipeline sont modélisées, consultez [Modèle de données de pipeline et types d'exécution][2].

### Compatibilité {#compatibility}

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Analyse des logs][21] | Analyse des logs | Utilise des modèles LLM sur les logs pertinents pour analyser la cause première des jobs CI ayant échoué. |
| Corrélation des logs | Corrélation des logs | Corrélez les spans de pipeline et de job aux logs. Nécessite [Logs Storage](#logs-storage). |
| [Pipelines en cours d'exécution][15] | Pipelines en cours d'exécution | Affichez les exécutions de pipeline en cours. |
| [Tags personnalisés][5] [et mesures personnalisées au moment de l'exécution][6] | Tags personnalisés et mesures personnalisées au moment de l'exécution | Configurez des [tags et mesures personnalisés][7] au moment de l'exécution. |
| [Étapes manuelles][8] | Étapes manuelles | Affichez les pipelines déclenchés manuellement. |
| [Paramètres][9] | Paramètres | Définissez des paramètres personnalisés lorsqu'un pipeline est déclenché. |
| [Relances partielles][10] | Pipelines partiels | Affichez les exécutions de pipeline ayant fait l'objet d'une relance partielle. |
| [Motifs d'échec de pipeline][11] | Motifs d'échec de pipeline | Identifiez les motifs d'échec de pipeline à partir des messages d'erreur. |
| [Temps de file d'attente][12] | Temps de file d'attente | Affichez la durée pendant laquelle les jobs de pipeline restent dans la file d'attente avant d'être traités. |
| [Filtrer les jobs CI sur le chemin critique][16] | Filtrer les jobs CI sur le chemin critique | Filtrez par jobs sur le chemin critique. |
| [Temps d'exécution][17] | Temps d'exécution  | Affichez la durée pendant laquelle les pipelines ont exécuté des jobs. |


## Configurer CI Visibility {#configure-ci-visibility}

Pour envoyer des événements de pipeline par programmation à Datadog, assurez-vous que votre [`DD_API_KEY`][14] est configuré.

1. Définissez les en-têtes de votre requête HTTP :

   - `DD-API-KEY` : Votre [clé d'API Datadog][14].
   - `Content-Type` : `application/json`.

2. Préparez le corps de la charge utile en saisissant des informations sur l'[exécution du pipeline][2] dans une commande cURL :

   | Nom du paramètre | Description | Valeur d'exemple |
   |---|---|---|
   | ID unique | L'UUID de l'exécution du pipeline. L'ID doit être unique entre les tentatives et les pipelines, y compris les tentatives partielles. | `b3262537-a573-44eb-b777-4c0f37912b05` |
   | Nom | Le nom du pipeline. Toutes les exécutions de pipeline pour les builds doivent avoir le même nom. | `Documentation Build` |
   | Dépôt Git | L'URL du dépôt Git qui a déclenché le pipeline. | `https://github.com/Datadog/documentation` |
   | Auteur du commit | L'adresse e-mail de l'auteur du commit qui a déclenché le pipeline. | `contributor@github.com` |
   | SHA de commit | Le hash du commit qui a déclenché le pipeline. | `cf852e17dea14008ac83036430843a1c` |
   | Statut | Le statut final du pipeline. Valeurs d'énumération autorisées : `success`, `error`, `canceled`, `skipped`, `blocked` ou `running`. | `success` |
   | Relance partielle | Indique si le pipeline était une relance partielle d'une tentative précédente. Ce champ attend une valeur booléenne (`true` ou `false`). Une relance partielle est celle qui n'exécute qu'un sous-ensemble des jobs d'origine. | `false` |
   | Début | Heure à laquelle l'exécution du pipeline a commencé (elle ne doit inclure aucun [temps de file d'attente][12]). Le format de l'heure doit être RFC3339. | `2024-08-22T11:36:29-07:00` |
   | Fin | Heure à laquelle l'exécution du pipeline s'est terminée. Le format de l'heure doit être RFC3339. L'heure de fin ne peut pas être supérieure à 1 an après l'heure de début. | `2024-08-22T14:36:00-07:00` |
   | URL | L'URL pour consulter le pipeline dans l'interface utilisateur du fournisseur CI. | `http://your-ci-provider.com/pipeline/{pipeline-id}` |

   Par exemple, cette charge utile envoie un événement de pipeline CI à Datadog :

   {{< code-block lang="bash" >}}
   curl -X POST "https://api.datadoghq.com/api/v2/ci/pipeline" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <YOUR_API_KEY>" \
   -d @- << EOF
   {
     "data": {
       "attributes": {
         "provider_name": "<YOUR_CI_PROVIDER>",
         "resource": {
           "level": "pipeline",
           "unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
           "name": "Documentation Build",
           "git": {
             "repository_url": "https://github.com/Datadog/documentation",
             "author_email": "contributor@github.com",
             "sha": "cf852e17dea14008ac83036430843a1c"
           },
           "status": "success",
           "start": "2024-08-22T11:36:29-07:00",
           "end": "2024-08-22T14:36:00-07:00",
           "partial_retry": false,
           "url": ""
         }
       },
       "type": "cipipeline_resource_request"
     }
   }
   EOF
   {{< /code-block >}}

3. Après avoir envoyé votre événement de pipeline à Datadog, vous pouvez intégrer des types d'événements supplémentaires tels que `stage`, `job` et `step`. Pour plus d'informations, consultez l'[endpoint Send Pipeline Event][1].

## Pipelines en cours {#running-pipelines}

Les événements de pipeline envoyés avec `status` défini sur `running` ont le même `unique_id` que l'événement de pipeline final. Les pipelines en cours peuvent être mis à jour en ajoutant plus d'informations pendant qu'ils sont en cours d'exécution. Un pipeline en cours se compose des événements suivants :

1. L'événement initial de pipeline en cours avec `status` défini sur `running`.
2. Optionnellement, `N` événements de pipeline en cours qui mettent à jour le pipeline avec des informations supplémentaires, en conservant le même `unique_id` et avec `status` défini sur `running`.
3. L'événement de pipeline final **sans** statut `running` et le même `unique_id`.

**Remarque** : La valeur la plus récente peut ne pas toujours être celle affichée dans l'interface utilisateur lorsqu'un champ est mis à jour. Par exemple, si le tag `my_tag` est défini sur `value1` dans le premier pipeline en cours, puis est mis à jour sur `value2`, vous pourriez voir `value1` au lieu de `value2` dans l'interface utilisateur. Il est recommandé de ne mettre à jour les pipelines en cours qu'en ajoutant des champs supplémentaires plutôt qu'en modifiant ceux existants.

## Jobs en cours {#running-jobs}

Les événements de job peuvent également être envoyés pendant qu'un job est toujours en cours d'exécution en définissant `status` sur `running`. Comme pour les pipelines en cours d'exécution, tous les événements pour le même job partagent les mêmes `id` et `pipeline_unique_id`. Un job en cours d'exécution se compose des événements suivants :

1. L'événement initial de job en cours d'exécution avec `status` défini sur `running`.
2. L'événement final de job avec un statut terminal (tel que `success` ou `error`) et les mêmes `id` et `pipeline_unique_id`.

Un événement de job en cours d'exécution ne nécessite pas de temps `end`. Le temps `end` est défini lorsque l'événement final de job est envoyé.

## Gérer les logs de job {#manage-job-logs}

### Analyse des logs {#logs-analysis}

L'analyse des logs utilise des modèles LLM pour classer les échecs de job par cause première en fonction des logs pertinents provenant de votre fournisseur CI.
Pour une explication complète, consultez le [guide d'analyse des logs][21].

L'analyse des logs est activée par défaut dans Datadog, mais nécessite que le transfert des logs de job soit configuré, comme décrit ci-dessous. Dans
[Paramètres du référentiel d'optimisation CI/CD][22], vous pouvez activer ou désactiver l'analyse des logs pour votre organisation ou
des référentiels individuels.

Envoyez des lignes de log pour un job CI personnalisé vers l'[API d'ingestion des logs de job CI][19]. Utilisez des identifiants qui correspondent au pipeline et
aux événements de job que vous envoyez via l'[API CI Visibility Pipelines][1]. Chaque objet de log comporte trois champs obligatoires :

- `message` : Le texte non vide de la ligne de log.
- `pipeline_unique_id` : Doit correspondre au `resource.unique_id` de l'événement de pipeline et à celui de l'événement de job.
  `resource.pipeline_unique_id`.
- `job_id` : Doit correspondre au `resource.id` de l'événement de job.

Tous les autres champs de log sont optionnels. S'il est fourni, `provider_name` doit correspondre au `provider_name` de l'événement de pipeline.
Datadog utilise `custom` lorsque le champ est omis à la fois de l'événement de pipeline et des lignes de log.

Envoyez les lignes de log par lots pendant l'exécution du job, ou envoyez les lots lorsqu'il se termine. Datadog recommande d'envoyer
tous les lots avant de soumettre l'événement de job terminé. Après avoir soumis cet événement, Datadog ferme le log du job après
20 secondes sans nouvelle ligne. Les lignes reçues après la fermeture peuvent ne pas apparaître dans l'onglet Logs du job.

La requête suivante envoie une ligne de log pour un job. Cet exemple utilise le site US1 ; remplacez `datadoghq.com` par votre
site Datadog si nécessaire.

{{< code-block lang="bash" >}}
curl -X POST "https://http-intake.logs.datadoghq.com/api/v2/cilogs" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-d @- << EOF
{
  "message": "Running go test ./...",
  "pipeline_unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
  "job_id": "job-456",
  "provider_name": "<YOUR_CI_PROVIDER>"
}
EOF
{{< /code-block >}}

Une requête peut contenir un objet log ou un tableau allant jusqu'à 1 000 objets log, avec un corps non compressé allant jusqu'à 5,1 MiB.
Pour la compression, les conseils de nouvelle tentative, les attributs optionnels et les limites par job, consultez la [référence de l'API Send CI job logs][19].

### Logs Storage {#logs-storage}

Après avoir configuré la livraison des logs de job comme décrit dans [Analyse des logs](#logs-analysis), accédez aux
[Paramètres du dépôt d'optimisation CI/CD][22] et activez le stockage des logs pour votre organisation ou vos dépôts individuels.
Les logs stockés apparaissent dans l'onglet {{< ui >}}Logs{{< /ui >}} du job.

Logs Storage est facturé séparément de CI Visibility. Configurez la rétention des logs, les filtres d'exclusion et les index dans
[Log Management][20].

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Les pages [**CI Pipeline List**][3] et [**Executions**][4] sont remplies de données une fois que les pipelines sont acceptés pour traitement.

La page **CI Pipeline List** affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Rechercher et gérer les pipelines CI][13].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /fr/continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /fr/glossary/#custom-tag
[6]: /fr/glossary/#custom-measure
[7]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /fr/glossary/#manual-step
[9]: /fr/glossary/#parameter
[10]: /fr/glossary/#partial-retry
[11]: /fr/glossary/#pipeline-failure
[12]: /fr/glossary/#queue-time
[13]: /fr/continuous_integration/search/#search-for-pipelines
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: /fr/glossary/#running-pipeline
[16]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[17]: /fr/glossary/#pipeline-execution-time
[19]: /fr/api/latest/ci-visibility-logs/send-ci-job-logs/
[20]: /fr/logs/
[21]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: https://app.datadoghq.com/ci/settings/ci-cd/repositories