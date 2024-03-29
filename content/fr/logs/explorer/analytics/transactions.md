---
description: Regroupez des logs interrogés en transactions.
further_reading:
- link: logs/explorer/
  tag: Documentation
  text: En savoir plus sur le Log Explorer
- link: logs/explorer/analytics
  tag: Documentation
  text: Apprendre à analyser vos logs
kind: documentation
title: Regrouper des logs en transactions
---

## Présentation

Les transactions agrègent les logs indexés au sein de séquences d'événements. Une séquence peut correspondre à une session utilisateur, ou encore à une requête traitée par plusieurs microservices.

Les agrégations sous forme de transactions diffèrent des agrégations sous forme de groupes classiques, dans la mesure où les groupes obtenus comprennent non seulement les logs correspondant à la requête, mais aussi les logs appartenant aux transactions associées.

Vous pouvez utiliser les informations suivantes sur les transactions pour personnaliser votre requête de recherche :

Durée 
: l'écart entre le timestamp du premier log et celui du dernier log dans la transaction. _Cette mesure est automatiquement ajoutée_.

Gravité maximale
: identifiée dans les logs de la transaction. _Cette mesure est automatiquement ajoutée_.

Rechercher des éléments clés
: pour chaque `facet` ayant comme valeurs des chaînes, vous pouvez calculer des informations sur des logs spécifiques à l'aide des opérations `count unique`, `latest`, `earliest` et `most frequent`.

Consulter des statistiques : pour chaque `measure`, vous pouvez calculer des statistiques à l'aide des opérations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95` et `pc99`.

Définir les conditions de début et de fin
: personnalisez les limites de la transaction en indiquant son début et sa fin à lʼaide de requêtes distinctes.

Par exemple, le site web dʼun commerce en ligne regroupe les logs parmi plusieurs actions dʼutilisateurs, comme une recherche dans le catalogue, un ajout au panier et un paiement. Cela lui permet de créer une vue **Transactions** à lʼaide dʼun attribut commun, tel que `requestId` ou `orderId`.

{{< img src="logs/explorer/aggregations_transactions.jpg" alt="Le Log Explorer avec des logs regroupés en fonction de transactions" style="width:100%;" >}}

Les transactions prennent en charge les visualisations sous forme de [liste de groupes][1]. Cliquez sur une transaction dans la liste pour ouvrir le volet latéral dédié et effectuer les actions suivantes :

- Accéder à tous les logs associés à cette transaction
- Rechercher des logs spécifiques associés à cette transaction

{{< img src="logs/explorer/transactions_side_panel.png" alt="Le volet des logs de transaction avec des logs pour la transaction sélectionnée" style="width:80%;" >}}

Lorsquʼune condition de début ou de fin est utilisée pour définir une transaction, cliquez sur le groupe dʼune transaction dans la liste pour ouvrir le volet latéral dédié, vous permettant :

- dʼaccéder aux transactions au sein de ce groupe en séquence ;
- dʼaccéder à tous les logs dans chaque transaction ;
- de consulter des statistiques pour chacune des transactions et un résumé des statistiques pour lʼensemble du groupe de transactions.

{{< img src="logs/explorer/transaction_group_side_panel.png" alt="Le volet du groupe de transactions affichant les transactions au sein du groupe sélectionné en séquence" style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/visualize/#list-aggregates-of-logs