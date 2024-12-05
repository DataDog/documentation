---
aliases:
- /fr/monitors/faq/comment-surveiller-des-serveurs-ephemeres-pour-les-redemarrages
further_reading:
- link: /monitors/
  tag: Documentation
  text: Apprendre à créer un monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors

title: Surveiller des serveurs éphémères pour les redémarrages
---

Les environnements éphémères lancent et mettent fin à des hosts en continu, ce qui peut compliquer la distinction entre les nouveaux hosts et les hosts redémarrés.

Vous pouvez utiliser un monitor de métrique sur la métrique `system.uptime` pour résoudre ce problème. La métrique de disponibilité est un timer qui ne cesse dʼaugmenter et qui se remet à 0 lorsqu'un host démarre. Vous pouvez utiliser la fonction `diff()` avec la métrique pour faire la distinction entre un nouveau serveur, qui a une disponibilité de 0 (new server), et un serveur redémarré, qui affichera une différence (diff) avec une valeur de disponibilité en cours de 0.

L'exemple ci-dessous montre comment vous pouvez procéder à la configuration :

{{< img src="monitors/guide/ephemeral_set_up.png" alt="configuration_ephemere" >}}


{{< partial name="whats-next/whats-next.html" >}}