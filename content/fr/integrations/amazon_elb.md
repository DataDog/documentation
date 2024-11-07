---
aliases:
- /fr/integrations/awselb/
- /fr/integrations/faq/wrong-count-of-aws-elb-healthy-host-count
- /fr/integrations/faq/does-datadog-support-aws-alb-application-load-balancer/
- /fr/integrations/faq/where-are-my-elb-latency-metrics/
categories:
- aws
- cloud
- log collection
- network
dependencies: []
description: Surveillez des métriques clés d'Amazon Load Balancer.
doc_link: https://docs.datadoghq.com/integrations/amazon_elb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics
  tag: Blog
  text: Principales métriques de performance et de santé d'ELB
git_integration_title: amazon_elb
has_logo: true
integration_id: amazon-elb
integration_title: Amazon Load Balancer
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_elb
public_title: Intégration Datadog/Amazon Load Balancer
short_description: Surveillez des métriques clés d'Amazon Load Balancer.
version: '1.0'
---

{{< img src="integrations/amazon_elb/elb.png" alt="dashboard par défaut ELB" popup="true">}}

## Présentation

Elastic Load Balancing (ELB) est un service AWS utilisé pour répartir le trafic Web entrant de vos applications sur vos instances de backend Amazon EC2, qui peuvent avoir différentes zones de disponibilité. ELB garantit une expérience utilisateur fluide et augmente la tolérance aux pannes, pour gérer les pics de trafic et les échecs d'instances EC2, sans interruption.

Datadog recueille les métriques et les métadonnées des trois types d'équilibreurs fournis par AWS : **les Application Load Balancers, Network Load Balancers et Network Load Balancers.**

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans la [page de l'intégration AWS][2], vérifiez que `ELB` est activé dans l'onglet `Metric Collection`. Activez `ApplicationELB` et `NetworkELB` pour les métriques ELB de l'application et ELB réseau, respectivement.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon ELB. Pour en savoir plus, consultez la section relative aux [stratégies ELB][4] de la documentation AWS.

    | Autorisation AWS                                | Description                                                        |
    | --------------------------------------------- | ------------------------------------------------------------------ |
    | `elasticloadbalancing:DescribeLoadBalancers`  | Énumérer les ELB et ajouter des tags et des métriques supplémentaires.                        |
    | `elasticloadbalancing:DescribeTags`           | Ajouter des tags ELB personnalisés aux métriques ELB.                                |
    | `elasticloadbalancing:DescribeInstanceHealth` | Ajouter le statut de vos instances.                                       |
    | `elasticloadbalancing:DescribeTargetGroups`   | Décrire les groupes cibles spécifiés ou l'ensemble de vos groupes cibles. |

3. Installez l'[intégration Datadog/AWS ELB][5].

### Collecte de logs

#### Activer la journalisation d'AWS ELB ou ALB

Commencez par activer la journalisation sur votre ELB ou ALB pour recueillir vos logs. Les logs ELB et ALB peuvent être écrits dans un compartiment AWS S3 et [lus par une fonction Lambda][6]. Pour en savoir plus, consultez la section [Activer les journaux d'accès pour votre Classic Load Balancer][7].

{{< img src="integrations/amazon_elb/aws_elb_log_enable.png" alt="activer les logs aws elb" popup="true" style="width:70%;" >}}

Choisissez un intervalle de 5 minutes et définissez votre compartiment S3 et votre préfixe. Afin d'éviter toute [ambiguïté pour la définition des notifications d'événements S3][8], assurez-vous d'utiliser un **emplacement unique** qui ne correspond pas à l'emplacement des logs d'un autre Load Balancer. Si plusieurs Load Balancers enregistrent leurs logs dans le même compartiment, assurez-vous d'utiliser un **préfixe unique**, comme `my-bucket-for-elb-logs/my-elb-name`, pour stocker les logs à différents emplacements.

{{< img src="integrations/amazon_elb/aws_elb_configure_log.png" alt="configuration des logs aws elb" popup="true" style="width:70%;">}}

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][9] dans votre compte AWS.
2. Une fois la configuration terminée, accédez à la fonction Lambda du Forwarder Datadog. Configurez [automatiquement][10] ou [manuellement][11] vos déclencheurs sur le compartiment S3 qui contient vos logs ELB. Pour une configuration manuelle, utilisez le type d'événement `All object create events`.
3. Utilisez le [Log Explorer][12] pour explorer vos logs.

Pour en savoir plus sur la collecte de logs de services AWS, consultez la section [Envoyer des logs de services AWS avec la fonction Lambda Datadog][13].

## Données collectées

Les métriques sont recueillies sous les espaces de nommage suivants :

| Espace de nommage Datadog    | Service AWS                    |
| -------------------- | ------------------------------ |
| `aws.applicationelb` | Application Load Balancers     |
| `aws.elb`            | Classic Elastic Load Balancing |
| `aws.networkelb`     | Network Load Balancers         |

### Métriques

{{< get-metrics-from-git "amazon_elb" >}}

Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Elastic Load Balancing n'inclut aucun événement.

### Checks de service

L'intégration AWS Elastic Load Balancing n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-elb
[6]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[7]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[8]: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/
[9]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[10]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[11]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[12]: https://app.datadoghq.com/logs
[13]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[14]: https://docs.datadoghq.com/fr/help/