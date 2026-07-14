---
app_id: jira
categories:
- collaboration
- developer tools
- issue tracking
- notifications
custom_kind: integración
description: Haz que tus alertas de Datadog se autogeneren y posteriormente actualicen
  tickets de Jira.
title: Jira
---
## Información general

Jira es un sistema de rastreo de problemas y proyectos para equipos de software. La integración de Datadog Jira permite crear problemas a partir de alertas, incidentes y casos activados en Datadog y ver los problemas creados en Jira como eventos de Datadog.

## Configuración

### Crear un enlace de aplicación en Jira

#### Instrucciones de Jira Cloud

1. Ve a Jira.

1. Haz clic en el icono de engranaje de la esquina derecha y selecciona **Products** (Productos).

1. En el menú de la izquierda, en **Integrations** (Integraciones), haz clic en **Application links** (Enlaces de aplicación) y, a continuación, en **Create link** (Crear enlace).

1. Selecciona la casilla **Direct application link** (Enlace directo a la aplicación), introduce la URL `https://{{< region-param key="dd_full_site" code="true" >}}` y haz clic en **Continue** (Continuar).

1. Ignora la advertencia "No response was received from the URL you entered" (No se ha recibido respuesta de la URL introducida) y haz clic en **Continue** (Continuar).

1. Rellena el formulario como se indica a continuación y haz clic en **Continue** (Continuar).

   | Campo | Entrada |
   |-----------------------|--------------------------------|
   | Nombre de la aplicación | `{Enter a name (e.g. Datadog)}`|
   | Tipo de aplicación | Aplicación genérica |
   | Nombre del proveedor de servicios | `{leave blank}` |
   | Clave del consumidor | `{leave blank}` |
   | Secreto compartido | `{leave blank}` |
   | URL del token de solicitud | `{leave blank}` |
   | URL del token de acceso | `{leave blank}` |
   | Autorizar URL | `{leave blank}` |
   | Crear enlace de entrada | Marcar la casilla |

1. Rellena el siguiente formulario y haz clic en **Continue** (Continuar). Para encontrar la clave pública en el [cuadro de la integración Datadog Jira](https://app.datadoghq.com/integrations/jira), haz clic en **Add Account** (Añadir cuenta).

   | Campo | Entrada |
   |---------------|------------------------------------------------------------|
   | Clave del consumidor | `{Enter a key name (e.g. datadog)}` |
   | Nombre del consumidor | Datadog |
   | Clave pública | `{Enter the public key from Datadog Jira integration tile}`|

#### Instrucciones de Jira Data Center

1. Ve a Jira.
1. Haz clic en el icono de engranaje de la esquina derecha y selecciona **Applications** (Aplicaciones).
1. En el menú de la izquierda, en **Integrations** (Integraciones), haz clic en **Application links** (Enlaces de aplicación) y, a continuación, en **Create link** (Crear enlace).
1. En el cuadro de diálogo **Create link** (Crear enlace), selecciona **Atlassian product** (Producto Atlassian) y proporciona la URL de la aplicación como `https://{{< region-param key="dd_full_site" code="true" >}}`. Haz clic en **Continue** (Continuar).
1. Ignora la advertencia "No response was received from the URL you entered" (No se ha recibido respuesta de la URL introducida) y haz clic en **Continue** (Continuar).
1. Rellena el formulario utilizando los mismos parámetros que se muestran arriba en las instrucciones de Jira Cloud.

### Conectar Datadog a tu instancia de Jira

<div class="alert alert-info">
Datadog recomienda especialmente tener una cuenta de servicio Jira exclusiva (no personal) específicamente para esta integración, para obtener resultados óptimos y más coherentes.
</div>

1. Ve al [cuadro de la integración Datadog Jira](https://app.datadoghq.com/integrations/jira) y haz clic en **Add Account** (Añadir cuenta).
1. Introduce la URL de tu instancia de Jira y la clave de consumidor del enlace de aplicación que creaste anteriormente.
1. Haz clic en **Connect** (Conectar) y sigue las instrucciones de la página de autorización de Jira. Asegúrate de iniciar sesión en esta cuenta antes de pulsar **Connect** (Conectar).
   **Nota**: La integración Datadog Jira puede conectarse a instancias On-Premises/Jira Data Center. Sin embargo, muchas de estas instancias tienen listas negras de rangos de IP. Para que la integración funcione, sigue la documentación de filtrado de IP que aparece a continuación.

### Filtrado de IP

Si tu instancia de Jira filtra el tráfico por dirección IP, necesitas permitir conexiones desde los prefijos IP de **webhooks** 
pertenecientes a Datadog para que la integración funcione. Para consultar una lista de prefijos IP de **webhooks** de tu región, consulta [Rangos de IP de Datadog](https://docs.datadoghq.com/api/latest/ip-ranges/).

### Configuración adicional

Para configurar la creación automática de incidentes de Jira con sincronización bidireccional en Case Management, consulta las instrucciones para [configurar un webhook de Jira](#configure-a-jira-webhook) y la documentación de [Case Management](https://docs.datadoghq.com/service_management/case_management/settings/#jira).

Para crear incidentes de Jira a partir de alertas de monitor de Datadog, consulta [Configurar una plantilla de incidentes](#configure-an-issue-template).

## Configurar un webhook de Jira

La configuración de un webhook permite que los casos creados en Case Management creen automáticamente incidentes en Jira y mantengan sincronizados ambos recursos.

Para crear un webhook de Jira:

1. En Jira, haz clic en el icono **Gear** (Engranaje) de la esquina superior derecha y selecciona **System** (Sistema).
1. En el menú de la izquierda, en *Advanced* (Avanzado), haz clic en **Webhooks**.
1. Haz clic en **Create a Webhook** (Crear un webhook) en la esquina derecha.
1. Introduce `Datadog Webhook` como nombre del webhook.
1. Mantén el estado como **Enabled** (Habilitado).
1. Ve al [cuadro de la integración Datadog Jira](https://app.datadoghq.com/account/settings#integrations/jira).
1. En la sección Webhooks, copia la URL del webhook.
1. Vuelve a Jira y pega la URL del webhook en *URL*.
1. Habilita los siguientes eventos relacionados con problemas. Si solo quieres enviar un subconjunto de eventos de problemas, puedes utilizar JQL para filtrarlos. En este ejemplo, estamos filtrando solo para los proyectos AB y CD.
   {{< img src="integrations/jira/jira_issue_events.png" alt="Eventos de incidentes en Jira" style="width:80%;">}}
1. Habilita los eventos relacionados con el proyecto `deleted`.
1. Deja todo lo demás sin marcar.
1. Haz clic en el botón **Create** (Crear) situado en la parte inferior de la página.

## Configurar una plantilla de problema

Las plantillas de problemas definen cómo se crean los problemas en Jira a partir de eventos de alerta de Datadog.

Para crear una plantilla de problemas:

1. En Datadog, haz clic en **New Issue Template** (Nueva plantilla de problema) en la sección **Connect Jira to Monitor Notifications** (Conectar Jira a notificaciones de monitor).
1. Introduce un nombre para tu plantilla de problemas. Este nombre, prefijado con `jira-`, se convierte en el identificador que puedes utilizar en tu monitor para enviar notificaciones (como `jira-my-issue-template-name`).
1. Selecciona una cuenta de Jira.
1. Selecciona el proyecto y el tipo de proyecto (como **Historia**, **Épica**, **Tarea** o **Problema**).
1. Aparece una lista de campos configurables. Introduce los valores en los campos deseados y haz clic en **Save** (Guardar).

### Configurar campos del problema

Los campos de plantilla de problemas definen los datos que se incluyen al crear problemas en Jira. Por ejemplo, puedes configurar tu plantilla para crear problemas con una prioridad específica o un asignatario predeterminado.

Puedes utilizar los datos del evento de alerta para rellenar los valores de los campos del incidente utilizando variables de plantilla como `${EVENT_TITLE}`. Para ver una lista de posibles variables, consulta la [integración de webhooks de Datadog](https://docs.datadoghq.com/integrations/webhooks/).

## Utilización

#### Creación automática de problemas a partir de las alertas de Datadog 

Para crear problemas de Jira a partir de eventos de alerta de Datadog, introduce el identificador de notificación de una o varias plantillas de problemas como `@jira-my-issue-template` al crear un monitor en las secciones **Notify your team** o **Say what's happening** (Notifica a tu equipo o Di lo que está pasando).

Los problemas se crean cuando se activa el monitor. El monitor no crea nuevos problemas hasta que se resuelve el monitor.

## Datos recopilados

### Métricas

La integración de Jira no incluye ninguna métrica.

### Eventos

Todos los problemas de Jira creados aparecen como eventos en Datadog.

### Checks de servicio

La integración de Jira no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).