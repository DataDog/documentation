---
aliases:
- /fr/cloudprem/configure/azure_config/
description: Découvrir comment installer et configurer CloudPrem sur Azure AKS
title: Installer CloudPrem sur Azure AKS
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Ce document vous guide tout au long du processus de configuration de votre environnement Azure et d'installation de CloudPrem sur Azure AKS.

## Prérequis

Avant d'installer CloudPrem sur Azure, vous devez mettre en place un ensemble de ressources d'infrastructure de support. Ces composants fournissent les services de calcul, de stockage, de base de données et de réseau sur lesquels CloudPrem s'appuie.

### Prérequis d'infrastructure
Voici les composants que vous devez provisionner :

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks) : un cluster AKS opérationnel dimensionné pour votre charge de travail CloudPrem attendue.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server) : une instance Azure Database pour PostgreSQL que CloudPrem utilisera pour stocker ses métadonnées.
- [**Conteneur Blob Storage**](#blob-storage-container) : un conteneur Azure Storage pour héberger les logs CloudPrem.
- [**Identité client et autorisations**](#client-identity-and-permissions) : une application Azure AD disposant d'un accès en lecture/écriture au conteneur de stockage.
- [**Contrôleur d'entrée NGINX**](#nginx-ingress-controller) : installé sur le cluster AKS pour router le trafic externe vers les services CloudPrem.
- **Agent Datadog** : déployé sur le cluster AKS pour collecter et envoyer des logs à CloudPrem.

### Azure Kubernetes Service (AKS)

CloudPrem s'exécute entièrement sur Kubernetes. Vous avez besoin d'un cluster AKS avec suffisamment de CPU, de mémoire et d'espace disque configurés pour votre charge de travail. Consultez les recommandations de dimensionnement du cluster Kubernetes pour obtenir des conseils.

#### Déployer le cluster AKS

- [Déployer un cluster AKS avec Azure CLI][2]
- [Déployer un cluster AKS avec Terraform][3]

#### Vérifier la connectivité et l'état du cluster
Pour confirmer que le cluster est accessible et que les nœuds sont à l'état `Ready`, exécutez la commande suivante :
```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server

CloudPrem stocke ses métadonnées et sa configuration dans une base de données PostgreSQL. Datadog recommande Azure Database pour PostgreSQL Flexible Server. Elle doit être accessible depuis le cluster AKS, idéalement avec la mise en réseau privé activée. Consultez les recommandations de dimensionnement Postgres pour plus de détails.

#### Créer la base de données PostgreSQL

- [Créer une instance Azure Database pour PostgreSQL Flexible Server avec Azure CLI][4]
- [Créer une instance Azure Database pour PostgreSQL Flexible Server avec Terraform][5]

#### Vérifier la connectivité à la base de données

<div class="alert alert-info">Pour des raisons de sécurité, créez une base de données et un utilisateur dédiés pour CloudPrem, et accordez à cet utilisateur des droits uniquement sur cette base de données, et non à l'échelle du cluster.</div>

Connectez-vous à votre base de données PostgreSQL depuis le réseau AKS à l'aide du client PostgreSQL `psql`. Démarrez d'abord un pod interactif dans votre cluster Kubernetes en utilisant une image incluant `psql` :
```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

Puis exécutez la commande suivante directement depuis le shell, en remplaçant les valeurs fictives par vos valeurs réelles :

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

En cas de succès, une invite similaire à la suivante doit s'afficher :
```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Conteneur Blob Storage

CloudPrem utilise Azure Blob Storage pour persister les logs. Créez un conteneur dédié à cet usage.

#### Créer un conteneur Blob Storage
Utilisez un conteneur dédié par environnement (par exemple, `cloudprem-prod`, `cloudprem-staging`), et attribuez des rôles RBAC avec le principe du moindre privilège au niveau du conteneur, plutôt qu'au niveau du compte de stockage.

- [Créer un conteneur Blob Storage avec Azure CLI][6]
- [Créer un conteneur Blob Storage avec Terraform][7]

### Identité client et autorisations

Une application Azure AD doit disposer d'un accès en lecture/écriture au conteneur Blob Storage. Enregistrez une application dédiée pour CloudPrem et attribuez au principal de service correspondant le rôle `Contributor` sur le conteneur Blob Storage créé précédemment.

#### Enregistrer l'application
[Enregistrer une application dans Microsoft Entra ID][8]

#### Attribuer le rôle Contributor
[Attribuer un rôle Azure pour l'accès aux données blob][9]

### Contrôleur d'entrée NGINX

#### Contrôleur d'entrée NGINX public

L'ingress public est indispensable pour permettre au plan de contrôle et au service de requêtes de Datadog de gérer et d'interroger les clusters CloudPrem via l'internet public. Il fournit un accès sécurisé à l'API gRPC de CloudPrem via les mécanismes suivants :
- Crée un Azure Load Balancer accessible depuis internet qui accepte le trafic en provenance des services Datadog
- Implémente le chiffrement TLS avec terminaison au niveau du contrôleur d'entrée
- Utilise HTTP/2 (gRPC) pour la communication entre Datadog et les clusters CloudPrem
- Requiert une authentification mTLS mutuelle où les services Datadog doivent présenter des certificats client valides
- Configure le contrôleur en mode TLS passthrough pour transmettre les certificats client aux pods CloudPrem via l'en-tête `ssl-client-cert`
- Rejette les requêtes ne présentant pas de certificats client valides ou l'en-tête de certificat

Utilisez le fichier de valeurs Helm `nginx-public.yaml` suivant pour créer le contrôleur d'entrée NGINX public :

{{< code-block lang="yaml" filename="nginx-public.yaml" >}}
controller:
  electionID: public-ingress-controller-leader
  ingressClass: nginx-public
  ingressClassResource:
    name: nginx-public
    enabled: true
    default: false
    controllerValue: k8s.io/public-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

Installez ensuite le contrôleur avec Helm à l'aide de la commande suivante :

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

Vérifiez que le pod du contrôleur est en cours d'exécution :
```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Vérifiez que le service expose une IP externe :
```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### Contrôleur d'entrée NGINX interne

L'ingress interne permet l'ingestion de logs depuis les Agents Datadog et d'autres collecteurs de logs au sein de votre environnement via HTTP. Utilisez le fichier de valeurs Helm `nginx-internal.yaml` suivant pour créer le contrôleur d'entrée NGINX interne :

{{< code-block lang="yaml" filename="nginx-internal.yaml" >}}
controller:
  electionID: internal-ingress-controller-leader
  ingressClass: nginx-internal
  ingressClassResource:
    name: nginx-internal
    enabled: true
    default: false
    controllerValue: k8s.io/internal-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: true
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

Installez ensuite le contrôleur avec Helm à l'aide de la commande suivante :

``Shell
helm upgrade --install NGINX-internal ingress-NGINX \N- --repo  \N- --installation -internal ingress- \N
  --repo https://kubernetes.github.io/ingress-NGINX \N- --namespace https://kubernetes.github.io/ingress-
  --namespace NGINX-ingress-internal \N- --create-namespace 
  --create-namespace \N
  -f NGINX-internal.yaml
```

Vérifiez que le pod du contrôleur est en cours d'exécution :
```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Vérifiez que le service expose une IP externe :
```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS

Vous pouvez également ajouter une entrée DNS pointant vers l'IP du répartiteur de charge public, afin que les éventuels changements d'IP futurs ne nécessitent pas de mise à jour de la configuration côté Datadog.

## Étapes d'installation

1. [Installer le chart Helm CloudPrem](#installer-le-chart-helm-cloudprem)
2. [Vérifier l'installation](#verification)

## Installer le chart Helm CloudPrem

1. Ajoutez et mettez à jour le référentiel Helm Datadog :
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Créez un namespace Kubernetes pour le chart :
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   Par exemple, pour créer un namespace `cloudprem` :
   ```shell
   kubectl create namespace cloudprem
   ```

   **Remarque** : vous pouvez définir un namespace par défaut pour votre contexte actuel afin d'éviter de saisir `-n <NAMESPACE_NAME>` à chaque commande :
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Stockez votre clé d'API Datadog en tant que secret Kubernetes :

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. Stockez la chaîne de connexion à la base de données PostgreSQL en tant que secret Kubernetes :
   Pour récupérer les informations de connexion PostgreSQL, accédez au portail Azure, naviguez vers **Toutes les ressources**, puis cliquez sur votre instance _Azure Database pour PostgreSQL Flexible Server_. Ensuite, dans l'onglet **Prise en main**, cliquez sur le lien _Afficher les chaînes de connexion_ dans la carte **Connexion**.

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   Par exemple, pour stocker un secret `metastore-uri` dans le namespace `cloudprem` :
   ```shell
   USERNAME=cloudprem-prod
   PASSWORD=1234567890
   HOST=cloudprem-prod.postgres.database.azure.com
   PORT=5432
   DATABASE=cloudprem_prod
   kubectl create secret generic metastore-uri \
     -n cloudprem \
     --from-literal QW_METASTORE_URI="postgres://$USERNAME:$PASSWORD@$HOST:$PORT/$DATABASE"
   ```

1. Stockez le secret client ou la clé d'accès au compte de stockage en tant que secret Kubernetes :
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Personnalisez le chart Helm :

   Créez un fichier `datadog-values.yaml` pour remplacer les valeurs par défaut par votre configuration personnalisée. C'est ici que vous définissez les paramètres spécifiques à l'environnement, tels que le tag d'image, l'ID de tenant Azure, le compte de service, la configuration de l'ingress, les demandes et limites de ressources, etc.

   Tout paramètre non explicitement remplacé dans `datadog-values.yaml` utilise les valeurs par défaut définies dans le fichier `values.yaml` du chart.

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   Voici un exemple de fichier `datadog-values.yaml` avec des valeurs personnalisées pour Azure :

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog configuration
datadog:
  # The Datadog site (https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
  # site: datadoghq.com
  # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
  apiKeyExistingSecret: datadog-secret

azure:
  tenantId: <TENANT_ID> # required
  clientId: <CLIENT_ID> # required when using AD App to authenticate with Blob Storage
  clientSecretRef:
    name: <SECRET_NAME>
    key: <SECRET_KEY>
  storageAccount:
    name: <STORAGE_ACCOUNT_NAME> # required
    # If you are using a storage account access key to authenticate with Blob Storage,
    # comment out the `clientSecretRef` section above,
    # and uncomment the `storageAccount` section below:
    # accessKeySecretRef:
      # name: <SECRET_NAME>
      # key: <SECRET_KEY>

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem

# CloudPrem node configuration
config:
  # The root URI where index data is stored. This should be an Azure path.
  # All indexes created in CloudPrem are stored under this location.
  default_index_root_uri: azure://<CONTAINER_NAME>/indexes

# Internal ingress configuration
# The internal ingress NLB is created in private subnets.
#
# Additional annotations can be added to customize the ALB behavior.
ingress:
  # The internal ingress is used by Datadog Agents and other collectors running outside
  # the Kubernetes cluster to send their logs to CloudPrem.
  internal:
    enabled: true
    ingressClassName: nginx-internal
    host: cloudprem.acme.internal
    extraAnnotations: {}

# Metastore configuration
# The metastore is responsible for storing and managing index metadata.
# It requires a PostgreSQL database connection string to be provided by a Kubernetes secret.
# The secret should contain a key named `QW_METASTORE_URI` with a value in the format:
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# The metastore connection string is mounted into the pods using extraEnvFrom to reference the secret.
metastore:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-metastore-uri

# Indexer configuration
# The indexer is responsible for processing and indexing incoming data it receives data from various sources (for example, Datadog Agents, log collectors)
# and transforms it into searchable files called "splits" stored in S3.
#
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
# See the sizing guide for available tiers and their configurations.
indexer:
  replicaCount: 2
  podSize: xlarge

   # Searcher configuration
   # The searcher is responsible for executing search queries against the indexed data stored in S3.
   # It handles search requests from Datadog's query service and returns matching results.
   #
   # The searcher is horizontally scalable - you can increase `replicaCount` to handle more concurrent searches.
   # Resource requirements for searchers are highly workload-dependent and should be determined empirically.
   # Key factors that impact searcher performance include:
   # - Query complexity (for example, number of terms, use of wildcards or regex)
   # - Query concurrency (number of simultaneous searches)
   # - Amount of data scanned per query
   # - Data access patterns (cache hit rates)
   #
   # Memory is particularly important for searchers as they cache frequently accessed index data in memory.
   searcher:
     replicaCount: 2
     podSize: xlarge
{{< /code-block >}}

1. Installer ou mettre à jour le chart Helm
    ```shell
    helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

## Vérification

### Vérifier le statut du déploiement

Vérifiez que tous les composants CloudPrem sont en cours d'exécution :

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## Désinstallation

Pour désinstaller CloudPrem, exécutez la commande suivante :

```shell
helm uninstall <RELEASE_NAME>
```

## Prochaine étape

**[Configurer l'ingestion de logs avec l'Agent Datadog][10]** - configurer l'Agent Datadog pour envoyer des logs à CloudPrem

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /fr/cloudprem/ingest/agent/