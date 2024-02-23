---
aliases:
- /fr/mobile_testing/mobile_app_tests/advanced_options
description: Configurer des options avancées pour les étapes des tests mobiles
further_reading:
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la gestion de tests de bout en bout
- link: /mobile_app_testing/mobile_app_tests/
  tag: Documentation
  text: Apprendre à créer des tests d'application mobile
- link: /mobile_app_testing/mobile_app_tests/steps/
  tag: Documentation
  text: Apprendre à créer les étapes de tests d'application mobile
- link: /data_security/synthetics/
  tag: Documentation
  text: En savoir plus sur la sécurité des données liées à la surveillance Synthetic
kind: documentation
title: Options avancées pour les étapes des tests d'application mobile
---

{{< site-region region="us3,us5,gov,eu,ap1" >}}
<div class="alert alert-warning">La solution Mobile Application Testing n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

{{< site-region region="us" >}}
<div class="alert alert-info">L'accès à la solution Mobile Application Testing est actuellement limité ; elle est disponible uniquement sur le site Datadog US1.</div>
{{< /site-region >}}

## Présentation

Cette page décrit les options avancées relatives aux tests d'application mobile Synthetic.

## Déterminer l'emplacement d'un élément

### Algorithme Datadog

Pour veiller à ce que votre test d'application mobile ne valide pas une modification inattendue apportée à l'IU de votre application mobile, utilisez des [assertions][1] lors de sa création. Les assertions vous permettent de définir les comportements attendus et inattendus associés au parcours de l'étape d'un test.

### Localisateur spécifié par l'utilisateur

Par défaut, les tests d'application mobile utilisent le système de localisation de Datadog. Lorsqu'un test recherche un élément spécifique afin d'interagir avec lui (par exemple, un bouton de paiement), plutôt que de chercher un élément avec un XPath ou un sélecteur CSS précis, il se base sur plusieurs points de référence pour trouver l'élément (par exemple, un XPath, du texte, des classes ou d'autres éléments à proximité).

Ces points de référence constituent un ensemble de localisateurs. Chacun d'entre eux définit l'élément de façon unique. Utilisez uniquement des sélecteurs personnalisés en cas de nécessité absolue. En effet, le système de localisation de Datadog permet aux tests de s'adapter automatiquement en cas de changement.

Pour créer un sélecteur personnalisé, effectuez une [action dans la zone d'enregistrement][1] (comme une **pression**, une **double pression** ou l'**ouverture d'un lien profond**, etc.) sur un élément de votre page. Cette action définit l'étape à suivre.

## Délai d'expiration

Lorsqu'un test d'application mobile ne parvient pas à localiser un élément, il réessaie par défaut d'effectuer l'étape pendant 60 secondes.

Vous pouvez personnaliser cette durée (valeur maximale : 60 secondes) si vous souhaitez limiter la période de recherche de l'élément cible de l'étape.

{{< img src="mobile_app_testing/timeout.png" alt="Attendre 30 secondes avant de déclarer que l'étape de test a échoué" style="width:50%" >}}

## Étape facultative

Dans certaines situations, par exemple lorsqu'une fenêtre contextuelle s'affiche, vous pouvez faire en sorte que certaines étapes soient facultatives. Pour ce faire, sélectionnez **Continue with test if this step fails**. Si l'étape échoue après le délai d'expiration indiqué, le test d'application mobile se poursuit et passe à la prochaine étape.

{{< img src="mobile_app_testing/failure_behavior.png" alt="Choisir si le test doit échouer ou se poursuivre en cas d'échec de l'étape du test" style="width:50%" >}}

Si vous le souhaitez, cliquez sur **Consider entire test as failed if this step fails** pour garantir l'exécution des étapes importantes.

## Empêcher les captures d'écran

Vous pouvez éviter d'enregistrer une capture d'écran de l'étape lors de l'exécution d'un test. Pour ce faire, cliquez sur **Do not capture screenshot for this step**.

{{< img src="mobile_app_testing/no_screenshots.png" alt="Ne pas enregistrer de capture d'écran pour cette étape du test" style="width:50%" >}}

Cela peut s'avérer utile pour s'assurer qu'aucune donnée sensible ne figure dans les résultats du test. Utilisez cette option avec précaution, car elle peut rendre plus difficile le dépannage des problèmes. Pour en savoir plus, consultez la section [Sécurité des données liées à la surveillance Synthetic][2].

## Sous-tests

Grâce aux options avancées relatives aux [sous-tests][3], vous pouvez définir le comportement de votre test d'application mobile en cas d'échec du sous-test.

{{< img src="mobile_app_testing/example_subtest.png" alt="Sélectionner un test mobile à ajouter comme sous-test" style="width:50%" >}}

### Définir le comportement en cas d'échec

Cliquez sur **Continue with test if this step fails** pour que votre test d'application mobile se poursuive en cas d'échec du sous-test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mobile_app_testing/mobile_app_tests/steps/
[2]: /fr/data_security/synthetics/
[3]: /fr/mobile_testing/mobile_app_tests/steps/#subtests