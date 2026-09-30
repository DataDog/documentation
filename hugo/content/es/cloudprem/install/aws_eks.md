---
aliases:
- /es/cloudprem/configure/aws_config/
description: Más información sobre cómo instalar y configurar CloudPrem en AWS EKS
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentación
  text: Configurar el ingreso a CloudPrem
- link: /cloudprem/ingest/
  tag: Documentación
  text: Configurar la ingesta de logs
title: Instalar CloudPrem en AWS EKS
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Este documento te guiará a través del proceso de configuración de tu entorno de AWS y la instalación de CloudPrem en AWS EKS.

## Requisitos previos

Para desplegar CloudPrem en AWS, es necesario configurar:
- Credenciales y autenticación de AWS
- Selección de regiones de AWS
- Permisos IAM para el almacenamiento de objetos S3
- Base de datos PostgreSQL RDS (recomendado)
- Clúster EKS con el controlador del balanceador de carga AWS

### Credenciales de AWS

Al iniciar un nodo, CloudPrem intenta encontrar las credenciales de AWS utilizando la cadena de proveedores de credenciales implementada por [rusoto_core::ChainProvider][2] y busca las credenciales en este orden:

1. Variables de entorno `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` o `AWS_SESSION_TOKEN` (opcional).
2. Archivo de perfiles de credenciales, normalmente ubicado en `~/.aws/credentials` o especificado por las variables de entorno `AWS_SHARED_CREDENTIALS_FILE` y `AWS_PROFILE` si están definidas y no están vacías.
3. Credenciales del contenedor de Amazon ECS, cargadas desde el contenedor de Amazon ECS si se define la variable de entorno `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI`.
4. Credenciales de perfiles de instancias, utilizadas en instancias Amazon EC2 y entregadas a través del servicio de metadatos de Amazon EC2.

Se devuelve un error si no se encuentran credenciales en la cadena.

### Región AWS

CloudPrem intenta encontrar la región AWS desde diversas fuentes, utilizando el siguiente orden de precedencia:

1. **Variables de entorno**: Comprueba `AWS_REGION`, luego `AWS_DEFAULT_REGION`.
2. **Archivo de configuración de AWS**: Normalmente se encuentra en `~/.aws/config` o en la ruta especificada por la variable de entorno `AWS_CONFIG_FILE` (si está configurada y no está vacía).
3. **Metadatos de instancia EC2**: Utiliza la región de la instancia de Amazon EC2 que se está ejecutando actualmente.
4. **Por defecto**: Vuelve a `us-east-1` si ningún otra fuente proporciona una región.

### Permisos IAM para S3

Acciones autorizadas requeridas:

* `ListBucket` (en el bucket directamente)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

He aquí un ejemplo de política de bucket:

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

### Crear una base de datos RDS

Puedes crear una micro instancia RDS con el siguiente comando. Para entornos de producción, basta con una instancia pequeña desplegada en varias zonas de disponibilidad (multi-AZ).

```shell
# Micro RDS instance for testing purposes. Takes around 5 min.
aws rds create-db-instance --db-instance-identifier cloudprem-postgres --db-instance-class db.t3.micro --engine postgres --engine-version 16.3 --master-username cloudprem --master-user-password 'FixMeCloudPrem' --allocated-storage 20 --storage-type gp2 --db-subnet-group-name <VPC-ID> --vpc-security-group-ids <VPC-SECURITY-GROUP-ID> --db-name cloudprem --backup-retention-period 0 --no-multi-az
```

Puede obtener información de RDS ejecutando los siguientes comandos de shell:

```shell
# Get RDS instance details
RDS_INFO=$(aws rds describe-db-instances --db-instance-identifier cloudprem-demo-postgres --query 'DBInstances[0].{Status:DBInstanceStatus,Endpoint:Endpoint.Address,Port:Endpoint.Port,Database:DBName}' --output json 2>/dev/null)

STATUS=$(echo $RDS_INFO | jq -r '.Status')
ENDPOINT=$(echo $RDS_INFO | jq -r '.Endpoint')
PORT=$(echo $RDS_INFO | jq -r '.Port')
DATABASE=$(echo $RDS_INFO | jq -r '.Database')

echo ""
echo "🔗 Full URI:"
echo "postgres://cloudprem:FixMeCloudPrem@$ENDPOINT:$PORT/$DATABASE"
echo ""
```

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
   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>"
   ```

1. Personalizar el Helm chart

   Crea un archivo `datadog-values.yaml` para sustituir los valores predeterminados por tu configuración personalizada. Aquí es donde se definen los parámetros específicos del entorno, como la etiqueta de imagen, el ID de cuenta de AWS, la cuenta de servicio, la configuración de entrada, las solicitudes y los límites de recursos, etc.

   Cualquier parámetro que no se haya sobrescrito explícitamente en `datadog-values.yaml` vuelve a los valores por defecto definidos en el `values.yaml` del chart.

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   Este es un ejemplo de un archivo `datadog-values.yaml` con este tipo de sobrescritura:

   ```yaml
   aws:
     accountId: "123456789012"

   # Environment variables
   # Any environment variables defined here are available to all pods in the deployment
   environment:
     AWS_REGION: us-east-1

   # Datadog configuration
   datadog:
      # The Datadog [site](https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
      # site: datadoghq.com
      # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
      apiKeyExistingSecret: datadog-secret

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # The service account will be annotated with the IAM role ARN if `aws.accountId` and serviceAccount.eksRoleName` are set.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem
     # The name of the IAM role to use for the service account. If set, the following annotations will be added to the service account:
     # - eks.amazonaws.com/role-arn: arn:aws:iam::<aws.accountId>:role/<serviceAccount.eksRoleName>
     # - eks.amazonaws.com/sts-regional-endpoints: "true"
     eksRoleName: cloudprem
     extraAnnotations: {}

   # CloudPrem node configuration
   config:
     # The root URI where index data is stored. This should be an S3 path.
     # All indexes created in CloudPrem are stored under this location.
     default_index_root_uri: s3://<BUCKET_NAME>/indexes

   # Internal ingress configuration for access within the VPC
   # The ingress provisions an Application Load Balancers (ALBs) in AWS which is created in private subnets.
   #
   # Additional annotations can be added to customize the ALB behavior.
   ingress:
     internal:
       enabled: true
       name: cloudprem-internal
       host: cloudprem.acme.internal
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: cloudprem-internal

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
   ```

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

Para desinstalar CloudPrem:

```shell
helm uninstall <RELEASE_NAME>
```

## Siguiente paso

**Configurar la ingesta de logs con el Datadog Agent ][8]** - Configurar el Datadog Agent para enviar logs a CloudPrem

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/eks/
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: https://aws.amazon.com/rds/
[8]: /es/cloudprem/ingest/agent/