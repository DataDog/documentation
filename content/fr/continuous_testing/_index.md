---
cascade:
  algolia:
    rank: 70
description: Personnalisez le nombre de tests continus pouvant s'exécuter en parallèle
  dans vos pipelines CI/CD pour augmenter la couverture de vos tests.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions des tests continus Datadog (connexion à l'application
    requise)
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centre d'apprentissage
  text: Tests continus dans un pipeline CI/CD
- link: /getting_started/continuous_testing
  tag: Documentation
  text: En savoir plus sur les tests continus
- link: /synthetics/private_locations/#redimensionner-votre-emplacement-prive
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /continuous_testing/environments
  tag: Documentation
  text: En savoir plus sur les tests dans des environnements locaux et intermédiaires
- link: /continuous_testing/troubleshooting/
  tag: Documentation
  text: Résolution des problèmes liés aux tests continus et au CI/CD
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: Blog
  text: Tirer profit des tests continus Datadog pour publier en toute confiance de
    nouvelles versions
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: Blog
  text: Conseils à suivre pour utiliser les tests continus Datadog
kind: documentation
title: Tests continus
---

<div class="alert alert-info">Cette page explique comment exécuter des tests continus dans vos pipelines de CI/CD. Si vous souhaitez consulter vos dashboards et métriques relatives au CI/CD, consultez plutôt la documentation relative à <a href="/continuous_integration/" target="_blank">CI Visibility</a>.</div>

Les tests continus Datadog vous offrent tous les outils dont vous avez besoin pour automatiser le testing logiciel d'un produit, et ce durant tout son cycle de vie. Ses intégrations de testing de bout en bout à la fois fluides et fiables vous permettent d'utiliser des [fournisseurs de CI populaires][1] ainsi que des outils de collaboration, sans avoir à saisir la moindre ligne de code. Grâce aux tests continus Datadog, vous pouvez réduire la durée du cycle de développement de vos applications et publier plus rapidement des fonctionnalités de qualité.

## Exécuter des tests simples et rapides

Utilisez des fonctionnalités évolutives telles qu'un [enregistreur web][2] sans code, un [enregistreur d'applications mobiles][15], des [exécutions de tests en parallèle][3] et des tests intégrés dans plusieurs emplacements pour faire gagner du temps à votre équipe d'assurance qualité et réduire sa quantité de travail. Vous pouvez exécuter vos tests de manière séquentielle et personnaliser le nombre de tests que vous souhaitez exécuter en même temps sur la [page des **paramètres**][3].

{{< img src="continuous_testing/settings/parallelization.png" alt="Page Continuous Testing Settings, avec la possibilité de choisir d'exécuter des tests de façon séquentielle ou de sélectionner le nombre de tests exécutés en parallèle" style="width:100%;">}}

Datadog prend en charge un grand nombre de protocoles, frameworks et API, y compris gRPC et WebSockets. Ainsi, vous pouvez tester des éléments à tous les niveaux du stack de votre application, ainsi que [sur n'importe quel environnement de pré-production][17].

## Améliorer la fiabilité des tests

Au lieu de rédiger du code et de l'implémenter, vous pouvez exploiter les [tests évolutifs, durables et sans code de la surveillance Synthetic][4]. Réduisez le nombre de faux positifs à l'aide des tests Browser avec réparation spontanée, des tests d'application mobile et de l'automatisation des nouvelles tentatives.

Pour garantir à vos utilisateurs une expérience optimale, vous pouvez automatiser les [tests inter-navigateurs][2] et les [tests d'applications mobiles][16]. Ces fonctionnalités de test continu sont utiles dans les lots CI où plusieurs tests sont exécutés pour couvrir une variété de scénarios et dʼenvironnements.

## Gagner en efficacité grâce aux intégrations directes

Simplifiez le développement de vos applications grâce à l'utilisation d'une plateforme de testing et de dépannage commune. Sélectionnez l'un des fournisseurs de CI ou des outils de collaboration suivants, par exemple [Slack][18] ou [Jira][19], pour rassembler vos workflows et ne perdre aucune information de contexte.

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

Le [fournisseur Terraform Datadog][10] vous permet de contrôler la création de tests et de gérer leurs états. Créez des tests Synthetic portant [sur une intégration précise ou sur un processus de bout en bout][11] pour vos environnements intermédiaires, vos environnements de pré-production et vos déploiements Canary, ou exécutez vos tests directement dans vos [pipelines de CI][11].

## Résoudre plus rapidement vos problèmes

L'exécution des tests dans une plateforme de surveillance unifiée vous aide à trouver la cause première des échecs et à réduire le temps moyen de résolution (MTTR). 

{{< img src="continuous_testing/ci_execution_side_panel.png" alt="Volet latéral pour des lots CI dans lʼexplorateur de surveillance Synthetic et de résultats de tests" style="width:100%;">}}

Bénéficiez d'un contexte complet pour le dépannage sans avoir à basculer d'un outil à un autre, grâce aux métriques, traces et logs corrélés qui s'affichent dans l'[intégration APM][12] Datadog. Pour accéder à ses données, consultez les tâches exécutées depuis lʼ[explorateur de surveillance Synthetic et de tests en continu][11].

## Examiner des lots CI dans l'Explorateur de surveillance Synthetic et de résultats de tests

Créez des [requêtes de recherche et des visualisations][11] pour vos exécutions de tests Synthetic ou vos exécutions groupées de tests dans des pipelines de CI/CD. 

{{< img src="continuous_testing/explorer/results_explorer.png" alt="Une liste de résultats de lots CI dans lʼexplorateur de surveillance Synthetic et de résultats de tests" style="width:100%;">}}

Vous pouvez surveiller des tests dʼexécution individuels et des lots complets de tests, et accéder à des informations pertinentes pour chaque type de test. 

## Prêt à vous lancer ?

Après avoir configuré quelques [tests Synthetic][4], consultez la documentation relative à votre principal [fournisseur de CI/CD][1] ou utilisez le [package NPM `datadog-ci`][14] dans vos pipelines de CI/CD. Référez-vous à la section [Tester des environnements intermédiaires et locaux][17] pour découvrir comment utiliser les tests continus dans des environnements qui ne sont pas publics ou en production. Vous pouvez par exemple exécuter des tests sur votre environnement de développement local ou sur un environnement intermédiaire au sein d'un réseau privé. Consultez ensuite lʼ[explorateur de surveillance Synthetic et de tests en continu][11] afin de passer en revue les détails sur vos exécutions groupées.

{{< learning-center-callout header="Familiarisez-vous avec les tests Synthetic en les exécutant au sein d'un pipeline de CI/CD depuis le centre d'apprentissage" btn_title="S'inscrire" btn_url="https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline">}}
  Le centre d'apprentissage Datadog propose un vaste choix de ressources vous permettant de vous familiariser avec les tests. Inscrivez-vous gratuitement pour découvrir comment exécuter un test Synthetic Datadog au sein d'un pipeline de CI/CD.
{{< /learning-center-callout >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_testing/cicd_integrations/
[2]: /fr/synthetics/browser_tests
[3]: /fr/continuous_testing/settings
[4]: /fr/synthetics/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[11]: /fr/continuous_testing/explorer
[12]: /fr/synthetics/apm/
[13]: https://app.datadoghq.com/synthetics/create#
[14]: /fr/continuous_testing/cicd_integrations/configuration
[15]: /fr/mobile_app_testing/mobile_app_tests
[16]: /fr/mobile_app_testing/
[17]: /fr/continuous_testing/environments
[18]: /fr/integrations/slack/
[19]: /fr/integrations/jira/