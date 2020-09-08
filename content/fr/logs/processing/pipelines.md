---
title: Pipelines
kind: documentation
description: Analyser vos logs à l'aide du processeur Grok
further_reading:
  - link: /logs/processing/processors/
    tag: Documentation
    text: Consultez la liste complète des processeurs disponibles.
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: Collecte illimitée de logs
  - link: /logs/explorer/
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: 'https://learn.datadoghq.com/course/view.php?id=10'
    tag: Centre d'apprentissage
    text: Aller plus loin avec les logs grâce au parsing
---
{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="log d'origine" >}}

## Objectif des pipelines

**Un pipeline de traitement prend un sous-ensemble filtré de logs entrants et leur applique une liste de processeurs de façon séquentielle.**

Datadog analyse automatiquement les logs au format JSON. Lorsque vos logs ne sont pas au format JSON, Datadog vous permet d'optimiser leur utilisation en les faisant passer par un pipeline de traitement.

Avec les pipelines, vous analysez et enrichissez vos logs grâce à un ensemble de [processeurs][1]. Cela vous permet d'extraire des informations ou des attributs utiles à partir de texte semi-structuré pour les réutiliser en tant que [facettes][2].

Chaque log qui passe par les pipelines est testé avec chaque filtre de pipeline. Si l'un des logs correspond à un filtre, tous les [processeurs][1] du pipeline sont appliqués de façon séquentielle avant de passer au pipeline suivant.

Ainsi, un pipeline de traitement peut transformer ce log :

{{< img src="logs/processing/pipelines/log_pre_processing.png" alt="log d'origine" style="width:50%;">}}

En ce log :

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Log après traitement" style="width:50%;">}}

Avec un seul pipeline :

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="Exemple de pipelines" style="width:75%;">}}

Les pipelines traitent tous les formats de logs et les convertissent en un format commun dans Datadog.

Par exemple, un premier pipeline peut être défini pour extraire le préfixe du log d'application. Chaque équipe est ensuite libre de définir son propre pipeline pour traiter le reste du message du log.

## Filtres de pipeline

Les filtres vous permettent de limiter les types de logs auxquels un pipeline s'applique.

La syntaxe d'un filtre est identique à celle de la [barre de recherche][2].

**Attention : les filtres de pipeline sont appliqués avant tout traitement par les processeurs du pipeline. Par conséquent, vous ne pouvez pas appliquer de filtre à partir d'un attribut qui est extrait dans le pipeline.**

Le flux de logs affiche les logs auxquels votre pipeline s'applique :

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="Filtres de pipeline" style="width:80%;">}}

## Pipelines imbriqués

Les pipelines imbriqués sont des pipelines au sein d'un pipeline. Utilisez les pipelines imbriqués pour diviser le processing en deux étapes. Par exemple, vous pouvez commencer par appliquer un filtre de niveau supérieur tel que l'équipe, puis un deuxième niveau de filtrage basé sur l'intégration, le service ou tout autre tag ou attribut.

 Un pipeline peut contenir des pipelines imbriqués et des processeurs, tandis qu'un pipeline imbriqué peut seulement contenir des processeurs.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines imbriqués" style="width:80%;">}}

 Il est possible de faire glisser un pipeline vers un autre pipeline pour le transformer en pipeline imbriqué :

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="Faire glisser et déposer des pipelines imbriqués" video="true" width="80%" >}}

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

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="Remappage de l'attribut réservé" style="width:70%;">}}

On obtient alors le log suivant :

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="log après remappage" style="width:70%;">}}

Si vous souhaitez remapper un attribut vers un des attributs réservés dans un pipeline personnalisé, utilisez le [remappeur de statut de log][4] ou le [remappeur de dates de log][5].

### Pipelines d'intégration

Les pipelines de processing d'intégration de Datadog sont disponibles pour certaines sources lorsqu'elles sont configurées pour recueillir les logs. Ces pipelines sont en mode **lecture seule** et analysent vos logs en s'adaptant à chaque source. Pour modifier le pipeline d'intégration, clonez-le, puis modifiez le clone :

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="cloner un pipeline" style="width:80%;">}}

### Bibliothèque de pipelines d'intégration

Pour afficher la liste complète des pipelines d'intégration proposés par Datadog, consultez la [Bibliothèque de pipelines d'intégration][6].
La Bibliothèque de pipelines indique comment Datadog traite les différents formats de log par défaut.

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="Bibliothèque de pipelines d'intégration"  style="width:80%;">}}

Pour utiliser un pipeline d'intégration, nous vous conseillons d'installer l'intégration en configurant la `source` de log correspondante. Lorsque Datadog reçoit le premier log avec cette source, l'installation se déclenche automatiquement et le pipeline d'intégration est ajouté à la liste des pipelines de traitement. Pour configurer la source de log, consultez la [documentation relative à l'intégration][7] correspondante.

Il est également possible de copier un pipeline d'intégration à l'aide du bouton Copy. 

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="Cloner un pipeline à partir de la bibliothèque"  style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/logs/processing/processors/
[2]: /fr/logs/explorer/search/
[3]: /fr/logs/processing/#reserved-attributes
[4]: /fr/logs/processing/processors/#log-status-remapper
[5]: /fr/logs/processing/processors/#log-date-remapper
[6]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[7]: /fr/integrations/#cat-log-collection