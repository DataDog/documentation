---
title: Widget Réseau
kind: documentation
description: Affiche des données réseau sous forme de série temporelle.
widget_type: timeseries
aliases:
  - /fr/graphing/widgets/network/
further_reading:
  - link: /network_monitoring/performance/
    tag: Documentation
    text: Surveillance des performances réseau
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Réseau vient compléter la fonctionnalité de [surveillance des performances réseau][1] en vous permettant de créer des séries temporelles à partir de vos données réseau, telles que le volume et le nombre de retransmissions TCP du trafic entre vos différents services, hosts, conteneurs ou autres tags Datadog. Les séries temporelles créées avec ce widget peuvent être ajoutées à des dashboards afin de les visualiser en même temps que les représentations graphiques de vos données de logs, de traces et de processus.

{{< img src="dashboards/widgets/network/network_1.png" alt="Image"  width="80%" >}}

**Remarque** : ce widget permet uniquement la visualisation de séries temporelles.

## Configuration

1. Sélectionnez « Network Traffic » dans le menu déroulant. Par défaut, cette option est définie sur « Metric ».

    {{< img src="dashboards/widgets/network/network_2.png" alt="Image"   width="80%" >}}

2. Sélectionnez les entités source et cible à utiliser pour l'agrégation sur la page Réseau, telles que service, host, conteneur ou zone de disponibilité.

    {{< img src="dashboards/widgets/network/network_3.png" alt="Image"  width="80%" >}}

   Vous pouvez également sélectionner un service, host, etc. spécifique en ajoutant des tags dans les barres de recherche de la source et de la destination.

    {{< img src="dashboards/widgets/network/network_4-2.png" alt="Image"  width="80%" >}}

3. Sélectionnez le type de données que vous souhaitez visualiser : octets envoyés, octets reçus ou nombre de retransmissions.

    {{< img src="dashboards/widgets/network/network_5-2.png" alt="Image"  width="80%" >}}

4. Sélectionnez les paramètres de visualisation de votre choix. Vous pouvez visualiser les données dans de nombreuses couleurs différentes et sous la forme de graphique en aires, à barres ou linéaire.

    {{< img src="dashboards/widgets/network/network_6.png" alt="Image" responsive="false" style="width:60%;" >}}

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Réseau est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/performance
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/