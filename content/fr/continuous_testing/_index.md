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
- link: /synthetics/private_locations/#redimensionner-votre-emplacement-prive
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /continuous_testing/troubleshooting/
  tag: Documentation
  text: Résoudre les problèmes liés aux tests continus et au CI/CD
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: blog
  text: Utiliser les tests continus Datadog pour effectuer des déploiements en toute
    confiance
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: blog
  text: Conseils à suivre pour effectuer des tests continus avec Datadog
kind: documentation
title: Tests continus
---

<div class="alert alert-info">Cette page explique comment exécuter des tests continus dans vos pipelines CI/CD. Si vous souhaitez consulter vos métriques et dashboards CI/CD, consultez plutôt la section <a href="/continuous_integration/" target="_blank">CI Visibility.</a></div>

La solution de test en continu Datadog propose un ensemble d'outils conçus pour automatiser les tests logiciels sur l'ensemble du cycle de vie d'un produit. En offrant des tests de bout en bout fiables et sans code, ainsi que des intégrations pratiques avec les [fournisseurs de CI][1] et les outils de collaboration populaires, cette solution vous aide à accélérer le développement de vos applications et à déployer des fonctionnalités de haute qualité plus rapidement. 

## Testez rapidement et facilement

Utilisez les fonctionnalités évolutives telles que l'[enregistreur Web sans code][2], les [exécutions de tests en parallèle][3] et les tests multi-emplacements pour faire gagner du temps à votre équipe d'assurance qualité.

{{< img src="continuous_testing/continuous_testing_selection.png" alt="Exécutez vos tests de manière séquentielle ou personnalisez le nombre de tests pouvant s'exécuter en parallèle sur la page des paramètres des tests continus" style="width:100%;">}}

Grâce au vaste nombre de protocoles, frameworks et API pris en charge, dont gRPC et WebSockets, vous pouvez exécuter des tests à chaque niveau de votre stack d'applications.


## Améliorez la fiabilité de vos tests

Au lieu d'implémenter du code de test, vous pouvez utiliser les [tests sans code robustes et évolutifs de la surveillance Synthetic][4] pour votre processus de développement. Profitez de résultats plus fiables en minimisant les faux positifs grâce aux tests autonomes et aux nouvelles tentatives automatiques. Pour optimiser l'expérience de vos utilisateurs, vous pouvez mettre en place des [tests multi-navigateurs][2] automatiques.

## Augmentez votre efficacité grâce aux intégrations pratiques

Accélérez le développement de votre application en réalisant vos tests et vos dépannages sur une seule et même plateforme. Faites votre choix parmi les fournisseurs de CI et les outils de collaboration suivants, tels que Slack ou Jira, pour fusionner vos workflows et tout faire depuis une seule interface. 

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

Vous pouvez tirer parti du [fournisseur Terraform Datadog][10] pour contrôler la création des tests et la gestion de leurs états. Utilisez vos tests Synthetic en tant que [tests d'intégration et tests de bout en bout][11] pour vos déploiements de staging, de pré-production et canary, ou exécutez-les directement dans vos [pipelines CI][11].

## Accélérez les dépannages

En exécutant vos tests dans une plateforme de surveillance unifiée, vous serez à même d'identifier plus rapidement la cause réelle des échecs de test et à réduire votre MTTR. Obtenez toutes les données de contexte dont vous avez besoin sans avoir à passer d'un outil à l'autre en visualisant les métriques, les traces et les logs associés grâce à l'[intégration APM][12] de Datadog, et en examinant les tâches exécutées dans l'[explorateur de tests continus][11].

{{< img src="continuous_testing/open_sidepanel.png" alt="Lots CI dans l'explorateur de tests continus" style="width:100%;">}}

## Utiliser l'explorateur de surveillance Synthetic et de tests en continu

Créez des [requêtes de recherche et des visualisations][11] pour vos exécutions de test Synthetic ou vos lots de tests exécutés dans des pipelines CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches.png" alt="Explorateur de tests continus" style="width:100%;">}}

## Prêt à vous lancer ?

Après avoir configuré quelques [tests Synthetic][4], consultez la documentation dédiée au [fournisseur de CI/CD][1] de votre choix ou utilisez le [package NPM datadog-ci][14] dans vos pipelines CI/CD. Ensuite, commencez à explorer les informations sur vos lots de tests dans l'[explorateur de tests continus][11].

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