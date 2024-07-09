---
further_reading:
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: Intégrer vos tests continus dans vos pipelines de CI/CD
- link: /synthetics/api_tests/
  tag: Documentation
  text: Configurer un test API
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurer un test Browser
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentation
  text: Explorer vos données RUM et Session Replay dans Synthetics
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Créer et gérer des tests avec Terraform
title: Paramètres des tests continus
---

## Présentation

Pour accéder aux paramètres des tests continus, rendez-vous sur la page [Paramètres de la surveillance Synthetic][1].

{{< img src="continuous_testing/continuous_testing_default.png" alt="Paramètres par défaut des tests continus" style="width:100%;">}}

Par défaut, seul un test peut être exécuté à la fois. Pour modifier ce comportement, définissez une [valeur de parallélisation](#configurer-la-parallélisation) et enregistrez votre sélection.

## Parallélisation

Les tests parallèles sont des tests exécutés simultanément au sein de vos pipelines d'intégration continue et de livraison continue (CI/CD). 

{{< img src="continuous_testing/continuous_testing_parallelization.png" alt="Définir la parallélisation pour les tests continus" style="width:100%;">}}

Vous pourrez ainsi :

* Réduire la durée des pipelines et déployer vos nouvelles fonctionnalités plus rapidement
* Augmenter la fiabilité de votre processus de développement et la vitesse de livraison
* Bénéficier d'un panel de tests complet et empêcher les bugs d'arriver dans votre environnement de production

### Configurer la parallélisation

1. Sous **Set your preferences**, sélectionnez l'option **Parallelization**. 
2. Personnalisez la parallélisation en fonction du nombre de tests que vous souhaitez exécuter en parallèle.
3. Cliquez sur **Save Selection**.
4. Confirmez votre sélection.

## Autorisations

Afin de personnaliser la parallélisation des tests continus, vous devez disposer de l'autorisation `billing_edit`. 

Dans le cas contraire, l'erreur suivante s'affiche : `You're missing edit permission for Continuous Testing settings. You can run 15 tests in parallel. To increase this value, reach out to your administrator admin.email@datadoghq.com`

Pour en savoir plus, consultez la section [Autorisations des rôles Datadog][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/settings/
[2]: /fr/account_management/rbac/permissions/#billing-and-usage