---
aliases:
- /fr/cloudprem/configure/azure_config/
- /fr/cloudprem/install/azure_aks/
description: Apprenez à installer et à configurer BYOC Logs sur Azure AKS.
title: Installez BYOC Logs sur Azure AKS.
---
## Présentation {#overview}

Ce document vous guide tout au long du processus de configuration de votre environnement Azure et d'installation de BYOC (Bring Your Own Cloud) Logs sur Azure AKS.

## Prérequis {#prerequisites}

Avant d'installer BYOC Logs sur Azure, vous devez mettre en place un ensemble de ressources d'infrastructure de support. Ces composants fournissent les services fondamentaux de calcul, de stockage, de base de données et de mise en réseau dont dépendent BYOC Logs.

### Exigences en matière d'infrastructure {#infrastructure-requirements}
Voici les composants que vous devez provisionner :

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): Un cluster AKS en cours d'exécution dimensionné pour votre charge de travail prévue de BYOC Logs.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server) : Une instance Azure Database for PostgreSQL que BYOC Logs utilisera pour stocker ses métadonnées.
- [**Conteneur de stockage Blob**](#blob-storage-container) : Un conteneur de stockage Azure pour stocker les données de BYOC Logs.
- [**Identité client et autorisations**](#client-identity-and-permissions) : Une application Azure AD avec un accès en lecture/écriture au conteneur de stockage.
- [**Contrôleur d'entrée NGINX**](#nginx-ingress-controller) : Installé sur le cluster AKS pour acheminer le trafic externe vers les services BYOC Logs.
- **Datadog Agent** : Déployé sur le cluster AKS pour collecter et envoyer les logs à BYOC Logs.

### Azure Kubernetes Service (AKS) {#azure-kubernetes-service-aks}

BYOC Logs s'exécute entièrement sur Kubernetes. Vous avez besoin d'un cluster AKS avec suffisamment de CPU, de mémoire et d'espace disque configurés pour votre charge de travail. Consultez les recommandations de dimensionnement du cluster Kubernetes pour obtenir des conseils.

#### Déployez le cluster AKS.{#deploy-the-aks-cluster}

- [Déployer un cluster AKS avec l'interface de ligne de commande Azure][2]
- [Déployer un cluster AKS avec Terraform][3]

#### Vérifiez la connectivité et l'état du cluster {#verify-cluster-connectivity-and-health}
Pour confirmer que le cluster est accessible et que les nœuds sont dans l'état `Ready`, exécutez la commande suivante :

```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server {#azure-postgresql-flexible-server}

BYOC Logs stocke ses métadonnées et sa configuration dans une base de données PostgreSQL. Datadog recommande Azure Database pour PostgreSQL Flexible Server. Il doit être accessible depuis le cluster AKS, idéalement avec un réseau privé activé. Consultez les recommandations de dimensionnement Postgres pour plus de détails.

#### Créer la base de données PostgreSQL {#create-the-postgresql-database}

- [Créer un serveur Azure Database pour PostgreSQL Flexible Server avec l'interface de ligne de commande Azure][4]
- [Créer un serveur Azure Database pour PostgreSQL Flexible Server avec Terraform][5]

#### Vérifiez la connectivité à la base de données {#verify-database-connectivity}

<div class="alert alert-info">Pour des raisons de sécurité, créez une base de données et un utilisateur dédiés pour BYOC Logs, et accordez à l'utilisateur des droits uniquement sur cette base de données, et non à l'échelle du cluster.</div>

Connectez-vous à votre base de données PostgreSQL depuis le réseau AKS en utilisant le client PostgreSQL, `psql`. Tout d'abord, démarrez un pod interactif dans votre cluster Kubernetes en utilisant une image qui inclut `psql` :

```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

Ensuite, exécutez la commande suivante directement depuis le shell, en remplaçant les valeurs fictives par vos valeurs réelles :

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

Si l'opération réussit, vous devriez voir une invite similaire à :

```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Conteneur de stockage Blob {#blob-storage-container}

BYOC Logs utilise Azure Blob Storage pour conserver les logs. Créez un conteneur dédié à cet effet.

#### Créer un conteneur de stockage Blob {#create-a-blob-storage-container}
Utilisez un conteneur dédié par environnement (par exemple, `byoc-logs-prod`, `byoc-logs-staging`), et attribuez des rôles RBAC avec le privilège minimum au niveau du conteneur, plutôt qu'au niveau du compte de stockage.

- [Créer un conteneur de stockage Blob à l'aide de l'interface de ligne de commande Azure][6]
- [Créer un conteneur de stockage Blob à l'aide de Terraform][7]

### Identité et autorisations du client {#client-identity-and-permissions}

Une application Azure AD doit se voir accorder un accès en lecture/écriture au conteneur de stockage Blob. Enregistrez une application dédiée pour BYOC Logs et attribuez au principal de service correspondant le rôle `Contributor` sur le conteneur de stockage Blob créé ci-dessus.

#### Enregistrer l'application {#register-the-application}
[Enregistrer une application dans Microsoft Entra ID][8]

#### Attribuer le rôle de contributeur {#assign-contributor-role}
[Attribuer un rôle Azure pour l'accès aux données blob][9]

### Contrôleur d'entrée NGINX {#nginx-ingress-controller}

#### Contrôleur d'entrée NGINX public {#public-nginx-ingress-controller}

L'entrée publique est essentielle pour permettre à Datadog de gérer et d'interroger les clusters BYOC Logs sur l'internet public. Elle fournit un accès sécurisé à l'API gRPC de BYOC Logs via les mécanismes suivants :
- Crée un équilibreur de charge Azure accessible sur Internet qui accepte le trafic provenant des services Datadog
- Implémente le chiffrement TLS avec terminaison au niveau du contrôleur d'entrée
- Utilise HTTP/2 (gRPC) pour la communication entre Datadog et les clusters BYOC Logs
- Nécessite une authentification TLS mutuelle (mTLS) où les services Datadog doivent présenter des certificats clients valides
- Configure le contrôleur en mode TLS passthrough pour transférer les certificats clients aux pods de BYOC Logs avec l'en-tête `ssl-client-cert`.
- Rejette les demandes auxquelles il manque des certificats clients valides ou l'en-tête de certificat

Utilisez le fichier de valeurs Helm `nginx-public.yaml` suivant afin de créer le contrôleur d'entrée NGINX public :

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

Ensuite, installez le contrôleur avec Helm en utilisant la commande suivante :

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

Vérifiez que le service expose une adresse IP externe :

```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### Contrôleur d'entrée NGINX interne {#internal-nginx-ingress-controller}

L'ingress interne permet l'ingestion de logs depuis les agents Datadog et d'autres collecteurs de logs au sein de votre environnement via HTTP. Utilisez le fichier de valeurs Helm `nginx-internal.yaml` suivant afin de créer le contrôleur d'entrée NGINX public :

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

Ensuite, installez le contrôleur avec Helm en utilisant la commande suivante :

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

Vérifiez que le pod du contrôleur est en cours d'exécution :

```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Vérifiez que le service expose une adresse IP externe :

```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS {#dns}

Optionnellement, vous pouvez ajouter une entrée DNS pointant vers l'adresse IP de l'équilibreur de charge public, afin que les futurs changements d'IP ne nécessitent pas de mettre à jour la configuration du côté de Datadog.

## Étapes d'installation {#installation-steps}

1. [Installer le chart Helm BYOC Logs](#install-the-byoc-logs-helm-chart)
2. [Vérifier l'installation](#verification)

## Installer le chart Helm BYOC Logs {#install-the-byoc-logs-helm-chart}

1. Ajouter et mettre à jour le dépôt Helm Datadog :
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Créer un espace de noms Kubernetes pour le chart :
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   Par exemple, pour créer un espace de noms `byoc-logs` :
   ```shell
   kubectl create namespace byoc-logs
   ```

   **Remarque** : Vous pouvez définir un espace de noms par défaut pour votre contexte actuel afin d'éviter d'avoir à taper `-n <NAMESPACE_NAME>` à chaque commande :
   ```shell
   kubectl config set-context --current --namespace=byoc-logs
   ```

1. Stockez la clé d'API Datadog en tant que secret Kubernetes :

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. Stockez la chaîne de connexion à la base de données PostgreSQL en tant que secret Kubernetes :
   Pour récupérer vos détails de connexion PostgreSQL, accédez au portail Azure, naviguez vers {{< ui >}}All resources{{< /ui >}}, puis cliquez sur votre instance _Azure Database for PostgreSQL flexible server_. Enfin, dans l'onglet {{< ui >}}Getting started{{< /ui >}}, cliquez sur le lien {{< ui >}}View connection strings{{< /ui >}} dans la carte {{< ui >}}Connect{{< /ui >}}.

   ```shell
   kubectl create secret generic byoc-logs-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   Par exemple, pour stocker un secret `metastore-uri` dans l'espace de noms `byoc-logs` :
   ```shell
   USERNAME=byoc-logs-prod
   PASSWORD=1234567890
   HOST=byoc-logs-prod.postgres.database.azure.com
   PORT=5432
   DATABASE=byoc_logs_prod
   kubectl create secret generic metastore-uri \
     -n byoc-logs \
     --from-literal QW_METASTORE_URI="postgres://$USERNAME:$PASSWORD@$HOST:$PORT/$DATABASE"
   ```

1. Stockez le secret client ou la clé d'accès au compte de stockage en tant que secret Kubernetes :
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Personnalisez le chart Helm :

   Créez un fichier `datadog-values.yaml` pour remplacer les valeurs par défaut par votre configuration personnalisée. C'est ici que vous définissez les paramètres spécifiques à l'environnement tels que le tag d'image, l'ID de locataire Azure, le compte de service, la configuration de l'ingress, les demandes et limites de ressources, et plus encore.

   Tous les paramètres qui ne sont pas explicitement remplacés dans `datadog-values.yaml` retombent sur les valeurs par défaut définies dans le `values.yaml` du chart Helm.

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   Voici un exemple de fichier `datadog-values.yaml` avec des remplacements pour Azure :

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
     name: byoc-logs

# BYOC Logs node configuration
config:
  # The root URI where index data is stored. This should be an Azure path.
  # All indexes created in BYOC Logs are stored under this location.
  default_index_root_uri: azure://<CONTAINER_NAME>/indexes

# Internal ingress configuration
# The internal ingress NLB is created in private subnets.
#
# Additional annotations can be added to customize the ALB behavior.
ingress:
  # The internal ingress is used by Datadog Agents and other collectors running outside
  # the Kubernetes cluster to send their logs to BYOC Logs.
  internal:
    enabled: true
    ingressClassName: nginx-internal
    host: byoc-logs.acme.internal
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
        name: byoc-logs-metastore-uri

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
  persistentVolume:
    enabled: true
    storage: 250Gi
    storageClass: managed-csi

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

1. Installez ou mettez à niveau le chart Helm.
    ```shell
    helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

## Vérification {#verification}

### Vérifier le statut du déploiement {#check-deployment-status}

Vérifiez que tous les composants BYOC Logs sont en cours d'exécution :

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## Désinstallez {#uninstall}

Pour désinstaller BYOC Logs, exécutez la commande suivante :

```shell
helm uninstall <RELEASE_NAME>
```

## Étape suivante {#next-step}

**[Configurer l'ingestion de logs avec le Datadog Agent][10]** - Configurez le Datadog Agent pour envoyer les logs à BYOC Logs

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /fr/byoc-logs/ingest/agent/