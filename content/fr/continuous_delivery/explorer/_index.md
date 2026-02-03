---
description: Découvrez comment interroger et visualiser les déploiements CD Visibility.
further_reading:
- link: /continuous_delivery/features
  tag: Documentation
  text: Découvrir les fonctionnalités de CD Visibility
- link: /continuous_delivery/deployments/
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer/saved_views
  tag: Documentation
  text: En savoir plus sur les vues enregistrées
title: Explorer les déploiements CD Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Déploiements

Pour obtenir une vue d'ensemble de vos déploiements, accédez à [**Software Delivery** > **CD Visibility** > **Deployments**][6].

La [page **Déploiements**][6] affiche des statistiques agrégées par service et environnement sur la période sélectionnée, ainsi que le statut de la dernière exécution du déploiement. Depuis cette page, vous pouvez visualiser tous vos déploiements de service et vérifier leur santé. Les métriques affichées représentent notamment le nombre d'exécutions et d'échecs, le taux d'échec, la durée médiane et le 95e centile de la durée. Ces données permettent d'identifier les déploiements qui ont une plus forte probabilité d'échec ainsi que les déploiements dont l'exécution est la plus longue. Vous pouvez consulter le statut, la révision et l'heure du dernier résultat de déploiement pour évaluer l'impact de vos récents changements.

<div class="alert alert-info">Les déploiements sans service configuré et les exécutions partielles de déploiement sont exclus des statistiques agrégées sur la page Deployments. Vous pouvez rechercher ces déploiements sur la page Deployment Executions avec la requête suivante : <code>@deployment.partial_deployment:* OR -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="La page Deployments dans Datadog" style="width:100%" >}}

Si vous déployez des services dans un environnement de différentes façons, vous pouvez développer les rangées des déploiements pour afficher des statistiques filtrées par nom de déploiement.

La page **Deployment** affiche des informations générales, notamment :

- Une vue d'ensemble de la santé des différents services et environnements, avec des statistiques agrégées
- Une vue permettant de détecter et de corriger les problèmes immédiats et urgents, comme des déploiements défectueux en production 
- Des renseignements sur le déploiement de chaque service, son évolution, les résultats obtenus et les tendances

### Détails du déploiement

Cliquez sur un déploiement de service spécifique pour afficher la page **Deployment Details**. Celle-ci vous permet de visualiser les données du déploiement de service que vous avez sélectionné sur un intervalle donné.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Page Deployment pour un seul déploiement" style="width:100%;">}}

Obtenez de précieuses informations sur le déploiement de service sélectionné, comme le nombre de déploiements réussis et échoués, la durée moyenne du déploiement, le nombre de rollbacks et le taux d'échec. La partie inférieure de la page comporte un tableau indiquant les exécutions de déploiement pour le service, en fonction du filtre d'environnement sélectionné.

## Exécutions de déploiement

La [page **Deployment Executions**][4] affiche chaque exécution d'un déploiement lors de l'intervalle sélectionné. Utilisez les facettes à gauche de la page pour filtrer la liste des exécutions de déploiement, et cliquez sur une exécution pour afficher des détails supplémentaires à son sujet dans le volet latéral Deployment Execution Details.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Volet latéral Deployment Details de la page Deployments" style="width:100%;">}}

Lorsqu'un déploiement est correctement associé à un pipeline dans CI Visibility, le volet des exécutions de déploiement comporte un nouvel onglet **Pipeline**. Cet onglet vous permet de visualiser la trace du pipeline, mais également de cliquer sur le lien **View Full Pipeline** en haut de la vue pour accéder à CI Visibility :

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Volet des exécutions de déploiements avec l'onglet Pipeline" style="width:100%;">}}

Des étapes de configuration supplémentaires peuvent être nécessaires pour pouvoir associer un déploiement à un pipeline de CI. Pour en savoir plus, consultez la page de configuration de votre fournisseur CD.

Depuis la [page Deployment Executions][4], vous pouvez [rechercher et filtrer](#rechercher-et-filtrer-des-executions), [analyser](#analyser-des-executions), [visualiser](#visualiser-des-executions) et [exporter](#exporter-des-executions) des exécutions de déploiement à différents niveaux en utilisant n'importe quel tag.

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="Résultats d'exécutions de déploiement s'affichant dans le CD Visibility Explorer" width="100%" >}}

### Rechercher et filtrer des exécutions

Vous pouvez restreindre, élargir ou modifier les données affichées en affichant un sous-ensemble d'exécutions de déploiement. Pour ce faire, cliquez sur les facettes sur la gauche, ou rédigez votre propre requête personnalisée dans la barre de recherche. Lorsque vous sélectionnez ou désélectionnez des facettes, la barre de recherche reflète automatiquement vos changements. De même, vous pouvez modifier la requête de la barre de recherche ou écrire une nouvelle requête dans la barre de recherche pour sélectionner et désélectionner les facettes à gauche. Pour découvrir comment créer des requêtes, consultez la section [Syntaxe de recherche][2].

### Analyser des exécutions

Pour déduire ou consolider des informations, regroupez les exécutions de déploiement interrogées dans des entités de niveau supérieur telles que des champs, des patterns et des transactions. Il n'est pas nécessaire d'utiliser des [facettes][3] pour rechercher des attributs. Les facettes vous permettent toutefois d'accomplir ce qui suit :

- Rechercher des déploiements dans vos environnements et surveiller leur progression
- Étudier chaque résultat de déploiement afin d'identifier et de diagnostiquer les échecs

### Visualiser des exécutions

Sélectionnez un type de visualisation pour afficher les résultats de vos filtres et agrégations, afin de mieux comprendre vos exécutions de déploiement. Par exemple, vous pouvez afficher les résultats de vos déploiements dans une liste pour organiser les données associées dans des colonnes. Vous avez également la possibilité de consulter les résultats de vos déploiements dans un graphique de série temporelle, afin de mesurer l'évolution de vos données de déploiement.

### Exporter des exécutions

Exportez votre [vue][5] sur la [page Deployment Executions][4] pour la réutiliser plus tard ou dans un autre contexte.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_delivery/search
[2]: /fr/continuous_delivery/explorer/search_syntax
[3]: /fr/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /fr/continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments