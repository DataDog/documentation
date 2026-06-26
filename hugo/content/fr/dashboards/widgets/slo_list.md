---
aliases: null
description: Afficher une liste de Service Level Objectives
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: GitHub
  text: Faire un suivi du statut de tous vos SLO dans Datadog
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget SLO List
widget_type: slo_list
---

Les SLO (Service Level Objectives) sont des objectifs convenus qui doivent être atteints pour chaque activité, fonction et processus afin d'offrir les meilleures chances de succès aux clients. Les Service Level Objectives représentent les performances ou l'état de santé d'un service.

Le widget SLO List affiche un sous-ensemble de Service Level Objectives sur leur fenêtre de temps principale. Toutes les autres fenêtres de temps configurées sont disponibles dans le panneau latéral du SLO sur la page des SLO. Pour plus d'informations, consultez la documentation sur les [SLO][1].

{{< img src="dashboards/widgets/slo_list/slo-list-widget-latest.png" alt="Le widget SLO List affichant une liste de Service Level Objectives" style="width:90%;" >}}

## Configuration

{{< img src="dashboards/widgets/slo_list/slo-list-widget-editor-latest.png" alt="Une requête de recherche définissant le service web-store dans l'éditeur du widget SLO List" style="width:90%;" >}}

### Configuration

1. Ajoutez un widget SLO List à un dashboard.
2. Utilisez des tags pour filtrer la liste des Service Level Objectives (par exemple `service:foo, env:prod`). Les template variables sont prises en charge.
3. Choisissez le nombre maximum de Service Level Objectives à afficher (la valeur par défaut est 100) et triez par statut ou par budget d'erreur.
4. Donnez éventuellement un titre au widget.

Lorsque vous êtes prêt à créer le widget, cliquez sur **Save**.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_level_objectives/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/