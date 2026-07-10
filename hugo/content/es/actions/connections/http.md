---
aliases:
- /es/service_management/app_builder/http_request/
- /es/service_management/workflows/connections/http/
- /es/service_management/app_builder/connections/http_request/
description: Realiza solicitudes HTTP personalizadas a endpoints con autenticación,
  métodos, encabezados y gestión de respuestas configurables para procesos y aplicaciones.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentación
  text: Más información sobre las credenciales de conexión
title: Solicitudes HTTP
---

Utiliza la acción **Make request** (Hacer solicitud) para realizar una solicitud personalizada a un endpoint HTTP. Puedes controlar el método de solicitud y su contenido, cómo se autentica y procesa, y cómo debería responder a escenarios como certificados caducados o redirecciones. Si necesitas añadir rangos de direcciones IP de Datadog a tu lista de permitidos para que la acción HTTP funcione como se espera, utiliza las IPs listadas en el objeto `webhooks`. Consulta la [API de rangos de IP][1] para más detalles.

Para añadir una solicitud HTTP:

{{< tabs >}}
{{% tab "Workflow Automation" %}}
- En un nuevo proceso, haz clic en **Añadir step** (Añadir paso) y busca `Make request`. Selecciona la acción **Make request** (Hacer solicitud) para añadirla a tu proceso.
- En un proceso existente, haz clic en **+** y busca `Make request`. Selecciona la acción **Make request** (Hacer solicitud) para añadirla a tu proceso.

Especifica el método de solicitud y cualquier [autenticación][1] necesaria. Lee las secciones siguientes para obtener más información sobre las opciones de configuración disponibles. Opcionalmente, la solicitud puede esperar en las condiciones que especifiques en la sección **Conditional wait** (Espera condicional), y reintentar en un intervalo dado si la condición no se cumple.

[1]: /es/actions/workflows/access_and_auth/
{{% /tab %}}

{{% tab "App Builder" %}}
1. En tu aplicación, en **Data** (Datos), haz clic en **+ New** (+ Nuevo) y selecciona **Query** (Consulta).
1. Busca `HTTP` y selecciona la acción **Make request** (Hacer solicitud) para añadirla a tu aplicación.

Especifica el método de solicitud y cualquier [autenticación][1] necesaria. Lee las secciones siguientes para obtener más información sobre las opciones de configuración disponibles.

[1]: /es/actions/app_builder/access_and_auth/
{{% /tab %}}
{{< /tabs >}}

## Autenticación

Si necesitas autenticar tu solicitud, utiliza la **Connection** (Conexión) de la acción para configurar el método de autenticación. Puedes seleccionar una conexión preconfigurada del menú desplegable o crear una conexión.

### Crear una conexión de AWS

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
1. Selecciona **AWS**.
1. Introduce un **Connection name** (Nombre de conexión), **Account ID** (Identificación de cuenta) y **AWS Role Name** (Nombre de rol de AWS).
1. Haz clic en **Create** (Crear).

### Crear una conexión de Azure

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
1. Selecciona **Azure**.
1. Introduce un **Connection Name** (Nombre de conexión), **Tenant ID** (ID de inquilino), **Client ID** (ID de cliente) y **Client Secret** (Secreto de cliente).
1. Opcionalmente, introduce el **Custom Scope** (Ámbito personalizado) que se solicitará a Microsoft al adquirir un token de acceso OAuth 2. El ámbito de un recurso se construye utilizando el identificador URI del recurso y `.default`, separados por una barra oblicua (`/`). Por ejemplo, `{identifierURI}/.default`. Para obtener más información, consulta [la documentación de Microsoft sobre .default scope][3].
1. Haz clic en **Create** (Crear).

### Crear una conexión de autenticación de token HTTP

La conexión de autorización de token utiliza un token de portador para autenticar la solicitud HTTP.

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
1. Selecciona **HTTP**.
1. Introduce un **Connection Name** (Nombre de conexión).
1. Introduce la **Base URL** (URL de base) para la autenticación.
1. En el menú desplegable **Authentication Type** (Tipo de autenticación), selecciona **Token Auth** (Autorización de token).
1. Introduce un **Token Name** (Nombre de token) y un **Token Value** (Valor de token). Puedes introducir varios tokens. Para hacer referencia a tu token en un encabezado, parámetro o en el cuerpo de la solicitud, utiliza la sintaxis `{{ secretTokenName }}`.
1. Si lo deseas, puedes añadir **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros de URL) y **Body** (Cuerpo) a tu solicitud.
1. Haz clic en **Create** (Crear).

### Crear una conexión de autenticación básica HTTP

La conexión de autenticación básica utiliza un encabezado de autorización con un nombre de usuario y una contraseña para autenticar la solicitud HTTP.

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
1. Selecciona **HTTP**.
1. Introduce un **Connection Name** (Nombre de conexión).
1. Introduce la **Base URL** (URL de base) para la autenticación.
1. En el menú desplegable **Authentication Type** (Tipo de autenticación), selecciona **Basic Auth** (Autorización básica).
1. Introduce un **Username** (Nombre de usuario) y una **Password** (Contraseña). El encabezado de la solicitud de autorización requerida se rellena automáticamente utilizando tu nombre de usuario y contraseña.
1. Haz clic en **Create** (Crear).

### Crear una conexión de autenticación HTTP de 2 pasos

La conexión HTTP de 2 pasos te permite realizar una solicitud preliminar para recuperar un token de acceso con el que autenticar la solicitud HTTP. Esto es útil para autenticar aplicaciones JSON Web Token (JWT) y OAuth.

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
1. Selecciona **HTTP**.
1. Introduce un **Connection Name** (Nombre de conexión).
1. Introduce la **Base URL** (URL de base) para la autenticación.
1. En el menú desplegable **Authentication Type** (Tipo de autenticación), selecciona **2 Step Auth** (Autenticación de 2 pasos).

{{< tabs >}}
{{% tab "Token auth" %}}
Configura la consulta preliminar del token de acceso:
1. En el menú desplegable **Secret Type** (Tipo de secreto), selecciona **Token Auth** (Autorización de token).
1. Introduce un nombre de token y un valor de token
1. Introduce la **Request URL** (URL de la solicitud) y especifica el tipo de solicitud como **GET** o **POST**.
1. Si lo deseas, puedes añadir **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros de URL) y **Body** (Cuerpo) a la solicitud.

Obtener el token de acceso de la respuesta:
1. En **Variable Path to Access Token** (Ruta variable al token de acceso), introduce la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve el token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como cuerpo de la solicitud de acceso, utiliza `body`. Si el token de acceso se devuelve en una propiedad denominada `token` de la respuesta `body`, utiliza `body.token`. Las rutas distinguen mayúsculas y minúsculas.
1. Opcionalmente, introduce un **Refresh Interval** (Intervalo de actualización). Se trata del tiempo que debe transcurrir hasta que caduque el token de acceso, especificado en segundos. Cuando caduca, la conexión solicita automáticamente un nuevo token de acceso. Establecer un intervalo de `0` desactiva la actualización del token.

Utiliza el token recuperado para autenticar tu conexión:
1. En **Request Detail** (Detalle de solicitud), introduce **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros de URL) y un **Body** (Cuerpo) para completar tu solicitud utilizando el token de acceso recuperado.
1. Haz clic en **Create** (Crear).
{{% /tab %}}

{{% tab "Basic auth" %}}
Configura la consulta de autenticación preliminar:
1. En el menú desplegable **Secret Type** (Tipo de secreto), selecciona **Basic Auth** (Autorización básica).
1. Introduce un **Username** (Nombre de usuario) y una **Password** (Contraseña). La sección **Request Headers** (Encabezados de solicitud) se rellena automáticamente con tu nombre de usuario y contraseña.

Configura la solicitud de autenticación:
1. Introduce la **Request URL** (URL de la solicitud) y especifica el tipo de solicitud como **GET** o **POST**.
1. Si lo deseas, puedes añadir **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros de URL) y **Body** (Cuerpo) a la solicitud.

Obtener el token de acceso de la respuesta:
1. En **Variable Path to Access Token** (Ruta variable al token de acceso), introduce la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve el token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como cuerpo de la solicitud de acceso, utiliza `body`. Si el token de acceso se devuelve en una propiedad denominada `token` de la respuesta `body`, utiliza `body.token`. Las rutas distinguen mayúsculas y minúsculas.
1. Opcionalmente, introduce un **Refresh Interval** (Intervalo de actualización). Se trata del tiempo que debe transcurrir hasta que caduque el token de acceso, especificado en segundos. Cuando caduca, la conexión solicita automáticamente un nuevo token de acceso. Establecer un intervalo de `0` desactiva la actualización del token.

Utiliza el token recuperado para autenticar tu conexión:
1. En **Request Detail** (Detalle de solicitud), introduce **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros de URL) y un **Body** (Cuerpo) para completar tu solicitud utilizando el token de acceso recuperado.
1. Haz clic en **Create** (Crear).
{{% /tab %}}
{{< /tabs >}}

### Crear una conexión HTTP mTLS

La conexión de autenticación TLS mutua (mTLS) permite utilizar una clave privada y un certificado TLS para autenticar la solicitud HTTP.

<div class="alert alert-info">El certificado del cliente (<code>.crt</code>, <code>.pem</code>) y la clave privada (<code>.key</code>, <code>.pem</code>) deben utilizar el formato PEM.</div>

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
1. Selecciona **HTTP**.
1. Introduce un **Connection Name** (Nombre de conexión).
1. Introduce la **Base URL** (URL de base) para la autenticación.
1. En el menú desplegable **Authentication Type** (Tipo de autenticación), selecciona **mTLS Auth** (Autenticación mTLS).
1. Haz clic en **Upload File** (Cargar archivo) para cargar tu **Private Key** (Clave privada).
1. Haz clic en **Upload File** (Cargar archivo) para cargar tu **Certificate** (Certificado).
1. Haz clic en **Create** (Crear).

## Entradas

Tu solicitud requiere una URL y un método. Opcionalmente, puedes introducir:
- parámetros URL
- encabezados
- tipo de contenido
- un cuerpo de solicitud
- cookies

También puedes seleccionar si quieres permitir certificados caducados o seguir redireccionamientos.

### Opciones de respuestas

En **Error on Status** (Error de estado), introduce una lista delimitada por comas de cualquier código de estado sobre el cual devolver un error. Utiliza el menú desplegable **Response Parsing** (Clasificación de respuestas) para anular el método de clasificación de respuestas predeterminado, deducido de los encabezados, y **Response Encoding** (Codificación de respuestas), si el servidor de destino especifica una codificación incorrecta en sus encabezados de respuestas.

## Acciones privadas

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Únete a la vista previa">}}
Las Acciones privadas están en vista previa. Utiliza este formulario para solicitar acceso hoy mismo.
{{< /callout >}}

Puedes utilizar una acción HTTP privada para interactuar con servicios alojados en tu red privada, sin exponer tus servicios a la Internet pública. Las acciones privadas utilizan un ejecutor de acciones privadas que instalas en un host de tu red utilizando Docker y emparejándolo con una conexión Datadog. Para obtener más información, consulta [Acciones privadas][5].

Para configurar una solicitud HTTP privada:
1. Añade una acción HTTP a tu aplicación.
1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
1. Selecciona **HTTP**.
1. Introduce un **Connection Name** (Nombre de conexión).
1. Introduce la **URL de base** para el host de tu red privada.
1. En **Tipo**, asegúrate de que el **Ejecutor de acciones privadas** está seleccionado.
1. En el menú desplegable **Ejecutor de acciones privadas**, selecciona tu [ejecutor de acciones privadas][5].
1. En el menú desplegable **Tipo de autenticación**, selecciona un tipo de autenticación y rellena los campos requeridos. Las solicitudes HTTP privadas admiten los siguientes tipos de autenticación:
   - Sin autenticación
   - [Autenticación básica](#create-an-http-basic-authentication-connection)
   - [Autenticación por token](#create-an-http-token-authentication-connection)

   Para obtener información sobre la configuración de credenciales para la autenticación de tokens, consulta [Gestión de credenciales de acciones privadas][6].
1. Haz clic en **Next, Confirm Access** (Siguiente, confirmar acceso) y configura el acceso a la consulta.
1. Haz clic en **Create** (Crear).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** o **#app-builder** en [Datadog Community Slack][4].

[1]: https://docs.datadoghq.com/es/api/latest/ip-ranges/#list-ip-ranges
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://chat.datadoghq.com/
[5]: /es/actions/private_actions
[6]: /es/actions/private_actions/private_action_credentials/?tab=httpsaction#credential-files