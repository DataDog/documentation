---
aliases:
- /fr/monitors/faq/why-did-i-get-a-recovery-event-from-a-monitor-that-was-in-a-downtime-when-it-alerted/
- /fr/monitors/faq/i-have-a-downtime-scheduled-on-my-monitor-why-did-it-still-alert/
further_reading:
- link: /monitors/
  tag: Documentation
  text: Apprendre à créer un monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: En savoir plus sur les downtimes

title: Empêcher des monitors de générer des alertes pendant un downtime
---

Lorsqu'un groupe est en [downtime][1] et qu'il passe de **`OK`** à **`ALERT`**, **`WARNING`** ou **`NO DATA`**, vous ne recevez plus de notifications pour cet événement. 
Lorsque ce downtime se termine ou est annulé, cela permet de réactiver les notifications pour les événements (si lʼoption est configurée) et de récupérer des événements pour ensuite les envoyer.

Une option consiste à résoudre le monitor avant d'annuler le downtime afin d'annuler toutes les notifications de récupération. Cependant, il se peut que tous les groupes qui se trouvaient dans un état autre que **`OK`** puissent revenir à leur état précédent, ce qui entraînerait un autre notification.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/downtimes/