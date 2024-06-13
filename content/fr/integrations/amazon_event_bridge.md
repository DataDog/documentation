---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_EventBridge."
doc_link: https://docs.datadoghq.com/integrations/amazon_event_bridge/
draft: false
git_integration_title: amazon_event_bridge
has_logo: true
integration_id: ''
integration_title: Amazon EventBridge
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_event_bridge
public_title: "Intégration Datadog/Amazon\_EventBridge"
short_description: "Surveillez des métriques clés d'Amazon\_EventBridge."
version: '1.0'
---
## Présentation

Grâce à l'intégration de Datadog à Amazon EventBridge, vous pouvez :

- Créer des bus d'événements personnalisés dans l'ensemble de vos comptes AWS intégrés
- Transmettre des événements de notification d'alerte Datadog aux bus d'événements de votre choix
- Configurer dans AWS des déclencheurs au niveau de vos bus d'événements avec des services tels que Kinesis, Lambda, etc.
- Utiliser les informations d'un événement d'alerte afin d'exécuter des pipelines de correction automatique, des runbooks, des requêtes d'analyse, etc.

{{< img src="integrations/amazon_event_bridge/aws_event_bridge.png" alt="Amazon EventBridge" >}}

## Implémentation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Installation

1. Assurez-vous que la principale [intégration AWS][1] est installée pour chaque compte AWS qui reçoit des notifications d'alerte.
2. Vérifiez que l'autorisation suivante figure dans la stratégie d'autorisation des rôles Datadog/AWS :
   `events:CreateEventBus`
3. L'intégration AWS EventBridge est installée automatiquement avec l'intégration AWS.

### Configuration

L'autorisation `events:CreateEventBus` est requise pour envoyer des notifications d'alerte à vos bus d'événements. Si cette autorisation n'est pas configurée, consultez la [documentation relative aux autorisations IAM Datadog][2] pour activer les autorisations avant toute autre étape de configuration.

1. Accédez au carré d'[intégration Datadog/Amazon EventBridge][3] pour consulter la liste des comptes AWS intégrés dans Datadog et à partir desquels vous pouvez créer des bus d'événements.
2. Dans le compte AWS de votre choix, créez un bus d'événements. Pour ce faire, saisissez un nom et sélectionnez la région de votre choix.
3. Depuis des alertes Datadog, utilisez la syntaxe `@awseventbridge-<MON_BUS_ÉVÉNEMENTS>` pour envoyer des notifications d'alerte à vos bus d'événements.
4. Dans AWS, associez vos bus d'événements à des cibles telles que Lambda, Kinesis, et [de nombreux autres services][4] afin de créer des workflows basés sur des événements.
    **Remarque** : consultez la page partenaire de Datadog depuis la [console AWS][5] pour parcourir des exemples de cas d'utilisation de Datadog.
5. Après avoir configuré un bus d'événements dans Datadog, accédez à la [console Amazon EventBridge][6] et sélectionnez `Rules` dans le panneau de navigation.
6. Sélectionnez `Create Rule` et ajoutez un nom et une description à votre règle.
7. Sous **Define Pattern**, sélectionnez `Event Pattern`. Choisissez `Predefined by service` comme **Event matching pattern**. Pour **Service provider**, sélectionnez `Service partners`. Pour **Service name**, définissez `Datadog`. Les bus d'événements qui sont dans Datadog sont alors ajoutés. Ajoutez d'autres informations à votre règle si vous le souhaitez, puis cliquez sur **Save** pour l'enregistrer.
8. Pour déconnecter un bus d'événements dans Datadog, passez le curseur sur le bus d'événements de votre choix et cliquez sur l'icône en forme de corbeille.
   **Remarque** : cette opération déconnecte le bus d'événements d'AWS, mais n'entraîne pas sa suppression.

### Actions automatisées

Configurez de nouveaux canaux de notification sortante pour les monitors et les snapshots de Datadog avec l'intégration AWS EventBridge. Avec les actions automatisées, vous pouvez configurer vos ressources AWS de façon à :

* redémarrer un processus s'il se termine pour la [surveillance de live processes][7] ;
* redémarrer des instances EC2 ;
* exécuter une tâche ECS (démarrer une tâche lorsqu'une autre se termine) ;
* appliquer un playbook Ansible (effectuer des modifications sur un host) ;
* appliquer des patchs à distance ;
* exécuter des scripts SSH à distance ;
* appliquer des mises à jour Windows ou installer des applications.

La liste complète des ressources pouvant être ciblées est disponible sur le [site d'AWS][8].

L'exemple ci-dessous montre comment envoyer un snapshot pour déclencher ce processus. Une fois déclenché, vous pouvez spécifier une règle de réception des actions dans AWS.

{{< wistia uezo3fh61j >}}

## Données collectées

### Métriques

L'intégration Amazon EventBridge n'inclut aucune métrique.

### Événements

L'intégration Amazon EventBridge n'inclut aucun événement.

### Checks de service

L'intégration Amazon EventBridge n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-event-bridge
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[5]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[6]: https://console.aws.amazon.com/events/
[7]: https://docs.datadoghq.com/fr/monitors/monitor_types/process/
[8]: https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html
[9]: https://docs.datadoghq.com/fr/help/