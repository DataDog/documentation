---
title: Auto-maintenance des tests Browser
kind: guide
further_reading:
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/browser_tests/actions
    tag: Documentation
    text: Créer des étapes de test Browser
  - link: https://www.datadoghq.com/blog/test-creation-best-practices/
    tag: Blog
    text: Pratiques recommandées pour la création de tests de bout en bout
---
Le principal point faible du testing de bout en bout réside dans la fragilité des tests. Trop souvent, les tests de bout en bout n'échouent pas en raison d'un problème réel. En effet, il arrive régulièrement que les modifications apportées par une équipe frontend entraînent le dysfonctionnement d'un identifiant utilisé par les tests.

## Comment les tests Browser ciblent-ils les éléments ?

Les tests Browser Synthetic de Datadog résolvent cette problématique grâce à un algorithme propriétaire. Celui-ci tire profit d'un ensemble de localisateurs pour cibler les éléments. Lorsqu'un test recherche un élément spécifique afin d'interagir avec lui (par exemple, un bouton de paiement), plutôt que de chercher un élément avec un XPath particulier ou un sélecteur CSS précis, il se base sur plusieurs points de référence pour trouver l'élément (XPath, texte, classes, autres éléments à proximité, etc.). Ces points de référence constituent un ensemble de localisateurs. Chacun d'entre eux définit l'élément.

Si un léger changement d'interface entraîne la modification d'un élément (par exemple, si celui-ci est déplacé vers un autre emplacement), le test repère automatiquement l'élément, en se basant sur les points de référence qui n'ont pas été modifiés par le changement d'interface. Lorsque le test se termine sans échouer, il recalcule les localisateurs non fonctionnels en leur attribuant une nouvelle valeur. On parle alors de réparation spontanée. Ainsi, vos tests continuent à fonctionner même après un simple changement d'interface. Ils peuvent donc s'adapter automatiquement aux différentes modifications apportées à l'interface de votre application.

## Comment vérifier qu'un test Browser ne valide pas un changement inattendu ?

Vous devez utiliser des assertions pour éviter qu'un tel problème se présente. Elles vous permettent de définir les comportements attendus et inattendus associés au parcours de votre test.

## Que faire si je souhaite utiliser un identifiant spécifique ?

Dans de rares cas (par exemple, si vous cliquez sur le `nième` élément d'un menu déroulant, peu importe le contenu de l'élément), il est plus logique que votre étape repose sur un localisateur défini par l'utilisateur.

Pour ce faire, utilisez la fonctionnalité de [localisateur spécifié par l'utilisateur][1] disponible dans les [options avancées][2] des étapes de votre test Browser.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/advanced_options/#user-specified-locator
[2]: /fr/synthetics/browser_tests/advanced_options/