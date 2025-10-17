---
description: Integra tu cuenta de Amazon Web Services con Datadog utilizando CloudFormation.
  Configura roles IAM, habilita integraciones de servicios y configura el reenvío
  de logs.
further_reading:
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métricas clave para la monitorización de AWS
- link: https://www.datadoghq.com/blog/aws-1-click-integration/
  tag: Blog
  text: Introducción a nuestra integración en 1 clic de AWS
- link: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
  tag: Blog
  text: Implementar y configurar Datadog con CloudFormation
- link: https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/
  tag: Blog
  text: Implementar la monitorización en forma de código con Datadog y el registro
    de CloudFormation
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Monitoriza todo tu stack serverless en la vista Serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: Blog
  text: Monitoriza las aplicaciones de ECS en AWS Fargate con Datadog
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Monitoriza Amazon ECS en cualquier lugar con Datadog
- link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
  tag: Documentación
  text: AWS CloudWatch Metric Streams con Amazon Data Firehose
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: Blog
  text: Monitoriza tus instancias EC2 impulsadas por Graviton3 con Datadog
title: Empezando con AWS
---

## Información general

Esta guía proporciona una descripción general del proceso para integrar una cuenta de Amazon Web Services (AWS) con Datadog mediante la plantilla CloudFormation de Datadog.

Sin entrar en detalles, esto implica la creación de una política asociada y de roles de IAM para que la cuenta de AWS de Datadog pueda hacer llamadas a la API de tu cuenta de AWS con el fin de recopilar o insertar datos. La plantilla también implementa la función lambda de [Datadog Forwarder][1] para enviar logs a Datadog. Si usas la plantilla de CloudFormation, dispondrás de todas las herramientas necesarias para enviar estos datos a tu cuenta de Datadog, y Datadog conservará la plantilla de CloudFormation para proporcionar la funcionalidad más reciente.

Una vez que esté establecida la conexión inicial, puedes habilitar las integraciones de servicios concretos de AWS que resulten pertinentes para tu entorno de AWS. Basta un solo clic para que Datadog envíe los recursos necesarios a tu cuenta de AWS y comience a consultar las métricas y eventos de los servicios que utilizas. En lo referente a los servicios populares que usas de AWS, Datadog provee dashboards predefinidos para que dispongas de una visibilidad inmediata y personalizable. Esta guía te muestra cómo configurar la integración e instalar el Datadog Agent en una instancia EC2 de Amazon Linux y, además, facilita información general sobre las funciones de la integración. Consulta la sección [Habilitar las integraciones de servicios concretos de AWS](#enable-integrations-for-individual-aws-services) para ver una lista con las subintegraciones disponibles.

Puedes repetir este proceso en todas las cuentas de AWS en las que sea necesario, aunque también puedes usar [API][3], [AWS CLI][4] o [Terraform][5] para configurar varias cuentas a la vez. Para más información, lee la [Guía de Datadog-Amazon CloudFormation][6].

**Nota**: La plantilla de CloudFormation de Datadog sólo admite la creación y eliminación de sus recursos definidos. Consulta [Actualizar tu plantilla de stack tecnológico][59] para obtener orientación sobre cómo aplicar actualizaciones a tu stack tecnológico.

## Requisitos previos

Antes de empezar, asegúrate de que cumples los siguientes requisitos previos:

1. Tienes una cuenta de [AWS][7]. Tu usuario de AWS necesita los siguientes permisos de IAM para poder ejecutar correctamente la plantilla de CloudFormation:

    * cloudformation:CreateStack
    * cloudformation:CreateUploadBucket
    * cloudformation:DeleteStack
    * cloudformation:DescribeStacks
    * cloudformation:DescribeStackEvents
    * cloudformation:GetStackPolicy
    * cloudformation:GetTemplateSummary
    * cloudformation:ListStacks
    * cloudformation:ListStackResources
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:DeleteRole
    * iam:DeleteRolePolicy
    * iam:DetachRolePolicy
    * iam:GetRole
    * iam:GetRolePolicy
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:TagRole
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:DeleteFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:GetLayerVersion
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * lambda:RemovePermission
    * lambda:TagResource
    * logs:CreateLogGroup
    * logs:DeleteLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * oam:ListSinks
    * oam:ListAttachedLinks
    * s3:CreateBucket
    * s3:DeleteBucket
    * s3:DeleteBucketPolicy
    * s3:GetEncryptionConfiguration
    * s3:GetObject
    * s3:GetObjectVersion
    * s3:PutBucketPolicy
    * s3:PutBucketPublicAccessBlock
    * s3:PutEncryptionConfiguration
    * s3:PutLifecycleConfiguration
    * secretsmanager:CreateSecret
    * secretsmanager:DeleteSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverlessrepo:CreateCloudFormationTemplate

## Configuración

2. Dirígete a la [página de configuración de la integración de AWS][8] en Datadog y haz clic en **Add AWS Account** (Añadir cuenta de AWS).

3. Configura los parámetros de la integración en la opción **Automatically using CloudFormation** (Usar CloudFormation automáticamente).  
    a. Selecciona las regiones de AWS que desees integrar.  
    b. Añade tu [clave de API] de Datadog[9].
    c. Opcionalmente, envía logs y otros datos a Datadog con la [función Forwarder de Lambda de Datadog][1].
    d. Opcionalmente, activa [Errores de configuración de Cloud Security][54] para escanear tu entorno de nube, hosts y contenedores en busca de errores de configuración y riesgos de seguridad.

4. Haz clic en **Launch CloudFormation Template** (Iniciar plantilla de CloudFormation) para abrir la consola de AWS y cargar stack de CloudFormation. Todos los parámetros estarán completados en función de lo que hayas seleccionado en el anterior formulario de Datadog, por lo que no tendrás que editarlos a menos que quieras hacerlo.
**Nota:** El parámetro `DatadogAppKey` permite que el stack de CloudFormation haga llamadas a la API de Datadog para ampliar y editar la configuración de Datadog en esta cuenta de AWS. La clave se genera automáticamente y está vinculada a tu cuenta de Datadog.

5. Marca las casillas obligatorias de AWS y haz clic en **Create stack** (Crear stack). Se iniciará el proceso de creación del stack de Datadog y de tres stacks anidados. Eso podría tardar varios minutos. Asegúrate de que el stack se haya creado correctamente antes de continuar.

6. Una vez que hayas creado el stack, vuelve al cuadro de integración de AWS en Datadog y haz clic en **Ready!** (Listo).

7. La recopilación de datos podría tardar hasta 10 minutos en iniciarse. Después, consulta el [dashboard de información general de AWS][12] predefinido para ver las métricas enviadas por tus servicios e infraestructura de AWS:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Dashboard de información general de AWS en la cuenta de Datadog. A la izquierda, está el logotipo de AWS y un gráfico de eventos de AWS que indica que no se encontraron entradas que coincidan con la búsqueda. En el centro, hay gráficos relacionados con los volúmenes de EBS que incluyen datos numéricos y un mapa de calor con los datos. A la derecha, están los gráficos relacionados con ELB, que incluyen datos numéricos y un gráfico temporal que muestra picos de datos de las tres fuentes.">}}

## Configuración

### Habilitar las integraciones de servicios concretos de AWS

Consulta la [página de integraciones][13] para ver un listado completo de las subintegraciones disponibles. Muchas de estas integraciones se instalan de forma predeterminada cuando Datadog reconoce los datos procedentes de tu cuenta de AWS.

Utiliza la pestaña **Metric Collection** (Recopilación de métricas) en la [página de la integración AWS][8] para configurar de qué servicios recopilará métricas la integración Datadog.

### Añadir regiones

En la pestaña **General** de la [página de la integración AWS][8], puedes controlar las regiones de AWS en las que Datadog recopila métricas, eventos de CloudWatch y recursos.

## Enviar logs

Existen dos formas de enviar los logs de los servicios de AWS a Datadog:

- [Destino de Amazon Data Firehose][10]: Utiliza el destino Datadog en tu flujo (stream) de entrega de Amazon Data Firehose para reenviar logs a Datadog. Se recomienda usar este enfoque cuando envías grandes volúmenes de logs desde CloudWatch.
- [Función de Forwarder Lambda][11]: despliega la función de Forwarder Lambda de Datadog, que se suscribe a los buckets de S3 o a tus grupos de logs de CloudWatch y reenvía logs a Datadog. **Debes** utilizar este enfoque para enviar trazas (traces), métricas mejoradas o métricas personalizadas desde funciones de Lambda de forma asíncrona a través de logs. Datadog también te recomienda usar este enfoque para enviar logs desde S3 u otros recursos que no puedan transmitir datos directamente a Kinesis.

Lee la sección [Habilitar los logs en tu servicio de AWS][14] para activar el flujo de logs en los servicios de AWS más utilizados.

### Validación

Una vez que hayas habilitado los logs, los encontrarás en el [Log Explorer][15] con las facetas `source` o `service` del panel de facetas, tal y como se muestra en este ejemplo de S3:
{{< img src="getting_started/integrations/logs-explorer.png" alt="Página del Log Explorer de la cuenta de Datadog. En el lado izquierdo de la imagen, se pueden ver las facetas `source` y `service`, ambas con la casilla \"s3\" marcada. A la derecha, se muestran algunas entradas de logs en formato de lista.">}}

## Saca más provecho de la plataforma Datadog

### Instala el Datadog Agent en EC2 para obtener mayor visibilidad

La integración de AWS con Datadog ya rastrea de forma predeterminada la API de CloudWatch para recopilar las métricas proporcionadas por AWS. No obstante, puedes disfrutar de una visibilidad aún mayor en tus instancias de EC2 con el [Datadog Agent][16]. El Agent es un daemon ligero que genera informes de métricas y eventos, aunque también se puede configurar para que lo haga con logs y trazas. En la sección [Agent Installation][17] (Instalación del Agent) de la aplicación de Datadog, encontrarás las instrucciones para instalar el Agent en una amplia variedad de sistemas operativos. Muchos sistemas operativos (como Amazon Linux) cuentan con comandos de instalación en un único paso que puedes ejecutar para instalar el Agent desde el terminal de la instancia:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Sección Agent de la pestaña \"Integrations\" (Integraciones) de Datadog. A la izquierda, se muestra la lista de los sistemas operativos compatibles con el Datadog Agent; Amazon Linux aparece resaltado. A la derecha, se ve el enunciado \"Use our easy one-step install\" (Usa nuestra sencilla instalación en un solo paso). El comando para instalar el Agent está justo debajo, con la sección difusa DD_API_KEY.">}}

Una vez que Agent esté instalado, se representará gráficamente en la [lista de infraestructuras][18] con un icono en forma de hueso:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="Lista de infraestructuras en las que pueden verse dos hosts en formato de lista. Ambos hosts tienen el icono de AWS para representar la integración de AWS, así como el texto \"aws\" en un recuadro azul para indicar que están asociados a la integración de AWS. Uno de los hosts también tiene el icono de un perro y recuadros azules con los textos \"ntp\" y \"system\".">}}

La captura de pantalla anterior muestra el host con el Datadog Agent informando de los datos de los checks de [Sistema][19] y [NTP][20]. El check de sistema proporciona métricas en torno a CPU, memoria, sistema de archivos y E/S, y brinda información adicional sobre el host. Puedes activar [integraciones][21] adicionales para adaptarte al entorno y al caso de uso, o utilizar [DogStatsD][22] para enviar métricas personalizadas directamente a Datadog.

Consulta las [FAQ sobre por qué deberías instalar el Datadog Agent en tus instancias de nube][23] para obtener más información sobre las ventajas de este enfoque.

### Usar el Datadog Agent con el Servicio de contenedores de Amazon

Puedes usar el Datadog Agent en entornos contenedorizados, independientemente de que estés gestionando tus instancias o utilizando [Fargate][24] en un entorno serverless.

#### ECS con un tipo de lanzamiento EC2

Utiliza la [documentación sobre Amazon ECS][25] para ejecutar el [Datadog Docker Agent][26] en las instancias EC2 de tu clúster de ECS. Revisa la [documentación sobre la recopilación de datos de Amazon ECS][27] para ver las métricas y eventos enviados a tu cuenta de Datadog.

#### ECS con un tipo de lanzamiento Fargate

Utiliza la [documentación sobre Amazon ECS en AWS Fargate][28] para ejecutar el Agent a modo de contenedor con la misma definición de tarea que tu aplicación. **Nota**: Se necesita la versión 6.1.1 (o posterior) del Datadog Agent para aprovechar al máximo la integración de Fargate.

#### AWS Batch con tipo de orquestación Fargate

Utiliza la [documentación sobre Amazon ECS en AWS Fargate para AWS Batch][58] para ejecutar el Agent a modo de contenedor con la misma definición de trabajo de AWS Batch que tu aplicación. **Nota**: Se necesita la versión 6.1.1 o posterior del Datadog Agent para aprovechar al máximo la integración de Fargate.

#### EKS

No necesitas llevar a cabo ninguna configuración concreta para Amazon Elastic Kubernetes Service (EKS), tal y como se menciona en la [documentación sobre las distribuciones de Kubernetes][29]. Utiliza la [documentación específica sobre Kubernetes][30] para implementar el Agent en tu clúster de EKS.

#### EKS con Fargate

Dado que AWS gestiona los pods de Fargate, no se realizan checks en los componentes del sistema del host, como la CPU y la memoria. Para recopilar los datos de tus pods de AWS Fargate, utiliza la [documentación sobre Amazon EKS en AWS Fargate][31] para ejecutar el Agent a modo de respaldo del pod de tu aplicación con control de acceso personalizado y basado en roles (RBAC). **Nota**: Se necesita la versión 7.17 (o posterior) del Datadog Agent.

#### EKS Anywhere

Utiliza la [documentación sobre EKS Anywhere][32] para los clústeres de Kubernetes on-premises.

### Crea recursos adicionales de Datadog
Además de utilizar la interfaz de usuario o la [API][33] de Datadog, puedes crear muchos [recursos de Datadog][34] con el [Registro de CloudFormation][35]. Para obtener visibilidad y solucionar problemas, utiliza [dashboards][36] para mostrar datos clave, aplicar [funciones][37] y encontrar [Correlaciones de métricas][38].

Para recibir notificaciones acerca de cualquier comportamiento no deseado o inesperado que se produzca en tu cuenta, crea [monitores][39]. Los monitores evalúan de forma constante los datos que recibe tu cuenta y envían [notificaciones][40] para garantizar que la información llegue a los miembros del equipo pertinentes. Revisa la [lista de integraciones de notificación][41] para descubrir todas las formas mediante las que puedes notificar a tu equipo.

## Explora productos relacionados

### Serverless

Puedes unificar las métricas, trazas (traces) y logs de las funciones de AWS Lambda que ejecutan aplicaciones serverless en Datadog. Dirígete a la sección [Serverless][42] para conocer cómo instrumentar tu aplicación, instalar [bibliotecas e integraciones serverless][43], implementar [trazas (traces) distribuidas con aplicaciones serverless][44] o [solucionar problemas en entornos serverless][45].

### APM
Para conocer mejor y recopilar más datos de tus aplicaciones y servicios de AWS, habilita la recopilación distribuida de trazas (traces) desde la integración con [AWS X-Ray][46] o desde un host con el Datadog Agent mediante [APM][47]. A continuación, lee la [documentación de APM][48] para comprender mejor cómo utilizar estos datos para obtener información sobre el rendimiento de tu aplicación.

También puedes usar [Watchdog][49], una función algorítmica para las métricas de infraestructura y rendimiento de APM. Su objetivo consiste en detectar automáticamente los posibles problemas de la aplicación y enviarte notificaciones al respecto.

### Seguridad

#### Cloud SIEM

Revisa [Empezando con Cloud SIEM][50] para evaluar tus logs con respecto a las [reglas de detección de logs][51] predefinidas. Estas reglas se pueden personalizar y, cuando detectan alguna amenaza, generan avisos de seguridad a los que se puede acceder desde el [Explorador de avisos de seguridad][52]. Si quieres asegurarte de que se notifica al equipo correcto, utiliza las [reglas de notificación][53] para configurar las preferencias de notificación de varias reglas.

#### Cloud Security Misconfigurations

Utiliza la guía de [Ajuste de errores de configuración de Cloud Security][54] para aprender a detectar y evaluar los errores de configuración en tu entorno en la nube. Los datos de configuración de recursos se evalúan en función de las reglas de cumplimiento listas para usar de [la nube][55] y [la infraestructura][56], a fin de detectar técnicas de ataque y posibles errores de configuración, y así lograr una respuesta y corrección rápidas.

### Solucionar problemas

Si te encuentras con el error `Datadog is not authorized to perform sts:AssumeRole`, consulta su página específica para [Solucionar problemas][2]. Para cualquier otro problema, consulta la [Guía de solución de problemas de la integración con AWS][57].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/guide/forwarder/
[2]: /es/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /es/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: /es/integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/integrations/amazon-web-services
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://app.datadoghq.com/dash/integration/7/aws-overview
[13]: /es/integrations/#cat-aws
[14]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /es/getting_started/agent/
[17]: https://app.datadoghq.com/account/settings/agent/latest
[18]: https://app.datadoghq.com/infrastructure
[19]: /es/integrations/system/
[20]: /es/integrations/ntp/
[21]: /es/integrations/
[22]: /es/developers/dogstatsd/?tab=hostagent
[23]: /es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /es/agent/amazon_ecs/?tab=awscli
[26]: /es/agent/docker/?tab=standard
[27]: /es/agent/amazon_ecs/data_collected/
[28]: /es/integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /es/agent/kubernetes/distributions/?tab=helm#EKS
[30]: /es/agent/kubernetes/?tab=helm
[31]: /es/integrations/eks_fargate/#setup
[32]: /es/integrations/eks_anywhere/
[33]: /es/api/latest/using-the-api/
[34]: /es/integrations/guide/amazon_cloudformation/#resources-available
[35]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[36]: /es/dashboards/#overview
[37]: /es/dashboards/functions/
[38]: /es/dashboards/correlations/
[39]: /es/monitors/types
[40]: /es/monitors/notify/
[41]: /es/integrations/#cat-notification
[42]: /es/serverless
[43]: /es/serverless/libraries_integrations
[44]: /es/serverless/distributed_tracing
[45]: /es/serverless/aws_lambda/troubleshooting/
[46]: /es/integrations/amazon_xray/
[47]: /es/tracing/trace_collection/
[48]: /es/tracing/
[49]: /es/watchdog/
[50]: /es/getting_started/cloud_siem/
[51]: /es/security/default_rules/#cat-log-detection
[52]: /es/security/cloud_siem/triage_and_investigate/investigate_security_signals
[53]: /es/security/notifications/rules/
[54]: /es/security/cloud_security_management/setup/
[55]: /es/security/default_rules/#cat-posture-management-cloud
[56]: /es/security/default_rules/#cat-posture-management-infra
[57]: /es/integrations/guide/aws-integration-troubleshooting/
[58]: /es/integrations/ecs_fargate/?tab=webui#installation-for-aws-batch
[59]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-get-template.html