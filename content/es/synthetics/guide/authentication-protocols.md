---
description: Te contamos cómo asegurarte de que se pueda iniciar sesión en tus aplicaciones
  durante los tests de API simples y API multipaso.
further_reading:
- link: /data_security/synthetics
  tag: Documentación
  text: Más información sobre Synthetics Data Security
- link: /synthetics/api_tests
  tag: Documentación
  text: Crear un test de API
- link: /synthetics/multistep
  tag: Documentación
  text: Crear un test de API multipaso
title: Ejecutar tests de API simples y API multipaso en aplicaciones que requieren
  autenticación
---

## Información general

Los [tests de HTTP][1] te permiten enviar solicitudes HTTP a los endpoints de API de tus aplicaciones para verificar las respuestas y las condiciones definidas, como el tiempo general de respuesta, el código de estado previsto, el encabezado o el contenido del cuerpo. Con los [tests de API multipaso][2] puedes encadenar solicitudes HTTP para monitorizar proactivamente recorridos sofisticados en servicios claves y asegurarte de que se puede acceder a ellos en cualquier momento y desde cualquier ubicación gestionada y privada.

En este artículo vamos a ver los distintos protocolos de autenticación que se pueden usar en los tests de API simples y de API multipaso de Synthetics. En el artículo sobre cómo [ejecutar tests en aplicaciones que requieren autenticación][3], encontrarás más información sobre la autenticación en tests de navegador.

## Métodos de autenticación

Si hay que iniciar sesión en tu endpoint, puedes añadir tus credenciales cuando vayas a [crear un test de API simple][4] o de [API multipaso][5]. En estos tests se pueden utilizar los siguientes protocolos de autenticación: Basic Access Authentication, Digest Access Authentication, OAuth2.0, NTLM, AWS Sigv4 y certificados de cliente. 

En la sección **Define the request** (Definir la solicitud), haz clic en **Advanced Options** (Opciones avanzadas) > **Authentication** (Autenticación) y selecciona el método que prefieras: 

{{< tabs >}}
{{% tab "Acceso básico" %}}

Haz clic en **HTTP Basic Auth** (Autenticación básica HTTP) e introduce un nombre de usuario y una contraseña. La autenticación de acceso básico se puede usar en los [tests de HTTP][1], [API multipaso][2] y [WebSocket][3].

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
[3]: /es/synthetics/api_tests/websocket_tests/
{{% /tab %}}
{{% tab "Acceso implícito" %}}

Haz clic en **Digest Auth** (Autenticación implícita) e introduce un nombre de usuario y una contraseña. La autenticación de acceso implícito se puede usar en los [tests de HTTP][1] y [API multipaso][2].

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
{{% /tab %}}
{{% tab "OAuth 2.0" %}}

Haz clic en **OAuth 2.0**, selecciona un tipo de concesión (**Client Credentials** [Credenciales de cliente] o **Resource Password** [Contraseña de recurso]) e introduce una URL de tokens de acceso, un ID de cliente y un secreto de cliente. Selecciona un método de autenticación de API mediante token (**Send as Basic Auth header** [Enviar como encabezado de autenticación básica] o **Send client credentials in body** [Enviar credenciales de cliente en el cuerpo]) y, si quieres, incluye un destinatario, un recurso y un ámbito. La autenticación OAuth 2.0 se puede usar en [tests de HTTP][1] y [API multipaso][2].

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
{{% /tab %}}
{{% tab "NTLM" %}}

Haz clic en **NTLM**, introduce un nombre de usuario y una contraseña y, si quieres, un dominio y una estación de trabajo. La autenticación NTLM se puede usar en los [tests de HTTP ][1] y [API multipaso][2].

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
{{% /tab %}}
{{% tab "AWS Signature" %}}

Haz clic en **AWS Signature**, introduce un ID de clave de acceso, una clave de acceso secreta y, si quieres, una región, un nombre de servicio y un token de sesión. La autenticación por AWS Signature se puede usar en los [tests de HTTP][1] y [API multipaso][2].

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
{{% /tab %}}
{{% tab "Certificado de cliente" %}}

Haz clic en **Upload File** (Cargar archivo) para cargar un archivo de claves privadas y un archivo de certificado. La autenticación mediante
certificado de cliente se puede usar en los [tests de HTTP][1], [API multipaso][2], [SSL][3] y [gRPC tests][4].

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
[3]: /es/synthetics/api_tests/ssl_tests/
[4]: /es/synthetics/api_tests/grpc_tests/
{{% /tab %}}
{{< /tabs >}}

## Seguridad de la cuenta

Si no quieres que se muestren credenciales de usuario ni en los resultados de tus tests ni en la configuración, puedes usar variables globales y locales cuando vayas a [crear tests de API simples][4] o [API multipaso][5].

### Variables globales

Si guardas tus credenciales como variables globales, puedes hacer lo siguiente:

- Reutilizarlas fácilmente en otros muchos tests.
- Impedir que sus valores se muestren en los resultados de los tests y en las configuraciones. Para ello, selecciona **Hide and obfuscate variable value** (Ocultar y enmascarar el valor de las variables).
- Restringir el acceso a ellas para que solo puedan acceder los usuarios de tu organización que tengan [roles personalizados][6].

### Variables locales

Al guardar tus credenciales como variables locales, estas solo se limitan a un único test. Para ocultar sus valores y que no aparezcan en los resultados de los tests ni en las configuraciones, selecciona **Hide and obfuscate variable value** (Ocultar y enmascarar el valor de las variables).

Para obtener más información sobre cómo proteger los datos, consulta [Seguridad de los datos en Synthetic Monitoring][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
[3]: /es/synthetics/guide/app-that-requires-login/
[4]: https://app.datadoghq.com/synthetics/create?subtype=http
[5]: https://app.datadoghq.com/synthetics/multi-step/create
[6]: /es/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[7]: /es/data_security/synthetics