---
aliases:
- /fr/real_user_monitoring/session_replay/heatmaps
- /fr/real_user_monitoring/heatmaps
- /fr/product_analytics/session_replay/heatmaps
- /fr/product_analytics/heatmaps
description: Les cartes thermiques sont un type de visualisation montrant où les utilisateurs
  cliquent sur votre site web.
further_reading:
- link: /session_replay/
  tag: Documentation
  text: Session Replay for Browsers
- link: /session_replay/?platform=android
  tag: Documentation
  text: Session Replay for Mobile
- link: https://www.datadoghq.com/blog/session-replay-custom-heatmap-backgrounds/
  tag: Blog
  text: Capturez et analysez des cartes thermiques personnalisées dans Session Replay
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: Blog
  text: Visualisez les interactions des utilisateurs sur vos pages en utilisant Scrollmaps
    dans Datadog Heatmaps
title: Cartes thermiques
---
{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="Un aperçu de la fonctionnalité de carte thermique." style="width:100%;">}}

Une carte thermique (ou heatmap) est une visualisation des interactions de vos utilisateurs superposée aux données de Session Replay Il existe trois types différents de cartes thermiques :

- {{< ui >}}Click maps{{< /ui >}} : Visualisez les interactions des utilisateurs (clics) pour comprendre comment les utilisateurs interagissent avec votre page.
- {{< ui >}}Top Elements{{< /ui >}} : Visualisez un classement des 10 éléments ayant reçu le plus d'interactions sur une page donnée.
- {{< ui >}}Scroll maps{{< /ui >}} : Visualisez jusqu'où les utilisateurs font défiler une page, y compris l'endroit où se situe la ligne de flottaison moyenne d'une page. La ligne de flottaison moyenne est le point le plus bas d'une page qu'un utilisateur peut voir sur son appareil sans faire défiler.

Utilisez les cartes thermiques pour examiner des données complexes en un coup d'œil et obtenir des informations sur l'optimisation de votre expérience utilisateur.

<div class="alert alert-info">Les cartes thermiques ne sont prises en charge que pour Browser Session Replay.</div>

## Prérequis {#prerequisites}

Pour commencer avec les cartes thermiques :

1. Vérifiez votre version du Browser SDK :
   - Pour Clickmaps, vous devez utiliser la dernière version du SDK (v4.40.0 ou ultérieure).
   - Pour Scrollmaps, vous devez être sur la version du SDK (v4.50.0 ou ultérieure).
2. Activez [Session Replay][1].
3. Définissez`trackUserInteractions: true` dans l'initialisation du SDK pour activer le suivi des actions (requis pour Clickmaps).

## Mise en route {#getting-started}

{{< tabs >}}
{{% tab "RUM" %}}

Accédez à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1]. Sélectionnez votre application et votre vue.

Sur la [Real User Monitoring landing page][2], sélectionnez votre application dans le sélecteur d'applications et la vue. À gauche du sélecteur de période, vous pouvez sélectionner le type de heatmap que vous souhaitez afficher : Top Elements, Clickmaps ou Scrollmaps.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-different-views.png" alt="La page des cartes thermiques propose plusieurs façons d'afficher différentes vues : par application, type de carte, type d'appareil, nom d'action et filtres granulaires." style="width:100%;">}}

[1]: https://app.datadoghq.com/rum/heatmap/
[2]: https://app.datadoghq.com/rum/performance-monitoring

{{% /tab %}}
{{% tab "Product Analytics" %}}

Accédez à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1]. Sélectionnez votre application et votre vue.

Depuis cette page, vous pouvez sélectionner le type de heatmap (Top Elements, Clickmaps, ou Scrollmaps) que vous souhaitez afficher pour une vue particulière.

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="Pour chaque vue, vous pouvez sélectionner un type de heatmap différent : Top Elements, Clickmaps ou Scrollmaps." style="width:100%;">}}

Cliquez sur le nom d'une vue pour obtenir un aperçu plus détaillé de la carte thermique associée.

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="La page des cartes thermiques propose plusieurs façons d'afficher différentes vues : par application, type de carte, type d'appareil, nom d'action et filtres granulaires." style="width:100%;">}}

[1]: https://app.datadoghq.com/product-analytics/heatmap

{{% /tab %}}
{{< /tabs >}}

Vous disposez des options de vue supplémentaires suivantes :

- Pour changer la vue affichée, utilisez les sélecteurs {{< ui >}}View Name{{< /ui >}} et {{< ui >}}Application{{< /ui >}} en haut.
- Pour modifier la vue par appareil, utilisez le sélecteur {{< ui >}}Device type{{< /ui >}}.
- Pour filtrer par nom d'action, utilisez le menu déroulant {{< ui >}}Filter actions by{{< /ui >}}.
- Pour ajouter des filtres plus granulaires, comme une zone géographique spécifique par exemple, cliquez sur le bouton {{< ui >}}Add Filter{{< /ui >}}.

## Éléments principaux {#top-elements}

Les heatmaps Top Elements agrègent les actions de clic sur une vue donnée en affichant les éléments les plus sollicités, ainsi que leur rang d'interaction. Le classement sur la carte elle-même correspond au nom de l'action sur le côté.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-top-elements.png" alt="Un classement des Top Elements cliqués sur une page." style="width:100%;">}}

Survolez n'importe quel nom d'action dans le panneau pour mettre en surbrillance l'action correspondante sur la carte.

## Clickmaps {#click-maps}

Une Clickmap vous montre les actions avec lesquelles les utilisateurs interagissent le plus sur une vue donnée en agrégeant les actions de clic issues des sessions et en les visualisant sous forme de blobs sur la carte.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmaps.png" alt="Données de Clickmap superposées sur un site web." style="width:100%;">}}

À gauche se trouve une liste de toutes les actions qui se sont produites sur la page, classées par fréquence. Lorsque vous cliquez sur une action, vous pouvez en savoir plus sur cette interaction, par exemple :

- Le nombre de fois où l'utilisateur a effectué l'action et où elle se situe dans les analyses globales des principales actions sur une page donnée.
- Si un signal de frustration s'est produit sur cette action (par exemple, si un utilisateur a cliqué frénétiquement sur ce bouton), vous pouvez également consulter les signaux de frustration associés.

Depuis cette vue, vous pouvez également cliquer sur le bouton {{< ui >}}Start a Funnel{{< /ui >}} pour identifier l'abandon des utilisateurs.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmap-actions.png" alt="Affichez un exemple d'action et les informations associées." style="width:50%;">}}

## Scrollmaps {#scroll-maps}

Les Scrollmaps affichent l'activité de défilement agrégée sur une page donnée. Utilisez les Scrollmaps pour voir où se situe la ligne de flottaison moyenne de la page et combien d'utilisateurs défilent jusqu'à une profondeur donnée. Vous pouvez faire glisser la barre bleue flottante sur une Scrollmap jusqu'à la profondeur que vous souhaitez évaluer.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="Scrollmap de la page de literie dans une application e-commerce d'exemple." style="width:100%;">}}

Le panneau à gauche de la Scrollmap fournit des aperçus de haut niveau avec des liens directs vers les résultats de requête, comme un lien vers une liste de vues dans lesquelles l'utilisateur a défilé au-delà d'un certain percentile. Sous le panneau d'aperçu se trouvent une minicarte de la page et un graphique de distribution affichant des données de défilement granulaires, utiles pour identifier l'endroit où se produit le plus grand abandon.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="Une capture d'écran des requêtes pour obtenir des aperçus sur les données de défilement." style="width:50%;">}}

## Captures d'écran {#screenshots}

Une capture d'écran représente l'état d'une vue à un moment donné. Le changement de capture d'écran affiche des résultats différents, selon la capture d'écran sélectionnée. Vous pouvez également enregistrer des captures d'écran afin que chacun au sein de votre organisation puisse analyser le même état de vue. 

### Modification des captures d'écran {#changing-screenshots}

Depuis la vue de la carte thermique, cliquez sur le bouton {{< ui >}}Change Screenshot{{< /ui >}}. Un menu déroulant apparaît avec trois options.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-screenshot-button.png" alt="Le menu déroulant Change Screenshot affichant trois options : Existing screenshots, Take new screenshot, and Grab from replay." style="width:100%;">}}

{{< ui >}}Existing screenshots{{< /ui >}}

Choisissez parmi les captures d'écran précédemment enregistrées par vous ou vos coéquipiers. Cela permet de garantir que chacun au sein de votre organisation analyse le même état de vue.

{{< ui >}}Take new screenshot{{< /ui >}}

Capturez une capture d'écran directement depuis votre application en direct. Utilisez cette option lorsque l'état dont vous avez besoin — tel qu'une fenêtre modale ouverte, un menu survolé ou une position de défilement spécifique — n'existe pas dans vos replays enregistrés.

**Prerequisite** : Installez l'extension Chrome [Datadog Test Recorder][6] avant d'utiliser cette option. L'extension charge votre application en direct dans un navigateur intégré à Datadog, vous permettant de naviguer jusqu'à la page exacte et à l'état de l'interface utilisateur que vous souhaitez capturer.

1. Cliquez sur {{< ui >}}Take new screenshot{{< /ui >}}.


1. Accédez à la page que vous souhaitez capturer dans le navigateur intégré.
1. Faites défiler et interagissez avec la page pour afficher le contenu souhaité.
1. Sélectionnez un niveau de masquage pour empêcher l'apparition de données sensibles dans votre capture d'écran de carte thermique. Les paramètres de confidentialité configurés au niveau des éléments individuels dans votre code restent prioritaires. Pour plus d'informations, consultez [Options de confidentialité][5].

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-take-new-screenshot.png" alt="Le panneau Prendre une nouvelle capture d'écran affichant les instructions de navigation et un sélecteur de niveau de masquage." style="width:100%;">}}

1. Cliquez sur {{< ui >}}Take Screenshot{{< /ui >}}. Un aperçu de la capture d'écran s'ouvre.
1. Examinez l'aperçu et cliquez sur {{< ui >}}Confirm{{< /ui >}} pour appliquer la capture d'écran à votre carte thermique.

{{< ui >}}Grab from replay{{< /ui >}}

Sélectionnez une capture d'écran issue d'un Session Replay enregistré.

1. Cliquez sur {{< ui >}}Grab from replay{{< /ui >}}.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-grab-from-replay-selected.png" alt="Le menu déroulant Change Screenshot avec l'option Grab from replay sélectionnée." style="width:100%;">}}

1. Cliquez sur un événement d'action à droite pour sélectionner un instantané différent pour votre carte thermique.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events-1.png" alt="Liste des événements d'action pour le Session Replay." style="width:100%;">}}

1. Si la session [ ne contient pas l'action](#the-view-that-i-selected-is-not-showing-the-initial-content) qui conduit à la capture d'écran souhaitée, retournez à la liste des Session Replays en cliquant sur {{< ui >}}Choose Another Replay{{< /ui >}}.
1. Cliquez sur {{< ui >}}Take Screenshot{{< /ui >}} pour appliquer la capture d'écran au point de pause sur la carte thermique.

### Enregistrement des captures d'écran {#saving-screenshots}

Les captures d'écran prises à l'aide de {{< ui >}}Grab from replay{{< /ui >}} ou {{< ui >}}Take new screenshot{{< /ui >}} sont automatiquement enregistrées et deviennent la vue par défaut pour toute personne au sein de votre organisation qui ouvre la carte thermique. Pour enregistrer également la capture d'écran sélectionnée automatiquement à partir d'un replay récent, cliquez sur {{< ui >}}Save{{< /ui >}} sur la capture d'écran actuelle.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-save-screenshot-1.png" alt="Cliquez sur Save pour appliquer la capture d'écran sélectionnée automatiquement." style="width:100%;">}}

Vous pouvez enregistrer plusieurs captures d'écran pour la même vue (par exemple : default view, open navigation menu, open modal) et basculer entre les captures d'écran enregistrées par vos coéquipiers.

Pour supprimer la capture d'écran actuellement enregistrée et revenir à celle sélectionnée automatiquement à partir d'une relecture récente, cliquez sur {{< ui >}}Unpin{{< /ui >}} sur la capture d'écran actuelle.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-unpin-screenshot-1.png" alt="Cliquez sur unpin pour supprimer la capture d'écran actuellement épinglée." style="width:100%;">}}

### Analyse des cartes thermiques au-delà de la durée de conservation des relectures {#analyzing-heatmaps-beyond-replay-retention}

Dans Product Analytics, les données de clic survivent à la Session Replay utilisée comme arrière-plan. Voir [Rétention des données](#data-retention). Pour afficher une carte thermique pour une période antérieure à la rétention de vos Session Replay :

1. Définissez la plage de dates sur une période couvrant les 30 derniers jours, afin qu'une carte thermique s'affiche avec un arrière-plan provenant d'un Session Replay récent.
1. Cliquez sur {{< ui >}}Save{{< /ui >}} dans la capture d'écran actuelle pour l'épingler.
1. Redéfinissez la plage de dates sur la période que vous souhaitez analyser.

Vos anciennes données de clic apparaissent sur la capture d'écran épinglée. Vous pouvez également utiliser {{< ui >}}Take new screenshot{{< /ui >}} pour capturer un état spécifique de votre application en direct.

**Remarque** : L'arrière-plan reflète votre application telle qu'elle apparaissait récemment, et non telle qu'elle apparaissait pendant la période que vous analysez. Si la mise en page de votre page a changé entre-temps, les clics peuvent apparaître sur les mauvais éléments.

## Rétention des données {#data-retention}

Une carte thermique combine deux types de données (la **superposition** - clics et défilements, et la **capture d'écran d'arrière-plan**), et Datadog conserve chacune pendant une période différente :

| Données | Source | Rétention |
| ---- | ------ | --------- |
| **Superposition** (clics et défilements) dans RUM | Événements d'action RUM | 30 jours |
| **Superposition** (clics et défilements) dans Product Analytics | Données de clic Product Analytics | 15 mois |
| **Capture d'écran d'arrière-plan** dans les deux | Session Replay | 30 jours par défaut |

Une carte thermique nécessite les deux pour s'afficher. Si vous sélectionnez une période où les données de clic existent toujours mais où aucun Session Replay n'est disponible pour servir d'arrière-plan, la carte thermique affiche « Aucune donnée de Session Replay », même si vous pouvez toujours interroger ces actions dans l'Analytics Explorer.

Dans Product Analytics, si vous prévoyez d'analyser une vue sur une période supérieure à 30 jours, enregistrez-en une capture d'écran tant que les Session Replay sont encore disponibles. L'enregistrement d'une capture d'écran prolonge la rétention du Session Replay sous-jacent à 15 mois, de sorte que la carte thermique continue de s'afficher aussi longtemps que Datadog conserve vos données de clic Product Analytics. Consultez [Analyse des cartes thermiques au-delà de la rétention des Session Replay](#analyzing-heatmaps-beyond-replay-retention).

Dans RUM, les événements d'action expirent après 30 jours, les cartes thermiques ne sont donc pas disponibles au-delà de cette fenêtre.

Pour les périodes de rétention qui s'appliquent à d'autres types de données, consultez [Périodes de rétention des données][7]. Pour prolonger la rétention sur des Session Replay individuels, consultez [Extend data retention][8].

## Étapes suivantes {#next-steps}

Après avoir analysé les cartes thermiques, l'étape suivante consiste à comprendre l'action de l'utilisateur en explorant les données associées. Regardez les [session replays][1] associés pour voir les actions des utilisateurs dans le contexte de leur session globale, ou accédez à un Analytics Explorer dans [RUM][3] ou [Product Analytics][4] pour analyser vos données utilisateur.

## Dépannage {#troubleshooting}

### Je regarde une carte thermique pour une vue donnée, mais elle m'affiche une page inattendue. {#i-am-looking-at-a-heatmap-for-a-given-view-but-its-showing-me-an-unexpected-page}

Les cartes thermiques sont basées sur les noms de vue. Selon la configuration de votre application, de nombreuses pages peuvent commencer à être regroupées sous le même nom de vue, ou vous pouvez commencer à avoir des noms de vue spécifiques.

### La vue que j'ai sélectionnée n'affiche pas le contenu initial. {#the-view-that-i-selected-is-not-showing-the-initial-content}

Les cartes thermiques sont générées à partir des données de Session Replay. L'algorithme intelligent de Datadog sélectionne un Session Replay à la fois récent et qui correspond le mieux à l'état initial de la page. Dans certains cas, ce Session Replay peut ne pas être celui que vous souhaitez utiliser. Pour changer l'instantané de votre carte thermique, utilisez le bouton {{< ui >}}Change Snapshot{{< /ui >}} pour naviguer parmi les différents états d'un Session Replay et trouver celui que vous souhaitez. Si le Session Replay que vous consultez ne contient pas l'instantané que vous recherchez, vous pouvez utiliser le bouton {{< ui >}}Choose Another Replay{{< /ui >}} pour sélectionner un autre Session Replay de la même vue.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="Sélectionnez un arrière-plan différent en cliquant sur le bouton Change Snapshot." video=true >}}

### Dans la liste d'actions sur le côté de ma carte thermique, je vois une icône indiquant un élément qui n'est pas visible dans la carte thermique. {#on-the-action-list-on-the-side-of-my-heatmap-i-see-an-icon-showing-an-element-that-is-not-visible-in-the-heatmap}

L'infobulle sur l'icône indique que l'élément n'est pas visible. Cela signifie que l'élément est une action courante sur votre page, mais qu'il n'est pas affiché sur l'instantané dans la carte thermique. Pour voir cet élément, vous pouvez cliquer sur {{< ui >}}Change Snapshot{{< /ui >}} dans le coin supérieur droit pour changer l'instantané de votre carte thermique vers un instantané où cet élément est présent.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="Éléments masqués dans la liste d'actions sur une carte thermique." style="width:100%;">}}

### Après avoir tenté de créer une carte thermique, je vois apparaître l'état « Aucune donnée de Session Replay ». {#after-attempting-to-create-a-heatmap-i-see-a-no-replay-data-state-appear}

L'état « Aucune donnée de Session Replay » signifie que Datadog n'a trouvé aucun Session Replay à utiliser comme arrière-plan de carte thermique. Causes courantes :

- La période sélectionnée est plus ancienne que votre rétention de Session Replay, qui est de 30 jours par défaut. Les données de clic peuvent toujours exister, mais aucun Session Replay ne reste à utiliser comme arrière-plan. Consultez [Analyse des cartes thermiques au-delà de la rétention des Session Replay](#analyzing-heatmaps-beyond-replay-retention).
- Aucun Session Replay ne correspond à vos filtres de recherche actuels.
- Vous avez récemment commencé l'enregistrement avec le [Browser SDK][2], et le Session Replay n'est pas encore disponible. Cela peut prendre quelques minutes.

### Après avoir tenté de créer une carte thermique, je vois apparaître l'état « Données insuffisantes pour générer une carte thermique ». {#after-attempting-to-create-a-heatmap-i-see-a-not-enough-data-to-generate-a-heatmap-state-appear}

Cela signifie que Datadog n'a pas pu faire correspondre les actions utilisateur avec le Session Replay actuellement sélectionné. Cela se produit pour diverses raisons, telles que :

- Votre application n'utilise pas la dernière version du SDK (>= 4.20.0).
- Votre page a récemment changé de manière significative. 

### Toutes les informations utilisateur sur la page sont vides. {#all-of-the-user-information-on-the-page-is-empty}

Les informations utilisateur ne sont pas collectées par défaut. Les cartes thermiques utilisent les informations utilisateur disponibles dans vos données de session pour afficher des informations pertinentes sur le comportement.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: /fr/real_user_monitoring/explorer/
[4]: /fr/product_analytics/charts/analytics_explorer/
[5]: /fr/session_replay/privacy_options?platform=browser#privacy-options
[6]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[7]: /fr/data_security/data_retention_periods/
[8]: /fr/session_replay/#extend-data-retention