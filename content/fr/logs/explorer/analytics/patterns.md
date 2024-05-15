---
description: Regrouper des logs interrogés en patterns
further_reading:
- link: logs/explorer/
  tag: Documentation
  text: En savoir plus sur le Log Explorer
- link: logs/explorer/analytics
  tag: Documentation
  text: Apprendre à analyser vos logs
kind: documentation
title: Regrouper des logs en patterns
---

## Présentation

L'agrégation de logs indéxés en **patterns** vous permet de regrouper les logs dont le `message` possède une structure similaire. Vous avez la possibilité de sélectionner un à trois champs à facette pour effectuer une première agrégation de vos logs dans des groupes, avant que les patterns ne soient détectés dans ces groupes.

La vue **Patterns** vous permet de détecter et filtrer les patterns irréguliers les plus communs afin de repérer les problèmes qui vous intéressent vraiment. La détection de patterns se base sur 10 000 exemples de logs. Affinez votre recherche pour afficher les patterns qui se limitent à un sous-ensemble de logs spécifique.

{{< img src="logs/explorer/aggregations_patterns.png" alt="Le Log Explorer avec des logs regroupés en fonction de patterns" style="width:90%;" >}}

Les patterns prennent en charge les visualisations sous forme de [liste][15]. Cliquez sur un pattern dans la liste pour ouvrir le volet latéral dédié et effectuer les actions suivantes :

- Accéder à un échantillon de logs associés à ce pattern
- Renseigner le filtre de recherche pour affiner le contexte et afficher uniquement les logs associés à ce pattern
- Créer facilement une [règle de parsing grok][2] pour extraire des informations structurées à partir des logs associés à ce pattern

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="Le volet latéral avec le bouton View All et la règle de parsing mis en avant" style="width:90%;" >}}

## Inspecteur de pattern

Lʼinspecteur de pattern vous permet de profiter dʼune analyse visuelle des valeurs sous-jacentes de lʼagrégation du pattern dʼun log en fonction de votre requête de recherche.

{{< img src="logs/explorer/group/pattern_inspector_values.png" alt="Le graphique illustrant la distribution des valeurs, avec des barres représentant ces dernières" style="width:90%;" >}}

Par exemple, si vous analysez un problème, vous pouvez voir le nombre de hosts impliqués ou les régions ou centres de données qui sont impactés.

1. Accédez au [Log Explorer][3].
2. Cliquez sur **Patterns** dans la section **Group into**. Dans la liste des patterns, les valeurs agrégées dans la section des messages sont indiquées en jaune. Passez sur une valeur agrégée pour obtenir un aperçu de la distribution visuelle de ses valeurs. 
3. Cliquez sur une valeur agrégée pour ouvrir le volet latéral du pattern du log et afficher plus de détails dans lʼonglet **Pattern Inspector**. 

{{< img src="logs/explorer/group/pattern_inspector_panel_1.png" alt="Le volet du pattern affichant lʼonglet de lʼinspecteur de pattern" style="width:90%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/visualize/#list-aggregates-of-logs
[2]: /fr/logs/log_configuration/processors/#grok-parser
[3]: https://app.datadoghq.com/logs