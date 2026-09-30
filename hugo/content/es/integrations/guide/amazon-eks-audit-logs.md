---
title: Recopilación de logs para los logs de auditoría de Amazon EKS
---

## Información general

Los logs de auditoría de Amazon EKS ofrecen a los administradores de clúster información sobre las acciones dentro de un clúster de EKS. Una vez que habilites la recopilación de logs para tus logs de auditoría de Amazon EKS, puedes configurar y utilizar [Datadog Cloud SIEM][1] para monitorizar acciones injustificadas o amenazas inmediatas a medida que se producen dentro de tu clúster de EKS.

## Configuración

### Logs de auditoría de Amazon EKS

#### Nuevo clúster

1. Si no dispones de un clúster de Amazon EKS, crea uno siguiendo la documentación [Creación de un clúster de Amazon EKS][2].
1. Durante la configuración, en la página de configuración de registro, activa **Audit Logs** (Logs de auditoría).

#### Clúster existente

1. Si ya tienes un clúster de Amazon EKS configurado, navega hasta tu clúster en la [consola de Amazon EKS][2].
1. Haz clic en tu clúster de EKS.
1. Haz clic en la pestaña **Logging** (Registro).
1. Haz clic en el botón **Manage logging** (Gestionar registro).
1. Cambia la opción **Audit** (Auditoría) a **Enabled** (Activado) y haz clic en el botón **Save changes** (Guardar cambios).

### Integración de Datadog y AWS

A continuación, configura la integración de AWS. Sigue la documentación de [configuración de la integración de AWS][3].

### Datadog Forwarder

Una vez completada la configuración de la integración de AWS, instala y configura el Datadog Forwarder. Sigue la documentación de [instalación de Datadog Forwarder][4].

**Nota**: El ARN de Lambda es necesario para el paso [Activadores de configuración][5]. Tu ARN de Lambda está disponible navegando a [Lambda > Funciones > `Your_Function_Name`][6] en la consola de AWS. El ARN de función aparece en la información general de la función.

## Log Explorer

Una vez finalizada la configuración de los logs de auditoría de Amazon EKS, la integración de Datadog AWS y Datadog Forwarder, tus logs de auditoría de EKS estará disponible en el [Datadog Log Explorer][7].

**Nota**: Los logs pueden tardar unos segundos en comenzar a transmitir en Log Explorer.

Para ver solo logs de auditoría de EKS en el Log Explorer, consulta `source:kubernetes.audit` en la búsqueda del Log Explorer o en **Source** (fuente) en el panel de facetas, y selecciona la faceta `kubernetes.audit` para filtrar por logs de auditoría de EKS.

## Cloud SIEM

Puedes utilizar Datadog Cloud SIEM para detectar posibles errores de configuración o ataques dirigidos a tus clústeres de EKS.

Para iniciar la monitorización de tus logs de auditoría de Amazon EKS con Cloud SIEM, configura Cloud SIEM y crea una [regla de detección de logs][8] personalizada que genere una [señal de seguridad][9] en el [Security Signals Explorer][10] cada vez que se detecte una configuración incorrecta o una amenaza.

### Configuración

Configura Cloud SIEM. Consulta las [instrucciones de configuración de Cloud SIEM][1] de la aplicación.

Una vez instalado y configurado Cloud SIEM, puedes crear una nueva regla de Cloud SIEM desde cero o exportar una consulta en el Log Explorer a una nueva regla.

### Revisar las reglas de Security Monitoring

Consulta las [reglas de detección de Cloud SIEM][11] predefinidas que detectan amenazas en tu entorno. Para obtener más información sobre la búsqueda, edición y clonación de estas reglas, consulta [creación y gestión de reglas de detección][12].

### Crear una nueva regla de Cloud SIEM

Para crear una regla, ve a la página dentro de la aplicación [Configuración de reglas][13]. Para completar la configuración, consulta la [documentación sobre reglas de detección de logs][14].

### Exportar una consulta a una regla en el Log Explorer

1. En el Log Explorer, crea una consulta en la barra de búsqueda. Por ejemplo, filtra por `source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]`.
1. Haz clic en el botón **Export** (Exportar) y selecciona **Export to detection rule** (Exportar a la regla de detección).
1. Esta función exporta tu consulta y la define en el segundo paso de la configuración de reglas de detección de logs. Selecciona un método de detección. En este caso, selecciona **New value** (Nuevo valor). Selecciona el atributo `@usr.name` en el menú desplegable Detect new value (Detectar nuevo valor). Esto te alertará por primera vez cuando un usuario se ejecute en un pod. Después de la primera alerta, Datadog no volverá a alertar sobre el mismo usuario. Alternativamente, para detectar cuando estos eventos superan un umbral definido por el usuario, utiliza la **regla de umbral** para el método de detección.
1. Sigue la [documentación de reglas de detección de logs][14] para aprender a completar el resto de tu regla de configuración.

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
[14]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold#choose-a-detection-method