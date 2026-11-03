---
further_reading:
- link: /continuous_integration/
  tag: Documentation
  text: CI Visibility
- link: /tests/
  tag: Documentation
  text: Test Optimization
title: Optimisation CI/CD
---
L'optimisation CI/CD combine les expériences de [CI Visibility][1] et de [Test Optimization][2] de Datadog dans une interface unifiée. Elle offre un emplacement unique pour comprendre, surveiller et améliorer l'ensemble de votre écosystème CI/CD, des exécutions de pipelines aux exécutions de tests individuelles.

Pour activer la nouvelle expérience, cliquez sur {{< ui >}}Try It Now{{< /ui >}} en haut de n'importe quelle page dans CI Visibility ou Test Optimization. Vous pouvez revenir à l'interface utilisateur précédente à tout moment en cliquant sur {{< ui >}}Switch Back{{< /ui >}}.

Cette page fournit une vue d'ensemble des fonctionnalités clés de CI/CD Optimization, dont certaines conservent la fonctionnalité originale de CI Visibility et de Test Optimization. Suivez les liens vers la documentation héritée pour obtenir des détails sur l'utilisation de chaque produit au sein de l'interface utilisateur unifiée.

## Vue d'ensemble CI/CD {#cicd-overview}

Explorez les métriques clés de fiabilité et de performance CI sur la page CI/CD {{< ui >}}Overview{{< /ui >}}. Le dashboard inclut des widgets pour suivre leur évolution dans le temps, des suggestions pour les améliorer et une vue d'ensemble du statut de vos monitors.

{{< img src="cicd_optimization/cicd_overview.png" alt="Dashboard CI/CD Overview" style="width:100%;" >}}

## Explorer unifié{#unified-explorer}

Parcourez les exécutions de pipelines et les exécutions de tests depuis une vue unique dans CI/CD {{< ui >}}Explorer{{< /ui >}}. Basculez entre les pipelines et les tests, et affinez les résultats par niveaux d'agrégation spécifiques :

- **Pipelines** : Pipeline, Phase, Job, Étape ou Commande
- **Tests** : Session, Module, Collection ou Test

{{< img src="cicd_optimization/explorer-2.png" alt="Explorer unifié avec bascule pour les données de pipeline et de test" style="width:100%;" >}}

Pour plus de détails sur la recherche, le filtrage et l'analyse de chaque type de données, consultez [CI Visibility Explorer][3] et [Test Optimization Explorer][4].

## Gestion des tests instables{#flaky-management}

Obtenez une vue d'ensemble de l'instabilité dans vos dépôts dans {{< ui >}}Flaky Management Overview{{< /ui >}}. Cette page fournit des graphiques de tendance, des suggestions de priorisation et des outils pour valider votre configuration.

{{< img src="cicd_optimization/flaky_overview-2.png" alt="Vue d'ensemble de la gestion des tests instables avec graphiques de tendance et suggestions de priorisation" style="width:100%;" >}}

Suivez et corrigez les tests instables directement depuis {{< ui >}}Flaky Management Explorer{{< /ui >}}. Vous pouvez visualiser les tendances des tests instables, identifier les tests problématiques et prendre des mesures pour améliorer la fiabilité des tests. Consultez [Flaky Tests Management][5] pour plus d'informations.

{{< img src="cicd_optimization/flaky_management-2.png" alt="Interface de gestion des tests instables montrant les tendances et les actions liées aux tests instables" style="width:100%;" >}}

## Flux de configuration continue {#continuous-setup-flow}

Configurez CI/CD Optimization pour un dépôt en un seul processus continu et guidé. Après avoir [connecté votre fournisseur CI][6] à Datadog, passez directement à l'étape suivante pour [configurer la collection de tests][7] que vous souhaitez surveiller.

{{< img src="cicd_optimization/setup_flow.png" alt="Flux de configuration continue pour le fournisseur CI et la collection de tests" style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

 [1]: /continuous_integration/
 [2]: /tests/
 [3]: /continuous_integration/explorer/
 [4]: /tests/explorer/
 [5]: /tests/flaky_management/
 [6]: /continuous_integration/pipelines/
 [7]: /tests/setup/