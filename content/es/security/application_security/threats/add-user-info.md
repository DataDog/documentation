---
aliases:
- /security_platform/application_security/add-user-info
- /security/application_security/add-user-info
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protegerse contra las amenazas con Datadog Application Security Management
- link: /security/application_security/threats/library_configuration/
  tag: Documentación
  text: Otras consideraciones de configuración y opciones de configuración
title: Monitorización y protección del usuario
---

## Información general

Instrumenta tus servicios y rastrea la actividad de los usuarios para detectar y bloquear a los actores malintencionados.

[Añade información del usuario autenticado a las trazas (traces)](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) para identificar y bloquear a los actores malintencionados que se dirijan a tu superficie de ataque autenticada. Para ello, establece la etiqueta (tag) del ID de usuario en la traza de APM en ejecución, proporcionando la instrumentación necesaria para que ASM bloquee a los atacantes autenticados. Esto permite que ASM asocie los ataques y los eventos de la lógica de negocio a los usuarios.

[Rastreo de los inicios de sesión y la actividad de los usuarios](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) para detectar tomas de control de cuentas y abusos de la lógica de negocio con reglas de detección predefinidas y, en última instancia, bloquear a los atacantes.

<div class="alert alert-info">
<strong>Detección automatizada de la actividad de los usuarios:</strong> Las bibliotecas de rastreo de Datadog intentan detectar e informar de eventos de la actividad del usuario <txprotected></txprotected> automáticamente. Para obtener más información, lee <a href="/security/application_security/threats/add-user-info/?pestaña=set_user#disabling-automatic-user-activity-evento-tracking">Desactivación del rastreo automático de eventos de la actividad del usuario </a>.
</div>

Las actividades personalizadas del usuario para las cuales se dispone de reglas de detección predefinidas son las siguientes:

| Nombres de eventos integrados   | Metadatos necesarios                                    | Normas relacionadas                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [Tasa de actividad limitada desde la IP][4]<br>[Actividad no autorizada detectada][5] |
| `users.login.success`  | El ID de usuario es obligatorio, se pueden añadir metadatos opcionales  | [Ataque de relleno de credenciales][6]<br>[Ataque por la fuerza bruta][12]<br>[Relleno de credenciales distribuido][13]               |
| `users.login.failure`  | El ID de usuario y `usr.exists` son obligatorios, se pueden añadir metadatos opcionales  | [Ataque de relleno de credenciales][6]<br>[Ataque por la fuerza bruta][12]<br>[Relleno de credenciales distribuido][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [Excesivas creaciones de cuentas desde una IP][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [Excesiva eliminación de cuentas desde una IP][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "exists": true }`              | [Intentos de restablecimiento de contraseña por la fuerza bruta][9]                                                                                                         |
| `payment.failure`      | Ninguno                                                 | [Excesivos errores de pago desde una IP][10]                                                                                                        |

## Añadir información de usuarios autenticados a trazas y habilitar la capacidad de bloqueo de usuarios

Puedes [añadir etiquetas personalizada a tu tramo (span) raíz][3] o utilizar las funciones de instrumentación descritas a continuación. 

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Utiliza la API del rastreador de Java para añadir etiquetas personalizadas a un tramo raíz y añade la información del usuario para poder monitorizar solicitudes autenticadas en la aplicación.

Se aplican etiquetas de monitorización del usuario en el tramo raíz y comienzan con el prefijo `usr` seguido del nombre del campo. Por ejemplo, `usr.name` es una etiqueta de monitorización del usuario que rastrea el nombre del usuario.

**Nota**: Controla que hayas añadido [las dependencias necesarias a tu aplicación][1].

En el siguiente ejemplo, se muestra cómo obtener el tramo raíz, añadir las etiquetas de monitorización relevantes del usuario y habilitar la capacidad de bloqueo del usuario:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.appsec.api.blocking.Blocking;
import datadog.trace.api.interceptor.MutableSpan;

// Obtener el tramo activo
final Span span = GlobalTracer.get().activeSpan();
si ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // Configurar la etiqueta del ID de usuario obligatorio
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // Configurar las etiquetas de monitorización opcionales del usuario
   localRootSpan.setTag("usr.name", "Jean Example");
   localRootSpan.setTag("usr.email", "jean.example@example.com");
   localRootSpan.setTag("usr.session_id", "987654321");
   localRootSpan.setTag("usr.role", "admin");
   localRootSpan.setTag("usr.scope", "read:message, write:files");
}

Bloquear
    .forUser("d131dd02c56eec4")
    .blockIfMatch();
```

[1]: /es/tracing/trace_collection/custom_instrumentation/opentracing/java#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

El paquete de rastreadores de .NET ofrece la función de `SetUser()`, que te permite monitorizar solicitudes autenticadas añadiendo la información del usuario a la traza.

En el siguiente ejemplo se muestra cómo añadir las etiquetas de monitorización del usuario relevante y activar la capacidad de bloqueo del usuario:

```csharp

using Datadog.Trace;

// ...

    var userDetails = new UserDetails()
    {
        // el identificador interno de los sistemas para los usuarios
        Id = "d41452f2-483d-4082-8728-171a3570e930",
        // la dirección de correo electrónico del usuario
        Email = "test@adventure-works.com",
        // el nombre del usuario, como lo muestra el sistema
        Name = "Jane Doh",
        // el ID de la sesión del usuario
        SessionId = "d0632156-132b-4baa-95b2-a492c5f9cb16",
        // el rol en el cual el usuario está realizando la solicitud
        Role = "standard",
    };
    Tracer.Instance.ActiveScope?.Span.SetUser(userDetails);
```

Para más información y opciones, lee [la documentación del rastreador de .NET][1].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

El paquete de rastreadores de Go ofrece la función de `SetUser()`, que te permite monitorizar solicitudes autenticadas añadiendo la información del usuario a la traza. Para más opciones, consulta [la documentación del rastreador de Go][1].

En este ejemplo se muestra cómo recuperar el tramo del rastreador actual, utilizarlo para configurar las etiquetas de monitorización del usuario y habilitar la capacidad de bloqueo del usuario:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"
func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "my-uid") != nil {
    // Se deberá bloquear al usuario mediante la anulación del controlador de solicitudes tan pronto como sea posible.
    // El middleware de la appsec controla y envía en forma automática la respuesta de bloqueo.
    return 
  }
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Utiliza una de las siguientes API para añadir la información del usuario a una traza de modo que puedas monitorizar las solicitudes autenticadas en la aplicación:

{{< tabs >}}

{{% tab "set_user" %}}

Empezando con `ddtrace` 1.1.0, el método `Datadog::Kit::Identity.set_user` está disponible. Se trata de la API recomendada para añadir la información del usuario a las trazas:

```ruby
# Obtener la traza activa
trace = Datadog::Tracing.active_trace

# Configurar el ID de usuario obligatorio
Datadog::Kit::Identity.set_user(trace, id: 'd131dd02c56eeec4')

# O configurar cualquiera de estas etiquetas de monitorización opcionales del usuario 
Datadog::Kit::Identity.set_user(
  trace,

  # ID obligatorio
  id: 'd131dd02c56eeec4',

  # etiquetas opcionales con una semántica conocida
  name: 'Jean Example',
  email:, 'jean.example@example.com',
  session_id:, '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # etiquetas con forma libre opcionales
  another_tag: 'another_value',
)
```

{{% /tab %}}

{{% tab "set_tag" %}}

Si `Datadog::Kit::Identity.set_user` no satisface tus necesidades, puedes utilizar `set_tag` en su lugar.

Las etiquetas de monitorización del usuario se aplican en la traza y comienzan con el prefijo `usr.` seguido del nombre del campo. Por ejemplo, `usr.name` es una etiqueta de monitorización del usuario que rastrea el nombre del usuario.

En el siguiente ejemplo se muestra cómo obtener la traza activa y añadir las etiquetas de monitorización del usuario:

**Notas**:
- Los valores de las etiquetas deben ser cadenas.
- La etiqueta de `usr.id` es obligatoria.

```ruby
# Obtener la traza activa
trace = Datadog::Tracing.active_trace

# Configurar la etiqueta obligatoria del ID de usuario
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# Configurar las etiquetas de monitorización opcionales del usuario con una semántica conocida
trace.set_tag('usr.name', 'Jean Example')
trace.set_tag('usr.email', 'jean.example@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')

# Configurar las etiquetas con forma libre:
trace.set_tag('usr.another_tag', 'another_value')
```

{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

El rastreador de PHP ofrece la función de `\DDTrace\set_user()`, que te permite monitorizar y bloquear solicitudes autenticadas.

`\DDTrace\set_user()` añade las etiquetas relevantes del usuario y los metadatos a la traza y realiza automáticamente el bloqueo de usuarios.

En el siguiente ejemplo se muestra cómo configurar las etiquetas de monitorización del usuario y habilitar el bloqueo de usuarios:

```php
<?php
// El bloqueo se realiza a través de la llamada a set_user call.
\DDTrace\set_user(
    // Se necesita un identificador único del usuario.
    '123456789',

    // Todos los demás campos son opcionales.
    [
        'name' =>  'Jean Example',
        'email' => 'jean.example@example.com',
        'session_id' => '987654321',
        'role' => 'admin',
        'scope' => 'read:message, write:files',
    ]
);
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

El paquete de rastreadores de Node brinda la función de`tracer.setUser(user)`, que te permite monitorizar solicitudes autenticadas añadiendo la información del usuario a la traza.

En el siguiente ejemplo se muestra cómo añadir etiquetas de monitorización relevantes del usuario relevante y habilitar la capacidad de bloqueo de usuarios:

```javascript
const tracer = require('dd-trace').init()

function handle () {
  tracer.setUser({
    id: '123456789', // *REQUIRED* Identificador único del usuario.

    // Todos los demás campos son opcionales.
    email: 'jane.doe@example.com', // Dirección de correo electrónico del usuario.
    name: 'Jane Doe', // Nombre amigable con el usuario del usuario.
    session_id: '987654321', // ID de la sesión del usuario.
    role: 'admin', // El rol en el cual el usuario está realizando la solicitud.
    scope: 'read:message, write:files', // Ámbitos o autorizaciones otorgadas que el usuario posee actualmente.

    // También se aceptan campos arbitrarios para adjuntar datos personalizados al usuario (RBAC, Oauth, etc...)
    custom_tag: 'custom data'
  })

// Configurar el usuario autenticado actualmente y controlar si está bloqueado
if (tracer.appsec.isUserBlocked(user)) {  // también configurar el usuario autenticado actualmente
  return tracer.appsec.blockRequest(req, res) // se envía la respuesta de bloqueo
  }

}
```

Para más información y opciones, lee [la documentación del rastreador de Node.js][1].



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Monitoriza las solicitudes autenticadas añadiendo la información del usuario a la traza con la función de `set_user` ofrecida por el paquete de rastreadores de Python.

Este ejemplo muestra cómo configurar las etiquetas de monitorización del usuario y habilitar la capacidad de bloqueo de usuarios:

```Python
from ddtrace.contrib.trace_utils import set_user
from ddtrace import tracer
# Llama a set_user() para rastrear el ID de usuario autenticado actualmente
user_id = "som_user_id"
set_user(tracer, user_id, name="John", email="test@test.com", scope="some_scope",
         role="manager", session_id="session_id", propagate=True)
```3

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Añadir la información de la lógica de negocio (inicio de sesión exitoso, inicio de sesión sin éxito, cualquier lógica de negocio) a trazas

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

Empezando en dd-trace-Java v1.8.0, puedes utilizar la API del rastreador de Java para rastrear los eventos del usuario.

En los siguientes ejemplos se muestra cómo rastrear eventos de inicio de sesión o eventos personalizados (utilizando el registro como ejemplo).

{{< tabs >}}
{{% tab "Inicio de sesión exitoso" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // aquí es donde se obtiene un usuario basado en las credenciales de nombre de usuario/contraseña
        User user = checkLogin(userName, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());

        // rastrear los eventos de la autenticación exitosa del usuario
        GlobalTracer
            .getEventTracker()
            .trackLoginSuccessEvent(user.getId(), metadata);

    }
}

```
{{% /tab %}}

{{% tab "Login failure" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // aquí es donde se obtiene el usuario basado en las credenciales de nombre de usuario/contraseña
        User user = checkLogin(userName, password);

        // si la función devuelve null - user doesn't exist
        boolean userExists = (user != null);
        String userId = null;
        Map<String, String> metadata = new HashMap<>();
        if (userExists != null) {
            userId = getUserId(userName)
            metadata.put("email", user.getEmail());
        } else {
            userId = user.getEmail();
        }

        // rastrear eventos de error de autenticación del usuario
        GlobalTracer
            .getEventTracker()
            .trackLoginFailureEvent(userId, userExists, metadata);
    }
}
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doSignup(String userId, String email) {
        // aquí es donde creas tu cuenta de usuario
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("id", user.getId());

        // rastrear los eventos del registro del usuario
        GlobalTracer
            .getEventTracker()
            .trackCustomEvent("users.signup", metadata);
    }
}

```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

Empezando en dd-rastrear-dotnet v2.23.0, puedes utilizar la API del rastreador de .NET para rastrear los eventos del usuario.

Los siguientes ejemplos muestran cómo rastrear los eventos del inicio de sesión o los eventos personalizados (utilizando el registro como ejemplo).

{{< tabs >}}
{{% tab "Login success" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, ...)
{
    // los metadatos son opcionales
    var metadata = new Dictionary<string, string>()
    {
        { "customKey", "customValue" }
    };
    EventTrackingSdk.TrackUserLoginSuccessEvent(userId, metadata);

    // ...
}

```
{{% /tab %}}
{{% tab "Login failure" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonFailure(string userId, bool userExists, ...)
{
    // Si no se puede proporcionar ningún ID de usuario, se puede utilizar cualquier identificador de usuario único (nombre de usuario, dirección de correo electrónico...)
    // los metadatos son opcionales
    var metadata = new Dictionary<string, string>()
    {
        { "customKey", "customValue" }
    };
    EventTrackingSdk.TrackUserLoginFailureEvent(userId, userExists, metadata);

    // ...
}
```

{{% /tab %}}

{{% tab "Custom business logic" %}}
```csharp
void OnUserSignupComplete(string userId, ...)
{
    // el parámetro de metadatos es opcional, pero añadir el "usr.id"
    var metadata = new Dictionary<string, string>()
    {
        { "usr.id", userId }
    };
    // Aprovechar el rastreo de la lógica de negocio personalizada para rastrear registros de los usuarios
    EventTrackingSdk.TrackCustomEvent("users.signup", metadata);

    // ...
}
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Empezando en dd-rastrear-go v1.47.0, puedes utilizar la API del rastreador de Go para rastrear eventos del usuario.

En los siguientes ejemplos se muestra cómo rastrear eventos de inicio de sesión o eventos personalizados (utilizando el registro como ejemplo).

{{< tabs >}}
{{% tab "Login success" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := /* optional extra event metadata */
  userdata := /* optional extra user data */

  // Rastrea un inicio de sesión con éxito, sustituye `my-uid` por un identificador único del usuario (como numérico, nombre de usuario y dirección de correo electrónico)
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "my-uid", metadata, userdata) != nil {
    // El ID de usuario dado se bloquea y el controlador se debe anular lo antes posible.
    // El middleware de appsec envía la respuesta de bloqueo.
    return
  }
}
```
{{% /tab %}}
{{% tab "Login failure" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* si el ID de usuario dado existe o no */
  metadata := /* metadatos de eventos adicionales opcionales */ 
  // Sustituye `my-uid` por un identificador único del usuario (numérico, nombre de usuario, dirección de correo electrónico...)
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // Aprovechar el rastreo de la lógica de negocio personalizada para rastrear registros de usuarios
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Empezando en dd-rastrear-rb v1.9.0, puedes utilizar la API del rastreador de Ruby para rastrear los eventos de los usuarios.

En los siguientes ejemplos se muestra cómo rastrear eventos de inicio de sesión o eventos personalizados (utilizando el registro como ejemplo).

Las trazas que contienen eventos de inicio de sesión con éxito/sin éxito pueden consultarse mediante la siguiente consulta `@appsec.security_activity:business_logic.users.login.success` o `@appsec.security_activity:business_logic.users.login.failure`.

{{< tabs >}}
{{% tab "Login success" %}}
```Ruby
require 'Datadog/kit/appsec/eventos'

rastrear = Datadog::Tracing.active_trace
# Sustituir `my_user_id` por un identificador único del usuario (numérico, nombre de usuario, email...)
Datadog::Kit::AppSec::eventos.track_login_success(rastrear, user: { id: 'my_user_id' })
```
{{% /tab %}}

{{% tab "Login failure" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Sustituir `my_user_id` por un identificador único del usuario (numérico, nombre de usuario, dirección de correo electrónico)

# si el usuario existe
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: true)

# si el usuario no existe
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: false)
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Aprovechar el rastreo de la lógica de negocio para rastrear los registros de usuarios
Datadog::Kit::AppSec::Events.track('users.signup', trace)
```
{{% /tab %}}
{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
Empezando en dd-trace-php v0.84.0, puedes utilizar la API del rastreador de PHP para rastrear eventos de los usuarios.

En los siguientes ejemplos se muestra cómo rastrear eventos del inicio de sesión o eventos personalizado eventos (utilizando el registro como ejemplo).

{{< tabs >}}
{{% tab "Login success" %}}
```php
<?php
\datadog\appsec\track_user_login_success_event($id, ['email' => $email])
?>
```
{{% /tab %}}

{{% tab "Login failure" %}}
```php
<?php
// Si no hay ningún ID de usuario numérico, puedes utilizar cualquier cadena única como el ID de usuario en su lugar (nombre de usuario, dirección de correo electrónico) 
// Asegúrese de que el valor sea único por cada usuario (y no por cada atacante/IP)
\datadog\appsec\track_user_login_failure_event($id, $exists, ['email' => $email])
?>
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```php
<?php
\datadog\appsec\track_custom_event('users.signup', ['id' => $id, 'email' => $email]);
?>
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Empezando en dd-trace-js v3.13.1, puedes utilizar la API del rastreador de NodeJS para rastrear eventos de los usuarios.

En los siguientes ejemplos se muestra cómo rastrear eventos del inicio de sesión o eventos personalizados (utilizando el registro como ejemplo).

{{< tabs >}}
{{% tab "Login success" %}}
```javascript
const tracer = require('dd-trace')

// en un controladorr:
const user = {
  id: 'user-id', // el ID es obligatorio, si no hay ningún ID numérico, servirá cualquier identificador único (nombre de usuario, dirección de correo electrónico...)
  email: 'user@email.com' // otros campos son opcionales
}
const metadata = { custom: 'value' } // metadatos opcionales con campos arbitrarios

// Registra un evento de autenticación de usuario con éxito
tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // los metadatos son opcionales
```
{{% /tab %}}

{{% tab "Login failure" %}}
```javascript
const tracer = require('dd-trace')

// en un controlador:
const userId = 'user-id' // si no hay ningún ID numérico, cualquier identificador único sirve (nombre de usuario, dirección de correo electrónico...)
const userExists = true // si el inicio de sesión del usuario existe en la base de datos, por ejemplo
const metadata = { custom: 'value' } // metadatos opcionales con campos arbitrarios

// los metadatos son opcionales
tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata)
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```javascript
const tracer = require('dd-trace')

// en un controlador:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Empezando en dd-rastrear-py v1.9.0, puedes utilizar la API del rastreador de Python para rastrear los <txprotected>eventos</txprotected> del usuario.

En los siguientes ejemplos se muestra cómo rastrear los eventos del inicio de sesión <txprotected></txprotected> o los <txprotected>eventos</txprotected> personalizados (utilizando el registro como ejemplo).

{{< tabs >}}

{{% tab "Login success" %}}

```python
from ddtrace.appsec.trace_utils import track_user_login_success_event
from ddtrace import tracer
metadata = {"custom": "customvalue"}
# name, email, scope, role, session_id and propagate are optional arguments which 
# default to None except propagate that defaults to True. They'll be 
# passed to the set_user() function
track_user_login_success_event(tracer, "userid", metadata)
```
{{% /tab %}}
{{% tab "Login failure" %}}
```python
from ddtrace.appsec.trace_utils import track_user_login_failure_event
from ddtrace import tracer
metadata = {"custom": "customvalue"}
# exists indica si el usuario que no ha tenido éxito en el inicio de sesión existe en el sistema
exists = False
# si no hay ningún ID de usuario numérico, cualquier identificador único sirve (nombre de usuario, dirección de correo electrónico...)
track_user_login_failure_event(tracer, "userid", exists, metadata)
```
{{% /tab %}}

{{% tab "Custom business logic" %}}

```python
from ddtrace.appsec.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.id": "userid"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Rastrear la información de la lógica de negocio sin modificar el código

Si tu servicio tiene ASM habilitado y la [Configuración remota][1] habilitada, puedes crear una regla WAF personalizada para marcar cualquier solicitud que coincida con una etiqueta de la lógica de negocio personalizada. Esto no necesita ninguna modificación en tu aplicación y se puede hacer completamente desde Datadog.

Para empezar, ve a la [Página de la regla WAF personalizada][2] y haz clic en "Crear regla nueva".

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="Accede al Menú de las reglas WAF personalizadas desde la página principal de ASM haciendo clic en Protección, luego en In-App WAF y Reglas personalizadas" style="width:100%;" >}}

Se abrirá un menú en el cual podrás definir tu regla WAF personalizada. Al seleccionar la categoría "Lógica de negocio", podrás configurar un tipo de evento (por ejemplo, `users.password_reset`). A continuación, podrás seleccionar el servicio que desees rastrear y un endpoint específico. También puedes utilizar la condición de la regla para apuntar a un parámetro específico para identificar el flujo de código que desees _instrumentar_. Cuando la condición coincida, la biblioteca etiquetará la traza y la marca para reenviarla a ASM. Si no necesitas la condición, puedes configurar una condición amplia para que coincida con todo.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Captura de pantalla de la forma que aparece cuando haces clic en el botón Crear regla nueva" style="width:50%;" >}}

Una vez guardada, la regla se despliega en las instancias del servicio que tienen habilitada la Configuración remota.


[1]: /es/agent/remote_config?tab=configurationyamlfile#application-security-management-asm
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## Rastreo automático de eventos de actividad de los usuarios

Cuando ASM está activado, las bibliotecas de rastreo recientes de Datadog intentan detectar los eventos de la actividad del usuario <txprotected></txprotected> automáticamente.

Los <txprotected>eventos</txprotected> que se pueden detectar automáticamente son los siguientes:

- `users.login.success`
- `users.login.failure`
- `users.signup`

### Modo de rastreo automático de eventos de la actividad del usuario

El rastreo automático de la actividad del usuario ofrece dos modos: <code>seguro</code> y <code>ampliado</code>.

En el modo <code>seguro</code>, la biblioteca de rastreo no incluye ninguna información PII en los metadatos de <txprotected>eventos</txprotected>. La biblioteca de rastreo intenta recopilar el ID de usuario y solo si el ID de usuario es un [GUID][10] válido.

En el modo <code>ampliado</code>, la biblioteca de rastreo intenta recopilar el ID de usuario y la dirección de correo electrónico del usuario. En este modo, no controlamos el tipo para que el ID de usuario sea un GUID. La biblioteca de rastreo informa cualquier valor que se pueda extraer del evento.

Para configurar el modo de rastreo automático de eventos del usuario, puedes configurar la variable de entorno <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> en <code>seguro</code> o <code>ampliado</code>. Por defecto, la biblioteca de rastreo utiliza el modo <code>seguro</code>.

**Nota**: Podrían darse casos en los que la biblioteca de rastreo no pueda extraer ninguna información del evento del usuario. El evento se informaría con metadatos vacíos. En esos casos, recomendamos utilizar el [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) para Instrumentar manualmente los <txprotected>eventos</txprotected> del usuario.

## Desactivar el rastreo automático de los eventos de la actividad del usuario

Si deseas desactivar la detección de estos <txprotected>eventos</txprotected>, debes configurar la variable de entorno <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> en <code>desactivada</code>. Esto se debe configurar en la aplicación que aloja la biblioteca de rastreo de Datadog y no en el Datadog Agent .

## Referencias adicionales

{{< nombre parcial="whats-next/whats-next.html" >}}


[3]: /es/tracing/trace_collection/custom_instrumentation/
[4]: /es/security/default_rules/bl-rate-limiting/
[5]: /es/security/default_rules/bl-privilege-violation-user/
[6]: /es/security/default_rules/appsec-ato-groupby-ip/
[7]: /es/security/default_rules/bl-signup-ratelimit/
[8]: /es/security/default_rules/bl-account-deletion-ratelimit/
[9]: /es/security/default_rules/bl-password-reset/
[10]: /es/security/default_rules/bl-payment-failures/
[11]: https://guid.one/guid
[12]: /es/security/default_rules/appsec-ato-bf/
[13]: /es/security/default_rules/distributed-ato-ua-asn/