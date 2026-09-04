---
aliases:
- /fr/real_user_monitoring/product_analytics/sankey
- /fr/product_analytics/sankey
- /fr/product_analytics/journeys/sankey
- /fr/product_analytics/journeys/pathways
further_reading:
- link: /product_analytics/journeys
  tag: Documentation
  text: Graphiques
- link: /dashboards/widgets/sankey/
  tag: Documentation
  text: Créer des widgets Sankey dans les tableaux de bord
title: Pathways
---
## Présentation {#overview}

Les diagrammes Pathways permettent de visualiser tous les parcours utilisateur dans votre application afin d'analyser le chemin critique.

{{< img src="/product_analytics/journeys/pathways/ga_pathway_diagrams_page.png" alt="Le diagramme Pathways par défaut pour une application" style="width:90%;" >}}

Chaque nœud représente une vue visitée par l'utilisateur. L'épaisseur de chaque nœud représente le nombre de sessions utilisateur sur cette page. Une page avec moins de visiteurs a un nœud plus fin dans le diagramme.

Si un utilisateur visite la même page plusieurs fois au cours de sa session, cette page n'est comptée qu'une seule fois.

Les événements d'action ne sont pas pris en charge dans le diagramme de parcours.

## Créer un diagramme de parcours {#build-a-pathways-diagram}

### Afficher le diagramme par défaut {#view-the-default-diagram}

1. Accédez à [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Charts{{< /ui >}}][1].
2. Cliquez sur {{< ui >}}Pathways{{< /ui >}} s'il n'est pas déjà sélectionné. Cela affiche la visualisation par défaut qui représente les parcours utilisateur les plus populaires dans votre application.

### Commencez ou terminez le diagramme à une vue donnée {#start-or-end-the-diagram-at-a-given-view}

Vous pouvez utiliser le menu de gauche pour personnaliser ce diagramme et afficher :
- les étapes que les utilisateurs ont suivies *après* avoir visité une vue donnée
- les étapes que les utilisateurs ont suivies *avant* de visiter une vue donnée

L'exemple ci-dessous affiche les quatre étapes que les utilisateurs aux États-Unis suivent après avoir visité `/department/lighting` :

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img2.png" alt="Un diagramme de parcours personnalisé pour une application" style="width:90%;" >}}

### Représentez graphiquement toutes les vues contenant une expression donnée {#graph-all-views-containing-a-given-phrase}

Les diagrammes Pathways prennent en charge les [caractères génériques Datadog][2], vous permettant de créer un diagramme de toutes les vues contenant une expression donnée.

Pour faire correspondre plusieurs routes, saisissez un caractère générique au lieu de choisir un nom de vue unique. L'exemple ci-dessous affiche les cinq étapes que les utilisateurs suivent après avoir visité toute vue correspondant à `/department/*` :

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img3.png" alt="Un diagramme Pathways qui utilise un caractère générique pour faire correspondre plusieurs routes" style="width:90%;" >}}

## Analysez un diagramme Pathways {#analyze-a-pathways-diagram}

Vous pouvez survoler un nœud du diagramme pour voir le nombre de sessions ayant inclus des visites vers cette vue.

Cliquez sur un nœud pour obtenir une liste d'options d'analyse, telles que la visualisation d'un échantillon de [Session Replay][3] ou la création d'un diagramme Pathways commençant par cette vue.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img4.png" alt="Le menu d'actions d'un nœud de diagramme Pathways" style="width:90%;" >}}

### Convertissez le diagramme en entonnoir {#convert-the-diagram-to-a-funnel}

1. Depuis la page du diagramme Pathways, cliquez sur le bouton {{< ui >}}Build Funnel{{< /ui >}}.
2. Dans le diagramme Pathways, cliquez sur les nœuds des vues que vous souhaitez inclure dans l'entonnoir.
3. Cliquez sur {{< ui >}}Create Funnel From Selection{{< /ui >}}.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img5.png" alt="Conversion d'un diagramme Pathways en entonnoir en cours" style="width:90%;" >}}

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/pathways
[2]: /fr/real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /fr/session_replay/