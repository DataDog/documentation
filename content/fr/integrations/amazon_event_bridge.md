---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_EventBridge."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_event_bridge/'
git_integration_title: amazon_event_bridge
has_logo: true
integration_title: Amazon EventBridge
is_public: true
kind: integration
manifest_version: 1
name: amazon_event_bridge
public_title: "Intégration Datadog/Amazon\_EventBridge"
short_description: "Surveillez des métriques clés d'Amazon\_EventBridge."
version: 1
---
## Présentation
Grâce à l'intégration de Datadog à Amazon EventBridge, vous pouvez :

* Créer des bus d'événements personnalisés dans l'ensemble de vos comptes AWS intégrés
* Transmettre des événements de notification d'alerte Datadog aux bus d'événements de votre choix
* Configurer dans AWS des déclencheurs au niveau de vos bus d'événements avec des services tels que Kinesis, Lambda, etc.
* Utiliser les informations d'un événement d'alerte afin d'exécuter des pipelines de correction automatique, des runbooks, des requêtes d'analyse, etc.

{{< img src="integrations/amazon_event_bridge/aws_event_bridge.png" alt="Amazon EventBridge" responsive="true">}}

## Implémentation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Installation
1. Assurez-vous que la principale [intégration AWS][1] est installée pour chaque compte AWS qui recevra des notifications d'alerte.
2. Vérifiez que l'autorisation suivante figure dans la stratégie d'autorisation des rôles Datadog/AWS) : 
    `events:CreateEventBus`
3. L'intégration AWS EventBridge est installée automatiquement avec l'intégration AWS.

### Configuration
1. Accédez au carré d'[intégration Datadog/Amazon EventBridge][3] pour consulter la liste des comptes AWS intégrés dans Datadog et à partir desquels vous pouvez créer des bus d'événements.
2. Dans le compte AWS de votre choix, créez un bus d'événements. Pour ce faire, saisissez un nom et sélectionnez la région de votre choix.
3. Depuis des alertes Datadog, utilisez la syntaxe `@awseventbridge-<MON_BUS_ÉVÉNEMENTS>` pour envoyer des notifications d'alerte à vos bus d'événements.
4. Dans AWS, associez vos bus d'événements à des cibles telles que Lambda, Kinesis, et [de nombreux autres services][4] afin de créer des workflows basés sur des événements.
5. Consultez la [console AWS][5], dans la page de notre partenaire, pour parcourir des exemples de cas d'utilisation de Datadog.
6. Pour supprimer un bus d'événements dans Datadog, passez le curseur sur le bus d'événements de votre choix et cliquez sur l'icône en forme de corbeille.


## Données collectées
### Métriques
L'intégration Amazon EventBridge n'inclut aucune métrique.

### Événements
L'intégration Amazon EventBridge n'inclut aucun événement.

### Checks de service
L'intégration Amazon EventBridge n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-event-bridge
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[5]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[6]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}