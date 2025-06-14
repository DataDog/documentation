---
aliases:
- /es/flujos de trabajo/conexiones
- /es/flujos de trabajo/configuración
- /es/service_management/workflows/connections
- /es/service_management/app_builder/connections
description: Conexiones para acciones
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Empezando con la automatización de flujos de trabajo
- link: /service_management/app_builder/
  tag: Documentación
  text: Documentación de App Builder
title: Conexiones
---

Dado que las acciones se conectan con sistemas de software externos, es posible que debas autenticar tu cuenta de Datadog en la integración correspondiente. Una aplicación o flujo de trabajo sólo puede ejecutarse correctamente si todas las acciones que requieren autenticación pueden verificar la identidad de tu cuenta de Datadog. Cuando concedas permisos a Datadog, asegúrate de que sigues las prácticas recomendadas de seguridad y de que sólo concedes los permisos necesarios para que se ejecute una aplicación o un flujo de trabajo.

Las acciones pueden autenticarse de dos maneras:
- Credenciales y permisos configurados en el cuadro de integración 
- Credenciales de conexión

## Credenciales del cuadro de integración

Las credenciales y la autenticación de cuenta que configures en el cuadro de integración de Datadog se propagan automáticamente a las acciones correspondientes en flujos de trabajo o aplicaciones:

- GitHub
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- Slack
- Página de estado

Configura los cuadros de integración siguiendo las instrucciones de [integraciones de Datadog][6].

Si la integración que necesitas configurar no aparece en la lista anterior, configura las credenciales de conexión.

## Credenciales de conexión

Las conexiones amplían tus integraciones instaladas para darte control sobre la autenticación de pasos del flujo de trabajo. Utiliza las credenciales de conexión para autenticar una [acción genérica][8] o cualquier acción para la que el cuadro de integración no ofrezca autenticación. Para una lista de las integraciones que utilizan el cuadro de integración para la autenticación, consulta la sección [credenciales del cuadro de integración](#integration-tile-credentials). Las credenciales de conexión sólo están disponibles para su uso en los productos de Workflow Automation y App Builder.

Las conexiones admiten los siguientes casos de uso de ejemplo:
- La integración que necesitas no está disponible como conexión incorporada.
- Deseas autenticar una acción personalizada. Por ejemplo, necesitas utilizar la acción HTTP con tu propio servicio.
- Los permisos necesarios no son compatibles con la integración, como los permisos de escritura en AWS.
- Deseas un control de acceso detallado, por ejemplo, restringir el acceso de los usuarios a determinados flujos de trabajo.

### Consideraciones sobre la seguridad de la conexión

Antes de crear una conexión, piensa en los permisos necesarios para realizar la tarea requerida y concede a la conexión sólo los permisos necesarios para realizar dicha tarea. Además, la conexión debe estar restringida sólo a las personas que necesiten utilizarla.

Siempre que sea posible, utiliza conexiones detalladas para diferentes flujos de trabajo o aplicaciones. Por ejemplo, si tienes un flujo de trabajo que escribe en un bucket de Amazon S3 y una aplicación que finaliza instancias de Amazon EC2, no utilices la misma conexión para ambos. En su lugar, crea dos conexiones respectivas, cada una correspondiente a un rol de IAM con contexto limitado.

## Trabajar con conexiones

### Ver conexiones

1. En la [página de Workflow Automation][2] o en la [página de App Builder][14], haz clic en la pestaña **Connections** (Conexiones). Se abre la lista de conexiones.
1. Haga clic en una línea para ver los detalles de la conexión.

### Crear una conexión

Establecer una conexión requiere la siguiente información
- A qué conectarse (por ejemplo, nombre del producto, URL)
- Cómo autenticarse (por ejemplo, clave API, nombre de usuario/contraseña, oauth)

Para crear una conexión
1. En la [página de Workflow Automation][2] o en la [página de App Builder][14], haz clic en la pestaña **Connections** (Conexiones). Se abre la lista de conexiones.
1. Haz clic en el botón **New connection** (Nueva conexión) situado en la parte superior derecha. Aparecerá el cuadro de diálogo **New connection** (Nueva conexión).
1. Haz clic en un icono para elegir un esquema de integración.
1. 2. Rellena los campos correspondientes. <div class="alert alert-info">Si deseas añadir la conexión a un grupo de conexiones en el futuro, añade uno o más [etiquetas de identificador](#connection-identifier-tags).</div>
1. Haz clic en **Create** (Crear).

También puedes añadir una conexión desde un flujo de trabajo o una página de aplicación:


{{< tabs >}}
{{% tab "Workflow Automation" %}}
1. Navega hasta la [lista de Workflow Automation][1].
1. Selecciona el flujo de trabajo que contiene la acción a la que necesitas añadir una credencial. Aparecerá el generador de flujos de trabajo.
1. En la visualización del flujo de trabajo, haz clic en la acción a la que necesitas añadir una credencial. El panel de la derecha se rellena con los detalles de la acción.
1. En la pestaña **Configure** (Configurar), busca el menú desplegable **Connection** (Conexión) y haz clic en el icono **+**.
1. En el cuadro de diálogo **New connection** (Nueva conexión), asigna un nombre a la conexión e introduce los detalles de autenticación necesarios.
1. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/workflow
{{% /tab %}}

{{% tab "App Builder" %}}
1. Navega hasta la [lista de aplicaciones de App Builder][1].
1. Selecciona la aplicación que contiene la acción a la que necesitas añadir una credencial. Aparecerá el lienzo de la aplicación.
1. Haz clic en **Edit** (Editar) en la parte superior derecha.
1. En **Data** (Datos), en el lado izquierdo, haz clic en la acción a la que necesitas añadir una credencial. El panel lateral izquierdo se rellena con los detalles de la acción.
1. Busca el menú desplegable **Connection** (Conexión) y haz clic en el icono **+**.
1. En el cuadro de diálogo **New connection** (Nueva conexión), asigna un nombre a la conexión e introduce los datos de autenticación necesarios.
1. 3. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/app-builder
{{% /tab %}}
{{< /tabs >}}

En el siguiente ejemplo, se muestra el cuadro de diálogo **New connection** (Nueva conexión) para la conexión OpenAI. Cada conexión requiere una información de autenticación diferente. La conexión OpenAI requiere un nombre de conexión y un token de API válidos.

{{< img src="service_management/new-connection-2.png" alt="El cuadro de diálogo Nueva conexión para la conexión OpenAI" >}}

### Editar una conexión

1. En la [página Workflow Automation][2] o en la [página de App Builder][14], haz clic en la pestaña **Connections** (Conexiones). Se abrirá la lista de conexiones.
1. Pasa el ratón por encima de la conexión que desees editar. Aparecerán a la derecha los iconos **Edit** (Editar), **Permissions** (Permisos) y **Delete** (Eliminar).
1. Haz clic en el icono del lápiz (**Edit** (Editar)). Aparece un cuadro de diálogo.
1. Actualiza los campos que desees modificar.
1. 2. Haz clic en **Save** (Guardar).

### Eliminar una conexión

1. Navega hasta la [lista de conexiones][3].
1. Pasa el ratón por encima de la conexión que desees editar. Aparecerán a la derecha los iconos **Edit** (Editar), **Permissions** (Permisos) y **Delete** (Eliminar).
1. Haz clic en el icono de la papelera (**Delete** (Eliminar)). Aparece el texto "¿Está seguro?"
1. Selecciona **Delete** (Eliminar).

### Restringir el uso de la conexión

Para saber cómo restringir el uso de la conexión, consulta Acceso y autenticación para [Workflow Automation][4] o [App Builder][15].

## Conexión HTTP

Para conectarte a un servicio arbitrario, utiliza el tipo de conexión HTTP. Para conocer las opciones de autenticación y las instrucciones de configuración, consulta la [Acción HTTP][10].

## Etiquetas de identificador de conexión

Puedes añadir etiquetas de identificador a las conexiones. Las reglas de etiquetado para las conexiones se basan en [etiquetas de Datadog][13], con los siguientes requisitos adicionales:
- Las etiquetas de identificador deben seguir el formato `tag:value`, y no se permiten dos puntos adicionales. Por ejemplo, las etiquetas de identificador `env:staging:east` y `env` son formatos no válidos para las etiquetas de conexión.
- Las etiquetas de identificador deben empezar por una letra, tras la cual pueden incluirse
    - Caracteres alfanuméricos
    - Guiones bajos
    - Minúsculas
    - Barra oblicua
    - Exactamente dos puntos
- `default` es un valor reservado para las etiquetas de identificador de conexión. No puede utilizarse como clave independiente de etiqueta ni como valor de etiqueta. Por ejemplo, `default:yes` y `aws:default` no son válidas para las etiquetas de conexión.

## Grupos de conexión

<div class="alert alert-warning"><strong>Nota</strong>: Los grupos de conexión están disponibles en Workflow Automation. No están disponibles en App Builder.</div>

Puedes crear grupos de conexiones para que tus flujos de trabajo puedan autenticarse en la cuenta o cuentas correctas en función de las entradas dadas. Las conexiones solo pueden agruparse si comparten la misma integración (por ejemplo, no puedes agrupar conexiones de GCP y AWS en el mismo grupo). 

Los miembros de un grupo de conexiones se definen mediante las _Etiquetas de identificador_ de una conexión. Por ejemplo, puedes crear un grupo de conexión formado por cuentas de AWS que tengan la etiqueta `account_id`.

Cada conexión del grupo debe tener un conjunto de etiquetas de identificador única para que un flujo de trabajo pueda seleccionar dinámicamente la conexión correcta en el tiempo de ejecución. Por ejemplo:
- `connectionA {account_id:123456789}` y `connectionB {account_id:987654321}` pueden agruparse.
- `connectionA {account_id:123456789}` y `connectionC {account_id:123456789}` no pueden agruparse, porque el grupo contendría valores de etiqueta duplicados.

### Crear un grupo de conexión

<div class="alert alert-info"><strong>Nota</strong>: Sólo puedes añadir conexiones a un grupo si tienes <a href="/service_management/workflows/access/#restrict-access-on-a-specific-connection">permiso Resolver (Solucionador)</a> para ellas.</div>

Para crear un grupo de conexión:

1. Navega hasta la [connections list (lista de conexiones)][3].
1. A la izquierda, haz clic en **Groups** (Grupos).
1. Haz clic en **+ New Group** (+ Nuevo grupo) y selecciona una integración.
1. Introduce un nombre de grupo y, a continuación, introduce un conjunto de hasta tres **Etiquetas de identificador** que tengan todas las conexiones que desees incluir en tu grupo.
1. En **Confirm Group** (Confirmar grupo), utiliza las casillas de verificación para seleccionar los miembros específicos de tu grupo.
1. Haz clic en **Next, Confirm Access** (Siguiente, Confirmar acceso) y, a continuación, elige el nivel de acceso que desees para el grupo.
1. Haz clic en **Create** (Crear).

### Utilizar un grupo de conexión

Para utilizar un grupo de conexión:

1. En tu flujo de trabajo, selecciona una acción que requiera una conexión.
1. En el campo **Connection** (Conexión), en el menú desplegable, selecciona el grupo de conexión deseado en **Groups** (Grupos).
1. Introduce los valores deseados para los **Identificadores** del grupo de conexión. Por ejemplo, si tu grupo de conexión se define utilizando la etiqueta de identificador `env` y tienes dos entornos, `prod` y `staging`, podrías utilizar cualquiera de esos valores (o una expresión que evalúe uno de esos valores).
1. Rellena cualquier otro valor de paso necesario y, a continuación, haz clic en **Save** (Guardar) para guardar el flujo de trabajo.

**Nota**: Sólo puedes utilizar conexiones dentro de un grupo si tiene [permiso Resolver (Solucionador)][12] para esas conexiones. Si un flujo de trabajo intenta utilizar una conexión para la que no tienes permiso de Resolver (Solucionador), el flujo de trabajo falla con un error `403 Forbidden`. Para solucionar este problema, puedes:
- Configurar tu flujo de trabajo para que no pueda apuntar a una conexión para la que no tienes permiso de Resolver (Solucionador).
- Elimina del grupo de conexiones la conexión para la que no tienes permiso de Resolver (Solucionador). <div class="alert alert-danger"><strong>Nota</strong>: Si utilizas un grupo de conexiones para varios flujos de trabajo, la eliminación de una conexión de la que depende otro flujo de trabajo provoca el fallo de ese flujo de trabajo.</div>

### Actualizar un grupo de conexión

Si tienes acceso de edición a un grupo de conexión, puedes actualizar los siguientes atributos:
- Nombre del grupo
- Etiquetas de identificador (nunca pueden estar vacías, pero pueden sustituirse por completo)
- Conexiones (un grupo puede estar vacío)

### Eliminar un grupo de conexión

Para eliminar un grupo de conexión:

1. Pasa el ratón por encima del grupo que quieras eliminar y haz clic en el icono  **delete (trash can)** (eliminar (papelera)).
1. Haz clic en **Delete** (Borrar).

<div class="alert alert-warning"><strong>Nota</strong>: La eliminación de un grupo de conexiones afecta a todos los flujos de trabajo que utilizan ese grupo.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** o **#app-builder** en [Datadog Community Slack][11].

[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[4]: /es/service_management/workflows/access/#restrict-connection-use
[6]: /es/integrations/
[8]: /es/service_management/workflows/actions/
[9]: https://app.datadoghq.com/workflow
[10]: /es/actions/connections/http/
[11]: https://datadoghq.slack.com/
[12]: /es/service_management/workflows/access/#restrict-access-on-a-specific-connection
[13]: /es/getting_started/tagging/
[14]: https://app.datadoghq.com/app-builder/
[15]: /es/service_management/app_builder/auth/