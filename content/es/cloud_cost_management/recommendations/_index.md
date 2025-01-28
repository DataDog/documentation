---
algolia:
  tags:
  - recomendaciones de costes en la nube
  - recomendación de costes en la nube
  - recomendaciones de costes
  - recomendación de costes
  - recursos en la nube
  - recurso en la nube
description: Aprende a reducir el gasto de los recursos en la nube de tu organización
  con las recomendaciones de costes.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: Documentación
  text: FAQ sobre la integración de AWS y CloudWatch
multifiltersearch:
  data:
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Instancias de EC2 con menos del 5% de utilización
      de CPU y menos del 10 % de utilización de memoria.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Instancias de EC2 sin usar
    resource_type: EC2
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta Redis con 0 aciertos
      de espacio de claves y no está en contenedores, no es un líder, un seguidor
      ni una compartición.
    recommendation_prerequisites: '[Integración de Redis](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: Instancia de EC2 sin usar que ejecuta Redis
    resource_type: EC2
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta memcached con 0 aciertos
      de espacio de claves y no está en contenedores.
    recommendation_prerequisites: '[Integración de memcache](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: Instancia de EC2 sin usar que ejecuta memcached
    resource_type: EC2
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta Postgres con menos de
      1 conexión simultánea y no está en un contenedor ni es una réplica.
    recommendation_prerequisites: '[Integración de Postgres](https://docs.datadoghq.com/integrations/mcache/?tab=host)'
    recommendation_type: Instancia de EC2 sin usar que ejecuta Postgres
    resource_type: EC2
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta MySQL con menos de 1
      conexión simultánea y no está en un contenedor ni es una réplica.
    recommendation_prerequisites: '[Integración de MySQL](https://docs.datadoghq.com/integrations/postgres/?tab=host)'
    recommendation_type: Instancia de EC2 sin usar que ejecuta MySQL
    resource_type: EC2
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Volúmenes que se han separado de una instancia de
      EC2.
    recommendation_prerequisites: ''
    recommendation_type: Volúmenes de EBS sin adjuntar
    resource_type: EBS
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Volúmenes adjuntos a una instancia de EC2 que no se
      está ejecutando.
    recommendation_prerequisites: ''
    recommendation_type: Volúmenes de EBS sin usar
    resource_type: EBS
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Instancias de RDS con 0 conexiones de base de datos
      y 0 retrasos de réplica.
    recommendation_prerequisites: ''
    recommendation_type: Instancias de RDS sin usar
    resource_type: RDS
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Cargas de varias partes incompletas.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Cargas de varias partes de S3 abandonadas
    resource_type: S3
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Clúster de Redshift con 0 conexiones de base de datos.
    recommendation_prerequisites: ''
    recommendation_type: Clúster de Redshift sin usar
    resource_type: Redshift
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Clúster de Elasticache para Redis con 0 aciertos de
      caché y 0 bytes de replicación.
    recommendation_prerequisites: ''
    recommendation_type: Clúster de Elasticache para Redis sin usar
    resource_type: Elasticache para Redis
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Un agente de mensajes de MQ con 0 conexiones.
    recommendation_prerequisites: ''
    recommendation_type: Agente de mensajes de MQ sin usar
    resource_type: MQ
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Los bytes de la imagen de ECR tienen más de 180 días.
    recommendation_prerequisites: ''
    recommendation_type: Imágenes de ECR antiguas
    resource_type: ECR
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Un clúster de OpenSearch con 0 conexiones.
    recommendation_prerequisites: ''
    recommendation_type: Clúster de OpenSearch
    resource_type: OpenSearch
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Equilibrador de carga elástico clásico sin conexiones
      activas que no está adjuntado a una instancia de EC2.
    recommendation_prerequisites: ''
    recommendation_type: Equilibradores de carga elásticos clásicos sin usar
    resource_type: Equilibrador de carga elástico clásico
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Un equilibrador de carga de red con 0 bytes procesados.
    recommendation_prerequisites: ''
    recommendation_type: Equilibrador de carga elástico de red sin usar
    resource_type: Equilibrador de carga elástico de red
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Un equilibrador de carga de aplicaciones sin tráfico
      procesado.
    recommendation_prerequisites: ''
    recommendation_type: Equilibrador de carga de aplicaciones sin usar
    resource_type: Equilibrador de carga de aplicaciones
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Una gateway NAT que no recibe bytes.
    recommendation_prerequisites: ''
    recommendation_type: Gateway NAT sin usar
    resource_type: Gateway NAT
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Direcciones IP elásticas con cargos por inactividad
      en tu informe de costes y uso de AWS.
    recommendation_prerequisites: ''
    recommendation_type: Dirección IP elástica inactiva
    resource_type: Dirección IP elástica
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB tiene 0 lecturas consumidas
      y 0 escrituras no replicadas consumidas.
    recommendation_prerequisites: ''
    recommendation_type: DynamoDB sin usar
    resource_type: DynamoDB
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: El índice secundario global (GSI) de una tabla de
      DynamoDB tiene 0 lecturas consumidas.
    recommendation_prerequisites: ''
    recommendation_type: Índice secundario global de DynamoDB sin usar
    resource_type: DynamoDB
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Un grupo de escalado automático que incluye tipos
      de instancias heredadas.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: ASGs con tipos de instancias heredadas
    resource_type: Grupos de escalado automático (ASG)
  - category: Recurso sin usar
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB tiene cargos por más de 2 copias
      de seguridad a pedido.
    recommendation_prerequisites: ''
    recommendation_type: Eliminación de copias de seguridad adicionales a pedido de
      DynamoDB
    resource_type: DynamoDB
  - category: Recurso de la generación anterior
    cloud_provider: AWS
    recommendation_description: Instancias de EC2 que son de la generación anterior
      y se pueden actualizar a un tipo de instancia más nuevo.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Instancia de EC2 heredada
    resource_type: EC2
  - category: Recurso de la generación anterior
    cloud_provider: AWS
    recommendation_description: Volúmenes de EBS que son GP2 y se pueden actualizar
      a GP3 para reducir costes y mejorar el rendimiento.
    recommendation_prerequisites: ''
    recommendation_type: Volúmenes de EBS de tipo GP2
    resource_type: EBS de tipo GP2
  - category: Recurso de la generación anterior
    cloud_provider: AWS
    recommendation_description: Volúmenes de EBS que son I01 y se pueden actualizar
      a GP3 para reducir costes y mejorar el rendimiento.
    recommendation_prerequisites: ''
    recommendation_type: Volúmenes de EBS de tipo I01
    resource_type: EBS de tipo I01
  - category: Recurso de la generación anterior
    cloud_provider: AWS
    recommendation_description: Un RDS que ejecuta una versión de motor que ya no
      es compatible y genera [cargos por soporte extendido](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html)
    recommendation_prerequisites: ''
    recommendation_type: Instancia de RDS con soporte extendido
    resource_type: RDS
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Migra instancias de grupos de escalado automático
      heredados a tipos nuevos.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Instancias de EC2 sobreaprovisionadas
    resource_type: EC2
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta Redis con menos del 25%
      de CPU de usuario y no está en contenedores, no es un líder, un seguidor ni
      una compartición.
    recommendation_prerequisites: '[Integración de Redis](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: Instancias de EC2 sobreaprovisionadas que ejecutan Redis
    resource_type: EC2
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta memcached con menos del
      25% de CPU de usuario y no está en contenedores.
    recommendation_prerequisites: '[Integración de memcache](https://docs.datadoghq.com/integrations/redisdb/?tab=host)'
    recommendation_type: Instancia de EC2 sobreaprovisionada que ejecuta memcached
    resource_type: EC2
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta Postgres con menos del
      25% de CPU de usuario y más del 25% de memoria utilizable y no está en un contenedor
      ni es una réplica.
    recommendation_prerequisites: '[Integración de Postgres](https://docs.datadoghq.com/integrations/mcache/?tab=host)'
    recommendation_type: Instancia de EC2 sobreaprovisionada que ejecuta Postgres
    resource_type: EC2
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Instancia de EC2 que ejecuta MySQL con menos del 25%
      de CPU de usuario y más del 25% de memoria utilizable y no está en un contenedor
      ni es una réplica.
    recommendation_prerequisites: '[Integración de MySQL](https://docs.datadoghq.com/integrations/postgres/?tab=host)'
    recommendation_type: Instancia de EC2 sobreaprovisionada que ejecuta MySQL
    resource_type: EC2
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Contenedores con menos del 30% de utilización de CPU
      y memoria.
    recommendation_prerequisites: '[Agent de generación de perfiles de Datadog](/profiler/enabling/)'
    recommendation_type: Contenedores de Kubernetes sobreaprovisionados
    resource_type: Contenedores de Kubernetes
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Volúmenes de EBS en los que la cantidad de IOPS excede
      lo que se usa.
    recommendation_prerequisites: '*[Integración de Amazon EC2](/integrations/amazon_ec2/)'
    recommendation_type: IOPS de volumen de EBS sobreaprovisionado
    resource_type: EBS
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Una instancia de RDS que usa menos del 80% de las
      IOPS aprovisionadas para lecturas y escrituras.
    recommendation_prerequisites: ''
    recommendation_type: IOPS de RDS sobreaprovisionadas
    resource_type: IOPS de RDS
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Un volumen de EBS que usa menos del 80% de las IOPS
      aprovisionadas para lecturas y escrituras.
    recommendation_prerequisites: '*[Integración de Amazon EC2](/integrations/amazon_ec2/)'
    recommendation_type: IOPS de EBS sobreaprovisionadas
    resource_type: IOPS de EBS
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Un volumen de EBS con menos del 20% de su capacidad
      de almacenamiento usada.
    recommendation_prerequisites: '*[Integración de Amazon EC2](/integrations/amazon_ec2/)'
    recommendation_type: Almacenamiento de EBS sobreaprovisionado
    resource_type: Almacenamiento de EBS
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Un volumen de EBS que usa menos del 80% del rendimiento
      aprovisionado para lecturas y escrituras.
    recommendation_prerequisites: '*[Integración de Amazon EC2](/integrations/amazon_ec2/)'
    recommendation_type: Rendimiento de EBS sobreaprovisionado
    resource_type: Rendimiento de EBS
  - category: Recurso sobreaprovisionado
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB aprovisionada que usa menos
      del 80% de su capacidad de lectura y escritura, más del 80% de las veces.
    recommendation_prerequisites: ''
    recommendation_type: Capacidad de DynamoDB sobreaprovisionada
    resource_type: DynamoDB
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Una instancia de RDS de más de 45 días se sigue cobrando
      con tarifas bajo demanda.
    recommendation_prerequisites: ''
    recommendation_type: Compra de RI de RDS
    resource_type: Instancias reservadas de RDS
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Un nodo de ElastiCache de más de 45 días se sigue
      cobrando con tarifas bajo demanda.
    recommendation_prerequisites: ''
    recommendation_type: Compra de RI de ElastiCache
    resource_type: Instancias reservadas de ElastiCache
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Una instancia de OpenSearch de más de 45 días se sigue
      cobrando con tarifas bajo demanda.
    recommendation_prerequisites: ''
    recommendation_type: Compra de RI de OpenSearch
    resource_type: Instancias reservadas de OpenSearch
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Un clúster de Redshift de más de 45 días se sigue
      cobrando con tarifas bajo demanda.
    recommendation_prerequisites: ''
    recommendation_type: Compra de RI de Redshift
    resource_type: Instancias reservadas de Redshift
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Los costes de un bucket se expresan casi en su totalidad
      en almacenamiento estándar por GB, pero las solicitudes GET indican que se accede
      a pocos objetos.
    recommendation_prerequisites: ''
    recommendation_type: S3 Tiering
    resource_type: S3
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Un bucket de S3 estándar sin un ciclo de vida de vencimiento
      de las versiones no actuales y que no presta servicio a un sitio web contiene
      bytes de almacenamiento de versiones no actuales con más de 30 días.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Regla de ciclo de vida de vencimiento de las versiones no
      actuales de S3
    resource_type: S3
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB aprovisionada tiene un consumo
      de capacidad de lectura y escritura por hora inferior al 18%, al menos una vez
      en las últimas dos semanas.
    recommendation_prerequisites: ''
    recommendation_type: Migración de DynamoDB al modo de capacidad bajo demanda
    resource_type: DynamoDB
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: Una tabla de DynamoDB bajo demanda tiene un consumo
      de capacidad de lectura y escritura por hora que siempre es superior al 18%.
    recommendation_prerequisites: ''
    recommendation_type: Migración de DynamoDB al modo de capacidad aprovisionada
    resource_type: DynamoDB
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: La migración a la clase de tabla estándar ofrece ahorros
      potenciales en las tarifas de capacidad en comparación con los costes adicionales
      de las tarifas de almacenamiento, o usa el nivel gratuito de la clase de tabla
      estándar para el almacenamiento.
    recommendation_prerequisites: ''
    recommendation_type: Migración de DynamoDB a la clase de tabla estándar
    resource_type: DynamoDB
  - category: Optimización de tarifas
    cloud_provider: AWS
    recommendation_description: La migración a la clase de tabla de acceso poco frecuente
      (IA) ofrece un mayor ahorro potencial de las tarifas de almacenamiento en comparación
      con los costes adicionales de las tarifas de capacidad.
    recommendation_prerequisites: ''
    recommendation_type: Migración de DynamoDB a la clase de tabla de acceso poco
      frecuente
    resource_type: DynamoDB
  - category: Arquitectura
    cloud_provider: AWS
    recommendation_description: Los recursos en la misma VPC deben evitar comunicarse
      entre sí a través de una gateway NAT porque eso genera cargos de procesamiento
      de gateway NAT innecesarios.
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Cargos por transferencia de gateway NAT dentro de la VPC
    resource_type: Gateway NAT
  - category: Arquitectura
    cloud_provider: AWS
    recommendation_description: Los recursos que necesitan una gateway NAT deben usar
      una que esté en la misma zona de disponibilidad, o pueden incurrir en cargos
      por transferencia entre zonas innecesarios.
    recommendation_prerequisites: ''
    recommendation_type: Cargos por transferencia entre zonas de gateway NAT
    resource_type: Gateway NAT
  headers:
  - filter_by: true
    id: categoría
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
title: Recomendaciones de costes en la nube
---

{{< callout url="#" btn_hidden="true" header="¡Obtén la versión preliminar!" >}}
Las recomendaciones de costes en la nube se encuentran en versión preliminar con soporte para AWS, y se habilitan de manera automática si se configura <a href="/cloud_cost_management/">Cloud Cost Management</a>
{{< /callout >}}

## Información general

Las [recomendaciones de costes en la nube][1] ofrecen recomendaciones para reducir el gasto en la nube mediante la optimización del uso de los recursos en la nube. Datadog genera un conjunto de recomendaciones al combinar los datos de observabilidad con los datos de facturación del proveedor de nube subyacente para identificar recursos en la nube huérfanos, heredados o sobreaprovisionados.

Las recomendaciones se ejecutan a diario y se actualizan de manera automática en tu cuenta tan pronto como se publican.

- Para **todos los recursos**, también se extraen [métricas de costes en la nube][6] para ese recurso
- Para todos los **recursos de AWS** además de Kubernetes y EC2, las métricas de AWS también se extraen de [AWS CloudWatch][6]

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Pestaña de información general con posibles ahorros mensuales, posibles ahorros anuales y cantidad total de casos abiertos en la página de recomendaciones de costes en la nube" style="width:100%;" >}}

Puedes ver la lógica detallada de cada tipo de recomendación, junto con métricas de observabilidad o datos de costes que se muestran en esta página.

## Categorías de recomendación

A continuación se muestran las categorías de recomendación de costes en la nube disponibles y sus descripciones.

| Categoría de recomendación | Descripción |
|----------|-------------|
| Recurso sin usar | Recursos identificados que se ejecutan en hardware heredado o que no se usan de manera eficiente en tu entorno en la nube. Puedes considerar actualizar o eliminar estos recursos para reducir tus costes y mejorar el rendimiento de tus recursos. |
| Recurso de la generación anterior | Recursos que se ejecutan en hardware heredado y que puedes considerar actualizar para reducir tus costes y mejorar el rendimiento de tus recursos. |
| Recurso sobreaprovisionado | Recursos que no se usan demasiado o sobreaprovisionados, que puedes considerar ajustar en tamaño y configuración para reducir tus costes y mejorar el rendimiento de tus recursos. |
| Optimización de tarifas | Recursos que se cobran a tarifas bajo demanda o que podrían beneficiarse de la optimización de tarifas. Puedes considerar modificar estos recursos para reducir tus costos. |
| Arquitectura | Recursos relacionados con las gateways NAT que puedes considerar optimizar para reducir cargos innecesarios. |

## Requisitos previos

Los siguientes son requisitos necesarios para recibir recomendaciones de costes en la nube:

- Cuentas de proveedores de nube (para todas las recomendaciones de costes en la nube)
- [Recopilación de recursos e integración de AWS][3] (para recomendaciones de AWS)

## Configuración

Para cada cuenta en la nube para la que quieres recibir recomendaciones:

1. Configura [Cloud Cost Management][2] para enviar los datos de facturación a Datadog.
1. Habilita la [recopilación de recursos][3] en la pestaña **Resource Collection** (Recopilación de recursos) en el [cuadro de integración de AWS][4].
1. Instala el «[Datadog Agent][5]» (necesario para las recomendaciones de recursos sobreaprovisionados).

## Descripciones de recursos y recomendaciones

{{< multifilter-search >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /es/cloud_cost_management/aws/#setup
[3]: /es/integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /es/agent/
[6]: /es/integrations/amazon_s3_storage_lens/