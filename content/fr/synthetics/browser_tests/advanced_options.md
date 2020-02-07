---
title: Options avancées pour les actions des tests Browser
kind: documentation
description: Configurer des options avancées pour les actions des tests Browser
further_reading:
  - link: synthetics/browser_tests/actions
    tag: Documentation
    text: En savoir plus les actions des tests Browser
---
## Sélecteur personnalisé

Par défaut, les [tests Browser][1] ont recours au système de localisateur de Datadog. Nous vous conseillons d'utiliser uniquement des sélecteurs personnalisés en cas de nécessité absolue. En effet, le système de localisateur de Datadog assure l'entretien automatique des tests.

Des sélecteurs personnalisés sont créés lorsqu'un utilisateur effectue une action pertinente dans la zone d'enregistrement sur un élément de votre page. Il peut par exemple **cliquer** sur un élément, le **survoler** ou effectuer une **assertion**. Cette action définit l'étape à suivre.

Pour spécifier votre localisateur personnalisé :

* Choisissez une [action][2] et réalisez-la dans le volet de scénario du test Browser.
* Une fois l'action enregistrée dans le volet de gauche, cliquez dessus.
* Cliquez sur **Advanced options**.
* L'élément HTML peut ensuite être sélectionné à l'aide d'un X-path ou d'une classe ou d'un ID CSS, comme `div`, `h1` ou `.hero-body`.
* Après avoir défini l'élément, cliquez sur **Test** pour le mettre en évidence dans l'enregistrement à droite.

{{< img src="synthetics/browser_tests/advanced_options/css.gif" alt="Élément mis en évidence du test">}}

Par défaut, la case **If user specified locator fails, fail test** est cochée. Cela signifie qu'en cas d'échec du localisateur, le test échoue.

Vous pouvez choisir d'appliquer un algorithme de test Browser standard en décochant cette case.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Option d'échec du test" style="width:70%">}}

## Durée d'expiration

Lorsqu'un test Browser ne parvient pas à localiser un élément, par défaut, il continue d'exécuter l'action pendant 60 secondes.

Vous pouvez choisir d'augmenter ou de réduire cette durée (max : 300 secondes) si vous souhaitez prolonger ou limiter la période de recherche de l'élément cible de l'étape.

{{< img src="synthetics/browser_tests/advanced_options/step_to_fail.png" alt="Durée d'expiration" style="width:50%">}}

## Étape facultative

Dans certaines situations, par exemple lorsqu'une fenêtre contextuelle s'affiche, vous pouvez faire en sorte que certaines étapes soient facultatives. Pour ce faire, cochez la case **Allow this step to fail**. Si l'étape échoue après la durée d'expiration indiquée (par défaut, 60 secondes), le test se poursuit et passe à la prochaine étape.

{{< img src="synthetics/browser_tests/advanced_options/timeout.png" alt="Allow this step to fail" style="width:25%">}}

## Sous-tests

Les options avancées des [sous-tests][3] vous permettent également de définir l'endroit où le sous-test doit être exécuté :

* **Main** (valeur par défaut) : le sous-test s'exécute dans votre onglet principal, à la suite des autres étapes.
* **New** : le sous-test s'exécute dans un nouvel onglet, qui se ferme à la fin du sous-test. L'onglet ne peut donc pas être réutilisé.
* **Specific tab** : le sous-test s'exécute dans un onglet numéroté, qui peut être réutilisé par d'autres sous-tests.

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Sous-tests" style="width:60%">}}

En ouvrant votre sous-test dans l'onglet principal, celui-ci s'exécute à la suite de votre test principal. Il utilise ainsi l'URL de l'étape précédente. À l'inverse, si vous ouvrez votre sous-test dans un nouvel onglet, on dans un onglet spécifique, le test s'exécute sur l'URL de départ du sous-test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/
[2]: /fr/synthetics/browser_tests/actions
[3]: /fr/synthetics/browser_tests/actions/#subtests