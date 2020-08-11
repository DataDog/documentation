---
assets:
  dashboards:
    ProphetStor Federator.ai Kafka Overview: assets/dashboards/overview.json
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md'
display_name: Federator.ai
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
* Mise à l'échelle automatique des conteneurs d'applications via le [Watermark Pod Autoscaler (WPA) de Datadog][2] 

En intégrant Federator.ai de ProphetStor à Datadog, les utilisateurs peuvent facilement suivre les taux de consommation/production des messages Kafka, ainsi que la prévision des taux de production des messages à partir du dashboard Federator.ai. En fonction de la prévision ou du taux de production de messages, Federator.ai met automatiquement à l'échelle les réplicas de consommateurs Kafka pour gérer la charge de travail. Il est possible de visualiser ce comportement à partir du dashboard Federator.ai, où sont affichés les réplicas de consommateurs recommandés et le nombre actuel de réplicas de consommateurs. De plus, le retard global des consommateurs ainsi que la latence moyenne dans la file d'attente avant qu'un message ne soit reçu par un consommateur sont également affichés sur le dashboard pour un meilleur suivi des performances.

* **Aperçu du dashboard Federator.ai**

![aperçu_dashboard][3]

* **Réplicas conseillés et réplicas actuels/souhaités**
   - Ce graphique de série temporelle affiche les réplicas conseillés de Federator.ai et les réplicas actuels et souhaités dans le système.

![réplicas_conseillés_dashboard][4]

* **Production, consommation et prévision de la production**
   - Ce graphique de série temporelle affiche le taux de production de messages Kafka ainsi que les taux de consommation et de production prévus par Federator.ai.

![consommation_production_dashboard][5]

* **Retard des consommateurs Kafka**
   - Ce graphique de série temporelle montre le retard total des consommateurs sur l'ensemble des partitions.

![retard_consommateur_dashboard][6]

* **Latence de la file d'attente des consommateurs (msec)**
   - Ce graphique de série temporelle montre la latence moyenne d'un message dans la file d'attente de messages avant qu'il ne soit reçu par un consommateur.

![latence_file_d_attente_dashboard][7]

* **Utilisation de la mémoire de déploiement**
   - Ce graphique de série temporelle montre l'utilisation de la mémoire par les consommateurs.

![utilisation_mémoire_dashboard][8]

* **Charge processeur de déploiement**
   - Ce graphique de série temporelle montre la charge processeur des consommateurs.

![charge_processeur_dashboard][9]


## Configuration

### Installation

1. Connectez-vous à votre cluster OpenShift/Kubernetes
2. Installez Federator.ai pour OpenShift/Kubernetes à l'aide de la commande suivante :

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/datadog/deploy/install.sh |bash
   ```

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/datadog/deploy/install.sh |bash
   Checking environment version...
   ...Passed
   Please input Federator.ai Operator tag: datadog
   Enter the namespace you want to install Federator.ai [default: federatorai]:
   .........
   (snipped)
   .........
   You can now access GUI through https://federatorai-dashboard-frontend-federatorai.apps.jc-ocp4.172-31-17-84.nip.io
   Default login credential is admin/admin

   Also, you can start to apply alamedascaler CR for the namespace you would like to monitor.
   Review administration guide for further details.
   ========================================
   .........
   (snipped)
   .........
   Install Alameda successfully

   Downloaded YAML files are located under /tmp/install-op
   ```

3. Vérifiez le bon fonctionnement des pods Federator.ai

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Connectez-vous à l'interface graphique Federator.ai. L'URL et les identifiants de connexion figurent dans la sortie de l'étape 2.


### Configuration

1. Vous devez posséder un compte Datadog pour vous connecter et utiliser Datadog. Si vous n'en avez pas, accédez au [site web de Datadog][10] et inscrivez-vous pour commencer un essai gratuit.

2. Connectez-vous à votre compte Datadog et obtenez une [clé d'API et une clé d'application][11] pour utiliser l'API Datadog.

3. Configurez le Data-Adapter Federator.ai.
   - Téléchargez le script de configuration du Data-Adapter depuis Github.

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/datadog/deploy/federatorai-setup-for-datadog.sh -O
   ```

   - Modifiez l'autorisation d'exécution.

   ```shell
   $ chomd +x federatorai-setup-for-datadog.sh
   ```

   - Préparez un fichier .kubeconfig (sh -c "export KUBECONFIG=.kubeconfig; oc login <URL_CONNEXION_KUBERNETES>") ou utilisez-en un qui existe déjà. Par exemple :

   ```shell
   $ sh -c "export KUBECONFIG=.kubeconfig; oc login https://api.ocp4.example.com:6443"
   ```

   - Exécutez le script de configuration et suivez les étapes pour renseigner les paramètres de configuration : 

   ```shell
   $ ./federatorai-setup-for-datadog.sh -k .kubeconfig
   ```

   ```shell
   $ ./federatorai-setup-for-datadog.sh -k .kubeconfig
   You are connecting to cluster: https://api.jc-ocp4.172-31-17-84.nip.io:6443

   Getting Datadog info...
   Input a Datadog API Key []:xxxxx9273dxxcbc155xx3a7331xxxxx
   Input a Datadog Application Key []:xxxxx7220db1478xxxxxcb5c323fcb02a11xxxxx

   Getting the Kafka info... No.1
   Input Kafka consumer deployment name []: consumer
   Input Kafka consumer deeployment namespace []: myproject
   Input Kafka consumer minimum replica number []: 1
   Input Kafka consumer maximum replica number []: 30
   Input Kafka consumer group name []: group0001
   Input Kafka consumer group namespace []: myproject
   Input Kafka consumer topic name []: topic0001
   Input Kafka consumer topic namespace []: myproject

   Do you want to input another set? [default: n]:
   Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
   secret/federatorai-data-adapter-secret configured
   Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
   configmap/federatorai-data-adapter-config configured

   Setup Federator.ai for datadog successfully
   ```

4. Consultez le [guide de configuration et d'installation dédié à l'intégration Federator.ai/Datadog][12] pour en savoir plus.


## Données collectées

### Métriques
{{< get-metrics-from-git "federatorai" >}}



### Checks de service

Federator.ai n'inclut aucun check de service.

### Événements

Federator.ai n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Consultez la [documentation dédiée à Federator.ai de ProphetStor][14] ou contactez l'[assistance Datadog][15].

[1]: https://www.prophetstor.com/federator-ai-for-aiops/federator-ai-datadog-integration/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_recommended_replicas.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_production_consumption.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_consumer_lag.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_queue_latency.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_memory_usage.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_cpu_usage.png
[10]: https://www.datadoghq.com/
[11]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[12]: http://www.prophetstor.com/wp-content/uploads/2020/05/Federator.ai%20for%20Datadog%20-%20Installation%20and%20Configuration%20Guide.pdf
[13]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[14]: https://github.com/containers-ai/federatorai-operator
[15]: https://docs.datadoghq.com/fr/help/