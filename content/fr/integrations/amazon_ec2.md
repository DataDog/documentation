---
aliases:
  - /fr/integrations/awsec2/
  - /fr/agent/faq/install-the-agent-with-aws-ssm
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez l''utilisation des ressources de l''instance, surveillez les checks de statut, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ec2/'
git_integration_title: amazon_ec2
has_logo: true
integration_title: "Amazon\_EC2"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ec2
public_title: "Intégration Datadog/Amazon\_EC2"
short_description: 'Surveillez l''utilisation des ressources de l''instance, surveillez les checks de statut, et plus encore.'
version: '1.0'
---
## Présentation

Amazon Elastic Compute Cloud (Amazon EC2) est un service Web qui fournit une capacité de calcul adaptative dans le cloud. Ce service est conçu pour faciliter le cloud computing à l'échelle du Web pour les développeurs.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques EC2 ainsi que des événements supplémentaires, tels que des maintenances planifiées.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EC2` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon EC2. Pour en savoir plus sur les stratégies EC2, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS               | Description                                                                                                                           |
    |------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
    | `ec2:DescribeInstanceStatus` | Utilisé par l'intégration ELB pour assurer l'intégrité d'une l'instance et par l'intégration EC2 pour décrire l'intégrité de toutes les instances. |
    | `ec2:DescribeSecurityGroups` | Ajoute des tags personnalisés et des noms SecurityGroup aux instances EC2.                                                                            |
    | `ec2:DescribeInstances`      | Ajoute des tags aux instances EC2 et aux métriques EC2 CloudWatch.                                                                                |

3. Installez l'[intégration Datadog/AWS EC2][5].

**Remarque** : si vous souhaitez surveiller un sous-ensemble de vos instances EC2 avec Datadog, appliquez un tag AWS, comme `datadog:true`, à ces instances EC2. Ajoutez ensuite ce tag dans la zone de texte **Optionally limit metrics collection** de votre [carré d'intégration Datadog/AWS][6].

#### Désactivation automatique pour EC2

Datadog peut désactiver de façon proactive des monitors dans le cadre d'un arrêt manuel d'instances EC2 et d'une résiliation d'instance déclenchée par la mise à l'échelle automatique d'AWS en fonction des statuts des hosts de l'API Cloudwatch. Les instances EC2 automatiquement désactivées sont énumérées sur la page [Monitor Downtime][7] lorsque vous cochez l'option **Show automatically muted hosts**.

Sachez que l'intégration EC2 doit être installée pour activer la désactivation automatique. Si la collecte de métriques est limitée aux hosts avec des tags, seules les instances correspondant aux tags sont automatiquement désactivées.

Pour désactiver les monitors lors des arrêts planifiés de l'instance EC2, cochez la case **EC2 automuting** dans le [carré d'intégration AWS][2] :

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="Désactivation automatique AWS EC2" responsive="true">}}

### Installer l'Agent avec AWS Systems Manager

Suivez les étapes ci-dessous pour installer l'Agent Datadog sur une instance EC2 à l'aide d'AWS Systems Manager. Consultez [](https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/#pagetitle) pour découvrir les avantages de l'installation de l'Agent sur vos instances AWS EC2.

#### Parameter Store

Dans le [Parameter Store]](https://console.aws.amazon.com/systems-manager/parameters), créez un paramètre ayant les propriétés suivantes :

* Name : `dd-api-key-for-ssm`
* Description : (facultatif)
* Type : `SecureString`
* KMS key source : `My current account`
* KMS Key ID : utilisez la valeur sélectionnée par défaut.
* Value : votre [clé d'API Datadog](https://app.datadoghq.com/account/settings#api)

#### Systems Manager

##### Documents

Dans le Systems Manager, créez un [Document](https://console.aws.amazon.com/systems-manager/documents) :

* Name : `dd-agent-install`
* Target type : (facultatif)
* Document type : `Command document`
* Content : `JSON`

Si vous utilisez le site américain de Datadog, utilisez le fichier [dd-agent-install-us-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json) après y avoir spécifié votre `<RÉGION_AWS>` sous `runCommand` (p. ex., `us-east-1`). Si vous êtes sur le site européen de Datadog, utilisez plutôt le fichier [dd-agent-install-eu-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json).

##### Run Command

Sous [Run Command](https://console.aws.amazon.com/systems-manager/run-command/executing-commands), cliquez sur le bouton **Run command** et suivez les étapes ci-dessous :

* **Command document** :
    * Cliquez sur la zone de recherche et sélectionnez *Owner -> Owned by me*.
    * Cliquez sur la case d'option correspondant à votre document.
    * Si besoin, sélectionnez le paramètre **Document version**.
* **Targets** :
    * Sélectionnez l'instance EC2 à cibler.
* **Output options** (facultatif) :
    * Cochez la case **CloudWatch output** pour loguer les éventuels problèmes.
* **Autres sections* (facultatif) :
    * Modifiez les autres sections en fonction de votre configuration si vous le souhaitez.

Cliquez sur le bouton **Run** ; une page de confirmation montrant le statut s'affiche. Patientez jusqu'à la fin puis vérifiez la [liste d'infrastructures](https://app.datadoghq.com/infrastructure) dans Datadog.

### Collecte de logs

Utilisez l'[Agent Datadog][8] ou un autre [log shipper][9] pour envoyer vos logs vers Datadog.
## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ec2" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

**Remarque** : `aws.ec2.instance_age` n'est pas recueillie par défaut avec l'intégration Datadog/EC2. [Contactez-nous][11] pour activer la collecte de cette métrique.

### Checks de service
L'intégration AWS EC2 n'inclut aucun check de service.

### Événements
L'intégration AWS EC2 comprend des événements pour les maintenances planifiées et à venir ainsi que des avertissements d'instance. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_ec2/aws_ec2_events.png" alt="Événements AWS EC2" responsive="true">}}

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

## Pour aller plus loin

* [Métriques clés pour la surveillance EC2][13]
* [Comment recueillir des métriques EC2][14]
* [Comment surveiller les instances EC2 avec Datadog][15]


[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ec2.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_ec2
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[7]: https://app.datadoghq.com/monitors#downtime
[8]: https://docs.datadoghq.com/fr/logs
[9]: https://docs.datadoghq.com/fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://docs.datadoghq.com/fr/help
[13]: https://www.datadoghq.com/blog/ec2-monitoring
[14]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[15]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog


{{< get-dependencies >}}