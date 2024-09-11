---
description: Enregistrer des étapes de test Browser avec une chaîne user-agent personnalisée
further_reading:
- link: /synthetics/browser_tests/actions
  tag: Documentation
  text: En savoir plus sur les étapes des tests Browser
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: Configurer des options avancées pour les étapes
title: Enregistrer des étapes avec un user-agent personnalisé
---

## Présentation

Certaines pages sont configurées pour s'afficher d'une certaine façon lorsqu'une chaîne `User-Agent` spécifique est utilisée (par exemple, lors de l'utilisation d'un `User-Agent` mobile). Lorsque c'est le cas, vous devez définir l'en-tête `User-Agent` sur une chaîne personnalisée pour pouvoir enregistrer les étapes de vos tests Browser dans votre application. Pour ce faire, procédez comme suit :

1. Ouvrez votre application dans une fenêtre contextuelle en cliquant sur **Open in Popup** dans l'enregistreur de test Browser.
2. Ouvrez les outils de développement Chrome.
3. Cliquez sur les trois points verticaux pour ouvrir le menu.
4. Sélectionnez l'option **More tools - Network conditions**.
5. Accédez à l'onglet **Network conditions** et désactivez l'option **Select automatically**.
6. Choisissez **Custom** et saisissez la chaîne `User-Agent` que vous souhaitez utiliser.

**Remarque :** vous pouvez remplacer la [chaîne `User-Agent` par défaut][1] au moment de l'exécution en l'ajoutant en tant qu'en-tête dans la configuration de votre test. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/guide/identify_synthetics_bots/?tab=apitests#default-headers