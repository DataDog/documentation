---
aliases:
- /fr/real_user_monitoring/guide/session-replay-getting-started/
description: Découvrez comment enregistrer et examiner l'expérience de navigation
  ou dʼutilisation de lʼapp mobile faite par vos utilisateurs avec Session Replay.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliser la solution Session Replay de Datadog pour visualiser en temps réel
    les parcours utilisateur
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliser l'analyse de l'entonnoir pour comprendre et optimiser vos flux utilisateur
    clés
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Revoir les problèmes rencontrés par les utilisateurs avec Zendesk et Datadog
    Session Replay
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: /integrations/content_security_policy_logs
  tag: Documentation
  text: Détectez et agrégez les violations de CSP avec Datadog
title: Session Replay
---

## Présentation

Session Replay vient renforcer vos capacités de surveillance de l'expérience utilisateur en vous permettant d'enregistrer et de revoir l'expérience de navigation et dʼutilisation de lʼapp mobile de vos utilisateurs. Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs et vous fournit de précieuses données sur les tendances d'utilisation et les défauts de conception de votre application.

## Browser Session Replay

Browser Session Replay vient renforcer vos capacités de surveillance de l'expérience utilisateur en vous permettant d'enregistrer et de revoir l'expérience de navigation de vos utilisateurs. Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs et vous fournit de précieuses données sur les tendances d'utilisation et les défauts de conception de votre application Web.

Le SDK Browser est [open source][1]. Il tire profit du projet open source [rrweb][2].

En savoir plus sur [Session Replay pour les navigateurs][3].

## Session Replay sur mobile

Mobile Session Replay améliore la visibilité de vos applications mobiles en rejouant visuellement chaque interaction de l'utilisateur, comme les événements tactiles, les balayages et les défilements. Il est disponible pour les applications natives sur Android et iOS. En rejouant visuellement les interactions de l'utilisateur sur vos applications, il est plus facile de reproduire les pannes et les erreurs, ainsi que de comprendre le parcours de l'utilisateur afin d'apporter des améliorations à l'interface utilisateur.

En savoir plus sur [Session Replay pour les mobiles][3].

## Conservation des données

Par défaut, les données Session Replay sont conservées pendant 30 jours.

Pour prolonger la durée de rétention jusqu'à 15 mois, vous pouvez activer l'option _Extended Retention_ (rétention prolongée) sur des Sessions Replays spécifiques. Ces sessions doivent être inactives (l'utilisateur a terminé son expérience).

La rétention prolongée s'applique uniquement à Session Replay et n'inclut pas les événements associés. Les 15 mois commencent à l'activation de la rétention prolongée, et non à la collecte de la session.

Vous pouvez désactiver la rétention prolongée à tout moment. Si l'enregistrement Session Replay a été recueilli il y a moins de 30 jours, il expire à la fin de la fenêtre initiale de 30 jours. Si vous désactivez la rétention prolongée sur un enregistrement Session Replay de plus de 30 jours, celui-ci expire immédiatement.

{{< img src="real_user_monitoring/session_replay/session-replay-extended-retention.png" alt="Activer la rétention prolongée" style="width:100%;" >}}

Le diagramme ci-dessous décrit les données qui sont conservées pendant une durée prolongée.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention.png" alt="Diagramme des données conservées pendant une durée prolongée" style="width:100%;" >}}

## Historique de lecture

Vous pouvez voir qui a regardé l'enregistrement d'une session donnée en cliquant sur le compte **watched** affiché sur la page du lecteur. Cette fonction vous permet de vérifier si une personne avec laquelle vous souhaitez partager l'enregistrement l'a déjà regardé.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Vérifier qui a regardé lʼenregistrement dʼune session" style="width:100%;" >}}

L'historique ne comprend que les lectures qui ont eu lieu dans la page du lecteur ou dans un lecteur intégré, comme dans un [notebook][5] ou un volet latéral. Les lectures incluses génèrent également un événement de [piste d'audit][6]. Les aperçus de vignettes ne sont pas inclus dans l'historique.

Pour afficher votre propre historique de lecture, consultez la playlist [My Watch History][7].

## Playlists

Vous pouvez créer une liste de Session Replays pour les organiser selon les modèles que vous remarquez. En savoir plus sur les [Playlists de Session Replay][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: /fr/real_user_monitoring/session_replay/browser/
[4]: /fr/real_user_monitoring/session_replay/mobile/
[5]: https://docs.datadoghq.com/fr/notebooks/
[6]: https://docs.datadoghq.com/fr/account_management/audit_trail/
[7]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
[8]: /fr/real_user_monitoring/session_replay/playlists