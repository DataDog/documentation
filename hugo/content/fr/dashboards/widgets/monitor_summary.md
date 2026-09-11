---
aliases:
- /fr/graphing/widgets/monitor_summary/
description: Affichez une vue synthétique de tous vos monitors Datadog ou d'un sous-ensemble
  filtré selon une requête.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Résumé des monitors
widget_type: manage_status
---

Le widget Résumé des monitors affiche une vue synthétique de tous vos monitors Datadog ou d'un sous-ensemble filtré selon une requête.

{{< img src="dashboards/widgets/monitor_summary/monitor-summary-overview.png" alt="résumé des monitors" >}}

## Configuration

{{< img src="dashboards/widgets/monitor_summary/monitor-summary-setup.png" alt="Configuration du widget Résumé des monitors" style="width:80%;">}}

### Configuration

1. Sélectionnez l'un des trois types de résumé : `Monitor`, `Group` ou `Combined`.
    - Le type de résumé `Monitor` répertorie les statuts et les noms des monitors correspondant à la [requête de monitor][1]. Les monitors à alertes multiples sont affichés sur une seule ligne dans la liste des résultats, et leur statut correspond au statut global du monitor à alertes multiples. Les nombres indiqués pour chaque statut représentent le nombre de monitors correspondant à chaque type de statut.

    {{< img src="dashboards/widgets/monitor_summary/monitor_summary_type.png" alt="Type de résumé Monitor" style="width:80%;">}}

    - Le type de résumé `Group` répertorie les statuts, les noms et les groupes des monitors correspondant à la requête de monitor. Les monitors à alertes multiples sont affichés sur plusieurs lignes dans la liste des résultats, chaque ligne correspondant à un groupe et chaque statut correspondant à celui du groupe au sein du monitor à alertes multiples. Tout comme la page [Triggered Monitors][2], le type de résumé `Group` prend également en charge les facettes `group` et `group_status` dans sa requête de monitor. Les nombres indiqués pour chaque statut représentent le nombre de groupes de monitors correspondant à chaque type de statut.

    {{< img src="dashboards/widgets/monitor_summary/group_summary_type.png" alt="Type de résumé Group" style="width:80%;">}}

    - Le type de résumé `Combined` répertorie le nombre de statuts de groupe et les noms des monitors correspondant à la requête de monitor. Les monitors à alertes multiples s'affichent sur une seule ligne dans la liste des résultats, comme pour le type de résumé `Monitor`, mais la colonne dédiée aux groupes affiche le nombre de groupes correspondant à chaque type de statut au lieu d'afficher le statut global du monitor. Tout comme le type de résumé `Group`, le type de résumé `Combined` prend également en charge les facettes `group` et `group_status` dans sa requête de monitor. Dans la même logique que le type de résumé `Monitor`, les nombres indiqués pour chaque statut représentent le nombre total de monitors associés à chaque statut.

    {{< img src="dashboards/widgets/monitor_summary/combined_summary_type.png" alt="Type de résumé Combined" style="width:80%;">}}

2. Saisissez une requête de monitor pour afficher un sous-ensemble de monitors sur le widget Résumé des monitors.

    **Remarque** : outre les facettes répertoriées dans le lien ci-dessus, les types de résumés `Group` et `Combined` prennent également en charge les facettes `group` et `group_status` pour les recherches au sein des groupes, de la même manière que la page [Triggered Monitors][2].

#### Template variables

Pour utiliser des template variables créées dans votre dashboard dans la requête de recherche du widget Résumé des monitors, utilisez le même format de requête que pour la page Manage Monitor.

**Exemple**

1. Appliquer au monitor un filtre `scope` avec une template variable `$service`

   Pour ajouter un filtre `scope` sur la page Manage Monitor ou Triggered Monitors, vous devez utiliser `scope:service:web-store`.
   Ainsi, vous devez spécifier `scope:$service` dans le widget, puis appliquer la valeur de la template variable au widget.

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-scope.png" alt="Template variable scope" style="width:80%;">}}


2. Appliquer au monitor un filtre `group` avec une template variable `$env`

   Pour ajouter un filtre `group` sur la page Manage Monitor ou Triggered Monitors, vous devez utiliser `group:env:prod`.
   Ainsi, vous devez spécifier `group:$env` dans le widget, puis appliquer la valeur de la template variable au widget.

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-group.png" alt="Template variable group" style="width:80%;">}}

## Options

#### Préférences d'affichage

Choisissez parmi les options d'affichage suivantes : `Count` pour afficher le nombre de monitors par type de statut de monitor, `List` pour afficher une liste des monitors, ou `Both` pour afficher les deux. Les options `Text` et `Background` spécifient si les couleurs de statut doivent être appliquées au texte ou à l'arrière-plan des nombres de statuts. Lorsque l'option `Hide empty Status Counts` est sélectionnée, le nombre de monitors associés à un statut est uniquement affiché lorsque la liste des résultats contient au moins un monitor avec ce statut.

{{< img src="dashboards/widgets/monitor_summary/display-preferences.png" alt="Préférences d'affichage" style="width:80%;">}}

En activant l'option `Show triggered column`, vous pouvez filtrer les résultats de manière à afficher uniquement les monitors ou les groupes de monitors qui présentent un état déclenché (`Alert`, `Warn` ou `No Data`). Ceux-ci sont alors triés en fonction de leur date de déclenchement, de la plus récente à la plus éloignée. Une colonne supplémentaire indique alors le temps écoulé depuis le dernier déclenchement du monitor/groupe.

{{< img src="dashboards/widgets/monitor_summary/monitor-summary.png" alt="Préférences d'affichage" style="width:80%;">}}

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a title` :

{{< img src="dashboards/widgets/monitor_summary/widget_title.png" alt="Titre du widget" style="width:80%;">}}

Vous pouvez aussi définir sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][3] pour en savoir plus.

Le [schéma JSON][4] utilisé pour le widget Résumé des monitors est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/manage/
[2]: /fr/monitors/manage/#grouped-results
[3]: /fr/api/v1/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/