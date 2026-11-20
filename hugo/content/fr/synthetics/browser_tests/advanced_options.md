---
aliases:
- /fr/synthetics/guide/browser-tests-switch-tabs/
- /fr/synthetics/guide/browser-test-self-maintenance/
description: Configurez les options avancées pour les étapes des tests de navigateur
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Surveillance de l'expérience utilisateur avec les tests de navigateur Synthetic
- link: /synthetics/browser_tests/test_steps/
  tag: Documentation
  text: En savoir plus sur les étapes des tests de navigateur
title: Options avancées pour les étapes de test de navigateur
---
## Présentation {#overview}

Cette page décrit les options avancées pour les tests de navigateur de Synthetic Monitoring. 

## Localisez un élément {#locate-an-element}

### Algorithme Datadog {#datadog-algorithm}

L'instabilité est un point sensible dans les tests de bout en bout, car ceux-ci échouent parfois lorsqu'une équipe frontend apporte des changements : un identifiant modifié dans votre test déclenche alors une alerte plutôt qu'un véritable problème de l'application.

Pour éviter les tests instables, Datadog utilise un algorithme qui exploite un ensemble de localisateurs pour cibler des éléments dans les tests de navigateur. Un petit changement dans l'interface utilisateur peut modifier un élément (par exemple, en le déplaçant vers un autre emplacement). Le test de navigateur localise automatiquement l'élément à nouveau en se basant sur des points de référence qui n'ont pas été affectés par le changement. 

Lorsque le test s'exécute avec succès, le test de navigateur recalcule (ou « s'auto-répare ») les localisateurs défectueux en leur attribuant des valeurs mises à jour, afin que vos tests ne soient pas interrompus par des modifications mineures de l'interface utilisateur et s'adaptent automatiquement à celle de votre application. 

Pour vous assurer que votre test de navigateur ne valide pas un changement inattendu, utilisez des [assertions][5] lors de la création de votre test. Les assertions vous permettent de définir les comportements attendus et inattendus au cours du parcours des étapes du test. 

### Localisateur spécifié par l'utilisateur {#user-specified-locator}

Par défaut, les tests de navigateur utilisent le système de localisation Datadog. Lorsqu'un test recherche un élément spécifique avec lequel interagir (par exemple, un bouton de paiement), au lieu de rechercher un élément à l'aide d'un XPath ou d'un sélecteur CSS spécifique, il utilise plusieurs points de référence pour le localiser (par exemple, XPath, texte, classes et éléments à proximité). 

Ces points de référence deviennent un ensemble de localisateurs, dont chacun définit l'élément de manière unique. Vous ne devriez utiliser des sélecteurs personnalisés que dans des cas exceptionnels, car le système de localisation Datadog permet aux tests de s'auto-maintenir.

Les sélecteurs personnalisés sont créés en effectuant une étape souhaitée dans l'enregistreur (telle qu'un **clic**, un **survol** ou une **assertion**) sur n'importe quel élément de votre page. Ceci spécifie le type d'étape qui doit être effectué.

Pour utiliser un identifiant spécifique (par exemple, pour cliquer sur l'élément `nth` dans un menu déroulant, quel que soit le contenu de l'élément) :

1. Enregistrez ou ajoutez manuellement une [étape][1] à votre enregistrement.
2. Cliquez sur l'étape enregistrée et cliquez sur {{< ui >}}Advanced options{{< /ui >}}.
3. Saisissez un sélecteur XPath 1.0 ou une classe/un ID CSS sous {{< ui >}}User Specified Locator{{< /ui >}}, par exemple : `div`, `h1` ou `.hero-body`, pour l'élément HTML.
4. Vous pouvez aussi utiliser la syntaxe Handlebars (`{{`) pour insérer du contenu dynamique. Une liste déroulante pré-remplie de variables s'affiche :

{{< img src="synthetics/browser_tests/advanced_options/advanced_user_locator_2.png" alt="Champ du localisateur défini par l'utilisateur, avec la syntaxe Handlebars et les variables mises en surbrillance" style="width:70%">}}

5. Une fois que vous avez défini un élément, cliquez sur {{< ui >}}Highlight{{< /ui >}} pour mettre l'élément en surbrillance dans l'enregistrement à droite.

Par défaut, la case {{< ui >}}If user specified locator fails, fail test{{< /ui >}} est cochée. Cela signifie que si le localisateur défini échoue, le test est considéré comme un échec.

{{< img src="synthetics/browser_tests/advanced_options/css_2.mp4" alt="Test Highlighted Element" video=true >}}

Vous pouvez décider de revenir à l'algorithme de test de navigateur standard en décochant la case {{< ui >}}If user specified locator fails, fail test{{< /ui >}}.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Option Fail test" style="width:70%">}}


## Délai d'attente {#timeout}

Si un test de navigateur ne parvient pas à localiser un élément, il réessaie l'étape pendant 60 secondes.

Vous pouvez décider de diminuer ou d'augmenter ce délai d'attente jusqu'à 300 secondes si vous souhaitez que votre test attende moins ou plus longtemps pour pouvoir trouver l'élément ciblé par l'étape.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Délai avant échec" style="width:50%">}}

## Étape facultative {#optional-step}

Pour rendre une étape facultative, comme une étape qui ferme une fenêtre contextuelle, sélectionnez {{< ui >}}If this step fails, continue to next step{{< /ui >}}. Si l'étape échoue après son délai d'expiration (60 secondes par défaut), le test exécute l'étape suivante.

Cette option affiche également {{< ui >}}If this step fails, mark test as failed{{< /ui >}}, qui est sélectionné par défaut. Si elle est sélectionnée, le test échoue toujours après l'exécution des étapes restantes. Pour que le test reste réussi lorsque l'étape facultative échoue, décochez cette option.

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="Options avancées de l'étape avec « continue to next step » sélectionné et « mark test as failed » décoché." style="width:50%">}}

## Quitter en cas de succès {#exit-on-success}

Configurez cette option pour quitter le test après la réussite d'une étape. Cela évite d'exécuter des étapes inutiles et de marquer le test comme un échec.

{{< img src="synthetics/browser_tests/advanced_options/exit_on_success_browser.png" alt="Quitter en cas de succès" style="width:50%">}}

## Toujours exécuter cette étape {#always-run-this-step}

Configurez cette option pour exécuter cette étape même si les étapes précédentes ont échoué. Cela peut être utile pour les tâches de nettoyage lorsque vous souhaitez que les étapes suivantes se poursuivent.

{{< img src="synthetics/browser_tests/advanced_options/always_run_step.png" alt="Toujours exécuter l'étape même si les étapes précédentes ont échoué" style="width:50%">}}


## Empêcher la capture d'écran {#prevent-screenshot-capture}

Vous pouvez empêcher la capture d'écran d'une étape lors de l'exécution du test. Ceci est utile pour garantir qu'aucune donnée sensible n'apparaisse dans vos résultats de test. Utilisez cette option avec précaution car elle peut rendre le dépannage des échecs plus difficile. Pour plus d'informations, consultez [Synthetic Monitoring Data Security][2].

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="Option de capture d'écran" style="width:50%">}}

**Remarque :** Cette fonctionnalité est également disponible au niveau global du test en tant qu'[option avancée][3] dans la configuration de votre test de navigateur.

## Sous-tests {#subtests}

Les options avancées pour les [sous-tests][4] vous permettent de choisir où vous souhaitez exécuter votre sous-test et de définir le comportement de votre test de navigateur si le sous-test échoue.

{{< img src="synthetics/browser_tests/advanced_options/subtest_advanced_2.png" alt="Options avancées pour les sous-tests dans les tests de navigateur" style="width:60%">}}

### Définir la fenêtre du sous-test {#set-the-subtest-window}

* {{< ui >}}Main (default){{< /ui >}} : Le sous-test est exécuté dans votre fenêtre principale, à la suite des autres étapes.
* {{< ui >}}New{{< /ui >}} : Le sous-test est exécuté dans une nouvelle fenêtre, qui est fermée à la fin du sous-test. Cela signifie que la fenêtre ne peut pas être réutilisée.
* {{< ui >}}Specific window{{< /ui >}} : Le sous-test est exécuté dans une fenêtre numérotée, qui peut être réutilisée par d'autres sous-tests.

Ouvrir votre sous-test dans la fenêtre principale signifie que votre sous-test est la continuation de votre test principal car il utilise l'URL de l'étape précédente. Ouvrir votre sous-test dans une nouvelle fenêtre, ou dans une fenêtre spécifique, signifie que le test commence à s'exécuter à partir de l'URL de début du sous-test.

### Définir le comportement en cas d'échec {#set-failure-behavior}

Sélectionnez {{< ui >}}If this step fails, continue to next step{{< /ui >}} pour que le test parent continue si le sous-test échoue. {{< ui >}}If this step fails, mark test as failed{{< /ui >}} est sélectionné par défaut. Lorsqu'il est sélectionné, le test parent échoue après l'exécution de ses étapes restantes. Pour que le test parent soit toujours considéré comme réussi lorsque le sous-test échoue, décochez cette option.

### Définir le comportement en cas de succès {#set-success-behavior}

Cliquez sur {{< ui >}}If this step succeeds, stop this test and mark it as passed{{< /ui >}} pour vous assurer que votre test de navigateur s'arrête immédiatement et est marqué comme réussi.

### Définir le comportement d'exécution {#set-execution-behavior}

Cliquez sur {{< ui >}}Always run this step{{< /ui >}} pour vous assurer que cette étape s'exécute même si les étapes précédentes du test de navigateur ont échoué.

### Remplacer les variables dans les sous-tests {#override-variables-in-subtests}

Pour remplacer la valeur d'une variable dans un sous-test d'un test de navigateur, nommez la variable dans le sous-test et utilisez le même nom de variable dans le test parent ; le test de navigateur remplacera alors la valeur du sous-test.

Pour plus d'informations, consultez [Étapes d'un test de navigateur][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/test_steps/
[2]: /fr/data_security/synthetics/
[3]: /fr/synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /fr/synthetics/browser_tests/test_steps/#subtests
[5]: /fr/synthetics/browser_tests/test_steps/#assertion