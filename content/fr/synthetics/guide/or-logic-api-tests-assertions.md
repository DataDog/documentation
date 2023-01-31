---
title: Appliquer une logique OU dans des assertions de tests API
kind: guide
further_reading:
  - link: /synthetics/api_tests
    tag: Documentation
    text: Créer un test API
  - link: /synthetics/multistep
    tag: Documentation
    text: Créer un test API à plusieurs étapes
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: Débuter avec les tests HTTP
---
Vous pouvez appliquer une logique `OU` dans les assertions de vos [tests API][1] afin de définir plusieurs valeurs attendues pour un type d'assertion unique. Par exemple, vous pouvez faire en sorte que l'assertion `status code` de votre [test HTTP][2] n'entraîne pas d'échec lorsque votre serveur renvoie la valeur `200` **ou** `302`.

Pour ce faire, vous pouvez utiliser le [comparateur `matches regex`][3] et définir une expression régulière comme `(200|302)`. Avec cette assertion, le résultat de votre test est positif si le code de statut renvoyé par le serveur a pour valeur 200 **ou** 302.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/api_tests/http_tests/
[3]: /fr/synthetics/api_tests/http_tests/?tab=requestoptions#define-assertions