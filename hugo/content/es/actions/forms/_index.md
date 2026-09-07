---
description: Cree formularios para recopilar información, analizar respuestas y activar
  automatizaciones.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Convierta los comentarios en acciones en toda su organización de ingeniería
    con Datadog Forms
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: Blog
  text: Convierta los comentarios de los desarrolladores en información operativa
    con Datadog Forms y Sheets
title: Forms
---
## Descripción general {#overview}

Datadog Forms le permite recopilar información, analizar respuestas y activar automatizaciones en Datadog. Forms y sus respuestas se pueden compartir en toda su organización, lo que le permite recopilar y analizar datos con su equipo.

Algunas formas en las que puede usar los formularios:
- Cree servicios a partir de plantillas predefinidas.
- Encueste la opinión de ingeniería en un portal interno para desarrolladores (IDP).
- Cree solicitudes de servicio y [elementos de trabajo][1] para equipos de seguridad, plataforma o TI directamente desde las respuestas de los formularios de los empleados.

## Cree un formulario {#create-a-form}

En la página [Forms][2], haga clic en {{< ui >}}New Form{{< /ui >}} y luego seleccione un método de creación:

{{< tabs >}}
{{% tab "Cree con IA" %}}
1. Seleccione {{< ui >}}Create with AI{{< /ui >}} y haga clic en {{< ui >}}Continue{{< /ui >}}. El editor de formularios se abre con [Bits Chat][100].
1. Describa el formulario que desea crear en el panel de Bits Chat.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} o {{< ui >}}Publish Changes{{< /ui >}} para que el formulario esté disponible para los encuestados.

También puede pedirle a Bits Chat que cree un formulario desde cualquier lugar en Datadog, no solo desde el editor de Formularios. Consulte [Create and manage Forms with MCP](#create-and-manage-forms-with-mcp).

[100]: /es/bits_ai/bits_chat/

{{% /tab %}}

{{% tab "Blank form" %}}
1. Seleccione {{< ui >}}Start with a blank form{{< /ui >}} y haga clic en {{< ui >}}Continue{{< /ui >}}.
1. Asigne un nombre a su formulario y, opcionalmente, agregue una descripción y un color de tema. Haga clic en {{< ui >}}Continue{{< /ui >}}.
1. Para agregar un componente, haga clic en {{< ui >}}Add Component{{< /ui >}}, o en el panel {{< ui >}}Fields{{< /ui >}}, haga clic en el icono de más **+** Consulte [Componentes de formulario][3] para obtener la lista completa de tipos de componentes y sus opciones.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} o {{< ui >}}Publish Changes{{< /ui >}} para que el formulario esté disponible para los encuestados.

[3]: /es/actions/forms/components/

{{% /tab %}}

{{% tab "Planilla" %}}
Blueprints son formularios iniciales para casos de uso comunes, precargados con preguntas de muestra. Algunos Blueprints incluyen una automatización preconfigurada. Los Blueprints disponibles incluyen Encuesta de experiencia del desarrollador, Comentarios de IDP, Solicitud de servicio de gestión de trabajo, Informar un incidente, Informe de errores, Escalada de On-Call, Revisión posterior al incidente y más.

1. Seleccione {{< ui >}}Create from blueprint{{< /ui >}} y explore las plantillas disponibles.
1. Seleccione un Blueprint y haga clic en {{< ui >}}Continue{{< /ui >}}.
1. Asigne un nombre a su formulario y, opcionalmente, agregue una descripción y un color de tema. Haga clic en {{< ui >}}Continue{{< /ui >}}.
1. Para personalizar aún más su formulario, consulte [Componentes de formulario][3].
1. Haga clic en {{< ui >}}Publish{{< /ui >}} o {{< ui >}}Publish Changes{{< /ui >}} para que el formulario esté disponible para los encuestados.


[3]: /es/actions/forms/components/
{{% /tab %}}

{{% tab "Import" %}}
Puede importar un formulario existente desde un archivo PDF o JSON.

1. Seleccione {{< ui >}}Import a form{{< /ui >}}. Se abre un cuadro de diálogo de importación.
1. Elija una fuente y siga las instrucciones.
1. Asigne un nombre a su formulario y, opcionalmente, agregue una descripción y un color de tema. Haga clic en {{< ui >}}Continue{{< /ui >}}.
1. Para personalizar aún más su formulario, consulte [Componentes de formulario][3].
1. Haga clic en {{< ui >}}Publish{{< /ui >}} o {{< ui >}}Publish Changes{{< /ui >}} para que el formulario esté disponible para los encuestados.


[3]: /es/actions/forms/components/
{{% /tab %}}
{{< /tabs >}}

Para obtener una vista previa o compartir su formulario:
1. Haga clic en {{< ui >}}Preview{{< /ui >}} para ver el formulario tal como aparece para los encuestados.
1. Haga clic en {{< ui >}}Share{{< /ui >}} para copiar el enlace del formulario o configurar las opciones para compartir.

## Form settings {#form-settings}

Desde la página [Forms][2], haga clic en un formulario para abrirlo en el editor. En el encabezado del editor, haga clic en el icono de engranaje <i class="icon-cog-2"></i> para acceder a la siguiente configuración:

| Configuración | Descripción |
|---------|-------------|
| Accepting Responses | Configure el formulario como activo o inactivo. Cuando está inactivo, el formulario no acepta nuevas respuestas. También puede establecer una fecha de finalización para cerrar automáticamente el formulario en una fecha específica. Solo disponible para formularios publicados. |
| Anonymous Responses | Cuando está habilitado, los correos electrónicos de los encuestados no se almacenan. |
| Manage Permissions | Configure quién puede ver y editar el formulario, y quién puede ver las respuestas enviadas. Consulte [Manage access](#manage-access). |
| Clone Form | Cree una copia del formulario. |
| Import Form | Importe campos desde un archivo PDF o JSON al formulario actual. |
| Export Form (JSON) | Descargue el formulario como un archivo JSON. |

Para obtener más información sobre cómo administrar las respuestas, consulte [Form responses][4].

## Share a form {#share-a-form}

Para configurar el uso compartido de un formulario:
1. Desde la página [Forms][2], haga clic en un formulario.
1. Haga clic en {{< ui >}}Share{{< /ui >}}.

Están disponibles las siguientes opciones para compartir:

{{% collapse-content title="Share within Datadog" level="h3" expanded=false %}}
Comparta el formulario con los usuarios de su organización de Datadog.

En {{< ui >}}Add to Dashboard{{< /ui >}}, utilice el menú desplegable para agregar el formulario a un tablero existente o crear un tablero.

Habilite el interruptor {{< ui >}}Add to IDP Self-Service Actions{{< /ui >}} para mostrar el formulario en el catálogo de [Self-Service Actions][5]. Este es un lugar central donde los equipos de plataforma e infraestructura publican herramientas para que el resto de la organización las descubra y utilice.
{{% /collapse-content %}}

{{% collapse-content title="Compartir con usuarios externos" level="h3" expanded=false %}}
Comparta el formulario con usuarios fuera de su organización de Datadog. Puede configurar una fecha de vencimiento de acceso para cada opción de uso compartido y crear múltiples configuraciones de uso compartido con diferentes ajustes y fechas de vencimiento.

Las siguientes opciones están disponibles:

- **Specific individuals**: Agregue destinatarios por dirección de correo electrónico individual. Por ejemplo, `alice@example.com` y `bob@example.com`.
- **Company domain**: Comparta con cualquier persona en un dominio de correo electrónico específico. Por ejemplo, `*@yourcompany.com`.
- **Shareable link**: Genere un enlace que cualquier persona pueda usar para acceder al formulario sin una cuenta de Datadog.
{{% /collapse-content %}}

Para pausar o eliminar el uso compartido externo, haga clic en {{< ui >}}Share{{< /ui >}}, luego haga clic en {{< ui >}}Edit{{< /ui >}} y seleccione {{< ui >}}Pause Sharing{{< /ui >}} o {{< ui >}}Delete Sharing{{< /ui >}}.

Para rellenar previamente campos en un enlace compartido de modo que los encuestados comiencen con algunas respuestas completadas, consulte [Prefill form fields][15].

## Agregar un formulario a un tablero {#add-a-form-to-a-dashboard}

Para agregar un formulario a un tablero desde el editor de formularios:
1. Desde la página [Forms][2], haga clic en un formulario para abrirlo en el editor.
1. Haga clic en el dropdown {{< ui >}}Share{{< /ui >}} y seleccione {{< ui >}}Share within Datadog{{< /ui >}} .
1. En {{< ui >}}Add to Dashboard{{< /ui >}}, seleccione un tablero existente o cree uno, luego haga clic en {{< ui >}}Add{{< /ui >}}.

También puede agregar un formulario a un tablero directamente desde el tablero:
1. Navegue a un [dashboard][6].
1. Haga clic en **Add Widgets** para abrir el panel lateral.
1. Haga clic en la pestaña **Apps**.
1. Seleccione **Form Widget**.
1. Seleccione su formulario, luego haga clic en {{< ui >}}Save{{< /ui >}}.

## Add automation {#add-automation}

Después de crear un formulario, puede agregar una [acción][7] o un [workflow blueprint][8] que se active automáticamente cuando se envía un formulario.
1. Desde la página [Forms][2], haga clic en un formulario.
1. En la parte superior del formulario, seleccione {{< ui >}}Automation{{< /ui >}}.
1. Elija una acción o un blueprint.
1. La acción o el blueprint se abre en un lienzo de flujo de trabajo, donde puede [editarlo][9].
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

**Nota**: Las automatizaciones activadas por formularios aparecen en [Workflow Automation][10].

## Create and manage Forms with MCP {#create-and-manage-forms-with-mcp}

Conecte un agente de IA externo al [Datadog MCP Server][11] para crear, actualizar, publicar y leer formularios y sus respuestas. Habilite el conjunto de herramientas `forms` (o `all`) cuando se [conecte al Servidor MCP][12]. También puede pedirle a [Bits Chat][13] que cree un formulario desde cualquier lugar en Datadog. Consulte [Forms][14] en la referencia de herramientas de Datadog MCP Server para obtener la lista completa de herramientas disponibles.

## Manage access {#manage-access}

De forma predeterminada, solo el creador de un formulario puede acceder a él. Para cambiar los permisos de un formulario:
1. Desde la página [Forms][2], haga clic en un formulario para abrirlo en el editor.
1. En el encabezado del editor, haga clic en el icono de engranaje <i class="icon-cog-2"></i>.
1. Haga clic en {{< ui >}}Manage Permissions{{< /ui >}}. Se abre un modal con dos secciones:
   - **Acceso al formulario**: controla quién puede visualizar y editar el formulario.
   - **Acceso a las respuestas**: controla quién puede visualizar las respuestas enviadas. Esta sección solo está disponible después de que el formulario reciba su primera respuesta enviada.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/work_management/
[2]: https://app.datadoghq.com/forms
[3]: /es/actions/forms/components/
[4]: /es/actions/forms/responses/
[5]: /es/internal_developer_portal/self_service_actions/
[6]: /es/dashboards/
[7]: https://app.datadoghq.com/actions/action-catalog/
[8]: https://app.datadoghq.com/workflow/blueprints
[9]: /es/actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[10]: https://app.datadoghq.com/workflow
[11]: /es/mcp_server/
[12]: /es/mcp_server/setup/#toolsets
[13]: /es/bits_ai/bits_chat/
[14]: /es/mcp_server/tools/#forms
[15]: /es/actions/forms/guide/prefill/