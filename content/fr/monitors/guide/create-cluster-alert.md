---
further_reading:
- link: /monitors/
  tag: Documentation
  text: Apprendre à créer un monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
kind: guide
title: Créer des alertes de cluster pour être informé lorsqu'un pourcentage de groupes
  possèdent un état critique
---

## Présentation

Ce guide décrit comment créer des alertes qui sont envoyées lorsqu'un pourcentage de groupes (et non un seul groupe) remplissent les conditions. Vous pouvez ainsi configurer un monitor de façon à ce qu'il envoie uniquement des alertes lorsqu'un pourcentage donné de vos hosts ou conteneurs possèdent un état critique.

### Exemple : envoi d'une alerte lorsqu'un pourcentage de hosts utilisent une grande partie du CPU

Pour cet exemple, imaginons que vous souhaitez recevoir une notification lorsque 40 % des hosts utilisent plus de 50 % du CPU. Pour configurer cette alerte, vous allez utiliser les fonctions `min_cutoff` et `count_nonzero` :

* La fonction `min_cutoff` permet de compter le nombre de hosts qui utilisent plus de 50 % du CPU.
* La fonction `count_nonzero` permet de compter le nombre total de hosts.
* Divisez la première valeur par la deuxième pour obtenir le pourcentage de hosts utilisant plus de 50 % du CPU.

{{< img src="monitors/faq/cluster-condition.png" alt="condition-alerte-cluster"  >}}

* Définissez ensuite la condition afin d'envoyer une alerte lorsque le pourcentage de hosts avec une utilisation élevée du CPU dépasse 40 %.

{{< img src="monitors/faq/cluster-trigger.png" alt="déclenchement-alerte-cluster"  >}}

Ce monitor surveille le pourcentage de hosts qui ont utilisé plus de 50 % du CPU au cours des 10 dernières minutes. Il génère une notification lorsque plus de 40 % de ces hosts répondent à la condition définie.

{{< img src="monitors/faq/cluster-status.png" alt="statut-alerte-cluster"  >}}

{{< partial name="whats-next/whats-next.html" >}}