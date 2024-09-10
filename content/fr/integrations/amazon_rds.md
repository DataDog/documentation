---
aliases:
- /fr/integrations/awsrds/
- /fr/integrations/rds/
- /fr/integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances/
categories:
- aws
- cloud
- data stores
- log collection
- network
dependencies: []
description: Surveiller un ensemble de métriques relatives à Amazon RDS.
doc_link: https://docs.datadoghq.com/integrations/amazon_rds/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/
  tag: Blog
  text: Surveiller des métriques de performance MySQL sur RDS
- link: https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/
  tag: Blog
  text: Métriques clés pour la surveillance PostgreSQL sur AWS RDS
- link: https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/
  tag: Blog
  text: Surveiller les métriques de performance d'Amazon Aurora
git_integration_title: amazon_rds
has_logo: true
integration_id: amazon-rds
integration_title: Amazon RDS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  rds_cpu_utilization: assets/monitors/rds_cpu_utilization.json
  rds_database_connections_anomaly: assets/monitors/rds_database_connections_anomaly.json
  rds_storage_utilization: assets/monitors/rds_storage_utilization.json
name: amazon_rds
public_title: Intégration Datadog/Amazon RDS
short_description: Surveiller un ensemble de métriques relatives à Amazon RDS.
version: '1.0'
---

<!-- SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awsrds/rdsdashboard.png" alt="RDS Dashboard" popup="true">}}

## Présentation

Amazon Relational Database Service (RDS) est un service Web qui facilite la configuration, l'exploitation et la mise à l'échelle d'une base de données relationnelle dans le cloud. Activez cette intégration pour visualiser toutes vos métriques RDS dans Datadog.

**Remarque** : vérifiez que la variable d'environnement `DD_SITE` est définie sur votre région en dehors du code, {{< region-param key="dd_site" code="true" >}}, ou définissez la variable dans le code comme suit :

`DD_SITE = os.getenv("DD_SITE", default="{{< region-param key="dd_site" code="true" >}}")`

Vous pouvez surveiller les instances RDS avec les intégrations standard, améliorée et native. **Consultez la [liste complète des métriques](#donnees-recueillies) avant de choisir une configuration**. En effet, chaque métrique correspond à une configuration précise. Passez également en revue les informations ci-dessous pour en savoir plus sur les exigences de chaque configuration ainsi que sur le dashboard par défaut :

{{< tabs >}}
{{% tab "Intégration standard" %}}

Pour installer l'intégration standard, vous devez activer RDS dans l'onglet `Metric Collection` de la [page de l'intégration AWS][1]. Vous pourrez ainsi recevoir des métriques relatives à votre instance aussi souvent que votre intégration CloudWatch le permet. Tous les types de moteurs RDS sont pris en charge.

Le dashboard par défaut pour cette intégration rassemble des informations sur les connexions, le décalage de réplication, la latence et les opérations de lecture, l'ordinateur, la RAM, la latence et les opérations d'écriture ainsi que le disque.


[1]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{% tab "Intégration améliorée" %}}

L'intégration améliorée nécessite une configuration supplémentaire et est seulement disponible pour les moteurs MySQL, Aurora, MariaDB, SQL Server, Oracle et PostgreSQL. Des métriques supplémentaires sont disponibles, mais vous devez disposer d'un AWS Lambda pour envoyer les métriques à Datadog. Une granularité plus élevée et des services requis complémentaires peuvent engendrer une hausse des frais AWS.

Le dashboard par défaut pour cette intégration rassemble des informations sur les chargements, la disponibilité, l'utilisation du CPU, les tâches, la mémoire, le swap, les réceptions réseau, les transmissions réseau, le CPU utilisé par processus, la mémoire utilisée par processus, les opérations de disque, le système de fichiers utilisé (pourcentage), les tâches en cours d'exécution et l'utilisation du CPU système.

{{% /tab %}}
{{% tab "Intégration native" %}}

L'intégration native des bases de données est facultative et disponible pour les moteurs MySQL, Aurora, MariaDB, SQL Server et PostgreSQL. Pour faire correspondre les métriques de RDS et celles de l'intégration native, utilisez le tag `dbinstanceidentifier` de l'intégration native basé sur l'identificateur que vous attribuez à l'instance RDS. Le tag est automatiquement attribué aux instances RDS.

Il existe trois dashboards par défaut pour cette configuration : MySQL, Aurora et PostgreSql. Chacun d'entre eux inclut des informations sur le volume de requête, l'E/S du disque, les connexions, la réplication et les ressources AWS.

**Remarque** : ces dashboards affichent des métriques provenant à la fois d'AWS CloudWatch et du moteur de la base de données. Activez l'une des intégrations [MySQL][1], [Aurora][2] ou [PostgreSQL][3] pour obtenir toutes les métriques des intégrations.


[1]: https://docs.datadoghq.com/fr/integrations/mysql/
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html
[3]: https://docs.datadoghq.com/fr/integrations/postgres/
{{% /tab %}}
{{< /tabs >}}

## Implémentation

### Installation

{{< tabs >}}
{{% tab "Intégration standard" %}}

Pour l'intégration RDS standard, commencez par configurer l'[intégration Amazon Web Services][1].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
{{% /tab %}}
{{% tab "Intégration améliorée" %}}

Activez la surveillance améliorée de votre instance RDS. Vous pouvez activer cette fonctionnalité lors de la création de l'instance ou ultérieurement, en sélectionnant **Modify** dans **Instance Actions**. Il est conseillé de choisir une granularité de surveillance de `15` secondes.

Les instructions suivantes reposent sur l'utilisation de KMS et de la console de gestion Lambda pour créer une version chiffrée de votre clé d'API Datadog. Cette dernière peut uniquement être utilisée avec la fonction Lambda de surveillance améliorée de RDS. Si vous disposez déjà d'une clé d'API chiffrée provenant d'un autre Lambda, tel que le [Forwarder de logs][1], consultez le fichier [README de la fonction Lambda][2] pour obtenir des options supplémentaires.

#### Créer votre clé KMS

1. Ouvrez la page d'accueil de KMS à l'adresse https://console.aws.amazon.com/kms/home.
2. Accédez à **Customer managed keys**.
3. Sélectionnez **Create Key**.
4. Saisissez un alias pour la clé, par exemple `lambda-datadog-key`. _Remarque : un alias ne peut pas commencer par « aws ». Les alias commençant par « aws » sont réservés par Amazon Web Services et représentent les clés CMK gérées par AWS dans votre compte._
5. Ajoutez les administrateurs appropriés afin de déterminer les personnes pouvant gérer cette clé.
6. Vous n'avez pas besoin d'ajouter le moindre rôle.
7. Enregistrez votre clé KMS.

#### Créer votre fonction Lambda

1. Depuis la console de gestion Lambda, créez une fonction Lambda. **Votre fonction Lambda doit se trouver dans la même région que celle de la clé KMS que vous avez créée.**
2. Choisissez `Serverless Application Repository`, recherchez `Datadog-RDS-Enhanced` et sélectionnez cette option.
3. Saisissez un nom unique pour l'application.
4. Collez l'identifiant de la clé créée dans le paramètre `KMSKeyId` de la section précédente et effectuez le déploiement.
5. Une fois l'application déployée, ouvrez la fonction Lambda créée (cliquez sur la fonction dans « Resource »).
6. Cliquez sur l'onglet `Configuration` et accédez à la section `Environment variables`. Pour la variable d'environnement `kmsEncryptedKeys`, ajoutez votre [clé d'API Datadog][3] au format JSON complet dans le champ `value` comme suit : `{"api_key":"<VOTRE_CLÉ_API>"}`.
7. Ouvrez la section `Encryption configuration` et sélectionnez `Enable helpers for encryption in transit`.
8. Dans la section `KMS key to encrypt at rest`, sélectionnez `Use a customer master key` et saisissez la clé KMS que vous avez précédemment créée.
9. Appuyez sur le bouton Encrypt à côté de l'objet blob JSON que vous venez de saisir, puis, dans la fenêtre qui s'affiche, choisissez également le nom de la clé KMS que vous avez précédemment créée.
10. Cliquez sur Save.
11. Créez un nouveau déclencheur en définissant le groupe de logs CloudWatch `RDSOSMetrics` en tant que source.
12. Nommez le filtre, indiquez un pattern de filtre facultatif, puis cliquez sur Save.

Lorsque vous cliquez sur le bouton de test de votre fonction Lambda, il se peut que cette erreur s'affiche :

```json
{
    "stackTrace": [
        [
            "/var/task/lambda_function.py",
            109,
            "lambda_handler",
            "event = json.loads(gzip.GzipFile(fileobj=StringIO(event['awslogs']['data'].decode('base64'))).read())"
        ]
    ],
    "errorType": "KeyError",
    "errorMessage": "'awslogs'"
}
```

Vous pouvez l'ignorer. Le bouton de test ne fonctionne pas avec cette configuration.


[1]: https://docs.datadoghq.com/fr/serverless/forwarder/
[2]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/rds_enhanced_monitoring#setup
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Intégration native" %}}

1. Accédez à la console AWS et ouvrez la section RDS pour trouver l'instance que vous souhaitez surveiller.
  {{< img src="integrations/awsrds/rds-console.png" alt="Console RDS" >}}
2. Relevez l'URL de l'endpoint, par exemple **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**, qui est utilisée pour configurer l'Agent. Notez également le paramètre `DB Instance identifier`, par exemple **mysqlrds**, qui est utilisé pour créer des graphiques et des dashboards.

{{% /tab %}}
{{< /tabs >}}

### Configuration

{{< tabs >}}
{{% tab "Intégration standard" %}}

1. Sur la [page de l'intégration AWS][1], vérifiez que `RDS` est activé dans l'onglet `Metric Collection`.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][2] afin de recueillir des métriques Amazon RDS. Pour en savoir plus, consultez la section relative aux [stratégies RDS][3] (en anglais) de la documentation AWS.

    | Autorisation AWS            | Description                          |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | Décrit les instances RDS auxquelles ajouter des tags.  |
    | `rds:ListTagsForResource` | Ajoute des tags personnalisés aux instances RDS.    |
    | `rds:DescribeEvents`      | Ajoute des événements associés aux bases de données RDS. |

3. Installez l'[intégration Datadog/Amazon RDS][4].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Intégration améliorée" %}}

1. Sur la [page de l'intégration AWS][1], vérifiez que `RDS` est activé dans l'onglet `Metric Collection`.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][2] afin de recueillir des métriques Amazon RDS. Pour en savoir plus, consultez la section relative aux [stratégies RDS][3] (en anglais) de la documentation AWS.

    | Autorisation AWS            | Description                          |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | Décrit les instances RDS auxquelles ajouter des tags.  |
    | `rds:ListTagsForResource` | Ajoute des tags personnalisés aux instances RDS.    |
    | `rds:DescribeEvents`      | Ajoute des événements associés aux bases de données RDS. |

3. Installez l'[intégration Datadog/Amazon RDS][4].


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Intégration native" %}}

Configurez un Agent et connectez-vous à votre instance RDS en modifiant le fichier YAML approprié dans votre répertoire conf.d, puis redémarrez votre Agent :

Pour RDS Aurora, modifiez le fichier YAML de la base de données que vous utilisez.

Si vous utilisez MySQL ou MariaDB, modifiez `mysql.yaml` :

```yaml
init_config:

instances:
    # L'URL d'endpoint de la console AWS
    - server: 'mysqlrds.blah.us-east-1.rds.amazonaws.com'
      user: '<NOM_UTILISATEUR>'
      pass: '<MOT_DE_PASSE>'
      port: 3306
      tags:
          - 'dbinstanceidentifier:<NOM_INSTANCE>'
```

Si vous utilisez PostgreSQL, modifiez `postgres.yaml` :

```yaml
init_config:

instances:
    - host: 'postgresqlrds.blah.us-east-1.rds.amazonaws.com'
      port: 5432
      username: '<NOM_UTILISATEUR>'
      password: '<MOT_DE_PASSE>'
      dbname: '<NOM_BASE_DE_DONNÉES>'
      tags:
          - 'dbinstanceidentifier:<NOM_INSTANCE_BASE_DE_DONNÉES>'
```

Si vous utilisez Microsoft SQL Server, modifiez `sqlserver.yaml` :

```yaml
init_config:

instances:
    - host: 'sqlserverrds.blah.us-east-1.rds.amazonaws.com,1433'
      username: '<NOM_UTILISATEUR>'
      password: '<MOT_DE_PASSE>'
      tags:
          - 'dbinstanceidentifier:<NOM_INSTANCE_BASE_DE_DONNÉES>'
```

### Validation

[Lancez la sous-commande status de l'Agent][1] et cherchez quelque chose qui ressemble à ceci dans la section Checks :

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-information
{{% /tab %}}
{{< /tabs >}}

### Utilisation

Après quelques minutes, les métriques RDS et les [métriques de MySQL, Aurora, MariaDB, SQL Server, Oracle ou PostgreSQL][1] peuvent être consultées dans Datadog depuis le Metrics Explorer, les [dashboards][2] et les [alertes][3]. Voici un exemple de dashboard Aurora affichant un certain nombre de métriques issues des intégrations MySQL et RDS. Les métriques des deux intégrations sur l'instance `quicktestrds` sont unifiées à l'aide du tag `dbinstanceidentifier`.
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="dashboard rds aurora" popup="true">}}

### Collecte de logs

#### Activer le logging

Vous pouvez transmettre des logs MySQL, MariaDB et Postgres à Amazon CloudWatch. Suivez les instructions figurant dans l'article sur la [surveillance des logs Amazon Aurora MySQL, Amazon RDS pour MySQL et MariaDB avec Amazon CloudWatch][4] (en anglais) pour commencer à envoyer vos logs RDS à CloudWatch.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction AWS Lambda de collecte de logs avec Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le groupe de logs CloudWatch contenant vos logs RDS. Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (facultatif) et ajoutez le déclencheur.

Accédez ensuite à la [section Log de Datadog][6] pour explorer vos logs.

## Données collectées

Outre les [métriques recueillies depuis les moteurs de base de données][1], vous recevez également les métriques RDS suivantes :

### Métriques
{{< get-metrics-from-git "amazon_rds" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration Amazon RDS comprend des événements liés aux instances de base de données, aux groupes de sécurité, aux snapshots et aux groupes de paramètres. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="Événements Amazon RDS" >}}

### Checks de service

**aws.rds.read_replica_status**
Surveille le statut du [réplica en lecture][8]. Ce check renvoie l'un des statuts suivants :

- OK - En cours de réplication ou de connexion
- CRITICAL - Erreur ou terminé
- WARNING - Arrêté
- UNKNOWN - Autre

## Fonctionnalités de surveillance prêtes à l'emploi

L'intégration Amazon RDS propose des fonctionnalités de surveillance prêtes à l'emploi vous permettant de surveiller et d'optimiser vos performances.

- Dashboard Amazon RDS : bénéficiez d'une vue d'ensemble complète de vos instances RDS grâce à [ce dashboard prêt à l'emploi][9].
- Monitors recommandés : activez les [monitors Amazon RDS recommandés][10] pour détecter des problèmes de façon proactive et recevoir des alertes en temps opportun.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[2]: https://docs.datadoghq.com/fr/dashboards/
[3]: https://docs.datadoghq.com/fr/monitors/
[4]: https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch
[5]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds/amazon_rds_metadata.csv
[8]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring
[9]: https://app.datadoghq.com/dash/integration/62/aws-rds
[10]: https://app.datadoghq.com/monitors/recommended
[11]: https://docs.datadoghq.com/fr/help/