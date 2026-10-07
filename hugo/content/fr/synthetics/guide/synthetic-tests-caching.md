---
title: Prévention des problèmes de cache pour les tests Synthetic

further_reading:
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/api_tests/http_tests
    tag: Documentation
    text: Configurer un test HTTP
---
## Tests Browser

Les navigateurs sont réinitialisés après chaque exécution de test. Ainsi, vos tests Browser ne rencontrent pas de problèmes de cache côté client.

## Tests API

### Tests HTTP

Vous pouvez utiliser des [variables locales][1] pour générer une chaîne aléatoire et l'envoyer avec votre charge utile. Cela vous permet de vérifier que vos [tests HTTP][2] n'utilisent pas vos systèmes de mise en cache.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables
[2]: /fr/synthetics/api_tests/http_tests