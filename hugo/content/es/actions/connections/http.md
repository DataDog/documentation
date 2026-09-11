---
aliases:
- /es/service_management/app_builder/http_request/
- /es/service_management/workflows/connections/http/
- /es/service_management/app_builder/connections/http_request/
description: Realice solicitudes HTTP personalizadas a puntos de conexión con autenticación,
  métodos, encabezados y manejo de respuestas configurables para flujos de trabajo
  y aplicaciones.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentación
  text: Obtenga más información sobre las credenciales de conexión
title: Solicitudes HTTP
---
Utilice la acción {{< ui >}}Make request{{< /ui >}} para realizar una solicitud personalizada a un punto de conexión HTTP. Puede controlar el método de solicitud y su contenido, cómo se autentica y procesa, y cómo debe responder a escenarios como certificados caducados o redirecciones. Si necesita agregar rangos de direcciones IP de Datadog a su lista de permitidos para que la acción HTTP funcione como se espera, utilice las IP enumeradas en el objeto `webhooks`. Consulte la [API de rangos de IP][1] para obtener más detalles.

Para agregar una solicitud HTTP:

{{< tabs >}}
{{% tab "Workflow Automation" %}}
- En un nuevo flujo de trabajo, haga clic en {{< ui >}}Add step{{< /ui >}} y busque `Make request`. Seleccione la acción {{< ui >}}Make request{{< /ui >}} para agregarla a su flujo de trabajo.
- En un flujo de trabajo existente, haga clic en {{< ui >}}+{{< /ui >}} y busque `Make request`. Seleccione la acción {{< ui >}}Make request{{< /ui >}} para agregarla a su flujo de trabajo.

Especifique el método de solicitud y cualquier [autenticación][1] necesaria. Lea las secciones a continuación para obtener más información sobre las opciones de configuración disponibles. Opcionalmente, la solicitud puede esperar a que se cumplan las condiciones que especifique en la sección {{< ui >}}Conditional wait{{< /ui >}} y reintentar en un intervalo determinado si la condición no se cumple.

[1]: /es/actions/workflows/access_and_auth/
{{% /tab %}}

{{% tab "App Builder" %}}
1. En su aplicación, en {{< ui >}}Data{{< /ui >}}, haga clic en {{< ui >}}+ New{{< /ui >}} y seleccione {{< ui >}}Query{{< /ui >}}
1. Busque `HTTP`, luego seleccione la acción {{< ui >}}Make request{{< /ui >}} para agregarla a su aplicación.

Especifique el método de solicitud y cualquier [autenticación][1] necesaria. Lea las secciones a continuación para obtener más información sobre las opciones de configuración disponibles.

[1]: /es/actions/app_builder/access_and_auth/
{{% /tab %}}
{{< /tabs >}}

## Autenticación {#authentication}

Si necesita autenticar su solicitud, utilice el {{< ui >}}Connection{{< /ui >}} de la acción para configurar el método de autenticación. Puede seleccionar una conexión preconfigurada del menú desplegable o crear una conexión.

### Crear una conexión de AWS {#create-an-aws-connection}

1. En la sección {{< ui >}}Connection{{< /ui >}}, haga clic en el icono de más ({{< ui >}}+{{< /ui >}}).
1. Seleccione {{< ui >}}AWS{{< /ui >}}.
1. Ingrese un {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Account ID{{< /ui >}} y {{< ui >}}AWS Role Name{{< /ui >}}.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Crear una conexión de Azure {#create-an-azure-connection}

1. En la sección {{< ui >}}Connection{{< /ui >}}, haga clic en el icono de más ({{< ui >}}+{{< /ui >}}).
1. Seleccione {{< ui >}}Azure{{< /ui >}}.
1. Ingrese un {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Tenant ID{{< /ui >}}, {{< ui >}}Client ID{{< /ui >}} y {{< ui >}}Client Secret{{< /ui >}}.
1. Opcionalmente, ingrese el {{< ui >}}Custom Scope{{< /ui >}} que se solicitará a Microsoft al adquirir un token de acceso OAuth 2.0. El contexto de un recurso se construye utilizando el URI del identificador para el recurso y `.default`, separados por una barra diagonal (`/`). Por ejemplo, `{identifierURI}/.default`. Para obtener más información, consulte [la documentación de Microsoft sobre el contexto .default][3].
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Crear una conexión de autenticación de token HTTP {#create-an-http-token-authentication-connection}

La conexión de autenticación de token utiliza un token de portador para autenticar la solicitud HTTP.

1. En la sección {{< ui >}}Connection{{< /ui >}}, haga clic en el icono de más ({{< ui >}}+{{< /ui >}}).
1. Seleccione {{< ui >}}HTTP{{< /ui >}}.
1. Ingrese un {{< ui >}}Connection Name{{< /ui >}}.
1. Ingrese el {{< ui >}}Base URL{{< /ui >}} para la autenticación.
1. En el menú desplegable {{< ui >}}Authentication Type{{< /ui >}}, seleccione {{< ui >}}Token Auth{{< /ui >}}.
1. Ingrese un {{< ui >}}Token Name{{< /ui >}} y {{< ui >}}Token Value{{< /ui >}}. Puede ingresar múltiples tokens. Para hacer referencia a su token en un encabezado, parámetro o en el cuerpo de la solicitud, use la sintaxis `{{ secretTokenName }}`.
1. Opcionalmente, agregue {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} y un {{< ui >}}Body{{< /ui >}} adicionales a su solicitud.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Cree una conexión de autenticación básica HTTP {#create-an-http-basic-authentication-connection}

La conexión de autenticación básica utiliza un encabezado de autorización con un nombre de usuario y una contraseña para autenticar la solicitud HTTP.

1. En la sección {{< ui >}}Connection{{< /ui >}}, haga clic en el icono de más ({{< ui >}}+{{< /ui >}}).
1. Seleccione {{< ui >}}HTTP{{< /ui >}}.
1. Ingrese un {{< ui >}}Connection Name{{< /ui >}}.
1. Ingrese el {{< ui >}}Base URL{{< /ui >}} para la autenticación.
1. En el menú desplegable {{< ui >}}Authentication Type{{< /ui >}}, seleccione {{< ui >}}Basic Auth{{< /ui >}}.
1. Ingrese un {{< ui >}}Username{{< /ui >}} y {{< ui >}}Password{{< /ui >}}. El encabezado de solicitud de autorización requerido se completa automáticamente usando su nombre de usuario y contraseña.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Cree una conexión de autenticación HTTP de 2 pasos {#create-a-2-step-http-authentication-connection}

La conexión HTTP de 2 pasos le permite realizar una solicitud preliminar para recuperar un token de acceso con el cual autenticar la solicitud HTTP. Esto es útil para autenticar aplicaciones de JSON Web Token (JWT) y OAuth.

1. En la sección {{< ui >}}Connection{{< /ui >}}, haga clic en el icono de más ({{< ui >}}+{{< /ui >}}).
1. Seleccione {{< ui >}}HTTP{{< /ui >}}.
1. Ingrese un {{< ui >}}Connection Name{{< /ui >}}.
1. Ingrese el {{< ui >}}Base URL{{< /ui >}} para la autenticación.
1. En el menú desplegable {{< ui >}}Authentication Type{{< /ui >}}, seleccione {{< ui >}}2 Step Auth{{< /ui >}}.

{{< tabs >}}
{{% tab "Autenticación de token" %}}
Configure la consulta de token de acceso preliminar:
1. En el menú desplegable {{< ui >}}Secret Type{{< /ui >}}, seleccione {{< ui >}}Token Auth{{< /ui >}}.
1. Ingrese un Nombre de token y un Valor de token
1. Ingrese el {{< ui >}}Request URL{{< /ui >}} y especifique el tipo de solicitud como {{< ui >}}GET{{< /ui >}} o {{< ui >}}POST{{< /ui >}}.
1. Opcionalmente, agregue {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} y un {{< ui >}}Body{{< /ui >}} adicionales a la solicitud.

Obtenga el token de acceso de la respuesta:
1. En {{< ui >}}Variable Path to Access Token{{< /ui >}}, ingrese la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve su token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como el cuerpo de la solicitud de acceso, use `body`. Si el token de acceso se devuelve en una propiedad llamada `token` de la respuesta `body`, use `body.token`. Las rutas distinguen entre mayúsculas y minúsculas.
1. Opcionalmente, ingrese un {{< ui >}}Refresh Interval{{< /ui >}}. Esta es la duración hasta que el token de acceso caduque, especificada en segundos. Cuando el token caduca, la conexión solicita automáticamente un nuevo token de acceso. Establecer un intervalo de `0` deshabilita la actualización del token.

Use su token recuperado para autenticar su conexión:
1. En {{< ui >}}Request Detail{{< /ui >}}, ingrese {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} y un {{< ui >}}Body{{< /ui >}} para completar su solicitud usando el token de acceso recuperado.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
{{% /tab %}}

{{% tab "Autenticación básica" %}}
Configure la consulta de autenticación preliminar:
1. En el menú desplegable {{< ui >}}Secret Type{{< /ui >}}, seleccione {{< ui >}}Basic Auth{{< /ui >}}.
1. Ingrese un {{< ui >}}Username{{< /ui >}} y {{< ui >}}Password{{< /ui >}}. La sección {{< ui >}}Request Headers{{< /ui >}} se completa automáticamente usando su nombre de usuario y contraseña.

Configure la solicitud de autenticación:
1. Ingrese el {{< ui >}}Request URL{{< /ui >}} y especifique el tipo de solicitud como {{< ui >}}GET{{< /ui >}} o {{< ui >}}POST{{< /ui >}}.
1. Opcionalmente, agregue {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} y un {{< ui >}}Body{{< /ui >}} adicionales a la solicitud.

Obtenga el token de acceso de la respuesta:
1. En {{< ui >}}Variable Path to Access Token{{< /ui >}}, ingrese la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve su token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como el cuerpo de la solicitud de acceso, use `body`. Si el token de acceso se devuelve en una propiedad llamada `token` de la respuesta `body`, use `body.token`. Las rutas distinguen entre mayúsculas y minúsculas.
1. Opcionalmente, ingrese un {{< ui >}}Refresh Interval{{< /ui >}}. Esta es la duración hasta que el token de acceso caduque, especificada en segundos. Cuando el token caduca, la conexión solicita automáticamente un nuevo token de acceso. Establecer un intervalo de `0` deshabilita la actualización del token.

Use su token recuperado para autenticar su conexión:
1. En {{< ui >}}Request Detail{{< /ui >}}, ingrese {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} y un {{< ui >}}Body{{< /ui >}} para completar su solicitud usando el token de acceso recuperado.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
{{% /tab %}}
{{< /tabs >}}

### Crear una conexión HTTP mTLS {#create-an-http-mtls-connection}

La conexión TLS mutua (mTLS) le permite usar una clave privada y un certificado TLS para autenticar la solicitud HTTP.

<div class="alert alert-info">El certificado de cliente (<code>.crt</code>, <code>.pem</code>) y la clave privada (<code>.key</code>, <code>.pem</code>) deben usar el formato PEM.</div>

1. En la sección {{< ui >}}Connection{{< /ui >}}, haga clic en el icono de más ({{< ui >}}+{{< /ui >}}).
1. Seleccione {{< ui >}}HTTP{{< /ui >}}.
1. Ingrese un {{< ui >}}Connection Name{{< /ui >}}.
1. Ingrese el {{< ui >}}Base URL{{< /ui >}} para la autenticación.
1. En el menú desplegable {{< ui >}}Authentication Type{{< /ui >}}, seleccione {{< ui >}}mTLS Auth{{< /ui >}}.
1. Haga clic en {{< ui >}}Upload File{{< /ui >}} para cargar su {{< ui >}}Private Key{{< /ui >}}.
1. Haga clic en {{< ui >}}Upload File{{< /ui >}} para cargar su {{< ui >}}Certificate{{< /ui >}}.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Entradas {#inputs}

Se requieren una URL y un método de solicitud para su solicitud. Opcionalmente, puede ingresar:
- Parámetros de URL
- encabezados
- el tipo de contenido
- un cuerpo de solicitud
- cookies

También puede seleccionar si desea permitir certificados caducados o seguir redirecciones.

### Opciones de respuesta {#response-options}

En {{< ui >}}Error on Status{{< /ui >}}, ingrese una lista separada por comas de cualquier código de estado en el que se deba devolver un error. Utilice el menú desplegable {{< ui >}}Response Parsing{{< /ui >}} para anular el método de parseo de respuesta predeterminado inferido a partir de los encabezados, y {{< ui >}}Response Encoding{{< /ui >}} si el servidor de destino especifica la codificación incorrecta en sus encabezados de respuesta.

## Private Actions {#private-actions}

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Las Private Actions están en vista previa. Utilice este formulario para solicitar acceso hoy mismo.
{{< /callout >}}

Puede utilizar una acción HTTP privada para interactuar con servicios alojados en su red privada sin exponer sus servicios a la internet pública. Las Private Actions utilizan un ejecutor de acciones privadas que usted instala en un servidor de su red mediante Docker y lo vincula con una conexión de Datadog. Para obtener más información, consulte [Private Actions][5].

Para configurar una solicitud HTTP privada:
1. Agregue una acción HTTP a su aplicación.
1. En la sección {{< ui >}}Connection{{< /ui >}}, haga clic en el icono de más ({{< ui >}}+{{< /ui >}}).
1. Seleccione {{< ui >}}HTTP{{< /ui >}}.
1. Ingrese un {{< ui >}}Connection Name{{< /ui >}}.
1. Ingrese el {{< ui >}}Base URL{{< /ui >}} para el servidor en su red privada.
1. Para {{< ui >}}Type{{< /ui >}}, asegúrese de que {{< ui >}}Private Action Runner{{< /ui >}} esté seleccionado.
1. En el menú desplegable {{< ui >}}Private Action Runner{{< /ui >}}, seleccione su [ejecutor de acciones privadas][5].
1. En el menú desplegable {{< ui >}}Authentication Type{{< /ui >}}, seleccione un tipo de Autenticación y complete los campos obligatorios. Las solicitudes HTTP privadas admiten los siguientes tipos de autenticación:
   - Sin autenticación
   - [Autenticación básica](#create-an-http-basic-authentication-connection)
   - [Autenticación por token](#create-an-http-token-authentication-connection)

   Para obtener información sobre cómo configurar las credenciales para la Autenticación por token, consulte [Gestión de credenciales de acciones privadas][6].
1. Haga clic en {{< ui >}}Next, Confirm Access{{< /ui >}} y configure el acceso a la consulta.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** o **#app-builder** en el [Datadog Community Slack][4].

[1]: https://docs.datadoghq.com/es/api/latest/ip-ranges/#list-ip-ranges
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://chat.datadoghq.com/
[5]: /es/actions/private_actions
[6]: /es/actions/connections/private_action_credentials/?tab=httpsaction#credential-files