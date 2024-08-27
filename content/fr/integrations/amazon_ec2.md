---
aliases:
- /fr/integrations/awsec2/
- /fr/agent/faq/install-the-agent-with-aws-ssm
categories:
- cloud
- os & system
- aws
- log collection
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
custom_kind: integration
manifest_version: '1.0'
monitors:
  ec2_cpu_utilization: assets/monitors/ec2_cpu_utilization.json
  ec2_host_ok: assets/monitors/ec2_host_ok.json
  ec2_status_check: assets/monitors/ec2_status_check.json
name: amazon_ec2
public_title: Intégration Datadog/Amazon EC2
short_description: Surveillez l'utilisation des ressources des instances, les checks
  de statut, et plus encore.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Amazon Elastic Compute Cloud (Amazon EC2) est un service Web qui fournit une capacité de calcul adaptative dans le cloud. Ce service est conçu pour faciliter le cloud computing à l'échelle du Web pour les développeurs.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques EC2 ainsi que des événements supplémentaires, tels que des maintenances planifiées.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Dépannage de la solution Browser

1. Sur la [page de l'intégration AWS][2], vérifiez que `EC2` est activé dans l'onglet `Metric Collection`.

2. Ajoutez les autorisations requises suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon EC2. Pour en savoir plus, consultez la section relative aux [stratégies EC2][4] de la documentation AWS.

    | Autorisation AWS               | Description                                                                                                                           |
    | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
    | `ec2:DescribeInstanceStatus` | Utilisé par l'intégration ELB pour assurer l'intégrité d'une l'instance et par l'intégration EC2 pour décrire l'intégrité de toutes les instances. |
    | `ec2:DescribeSecurityGroups` | Ajoute des tags personnalisés et des noms SecurityGroup aux instances EC2.                                                                            |
    | `ec2:DescribeInstances`      | Ajoute des tags aux instances EC2 et aux métriques EC2 CloudWatch.                                                                                |

3. Installez l'[intégration Datadog/Amazon EC2][5].

**Remarque** : si vous souhaitez surveiller un sous-ensemble de vos instances EC2 avec Datadog, appliquez un tag AWS, comme `datadog:true`, à ces instances EC2. Ajoutez ensuite ce tag dans la zone de texte **Limit metric collection to specific resources** de l'onglet **Metric Collection** sur la [page de votre intégration Datadog/AWS][2].

#### Désactivation automatique pour EC2

En cas d'arrêt manuel d'instances EC2 et de résiliation d'instances déclenchée par la mise à l'échelle automatique d'AWS, Datadog peut désactiver de façon proactive des monitors en fonction des statuts des hosts fournis par l'API CloudWatch. Les instances EC2 automatiquement désactivées sont énumérées sur la page [Monitor Downtime][6] lorsque vous cochez l'option **Show automatically muted hosts**.

Sachez que l'intégration EC2 doit être installée pour activer la désactivation automatique. Si la collecte de métriques est limitée aux hosts avec des tags, seules les instances correspondant aux tags sont automatiquement désactivées.

Pour désactiver les monitors lors des arrêts planifiés de l'instance EC2, cochez la case **EC2 automuting** sur le [page de l''intégration AWS][2] :

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="Option Automuting d'Amazon EC2" >}}

### Installer l'Agent avec AWS Systems Manager (SSM)

Suivez les étapes ci-dessous pour installer l'Agent Datadog sur des instances EC2 à l'aide d'AWS Systems Manager. Consultez la section [Pourquoi installer l'Agent Datadog sur mes instances cloud ?][7] pour découvrir les avantages de l'installation de l'Agent sur vos instances Amazon EC2.

#### Installation de l'Agent via l'IU Amazon Systems Manager (recommandé)

1. Configurez le [rôle IAM][8] sur vos instances EC2 afin d'activer l'[autorisation AmazonSSMManagedInstanceCore][9].

2. Accédez à l'[onglet Document d'AWS SSM][10].
3. Recherchez le terme `datadog`. Remarque : vous devrez peut-être changer de région depuis la barre de navigation supérieure de la console AWS Management afin de trouver le document adéquat.
4. Choisissez le document Linux ou Windows en fonction de vos besoins.
- Linux : datadog-agent-installation-linux
- Windows : datadog-agent-installation-windows

5. Remplissez les paramètres de commande.
6. Sélectionnez les instances cibles sur lesquelles installer l'Agent.
7. Cliquez sur **Run**.
8. Patientez jusqu'à ce que le statut de confirmation s'affiche, puis consultez la liste d'infrastructure dans Datadog.

#### Méthodes d'installation personnalisées de l'Agent

##### Parameter Store

Dans le [Parameter Store][11], créez un paramètre ayant les propriétés suivantes :

- Name : `dd-api-key-for-ssm`
- Description : (facultatif)
- Type : `SecureString`
- KMS key source : `My current account`
- KMS Key ID : utilisez la valeur sélectionnée par défaut
- Value : votre [clé d'API Datadog][12]

##### Documents

Dans le gestionnaire de systèmes, créez un [document][13] :

- Name : `dd-agent-install`
- Target type : (facultatif)
- Document type : `Command document`
- Content : `JSON`

Si vous êtes sur le site américain de Datadog, utilisez le fichier [dd-agent-install-us-site.json][14], en prenant soin de spécifier votre région AWS à la place de `<AWS_REGION>` sous `runCommand` (p. ex., `us-east-1`). Si vous êtes sur le site européen de Datadog, utilisez plutôt le fichier [dd-agent-install-eu-site.json][15].

##### Run Command

Sous [Run Command][16], cliquez sur le bouton **Run command** et suivez les étapes ci-dessous :

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

Cliquez sur le bouton **Run** ; une page de confirmation indiquant le statut s'affiche alors. Patientez jusqu'au statut final, puis vérifiez la [liste d'infrastructure][17] dans Datadog.

### Collecte de logs

Utilisez l'[Agent Datadog][18] ou un autre [shipper de logs][19] pour envoyer vos logs à Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_ec2" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

**Remarques** : 
   - La métrique `aws.ec2.instance_age` n'est pas recueillie par défaut avec l'intégration Datadog/EC2. Contactez l'[assistance Datadog][21] pour activer la collecte de cette métrique.
   - La métrique `aws.ec2.host_ok` est recueillie par défaut, même si vous désactivez la collecte de métriques pour l'intégration Amazon EC2. Elle peut entraîner l'affichage de hosts inattendus dans la liste d'infrastructure. Pour masquer ces hosts, appliquez un tag AWS, comme `datadog:true`, à ces instances EC2. Ajoutez ensuite ce tag dans la zone de texte **Limit metric collection to specific resources** de l'onglet **Metric Collection** sur la [page de votre intégration Datadog/AWS][2].

### Aide
{{< get-service-checks-from-git "amazon_ec2" >}}


## Fonctionnalités de surveillance prêtes à l'emploi

L'intégration Amazon EC2 propose des fonctionnalités de surveillance prêtes à l'emploi vous permettant de surveiller et d'optimiser vos performances.

- Dashboard Amazon EC2 Overview : bénéficiez d'une vue d'ensemble complète de vos instances EC2 grâce à [ce dashboard prêt à l'emploi][23].
- Monitors recommandés : activez les [monitors Amazon EC2 recommandés][24] pour détecter des problèmes de façon proactive et recevoir des alertes en temps opportun.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][21].

## Pour aller plus loin

- [Métriques clés pour la surveillance EC2][25]
- [Comment recueillir des métriques EC2][26]
- [Comment surveiller des instances EC2 avec Datadog][27]

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://docs.datadoghq.com/fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[9]: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html
[10]: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html
[11]: https://console.aws.amazon.com/systems-manager/parameters
[12]: https://app.datadoghq.com/organization-settings/api-keys
[13]: https://console.aws.amazon.com/systems-manager/documents
[14]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[15]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[16]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[17]: https://app.datadoghq.com/infrastructure
[18]: https://docs.datadoghq.com/fr/agent/logs/
[19]: https://docs.datadoghq.com/fr/integrations/rsyslog/
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[21]: https://docs.datadoghq.com/fr/help/
[22]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/service_checks.json
[23]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[24]: https://app.datadoghq.com/monitors/recommended
[25]: https://www.datadoghq.com/blog/ec2-monitoring
[26]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[27]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog