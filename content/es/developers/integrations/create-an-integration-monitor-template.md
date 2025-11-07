---
aliases:
- /es/developers/integrations/create-an-integration-recommended-monitor
description: Aprende a crear un monitor para tu integración.
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentación
  text: Configurar monitores
title: Crear una plantilla de monitor de integración
---
## Información general

Los [monitores Datadog][1] realizan un seguimiento de métricas clave, para que puedas monitorizar eficientemente tu infraestructura y tus integraciones. Datadog proporciona un conjunto de monitores listos para utilizar para muchas funciones e integraciones. Consulta estos monitores en tu [lista de plantillas de monitores][2].

Crea un monitor listo para usar para ayudar a los usuarios a encontrar valor en tu integración de Datadog. En esta guía, se proporcionan los pasos para crear una plantilla de monitor de integración y las prácticas recomendadas a seguir durante el proceso de creación.

Para crear una integración Datadog, consulta la sección de [creación de una nueva integración][3].

## Pasos para crear una plantilla de monitor
### Crear un esquema JSON para monitores

1. [Crea un monitor][4].

2. Sigue las [prácticas recomendadas](#configuration-best-practices) de esta guía para configurar tu monitor.

3. Haz clic en **Export Monitor** (Exportar monitor).

4. Marca la casilla **Select to export as a monitor template** (Seleccionar para exportar como plantilla de monitor).
    {{< img src="developers/integrations/monitor_json.png" alt="Modal JSON de monitor para exportar como plantilla de monitor" style="width:100%;" >}}

5. Haz clic en **Copy** (Copiar) para utilizar el esquema JSON de tu monitor configurado.

6. Guarda el esquema copiado en un archivo JSON y nómbralo según el título de tu monitor. Por ejemplo, `your_integration_name_alert.json`.

7. En el archivo JSON del monitor, rellena el Título, la Descripción y las Etiquetas (tags). Para obtener más información, consulta [Prácticas de configuración recomendadas](#configuration-best-practices).

### Abrir una solicitud pull

1. Guarda el archivo JSON del monitor en tu carpeta de integraciones `assets/monitors`. Añade el recurso a tu archivo `manifest.json`. Para obtener más información sobre la estructura del archivo y el archivo de manifiesto de tu integración, consulta [Referencia de recursos de integraciones][5].

2. Abra una solicitud de extracción (PR) para añadir el archivo JSON de plantilla de monitor y el archivo de manifiesto actualizado a la carpeta integración correspondiente, ya sea en el [repositorio de GitHub `integrations-extras`][6] o en el [repositorio de GitHub `Marketplace`][9]. 

3. Una vez aprobada, Datadog fusiona la PR y la plantilla de monitor de la integración se pasa a producción.

## Verificar tu monitor en producción

Para ver el monitor listo para utilizar, el cuadro de integración relevante debe ser `Installed` en Datadog. 

Encuentra tu monitor en la [lista de plantillas de monitores][2]. Asegúrate de que los logotipos se muestran correctamente en la página de listas de plantillas de monitores.

## Prácticas de configuración recomendadas

Además de la definición de tu monitor, los campos [Título](#title), [Descripción](#description) y Etiquetas son obligatorios para las plantillas de monitor. Configura las etiquetas como "integración:<app_id>"; consulta otras etiquetas de monitor disponibles [aquí][8]. Para obtener más información, consulta la documentación de [configuración de un monitor][7].

### Título

El título permite a los usuarios comprender rápidamente el modo de fallo subyacente que abarca la alerta.
- Utiliza la voz activa y empieza con un objeto seguido de un verbo. 
- No utilices variables de plantilla.

| Necesita revisión                                       | Mejor                                 | El mejor                                        |
| -----------                                          | -----------                            | -----------                                 |
|Mensajes numerosos no reconocidos, informados en {{host.name}}| Mensajes numerosos no reconocidos, informados  |Los mensajes no reconocidos son más numerosos de lo habitual|

### Descripción

Proporciona contexto adicional con respecto al modo de fallo y también sobre el impacto que este modo puede tener en el sistema. Debe permitir a los usuarios comprender de un vistazo si es relevante o no para ellos crear un monitor a partir de él.

- No se trata de una copia del título. 
- Define el problema enunciado en el título.
- Responde por qué es un problema que merece generar alertas.
- Describe el impacto del problema.

| Necesita revisión                                         | Mejor                                       | El mejor                                    |
| -----------                                          | -----------                                  | -----------                             |
|Notifica a tu equipo cuando los mensajes no reconocidos son numerosos. | Los mensajes no reconocidos son aquellos que han sido entregados a un consumidor pero que no han sido reconocidos como procesados o gestionados. Este monitor realiza un seguimiento de la proporción de mensajes no reconocidos.|Los mensajes no reconocidos son aquellos que han sido entregados a un consumidor pero que no han sido reconocidos como procesados o gestionados. Este monitor realiza un seguimiento de la proporción de mensajes no reconocidos para evitar posibles cuellos de botella que podrían provocar retrasos en el procesamiento de los mensajes.| 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/monitors/
[2]: https://app.datadoghq.com/monitors/recommended
[3]: https://docs.datadoghq.com/es/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/monitors/create
[5]: https://docs.datadoghq.com/es/developers/integrations/check_references/#manifest-file
[6]: https://github.com/DataDog/integrations-extras
[7]: https://docs.datadoghq.com/es/monitors/configuration/
[8]: https://docs.datadoghq.com/es/monitors/manage/#monitor-tags
[9]: https://github.com/DataDog/marketplace