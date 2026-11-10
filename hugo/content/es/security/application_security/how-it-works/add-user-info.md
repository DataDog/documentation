---
aliases:
- /es/security_platform/application_security/add-user-info
- /es/security/application_security/add-user-info
- /es/security/application_security/threats/add-user-info/
further_reading:
- link: https://www.datadoghq.com/blog/app-api-protection-python-lambda-monitoring/
  tag: Blog
  text: Detecte amenazas en tiempo de ejecución en funciones Lambda de Python con
    Datadog AAP
title: Seguimiento y protección de usuarios
---
## Descripción general {#overview}

Instrumente sus servicios y rastree la actividad del usuario para detectar y bloquear a los actores malintencionados.

[Agregue información de usuario autenticado en las trazas](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) para identificar y bloquear a los actores malintencionados que atacan su superficie de ataque autenticada. Para hacer esto, establezca la etiqueta de ID de usuario en la traza de APM en ejecución, proporcionando la instrumentación necesaria para que AAP bloquee a los atacantes autenticados. Esto permite que AAP asocie ataques y eventos de lógica de negocio a los usuarios.

[Rastree los inicios de sesión y la actividad del usuario](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) para detectar apropiaciones de cuentas y abuso de la lógica de negocio con reglas de detección listas para usar, y para finalmente bloquear a los atacantes.

La actividad de usuario personalizada para la cual hay reglas de detección listas para usar disponibles son las siguientes:

| Nombres de eventos integrados   | Metadatos requeridos                                    | Reglas relacionadas                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [Actividad con límite de tasa desde IP][4]<br>[Actividad no autorizada detectada][5] |
| `users.login.success`  | El ID de usuario es obligatorio, se puede agregar metadatos opcionales | [Ataque de relleno de credenciales][6]<br>[Ataque de fuerza bruta][12]<br>[Relleno de credenciales distribuido][13]               |
| `users.login.failure`  | El ID de usuario y `usr.exists` son obligatorios, se puede agregar metadatos opcionales | [Ataque de relleno de credenciales][6]<br>[Ataque de fuerza bruta][12]<br>[Relleno de credenciales distribuido][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [Creaciones excesivas de cuentas desde una IP][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [Eliminación excesiva de cuentas desde una IP][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [Intentos de fuerza bruta de restablecimiento de contraseña][9]                                                                                                         |
| `payment.failure`      | Ninguno                                                 | [Fallos excesivos de pago desde IP][10]                                                                                                        |

## Agregar información de usuario autenticado a las trazas y habilitar la capacidad de bloqueo de usuarios {#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability}

<div class="alert alert-info">
<strong>Detección automatizada de actividad del usuario:</strong> Los SDK de Datadog intentan detectar y reportar eventos de actividad del usuario automáticamente. Para obtener más información, consulte <a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">Deshabilitar el seguimiento automático de eventos de actividad del usuario</a>.
</div>

Puede [agregar etiquetas personalizadas a su span raíz][3], o utilizar las funciones de instrumentación descritas a continuación.

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Utilice la API del rastreador de Java para agregar etiquetas personalizadas a un span raíz y añadir información del usuario para que pueda hacer un seguimiento de las solicitudes autenticadas en la aplicación.

Las etiquetas de seguimiento de usuario se aplican en el span raíz y comienzan con el prefijo `usr` seguido del nombre del campo. Por ejemplo, `usr.name` es una etiqueta de seguimiento de usuario que rastrea el nombre del usuario.

**Nota**: Verifique que haya agregado [las dependencias necesarias a su aplicación][1].

El ejemplo a continuación muestra cómo obtener el span raíz, agregar las etiquetas de seguimiento de usuario relevantes y habilitar la capacidad de bloqueo de usuarios:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.appsec.api.blocking.Blocking;
import datadog.trace.api.interceptor.MutableSpan;

// Get the active span
final Span span = GlobalTracer.get().activeSpan();
if ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // Setting the mandatory user id tag
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // Setting optional user monitoring tags
   localRootSpan.setTag("usr.name", "Jean Example");
   localRootSpan.setTag("usr.email", "jean.example@example.com");
   localRootSpan.setTag("usr.session_id", "987654321");
   localRootSpan.setTag("usr.role", "admin");
   localRootSpan.setTag("usr.scope", "read:message, write:files");
}

Blocking
    .forUser("d131dd02c56eec4")
    .blockIfMatch();
```

[1]: /es/tracing/trace_collection/custom_instrumentation/opentracing/java#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

El paquete del rastreador .NET proporciona la función `SetUser()`, que le permite hacer un seguimiento de las solicitudes autenticadas agregando información del usuario a la traza.

El ejemplo a continuación muestra cómo agregar las etiquetas de seguimiento de usuario relevantes y habilitar la capacidad de bloqueo de usuarios:

```csharp

using Datadog.Trace;

// ...

    var userDetails = new UserDetails()
    {
        // the systems internal identifier for the users
        Id = "d41452f2-483d-4082-8728-171a3570e930",
        // the email address of the user
        Email = "test@adventure-works.com",
        // the user's name, as displayed by the system
        Name = "Jane Doh",
        // the user's session id
        SessionId = "d0632156-132b-4baa-95b2-a492c5f9cb16",
        // the role the user is making the request under
        Role = "standard",
    };
    Tracer.Instance.ActiveScope?.Span.SetUser(userDetails);
```

Para obtener información y opciones, lea [la documentación del rastreador .NET][1].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

El paquete del rastreador de Go proporciona la función `SetUser()`, que le permite hacer un seguimiento de las solicitudes autenticadas agregando información del usuario a la traza. Para más opciones, consulte [la documentación del rastreador de Go][2] (o [la documentación de v1][1]).

Este ejemplo muestra cómo recuperar el span del rastreador actual, usarlo para establecer etiquetas de seguimiento de usuario y habilitar la capacidad de bloqueo de usuarios. {{% tracing-go-v2 %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "my-uid") != nil {
    // The user must be blocked by aborting the request handler asap.
    // The blocking response is automatically handled and sent by the appsec middleware.
    return
  }
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#SetUser

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Utilice una de las siguientes API para agregar información del usuario a una traza de modo que pueda hacer un seguimiento de las solicitudes autenticadas en la aplicación:

{{% collapse-content title="set_user" level="h3" expanded="true" %}}

A partir de `ddtrace` 1.1.0, el método `Datadog::Kit::Identity.set_user` está disponible. Esta es la API recomendada para agregar información del usuario a las trazas:

```ruby
# Get the active trace
trace = Datadog::Tracing.active_trace

# Set mandatory user id tag
Datadog::Kit::Identity.set_user(trace, id: 'd131dd02c56eeec4')

# Or set any of these optional user monitoring tags
Datadog::Kit::Identity.set_user(
  trace,

  # mandatory id
  id: 'd131dd02c56eeec4',

  # optional tags with known semantics
  name: 'Jean Example',
  email: 'jean.example@example.com',
  session_id: '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # optional free-form tags
  another_tag: 'another_value',
)
```
{{% /collapse-content %}}

{{% collapse-content title="set_tag" level="h3" expanded="false" id="ruby-set-tag" %}}

Si `Datadog::Kit::Identity.set_user` no satisface sus necesidades, puede usar `set_tag` en su lugar.

Las etiquetas de seguimiento de usuario se aplican en la traza y comienzan con el prefijo `usr.` seguido del nombre del campo. Por ejemplo, `usr.name` es una etiqueta de seguimiento de usuario que rastrea el nombre del usuario.

El siguiente ejemplo muestra cómo obtener la traza activa y agregar etiquetas de seguimiento de usuario relevantes:

**Notas**:
- Los valores de las etiquetas deben ser cadenas.
- La etiqueta `usr.id` es obligatoria.

```ruby
# Get the active trace
trace = Datadog::Tracing.active_trace

# Set mandatory user id tag
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# Set optional user monitoring tags with known sematics
trace.set_tag('usr.name', 'Jean Example')
trace.set_tag('usr.email', 'jean.example@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')

# Set free-form tags:
trace.set_tag('usr.another_tag', 'another_value')
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

El trazador de PHP proporciona la función `\DDTrace\set_user()`, que le permite hacer un seguimiento y bloquear solicitudes autenticadas.

`\DDTrace\set_user()` agrega las etiquetas de usuario y los metadatos relevantes a la traza y realiza automáticamente el bloqueo de usuarios.

El siguiente ejemplo muestra cómo configurar etiquetas de seguimiento de usuario y habilitar el bloqueo de usuarios:

```php
<?php
// Blocking is performed internally through the set_user call.
\DDTrace\set_user(
    // A unique identifier of the user is required.
    '123456789',

    // All other fields are optional.
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

El paquete del trazador de Node proporciona la función `tracer.setUser(user)`, que le permite hacer un seguimiento de las solicitudes autenticadas agregando información del usuario a la traza.

El siguiente ejemplo muestra cómo agregar etiquetas de seguimiento de usuario relevantes y habilitar la capacidad de bloqueo de usuarios:

```javascript
const tracer = require('dd-trace').init()

function handle () {
  tracer.setUser({
    id: '123456789', // *REQUIRED* Unique identifier of the user.

    // All other fields are optional.
    email: 'jane.doe@example.com', // Email of the user.
    name: 'Jane Doe', // User-friendly name of the user.
    session_id: '987654321', // Session ID of the user.
    role: 'admin', // Role the user is making the request under.
    scope: 'read:message, write:files', // Scopes or granted authorizations the user currently possesses.

    // Arbitrary fields are also accepted to attach custom data to the user (RBAC, Oauth, etc…)
    custom_tag: 'custom data'
  })

// Set the currently authenticated user and check whether they are blocked
if (tracer.appsec.isUserBlocked(user)) {  // also set the currently authenticated user
  return tracer.appsec.blockRequest(req, res) // blocking response is sent
  }

}
```

Para obtener información y opciones, lea [la documentación del trazador de Node.js][1].



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

A partir de dd-trace-py v3.7, puede utilizar el nuevo SDK del trazador de Python para hacer un seguimiento de los usuarios y de sus eventos.

En versiones anteriores, puede hacer un seguimiento de las solicitudes autenticadas agregando información del usuario a la traza con la función `set_user` proporcionada por el paquete del trazador de Python.

{{% collapse-content title="SDK de seguimiento de usuarios" level="h3" expanded="true" id="python-user-info-sdk" %}}

A partir de dd-trace-py v3.7, este ejemplo muestra cómo configurar etiquetas de seguimiento de usuario y habilitar la capacidad de bloqueo de usuarios:

```python
from ddtrace.appsec.track_user_sdk import track_user

# starting in dd-trace-py v3.17, you can use track_user_id
# without login information, but user_id is required
# this is the recommended API since it enables best product functionality with least room for mistakes
track_user_id(
    "some_user_id",
    session_id="session_id",
    metadata={
        "name": "John",
        "email": "test@test.com",
        "scope": "some_scope",
        "role": "manager",
    },
)

# Alternatively, you can use track_user
user_login = "some_login"
# to enable all features (user_id and/or session_id monitoring and blocking), 
# make sure you provide the corresponding optional arguments
track_user(
    user_login,
    user_id="some_user_id",
    session_id="session_id",
    metadata={
        "name": "John",
        "email": "test@test.com",
        "scope": "some_scope",
        "role": "manager",
    },
)
```

{{% /collapse-content %}}

{{% collapse-content title="API heredada" level="h3" expanded="false" id="python-user-info-legacy" %}}

Este ejemplo muestra cómo configurar etiquetas de seguimiento de usuario y habilitar la capacidad de bloqueo de usuarios utilizando la API heredada; sin embargo, se recomienda utilizar el nuevo SDK de seguimiento de usuarios, descrito anteriormente.

```python
from ddtrace.contrib.trace_utils import set_user
from ddtrace import tracer
# Call set_user() to trace the currently authenticated user id
user_id = "some_user_id"
set_user(tracer, user_id, name="John", email="test@test.com", scope="some_scope",
         role="manager", session_id="session_id", propagate=True)
```

{{% /collapse-content %}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Agregar información de lógica de negocio (éxito de inicio de sesión, error de inicio de sesión, cualquier lógica de negocio) a las trazas {#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces}

<div class="alert alert-info">
<strong>Una nota sobre usr.id y usr.login:</strong> La investigación del abuso de inicio de sesión se basa en dos conceptos similares, pero diferentes. usr.id contiene el identificador único de la cuenta de usuario en la base de datos. Es único e inmutable. No está disponible cuando alguien intenta iniciar sesión en una cuenta inexistente. El bloqueo de usuarios tiene como objetivo usr.id.</br>
Por lo general, el usuario no conoce su ID de usuario. En su lugar, confía en identificadores mutables (número de teléfono, nombre de usuario, dirección de correo electrónico...). La cadena utilizada por el usuario para iniciar sesión en una cuenta debe informarse como usr.login en los eventos de inicio de sesión.</br>
Si no se proporciona usr.login, se utilizará usr.id en su lugar.</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

A partir de dd-trace-java v1.8.0, puede utilizar la API del trazador de Java para hacer un seguimiento de los eventos de usuario.

Los siguientes ejemplos muestran cómo hacer un seguimiento de los eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Inicio de sesión correcto" level="h3" expanded="true" %}}

```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("usr.login", userName);

        // If your system has multiple "tenants", please provide it. A tenant is an environment/group of user
        metadata.put("usr.org", usr.getTenant());

        // track user authentication success events
        GlobalTracer
            .getEventTracker()
            .trackLoginSuccessEvent(user.getId(), metadata);

    }
}

```
{{% /collapse-content %}}

{{% collapse-content title="Error de inicio de sesión" level="h3" expanded="false" id="java-login-failure" %}}

```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        // if function returns null - user doesn't exist
        boolean userExists = (user != null);
        String userId = null;
        Map<String, String> metadata = new HashMap<>();
        metadata.put("usr.login", userName);
        if (userExists) {
            userId = getUserId(userName);
            metadata.put("email", user.getEmail());
        } else {
            userId = userName;
        }

        // track user authentication error events
        GlobalTracer
            .getEventTracker()
            .trackLoginFailureEvent(userId, userExists, metadata);
    }
}
```
{{% /collapse-content %}}

{{% collapse-content title="Lógica de negocio personalizada" level="h3" expanded="false" id="java-custom-business" %}}

```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doSignup(String userId, String email) {
        // this is where you create your user account
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("usr.id", user.getId());

        // track user signup events
        GlobalTracer
            .getEventTracker()
            .trackCustomEvent("users.signup", metadata);
    }
}

```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

A partir de dd-trace-dotnet v2.23.0, puede utilizar la API del trazador de .NET para hacer un seguimiento de eventos de usuario.

Los siguientes ejemplos muestran cómo hacer un seguimiento de los eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Inicio de sesión correcto" level="h3" expanded="true" %}}

```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, string login...)
{
    // metadata is optional
    var metadata = new Dictionary<string, string>()
    {
        { "usr.login", login }
    };
    EventTrackingSdk.TrackUserLoginSuccessEvent(userId, metadata);

    // ...
}

```
{{% /collapse-content %}}
{{% collapse-content title="Error de inicio de sesión" level="h3" expanded="false" id="dotnet-login-failure" %}}

```csharp
using Datadog.Trace.AppSec;

void OnLogonFailure(string userId, string login, bool userExists, ...)
{
    // If no userId can be provided, any unique user identifier (username, email...) may be used
    // metadata is optional
    var metadata = new Dictionary<string, string>()
    {
        { "usr.login", login }
    };
    EventTrackingSdk.TrackUserLoginFailureEvent(userId, userExists, metadata);

    // ...
}
```
{{% /collapse-content %}}

{{% collapse-content title="Lógica de negocio personalizada" level="h3" expanded="false" id="dotnet-custom-business" %}}

```csharp
void OnUserSignupComplete(string userId, ...)
{
    // the metadata parameter is optional, but adding the "usr.id"
    var metadata = new Dictionary<string, string>()
    {
        { "usr.id", userId }
    };
    // Leveraging custom business logic tracking to track user signups
    EventTrackingSdk.TrackCustomEvent("users.signup", metadata);

    // ...
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

A partir de dd-trace-go v1.47.0, puede utilizar la API del trazador de Go para hacer un seguimiento de eventos de usuario.

Los siguientes ejemplos muestran cómo hacer un seguimiento de los eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo). {{% tracing-go-v2 %}}

{{% collapse-content title="Inicio de sesión correcto" level="h3" expanded="true" %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := make(map[string]string) /* optional extra event metadata */
  userdata := /* optional extra user data */

  metadata["usr.login"] = "user-email"

  // Track login success, replace `my-uid` by a unique identifier of the user (such as numeric, username, and email)
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "my-uid", metadata, userdata) != nil {
    // The given user id is blocked and the handler should be aborted asap.
    // The blocking response will be sent by the appsec middleware.
    return
  }
}
```
{{% /collapse-content %}}
{{% collapse-content title="Error de inicio de sesión" level="h3" expanded="false" id="go-login-failure" %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* whether the given user id exists or not */
  metadata := make(map[string]string) /* optional extra event metadata */
  metadata["usr.login"] = "user-email"

  // Replace `my-uid` by a unique identifier of the user (numeric, username, email...)
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```
{{% /collapse-content %}}

{{% collapse-content title="Lógica de negocio personalizada" level="h3" expanded="false" id="go-custom-business" %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // Leveraging custom business logic tracking to track user signups
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

A partir de dd-trace-rb v1.9.0, puede utilizar la API del trazador de Ruby para rastrear eventos de usuario. La versión v2.19.0 de dd-trace-rb introduce nuevos métodos bajo el espacio de nombres `Datadog::Kit::AppSec::Events::V2`. Los métodos de rastreo de eventos existentes se conservan por compatibilidad.

Los siguientes ejemplos muestran cómo hacer un seguimiento de los eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Inicio de sesión correcto" level="h3" expanded="true" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com'
user = 'some-user-id'    # any unique string identifier (i.e. id, username or email)
user = {                 # or user could be a Hash with an id and other fields
  id: 'some-user-id',    # id is mandatory
  email: 'user@some.com' # other fields are optional
}
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_success(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Error de inicio de sesión" level="h3" expanded="false" id="ruby-login-failure" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # the string used by the user to log in
user_exists = true      # if the user login exists in database for example
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Lógica de negocio personalizada" level="h3" expanded="false" id="ruby-custom-business" %}}

```ruby
require 'datadog/kit/appsec/events'

span = nil
trace = Datadog::Tracing.active_trace
metadata = { 'usr.id': 'some-user-id' }
event_name = 'users.signup'

Datadog::Kit::AppSec::Events.track(event_name, trace, span, metadata)
```
{{% /collapse-content %}}

#### Migración a los nuevos métodos de inicio de sesión correcto y error de inicio de sesión {#migrating-to-the-new-login-success-and-failure-methods}

Los nuevos métodos en `Datadog::Kit::AppSec::Events::V2` introducen un orden de parámetros más intuitivo y una separación de responsabilidades más clara. Estos son los cambios clave:

1. El identificador de inicio de sesión (correo electrónico, nombre de usuario) es el primer parámetro y es obligatorio.
2. El objeto/ID de usuario es opcional en los eventos de éxito y se ha eliminado de los eventos de error.
3. Los metadatos se han simplificado y ya no requieren el campo `usr.login`.
4. Los parámetros de traza y tramo ya no son necesarios y se infieren automáticamente.

**Nota**: los métodos heredados `track_login_success` y `track_login_failure` están obsoletos en favor de los nuevos métodos `track_user_login_success` y `track_user_login_failure`, respectivamente.

En el siguiente ejemplo, el código comentado ya no es necesario.

{{% collapse-content title="Inicio de sesión correcto" level="h5" expanded="true" id="ruby-v2-migration-login-success" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # new mandatory argument
user = {                # same as before, but now the Hash is optional
  id: 'some-user-id',   # providing a user ID will nonetheless help with post-compromised activity correlation
  email: 'user@some.com'
}
metadata = {
# 'usr.login': 'user@some.com', this is no longer necessary in metadata, but became the required first parameter
  'some.key': 'value'
}

# deprecated
# Datadog::Kit::AppSec::Events.track_login_success(trace, span, user: user, **metadata)

Datadog::Kit::AppSec::Events::V2.track_user_login_success(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Error de inicio de sesión" level="h5" expanded="false" id="ruby-v2-migration-login-failure" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # new mandatory argument
user_exists = true      # if the user login exists in database for example
metadata = {
# 'usr.login': 'user@some.com', this is no longer necessary in metadata, but became the required first parameter
  'some.key': 'value'
}

# deprecated
# Datadog::Kit::AppSec::Events.track_login_failure(trace, span, user_exists: user_exists, user_id: login, **metadata)

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
A partir de dd-trace-php v0.84.0, puede utilizar la API del trazador de PHP para rastrear eventos de usuario. La versión v1.11.0 de dd-trace-php introduce nuevos métodos bajo el espacio de nombres `\datadog\appsec\v2\`. Los métodos de rastreo de eventos existentes se conservan por compatibilidad.

Los siguientes ejemplos muestran cómo hacer un seguimiento de los eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Inicio de sesión correcto" level="h3" expanded="true" %}}

```php
<?php
$user = [
    'id' => 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
    'email' => 'user@email.com' // other fields are optional
]; //User data can be provided as an array
$user = 'user-id'; //or user could be just an ID
$login = 'user@email.com';
$metadata = [ 'key' => 'value' ]; // you can add arbitrary fields to metadata

// Log a successful user authentication event
// user and metadata are optional
\datadog\appsec\v2\track_user_login_success($login, $user, $metadata);
?>
```
{{% /collapse-content %}}

{{% collapse-content title="Error de inicio de sesión" level="h3" expanded="false" id="php-login-failure" %}}

```php
<?php
$login = 'user-id'; // the string used by the user to log in
$userExists = true; // if the user login exists in database or not
$metadata = [ 'key' => 'value' ]; // you can add arbitrary fields to metadata

// Log a failed user authentication event
// userExists is optional and it defaults to false
// metadata is optional
\datadog\appsec\v2\track_user_login_failure($login, $userExists, $metadata);
?>
```
{{% /collapse-content %}}

{{% collapse-content title="Lógica de negocio personalizada" level="h3" expanded="false" id="php-custom-business" %}}

```php
<?php
$eventName = 'users.signup'; // custom event name
$metadata = ['usr.id' => $id]; // you can add arbitrary fields to metadata
\datadog\appsec\track_custom_event($eventName, $metadata);
?>
```
{{% /collapse-content %}}

#### Migración a los nuevos métodos de inicio de sesión correcto y error de inicio de sesión {#migrating-to-the-new-login-success-and-failure-methods-1}

Los nuevos métodos en el espacio de nombres `\datadog\appsec\v2\` introducen un orden de parámetros más intuitivo y una separación de responsabilidades más clara. Estos son los cambios clave:

1. El identificador de inicio de sesión (correo electrónico, nombre de usuario) es el primer parámetro y es obligatorio.
2. El arreglo/ID de usuario es opcional en los eventos de éxito y se ha eliminado de los eventos de error.
3. Los metadatos se han simplificado y ya no requieren el campo `usr.login`.

**Nota**: los métodos heredados `\datadog\appsec\track_user_login_success_event` y `\datadog\appsec\track_user_login_failure_event` están obsoletos en favor de los nuevos métodos `\datadog\appsec\v2\track_user_login_success` y `\datadog\appsec\v2\track_user_login_failure`, respectivamente.

En el siguiente ejemplo, el código comentado ya no es necesario.

{{% collapse-content title="Inicio de sesión correcto" level="h5" expanded="true" %}}

```php
<?php
// in a controller:
$user = [
    'id' => 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
    'email' => 'user@email.com' // other fields are optional
]; // same as before, but now the array is optional. Providing a user ID nonetheless helps with post-compromised activity correlation

$login = 'user@email.com'; // new mandatory argument

$metadata = [
//  'usr.login' => 'user@email.com', this is no longer necessary in metadata. Must be the first argument
  'key' => 'value'
];

// \datadog\appsec\track_user_login_success_event($user, $metadata) // deprecated
\datadog\appsec\v2\track_user_login_success($login, $user, $metadata);
?>
```
{{% /collapse-content %}}

{{% collapse-content title="Error de inicio de sesión" level="h5" expanded="false" id="php-migration-login-failure" %}}

```php
<?php

$userId = 'user-id'; // No longer mandatory, but helpful when available
$login = 'user@email.com'; // new mandatory argument
$userExists = true;
$metadata = [
//  'usr.login' => 'user@email.com', this is no longer necessary in metadata. Must be the first argument
  'usr.id' => 'user-id', // Helps with correlating login failures with the rest of the user activity
  'key' => 'value'
];

// \datadog\appsec\track_user_login_failure_event($userId, $exists, $metadata); // deprecated
\datadog\appsec\v2\track_user_login_failure($login, $userExists, $metadata);
```
{{% /collapse-content %}}
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

A partir de dd-trace-js v3.13.1, puede utilizar la API del trazador de Node.js para rastrear eventos de usuario. La versión v5.48.0 de dd-trace-js introduce nuevos métodos bajo el espacio de nombres `eventTrackingV2`. Los métodos de rastreo de eventos existentes se conservan por compatibilidad.


Los siguientes ejemplos muestran cómo hacer un seguimiento de los eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Inicio de sesión correcto" level="h3" expanded="true" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
  id: 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
  email: 'user@email.com' // other fields are optional
}
// Alternatively: const user = 'user-id' (user can be just the ID string)
const login = 'user@email.com'
const metadata = { 'key': 'value' } // you can add arbitrary fields

// Log a successful user authentication event
// user and metadata are optional
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Error de inicio de sesión" level="h3" expanded="false" id="nodejs-login-failure" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const login = 'user-id' // the string used by the user to log in
const userExists = true // if the user login exists in database for example
const metadata = { 'key': 'value' } // you can add arbitrary fields

// Log a failed user authentication event
// userExists is optional and it is defaulted to false
// metadata is optional
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Lógica de negocio personalizada" level="h3" expanded="false" id="nodejs-custom-business" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

#### Migración a los nuevos métodos de inicio de sesión correcto y error de inicio de sesión {#migrating-to-the-new-login-success-and-failure-methods-2}

Los nuevos métodos en `eventTrackingV2` introducen un orden de parámetros más intuitivo y una separación de responsabilidades más clara. Estos son los cambios clave:

1. El identificador de inicio de sesión (correo electrónico, nombre de usuario) es el primer parámetro y es obligatorio.
2. El objeto/ID de usuario es opcional en los eventos de éxito y se ha eliminado de los eventos de error.
3. Los metadatos se han simplificado y ya no requieren el campo `usr.login`.

**Nota**: los métodos heredados `trackUserLoginSuccessEvent` y `trackUserLoginFailureEvent` están obsoletos en favor de los nuevos métodos `eventTrackingV2.trackUserLoginSuccess` y `eventTrackingV2.trackUserLoginFailure`, respectivamente.

En el siguiente ejemplo, el código comentado ya no es necesario.

{{% collapse-content title="Inicio de sesión correcto" level="h5" expanded="true" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
  id: 'user-id',
  email: 'user@email.com'
} // same as before, but now the object is optional. Providing a user ID will nonetheless help with post-compromised activity correlation

const login = 'user@email.com' // new mandatory argument

const metadata = {
//  'usr.login': 'user@email.com', this is no longer necessary in metadata. Must be the main argument
  'key': 'value'
}

// tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // deprecated
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Error de inicio de sesión" level="h5" expanded="false" id="nodejs-migration-login-failure" %}}

```javascript
const tracer = require('dd-trace')

// in a controller with the deprecated method:
const userId = 'user-id' // No longer mandatory, but helpful when available
const login = 'user@email.com' // new mandatory argument
const userExists = true
const metadata = {
//  'usr.login': 'user@email.com', this is no longer necessary in metadata. Must be the first argument
  'usr.id': userId, // Helps with correlating login failures with the rest of the user activity
  'key': 'value'
}

// tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata) // deprecated
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}


A partir de dd-trace-py v1.9.0, puede utilizar la API del trazador de Python para rastrear eventos de usuario.

A partir de dd-trace-py v3.7, puede utilizar el nuevo SDK del trazador de Python para hacer un seguimiento de los usuarios y de sus eventos.

Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión, eventos de registro o eventos personalizados.

{{% collapse-content title="SDK de seguimiento de usuarios" level="h3" expanded="true" id="python-business-logic-sdk" %}}

Disponible desde dd-trace-py v3.7, `track_user_sdk` proporciona 5 funciones:

- `track_login_success`
- `track_login_failure`
- `track_signup`
- `track_custom_event`
- `track_user`

Disponible desde dd-trace-py v3.17, `track_user_sdk` proporciona esta función adicional:

- `track_user_id`


```python
from ddtrace.appsec import track_user_sdk

## This function should be called when a user successfully logs in to the
# application.

# user_id and metadata are optional
metadata = {"usr.email": "user@email.com"}
track_user_sdk.track_login_success(
    "some_user_login",
    user_id="some_user_id",
    metadata=metadata,
)


## This function should be called when a user fails to log in to the
# application.

# user_id and metadata are optional
metadata = {"usr.error": "login failure"}

# If you want to track the login failure as a "login do not exists"
exists = False
track_user_sdk.track_login_failure(
    "some_user_login",
    exists,
    metadata=metadata,
)

# If you want to track the login failure as a "login exists but
# authentification failed
exists = True
track_user_sdk.track_login_failure(
    "some_user_login",
    exists,
    user_id="some_user_id",
    metadata=metadata,
)


## This function should be called when a user successfully signs up for
# the application.

# user_id, success and metadata are optional, success is True by default.
metadata = {"usr.email": "user@email.com"}
track_user_sdk.track_signup(
    "some_user_login",
    user_id="some_user_id",
    success=True,
    metadata=metadata,
)


## This function should be called when a custom user event occurs in the
# application.

# metadata is required
metadata = {
    "usr.address": {"line1": "221b Baker Street", "city": "London"},
    "phone": "0123456789",
}
track_user_sdk.track_custom_event("my_event_name", metadata)

```
{{% /collapse-content %}}

{{% collapse-content title="Aplicación de prueba FastAPI con SDK" level="h3" expanded="false" id="python-business-logic-example" %}}

El siguiente ejemplo es una aplicación de prueba completamente funcional que utiliza el SDK de seguimiento de usuario con una base de datos de usuario basada en memoria. Este ejemplo ilustra el posible uso del SDK, pero no proporciona los requisitos necesarios de una aplicación real, como un modelo de datos persistente o un sistema de autenticación seguro.

```python
from uuid import uuid4

import ddtrace.auto  # noqa: F401
from ddtrace.appsec.track_user_sdk import (
    track_custom_event,
    track_login_failure,
    track_login_success,
    track_signup,
    track_user,
)
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware


class User(BaseModel):
    user_id: str
    username: str
    password: str


users: dict[str, User] = {}

app = FastAPI()


@app.middleware("http")
async def track_user_middleware(request: Request, call_next):
    user = request.session.get("username")
    session_id = request.session.get("session_id")
    if user and session_id and user in users:
        track_user(user, users[user].user_id, session_id=session_id)
    return await call_next(request)


session_secret = "just-a-test"
app.add_middleware(SessionMiddleware, secret_key=session_secret)


@app.post("/signup")
async def signup(username: str, password: str):
    if username in users:
        return JSONResponse(
            {"error": "User already exists"},
            status_code=400,
        )

    user_id = str(uuid4())
    users[username] = User(
        user_id=user_id,
        username=username,
        password=password,
    )

    track_signup(username, user_id, success=True)
    return {"message": "User created successfully"}


@app.post("/login")
async def login(username: str, password: str, request: Request):
    if username not in users:
        track_login_failure(username, False)
        return JSONResponse(
            {"error": "Invalid user password combination"},
            status_code=403,
        )

    if users[username].password != password:
        track_login_failure(username, True, users[username].user_id)
        return JSONResponse(
            {"error": "Invalid user password combination"},
            status_code=403,
        )

    track_login_success(username, users[username].user_id)
    request.session["username"] = username
    request.session["session_id"] = str(uuid4())

    return {"message": "Login successful"}


@app.get("/whoami")
async def whoami(request: Request) -> User:
    if (
        "username" not in request.session
        or request.session["username"] not in users
    ):
        raise HTTPException(status_code=403, detail="User not logged in")

    track_custom_event(
        "user_has_forgotten_who_they_are",
        metadata={
            "username": request.session["username"],
            "session_id": request.session["session_id"],
        },
    )
    return users[request.session["username"]]
```

{{% /collapse-content %}}


{{% collapse-content title="API heredada" level="h3" expanded="false" id="python-business-logic-legacy" %}}

El método preferido es utilizar el nuevo SDK de seguimiento de usuario (disponible desde dd-trace-py v1.9) en lugar de la API heredada.

```python
from ddtrace.appsec.trace_utils import track_user_login_success_event
from ddtrace.appsec.trace_utils import track_user_login_failure_event
from ddtrace.appsec.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# name, email, scope, role, session_id and propagate are optional arguments which
# default to None except propagate that defaults to True. They'll be
# passed to the set_user() function
track_user_login_success_event(tracer, "userid", metadata)


# exists indicates if the failed login user exists in the system
exists = False
# if no numeric userId is available, any unique identifier will do (username, email...)
track_user_login_failure_event(tracer, "userid", exists, metadata)


metadata = {"usr.id": "userid"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Seguimiento de información de lógica de negocio sin modificar el código {#tracking-business-logic-information-without-modifying-the-code}

Si su servicio tiene AAP habilitado y [Remote Configuration][1] habilitada, puede crear una regla WAF personalizada para marcar cualquier solicitud que coincida con una etiqueta de lógica de negocio personalizada. Esto no requiere ninguna modificación en su aplicación y se puede realizar completamente desde Datadog.

Para comenzar, navegue a la [página de Reglas WAF personalizadas][2] y haga clic en {{< ui >}}Create New Rule{{< /ui >}}.

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="Acceda al menú de Reglas WAF personalizadas desde la página de inicio de AAP haciendo clic en Protección, luego en WAF en la aplicación y Reglas personalizadas" style="width:100%;" >}}

Esto abrirá un menú en el que puede definir su regla WAF personalizada. Al seleccionar la categoría {{< ui >}}Business Logic{{< /ui >}}, podrá configurar un tipo de evento (por ejemplo, `users.password_reset`). Luego puede seleccionar el servicio que desea rastrear y un punto de conexión específico. También puede usar la condición de regla para apuntar a un parámetro específico para identificar el flujo de código que desea _instrumentar_. Cuando la condición coincide, la biblioteca etiqueta la traza y la marca para que se reenvíe a AAP. Si no necesita la condición, puede establecer una condición amplia para que coincida con todo.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Captura de pantalla del formulario que aparece al hacer clic en el botón Crear nueva regla" style="width:50%;" >}}

Una vez guardada, la regla se implementa en las instancias del servicio que tienen habilitada la Remote Configuration.


[1]: /es/tracing/guide/remote_config
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## Rastreo automático de eventos de actividad del usuario {#automatic-user-activity-event-tracking}

Cuando AAP está habilitado, los SDK de Datadog intentan detectar eventos de actividad del usuario automáticamente.

Los eventos que se pueden detectar automáticamente son:

- `users.login.success`
- `users.login.failure`
- `users.signup`

### Modos de rastreo automático de eventos de actividad del usuario {#automatic-user-activity-event-tracking-modes}

El rastreo automático de actividad del usuario ofrece los siguientes modos:

- `identification` modo (nombre corto: `ident`):
  - Este modo es el predeterminado y siempre recopila el ID de usuario o el mejor esfuerzo.
  - El ID de usuario se recopila al iniciar sesión correctamente y al fallar el inicio de sesión. En caso de fallo, el ID de usuario se recopila independientemente de si el usuario existe o no.
  - Cuando el framework instrumentado no proporciona claramente un ID de usuario, sino un objeto de usuario estructurado, el ID de usuario se determina mediante el mejor esfuerzo basado en los nombres de campo del objeto. Esta lista de nombres de campo se considera, ordenada por prioridad:
    - `id`
    - `email`
    - `username`
    - `login`
    - `user`
  - Si no hay un ID de usuario disponible o no se encuentra, el evento de usuario no se emite.
- `anonymization` modo (nombre corto: `anon`):
  - Este modo es igual que `identification`, pero anonimiza el ID de usuario mediante su hash (SHA256) y recortando el hash resultante.
- `disabled` modo:
  - Las bibliotecas AAP *no* recopilan ningún ID de usuario de su instrumentación automatizada.
  - No se emiten eventos de inicio de sesión de usuario.

<div class="alert alert-info">Todos los modos solo afectan a la instrumentación automatizada. Los modos no se aplican a la recopilación manual. La recopilación manual se configura mediante un SDK, y esos ajustes no son anulados por la instrumentación automatizada.</div>

### Configuración manual {#manual-configuration}

Las bibliotecas de Datadog le permiten configurar la instrumentación automática mediante el uso de la variable de entorno `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` con el nombre corto para el modo: `ident`|`anon`|`disabled`.

El modo predeterminado es el modo `identification` (nombre corto: `ident`).

Por ejemplo, `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`.

### Modos obsoletos {#deprecated-modes}

<div class="alert alert-info">Los modos anteriores están obsoletos, pero se mantendrá la compatibilidad hasta la próxima versión principal.</div>

Los siguientes modos están obsoletos:

- `safe` modo: La biblioteca de traza no incluye ninguna información de PII en los metadatos de los eventos. El rastreador intenta recopilar el ID de usuario, y solo si el ID de usuario es un [GUID][11] válido
- `extended` modo: La biblioteca de traza intenta recopilar el ID de usuario y el correo electrónico del usuario. En este modo, Datadog no realiza la verificación de que el tipo de ID de usuario sea un GUID. La biblioteca de traza informa cualquier valor que se pueda extraer del evento.

**Nota**: Podría haber casos en los que la biblioteca de traza no pueda extraer ninguna información del evento de usuario. El evento se informaría con metadatos vacíos. En esos casos, utilice el [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) para instrumentar manualmente los eventos de usuario.

## Deshabilitar el seguimiento de eventos de actividad del usuario {#disabling-user-activity-event-tracking}

Para deshabilitar la detección automatizada de actividad del usuario a través de su [AAP Catalog][14], cambie la variable de entorno del modo de seguimiento automático `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` a `disabled` en el servicio que desea desactivar. Todos los modos solo afectan a la instrumentación automatizada y requieren que [Remote Configuration][15] esté habilitada.

Para la configuración manual, puede establecer la variable de entorno `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED` en `false` en su servicio y reiniciarlo. Esto debe establecerse en la aplicación que aloja el SDK de Datadog, y no en el Datadog Agent.

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
[14]: https://app.datadoghq.com/security/appsec/inventory/services?tab=capabilities
[15]: /es/tracing/guide/remote_config

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}