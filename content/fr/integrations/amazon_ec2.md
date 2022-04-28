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
description: Surveillez l'utilisation des ressources des instances, les checks de
  statut, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2/
draft: false
git_integration_title: amazon_ec2
has_logo: true
integration_id: amazon-ec2
integration_title: Amazon EC2
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ec2
public_title: Intégration Datadog/Amazon EC2
short_description: Surveillez l'utilisation des ressources des instances, les checks
  de statut, et plus encore.
version: '1.0'
---

## Présentation

Amazon Elastic Compute Cloud (Amazon EC2) est un service Web qui fournit une capacité de calcul adaptative dans le cloud. Ce service est conçu pour faciliter le cloud computing à l'échelle du Web pour les développeurs.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques EC2 ainsi que des événements supplémentaires, tels que des maintenances planifiées.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], accédez à l'onglet **Configuration** et vérifiez que l'option `EC2` est cochée sous **Limit metric collection by AWS Service**.

2. Ajoutez les autorisations requises suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon EC2. Pour en savoir plus, consultez la section relative aux [stratégies EC2][4] de la documentation AWS.

    | Autorisation AWS               | Description                                                                                                                           |
    | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
    | `ec2:DescribeInstanceStatus` | Utilisé par l'intégration ELB pour assurer l'intégrité d'une l'instance et par l'intégration EC2 pour décrire l'intégrité de toutes les instances. |
    | `ec2:DescribeSecurityGroups` | Ajoute des tags personnalisés et des noms SecurityGroup aux instances EC2.                                                                            |
    | `ec2:DescribeInstances`      | Ajoute des tags aux instances EC2 et aux métriques EC2 CloudWatch.                                                                                |

3. Installez l'[intégration Datadog/AWS EC2][5].

**Remarque** : si vous souhaitez surveiller un sous-ensemble de vos instances EC2 avec Datadog, appliquez un tag AWS, comme `datadog:true`, à ces instances EC2. Ajoutez ensuite ce tag dans la zone de texte **Optionally limit metrics collection** de votre [carré d'intégration Datadog/AWS][2].

#### Désactivation automatique pour EC2

En cas d'arrêt manuel d'instances EC2 et de résiliation d'instances déclenchée par la mise à l'échelle automatique d'AWS, Datadog peut désactiver de façon proactive des monitors en fonction des statuts des hosts fournis par l'API CloudWatch. Les instances EC2 automatiquement désactivées sont énumérées sur la page [Monitor Downtime][6] lorsque vous cochez l'option **Show automatically muted hosts**.

Sachez que l'intégration EC2 doit être installée pour activer la désactivation automatique. Si la collecte de métriques est limitée aux hosts avec des tags, seules les instances correspondant aux tags sont automatiquement désactivées.

Pour désactiver les monitors lors des arrêts planifiés de l'instance EC2, cochez la case **EC2 automuting** dans le [carré d'intégration AWS][2] :

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="Désactivation automatique AWS EC2" >}}

### Installer l'Agent avec AWS Systems Manager

Suivez les étapes ci-dessous pour installer l'Agent Datadog sur une instance EC2 à l'aide d'AWS Systems Manager. Consultez la section [Pourquoi installer l'Agent Datadog sur mes instances cloud ?][7] pour découvrir les avantages de l'installation de l'Agent sur vos instances AWS EC2.

#### Parameter Store

Dans le [Parameter store][8], créez un paramètre avec les propriétés suivantes :

- Name : `dd-api-key-for-ssm`
- Description : (facultatif)
- Type : `SecureString`
- KMS key source : `My current account`
- KMS Key ID : utilisez la valeur sélectionnée par défaut.
- Valeur : votre [clé d'API Datadog][9]

#### Gestionnaire de systèmes

##### Documents

Dans le gestionnaire de systèmes, créez un [document][10] :

- Name : `dd-agent-install`
- Target type : (facultatif)
- Document type : `Command document`
- Content : `JSON`

Si vous utilisez le site américain de Datadog, utilisez le fichier [dd-agent-install-us-site.json][11] après y avoir spécifié votre région AWS à la place de `<AWS_REGION>` sous `runCommand` (p. ex., `us-east-1`). Si vous utilisez le site européen de Datadog, utilisez plutôt le fichier [dd-agent-install-eu-site.json][12].

##### Run command

Sous [Run Command][13], cliquez sur le bouton **Run command** et suivez les étapes ci-dessous :

- **Command document** :
  - Cliquez sur la zone de recherche et sélectionnez _Owner -> Owned by me_.
  - Cliquez sur la case d'option correspondant à votre document.
  - Si besoin, sélectionnez le paramètre **Document version**.
- **Targets** :
  - Sélectionnez l'instance EC2 à cibler.
- **Output options** (facultatif) :
  - Cochez la case **CloudWatch output** pour loguer les éventuels problèmes.
- **Autres sections* (facultatif) :
  - Modifiez les autres sections en fonction de votre configuration si vous le souhaitez.

Cliquez sur le bouton **Run** ; une page de confirmation montrant le statut s'affiche alors. Patientez jusqu'à la fin, puis vérifiez la [liste d'infrastructures][14] dans Datadog.

### Collecte de logs

Utilisez l'[Agent Datadog][15] ou un autre [log shipper][16] pour envoyer vos logs vers Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_ec2" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

**Remarque** : la métrique `aws.ec2.instance_age` n'est pas recueillie par défaut avec l'intégration Datadog/EC2. Contactez l'[assistance Datadog][18] pour activer la collecte de cette métrique.

### Checks de service
{{< get-service-checks-from-git "amazon_ec2" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][18].

## Pour aller plus loin

- [Métriques clés pour la surveillance EC2][20]
- [Comment recueillir des métriques EC2][21]
- [Comment surveiller des instances EC2 avec Datadog][22]

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_ec2
[6]: https://app.datadoghq.com/monitors#downtime
[7]: https://docs.datadoghq.com/fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://console.aws.amazon.com/systems-manager/parameters
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://console.aws.amazon.com/systems-manager/documents
[11]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[12]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[13]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[14]: https://app.datadoghq.com/infrastructure
[15]: https://docs.datadoghq.com/fr/agent/logs/
[16]: https://docs.datadoghq.com/fr/integrations/rsyslog/
[17]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[18]: https://docs.datadoghq.com/fr/help/
[19]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/service_checks.json
[20]: https://www.datadoghq.com/blog/ec2-monitoring
[21]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[22]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog