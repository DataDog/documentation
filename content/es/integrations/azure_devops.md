---
categories:
- Azure
- colaboración
- herramientas de desarrollo
- rastreo de problemas
- suministrar
- control de fuentes
custom_kind: integration
dependencies: []
description: Rastrea las métricas principales de Azure DevOps.
doc_link: https://docs.datadoghq.com/integrations/azure_devops
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Monitoriza Azure Pipelines con Datadog CI Visibility
- link: https://www.datadoghq.com/blog/azure-pipeline-testing-with-datadog-synthetic-monitoring/
  tag: Blog
  text: Ejecuta los tests de Datadog Sintético en Azure Pipelines
- link: https://www.datadoghq.com/blog/monitor-azure-devops/
  tag: Blog
  text: Monitoriza flujos de trabajo y pipelines Azure DevOps con Datadog
git_integration_title: azure_devops
has_logo: true
integration_id: azuredevops
integration_title: Microsoft Azure DevOps
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_devops
public_title: Integración de Datadog y Microsoft Azure DevOps
short_description: Rastrea las métricas principales de Azure DeOps.
team: web-integrations
version: '1.0'
---

<!--  CON ORIGEN EN https://github.com/DataDog/dogweb -->
## Información general

[Azure DevOps][1] proporciona funciones que las organizaciones utilizan para crear y desarrollar productos más rápidamente. Integra Datadog con Azure DevOps para:

- Rastrear solicitudes y fusiones a tus distintos proyectos.
- Monitorizar eventos de lanzamiento y creación en contexto con otros datos de tu stack tecnológico.
- Rastrear duraciones de las creaciones y los elementos de trabajo finalizados.
- Realizar un rastreo de los elementos de trabajo y las actualizaciones.

## Configuración

### Instalación

En Datadog, haz clic en el botón de instalación del [ícono de integración de Azure DevOps][2].

### Configuración

Utiliza un gancho de servicio para crear eventos y métricas en Datadog en respuesta a eventos de servicios de Azure DevOps:

{{< img src="integrations/azure_devops/configure-service-hook.gif" alt="Configura Service Hooks" >}}

1. En Azure, ve a la página de enlaces de servicios de tu proyecto.
2. Haz clic en **Crear suscripción**.
3. Elige el servicio Datadog.
4. Configura la activación del evento de Visual Studio.
5. Introduce tu [clave de la API de Datadog][3] en el campo obligatorio.
6. Añade el sitio de tu organización Datadog: {{< region-param key="dd_site_name" code="true" >}}
7. Haz un test de la suscripción al enlace del servicio y finaliza el asistente. **Nota**: El test no valida su clave de la API ni el sitio de la organización Datadog.
8. Repite los pasos 4-7 para cada tipo de evento que desees enviar a Datadog. Se aceptan todos los tipos de evento.

Una vez configurados tus enlaces de servicios, ve a Datadog para ver eventos y métricas de Azure DevOps.

Referencia adicional de Azure: [Crear un enlace de servicio para servicios de Azure DevOps y TFS con Datadog][4]

#### Programática

Sigue la documentación de Azure para [Crear una suscripción a enlaces de servicios mediante programación][5] y utiliza el endpoint de Datadog:

```text
https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=<DATADOG_API_KEY>
```

### Utiliza monitores de Datadog como puertas en pipelines de Azure

También puedes utilizar monitores de Datadog como puertas para [controlar las implementaciones de lanzamiento][6] en Azure Pipelines. Esta opción permite detener automáticamente las implementaciones problemáticas si se detecta un estado que es bueno en Datadog.

1. Añade la extensión [Datadog Monitors as puertas de implementación][7] a tu organización Azure DevOps.

    {{< img src="integrations/azure_devops/extension-service-connection.gif" alt="Conexión al servicio de la extensión" >}}

2. En Azure DevOps, ve a **Conexiones al servicio** en la configuración de tu proyecto y selecciona **Nueva conexión al servicio**.
3. Selecciona Datadog de la lista y pulsa **Siguiente**.
4. En los campos proporcionados, añade tu clave de la API de Datadog y la clave de la aplicación para la cuenta que deseas utilizar y, a continuación, introduce un nombre y una descripción para identificar esta cuenta de Datadog en Azure DevOps. Haz clic en **Guardar**. Puedes añadir conexiones a servicios adicionales si necesitas consultar monitores desde varias cuentas de Datadog.
5. Ve a **Azure Pipelines** para configurar tu implementación. Aquí, hay una opción para añadir condiciones anteriores o posteriores a la implementación entre etapas. Selecciona dónde deseas añadir el monitor de Datadog y, a continuación, activa el conmutador de alternancia de **Puertas**.
6. Haz clic en **Añadir** y selecciona la opción **Consultar monitores de Datadog**.
7. Selecciona la conexión al servicio de Datadog y, a continuación, introduce tu ID del monitor y el umbral de gravedad que deseas utilizar. El umbral de gravedad es el estado de monitor (ya sea `Alert` o `Warning`) en el que falla la tarea.

    {{< img src="integrations/azure_devops/datadog-monitor-gate.gif" alt="Puerta de Monitor de Datadog" >}}

8. Repite los pasos 5-7 para añadir puertas adicionales según sea necesario en tu pipeline de implementación.

**Nota**: Utiliza [monitores compuestos][8] para monitorizar varias condiciones de las puertas en tu pipeline como parte de un único estado para cada etapa.

Para ver el código fuente, consulta el [Informe de la extensión de puerta de Monitor de Azure Devops][9]".

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_devops" >}}


### Eventos

La integración de Azure DevOps admite los siguientes [tipos de eventos de enlaces a servicios][11]:

- Creación y lanzamiento
- Elementos de trabajo
- Código


### Checks de servicios

La integración de Azure DevOps no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [Soporte técnico de Datadog][12].

### FAQ

#### ¿Se cobra un costo adicional por esta integración?
Las métricas y eventos generados a partir de esta integración no suponen ningún costo adicional.

#### ¿Cuánto tiempo permanecen estos datos en Datadog?
Los datos de esta integración se mantienen durante 15 meses, de forma similar a otros tipos de datos de series temporales en Datadog.

#### ¿Cuánto tiempo tardan en aparecer los eventos y las métricas en Datadog?
La latencia total tiene muchas variables, pero, en la mayoría de los casos, los eventos y las métricas se muestran en Datadog antes de que transcurran 30 segundos desde que se produce el incidente.

#### ¿Qué puedes hacer con los eventos y las métricas de Azure DevOps en Datadog?
Los eventos y las métricas pueden utilizarse como otros eventos y métricas en Datadog, incluidos crear dashboards, configurar monitores y solucionar problemas.

#### ¿Cómo se generan las métricas para la duración de la creación y la duración del elemento de trabajo?
La duración de la creación se genera a partir de eventos _build completed_ tomando la diferencia de tiempo entre el momento en que se inició la creación y el momento en que finalizó (medida en segundos).

La duración del elemento de trabajo se genera a partir de eventos _work item updated_ tomando la diferencia de tiempo entre la transición a `Done` y el momento en que se creó el elemento de trabajo (medida en horas).

**Nota**: Si se vuelve a abrir un elemento de trabajo de `Done`, la próxima vez que se pase a `Done` se generará otro punto de datos. El punto de datos inicial no se modifica y el nuevo punto de datos sigue midiendo desde el momento en que se creó inicialmente el elemento de trabajo.

#### Tu test de suscripción de enlace de servicio devuelve un mensaje de éxito, ¿por qué no llegan eventos a Datadog?
El test de suscripción de enlace de servicio solo hace checks si Azure DevOps puede enviar eventos a Datadog. No valida tu clave de la API ni el sitio de tu organización Datadog (EE. UU. o UE). Asegúrate de que la clave de la API y el sitio sean correctos.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?toc=%2Fazure%2Fdevops%2Fget-started%2Ftoc.json&view=azure-devops
[2]: https://app.datadoghq.com/integrations/azuredevops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[5]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[6]: https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops
[7]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors
[8]: /es/monitors/monitor_types/composite/
[9]: https://github.com/DataDog/azure-devops-monitor-gate-extension
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[11]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#available-event-types
[12]: https://docs.datadoghq.com/es/help/