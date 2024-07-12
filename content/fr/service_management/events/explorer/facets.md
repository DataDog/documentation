---
further_reading:
- link: service_management/events/explorer/attributes
  tag: Documentation
  text: En savoir plus sur les attributs réservés
kind: Documentation
title: Facettes
---

## Présentation

Par défaut, Datadog indexe les attributs d'événement sous la forme de facettes. Ces facettes sont accessibles depuis le volet latéral des facettes de l'Events Explorer, les analyses et les monitors.

Une facette présente les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre d'événements représentés. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher.

{{< img src="service_management/events/explorer/facets-location.png" alt="Volet latéral des facettes" style="width:100%;" >}}

### Créer une facette

Pour ajouter une facette, cliquez sur le bouton **+ Add** dans le volet latéral de gauche.

Une fois votre facette ajoutée, la valeur de cet attribut est stockée pour toutes les nouvelles vues. Vous pouvez donc l'utiliser dans la barre de recherche et dans les volets latéraux des facettes. Il est également possible de regrouper les données des monitors d'événement et des widgets de graphique en fonction de cette facette.

### Attributs réservés
**Host**, **Service** et **Status** font partie des attributs de base pour les événements. Vous ne pouvez pas créer de nouvelle facette sur ces tags.

Pour les événements de monitor Datadog, le premier tag de l'événement dans l'ordre alphabétique est utilisé pour définir l'attribut de l'événement. Par exemple, si un événement présente plusieurs tags de service tels que `service:bcd; service:ace`, alors `service:ace` sera utilisé pour définir l'attribut de l'événement. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}