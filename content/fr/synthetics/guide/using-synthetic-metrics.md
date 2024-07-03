---
description: Découvrez comment utiliser les métriques Synthetic générales dans vos
  monitors.
further_reading:
- link: /monitors/types/metric/
  tag: Documentation
  text: En savoir plus sur les monitors de métriques
- link: /monitors/manage/
  tag: Documentation
  text: Apprendre à gérer les monitors
- link: /synthetics/metrics/
  tag: Documentation
  text: En savoir plus sur les métriques de la surveillance Synthetic
kind: guide
title: Utiliser les métriques d'estimation de l'utilisation
---

## Présentation

Vous pouvez utiliser les [métriques][1] générées par vos tests Synthetic pour créer des [monitors de métriques][2] en plus du [monitor Synthetic créé avec votre test][3].

{{< img src="synthetics/guide/using-synthetic-metrics/metric-monitor.png" alt="Exemple de monitor de métrique permettant de recevoir une alerte lorsqu'un trop grand nombre de tests génèrent un échec en intégration continue" style="width:95%;" >}}

Les monitors de métrique peuvent être utilisés pour :

- Surveiller le temps de réponse total
- Analyser des mesures de temps HTTP précises telles que le DNS, la résolution DNS et la connexion TCP
- Accéder aux tags ajoutés aux métriques issues des tests Synthetic

Ce guide décrit la marche à suivre pour configurer un monitor de métrique avec une métrique générale telle que `synthetics.test_runs`. 

## Créer un monitor de métrique


{{< img src="synthetics/guide/using-synthetic-metrics/metric-monitor-setup.png" alt="Exemple de monitor de métrique permettant de recevoir une alerte lorsqu'un trop grand nombre de tests génèrent un échec en intégration continue" style="width:95%;" >}}

1. Pour créer un monitor de métrique, accédez à [Monitors > New Monitor][4] et sélectionnez **Metric**. 

2. Sélectionnez une méthode de détection pour personnaliser les conditions d'alerte de votre monitor. Par exemple, vous pouvez créer un monitor de métrique basé sur une alerte de seuil.

   Alerte de seuil
   : Une alerte se déclenche chaque fois qu'une métrique dépasse un certain seuil.

   Alerte de changement
   : Une alerte se déclenche lorsque le delta entre des valeurs est plus élevé que le seuil.

   Détection d'anomalies
   : Une alerte se déclenche chaque fois qu'une métrique dévie d'un pattern attendu.

   Alerte en cas de singularité
   : Une alerte se déclenche lorsqu'un membre d'un groupe se comporte différemment de ses pairs.

   Alerte de prévision
   : Une alerte se déclenche lorsque Datadog prédit qu'une métrique s'apprête à franchir un seuil.

3. Dans la section **Define the metric**, saisissez une métrique de surveillance Synthetic telle que `synthetics.test_runs`. Vous pourrez ensuite appliquer un filtre en fonction du statut, des codes de réponse ou du comportement à adopter pour les nouvelles tentatives.

4. Définissez les conditions d'alerte et ajoutez un message de notification.

5. Définissez les autorisations de modification, puis cliquez sur **Create**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/metrics/
[2]: /fr/monitors/types/metric/
[3]: /fr/synthetics/guide/synthetic-test-monitors/
[4]: https://app.datadoghq.com/monitors/create/metric