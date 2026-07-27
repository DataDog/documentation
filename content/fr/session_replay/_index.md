---
aliases:
- /fr/real_user_monitoring/guide/session-replay-getting-started/
- /fr/real_user_monitoring/session_replay/
- /fr/product_analytics/session_replay/
- /fr/real_user_monitoring/session_replay/developer_tools
- /fr/real_user_monitoring/session_replay/browser/developer_tools
- /fr/product_analytics/session_replay/browser/developer_tools
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
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centre d'apprentissage
  text: Introduction au Real User Monitoring (RUM)
title: Session Replay
---
## Présentation {#overview}

Le Session Replay étend votre surveillance de l'expérience utilisateur en vous permettant de capturer et de rejouer visuellement l'expérience de navigation web ou d'application mobile de vos utilisateurs. Le Session Replay est disponible à la fois dans [RUM][1] et [Product Analytics][2], vous aidant à identifier et à reproduire les erreurs, à comprendre les parcours utilisateur et à obtenir des informations sur les modèles d'utilisation et les défauts de conception de votre application.

## Browser Session Replay {#browser-session-replay}

Le Browser Session Replay étend votre surveillance de l'expérience utilisateur en vous permettant de capturer et de rejouer visuellement l'expérience de navigation web de vos utilisateurs. Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs, et vous fournit des informations utiles sur les tendances d'utilisation et les défauts de conception de votre application Web.

Le SDK RUM Browser est [open source][3] et s'appuie sur le projet open source [rrweb][4].

En savoir plus sur le [Session Replay for Browsers][5].

## Mobile Session Replay {#mobile-session-replay}

Le Mobile Session Replay étend la visibilité sur vos applications mobiles en rejouant visuellement chaque interaction utilisateur, telles que des tapotements, des balayages et des défilements. Il est disponible pour les applications natives sur Android et iOS. La relecture visuelle des interactions utilisateur sur vos applications facilite la reproduction des plantages et des erreurs, ainsi que la compréhension du parcours utilisateur pour apporter des améliorations à l'UI.

En savoir plus sur le [Session Replay for Mobile][6].

## Résumés optimisés par l'IA et chapitres intelligents\r {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

Les résumés et les chapitres intelligents vous donnent du contexte sur ce qui s'est passé dans une session avant que vous ne la regardiez.

**Les résumés** décrivent l'intention de l'utilisateur, les actions clés, les signaux de friction et le résultat. Des moments spécifiques du résumé sont hyperliés afin que vous puissiez accéder directement à ce point dans la relecture. Dans la liste des sessions, survolez une relecture pour prévisualiser le résumé, ou ouvrez directement la relecture. Si une session a déjà été résumée, le résumé s'affiche instantanément lorsque vous ouvrez la relecture.

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="Résumé optimisé par l'IA dans le lecteur Session Replay, affichant l'intention de l'utilisateur, les actions clés, les signaux de friction et les moments avec liens hypertextes" style="width:100%;" >}}

Les **Smart chapters** segmentent automatiquement la chronologie de la relecture en étapes étiquetées du parcours utilisateur. Par exemple, dans une session e-commerce, les chapitres peuvent inclure « Parcourir les luminaires », « Acheter de la literie et des chaises » et « Examiner le panier et payer ». Les chapitres apparaissent lorsque vous survolez la chronologie et dans le menu déroulant des commandes du lecteur, vous permettant de passer directement de l'un à l'autre.

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="Smart chapter dropdown dans le lecteur Session Replay affichant les étapes étiquetées du parcours utilisateur." style="width:100%;" >}}

Les AI summaries et les Smart chapters sont générés pour les sessions comportant au moins quatre actions utilisateur et une durée d'au moins 45 secondes.

## Commentaires\r {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}). Si vous avez besoin de cette fonctionnalité, contactez <a href="/help/">Datadog Support</a>.</div>{{< /site-region >}}

Les commentaires de Session Replay permettent à votre équipe de collaborer sur les bugs, les problèmes d'utilisabilité et d'autres observations directement au sein d'une relecture.

Grâce aux commentaires, vous pouvez :

- Ajouter un commentaire à un horodatage spécifique sur la chronologie de la relecture. Des marqueurs de commentaire apparaissent sur la chronologie et dans l'onglet {{< ui >}}Comments{{< /ui >}}.
- @mentionner un coéquipier ou une équipe dans un commentaire. Les utilisateurs tagués reçoivent une notification par e-mail contenant un lien qui ouvre la relecture à l'horodatage commenté.
- Copier un lien vers n'importe quel commentaire et le partager en externe. Le lien ouvre la relecture au moment annoté avec ce fil de discussion ouvert.
- Répondre dans le fil de discussion pour collaborer au sein d'une relecture, et modifier ou supprimer vos propres commentaires si nécessaire.

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="Lecteur Session Replay avec des commentaires horodatés sur la chronologie et un onglet Commentaires ouvert avec des réponses en fil de discussion." style="width:100%;" >}}

Pour trouver les replays qui nécessitent votre attention, utilisez les playlists {{< ui >}}All mentions to me{{< /ui >}} et {{< ui >}}Commented replays{{< /ui >}} par défaut. Consultez [Session Replay Playlists][7] pour plus de détails.

## Étendre la rétention des données\r {#extend-data-retention}

Par défaut, les données Session Replay sont conservées pendant 30 jours.

Pour étendre la rétention des données de Session Replay à 15 mois, vous pouvez activer {{< ui >}}Extended Retention{{< /ui >}} sur des replays de session individuels. Ces sessions doivent être inactives (l'utilisateur a terminé son expérience).

Pour accéder à tout Session Replay ultérieurement, Datadog recommande d'enregistrer l'URL ou de l'ajouter à une [Playlist][7].

La rétention étendue s'applique uniquement à Session Replay et n'inclut pas les événements associés. Les 15 mois commencent lorsque la rétention étendue est activée, et non lorsque la session est collectée.

Vous pouvez désactiver la rétention étendue à tout moment. Si le replay de session est toujours dans sa période de rétention par défaut de 30 jours, le replay expire à la fin de cette fenêtre initiale de 30 jours. Si vous désactivez la rétention étendue sur un replay de session vieux de plus de 30 jours, le replay expire immédiatement.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Activer la rétention étendue" style="width:100%;" >}}

Le diagramme ci-dessous décrit les types de données concernés par la rétention prolongée.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagramme des données conservées avec la rétention étendue" style="width:100%;" >}}

## Historique de lecture\r {#playback-history}

Vous pouvez voir qui a visionné un replay de session donné en cliquant sur le compteur **watched** affiché sur la page du lecteur. Cette fonctionnalité vous permet de vérifier si une personne avec qui vous souhaitez partager l'enregistrement l'a déjà visionné.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Vérifier qui a visionné l'enregistrement d'une session" style="width:100%;" >}}

L'historique inclut uniquement les lectures effectuées sur la page du lecteur ou dans un lecteur intégré, comme dans un [Notebook][8] ou un panneau latéral. Les lectures incluses génèrent également un événement [Audit Trail][9]. Les aperçus sous forme de vignettes ne sont pas inclus dans l'historique.

Pour consulter votre propre historique de lecture, consultez la playlist [{{< ui >}}My Watch History{{< /ui >}}][10].

## Playlists\r {#playlists}

Vous pouvez créer une playlist de Session Replays pour les organiser selon les modèles que vous remarquez. En savoir plus sur [Session Replay Playlists][7].

## Dev Tools {#dev-tools}

Dev Tools est un panneau de débogage intégré à Session Replay qui expose des informations clés pendant la lecture. Utilisez-le pour identifier des problèmes, suivre des requêtes et comprendre les goulots d'étranglement de performances, le tout sans avoir à reproduire le problème vous-même. Les Outils de développement sont disponibles pour les sessions [RUM][1].

En savoir plus sur Dev Tools pour [browser][11] et [mobile][12].

## Lectures complémentaires\r {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/\r
[2]: /fr/product_analytics/\r
[3]: https://github.com/DataDog/browser-sdk\r
[4]: https://www.rrweb.io/\r
[5]: /fr/session_replay/browser/\r
[6]: /fr/session_replay/mobile/\r
[7]: /fr/session_replay/playlists\r
[8]: /fr/notebooks/\r
[9]: /fr/account_management/audit_trail/\r
[10]: /fr/rum/replay/playlists/my-watch-history\r
[11]: /fr/session_replay/browser/dev_tools/\r
[12]: /fr/session_replay/mobile/dev_tools/