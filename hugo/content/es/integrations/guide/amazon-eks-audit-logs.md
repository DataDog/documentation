---
description: Habilite la recopilación de registros de auditoría de Amazon EKS para
  hacer un seguimiento de las acciones del clúster con Datadog Cloud SIEM.
title: Recopilación de registros para los registros de auditoría de Amazon EKS
---
## Descripción general {#overview}

Los registros de auditoría de Amazon EKS brindan a los administradores de clústeres información sobre las acciones dentro de un clúster de EKS. Una vez que habilite la recopilación de registros para sus registros de auditoría de Amazon EKS, puede configurar y utilizar [Datadog Cloud SIEM][1] para hacer un seguimiento de las acciones injustificadas o las amenazas inmediatas a medida que ocurren dentro de su clúster de EKS.

## Configuración {#setup}

### Registros de auditoría de Amazon EKS {#amazon-eks-audit-logs}

#### Nuevo clúster {#new-cluster}

1. Si no tiene un clúster de Amazon EKS, cree uno siguiendo la documentación de [Creación de un clúster de Amazon EKS][2].
1. Durante la configuración, en la página Configure logging, habilite **Audit logs**.

#### Clúster existente {#existing-cluster}

1. Si ya tiene un clúster de Amazon EKS configurado, navegue a su clúster en la [consola de Amazon EKS][2].
1. Haga clic en su clúster de EKS.
1. Haga clic en la pestaña **Logging**.
1. Haga clic en el botón **Manage logging**.
1. Cambie la opción **Audit** a **Enabled** y haga clic en el botón **Save changes**.

### Integración de Datadog con AWS {#datadog-aws-integration}

A continuación, configure la integración con AWS. Siga la documentación de [configuración de la integración con AWS][3].

### Datadog Forwarder {#datadog-forwarder}

Una vez que la configuración de su integración con AWS esté completa, instale y configure el Datadog Forwarder. Siga la documentación de [instalación de Datadog Forwarder][4].

**Nota**: El ARN de Lambda es necesario para el paso [Configurar activadores][5]. Su ARN de Lambda está disponible en [Lambda > Functions > `Your_Function_Name`][6] en la consola de AWS. El Function ARN aparece en Function overview.

## Log Explorer {#log-explorer}

Una vez completada la configuración de los registros de auditoría de Amazon EKS, la integración de Datadog con AWS y Datadog Forwarder, sus registros de auditoría de EKS estarán disponibles en [Datadog Log Explorer][7].

**Nota**: Los registros pueden tardar unos segundos en comenzar a transmitirse a Log Explorer.

Para visualizar solo los registros de auditoría de EKS en Log Explorer, realice la consulta `source:kubernetes.audit` en la búsqueda de Log Explorer o, en **Source** en el panel de facetas, seleccione la faceta `kubernetes.audit` para filtrar por registros de auditoría de EKS.

## Cloud SIEM {#cloud-siem}

Puede usar Datadog Cloud SIEM para detectar posibles configuraciones incorrectas o ataques dirigidos a sus clústeres de EKS.

Para comenzar a hacer un seguimiento de sus registros de auditoría de Amazon EKS con Cloud SIEM, configure Cloud SIEM y cree una [regla de detección de registros][8] personalizada que genere una [Security Signal][9] en [Security Signals Explorer][10] cada vez que se detecte una configuración incorrecta o una amenaza.

### Configuración {#setup-1}

Configure y ajuste Cloud SIEM. Consulte las [instrucciones de configuración y ajuste de Cloud SIEM][1] en la aplicación.

Una vez que Cloud SIEM esté configurado y ajustado, puede crear una nueva regla de Cloud SIEM desde cero o exportar una consulta de Log Explorer a una nueva regla.

### Revise Security Monitoring Rules {#review-security-monitoring-rules}

Consulte las [reglas de detección de Cloud SIEM][11] predefinidas que detectan amenazas en su entorno. Para obtener más información sobre cómo buscar, editar y clonar estas reglas, consulte [creación y gestión de reglas de detección][12].

### Crear una nueva regla de Cloud SIEM {#create-a-new-cloud-siem-rule}

Para crear una regla, navegue a la página de [Configuración y ajuste de reglas][13] en la aplicación. Para completar su configuración, consulte la [documentación de reglas de detección de registros][14].

### Exportar una consulta a una regla en Log Explorer {#export-a-query-to-a-rule-in-log-explorer}

1. En Log Explorer, cree una consulta en la barra de búsqueda. Por ejemplo, filtre por `source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]`.
1. Haga clic en el botón **Export** y seleccione **Export to detection rule**.
1. Esta función exporta su consulta y la define en el segundo paso de la configuración de la regla de detección de registros. Seleccione un método de detección. En este caso, seleccione **New Value**. Seleccione el atributo `@usr.name` en el menú desplegable Detect new value. Esto le alerta por primera vez cuando un usuario usa exec para acceder a un pod. Después de la primera alerta, Datadog no volverá a alertar sobre el mismo usuario. Como alternativa, para detectar cuándo estos eventos superan un umbral definido por el usuario, utilice **threshold rule** como método de detección.
1. Siga la [documentación de reglas de detección de registros][14] para aprender a completar el resto de la configuración de su regla.

[1]: /es/security/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /es/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /es/logs/guide/forwarder/
[5]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[9]: /es/getting_started/cloud_siem/#phase-2-signal-exploration
[10]: https://app.datadoghq.com/security
[11]: /es/security/default_rules/#cat-cloud-siem
[12]: /es/security/detection_rules/#creating-and-managing-detection-rules
[13]: https://app.datadoghq.com/security/configuration/rules/new?product=siem
[14]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/#create-a-rule