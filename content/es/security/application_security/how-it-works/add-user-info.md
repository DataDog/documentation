---
aliases:
- /es/security_platform/application_security/add-user-info
- /es/security/application_security/add-user-info
- /es/security/application_security/threats/add-user-info/
title: Monitoreo y Protección de Usuarios
---
## Resumen

Instrumenta tus servicios y rastrea la actividad del usuario para detectar y bloquear a los actores maliciosos.

[ Agrega información de usuario autenticado en trazas ](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) para identificar y bloquear a los actores maliciosos que apuntan a tu superficie de ataque autenticada. Para hacer esto, establece la etiqueta de ID de usuario en la traza APM en ejecución, proporcionando la instrumentación necesaria para que AAP bloquee a los atacantes autenticados. Esto permite que AAP asocie ataques y eventos de lógica de negocio a los usuarios.

[ Rastrea los inicios de sesión y la actividad del usuario ](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) para detectar tomas de control de cuentas y abusos de lógica de negocio con reglas de detección listas para usar, y para finalmente bloquear a los atacantes.

La actividad de usuario personalizada para la cual hay reglas de detección listas para usar es la siguiente:

| Nombres de eventos incorporados | Metadatos requeridos | Reglas relacionadas |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [Actividad limitada por tasa desde IP][4]<br>[Actividad no autorizada detectada][5] |
| `users.login.success`  | El ID de usuario es obligatorio, se pueden agregar metadatos opcionales | [Ataque de Credential Stuffing][6]<br>[Ataque de Fuerza Bruta][12]<br>[Credential Stuffing Distribuido][13] |
| `users.login.failure`  | El ID de usuario y `usr.exists` son obligatorios, se pueden agregar metadatos opcionales | [Ataque de Credential Stuffing][6]<br>[Ataque de Fuerza Bruta][12]<br>[Credential Stuffing Distribuido][13] |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [Creaciones excesivas de cuentas desde una IP][7] |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [Eliminaciones excesivas de cuentas desde una IP][8] |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [Intentos de fuerza bruta de restablecimiento de contraseña][9] |
| `payment.failure`      | Ninguno | [Fallos excesivos de pago desde IP][10] |

## Agregar información de usuario autenticado a las trazas y habilitar la capacidad de bloqueo de usuarios

<div class="alert alert-info">
<strong> Detección Automatizada de Actividad del Usuario: </strong> Las bibliotecas de trazado de Datadog intentan detectar e informar eventos de actividad del usuario automáticamente. Para más información, consulte <a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">Deshabilitar el seguimiento automático de eventos de actividad del usuario</a>.
</div>

Puede [agregar etiquetas personalizadas a su span raíz][3], o utilizar las funciones de instrumentación descritas a continuación.

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Utilice la API del rastreador de Java para agregar etiquetas personalizadas a un span raíz y añadir información del usuario para que pueda monitorear solicitudes autenticadas en la aplicación.

Las etiquetas de monitoreo de usuarios se aplican en el span raíz y comienzan con el prefijo `usr` seguido del nombre del campo. Por ejemplo, `usr.name` es una etiqueta de monitoreo de usuarios que rastrea el nombre del usuario.

**Nota**: Verifique que ha agregado [las dependencias necesarias a su aplicación][1].

El ejemplo a continuación muestra cómo obtener el span raíz, agregar las etiquetas de monitoreo de usuarios relevantes y habilitar la capacidad de bloqueo de usuarios:

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

El paquete del rastreador .NET proporciona la función `SetUser()`, que le permite monitorear solicitudes autenticadas al agregar información del usuario al rastreo.

El ejemplo a continuación muestra cómo agregar las etiquetas de monitoreo de usuarios relevantes y habilitar la capacidad de bloqueo de usuarios:

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

Para información y opciones, lea [la documentación del rastreador .NET][1].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

El paquete del rastreador Go proporciona la función `SetUser()`, que le permite monitorear solicitudes autenticadas al agregar información del usuario al rastreo. Para más opciones, consulte [la documentación del rastreador Go][2] (o [documentación v1][1]).

Este ejemplo muestra cómo recuperar el span del rastreador actual, usarlo para establecer etiquetas de monitoreo de usuarios y habilitar la capacidad de bloqueo de usuarios. {{% tracing-go-v2 %}}

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

Utilice una de las siguientes API para agregar información del usuario a un rastreo para que pueda monitorear solicitudes autenticadas en la aplicación:

{{% collapse-content title="set_user" level="h4" expanded="true" %}}

A partir de `ddtrace` 1.1.0, el método `Datadog::Kit::Identity.set_user` está disponible. Esta es la API recomendada para agregar información del usuario a los rastreos:

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
  email:, 'jean.example@example.com',
  session_id:, '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # optional free-form tags
  another_tag: 'another_value',
)
```
{{% /collapse-content %}}

{{% collapse-content title="set_tag" level="h4" expanded="false" id="ruby-set-tag" %}}

Si `Datadog::Kit::Identity.set_user` no satisface tus necesidades, puedes usar `set_tag` en su lugar.

Las etiquetas de monitoreo de usuarios se aplican en el rastro y comienzan con el prefijo `usr.` seguido del nombre del campo. Por ejemplo, `usr.name` es una etiqueta de monitoreo de usuarios que rastrea el nombre del usuario.

El ejemplo a continuación muestra cómo obtener el rastro activo y agregar etiquetas de monitoreo de usuarios relevantes:

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

El rastreador de PHP proporciona la función `\DDTrace\set_user()`, que te permite monitorear y bloquear solicitudes autenticadas.

`\DDTrace\set_user()` agrega las etiquetas de usuario relevantes y los metadatos al rastro y realiza automáticamente el bloqueo de usuarios.

El siguiente ejemplo muestra cómo establecer etiquetas de monitoreo de usuarios y habilitar el bloqueo de usuarios:

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

El paquete de rastreo de Node proporciona la función `tracer.setUser(user)`, que te permite monitorear solicitudes autenticadas al agregar información del usuario al rastro.

El ejemplo a continuación muestra cómo agregar etiquetas de monitoreo de usuarios relevantes y habilitar la capacidad de bloqueo de usuarios:

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

Para información y opciones, lee [la documentación del rastreador de Node.js][1].



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

A partir de dd-trace-py v3.7, puedes usar el nuevo SDK del rastreador de Python para rastrear usuarios y eventos de usuarios.

En versiones anteriores, puedes monitorear solicitudes autenticadas al agregar información del usuario al rastro con la función `set_user` proporcionada por el paquete de rastreo de Python.

{{% collapse-content title="SDK de Seguimiento de Usuarios" level="h4" expanded="true" id="python-user-info-sdk" %}}

A partir de dd-trace-py v3.7, este ejemplo muestra cómo establecer etiquetas de monitoreo de usuarios y habilitar la capacidad de bloqueo de usuarios:

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

{{% collapse-content title="API Legado" level="h4" expanded="false" id="python-user-info-legacy" %}}

Este ejemplo muestra cómo establecer etiquetas de monitoreo de usuarios y habilitar la capacidad de bloqueo de usuarios utilizando la API legado; sin embargo, se recomienda usar el nuevo SDK de Seguimiento de Usuarios, descrito anteriormente.

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

## Agregando información de lógica de negocio (éxito de inicio de sesión, fallo de inicio de sesión, cualquier lógica de negocio) a los rastros

<div class="alert alert-info">
<strong>Una nota sobre usr.id y usr.login:</strong> La investigación del abuso de inicio de sesión se basa en dos conceptos similares, pero diferentes. usr.id contiene el identificador único de la cuenta de usuario en la base de datos. Es único e inmutable. No está disponible cuando alguien intenta iniciar sesión en una cuenta que no existe. El bloqueo de usuario se dirige a usr.id.</br>
El usuario generalmente no es consciente de su ID de usuario. En cambio, confían en identificadores mutables (número de teléfono, nombre de usuario, dirección de correo electrónico...). La cadena utilizada por el usuario para iniciar sesión en una cuenta debe ser reportada como usr.login en los eventos de inicio de sesión.</br>
Si no se proporciona usr.login, se utilizará usr.id en su lugar.</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

A partir de dd-trace-java v1.8.0, puedes usar la API del rastreador de Java para rastrear eventos de usuario.

Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

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

{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="java-login-failure" %}}

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
        if (userExists != null) {
            userId = getUserId(userName)
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

{{% collapse-content title="Lógica de negocio personalizada" level="h4" expanded="false" id="java-custom-business" %}}

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

A partir de dd-trace-dotnet v2.23.0, puedes usar la API del rastreador de .NET para rastrear eventos de usuario.

Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

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
{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="dotnet-login-failure" %}}

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

{{% collapse-content title="Lógica de negocio personalizada" level="h4" expanded="false" id="dotnet-custom-business" %}}

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

A partir de dd-trace-go v1.47.0, puedes usar la API del rastreador de Go para rastrear eventos de usuario.

Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo). {{% tracing-go-v2 %}}

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

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
{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="go-login-failure" %}}

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

{{% collapse-content title="Lógica de negocio personalizada" level="h4" expanded="false" id="go-custom-business" %}}

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

A partir de dd-trace-rb v1.9.0, puedes usar la API del rastreador de Ruby para rastrear eventos de usuario. La versión v2.19.0 de dd-trace-rb introduce nuevos métodos bajo el espacio de nombres `Datadog::Kit::AppSec::Events::V2`. Los métodos existentes de rastreo de eventos se mantienen para compatibilidad.

Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

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

{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="ruby-login-failure" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # the string used by the user to log in
user_exists = true      # if the user login exists in database for example
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Lógica de negocio personalizada" level="h4" expanded="false" id="ruby-custom-business" %}}

```ruby
require 'datadog/kit/appsec/events'

span = nil
trace = Datadog::Tracing.active_trace
metadata = { 'usr.id': 'some-user-id' }
event_name = 'users.signup'

Datadog::Kit::AppSec::Events.track(event_name, trace, span, metadata)
```
{{% /collapse-content %}}

#### Migrando a los nuevos métodos de inicio de sesión para el éxito y el fracaso

Los nuevos métodos en `Datadog::Kit::AppSec::Events::V2` introducen un orden de parámetros más intuitivo y una separación de preocupaciones más clara. Aquí están los cambios clave:

1. El identificador de inicio de sesión (correo electrónico, nombre de usuario) es el primer parámetro y es obligatorio.
2. El objeto/ID de usuario es opcional en eventos de éxito y se ha eliminado de los eventos de fracaso.
3. Los metadatos se han simplificado y ya no requieren el campo `usr.login`.
4. Los parámetros de traza y de intervalo ya no son obligatorios y se infieren automáticamente.

**Nota**: los métodos heredados `track_login_success` y `track_login_failure` están en desuso a favor de los nuevos métodos `track_user_login_success` y `track_user_login_failure`, respectivamente.

En el siguiente ejemplo, el código comentado ya no es necesario.

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" id="ruby-v2-migration-login-success" %}}

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

{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="ruby-v2-migration-login-failure" %}}

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
A partir de dd-trace-php v0.84.0, puedes usar la API del rastreador de PHP para rastrear eventos de usuario. La versión v1.11.0 de dd-trace-php introduce nuevos métodos bajo el espacio de nombres `\datadog\appsec\v2\`. Los métodos existentes de rastreo de eventos se mantienen para compatibilidad.

Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

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

{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="php-login-failure" %}}

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

{{% collapse-content title="Lógica de negocio personalizada" level="h4" expanded="false" id="php-custom-business" %}}

```php
<?php
$eventName = 'users.signup'; // custom event name
$metadata = ['usr.id' => $id]; // you can add arbitrary fields to metadata
\datadog\appsec\track_custom_event($eventName, $metadata);
?>
```
{{% /collapse-content %}}

#### Migrando a los nuevos métodos de inicio de sesión para el éxito y el fracaso

Los nuevos métodos en el espacio de nombres `\datadog\appsec\v2\` introducen un orden de parámetros más intuitivo y una separación de preocupaciones más clara. Aquí están los cambios clave:

1. El identificador de inicio de sesión (correo electrónico, nombre de usuario) es el primer parámetro y es obligatorio.
2. El arreglo/ID de usuario es opcional en eventos de éxito y se ha eliminado de los eventos de fracaso.
3. Los metadatos se han simplificado y ya no requieren el campo `usr.login`.

**Nota**: los métodos heredados `\datadog\appsec\track_user_login_success_event` y `\datadog\appsec\track_user_login_failure_event` están en desuso a favor de los nuevos métodos `\datadog\appsec\v2\track_user_login_success` y `\datadog\appsec\v2\track_user_login_failure`, respectivamente.

En el siguiente ejemplo, el código comentado ya no es necesario.

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

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

{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="php-migration-login-failure" %}}

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

A partir de dd-trace-js v3.13.1, puedes usar la API del rastreador de Node.js para rastrear eventos de usuario. La versión v5.48.0 de dd-trace-js introduce nuevos métodos bajo el espacio de nombres `eventTrackingV2`. Los métodos existentes de rastreo de eventos se mantienen para compatibilidad.


Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión o eventos personalizados (usando el registro como ejemplo).

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
id: 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
  email: 'user@email.com' // other fields are optional
}
const user = 'user-id' // user could be just the ID
const login = 'user@email.com'
const metadata = { 'key': 'value' } // you can add arbitrary fields

// Log a successful user authentication event
// user and metadata are optional
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="nodejs-login-failure" %}}

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

{{% collapse-content title="Lógica de negocio personalizada" level="h4" expanded="false" id="nodejs-custom-business" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

#### Migrando a los nuevos métodos de inicio de sesión para el éxito y el fracaso

Los nuevos métodos en `eventTrackingV2` introducen un orden de parámetros más intuitivo y una separación de preocupaciones más clara. Aquí están los cambios clave:

1. El identificador de inicio de sesión (correo electrónico, nombre de usuario) es el primer parámetro y es obligatorio.
2. El objeto/ID de usuario es opcional en eventos de éxito y se ha eliminado de los eventos de fracaso.
3. Los metadatos se han simplificado y ya no requieren el campo `usr.login`.

**Nota**: los métodos heredados `trackUserLoginSuccessEvent` y `trackUserLoginFailureEvent` están en desuso a favor de los nuevos métodos `eventTrackingV2.trackUserLoginSuccess` y `eventTrackingV2.trackUserLoginFailure`, respectivamente.

En el siguiente ejemplo, el código comentado ya no es necesario.

{{% collapse-content title="Éxito de inicio de sesión" level="h4" expanded="true" %}}

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

{{% collapse-content title="Fallo de inicio de sesión" level="h4" expanded="false" id="nodejs-migration-login-failure" %}}

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


A partir de dd-trace-py v1.9.0, puedes usar la API del rastreador de Python para rastrear eventos de usuario.

A partir de dd-trace-py v3.7, puedes usar el nuevo SDK del rastreador de Python para rastrear usuarios y eventos de usuarios.

Los siguientes ejemplos muestran cómo rastrear eventos de inicio de sesión, eventos de registro o eventos personalizados.

{{% collapse-content title="SDK de Seguimiento de Usuarios" level="h4" expanded="true" id="python-business-logic-sdk" %}}

Disponible desde dd-trace-py v3.7, `track_user_sdk` proporciona 5 funciones:

- `track_login_success`
- `track_login_failure`
- `track_signup`
- `track_custom_event`
- `track_user`

Disponible desde dd-trace-py v3.17, `track_user_sdk` proporciona esta función adicional:

- `tracker_user_id`


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

{{% collapse-content title="Aplicación de juguete FastAPI con SDK" level="h4" expanded="false" id="python-business-logic-example" %}}

El siguiente ejemplo es una aplicación de juguete completamente funcional que utiliza el SDK de seguimiento de usuarios con una base de datos de usuarios basada en memoria. Este ejemplo ilustra el uso posible del SDK, pero no proporciona los requisitos necesarios de una aplicación real, como un modelo de datos persistente o un sistema de autenticación seguro.

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


{{% collapse-content title="API Legado" level="h4" expanded="false" id="python-business-logic-legacy" %}}

El método preferido es utilizar el nuevo SDK de seguimiento de usuarios (disponible desde dd-trace-py v1.9) en lugar de la API heredada.

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

### Seguimiento de información de lógica de negocio sin modificar el código

Si su servicio tiene AAP habilitado y [Configuración Remota][1] habilitada, puede crear una regla WAF personalizada para marcar cualquier solicitud que coincida con una etiqueta de lógica de negocio personalizada. Esto no requiere ninguna modificación a su aplicación y se puede hacer completamente desde Datadog.

Para comenzar, navegue a la [página de Regla WAF Personalizada][2] y haga clic en "Crear Nueva Regla".

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="Acceda al Menú de Regla WAF Personalizada desde la página de inicio de AAP haciendo clic en Protección, luego en WAF en la Aplicación y Reglas Personalizadas" style="width:100%;" >}}

Esto abrirá un menú en el que puede definir su regla WAF personalizada. Al seleccionar la categoría "Lógica de Negocio", podrá configurar un tipo de evento (por ejemplo, `users.password_reset`). Luego puede seleccionar el servicio que desea rastrear y un endpoint específico. También puede usar la condición de la regla para apuntar a un parámetro específico para identificar el flujo de código que desea _instrumentar_. Cuando la condición coincide, la biblioteca etiqueta el rastro y lo marca para ser enviado a AAP. Si no necesita la condición, puede establecer una condición amplia para coincidir con todo.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Captura de pantalla del formulario que aparece cuando hace clic en el botón Crear Nueva Regla" style="width:50%;" >}}

Una vez guardada, la regla se despliega en las instancias del servicio que tienen habilitada la Configuración Remota.


[1]: /es/tracing/guide/remote_config
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## Seguimiento automático de eventos de actividad del usuario

Cuando AAP está habilitado, las bibliotecas de trazado de Datadog intentan detectar automáticamente eventos de actividad del usuario.

Los eventos que se pueden detectar automáticamente son:

- `users.login.success`
- `users.login.failure`
- `users.signup`

### Modos de seguimiento automático de eventos de actividad del usuario

El seguimiento automático de la actividad del usuario ofrece los siguientes modos:

- `identification` modo (nombre corto: `ident`):
  - Este modo es el predeterminado y siempre recopila el ID del usuario o hace el mejor esfuerzo.
  - El ID del usuario se recopila en el éxito y en el fracaso del inicio de sesión. Con el fracaso, el ID del usuario se recopila independientemente de si el usuario existe o no.
  - Cuando el marco instrumentado no proporciona claramente un ID de usuario, sino más bien un objeto de usuario estructurado, el ID del usuario se determina en función del mejor esfuerzo basado en los nombres de los campos del objeto. Esta lista de nombres de campos se considera, ordenada por prioridad:
    - `id`
    - `email`
    - `username`
    - `login`
    - `user`
  - Si no hay un ID de usuario disponible o encontrado, el evento del usuario no se emite.
- `anonymization` modo (nombre corto: `anon`):
  - Este modo es el mismo que `identification`, pero anonimiza el ID del usuario al aplicar un hash (SHA256) y recortar el hash resultante.
- `disabled` modo:
  - Las bibliotecas de AAP no *recogen* ninguna identificación de usuario de sus instrumentaciones automatizadas.
  - No se emiten eventos de inicio de sesión de usuario.

<div class="alert alert-info"> Todos los modos solo afectan la instrumentación automatizada. Los modos no se aplican a la recolección manual. La recolección manual se configura utilizando un SDK, y esos ajustes no son anulados por la instrumentación automatizada.</div>

### Configuración manual

Las bibliotecas de Datadog te permiten configurar la auto-instrumentación utilizando la variable de entorno `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` con el nombre corto para el modo: `ident`|`anon`|`disabled`.

El modo predeterminado es el modo `identification` (nombre corto: `ident`).

Por ejemplo, `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`.

### Modos obsoletos

<div class="alert alert-info"> Los modos anteriores están obsoletos, pero se mantendrá la compatibilidad hasta la próxima versión importante.</div>

Los siguientes modos están obsoletos:

- `safe` modo: La biblioteca de trazas no incluye ninguna información de PII en los metadatos de los eventos. La biblioteca de trazadores intenta recoger la identificación de usuario, y solo si la identificación de usuario es un [GUID][10] válido.
- `extended` modo: La biblioteca de trazas intenta recoger la identificación de usuario y el correo electrónico del usuario. En este modo, Datadog no verifica que el tipo de la identificación de usuario sea un GUID. La biblioteca de trazas informa cualquier valor que se pueda extraer del evento.

**Nota**: Podría haber casos en los que la biblioteca de trazas no pueda extraer ninguna información del evento del usuario. El evento se reportaría con metadatos vacíos. En esos casos, utiliza el [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) para instrumentar manualmente los eventos del usuario.

## Deshabilitando el seguimiento de eventos de actividad del usuario

Para deshabilitar la detección automática de actividad del usuario a través de tu [Catálogo de Software AAP][14], cambia la variable de entorno del modo de seguimiento automático `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` a `disabled` en el servicio que deseas desactivar. Todos los modos solo afectan la instrumentación automática y requieren que [Configuración Remota][15] esté habilitada.

Para la configuración manual, puedes establecer la variable de entorno `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED` a `false` en tu servicio y reiniciarlo. Esto debe configurarse en la aplicación que aloja la Biblioteca de Trazado de Datadog, y no en el Agente de Datadog.

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