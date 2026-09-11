---
algolia:
  tags:
  - ecs
aliases:
- /fr/agent/amazon_ecs/
description: Installer et configurer l'Agent Datadog sur Amazon Elastic Container
  Service
further_reading:
- link: https://www.datadoghq.com/blog/ecs-managed-instances
  tag: Blog
  text: Surveiller les instances gérées ECS avec Datadog
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/amazon_ecs/data_collected/#metriques
  tag: Documentation
  text: Recueillir des métriques ECS
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Ajout de la prise en charge d'Amazon ECS Anywhere
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Analysez vos dépenses liées à Kubernetes et ECS avec la solution Cloud Cost
    Management de Datadog
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Détecter et remédier aux problèmes ECS plus rapidement avec les monitors par
    défaut et ECS Explorer
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Centre d'architecture
  text: Utiliser Datadog avec ECS Fargate
title: Amazon ECS
---

## Présentation

Amazon ECS est un service d'orchestration de conteneurs évolutif et à hautes performances qui prend en charge les conteneurs Docker. Grâce à l'Agent Datadog, vous pouvez surveiller des conteneurs et tâches ECS sur chaque instance EC2 de votre cluster.

Pour configurer Amazon ECS avec Datadog, vous pouvez utiliser **Fleet Automation** ou **effectuer une installation manuelle**. Si vous préférez effectuer une installation manuelle, exécutez un conteneur d'Agent par host Amazon EC2 en créant une définition de tâche de l'Agent Datadog et en la déployant en tant que service daemon. Chaque Agent surveille ensuite les autres conteneurs sur son host. Consultez la section [Effectuer une installation manuelle](#effectuer-une-installation-manuelle) pour plus de détails.


## Configuration de Fleet Automation
Suivez le [guide d'installation dans l'application de Fleet Automation][32] pour terminer la configuration sur ECS. Après avoir effectué les étapes décrites dans le guide dans l'application, [Fleet Automation][33] génère une définition de tâche ou un modèle CloudFormation prêt à l'emploi, avec votre clé API pré-injectée.

{{< img src="agent/basic_agent_usage/ecs_install_page.png" alt="Étapes d'installation dans l'application pour l'Agent Datadog sur ECS." style="width:90%;">}}

<div class="alert alert-info">
Si vous souhaitez surveiller <strong>ECS sur Fargate</strong>, consultez la section <a href="/integrations/ecs_fargate/">Amazon ECS sur AWS Fargate</a>.
</div>

<br>

## Configuration manuelle

Pour surveiller vos conteneurs et tâches ECS, déployez l'Agent Datadog en tant que conteneur **une fois sur chaque instance EC2** de votre cluster ECS. Pour cela, créez une définition de tâche pour le conteneur de l'Agent Datadog et déployez-le en tant que service daemon. Chaque conteneur d'Agent Datadog surveille alors les autres conteneurs sur son instance EC2 respective.

Les instructions suivantes supposent que vous avez déjà configuré un cluster EC2. Consultez la [documentation Amazon ECS][4] pour découvrir comment créer un cluster.

1. [Créer et ajouter une définition de tâche ECS][27]
2. [Planifier l'Agent de Datadog en tant que service daemon][28]
3. [Configurer des fonctionnalités supplémentaires pour l'Agent Datadog][29] (facultatif)

**Remarque** : la fonction [Autodiscovery][5] de Datadog peut être utilisée avec ECS et Docker afin de découvrir et de surveiller automatiquement les tâches s'exécutant dans votre environnement.

{{% site-region region="gov" %}}
## Conformité à la norme FIPS

Certaines étapes de configuration diffèrent pour la conformité FIPS. Veuillez tenir compte des instructions de configuration spécifiques dans la documentation [Conformité FIPS][32].

[32]: /fr/agent/configuration/fips-compliance/
{{< /site-region >}}

### Créer une définition de tâche ECS

Cette [définition de tâche ECS][30] lance le conteneur de l'Agent Datadog avec les configurations nécessaires. Pour modifier la configuration de l'Agent, modifiez la définition de cette tâche et redéployez le service daemon. Vous pouvez configurer la définition de cette tâche à l'aide de la console de gestion AWS ou de l'[interface de ligne de commande AWS][9].

L'exemple suivant montre comment effectuer une surveillance générale de l'infrastructure avec une configuration minimale. Toutefois, si vous souhaitez découvrir d'autres exemples de définition de tâche où diverses fonctionnalités sont activées, consultez la section [Configurer les fonctionnalités supplémentaires de l'Agent](#configurer-des-fonctionnalites-supplementaires-de-l-agent).

#### Créer et gérer le fichier de définition de tâche

1. Pour les conteneurs Linux, téléchargez [datadog-agent-ecs.json][20].
    - Si vous vous servez d'Amazon Linux 1 (AL1, anciennement Amazon Linux AMI), utilisez [datadog-agent-ecs1.json][21].
    - Si vous êtes sous Windows, utilisez [datadog-agent-ecs-win.json][22].

   <div class="alert alert-info">
   These files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the <a href="#set-up-additional-agent-features">Set up additional Agent features</a> section on this page.
   </div>
2. Modifier le fichier de définition de tâche de base
    - Remplacez le placeholder `<YOUR_DATADOG_API_KEY>` par la [clé d'API Datadog][14] de votre compte pour définir la variable d'environnement `DD_API_KEY`. Sinon, vous pouvez aussi [fournir l'ARN d'un secret stocké dans AWS Secrets Manager][16].
    - Définissez la variable d'environnement `DD_SITE` sur votre [site Datadog][13], à savoir {{< region-param key="dd_site" code="true" >}}.

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - Si vous le souhaitez, ajoutez une variable d'environnement `DD_TAGS` afin de spécifier des tags supplémentaires.

3. Pour un déploiement sur un [cluster ECS Anywhere][15], ajoutez la ligne suivante à la définition de votre tâche ECS (facultatif) :
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. Pour ajouter un check de santé de l'Agent, ajoutez la ligne suivante à la définition de votre tâche ECS (facultatif) :
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### Enregistrer la définition de tâche

{{< tabs >}}
{{% tab "Interface de ligne de commande AWS" %}}
Une fois votre fichier de définition de tâche créé, exécutez la commande suivante afin d'enregistrer le fichier dans AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Interface Web" %}}
Une fois votre fichier de définition de tâche créé, utilisez la console AWS pour l'enregistrer.
1. Connectez-vous à votre console AWS et accédez à la section Elastic Container Service.
2. Sélectionnez **Task Definitions** dans le volet de navigation. Depuis le menu **Create new task definition**, sélectionnez **Create new task definition with JSON**.
3. Dans la zone de l'éditeur JSON, collez le contenu du fichier de définition de votre tâche.
4. Sélectionnez **Create**.

{{% /tab %}}
{{< /tabs >}}


### Exécuter l'Agent en tant que service daemon

Pour qu'un conteneur d'Agent Datadog s'exécute sur chaque instance EC2, exécutez la définition de tâche de l'Agent Datadog en tant que [service daemon][10].

#### Planifier un service daemon dans AWS à l'aide de la tâche ECS de Datadog

1. Connectez-vous à la console AWS et accédez à la section ECS. Sur la page **Clusters**, choisissez le cluster sur lequel vous exécutez l'Agent.
2. Depuis l'onglet **Services** de votre cluster, sélectionnez **Create**.
3. Sous **Deployment configuration**, sélectionnez **Daemon** pour le champ **Service type**.
3. Il n'est pas nécessaire de configurer la répartition des charges ou l'autoscaling.
4. Cliquez sur **Next Step**, puis sur **Create Service**.

### Configurer des fonctionnalités d'Agent supplémentaires

Les fichiers de définition de tâche fournis à la section précédente sont basiques. Ils déploient un conteneur d'Agent avec une configuration simplifiée permettant de recueillir des métriques générales à propos des conteneurs de votre cluster ECS. L'Agent peut également exécuter des intégrations d'Agent [basées sur des étiquettes Docker][12] découvertes sur vos conteneurs.

Fonctionnalités supplémentaires :

#### APM
Consultez la [documentation relative à la configuration APM][6] et le fichier d'exemple [datadog-agent-ecs-apm.json][23].

#### Log Management
Consultez la [documentation relative à la collecte de logs][7] et le fichier d'exemple [datadog-agent-ecs-logs.json][24].

#### DogStatsD

Si vous utilisez [DogStatsD][8], modifiez la définition du conteneur de l'Agent Datadog afin d'ajouter le mappage du port du host pour 8125/udp et de définir la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` :

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

Cette configuration permet au trafic DogStatsD d'être acheminé depuis les conteneurs d'application jusqu'au conteneur de l'Agent Datadog en passant par le host et le port du host. Toutefois, le conteneur d'application doit utiliser l'adresse IP privée du host pour ce trafic. Pour ce faire, définissez la variable d'environnement `DD_AGENT_HOST` sur l'adresse IP privée de l'instance EC2, qui peut être récupérée depuis le système Instance Metadata Service (IMDS). Une autre solution consiste à définir l'adresse sous forme de code lors de l'initialisation. L'implémentation pour DogStatsD est la même que pour APM. Consultez la rubrique [Configurer l'endpoint de l'Agent de trace][17] pour obtenir des exemples de configuration de l'endpoint de l'Agent.

Assurez-vous que les paramètres des groupes de sécurité sur vos instances EC2 n'exposent pas publiquement les ports pour APM et DogStatsD.

#### Collecte de processus

Pour recueillir des informations sur les live processes pour l'ensemble de vos conteneurs, et les envoyer à Datadog, définissez la variable d'environnement `DD_PROCESS_AGENT_ENABLED` dans la définition de votre tâche :

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

#### Cloud Network Monitoring

<div class="alert alert-danger">
Cette fonctionnalité est uniquement disponible pour Linux.
</div>

Consultez le fichier d'exemple [datadog-agent-sysprobe-ecs.json][25].

Si vous vous servez Amazon Linux 1 (AL1, anciennement Amazon Linux AMI), consultez [datadog-agent-sysprobe-ecs1.json][26].

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
#### Chemin réseau

1. Pour activer [Network Path][31] sur vos clusters ECS, activez le module traceroute `system-probe` en ajoutant la variable d'environnement suivante dans votre fichier `datadog-agent-sysprobe-ecs.json` :

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. Pour surveiller des chemins individuels, suivez les instructions ici pour [configurer des fonctionnalités supplémentaires de l'Agent](#configurer-des-fonctionnalites-supplementaires-de-l-agent) :

   Ces fichiers déploient un conteneur d'Agent avec une configuration de base pour recueillir les métriques principales concernant les conteneurs de votre cluster ECS. L'Agent peut également exécuter des intégrations de l'Agent en fonction des Docker Labels découvertes sur vos conteneurs.

3. Pour surveiller les chemins de trafic réseau et permettre à l'Agent de découvrir et surveiller automatiquement les chemins réseau en fonction du trafic réseau réel, sans avoir à spécifier manuellement les endpoints, ajoutez les variables d'environnement supplémentaires suivantes à votre `datadog-agent-sysprobe-ecs.json` :

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_CONNECTIONS_MONITORING_ENABLED",
          "value": "true"
        }
      ],
   ```

4. En option, pour configurer le nombre de workers (la valeur par défaut est 4), ajustez la variable d'environnement suivante dans votre fichier `datadog-agent-sysprobe-ecs.json` :

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_COLLECTOR_WORKERS",
          "value": "10"
        }
      ],
   ```
## Mode AWSVPC

Pour l'Agent 6.10 et les versions ultérieures, le mode `awsvpc` est pris en charge par les conteneurs d'application, tant que les groupes de sécurité autorisent le groupe de sécurité de l'instance de host de se connecter aux conteneurs d'application sur les ports concernés.

Vous pouvez exécuter l'Agent en mode `awsvpc`. Toutefois, Datadog vous le déconseille, car il serait difficile de récupérer l'IP de l'interface réseau Elastic (ENI) afin d'accéder à l'Agent pour les métriques DogStatsD et les traces APM. Exécutez plutôt l'Agent en mode bridge avec un mappage de port, afin de pouvoir récupérer plus facilement l'[adresse IP du host via le serveur de métadonnées][6].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
[5]: https://docs.datadoghq.com/fr/agent/autodiscovery/
[6]: /fr/containers/amazon_ecs/apm/
[7]: /fr/containers/amazon_ecs/logs/
[8]: /fr/developers/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/fr/help/
[12]: https://docs.datadoghq.com/fr/containers/docker/integrations/?tab=docker
[13]: /fr/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /fr/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /fr/network_monitoring/network_path
[32]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
[33]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs