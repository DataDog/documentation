---
aliases:
- /es/integrations/aws/
- /es/logs/aws
- /es/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
- /es/integrations/faq/additional-aws-metrics-min-max-sum
- /es/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
- cloud
- aws
- log collection
dependencies: []
description: Integra tus servicios de AWS con Datadog.
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: Blog
  text: Monitoriza las métricas de uso de la API del plano de control de AWS en Datadog
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
is_public: true
custom_kind: integración
manifest_version: '1.0'
name: amazon_web_services
public_title: Integración de AWS con Datadog
short_description: Integra tus servicios de AWS con Datadog.
version: '1.0'
---

## Información general

Conecta Amazon Web Services (AWS) para:

- Ver las actualizaciones automáticas de estado de AWS en tu flujo de eventos
- Obtener las métricas de CloudWatch de los hosts EC2 sin necesidad de instalar Agent
- Etiquetar tus hosts EC2 con información concreta sobre EC2
- Ver los eventos de mantenimiento programados de EC2 en tu flujo (stream)
- Recopilar las métricas y eventos de CloudWatch de muchos otros productos de AWS
- Ver las alarmas de CloudWatch en tu flujo de eventos

Para empezar a utilizar la integración de AWS cuanto antes, consulta la [guía sobre cómo empezar con AWS][1].

<div class="alert alert-warning">
La integración de Amazon Web Services de Datadog está configurada para recopilar <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html">TODAS las métricas de CloudWatch</a>. Pese a que Datadog hace todo lo posible por actualizar de forma continua su documentación para mostrar todas las subintegraciones, lo cierto es que los servicios en la nube publican muy rápido las métricas y servicios nuevos, por lo que la lista de integraciones no siempre está al día.
</div>

| Integración                             | Descripción                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| [API Gateway][2]                        | Crea, publica, mantiene y protege las API                                             |
| [App Runner][3]                       | Servicio que ofrece una forma rápida, simple y rentable de implementar código desde la fuente o una imagen de contenedor         |
| [AppStream][4]                          | Streaming de aplicaciones totalmente gestionado de AWS                                             |
| [AppSync][5]                            | Servicio de GraphQL con funciones de sincronización de datos en tiempo real y programación sin conexión |
| [Athena][6]                             | Servicio de consultas interactivo y serverless                                                   |
| [Auto Scaling][7]                        | Escala la capacidad de EC2                                                                     |
| [Billing][8]                            | Facturación y presupuestos                                                                    |
| [CloudFront][9]                         | Red de entrega de contenido local                                                         |
| [CloudHSM][10]                           | Módulo de seguridad de hardware gestionado (HSM)                                                 |
| [CloudSearch][11]                        | Accede a los archivos de logs y a las llamadas de la API de AWS                                                  |
| [CloudTrail][12]                        | Accede a los archivos de logs y a las llamadas de la API de AWS                                                  |
| [CodeBuild][13]                         | Servicio de compilación totalmente gestionado                                                            |
| [CodeDeploy][14]                        | Automatiza la implementación de código                                                              |
| [Cognito][15]                           | Incorpora un registro e inicio de sesión seguros para los usuarios                                                        |
| [Connect][16]                           | Servicio de centro de contacto en la nube con características de autoservicio                                     |
| [Direct Connect][17]                    | Conexión de redes dedicadas con AWS                                                    |
| [DMS][18]                               | Servicio de migración de bases de datos                                                             |
| [DocumentDB][19]                        | Base de datos compatible con MongoDB                                                            |
| [Dynamo DB][20]                         | Base de datos NoSQL                                                                         |
| [EBS (Elastic Block Store)][21]         | Volúmenes de almacenamiento de bloques persistente                                                 |
| [EC2 (Elastic Cloud Compute)][22]       | Capacidad informática de tamaño modificable en la nube                                                |
| [EC2 Spot][23]                          | Aprovecha el espacio libre de EC2                                                  |
| [ECS (Elastic Container Service)][24]   | Servicio de gestión de contenedores compatible con los contenedores Docker                           |
| [EFS (Elastic File System)][25]         | Almacenamiento de archivos compartido                                                                    |
| [EKS][26]                               | Servicio de contenedores elásticos de Kubernetes                                               |
| [Elastic Transcoder][27]                | Transcodificación de vídeo y contenido multimedia en la nube                                               |
| [ElastiCache][28]                       | Caché en memoria en la nube                                                           |
| [Elastic Beanstalk][29]                 | Servicio para implementar y escalar aplicaciones web y servicios                        |
| [ELB (Elastic Load Balancing)][30]      | Distribuye el tráfico de aplicaciones entrantes entre varias instancias de Amazon EC2          |
| [EMR (Elastic Map Reduce)][31]          | Procesamiento de datos con Hadoop                                                           |
| [ES (Elasticsearch)][32]                | Implementa, pone en funcionamiento y escala clústeres de Elasticsearch                                      |
| [Firehose][33]                          | Captura y carga datos de streaming                                                        |
| [FSx][34]                              | Servicio gestionado que ofrece almacenamiento escalable para Windows File Server o Lustre.          |
| [Gamelift][35]                          | Hosting de servidores dedicados de videojuegos                                                          |
| [Glue][36]                              | Extrae, transforma y carga datos para realizar análisis                                        |
| [GuardDuty][37]                         | Detección inteligente de amenazas                                                           |
| [Health][38]                            | Permite ver el estado de tus recursos, servicios y cuentas de AWS                |
| [Inspector][39]                         | Evaluación automatizada de la seguridad                                                          |
| [IOT (Internet de las cosas)][40]          | Conecta dispositivos IOT con servicios en la nube                                                |
| [Keyspaces][41]                        | Servicio gestionado de bases de datos compatible con Apache Cassandra                                   |
| [Kinesis][42]                           | Servicio para procesar en tiempo real grandes flujos de datos distribuidos                    |
| [KMS (Key Management Service)][43]      | Crea y controla claves de cifrado                                                     |
| [Lambda][44]                            | Informática serverless                                                                   |
| [Lex][45]                               | Crea bots de conversación                                                                |
| [Machine Learning][46]                  | Crea modelos de machine learning                                                         |
| [MediaConnect][47]                      | Transporte de vídeo en directo                                                               |
| [MediaConvert][48]                      | Procesamiento de vídeo para su transmisión y distribución multipantalla                                |
| [MediaPackage][49]                      | Prepara y protege los vídeos para su entrega a través de Internet                               |
| [MediaTailor][50]                       | Inserción de anuncios escalable del lado del servidor                                                      |
| [MQ][51]                                | Agente de mensajes gestionados de ActiveMQ                                                    |
| [Managed Streaming for Kafka][52]       | Crea y ejecuta aplicaciones que utilizan Apache Kafka para procesar datos de streaming             |
| [NAT Gateway][53]                       | Habilita instancias en una subred privada para conectarse a Internet o a otros servicios de AWS  |
| [Neptune][54]                           | Base de datos de gráficos rápida y fiable diseñada para funcionar en nube                                      |
| [Network Firewall][55]                 | Filtra el tráfico en el perímetro de una VPC                                               |
| [OpsWorks][56]                          | Gestión de configuración                                                               |
| [Polly][57]                             | Servicio que convierte texto en habla                                                                    |
| [RDS (Relational Database Service)][58] | Base de datos relacional en la nube                                                       |
| [Redshift][59]                          | Solución de almacenamiento de datos                                                                |
| [Rekognition][60]                       | Análisis de imágenes y vídeos para aplicaciones                                              |
| [Route 53][61]                          | Gestión de DNS y tráfico con monitorización de disponibilidad                                |
| [S3 (Simple Storage Service)][62]       | Servicio de almacenamiento en la nube que ofrece una alta disponibilidad y escalabilidad                                    |
| [SageMaker][63]                         | Modelos y algoritmos de machine learning                                                 |
| [SES (Simple Email Service)][64]        | Servicio de correo electrónico solo de salida y rentable                                    |
| [SNS (Simple Notification System)][65]  | Alertas y notificaciones                                                               |
| [SQS (Simple Queue Service)][66]        | Servicio de colas de mensajes                                                                |
| [Storage Gateway][67]                   | Almacenamiento híbrido en la nube                                                                   |
| [SWF (Simple Workflow Service)][68]     | Gestión de flujos de trabajo en la nube                                                              |
| [VPC (Virtual Private Cloud)][69]       | Lanza recursos de AWS en una red virtual                                            |
| [Web Application Firewall (WAF)][70]    | Protege las aplicaciones web de las vulnerabilidades habituales de la web                                      |
| [WorkSpaces][71]                        | Servicio informático de escritorio seguro                                                       |
| [X-Ray][72]                             | Rastreo de aplicaciones distribuidas                                                   |

## Configuración

{{< site-region region="gov" >}}
<div class="alert alert-warning">El sitio web de Datadog for Government no admite la delegación de roles de AWS. Es obligatorio usar <a href="?tab=accesskeysgovcloudorchinaonly#setup">claves de acceso</a>.</div>
{{< /site-region >}}

Usa uno de los siguientes métodos para integrar tus cuentas de AWS en Datadog con el fin de recopilar métricas, eventos, etiquetas y logs.

### Automática

  * **CloudFormation (el mejor método para empezar cuanto antes)**  
      Para configurar la integración de AWS con CloudFormation, consulta la [guía sobre cómo empezar con AWS][1].

  * **Terraform**  
      Para configurar la integración de AWS con Terraform, consulta la [integración de AWS con Terraform][73].

### Manual 

   * **Delegación de roles**  
      Para configurar la integración de AWS manualmente con delegación de roles, consulta la [guía de configuración manual][74].

   * **Claves de acceso (solo para GovCloud o China)**  
      Para configurar la integración de AWS con claves de acceso, consulta la [guía de configuración manual][75].

{{% aws-permissions %}}

## Recopilación de logs

Existen dos formas de enviar los logs de los servicios de AWS a Datadog:

- [Destino de Kinesis Firehose][76]: Usa el destino de Datadog en tu flujo de entrega de Kinesis Firehose para transferir los logs a Datadog. Es el método recomendado cuando se trata de enviar un volumen muy alto de logs desde CloudWatch.
- [Función lambda de Forwarder][77]: Implementa la función lambda de Datadog Forwarder. Esta se suscribe a los depósitos de S3 o a tus grupos de logs de CloudWatch, y transfiere logs a Datadog. **Debes** usar este método para enviar trazas (traces), métricas mejoradas o métricas personalizadas a partir de funciones lambda, de forma asincrónica y a través de logs. Datadog también recomienda este método para enviar logs de S3 a otros recursos que no pueden transferir datos por streaming hacia Kinesis.

## Recopilación de métricas

Existen dos formas de enviar las métricas de AWS a Datadog:

- [Sondeo de métricas][78]: El sondeo de la API se incluye de forma predefinida en la integración de AWS. La API de CloudWatch efectúa un rastreo minucioso de las métricas para extraer datos y enviárselos a Datadog. De media, se extraen métricas nuevas cada diez minutos.
- [Flujos de métricas con Kinesis Firehose][79]: Puedes usar Amazon CloudWatch Metric Streams y Amazon Kinesis Data Firehose para consultar tus métricas. **Nota**: Este método tiene una latencia de entre dos y tres minutos y necesita una configuración independiente.

## Recopilación de recursos

Algunos productos de Datadog aprovechan la información relacionada con la configuración de tus recursos de AWS (como los depósitos de S3, los snapshots de RDS y las distribuciones de CloudFront). Datadog recopila dicha información efectuando llamadas a la API de solo lectura en tu cuenta de AWS.

### Administración de la posición de seguridad en la nube

#### Configuración

Si no has configurado la integración de AWS en tu cuenta de AWS, completa el [proceso de configuración][80] que te presentamos más abajo. No olvides habilitar la recopilación de recursos cuando se indique.  

**Nota:** Para usar esta función, es necesario configurar la integración de AWS con **Delegación de roles*.*

Para añadir la administración de la posición de seguridad en la nube a una integración de AWS existente, sigue los pasos que aparecen a continuación para habilitar la recopilación de recursos.

1. Concédele los permisos necesarios al rol IAM de Datadog siguiendo los siguientes pasos de configuración automática **o** manual:

    **Automática**: Actualiza tu plantilla de CloudFormation.    
    a. Dirígete a la consola de CloudFormation, busca el stack principal que hayas utilizado para instalar la integración de Datadog y selecciona `Update`.  
    b. Selecciona `Replace current template`.  
    c. Selecciona `Amazon S3 URL`, introduce `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml` y haz clic en `Next`.  
    d. Configura `CloudSecurityPostureManagementPermissions` como `true` y haz clic en `Next` sin modificar ningún otro parámetro hasta que llegues a la página `Review`. Una vez allí, podrás previsualizar los cambios para verificarlos.  
    e. Marca las dos casillas de confirmación de la parte inferior y haz clic en `Update stack`.  

   **Manual**: Adjunta la [política gestionada `SecurityAudit` de AWS][81] a tu rol de IAM de Datadog AWS. La encontrarás en la [consola de AWS][81].  

2. Completa la configuración en el [cuadro de integración de Datadog AWS][82] con los pasos que aparecen a continuación. Si lo prefieres, también puedes usar el punto de conexión de API para [actualizar una integración de AWS][74].

   1. Haz clic en la cuenta de AWS en la que te gustaría habilitar la recopilación de recursos.
   2. Dirígete a la sección **Recopilación de recursos** de dicha cuenta y marca la casilla `Expanded collection required for Cloud Security Posture Management`.
   3. En la parte inferior izquierda del cuadro, haz clic en `Update Configuration`.

## Recopilación de alarmas

Existen dos formas de enviar las alarmas de AWS CloudWatch al Flujo de eventos de Datadog:

- Sondeo de alarmas: El sondeo de alarmas se incluye de forma predefinida en la integración de AWS y recupera las alarmas de las métricas a través de la API [DescribeAlarmHistory][83]. Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon Web Services`. **Nota**: El rastreador no recopila las alarmas compuestas.
- Tema SNS: Para ver todas las alarmas de AWS CloudWatch en tu flujo de eventos, puedes suscribir las alarmas a un tema SNS y, luego, transferir los mensajes de SNS a Datadog. Para obtener información sobre cómo recibir los mensajes de SNS como si fuesen eventos en Datadog, consulta [Recibir mensajes de SNS][84]. Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon SNS`.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_web_services" >}}


### Eventos

Los eventos de AWS se recopilan según el servicio de AWS del que procedan. Consulta la [documentación sobre el servicio de AWS][86] para obtener más información sobre los eventos recopilados.

### Etiquetas (tags)

Las siguientes etiquetas se recopilan con la integración de AWS. **Nota**: Algunas etiquetas solo se muestran en determinadas métricas.

| Integración            | Claves de etiqueta de Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Todas                    | `region`                                                                                                                                                                                                      |
| [API Gateway][2]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][3]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][7]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][8]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][9]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][13]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][14]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][17]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][20]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][21]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][22]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][24]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][26]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][28]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [Elastic Beanstalk][29] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][30]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][31]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][32]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][33]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][34]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][38]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][40]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][42]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][43]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][44]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][46] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][51]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][56]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][57]            | `operation`                                                                                                                                                                                                   |
| [RDS][58]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [RDS Proxy][87]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][59]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][61]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][62]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][64]             | Las claves de las etiquetas son un conjunto personalizado en AWS.                                                                                                                                                                               |
| [SNS][65]              | `topicname`                                                                                                                                                                                                   |
| [SQS][66]              | `queuename`                                                                                                                                                                                                   |
| [VPC][69]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][71]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Checks de los servicios
{{< get-service-checks-from-git "amazon_web_services" >}}


## Solucionar problemas

Consulta la [guía sobre cómo solucionar los problemas de la integración de AWS][89] para resolver las incidencias relacionadas con la integración de AWS.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/getting_started/integrations/aws/
[2]: https://docs.datadoghq.com/es/integrations/amazon_api_gateway/
[3]: https://docs.datadoghq.com/es/integrations/amazon_app_runner
[4]: https://docs.datadoghq.com/es/integrations/amazon_appstream/
[5]: https://docs.datadoghq.com/es/integrations/amazon_appsync/
[6]: https://docs.datadoghq.com/es/integrations/amazon_athena/
[7]: https://docs.datadoghq.com/es/integrations/amazon_auto_scaling/
[8]: https://docs.datadoghq.com/es/integrations/amazon_billing/
[9]: https://docs.datadoghq.com/es/integrations/amazon_cloudfront/
[10]: https://docs.datadoghq.com/es/integrations/amazon_cloudhsm/
[11]: https://docs.datadoghq.com/es/integrations/amazon_cloudsearch/
[12]: https://docs.datadoghq.com/es/integrations/amazon_cloudtrail/
[13]: https://docs.datadoghq.com/es/integrations/amazon_codebuild/
[14]: https://docs.datadoghq.com/es/integrations/amazon_codedeploy/
[15]: https://docs.datadoghq.com/es/integrations/amazon_cognito/
[16]: https://docs.datadoghq.com/es/integrations/amazon_connect/
[17]: https://docs.datadoghq.com/es/integrations/amazon_directconnect/
[18]: https://docs.datadoghq.com/es/integrations/amazon_dms/
[19]: https://docs.datadoghq.com/es/integrations/amazon_documentdb/
[20]: https://docs.datadoghq.com/es/integrations/amazon_dynamodb/
[21]: https://docs.datadoghq.com/es/integrations/amazon_ebs/
[22]: https://docs.datadoghq.com/es/integrations/amazon_ec2/
[23]: https://docs.datadoghq.com/es/integrations/amazon_ec2_spot/
[24]: https://docs.datadoghq.com/es/integrations/amazon_ecs/
[25]: https://docs.datadoghq.com/es/integrations/amazon_efs/
[26]: https://docs.datadoghq.com/es/integrations/amazon_eks/
[27]: https://docs.datadoghq.com/es/integrations/amazon_elastic_transcoder/
[28]: https://docs.datadoghq.com/es/integrations/amazon_elasticache/
[29]: https://docs.datadoghq.com/es/integrations/amazon_elasticbeanstalk/
[30]: https://docs.datadoghq.com/es/integrations/amazon_elb/
[31]: https://docs.datadoghq.com/es/integrations/amazon_emr/
[32]: https://docs.datadoghq.com/es/integrations/amazon_es/
[33]: https://docs.datadoghq.com/es/integrations/amazon_firehose/
[34]: https://docs.datadoghq.com/es/integrations/amazon_fsx/
[35]: https://docs.datadoghq.com/es/integrations/amazon_gamelift/
[36]: https://docs.datadoghq.com/es/integrations/amazon_glue/
[37]: https://docs.datadoghq.com/es/integrations/amazon_guardduty/
[38]: https://docs.datadoghq.com/es/integrations/amazon_health/
[39]: https://docs.datadoghq.com/es/integrations/amazon_inspector/
[40]: https://docs.datadoghq.com/es/integrations/amazon_iot/
[41]: https://docs.datadoghq.com/es/integrations/amazon_keyspaces/
[42]: https://docs.datadoghq.com/es/integrations/amazon_kinesis/
[43]: https://docs.datadoghq.com/es/integrations/amazon_kms/
[44]: https://docs.datadoghq.com/es/integrations/amazon_lambda/
[45]: https://docs.datadoghq.com/es/integrations/amazon_lex/
[46]: https://docs.datadoghq.com/es/integrations/amazon_machine_learning/
[47]: https://docs.datadoghq.com/es/integrations/amazon_mediaconnect/
[48]: https://docs.datadoghq.com/es/integrations/amazon_mediaconvert/
[49]: https://docs.datadoghq.com/es/integrations/amazon_mediapackage/
[50]: https://docs.datadoghq.com/es/integrations/amazon_mediatailor/
[51]: https://docs.datadoghq.com/es/integrations/amazon_mq/
[52]: https://docs.datadoghq.com/es/integrations/amazon_msk/
[53]: https://docs.datadoghq.com/es/integrations/amazon_nat_gateway/
[54]: https://docs.datadoghq.com/es/integrations/amazon_neptune/
[55]: https://docs.datadoghq.com/es/integrations/amazon_network_firewall/
[56]: https://docs.datadoghq.com/es/integrations/amazon_ops_works/
[57]: https://docs.datadoghq.com/es/integrations/amazon_polly/
[58]: https://docs.datadoghq.com/es/integrations/amazon_rds/
[59]: https://docs.datadoghq.com/es/integrations/amazon_redshift/
[60]: https://docs.datadoghq.com/es/integrations/amazon_rekognition/
[61]: https://docs.datadoghq.com/es/integrations/amazon_route53/
[62]: https://docs.datadoghq.com/es/integrations/amazon_s3/
[63]: https://docs.datadoghq.com/es/integrations/amazon_sagemaker/
[64]: https://docs.datadoghq.com/es/integrations/amazon_ses/
[65]: https://docs.datadoghq.com/es/integrations/amazon_sns/
[66]: https://docs.datadoghq.com/es/integrations/amazon_sqs/
[67]: https://docs.datadoghq.com/es/integrations/amazon_storage_gateway/
[68]: https://docs.datadoghq.com/es/integrations/amazon_swf/
[69]: https://docs.datadoghq.com/es/integrations/amazon_vpc/
[70]: https://docs.datadoghq.com/es/integrations/amazon_waf/
[71]: https://docs.datadoghq.com/es/integrations/amazon_workspaces/
[72]: https://docs.datadoghq.com/es/integrations/amazon_xray/
[73]: https://docs.datadoghq.com/es/integrations/guide/aws-terraform-setup
[74]: https://docs.datadoghq.com/es/integrations/guide/aws-manual-setup/
[75]: https://docs.datadoghq.com/es/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[76]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[77]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[78]: https://docs.datadoghq.com/es/integrations/guide/cloud-metric-delay/#aws
[79]: https://docs.datadoghq.com/es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[80]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=roledelegation#setup
[81]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[82]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[83]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[84]: https://docs.datadoghq.com/es/integrations/amazon_sns/#receive-sns-messages
[85]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[86]: https://docs.datadoghq.com/es/integrations/#cat-aws
[87]: https://docs.datadoghq.com/es/integrations/amazon_rds_proxy/
[88]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[89]: https://docs.datadoghq.com/es/integrations/guide/aws-integration-troubleshooting/