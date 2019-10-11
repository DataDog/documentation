---
title: Tests Browser avec l'APM
kind: documentation
description: Tests Browser Synthetics avec l'APM
further_reading:
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Tests Browser
---
## Présentation
Les tests Browser avec l'APM associent les tests Synthetics à vos traces en backend.

## Résultats de test
Les résultats de test sont accessibles dans la section **Step Results** de la page de statut de votre test Browser.

<ÉVENTUELLE_CAPTURE>

### Erreurs
Le volet Errors affiche le nom de l'erreur, la description, le type (`js`/`network`) et le statut (code de statut réseau).

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

Un maximum de 50 ressources peuvent être affichées. Généralement, les ressources avec la plus longue durée (à savoir, les plus lentes à charger) s'affichent d'abord.

#### Filtre et recherche
Les ressources peuvent être filtrées par type. Il est également possible d'effectuer une recherche sur les URL affichées.


### Traces
Le volet de traces affiche les traces associées au test Browser Synthetics. L'interface est semblable à la [vue Trace][1] de l'APM, à quelques exceptions près :

Une étape Browser peut effectuer plusieurs requêtes sur des URL ou des endpoints distincts, ce qui génère plusieurs traces connexes (en fonction de la configuration du tracing et de la liste blanche). Utilisez le menu déroulant pour choisir la trace à afficher.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/trace