---
aliases:
- integrations/awsautoscaling/
categories:
- cloud
- provisioning
- configuration & deployment
- aws
ddtype: crawler
description: Suivez l'état et le nombre d'instances dans vos groupes Auto Scaling.
doc_link: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
git_integration_title: amazon_auto_scaling
has_logo: true
integration_title: AWS Auto Scaling
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_auto_scaling
public_title: Intégration Datadog-AWS Auto Scaling
short_description: Suivez l'état et le nombre d'instances dans vos groupes Auto Scaling.
version: '1.0'
---

## Aperçu

Amazon Auto Scaling est un service permettant de lancer ou de stopper automatiquement des instances EC2 en fonction de stratégies définies par l'utilisateur.

Activez cette intégration pour voir dans Datadog toutes vos métriques Auto Scaling.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).
### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `AutoScaling` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon Auto Scaling: 

    * `autoscaling:DescribeAutoScalingGroups`: Utilisé pour lister tous les groupes autoscaling.
    * `autoscaling:DescribePolicies`: Liste les stratégies disponibles (pour l'autocompletion des événements et des monitors).
    * `autoscaling:DescribeTags`: Utilisé pour lister tags d'un groupe d'autoscaling donné. Cela ajoutera des tags ASG sur les métriques ASG CloudWatch.
    * `autoscaling:DescribeScalingActivities`: Utilisé pour générer des événements quand un ASG passe à l'échelle supérieure ou inférieure.
    * `autoscaling:ExecutePolicy`: Exécute une stratégie (mise à l'échelle vers le haut ou vers le bas à partir d'un monitor ou du flux d'événements).
    Ceci n'est pas inclus dans le [document de politique d'installation] (#installation) et ne doit être inclus que si vous utilisez des monitors ou des événements pour exécuter une politique de mise à l'échelle automatique.

    Pour plus d'information sur les polices Auto Scaling, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_application-autoscaling.html).

3. Installez l'intégration [Datadog - AWS Auto Scaling] (https://app.datadoghq.com/account/settings#integrations/amazon_auto_scaling).


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_auto_scaling" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Auto-Scaling n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Auto-Scaling n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
