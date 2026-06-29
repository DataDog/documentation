---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
aliases:
- /es/cloud_cost_management/recommendations/savings
description: Aprenda a reducir el gasto de los recursos en la nube de su organización
  con Cloud Cost Recommendations.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Aprenda sobre Cloud Cost Management
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: Documentación
  text: Integración de AWS y Preguntas Frecuentes sobre CloudWatch
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Cómo hemos creado una práctica exitosa de FinOps en Datadog
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: Blog
  text: Elimine el desperdicio en la nube en AWS, Azure y Google Cloud con Cloud Cost
    Recommendations
multifiltersearch:
  data:
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifica las claves de API de Anthropic sin uso
      de almacenamiento en caché de solicitudes y recomienda habilitar el almacenamiento
      en caché de solicitudes para reducir los costos de tokens de entrada.
    recommendation_prerequisites: '[Anthropic integration](/integrations/anthropic/)'
    recommendation_type: Enable Anthropic Prompt Caching
    resource_type: Anthropic API Key
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un grupo de Auto Scaling que incluye tipos de instancias
      heredadas.
    recommendation_prerequisites: ''
    recommendation_type: Migrate ASG Legacy Instances
    resource_type: Auto Scaling Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un grupo de Auto Scaling con una capacidad mínima
      de instancias que puede ser reducida.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Minimum Capacity
    resource_type: Auto Scaling Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Los registros de CloudTrail con eventos pagados pueden
      ser eliminados para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Delete unnecessary CloudTrail trails
    resource_type: CloudTrail Trail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: El Índice Secundario Global (GSI) de una tabla de
      DynamoDB tiene 0 lecturas consumidas.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB tiene 0 lecturas consumidas
      y 0 escrituras no replicadas consumidas.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Table
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB tiene cargos por más de 2 copias
      de seguridad bajo demanda.
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra On-Demand Backups
    resource_type: DynamoDB Table
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB provisionada que utiliza menos
      del 80% de su capacidad de lectura y escritura en más del 80% del tiempo.
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Migrar a la clase de tabla de Acceso Infrecuente (IA)
      ofrece más ahorros potenciales en tarifas de almacenamiento en comparación con
      los costos adicionales de tarifas de capacidad.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB provisionada tiene un consumo
      de capacidad de lectura y escritura por hora por debajo del 18% al menos una
      vez en las últimas dos semanas.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB bajo demanda tiene un consumo
      de capacidad de lectura y escritura por hora que siempre es mayor al 18%.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Migrar a la clase de tabla Estándar ofrece ahorros
      potenciales en tarifas de capacidad en comparación con los costos adicionales
      de tarifas de almacenamiento, o utiliza el nivel gratuito de la clase de tabla
      Estándar para almacenamiento.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instantáneas de EBS que tienen al menos 90 días de
      antigüedad y pueden ser eliminadas.
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: EBS Snapshot
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volumen EBS que utiliza menos del 80% de los IOPS
      provisionados para lecturas y escrituras.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volumen EBS que utiliza menos del umbral configurado
      del rendimiento provisionado para lecturas y escrituras.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volumen EBS con menos del 20% de su capacidad de
      almacenamiento utilizada.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Storage Capacity
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volúmenes EBS que son GP2 y pueden ser actualizados
      a GP3 para reducción de costos y mejora del rendimiento.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volúmenes EBS que son IO1 y pueden ser actualizados
      a GP3 para reducción de costos y mejora del rendimiento.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volumen que no está adjunto a una instancia EC2.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unattached EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volumen que no tiene actividad de lectura o escritura.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Direcciones IP elásticas con cargos inactivos en su
      informe de costos y uso de AWS.
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle Elastic IP
    resource_type: Elastic IP
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instancias EC2 con utilización de CPU y memoria inferior
      a los recursos disponibles de la siguiente instancia más pequeña en la familia.
      Sin el Agente de Datadog, esta recomendación se genera utilizando métricas de
      CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instancias EC2 de una generación anterior que pueden
      ser actualizadas a un tipo de instancia más nuevo.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instancias EC2 que pueden ser migradas a un tipo de
      instancia Graviton equivalente.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance to Graviton Type
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instancias EC2 con utilización de CPU y memoria por
      debajo de un umbral personalizable. Sin el Agente de Datadog, esta recomendación
      se genera utilizando métricas de CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instancias EC2 que alojan nodos de Kubernetes que
      están atascados en la fase pendiente, indicando que el nodo no está funcionando
      correctamente.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance with Stuck Node
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Repositorio ECR sin actividad de extracción que puede
      ser eliminado para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Delete ECR Repository
    resource_type: ECR Repository
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Una tarea de ECS que utiliza menos del 50% de su CPU
      o memoria solicitada.
    recommendation_prerequisites: '[Container Monitoring](/containers/)'
    recommendation_type: Downsize ECS Task Size
    resource_type: ECS Task Definition
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un clúster de ElastiCache Redis sin aciertos de caché
      y sin replicación o un clúster de Memcached sin aciertos de caché.
    recommendation_prerequisites: ''
    recommendation_type: Terminate ElastiCache Cluster
    resource_type: ElastiCache Cluster
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Dominio de OpenSearch sin actividad de solicitud.
    recommendation_prerequisites: ''
    recommendation_type: Delete OpenSearch Domain
    resource_type: OpenSearch Domain
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un Classic Elastic Load Balancer sin conexiones activas
      que no está adjunto a una instancia EC2.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Classic Load Balancer
    resource_type: Classic Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un Application Load Balancer sin tráfico procesado.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Application Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un Network Load Balancer con 0 bytes procesados.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Network Load Balancer
    resource_type: Load Balancer
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Función de AWS Lambda con una concurrencia provisionada
      sobreasignada.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Provisioned Concurrency
    resource_type: Lambda
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Eliminar los permisos de escritura para los registros
      de CloudWatch de Lambda para evitar registros innecesarios adicionales.
    recommendation_prerequisites: ''
    recommendation_type: Delete Lambda CloudWatch Logs and write permissions
    resource_type: CloudWatch Log Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Reducir los costos de almacenamiento de los registros
      de CloudWatch estableciendo políticas de retención adecuadas.
    recommendation_prerequisites: ''
    recommendation_type: Set CloudWatch Logs Retention Policy
    resource_type: CloudWatch Log Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un broker de MQ con 0 conexiones.
    recommendation_prerequisites: ''
    recommendation_type: Terminate MQ Broker
    resource_type: MQ Broker
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instancias de RDS utilizando menos del 80% de IOPS
      provisionados en las últimas dos semanas.
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un RDS que ejecuta una versión de motor que ya no
      es compatible y que incurre en [cargos por soporte extendido](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html).
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance Engine
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instancias de RDS que pueden ser migradas a un tipo
      de instancia equivalente de Graviton.
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance to Graviton
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instancia de RDS con 0 conexiones a la base de datos
      y 0 retraso de réplicas.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused RDS Instance
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Clúster de Redshift con 0 conexiones a la base de
      datos.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Redshift Cluster
    resource_type: Redshift Cluster
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket con versionado habilitado tiene costos de
      almacenamiento significativos por versiones antiguas de objetos.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Clean up old versions to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un bucket estándar de S3 sin un ciclo de vida de expiración
      de versiones no actuales y que no sirve un sitio web contiene bytes de almacenamiento
      de versiones no actuales mayores a 30 días.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 noncurrent version objects
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Buckets de S3 con cargas multipart incompletas mayores
      a 7 días que están consumiendo espacio de almacenamiento.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket tiene un porcentaje significativo de archivos
      pequeños en clases de almacenamiento de acceso poco frecuente, aumentando los
      costos de almacenamiento debido al tamaño mínimo de facturación.
    recommendation_prerequisites: ''
    recommendation_type: Reduce small file count to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un bucket de S3 con costos de almacenamiento mínimos
      y sin solicitudes GET o PUT.
    recommendation_prerequisites: ''
    recommendation_type: Terminate S3 Bucket
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket tiene altos cargos por eliminación anticipada.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Los costos de un bucket son casi totalmente en almacenamiento
      estándar por GB, pero las solicitudes GET indican que pocos objetos son accedidos.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Los costos de un prefijo de bucket son casi totalmente
      en almacenamiento estándar por GB, pero las solicitudes GET indican que pocos
      objetos en el prefijo son accedidos.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition S3 objects to Infrequent Access by Prefix
    resource_type: S3 Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Los recursos que necesitan una puerta de enlace NAT
      deben usar una que esté en la misma zona de disponibilidad, o pueden incurrir
      en cargos innecesarios por transferencia entre zonas.
    recommendation_prerequisites: ''
    recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Los recursos en la misma VPC deben evitar comunicarse
      entre sí a través de una puerta de enlace NAT porque eso incurre en cargos innecesarios
      por procesamiento de puerta de enlace NAT.
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Gateway Within-VPC Transfers
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Una puerta de enlace NAT que no tiene bytes enviados
      a través de ella.
    recommendation_prerequisites: ''
    recommendation_type: Terminate NAT Gateway
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un clúster de AKS con menos del 5% de uso de CPU.
    recommendation_prerequisites: ''
    recommendation_type: Terminate AKS Cluster
    resource_type: AKS Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Una Container App tiene más réplicas mínimas de las
      necesarias.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un Load Balancer con 0 bytes transferidos.
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: El disco administrado está desconectado y puede ser
      eliminado.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Disco administrado sin operaciones de lectura/escritura,
      que puede ser eliminado.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Managed Disk
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Disco administrado que utiliza menos del umbral configurado
      de IOPS provisionados.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk IOPS
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Disco administrado que utiliza menos del umbral configurado
      de rendimiento provisionado.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk Throughput
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Servidor de base de datos sin conexiones, que puede
      ser terminado.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Database for MySQL
    resource_type: MySQL Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Servidor SQL sin conexiones, que puede ser terminado.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server
    resource_type: SQL Server
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Base de datos de SQL Server con bajo uso de DTU que
      puede ser reducida.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: SQL Server Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Base de datos de SQL Server sin conexiones exitosas
      y con CPU muy mínima, que puede ser terminada.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server Database
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Instancia de VM que puede ser reducida a un tipo de
      instancia más pequeño.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: VM Instance
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Instancia de VM con menos del 5% de CPU de usuario
      y más del 90% de memoria utilizable.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifica clústeres de Databricks sobredimensionados
      y sugiere reducir el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifica clústeres de Databricks sobredimensionados
      y sugiere reducir el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifica clústeres de Databricks sobredimensionados
      y sugiere reducir el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifica trabajos de Databricks sobredimensionados
      y sugiere reducir el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifica trabajos de Databricks sobredimensionados
      y sugiere reducir el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifica trabajos de Databricks sobredimensionados
      y sugiere reducir el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Las direcciones IP de cómputo no utilizadas pueden
      ser eliminadas.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute IP Address
    resource_type: Compute Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Discos de cómputo que están desconectados y pueden
      ser eliminados.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Discos de cómputo que no están en uso y pueden ser
      eliminados.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Las direcciones IP globales de cómputo no utilizadas
      pueden ser eliminadas.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Compute Global Address
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instancia de cómputo con bajo uso de CPU y memoria
      que puede ser reducida a un tipo de instancia más pequeño.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Compute Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instancia de cómputo con bajo uso de CPU, alta memoria
      disponible y actividad de red mínima.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Un escalador de grupo de instancias de cómputo con
      una capacidad mínima de instancias que puede ser reducida.
    recommendation_prerequisites: ''
    recommendation_type: Reduce Minimum Capacity
    resource_type: Compute Instance Group
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instancias de CloudSQL que están sobreaprovisionadas
      y pueden ser reducidas.
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instancias de CloudSQL con uso mínimo que pueden ser
      terminadas.
    recommendation_prerequisites: ''
    recommendation_type: Terminate CloudSQL Instance
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Buckets de Cloud Storage que se benefician de reglas
      de ciclo de vida para eliminar automáticamente versiones de objetos no actuales.
    recommendation_prerequisites: ''
    recommendation_type: Delete Noncurrent Cloud Storage Objects
    resource_type: Storage Bucket
  - category: Migrate
    cloud_provider: GCP
    recommendation_description: Los objetos en el bucket de almacenamiento pueden
      ser migrados automáticamente a niveles de archivo para obtener mejores tarifas.
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Storage Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Clústeres de Kubernetes con alta inactividad en CPU
      o memoria.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Clústeres de Kubernetes con alta inactividad en CPU
      o memoria.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Clústeres de Kubernetes con alta inactividad en CPU
      o memoria.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Los contenedores están utilizando solo una fracción
      de su CPU o memoria solicitada.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Los contenedores están utilizando solo una fracción
      de su CPU o memoria solicitada.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Los contenedores están utilizando solo una fracción
      de su CPU o memoria solicitada.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  headers:
  - filter_by: true
    id: category
    name: Categoría de recomendación
  - filter_by: true
    id: cloud_provider
    name: Proveedor de nube
  - filter_by: true
    id: resource_type
    name: Tipo de recurso
  - id: recommendation_type
    name: Tipo de recomendación
  - id: recommendation_description
    name: Descripción de la recomendación
  - id: recommendation_prerequisites
    name: Requisitos previos de la recomendación
title: Cloud Cost Recommendations
---
## Resumen {#overview}

Cloud Cost Recommendations proporciona recomendaciones para reducir su gasto en la nube optimizando el uso de sus recursos en la nube. Datadog genera un conjunto de recomendaciones combinando sus datos de observabilidad con los datos de facturación de su proveedor de nube subyacente para identificar recursos en la nube huérfanos, heredados o sobreaprovisionados.

Las recomendaciones se ejecutan a diario y se actualizan automáticamente en su cuenta tan pronto como se publican las recomendaciones.

- Para **todos los recursos**, [las métricas de costos en la nube][6] también se extraen para ese recurso
- Para todos los **recursos de AWS** además de Kubernetes y EC2, las métricas de AWS también se extraen de [AWS CloudWatch][7]

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Pestaña de resumen con ahorros mensuales potenciales, ahorros anuales potenciales y el número total de casos abiertos en la página de Cloud Cost Recommendations" style="width:100%;" >}}

Puede ver la lógica detallada para cada tipo de recomendación, junto con métricas de observabilidad o datos de costos mostrados en esta página.

Las recomendaciones admiten [Tag Pipelines][11], lo que le permite filtrar, agrupar y analizar las recomendaciones utilizando las etiquetas estandarizadas de su organización. Cualquier regla de etiqueta configurada en [Tag Pipelines] se aplica automáticamente a las recomendaciones y [se normaliza][12].

## Categorías de recomendaciones {#recommendation-categories}

A continuación se presentan las categorías de Cloud Cost Recommendations disponibles y sus descripciones.

| Categoría de Recomendación | Descripción |
|----------|-------------|
| Terminar | Recursos con señales de que el recurso no se utiliza o señales de muy baja utilización. Considere terminar o eliminar estos recursos para reducir sus costos. |
| Migrar | Recursos con señales de utilización moderadamente baja u otras ineficiencias. Considere ajustar el tipo de instancia u otros parámetros. |
| Downsize | Recursos que están subutilizados o sobreaprovisionados. Considere ajustar el tamaño u otros parámetros para reducir costos. |
| Comprar | Recursos con cargos bajo demanda y tiempo de actividad extendido. La compra de una reserva o un Plan de Ahorros puede reducir el costo amortizado del recurso. |
| Configure |  Recursos con opciones de configuración que se pueden ajustar para reducir costos sin cambiar la capacidad o terminar el recurso. |

## Requisitos previos {#prerequisites}

Los siguientes son los requisitos necesarios para recibir Cloud Cost Recommendations:

- Cuentas de proveedores de nube (para todas las Cloud Cost Recommendations deseadas)
- [Integración de AWS y recolección de recursos][3] (para recomendaciones de AWS)
- [Integración de Azure y recolección de recursos][8] (para recomendaciones de Azure)
- [Integración de GCP y recolección de recursos][10] (para recomendaciones de GCP)
- [Datadog Agent integration][5] (for Downsize recommendations)

## Configuración {#setup}

Para cada cuenta de nube de la que desee recibir recomendaciones:

1. Configure [Cloud Cost Management][2] para enviar datos de facturación a Datadog.
   - Para Azure, esto requiere utilizar el método de Registro de Aplicaciones para recolectar datos de facturación.
1. Habilite [la recolección de recursos][3] para recomendaciones.
   - Para AWS, habilite la recolección de recursos en la pestaña {{< ui >}}Resource Collection{{< /ui >}} del [AWS integration tile][4].
   - Para Azure, habilite la recolección de recursos con la integración apropiada. Si su organización está en el sitio de Datadog US3, el [Azure Native Integration][9] habilita esto automáticamente a través de la recolección de métricas. Para todos los demás sitios, se requiere habilitar la recolección de recursos dentro del [Azure integration tile][8].
   - Para GCP, habilite la recolección de recursos en la pestaña {{< ui >}}Resource Collection{{< /ui >}} del [Google Cloud Platform integration tile][10].
1. Instale el [Datadog Agent][5] (requerido para Downsize recommendations).

**Nota**: Cloud Cost Recommendations admite la facturación en monedas que no sean USD de los clientes.

## Estados de recomendaciones {#recommendation-statuses}

Asigne un estado a cada recomendación para rastrear el progreso de la optimización de costos en sus equipos. Los estados persisten cuando las recomendaciones se regeneran diariamente. No necesita volver a clasificar las mismas recomendaciones.

| Estado | Descripción |
|--------|-------------|
| {{< ui >}}Open{{< /ui >}} | (Predeterminado) La recomendación no ha sido clasificada. |
| {{< ui >}}In Progress{{< /ui >}} | Se está trabajando para abordar esta recomendación. |
| {{< ui >}}Completed{{< /ui >}} | La acción recomendada se ha tomado o ya no es relevante. |
| {{< ui >}}Dismissed{{< /ui >}} | No se planea trabajo para esta recomendación durante el período especificado al descartarla. |

### Filtrar recomendaciones por estado {#filter-recommendations-by-status}

Utilice las pestañas de estado en la parte superior de la [{{< ui >}}Cloud Cost Recommendations{{< /ui >}}][1] página para filtrar la lista por estado. Las pestañas disponibles son {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Completed{{< /ui >}} y {{< ui >}}Dismissed{{< /ui >}}. Cada pestaña muestra el total estimado de ahorros para las recomendaciones en ese estado.

### Rastrear ahorros por estado {#track-savings-by-status}

Cada pestaña de estado muestra el total estimado de ahorros para las recomendaciones en ese estado:

- {{< ui >}}Open{{< /ui >}}: Ahorros potenciales de recomendaciones que no han sido clasificadas.
- {{< ui >}}In Progress{{< /ui >}}: Ahorros estimados de recomendaciones con trabajo en curso.
- {{< ui >}}Completed{{< /ui >}}: Ahorros realizados de recomendaciones donde se ha tomado la acción recomendada.
- {{< ui >}}Dismissed{{< /ui >}}: Ahorros estimados de recomendaciones que han sido desestimadas.

### Cambiar el estado de una recomendación {#change-a-recommendation-status}

Puede cambiar el estado de una recomendación de tres maneras:

- **Actualización masiva**: Seleccione una o más recomendaciones en {{< ui >}}Active Recommendations{{< /ui >}}, luego elija un estado en la barra de herramientas sobre la tabla para aplicarlo a todas las recomendaciones seleccionadas.
- **Desde la tabla**: Utilice el menú desplegable de estado en la columna {{< ui >}}Status{{< /ui >}} para seleccionar un nuevo estado directamente de la lista de recomendaciones.
- **Desde el panel lateral**: Haga clic en una recomendación para abrir el panel lateral, luego utilice el menú desplegable de estado para seleccionar un nuevo estado.

## Acciones sobre recomendaciones {#recommendation-action-taking}
Puede actuar sobre las recomendaciones para ahorrar dinero y optimizar costos. Cloud Cost Recommendations soportan Jira, 1-click Workflow Automation y Datadog Case Management. Las recomendaciones de volúmenes EBS y GP2 EBS no utilizados también soportan 1-click Workflow Automation. Consulte los siguientes detalles para cada opción de toma de acción:

- **Jira**: Cree problemas de Jira directamente desde el panel lateral de recomendaciones o seleccionando múltiples recomendaciones en la lista {{< ui >}}Active Recommendations{{< /ui >}} y haciendo clic en {{< ui >}}Create Jira issue{{< /ui >}}. Los problemas creados están etiquetados y enlazan de vuelta a la recomendación en Datadog.

  Para filtrar recomendaciones por estado de Jira, utilice las siguientes opciones de consulta:
  - `@jira_issues.issue_key:*` - Muestre solo las recomendaciones con un problema de Jira
  - `-@jira_issues.issue_key:*` - Muestre solo las recomendaciones sin un problema de Jira
  - `jira_issues.issue_key:ABC*` - Filtre por prefijo de proyecto específico de Jira

- **[Bits Code][14] correcciones de código**: Las correcciones de código están disponibles para recomendaciones aplicables de S3 y DynamoDB, así como para la recomendación de Downsize Kubernetes Deployment. En estas situaciones, Bits Code crea pull requests listos para producción para implementar cambios en los recursos de la nube y optimizaciones de costos en Terraform o Helm charts, respectivamente. [Set up Bits Code][13] para usar esta función.
- **1-click Workflow Automation actions**: Las acciones están disponibles para un conjunto limitado de recomendaciones, permitiendo a los usuarios ejecutar las acciones sugeridas, como hacer clic en {{< ui >}}Delete EBS Volume{{< /ui >}}, directamente dentro de Cloud Cost Management.
- **[Cost Optimization Automation][15]**: Configure automatizaciones que actúen sobre las recomendaciones de manera continua en un horario recurrente. Las automatizaciones están limitadas a cuentas, regiones y etiquetas específicas e incluyen salvaguardias como instantáneas previas a la acción y aprobación humana opcional a través de Slack o Microsoft Teams.
- **Datadog Case Management**: Los usuarios pueden ir al panel lateral de recomendaciones y hacer clic en {{< ui >}}Create Case{{< /ui >}} para generar un caso para gestionar y tomar acción sobre las recomendaciones.
- **Descartar**: Utilice {{< ui >}}Dismiss{{< /ui >}} en el panel lateral de recomendaciones para ocultar una recomendación durante un período de tiempo elegido y proporcionar una razón. Las recomendaciones descartadas se mueven a la pestaña {{< ui >}}Dismissed{{< /ui >}}

## Descripciones de recomendaciones y recursos {#recommendation-and-resource-descriptions}

{{< multifilter-search >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /es/cloud_cost_management/setup/aws/#setup
[3]: /es/integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /es/agent/
[6]: /es/cloud_cost_management/container_cost_allocation/?tab=aws#cost-metrics
[7]: /es/integrations/amazon_s3_storage_lens/
[8]: https://app.datadoghq.com/integrations/azure
[9]: /es/integrations/azure/
[10]: https://app.datadoghq.com/integrations/gcp
[11]: /es/cloud_cost_management/allocation/tag_pipelines/
[12]: /es/cloud_cost_management/tags/#how-tags-are-normalized
[13]: /es/bits_ai/bits_ai_dev_agent/setup
[14]: /es/bits_ai/bits_ai_dev_agent/
[15]: /es/cloud_cost_management/recommendations/cost_optimization_automation/