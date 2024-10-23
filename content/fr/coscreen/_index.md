---
further_reading:
- link: https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/
  tag: GitHub
  text: Tirez parti du partage d'écran collaboratif avec Datadog CoScreen
title: CoScreen
---

{{< img src="coscreen/collab-v2.mp4" alt="Trois utilisateurs partageant trois fenêtres simultanément." width=80% video="true">}}

## Présentation
[CoScreen][1] est un outil collaboratif pour les réunions qui permet à plusieurs participants de partager simultanément n'importe quelle fenêtre d'application sur leur bureau et d'interagir avec. Conçu spécialement pour les ingénieurs, cet outil est particulièrement utile pour la programmation en binôme, la gestion des incidents, la résolution de problèmes à plusieurs, les réunions d'équipe ainsi que l'intégration de nouveaux employés.

## Configuration
#### Prérequis
CoScreen est une application de bureau disponible sous Windows 10 et macOS Catalina 10.15 ou ultérieur.

[Téléchargez CoScreen][2].

Une fois que vous avez installé CoScreen, lancez l'application de bureau et créez votre compte.

### Rejoindre votre première session CoScreen

Cliquez sur **New CoScreen** pour créer une session CoScreen. Si vous avez été invité à rejoindre une session CoScreen, cliquez sur le lien ou sur **Join a CoScreen**, puis collez l'ID ou l'URL CoScreen.

Si vous rejoignez une session CoScreen, celle-ci est ajoutée à votre liste _Recent CoScreens_ dans le menu principal. Vous pouvez rejoindre une session depuis cette liste à tout moment.

### Inviter vos collaborateurs

Partagez un lien pour inviter des collaborateurs.

Vous pouvez également ajouter vos proches collaborateurs à la liste _Your Collaborators_ dans le menu principal. Une fois qu'un collaborateur accepte votre invitation, vous pouvez consulter son statut et, s'il est disponible, l'appeler d'un simple clic.

### Partager des fenêtres

Vous pouvez partager des fenêtres d'application de différentes façons.

 - **Sélectionner des fenêtres individuelles à partager**

   {{< img src="coscreen/sharewindow.mp4" alt="Un bouton 'Share window' en forme d'onglet est affiché au-dessus d'une fenêtre. La fenêtre est surlignée en violet lorsque l'utilisateur clique sur ce bouton, et ce dernier affiche désormais la mention 'Unshare window.'" width=50% video="true">}}

Partagez des fenêtres et annulez le partage en cliquant sur l'onglet situé au-dessus de chaque fenêtre. Vous pouvez également utiliser la boîte de dialogue de partage de fenêtre pour sélectionner la ou les fenêtres d'application à partager avec les autres membres de la session CoScreen que vous avez rejointe.

 Plusieurs utilisateurs peuvent partager plusieurs fenêtres simultanément. Chaque membre de la session CoScreen se voit attribuer une couleur spécifique qui sera appliquée aux bordures des fenêtres qu'il partage.

 - **Partager toutes les fenêtres figurant sur votre écran**

Ouvrez la boîte de dialogue de partage de fenêtre et sélectionnez la première option (_Entire display_) afin de partager toutes les fenêtres ouvertes sur votre écran. Toutes les fenêtres que vous ouvrez sur cet écran ou faites glisser vers celui-ci sont partagées tant que le partage d'écran est activé.

Cliquez sur le bouton **Share windows** pour ouvrir la boîte de dialogue de partage de fenêtre.

{{< img src="coscreen/share_windows_button.png" alt="Une série de boutons issus de l'IU de l'application de bureau CoScreen. Le bouton 'Share windows' est surligné." style="width:50%;">}}

Par défaut, lorsque vous rejoignez une session CoScreen, la boîte de dialogue suivante s'affiche :

{{< img src="coscreen/share_windows.png" alt="La boîte de dialogue de partage de fenêtre. Les utilisateurs sont invités à choisir un écran, puis à sélectionner une ou plusieurs fenêtres à partager." style="width:60%;">}}

Si vous possédez plusieurs écrans, choisissez celui contenant la ou les fenêtres que vous souhaitez partager.


Par défaut, le partage d'écran est désactivé lorsque vous rejoignez une session CoScreen.

### Collaborer sur des fenêtres partagées

{{< img src="coscreen/collaborate-v2.mp4" alt="Deux curseurs interagissent simultanément avec une fenêtre partagée." video="true" width=70% >}}

Vous pouvez voir les curseurs des participants lorsqu'ils les déplacent sur une fenêtre partagée. **Tout le monde peut cliquer sur un élément de la fenêtre partagée ou y saisir quelque chose**. Si vous cliquez sur le bouton _Draw_ de l'onglet d'une fenêtre partagée, vous pouvez également dessiner directement sur la fenêtre partagée.

### Intégrations

Vous pouvez intégrer CoScreen à Slack, Google Agenda, VS Code et d'autres applications. [Découvrez toutes les intégrations CoScreen.][3]

#### CoScreen  + Slack

Pour installer l'app CoScreen pour Slack, rendez-vous sur [coscreen.co/slack][4] et cliquez sur _Add to Slack_. Pour activer CoScreen dans les canaux privés, saisissez `@coscreen` et appuyez sur entrée/retour, puis cliquez sur _Invite to Channel_. Pour activer CoScreen dans les conversations à plusieurs, accédez à _View Member List_ -> _Add People_ -> _CoScreen_.

#### CoScreen + Google Agenda

Pour configurer cette intégration, installez l'[extension CoScreen pour Chrome][5], puis connectez-vous. Ouvrez n'importe quel événement Google Agenda, puis cliquez sur le bouton **Add CoScreen** pour convertir l'événement en réunion CoScreen.

## Sécurité et confidentialité

 - **Sécurité réseau**

CoScreen utilise une connexion de pair à pair (P2P) chaque fois qu'une connexion directe peut être établie entre vous et un autre participant (lorsqu'il n'y a aucun pare-feu ou proxy d'entreprise entre vous deux, par exemple). Aucun de vos flux audio, vidéo, de fenêtre ou de saisie de commande ne transite par les serveurs de CoScreen. Les connexions sont chiffrées de bout en bout à l'aide du protocole DTLS-SRTP. Si au moins trois membres participent à une session, la connexion est établie via un pont vidéo.

 - **Infrastructure vidéo**

Les participants collaborent au moyen d'une infrastructure vidéo professionnelle et compatible HIPPA comprenant des centaines de serveurs qui exécutent le framework Jitsi. Toutes les données vidéo sont chiffrées via le protocole DTLS-SRTP pendant leur transfert.


 - **Stockage des données**

CoScreen n'enregistre ni ne conserve les informations partagées (les fenêtres partagées, le contenu audio et vidéo, ou les saisies de commande à distance, par exemple).

CoScreen recueille des données d'utilisation générale, telles que les fonctionnalités d'application utilisées et les statistiques des sessions, pour détecter les bugs et les tendances d'utilisation. CoScreen n'enregistre jamais les fenêtres ou saisies de commandes partagées et n'y accède jamais, sauf pour vous permettre d'échanger des commandes ainsi que le contenu des fenêtres avec vos collègues. Consultez la [Politique de confidentialité de CoScreen][6] pour en savoir plus.

Pour découvrir toutes les raisons pour lesquelles CoScreen permet une collaboration plus sécurisée, consultez le [livre blanc dédié à la sécurité de CoScreen][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://coscreen.co/
[2]: https://www.coscreen.co/download
[3]: https://www.coscreen.co/integrations
[4]: https://coscreen.co/slack
[5]: https://chrome.google.com/webstore/detail/coscreen/pahmjnapohdeedmdhmbeddgmhebhegme
[6]: https://www.datadoghq.com/legal/privacy/
[7]: https://www.coscreen.co/security