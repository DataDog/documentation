---
aliases:
  - /fr/integrations/amazon_vpc/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Rassemblez vos logs AWS VPC.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_vpc/'
git_integration_title: amazon_vpc
has_logo: false
integration_title: AWS VPC
is_public: true
kind: integration
manifest_version: 1
name: amazon_vpc
public_title: Intégration Datadog/AWS VPC
short_description: Rassemblez vos logs AWS VPC.
version: 1
---
### Présentation

Amazon Virtual Private Cloud (Amazon VPC) vous permet de lancer des ressources AWS dans votre réseau virtuel. La fonctionnalité de logs de flux VPC vous permet de capturer des informations sur le trafic IP entrant et sortant des interfaces réseau dans votre VPC.

### Implémentation
### Installation

L'[intégration Amazon Web Services][1] doit être configurée dans Datadog.

### Collecte de métriques

Aucune étape supplémentaire n'est nécessaire pour recueillir les métriques AWS VPC.

#### Collecte de logs

##### Activer la journalisation de logs de flux VPC

Les logs de flux VPC peuvent être envoyés à un compartiment S3 ou à un groupe de logs CloudWatch. Cliquez sur le VPC que vous souhaitez surveiller dans la liste, puis choisissez `Create Flow logs` dans l'onglet Flow Logs, dans la partie inférieure de l'écran :

{{< img src="integrations/amazon_vpc/flow_logs.png" alt="logs de flux" responsive="true" style="width:75%;" >}}

Sélectionnez le filtre `All` pour afficher les connexions acceptées et refusées, puis choisissez le compartiment S3 ou le groupe de logs appropriés :

{{< img src="integrations/amazon_vpc/flow_log_creation.png" alt="création de logs de flux" responsive="true" style="width:75%;" >}}

**Remarque** : ajoutez `vpc` comme préfixe pour le fichier S3 ou le nom des groupes de logs CloudWatch, afin que le Lambda configure automatiquement la source `vpc` sur les logs.

##### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][2].

2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs de flux VPC par le biais de la console AWS. Dans votre Lambda, cliquez ensuite sur S3 ou CloudWatch dans la liste des déclencheurs :

    {{< img src="integrations/amazon_vpc/s3_trigger_configuration.png" alt="configuration du déclencheur S3" responsive="true" style="width:75%;" >}}

    Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs AWS VPC et remplacez le *type d'événement* par `Object Created (All)`. Cliquez ensuite sur le bouton Add.

    {{< img src="integrations/amazon_vpc/s3_lambda_trigger_configuration.png" alt="déclencheur Lambda S3" responsive="true" style="width:75%;" >}}

Lorsque vous avez terminé, utilisez le [Log Explorer de Datadog][3] pour visualiser vos logs.

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_vpc" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS VPC n'inclut aucun événement.

### Checks de service
L'intégration AWS VPC n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[3]: https://docs.datadoghq.com/fr/logs/explorer/
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpc/amazon_vpc_metadata.csv
[5]: http://docs.datadoghq.com/help/


{{< get-dependencies >}}