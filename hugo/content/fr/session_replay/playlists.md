---
aliases:
- /fr/real_user_monitoring/session_replay/playlists
- /fr/product_analytics/session_replay/playlists
description: Découvrez comment créer et utiliser les playlists pour organiser vos
  Session Replays.
further_reading:
- link: /session_replay
  tag: Documentation
  text: Session Replay
- link: https://www.datadoghq.com/blog/datadog-rum-session-replay-playlists/
  tag: Blog
  text: Organisez et analysez les Session Replays associés à l'aide des Playlists
    dans Datadog
title: Playlists Session Replay
---
## Présentation {#overview}

Les playlists sont des collections de Session Replays que vous pouvez agréger dans une structure de type dossier. Vous pouvez utiliser les Playlists pour :

- Organisez les motifs observés dans des Session Replays spécifiques et étiquetez-les en conséquence
- Parcourez les Playlists et comprenez, en un coup d'œil, la nature de chaque groupe
- Gagnez du temps lors de la recherche de Session Replays spécifiques

## Mise en route {#getting-started}

Vous pouvez créer une playlist directement sur la [page Playlist][1] ou à partir d'un Session Replay individuel.

Si vous repérez des comportements notables après avoir visionné un Session Replay, vous pouvez cliquer sur {{< ui >}}Save to Playlist{{< /ui >}} pour créer une nouvelle Playlist ou ajouter ce Session Replay à une Playlist existante.

Pour la créer directement depuis le {{< ui >}}Playlist page{{< /ui >}} :

1. Dans Datadog, accédez à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1].
2. Cliquez sur {{< ui >}}New Playlist{{< /ui >}}.
3. Donnez un nom et une description à votre Playlist Vous pouvez ensuite commencer à explorer les Session Replays dans RUM pour les ajouter à votre Playlist

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="Créer une nouvelle Playlist" style="width:60%;">}}

Pour la créer à partir d'un Session Replay individuel :

1. Ouvrez le Session Replay que vous souhaitez enregistrer.
2. Cliquez sur le bouton {{< ui >}}Share{{< /ui >}} en haut, puis sélectionnez {{< ui >}}Save to Playlist{{< /ui >}}.

      {{< img src="real_user_monitoring/session_replay/playlists/share-playlist.png" alt="Créez une nouvelle Playlist à partir d'un Session Replay individuel" style="width:90%;">}}
3. Ajoutez le Session Replay à une Playlist existante ou créez-en une nouvelle.

## Playlists par défaut {#default-playlists}

Trois Playlists par défaut vous aident à examiner les Session Replays :

- {{< ui >}}My Watch History{{< /ui >}} : Session Replays que vous avez déjà visionnés.
- {{< ui >}}All mentions to me{{< /ui >}} : Session Replays dans lesquels un coéquipier vous a @mentionné dans un commentaire, afin que vous puissiez identifier les investigations nécessitant votre intervention.
- {{< ui >}}Commented replays{{< /ui >}} : Chaque Session Replay de votre organisation comportant au moins un commentaire, afin que vous puissiez examiner les sessions sur lesquelles vous ou votre équipe avez commenté.

Les trois Playlists sont disponibles sous [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1].

## Cas d'utilisation {#use-cases}

Votre équipe peut utiliser les Playlists de nombreuses manières différentes. Voici quelques idées pour commencer :

- Après avoir repéré une erreur dans un Session Replay, vous pouvez trouver d'autres sessions présentant ce schéma d'erreur et les regrouper.
- Au fur et à mesure de la mise à jour de votre interface utilisateur, vous pouvez créer des Playlists pour les Session Replays où les utilisateurs ont pu se perdre dans un nouveau flux.
- Pour mettre en favoris des groupes de Session Replays présentant un comportement unique, comme un rage click sur un bouton générant des revenus, vous pouvez rédiger une requête dans RUM et enregistrer tous les Session Replays correspondants dans une Playlist. 

## Dépannage {#troubleshooting}

### L'enregistrement d'un Session Replay dans une Playlist entraîne une erreur {#saving-a-session-replay-to-a-playlist-leads-to-an-error}

Tous les Session Replays dans les Playlists doivent être issus de sessions terminées. Pour trouver les Session Replays éligibles à l'ajout dans des Playlists, copiez et collez la requête ci-dessous dans le RUM Explorer :

```@session.is_active:false @session.type:user @session.has_replay:true```

Cette requête permet de rechercher uniquement les sessions terminées auxquelles un replay est associé et comportant des interactions d'utilisateurs réels. Les sessions Synthetic sont exclues des résultats de la recherche.

### La création d'une Playlist entraîne une erreur {#creating-a-playlist-leads-to-an-error}
Assurez-vous de disposer des rôles et des autorisations appropriés pour créer une Playlist. L'autorisation d'écriture sur les Playlists vous permet d'effectuer les actions suivantes :

- Créer une Playlist
- Modifier une Playlist
- Supprimer une Playlist
- Ajouter un Session Replay à une Playlist
- Supprimer un Session Replay d'une Playlist

Par ailleurs, l'autorisation de lecture de Session Replay vous permet d'effectuer les opérations suivantes :

- Afficher une Playlist
- Voir un Session Replay dans une Playlist

### Conserver des Session Replays dans une Playlist au-delà de la période de rétention par défaut de 30 jours de Session Replay {#keeping-replays-in-a-playlist-for-longer-than-the-default-30-day-session-replay-retention-period}

Par défaut, la rétention de Session Replay est de 30 jours. Avec la [rétention étendue][2], vous avez la possibilité de prolonger la rétention de Session Replays individuels jusqu'à 15 mois. L'ajout d'un Session Replay à une Playlist prolonge automatiquement la rétention de ce replay, à condition que vous disposiez de la `rum_extend_retention` [permission][3]. Sans cette permission, l'ajout d'un Session Replay à une Playlist ne prolonge pas sa rétention. Vous pouvez révoquer la rétention étendue sur un Session Replay individuel à tout moment.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /fr/session_replay/#retention
[3]: /fr/account_management/guide/secure-configuration/#synthetic-monitoring-and-rum