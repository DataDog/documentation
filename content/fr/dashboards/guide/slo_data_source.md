---
description: Afficher les données SLO historiques sur les dashboards en utilisant
  les widgets SLO et les visualisations de séries temporelles pour le suivi des performances.
further_reading:
- link: /service_level_objectives/
  tag: Documentation
  text: En savoir plus sur Service Level Objectives
- link: /dashboards/widgets/slo
  tag: Documentation
  text: Widget SLO
- link: /dashboards/widgets/slo_list
  tag: Documentation
  text: Widget SLO List
title: Représenter graphiquement les données SLO historiques sur les dashboards
---

## Présentation

Représentez graphiquement les SLO basés sur des métriques et Time Slice sur les dashboards et suivez les tendances sur 15 mois. Vous pouvez également tirer parti de la fonctionnalité de [reporting de dashboard planifié][1] pour fournir automatiquement des rapports visuels aux parties prenantes clés.

## Configuration

{{< img src="dashboards/guide/slo_data_type/slo-data-good-bad-events.png" alt="Configuration de l'éditeur de graphiques avec le type de données SLO sélectionné et la mesure good events sélectionnée" style="width:100%;" >}}

Pour commencer, choisissez l'un des types de visualisation standard dans la palette de widgets du dashboard et sélectionnez *SLOs* comme source de données dans le menu déroulant de requête. 

Pour le paramètre *Measure*, consultez le tableau ci-dessous pour plus d'informations sur ce que chaque mesure visualise. Le paramètre *Display* vous permet de décomposer la requête par les groupes qui sont déjà configurés pour le SLO. 

{{< callout url="#" btn_hidden="true" header="Key Information">}}
  Lors de l'utilisation de mesures de source de données SLO dans le widget Timeseries, la valeur affichée à chaque point est basée sur le rollup par défaut dans le widget, et non sur la période glissante du SLO. 
{{< /callout >}}

| Mesure | Type de SLO |  Widget Timeseries  | Widgets scalaires |
| -----  | ----- | ----- | ----- |
| Good events | Basé sur des métriques | Le nombre de good events. | La somme des good events sur tous les groupes. |
| Bad events | Basé sur des métriques | Le nombre de bad events. | La somme des bad events sur tous les groupes. |
| Good minutes | Basé sur des monitors ou Time Slice | Le nombre de good minutes. | La somme des good minutes sur tous les groupes. |
| Bad minutes | Basé sur des monitors ou Time Slice | Le nombre de bad minutes. | La somme des bad minutes sur tous les groupes. |
| Statut SLO | Tous types | Pour chaque bucket temporel, le statut SLO est calculé comme le ratio du nombre de good events/minutes sur le total d'events/minutes. | Le ratio du nombre de good events/minutes sur le total d'events/minutes. |
| Marge d'erreur restante | Tous types | Pour chaque bucket temporel, le pourcentage de marge d'erreur restante. La cible pour la [fenêtre temporelle principale][3] est utilisée dans le calcul de la marge d'erreur. | Le pourcentage de marge d'erreur restante à la fin de la plage temporelle du widget. |
| Taux d'utilisation | Tous types | Pour chaque bucket temporel, le taux de consommation montre le taux d'erreur observé divisé par le taux d'erreur idéal. | Le taux de consommation sur la plage temporelle du widget. |
| Consommation de la marge d'erreur | Tous types | La marge d'erreur consommée au fil du temps. Elle commence à 100 % (sauf s'il y avait des bad events/minutes dans le premier bucket temporel) et diminue avec les bad events/minutes. | La consommation de la marge d'erreur n'est pas disponible dans les widgets scalaires. |

#### Corrections de statut SLO

Pour les SLO qui ont des [corrections de statut][2], vous pouvez activer ou désactiver les corrections dans les graphiques utilisant la source de données SLO. Par défaut, les corrections sont activées et appliquées au graphique ; vous pouvez les désactiver avec les options du menu des options avancées :

{{< img src="dashboards/guide/slo_data_type/slo-data-source-correction.mp4" alt="Configuration de l'éditeur de graphiques avec le type de données SLO sélectionné et la mesure good events sélectionnée" video="true" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/sharing/scheduled_reports/
[2]: /fr/service_level_objectives/#slo-status-corrections
[3]: /fr/service_level_objectives/#configuration