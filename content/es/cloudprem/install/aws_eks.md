---
description: Más información sobre cómo instalar y configurar CloudPrem en AWS EKS
further_reading:
- link: /cloudprem/configure/aws_config/
  tag: Documentación
  text: Configuración de AWS
- link: /cloudprem/configure/ingress/
  tag: Documentación
  text: Configurar el ingreso a CloudPrem
- link: /cloudprem/ingest_logs/
  tag: Documentación
  text: Configurar la ingesta de logs
title: Instalar CloudPrem en AWS EKS
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Este documento te guiará a través del proceso de instalación de CloudPrem en AWS EKS.

## Requisitos previos

Antes de empezar a utilizar CloudPrem, asegúrate de que dispones de:

- Cuenta de AWS con los permisos necesarios
- Kubernetes `1.25+` ([EKS][1] recomendado)
- [Controlador del balanceador de carga AWS instalado][2] (opcional)
- Base de datos PostgreSQL ([RDS][3] recomendado)
- Bucket de S3 para el almacenamiento de logs
- Datadog Agent
- Herramienta de línea de comandos Kubernetes (`kubectl`)
- Herramienta de línea de comandos Helm (`helm`)

## Pasos de la instalación

1. [Preparar tu entorno AWS](#prepare-your-aws-environment)
2. [Instalar el Helm chart de CloudPrem](#install-the-cloudprem-helm-chart)
3. [Verificar la instalación](#verification)
4. [Configurar tu cuenta de Datadog](#configure-your-datadog-account)

## Preparar tu entorno AWS 

Antes de instalar CloudPrem en EKS, asegúrate de que tu entorno AWS está correctamente configurado. Para obtener instrucciones detalladas de configuración de AWS, consulta la [guía de configuración de AWS][7].

Requisitos clave:
- Credenciales de AWS configuradas (rol IAM o claves de acceso)
- Permisos IAM adecuados para el acceso a S3
- Clúster EKS con el controlador del balanceador de carga AWS instalado
- Instancia PostgreSQL de RDS o base de datos compatible

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

## Instalar el Helm chart de CloudPrem

1. Añade y actualiza el repositorio Helm de Datadog:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Crea un espacio de nombres Kubernetes para el gráfico:
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   Por ejemplo, para crear un espacio de nombres `cloudprem`:
   ```shell
   kubectl create namespace cloudprem
   ```

   **Nota**: Puedes configurar un espacio de nombres predeterminado para tu contexto actual para evitar tener que escribir `-n <NAMESPACE_NAME>` con cada comando:
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Guarda tu clave de API Datadog como secreto Kubernetes:

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. Almacena la cadena de la conexión de bases de datos PostgreSQL como secreto Kubernetes:
   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>"
   ```

1. Personalizar el Helm chart

   Crea un archivo `datadog-values.yaml` para sustituir los valores predeterminados por tu configuración personalizada. Aquí es donde se definen los parámetros específicos del entorno, como la etiqueta de imagen, el ID de cuenta de AWS, la cuenta de servicio, la configuración de entrada, las solicitudes y los límites de recursos, etc.

   Cualquier parámetro que no se haya sobrescrito explícitamente en `datadog-values.yaml` vuelve a los valores por defecto definidos en el `values.yaml` del gráfico.

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
     # The internal ingress is used by Datadog Agents and other collectors running outside
     # the Kubernetes cluster to send their logs to CloudPrem.
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
   # Resource requests and limits should be tuned based on your indexing workload.
   #
   # The default values are suitable for moderate indexing loads of up to 20 MB/s per indexer pod.
   indexer:
     replicaCount: 2

     resources:
       requests:
         cpu: "4"
         memory: "8Gi"
       limits:
         cpu: "4"
         memory: "8Gi"

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

     resources:
       requests:
         cpu: "4"
         memory: "16Gi"
       limits:
         cpu: "4"
         memory: "16Gi"
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
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller
[3]: https://aws.amazon.com/rds/
[4]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/
[5]: /es/getting_started/containers/datadog_operator/#installation-and-deployment
[6]: /es/help/
[7]: /es/cloudprem/configure/aws_config
[8]: /es/cloudprem/ingest_logs/datadog_agent/