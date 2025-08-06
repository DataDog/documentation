---
app_id: amazon_vpn
categories:
- aws
- cloud
- log collection
- network
custom_kind: integration
description: Surveillez des métriques clés d'AWS VPN.
title: AWS VPN
---
## Section Overview

AWS VPN vous permet d'établir un tunnel sécurisé et privé depuis votre réseau ou appareil vers le réseau global AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de VPN.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, commencez par configurer l'[intégration Amazon Web Services] (https://docs.datadoghq.com/integrations/amazon_web_services/).

### Collecte de métriques

1. Dans le [AWS integration Page (page)](https://app.datadoghq.com/integrations/amazon-web-services), assurez-vous que `VPN` est activé sous l'onglet `Metric Collection`.
1. Installez l'intégration VPN [Datadog - AWS ] (https://app.datadoghq.com/integrations/amazon-vpn).

### Collecte de logs

#### Activer le logging

Configurez AWS VPN de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_vpn` est défini en tant que _Target prefix_.

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas encore fait, configurez la [Datadog Forwarder Lambda function] (https://docs.datadoghq.com/logs/guide/forwarder/).

1. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs AWS VPN dans la console AWS :

   - [Ajouter un déclencheur manuel sur le seau S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Ajouter un déclencheur manuel sur le groupe CloudWatch log ](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Données collectées

### Métriques

| | |
| --- | --- |
| **aws.vpn.tunnel_data_in** <br>(count) | Le nombre moyen d'octets qui sont entrés par le tunnel VPN<br>_Affiché en octets_. |
| **aws.vpn.tunnel_data_in.sum** <br>(count) | Le nombre total d'octets qui sont entrés par le tunnel VPN<br>_Constitué d'octets_. |
| **aws.vpn.tunnel_data_out** <br>(count) | Le nombre moyen d'octets qui ont traversé le tunnel VPN<br>_Affiché en octets_. |
| **aws.vpn.tunnel_data_out.sum** <br>(count) | Le nombre total d'octets qui ont traversé le tunnel VPN<br>_Constitué d'octets_. |
| **aws.vpn.tunnel_state** <br>(gauge) | Cette métrique est égale à 1 lorsque tous les tunnels du VPN sont en place, et à 0 lorsque tous les tunnels sont en panne. Les valeurs comprises entre 0 et 1 indiquent que certains tunnels du VPN sont en service.|
| **aws.vpn.tunnel_state.maximum** <br>(gauge) | Cette métrique est égale à 1 lorsque tous les tunnels du VPN sont en service, et à 0 lorsque tous les tunnels sont en panne.|
| **aws.vpn.tunnel_state.minimum** <br>(gauge) | Cette métrique est égale à 1 lorsque tous les tunnels du VPN sont en service, et à 0 lorsqu'un tunnel est en panne.|

### Événements

L'intégration AWS VPN n'inclut aucun événement.

### Checks de service

L'intégration AWS VPN n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).