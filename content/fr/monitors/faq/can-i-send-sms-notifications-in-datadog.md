---
further_reading:
- link: /monitors/
  tag: Documentation
  text: Apprendre à créer un monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
kind: faq
title: Puis-je envoyer des notifications par SMS dans Datadog ?
---

De nombreux utilisateurs font appel à [l'intégration Webhooks][1] pour envoyer des alertes à un service de SMS comme Twilio. Pour en savoir plus, consultez la publication du blog [Send SMS alerts with webhooks and Twilio][2] (en anglais).

En fonction de l'opérateur téléphonique du numéro auquel vous souhaitez envoyer une alerte par SMS, vous pouvez aussi envoyer des SMS par e-mail. Pour configurer ceci dans Datadog, envoyez les alertes au numéro de téléphone de 10 chiffres de l'appareil que vous souhaitez joindre, suivi par la passerelle correspondante de l'opérateur mobile. Par exemple, si le numéro `+1 (234) 555-0100` et si l'opérateur est AT&T, envoyez l'alerte à `2345550100@txt.att.net`. De même, pour envoyer un SMS à `+44 113 496 0000`, pour lequel l'opérateur est Orange, envoyez l'alerte à `1134960000@orange.net`. Pour les autres opérateurs, recherchez leurs adresses e-mail vers SMS.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio