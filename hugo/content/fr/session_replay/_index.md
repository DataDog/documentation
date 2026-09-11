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
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: /integrations/content_security_policy_logs
  tag: Documentation
  text: Détectez et agrégez les violations de CSP avec Datadog
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centre d'apprentissage
  text: Introduction au Real User Monitoring (« RUM »)
- link: https://www.datadoghq.com/blog/session-replay-custom-heatmap-backgrounds/
  tag: Blog
  text: Capturez et analysez des cartes thermiques personnalisées dans Session Replay
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: Blog
  text: Comprenez plus rapidement les Session Replays grâce aux résumés IA et aux
    chapitres intelligents
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliser Datadog Session Replay pour visualiser en temps réel les parcours
    utilisateur
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliser l'analyse de l'entonnoir pour comprendre et optimiser vos flux utilisateur
    clés
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Revoir les problèmes rencontrés par les utilisateurs avec Zendesk et Datadog
    Session Replay
- link: https://www.datadoghq.com/blog/session-replay-investigate-collaborate/
  tag: Blog
  text: Trouvez, analysez et collaborez sur les sessions utilisateur dans Datadog
    Session Replay
title: Session Replay
---
## Vue d'ensemble
 {#overview}

Session Replay étend votre surveillance de l'expérience utilisateur en vous permettant de capturer et de rejouer visuellement l'expérience de navigation web ou d'application mobile de vos utilisateurs. Session Replay est disponible à la fois dans [RUM][1] et [Product Analytics][2], vous aidant à identifier et reproduire les erreurs, à comprendre les parcours utilisateur et à obtenir des informations sur les modèles d'utilisation et les défauts de conception de votre application.

## Session Replay pour navigateur
 {#browser-session-replay}

Le Session Replay pour navigateur étend votre surveillance de l'expérience utilisateur en vous permettant de capturer et de rejouer visuellement l'expérience de navigation web de vos utilisateurs. Conjointement aux données de performance RUM, Session Replay facilite l'identification, la reproduction et la résolution des erreurs, et vous fournit des informations utiles sur les tendances d'utilisation et les défauts de conception de votre application Web.

Le SDK RUM pour navigateur est [open source][3] et s'appuie sur le projet open source [rrweb][4].

En savoir plus sur le [Session Replay pour navigateurs][5].

## Session Replay mobile
 {#mobile-session-replay}

Le Session Replay mobile étend la visibilité sur vos applications mobiles en rejouant visuellement chaque interaction utilisateur, comme les appuis, les balayages et les défilements. Il est disponible pour les applications natives sur Android et iOS. La relecture visuelle des interactions utilisateur sur vos applications facilite la reproduction des plantages et des erreurs, ainsi que la compréhension du parcours utilisateur pour apporter des améliorations à l'interface.

En savoir plus sur le [Session Replay pour mobile][6].

## Résumés optimisés par l'IA et chapitres intelligents
 {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog sélectionné</a> ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

Les résumés et les chapitres intelligents vous donnent du contexte sur ce qui s'est passé dans une session avant que vous ne la regardiez.

**Les résumés** décrivent l'intention de l'utilisateur, les actions clés, les signaux de friction et le résultat. Des moments spécifiques du résumé comportent un lien hypertexte afin que vous puissiez accéder directement à ce point dans la relecture. Dans la liste des sessions, survolez une relecture pour prévisualiser le résumé ou ouvrez la relecture directement. Si une session a déjà été résumée, le résumé s'affiche instantanément lorsque vous ouvrez la relecture.

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="Résumé optimisé par l'IA dans le lecteur Session Replay, affichant l'intention de l'utilisateur, les actions clés, les signaux de friction et les moments avec liens hypertextes" style="width:100%;" >}}

**Les chapitres intelligents** segmentent automatiquement la chronologie de la relecture en étapes étiquetées du parcours utilisateur. Par exemple, dans une session e-commerce, les chapitres peuvent inclure « Parcourir les luminaires », « Acheter de la literie et des chaises » et « Examiner le panier et passer à la caisse ». Les chapitres apparaissent lorsque vous survolez la chronologie et dans le menu déroulant des commandes du lecteur, vous permettant de passer directement de l'un à l'autre.

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="Menu déroulant des chapitres intelligents dans le lecteur Session Replay affichant les étapes étiquetées du parcours utilisateur" style="width:100%;" >}}

Les résumés IA et les chapitres intelligents sont générés pour les sessions comportant au moins quatre actions utilisateur et une durée d'au moins 45 secondes.

## Commentaires
 {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog sélectionné</a> ({{< region-param key="dd_site_name" >}}). Si vous avez besoin de cette fonctionnalité, contactez <a href="/help/">Datadog Support</a>.</div>{{< /site-region >}}

Les commentaires de Session Replay permettent à votre équipe de collaborer sur les bugs, les problèmes d'utilisabilité et d'autres observations directement dans une Session Replay.

Avec les commentaires, vous pouvez :

- Ajouter un commentaire à un horodatage spécifique sur la chronologie de Session Replay. Des marqueurs de commentaire apparaissent sur la chronologie et dans l'onglet {{< ui >}}Comments{{< /ui >}}.
- @mentionner un coéquipier ou une équipe dans un commentaire. Les utilisateurs mentionnés reçoivent une notification par e-mail contenant un lien qui ouvre la Session Replay à l'horodatage commenté.
- Copier un lien vers n'importe quel commentaire et le partager en externe. Le lien ouvre la Session Replay au moment annoté avec ce fil de discussion ouvert.
- Répondre dans le fil de discussion pour collaborer au sein d'une Session Replay, et modifier ou supprimer vos propres commentaires si nécessaire.

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="Lecteur de Session Replay avec des commentaires horodatés sur la chronologie et un onglet Commentaires ouvert avec des réponses en fil de discussion." style="width:100%;" >}}

Pour trouver les Session Replay qui nécessitent votre attention, utilisez les playlists par défaut {{< ui >}}All mentions to me{{< /ui >}} et {{< ui >}}Commented replays{{< /ui >}}. Voir [Session Replay Playlists][7] pour plus de détails.

## Étendre la rétention des données
 {#extend-data-retention}

Par défaut, les données Session Replay sont conservées pendant 30 jours. Pour définir la période de rétention par défaut de toutes les Session Replay à plus de 30 jours, contactez votre équipe de compte.

Pour étendre la rétention des données de Session Replay à 15 mois, vous pouvez activer {{< ui >}}Extended Retention{{< /ui >}} sur des Session Replay individuelles. Ces sessions doivent être inactives (l'utilisateur a terminé son expérience).

Pour accéder à n'importe quelle Session Replay ultérieurement, Datadog recommande d'enregistrer l'URL ou de l'ajouter à une [Playlist][7].

Datadog étend également automatiquement la rétention à 15 mois lorsqu'un Session Replay est utilisé ailleurs dans le produit :

- Ajout d'une Session Replay à une [Playlist][7].
- Enregistrement d'une Session Replay sous forme de capture d'écran de carte thermique. Voir [Analyse des cartes thermiques au-delà de la rétention des Session Replay][12].

La rétention étendue s'applique uniquement à Session Replay et n'inclut pas les événements associés. Les 15 mois commencent lorsque la rétention étendue est activée, et non lorsque la session est collectée.

Vous pouvez désactiver la rétention étendue à tout moment. Si la Session Replay est toujours dans sa période de rétention par défaut de 30 jours, la Session Replay expire à la fin de la fenêtre initiale de 30 jours. Si vous désactivez la rétention étendue sur un Session Replay datant de plus de 30 jours, le Session Replay expire immédiatement.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Activer la rétention étendue" style="width:100%;" >}}

Le diagramme ci-dessous décrit les types de données concernés par la rétention prolongée.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagramme des données conservées avec la rétention étendue" style="width:100%;" >}}

## Historique de lecture
 {#playback-history}

Vous pouvez voir qui a regardé une relecture de session donnée en cliquant sur le nombre **regardé** affiché sur la page du lecteur. Cette fonctionnalité vous permet de vérifier si une personne avec qui vous souhaitez partager l'enregistrement l'a déjà regardé.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Vérifiez qui a regardé l'enregistrement d'une session" style="width:100%;" >}}

L'historique inclut uniquement les lectures qui ont eu lieu sur la page du lecteur ou dans un lecteur intégré, comme dans un [Notebook][8] ou un panneau latéral. Les lectures incluses génèrent également un événement [Audit Trail][9] . Les aperçus sous forme de vignettes ne sont pas inclus dans l'historique.

Pour afficher votre propre historique de lecture, consultez la liste de lecture [{{< ui >}}My Watch History{{< /ui >}}][10].

## Playlists
 {#playlists}

Vous pouvez créer une playlist de Session Replay pour les organiser selon les modèles que vous remarquez. En savoir plus sur [Session Replay Playlists][7].

## Dev Tools
 {#dev-tools}

Dev Tools est un panneau de débogage intégré à Session Replay qui expose des informations clés pendant la lecture. Utilisez-le pour identifier des problèmes, tracer des requêtes et comprendre les goulots d'étranglement de performance, le tout sans avoir à reproduire le problème vous-même. Les outils de développement sont disponibles pour les sessions [RUM][1].

En savoir plus sur [Dev Tools][11].

## Pour aller plus loin
 {#further-reading}

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

[11]: /fr/session_replay/dev_tools

[12]: /fr/session_replay/heatmaps/#analyzing-heatmaps-beyond-replay-retention