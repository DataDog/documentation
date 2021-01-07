---
title: Résultats de tests Browser
kind: documentation
description: Résultats de tests Browser Synthetic
aliases:
  - /fr/synthetics/apm/browser_tests
further_reading:
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Tests Browser
---
## Présentation

Les résultats de test sont accessibles dans la section **Step Results** de la page de statut de votre test Browser.

### Erreurs

Le volet d'erreurs affiche le nom de l'erreur, sa description, son type (`js` ou `network`) et son statut (code de statut réseau).

Le type d'erreur est enregistré lors de l'interaction avec la page. Il correspond aux erreurs recueillies entre l'ouverture de la page et l'interaction avec cette page.

Un maximum de 8 erreurs peuvent être affichées, par exemple 2 `network` + 6 `js`.

### Ressources

Une ressource correspond à une combinaison de requêtes et de biens. Le volet Resources affiche ce qui suit :

| Élément         | Description                                                     |
|--------------|-----------------------------------------------------------------|
| Resource     | L'URL de la ressource                                         |
| Type         | Le type de ressource (HTML, CSS, Image, JavaScript, XHR ou Other) |
| Duration     | Le temps nécessaire pour effectuer la requête                          |
| % Total Time | La durée de la ressource par rapport à la durée totale de l'interaction           |
| Size         | La taille de la réponse de la requête                                |

Un maximum de 50 ressources peuvent être affichées. Les ressources sont classées en fonction de l'heure à laquelle elles commencent, et les 50 premières sont ensuite affichées dans Datadog.

#### Filtre et recherche

Les ressources peuvent être filtrées par type. Il est également possible d'effectuer une recherche sur les URL affichées.

### Traces

Le volet de traces affiche les traces associées au test Browser Synthetic. L'interface est semblable à la [vue Trace][1] de l'APM, à quelques exceptions près :

Une étape Browser peut effectuer plusieurs requêtes sur des URL ou des endpoints distincts, ce qui génère plusieurs traces connexes (en fonction de la configuration du tracing et des URL autorisées dans vos [paramètres][2]). Utilisez le menu déroulant pour choisir la trace à afficher.

## Échec d'un test et erreurs

Un test échoue (`FAILED`) lorsque ses assertions ne sont pas satisfaites ou lorsque la requête a échoué pour une autre raison. Cliquez sur une erreur dans les résultats de l'étape pour afficher ses détails.

Les erreurs les plus courantes comprennent :

| Erreur                                | Description                                                                                                          |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `Element located but it's invisible` | L'élément est présent sur la page, mais il n'est pas possible de cliquer dessus (parce qu'un autre élément est superposé par-dessus, par exemple).       |
| `Cannot locate element`              | L'élément est introuvable sur la page HTML.                                                                             |
| `Select did not have option`         | L'option spécifiée ne figure pas dans le menu déroulant.                                                              |
| `Forbidden URL`                      | Le test a probablement rencontré un protocole non pris en charge. Contactez l'[assistance Datadog][3] pour en savoir plus. |
| `General test failure`               | Un message d'erreur général. [Contactez l'assistance][3] pour en savoir plus.                                                   |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/trace/
[2]: /fr/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[3]: /fr/help/