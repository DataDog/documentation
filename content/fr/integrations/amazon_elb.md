---
aliases:
  - /fr/integrations/awselb/
  - /fr/integrations/faq/wrong-count-of-aws-elb-healthy-host-count
  - /fr/integrations/faq/does-datadog-support-aws-alb-application-load-balancer/
  - /fr/integrations/faq/where-are-my-elb-latency-metrics/
categories:
  - cloud
  - web
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Load Balancer.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_elb/'
git_integration_title: amazon_elb
has_logo: true
integration_title: Amazon Load Balancer
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_elb
public_title: Intégration Datadog/Amazon Load Balancer
short_description: Surveillez des métriques clés d'Amazon Load Balancer.
version: '1.0'
---
{{< img src="integrations/amazon_elb/elb.png" alt="dashboard par défaut d'ELB" responsive="true" responsive="true" popup="true">}}

## Présentation

Elastic Load Balancing (ELB) est un service AWS utilisé pour répartir le trafic Web entrant de vos applications sur vos instances de backend Amazon EC2, qui peuvent avoir différentes zones de disponibilité. ELB garantit une expérience utilisateur fluide et augmente la tolérance aux pannes, pour gérer les pics de trafic et les échecs d'instances EC2, sans interruption.

Datadog recueille les métriques et les métadonnées des trois types d'équilibreurs fournis par AWS : **les Application Load Balancers, Network Load Balancers et Network Load Balancers.**

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `ELB` est cochée dans la section concernant la collecte des métriques. Cochez également la case `ApplicationELB` pour les métriques ELB de l'application et la case `NetworkELB` pour les métriques ELB réseau.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon ELB. Pour en savoir plus sur les stratégies ELB, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS                                | Description                                                         |
    |-----------------------------------------------|---------------------------------------------------------------------|
    | `elasticloadbalancing:DescribeLoadBalancers`  | Énumère les ELB et ajoute des tags et des métriques supplémentaires.                         |
    | `elasticloadbalancing:DescribeTags`           | Ajoute des tags ELB personnalisés aux métriques ELB.                                 |
    | `elasticloadbalancing:DescribeInstanceHealth` | Ajoute le statut de vos instances.                                        |
    | `elasticloadbalancing:DescribeTargetGroups`   | Décrit les groupes cibles spécifiés ou l'ensemble de vos groupes cibles. |

3. Installez l'[intégration Datadog/AWS ELB][5].

### Collecte de logs

#### Activer la journalisation d'AWS ELB ou ALB

Commencez par activer la journalisation sur votre ELB ou ALB pour recueillir vos logs. Les logs ELB et ALB peuvent être écrits dans un compartiment AWS S3 et [lus par une fonction Lambda][6]. [Pour en savoir plus, consultez la documentation AWS][7].

{{< img src="integrations/amazon_elb/aws_elb_log_enable.png" alt="activer les logs d'aws elb" responsive="true" responsive="true" popup="true" style="width:70%;" >}}

Choisissez un intervalle de 5 minutes et saisissez vos compartiments S3 :

{{< img src="integrations/amazon_elb/aws_elb_configure_log.png" alt="configuration des logs d'aws elb" responsive="true" responsive="true" popup="true" style="width:70%;">}}

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs ELB dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" responsive="true" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs ELB et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" responsive="true" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][9] pour commencer à explorer vos logs !

## Données collectées
Les métriques sont recueillies sous les espaces de nommage suivants :

| Espace de nommage Datadog    | Service AWS                    |
|----------------------|--------------------------------|
| `aws.applicationelb` | Application Load Balancers     |
| `aws.elb`            | Classic Elastic Load Balancing |
| `aws.network.elb`    | Network Load Balancers         |

### Métriques

{{< get-metrics-from-git "amazon_elb" >}}

Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Elastic Load Balancing n'inclut aucun événement.

### Checks de service

L'intégration AWS Elastic Load Balancing n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

Pour savoir comment surveiller les métriques de performance ELB, consultez [notre série d'articles à ce sujet][11]. Vous y trouverez des informations supplémentaires sur les principales métriques de performance, ainsi que des conseils pour les recueillir, et découvrirez comment utiliser Datadog afin de surveiller ELB.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticloadbalancing.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_elb
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[7]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[8]: /fr/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/fr/help
[11]: https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics


{{< get-dependencies >}}