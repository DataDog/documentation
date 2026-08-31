---
aliases:
- /fr/monitors/monitor_uptime_widget/
- /fr/monitors/slo_widget/
- /fr/graphing/widgets/slo/
- /fr/dashboards/faq/how-can-i-graph-host-uptime-percentage/
description: Suivi de vos SLO
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Faire un suivi du statut de tous vos SLO dans Datadog
- link: /dashboards/guide/slo_graph_query
  tag: Documentation
  text: Délimiter les requêtes SLO basées sur des métriques
title: Widget SLO
widget_type: slo
---

Les SLO (Service Level Objectives) sont des objectifs convenus qui doivent être atteints pour chaque activité, fonction et processus afin d'offrir les meilleures chances de succès aux clients. Les Service Level Objectives représentent les performances ou l'état de santé d'un service. Le widget SLO visualise le statut, le budget et le budget d'erreur restant des SLO existants. Il affiche tous les groupes sous-jacents du SLO et vous permet de trier les groupes selon n'importe laquelle des fenêtres de temps du widget. Utilisez ce widget pour créer des dashboards pertinents contenant les informations SLO les plus critiques :
- **Afficher tous les groupes SLO directement dans le widget** : cette option est utile pour les SLO contenant de nombreux groupes, car le widget fournit des informations clés relatives aux groupes SLO.
- **Définir l'ordre de tri préféré pour les groupes SLO dans le widget** : pour tous les types de SLO, triez les groupes en fonction de l'une des fenêtres de temps disponibles dans le widget. Identifiez rapidement les groupes SLO les plus et les moins performants pour différentes périodes.
- **Identifier facilement les périodes avec des données manquantes dans un SLO** : pour tous les types de SLO, le widget SLO affiche les périodes avec des données manquantes sous la forme « - ». Le « - » est affiché pour toute fenêtre de temps dont l'intégralité des données est manquante.

## Configuration

Utilisez le widget SLO pour visualiser un [Service Level Objective (SLO)][1] dans un dashboard.

{{< img src="/dashboards/widgets/slo/slo-summary-widget-new.png" alt="Éditeur de graphique du widget SLO Summary basé sur des métriques" >}}

### Configuration

1. Sélectionnez un SLO dans le menu déroulant.
2. **Pour les SLO basés sur des métriques et Time Slice** : vous pouvez filtrer votre requête avec des tags et utiliser les [template variables][2] pour définir dynamiquement le contexte de vos résultats :
    - Tirez parti des template variables en utilisant le champ *filter by* pour définir le périmètre des statuts de SLO affichés par le widget. Par exemple, `filter by $env` limite votre requête SLO à la valeur que vous choisissez dans le dashboard pour la template variable *env*.
    - Ajoutez un périmètre et un contexte supplémentaires à vos requêtes de métriques SLO, même si les tags n'étaient pas inclus dans la configuration SLO d'origine. Par exemple, si la requête SLO d'origine est `sum:trace.flask.request.hits{*} by {resource_name}.as_count()` et que vous filtrez par `env:prod` dans le widget, vos données seront limitées à celles de votre environnement `prod`.
3. Définissez jusqu'à trois intervalles de temps différents.
4. Sélectionnez vos préférences d'affichage.

### Options

#### Définir la période

Sélectionnez jusqu'à trois intervalles différents parmi les suivants :
- **Intervalles de temps glissants** : 7, 30 ou 90 jours
- **Périodes calendaires** : semaine en cours, semaine précédente, mois en cours ou mois précédent
- **Durée globale** : cette option vous permet d'afficher le statut et le budget d'erreur de votre SLO sur des périodes arbitraires. Vous pouvez consulter jusqu'à 3 mois d'historique pour les SLO basés sur des monitors. Pour les SLO Time Slice et basés sur des métriques, la vue historique prise en charge correspond à la durée de rétention des métriques de votre compte (par défaut, 15 mois). 

#### Préférences d'affichage

Choisissez d'afficher ou de masquer le budget d'erreur restant en activant ou désactivant l'option `Show error budget`.

Si vous visualisez un SLO avec plusieurs groupes ou un SLO basé sur des monitors avec plusieurs monitors, sélectionnez votre `View mode` :

- Pour les SLO avec des groupes (SLO basés sur des métriques ou Time Slice avec des groupes, ou SLO basés sur des monitors avec un seul monitor divisé en groupes), les trois modes d'affichage suivants sont disponibles :
  - `Overall` : affiche les pourcentages de statut et les cibles globaux du SLO
  - `Groups` : affiche un tableau des pourcentages de statuts pour chaque groupe
  - `Both` : affiche les pourcentages de statuts et les cibles du SLO global ainsi qu'un tableau des pourcentages de statuts pour chaque groupe

- Pour les SLO basés sur des monitors configurés avec plusieurs monitors, les trois modes de visualisation suivants sont proposés :
  - `Overall` : affiche les pourcentages de statut et les cibles globaux du SLO
  - `Monitors` : affiche un tableau des pourcentages de statuts pour chaque monitor
  - `Both` : affiche les pourcentages de statuts et les cibles du SLO global ainsi qu'un tableau des pourcentages de statuts pour chaque monitor

Lorsque vous définissez le `View mode` sur `Groups`, `Monitors` ou `Both` :
- Les groupes sont triés par statut croissant dans la plus petite fenêtre de temps par défaut. Après avoir ajouté le widget à un dashboard, vous pouvez trier par statut pour n'importe laquelle des intervalles de temps configurés via l'interface du widget.
- Le widget affiche les éléments suivants :
  + Pour les SLO basés sur des métriques et Time Slice, *tous* les groupes sous-jacents du SLO sont affichés.
  + Pour les SLO basés sur des monitors avec plusieurs monitors, tous les monitors sous-jacents du SLO sont affichés.
  + Pour les SLO basés sur un seul monitor avec des groupes, jusqu'à 20 groupes sont affichés si des groupes spécifiques ont été sélectionnés dans le SLO. Si aucun groupe spécifique n'a été sélectionné pour le SLO, *tous* les groupes sous-jacents du SLO sont affichés.

**Remarque :** pour les SLO basés sur des monitors avec des groupes, tous les groupes peuvent être affichés pour les SLO contenant jusqu'à 5 000 groupes. Pour les SLO contenant plus de 5 000 groupes, le SLO est calculé sur la base de tous les groupes, mais aucun groupe n'est affiché dans l'interface.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][3]**. Le tableau ci-dessous définit le [schéma JSON du widget][9] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_level_objectives/
[2]: /fr/dashboards/template_variables/
[3]: /fr/api/latest/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/