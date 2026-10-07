---
description: Aprende a instalar y configurar CloudPrem en cualquier clúster de Kubernetes
  utilizando PostgreSQL y MinIO para el almacenamiento de objetos.
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentación
  text: Configurar el ingreso a CloudPrem
- link: /cloudprem/ingest/
  tag: Documentación
  text: Configurar la ingesta de logs
- link: /cloudprem/operate/troubleshooting
  tag: Documentación
  text: Solución de problemas de CloudPrem
title: Instala CloudPrem en Kubernetes con PostgreSQL y MinIO
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Esta documentación te guía a través del proceso de instalación de CloudPrem en cualquier clúster de Kubernetes utilizando PostgreSQL para el almacenamiento de metadatos y MinIO para el almacenamiento de objetos compatible con S3.

Esta configuración es ideal para entornos en los que gestionas tu propia infraestructura o no utilizas los servicios gestionados de un proveedor de nube importante.

## Requisitos previos

Antes de empezar, confirma que tienes:

- **kubectl** instalado y configurado para acceder a tu clúster de Kubernetes 
  ```shell
  kubectl version --client
  ```

- **Helm 3.x** instalado
  ```shell
  helm version
  ```

- Un clúster de **Kubernetes** (v1.25 o posterior) en funcionamiento
  ```shell
  kubectl get nodes
  ```

- Una cuenta de **Datadog** con la función de CloudPrem activada

- Una **[clave de API de Datadog][1]**

- Una **base de datos de PostgreSQL** (v13 o posterior) accesible desde tu clúster de Kubernetes. Ten en cuenta los siguientes detalles de conexión:
  - Host
  - Puerto (por defecto: `5432`)
  - Nombre de la base de datos
  - Nombre de usuario
  - Contraseña

- Una instancia de **MinIO** accesible desde tu clúster de Kubernetes, con:
  - Un bucket creado para los datos de CloudPrem (por ejemplo, `cloudprem`)
  - Una clave de acceso y una clave secreta con permisos de lectura/escritura sobre el bucket
  - La URL del endpoint de MinIO (por ejemplo, `http://minio.minio.svc.cluster.local:9000`)

### Verificar la conectividad

Antes de continuar, confirma que tu clúster de Kubernetes puede alcanzar tanto PostgreSQL como MinIO.

**PostgreSQL**:
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

Si tienes éxito, deberías ver un mensaje en `psql`.

**MinIO**:
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

Si tienes éxito, el comando muestra el contenido de tu bucket de MinIO.

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

   <div class="alert alert-danger">Si tu contraseña contiene caracteres especiales, codifícalos primero en la URL. Por ejemplo: <code>/</code> → <code>%2F</code><code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"
   ```

1. Guarda las credenciales de MinIO como secreto en Kubernetes:

   ```shell
   kubectl create secret generic cloudprem-minio-credentials \
   -n <NAMESPACE_NAME> \
   --from-literal AWS_ACCESS_KEY_ID="<MINIO_ACCESS_KEY>" \
   --from-literal AWS_SECRET_ACCESS_KEY="<MINIO_SECRET_KEY>"
   ```

1. Personalizar el Helm chart:

   Crea un archivo `datadog-values.yaml` para sustituir los valores predeterminados por tu configuración personalizada. Aquí es donde se definen los ajustes específicos del entorno, como la cuenta de servicio, la configuración de entrada, las solicitudes y los límites de recursos, etc.

   Cualquier parámetro que no se haya sobrescrito explícitamente en `datadog-values.yaml` vuelve a los valores por defecto definidos en el `values.yaml` del chart.

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   El siguiente es un ejemplo de archivo `datadog-values.yaml` con anulaciones para una configuración de Kubernetes estándar con MinIO:

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Configuración de Datadog
datadog:
  # El sitio de Datadog (https://docs.datadoghq.com/getting_started/site/) al que conectarte. Por defecto es `datadoghq.com`.
  # site: datadoghq.com
  # El nombre del secreto existente que contiene la clave de API de Datadog. El nombre de la clave secreta debe ser `api-key`.
  apiKeyExistingSecret: datadog-secret

# Variables de entorno
# Las credenciales de MinIO se montan desde el secreto de Kubernetes.
# Cualquier variable de entorno definida aquí estará disponible para todos los pods del despliegue.
environment:
  AWS_REGION: us-east-1

# Configuración de la cuenta de servicio
serviceAccount:
  create: true
  name: cloudprem

# Configuración del nodo de CloudPrem
config:
  # The root URI where index data is stored. This should be an S3-compatible path pointing to your MinIO bucket.
  # Todos los índices creados en CloudPrem se almacenan en esta ubicación.
  default_index_root_uri: s3://<BUCKET_NAME>/indexes
  storage:
    s3:
      endpoint: <MINIO_ENDPOINT>
      # force_path_style_access must be true for MinIO.
      force_path_style_access: true

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
        name: cloudprem-metastore-uri
    - secretRef:
        name: cloudprem-minio-credentials

# Configuración del indexador
# El indexador se encarga de procesar e indexar los datos entrantes que recibe de diversas fuentes
# (por ejemplo, Datadog Agents, recopiladores de logs) y lo transforma en archivos de búsqueda llamados "splits".
# almacenados en MinIO.
#
# El indexador es escalable horizontalmente: puedes aumentar `replicaCount` para gestionar un mayor rendimiento de indexación.
# El parámetro `podSize` establece automáticamente los ajustes específicos de vCPU, memoria y componentes.
# Consulta la guía de dimensionamiento para conocer los niveles disponibles y sus configuraciones.
indexer:
  replicaCount: 2
  podSize: xlarge
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Configuración del buscador
# El buscador es responsable de ejecutar las consultas de búsqueda contra los datos indexados almacenados en MinIO.
# Gestiona las solicitudes de búsqueda del servicio de consulta de Datadog y devuelve los resultados coincidentes.
#
# El buscador es escalable horizontalmente; puedes aumentar `replicaCount` para manejar búsquedas más concurrentes.
# Las necesidades de recursos de los buscadores dependen en gran medida de la carga de trabajo y deben determinarse empíricamente.
# Entre los factores clave que influyen en el rendimiento de las búsquedas se encuentran:
# - Complejidad de la consulta (por ejemplo, número de términos, uso de comodines o expresiones regulares)
# - Concurrencia de consultas (número de búsquedas simultáneas)
# - Cantidad de datos escaneados por consulta
# - Patrones de acceso a los datos (tasa de aciertos de la caché)
#
# La memoria es especialmente importante para los buscadores, ya que almacenan en memoria los datos de índice a los que acceden con frecuencia.
searcher:
  replicaCount: 2
  podSize: xlarge
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Configuración del plano de control
controlPlane:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Configuración de Janitor
janitor:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials
{{< /code-block >}}

   Sustituye los siguientes parámetros por tus valores reales:
   - `<BUCKET_NAME>`: el nombre de tu bucket de MinIO (por ejemplo, `cloudprem`)
   - `<MINIO_ENDPOINT>`: la URL del endpoint de MinIO (por ejemplo, `http://minio.minio.svc.cluster.local:9000`)

1. Instalar o actualizar el Helm chart:

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

Todos los pods deben estar en estado `Running`:
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

### Comprobar la conectividad del metastore

Verifica que el metastore puede conectarse a PostgreSQL comprobando sus logs:
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=metastore --tail=50
```

Deberías ver entradas de log que indican que las operaciones de unión y división del clúster se han realizado correctamente, sin errores de conexión.

### Comprobar la conectividad del almacenamiento

Verifica que los indexadores pueden escribir en MinIO comprobando los logs del indexador:
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=indexer --tail=50
```

## Desinstalar

Para desinstalar CloudPrem:

```shell
helm uninstall <RELEASE_NAME> -n <NAMESPACE_NAME>
```

Además, para eliminar el espacio de nombres y los secretos asociados:

```shell
kubectl delete namespace <NAMESPACE_NAME>
```

## Siguiente paso

**Configurar la ingesta de logs con el Datadog Agent][2]**: configura el Datadog Agent para enviar logs a CloudPrem

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/cloudprem/ingest/agent/