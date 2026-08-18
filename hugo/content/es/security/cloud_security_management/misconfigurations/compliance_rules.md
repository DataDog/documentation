---
aliases:
- /es/security_platform/cspm/configuration_rules
- /es/security/cspm/configuration_rules
- /es/security/cspm/detection_rules
- /es/security/cspm/compliance_rules
- /es/security/misconfigurations/compliance_rules
further_reading:
- link: /security/cloud_security_management/misconfigurations
  tag: Documentación
  text: Empezando con CSM Misconfigurations
- link: /security/cloud_security_management/misconfigurations/custom_rules/
  tag: Documentación
  text: Reglas personalizadas
- link: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/
  tag: Documentación
  text: Informes sobre errores de configuración
title: Gestión de las reglas de cumplimiento de CSM Misconfigurations
---

Cloud Security Management Misconfigurations (CSM Misconfigurations) [reglas de cumplimiento predefinidas][1] evalúa la configuración de tus recursos en la nube e identifica posibles errores de configuración a fin de que puedas tomar medidas inmediatas para remediarlos.

Las reglas de cumplimiento siguen la misma [lógica condicional][2] que todas las reglas de cumplimiento de la seguridad de Datadog. En CSM Misconfigurations, cada regla se asigna a controles dentro de uno o más [marcos de cumplimiento o puntos de referencia del sector][4].

CSM Misconfigurations utiliza los siguientes tipos de reglas para validar la configuración de tu infraestructura de nube:

- [**Configuración de la nube**][1]: Estas reglas de cumplimiento analizan la configuración de los recursos dentro de tu entorno de nube. Por ejemplo, la regla [Distribución de Cloudfront cifrada][3] evalúa la configuración del estado del cifrado de una distribución de Amazon CloudFront.
- [**Configuración de la infraestructura**][5]: Estas reglas de cumplimiento analizan tus contenedores y clústeres de Kubernetes para encontrar problemas de configuración, como se define en las referencia de cumplimiento de CIS para Docker y Kubernetes. Por ejemplo, la regla [Permisos de archivos /etc/default/Docker configurados en 644 o de forma más restrictiva][6] evalúa los permisos de los archivos Docker que se ejecutan en un host.

## Explorar las reglas de cumplimiento predeterminadas

Para filtrar las reglas de cumplimiento predeterminadas por proveedor de nube:

1. Ve a la página [**Reglas de errores de configuración**][13].
2. Elige uno de los siguientes valores de la faceta **Tag** (Etiqueta).
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **Google Cloud**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

## Personalizar la forma en que cada regla analiza tu entorno

La personalización directa de una consulta de configuración en la nube no es compatible en este momento, pero puedes personalizar la forma en que cada regla analiza tu entorno.

En la página [Reglas][13], selecciona una regla para abrir su página de detalles. En **Exclude benign activity with suppression queries** (Excluir actividades benignas con consultas de supresión), define la lógica de filtrado para la forma en que la regla analiza tu entorno.

Por ejemplo, puedes excluir recursos etiquetados con `env:staging` utilizando la función **This rule will not generate a misconfiguration if there is a match with any of the following suppression queries** (Esta regla no generará un error de configuración si hay una coincidencia con cualquiera de las siguientes consultas de supresión). También puedes limitar el contexto de una determinada regla a los recursos etiquetados con `compliance:pci`, utilizando la función **Only generate a misconfiguration if there is a match with any of the following queries** (Sólo generar un error de configuración si hay una coincidencia con alguna de las siguientes consultas).

Después de personalizar una regla, haz clic en **Update Rule** (Actualizar regla) en la parte inferior de la página para aplicar los cambios.

{{< img src="security/cspm/frameworks_and_benchmarks/never-trigger-misconfiguration.png" alt="Personalizar la forma en que se analiza tu entorno, seleccionando etiquetas (tags) para incluir o excluir del contexto de una regla" >}}

## Definir objetivos de notificación para las reglas de cumplimiento

Puedes enviar notificaciones en tiempo real cuando se detecte un nuevo error de configuración en tu entorno añadiendo objetivos de notificación. Las opciones disponibles de notificación son:

- [Slack][14]
- [Jira][15]
- [PagerDuty][16]
- [ServiceNow][17]
- [Microsoft Teams][18]
- [Webhooks][19]
- Correo electrónico

En la página [Reglas][13], selecciona una regla para abrir tu página de detalles. En la sección **Set severity and notifications** (Definir gravedad y notificaciones), configurar cero o más objetivos de notificación para cada caso de regla. No se puede editar la gravedad predefinida. Para obtener instrucciones detalladas sobre la configuración de notificaciones para reglas de cumplimiento, consulta [Notificaciones][7].

También puedes crear [reglas de notificación][21] que abarquen varias reglas de cumplimiento basadas en parámetros como gravedad, tipos de reglas, etiquetas de reglas, atributos de señal y etiquetas de señal. Esto te permite evitar tener que editar manualmente las preferencias de notificación para reglas de cumplimiento individuales.

**Nota**: Si se detecta un error de configuración para una regla con notificaciones habilitadas, el error de configuración fallido también aparecerá en el [Explorador de señales][22].

{{< img src="security/cspm/frameworks_and_benchmarks/notification-2.png" alt="Sección de gravedad y notificaciones de la página de detalles de la regla" >}}

## Creación de reglas personalizadas

Puedes crear reglas personalizadas para ampliar las reglas que se aplican a tu entorno, a fin de evaluar tu postura de seguridad. También puedes clonar las reglas de detección predeterminadas y editar las copias (sólo Google Cloud). Para obtener más información, consulta [Reglas personalizadas][20].

## Obsolescencia de reglas

Se realizan auditorías periódicas de todas las reglas de cumplimiento para mantener una calidad de señal de alta fidelidad. Las reglas obsoletas se sustituyen por una regla mejorada.

El proceso de obsolescencia de las reglas es el siguiente:

1. La regla incluye una advertencia con la fecha de caducidad. En la interfaz de usuario, la advertencia se muestra en la:
    - Sección **Detalles de la regla > Guía** del panel lateral de señales
    - Panel lateral de errores de configuración
    - [Editor de reglas][23] para esa regla específica
2. Una vez que la regla se vuelve obsoleta, transcurre un periodo de 15 meses antes de que se elimine la regla. Esto se debe al periodo de conservación de señales de 15 meses. Durante este tiempo, puede volver a habilitar la regla [clonando la regla][23] en la interfaz de usuario.
3. Una vez eliminada la regla, ya no podrás clonarla ni volver a habilitarla.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/#cat-csm-misconfigurations-cloud
[2]: /es/security/detection_rules/
[3]: https://docs.datadoghq.com/es/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[5]: /es/security/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/es/security_monitoring/default_rules/cis-docker-1.2.0-3.22/
[7]: /es/security/notifications/
[13]: https://app.datadoghq.com/security/configuration/compliance/rules
[14]: /es/integrations/slack/
[15]: /es/integrations/jira/
[16]: /es/integrations/pagerduty
[17]: /es/integrations/servicenow/
[18]: /es/integrations/microsoft_teams/
[19]: /es/integrations/webhooks/
[20]: /es/security/cloud_security_management/misconfigurations/custom_rules/
[21]: /es/security/notifications/rules/
[22]: /es/security/cloud_security_management/misconfigurations/signals_explorer/
[23]: /es/security/detection_rules/#clone-a-rule