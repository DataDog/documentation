---
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: En savoir plus sur RUM et Session Replay
title: Facturation de RUM et Session Replay
---
## Présentation {#overview}

Cette page répond aux questions fréquemment posées sur la facturation des solutions RUM et Session Replay.

## Comment une session est-elle définie ? {#how-is-a-session-defined}

Une session est un parcours utilisateur sur votre application web ou mobile. Une session inclut généralement plusieurs vues de page avec leur télémétrie associée.

## Quand une session expire-t-elle ? {#when-does-a-session-expire}

Une session expire après 15 minutes d'inactivité, et sa durée est limitée à 4 heures. Après 4 heures, une nouvelle session est automatiquement créée.

## Quelle est la durée des enregistrements Session Replay ? {#how-long-are-session-replay-recordings}

Les enregistrements Session Replay peuvent varier en fonction de la durée de la session. Par exemple, si vous observez des Session Replays courts de 5 à 8 secondes, cela signifie que l'utilisateur a terminé sa session après 5 à 8 secondes.

## Quelles données Datadog RUM & Session Replay collecte-t-il ? {#what-data-does-datadog-rum-session-replay-collect}

Datadog collecte toutes les pages visitées par vos utilisateurs finaux ainsi que la télémétrie pertinente, telle que le chargement des ressources (XHR, images, fichiers CSS et scripts JS), les erreurs frontend, les rapports de crash et les tâches longues. Tout cela est inclus dans la session utilisateur. Pour Session Replay, Datadog crée une iframe basée sur des instantanés du DOM. Datadog facture par millier (1 000) de sessions ingérées dans le service Datadog Real User Monitoring (RUM).

## Datadog prend-il en charge les applications monopages ? {#does-datadog-handle-single-page-applications}

Oui, sans aucune configuration de votre part. Datadog RUM suit automatiquement les changements de page.

## Comment visualiser les requêtes d'endpoint de bout en bout ? {#how-do-you-view-endpoint-requests-end-to-end}

Grâce à l'intégration APM prête à l'emploi, vous pouvez lier n'importe quelle requête XHR ou Fetch à sa trace backend correspondante.

## Comment visualiser les logs du collecteur de navigateur dans RUM ? {#how-do-you-view-logs-from-the-browser-collector-in-rum}

Les logs de navigateur sont automatiquement liés à la session RUM correspondante, ce qui vous permet de surveiller à quelle étape du parcours utilisateur ils sont recueillis.

## Datadog utilise-t-il des cookies ? {#does-datadog-use-cookies}

Oui. Datadog utilise des cookies pour assembler les différentes étapes de vos utilisateurs en une session. Ce processus n'utilise pas de cookies inter-domaines et ne suit pas les actions de vos utilisateurs en dehors de vos applications.

## Ma page Utilisation affiche des sessions RUM facturées dans le cadre du plan Browser RUM & Session Replay, mais je n'ai pas configuré la capture d'enregistrements de session pour mon application. {#my-usage-page-shows-rum-sessions-billed-under-the-browser-rum-session-replay-plan-but-i-have-not-configured-capturing-session-recordings-for-my-application}

Le plan **Browser RUM & Session Replay** débloque les enregistrements de session (replays).

- Si vous collectez des replays, vous êtes facturé pour les sessions dans le cadre du plan Replay.

- Si vous souhaitez désactiver la capture des enregistrements de session, consultez la [documentation Session Replay][1].

## Comment les webviews dans les applications mobiles impactent-elles les enregistrements de session et la facturation ? {#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing}

Lorsqu'une application mobile contient des webviews et que vous avez instrumenté vos applications web et mobiles avec les SDK Datadog, un pont est créé. Tous les événements enregistrés par le SDK Browser sur l'application web qui sont chargés via la webview sont transférés au SDK Mobile. Ces événements sont liés à la session qui a démarré sur l'application mobile.

En d'autres termes, seule la session mobile RUM est visible dans Datadog et est donc la seule à être facturable.

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="Si vous avez instrumenté vos applications web et mobiles avec les SDK Datadog, vous n'êtes facturé que pour la session mobile." >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/session_replay/