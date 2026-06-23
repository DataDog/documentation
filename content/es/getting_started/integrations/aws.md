---
description: Integra tu cuenta de Amazon Web Services con Datadog utilizando CloudFormation.
  Configura roles de IAM, habilita integraciones de servicios y configura el reenvío
  de registros.
further_reading:
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métricas clave para el seguimiento de AWS
- link: https://www.datadoghq.com/blog/aws-1-click-integration/
  tag: Blog
  text: Presentamos nuestra integración de un clic con AWS
- link: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
  tag: Blog
  text: Desplegando y configurando Datadog con CloudFormation
- link: https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/
  tag: Blog
  text: Implementa el seguimiento como código con Datadog y el Registro de CloudFormation
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Monitorea toda tu pila serverless en la vista Serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: Blog
  text: Monitorea aplicaciones ECS en AWS Fargate con Datadog
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Monitorea Amazon ECS Anywhere con Datadog
- link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
  tag: Documentación
  text: Flujos de métricas de AWS CloudWatch con Amazon Data Firehose
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: Blog
  text: Monitorea tus instancias de EC2 impulsadas por Graviton3 con Datadog.
title: Introducción a AWS
---
## Resumen {#overview}

Esta guía le muestra cómo integrar una cuenta de Amazon Web Services (AWS) con Datadog utilizando la plantilla de CloudFormation de Datadog. Después de completar la configuración, puede habilitar integraciones individuales de servicios de AWS, instalar el Datadog Agent en instancias de EC2 para obtener mayor visibilidad y configurar el reenvío de registros.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener una cuenta de [AWS][7]. La plantilla de CloudFormation crea un rol de IAM y una política asociada, permitiendo que la cuenta de AWS de Datadog realice llamadas a la API a su cuenta de AWS para recopilar y enviar datos. Su usuario de AWS debe tener los siguientes permisos de IAM para ejecutar la plantilla:

{{% collapse-content title="Permisos de IAM requeridos" level="h4" expanded=false id="iam-permissions" %}}
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
- kms:Descifrar
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
- logs:CrearGrupoDeRegistros
- logs:EliminarGrupoDeRegistros
- logs:DescribirGruposDeRegistros
- logs:EstablecerPolíticaDeRetención
- oam:ListarSumideros
- oam:ListarEnlacesAdjuntos
- s3:CrearBucket
- s3:EliminarBucket
- s3:EliminarPolíticaDeBucket
- s3:ObtenerConfiguraciónDeEncriptación
- s3:ObtenerObjeto
- s3:ObtenerVersiónDeObjeto
- s3:EstablecerPolíticaDeBucket
- s3:EstablecerBloqueoDeAccesoPúblicoDeBucket
- s3:EstablecerConfiguraciónDeEncriptación
- s3:EstablecerConfiguraciónDeCicloDeVida
- secretsmanager:CrearSecreto
- secretsmanager:EliminarSecreto
- secretsmanager:ObtenerValorDeSecreto
- secretsmanager:EstablecerValorDeSecreto
- serverlessrepo:CrearPlantillaDeCloudFormation
{{% /collapse-content %}}

## Configurar {#setup}

1. Vaya a la [página de configuración de integración de AWS][8] en Datadog y haga clic en {{< ui >}}Add AWS Account{{< /ui >}}.
1. Configure los ajustes de la integración en la opción {{< ui >}}Automatically using CloudFormation{{< /ui >}}.
   1. Seleccione las regiones de AWS con las que desea integrar.
   1. Agregue su [clave de API de Datadog][9].
   1. Opcionalmente, envíe registros y otros datos a Datadog con el [Datadog Forwarder Lambda][1].
   1. Opcionalmente, habilite [Cloud Security Misconfigurations][54] para escanear su entorno en la nube, hosts y contenedores en busca de configuraciones incorrectas y riesgos de seguridad.
1. Haga clic en {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Esto abre la Consola de AWS y carga la pila de CloudFormation. Todos los parámetros se completan según sus selecciones en el formulario previo de Datadog, por lo que no necesita editarlos a menos que lo desee.
**Nota:** El parámetro `DatadogAppKey` permite que la pila de CloudFormation realice llamadas API a Datadog para agregar y editar la configuración de Datadog para esta cuenta de AWS. La clave se genera automáticamente y se vincula a su cuenta de Datadog.
1. Marque las casillas requeridas de AWS y haga clic en {{< ui >}}Create stack{{< /ui >}}. Esto inicia el proceso de creación de la pila de Datadog junto con tres pilas anidadas. Esto podría tardar varios minutos. Asegúrese de que la pila se haya creado correctamente antes de continuar.
1. Después de que se crea la pila, regrese al mosaico de integración de AWS en Datadog y haga clic en {{< ui >}}Ready!{{< /ui >}}.
1. Espere hasta 10 minutos para que los datos comiencen a ser recolectados, y luego visualice el [tablero de visión general de AWS][12] para ver las métricas enviadas por sus servicios e infraestructura de AWS:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="El tablero de visión general de AWS en la cuenta de Datadog. A la izquierda está el logo de AWS y un gráfico de eventos de AWS que muestra 'No se encontraron entradas coincidentes'. En el centro hay gráficos relacionados con volúmenes de EBS con datos numéricos mostrados y un mapa de calor que muestra datos consistentes. A la derecha hay gráficos relacionados con ELBs que muestran datos numéricos, además de un gráfico de series temporales que muestra datos con picos provenientes de tres fuentes.">}}

Para configurar múltiples cuentas a la vez, utilice la [API][3], [AWS CLI][4] o [Terraform][5]. Para más información, consulte la [guía de Datadog-Amazon CloudFormation][6].

**Nota**: La plantilla de CloudFormation de Datadog solo admite la creación y eliminación de sus recursos definidos. Consulte [Actualiza tu plantilla de pila][59] para obtener orientación sobre cómo aplicar actualizaciones a su pila.

### Qué esperar después de la configuración {#what-to-expect-after-setup}

Después de que la integración se configure correctamente, los datos comienzan a aparecer en Datadog en la siguiente línea de tiempo:

- **Métricas**: Aparecen dentro de aproximadamente 10 minutos con sondeo de API, o 2-3 minutos con [CloudWatch Metric Streams][60]. No todos los servicios informan con la misma cadencia, por lo que un tablero parcialmente poblado durante la primera hora es normal.
- **Etiquetas**: Las etiquetas de recursos de AWS pueden tardar tiempo adicional en propagarse. Los cambios en las etiquetas en AWS pueden tardar entre 15 minutos y varias horas en reflejarse en Datadog.
- **Recursos**: Descubiertos durante el próximo ciclo de rastreo de recursos después de la configuración.
- **Registros**: Requieren configuración separada. Consulte [Enviar registros](#send-logs) para instrucciones de configuración.

<div class="alert alert-info">
Datadog no completa los datos históricos de métricas anteriores a que se habilitara la integración. Las métricas comienzan a fluir desde el momento en que la integración se configura correctamente.
</div>

## Configuración {#configuration}

### Habilitar integraciones para servicios individuales de AWS {#enable-integrations-for-individual-aws-services}

Consulte la [página de Integraciones][13] para obtener una lista completa de las subintegraciones disponibles. Muchas de estas integraciones se instalan por defecto cuando Datadog reconoce datos provenientes de su cuenta de AWS.

Utilice la pestaña {{< ui >}}Metric Collection{{< /ui >}} en la [página de integración de AWS][8] para configurar de qué servicios recopila métricas la integración de Datadog.

### Agregue regiones {#add-regions}

En la pestaña {{< ui >}}General{{< /ui >}} de la [página de integración de AWS][8], puede controlar las regiones de AWS donde Datadog recopila métricas, eventos de CloudWatch y recursos.

## Enviar registros {#send-logs}

Hay dos formas de enviar registros de servicios de AWS a Datadog:

- [Destino de Amazon Data Firehose][10]: Recomendado para registros de CloudWatch de alto volumen.
- [Función Lambda de reenvío][11]: Requerido para trazas, métricas mejoradas o métricas personalizadas de funciones Lambda. También se recomienda para registros de S3 u otros recursos que no pueden transmitir directamente a Amazon Data Firehose.

Consulte [Habilitar el registro para su servicio de AWS][14] para obtener instrucciones de configuración.

### Validación {#validation}

Una vez que haya habilitado los registros, encuéntrelos en el [Explorador de Registros][15] utilizando las facetas `source` o `service` del panel de facetas, como este ejemplo de S3:
{{< img src="getting_started/integrations/logs-explorer.png" alt="La página del Explorador de Registros de la cuenta de Datadog. A la izquierda, la imagen muestra las facetas de Fuente y Servicio, ambas marcadas con 's3'. A la derecha, algunas entradas de registro se muestran en un formato de lista.">}}

## Obtenga más de la plataforma Datadog {#get-more-from-the-datadog-platform}

### Visibilidad más profunda con el Agente de Datadog en EC2 {#deeper-visibility-with-the-datadog-agent-on-ec2}

Por defecto, la integración de Datadog AWS rastrea la API de CloudWatch para métricas proporcionadas por AWS, pero puede obtener una visibilidad aún más profunda de sus instancias de EC2 con el [Agente de Datadog][16]. El Agente es un demonio ligero que informa métricas y eventos, y también se puede configurar para registros y trazas. La sección de [Instalación del Agente][17] de la aplicación Datadog proporciona instrucciones para instalar el Agente en una amplia variedad de sistemas operativos. Muchos sistemas operativos (por ejemplo, Amazon Linux) tienen comandos de instalación de un solo paso que puedes ejecutar desde la terminal de la instancia para instalar el Agente:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="La sección 'Agente' de la pestaña 'Integraciones' en Datadog. A la izquierda se muestra una lista de sistemas operativos compatibles con el Agente de Datadog. 'Amazon Linux' está resaltado en esta lista. A la derecha se muestra 'Usa nuestra fácil instalación de un solo paso'. El comando para instalar el Agente se muestra debajo de esto, con la sección DD_API_KEY ofuscada.">}}

Una vez que el Agente está instalado, se representa gráficamente dentro de la [Lista de Infraestructura][18] con un ícono de hueso:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="La lista de infraestructura muestra dos servidores en un formato de lista. Ambos servidores muestran el ícono de AWS para la integración de AWS y 'aws' se muestra en un cuadro azul para indicar que están asociados con la integración de AWS. Un servidor también muestra un ícono de hueso de perro y cuadros azules para 'NTP' y 'system'.">}}

La captura de pantalla anterior muestra el servidor con el Agente de Datadog reportando datos de las verificaciones de [System][19] y [NTP][20]. La verificación de System proporciona métricas sobre CPU, memoria, sistema de archivos y E/S, proporcionando información adicional sobre el servidor. Puedes habilitar integraciones adicionales [integraciones][21] para adaptarlo al entorno y a los casos de uso, o usar [DogStatsD][22] para enviar métricas personalizadas directamente a Datadog.



### Usando el Agente de Datadog con los Servicios de Contenedores de Amazon {#using-the-datadog-agent-with-amazon-container-services}

Para entornos basados en contenedores, puedes usar el Agente de Datadog, ya sea que estés gestionando tus instancias o utilizando [Fargate][24] para un entorno sin servidor.



Usa la [documentación de Amazon ECS][25] para ejecutar el [Agente Docker de Datadog][26] en las instancias EC2 de tu clúster ECS. 



Utiliza la [documentación de Amazon ECS en AWS Fargate][28] para ejecutar el Agente como un contenedor en la misma definición de tarea que tu aplicación. 



Utiliza la [documentación de Amazon ECS en AWS Fargate para AWS Batch][58] para ejecutar el Agente como un contenedor en la misma definición de trabajo de AWS Batch que tu aplicación. 



No necesitas ninguna configuración específica para Amazon Elastic Kubernetes Service (EKS), como se menciona en la [documentación de Distribuciones de Kubernetes][29]. Utiliza la [documentación de Kubernetes dedicada][30] para desplegar el Agente en tu clúster de EKS.

#### EKS con Fargate {#eks-with-fargate}

Debido a que los pods de Fargate son gestionados por AWS, excluyen las verificaciones del sistema basadas en el host, como CPU y memoria. Para recopilar datos de sus pods de AWS Fargate, utilice la [documentación de Amazon EKS en AWS Fargate][31] para ejecutar el Agente como un sidecar de su pod de aplicación con control de acceso basado en roles (RBAC) personalizado. **Nota**: Esto requiere la versión 7.17 o superior del Agente de Datadog.

#### EKS Anywhere {#eks-anywhere}

Utilice la [documentación de EKS Anywhere][32] para clústeres de Kubernetes en las instalaciones.

### Crear recursos adicionales de Datadog {#create-additional-datadog-resources}
Además de utilizar la interfaz de usuario de Datadog o [API][33], puede crear muchos [recursos de Datadog][34] con el [Registro de CloudFormation][35]. Para visibilidad y solución de problemas, utilice [tableros][36] para mostrar datos clave, aplicar [Funciones][37] y encontrar [Correlaciones de Métricas][38].

Para recibir notificaciones de cualquier comportamiento no deseado o inesperado en su cuenta, cree [monitores][39]. Los monitores evalúan constantemente los datos reportados a su cuenta y envían [Notificaciones][40] para asegurar que la información correcta llegue a los miembros del equipo adecuados. Revisa la [Lista de Integraciones de Notificación][41] para conocer todas las formas de notificar a tu equipo.

## Explora productos relacionados {#explore-related-products}

### Sin servidor {#serverless}

Para monitorear funciones de AWS Lambda con Datadog, consulta [Serverless][42] para obtener instrucciones sobre cómo instrumentar tu aplicación, instalar [Serverless Libraries and Integrations][43], implementar [trazado distribuido con aplicaciones serverless][44] o [resolver problemas de aplicaciones serverless][45].

### APM {#apm}

Para recopilar trazas distribuidas de tus aplicaciones y servicios de AWS, utiliza el Agente de Datadog con [APM][47]. Para funciones de AWS Lambda, instrumenta con la [Extensión de Lambda de Datadog][44].  Consulta la [documentación de APM][48] para obtener detalles sobre el análisis de datos de rendimiento de la aplicación.

También puedes usar [Watchdog][49], una función algorítmica para métricas de rendimiento de APM e infraestructura, para detectar automáticamente y recibir notificaciones sobre posibles problemas de la aplicación.

### Seguridad {#security}

#### Cloud SIEM {#cloud-siem}

Consulta [Introducción a Cloud SIEM][50] para evaluar tus registros contra las [Reglas de Detección de Registros][51] predeterminadas. Estas reglas son personalizables, y cuando se detectan amenazas, generan señales de seguridad accesibles en el [Explorador de señales][52]. Utiliza [Reglas de Notificación][53] para configurar preferencias de notificación en múltiples reglas.

#### Errores de configuración de Cloud Security {#cloud-security-misconfigurations}

Utiliza la guía [Errores de configuración de Cloud Security][54] para detectar y evaluar errores de configuración en tu entorno en la nube. Los datos de configuración de recursos se evalúan contra las reglas de cumplimiento [Cloud][55] y [Infrastructure][56] predeterminadas para señalar técnicas de ataque y posibles errores de configuración.

### Resolución de Problemas {#troubleshooting}

Si encuentra el error `Datadog is not authorized to perform sts:AssumeRole`, consulte la [página de resolución de problemas][2] dedicada. Para cualquier otro problema, consulte la [guía de resolución de problemas de integración de AWS][57].

## Lectura adicional {#further-reading}

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