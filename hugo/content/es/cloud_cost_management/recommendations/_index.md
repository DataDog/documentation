---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
  - cost recommendation risk
  - cost recommendation effort
  - cost recommendation level of effort
aliases:
- /es/cloud_cost_management/recommendations/savings
description: Aprenda a reducir el gasto de los recursos en la nube de su organización
  con las Recomendaciones de costos.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: Documentación
  text: Preguntas frecuentes sobre la integración de AWS y CloudWatch
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Cómo hemos creado una práctica de FinOps exitosa en Datadog
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: Blog
  text: Elimine el desperdicio en la nube en AWS, Azure y Google Cloud con las recomendaciones
    de Cloud Cost
multifiltersearch:
  data:
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifica claves de API de Anthropic sin uso de almacenamiento
      en caché de prompts y recomienda habilitar el almacenamiento en caché de prompts
      para reducir los costos de tokens de entrada.
    recommendation_prerequisites: ''
    recommendation_type: Enable Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifica claves de API de Anthropic que ya utilizan
      almacenamiento en caché de prompts por debajo de la tasa de aciertos objetivo
      y recomienda mejorar la configuración de caché para reducir los costos de tokens
      de entrada.
    recommendation_prerequisites: ''
    recommendation_type: Optimize Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifica a los usuarios empresariales cuyo gasto
      se concentra en los modelos más costosos y recomienda utilizar un modelo de
      menor costo.
    recommendation_prerequisites: ''
    recommendation_type: Reduce Top-Tier Model Usage
    resource_type: Enterprise User
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Grupos de Auto Scaling con cargas de trabajo no contenerizadas
      que tienen un bajo uso de CPU y memoria y que pueden reducirse ajustando sus
      estrategias de escalado.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Auto Scaling Group
    resource_type: Auto Scaling Group
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
      de instancias que puede reducirse.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Minimum Capacity
    resource_type: Auto Scaling Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Los registros de CloudTrail con eventos pagados pueden
      eliminarse para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unnecessary CloudTrail Trails
    resource_type: CloudTrail Trail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un índice secundario global (GSI) de una tabla de
      DynamoDB tiene 0 lecturas consumidas.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB tiene cargos por más de 2 copias
      de seguridad bajo demanda.
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra DynamoDB On-Demand Backups
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB tiene 0 lecturas consumidas
      y 0 escrituras no replicadas consumidas.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused DynamoDB Table
    resource_type: DynamoDB Table
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB aprovisionada que utiliza menos
      del 80% de su capacidad de lectura y escritura más del 80% del tiempo.
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: La migración a la clase de tabla de acceso poco frecuente
      (IA) ofrece más ahorros potenciales en las tarifas de almacenamiento en comparación
      con los costos adicionales de las tarifas de capacidad.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB aprovisionada tiene un consumo
      de capacidad de lectura y escritura por hora inferior al 18% al menos una vez
      en las últimas dos semanas.
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
    recommendation_description: La migración a la clase de tabla Standard ofrece ahorros
      potenciales en las tarifas de capacidad en comparación con los costos adicionales
      de las tarifas de almacenamiento, o utiliza la capa gratuita de la clase de
      tabla Standard para el almacenamiento.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instantáneas de EBS que tienen al menos 90 días de
      antigüedad y pueden eliminarse.
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: EBS Snapshot
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volumen que no está adjunto a una instancia de EC2.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volumen que no tiene actividad de lectura o escritura.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused EBS Volume
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volumen de EBS que utiliza menos del 80% de las
      IOPS aprovisionadas para lecturas y escrituras.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volumen de EBS que utiliza menos del umbral configurado
      del rendimiento aprovisionado para lecturas y escrituras.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volumen de EBS con menos del 20% de su capacidad
      de almacenamiento utilizada.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Storage Capacity
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volúmenes de EBS que son GP2 y pueden actualizarse
      a GP3 para reducir costos y mejorar el rendimiento.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volúmenes de EBS que son IO1 y pueden actualizarse
      a GP3 para reducir costos y mejorar el rendimiento.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Direcciones IP elásticas con cargos por inactividad
      en su informe de costos y uso de AWS.
    recommendation_prerequisites: ''
    recommendation_type: Release Idle Elastic IP
    resource_type: Elastic IP
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instancias de EC2 con una utilización de CPU y memoria
      menor a los recursos disponibles de la siguiente instancia más pequeña de la
      familia. Sin el Datadog Agent, esta recomendación se genera utilizando métricas
      de CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instancias de EC2 de una generación anterior que pueden
      actualizarse a un tipo de instancia más reciente.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instancias de EC2 que pueden migrarse a un tipo de
      instancia Graviton equivalente.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance to Graviton Type
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instancias de EC2 que alojan nodos de Kubernetes que
      están bloqueados en la fase pendiente, lo que indica que el nodo no funciona
      correctamente.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance with Stuck Node
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instancias de EC2 con una utilización de CPU y memoria
      por debajo de un umbral personalizable. Sin el Datadog Agent, esta recomendación
      se genera utilizando métricas de CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Unused EC2 Instance
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Repositorio de ECR sin actividad de extracción que
      puede eliminarse para reducir costos.
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
      y sin replicación, o un clúster de Memcached sin aciertos de caché.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused ElastiCache Cluster
    resource_type: ElastiCache Cluster
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Dominio de OpenSearch sin actividad de solicitudes.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused OpenSearch Domain
    resource_type: OpenSearch Domain
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Classic Elastic Load Balancer sin conexiones activas
      que no está asociado a una instancia de EC2.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Classic Load Balancer
    resource_type: Classic Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un balanceador de carga de aplicaciones sin tráfico
      procesado.
    recommendation_prerequisites: ''
    recommendation_type: Delete Application Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un balanceador de carga de red con 0 bytes procesados.
    recommendation_prerequisites: ''
    recommendation_type: Delete Network Load Balancer
    resource_type: Load Balancer
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Función de AWS Lambda con concurrencia aprovisionada
      asignada en exceso.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Provisioned Concurrency
    resource_type: Lambda
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Reduzca los costos de almacenamiento de CloudWatch
      Logs estableciendo políticas de retención adecuadas.
    recommendation_prerequisites: ''
    recommendation_type: Set CloudWatch Logs Retention Policy
    resource_type: CloudWatch Log Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un broker de MQ con 0 conexiones.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused MQ Broker
    resource_type: MQ Broker
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instancia de RDS con 0 conexiones a la base de datos
      y 0 retraso de réplica.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused RDS Instance
    resource_type: RDS Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instancias de RDS que AWS Compute Optimizer sugiere
      reducir a un tipo de instancia más pequeño.
    recommendation_prerequisites: '[AWS Cost Optimization Hub permissions](/cloud_cost_management/setup/aws/#permissions-for-aws-cost-optimization-hub-recommendations)'
    recommendation_type: Downsize RDS Instance
    resource_type: RDS Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instancias de RDS que utilizan menos del 80% de las
      IOPS aprovisionadas durante las últimas dos semanas.
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Una instancia de RDS que ejecuta una versión de motor
      que ya no es compatible y que genera [cargos por soporte extendido](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html).
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance Engine
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instancias de RDS que pueden migrarse a un tipo de
      instancia Graviton equivalente.
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance to Graviton
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Clúster de Redshift con 0 conexiones a la base de
      datos.
    recommendation_prerequisites: ''
    recommendation_type: Delete Redshift Cluster
    resource_type: Redshift Cluster
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket con el versionado habilitado tiene costos
      de almacenamiento significativos debido a versiones de objetos antiguas.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Clean up old versions to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un bucket de S3 con costos de almacenamiento mínimos
      y sin uso significativo de la API de objetos (actividad de Get, Put, Copy, Head
      o carga multipart).
    recommendation_prerequisites: '[Cloud Cost Management](https://www.datadoghq.com/product/cloud-cost-management)
      or [Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Delete S3 Bucket
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un bucket de S3 estándar sin un ciclo de vida de expiración
      de versiones no actuales y que no aloja un sitio web contiene bytes de almacenamiento
      de versiones no actuales con más de 30 días de antigüedad.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 noncurrent version objects
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Buckets de S3 con cargas multipart incompletas de
      más de 7 días de antigüedad que consumen espacio de almacenamiento.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket tiene un porcentaje significativo de archivos
      pequeños en clases de almacenamiento de acceso poco frecuente, lo que aumenta
      los costos de almacenamiento debido al tamaño mínimo de facturación.
    recommendation_prerequisites: ''
    recommendation_type: Reduce small file count to reduce storage costs
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket tiene cargos elevados por eliminación anticipada.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Los costos de un bucket se deben casi en su totalidad
      al almacenamiento estándar por GB, pero las solicitudes GET indican que se accede
      a pocos objetos.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Los costos del prefijo de un bucket se deben casi
      en su totalidad al almacenamiento estándar por GB, pero las solicitudes GET
      indican que se accede a pocos objetos en el prefijo.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition S3 objects to Infrequent Access by Prefix
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un prefijo de bucket tiene datos antiguos de clase
      Standard sin una regla de transición de ciclo de vida para moverlos a un almacenamiento
      más económico.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition old Standard-class data
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un punto de conexión de SageMaker con cero invocaciones.
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle SageMaker Endpoint
    resource_type: SageMaker Endpoint
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Endpoints de inferencia en tiempo real de SageMaker
      con una utilización de CPU y memoria que se ajusta a los recursos de la siguiente
      instancia más pequeña de la familia. Se excluyen los endpoints que utilizan
      instancias de GPU o acelerador, o escalado administrado.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SageMaker Endpoint
    resource_type: SageMaker Endpoint
  - category: Configure
    cloud_provider: AWS
    recommendation_description: Trabajos de entrenamiento de SageMaker que pueden
      utilizar entrenamiento spot administrado para reducir costos cuando los scripts
      de entrenamiento admiten puntos de control.
    recommendation_prerequisites: ''
    recommendation_type: Enable SageMaker Managed Spot Training
    resource_type: SageMaker Training Job
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Una puerta de enlace NAT que no tiene bytes enviados
      a través de ella.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused NAT Gateway
    resource_type: VPC NAT Gateway
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
      de procesamiento de puerta de enlace NAT.
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Gateway Within-VPC Transfers
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un clúster de AKS con menos del 5% de uso de CPU.
    recommendation_prerequisites: ''
    recommendation_type: Delete AKS Cluster
    resource_type: AKS Cluster
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Planes de App Service sin aplicaciones implementadas
      que Azure Advisor recomienda eliminar.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused App Service Plan
    resource_type: App Service Plan
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: La instantánea se almacena en almacenamiento Premium.
      Migrar al almacenamiento estándar reduce el costo en un 60% sin cambios en la
      durabilidad de los datos.
    recommendation_prerequisites: ''
    recommendation_type: Migrate Disk Snapshot to Standard Storage
    resource_type: Managed Disk Snapshot
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Una aplicación de contenedor tiene más réplicas mínimas
      de las necesarias.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Una aplicación de contenedor de Azure no tiene solicitudes
      en el período de retrospectiva configurado.
    recommendation_prerequisites: ''
    recommendation_type: Scale to Zero Azure Container App Replicas
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un registro de contenedor que nunca ha recibido extracciones
      exitosas.
    recommendation_prerequisites: ''
    recommendation_type: Delete Container Registry
    resource_type: Container Registry
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un clúster se considera no utilizado y detenido si
      ha estado detenido durante al menos 60 días. La recomendación es eliminar el
      clúster para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused Stopped Data Explorer Cluster
    resource_type: Data Explorer Cluster
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Balanceador de carga con 0 bytes transferidos.
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: El disco administrado no está conectado y se puede
      eliminar.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Disco administrado sin operaciones de lectura/escritura,
      el cual puede eliminarse.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Managed Disk
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Disco administrado que utiliza menos del umbral configurado
      de IOPS aprovisionadas.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk IOPS
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Disco administrado que utiliza menos del umbral configurado
      de rendimiento aprovisionado.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk Throughput
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Servidor de base de datos sin conexiones, el cual
      puede terminarse.
    recommendation_prerequisites: ''
    recommendation_type: Delete Database for MySQL
    resource_type: MySQL Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Servidor de Azure Database for PostgreSQL sin conexiones,
      el cual puede terminarse.
    recommendation_prerequisites: ''
    recommendation_type: Delete Database for PostgreSQL
    resource_type: Database for PostgreSQL
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Caché de Azure Managed Redis sin operaciones de obtención
      o establecimiento.
    recommendation_prerequisites: ''
    recommendation_type: Delete Azure Managed Redis
    resource_type: Azure Managed Redis
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Base de datos de SQL Server sin conexiones exitosas
      y con CPU muy mínima, la cual puede terminarse.
    recommendation_prerequisites: ''
    recommendation_type: Delete SQL Server Database
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Base de datos de SQL Server con bajo uso de DTU que
      puede reducirse.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Base de datos de SQL Server que utiliza menos del
      20% de la capacidad de almacenamiento aprovisionada.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database Storage
    resource_type: SQL Server Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Cuenta de almacenamiento sin transacciones y con capacidad
      utilizada insignificante en los últimos 14 días.
    recommendation_prerequisites: ''
    recommendation_type: Delete Storage Account
    resource_type: Storage Account
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Instancia de VM con menos del 5% de CPU de usuario
      y más del 90% de memoria utilizable. Sin el Datadog Agent, esta recomendación
      se genera utilizando métricas de CPU de Azure Monitor.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Delete Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Instancia de VM que puede reducirse a un tipo de instancia
      más pequeño.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: VM Instance
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: Instancia de VM que puede migrarse a un tipo de instancia
      Arm equivalente por un precio menor.
    recommendation_prerequisites: ''
    recommendation_type: Migrate Azure VM Instance to Arm
    resource_type: VM Instance
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: Instancia de VM que se ejecuta en una serie de generación
      heredada que tiene un reemplazo moderno recomendado.
    recommendation_prerequisites: ''
    recommendation_type: Upgrade Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Instancias de VM con bajo uso que pueden reducirse.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Azure VM Scale Set
    resource_type: VM Scale Set
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Instancias de VM con bajo uso que pueden apagarse.
    recommendation_prerequisites: ''
    recommendation_type: Shutdown Azure VM Scale Set
    resource_type: VM Scale Set
  - category: Configure
    cloud_provider: Cursor
    recommendation_description: Identifica asientos de Cursor con un gasto significativo
      en modelos que no son automáticos y recomienda usar el modo automático como
      elección de modelo.
    recommendation_prerequisites: ''
    recommendation_type: Enable Cursor Auto Mode
    resource_type: Cursor Seat
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifica clústeres de Databricks de propósito general
      sobreaprovisionados y sugiere ajustar el tamaño a tipos de instancia más pequeños
      para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifica clústeres de Databricks de propósito general
      sobreaprovisionados y sugiere ajustar el tamaño a tipos de instancia más pequeños
      para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifica clústeres de Databricks de propósito general
      sobreaprovisionados y sugiere ajustar el tamaño a tipos de instancia más pequeños
      para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifica trabajos de Databricks sobreaprovisionados
      y sugiere ajustar el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifica trabajos de Databricks sobreaprovisionados
      y sugiere ajustar el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifica trabajos de Databricks sobreaprovisionados
      y sugiere ajustar el tamaño a tipos de instancia más pequeños para reducir costos.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Las direcciones IP de cómputo no utilizadas se pueden
      eliminar.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute IP Address
    resource_type: Compute Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Discos de cómputo que no están conectados y se pueden
      eliminar.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Discos de cómputo que no se utilizan y se pueden eliminar.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Las direcciones IP globales de cómputo no utilizadas
      se pueden eliminar.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Compute Global Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instancia de cómputo con bajo uso de CPU, alta memoria
      disponible y actividad de red mínima.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Delete Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instancia de cómputo con bajo uso de CPU y memoria
      que se puede reducir a un tipo de instancia más pequeño.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Grupos de instancias de cómputo con cargas de trabajo
      no contenerizadas que tienen bajo uso de CPU y memoria y se pueden reducir ajustando
      sus estrategias de escalado.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance Group
    resource_type: Compute Instance Group
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Un escalador automático de grupos de instancias de
      cómputo con una capacidad mínima de instancias que se puede reducir.
    recommendation_prerequisites: ''
    recommendation_type: Reduce Minimum Capacity
    resource_type: Compute Instance Group
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instancias de CloudSQL con uso mínimo que se pueden
      eliminar.
    recommendation_prerequisites: ''
    recommendation_type: Delete Cloud SQL Instance
    resource_type: CloudSQL Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instancias de CloudSQL que están sobreaprovisionadas
      y se pueden reducir.
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
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
    recommendation_description: Los objetos en el bucket de almacenamiento se pueden
      migrar automáticamente a niveles de archivo para obtener mejores tarifas.
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Storage Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Clústeres de Kubernetes con una elevada inactividad
      en CPU o memoria.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Clústeres de Kubernetes con una elevada inactividad
      en CPU o memoria.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Clústeres de Kubernetes con una elevada inactividad
      en CPU o memoria.
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
  - category: Configure
    cloud_provider: OpenAI
    recommendation_description: Identifica las claves de API de OpenAI que ya utilizan
      almacenamiento en caché de prompts por debajo de la tasa de aciertos objetivo
      y recomienda mejorar la configuración de caché para reducir los costos de tokens
      de entrada.
    recommendation_prerequisites: ''
    recommendation_type: Optimize Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: OpenAI
    recommendation_description: Identifica las claves de API de OpenAI con un gasto
      significativo en procesamiento prioritario y recomienda mover el tráfico tolerante
      a la latencia al estándar para eliminar la prima de prioridad.
    recommendation_prerequisites: ''
    recommendation_type: Reduce OpenAI Priority Processing
    resource_type: API Key
  headers:
  - filter_by: true
    id: category
    name: Categoría de recomendación
  - filter_by: true
    id: cloud_provider
    name: Proveedor
  - filter_by: true
    id: resource_type
    name: Tipo de recurso
  - id: recommendation_type
    name: Tipo de recomendación
  - id: recommendation_description
    name: Descripción de la recomendación
  - id: recommendation_prerequisites
    name: Requisitos previos de la recomendación
title: Recomendaciones de Cloud Cost
---
## Resumen {#overview}

[Cloud Cost Recommendations][1] proporciona recomendaciones sobre cómo reducir su gasto en la nube y en IA optimizando el uso de sus recursos en la nube y el uso de la API de IA/LLM. Datadog genera un conjunto de recomendaciones combinando sus datos de observabilidad con los datos de facturación de su proveedor subyacente para identificar recursos en la nube huérfanos, heredados o sobreaprovisionados, así como el uso no optimizado de IA.

Las recomendaciones se ejecutan diariamente y se actualizan automáticamente en su cuenta tan pronto como se publican.

- Para **todos los recursos**, también se obtienen [Cloud Cost métricas][6] para ese recurso
- Para todos los **recursos de AWS** además de Kubernetes y EC2, las métricas de AWS también se obtienen de [AWS CloudWatch][7]

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Pestaña de resumen con posibles ahorros mensuales, posibles ahorros anuales y número total de incidencias abiertas en la página de Cloud Cost Recommendations" style="width:100%;" >}}

Puede ver la lógica detallada para cada tipo de recomendación, junto con las métricas de observabilidad o los datos de costos que se muestran en esta página.

Las recomendaciones admiten [Tag Pipelines][11], lo que le permite filtrar, agrupar y analizar recomendaciones utilizando las etiquetas estandarizadas de su organización. Cualquier regla de etiquetas configurada en Tag Pipelines se aplica automáticamente a las recomendaciones y [se normaliza][12].

También puede consultar sus recomendaciones desde un agente de IA con la herramienta [`cost_recommendations`][17] en el Datadog MCP Server.

## Categorías de recomendaciones {#recommendation-categories}

A continuación se presentan las categorías de recomendaciones de Cloud Cost disponibles y sus descripciones.

| Categoría de recomendación | Descripción |
|----------|-------------|
| Terminar | Recursos con señales de que el recurso no se utiliza o tiene una utilización muy baja. Considere terminar o eliminar estos recursos para reducir sus costos. |
| Migre | los recursos con señales de utilización moderadamente bajas u otras ineficiencias. Considere ajustar el tipo de instancia u otros parámetros. |
| Reduzca | los recursos que están subutilizados o sobreaprovisionados. Considere ajustar el tamaño u otros parámetros para reducir costos. |
| Adquiera | recursos con cargos bajo demanda y tiempo de actividad extendido. La compra de una reserva o un Savings Plan puede reducir el costo amortizado del recurso. |
| Configure | los recursos con opciones de configuración que se puedan ajustar para reducir costos sin cambiar la capacidad ni terminar el recurso. |

## Requisitos previos {#prerequisites}

Los siguientes son los requisitos necesarios para recibir recomendaciones de Cloud Cost:

- Cuentas de proveedor (para todas las recomendaciones de Cloud Cost deseadas)
- [Integración y recopilación de recursos de AWS][3] (para recomendaciones de AWS)
- [Integración y recopilación de recursos de Azure][8] (para recomendaciones de Azure)
- [Integración y recopilación de recursos de GCP][10] (para recomendaciones de GCP)
- [Integración de OpenAI][18] (para recomendaciones de OpenAI)
- [Integración de Anthropic][19] (para recomendaciones de Anthropic)
- [Datadog Agent integration][5] (para recomendaciones de reducción de tamaño)

## Configuración {#setup}

Para cada cuenta de nube de la que desee recibir recomendaciones:

1. Configure [Cloud Cost Management][2] para enviar datos de facturación a Datadog.
   - Para Azure, esto requiere utilizar el método de registro de aplicaciones para recopilar datos de facturación.
1. Habilite la [recopilación de recursos][3] para obtener recomendaciones.
   - Para AWS, habilite la recopilación de recursos en la pestaña {{< ui >}}Resource Collection{{< /ui >}} del [mosaico de integración de AWS][4].
   - Para Azure, habilite la recopilación de recursos con la integración adecuada. Si su organización se encuentra en el sitio US3 de Datadog, el [Azure Native Integration][9] habilita esto automáticamente a través de la recopilación de métricas. Para todos los demás sitios, es necesario habilitar la recopilación de recursos dentro del [Azure integration tile][8].
   - Para GCP, habilite la recopilación de recursos en la pestaña {{< ui >}}Resource Collection{{< /ui >}} del [Google Cloud Platform integration tile][10].
1. Instale el [Datadog Agent][5] (necesario para las recomendaciones de reducción de tamaño).

**Nota**: Cloud Cost Recommendations admite la facturación en las monedas que no sean USD de los clientes.

## Riesgo y nivel de esfuerzo {#risk-and-level-of-effort}

Cada recomendación incluye una puntuación de **Riesgo** y una puntuación de **Nivel de esfuerzo** para ayudarle a priorizar qué recomendaciones aplicar primero. Ambas puntuaciones utilizan una escala de {{< ui >}}Low{{< /ui >}}, {{< ui >}}Medium{{< /ui >}} y {{< ui >}}High{{< /ui >}}. Aparecen como las columnas {{< ui >}}Risk{{< /ui >}} y {{< ui >}}Effort{{< /ui >}} en la tabla {{< ui >}}Active Recommendations{{< /ui >}} y en el panel lateral de cada recomendación.

| Riesgo | Descripción |
|--------|-------------|
| {{< ui >}}Low{{< /ui >}} | Seguro y fácil de deshacer: sin datos en riesgo o totalmente recuperables, recurso fácilmente recreable, aislado, sin impacto en el tiempo de ejecución. |
| {{< ui >}}Medium{{< /ui >}} | Recuperable pero requiere esfuerzo: datos o recursos restaurables mediante instantánea o reaprovisionamiento, impacto limitado a una aplicación o carga de trabajo, solo una breve interrupción. |
| {{< ui >}}High{{< /ui >}} | Difícil de deshacer o de alto impacto si es incorrecto: pérdida de datos irreversible, un recurso que no se puede recrear, amplio radio de impacto o posible tiempo de inactividad en una carga de trabajo activa. |


| Nivel de esfuerzo | Descripción |
|--------|-------------|
| {{< ui >}}Low{{< /ui >}} | Un cambio rápido que toma minutos. Generalmente un solo interruptor de consola o llamada a API, y totalmente automatizable. |
| {{< ui >}}Medium{{< /ui >}} | Un esfuerzo moderado que toma de horas a días. Requiere algo de scripting, pruebas o coordinación con otro equipo. |
| {{< ui >}}High{{< /ui >}} | Un esfuerzo importante que toma semanas. Un cambio arquitectónico o coordinación entre varios equipos.|

Utilice las columnas {{< ui >}}Risk{{< /ui >}} y {{< ui >}}Effort{{< /ui >}} para priorizar las recomendaciones que son de bajo riesgo, bajo esfuerzo, o ambas. 

## Estados de las recomendaciones {#recommendation-statuses}

Asigne un estado a cada recomendación para realizar un seguimiento del progreso de la optimización de costos en sus equipos. Los estados persisten cuando las recomendaciones se regeneran diariamente. No necesita volver a clasificar las mismas recomendaciones.

| Estado | Descripción |
|--------|-------------|
| {{< ui >}}Open{{< /ui >}} | (Predeterminado) La recomendación no ha sido clasificada. |
| {{< ui >}}In Progress{{< /ui >}} | Se está trabajando para abordar esta recomendación. |
| {{< ui >}}Completed{{< /ui >}} | La acción recomendada ha sido tomada o ya no es relevante. |
| {{< ui >}}Dismissed{{< /ui >}} | No se planea realizar ningún trabajo para esta recomendación durante el período de tiempo especificado al descartarla. |

### Filtrar recomendaciones por estado {#filter-recommendations-by-status}

Utilice las pestañas de estado en la parte superior de la página [{{< ui >}}Cloud Cost Recommendations{{< /ui >}}][1] para filtrar la lista por estado. Las pestañas disponibles son {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Completed{{< /ui >}} y {{< ui >}}Dismissed{{< /ui >}}. Cada pestaña muestra el ahorro total estimado para las recomendaciones en ese estado.

### Seguimiento de ahorros por estado {#track-savings-by-status}

Cada pestaña de estado muestra el ahorro total estimado para las recomendaciones en ese estado:

- {{< ui >}}Open{{< /ui >}}: Ahorros potenciales de las recomendaciones que no han sido clasificadas.
- {{< ui >}}In Progress{{< /ui >}}: Ahorros estimados de las recomendaciones con trabajo en curso.
- {{< ui >}}Completed{{< /ui >}}: Ahorros realizados de las recomendaciones donde se ha tomado la acción recomendada.
- {{< ui >}}Dismissed{{< /ui >}}: Ahorros estimados de las recomendaciones que han sido descartadas.

### Cambiar el estado de una recomendación {#change-a-recommendation-status}

Puede cambiar el estado de una recomendación de tres maneras:

- **Actualización masiva**: Seleccione una o más recomendaciones en {{< ui >}}Active Recommendations{{< /ui >}}, luego elija un estado de la barra de herramientas sobre la tabla para aplicarlo a todas las recomendaciones seleccionadas.
- **Desde la tabla**: Utilice el menú desplegable de estado en la columna {{< ui >}}Status{{< /ui >}} para seleccionar un nuevo estado directamente de la lista de recomendaciones.
- **Desde el panel lateral**: Haga clic en una recomendación para abrir el panel lateral, luego utilice el menú desplegable de estado para seleccionar un nuevo estado.

## Ejecución de acciones de recomendación {#recommendation-action-taking}
Puede actuar sobre las recomendaciones para ahorrar dinero y optimizar los costos. Las recomendaciones de Cloud Cost admiten Jira, 1-click Workflow Automation y Datadog Work Management. Las recomendaciones de volúmenes EBS y GP2 EBS no utilizados también admiten 1-click Workflow Automation. Consulte los siguientes detalles para cada opción de acción:

- **Jira**: Cree incidencias de Jira directamente desde el panel lateral de recomendaciones o seleccionando varias recomendaciones en la lista {{< ui >}}Active Recommendations{{< /ui >}} y haciendo clic en {{< ui >}}Create Jira issue{{< /ui >}}. Las incidencias creadas se etiquetan y vinculan de vuelta a la recomendación en Datadog.

  Para filtrar las recomendaciones por estado de Jira, utilice las siguientes opciones de consulta:
  - `@jira_issues.issue_key:*` - Mostrar solo las recomendaciones con una incidencia de Jira
  - `-@jira_issues.issue_key:*` - Mostrar solo las recomendaciones sin una incidencia de Jira
  - `jira_issues.issue_key:ABC*` - Filtrar por prefijo de proyecto de Jira específico

- **[Bits Code][14] correcciones de código**: Las correcciones de código están disponibles para las recomendaciones de S3 y DynamoDB aplicables, así como para la recomendación de reducir el tamaño de la implementación de Kubernetes. En estas situaciones, Bits Code crea pull requests listos para producción para implementar cambios en los recursos de la nube y optimizaciones de costos en Terraform o Helm charts, respectivamente. [Configure Bits Code][13] para usar esta función.
- **1-click Workflow Automation actions**: Las acciones están disponibles para un conjunto limitado de recomendaciones, lo que permite a los usuarios ejecutar las acciones sugeridas, como hacer clic en {{< ui >}}Delete EBS Volume{{< /ui >}}, directamente dentro de Cloud Cost Management.
- **[Automatizaciones de optimización de costos][15]**: Configure automatizaciones que actúen sobre las recomendaciones de forma continua en un horario recurrente. Las automatizaciones tienen un alcance limitado a cuentas, regiones y etiquetas específicas, e incluyen medidas de seguridad como instantáneas previas a la acción y aprobación humana opcional a través de Slack o Microsoft Teams.
- **[Notifications][16]**: Configure reglas de notificación que envíen un resumen recurrente por Slack de las recomendaciones coincidentes, sin realizar ninguna acción.
- **Datadog Case Management**: Los usuarios pueden ir al panel lateral de recomendaciones y hacer clic en {{< ui >}}Create Case{{< /ui >}} para generar una incidencia para gestionar y tomar medidas sobre las recomendaciones.
- **Descartar**: Utilice {{< ui >}}Dismiss{{< /ui >}} en el panel lateral de recomendaciones para ocultar una recomendación durante un período de tiempo elegido y proporcionar un motivo. Las recomendaciones descartadas se mueven a la pestaña {{< ui >}}Dismissed{{< /ui >}}.

## Descripciones de recomendaciones y recursos {#recommendation-and-resource-descriptions}

{{< multifilter-search >}}

## Lecturas adicionales {#further-reading}

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
[13]: /es/bits_ai/bits_code/setup
[14]: /es/bits_ai/bits_code/
[15]: /es/cloud_cost_management/recommendations/cost_optimization_automation/
[16]: /es/cloud_cost_management/recommendations/notifications/
[17]: /es/mcp_server/tools/#cost_recommendations
[18]: /es/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[19]: /es/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts