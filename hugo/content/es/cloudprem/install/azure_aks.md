---
aliases:
- /es/cloudprem/configure/azure_config/
description: Aprende a instalar y configurar CloudPrem en Azure AKS
title: Instalar CloudPrem en Azure AKS
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Este documento te guiará a través del proceso de configuración de tu entorno de Azure y la instalación de CloudPrem en Azure AKS.

## Requisitos previos

Antes de instalar CloudPrem en Azure, debes configurar un conjunto de recursos de infraestructura de soporte. Estos componentes proporcionan los servicios básicos de computación, almacenamiento, bases de datos y redes de los que depende CloudPrem.

### Requisitos de infraestructura
Estos son los componentes que debes aprovisionar:

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): un clúster de AKS en ejecución dimensionado para tu carga de trabajo prevista en CloudPrem.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): una instancia de Azure Database para PostgreSQL que CloudPrem utilizará para almacenar sus metadatos.
- [**Contenedor de Blob Storage**](#blob-storage-container): un contenedor de Azure Storage para alojar logs de CloudPrem.
- [Identidad y permisos del cliente**](#client-identity-and-permissions): una aplicación de Azure AD con acceso de lectura/escritura al contenedor de almacenamiento.
- [**NGINX Ingress Controller**](#NGINX-ingress-controller): instalado en el clúster de AKS para enrutar el tráfico externo a los servicios de CloudPrem.
- **Datadog Agent**: desplegado en el clúster de AKS para recopilar y enviar logs a CloudPrem.

### Azure Kubernetes Service (AKS)

CloudPrem se ejecuta íntegramente en Kubernetes. Necesitas un clúster de AKS con suficiente CPU, memoria y espacio en disco configurado para tu carga de trabajo. Consulta las recomendaciones de dimensionamiento de clústeres de Kubernetes para obtener orientación.

#### Despliegue del clúster de AKS

- [Despliegue de un clúster de AKS con la CLI de Azure][2]
- [Despliegue de un clúster de AKS con Terraform][3]

#### Verificar la conectividad y el estado del clúster
Para confirmar que se puede acceder al clúster y que los nodos están en el estado `Ready`, ejecuta el siguiente comando:
```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server

CloudPrem almacena sus metadatos y configuración en una base de datos PostgreSQL. Datadog recomienda Azure Database for PostgreSQL Flexible Server. Debe ser accesible desde el clúster de AKS, idealmente con la red privada habilitada. Consulta las recomendaciones de tamaño de Postgres para obtener más detalles.

#### Crear la base de datos PostgreSQL

- [Crear una base de datos de Azure para PostgreSQL Flexible Server utilizando la CLI de Azure][4]
- [Crear una base de datos de Azure para PostgreSQL Flexible Server utilizando Terraform][5]

#### Verificar la conectividad de la base de datos

<div class="alert alert-info">Por motivos de seguridad, crea una base de datos y un usuario dedicados para CloudPrem, y concede al usuario derechos solo en esa base de datos, no en todo el clúster.</div>

Conéctate a tu base de datos de PostgreSQL desde la red de AKS utilizando el cliente de PostgreSQL, `psql`. En primer lugar, inicia un pod interactivo en tu clúster de Kubernetes utilizando una imagen que incluya `psql`:
```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

A continuación, ejecuta el siguiente comando directamente desde el intérprete de comandos, sustituyendo los valores de los parámetros por los valores reales:

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

Si tienes éxito, debes ver un mensaje similar a:
```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Contenedor de Blob Storage

CloudPrem utiliza Azure Blob Storage para persistir logs. Crea un contenedor dedicado para este fin.

#### Crear un contenedor de Blob Storage
Utiliza un contenedor dedicado por entorno (por ejemplo, `cloudprem-prod`, `cloudprem-staging`) y asigna los roles RBAC con menos privilegios a nivel de contenedor, en lugar de a nivel de cuenta de almacenamiento.

- [Crear un contenedor de Blob Storage utilizando la CLI de Azure][6]
- [Crear un contenedor de Blob Storage con Terraform][7]

### Identidad y permisos del cliente

Se debe conceder a una aplicación Azure AD acceso de lectura/escritura al contenedor de Blob Storage. Registra una aplicación dedicada para CloudPrem y asigna a la entidad principal de servicio correspondiente el rol `Contributor` en el contenedor de Blob Storage creado anteriormente.

#### Registrar la aplicación
[Registrar una aplicación en Microsoft Entra ID][8]

#### Asignar rol de colaborador
[Asignar un rol de Azure para acceder a los datos de blob][9]

### Controlador de entrada NGINX

#### Controlador de entrada NGINX público

La entrada pública es esencial para permitir que el plano de control y el servicio de consulta de Datadog gestionen y consulten los clústeres de CloudPrem a través de la Internet pública. Proporciona acceso seguro a la API gRPC de CloudPrem a través de los siguientes mecanismos:
- Crea un Azure Load Balancer orientado a Internet que acepte tráfico de los servicios de Datadog.
- Implementa el cifrado TLS con terminación a nivel de controlador de entrada.
- Utiliza HTTP/2 (gRPC) para la comunicación entre los clústeres de Datadog y CloudPrem.
- Requiere autenticación TLS mutua (mTLS), en la que los servicios de Datadog deben presentar certificados de cliente válidos.
- Configura el controlador en modo TLS passthrough para reenviar certificados de cliente a los pods de CloudPrem con el encabezado `ssl-client-cert` 
- Rechaza las solicitudes en las que falten certificados de cliente válidos o el encabezado del certificado.

Utiliza el siguiente archivo de valores Helm `NGINX-public.yaml` para crear el controlador de entrada público NGINX:

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

A continuación, instala el controlador con Helm utilizando el siguiente comando:

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

Comprueba que el pod del controlador está en funcionamiento:
```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Comprueba que el servicio expone una IP externa:
```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### Controlador de entrada interno NGINX

La entrada interna permite la ingesta de logs desde Datadog Agents y otros recopiladores de logs dentro de tu entorno a través de HTTP. Utiliza el siguiente archivo de valores Helm `nginx-internal.yaml` para crear el controlador de entrada público NGINX:

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

A continuación, instala el controlador con Helm utilizando el siguiente comando:

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

Comprueba que el pod del controlador está en funcionamiento:
```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Comprueba que el servicio expone una IP externa:
```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS

Opcionalmente, puedes añadir una entrada DNS que apunte a la IP del equilibrador de carga público, de forma que futuros cambios de IP no requieran actualizar la configuración en el lado de Datadog.

## Pasos de la instalación

1. [Instalar el Helm chart de CloudPrem](#install-the-cloudprem-helm-chart)
2. [Verificar instalación](#verification)

## Instalar el Helm chart de CloudPrem

1. Añade y actualiza el repositorio de Datadog Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Crea un espacio de nombres de Kubernetes para el chart:
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   Por ejemplo, para crear un espacio de nombres `cloudprem`:
   ```shell
   kubectl create namespace cloudprem
   ```

   **Nota**: Puedes establecer un espacio de nombres predeterminado para tu contexto actual para evitar tener que escribir `-n <NAMESPACE_NAME>` con cada comando:
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Guarda tu clave de API de Datadog como secreto de Kubernetes:

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. Almacena la cadena de conexión de la base de datos PostgreSQL como secreto de Kubernetes:
   Para recuperar los detalles de tu conexión de PostgreSQL, ve al portal de Azure, navega a **All resources** (Todos los recursos) y, a continuación, haz clic en tu instancia _Azure Database for PostgreSQL flexible server_ (Servidor flexible de Azure Database para PostgreSQL). Finalmente, en la pestaña **Getting started** (Introducción), haz clic en el enlace _View connection strings_ (Ver cadenas de conexión) en **Connect card** (Tarjeta de conexión).

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   Por ejemplo, para almacenar un secreto `metastore-uri` en el espacio de nombres `cloudprem`:
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

1. Guarda el secreto del cliente o la clave de acceso a la cuenta de almacenamiento como secreto en Kubernetes:
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Personalizar el Helm chart:

   Crea un archivo `datadog-values.yaml` para sustituir los valores predeterminados por tu configuración personalizada. Aquí es donde se definen los ajustes específicos del entorno, como la etiqueta de imagen, el ID de inquilino de Azure, la cuenta de servicio, la configuración de entrada, las solicitudes y los límites de recursos, etc.

   Cualquier parámetro que no se haya sobrescrito explícitamente en `datadog-values.yaml` vuelve a los valores por defecto definidos en el `values.yaml` del chart.

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   A continuación, verás un ejemplo de archivo `datadog-values.yaml` con anulaciones para Azure:

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Configuración de Datadog
datadog:
  # El sitio de Datadog (https://docs.datadoghq.com/getting_started/site/) al que conectarte. Por defecto es `datadoghq.com`.
  # site: datadoghq.com
  # El nombre del secreto existente que contiene la clave de API de Datadog. El nombre de la clave secreta debe ser `api-key`.
  apiKeyExistingSecret: datadog-secret

azure:
  tenantId: <TENANT_ID> # required
  clientId: <CLIENT_ID> # required when using AD App to authenticate with Blob Storage
  clientSecretRef:
    name: <SECRET_NAME>
    key: <SECRET_KEY>
  storageAccount:
    name: <STORAGE_ACCOUNT_NAME> # required
    # Si estás utilizando una clave de acceso de cuenta de almacenamiento para autenticarte con Blob Storage,
    # comenta la sección `clientSecretRef` arriba,
    # y descomenta la sección `storageAccount` a continuación:
    # accessKeySecretRef:
      # name: <SECRET_NAME>
      # key: <SECRET_KEY>

   # Configuración de la cuenta de servicio
   # Si `serviceAccount.create` se establece en `true`, se crea una cuenta de servicio con el nombre especificado.
   # Se pueden añadir anotaciones adicionales utilizando serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem

# Configuración del nodo de CloudPrem
config:
  # El URI raíz donde se almacenan los datos del índice. Debe ser una ruta de Azure.
  # Todos los índices creados en CloudPrem se almacenan en esta ubicación.
  default_index_root_uri: azure://<CONTAINER_NAME>/indexes

# Configuración de entrada interna
# El NLB de entrada interno se crea en subredes privadas.
#
# Se pueden añadir anotaciones adicionales para personalizar el comportamiento del ALB.
ingress:
  # La entrada interna es utilizada por Datadog Agents y otros recopiladores que se ejecutan fuera del
  # clúster de Kubernetes para enviar sus logs a CloudPrem.
  internal:
    enabled: true
    ingressClassName: nginx-internal
    host: cloudprem.acme.internal
    extraAnnotations: {}

# Configuración de metastore
# El metastore se encarga de almacenar y gestionar los metadatos de los índices.
# Requiere una cadena de conexión de base de datos de PostgreSQL proporcionada por un secreto de Kubernetes.
# El secreto debe contener una clave llamada `QW_METASTORE_URI` con un valor en el formato:
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# La cadena de conexión de metastore se monta en los pods utilizando extraEnvFrom para hacer referencia al secreto.
metastore:
  extraEnvFrom:
    - secretRef:
        nombre: cloudprem-metastore-uri

# Configuración del indexador
# El indexador es responsable de procesar e indexar los datos entrantes que recibe de diversas fuentes (por ejemplo, Datadog Agents, recopiladores de logs)
# y los transforma en archivos de búsqueda llamados "splits" almacenados en S3.
#
# El indexador es escalable horizontalmente: puedes aumentar `replicaCount` para gestionar un mayor rendimiento de indexación.
# El parámetro `podSize` establece automáticamente los ajustes específicos de vCPU, memoria y componentes.
# Consulta la guía de dimensionamiento para conocer los niveles disponibles y sus configuraciones.
indexer:
  replicaCount: 2
  podSize: xlarge

   # Configuración del buscador
   # El buscador es responsable de ejecutar las consultas de búsqueda contra los datos indexados almacenados en S3.
   # Gestiona las solicitudes de búsqueda del servicio de consulta de Datadog y devuelve los resultados coincidentes.
   #
   # El buscador es escalable horizontalmente; puedes incrementar `replicaCount` para manejar más búsquedas concurrentes.
   # Las necesidades de recursos de los buscadores dependen en gran medida de la carga de trabajo y deben determinarse empíricamente.
   # Entre los factores clave que influyen en el rendimiento de las búsquedas se encuentran:
   # - Complejidad de la consulta (por ejemplo, número de términos, uso de comodines o expresiones regulares)
   # - Concurrencia de consultas (número de búsquedas simultáneas)
   # - Cantidad de datos escaneados por consulta
   # - Patrones de acceso a los datos (tasas de aciertos de caché)
   #
   # La memoria es especialmente importante para los buscadores, ya que almacenan en memoria los datos de índice a los que se accede con frecuencia.
   searcher:
     replicaCount: 2
     podSize: xlarge
{{< /code-block >}}

1. Instalar o actualizar el Helm chart
    ```shell
    helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

## Verificación

### Comprobar el estado del despliegue

Comprueba que todos los componentes de CloudPrem se están ejecutando:

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## Desinstalar

Para desinstalar CloudPrem, ejecuta el siguiente comando:

```shell
helm uninstall <RELEASE_NAME>
```

## Siguiente paso

**Configurar la ingesta de logs con el Datadog Agent ][10]**: configura el Datadog Agent para enviar logs a CloudPrem

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /es/cloudprem/ingest/agent/