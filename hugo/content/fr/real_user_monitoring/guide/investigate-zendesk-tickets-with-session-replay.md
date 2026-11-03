---
description: Intégrez Session Replay à Zendesk pour aider les équipes de support à
  résoudre les problèmes des utilisateurs en visionnant les replays directement depuis
  les tickets.
title: Enquêtez sur les tickets Zendesk avec Session Replay
---
## Présentation {#overview}

Lors de la résolution de problèmes signalés par les utilisateurs dans les tickets Zendesk, les ingénieurs ont souvent du mal à comprendre le contexte dans lequel le problème est survenu. Grâce à l'intégration Zendesk et Session Replay, les équipes de support peuvent immédiatement reproduire le contexte de l'utilisateur à partir d'un ticket Zendesk en un seul clic. Cela permet aux équipes de support de résoudre les problèmes plus efficacement et réduit le temps nécessaire pour fournir des solutions aux clients.

Avec cette intégration, les ingénieurs support peuvent :
- Visionner un [Session Replay][3] des actions de l'utilisateur
- Examiner les appels backend associés
- Organiser les Session Replay associés dans une liste de lecture


## Configuration {#setup}

Pour configurer l'intégration Zendesk, complétez la section **Comment installer** de la [page Zendesk Marketplace pour Datadog RUM][2].

## Explorez un Session Replay depuis Zendesk {#explore-a-session-replay-from-zendesk}

Pour afficher les Session Replay associés à un ticket Zendesk :

1. Accédez au ticket dans Zendesk.
2. Cliquez sur l'icône Datadog dans la barre latérale droite pour afficher une liste de Session Replay.
3. Cliquez sur un Session Replay pour le visionner dans Datadog.

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Accéder à un Session Replay depuis Zendesk" video=true >}}

Depuis la page Session Replay, vous pouvez consulter la liste des actions de l'utilisateur, ainsi que les appels backend associés à chaque action. Survolez un événement et cliquez sur {{< ui >}}Details{{< /ui >}} pour afficher les traces, erreurs et autres informations associées.

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt="Vue au survol d'un événement de Session Replay avec le bouton Détails mis en évidence" style="width:60%;" >}}

Vous pouvez également ajouter le Session Replay à une liste de lecture pour regrouper les problèmes associés afin de faciliter la navigation et le partage. Pour plus d'informations, consultez la [documentation sur les listes de lecture Session Replay][4].

[1]: /fr/integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /fr/session_replay/
[4]: /fr/session_replay/playlists