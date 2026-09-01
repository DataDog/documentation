---
description: Apprenez à utiliser le processeur de quota pour mesurer le trafic de
  journalisation et conserver, supprimer ou acheminer les logs après avoir atteint
  votre quota quotidien.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur de quota
---
{{< product-availability >}}

## Présentation {#overview}

Le processeur de quota mesure le trafic de journalisation pour les logs qui correspondent au filtre que vous spécifiez. Il utilise une fenêtre fixe de 24 heures qui se réinitialise à minuit UTC. Lorsque le quota quotidien configuré est atteint dans la fenêtre, le processeur peut soit conserver ou supprimer les logs supplémentaires, soit les envoyer vers un compartiment de stockage. Par exemple, vous pouvez configurer ce processeur pour supprimer les nouveaux logs ou déclencher une alerte sans supprimer les logs après que le processeur a reçu 10 millions d'événements d'un certain service au cours des dernières 24 heures.

Vous pouvez également utiliser le partitionnement basé sur les champs, tel que `service`, `env`, `status`. Chaque champ unique utilise un compartiment de quota distinct avec sa propre limite de quota quotidien. Voir [Exemple de partition](#partition-example) pour plus d'informations.

**Remarque**: Le pipeline utilise le nom du quota pour identifier le même quota à travers plusieurs déploiements de Remote Configuration du Worker.

### Limites {#limits}

- Chaque pipeline peut comporter jusqu'à 1000 compartiments. Si vous devez augmenter la limite de compartiments, [contactez le support][5].
- Le processeur de quota est synchronisé entre tous les Workers d'une organisation Datadog. Pour la synchronisation, il existe une limite de débit par défaut de 100 Workers par organisation (300 pour les versions de Worker 2.16+). Lorsque le nombre de Workers pour une organisation dépasse cette limite :
    - Le processeur continue de s'exécuter, mais ne se synchronise pas correctement avec les autres Workers, ce qui peut entraîner l'envoi de logs après que la limite de quota a été atteinte.
    - Le Worker affiche des erreurs `Failed to sync quota state`.
    - [Contactez le support][5] si vous souhaitez augmenter le nombre par défaut de Workers par organisation.
- Le processeur de quota synchronise périodiquement les comptes entre les Workers quelques fois par minute. La limite définie sur le processeur peut donc être dépassée, en fonction du nombre de Workers et du débit des logs. Datadog recommande de définir une limite au moins un ordre de grandeur supérieur au volume de logs que le processeur est censé recevoir par minute. Vous pouvez utiliser un processeur de limitation avec le processeur de quota pour contrôler ces courtes rafales en limitant le nombre de logs autorisés par minute.

## Configuration {#setup}

Pour configurer le processeur de quota :
1. Saisissez un nom pour le processeur de quota.
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Seuls les logs qui correspondent à la requête de filtre spécifiée sont comptabilisés dans la limite quotidienne. Consultez la [Syntaxe de recherche][6] pour plus d'informations.
    - Les logs qui correspondent au filtre de quota et qui sont dans la limite du quota quotidien sont envoyés à l'étape suivante du pipeline.
    - Les logs qui ne correspondent pas au filtre de quota sont envoyés à l'étape suivante du pipeline.
1. Dans le menu déroulant {{< ui >}}Unit for quota{{< /ui >}}, sélectionnez si vous souhaitez mesurer le quota par le nombre de `Events` ou par le `Volume` en octets.
1. Définissez la limite de quota quotidienne et sélectionnez l'unité de grandeur pour le quota souhaité.
1. Optionnel: Cliquez sur {{< ui >}}Add Field{{< /ui >}} si vous souhaitez définir un quota sur un champ de service ou de région spécifique.
   1. Saisissez le nom du champ selon lequel vous souhaitez partitionner. Consultez l'exemple de [Partition](#partition-example) pour plus d'informations.
      1. Sélectionnez {{< ui >}}Ignore when missing{{< /ui >}} si vous souhaitez que le quota s'applique uniquement aux événements qui correspondent à la partition. Consultez l'exemple [Ignorer en cas d'absence](#example-for-the-ignore-when-missing-option) pour plus d'informations.
      1. Optionnel: Cliquez sur {{< ui >}}Overrides{{< /ui >}} si vous souhaitez définir des quotas différents pour le champ partitionné.
         - Cliquez sur {{< ui >}}Download as CSV{{< /ui >}} pour obtenir un exemple de la façon de structurer le CSV.
         - Faites glisser et déposez votre CSV de remplacements pour le télécharger. Vous pouvez également cliquer sur {{< ui >}}Browse{{< /ui >}} pour sélectionner le fichier à télécharger. Consultez l'exemple [Remplacements](#overrides-example) pour plus d'informations.
   1. Cliquez sur {{< ui >}}Add Field{{< /ui >}} si vous souhaitez ajouter une autre partition.
1. Dans le menu déroulant {{< ui >}}When quota is met{{< /ui >}}, sélectionnez si vous souhaitez {{< ui >}}drop events{{< /ui >}}, {{< ui >}}keep events{{< /ui >}} ou {{< ui >}}send events to overflow destination{{< /ui >}}, lorsque le quota a été atteint.
   1. Si vous sélectionnez {{< ui >}}send events to overflow destination{{< /ui >}}, une destination de débordement est ajoutée avec les options de stockage cloud suivantes: **Amazon S3**, **Azure Blob** et **Google Cloud**.
   1. Sélectionnez le stockage cloud vers lequel vous souhaitez envoyer les logs de débordement. Consultez les instructions de configuration pour votre stockage cloud: [Amazon S3][2], [Azure Blob Storage][3] ou [Google Cloud Storage][4].

### Exemples {#examples}

#### Exemple de partition {#partition-example}

Utilisez {{< ui >}}Partition by{{< /ui >}} si vous souhaitez définir un quota sur un service ou une région spécifique. Par exemple, si vous souhaitez définir un quota de 10 événements par jour et regrouper les événements par le champ `service`, saisissez `service` dans le champ {{< ui >}}Partition by{{< /ui >}}.

#### Exemple pour l'option « ignorer si manquant » {#example-for-the-ignore-when-missing-option}

Sélectionnez {{< ui >}}Ignore when missing{{< /ui >}} si vous souhaitez que le quota ne s'applique qu'aux événements qui correspondent à la partition. Par exemple, si le Worker reçoit l'ensemble d'événements suivants :

```
{"service":"a", "source":"foo", "message": "..."}
{"service":"b", "source":"bar", "message": "..."}
{"service":"b", "message": "..."}
{"source":"redis", "message": "..."}
{"message": "..."}
```

Et que {{< ui >}}Ignore when missing{{< /ui >}} est sélectionné, alors le Worker :
- crée un ensemble pour les logs avec `service:a` et `source:foo`
- crée un ensemble pour les logs avec `service:b` et `source:bar`
- ignore les trois derniers événements

Le quota est appliqué aux deux ensembles de logs et non aux trois derniers événements.

Si {{< ui >}}Ignore when missing{{< /ui >}} n'est pas sélectionné, le quota est appliqué aux cinq événements.

#### Exemple de remplacements {#overrides-example}

Si vous effectuez un partitionnement par `service` et que vous avez deux services: `a` et `b`, vous pouvez utiliser des remplacements pour leur appliquer des quotas différents. Par exemple, si vous souhaitez que `service:a` ait une limite de quota de 5 000 octets et que `service:b` ait une limite de 50 événements, les règles de remplacement ressemblent à ceci :

| Service | Type   | Limite |
| ------- | ------ | ----- |
|  `a`    | Octets  | 5 000 |
|  `b`    | Événements | 50    |

## Métriques de santé {#health-metrics}

Pour les [métriques de composants][7] et les [métriques de tampon de processeur][8] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][9].

### Métriques de quota {#quota-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `quota` pour ces métriques.

`pipelines.quota_reached_events_total`
: **Description**: Le nombre d'événements abandonnés car ils ont été reçus après que la limite de quota configurée a été atteinte.
: **Type de métrique**: count

`pipelines.quota_reached_event_bytes_total`
: **Description**: La taille, en octets, des événements abandonnés car ils ont été reçus après que la limite de quota configurée a été atteinte.
: **Type de métrique**: count

`pipelines.quota_overflow_destination_sent_events_total`
: **Description**: Le nombre d'événements acheminés vers une destination de débordement secondaire lorsqu'une limite de quota a été atteinte.
: **Type de métrique** : count

`pipelines.quota_fill`
: **Description** : Le niveau de remplissage actuel d'un compartiment de quota de limitation de débit, la valeur varie de `0` à `100`.
: **Type de métrique** : jauge

`pipelines.quotas_usage`
: **Description** : Niveau de remplissage global pour tous les compartiments de quota, la valeur varie de `0` à `100`.
: **Type de métrique** : jauge

`pipelines.quota_limit_events`
: **Description** : Le débit d'événements maximal configuré par intervalle pour une règle de quota.
: **Type de métrique** : jauge

`pipelines.quota_limit_bytes`
: **Description** : Le débit d'octets maximal configuré par intervalle pour une règle de quota.
: **Type de métrique** : jauge

`pipelines.quotas_count`
: **Description** : Le nombre de compartiments de quota de limitation de débit actifs actuellement suivis.
: **Type de métrique** : jauge

[1]: /fr/monitors/types/metric/?tab=threshold
[2]: /fr/observability_pipelines/destinations/datadog_archives/
[3]: /fr/observability_pipelines/destinations/azure_storage/
[4]: /fr/observability_pipelines/destinations/google_cloud_storage/
[5]: /fr/help/
[6]: /fr/observability_pipelines/search_syntax/logs/
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[9]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/