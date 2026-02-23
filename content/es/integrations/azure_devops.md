---
app_id: azure_devops
categories:
- Azure
- colaboración
- herramientas de desarrollo
- rastreo de problemas
- suministrar
- control fuente
custom_kind: integración
description: Rastrea las métricas principales de Azure DevOps.
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Monitoriza Azure Pipelines con Datadog CI Visibility
- link: https://www.datadoghq.com/blog/azure-pipeline-testing-with-datadog-synthetic-monitoring/
  tag: Blog
  text: Ejecuta los tests de Datadog Sintético en Azure Pipelines
- link: https://www.datadoghq.com/blog/monitor-azure-devops/
  tag: Blog
  text: Monitoriza flujos de trabajo y pipelines de Azure DevOps con Datadog
title: Microsoft Azure DevOps
---
## Información general

[Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?toc=%2Fazure%2Fdevops%2Fget-started%2Ftoc.json&view=azure-devops) proporciona funciones que las organizaciones utilizan para crear y desarrollar productos más rápidamente. Integra Datadog con Azure DevOps para:

- Rastrear solicitudes y fusiones a tus distintos proyectos.
- Monitorizar eventos de lanzamiento y creación en contexto con otros datos de tu stack tecnológico.
- Rastrear las duraciones de las creaciones y los elementos de trabajo finalizados.
- Realizar un rastreo de los elementos de trabajo y las actualizaciones.

## Configuración

### Instalación

En Datadog, haz clic en el botón de instalación del [cuadro de integración de Azure DevOps](https://app.datadoghq.com/integrations/azuredevops).

### Configuración

Utiliza un enlace de servicio para crear eventos y métricas en Datadog en respuesta a eventos de servicios de Azure DevOps:

{{< img src="integrations/azure_devops/configure-service-hook.gif" alt="Configura Service Hooks" >}}

1. En Azure, ve a la página de enlaces de servicios de tu proyecto.
1. Haz clic en **Create Subscription** (Crear suscripción).
1. Elige el servicio Datadog.
1. Configura la activación del evento de Visual Studio.
1. Introduce tu [clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys) en el campo obligatorio.
1. Añade el sitio de tu organización Datadog: {{< region-param key="dd_site_name" code="true" >}}
1. Haz un test de la suscripción al enlace del servicio y finaliza el asistente. **Nota**: El test no valida tu clave de la API ni el sitio de la organización Datadog.
1. Repite los pasos 4-7 para cada tipo de evento que desees enviar a Datadog. Se aceptan todos los tipos de evento.

Una vez configurados tus enlaces de servicios, ve a Datadog para ver eventos y métricas de Azure DevOps.

Referencia adicional de Azure: [Crear un gancho de servicio para Azure DevOps Services y TFS con Datadog](https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops)

#### Programación

Sigue la documentación de Azure para [Crear una suscripción de ganchos de suscripción de forma programática](https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops) y utiliza el endpoint de Datadog:

```text
https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=<DATADOG_API_KEY>
```

#### Ganchos web genéricos

Puedes utilizar un gancho web genérico para tener un mayor control sobre la carga útil que Azure enviará a Datadog.

1. En Azure, ve a la página de enlaces de servicios de tu proyecto.
1. Haz clic en **Create Subscription** (Crear suscripción).
1. Elige el servicio Web Hook (Gancho web).
1. Configura la activación del evento de Visual Studio.
1. Introduce tu URL de Datadog y [clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys) en el campo URL, por ejemplo, https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=\<DATADOG_API_KEY>.
1. Establece la versión de recursos en **Latest** (Más reciente), o en la versión que necesites. Datadog recomienda utilizar **Latest** o la versión de recursos más reciente.
1. Haz un test de la suscripción al enlace del servicio y finaliza el asistente. **Nota**: El test no valida tu clave de la API ni el sitio de la organización Datadog.

### Utiliza monitores de Datadog como puertas en pipelines de Azure

También puedes utilizar los monitores de Datadog como puertas para [controlar los despliegues de versión](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops) en pipelines de Azure. Esta opción te permite detener automáticamente despliegues problemáticos si se detecta un estado incorrecto en Datadog.

1. Añade la extensión [Monitores de Datadog como puertas de despliegue](https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors) a tu organización de Azure DevOps.

   {{< img src="integrations/azure_devops/extension-service-connection.gif" alt="Extension Service Connection" >}}

1. En Azure DevOps, ve a **Conexiones al servicio** en la configuración de tu proyecto y selecciona **Nueva conexión al servicio**.

1. Selecciona Datadog de la lista y pulsa **Siguiente**.

1. En los campos proporcionados, añade tu clave de la API de Datadog y la clave de la aplicación para la cuenta que deseas utilizar y, a continuación, introduce un nombre y una descripción para identificar esta cuenta de Datadog en Azure DevOps. Haz clic en **Guardar**. Puedes añadir conexiones a servicios adicionales si necesitas consultar monitores desde varias cuentas de Datadog.

1. Ve a **Azure Pipelines** para configurar tu implementación. Aquí, hay una opción para añadir condiciones anteriores o posteriores a la implementación entre etapas. Selecciona dónde deseas añadir el monitor de Datadog y, a continuación, activa el conmutador de alternancia de **Puertas**.

1. Haz clic en **Añadir** y selecciona la opción **Consultar monitores de Datadog**.

1. Selecciona la conexión al servicio de Datadog y, a continuación, introduce tu ID del monitor y el umbral de gravedad que deseas utilizar. El umbral de gravedad es el estado del monitor (ya sea `Alert` o `Warning`) en el que falla la tarea.

   {{< img src="integrations/azure_devops/datadog-monitor-gate.gif" alt="Puerta del monitor de Datadog" >}}

1. Repite los pasos 5-7 para añadir puertas adicionales según sea necesario en tu pipeline de implementación.

**Nota**: Utiliza [monitores compuestos](https://app.datadoghq.com/monitors/monitor_types/composite/) para monitorizar múltiples condiciones para las puertas en tu pipeline como parte de un único estado para cada etapa.

Para ver el código fuente, consulta el [repositorio Azure Devops Monitor Gate Extension](https://github.com/DataDog/azure-devops-monitor-gate-extension)."

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.devops.event.count** <br>(counter) | Número total de eventos.<br>_Se muestra como evento_ |
| **azure.devops.build.duration** <br>(gauge) | Duración de una compilación.<br>_Se muestra como segundos_ |
| **azure.devops.release.duration** <br>(gauge) | Duración de un lanzamiento.<br>_Se muestra como segundo_ |
| **azure.devops.work_item.duration** <br>(gauge) | Duración de un elemento de trabajo.<br>_Se muestra como hora_ |

### Eventos

La integración de Azure DevOps admite los siguientes [tipos de eventos de gancho de servicio](https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#available-event-types):

- Creación y lanzamiento

  - Compilación completa
  - Versión creada
  - Versión abandonada
  - Aprobación del despliegue completada
  - Aprobación del despliegue pendiente
  - Despliegue finalizado
  - Despliegue iniciado

- Código

  - Código registrado
  - Código enviado
  - Solicitud pull creada
  - Solicitud pull fusionada
  - Solicitud pull actualizada
  - Solicitud pull comentada

- Elementos de trabajo

  - Elemento de trabajo creado
  - Elemento de trabajo actualizado
  - Elemento de trabajo eliminado
  - Elemento de trabajo restaurado
  - Elemento de trabajo comentado

- Tuberías

  - Estado de ejecución modificado
  - Estado de trabajo cambiado
  - Estado de ejecución de etapa cambiado
  - Etapa de ejecución pendiente de aprobación
  - Aprobación de etapa de ejecución completada

- Conexiones de servicio

  - Conexión de servicio creada
  - Conexión de servicio actualizada

Si hay algún tipo de evento de Azure DevOps que no aparezca en la lista anterior y del que desees realizar un seguimiento, ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

### Checks de servicio

La integración de Azure DevOps no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

### FAQ

#### ¿Se cobra un costo adicional por esta integración?

Las métricas y eventos generados a partir de esta integración no suponen ningún costo adicional.

#### ¿Cuánto tiempo permanecen estos datos en Datadog?

Los datos de esta integración se mantienen durante 15 meses, de forma similar a otros tipos de datos de series temporales en Datadog.

#### ¿Cuánto tiempo tardan en aparecer los eventos y las métricas en Datadog?

La latencia total tiene muchas variables, pero, en la mayoría de los casos, los eventos y las métricas se muestran en Datadog antes de que transcurran 30 segundos desde que se produce el incidente.

#### ¿Qué puedes hacer con los eventos y las métricas de Azure DevOps en Datadog?

Los eventos y las métricas pueden utilizarse como otros eventos y métricas en Datadog, incluidos crear dashboards, configurar monitores y solucionar problemas.

#### ¿Cómo se generan las métricas de la duración de la creación y la duración del elemento de trabajo?

La duración de la creación se genera a partir de eventos _build completed_ tomando la diferencia de tiempo entre el momento en que se inició la creación y el momento en que finalizó (medida en segundos).

La duración del elemento de trabajo se genera a partir de eventos _work item updated_ tomando la diferencia de tiempo entre la transición a `Done` y el momento en que se creó el elemento de trabajo (medida en horas).

**Nota**: Si se vuelve a abrir un elemento de trabajo de `Done`, la próxima vez que se pase a `Done` se generará otro punto de datos. El punto de datos inicial no se modifica y el nuevo punto de datos sigue midiendo desde el momento en que se creó inicialmente el elemento de trabajo.

#### Tu test de suscripción de enlace de servicio devuelve un mensaje de éxito, ¿por qué no llegan eventos a Datadog?

El test de suscripción de enlace de servicio solo hace checks si Azure DevOps puede enviar eventos a Datadog. No valida tu clave de la API ni el sitio de tu organización Datadog (EE. UU. o UE). Asegúrate de que la clave de la API y el sitio sean correctos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}