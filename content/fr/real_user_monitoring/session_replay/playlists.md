---
aliases: null
description: Découvrez comment créer et utiliser les playlists pour organiser vos
  Session Replays.
further_reading:
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
- link: https://www.datadoghq.com/blog/datadog-rum-session-replay-playlists/
  tag: Blog
  text: Organiser et analyser les Session Replays connexes grâce aux playlists dans
    Datadog RUM
title: Playlists Session Replay
---

## Présentation

Les playlists sont des collections de Session Replays que vous pouvez agréger au sein d'une structure semblable à un dossier. Vous pouvez utiliser les playlists pour :

- organiser les patterns identifiés dans des Session Replays spécifiques et leur appliquer une étiquette ;
- comprendre la nature de chaque regroupement d'un simple coup d'oeil ;
- gagner du temps lorsque vous recherchez des Session Replays spécifiques.

## Prise en main

Vous pouvez créer une playlist directement sur la [page Playlist][1] ou à partir d'un Session Replay individuel.

Pour la créer directement sur la **page Playlist** :

1. Dans Datadog, accédez à [**UX Monitoring > Session Replay > Playlists**][1].
2. Cliquez sur **New Playlist**.
3. Nommez votre playlist et ajoutez une description. Vous pouvez ensuite commencer à parcourir les Session Replays dans RUM et en ajouter à la playlist.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="Créer une playlist" style="width:60%;">}}

Pour la créer à partir d'un Session Replay individuel :

1. Ouvrez le Session Replay que vous souhaitez enregistrer.
2. Cliquez sur le bouton **Save to Playlist** en haut de la fenêtre.
3. Ajoutez l'enregistrement à une playlist existante ou créez-en une en suivant les étapes indiquées dans la vidéo ci-dessous.

   {{< img src="real_user_monitoring/session_replay/playlists/playlist-individual-session-replay.mp4" alt="Créer une playlist à partir de l'enregistrement individuel" video="true" width="90%" >}}

Si vous identifiez des comportements notables en visionnant un Session Replay, vous pouvez cliquer sur **Save to Playlist** pour créer une playlist ou ajouter ce replay spécifique à une playlist existante.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-build-new-playlist.mp4" alt="Créer une playlist" video="true" width="90%" >}}

## Cas d'utilisation

Votre équipe peut utiliser les playlists de différentes façons. Voici quelques idées pour vous lancer :

- Lorsque vous identifiez une erreur dans une session, vous pouvez localiser les autres sessions contenant ce pattern d'erreur et les regrouper.
- À mesure que vous mettez à jour votre interface utilisateur, vous pouvez créer des playlists regroupant les sessions lors desquelles des utilisateurs se sont perdus.
- Pour ajouter à vos favoris des groupes de sessions affichant un comportement unique, comme des clics frénétiques sur un bouton générateur de revenus, vous pouvez saisir une requête dans RUM et enregistrer toutes les sessions associées dans une playlist.

## Aide

### Une erreur s'affiche lors de l'enregistrement d'un Session Replay dans une playlist

Tous les Session Replay ajoutés aux playlists doivent être terminés. Pour trouver les replays pouvant être ajoutés à des playlists, copiez la requête ci-dessous et collez-la dans le RUM Explorer :

```@session.is_active:false @session.type:user @session.has_replay:true```

Cette requête permet de rechercher uniquement les sessions terminées auxquelles un replay est associé et comportant des interactions d'utilisateurs réels. Les sessions Synthetic sont exclues des résultats de la recherche.

### Une erreur s'affiche lors de la création d'une playlist
Vérifiez que votre rôle et les autorisations dont vous disposez vous permettent de créer une playlist. L'autorisation d'écriture de playlists vous permet d'effectuer les opérations suivantes :

- Créer une playlist.
- Modifier une playlist.
- Supprimer une playlist.
- Ajouter un Session Replay à une playlist.
- Supprimer un Session Replay d'une playlist.

Par ailleurs, l'autorisation de lecture de Session Replays vous permet d'effectuer les opérations suivantes :

- Consulter une playlist.
- Visualiser un Session Replay dans une playlist.

### Conserver des Session Replays dans une playlist au-delà de la période de rétention par défaut de 30 jours

Par défaut, la période de rétention des Session Replays est de 30 jours. L'option de [rétention prolongée][2] permet d'étendre la durée de conservation de certains Session Replays à 15 mois. Lorsqu'un Session Replay est ajouté à une playlist, cette option de rétention prolongée est automatiquement activée pour le replay en question. Vous pouvez à tout moment désactiver cette option pour n'importe quel replay individuel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /fr/real_user_monitoring/session_replay/#retention