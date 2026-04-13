---
aliases:
- /fr/integrations/oracle_cloud_infrastructure
app_id: oracle-cloud-infrastructure
categories:
- cloud
- log collection
- network
- oracle
custom_kind: integration
description: OCI est un ensemble de services cloud conçus pour prendre en charge un
  large éventail d'applications dans un environnement hébergé.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: blog
  text: Surveiller Oracle Cloud Infrastructure avec Datadog
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: blog
  text: Accélérer la surveillance d'Oracle Cloud Infrastructure avec Datadog OCI QuickStart
integration_version: 1.1.0
media: []
title: Oracle Cloud Infrastructure
---
{{% site-region region="gov" %}}

<div class="alert alert-warning">L'intégration Oracle Cloud Infrastructure n'est pas prise en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{< jqmath-vanilla >}}

## Section Overview

Oracle Cloud Infrastructure (OCI) est une infrastructure en tant que service (IaaS) et une plateforme en tant que service (PaaS) utilisée par des entreprises de grande envergure. Elle comprend une suite complète de plus de 30 services gérés pour l'hébergement, le stockage, la mise en réseau, les bases de données, etc.

Utilisez l'intégration OCI de Datadog pour bénéficier d'une visibilité totale sur votre environnement OCI grâce aux métriques, aux logs et aux données de ressources. Ces données vous permettent d'alimenter des dashboards, facilitent le dépannage et peuvent être surveillées à des fins de sécurité et de conformité.

## Configuration

### Collecte de métriques

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

<div class="alert alert-info"> 
OCI QuickStart est en préversion. Utilisez <a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">ce formulaire</a> pour soumettre votre demande dès aujourd'hui.
</div>

OCI QuickStart de Datadog est une expérience de configuration entièrement gérée et à flux unique qui vous permet de surveiller votre infrastructure et vos applications OCI en quelques clics. OCI QuickStart crée l'infrastructure nécessaire au transfert des métriques, des logs et des données de ressources vers Datadog, et découvre automatiquement les nouvelles ressources ou les compartiments OCI pour la collecte de données.

**Remarques** :

- Seules les métriques sont envoyées par défaut. Activez la collecte de logs et la collecte de données de ressources depuis le [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) une fois la configuration terminée.
- Toutes les régions commerciales OCI existant au 15 juillet 2025 sont prises en charge. Les régions OCI ajoutées après cette date ne sont pas actuellement prises en charge.

Pour configurer l'infrastructure de transfert de métriques et de logs vers Datadog :

- [Configurer le carré d'intégration OCI Datadog](#configurer-le-carre-dintegration-oci-datadog)
- [Déployer la stack QuickStart](#stack-orm)
- [Finaliser la configuration dans Datadog](#finaliser-la-configuration-dans-datadog)
- [Vérifier que les métriques sont transmises](#validation)
- [Configurer la collecte de métriques (facultatif)](#configuration)
- [Configurer la collecte de logs (facultatif)](#collecte-de-logs)

L'intégration nécessite l'utilisation d'Oracle Service Connector Hubs pour transférer des données vers Datadog. Il est recommandé de [demander une augmentation de la limite de service](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti) avant de terminer la configuration. Le nombre approximatif de Service Connector Hubs nécessaires est le suivant :

$$\\text"Service Connector Hubs" = \\text"Nombre de compartiments dans la tenancy" / \\text"5"$$

{{% collapse-content title="Prérequis pour cette configuration" level="h4" %}}

- Votre compte utilisateur OCI doit disposer du rôle **Cloud Administrator** pour effectuer ces étapes
- Vous devez être connecté à OCI dans la tenancy que vous souhaitez intégrer
- Vous devez être connecté à OCI avec la Home Region sélectionnée en haut à droite de l'écran
- Votre compte utilisateur OCI doit appartenir au <a href="https://docs.oracle.com/iaas/Content/Identity/domains/the_default_domain.htm" target="_blank">domaine d'identité par défaut</a>
- Votre compte utilisateur OCI doit pouvoir créer un utilisateur, un groupe d'utilisateurs et un groupe dynamique dans le domaine d'identité par défaut
- Votre compte utilisateur OCI doit pouvoir créer des stratégies dans le compartiment racine

{{% /collapse-content %}}

#### Carré d'intégration OCI Datadog

1. Accédez au [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) et cliquez sur **Add New Tenancy**.
1. Sélectionnez ou créez une clé d'API Datadog à utiliser pour l'intégration.
1. Créez une clé d'application Datadog.
1. Cliquez sur **Create OCI Stack**. Vous accédez alors à une stack Oracle Resource Manager (ORM) pour terminer le déploiement.<br />
   **Note** : ne déployez cette stack qu'une seule fois par tenancy.

#### Stack ORM

1. Acceptez les conditions d'utilisation d'Oracle.
1. Laissez l'option d'utilisation de fournisseurs Terraform personnalisés décochée.
1. Utilisez le répertoire de travail par défaut pour déployer la stack, ou choisissez-en un autre si vous le souhaitez.
1. Cliquez sur **Next**, puis de nouveau sur **Next**.<br />
1. Cliquez sur **Create** et attendez jusqu'à 15 minutes que le déploiement se termine.

#### Terminer la configuration dans Datadog

Revenez au [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) et cliquez sur **Ready!**

#### Validation

Consultez les métriques `oci.*` dans le [dashboard de présentation de l'intégration OCI](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) ou sur la [page Metrics Explorer](https://app.datadoghq.com/metric/explorer) dans Datadog.

<div class="alert alert-warning">Les métriques de fonctions OCI (namespace <code>oci.faas</code>) et les métriques d'instances de conteneurs (namespace <code>oci_computecontainerinstance</code>) sont en préversion.</div>

#### Configuration

![L'onglet de configuration d'une tenancy OCI dans Datadog](images/oci_configuration_tab.png)

Une fois la configuration terminée, un onglet de configuration pour la tenancy devient disponible sur le côté gauche du [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure). Appliquez les configurations de collecte de données à l'échelle de la tenancy comme indiqué dans les sections ci-dessous.

##### Ajouter des régions

Dans l'onglet **General**, sélectionnez les régions pour la collecte de données dans la liste de cases à cocher **Regions**. Les sélections de régions s'appliquent à l'ensemble de la tenancy, pour les métriques et les logs.

**Remarque** : si vous avez utilisé la méthode de configuration QuickStart et que vous avez ensuite souscrit à une nouvelle région OCI, réappliquez la stack de configuration initiale dans ORM. La nouvelle région est alors disponible dans le carré OCI Datadog.

##### Collecte de métriques et de logs

Utiliser les onglets **Metric collection** et **Log collection** pour configurer les métriques et les logs envoyés à Datadog :

- **Activer** ou **désactiver** la collecte de métriques ou de logs pour l'ensemble de la tenancy
- **Inclure** ou **exclure** des compartiments spécifiques en fonction des tags de compartiment au format `key:value`. Par exemple :
  - `datadog:monitored,env:prod*` inclut les compartiments si **l'un ou l'autre** de ces tags est présent
  - `!env:staging,!testing` exclut les compartiments uniquement si les **deux** tags sont présents
  - `datadog:monitored,!region:us-phoenix-1` inclut les compartiments qui ont à la fois le tag `datadog:monitored` et n'ont pas le tag `region:us-phoenix-1`
- **Activer** ou **désactiver** la collecte pour des services OCI spécifiques

**Remarques** :

- Après avoir modifié des tags dans OCI, les modifications peuvent prendre jusqu'à 15 minutes pour s'afficher dans Datadog
- Dans OCI, les tags ne sont pas hérités par les compartiments enfants ; chaque compartiment doit être tagué individuellement

### Collecte de ressources

Dans l'onglet **Resource Collection** du [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), cliquez sur le bouton **Enable Resource Collection**. Les ressources sont visibles dans le [Catalogue de ressources Datadog](https://docs.datadoghq.com/infrastructure/resource_catalog/).

{{% /tab %}}

{{% tab "Manual setup" %}}

Pour transférer vos métriques OCI vers Datadog :

- [Saisir les informations de la tenancy](#saisir-les-informations-de-la-tenancy)
- [Déployer la stack de stratégies OCI](#creer-une-stack-de-strategies-oci) dans la région d'origine de votre tenancy pour créer un utilisateur, un groupe et des stratégies en lecture seule Datadog
- [Saisir les informations de DatadogROAuthUser](#saisir-les-informations-de-datadogroauthuser) dans Datadog
- [Déployer la stack de transfert de métriques OCI](#creer-une-stack-de-transfert-de-metriques-oci) pour chaque région de tenancy à partir de laquelle vous souhaitez transférer des métriques
- [Finaliser la configuration dans Datadog](#finaliser-la-configuration-dans-datadog)
- [Vérifier que les métriques sont transmises](#validation)
- [Configurer la collecte de métriques (facultatif)](#configuration)
- [Configurer la collecte de logs (facultatif)](#collecte-de-logs)

Pour une représentation visuelle de cette architecture, consultez la [section Architecture](#architecture).

#### Saisir les informations de la tenancy

{{% collapse-content title="Prérequis pour cette section" level="h5" %}}

- Votre compte utilisateur OCI doit disposer du rôle **Cloud Administrator** pour effectuer ces étapes
- OCID de la tenancy
- Région d'origine

{{% /collapse-content %}}

Saisissez l'OCID et la région d'origine de la tenancy que vous souhaitez surveiller dans le [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

- Vous pouvez trouver ces informations sur la [page de détails de la tenancy](https://cloud.oracle.com/tenancy).
- Saisissez la région d'origine à l'aide de la valeur **Region Identifier** de la [page des régions et domaines de disponibilité OCI](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm).

#### Créer une stack de stratégies OCI

{{% collapse-content title="Prérequis pour cette section" level="h5" %}}

- Votre compte utilisateur OCI doit pouvoir [créer des groupes dynamiques et des stratégies](https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html) dans le domaine par défaut
- Vous devez vous trouver dans la région d'origine de la tenancy

{{% /collapse-content %}}

<div class="alert alert-warning">Assurez-vous que la <strong>région d'origine</strong> de la tenancy est sélectionnée en haut à droite de l'écran.</div>

Cette stack de stratégies Oracle Resource Manager (ORM) ne doit être déployée qu'une seule fois par tenancy.

1. Cliquez sur le bouton **Create Policy Stack** dans le carré d'intégration OCI Datadog.
1. Acceptez les conditions d'utilisation d'Oracle.
1. Laissez l'option d'utilisation de fournisseurs Terraform personnalisés **décochée**.
1. Utilisez le nom et le compartiment par défaut de la stack, ou indiquez éventuellement votre propre nom descriptif ou compartiment.
1. Cliquez sur **Next**.
1. Laissez les champs de tenancy et d'utilisateur actuel tels quels.
1. Cliquez sur **Next**.
1. Cliquez sur **Create**.

#### Saisir les informations de DatadogROAuthUser

{{% collapse-content title="Prérequis pour cette section" level="h5" %}}

- OCID de `DatadogROAuthUser`
- Clé d'API OCI et valeur d'empreinte

{{% /collapse-content %}}

1. Dans la barre de recherche de la console OCI, recherchez `DatadogROAuthUser` et cliquez sur la ressource User qui s'affiche.
1. Copiez la valeur OCID de l'utilisateur.
1. Collez la valeur dans le champ **User OCID** du [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).
1. De retour dans la console OCI, générer une clé d'API en suivant ces étapes :<br />
   a. Dans le coin inférieur gauche de l'écran, sous **Resources**, cliquez sur **API keys**.<br />
   b. Cliquez sur **Add API key**.<br />
   c. Cliquez sur **Download private key**.<br />
   d. Cliquez sur **Add**.<br />
   e. Une fenêtre contextuelle **Configuration file preview** s'affiche, mais aucune action n'est nécessaire. Fermez cette fenêtre.

![La page Add API Key dans la console OCI](images/add_api_key.png)

5. Copiez la valeur de l'empreinte et collez-la dans le champ **Fingerprint** du [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).
1. Copier la valeur de la clé privée en suivant ces étapes :
   a. Ouvrez le fichier de clé privée `.pem` téléchargé dans un éditeur de texte, ou utilisez une commande de terminal telle que `cat` pour afficher le contenu du fichier.
   b. Copiez l'intégralité du contenu, y compris `-----BEGIN PRIVATE KEY-----` et `-----END PRIVATE KEY-----`.
1. Collez la valeur de la clé privée dans le champ **Private Key** du carré d'intégration OCI Datadog.

#### Créer une stack de transfert de métriques OCI

{{% collapse-content title="Prérequis pour cette section" level="h5" %}}

- Votre compte utilisateur OCI doit pouvoir créer des ressources dans le compartiment
- Valeur de la [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys)
- Nom d'utilisateur et token d'authentification pour un utilisateur disposant des autorisations `REPOSITORY_READ` et `REPOSITORY_UPDATE` pour extraire et envoyer des images vers un référentiel Docker
  - Consultez [Obtention d'un jeton d'authentification](https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm) pour savoir comment créer un jeton d'authentification
  - Consultez [Stratégies de contrôle d'accès au référentiel](https://docs.oracle.com/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access) pour plus d'informations sur les stratégies requises

**Remarque** : pour vérifier que la connexion au registre Docker est correcte, consultez [Connexion à Oracle Cloud Infrastructure Registry](https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm).

{{% /collapse-content %}}

La stack de transfert de métriques doit être déployée pour **chaque combinaison de tenancy et de région** à surveiller. Pour une configuration plus simple, Datadog recommande de créer toutes les ressources OCI nécessaires avec la stack Oracle Resource Manager (ORM) fournie ci-dessous. Vous pouvez également utiliser votre infrastructure réseau OCI existante.

Toutes les ressources créées par la stack ORM de Datadog sont déployées dans le compartiment spécifié et pour la région actuellement sélectionnée en haut à droite de l'écran.

1. Cliquez sur le bouton **Create Metric Stack** dans le carré d'intégration OCI Datadog.
1. Acceptez les conditions d'utilisation d'Oracle.
1. Laissez l'option **Custom providers** décochée.
1. Nommez la stack et sélectionnez le compartiment dans lequel la déployer.
1. Cliquez sur **Next**.
1. Dans le champ **Datadog API Key**, saisissez la valeur de votre [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys).
1. Dans la section **Network options**, laissez l'option `Create VCN` cochée.

{{% collapse-content title="(Facultatif) Utiliser un VCN existant à la place" level="h4" %}}

Si vous utilisez un réseau cloud virtuel (VCN) existant, l'OCID du sous-réseau doit être fourni à la stack. Assurez-vous que le VCN :

- Est autorisé à effectuer des appels HTTP sortants via la passerelle NAT
- Est capable d'extraire des images du registre de conteneurs OCI via la passerelle de service
- Dispose des règles de table de routage pour autoriser la passerelle NAT et la passerelle de service
- Dispose des règles de sécurité pour envoyer des requêtes HTTP

7. Dans la section **Network options**, décochez l'option `Create VCN` et saisissez les informations de votre VCN :<br />
   a. Dans le champ **vcnCompartment**, sélectionnez votre compartiment.<br />
   b. Dans la section **existingVcn**, sélectionnez votre VCN existant.<br />
   c. Dans la section **Function Subnet OCID**, saisissez l'OCID du sous-réseau à utiliser.

{{% /collapse-content %}}

8. Dans la section **Metrics settings**, supprimez éventuellement des namespaces de métriques de la collecte.
1. Dans la section **Metrics compartments**, saisissez une liste d'OCID de compartiments à surveiller, séparés par des virgules. Les filtres de namespaces de métriques sélectionnés à l'étape précédente sont appliqués à chaque compartiment.
1. Dans la section **Function settings**, sélectionnez `GENERIC_ARM`. Sélectionnez `GENERIC_X86` si vous effectuez un déploiement dans une région japonaise.
1. Cliquez sur **Next**.
1. Cliquez sur **Create**.
1. Revenez au [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) et cliquez sur **Create Configuration**.

**Remarques** :

- Par défaut, seul le compartiment racine est sélectionné et tous les espaces de nommage de métriques de l'étape 8 présents dans le compartiment sont activés (jusqu'à 50 espaces de nommage sont pris en charge par connector hub). Si vous choisissez de surveiller des compartiments supplémentaires, les espaces de nommage qui leur sont ajoutés sont une intersection des espaces de nommage sélectionnés et des espaces de nommage présents dans le compartiment.
- Vous devez gérer les personnes ayant accès aux fichiers d'état Terraform des stacks du gestionnaire de ressources. Pour plus d'informations, consultez la [section Terraform State Files](https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state) de la page Securing Resource Manager.

{{% /tab %}}

{{< /tabs >}}

{{% collapse-content title="Voir la liste complète des espaces de nommage de métriques" level="h4" %}}

### Espaces de nommage des métriques

| Intégration                         | Espace de nommage des métriques                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Compute](https://docs.datadoghq.com/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Container Instances (Preview)](https://docs.datadoghq.com/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Database](https://docs.datadoghq.com/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite (EBS)](https://docs.datadoghq.com/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/iaas/stack-monitoring/doc/metric-reference.html#STMON-GUID-4E859CA3-1CAB-43FB-8DC7-0AA17E6B52EC)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Functions (Preview)](https://docs.datadoghq.com/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Kubernetes Engine](https://docs.datadoghq.com/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Load Balancer](https://docs.datadoghq.com/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [NAT Gateway](https://docs.datadoghq.com/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [Object Storage](https://docs.datadoghq.com/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [PostgreSQL](https://docs.datadoghq.com/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Queue](https://docs.datadoghq.com/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Service Connector Hub](https://docs.datadoghq.com/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Service Gateway](https://docs.datadoghq.com/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [VCN](https://docs.datadoghq.com/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [VPN](https://docs.datadoghq.com/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Web Application Firewall](https://docs.datadoghq.com/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### Collecte de logs

Utilisez l'une des méthodes ci-dessous pour envoyer vos logs OCI vers Datadog :

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

1. Suivez les étapes de la [section de configuration](#configuration) pour créer l'infrastructure nécessaire au transfert des métriques et des logs vers Datadog.
1. Cliquez sur le bouton **Enable Log Collection** dans l'onglet **Log Collection** du [carré d'intégration OCI Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

{{% /tab %}}

{{% tab "Service Connector Hub" %}}

1. Configurez un log OCI.
1. Créez une fonction OCI.
1. Configurez un Service Connector OCI.

Les instructions ci-dessous utilisent le portail OCI pour configurer l'intégration.

#### Journalisation OCI

1. Depuis le portail OCI, accédez à *Logging -> Log Groups*.
1. Sélectionnez votre compartiment et cliquez sur **Create Log Group**. Un panneau latéral s'ouvre.
1. Saisissez `data_log_group` comme nom, et indiquez éventuellement une description et des tags.
1. Cliquez sur **Create** pour configurer votre nouveau groupe de logs.
1. Sous **Resources**, cliquez sur **Logs**.
1. Cliquez sur **Create custom log** ou **Enable service log** selon vos besoins.
1. Cliquez sur **Enable Log** pour créer un log OCI.

Pour plus d'informations sur les logs OCI, consultez [Activation de la journalisation pour une ressource](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm).

#### Fonciton OCI

1. Depuis le portail OCI, accédez à *Functions*.
1. Sélectionnez une application existante ou cliquez sur **Create Application**.
1. Créez une nouvelle fonction OCI dans votre application. Pour plus de détails, consultez [Oracle Overview of Functions](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm).
1. Il est recommandé de créer d'abord une fonction Python générique et de remplacer les fichiers générés automatiquement par le code source de Datadog :
   - Remplacer `func.py` par le code du [référentiel OCI Datadog](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py)
   - Remplacer `func.yaml` par le code du [référentiel OCI Datadog](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml). `DATADOG_TOKEN` et `DATADOG_HOST` doivent être remplacés par votre clé d'API Datadog et le lien d'intake de logs de la région
   - Remplacer `requirements.txt` par le code du [référentiel OCI Datadog](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt)

#### Service Connector Hub OCI

1. Depuis le portail OCI, accédez à *Logging -> Service Connectors*.
1. Cliquez sur **Create Service Connector** pour être redirigé vers la page **Create Service Connector**.
1. Sélectionnez Logging dans le champ **Source** et Functions dans le champ **Target**.
1. Sous **Configure Source Connection**, sélectionnez un **Compartment name**, un **Log Group**, et un **Log**. Le **Log Group** et le **Log** sont ceux créés au cours de la première étape.
1. Si vous souhaitez également envoyer des **Audit Logs**, cliquez sur **+Another Log** et sélectionnez le même **Compartment** tout en remplaçant « \_Audit » comme **Log Group**.
1. Sous **Configure target**, sélectionnez un **Compartment**, une **Function application** et une **Function**. (**Function Application** et **Function** créées à l'étape précédente)
1. Si vous êtes invité à créer une stratégie, cliquez sur **Create** depuis l'invite.
1. Cliquez sur **Create** en bas de la page pour terminer la création de votre Service Connector.

Pour plus d'informations sur OCI Object Storage, consultez [l'article de blog Oracle sur Service Connector](https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available).

{{% /tab %}}

{{% tab "Object store" %}}

1. Configurez un log OCI.
1. Créez un stockage d'objets OCI et autorisez l'accès en lecture/écriture pour les logs OCI.
1. Créez une fonction OCI.
1. Configurez un événement OCI.

Les instructions ci-dessous utilisent le portail OCI pour configurer l'intégration.

#### Journalisation OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Logging -> Logs*.
1. Cliquez sur **Create Custom Log** pour être redirigé vers la page **Create Custom Log**.
1. Nommez votre nouveau log OCI.
1. Sélectionnez un **Compartment** et un **Log Group**. Ces sélections resteront inchangées tout au long de l'installation.
1. Cliquez sur **Create Custom Log** pour être redirigé vers la page **Create Agent Config**.
1. Cliquez sur **Create new configuration**.
1. Nommez votre nouvelle configuration. Votre compartiment est déjà sélectionné.
1. Définissez le type de groupe sur **Dynamic Group** et définissez le groupe sur l'un de vos groupes existants.
1. Définissez le type d'entrée sur **Log Path**, indiquez le nom d'entrée de votre choix et utilisez "/" pour les chemins d'accès des fichiers.
1. Après avoir cliqué sur **Create Custom Log**, votre log OCI est créé et devient disponible sur la page des logs.

Pour plus d'informations sur les logs OCI, consultez [Activation de la journalisation pour une ressource](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm).

#### Object Storage OCI

1. Depuis le portail OCI, accédez à *Core Infrastructure -> Object Storage -> Object Storage*.
1. Cliquez sur **Create Bucket** pour être redirigé vers le formulaire **Create Bucket**.
1. Définissez le niveau de stockage sur **Standard**, puis cochez **Emit Object Events**.
1. Complétez le reste du formulaire selon vos préférences.
1. Après avoir cliqué sur **Create Bucket**, votre compartiment est créé et devient disponible dans la liste des compartiments.
1. Sélectionnez votre nouveau compartiment dans la liste des compartiments actifs et cliquez sur **Logs** dans la section Resources.
1. Activez **read**, ce qui vous dirige vers un menu latéral **Enable Log**.
1. Sélectionnez le même **Compartment** et le même **Log Group** que pour votre log OCI.
1. Saisissez un nom via le champ **Log Name**, puis sélectionnez la rétention des logs de votre choix.

Pour plus d'informations sur OCI Object Storage, consultez [Stockage de données dans Object Storage](https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm).

#### Fonciton OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Developer Services -> Functions.*
1. Sélectionnez une application existante ou cliquez sur **Create Application**.
1. Créez une nouvelle fonction OCI dans votre application. Pour plus de détails, consultez [Présentation de Functions](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm).
1. Il est recommandé de créer d'abord une fonction Python générique et de remplacer les fichiers générés automatiquement par le code source de Datadog :
   - Remplacer `func.py` par le code du [référentiel OCI Datadog](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py)
   - Remplacer `func.yaml` par le code du [référentiel OCI Datadog](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml). `DATADOG_TOKEN` et `DATADOG_HOST` doivent être remplacés par votre clé d'API Datadog et le lien d'intake de logs de la région 
   - Remplacer `requirements.txt` par le code du [référentiel OCI Datadog](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt)

#### Événement OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Application Integration -> Event Service*.
1. Cliquez sur **Create Rule** pour être redirigé vers la page **Create Rule**.
1. Saisissez un nom et une description pour la règle de votre événement.
1. Définissez la condition sur **Event Type**, le nom de service sur **Object Storage**, et le type d'événement sur **Object - Create**.
1. Définissez votre type d'action sur **Functions**.
1. Assurez-vous que le compartiment de votre fonction correspond à celui que vous avez sélectionné pour le log OCI, le compartiment OCI et la fonction OCI.
1. Sélectionnez votre application de fonctions et votre fonction (conformément à l'étape d'installation précédente).
1. Après avoir cliqué sur **Create Rule**, votre règle est créée et devient disponible dans la liste des règles.

Pour plus d'informations sur OCI Object Storage, consultez [Introduction à Events](https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm).

{{% /tab %}}

{{< /tabs >}}

## Architecture

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

### Ressources de transfert de métriques et de logs

![Un diagramme des ressources de transfert de métriques et de logs OCI mentionnées pour cette option de configuration, illustrant le flux de données](images/oci_quickstart_infrastructure_diagram.png)

Pour chaque région surveillée, cette option de configuration crée l'infrastructure suivante dans cette région pour transférer les métriques et les logs vers Datadog :

- Application de fonctions (`dd-function-app`)
- Deux fonctions :
  - Redirecteur de métriques (`dd-metrics-forwarder`)
  - Redirecteur de logs (`dd-logs-forwarder`)
- VCN (`dd-vcn`) avec une infrastructure réseau sécurisée :
  - Sous-réseau privé (`dd-vcn-private-subnet`)
  - Passerelle NAT (`dd-vcn-natgateway`) pour l'accès externe à Internet
  - Passerelle de service (`dd-vcn-servicegateway`) pour l'accès interne aux services OCI
- Coffre-fort Key Management Service (KMS) (`datadog-vault`) pour stocker la clé d'API Datadog
- Compartiment **Datadog** dédié (`Datadog`)

Toutes les ressources sont taguées avec `ownedby = "datadog"`.

### Ressources IAM

![Un diagramme des ressources OCI IAM mentionnées pour cette option de configuration, illustrant le flux de données](images/oci_quickstart_iam_diagram.png)

Cette option de configuration crée les ressources IAM suivantes pour activer le transfert de données vers Datadog :

- Utilisateur de service (`dd-svc`)
- Groupe (`dd-svc-admin`) auquel appartient l'utilisateur de service
- Paire de clés RSA pour l'authentification à l'API
- Clé d'API OCI pour l'utilisateur de service
- Groupe dynamique (`dd-dynamic-group-connectorhubs`) qui inclut tous les connecteurs de service dans le compartiment Datadog
- Groupe dynamique (`dd-dynamic-group-function`) qui inclut toutes les fonctions dans le compartiment Datadog
- Stratégie (`dd-svc-policy`) pour accorder à l'utilisateur de service un accès en lecture aux ressources de la tenancy, ainsi que l'accès pour gérer les OCI Service Connector Hubs et les fonctions OCI dans le compartiment créé et géré par Datadog

{{% collapse-content title="Voir la stratégie" level="h6" %}}

```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment with specific permissions:
     * FN_FUNCTION_UPDATE
     * FN_FUNCTION_LIST
     * FN_APP_LIST
- Endorse dd-svc-admin to read objects in tenancy usage-report
```

{{% /collapse-content %}}

- Stratégie `dd-dynamic-group-policy` pour permettre aux connecteurs de service de lire les données (logs et métriques) et d'interagir avec les fonctions. Cette stratégie permet également aux fonctions de lire les secrets dans le compartiment Datadog (les clés d'API et d'application Datadog stockées dans le coffre-fort KMS)

{{% collapse-content title="Voir la stratégie" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
```

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Manual setup" %}}

### Ressources de transfert de métriques

![Un diagramme des ressources OCI mentionnées pour cette option de configuration, illustrant le flux de données](images/OCI_metrics_integration_diagram.png)

Cette option de configuration crée un [connector hub](https://docs.oracle.com/iaas/Content/connector-hub/home.htm) OCI, une [application de fonctions](https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications) et une infrastructure réseau sécurisée pour transférer les métriques OCI vers Datadog. La stack ORM pour ces ressources crée un référentiel de conteneurs de fonctions pour la région dans la tenancy, et l'image Docker y est envoyée pour être utilisée par la fonction.

### Ressources IAM

![Un diagramme des ressources OCI et du workflow utilisés pour l'authentification de l'intégration](images/OCI_auth_workflow_diagram.png)

Cette option de configuration crée :

- Groupe dynamique avec `resource.type = 'serviceconnectors'`, pour activer l'accès au connector hub
- Utilisateur nommé **DatadogROAuthUser**, utilisé par Datadog pour lire les ressources de la tenancy
- Groupe auquel l'utilisateur créé est ajouté pour l'accès aux stratégies
- Utilisateur nommé **DatadogAuthWriteUser**, utilisé pour envoyer des images Docker pour la fonction
- Groupe d'accès en écriture auquel `DatadogAuthWriteUser` est ajouté, pour l'envoi d'images via l'accès aux stratégies
- Stratégie dans le compartiment racine pour permettre aux connector hubs de lire les métriques et d'invoquer des fonctions. Cette stratégie accorde également au groupe d'utilisateurs créé un accès en lecture aux ressources de la tenancy et au groupe d'accès en écriture, pour l'envoi d'images

{{% collapse-content title="Voir la stratégie" level="h6" %}}

```text
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
Allow group Default/<WRITE_USER_GROUP_NAME> to manage repos in tenancy where ANY {request.permission = 'REPOSITORY_READ', request.permission = 'REPOSITORY_UPDATE', request.permission = 'REPOSITORY_CREATE'}
```

{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

## Données collectées

<!-- ### Metrics -->

<!-- Consultez [metadata.csv][12] pour découvrir la liste complète des métriques fournies par cette intégration. -->

### Métriques

Pour obtenir la liste détaillée des métriques, sélectionnez le service OCI approprié dans la [section des namespaces de métriques](#namespaces-de-metriques).

### Checks de service

L'intégration OCI ne comprend aucun check de service.

### Événements

L'intégration OCI ne comprend aucun événement.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller Oracle Cloud Infrastructure avec Datadog](https://www.datadoghq.com/blog/monitor-oci-with-datadog/)
- [Accélérer la surveillance d'Oracle Cloud Infrastructure avec Datadog OCI QuickStart](https://www.datadoghq.com/blog/datadog-oci-quickstart/)