---
aliases:
- /fr/product_analytics/guide/action_management/
description: Étiquetez les actions autocapturées depuis vos applications web et mobiles
  à l'aide de la gestion des actions.
further_reading:
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: Centre d'apprentissage
  text: Définissez le comportement des utilisateurs avec des actions étiquetées dans
    Product Analytics.
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De la performance à l''impact : rapprocher les équipes frontend grâce à un
    contexte partagé'
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: Blog
  text: Prenez des décisions produit plus rapides et plus pertinentes avec Datadog
    Product Analytics
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: Blog
  text: Ce que disent réellement vos données produit
title: Gestion des actions
---
## Présentation {#overview}
La gestion des actions est une méthode sans code pour étiqueter les actions autocapturées depuis vos applications web et mobiles. Les parties prenantes produit et métier peuvent l'utiliser pour créer et renommer des événements sans modification de code.

Utilisez les actions étiquetées pour :
- Suivre un élément qui n'est pas encore instrumenté en ciblant un sélecteur CSS.
- Combiner plusieurs actions autocapturées sous un nom unique lorsqu'elles représentent une action utilisateur significative.
- Renommez une action autocapturée pour qu'elle corresponde à la terminologie métier de votre équipe.

Une fois que vous avez créé une action étiquetée, Datadog applique le nom rétroactivement à toutes les interactions correspondantes dans vos données enregistrées. Cela inclut les interactions historiques, et pas seulement les nouvelles interactions à venir.

Les actions étiquetées fonctionnent dans tous les graphiques de Product Analytics et contribuent à renforcer la confiance dans votre jeu de données ainsi que l'efficacité de votre analyse.

Deux méthodes d'étiquetage sont disponibles :
- [**Étiquetage visuel**](#visual-labeling) : Une interface en mode pointage et clic pour étiqueter les actions sur les pages web. Nécessite l'extension Chrome « Datadog test recorder ».
- [**Étiquetage manuel**](#manual-labeling) : Étiquetez les actions pour les applications web et mobiles sans extension de navigateur.

## Étiquetage visuel {#visual-labeling}

L'étiquetage visuel nécessite [l'extension Chrome « Datadog test recorder »][1]. Si vous ne parvenez pas à ajouter l'extension via le Chrome Web Store, consultez les [instructions manuelles][2] pour l'installation de l'extension, ou utilisez plutôt [l'étiquetage manuel](#manual-labeling).

1. Accédez à la page [Actions][3] dans Datadog et sélectionnez votre application.
2. Sélectionnez {{< ui >}}Visual Labeler{{< /ui >}}. Les éléments qui possèdent déjà une action étiquetée sont marqués d'un point bleu. Pour afficher automatiquement les noms de ces actions étiquetées, cochez la case dans le menu.

   {{< img src="product_analytics/action_management/pana-visual-labeler-toolbar.png" alt="Barre d'outils de l'étiqueteur visuel affichant les modes Naviguer sur le site et Étiqueter les actions, ainsi qu'une case à cocher pour afficher les noms des cinq actions étiquetées sur la page." style="width:90%;">}}

3. Utilisez le mode {{< ui >}}Navigate Site{{< /ui >}} pour naviguer jusqu'à l'emplacement de l'action ou des actions que vous souhaitez étiqueter.
4. Passez au mode {{< ui >}}Label Actions{{< /ui >}} lorsque vous êtes prêt à étiqueter une action.

### Créez une action étiquetée {#create-a-labeled-action}

1. Cliquez sur l'élément que vous souhaitez étiqueter. Datadog indique combien de fois les utilisateurs ont déclenché l'élément au cours des 7 derniers jours.
2. Facultatif : Cliquez sur des éléments supplémentaires pour que l'étiquette les capture tous ensemble. Pour supprimer un élément de l'action étiquetée, sélectionnez l'icône de corbeille à côté de celui-ci.
3. Datadog suggère un nom pour l'action étiquetée en fonction de l'élément. Modifiez le nom si nécessaire.
4. Par défaut, Datadog suit les clics sur l'élément uniquement sur la page actuelle. Pour suivre les correspondances du sélecteur CSS de l'élément sur toutes les pages, ouvrez les détails de l'étiquette et cochez la case {{< ui >}}Target all pages{{< /ui >}}.
5. Facultatif : Modifiez directement le sélecteur CSS si vous souhaitez changer ou affiner les éléments auxquels l'étiquette correspond.
6. Cliquez sur {{< ui >}}Save labeled action{{< /ui >}}.

{{< img src="product_analytics/action_management/pana-create-labeled-action-2.png" alt="Panneau d'action étiquetée affichant un nom « New Chart CTA Click from Home », un élément suivi nommé main navigation, la case à cocher Target all pages, le sélecteur CSS de l'élément et le bouton Save labeled action." style="width:60%;">}}

### Mettez à jour une action étiquetée existante {#update-an-existing-labeled-action}

1. Cliquez sur un élément qui possède déjà une action étiquetée associée (marqué d'un point bleu).
2. Sélectionnez {{< ui >}}Edit{{< /ui >}}.
3. Ajoutez ou supprimez des éléments suivis, et mettez à jour le nom ou le sélecteur CSS si nécessaire.
4. Cliquez sur {{< ui >}}Save labeled action{{< /ui >}}.

Une fois que vous avez défini une action, elle apparaît dans la liste des actions étiquetées sur la page [Actions][3], et vous pouvez l'utiliser dans n'importe quel graphique Product Analytics.

## Étiquetage manuel {#manual-labeling}

L'étiquetage manuel est disponible pour les applications web et mobiles et ne nécessite pas l'extension Chrome.

1. Accédez à la page [Actions][3] dans Datadog et sélectionnez votre application. 
2. Sélectionnez {{< ui >}}Add Labeled Action{{< /ui >}}, puis sélectionnez {{< ui >}}Create manually{{< /ui >}}.
3. Ajoutez un nom d'étiquette, une description (facultative) et des tags (facultatifs).
4. Sous {{< ui >}}Definition{{< /ui >}}, définissez un ou plusieurs événements à suivre :
   - {{< ui >}}Action Type{{< /ui >}} : `click` ou `custom` événements. Pour les événements `click`, vous pouvez spécifier un sélecteur CSS personnalisé pour le suivi des clics, ou utiliser le générateur CSS pour étiqueter les événements, pour plus de contrôle et de granularité. 
   - {{< ui >}}Action Name{{< /ui >}} : Utilisez le menu déroulant pour sélectionner une action
   - {{< ui >}}Page Location{{< /ui >}} : Utilisez le menu déroulant pour cibler une ou plusieurs pages
   Sélectionnez {{< ui >}}Add New Definition{{< /ui >}} pour ajouter une définition.
5. Sélectionnez **Enregistrer**.

Une fois que vous avez défini une action, elle apparaît dans la liste des actions étiquetées sur la page [Actions][3], et vous pouvez l'utiliser dans n'importe quel graphique Product Analytics.

## Récupérez vos actions {#retrieve-your-actions}
Une fois que vous avez défini une action, vous pouvez la trouver sur la page [Actions][3]. 

{{< img src="product_analytics/action_management/pana-action-list-2.png" alt="Liste de vos actions étiquetées." style="width:90%;">}}

## Limitations connues {#known-limitations}
- L'étiquetage visuel n'est disponible que pour les pages web. Utilisez l'étiquetage manuel pour les applications mobiles.
- Vous ne pouvez pas étiqueter les actions masquées derrière un survol. Si cette limitation a un impact sur vos cas d'utilisation, partagez des exemples avec votre responsable de la réussite client afin d'éclairer les futures améliorations.
- La suppression d'une action étiquetée la supprime également des tableaux de bord où elle est utilisée.

[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/fr/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}