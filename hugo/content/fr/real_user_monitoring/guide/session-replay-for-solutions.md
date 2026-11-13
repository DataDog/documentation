---
description: Apprenez à adopter RUM et Session Replay dans votre organisation Solutions
  ou Support.
further_reading:
- link: /real_user_monitoring/correlate_with_other_telemetry/apm/
  tag: Documentation
  text: Apprenez à connecter RUM avec les traces APM.
- link: /session_replay/
  tag: Documentation
  text: En savoir plus sur Session Replay
- link: /session_replay/dev_tools
  tag: Documentation
  text: Découvrez les outils de développement du navigateur
title: Intégrer Session Replay à vos workflows d'assistance
---
## Présentation {#overview}

Vous pouvez permettre à vos équipes de solutions techniques et de support de mieux résoudre les problèmes des clients en utilisant [Session Replay][1]. Avec RUM et Session Replay, vous pouvez localiser des sessions utilisateur spécifiques, observer les parcours utilisateur et accéder aux outils de développement pour voir les événements, les logs, les erreurs et les attributs. 

Ce guide décrit un workflow que les organisations peuvent reproduire et utiliser comme atout pour que leurs équipes de solutions techniques l'intègrent dans leurs processus.

{{< img src="real_user_monitoring/guide/session-replay/session-replay-recording.png" alt="Enregistrement d'une session utilisateur avec Session Replay dans l'application Shopist" style="width:100%;">}}

## Évaluez les problèmes utilisateur {#assess-user-issues}

Supposons qu'un client rencontre un problème en utilisant Datadog. Votre équipe de solutions techniques peut utiliser une solution de support, telle que Zendesk ou ServiceNow, qui crée un ticket lorsque ce client signale qu'il ne peut pas mettre à jour ou enregistrer un test API à plusieurs étapes Synthetics. 

L'équipe peut demander plus d'informations au client (telles que l'ID spécifique du test et un enregistrement d'écran avec les [Browser Dev Tools][2] ouverts) qui pourraient fournir un contexte supplémentaire sur le fait que le test du client ne se met pas à jour ou ne s'enregistre pas. Si aucune erreur de console n'a été enregistrée, l'équipe n'aurait aucun indice pour commencer à enquêter sur le problème du test API à plusieurs étapes. 

L'équipe de solutions techniques peut essayer de comprendre les questions suivantes :

- Quelle est l'erreur exacte que rencontre le client ?
- Le client voit-il une notification dans l'application qui indique un problème particulier (tel qu'une erreur de console ou un message d'erreur) ?
- Sur quels boutons le client a-t-il cliqué, et dans quel ordre ? Une action inattendue s'est-elle produite avant que le client ne clique sur un bouton ?

## Rechercher la cause première {#investigate-the-root-cause}

S'il existait un moyen de visualiser le parcours utilisateur du client dans Datadog et de voir les requêtes backend associées, l'équipe de solutions techniques aurait une meilleure compréhension de ce qui pourrait causer ce problème.

{{< img src="real_user_monitoring/guide/session-replay/apm-traces-in-session-replay.png" alt="Une trace de pile APM associée à une action de vue RUM" style="width:100%;">}}

Grâce à l'intégration APM, vous pouvez connecter les requêtes de votre application web aux traces backend correspondantes pour accéder aux données de trace APM à partir d'un événement RUM et découvrir toute erreur backend dans l'onglet {{< ui >}}Errors{{< /ui >}}. 

Pour plus d'informations, consultez [Connecter RUM et les traces][3].

## Regardez les sessions utilisateur dans Session Replay {#watch-user-sessions-in-session-replay}

L'équipe de solutions techniques peut disposer d'outils internes qui connectent une plateforme de support, comme Zendesk, aux produits Datadog, tels que RUM & Session Replay. Par exemple, un lien contextuel dans Zendesk peut vous rediriger vers l'[Explorer RUM][4] et remplir automatiquement l'ID utilisateur dans la requête de recherche. Filtrez les sessions utilisateur individuelles à partir de la liste des événements.

L'équipe de solutions techniques peut utiliser Session Replay pour voir une réplique du parcours utilisateur dans Datadog et utiliser les outils de développement du navigateur pour accéder aux erreurs supplémentaires qui peuvent apparaître dans le frontend. Avec l'accès aux erreurs du frontend et aux traces backend, votre équipe de solutions techniques est en mesure d'utiliser l'intégration RUM & Session Replay et APM pour aider à résoudre les problèmes des clients.

Cliquez sur une session utilisateur avec un enregistrement de relecture pour observer le comportement de l'utilisateur sur la plateforme Datadog. En utilisant Session Replay, vous pouvez localiser les événements RUM correspondants et identifier l'action `click` spécifique pour enregistrer le test API à plusieurs étapes. Cliquer sur {{< ui >}}Save{{< /ui >}} dans l'interface utilisateur déclenche l'appel backend pour enregistrer la configuration du test.

## Découvrez les erreurs dans les traces backend {#uncover-errors-in-backend-traces}

Lors de l'examen des erreurs dans la trace APM des tests API à plusieurs étapes, l'équipe de solutions techniques peut rencontrer une `APIInvalidInputError` liée à la `maxLength` d'une configuration `​​https://properties.steps.items.properties.name/`, qui semble être la cause première de l'échec de l'enregistrement du test. 

{{< img src="real_user_monitoring/guide/session-replay/view-traces.png" alt="Une trace de pile APM associée à une action de vue RUM" style="width:100%;">}}

Le test API à plusieurs étapes ne s'est pas enregistré en raison d'une limite de caractères dans le nom de l'étape. 

## Résolvez les problèmes des utilisateurs {#resolve-user-problems}

Pour résoudre ce problème client, l'équipe de solutions techniques peut demander à l'équipe Produit de mettre à jour le workflow du test API à plusieurs étapes avec une aide contextuelle pour les cas où un test ne peut pas être enregistré. 

L'équipe Frontend peut également être encouragée à implémenter un message d'erreur dans l'interface utilisateur qui garantit que les utilisateurs sont avertis lorsqu'ils dépassent la limite maximale de caractères pour le nom de l'étape du test.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/session_replay/
[2]: /fr/session_replay/dev_tools
[3]: /fr/real_user_monitoring/connect_rum_and_traces
[4]: https://app.datadoghq.com/rum/explorer