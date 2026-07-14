---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentación
  text: Configurar el ingreso a CloudPrem
- link: /cloudprem/ingest/
  tag: Documentación
  text: Configurar la ingesta de logs
title: CloudPrem en Google Kubernetes Engine (GKE)
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Esta configuración de instalación te guiará a través del despliegue de Datadog CloudPrem en Google Kubernetes Engine (GKE).

CloudPrem en GKE utiliza los siguientes servicios de Google Cloud:
- **Google Kubernetes Engine (GKE)**: plataforma de orquestación de contenedores para ejecutar componentes de CloudPrem.
- **Cloud Storage (GCS)**: almacenamiento de objetos para datos telemétricos e índices.
- **Cloud SQL para PostgreSQL**: base de datos de PostgreSQL gestionada para el almacenamiento de metadatos.
- **Identidad de la carga de trabajo**: autenticación segura entre las cargas de trabajo de GKE y los servicios de Google Cloud.

## Requisitos previos

Antes de empezar, confirma que tienes:

1. **CLI de Google Cloud** instalado y configurado
   ```shell
   gcloud version
   ```

2. **kubectl** instalado
   ```shell
   kubectl version --client
   ```

3. **Helm 3.x** instalado
   ```shell
   helm version
   ```

4. **Proyecto de GCP** con facturación activada
   ```shell
   gcloud config set project YOUR_PROJECT_ID
   ```

5. **Permisos de IAM requeridos**:
   - `roles/container.admin` (Administrador de Kubernetes Engine)
   - `roles/iam.serviceAccountAdmin` (Administrador de cuentas de servicio)
   - `roles/compute.admin` (Administrador de cómputo)

6. **[Crea o recupera tu clave de API][1]**.

7. **APIs habilitadas**:
   ```shell
   gcloud services enable container.googleapis.com \
     compute.googleapis.com \
     sqladmin.googleapis.com \
     storage.googleapis.com
   ```

## Pasos de la instalación

### Paso 1: Establecer variables de entorno

Establece las siguientes variables de entorno para simplificar los comandos posteriores y reducir los errores de copiar y pegar.

```shell
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export CLUSTER_NAME="cloudprem-cluster"
export DATADOG_SITE="datadoghq.com"  # or datadoghq.eu, us3.datadoghq.com, us5.datadoghq.com
export BUCKET_NAME="${PROJECT_ID}-cloudprem"
```

### Paso 2: Crear clúster de GKE

Crea un clúster de GKE con Workload Identity activado:

```shell
gcloud container clusters create ${CLUSTER_NAME} \
  --region ${REGION} \
  --num-nodes 1 \
  --workload-pool=${PROJECT_ID}.svc.id.goog \
  --machine-type n1-standard-4
```

{{% collapse-content title="Recomendaciones sobre el tamaño de los clústeres" level="h4" %}}
- **Pequeño (Dev/test)**: 3 nodos, n1-standard-4 (~100 GB/día)
- **Medio (producción)**: 5 nodos, n1-standard-8 (~500 GB/día)
- **Grande (Empresa)**: 7+ nodos, n1-standard-16 (~1 TB+/día)
{{% /collapse-content %}}

Obtén las credenciales del clúster:
```shell
gcloud container clusters get-credentials ${CLUSTER_NAME} --region ${REGION}
```

Instala el complemento de autenticación de GKE:
```shell
gcloud components install gke-gcloud-auth-plugin
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
```

Verifica el acceso al clúster:
```shell
kubectl cluster-info
kubectl get nodes
```

### Paso 3: Crear un bucket de Cloud Storage

Crea un bucket de GCS para el almacenamiento de datos de CloudPrem:

```shell
export BUCKET_NAME="cloudprem-data-${PROJECT_ID}"

gcloud storage buckets create gs://${BUCKET_NAME} \
  --project=${PROJECT_ID} \
  --location=${REGION} \
  --uniform-bucket-level-access
```

### Paso 4: Crear una instancia PostgreSQL de Cloud SQL

Crea una instancia PostgreSQL de Cloud SQL para el almacenamiento de metadatos:

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

Esto puede tardar unos minutos. Espera a que la instancia esté lista:

```shell
gcloud sql instances describe cloudprem-postgres \
  --format="value(state)"
# Should output: RUNNABLE
```

Crea la base de datos de CloudPrem:
```shell
gcloud sql databases create cloudprem \
  --instance=cloudprem-postgres
```

Consulta los detalles de conexión:
```shell
export DB_CONNECTION_NAME=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(connectionName)")
export DB_PUBLIC_IP=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(ipAddresses[0].ipAddress)")

echo "Connection Name: ${DB_CONNECTION_NAME}"
echo "Public IP: ${DB_PUBLIC_IP}"
```

Autoriza a los nodos de GKE a conectarse a Cloud SQL:
```shell
# Get GKE node external IPs
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')

# Authorize the IPs
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

### Paso 5: Configurar IAM y Workload Identity

Crea una cuenta de servicio de GCP para CloudPrem:

```shell
export SERVICE_ACCOUNT_NAME="cloudprem-sa"

gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
  --display-name="CloudPrem Service Account" \
  --project=${PROJECT_ID}
```

Conceder los roles de IAM necesarios:

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

Crea un espacio de nombres de Kubernetes y una cuenta de servicio:

```shell
kubectl create namespace datadog-cloudprem

kubectl create serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem

kubectl annotate serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem \
  iam.gke.io/gcp-service-account=${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

Vincula la cuenta de servicio de GCP a la cuenta de servicio de Kubernetes:

```shell
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

### Paso 6: Crear secretos de Kubernetes 

Crea un secreto para la clave de API de Datadog:

```shell
kubectl create secret generic datadog-secret \
  --from-literal=api-key=${DD_API_KEY} \
  --namespace=datadog-cloudprem
```

Crear secreto para la conexión PostgreSQL:

<div class="alert alert-danger">La contraseña debe estar codificada en URL. Por ejemplo: <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

```shell
# URL-encode the password first
# Example: if password is "abc/def+ghi=" it becomes "abc%2Fdef%2Bghi%3D"

kubectl create secret generic cloudprem-metastore-config \
  --from-literal=QW_METASTORE_URI="postgresql://postgres:${DB_PASSWORD}@${DB_PUBLIC_IP}:5432/cloudprem" \
  --namespace=datadog-cloudprem
```

### Paso 7: Instalar CloudPrem con Helm

Añade el repositorio de Datadog Helm:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Crea un archivo `values.yaml`:

Configura tu [sitio de Datadog][2] como {{< region-param key="dd_site" code="true" >}}.

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

Instala CloudPrem:

```shell
helm install cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml
```

### Paso 8: Añadir entrada de GCE interna

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

### Paso 9: Instalar el Datadog Agent (recomendado)

Instala el Datadog Agent para recopilar métricas de los componentes de CloudPrem y enviarlas a Datadog.

Crea un espacio de nombres independiente para el Datadog Agent:

```shell
kubectl create namespace datadog

# Copy the API key secret to the datadog namespace
kubectl get secret datadog-secret -n datadog-cloudprem -o yaml | \
  sed 's/namespace: datadog-cloudprem/namespace: datadog-agent/' | \
  kubectl apply -f -
```

Instala el Datadog Operator:

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

Instala el Datadog Agent:

```shell
kubectl apply -f datadog-operator-values.yaml
```

Comprueba que el Datadog Agent está en funcionamiento:

```shell
kubectl get pods -n datadog
```

Actualiza CloudPrem para enviar métricas al servicio DogStatsD del Datadog Agent. Añade esto a tu `values.yaml`:

```yaml
# DogStatsD configuration - send metrics to Datadog Agent
dogstatsdServer:
  host:
    value: "datadog-agent.datadog.svc.cluster.local"
  port: 8125
```

Actualiza CloudPrem con la nueva configuración:

```shell
helm upgrade cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml \
  --timeout 10m
```

Verifica la configuración de DogStatsD:

```shell
kubectl get pod -n datadog-cloudprem -l app.kubernetes.io/component=metastore -o jsonpath='{.items[0].spec.containers[0].env[?(@.name=="CP_DOGSTATSD_SERVER_HOST")].value}'
# Should output: datadog-agent.datadog.svc.cluster.local
```

### Paso 10: Verificar el despliegue

Comprueba el estado del pod:
```shell
kubectl get pods -n datadog-cloudprem
```

Todos los pods deben estar en estado `Running` con `READY`:
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

Comprueba los logs del metastore para ver si fue exitosa la conexión de la base de datos:
```shell
kubectl logs -n datadog-cloudprem -l app.kubernetes.io/component=metastore --tail=50
```

## Desinstalar

Para eliminar por completo CloudPrem:

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

## Prácticas recomendadas

- **Utiliza Workload Identity** en lugar de claves de cuenta de servicio para mayor seguridad.
- **Habilita las copias de seguridad de Cloud SQL** para la recuperación ante desastres.
- **Utiliza clústeres regionales de GKE** para una alta disponibilidad.
- **Monitoriza el uso del disco** en nodos indexadores y activa el autoescalado.
- **Establece alertas** en Datadog para el estado de los componentes de CloudPrem.
- **Utiliza clústeres privados de GKE** para mejorar la seguridad en producción.
- **Actualiza regularmente** CloudPrem a la última versión para obtener correcciones de errores y funciones.
- **Testea el escalado** en un entorno de ensayo antes de los cambios de producción.
- **Almacena la contraseña de la base de datos** en Secret Manager y utiliza External Secrets Operator (ESO) o Secrets Store CSI Driver para proporcionar la contraseña a los pods del metastore.

## Siguientes pasos

- Configura tus aplicaciones para enviar telemetría a CloudPrem
- Configura dashboards en Datadog para monitorizar el rendimiento de CloudPrem
- Revisa los logs y métricas de CloudPrem en tu cuenta de Datadog 
- Planifica la capacidad en función de tu volumen de datos

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/