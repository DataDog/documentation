---
title: Widget SLO
kind: documentation
description: Faites un suivi de vos SLO.
aliases:
  - /fr/monitors/monitor_uptime_widget/
  - /fr/monitors/slo_widget/
further_reading:
  - link: 'https://www.datadoghq.com/blog/slo-monitoring-widget/'
    tag: Blog
    text: Suivez le statut de vos SLO avec le nouveau widget Disponibilité des monitors
---
## Implémentation

Utilisez le widget dédié aux SLO et à la disponibilité pour surveiller vos SLO (objectifs de niveau de service) et la disponibilité à partir d'un screenboard ou timeboard. Pour utiliser les SLO, ajoutez un widget à un dashboard ou accédez à la [page Service Level Objectives[1] pour afficher les SLO existants et en créer d'autres. Sélectionnez un SLO actif dans le menu déroulant et affichez-le sur n'importe quel dashboard.

L'*uptime* ou la disponibilité correspond à la durée pendant laquelle un monitor affichait un statut *up* (OK) comparé à un statut *down* (non OK). Le statut est représenté par des barres de couleur verte (disponible) et rouge (non disponible).

Vous pouvez également surveiller le taux de réussite et les SLI (Service Level Indicators) basés sur des événements. Par exemple: `99 % du temps, la latence est inférieure à 200 ms` :

{{< img src="graphing/widgets/slo/summary_editor.png" alt="widget disponibilité des monitors"  >}}

### Configuration

1. Sur la page du dashboard, ajoutez un widget SLO. La disponibilité des monitors peut être consultée dans le menu déroulant des SLI basés sur le temps dans le widget. Vous êtes ainsi informé de la durée pendant laquelle le statut d'un élément était OK.
2. Sélectionnez un ou plusieurs monitors.
3. Sélectionnez la façon dont vous souhaitez afficher la disponibilité par groupes de monitors.
4. Définissez un intervalle de temps.
5. Définissez une mise en forme conditionnelle : choisissez le pourcentage de disponibilité attendu ainsi qu'un seuil d'avertissement.
6. Définissez les options d'affichage du SLO.

Une fois les monitors configurés, vous avez la possibilité de consulter le pourcentage global de disponibilité uniquement ou le pourcentage global ainsi que la disponibilité pour chaque monitor.

{{< img src="graphing/widgets/slo/slo_uptime-view_mode2.png" alt="Mode de visualisation"  >}}

### Options

#### Sélectionner des monitors

Vous pouvez sélectionner jusqu'à 20 monitors à la fois. Il est possible de rechercher un groupe de monitors et d'utiliser la requête de recherche pour sélectionner les monitors qui vous intéressent. Datadog vous conseille d'utiliser les [tags de monitor][2] pour votre recherche. Par exemple, pour rechercher les monitors d'un service, utilisez : `service:<NOM_SERVICE>`.

{{< img src="graphing/widgets/slo/slo_uptime-choose_a_monitor.png" alt="Choisir un monitor"  >}}

#### Disponibilité par groupe

Vous pouvez afficher la disponibilité par groupes de monitors de trois manières différentes :

- Les cinq groupes les plus performants
- Les cinq groupes les moins performants
- Personnalisé (sélectionnez jusqu'à 20 groupes)

#### Intervalle de temps

Il est possible d'afficher le pourcentage de disponibilité pour l'ensemble du monitor, pour des groupes spécifiques, ou les deux. Le pourcentage total de disponibilité peut être calculé en fonction du groupe sélectionné, de l'ensemble des monitors (tous les groupes, peu importe les éléments sélectionnés) ou des groupes sélectionnés uniquement.

**Remarque** : la disponibilité globale correspond à la part de temps pendant laquelle aucun des groupes inclus dans le widget n'affichait un statut ALERT.

{{< img src="graphing/widgets/slo/slo_uptime-view_mode.png" alt="Mode de visualisation"  >}}

#### Mise en forme conditionnelle

| Option              | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| SLO                 | Définissez le pourcentage de disponibilité attendu pour votre service.                               |
| Warning threshold   | Définissez le seuil à partir duquel vous souhaitez être informé par Datadog de la disponibilité de votre service.   |

### Options d'affichage

Pour les monitors basés sur des SLO, vous pouvez choisir d'afficher le pourcentage de disponibilité du monitor, ses groupes les moins performants, ou les deux. Ces options ont également disponibles pour les SLO qui regroupent plusieurs monitors, vous permettant ainsi de consulter un monitor spécifique plutôt qu'un groupe entier.

Les groupes (ou les monitors agrégés dans le cas des SLO avec plusieurs monitors) sont triés en fonction du pire statut dans l'intervalle de temps le plus court. Pour modifier l'intervalle de temps de tri, cliquez sur le libellé de cet intervalle dans l'aperçu.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /fr/tagging/using_tags/?tab=assignment#monitors