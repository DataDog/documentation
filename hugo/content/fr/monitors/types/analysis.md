---
description: Alertez sur l'analyse avancée des logs avec des monitors d'analyse qui
  prennent en charge l'interrogation de plusieurs sources de données, l'enchaînement
  de transformations de données et l'exécution de requêtes SQL complexes.
further_reading:
- link: /notebooks/advanced_analysis/
  tag: Documentation
  text: Notebooks – Analyse avancée
- link: /monitors/configuration/
  tag: Documentation
  text: Apprenez à configurer des monitors
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
site_support_id: advanced_analysis
title: Monitor d'analyse
---
## Présentation {#overview}

Les monitors d'analyse offrent un accès complet aux fonctionnalités d'analyse de Notebook et DDSQL, vous permettant d'alerter sur des modèles de données complexes que les monitors standard pourraient manquer. Avec les monitors d'analyse, vous pouvez :

- Interroger plusieurs sources de données
- Enchaîner des transformations de données
- Exécuter des requêtes SQL complexes
- Créer des workflows d'analyse sophistiqués

## Sources de données prises en charge {#supported-data-sources}

Les monitors d'analyse prennent en charge un sous-ensemble des sources de données disponibles dans les cellules d'analyse de Notebook et les requêtes DDSQL. Comme les monitors évaluent fréquemment leurs requêtes, chaque source de données n'est activée qu'après avoir été validée pour gérer la charge de requête au niveau du monitor.

Les sources de données suivantes sont prises en charge :

- Agent Observability
- Audit
- Pipelines CI
- Tests CI
- Événements
- Agent Observability
- Logs
- Métriques
- NetFlow
- Réseau
- Tableaux de référence
- RUM
- Checks de service
- Spans

Les analyses publiées ne sont prises en charge que lorsque chaque source de données dont elles dépendent est également prise en charge.

Les logs stockés dans Flex Logs ne sont pas pris en charge pour la surveillance. 

Les sources de données non prises en charge incluent : 
- Utilisation de l'IA
- Cloud Cost
- Requêtes de base de données
- Métriques DORA
- Erreurs
- Ressources d'infrastructure
- Groupes de monitors, monitors
- Product Analytics
- Résultats de sécurité
- Signaux de sécurité
- Requête Snowflake
- Tests Synthetic

Si vous sélectionnez une analyse publiée basée sur une source de données non prise en charge, Datadog affiche une erreur qui nomme la source. Par exemple :

`This query is not monitorable because it's based on an unsupported data source for monitoring: Infrastructure Resources.`

Si l'analyse est basée sur des logs dans le stockage Flex, Datadog affiche cette erreur à la place :

`Dataset is based on Flex logs, which are not supported for monitoring.`

## Création de monitor {#monitor-creation}

Vous pouvez créer un monitor d'analyse de trois manières :

### Depuis la page des monitors {#from-the-monitors-page}

Pour créer un [monitor d'analyse][1] dans Datadog, utilisez la navigation principale : {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Analysis{{< /ui >}}.

### Depuis un Notebook {#from-a-notebook}

Pour créer un monitor d'analyse directement depuis un Notebook :

1. Ouvrez un Notebook avec une cellule d'analyse contenant la requête souhaitée.
2. Dans la cellule d'analyse, cliquez sur {{< ui >}}Send To{{< /ui >}}.
3. Sélectionnez {{< ui >}}Monitors{{< /ui >}}.

Cela vous permet de convertir votre analyse exploratoire en un monitor d'alerte.

### Depuis l'éditeur DDSQL {#from-the-ddsql-editor}

Pour créer un monitor d'analyse directement depuis l'éditeur DDSQL :

1. Ouvrez l'[éditeur DDSQL][4] et sélectionnez la requête souhaitée.
2. Cliquez sur la flèche du menu déroulant à côté de {{< ui >}}Save to dashboard{{< /ui >}}.
3. Sélectionnez {{< ui >}}Create monitor{{< /ui >}}.

## Définissez la requête {#define-the-query}

1. **Sélectionnez votre analyse publiée** : sélectionnez parmi les analyses publiées dans un Notebook ou dans l'éditeur DDSQL.
2. **Filtrez votre analyse publiée** : filtrez vos résultats par colonne.
3. **Prévisualisez les résultats** : affichez le résultat de votre requête avant de définir les conditions d'alerte.

{{< img src="/monitors/monitor_types/analysis/analysis_monitor_config.png" alt="Exemple de configuration de monitor d'analyse" style="width:100%;" >}}

## Définissez les conditions d'alerte {#set-alert-conditions}

Configurez les monitors pour qu'ils se déclenchent lorsque la valeur de la requête dépasse un seuil, et personnalisez les options d'alerte avancées telles que les seuils de rétablissement et les délais d'évaluation. Pour plus d'informations, consultez [Configure Monitors][2].

## Notifications {#notifications}

Pour des instructions détaillées sur la messagerie d'alerte, consultez [Notifications][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/analysis
[2]: /fr/monitors/configuration/
[3]: /fr/monitors/notify/
[4]: https://app.datadoghq.com/ddsql/editor