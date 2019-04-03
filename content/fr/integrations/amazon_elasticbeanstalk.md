---
aliases:
  - /fr/integrations/awsbeanstalk/
categories:
  - cloud
  - configuration & deployment
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon Elastic\_Beanstalk."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/'
git_integration_title: amazon_elasticbeanstalk
has_logo: true
integration_title: "Elastic\_Beanstalk"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_elasticbeanstalk
public_title: Intégration Datadog/Elastic Beanstalk
short_description: "Surveillez des métriques clés d'Amazon Elastic\_Beanstalk."
version: '1.0'
---
## Présentation

AWS Elastic Beanstalk est un service simple à utiliser servant à déployer et mettre à l'échelle des applications et services Web développés avec Java, .NET, PHP, Node.js, Python, Ruby, Go et Docker sur des serveurs familiers, tels qu'Apache, Nginx, Passenger et IIS.

## Implémentation
### Installation

Si besoin, configurez d'abord [l'intégration Amazon Web Services][1].

Pour recevoir les métriques d'Elastic Beanstalk, vous devez [activer la fonctionnalité Création de rapports d'intégrité améliorée][2] pour votre environnement et configurer votre environnement afin qu'il [publie des métriques d'intégrité améliorée sur CloudWatch][3].

**Remarque** : ces paramètres augmentent les frais relatifs à vos métriques custom CloudWatch.

### Configuration de l'Agent de conteneur Datadog
Si vous utilisez des conteneurs Docker dans votre environnement Elastic Beanstalk, utilisez l'Agent conteneurisé Datadog pour surveiller l'utilisation de Docker. Suivez les étapes ci-dessous pour configurer votre environnement et intégrer le conteneur de l'Agent Datadog.

#### Définition de tâche
Pour exécuter des environnements Docker avec plusieurs conteneurs par instance, Elastic Beanstalk utilise le service de conteneurs Amazon EC2 (ECS).
Vous devez donc décrire le conteneur que vous souhaitez déployer avec ECS. Dans Elastic Beanstalk, cette configuration s'effectue à l'aide du fichier `Dockerrun.aws.json`.

Un fichier `Dockerrun.aws.json` est un fichier JSON propre à Elastic Beanstalk qui décrit comment déployer un ensemble de conteneurs Docker sous la forme d'une application Elastic Beanstalk. Vous pouvez utiliser ce fichier pour un environnement Docker multiconteneurs.

`Dockerrun.aws.json` décrit les conteneurs à déployer sur chaque instance de conteneur dans l'environnement et les volumes de données à créer sur l'instance du host, qui seront montés par les conteneurs.

Un fichier `Dockerrun.aws.json` peut être utilisé de façon autonome ou compressé avec du code source supplémentaire dans une archive unique. Le code source archivé dans `Dockerrun.aws.json` est déployé dans les instances de conteneur et accessible dans le répertoire `/var/app/current/`. Utilisez la section `volumes` de la configuration pour fournir des points de montage aux conteneurs s'exécutant sur l'instance. Utilisez la section `mountPoints` des définitions de conteneurs intégrés pour les monter depuis les conteneurs.

L'exemple de code suivant présente un `Dockerrun.aws.json` déclarant l'Agent Datadog. Mettez à jour la section `containerDefinitions` en ajoutant votre [clé d'API Datadog][11], vos tags et toutes les définitions de conteneurs supplémentaires. Si besoin, ce fichier peut être compressé avec du contenu supplémentaire, comme décrit ci-dessus. Pour obtenir plus d'informations sur la syntaxe de ce fichier, consultez la [documentation Beanstalk][4].

```json
{
  "AWSEBDockerrunVersion": 2,
  "volumes": [
    {
       "name": "docker_sock",
       "host": {
            "sourcePath": "/var/run/docker.sock"
      }
    },
    {
       "name": "proc",
       "host": {
            "sourcePath": "/proc/"
      }
    },
    {
       "name": "cgroup",
       "host": {
            "sourcePath": "/cgroup/"
      }
    }
  ],
  "containerDefinitions": [
    {
      "name": "dd-agent",
      "image": "datadog/agent:latest",
      "environment": [
            {
              "name": "DD_API_KEY",
              "value": "<VOTRE_CLÉ_API_DD>"
            },
            {
              "name": "TAGS",
              "value": "<TAG_SIMPLE>, <TAG_KEY:VALUE>"
            }
      ],
      "memory": 256,
      "mountPoints": [
        {
          "sourceVolume": "docker_sock",
          "containerPath": "/var/run/docker.sock",
          "readOnly": false
        },
        {
          "sourceVolume": "proc",
          "containerPath": "/host/proc",
          "readOnly": true
        },
        {
          "sourceVolume": "cgroup",
          "containerPath": "/host/sys/fs/cgroup",
          "readOnly": true
        }
      ]
    }
  ]
}
```

#### Création de l'environnement

Une fois la définition du conteneur prête, envoyez-la à Elastic Beanstalk. Pour obtenir des instructions spécifiques, consultez les [environnements Docker multiconteneurs][5] dans la documentation AWS Elastic Beanstalk.

### Configuration alternative de l'Agent Datadog
Suivez ces étapes pour installer l'Agent Datadog dans Elastic Beanstalk à l'aide de [la personnalisation d'environnement avancée avec fichiers de configuration (.ebextensions)][8].

1. Créez un dossier intitulé `.ebextensions` dans la racine de votre [groupe source d'application][12].
2. Téléchargez [99datadog.config][10] et placez-le dans `.ebextensions`.
3. Dans `option_settings`, mettez à jour la configuration avec votre [clé d'API Datadog][11].
4. Déployez votre application avec la [console Elastic Beanstalk][13], [l'interface de ligne de commande EB][14] ou [l'interface de ligne de commande AWS][15].

#### Paramètres supplémentaires
Ajoutez des paramètres supplémentaires à `datadog.yaml` en mettant à jour la section `"/configure_datadog_yaml.sh"` de [99datadog.config][10]. La ligne ci-dessous active l'Agent de processus Datadog.

```
echo -e "process_config:\n  enabled: \"true\"\n" >> /etc/datadog-agent/datadog.yaml
```

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_elasticbeanstalk" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Elastic Beanstalk n'inclut aucun événement.

### Checks de service
L'intégration AWS Elastic Beanstalk n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin
- Article de blog : [Déployer Datadog sur AWS Elastic Beanstalk][9] (en anglais)

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced-cloudwatch.html#health-enhanced-cloudwatch-console
[4]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticbeanstalk/amazon_elasticbeanstalk_metadata.csv
[7]: https://docs.datadoghq.com/fr/help/
[8]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[9]: https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk/
[10]: https://docs.datadoghq.com/fr/config/99datadog.config
[11]: https://app.datadoghq.com/account/settings#api
[12]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[13]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[14]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli-ebextensions
[15]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli-ebextensions


{{< get-dependencies >}}