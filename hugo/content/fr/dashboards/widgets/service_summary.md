---
aliases:
- /fr/graphing/widgets/service_summary/
description: Affiche les graphiques d'un service choisi dans un widget de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur la page Service APM
title: Widget Résumé de service
widget_type: trace_service
---

Un service est un ensemble de processus effectuant le même travail, par exemple un framework Web ou une base de données. Datadog fournit des graphiques prêts à l'emploi pour afficher les informations de service, comme sur la page Service. Utilisez le widget Service Summary pour afficher les graphiques d'un [service][1] choisi dans votre dashboard.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="résumé de service" >}}

## Configuration

### Configuration

1. Sélectionnez un [environnement][2] et un [service][1].
2. Sélectionnez une taille de widget.
3. Sélectionnez les informations à afficher :
    * Hits
    * Erreurs
    * Latence
    * Répartition
    * Distribution
    * Ressources (**remarque** : pour afficher des ressources, la plus grande taille de widget est requise)
4. Choisissez vos préférences d'affichage en sélectionnant le nombre de colonnes sur lesquelles répartir vos graphiques.
5. Saisissez un titre pour votre graphique.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][3]**. Le tableau ci-dessous définit le [schéma JSON du widget][9] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/services/service_page/
[2]: /fr/tracing/send_traces/
[3]: /fr/api/latest/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/