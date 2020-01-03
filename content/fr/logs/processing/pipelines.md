---
title: Pipelines
kind: documentation
description: Analyser vos logs à l'aide du processeur Grok
further_reading:
  - link: logs/processing/processors
    tag: Documentation
    text: Consultez la liste complète des processeurs disponibles.
  - link: logs/logging_without_limits
    tag: Documentation
    text: Collecte illimitée de logs
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: 'https://learn.datadoghq.com/course/view.php?id=10'
    tag: Centre d'apprentissage
    text: Aller plus loin avec les logs grâce au parsing
---
{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="log d'origine" responsive="true">}}

## Objectif des pipelines

**Un pipeline de traitement prend un sous-ensemble filtré de logs entrants et leur applique une liste de processeurs de façon séquentielle.**

Datadog analyse automatiquement les logs au format JSON. Lorsque vos logs ne sont pas au format JSON, Datadog vous permet d'optimiser leur utilisation en les faisant passer par un pipeline de traitement.

Avec les pipelines, vous analysez et enrichissez vos logs grâce à un ensemble de [processeurs][1]. Cela vous permet d'extraire des informations ou des attributs utiles à partir de texte semi-structuré pour les réutiliser en tant que [facettes][2].

Chaque log qui passe par les pipelines est testé avec chaque filtre de pipeline. Si l'un des logs correspond à un filtre, tous les [processeurs][1] du pipeline sont appliqués de façon séquentielle avant de passer au pipeline suivant.

Ainsi, un pipeline de traitement peut transformer ce log :

{{< img src="logs/processing/pipelines/log_pre_processing.png" alt="log d'origine" responsive="true" style="width:50%;">}}

En ce log :

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="log après traitement" responsive="true" style="width:50%;">}}

Avec un seul pipeline :

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="exemple de pipelines" responsive="true" style="width:75%;">}}

Les pipelines traitent tous les formats de logs et les convertissent en un format commun dans Datadog.

Par exemple, un premier pipeline peut être défini pour extraire le préfixe du log d'application. Chaque équipe est ensuite libre de définir son propre pipeline pour traiter le reste du message du log.

## Filtres de pipeline

Les filtres vous permettent de limiter les types de logs auxquels un pipeline s'applique.

La syntaxe d'un filtre est identique à celle de la [barre de recherche][2].

**Attention : les filtres de pipeline sont appliqués avant tout traitement par les processeurs du pipeline. Par conséquent, vous ne pouvez pas appliquer de filtre à partir d'un attribut qui est extrait dans le pipeline.**

Le flux de logs affiche les logs auxquels votre pipeline s'applique :

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="filtres de pipeline" responsive="true" style="width:80%;">}}

## Pipelines imbriqués

Les pipelines imbriqués sont des pipelines au sein d'un pipeline. Utilisez les pipelines imbriqués pour diviser le processing en deux étapes. Par exemple, vous pouvez commencer par appliquer un filtre de niveau supérieur tel que l'équipe, puis un deuxième niveau de filtrage basé sur l'intégration, le service ou tout autre tag ou attribut.

 Un pipeline peut contenir des pipelines imbriqués et des processeurs, tandis qu'un pipeline imbriqué peut seulement contenir des processeurs.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="pipelines imbriqués" responsive="true" style="width:80%;">}}

 Il est possible de faire glisser un pipeline vers un autre pipeline pour le transformer en pipeline imbriqué :

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="Créer des pipelines imbriqués avec un glisser-déposer" video="true" responsive="true" width="80%" >}}

## Pipelines spéciaux

### Pipeline d'attribut réservé

Datadog dispose d'[une liste d'attributs réservés][3], tels que `timestamp`, `status`, `host`, `service` et même le `message` de log. Ces attributs ont un comportement spécifique au sein de l'application Datadog.
Si les attributs figurant dans vos logs JSON présentent des noms différents, utilisez le pipeline des attributs réservés pour remapper l'attribut de vos logs vers un attribut figurant dans la liste des attributs réservés.

Par exemple, imaginons un service qui génère les logs ci-dessous :

```json
{
    "myhost": "host123",
    "myapp": "test-web-2",
    "logger_severity": "Error",
    "log": "cannot establish connection with /api/v1/test",
    "status_code": 500
}
```

Accédez au pipeline d'attribut réservé et remplacez le mappage par défaut par ce qui suit :

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="remappage de l'attribut réservé" responsive="true" style="width:70%;">}}

On obtient alors le log suivant :

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="log après remappage" responsive="true" style="width:70%;">}}

Si vous souhaitez remapper un attribut vers un des attributs réservés dans un pipeline personnalisé, utilisez le [remappeur de statut de log][4] ou le [remappeur de dates de log][5].

### Pipelines d'intégration

Les pipelines de processing d'intégration de Datadog sont disponibles pour certaines sources lorsqu'elles sont configurées pour recueillir les logs. Ces pipelines sont en mode **lecture seule** et analysent vos logs en s'adaptant à chaque source. Pour modifier le pipeline d'intégration, clonez-le, puis modifiez le clone :

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="cloner un pipeline" responsive="true" style="width:80%;">}}

Pour afficher la liste complète des pipelines d'intégration, consultez la page des [références relatives aux pipelines d'intégration][6].

## Limites des pipelines

Pour assurer le bon fonctionnement de la solution Log Management, vos événements de log et certaines fonctionnalités sont soumis aux règles et aux limitations techniques suivantes. Ces limites ont été conçues de façon à ce qu'elles ne soient jamais atteintes.

### Limites appliquées aux événements de log ingérés

* La taille d'un événement de log ne doit pas dépasser 25 000 octets.
* Les événements de log peuvent être envoyés jusqu'à 6 h avant ou 2 h après la réalisation de l'événement.
* Une fois converti au format JSON, un événement de log doit contenir moins de 256 attributs. La clé de chacun de ces attributs doit être inférieure à 50 caractères, être imbriquée dans moins de 10 niveaux successifs, et leur valeur respective doit être inférieure à 1 024 caractères si elle est présentée en tant que facette.
* Un événement de log ne doit pas avoir plus de 100 tags, et chaque tag ne doit pas dépasser 256 caractères pour un maximum de 10 millions de tags uniques par jour.

Les événements de log qui ne respectent pas ces limitations sont susceptibles d'être modifiés ou tronqués par le système. Ils peuvent aussi ne pas être indexés s'ils sont envoyés en dehors de l'intervalle de temps spécifié. Toutefois, Datadog s'efforce toujours de préserver au maximum les données utilisateur fournies.

### Limites appliquées aux fonctionnalités fournies

* Le nombre maximum de facettes est de 100.
* Le nombre maximum de pipelines de processing sur une plateforme est de 100.
* Le nombre maximum de processeurs par pipeline est de 20.
* Le nombre maximum de règles de parsing au sein d'un processeur Grok est de 10. Nous nous réservons le droit de désactiver les règles de parsing moins performantes qui pourraient avoir une incidence sur les performances du service de Datadog.

[Contactez l'assistance][7] si vous atteignez l'une de ces limites. Datadog pourra peut-être vous proposer une solution mieux adaptée à vos besoins.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/processors
[2]: /fr/logs/explorer/search
[3]: /fr/logs/processing/#reserved-attributes
[4]: /fr/logs/processing/processors/#log-status-remapper
[5]: /fr/logs/processing/processors/#log-date-remapper
[6]: /fr/logs/faq/integration-pipeline-reference
[7]: /fr/help