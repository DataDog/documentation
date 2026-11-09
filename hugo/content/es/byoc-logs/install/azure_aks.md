---
aliases:
- /es/cloudprem/configure/azure_config/
- /es/cloudprem/install/azure_aks/
description: Aprenda a instalar y configurar BYOC Logs en Azure AKS
title: Instale BYOC Logs en Azure AKS
---
## Descripción general {#overview}

Este documento lo guía a través del proceso de configuración de su entorno de Azure e instalación de BYOC (Bring Your Own Cloud) Logs en Azure AKS.

## Requisitos previos {#prerequisites}

Antes de instalar BYOC Logs en Azure, debe configurar un conjunto de recursos de infraestructura de soporte. Estos componentes proporcionan los servicios fundamentales de cómputo, almacenamiento, base de datos y redes de los que depende BYOC Logs.

### Requisitos de infraestructura {#infrastructure-requirements}
Estos son los componentes que debe aprovisionar:

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): Un clúster de AKS en ejecución dimensionado para su carga de trabajo esperada de BYOC Logs.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): Una instancia de Azure Database for PostgreSQL que BYOC Logs utilizará para almacenar sus metadatos.
- [**Contenedor de Blob Storage**](#blob-storage-container): Un contenedor de Azure Storage para almacenar los datos de BYOC Logs.
- [**Identidad de cliente y permisos**](#client-identity-and-permissions): Una aplicación de Azure AD con acceso de lectura/escritura al contenedor de almacenamiento.
- [**Controlador de ingreso NGINX**](#nginx-ingress-controller): Instalado en el clúster de AKS para enrutar el tráfico externo a los servicios de BYOC Logs.
- **Datadog Agent**: Implementado en el clúster de AKS para recopilar y enviar registros a BYOC Logs.

### Azure Kubernetes Service (AKS) {#azure-kubernetes-service-aks}

BYOC Logs se ejecuta completamente en Kubernetes. Necesita un clúster de AKS con suficiente CPU, memoria y espacio en disco configurado para su carga de trabajo. Consulte las recomendaciones de dimensionamiento del clúster de Kubernetes para obtener orientación.

#### Implemente el clúster de AKS {#deploy-the-aks-cluster}

- [Implemente un clúster de AKS con la CLI de Azure][2]
- [Implemente un clúster de AKS con Terraform][3]

#### Verifique la conectividad y el estado del clúster {#verify-cluster-connectivity-and-health}
Para confirmar que el clúster es accesible y que los nodos están en el estado `Ready`, ejecute el siguiente comando:

```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server {#azure-postgresql-flexible-server}

BYOC Logs almacena sus metadatos y configuración en una base de datos PostgreSQL. Datadog recomienda Azure Database for PostgreSQL Flexible Server. Debe ser accesible desde el clúster de AKS, idealmente con redes privadas habilitadas. Consulte las recomendaciones de dimensionamiento de Postgres para obtener más detalles.

#### Cree la base de datos PostgreSQL {#create-the-postgresql-database}

- [Cree un Azure Database for PostgreSQL Flexible Server mediante la CLI de Azure][4]
- [Cree un Azure Database for PostgreSQL Flexible Server mediante Terraform][5]

#### Verifique la conectividad de la base de datos {#verify-database-connectivity}

<div class="alert alert-info">Por seguridad, cree una base de datos y un usuario dedicados para BYOC Logs, y otorgue al usuario derechos únicamente en esa base de datos, no en todo el clúster.</div>

Conéctese a su base de datos PostgreSQL desde dentro de la red de AKS utilizando el cliente de PostgreSQL, `psql`. Primero, inicie un pod interactivo en su clúster de Kubernetes utilizando una imagen que incluya `psql`:

```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

Luego, ejecute el siguiente comando directamente desde el shell, reemplazando los valores de marcador de posición con sus valores reales:

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

Si tiene éxito, debería ver un aviso similar a:

```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Contenedor de Blob Storage {#blob-storage-container}

BYOC Logs utiliza Azure Blob Storage para persistir los registros. Cree un contenedor dedicado para este propósito.

#### Cree un contenedor de Blob Storage {#create-a-blob-storage-container}
Utilice un contenedor dedicado por entorno (por ejemplo, `byoc-logs-prod`, `byoc-logs-staging`) y asigne roles RBAC de privilegios mínimos a nivel de contenedor, en lugar de hacerlo en el ámbito de la cuenta de almacenamiento.

- [Cree un contenedor de Blob Storage usando la CLI de Azure][6]
- [Cree un contenedor de Blob Storage usando Terraform][7]

### Identidad de cliente y permisos {#client-identity-and-permissions}

Se debe otorgar acceso de lectura/escritura a una aplicación de Azure AD para el contenedor de Blob Storage. Registre una aplicación dedicada para BYOC Logs y asigne a la entidad de servicio correspondiente el rol `Contributor` en el contenedor de Blob Storage creado anteriormente.

#### Registre la aplicación {#register-the-application}
[Registre una aplicación en Microsoft Entra ID][8]

#### Asigne el rol de colaborador {#assign-contributor-role}
[Asigne un rol de Azure para el acceso a datos de blob][9]

### Controlador de entrada NGINX {#nginx-ingress-controller}

#### Controlador de entrada NGINX público {#public-nginx-ingress-controller}

La entrada pública es esencial para permitir que Datadog administre y consulte los clústeres de BYOC Logs a través de la internet pública. Proporciona acceso seguro a la API gRPC de BYOC Logs a través de los siguientes mecanismos:
- Crea un equilibrador de carga de Azure orientado a internet que acepta tráfico de los servicios de Datadog
- Implementa cifrado TLS con terminación a nivel del controlador de entrada
- Utiliza HTTP/2 (gRPC) para la comunicación entre Datadog y los clústeres BYOC Logs
- Requiere autenticación TLS mutua (mTLS) donde los servicios de Datadog deben presentar certificados de cliente válidos
- Configura el controlador en modo de paso a través de TLS para reenviar certificados de cliente a los pods BYOC Logs con el encabezado `ssl-client-cert`
- Rechaza las solicitudes a las que les falten certificados de cliente válidos o el encabezado de certificado

Utilice el siguiente archivo de valores de Helm `nginx-public.yaml` para crear el controlador de ingreso NGINX público:

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

Luego, instale el controlador con Helm usando el siguiente comando:

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

Verifique que el pod del controlador se esté ejecutando:

```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Verifique que el servicio exponga una IP externa:

```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### Controlador de ingreso NGINX interno {#internal-nginx-ingress-controller}

El ingreso interno permite la ingesta de registros desde agentes de Datadog y otros recolectores de registros dentro de su entorno a través de HTTP. Utilice el siguiente archivo de valores de Helm `nginx-internal.yaml` para crear el controlador de ingreso NGINX público:

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

Luego, instale el controlador con Helm usando el siguiente comando:

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

Verifique que el pod del controlador se esté ejecutando:

```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Verifique que el servicio exponga una IP externa:

```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS {#dns}

Opcionalmente, puede agregar una entrada DNS que apunte a la IP del balanceador de carga público, de modo que los cambios de IP futuros no requieran actualizar la configuración del lado de Datadog.

## Pasos de instalación {#installation-steps}

1. [Instale el chart de Helm de BYOC Logs](#install-the-byoc-logs-helm-chart)
2. [Verifique la instalación](#verification)

## Instale el chart de Helm de BYOC Logs {#install-the-byoc-logs-helm-chart}

1. Agregue y actualice el repositorio de Helm de Datadog:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Cree un espacio de nombres de Kubernetes para el chart:
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   Por ejemplo, para crear un espacio de nombres `byoc-logs`:
   ```shell
   kubectl create namespace byoc-logs
   ```

   **Nota**: Puede establecer un espacio de nombres predeterminado para su contexto actual para evitar tener que escribir `-n <NAMESPACE_NAME>` con cada comando:
   ```shell
   kubectl config set-context --current --namespace=byoc-logs
   ```

1. Almacene su clave de Datadog API como un secreto de Kubernetes:

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. Almacene la cadena de conexión de la base de datos PostgreSQL como un secreto de Kubernetes:
   Para recuperar los detalles de su conexión a PostgreSQL, vaya al Portal de Azure, navegue a {{< ui >}}All resources{{< /ui >}}, luego haga clic en su instancia de _Azure Database for PostgreSQL flexible server_. Finalmente, en la pestaña {{< ui >}}Getting started{{< /ui >}}, haga clic en el enlace {{< ui >}}View connection strings{{< /ui >}} en la tarjeta {{< ui >}}Connect{{< /ui >}}.

   ```shell
   kubectl create secret generic byoc-logs-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   Por ejemplo, para almacenar un secreto `metastore-uri` en el espacio de nombres `byoc-logs`:
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

1. Almacene el secreto del cliente o la clave de acceso de la cuenta de almacenamiento como un secreto de Kubernetes:
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Personalice el chart de Helm:

   Cree un archivo `datadog-values.yaml` para sobrescribir los valores predeterminados con su configuración personalizada. Aquí es donde define los ajustes específicos del entorno, como la etiqueta de la imagen, el ID de inquilino de Azure, la cuenta de servicio, la configuración de ingreso, las solicitudes y límites de recursos, y más.

   Cualquier parámetro que no se sobrescriba explícitamente en `datadog-values.yaml` recurre a los valores predeterminados definidos en el `values.yaml` del chart.

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   Aquí tiene un ejemplo de un archivo `datadog-values.yaml` con sobrescrituras para Azure:

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

1. Instale o actualice el chart de Helm
    ```shell
    helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

## Verificación {#verification}

### Verifique el estado de la implementación {#check-deployment-status}

Verifique que todos los componentes de BYOC Logs estén en ejecución:

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## Desinstalar {#uninstall}

Para desinstalar BYOC Logs, ejecute el siguiente comando:

```shell
helm uninstall <RELEASE_NAME>
```

## Próximo paso {#next-step}

**[Configure la ingesta de registros con el Datadog Agent][10]** - Configure el Datadog Agent para enviar registros a BYOC Logs

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /es/byoc-logs/ingest/agent/