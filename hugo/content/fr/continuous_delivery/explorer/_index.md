---
description: Découvrez comment interroger et visualiser les déploiements de CD Visibility.
further_reading:
- link: /continuous_delivery/features
  tag: Documentation
  text: Découvrez les fonctionnalités de CD Visibility
- link: /continuous_delivery/deployments/
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer/saved_views
  tag: Documentation
  text: En savoir plus sur Saved Views
title: Découvrez les déploiements de CD Visibility
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

## Deployments {#deployments}

Pour obtenir une vue d'ensemble de vos déploiements, accédez à [**Software Delivery** > **CD Visibility** > **Deployments**][6].

La page [**Deployments**][6] affiche des statistiques agrégées par services et environnements sur la période sélectionnée, ainsi que le statut de la dernière exécution de déploiement. Utilisez cette page pour voir tous vos déploiements de services et avoir un aperçu de leur état de santé.
Les métriques affichées incluent le nombre d'exécutions et d'échecs, le taux d'échec, la durée médiane et la durée au 95e percentile. Ces informations révèlent quels déploiements ont une probabilité d'échec plus élevée et quels déploiements prennent le plus de temps à être exécutés. L'effet des derniers changements peut être observé en vérifiant le statut, la révision et l'heure du dernier résultat de déploiement.

<div class="alert alert-info">Les déploiements sans services configurés et les exécutions de déploiement partielles sont exclus de l'agrégation des statistiques de la page Deployments. Vous pouvez rechercher ces déploiements sur la page Deployment Executions : <code>@deployment.partial_deployment:* OR -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="The Deployments page in Datadog" style="width:100%" >}}

Si vous disposez de différentes manières de déployer un service dans un environnement, vous pouvez déplier les lignes de déploiement pour voir des statistiques filtrées par nom de déploiement.

La page {{< ui >}}Deployment{{< /ui >}} vous fournit des informations générales, notamment :

- Une vue d'ensemble de l'état de santé des différents services et environnements, avec des statistiques agrégées.
- Une fenêtre pour repérer et corriger les problèmes immédiats et urgents, comme les déploiements défaillants en production.
- La manière dont chaque déploiement de service a été exécuté, au fil du temps, ainsi que les résultats et les tendances.

### Détails du déploiement {#deployment-details}

Cliquez sur un déploiement de service spécifique pour voir la page {{< ui >}}Deployment Details{{< /ui >}}, qui fournit des vues des données pour le déploiement de service que vous avez sélectionné sur une période donnée.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Page d'un déploiement donné" style="width:100%;">}}

Obtenez des informations sur le déploiement de service sélectionné, telles que le nombre de déploiements réussis et échoués au fil du temps, la durée moyenne de déploiement, le nombre de retours en arrière et le taux d'échec. La partie inférieure de la page affiche un tableau avec les exécutions de déploiement pour le service, en fonction du filtre d'environnement sélectionné.

## Deployment Executions {#deployment-executions}

La [page **Deployment Executions**][4] affiche toutes les exécutions d'un déploiement au cours de la période sélectionnée. Utilisez les facettes à gauche pour filtrer la liste des exécutions de déploiement et cliquez sur une exécution pour afficher des détails supplémentaires dans le panneau latéral Deployment Execution Details.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Panneau latéral Deployment Details sur la page Deployments" style="width:100%;">}}

Lorsqu'un déploiement est correctement associé à un pipeline dans CI Visibility, le panneau des exécutions de déploiement contient un nouvel onglet {{< ui >}}Pipeline{{< /ui >}} à partir duquel la trace du pipeline est visible. Depuis cet onglet, vous pouvez accéder à CI Visibility en cliquant sur le lien {{< ui >}}View Full Pipeline{{< /ui >}} en haut :

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Panneau des exécutions de déploiement avec l'onglet Pipeline" style="width:100%;">}}

Une configuration supplémentaire peut être nécessaire pour associer un déploiement à un pipeline CI. Pour plus d'informations, consultez la page de configuration de votre fournisseur CD.

La [page Deployment Executions][4] vous permet de [rechercher et filtrer](#search-and-filter), [analyser](#analyze), [visualiser](#visualize) et [exporter](#export) les exécutions de déploiement à plusieurs niveaux à l'aide de n'importe quel tag.

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="Résultats des exécutions de déploiement affichés dans CD Visibility Explorer" width="100%" >}}

### Rechercher et filtrer {#search-and-filter}

Vous pouvez restreindre, élargir ou réorienter votre recherche vers un sous-ensemble d'exécutions de déploiement en cliquant sur les facettes à gauche ou en saisissant votre propre requête dans la barre de recherche. Lorsque vous sélectionnez et désélectionnez des facettes, la barre de recherche reflète automatiquement vos modifications. De même, vous pouvez modifier la requête dans la barre de recherche ou en rédiger une nouvelle pour sélectionner et désélectionner les facettes à gauche. Pour savoir comment créer des requêtes, consultez [Syntaxe de recherche][2].

### Analyser {#analyze}

Pour obtenir ou consolider des informations, regroupez les exécutions de déploiement correspondant à votre requête en entités de niveau supérieur, telles que des champs, des modèles et des transactions. Les [facettes][3] ne sont pas nécessaires pour rechercher des attributs, mais vous pouvez les utiliser pour effectuer les actions suivantes :

- Recherchez et suivez la progression des déploiements dans vos environnements.
- Examinez chaque résultat de déploiement pour identifier les déploiements en échec et résoudre les problèmes associés.

### Visualiser {#visualize}

Sélectionnez un type de visualisation pour afficher les résultats de vos filtres et agrégations et mieux comprendre vos exécutions de déploiement. Par exemple, vous pouvez afficher vos résultats de déploiement dans une liste pour organiser vos données de déploiement en colonnes. Ou bien, affichez les résultats de déploiement dans un graphique de série temporelle pour mesurer vos données de déploiement au fil du temps.

### Exporter {#export}

Exportez votre [vue][5] depuis la [page Deployment Executions][4] pour la réutiliser ultérieurement ou dans d'autres contextes.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_delivery/search
[2]: /fr/continuous_delivery/explorer/search_syntax
[3]: /fr/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /fr/continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments