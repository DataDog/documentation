---
aliases:
- /es/workflows/connections
- /es/workflows/setup
- /es/service_management/workflows/connections
- /es/service_management/app_builder/connections
description: Conexiones para acciones
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Introducción a Workflow Automation
- link: /actions/app_builder/
  tag: Documentación
  text: Documentación de App Builder
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: Centro de aprendizaje
  text: Automatización de acciones significativas con Datadog Workflow Automation
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centro de aprendizaje
  text: Cree aplicaciones de autoservicio con App Builder para Third-Party Integrations
title: Conexiones
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Las acciones, los flujos de trabajo y las aplicaciones pueden usar conexiones que envían datos del cliente a servicios de terceros fuera de la región de Datadog for Government. Consulte el <a href="https://trust.datadoghq.com">Trust Center</a> para obtener instrucciones para obtener la matriz de responsabilidad del cliente e información adicional sobre la región de Datadog for Government.</div>
{{< /site-region >}}

Debido a que las acciones se conectan con sistemas de software externos, es posible que deba autenticar su cuenta de Datadog en la integración correspondiente. Una aplicación o un flujo de trabajo solo puede ejecutarse correctamente si cada acción que requiere autenticación puede verificar la identidad de su cuenta de Datadog. Al otorgar permisos a Datadog, asegúrese de seguir las mejores prácticas de seguridad y de otorgar solo los permisos necesarios para que una aplicación o un flujo de trabajo se ejecute.

Las acciones se pueden autenticar de dos maneras:
- Credenciales y permisos configurados en el mosaico de integración
- Credenciales de conexión

## Credenciales del mosaico de integración {#integration-tile-credentials}

Las credenciales y la autenticación de cuenta que configure en los siguientes mosaicos de integración de Datadog se propagan automáticamente a las acciones correspondientes en flujos de trabajo o aplicaciones:

- GitHub
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- Slack
- Statuspage

Configure los mosaicos de integración siguiendo las instrucciones en [Datadog Integrations][6].

Si la integración que necesita configurar no aparece en la lista anterior, configure las credenciales de conexión.

## Credenciales de conexión {#connection-credentials}

Las conexiones amplían sus integraciones instaladas para darle control sobre la autenticación de los pasos del flujo de trabajo. Utilice las credenciales de conexión para autenticar una [generic action][8] o cualquier acción para la cual el mosaico de integración no ofrezca autenticación. Para obtener una lista de las integraciones que utilizan el mosaico de integración para la autenticación, consulte la sección [Credenciales del mosaico de integración](#integration-tile-credentials). Las credenciales de conexión solo están disponibles para su uso dentro de los productos Workflow Automation y App Builder.

Las conexiones admiten los siguientes casos de uso de ejemplo:
- La integración que necesita no está disponible como una conexión integrada.
- Desea autenticar una acción personalizada. Por ejemplo, necesita utilizar la acción HTTP con su propio servicio.
- Los permisos necesarios no son compatibles con la integración, como los permisos de escritura en AWS.
- Desea un control de acceso granular, por ejemplo, restringir el acceso de los usuarios a ciertos flujos de trabajo.

### Consideraciones de seguridad de la conexión {#connection-security-considerations}

Antes de crear una conexión, piense en los permisos necesarios para completar la tarea requerida y otorgue a la conexión solo los permisos necesarios para completar dicha tarea. Además, la conexión debe restringirse solo a las personas que necesiten utilizarla.

Siempre que sea posible, utilice conexiones granulares para diferentes flujos de trabajo o aplicaciones. Por ejemplo, si tiene un flujo de trabajo que escribe en un bucket de Amazon S3 y una aplicación que termina instancias de Amazon EC2, no utilice la misma conexión para ambos. En su lugar, cree dos conexiones respectivas, cada una correspondiente a un rol de IAM con contexto limitado.

## Trabajar con conexiones {#work-with-connections}

### Visualizar conexiones {#view-connections}

1. Desde la [Workflow Automation page][2] o la [App Builder page][14], haga clic en la pestaña {{< ui >}}Connections{{< /ui >}}. Se abre la lista de conexiones.
1. Haga clic en una sola línea para visualizar los detalles de la conexión.

### Crear una conexión {#create-a-connection}

Establecer una conexión requiere la siguiente información:
- A qué conectarse (por ejemplo, nombre del producto, URL)
- Cómo autenticarse (por ejemplo, clave de API, nombre de usuario/contraseña, oauth)

Para crear una conexión:
1. Desde la [Workflow Automation page][2] o la [App Builder page][14], haga clic en la pestaña {{< ui >}}Connections{{< /ui >}}. Se abre la lista de conexiones.
1. Haga clic en el botón {{< ui >}}New Connection{{< /ui >}} en la parte superior derecha. Aparece el cuadro de diálogo {{< ui >}}New Connection{{< /ui >}}.
1. Haga clic en un icono para elegir un esquema de integración.
1. Complete los campos correspondientes. <div class="alert alert-info">Si desea agregar la conexión a un grupo de conexiones en el futuro, añada una o más [etiquetas de identificador](#connection-identifier-tags).</div>
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

Alternativamente, agregue una conexión desde una página de flujo de trabajo o aplicación:


{{< tabs >}}
{{% tab "Workflow Automation" %}}
1. Vaya a la [lista de Workflow Automation][1].
1. Seleccione el flujo de trabajo que contiene la acción a la que necesita agregar una credencial. Aparece el generador de flujos de trabajo.
1. En la visualización del flujo de trabajo, haga clic en la acción a la que necesita agregar una credencial. El panel lateral derecho se completa con los detalles de la acción.
1. Debajo de la pestaña {{< ui >}}Configure{{< /ui >}}, busque el menú desplegable {{< ui >}}Connection{{< /ui >}} y haga clic en el icono {{< ui >}}\+{{< /ui >}}.
1. En el cuadro de diálogo {{< ui >}}New Connection{{< /ui >}}, asigne un nombre a la conexión e ingrese los detalles de autenticación requeridos.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/workflow
{{% /tab %}}

{{% tab "App Builder" %}}
1. Vaya a la [lista de aplicaciones de App Builder][1].
1. Seleccione la aplicación que contiene la acción a la que necesita agregar una credencial. Aparece el lienzo de la aplicación.
1. Haga clic en {{< ui >}}Edit{{< /ui >}} en la parte superior derecha.
1. En {{< ui >}}Data{{< /ui >}} en el lado izquierdo, haga clic en la acción a la que necesita agregar una credencial. El panel lateral izquierdo se completa con los detalles de la acción.
1. Busque el menú desplegable {{< ui >}}Connection{{< /ui >}} y haga clic en el icono {{< ui >}}\+{{< /ui >}}.
1. En el cuadro de diálogo {{< ui >}}New Connection{{< /ui >}}, asigne un nombre a la conexión e ingrese los detalles de autenticación requeridos.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/app-builder
{{% /tab %}}
{{< /tabs >}}

El ejemplo a continuación muestra el cuadro de diálogo {{< ui >}}New Connection{{< /ui >}} para la conexión de OpenAI. Cada conexión requiere información de autenticación diferente. La conexión de OpenAI requiere un Nombre de conexión y un Token de API válidos.

{{< img src="actions/connections/new-connection-2.png" alt="El cuadro de diálogo Nueva conexión para la conexión de OpenAI" >}}

### Editar una conexión {#edit-a-connection}

1. Desde la [Workflow Automation page][2] o la [App Builder page][14], haga clic en la pestaña {{< ui >}}Connections{{< /ui >}}. Se abre la lista de conexiones.
1. Coloque el cursor sobre la conexión que desea editar. Los iconos {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}} y {{< ui >}}Delete{{< /ui >}} aparecen a la derecha.
1. Haga clic en el icono de lápiz ({{< ui >}}Edit{{< /ui >}}). Aparece un cuadro de diálogo.
1. Actualice los campos que desea cambiar.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Eliminar una conexión {#delete-a-connection}

1. Vaya a la [lista de conexiones][3].
1. Coloque el cursor sobre la conexión que desea eliminar. Aparecerán los iconos {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}} y {{< ui >}}Delete{{< /ui >}} a la derecha.
1. Haga clic en el icono de la papelera ({{< ui >}}Delete{{< /ui >}}). "¿Está seguro?" aparece el texto.
1. Seleccione {{< ui >}}Delete{{< /ui >}}.

### Restringir el uso de la conexión {#restrict-connection-use}

Para saber cómo restringir el uso de la conexión, consulte Acceso y autenticación para [Workflow Automation][12] o [App Builder][15].

## Conexión HTTP {#http-connection}

Para conectarse a un servicio arbitrario, utilice el tipo de conexión HTTP. Para conocer las opciones de autenticación y las instrucciones de configuración, consulte la [acción HTTP][10].

## Etiquetas de identificador de conexión {#connection-identifier-tags}

Puede agregar etiquetas de identificador a las conexiones. Las reglas de etiquetado para las conexiones se basan en [etiquetas de Datadog][13], con los siguientes requisitos adicionales:
- Las etiquetas de identificador deben seguir el formato `tag:value`, y no se permiten dos puntos adicionales. Por ejemplo, las etiquetas de identificador `env:staging:east` y `env` son formatos no válidos para las etiquetas de conexión.
- Las etiquetas de identificador deben comenzar con una letra, después de lo cual pueden contener:
    - Alfanuméricos
    - Guiones bajos
    - Guiones
    - Barras
    - Exactamente un dos puntos
- `default` es un valor reservado para las etiquetas de identificador de conexión. No se puede utilizar como clave de etiqueta independiente ni como valor de etiqueta. Por ejemplo, `default:yes` y `aws:default` no son válidos para las etiquetas de conexión.

## Grupos de conexión {#connection-groups}

Puede crear grupos de conexiones para que sus flujos de trabajo y aplicaciones puedan autenticarse en la cuenta o cuentas correctas según las entradas proporcionadas. Las conexiones solo se pueden agrupar si comparten la misma integración (por ejemplo, no puede agrupar conexiones de GCP y AWS dentro del mismo grupo).

Usted define los miembros de un grupo de conexión utilizando las _etiquetas de identificador_ de una conexión. Por ejemplo, puede crear un grupo de conexión que consista en cuentas de AWS que tengan la etiqueta `account_id`.

Cada conexión en el grupo debe tener un conjunto de etiquetas de identificador únicas para que un flujo de trabajo pueda seleccionar dinámicamente la conexión correcta en tiempo de ejecución. Por ejemplo:
- `connectionA {account_id:123456789}` y `connectionB {account_id:987654321}` se pueden agrupar.
- `connectionA {account_id:123456789}` y `connectionC {account_id:123456789}` no se pueden agrupar, porque el grupo contendría valores de etiqueta duplicados.

### Crear un grupo de conexión {#create-a-connection-group}

<div class="alert alert-info">Solo puede agregar conexiones a un grupo si tiene <a href="/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection">permiso de resolver</a> para ellas.</div>

Para crear un grupo de conexión:

1. Vaya a la [lista de conexiones][3].
1. A la izquierda, haga clic en {{< ui >}}Groups{{< /ui >}}.
1. Haga clic en {{< ui >}}+ New Group{{< /ui >}} y luego seleccione una integración.
1. Ingrese un nombre de grupo y luego ingrese un conjunto de hasta tres {{< ui >}}Identifier Tags{{< /ui >}} que tengan todas las conexiones que desea incluir en su grupo.
1. En {{< ui >}}Confirm Group{{< /ui >}}, use las casillas de verificación para seleccionar los miembros específicos de su grupo.
1. Haga clic en {{< ui >}}Next, Confirm Access{{< /ui >}} y luego elija el nivel de acceso deseado para el grupo.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Usar un grupo de conexión {#use-a-connection-group}

Para usar un grupo de conexión:

1. En su flujo de trabajo o aplicación, seleccione una acción que requiera una conexión.
1. En el campo {{< ui >}}Connection{{< /ui >}}, en el menú desplegable, seleccione el grupo de conexión deseado en {{< ui >}}Groups{{< /ui >}}.
1. Complete los valores deseados para el grupo de conexión {{< ui >}}Identifiers{{< /ui >}}. Por ejemplo, si su grupo de conexión está definido usando la Etiqueta de identificador `env`, y tiene dos entornos, `prod` y `staging`, podría usar cualquiera de esos valores (o una expresión que se evalúe como uno de esos valores).
1. Ingrese cualquier otro valor de paso requerido, luego haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota**: Solo puede usar conexiones dentro de un grupo si tiene [permiso de resolver][12] para esas conexiones. Si un flujo de trabajo o una aplicación intenta usar una conexión para la que no tiene permiso de resolver, falla con un error `403 Forbidden`. Para solucionar este problema, puede:
- Configure el flujo de trabajo o la aplicación para que no pueda apuntar a una conexión que no tenga permiso de resolver.
- Elimine del grupo de conexión la conexión que no tenga permiso de resolver. <div class="alert alert-warning">Si está utilizando un grupo de conexión para varios flujos de trabajo o varias aplicaciones, eliminar una conexión de la que depende otro flujo de trabajo hará que ese flujo de trabajo falle.</div>

### Actualizar un grupo de conexión {#update-a-connection-group}

Si tiene acceso de edición a un grupo de conexión, puede actualizar los siguientes atributos:
- Nombre del grupo
- Etiquetas de identificador (estas nunca pueden estar vacías, pero pueden reemplazarse por completo)
- Conexiones (un grupo puede estar vacío)

### Eliminar un grupo de conexión {#delete-a-connection-group}

Para eliminar un grupo de conexión:

1. Pase el cursor sobre el grupo que desea eliminar y haga clic en el icono {{< ui >}}delete (trash can){{< /ui >}}.
1. Haga clic en {{< ui >}}Delete{{< /ui >}}.

<div class="alert alert-danger">Eliminar un grupo de conexión afecta a cualquier flujo de trabajo y aplicación que esté utilizando ese grupo.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** o **#app-builder** en el [Datadog Community Slack][11].

[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[6]: /es/integrations/
[8]: /es/actions/workflows/actions/
[9]: https://app.datadoghq.com/workflow
[10]: /es/actions/connections/http/
[11]: https://chat.datadoghq.com/
[12]: /es/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[13]: /es/getting_started/tagging/
[14]: https://app.datadoghq.com/app-builder/
[15]: /es/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection