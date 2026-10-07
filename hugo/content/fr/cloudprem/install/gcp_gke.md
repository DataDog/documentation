---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentation
  text: Configurer l'ingress CloudPrem
- link: /cloudprem/ingest/
  tag: Documentation
  text: Configurer l'ingestion de logs
title: CloudPrem sur Google Kubernetes Engine (GKE)
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Ce guide d'installation vous accompagne dans le déploiement de Datadog CloudPrem sur Google Kubernetes Engine (GKE).

CloudPrem sur GKE utilise les services Google Cloud suivants :
- **Google Kubernetes Engine (GKE)** : plateforme d'orchestration de conteneurs pour l'exécution des composants CloudPrem
- **Cloud Storage (GCS)** : stockage objet pour les données de télémétrie et les index
- **Cloud SQL pour PostgreSQL** : base de données PostgreSQL gérée pour le stockage des métadonnées
- **Workload Identity** : authentification sécurisée entre les charges de travail GKE et les services Google Cloud

## Prérequis

Avant de commencer, vérifiez que vous disposez des éléments suivants :

1. **Google Cloud CLI** installé et configuré
   ```shell
   gcloud version
   ```

2. **kubectl** installé
   ```shell
   kubectl version --client
   ```

3. **Helm 3.x** installé
   ```shell
   helm version
   ```

4. **Projet GCP** avec la facturation activée
   ```shell
   gcloud config set project YOUR_PROJECT_ID
   ```

5. **Autorisations IAM requises** :
   - `roles/container.admin` (administrateur Kubernetes Engine)
   - `roles/iam.serviceAccountAdmin` (administrateur de comptes de service)
   - `roles/compute.admin` (administrateur Compute)

6. **[Créez ou récupérez votre clé d'API][1]**.

7. **APIs activées** :
   ```shell
   gcloud services enable container.googleapis.com \
     compute.googleapis.com \
     sqladmin.googleapis.com \
     storage.googleapis.com
   ```

## Étapes d'installation

### Étape 1 : définir les variables d'environnement

Définissez les variables d'environnement suivantes pour simplifier les commandes ultérieures et réduire les erreurs de copier-coller.

```shell
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export CLUSTER_NAME="cloudprem-cluster"
export DATADOG_SITE="datadoghq.com"  # or datadoghq.eu, us3.datadoghq.com, us5.datadoghq.com
export BUCKET_NAME="${PROJECT_ID}-cloudprem"
```

### Étape 2 : créer le cluster GKE

Créez un cluster GKE avec Workload Identity activé :

```shell
gcloud container clusters create ${CLUSTER_NAME} \
  --region ${REGION} \
  --num-nodes 1 \
  --workload-pool=${PROJECT_ID}.svc.id.goog \
  --machine-type n1-standard-4
```

{{% collapse-content title="Recommandations de dimensionnement du cluster" level="h4" %}}
- **Small (Dev/Test)** : 3 nœuds, n1-standard-4 (~100 Go/jour)
- **Medium (Production)** : 5 nœuds, n1-standard-8 (~500 Go/jour)
- **Large (Enterprise)** : 7 nœuds ou plus, n1-standard-16 (~1 To+/jour)
{{% /collapse-content %}}

Récupérez les identifiants du cluster :
```shell
gcloud container clusters get-credentials ${CLUSTER_NAME} --region ${REGION}
```

Installez le plugin d'authentification GKE :
```shell
gcloud components install gke-gcloud-auth-plugin
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
```

Vérifiez l'accès au cluster :
```shell
kubectl cluster-info
kubectl get nodes
```

### Étape 3 : créer le bucket Cloud Storage

Créez un bucket GCS pour le stockage des données CloudPrem :

```shell
export BUCKET_NAME="cloudprem-data-${PROJECT_ID}"

gcloud storage buckets create gs://${BUCKET_NAME} \
  --project=${PROJECT_ID} \
  --location=${REGION} \
  --uniform-bucket-level-access
```

### Étape 4 : créer l'instance Cloud SQL PostgreSQL

Créez une instance Cloud SQL PostgreSQL pour le stockage des métadonnées :

```shell
# Generate a secure password
export DB_PASSWORD=$(openssl rand -base64 32)
echo "Database password: ${DB_PASSWORD}"
# Save this password securely - you'll need it later

# Create Cloud SQL instance
gcloud sql instances create cloudprem-postgres \
  --database-version=POSTGRES_15 \
  --region=${REGION} \
  --root-password="${DB_PASSWORD}"
```

Cette opération peut prendre quelques minutes. Attendez que l'instance soit prête :

```shell
gcloud sql instances describe cloudprem-postgres \
  --format="value(state)"
# Should output: RUNNABLE
```

Créez la base de données CloudPrem : 
```shell
gcloud sql databases create cloudprem \
  --instance=cloudprem-postgres
```

Récupérez les informations de connexion :
```shell
export DB_CONNECTION_NAME=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(connectionName)")
export DB_PUBLIC_IP=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(ipAddresses[0].ipAddress)")

echo "Connection Name: ${DB_CONNECTION_NAME}"
echo "Public IP: ${DB_PUBLIC_IP}"
```

Autorisez les nœuds GKE à se connecter à Cloud SQL :
```shell
# Get GKE node external IPs
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')

# Authorize the IPs
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

### Étape 5 : configurer IAM et Workload Identity

Créez un compte de service GCP pour CloudPrem :

```shell
export SERVICE_ACCOUNT_NAME="cloudprem-sa"

gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
  --display-name="CloudPrem Service Account" \
  --project=${PROJECT_ID}
```

Attribuez les rôles IAM nécessaires :

```shell
# Cloud SQL Client role
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# Storage Object Admin role for GCS bucket
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

Créez le namespace Kubernetes et le compte de service :

```shell
kubectl create namespace datadog-cloudprem

kubectl create serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem

kubectl annotate serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem \
  iam.gke.io/gcp-service-account=${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

Associez le compte de service GCP au compte de service Kubernetes :

```shell
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

### Étape 6 : créer les secrets Kubernetes

Créez un secret pour la clé d'API Datadog :

```shell
kubectl create secret generic datadog-secret \
  --from-literal=api-key=${DD_API_KEY} \
  --namespace=datadog-cloudprem
```

Créez un secret pour la connexion PostgreSQL :

<div class="alert alert-danger">Le mot de passe doit être encodé en URL. Par exemple : <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div> 

```shell
# URL-encode the password first
# Example: if password is "abc/def+ghi=" it becomes "abc%2Fdef%2Bghi%3D"

kubectl create secret generic cloudprem-metastore-config \
  --from-literal=QW_METASTORE_URI="postgresql://postgres:${DB_PASSWORD}@${DB_PUBLIC_IP}:5432/cloudprem" \
  --namespace=datadog-cloudprem
```

### Étape 7 : installer CloudPrem avec Helm

Ajoutez le référentiel Helm Datadog :

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Créez un fichier `values.yaml` :

Définissez votre [site Datadog][2] sur {{< region-param key="dd_site" code="true" >}}.

```yaml
# Datadog configuration
datadog:
   # The Datadog site to connect to. Defaults to `datadoghq.com`.
   # site: datadoghq.com
   # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
   apiKeyExistingSecret: datadog-secret

# Service Account with Workload Identity
serviceAccount:
  create: false
  name: cloudprem-ksa
  extraAnnotations:
    iam.gke.io/gcp-service-account: cloudprem-sa@${YOUR_PROJECT_ID}.iam.gserviceaccount.com

# CloudPrem node configuration
config:
  # The root URI where index data is stored. This should be an gs path.
  # All indexes created in CloudPrem are stored under this location.
  default_index_root_uri: gs://${BUCKET_NAME}/indexes

# Internal ingress configuration for access within the VPC
# Helm chart does not support yet GKE ingress
#
# Additional annotations can be added to customize the ALB behavior.
ingress:
  internal:
    enabled: false

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
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput. Resource requests and limits should be tuned based on your indexing workload.
#
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically. The default values are suitable for moderate indexing loads of up to 20 MB/s per indexer pod.
# See the sizing guide for available tiers and their configurations.
indexer:
  replicaCount: 2
  podSize: xlarge

# Searcher configuration
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
# Choose a tier based on your query complexity, concurrency, and data access patterns.
searcher:
  replicaCount: 2
  podSize: xlarge
```

Installez CloudPrem :

```shell
helm install cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml
```

### Étape 8 : ajouter l'ingress GCE interne

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cloudprem-internal
  namespace: datadog-cloudprem
  annotations:
    kubernetes.io/ingress.class: "gce-internal"
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: cloudprem-indexer
            port:
              number: 7280
```

```shell
kubectl apply -f ingress-values.yaml
```

### Étape 9 : installer l'Agent Datadog (recommandé)

Installez l'Agent Datadog pour collecter les métriques des composants CloudPrem et les envoyer à Datadog.

Créez un namespace dédié pour l'Agent Datadog :

```shell
kubectl create namespace datadog

# Copy the API key secret to the datadog namespace
kubectl get secret datadog-secret -n datadog-cloudprem -o yaml | \
  sed 's/namespace: datadog-cloudprem/namespace: datadog-agent/' | \
  kubectl apply -f -
```

Installez l'opérateur Datadog :

```yaml
# Datadog Agent Helm Values for GKE Autopilot
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "1000000h"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    dogstatsd:
        port: 8125
        useHostPort: false  # Must be false in Autopilot
        nonLocalTraffic: true

```

Installez l'Agent Datadog :

```shell
kubectl apply -f datadog-operator-values.yaml
```

Vérifiez que l'Agent Datadog est en cours d'exécution :

```shell
kubectl get pods -n datadog
```

Mettez à jour CloudPrem pour envoyer des métriques au service DogStatsD de l'Agent Datadog. Ajoutez ceci à votre fichier `values.yaml` :

```yaml
# DogStatsD configuration - send metrics to Datadog Agent
dogstatsdServer:
  host:
    value: "datadog-agent.datadog.svc.cluster.local"
  port: 8125
```

Mettez à jour CloudPrem avec la nouvelle configuration :

```shell
helm upgrade cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml \
  --timeout 10m
```

Vérifiez la configuration DogStatsD :

```shell
kubectl get pod -n datadog-cloudprem -l app.kubernetes.io/component=metastore -o jsonpath='{.items[0].spec.containers[0].env[?(@.name=="CP_DOGSTATSD_SERVER_HOST")].value}'
# Should output: datadog-agent.datadog.svc.cluster.local
```

### Étape 10 : vérifier le déploiement

Vérifiez le statut des pods :
```shell
kubectl get pods -n datadog-cloudprem
```

Tous les pods doivent être à l'état `Running` avec le statut `READY` :
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

Vérifiez les logs du metastore pour confirmer la connexion à la base de données :
```shell
kubectl logs -n datadog-cloudprem -l app.kubernetes.io/component=metastore --tail=50
```

## Désinstallation

Pour supprimer complètement CloudPrem :

```shell
# Uninstall Helm release
helm uninstall cloudprem --namespace datadog-cloudprem

# Delete namespace
kubectl delete namespace datadog-cloudprem

# Delete Cloud SQL instance
gcloud sql instances delete cloudprem-postgres --quiet

# Delete GCS bucket
gsutil -m rm -r gs://${BUCKET_NAME}

# Delete GCP service account
gcloud iam service-accounts delete \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --quiet

# Delete GKE cluster
gcloud container clusters delete ${CLUSTER_NAME} \
  --region ${REGION} \
  --quiet
```

## Meilleures pratiques

- **Utilisez Workload Identity** plutôt que des clés de compte de service pour une meilleure sécurité.
- **Activez les sauvegardes Cloud SQL** pour la reprise après sinistre.
- **Utilisez des clusters GKE régionaux** pour la haute disponibilité.
- **Surveillez l'utilisation du disque** sur les nœuds d'indexation et activez la mise à l'échelle automatique.
- **Configurez des alertes** dans Datadog pour surveiller l'état des composants CloudPrem.
- **Utilisez des clusters GKE privés** pour renforcer la sécurité en production.
- **Mettez régulièrement à jour** CloudPrem vers la dernière version pour bénéficier des corrections de bugs et des nouvelles fonctionnalités.
- **Testez la mise à l'échelle** dans un environnement de staging avant d'effectuer des modifications en production.
- **Stockez le mot de passe de la base de données** dans Secret Manager et utilisez External Secrets Operator (ESO) ou le pilote Secrets Store CSI pour fournir le mot de passe aux pods du metastore.

## Étapes suivantes

- Configurez vos applications pour envoyer des données de télémétrie à CloudPrem
- Configurez des dashboards dans Datadog pour surveiller les performances de CloudPrem
- Consultez les logs et métriques CloudPrem dans votre compte Datadog
- Planifiez la capacité en fonction de votre volume de données

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site/