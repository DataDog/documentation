---
description: Apprenez à tirer parti des fonctionnalités de la plateforme Datadog pour
  optimiser les capacités de Synthetic Monitoring.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentation
  text: Découvrez le Synthetics Monitoring & Testing Results Explorer
title: Plateforme
---
## Présentation {#overview}

Une fois que vous avez commencé à collecter des données pour vos tests Synthetic, vous pouvez tirer parti des fonctionnalités de la plateforme Datadog pour visualiser, surveiller et analyser les données issues de Synthetic Testing et Synthetic Monitoring, ainsi que du reste de votre pile connectée. 

## Créer et afficher des dashboards {#create-and-view-dashboards}
Utilisez les [dashboards][1] pour suivre, analyser et afficher les métriques clés de performance et d'utilisation de vos tests Synthetic.

{{< img src="synthetics/platform/synthetics_dashboards_2.png" alt="Capture d'écran montrant la navigation supérieure de Synthetics avec les dashboards mis en évidence :" >}}

## Afficher les monitors {#view-monitors}
Affichez les [monitors][2] associés qui sont automatiquement créés à partir de vos tests Synthetic pour avertir vos équipes et gérer les alertes en un coup d'œil sur la plateforme Alerting.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Monitor de test Synthetic" style="width:100%;">}}

## Afficher les métriques {#view-metrics}
Affichez les [métriques][3] générées par les tests de Synthetic Monitoring et les paramètres de Continuous Testing.

## Explorer la couverture des tests {#explore-test-coverage}

Explorez la page [{{< ui >}}Test Coverage{{< /ui >}}][4] pour obtenir des informations sur la couverture globale des tests de vos applications RUM.

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Page Couverture des tests avec une section Vue d'ensemble, une section Actions non testées et une section Actions testées" style="width:100%" >}}

## Connectez les tests de Synthetic Monitoring et APM {#connect-synthetic-monitoring-testing-and-apm}
[Connect APM][5] pour identifier les tests Synthetic en échec et remonter jusqu'aux causes profondes en examinant les traces associées.

{{< img src="tracing/index/Synthetics.png" alt="Tests Synthetic" style="width:100%;">}}

## Connectez Synthetic Monitoring et RUM {#connect-synthetic-monitoring-and-rum}

[Connect RUM][6] pour afficher les données RUM, Session Replay et Error Tracking générées par vos exécutions de tests de navigateur Synthetic.

{{< img src="synthetics/guide/rum_in_synthetics/view_session_in_rum_2.png" alt="Une session RUM générée par une exécution de test de navigateur Synthetic, affichant les erreurs, les actions et les vues chargées." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/platform/dashboards
[2]: /fr/synthetics/guide/synthetic-test-monitors/
[3]: /fr/synthetics/platform/metrics
[4]: /fr/synthetics/platform/test_coverage
[5]: /fr/synthetics/platform/apm
[6]: /fr/synthetics/platform/rum