---
assets:
  dashboards:
    ProphetStor Federator.ai Application Overview: assets/dashboards/application-overview.json
    ProphetStor Federator.ai Cluster Overview: assets/dashboards/cluster-overview.json
    ProphetStor Federator.ai Cost Analysis Overview: assets/dashboards/cost-analysis-overview.json
    ProphetStor Federator.ai Kafka Overview: assets/dashboards/overview.json
  metrics_metadata: metadata.csv
  monitors:
    Node CPU Load Prediction in Next 24 Hours is High: assets/recommended_monitors/federatorai_node_cpu_prediction.json
    Node Memory Usage Prediction in Next 24 Hours is High: assets/recommended_monitors/federatorai_node_mem_prediction.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md'
display_name: Federator.ai
draft: false
git_integration_title: federatorai
guid: ec0fd93a-ee4c-4652-9996-cc68cb5a4d45
integration_id: federatorai
integration_title: Federator.ai
is_public: true
kind: integration
maintainer: support@prophetstor.com
manifest_version: 1.0.0
metric_prefix: federatorai.
metric_to_check: federatorai.integration.status
name: federatorai
public_title: Intégration Datadog/Federator.ai
short_description: Intégrez Federator.ai de ProphetStor à Datadog pour optimiser les performances de votre application
support: contrib
supported_os:
  - linux
---
## Présentation

[Federator.ai de ProphetStor][1] est une solution basée sur l'IA qui permet aux entreprises de gérer, optimiser et redimensionner automatiquement les ressources de toutes les applications sur Kubernetes. En utilisant des algorithmes d'apprentissage automatique avancés pour prévoir la charge de travail des applications, Federator.ai déploie la bonne quantité de ressources au bon moment pour optimiser les performances des applications.

* Prévision de la charge de travail basée sur l'IA pour Kafka ou toute autre application
* Recommandations relatives aux ressources basées sur des métriques de prévision de la charge de travail, d'application, Kubernetes et d'autres métriques pertinentes
* Scaling automatique des conteneurs d'applications via le [Watermark Pod Autoscaler (WPA) de Datadog][2] 

En intégrant Federator.ai de ProphetStor à Datadog, les utilisateurs peuvent facilement suivre les taux de consommation/production des messages Kafka, ainsi que la prévision des taux de production des messages à partir du dashboard Federator.ai. En fonction de la prévision ou du taux de production de messages, Federator.ai met automatiquement à l'échelle les réplicas de consommateurs Kafka pour gérer la charge de travail. Il est possible de visualiser ce comportement à partir du dashboard Federator.ai, où sont affichés les réplicas de consommateurs recommandés et le nombre actuel de réplicas de consommateurs. De plus, le retard global des consommateurs ainsi que la latence moyenne dans la file d'attente avant qu'un message ne soit reçu par un consommateur sont également affichés sur le dashboard pour un meilleur suivi des performances.


**Vue d'ensemble de cluster ProphetStor Federator.ai**

![dashboard_vue d'ensemble_cluster][3]

* Cluster Resource Usage Predictions and Recommendations
   - Ce tableau présente les valeurs maximale/minimale/moyenne des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources du cluster.

* Cluster Node Resource Usage Predictions and Recommendations
   - Ce tableau présente les valeurs maximale/minimale/moyenne des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources des nœuds.

* Node Current/Predicted Memory Usage (Daily)
   - Ce graphique présente la charge mémoire quotidienne prévue par Federator.ai, ainsi que la charge mémoire des nœuds.

* Node Current/Predicted Memory Usage (Weekly)
   - Ce graphique présente la charge mémoire hebdomadaire prévue par Federator.ai, ainsi que la charge mémoire des nœuds.

* Node Current/Predicted Memory Usage (Monthly)
   - Ce graphique présente la charge mémoire mensuelle prévue par Federator.ai, ainsi que la charge mémoire des nœuds.

* Node Current/Predicted CPU Usage (Daily)
   - Ce graphique présente la charge CPU quotidienne prévue par Federator.ai, ainsi que la charge CPU des nœuds.

* Node Current/Predicted CPU Usage (Weekly)
   - Ce graphique présente la charge CPU hebdomadaire prévue par Federator.ai, ainsi que la charge CPU des nœuds.

* Node Current/Predicted CPU Usage (Monthly)
   - Ce graphique présente la charge CPU mensuelle prévue par Federator.ai, ainsi que la charge CPU des nœuds.


**Vue d'ensemble d'application ProphetStor Federator.ai**

![dashboard_vue d'ensemble_application][4]

* Workload Prediction for Next 24 Hours
   - Ce tableau présente les valeurs maximale/minimale/moyenne des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources des contrôleurs sur les 24 prochaines heures.

* Workload Prediction for Next 7 Days
   - Ce tableau présente les valeurs maximale/minimale/moyenne des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources des contrôleurs sur les 7 prochains jours.

* Workload Prediction for Next 30 Days
   - Ce tableau présente les valeurs maximale/minimale/moyenne des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources des contrôleurs sur les 30 prochains jours.

* Current/Predicted CPU Usage (Daily)
   - Ce graphique présente la charge CPU quotidienne prévue par Federator.ai, ainsi que la charge CPU des contrôleurs.

* Current/Predicted CPU Usage (Weekly)
   - Ce graphique présente la charge CPU hebdomadaire prévue par Federator.ai, ainsi que la charge CPU des contrôleurs.

* Current/Predicted CPU Usage (Monthly)
   - Ce graphique présente la charge CPU mensuelle prévue par Federator.ai, ainsi que la charge CPU des contrôleurs.

* Current/Predicted Memory Usage (Daily)
   - Ce graphique présente la charge mémoire quotidienne prévue par Federator.ai, ainsi que la charge mémoire des contrôleurs.

* Current/Predicted Memory Usage (Weekly)
   - Ce graphique présente la charge mémoire hebdomadaire prévue par Federator.ai, ainsi que la charge mémoire des contrôleurs.

* Current/Predicted Memory Usage (Monthly)
   - Ce graphique présente la charge mémoire mensuelle prévue par Federator.ai, ainsi que la charge mémoire des contrôleurs.

* Current/Desired/Recommended Replicas
   - Ce graphique présente les réplicas recommandés par Federator.ai, ainsi que les réplicas actuels et souhaités des contrôleurs.

* Memory Usage/Request/Limit vs Rec Memory Limit
   - Ce graphique présente la limite de mémoire recommandée par Federator.ai, ainsi que la charge mémoire demandée, limitée et actuelle des contrôleurs.

* CPU Usage/Request/Limit vs Rec CPU Limit
   - Ce graphique présente la limite de CPU recommandée par Federator.ai, ainsi que la charge CPU demandée, limitée et actuelle des contrôleurs.

* CPU Usage/Limit Utilization
   - Ce graphique présente la charge CPU du contrôleur et indique si la charge CPU se situe au-dessus ou en dessous de la limite.


**Vue d'ensemble Kafka ProphetStor Federator.ai**

![dashboard_vue d'ensemble][5]

* Recommended Replicas vs Current/Desired Replicas
   - Ce graphique de série temporelle affiche les réplicas recommandés par Federator.ai et les réplicas actuels et souhaités dans le système.

* Production vs Consumption vs Production Prediction
   - Ce graphique de série temporelle affiche le taux de production de messages Kafka ainsi que les taux de consommation et de production prévus par Federator.ai.

* Kafka Consumer Lag
   - Ce graphique de série temporelle montre le retard total des consommateurs sur l'ensemble des partitions.

* Consumer Queue Latency (msec)
   - Ce graphique de série temporelle montre la latence moyenne d'un message dans la file d'attente de messages avant qu'il ne soit reçu par un consommateur.

* Deployment Memory Usage
   - Ce graphique de série temporelle montre l'utilisation de la mémoire par les consommateurs.

* Deployment CPU Usage
   - Ce graphique de série temporelle montre la charge CPU des consommateurs.


**Vue d'ensemble de l'analyse des coûts ProphetStor Federator.ai**

![vue d'ensemble_analyse_coûts][6]

* Current Cluster Cost et Current Cluster Configuration
   - Ces tableaux présentent le coût actuel et la configuration de l'environnement des clusters.

* Recommended Cluster - AWS et Recommended Cluster Configuration - AWS
   - Ces tableaux présentent la configuration des instances AWS recommandées par Federator.ai, ainsi que le coût des instances AWS recommandées.

* Recommended Cluster - Azure et Recommended Cluster Configuration - Azure
   - Ces tableaux présentent la configuration des instances Azure recommandées par Federator.ai, ainsi que le coût des instances Azure recommandées.

* Recommended Cluster - GCP et Recommended Cluster Configuration - GCP
   - Ces tableaux présentent la configuration des instances GCP recommandées par Federator.ai, ainsi que le coût des instances GCP recommandées.

* Namespace with Highest Cost ($/day)
   - Ce graphique présente le coût journalier le plus élevé des espaces de nommage dans le cluster actuel.

* Namespace with Highest Predicted Cost ($/month)
   - Ce graphique présente le coût mensuel prévu le plus élevé des espaces de nommage dans le cluster actuel.


## Configuration

### Installation

1. Connectez-vous à votre cluster OpenShift/Kubernetes
2. Installez Federator.ai pour OpenShift/Kubernetes à l'aide de la commande suivante :

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/master/deploy/federatorai-launcher.sh | bash
   ```

   ```shell
   curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/master/deploy/federatorai-launcher.sh | bash
   Please input Federator.ai version tag: datadog

   Downloading scripts ...
   Done
   Do you want to use private repository URL? [default: n]:
   Do you want to launch Federator.ai installation script? [default: y]:

   Executing install.sh ...
   Checking environment version...
   ...Passed
   Enter the namespace you want to install Federator.ai [default: federatorai]:
   .........
   (snipped)
   .........
   All federatorai pods are ready.

   ========================================
   You can now access GUI through https://<YOUR IP>:31012
   Default login credential is admin/admin

   Also, you can start to apply alamedascaler CR for the target you would like to monitor.
   Review administration guide for further details.Review administration guide for further details.
   ========================================
   .........
   (snipped)
   .........
   Install Federator.ai successfully
   Do you want to monitor this cluster? [default: y]:
   Use "cluster-demo" as cluster name and DD_TAGS
   Applying file alamedascaler_federatorai.yaml ...
   alamedascaler.autoscaling.containers.ai/clusterscaler created
   Done

   Downloaded YAML files are located under /tmp/install-op 
   ```

3. Vérifiez le bon fonctionnement des pods Federator.ai

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Connectez-vous à l'interface graphique Federator.ai. L'URL et les identifiants de connexion figurent dans la sortie de l'étape 2.


### Configuration

1. Vous devez posséder un compte Datadog pour vous connecter et utiliser Datadog. Si vous n'en avez pas, accédez au [site web de Datadog][7] et inscrivez-vous pour commencer un essai gratuit.

2. Connectez-vous à votre compte Datadog et obtenez une [clé d'API et une clé d'application][8] pour utiliser l'API Datadog.

3. Configurez le Data-Adapter Federator.ai.
   - Le script de configuration du Data-Adapter a normalement déjà été téléchargé dans le répertoire /tmp/federatorai-scripts/datadog/. Dans le cas contraire, exécutez à nouveau le script federatorai-launcher.sh décrit à l'étape 2 de l'installation, sans lancer une nouvelle fois le script d'installation de Federator.ai.

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/master/deploy/federatorai-launcher.sh | bash
   Please input Federator.ai version tag: datadog

   Downloading scripts ...
   Done
   Do you want to use private repository URL? [default: n]:
   Do you want to launch Federator.ai installation script? [default: y]: n
   ```

   - Modifiez l'autorisation d'exécution.

   ```shell
   $ chomd +x /tmp/federatorai-scripts/datadog/federatorai-setup-for-datadog.sh
   ```

   - Exécutez le script de configuration et suivez les étapes pour renseigner les paramètres de configuration : 

   ```shell
   $ ./federatorai-setup-for-datadog.sh -k .kubeconfig
   Checking environment version...
   ...Passed
   You are connecting to cluster: https://<YOUR IP>:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

   Getting Datadog info...
   Input a Datadog API Key []:xxxxx9273dxxcbc155xx3a7331xxxxx
   Input a Datadog Application Key []:xxxxx7220db1478xxxxxcb5c323fcb02a11xxxxx

   Getting Kafka info... No.1

   You can use command "kubectl get cm cluster-info -n <namespace> --template={{.metadata.uid}}" to get cluster name
   Where '<namespace>' is either 'default' or 'kube-public' or 'kube-service-catalog'.
   If multiple cluster-info exist, pick either one would work as long as you always use the same one to configure Datadog Agent/Cluster Agent/WPA and other data source agents.
   Input cluster name []: cluster-demo
   Input Kafka exporter namespace []: myproject
   Input Kafka consumer group kind (Deployment/DeploymentConfig/StatefulSet) []: Deployment
   Input Kafka consumer group kind name []: consumer1-topic0001-group-0001
   Input Kafka consumer group namespace []: myproject
   Input Kafka consumer topic name []: topic0001

   You can use Kafka command-line tool 'kafka-consumer-group.sh' (download separately or enter into a broker pod, in /bin directory) to list consumer groups.
   e.g.: "/bin/kafka-consumer-groups.sh --bootstrap-server <kafka-bootstrap-service>:9092 --describe --all-groups --members"
   The first column of output is the 'kafkaConsumerGroupId'.
   Input Kafka consumer group id []: group0001
   Input Kafka consumer minimum replica number []: 1
   Input Kafka consumer maximum replica number []: 20

   Do you want to input another set? [default: n]: 
   .........
   (snipped)
   .........
   ```

4. Consultez le [guide de configuration et d'installation dédié à l'intégration Federator.ai/Datadog][9] pour en savoir plus.


## Données collectées

### Métriques
{{< get-metrics-from-git "federatorai" >}}



### Checks de service

Federator.ai n'inclut aucun check de service.

### Événements

Federator.ai n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Consultez la [documentation dédiée à Federator.ai de ProphetStor][11] ou contactez l'[assistance Datadog][12].

[1]: https://www.prophetstor.com/federator-ai-for-aiops/federator-ai-datadog-integration/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cluster_overview_dashboard.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/application_overview_dashboard.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cost_analysis_overview.png
[7]: https://www.datadoghq.com/
[8]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[9]: http://www.prophetstor.com/wp-content/uploads/2020/05/Federator.ai%20for%20Datadog%20-%20Installation%20and%20Configuration%20Guide.pdf
[10]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[11]: https://github.com/containers-ai/federatorai-operator
[12]: https://docs.datadoghq.com/fr/help/