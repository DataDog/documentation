---
description: Aprende a instalar y configurar CloudPrem en Azure AKS
title: Instalar CloudPrem en Azure AKS
---

## Información general
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

Este documento te guiará a través del proceso de instalación de CloudPrem en Azure AKS.

## Requisitos previos

Antes de empezar a utilizar CloudPrem, asegúrate de que dispones de:

- Cuenta de Azure con los permisos necesarios
- Kubernetes `1.32+` ([AKS][1] recomendado)
- Base de datos PostgreSQL (se recomienda [Azure Database para PostgreSQL][2])
- Contenedor de Azure Blob Storage para almacenar logs
- Datadog Agent
- Herramienta de línea de comandos de Kubernetes (`kubectl`)
- Herramienta de línea de comandos de Helm (`helm`)

## Pasos de la instalación

1. [Preparar tu entorno de Azure](#prepare-your-azure-environment)
2. [Instalar el Helm chart de CloudPrem](#install-the-cloudprem-helm-chart)
3. [Verificar instalación](#verification)
4. [Configurar tu cuenta de Datadog ](#configure-your-datadog-account)

## Preparar tu entorno de Azure

Antes de instalar CloudPrem en AKS, asegúrate de que tu entorno de Azure está configurado correctamente. Para obtener instrucciones detalladas de configuración de Azure, consulta la [Guía de configuración de Azure][3].

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
# Las solicitudes de recursos y los límites deben ajustarse en función de la carga de trabajo de indexación.
#
# Los valores predeterminados son adecuados para cargas de indexación moderadas de hasta 20 MB/s por pod de indexador.
indexer:
  replicaCount: 2

  resources:
    requests:
      cpu: "4"
      memory: "8Gi"
    limits:
      cpu: "4"
      memory: "8Gi"

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

     resources:
       requests:
         cpu: "4"
         memory: "16Gi"
       limits:
         cpu: "4"
         memory: "16Gi"
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

**[Configurar la ingesta de logs con el Datadog Agent][4]**: configura el Datadog Agent para enviar logs a CloudPrem

<!-- ## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://azure.microsoft.com/en-us/products/kubernetes-service
[2]: https://azure.microsoft.com/en-us/products/postgresql
[3]: /es/cloudprem/configure/azure_config/
[4]: /es/cloudprem/ingest_logs/datadog_agent