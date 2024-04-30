---
disable_toc: false
further_reading:
- link: /service_management/workflows/connections/
  tag: Documentación
  text: Más información sobre las credenciales de conexión para la automatización
    de flujos de trabajo
kind: Documentación
title: Solicitudes HTTP
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utiliza la acción **Make request** (Realizar solicitud) para realizar una solicitud personalizada a un endpoint HTTP. Puedes controlar el método de solicitud y su contenido, cómo se autentica y procesa, y cómo debe responder a situaciones como certificados caducados o redirecciones. Si necesitas añadir rangos de direcciones IP de Datadog a tu lista de autorizaciones, para que la acción HTTP funcione como se espera, utiliza las direcciones IP enumeradas en el objeto `webhooks`. Consulta la [API de rangos de IP][1] para obtener más información.

Para añadir una solicitud HTTP:
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `Make request`. Selecciona la acción **Make request** (Realizar solicitud) para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `Make request`. Selecciona la acción **Make request** (Realizar solicitud) para añadirla a tu flujo de trabajo.

Especifica el método de solicitud y cualquier [autenticación][2] necesaria. Lee las siguientes secciones para obtener más información sobre las opciones de configuración disponibles. Opcionalmente, la solicitud puede esperar en las condiciones que especifiques en la sección **Conditional Wait** (Espera condicional) y volver a reintentar en un intervalo dado si la condición no se cumple.

## Autenticación

Si necesitas autenticar tu solicitud, utiliza la **Connection** (Conexión) de la acción para configurar el método de autenticación. Puedes seleccionar una conexión preconfigurada del menú desplegable o crear una conexión.

### Crear una conexión AWS 

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
2. Selecciona **AWS**.
3. Introduce un **Connection Name** (Nombre de conexión), **Account ID** (ID de cuenta) y **AWS Role Name** (Nombre de rol AWS).
4. Haz clic en **Create** (Crear).

### Crear una conexión Azure

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
2. Selecciona **Azure**.
3. Introduce un **Connection Name** (Nombre de conexión), un **Tenant ID** (ID de arrendatario), un **Client ID** (ID de cliente) y un **Client Secret** (Secreto de cliente).
4. Opcionalmente, introduce el **Custom Scope** (Contexto personalizado) que se solicitará a Microsoft al adquirir un token de acceso OAuth 2. El contexto de un recurso se construye utilizando el URI identificador del recurso y `.default`, separados por una barra oblicua (`/`). Por ejemplo, `{identifierURI}/.default`. Para obtener más información, consulta [la documentación de Microsoft sobre contextos por defecto][3].
5. Haz clic en **Create** (Crear).

### Crear una conexión HTTP con autenticación basada en tokens

La conexión con autenticación basada en tokens utiliza un token de portador para autenticar la solicitud HTTP.

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
2. Selecciona **HTTP**.
3. Introduce un **Connection Name** (Nombre de conexión).
4. Introduce la **Base URL** (URL de base) para la autenticación.
5. En el menú desplegable **Authentication Type** (Tipo de autenticación), selecciona **Token Auth** (Autenticación mediante token).
6. Introduce un **Token Name** (Nombre de token) y un **Token Value** (Valor de token). Puedes introducir varios tokens. Para hacer referencia a tu token en un encabezado, un parámetro o el cuerpo de la solicitud, utiliza la sintaxis `{{ secretTokenName }}`.
7. Opcionalmente, puedes añadir **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros URL) y un **Body** (Cuerpo) a tu solicitud.
8. Haz clic en **Create** (Crear).

### Crear una conexión HTTP con autenticación básica

La conexión con autenticación básica utiliza un encabezado de autorización con un nombre de usuario y una contraseña para autenticar la solicitud HTTP.

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
2. Selecciona **HTTP**.
3. Introduce un **Connection Name** (Nombre de conexión).
4. Introduce la **Base URL** (URL de base) para la autenticación.
5. En el menú desplegable **Authentication Type** (Tipo de autenticación), selecciona **Basic Auth** (Autenticación básica).
6. Introduce un **Username** (Nombre de usuario) y un **Password** (Contraseña). El encabezado de la solicitud de autorización requerido se rellena automáticamente con tu nombre de usuario y tu contraseña.
7. Haz clic en **Create** (Crear).

### Crear una conexión HTTP con autenticación en 2 pasos

La conexión HTTP de 2 pasos te permite realizar una solicitud preliminar para recuperar un token de acceso con el que autenticar la solicitud HTTP.

1. En la sección **Connection** (Conexión), haz clic en el icono más (**+**).
2. Selecciona **HTTP**.
3. Introduce un **Connection Name** (Nombre de conexión).
4. Introduce la **Base URL** (URL de base) para la autenticación.
5. En el menú desplegable **Authentication Type** (Tipo de autenticación), selecciona **2 Step Auth** (Autenticación en 2 pasos).

{{< tabs >}}
{{% tab "Token auth" (Autenticación basada en tokens) %}}
Configura la consulta preliminar del token de acceso:
1. En el menú desplegable **Secret Type** (Tipo de secreto), selecciona **Token Auth** (Autenticación basada en tokens).
2. **Token Name** (Nombre de token) y un **Token Value** (Valor de token).
3. Introduce la **Request URL** (URL de solicitud) y especifica el tipo de solicitud como **GET** o **POST**.
4. Opcionalmente, puedes añadir **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros URL) y un **Body** (Cuerpo) a tu solicitud.

Obtén el token de acceso de la respuesta:
1. En **Variable Path to Access Token** (Ruta de la variable al token de acceso), introduce la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve el token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como cuerpo de la solicitud de acceso, utiliza `body`. Si el token de acceso se devuelve en una propiedad llamada `token` de la respuesta `body`, utiliza `body.token`. Las rutas distinguen entre mayúsculas y minúsculas.
2 Opcionalmente, introduce un **Refresh Interval** (Intervalo de actualización). Esta es la duración hasta la expiración del token de acceso, indicada en segundos. Cuando el token caduca, la conexión solicita automáticamente un nuevo token de acceso. Si se establece un intervalo de `0`, se desactiva la actualización del token.

Utiliza el token recuperado para autenticar la conexión:
1. En **Request Detail** (Detalle de la solicitud), introduce **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros URL) y un **Body** (Cuerpo) para completar tu solicitud utilizando el token de acceso recuperado.
2. Haz clic en **Create** (Crear).
{{% /tab %}}

{{% /tab "Basic auth" (Autenticación básica) %}}
Configura la consulta de autenticación preliminar:
1. En el menú desplegable **Secret Type** (Tipo de secreto), selecciona **Basic Auth** (Autentificación básica).
2. Introduce un **Username** (Nombre de usuario) y un **Password** (Contraseña). La sección **Request Headers** (Encabezados de solicitud) se rellena automáticamente con tu nombre de usuario y tu contraseña.

Configura la solicitud de autenticación:
1. Introduce la **Request URL** (URL de la solicitud) y especifica el tipo de solicitud como **GET** o **POST**.
2. Opcionalmente, añade **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros URL) y un **Body** (Cuerpo) a tu solicitud.

Obtén el token de acceso de la respuesta:
1. En **Variable Path to Access Token** (Ruta de la variable al token de acceso), introduce la ruta al token de acceso en la respuesta. Esta es la ruta a través de la cual se devuelve el token de acceso después de realizar la llamada de autenticación. Por ejemplo, si el token de acceso se devuelve como cuerpo de la solicitud de acceso, utiliza `body`. Si el token de acceso se devuelve en una propiedad llamada `token` de la respuesta `body`, utiliza `body.token`. Las rutas distinguen entre mayúsculas y minúsculas.
2. Opcionalmente, introduce un **Refresh Interval** (Intervalo de actualización). Esta es la duración hasta el vencimiento del token de acceso, indicada en segundos. Cuando el token caduca, la conexión solicita automáticamente un nuevo token de acceso. Si se establece un intervalo de `0`, se desactiva la actualización del token.

Utiliza el token recuperado para autenticar la conexión:
1. En **Request Detail** (Detalle de la solicitud), introduce **Request Headers** (Encabezados de solicitud), **URL parameters** (Parámetros URL) y un **Body** (Cuerpo) para completar tu solicitud utilizando el token de acceso recuperado.
1. Haz clic en **Create** (Crear).
{{% /tab %}}
{{&lt; /tabs &gt;}}

### Crear una conexión HTTP mTLS

La conexión de autenticación mutua TLS (mTLS) permite utilizar una clave privada y un certificado TLS para autenticar la solicitud HTTP.

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

Se requiere una URL y un método de solicitud para tu solicitud. Opcionalmente, puedes introducir:
- parámetros URL
- encabezados
- tipo de contenido
- un cuerpo de solicitud
- cookies

También puedes seleccionar si quieres permitir certificados caducados o seguir redireccionamientos.

### Opciones de respuestas

En **Error on Status** (Error de estado), introduce una lista delimitada por comas de cualquier código de estado sobre el cual devolver un error. Utiliza el menú desplegable **Response Parsing** (Clasificación de respuestas) para anular el método de clasificación de respuestas predeterminado, deducido de los encabezados, y **Response Encoding** (Codificación de respuestas), si el servidor de destino especifica una codificación incorrecta en sus encabezados de respuestas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/latest/ip-ranges/#list-ip-ranges
[2]: /es/service_management/workflows/access/
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope