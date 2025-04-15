---
title: Configuración de CSM sin la monitorización de la infraestructura
---

Además de configurar CSM con o sin un Agent, también puedes configurarlo sin la monitorización de la infraestructura.

## Configurar CSM en tu cuenta de AWS

1. Dirígete a la [página de configuración de la integración de AWS][2] en Datadog.
1. En la pestaña **Configuration** (Configuración), selecciona la cuenta en la que quieres habilitar CSM.

   Si no ves la cuenta requerida, añádela al hacer clic en **Add AWS Account(s)** (Añadir cuentas de AWS) y sigue las instrucciones en la pantalla.
1. Para desactivar la monitorización de la infraestructura en la cuenta seleccionada, debajo del número de cuenta, dirígete a la pestaña **Metric Collection** (Recopilación de métricas) y, a continuación, haz clic en el enlace **disable metric collection** (deshabilitar recopilación de métricas). Luego, haz clic en **Disable metric collection** (Deshabilitar recopilación de métricas) para confirmar.
1. Para activar CSM, en la pestaña **Resource Collection** (Recopilación de recursos), activa la opción **Enable Resource Collection** (Habilitar recopilación de recursos) y selecciona la casilla de verificación **Enable Cloud Security Management** (Habilitar Cloud Security Management).
1. Haz clic en **Save** (Guardar).

**Nota**: En la configuración de CSM, establece [filtros de evaluación de recursos][1] para limitar la cantidad de hosts en los que necesitas seguridad.

## Configurar CSM en tu suscripción de Azure

1. Dirígete a la [página de configuración de la integración de Azure][3] en Datadog.
1. Selecciona el ID de cliente o la suscripción en la que quieres habilitar CSM.

   Si no ves el ID de cliente requerido, añádelo al hacer clic en **Add New App Registration** (Añadir registro de aplicación nuevo) y sigue las instrucciones en la pantalla.
1. Para desactivar la monitorización de la infraestructura en la cuenta seleccionada, debajo del ID de cliente, dirígete a la pestaña **Metric Collection** (Recopilación de métricas) y, a continuación, desactiva la opción **Enable Metric Collection** (Habilitar recopilación de métricas). 
1. Para activar CSM, en la pestaña **Resource Collection** (Recopilación de recursos), activa la opción **Enable Resource Collection** (Habilitar recopilación de recursos) y selecciona la casilla de verificación **Enable Cloud Security Management** (Habilitar Cloud Security Management).
1. Haz clic en **Save** (Guardar).

**Nota**: En la configuración de CSM, establece [filtros de evaluación de recursos][1] para limitar la cantidad de hosts en los que necesitas seguridad.

## Configurar CSM en tu cuenta de Google Cloud Platform

1. Dirígete a la [página de configuración de Google Cloud Platform][4] en Datadog.
1. Selecciona la cuenta de servicio en la que quieres habilitar CSM.

   Si no ves la cuenta requerida, añádela al hacer clic en **Add GCP Account** (Añadir cuenta de GCP) y sigue las instrucciones en la pantalla.
1. Para desactivar la monitorización de la infraestructura en la cuenta seleccionada, debajo del nombre de la cuenta, dirígete a la pestaña **Metric Collection** (Recopilación de métricas). Luego, encima de la tabla de recopilación de métricas, haz clic en **Disable All** (Deshabilitar todo).
1. Para activar CSM, en la pestaña **Resource Collection** (Recopilación de recursos), activa la opción **Enable Resource Collection** (Habilitar recopilación de recursos) y selecciona la casilla de verificación **Enable Cloud Security Management** (Habilitar Cloud Security Management).
1. Haz clic en **Save** (Guardar).

**Nota**: En la configuración de CSM, establece [filtros de evaluación de recursos][1] para limitar la cantidad de hosts en los que necesitas seguridad.

[1]: /es/security/cloud_security_management/guide/resource_evaluation_filters/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://app.datadoghq.com/integrations/google-cloud-platform