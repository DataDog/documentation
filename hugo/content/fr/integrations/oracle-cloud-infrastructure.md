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
description: OCI est une collection de services cloud conçus pour prendre en charge
  une gamme d'applications dans un environnement hébergé.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: blog
  text: Surveillez Oracle Cloud Infrastructure avec Datadog
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: blog
  text: Accélérez la surveillance d'Oracle Cloud Infrastructure avec Datadog OCI QuickStart
integration_version: 1.1.1
media: []
title: Oracle Cloud Infrastructure
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

Oracle Cloud Infrastructure (OCI) est une infrastructure en tant que service (IaaS) et une plateforme en tant que service (PaaS) utilisées par des entreprises à grande échelle. Il comprend une suite complète de plus de 30 services gérés pour l'hébergement, le stockage, la mise en réseau, les bases de données, et plus encore.

Utilisez l'intégration OCI de Datadog pour obtenir une visibilité complète sur votre environnement OCI grâce aux métriques, aux logs et aux données de ressources. Ces données vous permettent d'alimenter des tableaux de bord, facilitent le dépannage et peuvent être surveillées pour la sécurité et la conformité.

## Configuration {#setup}

Datadog recommande d'utiliser la méthode de configuration QuickStart. Si nécessaire, vous pouvez également configurer l'intégration à l'aide de [Terraform](#oci-terraform-setup).

### Collecte de données {#data-collection}

#### Considérations {#considerations}

- La collecte des logs, des métriques, des données de ressources et des événements est activée par défaut. Vous pouvez désactiver la collecte des logs ou des événements lors de la configuration. Une fois la configuration terminée, vous pouvez modifier la collecte des données de ressources, la collecte des événements et les services individuels de logs ou de métriques depuis la [tuile d'intégration Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).
- Toutes les régions commerciales OCI (dans le domaine OC1) existantes au 1er janvier 2026 sont prises en charge. Les régions OCI ajoutées après cette date ne sont pas prises en charge.
- L'intégration Datadog OCI est limitée à une intégration par tenant. Si vous avez configuré l'intégration avant juin 2025, vous avez suivi la configuration manuelle ; toutes les piles de déploiement d'intégration Datadog OCI résultantes doivent être supprimées avant d'utiliser la méthode de configuration OCI QuickStart. Si vous avez configuré manuellement le transfert de logs et que vous choisissez d'activer la collecte de logs dans la tuile OCI QuickStart, vous devez également supprimer vos ressources de transfert de logs existantes pour éviter d'envoyer les logs deux fois. Consultez la section [manuel de migration QuickStart](#oci-integration-manual-to-quickstart-migration) de cette page pour plus d'informations.

{{% collapse-content title="QuickStart (recommandé)" level="h4" %}}

L'OCI QuickStart de Datadog est une expérience de configuration à flux unique entièrement gérée qui vous aide à surveiller votre infrastructure et vos applications OCI en quelques clics. OCI QuickStart crée l'infrastructure nécessaire pour transférer les métriques, les logs et les données de ressources vers Datadog, et découvre automatiquement les nouvelles ressources ou les compartiments OCI pour la collecte de données.

#### Choisissez la configuration QuickStart si... {#choose-quickstart-setup-if}

- Vous configurez l'intégration OCI pour la première fois.
- Vous préférez un workflow basé sur l'interface utilisateur et souhaitez minimiser le temps nécessaire pour créer et configurer les ressources nécessaires.
- Vous souhaitez automatiser les étapes de configuration dans des scripts ou des pipelines CI/CD.

#### Prérequis de la configuration QuickStart {#quickstart-setup-prerequisites}

- Votre compte utilisateur OCI doit disposer du rôle **Administrateur de domaine d'identité** pour effectuer ces étapes.
- Vous devez être connecté à OCI dans le tenant avec lequel vous souhaitez effectuer l'intégration.
- Vous devez être connecté à OCI avec le Home Region sélectionné en haut à droite de l'écran.
- Votre compte utilisateur OCI doit être en mesure de créer un utilisateur, un groupe d'utilisateurs et un groupe dynamique dans le domaine d'identité auquel vous êtes connecté, ou dans le domaine cible si spécifié. Si vous fournissez un OCID de domaine cible, votre compte utilisateur OCI doit disposer de privilèges d'administrateur dans ce domaine.
- Votre compte utilisateur OCI doit être en mesure de créer des politiques dans le compartiment racine.

#### Instructions de configuration QuickStart {#quickstart-setup-instructions}

Pour configurer l'infrastructure de transfert de logs et de métriques vers Datadog :

- [Configurer la tuile d'intégration Datadog OCI](#configure-the-datadog-oci-integration-tile)
- [Déployer la pile ORM QuickStart](#deploy-the-quickstart-orm-stack)
- [Terminez la configuration dans Datadog](#complete-the-setup-in-datadog)
- [Validez que les métriques circulent](#validation)
- [Configurez la collecte des métriques ou des logs (facultatif)](#configuration)
- [Configurez la collecte des ressources (facultatif)](#resource-collection)

L'intégration nécessite l'utilisation d'Oracle Service Connector Hubs pour transférer les données vers Datadog. Il est recommandé de [demander une augmentation de la limite de service](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti) avant de terminer la configuration. Le nombre approximatif de Service Connector Hubs dont vous avez besoin est :

$$\\\\text\"Service Connector Hubs\" = \\\\text\"Nombre de compartiments dans le tenant\" / \\\\text\"5\"$$

##### Configurez la tuile d'intégration Datadog OCI {#configure-the-datadog-oci-integration-tile}

1. Accédez à la [tuile d'intégration Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) et cliquez sur **Ajouter un nouveau tenant**.

1. Sélectionnez ou créez une clé d'API Datadog à utiliser pour l'intégration.

1. Créez une clé d'application Datadog.

1. Activez ou désactivez les logs à l'aide du bouton bascule.

1. Activez ou désactivez la collecte d'événements à l'aide du bouton bascule.

1. Cliquez sur **Créer une pile OCI**. Cela vous redirige vers une pile Oracle Resource Manager (ORM) pour terminer le déploiement.<br />
   **Remarque** : Déployez cette pile une seule fois par tenant.

##### Déployez la pile ORM QuickStart {#deploy-the-quickstart-orm-stack}

1. Acceptez les conditions d'utilisation d'Oracle.

1. Laissez l'option d'utilisation de fournisseurs Terraform personnalisés décochée.

1. Utilisez le répertoire de travail par défaut pour déployer la pile, ou choisissez-en un autre en option.

1. Cliquez sur **Suivant**.

1. Datadog recommande de laisser la section `(Optional) Choose specific subnet(s)` vide pour créer un nouveau réseau cloud virtuel (VCN) et un sous-réseau dans chaque région de ce tenant.

   **Facultativement**, vous pouvez choisir des sous-réseaux existants (un maximum par région OCI) pour la pile Datadog QuickStart, auquel cas vous devez fournir à la pile les OCID des sous-réseaux. Entrez un OCID par ligne, sans virgules. La pile Datadog QuickStart est ensuite déployée dans la région correspondant à chaque sous-réseau. Chaque OCID de sous-réseau doit être au format : `ocid1.subnet.oc[0-9].*`. Par exemple, `ocid1.subnet.oc1.iad.abcedfgh`.<br />
   **Remarque** : Si vous utilisez un VCN et des sous-réseaux existants, assurez-vous que le VCN dans chaque région :

   - Est autorisé à effectuer des appels de sortie HTTP via une passerelle NAT.
   - Dispose d'une passerelle de service qui prend en charge « All Services In Oracle Services Network ».
   - Possède les règles de table de routage pour autoriser la passerelle NAT et la passerelle de service.
   - Possède les règles de sécurité pour envoyer des requêtes HTTP.

1. Datadog recommande de laisser la section `(Optional) Choose a User` vide pour créer un nouvel utilisateur et un nouveau groupe. Le groupe et l'utilisateur sont créés dans le domaine d'identité OCI auquel vous êtes actuellement connecté (qui n'a pas besoin d'être le domaine par défaut).<br />
   **Facultativement**, vous pouvez choisir un utilisateur et un groupe existants pour la pile Datadog QuickStart. Dans ce cas, Datadog déduit automatiquement le domaine de l'utilisateur et du groupe, et l'utilise pour créer des groupes dynamiques.<br />
   a. **ID de groupe** : Fournissez l'OCID d'un groupe OCI existant pour l'authentification Datadog. S'il est fourni, l'**ID utilisateur** ne peut pas être laissé vide.<br />
   b. **ID utilisateur** : Fournissez l'OCID d'un utilisateur OCI existant pour l'authentification Datadog. L'utilisateur doit être membre du groupe spécifié. S'il est fourni, **l'ID de groupe** ne peut pas être laissé vide.

1. Datadog recommande de laisser la section `(Optional) Advanced configuration` vide car ces cas d'utilisation sont rares.<br />
   **Facultativement**, vous pouvez choisir un compartiment et un domaine existants pour la pile Datadog QuickStart.<br />
   a. **Compartiment** : Choisissez un compartiment existant pour placer toutes les ressources créées par Datadog.<br />
   b. **Domaine** : Fournissez l'OCID d'un domaine d'identité existant pour remplacer l'emplacement où l'utilisateur et le groupe sont créés. Ce champ n'est affiché que si un utilisateur et un groupe existants ne sont pas spécifiés à l'étape 6. S'il est fourni, **l'adresse e-mail de l'utilisateur** ne peut pas être laissée vide. **Remarque** : Votre compte utilisateur OCI doit disposer du rôle **Administrateur de domaine d'identité** dans le domaine cible.<br />
   c. **Tag de ressource** : Fournissez une liste de balises définies à ajouter à toutes les ressources OCI déployées par la pile Datadog QuickStart. Saisissez une étiquette par ligne. N'ajoutez pas de virgules. Chaque étiquette définie doit être au format : `namespace.key:value`. Par exemple, `CostCenter.Environment:prod`. Si ce champ est laissé vide, aucune tag définie n'est ajoutée aux ressources OCI déployées par la pile Datadog QuickStart.<br />

1. Cliquez sur **Suivant**.

1. Cliquez sur **Créer** et attendez jusqu'à 30 minutes que le déploiement se termine.

##### Terminez la configuration dans Datadog {#complete-the-setup-in-datadog}

Retournez sur la [tuile d'intégration Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) et cliquez sur **Ready!**

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" id="oci-terraform-setup" %}}

#### Choisissez la configuration Terraform si... {#choose-terraform-setup-if}

- Vous gérez l'infrastructure en tant que code et souhaitez conserver l'intégration Datadog OCI sous contrôle de version.
- Vous devez configurer plusieurs dossiers ou projets de manière cohérente avec des blocs provider réutilisables.
- Vous souhaitez un processus de déploiement reproductible et auditable qui s'intègre dans votre environnement géré par Terraform.

Vous pouvez utiliser Terraform pour provisionner l'intégration Datadog OCI. Ce guide répertorie les prérequis, les variables requises et les étapes exactes pour initialiser, planifier et appliquer.

#### Prérequis de configuration Terraform {#terraform-setup-prerequisites}

Disposez des éléments suivants avant de commencer :

- Terraform 1.x installé.
- Une [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys) valide.
- Accès OCI avec le rôle d'administrateur de domaine d'identité sur le domaine cible.

#### Instructions de configuration Terraform {#terraform-setup-instructions}

Pour configurer l'infrastructure de transfert de log et de métriques vers Datadog :

- [Créer un fichier de configuration OCI](#create-an-oci-configuration-file)
- [Configurer le module Terraform](#configure-the-terraform-module)
- [Déployer avec Terraform](#deploy-with-terraform)
- [Valider que les métriques circulent](#validation)
- [Configurer la collecte de métriques ou de log (facultatif)](#configuration)
- [Configurer la collecte de ressources (facultatif)](#resource-collection)

##### Créer un fichier de configuration OCI {#create-an-oci-configuration-file}

Le fichier `~/.oci/config` accorde à Terraform les autorisations nécessaires pour créer des ressources dans OCI. [Créez une clé d'API](https://cloud.oracle.com/identity/domains/my-profile/auth-tokens) et ajoutez-la à votre configuration, ou suivez la [documentation Oracle](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm). Votre fichier devrait ressembler à ceci :

```ini
[DEFAULT]
user=<USER_OCID>
fingerprint=<USER_FINGERPRINT>
tenancy=<TENANCY_OCID>
region=<HOME_REGION>
key_file=<PATH_TO_PRIVATE_KEY_FILE>
```

##### Configurez le module Terraform {#configure-the-terraform-module}

Les entrées suivantes configurent le module d'intégration Datadog OCI. Les champs obligatoires sont indiqués. Pour obtenir la liste complète des options de configuration disponibles, consultez la [page d'ajout de tenancy](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure/add).

###### 1. Ajoutez une clé d'API Datadog. {#1-add-a-datadog-api-key}

Cliquez sur **Sélectionner une clé d'API** et sélectionnez une clé d'API à utiliser.

###### 2. Créez une clé d'application Datadog. {#2-create-a-datadog-application-key}

Cliquez sur **Créer** ; une clé d'application est générée et ajoutée au champ. Assurez-vous de copier cette valeur et de l'enregistrer dans un emplacement sécurisé, car elle ne pourra plus être consultée après avoir quitté cet écran.

###### 3. Ajoutez votre OCID de tenancy OCI. {#3-add-your-oci-tenancy-ocid}

1. Saisissez l'OCID de la tenancy à surveiller par Datadog. Vous le trouverez sur [cloud.oracle.com/tenancy](https://cloud.oracle.com/tenancy).
1. Optionnellement, choisissez un compartiment OCI et des sous-réseaux spécifiques. Datadog recommande de laisser cette section vide pour créer un nouveau compartiment OCI et un OCI Virtual Cloud Network (VCN) dans chaque région de la tenancy.

###### 4. Ajoutez votre OCID d'utilisateur OCI. {#4-add-your-oci-user-ocid}

Saisissez votre OCID d'utilisateur. Cet utilisateur doit disposer du rôle Administrateur de domaine d'identité. Trouvez-le sur [cloud.oracle.com/identity/domains/my-profile](https://cloud.oracle.com/identity/domains/my-profile).

###### 5. Configurez la collecte des logs (facultatif). {#5-configure-log-collection-optional}

Pour désactiver toute collecte de log depuis la tenancy, cliquez sur le bouton bascule. Si vous souhaitez désactiver la collecte de log pour des services OCI spécifiques, modifiez la configuration après l'installation dans la [tuile d'intégration Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

###### 6. Configurez la collecte des événements (facultatif). {#6-configure-event-collection-optional}

Pour désactiver toute collecte d'événements depuis la tenancy, cliquez sur le bouton bascule. Pour désactiver la collecte d'événements après l'installation, modifiez la configuration dans la [tuile d'intégration Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

###### 7. Confirmez les détails de configuration du module Terraform généré. {#7-confirm-the-configuration-details-of-the-generated-terraform-module}

Le module Terraform généré doit suivre le format indiqué ci-dessous :

```hcl
module "datadog_oci" {
  source = "github.com/DataDog/oracle-cloud-integration//datadog-terraform-onboarding"

  datadog_api_key = <API_KEY>
  datadog_app_key = <APP_KEY>
  datadog_site    = <DATADOG_SITE>

  tenancy_ocid      = "<TENANCY_OCID>"
  current_user_ocid = "<CURRENT_USER_OCID>"

  logs_enabled              = true
  events_collection_enabled = true
}
```

#### Déployer avec Terraform {#deploy-with-terraform}

1. Copiez le module Terraform généré et collez-le dans un fichier `.tf`.
1. Exécutez `terraform init && terraform apply` pour initialiser Terraform et créer l'intégration. Si vous souhaitez prévisualiser les modifications, remplacez `plan` par `apply`.

#### Dépannage {#troubleshooting}

##### Délais d'attente {#timeouts}

Relancez la commande Terraform sans modifier la configuration.

##### Conflits de fournisseur {#provider-conflicts}

Si vous rencontrez des conflits de provider avec la commande `terraform init`, mettez à jour votre configuration de provider locale pour qu'elle corresponde aux versions requises par le module.

##### Avertissements dans Datadog immédiatement après la configuration {#warnings-in-datadog-immediately-after-setup}

Prévoyez jusqu'à 15 minutes pour que les avertissements disparaissent.

{{% /collapse-content %}}

#### Validation {#validation}

Affichez les `oci.*`métriques dans le [tableau de bord de présentation de l'intégration OCI](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) ou sur la [page Metrics Explorer](https://app.datadoghq.com/metric/explorer) dans Datadog.

<div class="alert alert-warning">Métriques de fonction OCI (<code>oci.faas</code> namespace) et container instance métriques (<code>oci_computecontainerinstance</code> namespace) sont en préversion.</div>

### Configuration {#configuration}

![L'onglet de configuration d'une tenancy OCI dans Datadog](images/oci_configuration_tab_2026-02-25.png)

Une fois la configuration terminée, un onglet de configuration pour la tenancy devient disponible sur le côté gauche de la [tuile d'intégration OCI de Datadog](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure). Appliquez les configurations de collecte de données à l'échelle de la tenancy comme indiqué dans les sections ci-dessous.

#### Ajouter des régions {#add-regions}

Dans l'onglet **Général**, sélectionnez les régions pour la collecte de données dans la liste à cocher **Régions**. Les sélections de régions s'appliquent à l'ensemble de la location (tenancy), pour les métriques comme pour les logs.

**Remarque** : Si vous avez utilisé la méthode de configuration QuickStart et que vous vous êtes abonné par la suite à une nouvelle région OCI, réappliquez la pile de configuration initiale dans ORM. La nouvelle région devient alors disponible dans la tuile OCI de Datadog.

#### Collecte de métriques et de logs {#metric-and-log-collection}

Utilisez les onglets **Metric collection** et **Log collection** pour configurer les métriques et les logs envoyés à Datadog:

##### Activer ou désactiver toute collecte de métriques ou de logs depuis une location (tenancy) {#enable-or-disable-all-metric-or-log-collection-from-a-tenancy}

Les onglets Metric collection et Log collection disposent tous deux d'un bouton bascule principal que vous pouvez utiliser pour désactiver la collecte de ce type de données pour l'ensemble de la tenancy. Si vous collectez un type de données donné pour la location (tenancy), vous pouvez utiliser les sections ci-dessous pour mettre en œuvre un filtrage granulaire par [service](#limit-metric-or-log-collection-to-specific-oci-services), [compartiment](#limit-metric-or-log-collection-by-compartment) et [ressources spécifiques](#limit-metric-or-log-collection-to-specific-resources).

**Remarque** : Les filtres sont évalués dans l'ordre : **Selected Services** sert de bouton bascule principal pour la collecte de données d'un service, puis les filtres de tag compartment sont appliqués, et enfin les filtres de tag specific resources.

##### Limitez la collecte de métriques ou de logs à des services OCI spécifiques {#limit-metric-or-log-collection-to-specific-oci-services}

Utilisez la section **Services sélectionnés** pour activer ou désactiver la collecte à partir de services OCI individuels. La désactivation d'un service arrête toute collecte à partir de celui-ci, indépendamment des filtres de tag resource configurés pour ce service. Lorsqu'un service est activé, les filtres de tag de ressource peuvent restreindre davantage la collecte à des ressources spécifiques au sein de ce service — les ressources sans tag d'inclusion correspondant sont exclues.

**Remarque** : après avoir modifié des tags dans OCI, il peut s'écouler jusqu'à 15 minutes avant que les changements n'apparaissent dans Datadog. Les changements de bascule de service peuvent prendre jusqu'à 5 minutes pour prendre effet.

{{% collapse-content title="Syntaxe des filtres de tag" level="h6" id="tag-filter-syntax" %}}

Les sections **Tags de compartiment** et **Limiter la collecte à des ressources spécifiques** acceptent toutes deux des `key:value` tags OCI séparés par des virgules. Préfixez un tag avec `!` pour l'inverser. Le séparateur virgule se comporte différemment selon les types de tags utilisés :

- **Tags positifs uniquement** : logique OU — inclus si l'objet OCI (compartiment ou ressource spécifique) possède **l'un** des tags listés.
- **Tags négatifs uniquement** (préfixés par `!`) : logique OU — exclu si **l'un** des tags négatifs est présent.
- **Tags positifs et négatifs mixtes** : logique ET — doit satisfaire **toutes** les conditions listées pour être inclus.

Exemple :

- `datadog:monitored,env:prod*` : inclure si **l'un ou l'autre** des tags est présent.
- `!env:staging,!testing:true` : exclure si **l'une ou l'autre** tag est présente.
- `datadog:monitored,!region:us-phoenix-1` : inclure uniquement si la tag `datadog:monitored` est présente **et** que la balise `region:us-phoenix-1` est absente.

**Format de clé de tag** : Datadog normalise les clés de tag OCI en minuscules `snake_case` avant d'effectuer la correspondance. Les clés définies dans OCI en camelCase ou PascalCase (par exemple, `deploymentType` ou `DeploymentType`) sont stockées et mises en correspondance sous leur équivalent en minuscules snake_case (`deployment_type`). Utilisez des minuscules `snake_case` lors de la spécification des filtres de tag dans la tuile d'intégration.

{{% /collapse-content %}}

##### Limitez la collecte de métriques ou de logs par compartiment {#limit-metric-or-log-collection-by-compartment}

Utilisez la section **Compartment Tags** pour inclure ou exclure des compartiments spécifiques en fonction des balises de compartiment OCI. Consultez [Tag filter syntax](#tag-filter-syntax) pour obtenir une référence sur la syntaxe.

**Remarque** : Dans OCI, les tags ne sont pas héritées par les compartiments enfants ; chaque compartiment doit être balisé individuellement.

##### Limiter la collecte de métriques ou de log à des ressources spécifiques {#limit-metric-or-log-collection-to-specific-resources}

Utilisez la section **Limit Collection to Specific Resources** pour définir quelles ressources doivent envoyer leurs métriques ou logs à Datadog. Sélectionnez le service OCI dans la liste déroulante, puis spécifiez les tags de ressource à cibler pour la collecte de données. Consultez [Tag filter syntax](#tag-filter-syntax) pour obtenir une référence sur la syntaxe.

{{% collapse-content title="Voir la liste complète des espaces de noms de métriques" level="h4" id="oci-metric-namespaces" %}}

| Intégration                         | Espace de noms de métriques                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/fr/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/fr/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/fr/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Cloud Events](https://docs.datadoghq.com/fr/integrations/oci_cloudevents/)                       | [oci_cloudevents](https://docs.oracle.com/en-us/iaas/Content/Events/Reference/eventsmetrics.htm)                                                                                                                   |
| [Compute](https://docs.datadoghq.com/fr/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Container Instances (Preview)](https://docs.datadoghq.com/fr/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Database](https://docs.datadoghq.com/fr/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/fr/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite (EBS)](https://docs.datadoghq.com/fr/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/fr/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/fr/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Functions (Preview)](https://docs.datadoghq.com/fr/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/fr/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/fr/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/fr/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Instance Pools](https://docs.datadoghq.com/fr/integrations/oci-instancepools/)                | [oci_instancepools](https://docs.oracle.com/en-us/iaas/Content/Compute/References/instancepoolmetrics.htm)                                                                                                                 |
| [Internet Gateway](https://docs.datadoghq.com/fr/integrations/oci-internet-gateway/)                | [oci_internet_gateway](https://docs.oracle.com/en-us/iaas/Content/Network/Reference/IGWmetrics.htm)                                                                                                                 |
| [Kafka](https://docs.datadoghq.com/fr/integrations/oci-kafka/)                          | [oci_kafka](https://docs.oracle.com/en-us/iaas/Content/kafka/metrics.htm)                                                                                                                          |
| [Kubernetes Engine](https://docs.datadoghq.com/fr/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Load Balancer](https://docs.datadoghq.com/fr/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/fr/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [NAT Gateway](https://docs.datadoghq.com/fr/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/fr/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [NoSQL Table](https://docs.datadoghq.com/fr/integrations/oci-nosqltable/)                        | [oci_nosql](https://docs.oracle.com/en/cloud/paas/nosql-cloud/mgygg)                                                                                                                         |
| [Object Storage](https://docs.datadoghq.com/fr/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [Oracle Fusion](https://docs.datadoghq.com/fr/integrations/oracle-fusion/)                      | [oci_fusion](https://docs.oracle.com/en-us/iaas/Content/fusion-applications/metrics.htm)                                                                                                                        |
| [Oracle Integration (OIC)](https://docs.datadoghq.com/fr/integrations/oci-integration/)                | [oci_integration](https://docs.oracle.com/en-us/iaas/application-integration/doc/modify-charts-and-create-custom-charts.html)                                                                                                                 |
| [PostgreSQL](https://docs.datadoghq.com/fr/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Queue](https://docs.datadoghq.com/fr/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Recovery Service](https://docs.datadoghq.com/fr/integrations/oci-recovery-service/)                   | [oci_recovery_service](https://docs.oracle.com/iaas/recovery-service/doc/available-recovery-service-metrics.html)                                                                                                              |
| [Secrets](https://docs.datadoghq.com/fr/integrations/oci-secrets/)                            | [oci_secrets](https://docs.oracle.com/iaas/Content/KeyManagement/Reference/keymgmtmetrics.htm)                                                                                                                       |
| [Service Connector Hub](https://docs.datadoghq.com/fr/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Service Gateway](https://docs.datadoghq.com/fr/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [Stack Monitoring](https://docs.datadoghq.com/fr/integrations/oci-stack-monitoring/)                  | [oci_stack_monitoring](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                                 |
| [VCN](https://docs.datadoghq.com/fr/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [Visual Builder](https://docs.datadoghq.com/fr/integrations/oci_visual_builder/)               | [oci_visual_builder](https://docs.oracle.com/en-us/iaas/visual-builder/doc/view-instance-metrics.html)                                                                                                                |
| [VPN](https://docs.datadoghq.com/fr/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Web Application Firewall](https://docs.datadoghq.com/fr/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### Resource Collection {#resource-collection}

Dans l'onglet **Resource Collection** de la [Datadog OCI integration tile](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), cliquez sur l'interrupteur **Enable Resource Collection**. Les ressources sont visibles dans le [Datadog Resource Catalog](https://docs.datadoghq.com/fr/infrastructure/resource_catalog/).

La collecte d'événements est activée par défaut lorsque vous configurez l'intégration. Si vous avez configuré l'intégration OCI avant que la collecte d'événements Datadog ne soit disponible, cliquez sur l'interrupteur **Enable Resource Changes Collection** dans l'onglet **Resource Collection**. Cet interrupteur contrôle la collecte de tous les événements OCI, et pas seulement des événements de modification de ressources. Les événements OCI apparaissent dans l'[Events Explorer](/event/explorer?query=source%3Aoci_events_service) et peuvent être filtrés par `source:oci_events_service`.

## Mettre à jour l'intégration {#update-the-integration}

Lorsque Datadog publie des correctifs de bugs, des correctifs de sécurité ou de nouvelles fonctionnalités nécessitant de nouvelles ressources OCI ou des politiques IAM, réappliquez votre déploiement d'intégration pour provisionner l'infrastructure mise à jour.

**Remarque** : Les variables `logs_enabled` et `events_collection_enabled` dans la pile ORM ou la configuration Terraform ne sont utilisées que lors de la configuration initiale. Lors des applications ultérieures, ces valeurs sont ignorées. La tuile d'intégration Datadog est la source de vérité pour votre configuration de collecte de données. La réapplication de la pile ne remplace aucun paramètre de collecte de log, de métriques ou d'événements que vous avez configuré dans Datadog.

{{% collapse-content title="Démarrage rapide (pile ORM)" level="h3" %}}

**Prérequis** : Avant d'appliquer la mise à jour, vérifiez que la [clé d'application Datadog](https://app.datadoghq.com/organization-settings/application-keys) configurée dans votre pile OCI est toujours valide. Si la clé a expiré ou a été révoquée, la tâche de destruction échoue. Pour mettre à jour la clé, modifiez les variables de pile `datadog_app_key` dans la console OCI et fournissez une clé d'application valide avant de continuer.

Exécutez les commandes suivantes depuis [OCI Cloud Shell](https://cloud.oracle.com/resourcemanager/stacks?cloudshell=true) pour mettre à jour votre pile vers la dernière version et appliquer les modifications :

```shell
curl -fL -o datadog-integration.zip \
  "https://github.com/DataDog/oracle-cloud-integration/releases/latest/download/datadog-integration.zip"

export STACK_ID="<YOUR_STACK_OCID>"
export OCI_CLI_REGION="<YOUR_HOME_OR_STACK_REGION>"

oci resource-manager stack update \
  --stack-id "$STACK_ID" \
  --config-source datadog-integration.zip \
  --region "$OCI_CLI_REGION" \
  --force

oci resource-manager job create-apply-job \
  --stack-id "$STACK_ID" \
  --execution-plan-strategy AUTO_APPROVED \
  --region "$OCI_CLI_REGION" \
  --wait-for-state SUCCEEDED
```

Remplacez les valeurs d'espace réservé :

- `<YOUR_STACK_OCID>` : L'OCID de votre pile ORM Datadog. Trouvez-le sur [cloud.oracle.com/resourcemanager/stacks](https://cloud.oracle.com/resourcemanager/stacks).
- `<YOUR_HOME_OR_STACK_REGION>` : La région d'origine de votre location (par ex. us-ashburn-1).

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**Prérequis** : Avant de réappliquer Terraform, vérifiez que la variable `datadog_app_key` dans votre configuration Terraform contient une [clé d'application Datadog](https://app.datadoghq.com/organization-settings/application-keys) valide. Si la clé a expiré ou a été révoquée, la commande de destruction échoue. Mettez à jour la valeur dans votre fichier `.tf` ou via un fichier `terraform.tfvars` avant de continuer.

Relancez Terraform pour initialiser le module mis à jour et appliquer les dernières modifications :

```shell
terraform init -upgrade && terraform apply
```

Optionnellement, exécutez `terraform plan` avant `apply` pour prévisualiser les modifications.

{{% /collapse-content %}}

## Uninstalling the integration {#uninstalling-the-integration}

Pour désinstaller l'intégration Datadog OCI, supprimez les ressources d'intégration à la fois dans Datadog et dans OCI :

### Dans Datadog {#in-datadog}

Dans la [Datadog OCI integration tile](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), cliquez sur **Delete Configuration**. À ce stade, les métriques et les logs ne sont plus collectés.

![Delete OCI integration configuration in Datadog](images/oci_delete_configuration_2025-11-17.png)

### Dans OCI {#in-oci}

**Prérequis** : Terminez l'étape [Dans Datadog](#in-datadog) ci-dessus avant de nettoyer les ressources OCI. La suppression préalable de la configuration Datadog garantit que les ressources gérées par le backend Datadog sont supprimées en premier.

{{% collapse-content title="QuickStart (ORM stack)" level="h3" %}}

**Prérequis** : Avant d'exécuter la tâche de destruction, vérifiez que la clé d'application Datadog configurée dans votre pile OCI est toujours valide. Si la clé a expiré ou a été révoquée, la tâche de destruction échoue. Pour mettre à jour la clé, modifiez les variables de pile dans la console OCI et fournissez une clé d'application valide avant de continuer.

1. Accédez à Oracle Resource Manager (ORM) dans la console OCI.

1. Localisez la pile Datadog QuickStart qui a été créée lors de l'installation. Par défaut, la pile est étiquetée comme `datadog-integration.zip-<NUMBER>`, mais elle pourrait avoir été configurée avec un nom personnalisé lors du déploiement.

1. Exécutez une tâche `Destroy` sur la pile pour supprimer toutes les ressources créées par l'intégration dans toutes les régions.

   ![Supprimer les stacks d'intégration Datadog dans OCI](images/oci_destroy_stack.png)

1. **Facultatif**, supprimez la stack OCI Datadog une fois la destruction terminée.

**Remarque** : L'exécution de la tâche de suppression une fois sur la stack QuickStart nettoie automatiquement toutes les ressources dans toutes les régions où l'intégration a été déployée.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**Prérequis** : Avant d'exécuter la commande de suppression, vérifiez que la variable `datadog_app_key` dans votre configuration Terraform contient une [clé d'application Datadog](https://app.datadoghq.com/organization-settings/application-keys) valide. Si la clé a expiré ou a été révoquée, la commande de suppression échoue. Mettez à jour la valeur dans votre fichier `.tf` ou via un fichier `terraform.tfvars` avant de continuer.

Assurez-vous que le profil `DEFAULT` dans `~/.oci/config` dispose des identifiants utilisateur pour gérer les ressources dans la location correspondante, puis exécutez :

```shell
terraform destroy
```

{{% /collapse-content %}}

## Migration du manuel d'intégration OCI vers QuickStart {#oci-integration-manual-to-quickstart-migration}

### Pourquoi dois-je migrer ? {#why-do-i-need-to-migrate}

L'intégration Datadog OCI est limitée à une intégration par location. Si vous aviez configuré l'intégration avant juin 2025, vous avez suivi la configuration manuelle, et toutes les stacks de déploiement d'intégration Datadog OCI précédentes doivent être supprimées avant d'utiliser la méthode de configuration OCI QuickStart. Si vous avez configuré manuellement le transfert de logs et que vous choisissez d'activer la collecte de logs dans la tuile OCI QuickStart, vous devez également supprimer vos ressources de transfert de logs pour éviter d'envoyer les logs deux fois.

**Remarque** : Il y aura une interruption dans la collecte des métriques et des logs entre le moment où l'intégration manuelle est supprimée et celui où le déploiement QuickStart est terminé.

### Comment migrer {#how-to-migrate}

Supprimez les ressources d'intégration précédentes dans Datadog et OCI :

#### Dans Datadog {#in-datadog-1}

Dans la [tuile d'intégration Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), cliquez sur **Supprimer la configuration**. À ce stade, les métriques et les logs ne sont plus collectés.

![Supprimer la configuration de l'intégration OCI dans Datadog](images/oci_delete_configuration_2025-11-17.png)

#### Dans OCI {#in-oci-1}

**Prérequis** : avant d'exécuter le job de destruction, vérifiez que la clé d'application Datadog configurée dans vos stacks OCI est toujours valide. Si la clé a expiré ou a été révoquée, le job de destruction échoue. Pour mettre à jour la clé, modifiez les variables de la stack dans la console OCI et fournissez une clé d'application valide avant de continuer.

Effectuez les étapes suivantes pour **chaque région** dans laquelle l'intégration manuelle a été précédemment déployée :

1. Exécutez un job `Destroy` sur la stack de transfert de métriques Datadog OCI, afin de supprimer toutes les ressources créées par la stack. Par défaut, la stack est étiquetée `datadog-oci-orm-metrics-setup.zip-<NUMBER>`, mais elle a pu être configurée avec une valeur personnalisée lors du déploiement.

1. Exécutez un job `Destroy` sur la stack de politique Datadog OCI. Par défaut, la stack est étiquetée `datadog-oci-orm-policy-setup.zip-<NUMBER>`, mais elle a pu être configurée avec une valeur personnalisée lors du déploiement.

   ![Supprimer les stacks d'intégration Datadog dans OCI](images/oci_destroy_stack.png)

1. **Facultatif**, supprimez les stacks Datadog OCI une fois la destruction terminée.

1. Si vous avez configuré la collecte de log, supprimez l'application, la fonction et le hub de connecteur de service Datadog OCI.

   ![Supprimer logconnector dans OCI](images/oci_delete_logconnector.png)

Vous êtes maintenant prêt à déployer OCI QuickStart avec les [instructions de configuration QuickStart](#quickstart-setup-instructions) et à reprendre la collecte de données. Le déploiement d'OCI QuickStart peut prendre jusqu'à 30 minutes.

## Architecture {#architecture}

### Ressources de transfert de logs et de métriques{#metric-and-log-forwarding-resources}

![Un diagramme des ressources de transfert de log et de métriques OCI mentionnées pour cette option de configuration et affichant le flux de données](images/oci_quickstart_infrastructure_diagram.png)

Pour chaque région surveillée, cette option de configuration crée l'infrastructure suivante au sein de cette région afin de transférer les métriques et les logs vers Datadog:

- Application de fonction (`dd-function-app`)
- Deux fonctions :
  - Transféreur de métriques (`dd-metrics-forwarder`)
  - Forwarder de logs (`dd-logs-forwarder`)
- VCN (`dd-vcn`) avec une infrastructure réseau sécurisée :
  - Sous-réseau privé (`dd-vcn-private-subnet`)
  - Passerelle NAT (`dd-vcn-natgateway`) pour un accès externe à Internet
  - Passerelle de service (`dd-vcn-servicegateway`) pour un accès interne aux services OCI
- Coffre-fort du service de gestion des clés (KMS) (`datadog-vault`) pour stocker la clé d'API Datadog
- Compartiment **Datadog** dédié (`Datadog`)

Toutes les ressources sont marquées avec `ownedby = "datadog"`.

### Ressources IAM {#iam-resources}

![Un diagramme des ressources IAM OCI mentionnées pour cette option de configuration et affichant le flux de données](images/oci_quickstart_iam_diagram.png)

Cette option de configuration crée les ressources IAM suivantes pour permettre le transfert de données vers Datadog:

- Utilisateur de service (`dd-svc`).
- Groupe (`dd-svc-admin`) auquel appartient l'utilisateur de service.
- Paire de clés RSA pour l'authentification API.
- Clé d'API OCI pour l'utilisateur de service.
- Groupe dynamique (`dd-dynamic-group-connectorhubs`) qui inclut tous les connecteurs de service dans le compartiment Datadog.
- Groupe dynamique (`dd-dynamic-group-function`) qui inclut toutes les fonctions dans le compartiment Datadog.
- Politique (`dd-svc-policy`) pour donner à l'utilisateur de service un accès en lecture aux ressources de la location et un accès en gestion à l'infrastructure OCI dans le compartiment Datadog requis pour la collecte et le transfert de données.

{{% collapse-content title="Voir la politique" level="h6" %}}

```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to use tag-namespaces in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment
- Allow dd-svc-admin to use fn-invocation in Datadog compartment
- Allow dd-svc-admin to manage buckets in Datadog compartment where target.bucket.name=/dd-*/
- Allow dd-svc-admin to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
- Endorse dd-svc-admin to read objects in tenancy usage-report
- Allow dd-svc-admin to manage cloudevents-rules in tenancy where any {request.permission = 'EVENTRULE_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow dd-svc-admin to manage streams in Datadog compartment where any {request.permission = 'STREAM_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow service objectstorage-<REGION> to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
```

**Remarque** : L'instruction `Allow service objectstorage-<REGION>` doit être ajoutée une fois par région souscrite (par exemple, `objectstorage-us-ashburn-1`, `objectstorage-ap-batam-1`). Cela permet à Datadog de nettoyer automatiquement les anciennes données dans les compartiments gérés par Datadog via des politiques de cycle de vie des objets.

{{% /collapse-content %}}

- Politique `dd-dynamic-group-policy` pour permettre aux connecteurs de service et aux fonctions de lire et de transférer des données, avec un accès aux secrets, aux compartiments et aux flux dans le compartiment Datadog.

{{% collapse-content title="Voir la politique" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
   - Allow dd-dynamic-group-functions to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
   - Allow dd-dynamic-group-connectorhubs to use stream-pull in Datadog compartment where target.resource.tag.DatadogManaged.marker = 'true'
   - Allow any-user to use stream-push in Datadog compartment where all {request.principal.type = 'eventrule', target.resource.tag.DatadogManaged.marker = 'true'}
```

{{% /collapse-content %}}

<div class="alert alert-warning"><strong>Ne renommez pas les ressources d'intégration.</strong> Datadog utilise les noms de ressources (et non les OCID) pour identifier les ressources qu'il génère pour les opérations de maintenance critiques, telles que la mise à jour des images de fonction. Renommer toute ressource listée ci-dessus (par exemple, renommer <code>dd-function-app</code>) peut interrompre l'intégration. Si votre organisation exige des conventions de nommage personnalisées, contactez <a href="https://www.datadoghq.com/support/">Datadog Support</a>.</div>

## Données collectées {#data-collected}

<!-- ### Metrics -->

<!-- See [metadata.csv][12] for a list of metrics provided by this integration. -->

### Métriques {#metrics}

Pour une liste détaillée des métriques, sélectionnez le service OCI approprié dans la [section des espaces de noms de métriques](#oci-metric-namespaces).

### Vérifications de service {#service-checks}

L'intégration OCI n'inclut aucune vérification de service.

### Événements {#events}

Tous les événements du service OCI Events sont transférés vers votre Events Explorer de Datadog. Filtrez par `source:oci_events_service` pour voir les événements.

## Dépannage {#troubleshooting-1}

Consultez le [guide de dépannage de l'intégration OCI](https://docs.datadoghq.com/fr/integrations/guide/oci-integration-troubleshooting) pour résoudre les problèmes liés à l'intégration OCI.