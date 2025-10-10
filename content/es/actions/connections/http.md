---
aliases:
- /es/service_management/app_builder/http_request/
- /es/service_management/workflows/connections/http/
- /es/service_management/app_builder/connections/http_request/
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentación
  text: Más información sobre las credenciales de conexión
title: Solicitudes HTTP
---

Utiliza la acción **Realizar solicitud** para realizar una solicitud personalizada a un endpoint HTTP. Puedes controlar el método de solicitud y su contenido, cómo se autentica y procesa, y cómo debe responder a situaciones como certificados expirados o redirecciones. Si necesitas añadir rangos de direcciones IP de Datadog a tu lista de permisos para que la acción HTTP funcione como se espera, utiliza las IP indicadas en el objeto `webhooks`. Para obtener más información, consulta la [API de rangos de IP][1].

Para añadir una solicitud HTTP:

{{< tabs >}}
{{% tab "Workflow Automation" %}}
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `Make request`. Selecciona la acción **Realizar solicitud** para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `Make request`. Selecciona la acción **Realizar solicitud** para añadirla a tu flujo de trabajo.

Especifica el método de solicitud y cualquier [autenticación][2] necesaria. Lee las secciones siguientes para obtener más información sobre las opciones de configuración disponibles. Opcionalmente, la solicitud puede esperar las condiciones que especifiques en la sección **Espera condicional** y reintentar en un intervalo dado si la condición no se cumple.
{{% /tab %}}

{{% tab "App Builder" %}}
1. En tu aplicación, en **Datos**, haz clic en **+ New** (+ Nuevo) y selecciona **Consulta**.
2. Busca `HTTP` y luego selecciona la acción **Realizar solicitud** para añadirla a tu aplicación.

Especifica el método de solicitud y cualquier [autenticación][7] necesaria. Lee las secciones siguientes para obtener más información sobre las opciones de configuración disponibles.
{{% /tab %}}
{{< /tabs >}}

## Autenticación

Si necesitas autenticar tu solicitud, utiliza **Conexión** de la acción para configurar el método de autenticación. Puedes seleccionar una conexión preconfigurada en el menú desplegable o crear una nueva conexión.

### Crear una conexión AWS 

1. En la sección **Conexión**, haz clic en el icono más (**+**).
2. Selecciona **AWS**.
3. Introduce un **Nombre de conexión**, **ID de cuenta** y **Nombre de rol AWS**.
4 Haz clic en **Create** (Crear).

### Crear una conexión Azure

1. En la sección **Conexión**, haz clic en el icono más (**+**).
2. Selecciona **Azure**.
3. Introduce un **Nombre de conexión**, un **ID de inquilino**, un **ID de cliente** y un **Secreto de cliente**.
4. Opcionalmente, introduce el **Contexto personalizado** que se solicitará a Microsoft al adquirir un token de acceso OAuth 2. El contexto de un recurso se crea utilizando el URI identificador del recurso y `.default`, separados por una barra oblicua (`/`). Por ejemplo, `{identifierURI}/.default`. Para obtener más información, consulta la [documentación de Microsoft sobre contextos por defecto][3].
5. Haz clic en **Create** (Crear).

### Crear una conexión de autenticación de token HTTP

La conexión de autenticación de token utiliza un token de portador para autenticar la solicitud HTTP.

1. En la sección **Conexión**, haz clic en el icono más (**+**).
2. Selecciona **HTTP**.
3. Introduce un **Nombre de conexión**.
4. Introduce la **URL de base** para la autenticación.
5. En el menú desplegable **Tipo de autenticación**, selecciona **Autenticación de token**.
6. Introduce un **Nombre de código** y un **Valor de código**. Puedes introducir varios tokens. Para hacer referencia a tu token en una cabecera, un parámetro o el cuerpo de la solicitud, utiliza la sintaxis `{{ secretTokenName }}`.
7. Si lo prefieres, puedes añadir **Cabeceras de solicitud**, **Parámetros URL** y un **Cuerpo** a tu solicitud.
8. Haz clic en **Create** (Crear).

### Crear una conexión de autenticación HTTP básica

La conexión de autenticación básica utiliza una cabecera de autorización con un nombre de usuario y una contraseña para autenticar la solicitud HTTP.

1. En la sección **Conexión**, haz clic en el icono más (**+**).
2. Selecciona **HTTP**.
3. Introduce un **Nombre de conexión**.
4. Introduce la **URL de base** para la autenticación.
5. En el menú desplegable **Tipo de autenticación**, selecciona **Autenticación básica**.
6. Introduce un **Nombre de usuario** y una **Contraseña**. La cabecera de la solicitud de autorización requerida se rellena automáticamente utilizando tu nombre de usuario y tu contraseña.
7. Haz clic en **Create** (Crear).

### Crear una conexión de autenticación HTTP de 2 pasos

La conexión HTTP en 2 pasos te permite realizar una solicitud preliminar para recuperar un token de acceso con el que autenticar la solicitud HTTP. Esto es útil para autenticar aplicaciones JSON Web Token (JWT) y OAuth.

1. En la sección **Conexión**, haz clic en el icono más (**+**).
2. Selecciona **HTTP**.
3. Introduce un **Nombre de conexión**.
4. Introduce la **URL de base** para la autenticación.
5. En el menú desplegable **Tipo de autenticación**, selecciona **Autenticación en 2 pasos**.

{{< tabs >}}
{{% tab "Autorización de token" %}}
Configura la consulta preliminar del token de acceso:
1. En el menú desplegable **Tipo de secreto**, selecciona **Autorización de token**.
2. Introduce un nombre de token y un valor de token
3. Introduce la **URL de la solicitud** y especifica el tipo de solicitud como **GET** o **POST**.
4. Si lo prefieres, puedes añadir **Cabeceras de solicitud**, **Parámetros URL** y un **Cuerpo** a la solicitud.

Obtener el token de acceso de la respuesta:
1. En **Ruta variable al token de acceso**, introduce la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve el token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como cuerpo de la solicitud de acceso, utiliza `body`. Si el token de acceso se devuelve en una propiedad llamada `token` de la respuesta `body`, utiliza `body.token`. Las rutas distinguen entre mayúsculas y minúsculas.
2. Opcionalmente, introduce un **Intervalo de actualización**. Esta es la duración hasta que expira el token de acceso, especificada en segundos. Cuando el token expira, la conexión solicita automáticamente un nuevo token de acceso. Si se configura un intervalo de `0`, se desactiva la actualización del token.

Utilizar el token recuperado para autenticar la conexión:
1. En **Información de la solicitud**, introduce **Cabeceras de solicitud**, **Parámetros URL** y un **Cuerpo** para completar tu solicitud utilizando el token de acceso recuperado.
2. Haz clic en **Create** (Crear).
{{% /tab %}}

{{% tab "Autenticación básica" %}}
Configurar la consulta de autenticación preliminar:
1. En el menú desplegable **Tipo de secreto**, selecciona **Autentificación básica**.
2. Introduce un **Nombre de usuario** y una **Contraseña**. La sección **Cabeceras de solicitud** se rellena automáticamente con tu nombre de usuario y tu contraseña.

Configurar la solicitud de autenticación:
1. Introduce la **URL de la solicitud** y especifica el tipo de solicitud como **GET** o **POST**.
2. Si lo prefieres, añade **Cabeceras de solicitud**, **Parámetros URL** y un **Cuerpo** adicionales a la solicitud.

Obtener el token de acceso de la respuesta:
1. En **Ruta variable al token de acceso**, introduce la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve el token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como cuerpo de la solicitud de acceso, utiliza `body`. Si el token de acceso se devuelve en una propiedad llamada `token` de la respuesta `body`, utiliza `body.token`. Las rutas distinguen entre mayúsculas y minúsculas.
2. Opcionalmente, introduce un **Intervalo de actualización**. Esta es la duración hasta que expira el token de acceso, especificada en segundos. Cuando el token expira, la conexión solicita automáticamente un nuevo token de acceso. Si se configura un intervalo de `0`, se desactiva la actualización del token.

Utilizar el token recuperado para autenticar la conexión:
1. En **Información de la solicitud**, introduce **Cabeceras de solicitud**, **Parámetros URL** y un **Cuerpo** para completar tu solicitud utilizando el token de acceso recuperado.
2. Haz clic en **Create** (Crear).
{{% /tab %}}
{{< /tabs >}}

### Crear una conexión HTTP mTLS

La conexión de autenticación Mutual TLS (mTLS) permite utilizar una clave privada y un certificado TLS para autenticar la solicitud HTTP.

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
[2]: /es/service_management/workflows/access/
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://datadoghq.slack.com/
[5]: /es/actions/private_actions
[6]: /es/actions/private_actions/private_action_credentials/?tab=httpsaction#credential-files
[7]: /es/service_management/app_builder/auth/