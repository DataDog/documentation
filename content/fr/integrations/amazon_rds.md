---
aliases:
  - /integrations/awsrds/
  - /integrations/rds/
  - /integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez un ensemble de métriques relatives à Amazon\_RDS."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_rds/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/'
    tag: Blog
    text: Surveiller les métriques de performance MySQL sur RDS
  - link: 'https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/'
    tag: Blog
    text: "Métriques clés pour la surveillance PostgreSQL sur AWS\_RDS"
  - link: 'https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/'
    tag: Blog
    text: "Surveiller les métriques de performance d'Amazon\_Aurora"
git_integration_title: amazon_rds
has_logo: true
integration_title: "Amazon\_RDS"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_rds
public_title: "Intégration Datadog/Amazon\_RDS"
short_description: "Surveillez un ensemble de métriques relatives à Amazon\_RDS."
version: '1.0'
---
{{< img src="integrations/awsrds/rdsdashboard.png" alt="Dashboard RDS" responsive="true" popup="true">}}

## Présentation

Amazon Relational Database Service (RDS) est un service Web qui facilite la configuration, l'exploitation et la mise à l'échelle d'une base de données relationnelle dans le cloud. Activez cette intégration pour visualiser toutes vos métriques RDS dans Datadog.

Il existe trois options pour surveiller les instances RDS. Choisissez d'utiliser la surveillance standard ou améliorée, puis activez ou non l'intégration de la base de données native (facultatif).

* **Intégration RDS standard** : pour installer l'intégration standard, sélectionnez RDS sur le côté gauche du carré d'intégration AWS. Vous pourrez ainsi recevoir des métriques relatives à votre instance aussi souvent que votre intégration CloudWatch le permet. Tous les types de moteurs RDS sont pris en charge.

* **Intégration RDS améliorée** : l'intégration améliorée nécessite une configuration supplémentaire et est seulement disponible pour les moteurs MySQL, Aurora, PostgreSQL et MariaDB. Des métriques supplémentaires sont disponibles, mais vous devez disposer d'un AWS Lambda pour envoyer les métriques vers Datadog. Une granularité plus élevée et des services requis complémentaires peuvent engendrer une hausse des frais AWS.

* **RDS + intégration de la base de données native** : l'intégration de la base de données native est facultative et disponible pour les types de moteurs MySQL, Aurora, MariaDB, SQL Server et PostgreSQL. Pour faire correspondre les métriques de RDS et celles de l'intégration native, utilisez le tag `dbinstanceidentifier` de l'intégration native basée sur l'identificateur que vous attribuez à l'instance RDS. Le tag est automatiquement attribué aux instances RDS.

## Implémentation
### Installation

#### Intégration RDS standard

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

#### Intégration RDS améliorée

Activez la surveillance améliorée de votre instance RDS. Vous pouvez activer cette option lors de la création de l'instance ou ultérieurement, en sélectionnant **Modify** dans **Instance Actions**. Nous vous conseillons de choisir une granularité de surveillance de 15 secondes.

{{< img src="integrations/awsrds/rds-enhanced-install.png" alt="Installation RDS amélioré" responsive="true">}}

##### Créer votre clé KMS

1. Ouvrez la page d'accueil de KMS à l'adresse https://console.aws.amazon.com/kms/home.
2. Accédez à **Customer managed keys**.
2. Sélectionnez **Create Key**.
3. Saisissez un alias pour la clé, par exemple `lambda-datadog-key`. *Remarque : un alias ne peut pas commencer par « aws ». Les alias commençant par « aws » sont réservés par Amazon Web Services et représentent les clés CMK gérées par AWS dans votre compte.*
4. Ajoutez les administrateurs appropriés afin de déterminer les personnes pouvant gérer cette clé.
5. Vous n'avez pas besoin d'ajouter le moindre rôle.
6. Enregistrez votre clé KMS.

##### Créer votre fonction Lambda

7. Depuis la console de gestion Lambda, créez une fonction Lambda. **Votre fonction Lambda doit se trouver dans la même région que celle de la clé KMS que vous avez créée.**
8. Choisissez `Serverless Application Repository`, recherchez `Datadog-RDS-Enhanced` et sélectionnez cette option.
9. Saisissez un nom unique pour l'application.
10. Collez l'identifiant de la clé créée dans le paramètre `KMSKeyId` de la section précédente et effectuez le déploiement.
11. Une fois l'application déployée, ouvrez la fonction Lambda créée (cliquez sur la fonction dans « Resource »).
 {{< img src="integrations/awsrds/click-function.png" alt="Fonction Lambda ouverte" responsive="true">}}
12. Faites défiler vers le bas jusqu'à la section `Environment variables`. Remplacez `<VOTRE_CLÉ_API>` par votre [clé d'API Datadog][2] au format `{"api_key":"<VOTRE_CLÉ_API>"}` :
{{< img src="integrations/awsrds/env-variables.png" alt="Variables d'environnement" responsive="true">}}
13. Ouvrez la section `Encryption configuration` et sélectionnez `Enable helpers for encryption in transit`.
14. Dans `KMS key to encrypt in transit`, sélectionnez la même clé que celle qui figure sous `KMS key to encrypt at rest`.
15. Appuyez sur le bouton Encrypt en regard de l'objet blob JSON que vous venez de saisir.
16. Défilez vers le haut et cliquez sur Save.
17. Créez un nouveau déclencheur en définissant le groupe de logs Cloudwatch `RDSOSMetrics` en tant que source.
18. Nommez le filtre et indiquez une expression de filtre facultative, puis cliquez sur Save.

---

Lorsque vous cliquez sur le bouton de test de votre fonction Lambda, il se peut que cette erreur s'affiche :

```json
{
  "stackTrace": [ [ "/var/task/lambda_function.py", 
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

#### Intégration de base de données native

1. Accédez à la console AWS et ouvrez la section RDS pour trouver l'instance que vous souhaitez surveiller.
  {{< img src="integrations/awsrds/rds-console.png" alt="Console RDS" responsive="true">}}
2. Relevez l'URL de l'endpoint (par ex., **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**) qui est utilisée pour configurer l'Agent. Notez également le paramètre `DB Instance identifier` (p. ex., **mysqlrds**) qui est utilisé pour créer des graphiques et des dashboards.

### Configuration

#### Intégration RDS standard ou améliorée

1. Dans le [carré d'intégration AWS][3], assurez-vous que l'option `RDS` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][4] afin de recueillir des métriques Amazon RDS. Pour en savoir plus sur les stratégies RDS, consultez [la documentation du site Web d'AWS][5].

| Autorisation AWS            | Description                          |
|---------------------------|--------------------------------------|
| `rds:DescribeDBInstances` | Décrit les instances RDS auxquelles ajouter des tags.  |
| `rds:ListTagsForResource` | Ajoute des tags personnalisés sur les instances RDS.    |
| `rds:DescribeEvents`      | Ajoute des événements associés aux bases de données RDS. |

3. Installez l'[intégration Datadog/AWS RDS][6].

#### Intégration de base de données native
Configurez un Agent et connectez-vous à votre instance RDS en modifiant le fichier YAML approprié dans votre répertoire conf.d, puis redémarrez votre Agent : 

Pour RDS Aurora, modifiez le fichier YAML de la base de données que vous utilisez.

Si vous utilisez MySQL ou MariaDB, modifiez `mysql.yaml` :

```yaml
init_config:

instances:
  - server: mysqlrds.blah.us-east1-rds.amazonaws.com # L'URL d'endpoint de la console AWS
    user: <NOMUTILISATEUR>
    pass: <MOTDEPASSE>
    port: 3306
    tags:
      - dbinstanceidentifier:<NOM_INSTANCE>
```

Si vous utilisez PostgreSQL, modifiez `postgres.yaml` :

```yaml
init_config:

instances:
  - host: mysqlrds.blah.us-east1-rds.amazonaws.com
    port: 5432
    username: <NOMUTILISATEUR>
    password: <MOTDEPASSE>
    dbname: <NOM_BDD>
    tags:
      - dbinstanceidentifier:<NOM_INSTANCE_BDD>
```

Si vous utilisez Microsoft SQL Server, modifiez `sqlserver.yaml` :

```yaml
init_config:

instances:
  - host: mysqlrds.blah.us-east1-rds.amazonaws.com,1433
    username: <NOMUTILISATEUR>
    password: <MOTDEPASSE>
    tags:
      - dbinstanceidentifier:<NOM_INSTANCE_BDD>
```

### Validation

Pour confirmer le bon fonctionnement de l'intégration de base de données native, exécutez `sudo /etc/init.d/datadog-agent info`. Vous devriez voir un message similaire à ce qui suit :

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

### Utilisation

Après quelques minutes, les métriques RDS et les [métriques de MySQL, Aurora, MariaDB, SQL Server ou PostgreSQL][7] peuvent être consultées dans Datadog depuis le Metrics Explorer, les [graphiques][8] et les [alertes][9].
Voici un exemple de dashboard Aurora affichant un certain nombre de métriques issues des intégrations MySQL et RDS. Les métriques des deux intégrations sur l'instance `quicktestrds` sont unifiées à l'aide du tag `dbinstanceidentifier`.
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="dashboard rds aurora" responsive="true" popup="true">}}

Voici le dashboard par défaut pour MySQL sur Amazon RDS :
{{< img src="integrations/awsrds/rds-mysql.png" alt="dashboard par défaut RDS MySQL" responsive="true" popup="true">}}

Pour savoir comment surveiller les métriques de performance MySQL d'Amazon RDS, consultez [notre série d'articles à ce sujet][10]. Vous y trouverez des informations supplémentaires sur les principales métriques de performance ainsi que des conseils pour les recueillir et pour utiliser Datadog afin de surveiller MySQL sur Amazon RDS.

### Collecte de logs
#### Activer la journalisation RDS

Vous pouvez transmettre des logs MySQL, MariaDB et Postgres à Amazon CloudWatch. Suivez les instructions figurant [ici][11] pour commencer à envoyer vos logs RDS à CloudWatch. 

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][12].
2. Une fois la fonction lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le groupe de logs CloudWatch qui contient vos logs RDS :
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" responsive="true" popup="true" style="width:70%;">}}
   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur :
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Déclencheur cloudwatch" responsive="true" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][13] pour commencer à explorer vos logs !

## Données collectées
Outre les [métriques recueillies depuis les moteurs de base de données][14], vous recevez également les métriques RDS suivantes :

### Métriques
{{< get-metrics-from-git "amazon_rds" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS RDS comprend des événements liés aux instances de base de données, aux groupes de sécurité, aux snapshots et aux groupes de paramètres. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="Événements AWS RDS" responsive="true">}}

### Checks de service
**aws.rds.read_replica_status**
Surveille le statut du [réplica en lecture][16]. Ce check renvoie l'un des statuts suivants :

* OK - En cours de réplication ou de connexion
* CRITICAL - Erreur ou terminé
* WARNING - Arrêté
* UNKNOWN - Autre

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][17].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_rds.html
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_rds
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[8]: https://docs.datadoghq.com/fr/graphing
[9]: https://docs.datadoghq.com/fr/monitors
[10]: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics
[11]: https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch
[12]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[13]: https://app.datadoghq.com/logs
[14]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[15]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds/amazon_rds_metadata.csv
[16]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring
[17]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}