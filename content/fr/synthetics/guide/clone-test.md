---
aliases:
- /fr/synthetics/faq/clone-test/
further_reading:
- link: /synthetics/
  tag: Documentation
  text: En savoir plus sur la surveillance Synthetic

title: Dupliquer vos tests Synthetic
---

## Présentation

Il est possible de dupliquer un test Synthetic depuis l'interface ou à l'aide des endpoints de l'API.

## Depuis l'interface

1. Depuis la page d'un test Synthetic, cliquez sur l'icône en forme d'**engrenage** située à droite.
2. Cliquez sur **Clone** dans le menu déroulant.

{{< img src="synthetics/faq/clone-test.mp4" alt="Duplication de tests Synthetic" video="true" width="90%" >}}

## Avec l'API

1. Récupérez la configuration de votre test à l'aide de l'endpoint pertinent. Consultez les rubriques [Récupérer un test API][1] ou [Récupérer un test Browser][2] pour en savoir plus.
2. Apportez au test les modifications de votre choix, en changeant par exemple l'URL ou les tags.
3. Envoyez votre nouvelle configuration de test à l'aide de l'endpoint pertinent. Consultez les rubriques [Créer un test API][3] ou [Créer un test Browser][4] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/synthetics/#get-a-browser-test
[2]: /fr/api/latest/synthetics/#get-an-api-test
[3]: /fr/api/latest/synthetics/#create-an-api-test
[4]: /fr/api/latest/synthetics/#create-a-browser-test