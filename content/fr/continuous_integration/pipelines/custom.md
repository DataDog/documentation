---
aliases:
- /fr/continuous_integration/setup_pipelines/custom
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/guides/pipeline_data_model
  tag: Documentation
  text: En savoir plus sur le modèle de données de pipeline et les types d'exécution
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Envoyer des pipelines personnalisés à Datadog
---

## Section Overview

Si votre fournisseur CI n'est pas pris en charge, vous pouvez envoyer des pipelines personnalisés via HTTP en utilisant l'[endpoint d'API publique][1]. Pour en savoir plus sur la façon dont les exécutions de pipeline sont modélisées, consultez la section [Modèle de données de pipeline et types d'exécution][2].

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Pipelines en cours d'exécution][15] | Pipelines en cours d'exécution | Consulter les exécutions de pipeline en cours d'exécution. |
| [Tags personnalisés][5] [et mesures au runtime][6] | Tags personnalisés et mesures au runtime | Configurer les [tags personnalisés et les mesures][7] au runtime. |
| [Étapes manuelles][8] | Étapes manuelles | Consultez les pipelines déclenchés manuellement. |
| [Paramètres][9] | Paramètres | Définir des paramètres personnalisés lorsqu'un pipeline est déclenché. |
| [Nouvelles tentatives partielles][10] | Pipelines partiels | Consultez les exécutions de pipelines faisant lʼobjet de nouvelles tentatives. |
| [Raisons d'échec du pipeline][11] | Raisons de la défaillance d'un pipeline | Identifiez les raisons de la défaillance dʼun pipeline en vous basant sur les messages d'erreur. |
| [Durée de mise en file d'attente][12] | Temps de mise en file d'attente | Afficher le temps pendant lequel les tâches de pipeline restent dans la file d'attente avant le traitement. |
| [Filtrer les tâches CI sur le chemin critique][16] | Filtrer les tâches CI sur le chemin critique | Filtrer par tâches sur le chemin critique. |
| [Temps d'exécution][19] | Durée d'exécution  | Afficher le temps pendant lequel les pipelines ont exécuté des tâches. |


## Configurer CI Visibility

Pour envoyer des événements de pipeline par programmation à Datadog, assurez-vous que votre [`DD_API_KEY`][14] est configurée.

1. Définissez les en-têtes de votre requête HTTP :

   - `DD-API-KEY` : votre [clé d'API Datadog][14].
   - `Content-Type`: `application/json`.

2. Préparer le corps de la charge utile en entrant des informations sur l'[exécution du pipeline][2] dans une commande cURL :

   | Nom du paramètre | Description | Exemple de valeur |
   |---|---|---|
   | Unique ID | L'UUID de l'exécution du pipeline. L'ID doit être unique entre les nouvelles tentatives et les pipelines, y compris les nouvelles tentatives partielles. | `b3262537-a573-44eb-b777-4c0f37912b05` |
   | Name | Le nom du pipeline. Toutes les exécutions de pipeline pour les builds doivent avoir le même nom. | `Documentation Build` |
   | Git Repository | L'URL du référentiel Git qui a déclenché le pipeline. | `https://github.com/Datadog/documentation` | 
   | Commit Author | L'e-mail de l'auteur du commit qui a déclenché le pipeline. | `contributor@github.com` |
   | Commit SHA | Le hash du commit qui a déclenché le pipeline. | `cf852e17dea14008ac83036430843a1c` |
   | Status | Le statut final du pipeline. Valeurs d'énumération autorisées : `success`, `error`, `canceled`, `skipped`, `blocked` ou `running`. | `success` |
   | Partial Retry | Indique si le pipeline était ou non une nouvelle tentative partielle d'une tentative précédente. Ce champ attend une valeur booléenne (`true` ou `false`). Une nouvelle tentative partielle est une tentative qui n'exécute qu'un sous-ensemble des tâches d'origine. | `false` |
   | Start | Heure à laquelle l'exécution du pipeline a commencé (elle ne doit inclure aucune [durée de file d'attente][12]). Le format d'heure doit être RFC3339. | `2024-08-22T11:36:29-07:00` |
   | End | Heure à laquelle l'exécution du pipeline s'est terminée. Le format d'heure doit être RFC3339. L'heure de fin ne peut pas être supérieure à 1 an après l'heure de début. | `2024-08-22T14:36:00-07:00` |
   | URL | L'URL pour consulter le pipeline dans l'interface du fournisseur CI. | `http://your-ci-provider.com/pipeline/{pipeline-id}` |

   Par exemple, cette charge utile envoie un événement de pipeline CI à Datadog :

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

3. Après avoir envoyé votre événement de pipeline à Datadog, vous pouvez intégrer des types d'événements supplémentaires tels que `stage`, `job` et `step`. Pour en savoir plus, consultez la section [Endpoint Send Pipeline Event][1].

## Pipelines en cours d'exécution
Les événements de pipeline envoyés avec le `status` défini sur `running` ont le même `unique_id` que l'événement de pipeline final. Les pipelines en cours d'exécution peuvent être mis à jour en ajoutant plus d'informations pendant qu'ils sont toujours en cours d'exécution. Un pipeline en cours d'exécution se compose des événements suivants :

1. L'événement de pipeline en cours d'exécution initial avec le `status` défini sur `running`.
2. Éventuellement, `N` événements de pipeline en cours d'exécution qui mettent à jour le pipeline avec plus d'informations, avec le même `unique_id` et le `status` défini sur `running`.
3. L'événement de pipeline final **sans** statut `running` et avec le même `unique_id`.

**Remarque** : la valeur la plus récente n'est pas toujours celle affichée dans l'interface lorsqu'un champ est mis à jour. Par exemple, si le tag `my_tag` est défini sur `value1` dans le premier pipeline en cours d'exécution, puis est mis à jour sur `value2`, vous pouvez voir `value1` au lieu de `value2` dans l'interface. Il est recommandé de mettre à jour uniquement les pipelines en cours d'exécution en ajoutant plus de champs au lieu de modifier ceux existants.

## Visualiser les données de pipeline dans Datadog

Les pages [**CI Pipeline List**][3] et [**Executions**][4] se remplissent de données une fois que les pipelines sont acceptés pour traitement.

La page **CI Pipeline List** affiche les données uniquement pour la branche par défaut de chaque référentiel. Pour en savoir plus, consultez la section [Rechercher et gérer les pipelines CI][13].

## Pour aller plus loin

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