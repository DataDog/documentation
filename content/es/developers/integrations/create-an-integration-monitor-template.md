---
aliases:
- /es/developers/integrations/create-an-integration-recommended-monitor
description: Aprende a crear un monitor para tu integración.
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentación
  text: Configurar monitores
title: Cree una plantilla en monitor
---
## Información general

Esta página guía a los socios tecnológicos en la creación y empaquetado de plantillas de monitor con su integración oficial de Datadog.

Los [Monitores de Datadog][1] evalúan continuamente los datos (como métricas, logs y eventos) para detectar condiciones que indiquen problemas de rendimiento y riesgos de disponibilidad. Actúan como herramientas de alerta proactiva que notifican automáticamente a los usuarios cuando el comportamiento se desvía de los umbrales esperados, lo que permite a los equipos tomar acción antes de que los incidentes afecten a los clientes.

Para los socios tecnológicos, los monitores transforman la telemetría que recopila tu integración en información práctica. Al empaquetar las plantillas de monitor, los usuarios pueden activarlas directamente desde la página [**Monitors > Templates**][2] (Monitores > Plantillas) para agilizar la configuración y la obtención de valor.

Se requiere al menos una plantilla de monitor si tu integración recopila métricas. 

## Creación de una plantilla de monitor
Estos pasos presuponen que [te has unido a la Red de socios de Datadog][3], tienes acceso a una organización de desarrolladores asociada y ya has [creado una lista en la Plataforma de desarrolladores][4]. 

1. [Determinar qué telemetría deseas monitorizar](#determine-which-telemetry-to-monitor).
2. [Crear y configurar un monitor](#create-your-monitor) en tu organización de desarrolladores asociados.
3. [Testear tu monitor](#test-your-monitor).
4. [Añadir tu monitor a tu integración](#add-your-monitor-to-your-integration). 

### Determinar qué telemetría monitorizar
Comienza por revisar la [lista completa de tipos de monitor][6] para comprender sobre qué tipos de telemetría puedes alertar. Determina los datos que más interesan a tus usuarios. Consulta los ejemplos siguientes para ver casos de uso y ejemplos comunes.

#### Monitorizar las métricas RED (tasa, errores, duración) de tu servicio
- **Tasa**: monitoriza el número de solicitudes que recibe tu servicio.
- **Errores: rastrea cuántas de esas solicitudes fallan.
- **Duración**: mide cuánto tardan esas solicitudes (latencia).

#### Monitorizar tu infraestructura 
- **Utilización de la CPU**: realiza un seguimiento del uso de la CPU para asegurarte de que no está ni infrautilizada ni sobreutilizada, para evitar ralentizaciones del sistema o fallos de las aplicaciones.
- **Utilización de memoria**: monitoriza cuánta memoria del sistema se está utilizando para detectar y prevenir problemas como fugas de memoria o bloqueos.
- **Almacenamiento**: monitoriza el espacio en disco para evitar problemas como la pérdida de datos, interrupciones del servicio o fallos de escritura.

#### Monitorizar tus logs
- **Picos de error**: alerta cuando los logs de errores superan un umbral, como los mensajes repetidos `connection refused` o `timeout` en un período corto.
- **Actividad ausente**: detecta cuando dejan de aparecer los logs esperados, indicando un proceso estancado o un servicio fallido.

### Crear tu monitor

[Crea y configura tu monitor][5] dentro de tu organización de desarrolladores asociados. Estos monitores sirven como plantillas reutilizables que los usuarios de integración pueden habilitar directamente en sus propias organizaciones de Datadog.

### Testear tu monitor

1. Ingiere telemetría que activa tu monitor.
2. Navega hasta la página [Lista de monitor][7] y selecciona tu monitor.
3. Confirma que tu monitor se activa según lo esperado. Utiliza [Eventos de estado][8] para ver cuándo se activó tu monitor y revisar los detalles de cada evento.

## Añadir tu monitor a tu integración
Una vez que hayas creado y testeado tu monitor, añádelo a tu lista en la Plataforma para desarrolladores. Cuando se publique tu integración, el monitor se convertirá en una plantilla de búsqueda vinculada a tu integración. 

{{< img src="developers/integrations/content_tab.png" alt="La pestaña Contenido en la plataforma para desarrolladores de integración" style="width:100%;" >}}

1. En la Plataforma para desarrolladores, ve a la pestaña **Content** (Contenido).
2. Haz clic en **Import Monitor** (Importar monitor).
3. Busca y selecciona el monitor que has creado. Puedes incluir hasta 10 monitores por integración.
4. Para cada monitor, proporciona un **Nombre** y una **Descripción**. Estos aparecen en la página [**Monitores > Plantillas**][2].
    - **Nombre**: un título conciso que comunique claramente de qué trata la alerta. Utiliza la voz activa (por ejemplo, `Database latency exceeds threshold`).
    - **Descripción**: una breve explicación que ayuda a los usuarios a decidir si el monitor es relevante para ellos. Describe por qué es importante esta alerta y qué impacto tiene.
5. Haz clic en **Import** (Importar) y, a continuación, en **Save Changes** (Guardar cambios).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/
[2]: https://app.datadoghq.com/monitors/templates
[3]: /es/developers/integrations/?tab=integrations#join-the-datadog-partner-network
[4]: /es/developers/integrations/build_integration/#create-a-listing
[5]: /es/getting_started/monitors/#create-a-monitor
[6]: /es/monitors/types/
[7]: https://app.datadoghq.com/monitors/manage
[8]: /es/monitors/status/events/