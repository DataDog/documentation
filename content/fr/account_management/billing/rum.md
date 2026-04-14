---
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: En savoir plus sur RUM et Session Replay
title: Facturation de RUM et Session Replay
---

## Présentation

Cette page répond aux questions fréquemment posées sur la facturation des solutions RUM et Session Replay.

## Comment est définie une session ?

Une session correspond à une visite de votre application Web ou mobile par un utilisateur. Elle inclut généralement plusieurs consultations de pages et les données de télémétrie associées.

## Quel est le délai d'expiration d'une session ?

Une session expire au bout de 15 minutes d'inactivité, et est limitée à 4 heures au total. Au bout de 4 heures, une nouvelle session est automatiquement créée.

## Quelle est la durée des enregistrements de Session Replay ?

Les enregistrements Session Replay peuvent varier en fonction de la durée de la session. Par exemple, si vous observez des Session Replays courts de 5 à 8 secondes, cela signifie que l'utilisateur a terminé sa session après 5 à 8 secondes.

## Quelles sont les données recueillies par les solutions RUM et Session Replay de Datadog ?

Datadog recueille toutes les pages visitées par vos utilisateurs finaux ainsi que les données de télémétrie pertinentes, telles que le chargement des ressources (XHR, images, fichiers CSS et scripts JS), les erreurs frontend, les rapports de crash et les tâches longues. Toutes ces données sont incluses dans les sessions utilisateur. Pour la solution Session Replay, Datadog crée un iframe basé sur les snapshots du DOM. La facturation est calculée en fonction du nombre de milliers de sessions ingérées par le service Real User Monitoring (RUM) Datadog.

## Les applications monopages sont-elles prises en charge ?

Oui, et aucune configuration n'est nécessaire de votre côté. Le service RUM de Datadog effectue automatiquement le suivi des modifications de la page.

## Comment faire pour consulter les requêtes d'endpoint de bout en bout ?

Grâce à l'intégration APM prête à l'emploi, vous pouvez lier n'importe quelle requête XHR ou Fetch à sa trace backend correspondante.

## Comment faire pour consulter les logs du collecteur de logs de navigateur dans l'interface RUM ?

Les logs de navigateur sont automatiquement liés à la session RUM correspondante, ce qui vous permet d'identifier à quelle étape du parcours utilisateur ils ont été recueillis.

## Est-ce que Datadog recueille des cookies ?

Oui. Datadog utilise des cookies pour relier les différentes actions effectuées par vos utilisateurs au cours d'une session. Ce processus n'implique aucun transfert de cookies d'un domaine à un autre et n'effectue pas le suivi des actions de vos utilisateurs en dehors de vos applications.

## Ma page Usage affiche les sessions RUM facturées dans le cadre de l'abonnement aux solutions Browser RUM et Session Replay, alors que je n'ai pas configuré la capture des enregistrements de session de mon application.

L'abonnement aux solutions **Browser RUM et Session Replay** vous permet d'utiliser les enregistrements de session (replays).

- Si vous recueillez des replays, vos sessions seront facturées dans le cadre de l'abonnement Replay.

- Pour désactiver la capture des enregistrements de session, consultez la [documentation relative à Session Replay][1].

## Quel est l'impact des webviews dans les applications mobiles sur les enregistrements de session et la facturation ?

Lorsqu'une application mobile contient des webviews et que vous avez instrumenté à la fois vos applications web et mobiles avec les SDK Datadog, un pont est créé. Tous les événements enregistrés par le SDK Browser sur l'application web chargée via la webview sont transmis au SDK Mobile. Ces événements sont associés à la session démarrée sur l'application mobile.

En d'autres termes, seule la session mobile du RUM est visible sur Datadog et c'est donc la seule qui soit facturable.

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="Si vous avez instrumenté vos applications web et mobiles avec les SDK Datadog, seule la session mobile est facturée." >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/session_replay/browser#disable-session-replay