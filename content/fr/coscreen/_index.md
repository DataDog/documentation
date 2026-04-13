---
cascade:
  algolia:
    rank: 70
description: Utilisez CoScreen pour les réunions collaboratives et le partage d'écran.
  CoScreen est conçu pour les cas d'usage d'ingénierie comme la programmation en binôme
  et la gestion des incidents.
further_reading:
- link: https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/
  tag: GitHub
  text: Tirez parti du partage d'écran collaboratif avec Datadog CoScreen
title: CoScreen
---

{{< img src="coscreen/collab-v2.mp4" alt="Trois utilisateurs partageant trois fenêtres simultanément." width=80% video="true">}}

## Présentation
[CoScreen][1] est un outil de réunion collaboratif qui permet à plusieurs participants de partager simultanément n'importe quelle fenêtre d'application sur leur bureau et d'interagir avec. Conçu spécialement pour les ingénieurs, cet outil est particulièrement utile pour la programmation en binôme, la gestion des incidents, la résolution de problèmes à plusieurs, les réunions d'équipe ainsi que l'intégration de nouveaux employés.

## Configuration
#### Prérequis
{{< tabs >}}
{{% tab "Bureau" %}}
L'application de bureau CoScreen est disponible sous Windows 10+ et macOS v.10.15+ (Catalina).

[Téléchargez CoScreen][1].

Après avoir installé CoScreen, lancez l'application de bureau. Vous pouvez vous connecter avec votre compte Datadog.

[1]: https://www.coscreen.co/download
{{% /tab %}}
{{% tab "Web" %}}
L'[application Web CoScreen][1] est disponible sur les navigateurs Chrome v87+, Edge v87+ et Safari v16+.

Elle ne propose qu'un certain nombre de fonctionnalités. Pour tirer pleinement profit de CoScreen, utilisez plutôt l'application de bureau.

[1]: https://app.coscreen.co/
{{% /tab %}}
{{< /tabs >}}

## Utilisation
### Rejoindre un CoScreen

Si vous avez été invité à rejoindre une session CoScreen, cliquez sur le lien. Vous pouvez cliquer sur l'option **Join from browser** pour rejoindre la session via l'app Web, ou simplement lancer l'application de bureau. Il est également possible de saisir l'ID ou le lien de la réunion pour la rejoindre manuellement.

Si vous rejoignez une session CoScreen, celle-ci est ajoutée à votre liste _Recent CoScreens_ dans le menu principal. Vous pouvez rejoindre une session depuis cette liste à tout moment.

Pour activer la réduction du bruit dans l'application de bureau, accédez à **Settings** > **Audio** et sélectionnez _Apply noise reduction to my microphone_.

Sur macOS, vous pouvez activer le floutage de l'arrière-plan sous **Settings** > **Camera** > **Video Effects**.

### Inviter vos collaborateurs

Partagez un lien pour inviter des collaborateurs.

Vous pouvez également ajouter vos proches collaborateurs à la liste _Your Collaborators_ dans le menu principal. Une fois qu'un collaborateur accepte votre invitation, vous pouvez consulter son statut et, s'il est disponible, l'appeler d'un simple clic.

### Partager des fenêtres

Dans l'application de bureau CoScreen, vous pouvez partager des fenêtres d'application de différentes façons.

#### Sélectionner des fenêtres individuelles à partager

{{< img src="coscreen/sharewindow2.mp4" alt="Un bouton Share en forme d'onglet est affiché au-dessus d'une fenêtre. Le bouton devient violet lorsque l'utilisateur dessus et affiche la mention Unshare" width=50% video="true">}}

Après avoir rejoint une session CoScreen, vous pouvez passer votre curseur sur n'importe quelle fenêtre de l'un de vos écrans pour afficher un onglet **Share**. Partagez des fenêtres et annulez leur partage en cliquant sur cet onglet. Vous pouvez également utiliser la boîte de dialogue de partage de fenêtre pour sélectionner la ou les fenêtres d'application à partager avec les autres membres de la session CoScreen que vous avez rejointe.

Plusieurs utilisateurs peuvent partager plusieurs fenêtres simultanément. Chaque membre de la session CoScreen se voit attribuer une couleur spécifique, qui est appliquée aux bordures des fenêtres qu'il partage.

#### Utiliser la boîte de dialogue de partage de fenêtre pour partager l'intégralité d'un écran ou seulement certaines fenêtres

Cliquez sur le bouton **Share windows** pour ouvrir la boîte de dialogue de partage de fenêtre.

{{< img src="coscreen/share_windows_button.png" alt="Une série de boutons issus de l'IU de l'application de bureau CoScreen. Le bouton 'Share windows' est surligné." style="width:50%;">}}

Si vous utilisez plusieurs écrans, vous pouvez sélectionner l'un d'entre eux, puis cliquer sur **Share the entire display** pour partager toutes les fenêtres ouvertes sur cet écran. Tant que le partage d'écran est activé, toutes les fenêtres que vous ouvrez sur cet écran ou faites glisser vers celui-ci sont également partagées.

Vous pouvez aussi sélectionner un certain de fenêtre à partager sur l'un de vos écrans.

Par défaut, le partage d'écran est désactivé lorsque vous rejoignez une session CoScreen.

### Collaborer sur des fenêtres partagées

{{< img src="coscreen/v5-control-tabs.mp4" alt="Deux curseurs interagissent simultanément avec une fenêtre partagée." video="true" width=70% >}}

Vous pouvez visualiser les curseurs des participants à distance lorsqu'ils les déplacent sur une fenêtre partagée. Deux onglets s'affichent dans les fenêtres partagées. Le premier onglet, **Control**, vous permet d'interagir avec la fenêtre, de cliquer sur des boutons et de saisir du texte dans des champs. Le deuxième onglet, **Draw**, vous permet de dessiner sur la fenêtre.

### Collaborer dans un terminal partagé

CoScreen inclut un terminal partagé et collaboratif qui permet aux utilisateurs d'exécuter des commandes et d'écrire et de déboguer du code ensemble.

Pour démarrer un terminal partagé, cliquez sur le bouton **Share terminal** dans le menu de réunion :

{{< img src="coscreen/share_terminal.png" alt="Une série de boutons issus de l'interface de l'application de bureau CoScreen. L'option Share Terminal est affichée." style="width:70%;">}}

Le terminal commun s'affiche pour l'ensemble des participants à la session CoScreen. Si vous activez le contrôle à distance dans CoScreen, chaque utilisateur peut saisir du texte dans le terminal et cliquer dessus.

{{< img src="coscreen/coterm.png" alt="Fenêtre de terminal CoScreen partagé." style="width:60%;">}}

Pour arrêter le partage du terminal, cliquez sur l'onglet **Unshare** dans la fenêtre du terminal ou sur le bouton dans le menu de la réunion.

Pour protéger la confidentialité, CoScreen utilise [Sensitive Data Scanner][8] et des filtres d'entropie pour détecter et masquer les données sensibles.

### Intégrations

Vous pouvez intégrer CoScreen à Slack, Google Agenda, VS Code et d'autres applications. [Découvrez toutes les intégrations CoScreen.][3]

#### CoScreen  + Slack

Pour installer l'app CoScreen pour Slack, rendez-vous sur [coscreen.co/slack][4] et cliquez sur _Add to Slack_. Pour activer CoScreen dans les canaux privés, saisissez `@coscreen` et appuyez sur entrée/retour, puis cliquez sur _Invite to Channel_. Pour activer CoScreen dans les conversations à plusieurs, accédez à _View Member List_ -> _Add People_ -> _CoScreen_.

#### CoScreen + Google Agenda

Pour configurer cette intégration, installez l'[extension CoScreen pour Chrome][5], puis connectez-vous. Ouvrez n'importe quel événement Google Agenda, puis cliquez sur le bouton **Add CoScreen** pour convertir l'événement en réunion CoScreen.

#### CoScreen + gestion des incidents Datadog

Dans la [gestion des incidents][9], utilisez le bouton **Meet on CoScreen** pour démarrer une réunion CoScreen avec les intervenants en cas d'incident. Pour configurer cela, accédez à votre page [Paramètres d'intégration de la gestion des incidents][10] et activez **Enable click-to-join CoScreen meeting buttons**.

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
[8]: /fr/security/sensitive_data_scanner/
[9]: /fr/incident_response/incident_management/
[10]: https://app.datadoghq.com/incidents/settings#Integrations