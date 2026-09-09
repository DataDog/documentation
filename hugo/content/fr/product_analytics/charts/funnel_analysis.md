---
algolia:
  tags:
  - funnel
aliases:
- /fr/real_user_monitoring/funnel_analysis
- /fr/real_user_monitoring/product_analytics/funnel_analysis
- /fr/product_analytics/journeys/funnel_analysis/
disable_toc: false
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: Documentation
  text: Analytics Explorer
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centre d'apprentissage
  text: Bien démarrer avec Product Analytics
title: Analyse d'entonnoirs
---
## Présentation {#overview}

L'analyse d'entonnoir vous aide à suivre les taux de conversion sur des workflows clés afin d'identifier et de résoudre les goulots d'étranglement dans les parcours de bout en bout. Plus précisément, vous pouvez :

- Voir si les clients abandonnent à un certain point en raison de mauvaises performances du site web
- Suivre l'évolution du taux de conversion au fil du temps à mesure que de nouvelles fonctionnalités sont créées
- Évaluer l'impact de l'ajout de nouvelles étapes à un workflow sur le taux d'abandon
- Mesurer le temps moyen de conversion
- Filtrer sur des événements individuels à différentes étapes de votre entonnoir
- Combiner plusieurs événements au sein d'une étape donnée, car les utilisateurs finaux peuvent avoir différentes manières d'atteindre le même résultat via différents flux


## Créer un entonnoir {#build-a-funnel}

Pour commencer à créer un entonnoir, accédez à [{{< ui >}}Product Analytics{{< /ui >}}][1], puis sélectionnez [{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Funnel{{< /ui >}}][2].

{{< img src="product_analytics/journeys/funnel_analysis/funnel_overview.png" alt="L'option d'entonnoir mise en évidence dans la boîte de dialogue Créer un nouveau dans Product Analytics" style="width:100%;" >}}

Sélectionnez les étapes utilisateur qui lancent l'entonnoir et utilisez {{< ui >}}Add step{{< /ui >}} pour ajouter des étapes supplémentaires. Faites glisser et déposez les étapes pour les réorganiser dans l'entonnoir.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_add_step_video.mp4" alt="Utilisation du bouton Ajouter une étape pour ajouter une étape à un entonnoir existant, et utilisation du glisser-déposer pour déplacer la nouvelle étape au bon endroit dans l'entonnoir." video=true >}}


### Ajouter des filtres {#add-filters}

Vous pouvez filtrer les utilisateurs globalement ou pour des étapes spécifiques :

- Pour appliquer des filtres globaux à l'ensemble de l'entonnoir, sélectionnez {{< ui >}}Filter by{{< /ui >}} et choisissez vos options.

- Pour filtrer les utilisateurs sur une étape individuelle, sélectionnez l'icône **de filtre** pour cette étape et choisissez vos options. Le filtrage sur une étape donne un aperçu de la façon dont le comportement des utilisateurs change en fonction d'une contrainte particulière sur cette étape. Par exemple, vous pouvez vouloir voir comment un appareil, un système d'exploitation ou une géolocalisation spécifique influe sur la conversion à une étape donnée.

### Combiner des événements {#combine-events}

Vous pouvez combiner plusieurs événements au sein d'une même étape de l'entonnoir, afin de prendre en compte les utilisateurs finaux atteignant le même résultat via différents flux. Lors de la combinaison d'événements, tout événement inclus peut déclencher la conversion de l'étape, en utilisant une logique « ou ». Le graphique en entonnoir pour une étape combinée affiche les données de tous les événements qu'elle contient.

Pour ajouter plusieurs événements à une étape, cliquez sur le bouton {{< ui >}}or{{< /ui >}} à côté d'un événement existant.

### Comparer les données {#compare-data}

Sélectionnez {{< ui >}}Compare{{< /ui >}}, puis choisissez l'une des options ci-dessous pour comparer les données de l'entonnoir de différentes manières :

{{< ui >}}By breakdown{{< /ui >}} : Regroupez les données par un attribut spécifique, comme le type d'appareil ou la géolocalisation. Vous pouvez également ajuster l'affichage des valeurs les plus fréquentes (les plus courantes) ou les moins fréquentes (les moins courantes) au sein de l'attribut, ainsi que le nombre de valeurs à inclure.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_compare_by_country.png" alt="La vue de comparaison par répartition, configurée pour afficher les cinq principales sources de conversion par pays." >}}

{{< ui >}}By property or segment{{< /ui >}} : Comparez plusieurs segments d'utilisateurs ou attributs d'utilisateurs côte à côte.

-  : Pour comparer des segments d'utilisateurs, sélectionnez les segments que vous souhaitez comparer.
-  : Pour comparer un attribut d'utilisateur, sélectionnez une propriété (telle que le nom du navigateur ou le pays), puis choisissez les valeurs que vous souhaitez comparer (telles que Firefox, Chrome et Safari).

{{< img src="product_analytics/journeys/funnel_analysis/funnel_side_by_side.png" alt="La vue de comparaison par propriété ou segment, montrant une comparaison côte à côte de cinq valeurs de nom de navigateur sélectionnées." >}}

{{< ui >}}By time{{< /ui >}} : Comparez les données de conversion côte à côte entre différentes périodes.

## Affiner les analyses de conversion {#refine-conversion-insights}

Vous pouvez analyser plus en détail les informations sur la page de l'entonnoir pour comprendre l'efficacité de votre site à générer des conversions. Une [conversion](#conversion-computing-metrics) se produit lorsqu'un utilisateur termine la dernière étape définie dans l'entonnoir.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_conversion_dropdown.png" alt="Le menu déroulant d'affinement de la conversion avec des options d'analyse par conversions uniques ou totales." style="width:100%;" >}}

Utilisez le menu déroulant au-dessus du panneau latéral du graphique pour sélectionner différentes vues d'analyse de conversion. L'analyse de conversion est disponible par :

- {{< ui >}}Unique converted sessions{{< /ui >}} : Conversions où toutes les étapes ont été effectuées avec le même `@session.id`.

- {{< ui >}}Unique converted users{{< /ui >}} : Conversions où le même utilisateur individuel, suivi par `@user.id`, a effectué toutes les étapes.

- {{< ui >}}Unique converted accounts{{< /ui >}} : Conversions où le même compte, suivi par `@account.id`, a effectué toutes les étapes. Cette analyse est utile pour identifier les conversions effectuées par des utilisateurs connectés sur une période plus longue que celle pendant laquelle la facette `@user.id` persiste.

- {{< ui >}}Total conversions{{< /ui >}} : Total des conversions sur les sessions, les utilisateurs ou les comptes.

- {{< ui >}}Time to convert{{< /ui >}} : Une vue sous forme de série temporelle des conversions par sessions, utilisateurs ou comptes.

Pour toute vue d'analyse de conversion, vous pouvez choisir de visualiser les conversions par nombre ou par taux, et de voir les données pour toutes les étapes ou pour des étapes individuelles. Pour les vues de conversion par utilisateur ou par compte, vous pouvez ajuster la période au cours de laquelle une conversion doit se produire.

## Calcul des métriques de conversion {#conversion-computing-metrics}

### Comment Datadog calcule les métriques de conversion {#how-datadog-computes-conversion-metrics}
Considérez un entonnoir avec des événements `A → B → C` et des étapes d'événement **A**, A, A, **B**, **C**, C.

Dans ce cas, Datadog compte une conversion. Chaque **A** démarre une tentative indépendante. Comme les trois tentatives se terminent sur le même événement **C**, Datadog ne compte que la tentative la plus précoce.

Pour illustrer davantage, si l'utilisateur effectue la séquence d'événements **A**, A, A, **B**, **C**, C, **A**, **B**, **C**, Datadog compte deux conversions. La première conversion se termine avec la séquence **A**, A, A, **B**, **C**, et la deuxième conversion se termine avec la séquence suivante de **A**, **B**, **C**.

<div class="alert alert-info"> Toute action ou vue qui ne correspond pas à une étape de l'entonnoir n'a pas d'impact sur le taux de conversion étape par étape ou global. Si toutes les étapes de l'entonnoir se produisent dans le bon ordre au cours de la fenêtre de conversion, Datadog compte la session comme une seule session convertie.</div>

Datadog calcule le temps moyen entre les étapes en faisant la moyenne de la durée totale entre la première et la dernière étape de chaque conversion, divisée par le nombre d'intervalles entre les étapes.

Si vous analysez votre entonnoir par **utilisateur** ou par **compte**, vous pouvez définir votre période de conversion en heures ou en jours depuis le premier événement. La période par défaut pour les conversions est d'un jour (une fenêtre de 24 heures, pas une date civile) pour déterminer si une conversion a eu lieu.


### Méthodes de comptage des conversions {#conversion-counting-methods}

Lors du calcul de vos conversions, sélectionnez la manière dont les conversions sont comptées en choisissant une option de conversion **unique** (sessions, utilisateurs ou comptes) ou l'option {{< ui >}}Total Conversion Count{{< /ui >}} dans votre visualisation de conversion. 

- {{< ui >}}Unique{{< /ui >}} : Compte une conversion une seule fois par session, utilisateur ou compte. Par exemple, si l'utilisateur termine la séquence de l'entonnoir `A → B → C` plusieurs fois au cours de la même session (`A, B, C, A, B, C`), cela compte comme **une conversion**.

- {{< ui >}}Total{{< /ui >}} : Compte une conversion chaque fois que le même ID de session, utilisateur ou compte termine l'entonnoir défini. En utilisant le même exemple (`A, B, C, A, B, C`), cette méthode compte **deux conversions**. Le paramètre {{< ui >}}Total{{< /ui >}} compte les flux complets, et non le nombre de fois qu'une étape intermédiaire est répétée.


## Modifier la visualisation {#change-the-visualization}
Une fois que vous avez défini les événements d'étape et la mesure de conversion, vous pouvez passer à une visualisation différente pour mieux comprendre les conversions des utilisateurs pour votre application.


{{< img src="product_analytics/journeys/funnel_analysis/funnel_visualization_video.mp4" alt="Changez la visualisation de Steps à Timeseries à l'aide d'un menu déroulant." video=true >}}


### Timeseries {#timeseries}
Visualiser l'entonnoir sous forme de série temporelle peut être utile pour comprendre les tendances de conversion. Vous pouvez sélectionner la période pour représenter graphiquement la conversion, et vous pouvez afficher les conversions sous forme de nombre absolu ou de taux.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="La visualisation Timeseries, configurée pour afficher les utilisateurs convertis uniques quotidiens sur la semaine écoulée." style="width:80%;" >}}

### Query value {#query-value}

La visualisation Query Value affiche la valeur actuelle d'une métrique.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="La visualisation Query Value, configurée pour afficher le nombre total de sessions converties uniques sur la semaine écoulée." style="width:80%;" >}}

### Top list {#top-list}

La visualisation Top list identifie les valeurs les plus élevées d'une facette en fonction d'une mesure choisie.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="La visualisation Top list, configurée pour afficher les quatre principales sources de conversion par continent." style="width:80%;" >}}

## Afficher les facteurs de conversion et les parcours utilisateur {#view-conversion-drivers-and-journey-paths}

Pour obtenir plus de contexte sur les conversions et les abandons des utilisateurs, cliquez sur une étape de l'entonnoir pour accéder à l'analyse de conversion et aux parcours utilisateur.

<div class="alert alert-info">L'analyse de conversion est en préversion.</div>

- **Analyse de conversion** : Affichez les facteurs de conversion, les parcours utilisateur, les replays utilisateur disponibles pour les conversions et les abandons, ainsi que les détails des utilisateurs.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="La vue du panneau latéral après avoir cliqué sur une étape de l'entonnoir, montrant les facteurs de conversion, les replays disponibles et les utilisateurs convertis." style="width:100%;" >}}

- **Parcours utilisateur** : Affichez les chemins de conversion et d'abandon des utilisateurs pour la séquence d'étapes sélectionnée, y compris les chemins de ramification vers d'autres étapes en dehors de l'entonnoir.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_journey_paths.png" alt="Un parcours utilisateur montrant les cinq principaux chemins d'abandon suivant l'étape 1 dans l'entonnoir." style="width:100%;" >}}

## Partager un entonnoir {#share-a-funnel}

Les entonnoirs peuvent être partagés avec vos équipes sur des [tableaux de bord][3] pour analyser la conversion parallèlement à d'autres métriques de télémétrie, ou dans un [Notebook][4] pour être utilisés dans des rapports.

Vous pouvez partager l'intégralité de la visualisation ou des widgets individuels.

- Partager l'intégralité de la visualisation vers des Notebooks et des tableaux de bord :

  {{< img src="product_analytics/journeys/funnel_analysis/funnels_share_export.png" alt="L'option de partage de la visualisation étendue, qui affiche l'option supplémentaire Exporter en PNG " style="width:100%;" >}}

- Partager des widgets individuels depuis un tableau de bord :

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="Partagez un widget en cliquant sur l'icône d'exportation en haut à droite du widget" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[3]: /fr/product_analytics/dashboards/
[4]: /fr/notebooks/