---
aliases:
- /fr/synthetics/guide/browser-tests-switch-tabs/
- /fr/synthetics/guide/browser-test-self-maintenance/
description: Configurer des options avancées pour les étapes des tests Browser
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Surveillance de l'expérience utilisateur avec les tests Browser Synthetic
- link: /synthetics/browser_tests/actions/
  tag: Documentation
  text: En savoir plus sur les étapes des tests Browser
title: Options avancées pour les étapes des tests Browser
---

## Présentation

Cette page décrit les options avancées relatives aux tests Browser Synthetic.


## Localiser un élément

### Algorithme Datadog

L'un des points faibles du testing de bout en bout réside dans la fragilité des tests. En effet, il arrive que la mise en œuvre d'un changement par une équipe frontend entraîne le dysfonctionnement d'un test : l'identifiant utilisé génère ainsi une alerte, alors que votre application ne rencontre aucun problème.

Pour éviter les tests irréguliers, l'algorithme Datadog exploite un ensemble de localisateurs permettent de cibler des éléments dans les tests Browser. Si un léger changement d'interface entraîne la modification d'un élément (par exemple, si celui-ci est déplacé vers un autre emplacement), le test repère automatiquement l'élément, en se basant sur les points de référence qui n'ont pas été modifiés par le changement d'interface.

Lorsque le test Browser se termine sans échouer, il recalcule les localisateurs non fonctionnels en leur attribuant une nouvelle valeur. On parle alors de réparation spontanée. Ainsi, vos tests continuent à fonctionner même après un simple changement d'interface. Ils peuvent donc s'adapter automatiquement aux différentes modifications apportées à l'interface de votre application.

Pour veiller à ce que votre test Browser ne valide pas un changement inattendu, utilisez des [assertions][5] lors de sa création. Elles vous permettent de définir les comportements attendus et inattendus associés au parcours de l'étape d'un test.

### Localisateur spécifié par l'utilisateur

Par défaut, les tests Browser utilisent le système de localisation de Datadog. Lorsqu'un test recherche un élément spécifique afin d'interagir avec lui (par exemple, un bouton de paiement), plutôt que de chercher un élément avec un XPath ou un sélecteur CSS précis, il se base sur plusieurs points de référence pour trouver l'élément (par exemple, un XPath, du texte, des classes ou d'autres éléments à proximité).

Ces points de référence constituent un ensemble de localisateurs. Chacun d'entre eux définit l'élément de façon unique. Utilisez uniquement des sélecteurs personnalisés en cas de nécessité absolue. En effet, le système de localisation de Datadog permet aux tests de s'adapter automatiquement en cas de changement.

Pour créer un sélecteur personnalisé, effectuez une action pertinente sur un élément de votre page dans la zone d'enregistrement (comme un **clic**, un **survol** ou une **assertion**, etc.). Cette action définit l'étape à suivre.

Pour utiliser un identifiant spécifique (par exemple, pour cliquer sur le `énième` élément d'un menu déroulant, peu importe le contenu de l'élément), procédez comme suit :

1. Enregistrez ou ajoutez manuellement une [étape][1] à votre enregistrement.
2. Cliquez sur l'étape enregistrée, puis sur **Advanced options**.
3. Saisissez un sélecteur XPath 1.0, ou une classe ou un ID CSS, dans le champ **User Specified Locator**. Exemple : `div`, `h1` ou `.hero-body` pour un élément HTML.
4. Après avoir défini l'élément, cliquez sur **Test** pour le mettre en évidence dans l'enregistrement à droite.

Par défaut, la case **If user specified locator fails, fail test** est cochée. Cela signifie qu'en cas d'échec du localisateur défini, le test échoue.

{{< img src="synthetics/browser_tests/advanced_options/css.mp4" alt="Élément mis en évidence du test" video=true >}}

Vous pouvez choisir d'appliquer l'algorithme de test Browser standard en décochant cette case.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Option d'échec du test" style="width:70%">}}

## Délai d'expiration

Lorsqu'un test Browser ne parvient pas à localiser un élément, il réessaie d'effectuer l'étape pendant 60 secondes.

Vous pouvez choisir d'augmenter ou de réduire cette durée (max : 300 secondes) si vous souhaitez prolonger ou limiter la période de recherche de l'élément cible de l'étape.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Délai avant échec" style="width:50%">}}

## Étape facultative

Dans certaines situations, par exemple lorsqu'une fenêtre contextuelle s'affiche, vous pouvez faire en sorte que certaines étapes soient facultatives. Pour ce faire, cochez la case **Allow this step to fail**. Si l'étape échoue après le délai d'expiration indiqué (par défaut, 60 secondes), le test se poursuit et passe à la prochaine étape.

{{< img src="synthetics/browser_tests/advanced_options/timeout.png" alt="Allow this step to fail" style="width:25%">}}

## Empêcher les captures d'écran

Vous pouvez éviter d'enregistrer une étape de capture d'écran lors de l'exécution d'un test. Cela peut s'avérer utile pour s'assurer qu'aucune donnée sensible ne figure dans les résultats du test. Utilisez cette option avec précaution, car elle peut rendre plus difficile le dépannage des problèmes. Pour en savoir plus, consultez la section [Sécurité des données liées à la surveillance Synthetic][2].

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="Option d'enregistrement de capture d'écran" style="width:50%">}}

**Remarque :** cette fonctionnalité peut également être appliquée à l'ensemble d'un test Browser. Il s'agit d'une [option avancée][3] de la configuration du test.

## Sous-tests

Grâce aux options avancées relatives aux [sous-tests][4], vous pouvez définir l'endroit où le sous-test doit être exécuté, mais également choisir le comportement de votre test Browser en cas d'échec du sous-test.

{{< img src="synthetics/browser_tests/advanced_options/subtest_advanced.png" alt="Options avancées relatives aux sous-tests dans des tests Browser" style="width:60%">}}

### Définir la fenêtre d'un sous-test

* **Main** (valeur par défaut) : le sous-test s'exécute dans votre fenêtre principale, à la suite des autres étapes.
* **New** : le sous-test s'exécute dans une nouvelle fenêtre, qui se ferme à la fin du sous-test. La fenêtre ne peut donc pas être réutilisée.
* **Specific window** : le sous-test s'exécute dans une fenêtre numérotée, qui peut être réutilisée par d'autres sous-tests.

En ouvrant votre sous-test dans la fenêtre principale, celui-ci s'exécute à la suite de votre test principal. Il utilise ainsi l'URL de l'étape précédente. À l'inverse, si vous ouvrez votre sous-test dans une nouvelle fenêtre ou dans une fenêtre spécifique, le test s'exécute sur l'URL de départ du sous-test.

### Définir le comportement en cas d'échec

Cliquez sur l'option **Continue with test if this step fails** pour que votre test Browser se poursuive en cas d'échec du sous-test ou sur l'option **Consider entire test as failed if this step fails** pour que le test échoue en cas d'échec du sous-test.

### Remplacer des variables dans des sous-tests

Pour remplacer la valeur d'une variable dans un sous-test d'un test Browser, attribuez un nom à la variable dans le sous-test, puis utilisez le même nom de variable dans le test parent. Le test Browser remplace alors la valeur du sous-test.

Pour en savoir plus, consultez la section [Étapes des tests Browser][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/actions/
[2]: /fr/data_security/synthetics/
[3]: /fr/synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /fr/synthetics/browser_tests/actions/#subtests
[5]: /fr/synthetics/browser_tests/actions/#assertion