---
description: Étapes à suivre pour envoyer des événements à Datadog avec des e-mails
  dʼAmazon SNS
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentation
  text: Intégration dʼAWS
- link: https://docs.datadoghq.com/integrations/amazon_sns/#overview
  tag: Documentation
  text: Intégration de SNS
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: Blog
  text: Surveillance sans serveur de Datadog pour Amazon API Gateway, SQS, Kinesis
    et autres
kind: guide
title: Créer des événements Datadog à partir d'e-mails Amazon SNS
---

## Présentation

Vous pouvez créer des événements Datadog avec des e-mails envoyés depuis un topic Amazon SNS. Utilisez ce guide pour abonner votre compte Datadog à votre topic SNS et confirmer lʼabonnement.

## Implémentation

1. Créez une adresse e-mail dédiée depuis Datadog en suivant les instructions de configuration décrites dans le guide [Événement avec e-mail][1]. Copiez lʼadresse e-mail générée dans votre presse-papiers.
2. Depuis le topic SNS auquel vous souhaitez vous abonner, cliquez sur **Create subscription** et sélectionnez `Email` comme protocole. Collez lʼadresse e-mail de lʼétape 1 dans le champ `Endpoint`, configurez dʼautres réglages de votre choix, puis cliquez sur **Create subscription**.
3. Dans [lʼexplorateur dʼévénements][2] de Datadog, recherchez un événement avec lʼobjet `AWS Notification - Subscription Confirmation`. Copiez lʼURL fournie pour confirmation.

{{< img src="integrations/guide/events_from_sns_emails/events_from_sns_emails.png" alt="Lʼexplorateur dʼévénements de  Datadog affichant une vue détaillée dʼun événement avec pour objet « AWS Notification - Subscription Confirmation » et une URL mise en évidence à côté du texte « Confirm Subscription »" >}}

4. Ouvrez un nouvel onglet dans votre navigateur et collez lʼURL dans la barre dʼadresse. Lʼabonnement est confirmé lorsque le navigateur ouvre lʼURL.

### Validation

Retournez dans votre topic SNS, dans la console AWS, et assurez-vous que lʼétat de lʼabonnement est `Confirmed`. Les nouveaux messages publiés dans le topic créent des événements dans Datadog.

## Utiliser les événements dans Datadog

Configurez des alertes basées sur les e-mails de votre topic SNS avec un [monitor dʼévénements][3]. Recherchez et filtrez les événements dans [lʼexplorateur dʼévénements][4], ou utilisez un [dashboard][5] pour analyser plus en détail ou afficher les événements.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_management/events/guides/email/
[2]: https://app.datadoghq.com/event/explorer
[3]: /fr/monitors/types/event/
[4]: /fr/events/explorer/
[5]: /fr/dashboards/