---
title: Monitor Watchdog
kind: documentation
description: Détecte de manière algorithmique les problèmes d'application et d'infrastructure.
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /watchdog/
    tag: Documentation
    text: Détecter de manière algorithmique les problèmes d'application et d'infrastructure avec Watchdog
---
## Présentation

[Watchdog][1] est une fonction algorithmique pour l'APM et les métriques d'infrastructure. Elle détecte automatiquement les problèmes d'application et d'infrastructure en surveillant en continu les tendances et les patterns qui se dégagent de vos métriques afin d'identifier les comportements anormaux.

## Création d'un monitor

Pour créer un [monitor Watchdog][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Watchdog*.

### Sélectionner le type de story

Dans cette section, choisissez entre une story **APM** ou **Infrastructure** :

{{< tabs >}}
{{% tab "APM" %}}

Une story APM est créée lorsque Watchdog détecte un comportement anormal au niveau des services de votre système ou de leur ressources enfant.

### Sélectionner des sources {#sélectionner-sources-1}

Choisissez vos [tags primaires][1], votre [service][2] et votre [ressource][3] dans les menus déroulants.

Une fois les options de votre choix sélectionnées, le graphique en haut de la page de création d'un monitor affiche le nombre d'événements Watchdog correspondants dans le temps, ainsi qu'une liste d'événements.

[1]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /fr/tracing/visualization/service/
[3]: /fr/tracing/visualization/resource/
{{% /tab %}}
{{% tab "Infrastructure" %}}

Les stories de type Infrastructure peuvent englober des problèmes liés aux intégrations suivantes :

* [Système][1] : utilisation de la mémoire au niveau du host (fuites de mémoire), taux de retransmissions TCP, etc.
* [Redis][2]
* [PostgreSQL][3]
* [NGINX][4]
* [Amazon Web Services][5] : pour les services Amazon [S3][6], [ELB/ALB/NLB][7], [CloudFront][8] et [DynamoDB][9].

Une fois l'option Infrastructure sélectionnée, le graphique en haut de la page de création d'un monitor affiche le nombre d'événements Watchdog dans le temps, ainsi qu'une liste d'événements.

### Sélectionner des sources {#sélectionner-sources-2}

Aucune sélection n'est nécessaire. Vous recevez une notification dès que Watchdog détecte un problème sur votre infrastructure.


[1]: /fr/integrations/system/
[2]: /fr/integrations/redis/
[3]: /fr/integrations/postgres/
[4]: /fr/integrations/nginx/
[5]: /fr/integrations/amazon_web_services/
[6]: /fr/integrations/amazon_s3/
[7]: /fr/integrations/amazon_elb/
[8]: /fr/integrations/amazon_cloudfront/
[9]: /fr/integrations/amazon_dynamodb/
{{% /tab %}}
{{< /tabs >}}

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /fr/monitors/notifications/