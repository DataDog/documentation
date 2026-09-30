---
description: Pase un token de autenticación activo y de actualización automática a
  una prueba de aplicación móvil para omitir el flujo de inicio de sesión.
further_reading:
- link: /synthetics/guide/authentication-protocols/
  tag: Documentación
  text: Utilice la autenticación en pruebas de API y en pruebas de API de varios pasos
- link: /synthetics/mobile_app_testing/
  tag: Documentación
  text: Cree una prueba de aplicación móvil
- link: /synthetics/platform/settings/#global-variables
  tag: Documentación
  text: Cree una variable global
title: Inyecte y actualice automáticamente tokens de autenticación en pruebas de aplicaciones
  móviles
---
## Descripción general {#overview}

Iniciar sesión a través de la interfaz de usuario de su aplicación al comienzo de cada [prueba de aplicación móvil][1] añade duración e inestabilidad no relacionadas con la prueba. Esta guía muestra cómo omitir ese paso de inicio de sesión inyectando un token de autenticación activo para que la prueba comience ya autenticada.

El flujo tiene tres partes:

1. Una [prueba de API][2] inicia sesión en su proveedor de autenticación según un horario y extrae un token de acceso.
2. Una [variable global][3] que tiene como fuente esa prueba contiene el valor del token.
3. Su prueba de aplicación móvil pasa la variable global a la aplicación como un argumento de inicio o un extra de intent. Su aplicación lo lee al iniciarse y omite su flujo de inicio de sesión normal.

Debido a que la prueba de API actualiza el token según un horario, el valor de la variable global se actualiza por sí solo, sin ningún trabajo manual ni llamadas a la API de Datadog.

## Paso 1: Cree la prueba de API de obtención de tokens {#step-1-create-the-token-fetch-api-test}

Si su proveedor de autenticación requiere un secreto de cliente, guárdelo primero como una [variable global][3] segura, en lugar de codificarlo de forma rígida en la solicitud. Ingrese un nombre como `AUTH_CLIENT_SECRET` y seleccione {{< ui >}}Hide and obfuscate variable value{{< /ui >}} cuando la cree.

Cree una [prueba HTTP][2] que solicite un token al punto de conexión de tokens de su proveedor:

- **Solicitud**: `POST` a su punto de conexión de tokens, como `https://auth.yourdomain.com/oauth/token`.
- **Encabezado**: `Content-Type: application/json`.
- **Cuerpo**: una carga útil JSON con sus credenciales de cliente, haciendo referencia a la variable global `AUTH_CLIENT_SECRET`:

{{< code-block lang="json" >}}
{
  "client_id": "synthetic_bot",
  "client_secret": "{{ AUTH_CLIENT_SECRET }}",
  "grant_type": "client_credentials"
}
{{< /code-block >}}

- **Aserción**: el código de estado es `200`.
- **Variable extraída**: [extraiga una variable][4] llamada `EXTRACTED_TOKEN` del cuerpo de la respuesta, utilizando una expresión `jsonpath` que coincida con su campo de token, como `$.access_token`. Seleccione {{< ui >}}Hide and obfuscate variable value{{< /ui >}} para que el token no aparezca en los resultados de la prueba.

Establezca la [frecuencia][5] de la prueba en un tiempo menor al de la ventana de expiración de su token, para que el token no caduque entre ejecuciones. Por ejemplo, ejecute la prueba cada 30 minutos para un token que expira después de una hora. También puede adjuntar una alerta a la prueba para saber si deja de actualizar el token.

## Paso 2: Cree una variable global a partir de la prueba {#step-2-create-a-global-variable-from-the-test}

[Cree una variable global][3] a partir de la prueba de obtención de token para que su prueba de aplicación móvil pueda hacer referencia a su valor:

1. Navegue a la pestaña {{< ui >}}Global Variables{{< /ui >}} en la [página {{< ui >}}Settings{{< /ui >}}][6]. Haga clic en {{< ui >}}\+ New Global Variable{{< /ui >}}.
2. Seleccione la pestaña {{< ui >}}Create From Test{{< /ui >}} y seleccione su prueba de obtención de token.
3. Ingrese un {{< ui >}}Variable Name{{< /ui >}}, como `MOBILE_AUTH_TOKEN`.
4. Seleccione {{< ui >}}Hide and obfuscate variable value{{< /ui >}} para que el token no aparezca en los resultados de la prueba.
5. Seleccione de dónde recopilar el valor:
   - Si su prueba de obtención de token es una única solicitud HTTP, seleccione {{< ui >}}Response Body{{< /ui >}} y reutilice la expresión `jsonpath` de su aserción de prueba, por ejemplo `$.access_token`.
   - Si su prueba de obtención de token tiene varios pasos, seleccione la variable local {{< ui >}}EXTRACTED_TOKEN{{< /ui >}} que extrajo en el Paso 1.

El valor de esta variable se actualiza automáticamente cada vez que se ejecuta la prueba de obtención de token.

## Paso 3: Pase el token a su prueba de aplicación móvil {#step-3-pass-the-token-to-your-mobile-app-test}

Las pruebas de aplicaciones móviles admiten el paso de pares `key:value` a su aplicación al iniciar a través de [opciones avanzadas][7]. Haga referencia a su variable global escribiendo "{{` en el campo, por lo que su valor actual se sustituye en tiempo de ejecución:

{{< tabs >}}
{{% tab "Android (Extras de intent iniciales)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Página de creación de pruebas de aplicaciones móviles, que muestra un ejemplo de una opción avanzada para un dispositivo Android." style="width:100%;" >}}

{{% /tab %}}
{{% tab "iOS (Argumentos de proceso)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="Página de creación de pruebas de aplicaciones móviles, que muestra un ejemplo de una opción avanzada para un dispositivo iOS." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Paso 4: Maneje el token en su aplicación {#step-4-handle-the-token-in-your-app}

Su aplicación debe leer el valor inyectado al inicio, almacenarlo de forma segura y usarlo para omitir su flujo de inicio de sesión. Proteja este comportamiento detrás de una bandera de compilación para que la ruta del código solo exista en sus compilaciones de prueba o automatización.

{{< tabs >}}
{{% tab "Android (Java)" %}}

{{< code-block lang="java" >}}
if (BuildConfig.AUTOMATION) {
    String authToken = getIntent().getStringExtra("auth_token");
    if (authToken != null) {
        SecureTokenStore.getInstance(this).save(authToken);
        SessionManager.getInstance().restoreSession(authToken);
    }
}
{{< /code-block >}}

Respalde `SecureTokenStore` con `EncryptedSharedPreferences` y un `MasterKey`, en lugar de almacenar el token en `SharedPreferences` sin formato.

{{% /tab %}}
{{% tab "iOS (Swift)" %}}

{{< code-block lang="swift" >}}
#if AUTOMATION
if let index = ProcessInfo.processInfo.arguments.firstIndex(of: "-auth_token"),
   index + 1 < ProcessInfo.processInfo.arguments.count {
    let authToken = ProcessInfo.processInfo.arguments[index + 1]
    KeychainManager.shared.save(token: authToken)
    SessionManager.shared.restoreSession(with: authToken)
}
#endif
{{< /code-block >}}

Almacene el token en el Keychain en lugar de `UserDefaults`, para que esté protegido en reposo como un token que su aplicación recibe de un inicio de sesión real.

{{% /tab %}}
{{% tab "React Native" %}}

{{< code-block lang="javascript" >}}
import { LaunchArguments } from 'react-native-launch-arguments';
import * as Keychain from 'react-native-keychain';

if (__DEV__ || Config.AUTOMATION) {
  const { auth_token: authToken } = LaunchArguments.value();
  if (authToken) {
    await Keychain.setGenericPassword('auth_token', authToken);
    SessionManager.restoreSession(authToken);
  }
}
{{< /code-block >}}

`react-native-launch-arguments` lee los argumentos de proceso en iOS y los extras de intent en Android a través de una API. `react-native-keychain` almacena el token en el Keychain o Keystore de la plataforma en lugar de `AsyncStorage`.

{{% /tab %}}
{{< /tabs >}}

## Security considerations {#security-considerations}

Aceptar un token de autenticación inyectado solo en compilaciones de prueba o automatización, nunca en producción. Verifique un flag de compilación antes de leer el argumento, y asegúrese de que dicho flag no esté configurado en las compilaciones que se envían a las tiendas de aplicaciones.

Esto es lo más importante en Android. Un extra de intent enviado a un `Activity` de inicio exportado puede provenir de cualquier aplicación en el dispositivo, no solo del runner de prueba de Datadog. Sin una verificación de flag de compilación, una aplicación de producción que lee y confía en `auth_token` desde su intent de inicio permite que cualquier aplicación local se autentique como la cuenta de prueba.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/mobile_app_testing/
[2]: /es/synthetics/api_tests/http_tests/
[3]: /es/synthetics/platform/settings/#global-variables
[4]: /es/synthetics/api_tests/http_tests/#define-assertions
[5]: /es/synthetics/api_tests/http_tests/#specify-test-frequency
[6]: https://app.datadoghq.com/synthetics/settings
[7]: /es/synthetics/mobile_app_testing/#advanced-options