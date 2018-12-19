---
aliases:
  - /fr/integrations/ecs/
categories:
  - cloud
  - containers
  - aws
  - log collection
ddtype: crawler
description: >-
  Surveillez les statuts des conteneurs, suiver l'utilisation des ressources, et
  plus encore…
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ecs/'
git_integration_title: amazon_ecs
has_logo: true
integration_title: Amazon Elastic Container Service
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ecs
public_title: "Intégration Datadog-Amazon Elastic Container Service\_"
short_description: >-
  Surveilliez les statuts des conteneurs, suiver l'utilisation des ressources,
  et plus encore…
version: '1.0'
---
## Aperçu
Amazon EC2 Container Service (ECS) est un service de gestion de conteneur évolutif et très performant pour les conteneurs Docker qui s'exécutant dans des instances EC2.

## Implémentation

Cette page s'occupe de l'installation de Amazon Elastic Container Service avec [Datadog Agent v6](https://docs.datadoghq.com/agent/). Si vous souhaitez la configurer avec Datadog Agent v5, [reportez-vous à la page de documentation dédiée Amazon Elastic Container Service de l'Agent v5](https://docs.datadoghq.com/integrations/faq/agent-5-amazon-ecs).

### Installation
Pour surveiller vos conteneurs et tâches ECS avec Datadog, exécutez l'agent en tant que conteneur sur chaque instance EC2 de votre cluster ECS. Comme détaillé ci-dessous, il y a quelques étapes de configuration :

1. **Créez une tâche ECS**
2. **Créer ou modifier votre politique IAM** 
3. **Créez une nouvelle instance avec un User Script**

Cette documentation suppose que vous avez déjà configuré une grappe EC2 Container Service. Si non, consultez la section [Mise en route de la documentation ECS](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted.html).

#### Créer une tâche ECS

Cette tâche lance le conteneur Datadog. Lorsque vous devez modifier la configuration, mettez à jour cette définition de tâche comme décrit plus bas dans ce guide.

Vous pouvez configurez la tâche soi en utilisant les [outils CLI d'AWS](https://aws.amazon.com/cli/), soit en utilisant la console web d'Amazon.

##### AWS CLI

1. Téléchargez [datadog-agent-ecs.json](/json/datadog-agent-ecs.json).
1. Éditez datadog-agent-ecs.json en ajoutant la bonne [DD_API_KEY](https://app.datadoghq.com/account/settings#api) pour votre compte.
1. Exécutez la commande suivante :
```
Amazon Elastic Container Service register-task-definition --cli-input-json file://path/to/datadog-agent-ecs.json
```

##### Interface Web

1. Connectez-vous à votre console AWS et naviguez vers la section EC2 Container Service.
2. Cliquez sur le cluster dont vous souhaitez ajouter Datadog.
3. Cliquez sur **Task Definitions** sur le côté gauche et cliquez ensuite sur le bouton **Create new Task Definition**.
4. 
Entrez un **Task Definition Name**, tel que ```datadog-agent-task```.
5. Cliquez sur le bouton **Add volume**.
6. Pour **Name** rentrez ```docker_sock```. Pour **Source Path**, rentrez ```/var/run/docker.sock```. Cliquez sur **Add**.
7. Ajoutez un autre volume avec le nom ```proc``` and le source path ```/proc/```.
8. 
Ajoutez un autre volume avec le nom ```cgroup```  et le chemin source de ```/cgroup/```.
9. Cliquez sur le bouton **Add container**.
10. Pour **Container name** inscrivez ```datadog-agent```.
11. Pour **Image** inscrivez ```datadog/agent:latest```.
12. Pour **Maximum memory** inscrivez ```256```.
13. Faites défiler jusqu'à la section **Advanced container configuration** et inscrivez ```10``` dans le champ **CPU units**.
14. Pour **Env Variables**, ajoutez une **clé** qui consiste de ```DD_API_KEY``` et inscrivez votre clé d'API Datadog comme valeur. *Si vous êtes plus à l'aise avec le stockage de ces types de secrets dans s3, jetez un coup d'œil au [guide de configuration ECS](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3).*
15. Ajouter un variable d'environnement additionnel pour chaque tag que vous désirez ajouter en utilisant la clé ```DD_TAGS```.
16. Faites défiler jusqu'à la section **Storage and Logging**.
17. Dans **Mount points**, sélectionnez le volume de source **docker_sock** et inscrivez ```/var/run/docker.sock``` dans le chemin du conteneur. Cochez ensuite la case à cocher **Read only**.
18. Ajouter un point de montage additionnel pour **proc** et inscrivez ```/host/proc/``` dans le chemin du conteneur. Cochez la case à cocher **Read only**.
19. Ajoutez un troisième point de montage pour **cgroup** et inscrivez ```/host/sys/fs/cgroup``` dans le chemin de conteneur. Cochez la case à cocher **Read only**.

#### Créer ou modifier votre politique IAM

1. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon ECS:

  * `ecs:ListClusters`: Liste des grappes disponibles.
  * `ecs:ListContainerInstances`: Liste des instances d'un cluster.
  * `ecs:DescribeContainerInstances` : Décrire les instances afin d'ajouter des métriques sur les ressources et les tâches en cours d’exécution. Ajoute un tag de cluster aux instances ec2.

  Pour plus d'information sur les polices ECS, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html).


2. En utilisant le console Identity and Access Management (IAM), créez un nouveau rôle nommé ```datadog-agent-ecs```.
3. Sélectionnez **Amazon EC2 Role for EC2 Container Service**. Dans l'écran suivant, ne cochez aucune case, et ensuite cliquez **Next Step**.
4. Cliquez **Create Role**.
5. Cliquez sur le nouveau rôle.
6. Développez la section **Inline Policies**. Cliquez sur le lien afin de créer une nouvelle règle en ligne.
7. Choisissez **Custom Policy** et cliquez sur le bouton.
8. Pour **Policy Name** inscrivez ```datadog-agent-policy```. Copiez le texte suivant dans le **Policy Document** :

  ```json
   {
     "Version": "2012-10-17",
     "Statement": [
         {
             "Effect": "Allow",
             "Action": [
                 "ecs:RegisterContainerInstance",
                 "ecs:DeregisterContainerInstance",
                 "ecs:DiscoverPollEndpoint",
                 "ecs:Submit*",
                 "ecs:Poll",
                 "ecs:StartTask",
                 "ecs:StartTelemetrySession"
             ],
             "Resource": [
                 "*"
             ]
         }
     ]
   }
  ```

9. Cliquez **Create Policy**

#### **Créez une nouvelle instance avec un script de démarrage**

Idéalement, vous voulez que l'agent Datadog se charge sur un conteneur dans chaque instance EC2. Le moyen le plus simple d'y parvenir est d'avoir un script de démarrage sur chaque instance utilisée. Malheureusement, il n'y a aucun moyen d'ajouter un script à une instance existante. Vous devez donc créer une nouvelle instance et l'ajouter à votre cluster ECS.

##### Créez une nouvelle instance d'Amazon Linux

1. Connectez-vous à votre console AWS et naviguez vers la section EC2.
2. **Créez une nouvelle instance en cliquant sur le bouton **Launch Instance**.
3. Cliquez sur Community AMIs. Naviguer vers [ce page afin d'accéder à une liste courante des instances optimisés pour ECS](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html). Sélectionnez une AMI appropriée pour votre région et copiez l'ID dans le champ de recherche. Choisissez l'AMI qui apparaît à la suite de la recherche.
4. Suivez les invites comme vous le feriez normalement lors de la configuration d'une instance.
5. Dans la troisième boîte de dialogue, sélectionnez le rôle IAM que vous avez créé ci-dessus.
6. Développez la section Advanced Details et copiez le script suivant dans la section User Data. Changez « cluster name » en votre nom du cluster et « task definition » en le nom que vous avez donné à votre définition de tâche.

```bash
 #!/bin/bash
mset -o pipefail

cluster="MY_CLUSTER" # Enter your cluster name here

task_def="datadog-agent-task"
touch /etc/ecs/ecs.config || {
    echo "Error: it seems like we are not running on an ECS-optimized instance" >&2
    exit 2
}
set -ex
echo ECS_CLUSTER=$cluster >> /etc/ecs/ecs.config
start ecs
yum install -y aws-cli jq
instance_arn=$( curl -f http://localhost:51678/v1/metadata | jq -re .ContainerInstanceArn | awk -F/ '{print $NF}')
az=$(curl -f http://169.254.169.254/latest/meta-data/placement/availability-zone)
region=${az:0:${#az} - 1}
echo "cluster=$cluster az=$az region=$region Amazon Elastic Container Service start-task --cluster \
$cluster --task-definition $task_def --container-instances $instance_arn --region $region" >> /etc/rc.local
```

Le script d'utilisateur ci-dessus va :
  * Démarrez la tâche définie avec les bons paramètres
  * Ajoutez quelques lignes dans `/etc/rc.local` pour que l'instance, une fois redémarrée, démarre la tâche.

#### Détection dynamique et la surveillance des services actifs

<a href="https://docs.datadoghq.com/agent/autodiscovery/">L'autodiscovery</a> de Datadog peut agir avec ECS et Docker afin de découvrir et surveiller automatiquement des tâches actives dans votre environnement.

#### Collecte de log

Les logs ECS sont l'ancien conteneur Docker. Ils ne sont pas directement liés au service ECS, mais ils correspondent aux logs écrits par l'application en cours d'exécution (dans vos conteneurs Docker).
Collectez les logs ECS directement à partir des conteneurs grâce à notre intégration [Agent 6 Docker](https://docs.datadoghq.com/logs/docker/). Vous pouvez également [rediriger ces logs vers Cloudwatch](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html#w2ab1c21c21c13) et demander à [Datadog Lambda de les envoyer à votre plateforme Datadog](/integrations/amazon_web_services/#create-a-new-lambda-function).


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ecs" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration Amazon Elastic Container Service récupère les évènements suivants :

* Drain
* Error
* Fail
* Mémoire insuffisante
* Pending
* Reboot
* Terminate

### Checks de Service
{{< get-service-checks-from-git "amazon_ecs" >}}


## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)