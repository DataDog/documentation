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
  text: Introduction à la surveillance des utilisateurs réels (RUM)
title: Session Replay
---
## Aperçu {#overview}

La lecture de session élargit votre surveillance de l'expérience utilisateur en vous permettant de capturer et de rejouer visuellement l'expérience de navigation web ou d'application mobile de vos utilisateurs. Session Replay est disponible à la fois dans [RUM][1] et [Product Analytics][2], vous aidant à identifier et reproduire des erreurs, à comprendre les parcours utilisateurs et à obtenir des informations sur les modèles d'utilisation et les défauts de conception de votre application.

## Lecture de session dans le navigateur {#browser-session-replay}

La lecture de session dans le navigateur élargit votre surveillance de l'expérience utilisateur en vous permettant de capturer et de rejouer visuellement l'expérience de navigation web de vos utilisateurs. Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs, et vous fournit des informations utiles sur les tendances d'utilisation et les défauts de conception de votre application Web.

Le SDK RUM pour navigateur est [open source][3] et s'appuie sur le projet open source [rrweb][4].

En savoir plus sur [Session Replay for Browsers][5].

## Mobile Session Replay {#mobile-session-replay}

Mobile Session Replay étend la visibilité de vos applications mobiles en vous permettant de rejouer visuellement chaque interaction utilisateur, telles que les taps, les swipes et les scrolls. Mobile Session Replay est disponible pour les applications natives sur Android et iOS. Rejouer visuellement les interactions des utilisateurs sur vos applications facilite la reproduction des bogues et des erreurs, ainsi que la compréhension du parcours utilisateur pour améliorer l'interface utilisateur.

En savoir plus sur [Session Replay for Mobile][6].

## Résumés alimentés par l'IA et chapitres intelligents {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre site <a href="/getting_started/site">Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

Les résumés et chapitres intelligents vous donnent un contexte sur ce qui s'est passé lors d'une session avant que vous ne la regardiez.

**Les résumés** décrivent l'intention de l'utilisateur, les actions clés, les signaux de friction et le résultat. Des moments spécifiques dans le résumé sont hyperliés afin que vous puissiez accéder directement à ce point dans Session Replay. Dans la liste des sessions, survolez un Session Replay pour prévisualiser le résumé, ou ouvrez-le directement. Si une session a déjà été résumée, le résumé s'affiche instantanément lorsque vous lancez Session Replay.

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="Résumé alimenté par l'IA dans le Session Replay player, montrant l'intention de l'utilisateur, les actions clés, les signaux de friction et les moments hyperliés." style="width:100%;" >}}

**Les chapitres intelligents** segmentent automatiquement la chronologie du Session Replay en étapes étiquetées du parcours utilisateur. Par exemple, dans une session de commerce électronique, les chapitres peuvent inclure "Parcourir l'éclairage", "Acheter de la literie et des chaises", et "Vérifier le panier et passer à la caisse". Les chapitres apparaissent lorsque vous survolez la chronologie et dans le menu déroulant des contrôles du lecteur, vous permettant de sauter directement entre eux.

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="Menu déroulant des chapitres intelligents dans le Session Replay player montrant les étapes étiquetées du parcours utilisateur." style="width:100%;" >}}

Les résumés IA et les chapitres intelligents sont générés pour les sessions comportant au moins quatre actions utilisateur et d'une durée d'au moins 45 secondes.

## Commentaires {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre site <a href="/getting_started/site">Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}). Si vous avez besoin de cette fonctionnalité, contactez <a href="/help/">le support Datadog</a>.</div>{{< /site-region >}}

Les commentaires Session Replay permettent à votre équipe de collaborer sur des bogues, des problèmes d'utilisabilité et d'autres observations directement au sein d'un Session Replay.

Avec les commentaires, vous pouvez :

- Ajouter un commentaire à un moment précis sur la chronologie du Session Replay. Les marqueurs de commentaire apparaissent sur la chronologie et dans l'onglet **Commentaires**.
- @mentionner un coéquipier ou une équipe dans un commentaire. Les utilisateurs tagués reçoivent une notification par e-mail avec un lien qui ouvre le Session Replay au moment commenté.
- Copier un lien vers n'importe quel commentaire et le partager à l'extérieur. Le lien ouvre le Session Replay au moment annoté, avec le fil de commentaire ouvert.
- Répondez dans le fil pour collaborer au sein d'un Session Replay, et modifiez ou supprimez vos propres commentaires si nécessaire.

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="Session Replay player avec des commentaires horodatés sur la chronologie et un onglet Commentaires ouvert avec des réponses en fil." style="width:100%;" >}}

Pour trouver les replays nécessitant votre attention, utilisez les playlists par défaut **All mentions to me** et **Commented replays**. Voir [Session Replay Playlists][7] pour plus de détails.

## Prolonger la conservation des données {#extend-data-retention}

Par défaut, les données Session Replay sont conservées pendant 30 jours.

Pour prolonger la conservation des données de Session Replay à 15 mois, activez _Extended Retention_ pour chaque Session Replay. Ces sessions doivent être non actives (l'utilisateur a terminé son expérience).

Pour accéder à un Session Replay ultérieurement, Datadog recommande de sauvegarder l'URL ou de l'ajouter à une [Playlist][7].

Extended Retention ne s'applique qu'à Session Replay et n'inclut pas les événements associés. Les 15 mois commencent dès l'activation de Extended Retention, et non au moment de la collecte de la session.

Vous pouvez désactiver Extended Retention à tout moment. Si Session Replay est toujours dans sa période de rétention par défaut de 30 jours, il expire à la fin de cette période. Si vous désactivez Extended Retention sur un Session Replay âgé de plus de 30 jours, il expire immédiatement.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Activer Extended Retention." style="width:100%;" >}}

Le diagramme ci-dessous décrit les types de données concernés par la rétention prolongée.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagramme des données conservées avec Extended Retention." style="width:100%;" >}}

## Historique de lecture {#playback-history}

Vous pouvez voir qui a regardé un replay de session donné en cliquant sur le **nombre de vues** affiché sur la page du lecteur. Cette fonctionnalité vous permet de vérifier si quelqu'un avec qui vous souhaitez partager l'enregistrement l'a déjà regardé.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Vérifiez qui a regardé l'enregistrement d'une session" style="width:100%;" >}}

L'historique inclut uniquement les lectures ayant eu lieu sur la page du lecteur ou dans un lecteur intégré, tel qu'un [Notebook][8] ou un panneau latéral. Les lectures incluses génèrent également un événement [Audit Trail][9]. Les aperçus en miniature ne sont pas inclus dans l'historique.

Pour consulter votre propre historique de lecture, consultez la playlist [My Watch History][10].

## Playlists {#playlists}

Vous pouvez créer une playlist de Session Replays afin de les organiser selon les motifs que vous identifiez. En savoir plus sur [Session Replay Playlists][7].

## Dev Tools {#dev-tools}

Dev Tools est un panneau de débogage intégré dans Session Replay qui présente des informations clés pendant la lecture. Utilisez-le pour identifier des problèmes, tracer des requêtes et comprendre les goulets d’étranglement de performance, le tout sans reproduire vous-même le problème. L’Outil de développement est disponible pour les sessions [RUM][1].

En savoir plus sur Dev Tools pour [browser][11] et [mobile][12].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/
[2]: /fr/product_analytics/
[3]: https://github.com/DataDog/browser-sdk
[4]: https://www.rrweb.io/
[5]: /fr/session_replay/browser/
[6]: /fr/session_replay/mobile/
[7]: /fr/session_replay/playlists
[8]: /fr/notebooks/
[9]: /fr/account_management/audit_trail/
[10]: /fr/rum/replay/playlists/my-watch-history
[11]: /fr/session_replay/browser/dev_tools/
[12]: /fr/session_replay/mobile/dev_tools/