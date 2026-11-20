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
  - https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md
display_name: Federator.ai
draft: false
git_integration_title: federatorai
guid: ec0fd93a-ee4c-4652-9996-cc68cb5a4d45
integration_id: federatorai
integration_title: Federator.ai
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@prophetstor.com
manifest_version: 1.0.0
metric_prefix: federatorai.
metric_to_check: federatorai.integration.status
name: federatorai
public_title: Intégration Datadog/Federator.ai
short_description: Intégrez ProphetStor Federator.ai à Datadog pour optimiser les performances de votre application
support: contrib
supported_os:
  - linux
---
## Présentation


[ProphetStor Federator.ai][1] est une solution soutenue par l'IA aidant les organisations à gérer et à optimiser des ressources pour des applications sur Kubernetes et pour des machines virtuelles dans des clusters VMware.

Grâce à ses algorithmes avancés d'apprentissage automatique capables de prédire les charges des applications, Federator.ai propose les fonctionnalités suivantes :
* Un système de prédiction des charges soutenu par l'IA pour les applications conteneurisées dans des clusters Kubernetes ainsi que pour les VM dans les clusters VMWare et le service Elastic Compute Cloud (EC2) d'Amazon Web Services (AWS)
* Des recommandations de ressources basées sur des métriques relatives à la prédiction des charges, aux applications ou encore à Kubernetes
* Un provisionnement automatique du CPU et de la mémoire pour les contrôleurs et espaces de nommage génériques des applications Kubernetes
* Un autoscaling des conteneurs d'application Kubernetes, des groupes de consommateurs Kafka et des services en amont NGINX Ingress
* Des analyses de coûts pour des environnements avec plusieurs clouds, ainsi que des recommandations reposant sur les prédictions de charge pour les clusters Kubernetes et clusters de VM
* Un système de calcul des coûts réels et des réductions de coûts potentielles reposant sur les recommandations de clusters, d'applications Kubernetes, de VM et d'espaces de nommage Kubernetes

L'intégration de ProphetStor Federator.ai vous permet de surveiller et de prédire l'utilisation des ressources de vos conteneurs Kubernetes, espaces de nommage et nœuds de cluster. Vous pouvez ainsi formuler des recommandations pertinentes afin d'éviter tout coût supplémentaire lié à un surprovisionnement ou tout problème de performance lié à un sous-provisionnement. Grâce à son intégration fluide au pipeline de CI/CD, Federator.ai vous permet d'optimiser en permanence vos conteneurs, où qu'ils soient déployés dans votre cluster Kubernetes. À l'aide de ses prédictions de workload pour les applications, Federator.ai effectue au moment opportun l'autoscaling des conteneurs d'application. Cette solution optimise également vos performances en utilisant le nombre optimal de réplicas de conteneurs, par l'intermédiaire de l'Autoscaler de pods horizontaux de Kubernetes ou de la solution [Watermark Pod Autoscaling (WPA) de Datadog][2].

Pour en savoir plus sur Federator.ai, consultez les vidéos de [démonstration des fonctionnalités de ProphetStor Federator.ai][3] et de [présentation de ProphetStor Federator.ai pour Datadog][4] (en anglais).


**Vue d'ensemble de cluster ProphetStor Federator.ai**

![Vue d'ensemble de cluster ProphetStor Federator.ai][5]

* Cluster Resource Usage Predictions and Recommendations
   - Ce tableau présente les valeurs maximales, minimales et moyennes des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources du cluster.

* Cluster Node Resource Usage Predictions and Recommendations
   - Ce tableau présente les valeurs maximales, minimales et moyennes des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources du nœud.

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

![Dashboard de vue d'ensemble d'une application][6]

* Workload Prediction for Next 24 Hours
   - Ce tableau présente les valeurs maximales, minimales et moyennes des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources des contrôleurs sur les 24 prochaines heures.

* Workload Prediction for Next 7 Days
   - Ce tableau présente les valeurs maximales, minimales et moyennes des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources des contrôleurs sur les 7 prochains jours.

* Workload Prediction for Next 30 Days
   - Ce tableau présente les valeurs maximales, minimales et moyennes des charges CPU/mémoire prévues, ainsi que les charges CPU/mémoire recommandées par Federator.ai dans le cadre de la planification des ressources des contrôleurs sur les 30 prochains jours.

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

![Vue d'ensemble du dashboard][7]

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

![Vue d'ensemble des analyses des coûts][8]

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

* Suivez les instructions ci-dessous pour télécharger et configurer Federator.ai.

### Installation

1. Connectez-vous à votre cluster OpenShift/Kubernetes.
2. Installez Federator.ai pour OpenShift/Kubernetes à l'aide de la commande suivante :

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ```

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ...
   Please enter Federator.ai version tag [default: latest]:latest
   Please enter the path of Federator.ai directory [default: /opt]:

   Downloading v4.5.1-b1562 tgz file ...
   Done
   Do you want to use a private repository URL? [default: n]:
   Do you want to launch Federator.ai installation script? [default: y]:

   Executing install.sh ...
   Checking environment version...
   ...Passed
   Enter the namespace you want to install Federator.ai [default: federatorai]:
   .........
   Downloading Federator.ai alamedascaler sample files ...
   Done
   ========================================
   Which storage type you would like to use? ephemeral or persistent?
   [default: persistent]:
   Specify log storage size [e.g., 2 for 2GB, default: 2]:
   Specify AI engine storage size [e.g., 10 for 10GB, default: 10]:
   Specify InfluxDB storage size [e.g., 100 for 100GB, default: 100]:
   Specify storage class name: managed-nfs-storage
   Do you want to expose dashboard and REST API services for external access? [default: y]:

   ----------------------------------------
   install_namespace = federatorai
   storage_type = persistent
   log storage size = 2 GB
   AI engine storage size = 10 GB
   InfluxDB storage size = 100 GB
   storage class name = managed-nfs-storage
   expose service = y
   ----------------------------------------
   Is the above information correct [default: y]:
   Processing...

   (snipped)
   .........
   All federatorai pods are ready.

   ========================================
   You can now access GUI through https://<YOUR IP>:31012
   Default login credential is admin/admin

   Also, you can start to apply alamedascaler CR for the target you would like to monitor.
   Review administration guide for further details. 
   ========================================
   ========================================
   You can now access Federatorai REST API through https://<YOUR IP>:31011
   The default login credential is admin/admin
   The REST API online document can be found in https://<YOUR IP>:31011/apis/v1/swagger/index.html
   ========================================

   Install Federator.ai v4.5.1-b1562 successfully

   Downloaded YAML files are located under /opt/federatorai/installation

   Downloaded files are located under /opt/federatorai/repo/v4.5.1-b1562
   ```

3. Vérifiez que les pods Federator.ai s'exécutent correctement.

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Connectez-vous à l'interface graphique Federator.ai. L'URL et les identifiants de connexion figurent dans la sortie de l'étape 2.


### Configuration

1. Connectez-vous à votre compte Datadog et obtenez une [clé d'API et une clé d'application][9] pour utiliser l'API Datadog.

2. Configurez Federator.ai en tant que source de données des métriques pour chaque cluster.
    - Lancez l'interface graphique Federator.ai, accédez à Configuration -> Clusters, puis cliquez sur Add Cluster.
    - Saisissez la clé d'API et la clé d'application.

    ![Fenêtre Add Cluster][10] 

3. Pour en savoir plus, consultez le [guide d'installation et de configuration de Federator.ai][11] ainsi que le [guide d'utilisation][12] (en anglais).


## Données collectées

### Métriques
{{< get-metrics-from-git "federatorai" >}}



### Checks de service

Federator.ai n'inclut aucun check de service.

### Événements

Federator.ai n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Consultez le [guide d'installation et de configuration de Federator.ai][11] (en anglais) ou contactez l'[assistance Datadog][14].

[1]: https://prophetstor.com/federator_ai/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://youtu.be/AeSH8yGGA3Q
[4]: https://youtu.be/qX_HF_zZ4BA
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cluster_overview_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/application_overview_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cost_analysis_overview.png
[9]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/add_cluster_window.png
[11]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[12]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[13]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[14]: https://docs.datadoghq.com/fr/help/