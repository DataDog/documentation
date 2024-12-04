---
algolia:
  tags:
  - flujo de trabajo
  - flujos de trabajo
  - automatización del flujo de trabajo
aliases:
- /es/flujos de trabajo/conexiones
- /es/flujos de trabajo/configuración
description: Conexiones de flujo de trabajo
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Empezando con Workflow Automation
title: Conexiones
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation no es compatible con el sitio <a href="/getting_started/site">Datadog seleccionado</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Dado que las acciones de flujo de trabajo se conectan con sistemas de software externos, es posible que tengas que autenticar tu cuenta Datadog en la integración correspondiente. Un flujo de trabajo solo puede ejecutarse correctamente si todas las acciones de flujo de trabajo que requieren autenticación pueden verificar la identidad de tu cuenta Datadog. Cuando concedas permisos a Datadog, asegúrate de seguir las mejores prácticas de seguridad y de conceder únicamente los permisos necesarios para que se ejecute un flujo de trabajo.

Las acciones de flujo de trabajo pueden autenticarse de dos maneras:
- Credenciales y permisos configurados en el cuadro de integración
- Credenciales de conexión

## Credenciales de cuadro de integración

Las credenciales y la autenticación de cuenta que configures en los siguientes cuadros de integración Datadog se propagan automáticamente a las acciones correspondientes en Workflow Automation:
- Jira
- Buscapersonas
- Slack
- GitHub

Configurar los cuadros de integración siguiendo las instrucciones de [Datadog Integrations, integraciones Datadog][6].

Si la integración que necesitas configurar no aparece en la lista anterior, configura las credenciales de conexión.

## Credenciales de conexión

Las conexiones de flujo de trabajo amplían sus integraciones instaladas para ofrecerte control sobre la autenticación de los pasos del flujo de trabajo. Utiliza las credenciales de conexión para autenticar una [generic action (acción genérica)][8] o cualquier acción para la que el cuadro de integración no ofrezca autenticación. Para una lista de integraciones que utilizan el cuadro de integración para la autenticación, consulta la sección [Integration tile credentials (credenciales del cuadro de integración)](#integration-tile-credentials). Las credenciales de conexión solo están disponibles para su uso dentro del producto Workflow Automation.

Las conexiones admiten los siguientes ejemplos de casos de uso:
- La integración que necesitas no está disponible como conexión integrada.
- Deseas autenticar una acción personalizada. Por ejemplo, necesitas utilizar la acción HTTP con tu propio servicio.
- Los permisos necesarios no son compatibles con la integración, como los permisos de escritura en AWS.
- Deseas un control de acceso granular, por ejemplo, restringiendo el acceso de los usuarios a determinados flujos de trabajo.

### Consideraciones sobre la seguridad de la conexión

Antes de crear una conexión, piensa en los permisos necesarios para cumplir la tarea requerida y concede a la conexión solo los permisos necesarios para cumplir esa tarea. Además, la conexión debe estar restringida únicamente a las personas que necesiten utilizarla.

Siempre que sea posible, utiliza conexiones granulares para diferentes flujos de trabajo. Por ejemplo, si tienes un flujo de trabajo que escribe en un bucket de Amazon S3 y un flujo de trabajo que termina instancias de Amazon EC2, no utilices la misma conexión para ambos flujos de trabajo. En su lugar, crea dos conexiones respectivas, cada una correspondiente a un rol de IAM con contexto limitado.

## Trabajar con conexiones

### Ver conexiones

1. Desde la [Workflow Automation page (página de Workflow Automation)][2], haz clic en **Connections** (Conexiones) en la parte superior derecha. Se abre la ventana [connections list (lista de conexiones)][3].
1. Haz clic en una línea para ver los detalles de la conexión.

### Crear una conexión

Para establecer una conexión, se requiere la siguiente información:
- A qué conectarse (por ejemplo, nombre del producto, URL)
- Cómo autenticarse (por ejemplo, clave API, nombre de usuario/contraseña, oauth)

Para crear una conexión:
1. Navega hasta la [connections list (lista de conexiones)][3].
1. Haz clic en el botón **New Connection** (Nueva conexión) situado en la parte superior derecha. Aparece el cuadro de diálogo **New Connection** (Nueva conexión).
1. Haz clic en un icono para elegir un esquema integración.
1. Rellena los campos correspondientes. Haz clic en **Create** (Crear).

También puedes añadir una conexión desde la página de flujo de trabajo:
1. Ve a [Workflow Automation list (lista de Workflow Automation)][9].
1. Selecciona el flujo de trabajo que contiene la acción a la que necesitas añadir una credencial. Aparecerá el generador de flujos de trabajo.
1. En la visualización del flujo de trabajo, haz clic en la acción a la que necesitas añadir una credencial. El panel de la derecha se rellena con los detalles de la acción.
1. En la pestaña **Configure** (Configurar), busca el menú desplegable **Connection** (Conexión) y haz clic en el icono **+**.
1. En el cuadro de diálogo **New Connection** (Nueva conexión), asigna un nombre a la conexión e introduce los datos de autenticación necesarios.
1. Haz clic en **Save** (Guardar).

El siguiente ejemplo muestra el cuadro de diálogo **New Connection** (Nueva conexión) para la conexión OpenAI. Cada conexión requiere una información de autenticación diferente. La conexión OpenAI requiere un Nombre de conexión y un token de API válidos.

{{< img src="service_management/workflows/new-connection2.png" alt="Cuadro de diálogo Nueva conexión para la conexión OpenAI" >}}

### Editar una conexión

1. Navega hasta la [connections list (lista de conexiones)][3].
1. Pasa el cursor sobre la conexión que deseas editar. Los iconos **Edit** (Editar), **Permissions** (Permisos) y **Delete** (Eliminar) aparecen a la derecha.
1. Haz clic en el icono del lápiz (**Edit**). Aparecerá un cuadro de diálogo.
1. Actualiza los campos que deseas modificar.
1. Haz clic en **Save** (Guardar).

### Eliminar una conexión

1. Navega hasta la [connections list (lista de conexiones)][3].
1. Pasa el cursor sobre la conexión que deseas eliminar. A la derecha aparecen los iconos **Editar**, **Permisos** y **Eliminar**.
1. Haz clic en el icono de la papelera (**Eliminar**). Aparecerá el texto "¿Estás seguro?".
1. Selecciona **Eliminar**.

### Restringir el uso de la conexión

Para saber cómo restringir el uso de la conexión, consulta [Access and Authentication (Acceso y autenticación)][4].

## Conexión HTTP

Para conectarte a una dirección servicio arbitraria, utiliza el tipo de conexión HTTP. Para conocer las opciones de autenticación y las instrucciones de configuración, consulta [HTTP action (acción HTTP)][10].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/workflows/actions_catalog/generic_actions/
[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[4]: /es/service_management/workflows/access/#restrict-connection-use
[6]: /es/integrations/
[8]: /es/service_management/workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow
[10]: /es/service_management/workflows/actions/http/