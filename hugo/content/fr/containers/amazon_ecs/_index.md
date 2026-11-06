---
algolia:
  tags:
  - ecs
aliases:
- /fr/agent/amazon_ecs/
description: Installez et configurez le Datadog Agent sur Amazon Elastic Container
  Service
further_reading:
- link: https://www.datadoghq.com/blog/ecs-managed-instances
  tag: Blog
  text: Surveillez les instances gérées ECS avec Datadog
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentation
  text: Recueillir des métriques ECS
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Ajout de la prise en charge d'Amazon ECS Anywhere
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Analysez vos dépenses liées à Kubernetes et ECS avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Détectez et corrigez les problèmes ECS plus rapidement avec les monitors par
    défaut et ECS Explorer.
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Centre d'architecture
  text: Utilisation de Datadog avec ECS Fargate
title: Amazon ECS
---
## Présentation {#overview}

Amazon ECS est un service d'orchestration de conteneurs évolutif et hautes performances qui prend en charge les conteneurs Docker. Avec le Datadog Agent, vous pouvez surveiller les conteneurs et les tâches ECS sur chaque instance EC2 de votre cluster.

Pour configurer Amazon ECS avec Datadog, utilisez soit **Fleet Automation**, soit **installer manuellement**. Si vous préférez installer manuellement, exécutez un conteneur du Datadog Agent par host Amazon EC2 en créant une définition de tâche pour le Datadog Agent et en le déployant en tant que service démon. Chaque Agent surveille ensuite les autres conteneurs sur son host. Consultez la section [Installation manuelle](#install-manually) pour plus de détails.


## Configuration de Fleet Automation {#fleet-automation-setup}
Suivez le [guide d'installation intégré dans Fleet Automation][32] pour terminer la configuration sur ECS. Après avoir terminé les étapes décrites dans le guide intégré, [Fleet Automation][33] génère une définition de tâche ou un modèle CloudFormation prêt à l'emploi, avec votre clé d'API pré-injectée.

{{< img src="agent/basic_agent_usage/ecs_install_page.png" alt="Étapes d'installation intégrées pour le Datadog Agent sur ECS." style="width:90%;">}}

<div class="alert alert-info">
Si vous souhaitez surveiller <strong>ECS sur Fargate</strong>, consultez <a href="/integrations/ecs_fargate/">Amazon ECS sur AWS Fargate</a>.
</div>

<br>

## Configuration manuelle {#manual-setup}

Pour surveiller vos conteneurs et tâches ECS, déployez le Datadog Agent en tant que conteneur **une fois sur chaque instance EC2** de votre cluster ECS. Vous pouvez le faire en créant une définition de tâche pour le conteneur du Datadog Agent et en le déployant en tant que service démon. Chaque conteneur du Datadog Agent surveille ensuite les autres conteneurs sur son instance EC2 respective.

Les instructions suivantes supposent que vous avez configuré un cluster EC2. Consultez la [documentation Amazon ECS pour la création d'un cluster][4].

1. [Créer et ajouter une définition de tâche ECS][27]
2. [Planifiez le Datadog Agent en tant que service démon][28]
3. (Facultatif) [Configurer des fonctionnalités supplémentaires du Datadog Agent][29]

**Remarque :** L'[Autodiscovery][5] de Datadog peut être utilisé conjointement avec ECS et Docker pour découvrir et surveiller automatiquement les tâches en cours d'exécution dans votre environnement.

{{% site-region region="gov,gov2" %}}
## Conformité FIPS {#fips-compliance}

Certaines étapes de configuration sont différentes pour la conformité FIPS. Veuillez prendre en compte les instructions de configuration spécifiques dans la documentation sur la [Conformité FIPS][32].

[32]: /fr/agent/configuration/fips-compliance/
{{% /site-region %}}

### Créer une définition de tâche ECS {#create-an-ecs-task-definition}

Cette [définition de tâche ECS][30] lance le conteneur du Datadog Agent avec les configurations nécessaires. Lorsque vous devez modifier la configuration de l'Agent, mettez à jour cette définition de tâche et redéployez le service démon. Vous pouvez configurer cette définition de tâche en utilisant la console de gestion AWS ou avec l'[AWS CLI][9].

L'exemple suivant est une configuration minimale pour la surveillance de l'infrastructure de base. Cependant, des exemples supplémentaires de définition de tâche avec diverses fonctionnalités activées sont fournis dans la section [Configurer des fonctionnalités supplémentaires de l'Agent](#setup-additional-agent-features) si vous souhaitez les utiliser à la place.

#### Créer et gérer le fichier de définition de tâche {#create-and-manage-the-task-definition-file}

1. Pour les conteneurs Linux, téléchargez [datadog-agent-ecs.json][20].
    - Si vous utilisez Amazon Linux 1 (AL1, anciennement Amazon Linux AMI), utilisez [datadog-agent-ecs1.json][21]
    - Si vous utilisez Windows, utilisez [datadog-agent-ecs-win.json][22]

   <div class="alert alert-info">
   Ces fichiers fournissent une configuration minimale pour la surveillance de l'infrastructure de base. Pour plus d'exemples de fichiers de définition de tâche avec diverses fonctionnalités activées, consultez la section <a href="#set-up-additional-agent-features">Configurer des fonctionnalités supplémentaires de l'Agent</a> sur cette page.
   </div>
2. Modifiez votre fichier de définition de tâche de base
    - Définissez la variable d'environnement `DD_API_KEY` en remplaçant `<YOUR_DATADOG_API_KEY>` par la [clé d'API Datadog][14] de votre compte. Alternativement, vous pouvez également [fournir l'ARN d'un secret stocké dans AWS Secrets Manager][16].
    - Définissez la variable d'environnement `DD_SITE` sur votre [site Datadog][13]. Votre site est : {{< region-param key="dd_site" code="true" >}}

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - Optionally, add a `DD_TAGS` environment variable to specify any additional tags.

3. (Facultatif) Pour déployer sur un [cluster ECS Anywhere][15], ajoutez la ligne suivante à votre définition de tâche ECS :
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (Facultatif) Pour ajouter un check de l'état de santé de l'Agent, ajoutez la ligne suivante à votre définition de tâche ECS :
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### Enregistrez la définition de tâche {#register-the-task-definition}

{{< tabs >}}
{{% tab "AWS CLI" %}}
Une fois votre fichier de définition de tâche créé, exécutez la commande suivante pour enregistrer le fichier dans AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Interface utilisateur Web" %}}
Une fois que vous disposez de votre fichier de définition de tâche, utilisez la console AWS pour enregistrer le fichier.
1. Connectez-vous à votre console AWS et accédez à la section Elastic Container Service.
2. Sélectionnez {{< ui >}}Task Definitions{{< /ui >}} dans le volet de navigation. Dans le menu {{< ui >}}Create new task definition{{< /ui >}}, sélectionnez {{< ui >}}Create new task definition with JSON{{< /ui >}}.
3. Dans la zone de l'éditeur JSON, collez le contenu de votre fichier de définition de tâche.
4. Sélectionnez {{< ui >}}Create{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}


### Exécutez l'Agent en tant que service démon {#run-the-agent-as-a-daemon-service}

Pour qu'un conteneur de Datadog Agent s'exécute sur chaque instance EC2, exécutez la définition de tâche du Datadog Agent en tant que [service daemon][10].

#### Planifiez un service démon dans AWS en utilisant la tâche ECS de Datadog {#schedule-a-daemon-service-in-aws-using-datadogs-ecs-task}

{{< tabs >}}
{{% tab "AWS CLI" %}}
Utilisez l'interface de ligne de commande AWS pour créer un service démon à partir de la définition de tâche enregistrée lors des étapes précédentes :

```bash
aws ecs create-service \
    --cluster <CLUSTER_NAME> \
    --service-name datadog-agent \
    --task-definition <TASK_FAMILY> \
    --scheduling-strategy DAEMON \
    --launch-type EC2 \
    --region <AWS_REGION>
```
{{% /tab %}}
{{% tab "Interface utilisateur Web" %}}
1. Connectez-vous à la console AWS et accédez à la section ECS. Sur la page {{< ui >}}Clusters{{< /ui >}}, choisissez le cluster sur lequel vous exécutez l'Agent.
2. Sur l'onglet {{< ui >}}Services{{< /ui >}} de votre cluster, sélectionnez {{< ui >}}Create{{< /ui >}}.
3. Pour {{< ui >}}Service name{{< /ui >}}, saisissez `datadog-agent`.
4. Sous {{< ui >}}Deployment configuration{{< /ui >}}, pour {{< ui >}}Service type{{< /ui >}}, sélectionnez {{< ui >}}Daemon{{< /ui >}}.
5. Vous n'avez pas besoin de configurer l'équilibrage de charge ou la mise à l'échelle automatique.
6. Cliquez sur {{< ui >}}Next Step{{< /ui >}}, puis sur {{< ui >}}Create Service{{< /ui >}}.
{{% /tab %}}
{{< /tabs >}}

### Configurez des fonctionnalités supplémentaires de l'Agent {#set-up-additional-agent-features}

Les fichiers de définition de tâche fournis dans la section précédente sont minimaux. Ces fichiers déploient un conteneur d'Agent avec une configuration de base pour collecter des métriques principales sur les conteneurs de votre cluster ECS. L'Agent peut également exécuter des intégrations d'Agent [basées sur des étiquettes Docker][12] découvertes sur vos conteneurs.

Fonctionnalités supplémentaires :

#### APM {#apm}
Consultez la [documentation de configuration d'APM][6] et l'exemple [datadog-agent-ecs-apm-uds.json][23].

#### Log Management {#log-management}
Consultez la [documentation relative à la collecte de logs][7] et le fichier d'exemple [datadog-agent-ecs-logs.json][24].

#### DogStatsD {#dogstatsd}

Si vous utilisez [DogStatsD][8], modifiez la définition de conteneur de votre Datadog Agent pour ajouter le mappage de port de host pour 8125/udp et définissez la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` :

{{< highlight json "hl_lines=6-12 23-24" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "portMappings": [
     {
      "hostPort": 8125,
      "protocol": "udp",
      "containerPort": 8125
     }
   ],
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

Cette configuration permet au trafic DogStatsD d'être acheminé depuis les conteneurs d'application, via le host et le port du host, vers le conteneur du Datadog Agent. Cependant, le conteneur d'application doit utiliser l'adresse IP privée du host pour ce trafic. Vous pouvez activer cela en définissant la variable d'environnement `DD_AGENT_HOST` sur l'adresse IP privée de l'instance EC2, que vous pouvez récupérer depuis le service de métadonnées d'instance (IMDS). Alternativement, vous pouvez définir cela dans le code lors de l'initialisation. L'implémentation pour DogStatsD est la même que pour APM. Consultez [Configurer l'endpoint de l'Agent de trace][17] pour des exemples de configuration de l'endpoint de l'Agent.

Assurez-vous que les paramètres des groupes de sécurité sur vos instances EC2 n'exposent pas publiquement les ports pour APM et DogStatsD.

#### Collecte de processus {#process-collection}

Pour collecter des informations sur les processus en direct pour tous vos conteneurs et les envoyer à Datadog, mettez à jour votre définition de tâche avec la variable d'environnement `DD_PROCESS_AGENT_ENABLED` :

{{< highlight json "hl_lines=16-17" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_PROCESS_AGENT_ENABLED",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

#### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
Cette fonctionnalité est uniquement disponible pour Linux.
</div>

Consultez le fichier d'exemple [datadog-agent-sysprobe-ecs.json][25].

Si vous utilisez Amazon Linux 1 (AL1, anciennement Amazon Linux AMI), consultez [datadog-agent-sysprobe-ecs1.json][26].

Si vous disposez déjà d'une définition de tâche, modifiez votre fichier de façon à inclure la configuration suivante :

 ```json
 {
   "containerDefinitions": [
     (...)
       "mountPoints": [
         (...)
         {
           "containerPath": "/sys/kernel/debug",
           "sourceVolume": "debug"
         },
         (...)
       ],
       "environment": [
         (...)
         {
           "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
           "value": "true"
         }
       ],
       "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      },
   ],
   "requiresCompatibilities": [
    "EC2"
   ],
   "volumes": [
     (...)
     {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "debug"
     },
     (...)
   ],
   "family": "datadog-agent-task"
 }
 ```
#### Network Path {#network-path}

1. Pour activer [Network Path][31] sur vos clusters ECS, activez le module `system-probe` traceroute en ajoutant la variable d'environnement suivante dans votre fichier `datadog-agent-sysprobe-ecs.json` :

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. Pour surveiller des chemins individuels, suivez les instructions ici pour [configurer des fonctionnalités supplémentaires de l'Agent](#set-up-additional-agent-features) :

   Ces fichiers déploient un conteneur d'Agent avec une configuration de base pour collecter des métriques principales sur les conteneurs de votre cluster ECS. L'Agent peut également exécuter des intégrations d'Agent basées sur les étiquettes Docker découvertes sur vos conteneurs.

3. Pour surveiller les chemins du trafic réseau et permettre à l'Agent de découvrir et de surveiller automatiquement les chemins réseau en fonction du trafic réseau réel, sans avoir à spécifier manuellement les endpoints, ajoutez les variables d'environnement supplémentaires suivantes à votre `datadog-agent-sysprobe-ecs.json` :

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_CONNECTIONS_MONITORING_ENABLED",
          "value": "true"
        }
      ],
   ```

4. Optionnellement, pour configurer le nombre de workers (la valeur par défaut est 4), ajustez la variable d'environnement suivante dans votre fichier `datadog-agent-sysprobe-ecs.json` :

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_COLLECTOR_WORKERS",
          "value": "10"
        }
      ],
   ```
## Mode AWSVPC {#awsvpc-mode}

Pour l'Agent v6.10+, le mode `awsvpc` est pris en charge pour les conteneurs applicatifs, à condition que les groupes de sécurité soient configurés pour permettre au groupe de sécurité de l'instance de host d'atteindre les conteneurs applicatifs sur les ports concernés.

Vous pouvez exécuter l'Agent en mode `awsvpc`, mais Datadog ne le recommande pas car il peut être difficile de récupérer l'adresse IP de l'ENI pour atteindre l'Agent pour les métriques DogStatsD et les traces APM. Exécutez plutôt l'Agent en mode Pont, avec le mappage des ports, afin de faciliter la récupération de l'[IP du host via le serveur de métadonnées][6].

## Dépannage {#troubleshooting}

Besoin d'aide ? Contactez le [support Datadog][11].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
[5]: https://docs.datadoghq.com/fr/agent/autodiscovery/
[6]: /fr/containers/amazon_ecs/apm/
[7]: /fr/containers/amazon_ecs/logs/
[8]: /fr/extend/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/fr/help/
[12]: https://docs.datadoghq.com/fr/containers/docker/integrations/?tab=docker
[13]: /fr/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /fr/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /fr/resources/json/datadog-agent-ecs.json
[21]: /fr/resources/json/datadog-agent-ecs1.json
[22]: /fr/resources/json/datadog-agent-ecs-win.json
[23]: /fr/resources/json/datadog-agent-ecs-apm.json
[24]: /fr/resources/json/datadog-agent-ecs-logs.json
[25]: /fr/resources/json/datadog-agent-sysprobe-ecs.json
[26]: /fr/resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /fr/network_monitoring/network_path
[32]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
[33]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs