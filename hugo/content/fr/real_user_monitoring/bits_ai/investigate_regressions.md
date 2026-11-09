---
description: Lancez une Bits Investigation à partir d'une anomalie sur un graphique
  de métrique vitale, ou laissez Bits enquêter automatiquement sur les alertes de
  monitor RUM.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: Documentation
  text: Bits dans RUM
- link: /bits_ai/bits_investigation/investigate_issues/
  tag: Documentation
  text: Examinez les problèmes liés à Bits Investigation
- link: /monitors/types/real_user_monitoring/
  tag: Documentation
  text: Moniteurs RUM
title: Examinez les régressions et les alertes avec Bits AI
---
## Présentation {#overview}

Lorsqu'une métrique de performance se dégrade soudainement, vous pouvez trouver la cause première de deux manières :

- [Enquêter sur une anomalie](#investigate-an-anomaly-on-a-vital-chart) que RUM détecte sur un graphique de métrique vitale.
- [Activer les investigations automatiques](#automatically-investigate-rum-monitor-alerts) sur vos monitors RUM, afin que Bits commence à enquêter dès qu'un monitor émet une alerte.

## Enquêter sur une anomalie sur un graphique de métrique vitale {#investigate-an-anomaly-on-a-vital-chart}

RUM exécute la détection d'anomalies sur les graphiques des Core Web Vitals de la page de résumé RUM pour les applications de navigateur. Lorsqu'une métrique vitale se dégrade de manière inattendue, RUM met en évidence la plage temporelle de l'anomalie sur le graphique et affiche un bouton **Anomalie · Investiguer** en dessous.

{{< img src="real_user_monitoring/bits_ai/anomaly-investigate.png" alt="Un graphique First Contentful Paint avec une fenêtre anormale surlignée en rose et un bouton Anomalie · Investiguer sous le graphique." style="width:50%;" >}}

Pour lancer une investigation, cliquez sur **Anomalie · Investiguer**. Une Bits Investigation s'ouvre dans un nouvel onglet avec la métrique vitale, la requête et la vue actives, la période du graphique, ainsi que le début et la fin de l'anomalie. Bits compare la fenêtre anormale avec les périodes environnantes pour expliquer ce qui a changé, et quelles versions, pages ou segments d'utilisateurs ont été affectés.

**Remarque** : Seules les dégradations sont mises en évidence, comme une augmentation du Largest Contentful Paint ou du Cumulative Layout Shift. Les améliorations ne sont pas signalées comme des anomalies.

## Enquêtez automatiquement sur les alertes de monitor RUM{#automatically-investigate-rum-monitor-alerts}

Bits Investigation prend en charge les [monitors RUM][1]. Lorsque vous activez les enquêtes automatiques sur un monitor RUM, Bits lance une enquête à chaque fois que le monitor passe à l'état d'alerte, afin que la cause première et ses preuves soient prêtes lorsque votre ingénieur d'astreinte ouvre l'alerte.

Pour activer les investigations automatiques sur un monitor RUM :

1. Créez ou modifiez un [monitor RUM][2].
2. Sous **Configurer les notifications et les automatisations**, activez **Investiguer avec Bits** sur **Activé**.
3. Enregistrez le monitor.

{{< img src="real_user_monitoring/bits_ai/monitor-auto-investigate.png" alt="Le paramètre Investiguer avec Bits dans l'éditeur de monitor, basculé sur Activé pour investiguer automatiquement les alertes de monitor." style="width:100%;" >}}

Vous pouvez également démarrer une investigation manuellement à partir d'une alerte de monitor RUM individuelle. Pour tous les points d'entrée disponibles et les conditions qui déclenchent des investigations automatiques, consultez [Investiguer les problèmes][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /fr/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations