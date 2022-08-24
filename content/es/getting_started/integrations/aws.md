---
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
- link: integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/??tab=cloudformation
  tag: Documentación
  text: Secuencias métricas de AWS CloudWatch con Kinesis Data Firehose
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: Blog
  text: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
kind: documentación
title: Empezando con AWS
---

## Información general

Esta guía ofrece información general sobre el proceso de integración de una cuenta de Amazon Web Services (AWS) con Datadog usando la plantilla de CloudFormation de Datadog.

A un nivel elevado, esto implica la creación de una política asociada y de roles de IAM para que la cuenta de AWS de Datadog pueda hacer llamadas a la API de tu cuenta de AWS con el fin de recopilar o insertar datos. La plantilla también implementa la función lambda de [Datadog Forwarder][1] para enviar logs a Datadog. Si usas la plantilla de CloudFormation, dispondrás que todas las herramientas necesarias para enviar estos datos a tu cuenta de Datadog, y Datadog conservará la plantilla de CloudFormation para proporcionar la funcionalidad más reciente.

Una vez que esté establecida la conexión inicial, puedes habilitar las integraciones de servicios concretos de AWS que resulten pertinentes para tu entorno de AWS. Basta un solo clic para que Datadog envíe los recursos necesarios a tu cuenta de AWS y comience a consultar las métricas y eventos de los servicios que utilizas. En lo referente a los servicios populares que usas de AWS, Datadog provee dashboards predefinidos para que dispongas de una visibilidad inmediata y personalizable. Esta guía te muestra cómo configurar la integración, enviar los logs desde [CloudTrail][2] y la función lambda de Forwarder, e instalar Datadog Agent en una instancia EC2 de Amazon Linux. Consulta la sección [Habilitar las integraciones de servicios concretos de AWS](#enable-integrations-for-individual-aws-service) para ver una lista con las subintegraciones disponibles.

Puedes repetir este proceso en todas las cuentas de AWS en las que sea necesario, aunque también puedes usar [API][3], [AWS CLI][4] o [Terraform][5] para configurar varias cuentas a la vez. Para más información, lee la [Guía de Datadog-Amazon CloudFormation][6].

## Requisitos previos

Antes de empezar, asegúrate de que cumples los siguientes requisitos previos:

1. Tienes una cuenta de [AWS][7]. Tu usuario de AWS necesita los siguientes permisos de IAM para poder ejecutar correctamente la plantilla de CloudFormation:

    * cloudformation:CreateStack
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * logs:CreateLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * s3:CreateBucket
    * s3:GetObject
    * s3:GetObjectVersion
    * secretsmanager:CreateSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverless:CreateCloudFormationTemplate


## Configuración


2. En el cuadro de AWS que encontrarás en la [página de Integraciones][8] de tu cuenta de Datadog, selecciona los productos de Datadog que desees integrar con esta cuenta de AWS. De forma predeterminada, se seleccionarán los ajustes adecuados en la cuenta de AWS para integrar los datos de esos productos. Estos ajustes se podrán modificar más adelante, en caso de que sea necesario.
{{< img src="getting_started/integrations/cloudformation-setup.png" alt="Cuadro de integración de AWS con Datadog, donde pueden verse las opciones para llevar a cabo la integración. La pestaña Delegación de roles aparece resaltada.">}}

3. Selecciona la región de AWS en la que se iniciará el stack de CloudFormation. Esta también determinará dónde se creará la función lambda Forwarder de Datadog para enviar los logs de AWS a Datadog (en caso de que hayas seleccionado Gestión de logs).

    **Nota**: Las métricas de CloudWatch se recopilan en TODAS las regiones de AWS que uses, independientemente de la región que selecciones.

4. Selecciona o crea la clave de API de Datadog para enviar datos desde tu cuenta de AWS a Datadog.

5. Haz clic en "Iniciar plantilla de CloudFormation" para abrir la consola de AWS y cargar el stack de CloudFormation. Todos los parámetros estarán ya rellenados en función de lo que hayas seleccionado en el anterior formulario de Datadog, por lo que no tendrás que editarlos a menos que quieras hacerlo.
**Nota:** El parámetro `DatadogAppKey` permite que el stack de CloudFormation haga llamadas a la API de Datadog para ampliar y editar la configuración de Datadog en esta cuenta de AWS. La clave se genera automáticamente y está vinculada a tu cuenta de Datadog.
{{< img src="getting_started/integrations/params.png" alt="Página de Crear stack en AWS CloudFormation, donde datadog es el nombre del stack; DatadogIntegrationRole, el IAMRoleName; un valor confuso terminado en be46, el ExternalId, y un valor confuso, el DdApiKey.">}}

6. Marca las casillas obligatorias de AWS y haz clic en `Create stack`:
    {{< img src="getting_started/integrations/cloudformation-complete.png" alt="Página de Stacks en AWS CloudFormation, donde se pueden ver cuatro stacks completados en la columna "Stacks", en el lado izquierdo de la página. Los stacks son datadog-DatadogIntegrationRoleStack, datadog-DatadogPolicyMacroStack, datadog-ForwarderStack y datadog. Todos ellos presentan la hora de su creación y una marca de verificación verde con CREATE_COMPLETE. El stack "datadog" aparece resaltado y muestra la pestaña "Eventos". Hay una lista de 9 eventos, cada uno de ellos con sus horas de registro, id. lógicos, estados y motivos de estado. Estos eventos se corresponden con las diferentes fases de creación de cada stack.">}}
Se iniciará el proceso de creación del stack de Datadog y de tres stacks anidados. Eso podría tardar varios minutos. Asegúrate de que el stack se ha creado correctamente antes de continuar.

7. Una vez que hayas creado el stack, vuelve al cuadro de integración de AWS en Datadog y busca la casilla de la cuenta nueva que has creado. Haz clic en "Actualizar para comprobar el estado" para ver un mensaje de éxito en la parte superior de la página, así como la cuenta nueva y la información importante sobre ella.

    {{< img src="getting_started/integrations/new-account.png" alt="Cuadro de integración de AWS en la cuenta de Datadog, donde pueden verse la sección Cuenta: Nueva cuenta y un mensaje que indica que la configuración de la integración con CloudFormation está pendiente de completarse. Hay un botón para actualizar y comprobar el estado, así como una advertencia sobre la necesidad de comprobar la generación del stack de CloudFormation antes que el estado.">}}

    Dependiendo de los servicios de AWS que utilices y tu caso de uso para la monitorización, el cuadro de integración te mostrará varias opciones para especificar los datos que quieras recopilar. Puedes, por ejemplo, acotar la recopilación de datos en función del servicio de AWS, el espacio de nombres o las etiquetas (tags). Asimismo, si así lo deseas, puedes silenciar las notificaciones del monitor, por ejemplo, habilitando el [silenciamiento automático de EC2][9] para que los avisos de finalización se envíen manualmente o mediante escalado automático. En caso de necesidad, habilita [Recopilación de alarmas][10] para enviar tus alarmas de CloudWatch al [Explorador de eventos][11] de Datadog y decidir si quieres recopilar las métricas personalizadas.

8. Espera a que se inicie la recopilación de datos durante un máximo de 10 minutos. Después, consulta el [dashboard de información general de AWS][12] predefinido para ver las métricas enviadas por tus servicios e infraestructura de AWS:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Dashboard de información general de AWS en la cuenta de Datadog. A la izquierda, puede verse el logotipo de AWS y un gráfico de eventos de AWS con el mensaje "No se encontraron entradas coincidentes". En el centro, están los gráficos relacionados con los volúmenes de almacenamiento de nivel de bloque (EBS), donde pueden verse datos numéricos y un mapa de actividad con datos coherentes. A la derecha, están los gráficos relacionados con los balanceadores de carga (ELB), donde pueden verse tanto datos numéricos como un gráfico de serie temporal con picos de información procedente de tres fuentes.">}}

## Habilitar las integraciones de servicios concretos de AWS

Consulta la [página de Integraciones][13] para ver un listado completo de las subintegraciones disponibles. Muchas de estas integraciones se instalan de forma predeterminada cuando Datadog reconoce los datos procedentes de tu cuenta de AWS.

## Enviar logs

Para consultar la lista completa de todas las formas mediante las que puedes enviar tus logs de AWS a Datadog, dirígete a [Habilitar los logs en tu servicio de AWS][14].

### Validación

Una vez que hayas habilitado los logs, los encontrarás en el [Explorador de logs][15] con las facetas `source` o `service` del panel de facetas, tal y como se muestra en este ejemplo de S3:
{{< img src="getting_started/integrations/logs-explorer.png" alt="Página del Explorador de logs de la cuenta de Datadog. En el lado izquierdo de la imagen, se pueden ver las facetas Fuente y Servicio, ambas con la casilla "s3" marcada. A la derecha, se muestran algunas entradas de logs en formato lista.">}}

## Saca más provecho de la plataforma Datadog

### Instala Datadog Agent en EC2 para una mayor visibilidad

La integración de AWS con Datadog ya rastrea de forma predeterminada la API de CloudWatch para recopilar las métricas proporcionadas por AWS. No obstante, puedes disfrutar de una visibilidad aún mayor en tus instancias de EC2 con [Datadog Agent][16]. Agent es un daemon ligero que genera informes de métricas y eventos, aunque también se puede configurar para que lo haga con logs y trazas (traces). En la sección [Instalación de Agent][17] de la aplicación de Datadog, encontrarás las instrucciones para instalar Agent en una amplia variedad de sistemas operativos. Muchos sistemas operativos (como Amazon Linux) cuentan con comandos de instalación en un único paso que puedes ejecutar para instalar Agent desde el terminal de la instancia:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Sección "Agent" de la pestaña "Integraciones" de Datadog. A la izquierda, se muestra la lista de los sistemas operativos compatibles con Datadog Agent; Amazon Linux aparece resaltado. A la derecha, se ve el enunciado "Usa nuestra sencilla instalación en un solo paso". El comando para instalar Agent está justo debajo, con la sección confusa DD_API_KEY.">}}

Una vez que Agent esté instalado, se representará gráficamente en la [lista de infraestructuras][18] con un icono en forma de hueso:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="Lista de infraestructuras en las que pueden verse dos hosts en formato lista. Ambos hosts tienen el icono de AWS para representar la integración de AWS, así como el texto "aws" en un recuadro azul para indicar que están asociados a la integración de AWS. Uno de los hosts también tiene el icono de un hueso de perro y recuadros azules con los textos "ntp" y "system".">}}

En la captura de pantalla de arriba, se puede observar que el host que tiene Datadog Agent instalado genera informes de datos a partir de los checks del [sistema][19] y del [NTP][20]. El check del sistema proporciona métricas sobre la CPU, la memoria, el sistema de archivos y la E/S, lo que aporta información adición al host. Puedes habilitar más [integraciones][21] para ajustarte al entorno y al caso de uso, o incluso utilizar [DogStatsD][22] para enviar directamente las métricas personalizadas a Datadog.

Consulta las [FAQ sobre por qué deberías instalar Datadog Agent en tus instancias de nube][23] para obtener más información sobre las ventajas de este enfoque.

### Usar Datadog Agent con el Servicio de contenedores de Amazon

Puedes usar Datadog Agent en entornos contenedorizados, independientemente de que estés gestionando tus instancias o utilizando [Fargate][24] en un entorno serverless.

#### ECS con un tipo de lanzamiento EC2

Utiliza la [documentación sobre Amazon ECS][25] para ejecutar [Datadog Docker Agent][26] en las instancias EC2 de tu clúster de ECS. Revisa la [documentación sobre la recopilación de datos de Amazon ECS][27] para ver las métricas y eventos enviados a tu cuenta de Datadog.

#### ECS con un tipo de lanzamiento Fargate

Utiliza la [documentación sobre Amazon ECS en AWS Fargate][28] para ejecutar Agent a modo de contenedor con la misma definición de tarea que tu aplicación. **Nota**: Se necesita la versión 6.1.1 (o posterior) de Datadog Agent para aprovechar al máximo la integración de Fargate.

#### EKS

No necesitas llevar a cabo ninguna configuración concreta para el Amazon Elastic Kubernetes Service (EKS), tal y como se menciona en la [documentación sobre las distribuciones de Kubernetes][29]. Utiliza la [documentación específica sobre Kubernetes][30] para implementar Agent en tu clúster de EKS.

#### EKS con Fargate

Dado que la gestión de los pods de Fargate corre a cargo de AWS, estos no realizan checks en los componentes del sistema del host, como la CPU y la memoria. Para recopilar los datos de tus pods de AWS Fargate, utiliza la [documentación sobre Amazon EKS en AWS Fargate][31] para ejecutar Agent a modo de sidecar del pod de tu aplicación con control de acceso personalizado y basado en roles (RBAC). **Nota**: Se necesita la versión 7.17 (o posterior) de Datadog Agent.

#### EKS en cualquier lugar

Utiliza la [documentación sobre EKS en cualquier lugar][32] para los clústeres de Kubernetes locales.

### Crea recursos adicionales de Datadog
Además de usar la IU o la [API][33] de Datadog, puedes crear muchos [recursos de Datadog][34] con el [registro de CloudFormation][35]. Si quieres tener visibilidad y solucionar problemas, utiliza los [dashboards][36] para mostrar los datos clave, ejecuta las [funciones][37] y busca [correlaciones de métricas][38]. 

Para recibir notificaciones acerca de cualquier comportamiento indeseado o inesperado que se produzca en tu cuenta, crea [monitores][39]. Los monitores evalúan de forma coherente los datos que recibe tu cuenta y envían [notificaciones][40] para garantizar que la información llegue a los miembros del equipo pertinentes. Revisa la [lista de integraciones de notificación][41] para descubrir todas las formas mediante las que puedes notificar a tu equipo.

## Explora productos relacionados

### Serverless

Puedes unificar las métricas, trazas y logs de las funciones lambda de AWS que ejecutan aplicaciones serverless en Datadog. Dirígete a la sección [Serverless][42] para consultar las instrucciones sobre cómo instrumentar tu aplicación, instalar [bibliotecas e integraciones serverless][43], implementar [trazas distribuidas con aplicaciones serverless][44] o [solucionar problemas en entornos serverless][45].

### APM
Para profundizar aún más y reunir más datos sobre tus aplicaciones y servicios de AWS, habilita la recopilación de trazas distribuidas desde la integración de [AWS X-Ray][46] o desde un host con Datadog Agent que use [APM][47]. Luego, lee la sección [Explorar Datadog APM][48] para comprender mejor cómo usar estos datos a fin de conocer el rendimiento de tu aplicación.

También puedes usar [Watchdog][49], una función algorítmica para las métricas de infraestructura y rendimiento de APM. Su objetivo consiste en detectar automáticamente los potenciales problemas de la aplicación y enviarte notificaciones al respecto.

### Seguridad

#### Cloud SIEM

Revisa [Empezando con Cloud SIEM][50] para evaluar tus logs con respecto a las [reglas de detección de logs][51] predefinidas. Estas reglas se pueden personalizar y, cuando detectan alguna amenaza, generan señales de seguridad a las que se puede acceder desde el [Explorador de señales de seguridad][52]. Si quieres asegurarte de que se notifica al equipo correcto, utiliza las [reglas de notificación][53] para configurar las preferencias de notificación de varias reglas.

#### CSPM

Utiliza la guía [Empezando con CSPM][54] para obtener información sobre cómo detectar y evaluar los errores de configuración en tu entorno de nube. Los datos de configuración de los recursos se evalúan con respecto a las reglas de detección predefinidas de administración de la posición en la [nube][55] y la [infraestructura][56] para señalar técnicas de ataque y potenciales errores de configuración, lo que permite actuar y buscar soluciones rápido.

### Solucionar problemas
Si tienes algún problema, no olvides consultar la sección [Solucionar problemas][57].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/guide/forwarder/
[2]: https://aws.amazon.com/cloudtrail/
[3]: /es/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: /es/integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[9]: /es/integrations/amazon_ec2/#ec2-automuting
[10]: /es/integrations/amazon_web_services/?tab=roledelegation#alarm-collection
[11]: /es/events/explorer
[12]: https://app.datadoghq.com/screen/integration/7/aws-overview
[13]: /es/integrations/#cat-aws
[14]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /es/getting_started/agent/
[17]: https://app.datadoghq.com/account/settings#agent
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
[39]: /es/monitors/create/#monitor-types
[40]: /es/monitors/notify/
[41]: /es/integrations/#cat-notification
[42]: /es/serverless
[43]: /es/serverless/libraries_integrations
[44]: /es/serverless/distributed_tracing
[45]: /es/serverless/troubleshooting
[46]: /es/integrations/amazon_xray/?tab=nodejs
[47]: /es/tracing/trace_collection/
[48]: /es/tracing/#explore-datadog-apm
[49]: /es/watchdog/
[50]: /es/security_platform/cloud_siem/getting_started/
[51]: /es/security_platform/default_rules/#cat-log-detection
[52]: /es/security_platform/explorer/
[53]: /es/security_platform/notifications/rules/
[54]: /es/security_platform/cspm/getting_started/
[55]: /es/security_platform/default_rules/#cat-posture-management-cloud
[56]: /es/security_platform/default_rules/#cat-posture-management-infra
[57]: /es/integrations/amazon_web_services/?tab=roledelegation#troubleshooting