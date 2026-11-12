---
aliases:
- /fr/journey_monitoring/map/suggested_journeys/
description: Créez des parcours à partir de suggestions basées sur l'activité des
  utilisateurs dans vos applications front-end.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/map/
  tag: Documentation
  text: Découvrez la carte
- link: /journey_monitoring/configuring_journeys/
  tag: Documentation
  text: Configurez des parcours
title: Parcours suggérés
---
## Présentation {#overview}

Chaque mercredi à minuit UTC, Datadog analyse les 30 derniers jours de [pages vues et clics][3] provenant des applications front-end. Sur la base de cette activité, Datadog génère des parcours suggérés qui incluent :

- Un nom de parcours
- Une description de parcours
- Un événement de début
- Un événement de fin

Sélectionnez un parcours suggéré depuis la [carte][1] ou le [catalogue][2] pour ouvrir la [page de création de parcours][4]. Datadog renseigne le nom, la description, l'événement de début et l'événement de fin. Vérifiez ces champs avant de créer le parcours.

Survolez un parcours suggéré pour l'accepter ou le rejeter. Pour le rejeter, cliquez sur l'icône X. Une suggestion rejetée n'apparaît plus.

<div class="alert alert-warning"><p>Les parcours suggérés n'apparaissent pas si votre organisation a choisi de ne pas participer aux expériences d'IA appliquée.</p></div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/journey_monitoring/map/
[2]: /fr/journey_monitoring/overview/#journey-catalog
[3]: /fr/product_analytics/data_collected/
[4]: /fr/journey_monitoring/configuring_journeys/#choose-a-creation-method