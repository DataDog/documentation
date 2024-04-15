---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'AWS\_App\_Runner."
doc_link: https://docs.datadoghq.com/integrations/amazon_app_runner/
draft: false
git_integration_title: amazon_app_runner
has_logo: true
integration_id: amazon-app-runner
integration_title: "AWS\_App\_Runner"
integration_version: ''
is_public: true

manifest_version: '1.0'
name: amazon_app_runner
public_title: "Intégration Datadog/AWS\_App\_Runner"
short_description: "Surveillez des métriques clés d'AWS\_App\_Runner."
version: '1.0'
---
## Présentation

AWS App Runner vous permet de déployer une application depuis votre code source ou depuis une image de conteneur vers AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'App Runner.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `AppRunner` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/AWS App Runner][3].

### Collecte de logs
Vous pouvez transmettre deux types de logs à Datadog depuis vos applications gérées par AWS App Runner. Ces logs sont envoyés à CloudWatch dans deux groupes différents. Le premier rassemble les logs de service. Il enregistre tous les logs de l'activité du cycle de vie de votre service App Runner, comme les builds et les déploiements de votre application. Le deuxième groupe regroupe les logs d'application qui contiennent les sorties du code de l'application en cours d'exécution.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le service App Runner ou sur le groupe de logs CloudWatch de l'application dans la console AWS :
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" popup="true" style="width:70%;">}}
   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur :
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="déclencheur cloudwatch" popup="true" style="width:70%;">}}
3. Répétez l'étape 2 pour ajouter le groupe de logs supplémentaire.
4. Accédez ensuite à la [section Log de Datadog][5] pour commencer à explorer vos logs !

### Collecte d'événements
AWS App Runner envoie des événements de changement de statut des services et des opérations à EventBridge. Vous pouvez transmettre ces événements à Datadog afin de les visualiser dans le [flux d'événements][6]. Pour ce faire, suivez les étapes suivantes :

1. Créez une [destination d'API EventBridge pour les événements Datadog][7].
2. Créez une règle EventBridge à appliquer aux événements AWS App Runner (voir la section [Gestion des événements App Runner dans EventBridge][8]). Choisissez comme cible la destination de l'API.
3. Commencez à visualiser les nouveaux événements de changement de statut dans le flux d'événements Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_app_runner" >}}


### Événements

L'intégration AWS App Runner prend en charge les événements de changement de statut des services et des opérations envoyés par EventBridge.

### Checks de service

L'intégration AWS App Runner n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-app-runner
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/event/stream
[7]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog
[8]: https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_app_runner/amazon_app_runner_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/
