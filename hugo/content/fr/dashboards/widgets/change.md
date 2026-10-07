---
aliases:
- /fr/graphing/widgets/change/
description: Représentez graphiquement l'évolution d'une valeur sur une période donnée.
further_reading:
- link: /monitors/types/metric/?tab=change
  tag: Documentation
  text: Configurer la détection d'alertes de changement dans les monitors
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/graphing_json/widget_json/
  tag: Documentation
  text: Schéma JSON des widgets
- link: /dashboards/graphing_json/request_json/
  tag: Documentation
  text: Schéma JSON des requêtes
title: Widget Évolution
widget_type: change
---

Le graphique de changement affiche l'évolution d'une métrique sur une période de temps. Il compare la variation absolue ou relative (%) de la valeur entre il y a N minutes et maintenant par rapport à un seuil défini. Les points de données comparés ne sont pas des points uniques, mais sont calculés à partir des paramètres définis dans la section de définition de la métrique. Pour plus d'informations, consultez la documentation sur les [monitors de métriques][6] et le guide sur les [monitors d'alertes de changement][7].

{{< img src="/dashboards/widgets/change/change_widget.png" alt="Exemple de widget de changement pour la métrique jvm.heap_memory" style="width:100%;" >}}

## Configuration

### Configuration

1. Choisissez la métrique à représenter.
2. Choisissez une fonction d'agrégation.
3. Facultatif : choisissez un contexte spécifique pour votre widget.
4. Décomposez votre agrégation en fonction d'une clé de tag, comme `host` ou `service`.
5. Choisissez une valeur pour la période de comparaison :
    * an hour before (une heure avant)
    * a day before (un jour avant)
    * a week before (une semaine avant)
    * a month before (un mois avant)
6. Sélectionnez l'option `relative` ou `absolute` afin d'afficher une évolution relative ou absolue.
7. Sélectionnez le champ à utiliser pour trier les métriques :
    * `change`
    * `name`
    * `present value`
    * `past value`
8. Choisissez un ordre `ascending` (croissant) ou `descending` (décroissant).
9. Choisissez d'afficher ou non la valeur actuelle sur le graphique.

### Options

#### Liens de contexte

Les [liens de contexte][1] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages (dans Datadog ou sur des sites externes).

## API

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/context-links/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[6]: /fr/monitors/types/metric/?tab=change
[7]: /fr/monitors/types/change-alert/