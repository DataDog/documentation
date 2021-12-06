---
title: Options avancées pour les étapes des tests Browser
kind: documentation
description: Configurer des options avancées pour les étapes des tests Browser
further_reading:
  - link: /synthetics/browser_tests/actions/
    tag: Documentation
    text: En savoir plus sur les étapes des tests Browser
---
## Localisateur spécifié par l'utilisateur

Par défaut, les tests Browser ont recours au [système de localisation de Datadog][1]. Nous vous conseillons d'utiliser uniquement des localisateurs personnalisés en cas de nécessité absolue. En effet, le système de localisation de Datadog permet aux tests de s'adapter automatiquement en cas de changement.

Pour créer un localisateur personnalisé, effectuez une action pertinente sur un élément de votre page dans la zone d'enregistrement  (**cliquer**, **survoler**, exécuter une **assertion**, etc.). Cette action définit l'étape à suivre.

Pour spécifier votre localisateur personnalisé :

* Enregistrez ou ajoutez manuellement une [étape][2] à votre enregistrement.
* Cliquez sur l'étape enregistrée, puis sur **Advanced options**.
* L'élément HTML peut ensuite être sélectionné à l'aide d'un X-path ou une classe/un ID CSS, comme `div`, `h1` ou `.hero-body`.
* Après avoir défini l'élément, cliquez sur **Test** pour le mettre en évidence dans l'enregistrement à droite.

{{< img src="synthetics/browser_tests/advanced_options/css.gif" alt="Élément mis en évidence du test">}}

Par défaut, la case **If user specified locator fails, fail test** est cochée. Cela signifie qu'en cas d'échec du localisateur, le test échoue.

Vous pouvez choisir d'appliquer un algorithme de test Browser standard en décochant cette case.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Option d'échec du test" style="width:70%">}}

## Délai d'expiration

Lorsqu'un test Browser ne parvient pas à localiser un élément, par défaut, il continue d'exécuter l'étape pendant 60 secondes.

Vous pouvez choisir d'augmenter ou de réduire cette durée (max : 300 secondes) si vous souhaitez prolonger ou limiter la période de recherche de l'élément cible de l'étape.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Délai avant échec" style="width:50%">}}

## Étape facultative

Dans certaines situations, par exemple lorsqu'une fenêtre contextuelle s'affiche, vous pouvez faire en sorte que certaines étapes soient facultatives. Pour ce faire, cochez la case **Allow this step to fail**. Si l'étape échoue après le délai d'expiration indiqué (par défaut, 60 secondes), le test se poursuit et passe à la prochaine étape.

{{< img src="synthetics/browser_tests/advanced_options/timeout.png" alt="Allow this step to fail" style="width:25%">}}

## Empêcher les captures d'écran

Vous pouvez éviter d'enregistrer une étape de capture d'écran lors de l'exécution d'un test. Cela peut s'avérer utile pour s'assurer qu'aucune donnée sensible ne figure dans les résultats du test. Utilisez cette option avec précaution, car elle peut rendre plus difficile le dépannage des problèmes. Pour en savoir plus sur les recommandations de sécurité, consultez [cette page][3].

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="Option d'enregistrement de capture d'écran" style="width:50%">}}

**Remarque :** cette fonctionnalité peut également être appliquée à l'ensemble d'un test Browser. Il s'agit d'une [option avancée][4] de la configuration du test.

## Sous-tests

Les options avancées des [sous-tests][5] vous permettent également de définir l'endroit où le sous-test doit être exécuté :

* **Main** (valeur par défaut) : le sous-test s'exécute dans votre fenêtre principale, à la suite des autres étapes.
* **New** : le sous-test s'exécute dans une nouvelle fenêtre, qui se ferme à la fin du sous-test. La fenêtre ne peut donc pas être réutilisée.
* **Specific window** : le sous-test s'exécute dans une fenêtre numérotée, qui peut être réutilisée par d'autres sous-tests.

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Sous-tests" style="width:60%">}}

En ouvrant votre sous-test dans la fenêtre principale, celui-ci s'exécute à la suite de votre test principal. Il utilise ainsi l'URL de l'étape précédente. À l'inverse, si vous ouvrez votre sous-test dans une nouvelle fenêtre ou dans une fenêtre spécifique, le test s'exécute sur l'URL de départ du sous-test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/guide/browser-test-self-maintenance
[2]: /fr/synthetics/browser_tests/actions/
[3]: /fr/security/synthetics/
[4]: /fr/synthetics/browser_tests/?tab=privacy#test-configuration
[5]: /fr/synthetics/browser_tests/actions/#subtests