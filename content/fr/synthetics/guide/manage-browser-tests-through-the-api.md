---
title: Gérer vos tests Browser par programmation

further_reading:
  - link: /synthetics/browser_tests
    tag: Documentation
    text: En savoir plus sur les tests Browser
  - link: /api/latest/synthetics
    tag: API
    text: API Synthetics
  - link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
    tag: Terraform
    text: Créer et gérer des tests Browser Synthetic avec Terraform
---
## Présentation

Il est essentiel de surveiller votre application de bout en bout afin de bien comprendre l'expérience de vos utilisateurs. L'extension [Datadog test recorder][1] vous permet de simplifier la configuration de ces workflows de testing complexes. Il est toutefois également possible de gérer vos ressources Synthetic par programmation et définir des tests Browser avec l'API.

## Gérer vos tests Browser avec l'API

Datadog vous conseille de créer d'abord vos tests Browser dans l'interface Datadog et de récupérer les configurations de vos tests avec l'API.

1. [Créez un test Browser][2] et [effectuez un enregistrement][3].
2. Utilisez l'[endpoint Get the list of all tests][4] afin de récupérer la liste de tous les tests Synthetic.
3. Utilisez le filtre `type: browser` pour récupérer les `public_ids` des tests Browser que vous souhaitez gérer avec l'API.
4. Utilisez l'[endpoint Get a browser test][5] afin de récupérer les fichiers de configuration de chaque test Browser.

Vous pouvez stocker les fichiers de configuration de test Browser pour un usage ultérieur ou les utiliser afin de dupliquer, de modifier et de supprimer vos tests Browser par programmation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /fr/getting_started/synthetics/browser_test#create-a-browser-test
[3]: /fr/getting_started/synthetics/browser_test#create-recording
[4]: /fr/api/latest/synthetics/#get-the-list-of-all-tests
[5]: /fr/api/latest/synthetics/#get-a-browser-test