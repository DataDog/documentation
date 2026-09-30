---
description: Découvrir comment installer et configurer CloudPrem sur n'importe quel
  cluster Kubernetes en utilisant PostgreSQL et MinIO pour le stockage objet
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentation
  text: Configurer l'ingress CloudPrem
- link: /cloudprem/ingest/
  tag: Documentation
  text: Configurer l'ingestion de logs
- link: /cloudprem/operate/troubleshooting
  tag: Documentation
  text: Dépannage de CloudPrem
title: Installer CloudPrem sur Kubernetes avec PostgreSQL et MinIO
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Cette documentation vous guide tout au long du processus d'installation de CloudPrem sur n'importe quel cluster Kubernetes en utilisant PostgreSQL pour le stockage des métadonnées et MinIO pour le stockage objet compatible S3.

Cette configuration est idéale pour les environnements où vous gérez votre propre infrastructure ou n'utilisez pas les services gérés d'un grand fournisseur cloud.

## Prérequis

Avant de commencer, vérifiez que vous disposez des éléments suivants :

- **kubectl** installé et configuré pour accéder à votre cluster Kubernetes
  ```shell
  kubectl version --client
  ```

- **Helm 3.x** installé
  ```shell
  helm version
  ```

- Un **cluster Kubernetes** (v1.25 ou supérieure) opérationnel
  ```shell
  kubectl get nodes
  ```

- Un **compte Datadog** avec la fonctionnalité CloudPrem activée

- Une **[clé d'API Datadog][1]**

- Une **base de données PostgreSQL** (v13 ou supérieure) accessible depuis votre cluster Kubernetes. Notez les informations de connexion suivantes :
  - Host
  - Port (par défaut : `5432`)
  - Nom de la base de données
  - Nom d'utilisateur
  - Mot de passe

- Une **instance MinIO** accessible depuis votre cluster Kubernetes, avec :
  - Un bucket créé pour les données CloudPrem (par exemple, `cloudprem`)
  - Une clé d'accès et une clé secrète avec des autorisations en lecture/écriture sur le bucket
  - L'URL du endpoint MinIO (par exemple, `http://minio.minio.svc.cluster.local:9000`)

### Vérifier la connectivité

Avant de continuer, vérifiez que votre cluster Kubernetes peut atteindre PostgreSQL et MinIO.

**PostgreSQL** :
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

En cas de succès, une invite `psql` doit s'afficher.

**MinIO** :
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

En cas de succès, la commande liste le contenu de votre bucket MinIO.

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

   Par exemple, pour créer un namespace `cloudprem` :
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

   <div class="alert alert-danger">Si votre mot de passe contient des caractères spéciaux, encodez-les d'abord en URL. Par exemple : <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"
   ```

1. Stockez les identifiants MinIO en tant que secret Kubernetes :

   ```shell
   kubectl create secret generic cloudprem-minio-credentials \
   -n <NAMESPACE_NAME> \
   --from-literal AWS_ACCESS_KEY_ID="<MINIO_ACCESS_KEY>" \
   --from-literal AWS_SECRET_ACCESS_KEY="<MINIO_SECRET_KEY>"
   ```

1. Personnalisez le chart Helm :

   Créez un fichier `datadog-values.yaml` pour remplacer les valeurs par défaut par votre configuration personnalisée. C'est ici que vous définissez les paramètres spécifiques à l'environnement, tels que le compte de service, la configuration de l'ingress, les demandes et limites de ressources, etc.

   Tout paramètre non explicitement remplacé dans `datadog-values.yaml` utilise les valeurs par défaut définies dans le fichier `values.yaml` du chart.

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   Voici un exemple de fichier `datadog-values.yaml` avec des valeurs personnalisées pour une configuration Kubernetes standard avec MinIO :

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog configuration
datadog:
  # The Datadog site (https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
  # site: datadoghq.com
  # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
  apiKeyExistingSecret: datadog-secret

# Variables d'environnement
# The MinIO credentials are mounted from the Kubernetes secret.
# Any environment variables defined here are available to all pods in the deployment.
environment:
  AWS_REGION: us-east-1

# Service account configuration
serviceAccount:
  create: true
  name: cloudprem

# CloudPrem node configuration
config:
  # The root URI where index data is stored. This should be an S3-compatible path pointing to your MinIO bucket.
  # All indexes created in CloudPrem are stored under this location.
  default_index_root_uri: s3://<BUCKET_NAME>/indexes
  storage:
    s3:
      endpoint: <MINIO_ENDPOINT>
      # force_path_style_access must be true for MinIO.
      force_path_style_access: true

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
    - secretRef:
        name: cloudprem-minio-credentials

# Indexer configuration
# The indexer is responsible for processing and indexing incoming data it receives data from various sources
# (for example, Datadog Agents, log collectors) and transforms it into searchable files called "splits"
# stored in MinIO.
#
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
# See the sizing guide for available tiers and their configurations.
indexer:
  replicaCount: 2
  podSize: xlarge
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Searcher configuration
# The searcher is responsible for executing search queries against the indexed data stored in MinIO.
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
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Configuration du plan de contrôle
controlPlane:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Janitor configuration
janitor:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials
{{< /code-block >}}

   Replace the following placeholders with your actual values:
   - `<BUCKET_NAME>`: The name of your MinIO bucket (for example, `cloudprem`)
   - `<MINIO_ENDPOINT>`: The MinIO endpoint URL (for example, `http://minio.minio.svc.cluster.local:9000`)

1. Installez ou mettez à jour le chart Helm :

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

Tous les pods doivent être à l'état `Running` :
```
NAME                                   READY   STATUS    RESTARTS   AGE
cloudprem-control-plane-xxx            1/1     Running   0          5m
cloudprem-indexer-0                    1/1     Running   0          5m
cloudprem-indexer-1                    1/1     Running   0          5m
cloudprem-janitor-xxx                  1/1     Running   0          5m
cloudprem-metastore-xxx                1/1     Running   0          5m
cloudprem-metastore-yyy                1/1     Running   0          5m
cloudprem-searcher-0                   1/1     Running   0          5m
cloudprem-searcher-1                   1/1     Running   0          5m
```

### Vérifier la connectivité du metastore

Vérifiez que le metastore peut se connecter à PostgreSQL en consultant ses logs :
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=metastore --tail=50
```

Des entrées de log indiquant que le cluster a rejoint avec succès et que des opérations de split ont été effectuées doivent s'afficher, sans erreurs de connexion.

### Vérifier la connectivité du stockage

Vérifiez que les indexeurs peuvent écrire dans MinIO en consultant les logs de l'indexeur :
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=indexer --tail=50
```

## Désinstallation

Pour désinstaller CloudPrem :

```shell
helm uninstall <RELEASE_NAME> -n <NAMESPACE_NAME>
```

De plus, pour supprimer le namespace et les secrets associés :

```shell
kubectl delete namespace <NAMESPACE_NAME>
```

## Prochaine étape

**[Configurer l'ingestion de logs avec l'Agent Datadog][2]** - configurer l'Agent Datadog pour envoyer des logs à CloudPrem

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/cloudprem/ingest/agent/