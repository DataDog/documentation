---
description: Découvrez comment utiliser la solution RUM et Session Replay pour surveiller
  la performance des campagnes UTM.
kind: guide
title: Comment surveiller des campagnes UTM dans la solution RUM
---

## Présentation

Le suivi UTM (Urchin Tracking Module) est un paramètre qui peut être ajouté à une URL pour suivre les performances de certaines campagnes et identifier les chemins d'attribution pour savoir comment les visiteurs sont arrivés sur votre site web. Ce guide vous présente les types de paramètres UTM que la solution RUM de Datadog collecte et comment vous pouvez utiliser RUM pour surveiller leur utilisation.

## Données collectées

Les campagnes UTM sont connectées à des événements de [vue][1] dans la solution RUM. Les données de la campagne sont collectées automatiquement par le SDK Browser et peuvent être visualisées sous forme de facettes dans le RUM Explorer. Les paramètres UTM collectés par Datadog peuvent être définis comme suit :

| Champ                | Type   | Rôle                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | chaîne | Le paramètre de l'URL permettant de suivre la source du trafic. |
| `view.url_query.utm_medium`        | chaîne | Le paramètre de l'URL permettant de suivre le canal à l'origine du trafic.    |
| `view.url_query.utm_campaign`  | chaîne | Le paramètre de l'URL identifiant la campagne de marketing spécifique liée à cette vue.              |
| `view.url_query.utm_content`  | chaîne | Le paramètre de l'URL permettant d'identifier l'élément précis sur lequel un utilisateur a cliqué au sein d'une campagne marketing.           |
| `view.url_query.utm_term` | chaîne | Le paramètre de l'URL permettant de suivre le mot-clé qu'un utilisateur a recherché pour déclencher une campagne donnée.             |

## Cas d'utilisation

### Identifier la façon dont les utilisateurs arrivent sur votre site

Pour mesurer la façon dont les utilisateurs arrivent sur votre site, vous pouvez utiliser la facette '@view.url_query.utm_medium'. Cette facette affiche différents supports tels que les réseaux sociaux, les comportements organiques, les recherches, les campagnes Google ou même des supports spécifiques tels qu'un webinaire. Vous pouvez regarder les rediffusions de sessions d'utilisateurs qui ont consulté votre site web à partir de différents supports et observer si des tendances notables se dégagent entre les différents groupes.

### Déterminer si certaines campagnes génèrent un trafic plus élevé que d'autres

{{< img src="real_user_monitoring/guide/UTM-campaign-tracking.png" alt="Capture dʼécran de toutes les vues dʼune page spécifique de la campagne" style="width:90%;">}}

Dans la requête ci-dessus, nous pouvons compter toutes les vues d'une page, comme la page d'accueil, sur laquelle se déroule la campagne. Cela peut vous permettre de comprendre si certaines pages reçoivent plus de visites et s'il est préférable d'augmenter les dépenses publicitaires pour cette page spécifique.

### Analyser une source UTM par pays

{{< img src="real_user_monitoring/guide/UTM-by-country.png" alt="Capture dʼécran dʼune source UTM par pays" style="width:90%;">}}

Dans cet exemple, vous pouvez suivre les différentes sources de campagnes, et par exemple comparer les publicités avec le trafic organique. Vous pouvez ensuite ajouter une couche supplémentaire, comme la localisation, pour comprendre si les comportements des vues changent en fonction du pays.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#views