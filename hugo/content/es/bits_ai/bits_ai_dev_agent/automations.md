---
description: Crea automatizaciones de Bits Code que ejecuten sesiones según un horario
  o en respuesta a señales de Datadog.
disable_toc: false
further_reading:
- link: /bits_ai/bits_ai_dev_agent/
  tag: Documentación
  text: Bits Code
title: Automatizaciones
---
## Resumen {#overview}
Crea una automatización para que Bits Code inicie una [sesión][1] cuando se active un disparador, como un nuevo hallazgo de Code Security o un horario recurrente, y luego entrega los resultados como una solicitud de extracción o notificación de Slack.

{{< img src="bits_ai/dev_agent/automations/list.png" alt="Bajo un título de 'Automatizar con Bits', una tabla con columnas como Nombre, Autor y Última Ejecución tiene cuatro filas." style="width:100%;" >}}

Con las automatizaciones de Bits Code, usted puede:

- Generar correcciones de código en un horario, sin iniciar cada sesión manualmente
- Hacer que Bits Code responda a señales de otros productos de Datadog, como una nueva Recomendación de APM, una prueba inestable o un hallazgo de Seguridad de Código
- Dirigir los cambios de código resultantes directamente a una solicitud de extracción o notificar a un equipo en Slack

## Requisitos previos {#prerequisites}
Para configurar una automatización de Bits Code, cada uno de los siguientes debe ser verdadero:
- Usted tiene el permiso de **Bits Code Write** (`bits_dev_write`) en Datadog.
- Usted ha completado la [configuración][2] de Bits Code.
- Si planea que sus automatizaciones [envíen notificaciones de Slack](#slack-message-output), ha configurado la [integración de Slack][4].

## Cree una automatización {#create-an-automation}
Usted puede [crear una automatización personalizada](#create-a-custom-automation), o [usar una plantilla de automatización proporcionada por Datadog](#create-an-automation-from-a-template).

{{< img src="bits_ai/dev_agent/automations/custom_prompt_creation_form.png" alt="Bajo un título de 'Automatizar con Bits', se muestra un formulario con campos como 'Prompt Personalizado' y 'Cada semana en'." style="width:100%;" >}}

Por defecto, las automatizaciones recién creadas tienen un estado **Activo**, y aparecen en la lista **Mis Automatizaciones**.

### Crea una automatización personalizada {#create-a-custom-automation}
Para crear una automatización personalizada de Bits Code:
1. En Datadog, navegue a **Bits AI** > **Bits Code** > [**Automatizaciones**][3].
1. Haga clic en **Nueva Automatización**.
1. En el campo **Nombre de la automatización**, ingrese un nombre descriptivo para la automatización.
1. En la sección **Disparador**, configure un [disparador](#triggers).
1. En la sección **Salida**, configure una o más [salidas](#outputs).
1. Haga clic en **Crear Automatización** o **Crear y ejecutar ahora**.

### Cree una automatización a partir de una plantilla {#create-an-automation-from-a-template}
Encuentre plantillas de automatización proporcionadas por Datadog en la sección **Plantillas de Automatización**. Estas pueden incluir:

- **Crear PRs basados en Recomendaciones de APM**: Genera solicitudes de extracción basadas en Recomendaciones de APM para un servicio específico.
- **Corregir errores frecuentes para un repositorio**: Utiliza el disparador [**Prompt Personalizado**](#custom-prompt-trigger) para instruir a Bits Code a escanear las últimas 24 horas de registros, encontrar el error más frecuente y abrir una solicitud de extracción con una solución.

Haga clic en una tarjeta de plantilla para ser llevado al nuevo formulario de automatización. Debe configurar una [salida](#outputs) antes de crear la automatización.

## Disparadores {#triggers}
Un disparador define cuándo se ejecuta una automatización y sobre qué actúa Bits Code. Un disparador se construye a partir de hasta tres componentes: 

- [Product finding](#product-finding-trigger): una señal desde dentro de Datadog, como un problema de Error Tracking
- [Prompt personalizado](#custom-prompt-trigger): una instrucción libre que le dice a Bits Code qué hacer contra un repositorio elegido.
- [Horario](#schedule-trigger): un intervalo de tiempo recurrente, como diario o en días específicos de la semana

Haga clic en **Agregar disparador** para añadir un componente. Puede combinar un Product finding con un horario, un Prompt Personalizado con un horario, o usar un Product finding por sí solo.

Para limitar cuántas sesiones de Bits Code puede crear la automatización en un período determinado (por ejemplo, `5 runs per Week`), haga clic en **Agregar desencadenador** > **Establecer máximo de ejecuciones**. Una ejecución de automatización puede producir más de una sesión. Utilice esta configuración para controlar el volumen de solicitudes de extracción o notificaciones que produce una automatización.

### Disparador de búsqueda de productos {#product-finding-trigger}
Un desencadenador de Product finding ejecuta la automatización en respuesta a nuevos problemas en otro producto de Datadog (por ejemplo, Error Tracking o Code Security). Puede usar un desencadenador de Product finding por sí solo, que ejecuta la automatización cada vez que hay un nuevo hallazgo, o con un [horario](#schedule-trigger) y una ventana de retroceso que defina (en el campo **Nuevos hallazgos dentro de**).

<div class="alert alert-info">Si bien es común usar un desencadenador de Product finding solo (para remediar inmediatamente nuevos hallazgos), acoplarlo con un horario y una ventana de retroceso le permite monitorear nuevos hallazgos solo durante ciertos momentos. Por ejemplo, si despliega semanalmente los miércoles, puede querer configurar un desencadenador de APM Recommendations para que se ejecute cada jueves, mirando hacia atrás 24 horas.</div>

Al configurar un desencadenador de Product finding, puede configurar filtros adicionales, que varían según el producto. Por ejemplo:
  - **Pruebas inestables** admite filtrado por **Repositorio**, **Rama** (por defecto a la rama predeterminada del repositorio), y **Estado**.
  - **Code Security (SAST)** admite filtrado por **Repositorio**, **Severidad**, **Regla para remediar**, y un interruptor para **Filtrar hallazgos identificados como falsos positivos por Bits AI**.

<div class="alert alert-warning">Cada hallazgo que activa una automatización está vinculado a una única sesión. No se pueden corregir múltiples hallazgos en una sola sesión o solicitud de extracción.</div>

### Desencadenador de Prompt personalizado {#custom-prompt-trigger}
Un Prompt personalizado le dice a Bits Code qué hacer cada vez que se ejecuta la automatización, en texto libre, contra un repositorio elegido. Utilice un Prompt personalizado para tareas de mantenimiento recurrentes que no estén vinculadas a una señal específica de Datadog, como actualizar dependencias o refrescar documentación.

### Desencadenador de horario{#schedule-trigger}
Un desencadenador de horario controla cuándo se ejecuta una automatización. Se puede usar en combinación con un [Product finding](#product-finding-trigger) o un [Prompt personalizado](#custom-prompt-trigger). Al establecer un horario, puede elegir entre:
  - **Cada…**: Elija un intervalo preestablecido (por ejemplo, `Every day at 09:00 am`).
  - **Horario Personalizado**: Elija días específicos de la semana y una hora del día (por ejemplo, `Mo, We, Fr at 03:00 pm`).

## Salidas {#outputs}
Una salida define lo que hace Bits Code después de que se completa una [sesión][1]. Una automatización puede tener una o más salidas, incluyendo [abrir una solicitud de extracción](#pull-request-output) y [generar una notificación de Slack](#slack-message-output).

### Salida de solicitud de extracción {#pull-request-output}
Puede configurar su automatización para:
- **Crear un PR**: Abrir una solicitud de extracción con los cambios propuestos
- **Borrador de un PR**: Abrir una solicitud de extracción en borrador con los cambios propuestos

Como autor de una automatización de Bits Code, usted es el autor de todas las solicitudes de extracción que genera.

### Salida de mensaje de Slack {#slack-message-output}
Puede configurar su automatización para enviar un mensaje de Slack resumiendo la [sesión][1] y los cambios de código. Si usa una salida de solicitud de extracción además de una salida de Slack, Bits Code incluye un enlace a la solicitud de extracción en el mensaje de Slack.

Cuando agrega una salida de mensaje de Slack, por defecto, Bits Code envía el mensaje al canal configurado para el servicio afectado en [Catálogo][5]. Puede establecer un canal de Slack de respaldo, que se utiliza cuando no se establece ningún canal en el Catálogo.

## Gestionar automatizaciones {#manage-automations}
En [**Automatizaciones**][3], visualice las automatizaciones que usted creó en la pestaña **Mis Automatizaciones**. Cambie a **Todas** para ver las automatizaciones creadas por cualquier persona en su organización.

Puede pausar o reanudar cualquier automatización, pero solo puede editar o eliminar las automatizaciones que creó.

## Lectura adicional {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_ai_dev_agent/#sessions
[2]: /es/bits_ai/bits_ai_dev_agent/setup/
[3]: https://app.datadoghq.com/code/automations
[4]: /es/integrations/slack/
[5]: /es/internal_developer_portal/catalog/