---
description: Enregistrez les étapes d’un test de navigateur avec une chaîne User-Agent
  personnalisée
further_reading:
- link: /synthetics/browser_tests/test_steps
  tag: Documentation
  text: Découvrez les étapes des tests de navigateur
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: Configurez les options avancées des étapes
title: Enregistrez des étapes avec un User-Agent personnalisé
---
## Présentation {#overview}

Certaines implémentations amènent les applications à s'afficher d'une certaine manière uniquement lors de l'utilisation d'une chaîne `User-Agent` spécifique (par exemple, lors de l'utilisation d'un `User-Agent` mobile). Dans ces cas, vous devez définir l'en-tête `User-Agent` sur une chaîne personnalisée pour pouvoir enregistrer les étapes de vos tests de navigateur dans votre application. Pour ce faire :

1. Ouvrez votre application dans une fenêtre contextuelle en cliquant sur {{< ui >}}Open in Popup{{< /ui >}} dans votre enregistreur de test de navigateur.
2. Ouvrez Chrome Developer Tools.
3. Cliquez sur le bouton de menu avec les trois points verticaux.
4. Sélectionnez l'option {{< ui >}}More tools - Network conditions{{< /ui >}}.
5. Accédez à l'onglet {{< ui >}}Network conditions{{< /ui >}} et désactivez l'option {{< ui >}}Select automatically{{< /ui >}}.
6. Choisissez {{< ui >}}Custom{{< /ui >}} et saisissez la chaîne `User-Agent` souhaitée.

**Remarque :** Vous pouvez remplacer la [chaîne `User-Agent` par défaut][1] lors de l'exécution du test en l'ajoutant en tant qu'en-tête dans votre configuration de test. 

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/guide/identify_synthetics_bots/?tab=browsertests#user-agent