---
description: Integre su cuenta de Amazon Web Services con Datadog mediante CloudFormation.
  Configure roles de IAM, habilite integraciones de servicios y configure el reenvío
  de registros.
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-integrating-100-aws-accounts-with-datadog/
  tag: Centro de arquitectura
  text: Una guía para integrar más de 100 cuentas de AWS con Datadog
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métricas clave para hacer un seguimiento de AWS
- link: https://www.datadoghq.com/blog/aws-1-click-integration/
  tag: Blog
  text: Presentamos nuestra integración de AWS con 1 clic
- link: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
  tag: Blog
  text: Implementación y configuración de Datadog con CloudFormation
- link: https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/
  tag: Blog
  text: Implemente el seguimiento como código con Datadog y CloudFormation Registry
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Haga un seguimiento de toda su pila Serverless en la vista Serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: Blog
  text: Haga un seguimiento de aplicaciones de ECS en AWS Fargate con Datadog
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Haga un seguimiento de Amazon ECS Anywhere con Datadog
- link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
  tag: Documentación
  text: AWS CloudWatch Metric Streams con Amazon Data Firehose
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: Blog
  text: Haga un seguimiento de sus instancias EC2 con tecnología Graviton3 con Datadog
- link: https://learn.datadoghq.com/courses/getting-started-with-the-datadog-aws-integration
  tag: Centro de aprendizaje
  text: Primeros pasos con la integración de AWS de Datadog
title: Primeros pasos con AWS
---
## Descripción general {#overview}

Esta guía lo orienta sobre cómo integrar una cuenta de Amazon Web Services (AWS) con Datadog mediante la plantilla de CloudFormation de Datadog. Después de completar la configuración, puede habilitar integraciones de servicios de AWS individuales, instalar el Datadog Agent en instancias EC2 para obtener una visibilidad más profunda y configurar el reenvío de registros.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener una cuenta de [AWS][7]. La plantilla de CloudFormation crea un rol de IAM y una política asociada, lo que permite que la cuenta de AWS de Datadog realice llamadas a la API a su cuenta de AWS para recopilar y enviar datos. Su usuario de AWS debe tener los siguientes permisos de IAM para ejecutar la plantilla:

{{% collapse-content title="Permisos de IAM requeridos" level="h3" expanded=false id="iam-permissions" %}}
- cloudformation:CreateStack
- cloudformation:CreateUploadBucket
- cloudformation:DeleteStack
- cloudformation:DescribeStacks
- cloudformation:DescribeStackEvents
- cloudformation:GetStackPolicy
- cloudformation:GetTemplateSummary
- cloudformation:ListStacks
- cloudformation:ListStackResources
- ec2:DescribeSecurityGroups
- ec2:DescribeSubnets
- ec2:DescribeVpcs
- iam:AttachRolePolicy
- iam:CreatePolicy
- iam:CreateRole
- iam:DeleteRole
- iam:DeleteRolePolicy
- iam:DetachRolePolicy
- iam:GetRole
- iam:GetRolePolicy
- iam:PassRole
- iam:PutRolePolicy
- iam:TagRole
- iam:UpdateAssumeRolePolicy
- kms:Decrypt
- lambda:AddPermission
- lambda:CreateFunction
- lambda:DeleteFunction
- lambda:GetCodeSigningConfig
- lambda:GetFunction
- lambda:GetFunctionCodeSigningConfig
- lambda:GetLayerVersion
- lambda:InvokeFunction
- lambda:PutFunctionConcurrency
- lambda:RemovePermission
- lambda:TagResource
- logs:CreateLogGroup
- logs:DeleteLogGroup
- logs:DescribeLogGroups
- logs:PutRetentionPolicy
- oam:ListSinks
- oam:ListAttachedLinks
- s3:CreateBucket
- s3:DeleteBucket
- s3:DeleteBucketPolicy
- s3:GetEncryptionConfiguration
- s3:GetObject
- s3:GetObjectVersion
- s3:PutBucketPolicy
- s3:PutBucketPublicAccessBlock
- s3:PutEncryptionConfiguration
- s3:PutLifecycleConfiguration
- secretsmanager:CreateSecret
- secretsmanager:DeleteSecret
- secretsmanager:GetSecretValue
- secretsmanager:PutSecretValue
- serverlessrepo:CreateCloudFormationTemplate
{{% /collapse-content %}}

## Configuración {#setup}

1. Vaya a la [página de configuración de integración de AWS][8] en Datadog y haga clic en {{< ui >}}Add AWS Account{{< /ui >}}.
1. Configure los ajustes de la integración en la opción {{< ui >}}Automatically using CloudFormation{{< /ui >}}.
   1. Seleccione las regiones de AWS con las que desea integrarse.
   1. Agregue su [clave de API de Datadog][9].
   1. Opcionalmente, envíe registros y otros datos a Datadog con el [Datadog Forwarder Lambda][1].
   1. Opcionalmente, habilite [Cloud Security Misconfigurations][54] para analizar su entorno de nube, hosts y contenedores en busca de configuraciones incorrectas y riesgos de seguridad.
1. Haga clic en {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Esto abre la consola de AWS y carga la pila de CloudFormation. Todos los parámetros se completan según sus selecciones en el formulario anterior de Datadog, por lo que no necesita editarlos a menos que lo desee.
**Nota:** El parámetro `DatadogAppKey` permite que la pila de CloudFormation realice llamadas a la API de Datadog para agregar y editar la configuración de Datadog para esta cuenta de AWS. La clave se genera automáticamente y está vinculada a su cuenta de Datadog.
1. Marque las casillas requeridas de AWS y haga clic en {{< ui >}}Create stack{{< /ui >}}. Esto inicia el proceso de creación de la pila de Datadog junto con tres pilas anidadas. Esto podría tardar varios minutos. Asegúrese de que la pila se haya creado correctamente antes de continuar.
1. Después de crear la pila, regrese al tile de integración de AWS en Datadog y haga clic en {{< ui >}}Ready!{{< /ui >}}
1. Espere hasta 10 minutos para que los datos comiencen a recopilarse y, luego, visualice el [panel de descripción general de AWS][12] predeterminado para ver las métricas enviadas por sus servicios e infraestructura de AWS:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="El panel de descripción general de AWS en la cuenta de Datadog. A la izquierda se encuentra el logotipo de AWS y un gráfico de eventos de AWS que muestra \"No matching entries found\". En el centro hay gráficos relacionados con volúmenes de EBS con datos numéricos mostrados y un mapa de calor que muestra datos consistentes. A la derecha hay gráficos relacionados con ELBs que muestran datos numéricos, así como un gráfico de series temporales que muestra datos con picos de tres fuentes.">}}

Para configurar varias cuentas a la vez, utilice la [API][3], la [AWS CLI][4] o [Terraform][5]. Para obtener más información, consulte la [guía de Datadog-Amazon CloudFormation][6].

**Nota**: La plantilla de CloudFormation de Datadog solo admite la creación y eliminación de sus recursos definidos. Consulte [Actualizar su plantilla de stack][59] para obtener orientación sobre cómo aplicar actualizaciones a su pila.

### Qué esperar después de la configuración {#what-to-expect-after-setup}

Una vez que la integración se configura correctamente, los datos comienzan a aparecer en Datadog en el siguiente cronograma:

- **Métricas**: Aparecen en aproximadamente 10 minutos con el sondeo de API, o de 2 a 3 minutos con [CloudWatch Metric Streams][60]. No todos los servicios informan con la misma frecuencia, por lo que es normal que el panel esté parcialmente poblado durante la primera hora.
- **Etiquetas**: Las etiquetas de recursos de AWS pueden tardar más tiempo en propagarse. Los cambios en las etiquetas de AWS pueden tardar desde 15 minutos hasta varias horas en reflejarse en Datadog.
- **Recursos**: Se descubren durante el siguiente ciclo de rastreo de recursos después de la configuración.
- **Logs**: Requieren una configuración por separado. Consulte [Enviar logs](#send-logs) para obtener instrucciones de configuración.

<div class="alert alert-info">
Datadog no completa métricas históricas anteriores a la activación de la integración. Las métricas comienzan a fluir desde el momento en que la integración se configura correctamente.
</div>

## Configuración {#configuration}

### Habilitar Integrations para servicios individuales de AWS {#enable-integrations-for-individual-aws-services}

Consulte la [página de Integrations][13] para obtener una lista completa de las subintegraciones disponibles. Muchas de estas Integrations se instalan de forma predeterminada cuando Datadog reconoce datos provenientes de su cuenta de AWS.

Utilice la pestaña {{< ui >}}Metric Collection{{< /ui >}} en la [página de integración de AWS][8] para configurar de qué servicios recopila métricas la integración de Datadog.

### Filtrar métricas por nombre de métrica {#filter-metrics-by-metric-name}

Utilice la pestaña {{< ui >}}Metric Collection{{< /ui >}} en la [página de integración de AWS][8] para filtrar las métricas de CloudWatch por espacio de nombres. Expanda un espacio de nombres en la tabla de recolección de métricas de CloudWatch y elija un filtro de **Incluir** o **Excluir**:

- **Incluir**: Recopile solo los nombres de métricas de Datadog que coincidan con los patrones configurados para ese espacio de nombres.
- **Excluir**: Recopile todos los nombres de métricas de Datadog para ese espacio de nombres, excepto aquellos que coincidan con los patrones configurados.

Cada espacio de nombres puede usar un modo de filtro a la vez. Los patrones de filtro admiten letras minúsculas, números, `.`, `_` y `*`. Por ejemplo, `aws.ec2.network_*` coincide con las métricas de red de EC2. La tabla muestra una vista previa de cuántas métricas coinciden con cada patrón antes de que guarde los cambios.

Los filtros de nombres de métricas se aplican por espacio de nombres y se evalúan después de que el espacio de nombres se habilita para la recolección de métricas.

<div class="alert alert-info">
Los filtros de nombres de métricas no pueden eliminar <code>aws.ec2.cpuutilization</code> o <code>aws.lambda.invocations</code>. Datadog siempre recopila estas métricas requeridas.
</div>

Para administrar los filtros de nombres de métricas mediante programación, consulte [Configurar filtros de nombres de métricas de AWS con la API][61].

### Agregar regiones {#add-regions}

En la pestaña {{< ui >}}General{{< /ui >}} de la [AWS integration page][8], puede controlar las regiones de AWS donde Datadog recopila métricas, eventos de CloudWatch y recursos.

## Enviar registros {#send-logs}

Existen dos formas de enviar registros de servicios de AWS a Datadog:

- [Destino de Amazon Data Firehose][10]: Recomendado para registros de CloudWatch de alto volumen.
- [Forwarder Lambda function][11]: Requerido para trazas, métricas mejoradas o métricas personalizadas de funciones Lambda. También se recomienda para registros de S3 u otros recursos que no pueden transmitirse directamente a Amazon Data Firehose.

Consulte [Habilitar el registro para su servicio de AWS][14] para obtener instrucciones de configuración.

### Validación {#validation}

Una vez que haya habilitado los registros, búsquelos en el [Explorador de registros][15] utilizando las facetas `source` o `service` del panel de facetas, como en este ejemplo de S3:
{{< img src="getting_started/integrations/logs-explorer.png" alt="La página del Explorador de registros de la cuenta de Datadog. A lo largo de la izquierda, la imagen muestra las facetas Fuente y Servicio, ambas marcadas con 's3'. A lo largo de la derecha, algunas entradas de registro se muestran en formato de lista.">}}

## Obtenga más de la plataforma Datadog {#get-more-from-the-datadog-platform}

### Mayor visibilidad con el Datadog Agent en EC2 {#deeper-visibility-with-the-datadog-agent-on-ec2}

De forma predeterminada, la integración de AWS de Datadog rastrea la API de CloudWatch para obtener métricas proporcionadas por AWS, pero puede obtener una visibilidad aún mayor de sus instancias EC2 con el [Datadog Agent][16]. El Agent es un demonio ligero que reporta métricas y eventos, y también se puede configurar para registros y trazas. La sección [Agent Installation][17] de la aplicación Datadog proporciona instrucciones para instalar el Agent en una amplia variedad de sistemas operativos. Muchos sistemas operativos (por ejemplo, Amazon Linux) tienen comandos de instalación de un solo paso que puede ejecutar desde la terminal de la instancia para instalar el Agent:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="La sección 'Agent' de la pestaña 'Integrations' en Datadog. A la izquierda se muestra una lista de los sistemas operativos compatibles con el Datadog Agent. 'Amazon Linux' está resaltado en esta lista. A la derecha se muestra 'Use our easy one-step install'. El comando para instalar el Agent se muestra debajo de esto, con la sección DD_API_KEY ofuscada.">}}

Una vez instalado el Agent, se representa gráficamente dentro de la [Lista de infraestructura][18] con un icono de hueso:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="La lista de infraestructura que muestra dos servidores en formato de lista. Ambos servidores muestran el icono de AWS para la integración de AWS y 'aws' en un cuadro azul para indicar que están asociados con la integración de AWS. Un servidor también muestra un icono de hueso de perro y cuadros azules para 'ntp' y 'system'.">}}

La captura de pantalla anterior muestra el servidor con el Datadog Agent reportando datos de las verificaciones de [System][19] y [NTP][20]. La verificación System proporciona métricas sobre CPU, memoria, sistema de archivos y E/S, brindando información adicional sobre el servidor. Puede habilitar [integraciones][21] adicionales para adaptarse al entorno y a la incidencia, o bien utilizar [DogStatsD][22] para enviar métricas personalizadas directamente a Datadog.

Consulte las [preguntas frecuentes sobre por qué debería instalar el Datadog Agent en sus instancias en la nube][23] para obtener más información sobre los beneficios de este enfoque.

### Uso del Datadog Agent con Amazon Container Services {#using-the-datadog-agent-with-amazon-container-services}

Para entornos en contenedores, puede utilizar el Datadog Agent, ya sea que administre sus instancias o utilice [Fargate][24] para un entorno sin servidor.

#### ECS con tipo de lanzamiento EC2 {#ecs-with-ec2-launch-type}

Utilice la [documentación de Amazon ECS][25] para ejecutar el [Datadog Docker Agent][26] en las instancias EC2 de su clúster de ECS. Revise la [documentación de recopilación de datos de Amazon ECS][27] para ver las métricas y eventos reportados a su cuenta de Datadog.

#### ECS con tipo de lanzamiento Fargate {#ecs-with-fargate-launch-type}

Utilice la [documentación de Amazon ECS en AWS Fargate][28] para ejecutar el Agent como un contenedor en la misma definición de tarea que su aplicación. **Nota**: Se necesita la versión 6.1.1 o superior del Datadog Agent para aprovechar al máximo la integración con Fargate.

#### AWS Batch con tipo de orquestación Fargate {#aws-batch-with-fargate-orchestration-type}

Utilice la [documentación de Amazon ECS en AWS Fargate para AWS Batch][58] para ejecutar el Agent como un contenedor en la misma definición de trabajo de AWS Batch que su aplicación. **Nota**: Se necesita la versión 6.1.1 o superior del Datadog Agent para aprovechar al máximo la integración con Fargate.

#### EKS {#eks}

No necesita ninguna configuración específica para Amazon Elastic Kubernetes Service (EKS), como se menciona en la [documentación de distribuciones de Kubernetes][29]. Utilice la [documentación dedicada de Kubernetes][30] para implementar el Agent en su clúster de EKS.

#### EKS con Fargate {#eks-with-fargate}

Debido a que los pods de Fargate son administrados por AWS, excluyen las verificaciones del sistema basadas en el servidor, como la CPU y la memoria. Para recopilar datos de sus pods de AWS Fargate, utilice la [documentación de Amazon EKS en AWS Fargate][31] para ejecutar el Agent como sidecar de su pod de aplicación con control de acceso basado en roles (RBAC) personalizado. **Nota**: Esto requiere la versión 7.17 o superior del Datadog Agent.

#### EKS Anywhere {#eks-anywhere}

Utilice la [documentación EKS Anywhere][32] para clústeres de Kubernetes locales.

### Crear recursos adicionales de Datadog {#create-additional-datadog-resources}
Además de usar la interfaz de usuario de Datadog o la [API][33], puede crear muchos [Datadog resources][34] con el [CloudFormation Registry][35]. Para obtener visibilidad y solucionar problemas, use [dashboards][36] para mostrar datos clave, aplicar [Functions][37] y encontrar [Metric Correlations][38].

Para recibir notificaciones sobre cualquier comportamiento no deseado o inesperado en su cuenta, cree [monitors][39]. Los monitores evalúan constantemente los datos reportados a su cuenta y envían [Notifications][40] para garantizar que la información correcta llegue a los miembros del equipo adecuados. Revise la [Lista de Integrations de notificación][41] para conocer todas las formas de notificar a su equipo.

## Explorar productos relacionados {#explore-related-products}

### Serverless {#serverless}

Para hacer un seguimiento de funciones de AWS Lambda con Datadog, consulte [Serverless][42] para obtener instrucciones sobre cómo instrumentar su aplicación, instalar [Bibliotecas Serverless y Integrations][43], implementar [Aplicaciones Serverless de trazo distribuido][44] o [Problemas Serverless de solución de problemas][45].

### APM {#apm}

Para recopilar trazas distribuidas de sus aplicaciones y servicios de AWS, utilice el Datadog Agent con [APM][47]. Para funciones de AWS Lambda, instrumente con la [Datadog Lambda Extension][44].  Consulte la [documentación de APM][48] para obtener detalles sobre el análisis de datos de rendimiento de aplicaciones.

También puede utilizar [Watchdog][49], una función algorítmica para las métricas de rendimiento de APM y de infraestructura, para detectar automáticamente y recibir notificaciones sobre posibles problemas en la aplicación.

### Security {#security}

#### Cloud SIEM {#cloud-siem}

Consulte [Getting Started with Cloud SIEM][50] para evaluar sus registros con las [reglas de detección de registros][51] preconfiguradas. Estas reglas son personalizables y, cuando se detectan amenazas, generan señales de seguridad accesibles en el [Security Signals Explorer][52]. Utilice [Notification Rules][53] para configurar las preferencias de notificación en varias reglas.

#### Cloud Security Misconfigurations {#cloud-security-misconfigurations}

Utilice la guía [Setting Up Cloud Security Misconfigurations][54] para detectar y evaluar configuraciones erróneas en su entorno de nube. Los datos de configuración de recursos se evalúan con respecto a las reglas de cumplimiento predeterminadas de [Cloud][55] y [infraestructura][56] para identificar técnicas de ataque y posibles configuraciones erróneas.

### Solución de problemas {#troubleshooting}

Si encuentra el error `Datadog is not authorized to perform sts:AssumeRole`, consulte su [página de solución de problemas][2] dedicada. Para cualquier otro problema, consulte la [guía de solución de problemas de integración de AWS][57].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/guide/forwarder/
[2]: /es/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /es/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
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
[22]: /es/extend/dogstatsd/?tab=hostagent
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
[60]: /es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[61]: /es/integrations/guide/aws-metric-name-filters/