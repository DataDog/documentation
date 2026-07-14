---
aliases: []
categories:
- aws
- cloud
- log collection
- network
dependencies: []
description: Rassemblez vos logs AWS VPC.
doc_link: https://docs.datadoghq.com/integrations/amazon_vpc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/vpc-security-flowlogs/
  tag: GitHub
  text: Surveiller les logs de flux afin d'assurer la sécurité de VPC avec Datadog
git_integration_title: amazon_vpc
has_logo: false
integration_id: ''
integration_title: Amazon VPC
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_vpc
public_title: Intégration Datadog/Amazon VPC
short_description: Rassemblez vos logs AWS VPC.
version: '1.0'
---

## Présentation

Amazon Virtual Private Cloud (Amazon VPC) vous permet de lancer des ressources AWS dans votre réseau virtuel. La fonctionnalité de logs de flux VPC vous permet de capturer des informations sur le trafic IP entrant et sortant des interfaces réseau dans votre VPC.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

Aucune étape supplémentaire n'est nécessaire pour recueillir les métriques AWS VPC autres que `aws.vpc.flowlogs.*`. Les métriques commençant par `aws.vpc.flowlogs.*` sont générées par l'intégration [Datadog/Logs de flux VPC][2]. Consultez la section [collecte de logs](#collecte-de-logs) ci-dessous pour activer la collecte de métriques des logs de flux.

Pour les métriques `aws.vpc.subnet.*`, contactez l'[assistance Datadog][3] afin d'activer la collecte pour votre compte.

### Collecte de logs


#### Trouver ou créer la ressource de destination dans AWS pour vos logs de flux VPC

Les logs de flux VPC doivent d'abord être transmis à une destination intermédiaire avant d'être envoyés à Datadog. Vous pouvez les envoyer directement à un Kinesis Data Firehose, ou les stocker dans un compartiment S3 ou un groupe de logs CloudWatch.

Il est recommandé d'utiliser Kinesis Data Firehose, car cette approche représente une charge opérationnelle plus faible et peut se révéler plus économique. Consultez la section [Présentation de l'envoi de logs de flux Amazon VPC à Kinesis Data Firehose][4] (en anglais) pour en savoir plus.

1. Choisissez l'une des destinations suivantes ou créez-la :
   - Kinesis Data Firehose (recommandé) : si vous ne disposez pas déjà d'un flux de diffusion Kinesis Data Firehose pour l'envoi de logs à Datadog, suivez les instructions de la section [Envoyer des logs de services AWS avec la destination Datadog pour Kinesis Firehose][5] pour en créer un. **Remarque** : vous pouvez également choisir un flux de diffusion d'un autre compte AWS de votre VPC afin de centraliser la collecte et la diffusion de logs.
   - Chemin de compartiment S3 ou de dossier
   - Groupe de logs CloudWatch

**Remarque** : ajoutez le préfixe `vpc` au chemin du compartiment S3 ou au nom du groupe de logs CloudWatch pour que le Lambda ajoute automatiquement aux logs un tag correspondant à la source `vpc`.


#### Activer la journalisation de logs de flux VPC

1. Dans la console AWS, accédez au VPC que vous souhaitez surveiller.
2. Accédez à l'onglet **Flow logs**. 
3. Cliquez sur **Create flow log**.
4. Sélectionnez le filtre `All` pour afficher les connexions acceptées et refusées.
5. Sélectionnez le type de destination de votre choix (Kinesis Data Firehose, compartiment S3 ou groupe de logs CloudWatch) pour les logs.
6. Renseignez les détails concernant la ressource de destination.
7. Cliquez sur **Create flow log**.

#### Envoyer des logs à Datadog

Si vous avez la destination Kinesis Data Firehose, la configuration est terminée.

Si vous avez sélectionné un compartiment S3 ou un groupe de logs CloudWatch comme destination, procédez comme suit :

1. Si ce n'est pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][6] dans votre compte AWS.
2. Une fois la fonction Lambda configurée, accédez-y. Dans la section Function Overview, cliquez sur **Add Trigger**.
3. Sélectionnez le déclencheur **S3** ou **CloudWatch Logs** pour le champ Trigger Configuration.
4. Sélectionnez le compartiment S3 ou le groupe de logs CloudWatch qui contient vos logs VPC.
5. Pour les compartiments S3, conservez le type d'événement `All object create events`.
6. Cliquez sur **Add** pour ajouter le déclencheur à votre fonction Lambda.

Accédez au [Log Explorer][7] pour commencer à explorer vos logs.

Pour en savoir plus sur la collecte de logs de services AWS, consultez la section [Envoyer des logs de services AWS avec la fonction Lambda Datadog][8].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_vpc" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS VPC n'inclut aucun événement.

### Checks de service

L'intégration AWS VPC n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-VPC-Flow-Logs
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-amazon-vpc-flow-logs-kinesis-data-firehose/
[5]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[6]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/fr/logs/explorer/
[8]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpc/amazon_vpc_metadata.csv