---
title: Processing
kind: documentation
description: Analysez et enrichissez vos logs pour créer des facettes et des métriques pertinentes dans le Log Explorer.
aliases:
  - /fr/logs/faq/integration-pipeline-reference
further_reading:
  - link: /logs/processing/pipelines/
    tag: Documentation
    text: Découvrir les pipelines de Datadog
  - link: /logs/processing/processors/
    tag: Documentation
    text: Log Processors
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Comment nommer les attributs des logs Datadog
  - link: /logs/explorer/
    tag: Documentation
    text: Apprendre à explorer vos logs
---
## Présentation

Contrôlez le traitement de vos logs depuis la [page de configuration des logs][1].

* Un [pipeline][2] applique à un sous-ensemble filtré de logs entrants une liste de processeurs séquentiels.
* Un [processeur][3] s'exécute dans un [pipeline][2] pour effectuer une action de structuration de données ([remappage d'un attribut][4], [parsing Grok][5], etc.) sur un log.

{{< img src="logs/processing/processors/processing_overview.png" alt="Traitement" >}}

Les pipelines et les processeurs peuvent être appliqués à tout type de log. Vous n'avez pas besoin de modifier la configuration de votre journalisation ni de déployer des changements dans les règles de traitement côté serveur. Vous pouvez gérer l'ensemble des paramètres depuis la [page de configuration des pipelines][1].

La mise en place d'une stratégie de traitement des logs vous permet également de bénéficier d'une [convention de nommage d'attributs][6] à l'échelle de votre organisation.

## Logs personnalisés

Définissez des règles de traitement personnalisées pour les formats de logs personnalisés. Utilisez n'importe quelle syntaxe de log pour extraire tous vos attributs et, si besoin, les remapper sur des attributs globaux ou canoniques.

Par exemple, avec des règles de traitement personnalisées, vous pouvez transformer ce log :

{{< img src="logs/processing/log_pre_processing.png" alt="Prétraitement de logs" style="width:50%;">}}

En celui ci :

{{< img src="logs/processing/log_post_processing.png" alt="Post traitement de logs" style="width:50%;">}}

Consultez la [documentation relative aux pipelines][2] pour découvrir comment effectuer des actions uniquement sur un sous-ensemble de logs avec les [filtres de pipelines][7].

Consultez la [documentation relative aux processeurs][3] pour découvrir la liste complète des processeurs disponibles.

Si vous souhaitez en savoir plus sur les fonctionnalités de parsing, consultez la [documentation dédiée][8]. Vous pouvez également parcourir les [recommandations de parsing][9] ainsi que le guide relatif au [dépannage pour le parsing][10].

**Remarques** :

- Pour une utilisation optimale de la solution Log Management, Datadog recommande d'utiliser au maximum 20 processeurs par pipeline et 10 règles de parsing dans un processeur Grok.

- Datadog se réserve le droit de désactiver les règles de parsing, les processeurs ou les pipelines peu efficaces qui pourraient avoir une incidence sur les performances du service de Datadog.

## Pipeline de traitement

Un pipeline de traitement applique à un sous-ensemble filtré de logs entrants une liste de processeurs séquentiels. Consultez la [documentation relative aux pipelines][11] pour découvrir comment fonctionne le prétraitement des logs JSON et des pipelines d'intégration.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /fr/logs/processing/pipelines/
[3]: /fr/logs/processing/processors/
[4]: /fr/logs/processing/processors/#attribute-remapper
[5]: /fr/logs/processing/processors/#grok-parser
[6]: /fr/logs/processing/attributes_naming_convention/
[7]: /fr/logs/processing/pipelines/#pipeline-filters
[8]: /fr/logs/processing/parsing/
[9]: /fr/logs/faq/log-parsing-best-practice/
[10]: /fr/logs/faq/how-to-investigate-a-log-parsing-issue/
[11]: /fr/logs/processing/pipelines/#special-pipelines