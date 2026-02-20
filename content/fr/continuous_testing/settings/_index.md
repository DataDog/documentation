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
- link: /mobile_app_testing/mobile_app_tests/
  tag: Documentation
  text: Configurer un test d'application mobile
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentation
  text: Explorer vos données RUM et Session Replay dans Synthetics
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Site externe
  text: Créer et gérer des tests avec Terraform
title: Paramètres des tests continus
---
{{< jqmath-vanilla >}}

## Présentation

Vous pouvez accéder aux paramètres Continuous Testing sur la [page des paramètres de Synthetic Monitoring et de Continuous Testing][1].

{{< img src="continuous_testing/settings/parallelization.png" alt="Définir la parallélisation pour vos tests Continuous Testing sur la page des paramètres" style="width:100%;">}}

Par défaut, tous vos tests exécutés dans les pipelines CI/CD s'exécutent de manière séquentielle (l'un après l'autre). Pour modifier ce comportement, définissez une [valeur de parallélisation](#définir-la-parallélisation) et enregistrez votre sélection.

## Parallélisation

Les tests parallèles sont des tests qui s'exécutent simultanément dans vos [pipelines d'intégration continue et de livraison continue (CI/CD)][4].

{{< img src="continuous_testing/parallelization_explained.png" alt="Diagramme expliquant les avantages de la parallélisation par rapport aux exécutions de tests séquentielles" style="width:100%;">}}

Vous pourrez ainsi :

* Réduire la durée des pipelines et déployer vos nouvelles fonctionnalités plus rapidement
* Augmenter la fiabilité de votre processus de développement et la vitesse de livraison
* Bénéficier d'un panel de tests complet et empêcher les bugs d'arriver dans votre environnement de production

### Estimer la parallélisation

Cliquez sur **Estimate Parallelization** pour voir combien de tests Datadog recommande d'exécuter en parallèle en fonction de vos [métriques Continuous Testing][3].

{{< img src="continuous_testing/estimated_parallelization.png" alt="Compléter l'assistant Estimate Parallelization dans les paramètres Continuous Testing" style="width:60%;">}}

Après avoir spécifié la durée prévue pour les tests dans votre pipeline CI et, éventuellement, le nombre moyen de tests par batch CI, la section **Estimated Parallelization** calcule le niveau de parallélisation que vous souhaitez définir :

$$\text"parallélisation estimée" = {\text"nombre moyen de tests par batch CI" * \text"durée moyenne de test"} / \text"durée prévue dans votre pipeline CI"$$

### Configurer la parallélisation

1. Sous **Set your preferences**, sélectionnez l'option **Parallelization**. 
2. Personnalisez la parallélisation en fonction du nombre de tests que vous souhaitez exécuter en parallèle.
3. Cliquez sur **Save Selection**.
4. Confirmez votre sélection.

{{< img src="continuous_testing/settings/parallelization.png" alt="Paramètres de parallélisation pour 25 exécutions de tests Continuous Testing parallèles" style="width:100%;">}}

## Autorisations

Afin de personnaliser la parallélisation des tests continus, vous devez disposer de l'autorisation `billing_edit`. 

Sinon, l'erreur suivante s'affiche : `You're missing edit permission for Continuous Testing settings. You can run your tests with a parallelization of X (up to X tests running at the same time at a given point during your CI). To increase this value, reach out to your administrator admin.email@datadoghq.com`.

Pour en savoir plus, consultez la section [Autorisations des rôles Datadog][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/settings/
[2]: /fr/account_management/rbac/permissions/#billing-and-usage
[3]: /fr/synthetics/metrics/#continuous-testing
[4]: /fr/continuous_testing/cicd_integrations