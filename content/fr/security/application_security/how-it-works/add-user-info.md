---
aliases:
- /fr/security_platform/application_security/add-user-info
- /fr/security/application_security/add-user-info
- /fr/security/application_security/threats/add-user-info/
title: Surveillance et protection des utilisateurs
---
## Aperçu

Instrumentez vos services et suivez l'activité des utilisateurs pour détecter et bloquer les acteurs malveillants.

[Ajoutez des informations sur les utilisateurs authentifiés dans les traces](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) pour identifier et bloquer les acteurs malveillants ciblant votre surface d'attaque authentifiée. Pour ce faire, définissez le tag d'identifiant utilisateur sur la trace APM en cours, fournissant l'instrumentation nécessaire pour qu'AAP bloque les attaquants authentifiés. Cela permet à AAP d'associer les attaques et les événements de logique métier aux utilisateurs.

[Suivez les connexions et l'activité des utilisateurs](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) pour détecter les prises de contrôle de compte et les abus de logique métier avec des règles de détection prêtes à l'emploi, et pour finalement bloquer les attaquants.

Les activités utilisateur personnalisées pour lesquelles des règles de détection prêtes à l'emploi sont disponibles sont les suivantes :

| Noms d'événements intégrés   | Métadonnées requises                                    | Règles associées                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [Activité limitée par le taux depuis l'IP][4]<br>[Activité non autorisée détectée][5] |
| `users.login.success`  | L'identifiant utilisateur est obligatoire, des métadonnées optionnelles peuvent être ajoutées | [Attaque par Credential Stuffing][6]<br>[Attaque par Bruteforce][12]<br>[Credential Stuffing distribué][13]               |
| `users.login.failure`  | L'identifiant utilisateur et `usr.exists` sont obligatoires, des métadonnées optionnelles peuvent être ajoutées | [Attaque par Credential Stuffing][6]<br>[Attaque par Bruteforce][12]<br>[Credential Stuffing distribué][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [Créations excessives de comptes depuis une IP][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [Suppressions excessives de comptes depuis une IP][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [Tentatives de réinitialisation de mot de passe par force brute][9]                                                                                                         |
| `payment.failure`      | Aucun                                                 | [Échecs de paiement excessifs depuis l'IP][10]                                                                                                        |

## Ajout d'informations sur les utilisateurs authentifiés aux traces et activation de la capacité de blocage des utilisateurs

<div class="alert alert-info">
<strong>Détection automatisée de l'activité des utilisateurs :</strong> Les bibliothèques de traçage Datadog tentent de détecter et de signaler automatiquement les événements d'activité des utilisateurs. Pour plus d'informations, voir <a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">Désactivation du suivi automatique des événements d'activité des utilisateurs</a>.
</div>

Vous pouvez [ajouter des tags personnalisés à votre span racine][3], ou utiliser les fonctions d'instrumentation décrites ci-dessous.

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Utilisez l'API du traceur Java pour ajouter des balises personnalisées à un span racine et ajouter des informations utilisateur afin de pouvoir surveiller les requêtes authentifiées dans l'application.

Les balises de surveillance des utilisateurs sont appliquées sur le span racine et commencent par le préfixe `usr` suivi du nom du champ. Par exemple, `usr.name` est une balise de surveillance des utilisateurs qui suit le nom de l'utilisateur.

**Note** : Vérifiez que vous avez ajouté [les dépendances nécessaires à votre application][1].

L'exemple ci-dessous montre comment obtenir le span racine, ajouter les balises de surveillance des utilisateurs pertinentes et activer la capacité de blocage des utilisateurs :

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

[1]: /fr/tracing/trace_collection/custom_instrumentation/opentracing/java#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

Le package de traceur .NET fournit la fonction `SetUser()`, qui vous permet de surveiller les requêtes authentifiées en ajoutant des informations utilisateur à la trace.

L'exemple ci-dessous montre comment ajouter les balises de surveillance des utilisateurs pertinentes et activer la capacité de blocage des utilisateurs :

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

Pour des informations et des options, lisez [la documentation du traceur .NET][1].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Le package de traceur Go fournit la fonction `SetUser()`, qui vous permet de surveiller les requêtes authentifiées en ajoutant des informations utilisateur à la trace. Pour plus d'options, consultez [la documentation du traceur Go][2] (ou [la documentation v1][1]).

Cet exemple montre comment récupérer le span de traceur actuel, l'utiliser pour définir des balises de surveillance des utilisateurs et activer la capacité de blocage des utilisateurs. {{% tracing-go-v2 %}}

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

Utilisez l'une des API suivantes pour ajouter des informations utilisateur à une trace afin de pouvoir surveiller les requêtes authentifiées dans l'application :

{{% collapse-content title="set_user" level="h4" expanded="true" %}}

À partir de `ddtrace` 1.1.0, la méthode `Datadog::Kit::Identity.set_user` est disponible. C'est l'API recommandée pour ajouter des informations utilisateur aux traces :

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

Si `Datadog::Kit::Identity.set_user` ne répond pas à vos besoins, vous pouvez utiliser `set_tag` à la place.

Les balises de surveillance des utilisateurs sont appliquées sur la trace et commencent par le préfixe `usr.` suivi du nom du champ. Par exemple, `usr.name` est une balise de surveillance des utilisateurs qui suit le nom de l'utilisateur.

L'exemple ci-dessous montre comment obtenir la trace active et ajouter les balises de surveillance des utilisateurs pertinentes :

**Notes** :
- Les valeurs de tag doivent être des chaînes.
- Le `usr.id` tag est obligatoire.

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

Le traceur PHP fournit la fonction `\DDTrace\set_user()`, qui vous permet de surveiller et de bloquer les requêtes authentifiées.

`\DDTrace\set_user()` ajoute les tags utilisateur pertinents et les métadonnées à la trace et effectue automatiquement le blocage des utilisateurs.

L'exemple suivant montre comment définir des tags de surveillance des utilisateurs et activer le blocage des utilisateurs :

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

Le package de traceur Node fournit la fonction `tracer.setUser(user)`, qui vous permet de surveiller les requêtes authentifiées en ajoutant des informations utilisateur à la trace.

L'exemple ci-dessous montre comment ajouter des tags de surveillance des utilisateurs pertinents et activer la capacité de blocage des utilisateurs :

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

Pour des informations et des options, lisez [la documentation du traceur Node.js][1].



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

À partir de dd-trace-py v3.7, vous pouvez utiliser le nouveau SDK du traceur Python pour suivre les utilisateurs et les événements utilisateur.

Dans les versions précédentes, vous pouvez surveiller les requêtes authentifiées en ajoutant des informations utilisateur à la trace avec la fonction `set_user` fournie par le package de traceur Python.

{{% collapse-content title="SDK de suivi des utilisateurs" level="h4" expanded="true" id="python-user-info-sdk" %}}

À partir de dd-trace-py v3.7, cet exemple montre comment définir des tags de surveillance des utilisateurs et activer la capacité de blocage des utilisateurs :

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

{{% collapse-content title="API héritée" level="h4" expanded="false" id="python-user-info-legacy" %}}

Cet exemple montre comment définir des tags de surveillance des utilisateurs et activer la capacité de blocage des utilisateurs en utilisant l'API héritée ; cependant, l'utilisation du nouveau SDK de suivi des utilisateurs, décrit ci-dessus, est encouragée.

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

## Ajout d'informations sur la logique métier (succès de connexion, échec de connexion, toute logique métier) aux traces

<div class="alert alert-info">
<strong> Une note sur usr.id et usr.login : </strong> L'enquête sur les abus de connexion repose sur deux concepts similaires, mais différents. usr.id contient l'identifiant unique du compte utilisateur dans la base de données. Il est unique et immuable. Il est indisponible lorsque quelqu'un essaie de se connecter à un compte inexistant. L'utilisateur bloque les cibles usr.id.</br>
L'utilisateur n'est généralement pas conscient de son identifiant utilisateur. Au lieu de cela, il s'appuie sur des identifiants mutables (numéro de téléphone, nom d'utilisateur, adresse e-mail...). La chaîne utilisée par l'utilisateur pour se connecter à un compte doit être signalée comme usr.login dans les événements de connexion.</br>
Si aucun usr.login n'est fourni, usr.id sera utilisé à la place.</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

À partir de la version 1.8.0 de dd-trace-java, vous pouvez utiliser l'API du traceur Java pour suivre les événements utilisateur.

Les exemples suivants montrent comment suivre les événements de connexion ou les événements personnalisés (en utilisant l'inscription comme exemple).

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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

{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="java-login-failure" %}}
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

{{% collapse-content title="Logique commerciale personnalisée" level="h4" expanded="false" id="java-custom-business" %}}
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

À partir de la version 2.23.0 de dd-trace-dotnet, vous pouvez utiliser l'API du traceur .NET pour suivre les événements utilisateur.

Les exemples suivants montrent comment suivre les événements de connexion ou les événements personnalisés (en utilisant l'inscription comme exemple).

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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
{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="dotnet-login-failure" %}}
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

{{% collapse-content title="Logique commerciale personnalisée" level="h4" expanded="false" id="dotnet-custom-business" %}}
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

À partir de la version 1.47.0 de dd-trace-go, vous pouvez utiliser l'API du traceur Go pour suivre les événements utilisateur.

Les exemples suivants montrent comment suivre les événements de connexion ou les événements personnalisés (en utilisant l'inscription comme exemple). {{% tracing-go-v2 %}}

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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
{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="go-login-failure" %}}
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

{{% collapse-content title="Logique commerciale personnalisée" level="h4" expanded="false" id="go-custom-business" %}}
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

À partir de la version 1.9.0 de dd-trace-rb, vous pouvez utiliser l'API du traceur Ruby pour suivre les événements utilisateur. La version v2.19.0 de dd-trace-rb introduit de nouvelles méthodes sous l'espace de noms `Datadog::Kit::AppSec::Events::V2`. Les méthodes de suivi des événements existantes sont conservées pour des raisons de compatibilité.

Les exemples suivants montrent comment suivre les événements de connexion ou les événements personnalisés (en utilisant l'inscription comme exemple).

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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

{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="ruby-login-failure" %}}
```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # the string used by the user to log in
user_exists = true      # if the user login exists in database for example
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Logique commerciale personnalisée" level="h4" expanded="false" id="ruby-custom-business" %}}
```ruby
require 'datadog/kit/appsec/events'

span = nil
trace = Datadog::Tracing.active_trace
metadata = { 'usr.id': 'some-user-id' }
event_name = 'users.signup'

Datadog::Kit::AppSec::Events.track(event_name, trace, span, metadata)
```
{{% /collapse-content %}}

#### Migration vers les nouvelles méthodes de succès et d'échec de connexion

Les nouvelles méthodes dans `Datadog::Kit::AppSec::Events::V2` introduisent un ordre de paramètres plus intuitif et une séparation des préoccupations plus claire. Voici les principaux changements :

1. L'identifiant de connexion (e-mail, nom d'utilisateur) est le premier paramètre et est obligatoire.
2. L'objet/ID utilisateur est optionnel dans les événements de succès et a été supprimé des événements d'échec.
3. Les métadonnées ont été simplifiées et ne nécessitent plus le champ `usr.login`.
4. Les paramètres de trace et de portée ne sont plus requis et sont automatiquement déduits.

**Remarque** : les méthodes héritées `track_login_success` et `track_login_failure` sont obsolètes au profit des nouvelles méthodes `track_user_login_success` et `track_user_login_failure`, respectivement.

Dans l'exemple suivant, le code commenté n'est plus nécessaire.

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" id="ruby-v2-migration-login-success" %}}
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

{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="ruby-v2-migration-login-failure" %}}
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
À partir de dd-trace-php v0.84.0, vous pouvez utiliser l'API du traceur PHP pour suivre les événements utilisateur. La version v1.11.0 de dd-trace-php introduit de nouvelles méthodes sous l'espace de noms `\datadog\appsec\v2\`. Les méthodes de suivi des événements existantes sont conservées pour des raisons de compatibilité.

Les exemples suivants montrent comment suivre les événements de connexion ou les événements personnalisés (en utilisant l'inscription comme exemple).

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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

{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="php-login-failure" %}}
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

{{% collapse-content title="Logique commerciale personnalisée" level="h4" expanded="false" id="php-custom-business" %}}
```php
<?php
$eventName = 'users.signup'; // custom event name
$metadata = ['usr.id' => $id]; // you can add arbitrary fields to metadata
\datadog\appsec\track_custom_event($eventName, $metadata);
?>
```
{{% /collapse-content %}}

#### Migration vers les nouvelles méthodes de succès et d'échec de connexion

Les nouvelles méthodes dans l'espace de noms `\datadog\appsec\v2\` introduisent un ordre de paramètres plus intuitif et une séparation des préoccupations plus claire. Voici les principaux changements :

1. L'identifiant de connexion (e-mail, nom d'utilisateur) est le premier paramètre et est obligatoire.
2. Le tableau d'utilisateur/ID est optionnel dans les événements de succès et a été supprimé des événements d'échec.
3. Les métadonnées ont été simplifiées et ne nécessitent plus le champ `usr.login`.

**Remarque** : les méthodes héritées `\datadog\appsec\track_user_login_success_event` et `\datadog\appsec\track_user_login_failure_event` sont obsolètes au profit des nouvelles méthodes `\datadog\appsec\v2\track_user_login_success` et `\datadog\appsec\v2\track_user_login_failure`, respectivement.

Dans l'exemple suivant, le code commenté n'est plus nécessaire.

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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

{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="php-migration-login-failure" %}}
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

À partir de dd-trace-js v3.13.1, vous pouvez utiliser l'API du traceur Node.js pour suivre les événements utilisateur. La version v5.48.0 de dd-trace-js introduit de nouvelles méthodes sous l'espace de noms `eventTrackingV2`. Les méthodes de suivi des événements existantes sont conservées pour des raisons de compatibilité.


Les exemples suivants montrent comment suivre les événements de connexion ou les événements personnalisés (en utilisant l'inscription comme exemple).

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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

{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="nodejs-login-failure" %}}
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

{{% collapse-content title="Logique commerciale personnalisée" level="h4" expanded="false" id="nodejs-custom-business" %}}
```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

#### Migration vers les nouvelles méthodes de succès et d'échec de connexion

Les nouvelles méthodes dans `eventTrackingV2` introduisent un ordre de paramètres plus intuitif et une séparation des préoccupations plus claire. Voici les principaux changements :

1. L'identifiant de connexion (e-mail, nom d'utilisateur) est le premier paramètre et est obligatoire.
2. L'objet/ID utilisateur est optionnel dans les événements de succès et a été supprimé des événements d'échec.
3. Les métadonnées ont été simplifiées et ne nécessitent plus le champ `usr.login`.

**Remarque** : les méthodes héritées `trackUserLoginSuccessEvent` et `trackUserLoginFailureEvent` sont obsolètes au profit des nouvelles méthodes `eventTrackingV2.trackUserLoginSuccess` et `eventTrackingV2.trackUserLoginFailure`, respectivement.

Dans l'exemple suivant, le code commenté n'est plus nécessaire.

{{% collapse-content title="Connexion réussie" level="h4" expanded="true" %}}
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

{{% collapse-content title="Échec de la connexion" level="h4" expanded="false" id="nodejs-migration-login-failure" %}}
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


À partir de dd-trace-py v1.9.0, vous pouvez utiliser l'API du traceur Python pour suivre les événements utilisateur.

À partir de dd-trace-py v3.7, vous pouvez utiliser le nouveau SDK du traceur Python pour suivre les utilisateurs et les événements utilisateur.

Les exemples suivants montrent comment suivre les événements de connexion, les événements d'inscription ou les événements personnalisés.

{{% collapse-content title="SDK de suivi des utilisateurs" level="h4" expanded="true" id="python-business-logic-sdk" %}}

Disponible depuis dd-trace-py v3.7, `track_user_sdk` fournit 5 fonctions :

- `track_login_success`
- `track_login_failure`
- `track_signup`
- `track_custom_event`
- `track_user`

Disponible depuis dd-trace-py v3.17, `track_user_sdk` fournit cette fonction supplémentaire :

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

{{% collapse-content title="Application Toy FastAPI avec SDK" level="h4" expanded="false" id="python-business-logic-example" %}}

L'exemple suivant est une application Toy entièrement fonctionnelle qui utilise le SDK de suivi des utilisateurs avec une base de données utilisateur basée sur la mémoire. Cet exemple illustre l'utilisation possible du SDK mais ne fournit pas les exigences nécessaires d'une application réelle, telles qu'un modèle de données persistant ou un système d'authentification sécurisé.

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


{{% collapse-content title="API héritée" level="h4" expanded="false" id="python-business-logic-legacy" %}}

La méthode préférée est d'utiliser le nouveau SDK de suivi des utilisateurs (disponible depuis dd-trace-py v1.9) au lieu de l'API héritée.

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

### Suivi des informations de logique métier sans modifier le code

Si votre service a AAP activé et [Configuration à distance][1] activée, vous pouvez créer une règle WAF personnalisée pour signaler toute demande qu'elle correspond avec une étiquette de logique métier personnalisée. Cela ne nécessite aucune modification de votre application et peut être fait entièrement depuis Datadog.

Pour commencer, accédez à la [page des règles WAF personnalisées][2] et cliquez sur "Créer une nouvelle règle".

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="Accédez au menu des règles WAF personnalisées depuis la page d'accueil de l'AAP en cliquant sur Protection, puis sur WAF en application et Règles personnalisées." style="width:100%;" >}}

Cela ouvrira un menu dans lequel vous pourrez définir votre règle WAF personnalisée. En sélectionnant la catégorie "Logique métier", vous pourrez configurer un type d'événement (par exemple, `users.password_reset`). Vous pouvez ensuite sélectionner le service que vous souhaitez suivre et un point de terminaison spécifique. Vous pouvez également utiliser la condition de règle pour cibler un paramètre spécifique afin d'identifier le flux de code que vous souhaitez _instrumenter_. Lorsque la condition correspond, la bibliothèque tague la trace et la signale pour être transmise à l'AAP. Si vous n'avez pas besoin de la condition, vous pouvez définir une condition large pour correspondre à tout.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Capture d'écran du formulaire qui apparaît lorsque vous cliquez sur le bouton Créer une nouvelle règle." style="width:50%;" >}}

Une fois enregistré, la règle est déployée sur les instances du service qui ont la configuration à distance activée.


[1]: /fr/tracing/guide/remote_config
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## Suivi automatique des événements d'activité des utilisateurs.

Lorsque l'AAP est activé, les bibliothèques de traçage Datadog tentent de détecter automatiquement les événements d'activité des utilisateurs.

Les événements qui peuvent être détectés automatiquement sont :

- `users.login.success`
- `users.login.failure`
- `users.signup`

### Modes de suivi automatique des événements d'activité des utilisateurs

Le suivi automatique des activités des utilisateurs offre les modes suivants :

- `identification` mode (nom court : `ident`) :
  - Ce mode est le mode par défaut et collecte toujours l'ID utilisateur ou fait de son mieux.
  - L'ID utilisateur est collecté lors du succès de la connexion et de l'échec de la connexion. En cas d'échec, l'ID utilisateur est collecté, que l'utilisateur existe ou non.
  - Lorsque le cadre instrumenté ne fournit pas clairement un identifiant utilisateur, mais plutôt un objet utilisateur structuré, l'identifiant utilisateur est déterminé sur une base d'effort maximal en fonction des noms de champs de l'objet. Cette liste de noms de champs est considérée, classée par ordre de priorité :
    - `id`
    - `email`
    - `username`
    - `login`
    - `user`
  - Si aucun identifiant utilisateur n'est disponible ou trouvé, l'événement utilisateur n'est pas émis.
- `anonymization` mode (nom court : `anon`) :
  - Ce mode est le même que `identification`, mais anonymise l'identifiant utilisateur en le hachant (SHA256) et en tronquant le hachage résultant.
- `disabled` mode :
  - Les bibliothèques AAP ne *collectent* aucun identifiant utilisateur à partir de leurs instrumentations automatisées.
  - Les événements de connexion des utilisateurs ne sont pas émis.

<div class="alert alert-info">Tous les modes n'affectent que l'instrumentation automatisée. Les modes ne s'appliquent pas à la collecte manuelle. La collecte manuelle est configurée à l'aide d'un SDK, et ces paramètres ne sont pas remplacés par l'instrumentation automatisée.</div>

### Configuration manuelle

Les bibliothèques Datadog vous permettent de configurer l'auto-instrumentation en utilisant la variable d'environnement `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` avec le nom court du mode : `ident`|`anon`|`disabled`.

Le mode par défaut est le mode `identification` (nom court : `ident`).

Par exemple, `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`.

### Modes obsolètes

<div class="alert alert-info">Les modes précédents sont obsolètes, mais la compatibilité sera maintenue jusqu'à la prochaine version majeure.</div>

Les modes suivants sont obsolètes :

- `safe` mode : La bibliothèque de trace n'inclut aucune information PII dans les métadonnées des événements. La bibliothèque de trace essaie de collecter l'identifiant utilisateur, et seulement si l'identifiant utilisateur est un [GUID][10] valide.
- `extended` mode : La bibliothèque de trace essaie de collecter l'identifiant de l'utilisateur et l'email de l'utilisateur. Dans ce mode, Datadog ne vérifie pas que le type de l'identifiant de l'utilisateur soit un GUID. La bibliothèque de trace rapporte toute valeur pouvant être extraite de l'événement.

**Note** : Il pourrait y avoir des cas où la bibliothèque de trace ne pourra pas extraire d'informations de l'événement utilisateur. L'événement serait signalé avec des métadonnées vides. Dans ces cas, utilisez le [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) pour instrumenter manuellement les événements utilisateur.

## Désactivation du suivi des événements d'activité utilisateur

Pour désactiver la détection automatisée de l'activité utilisateur via votre [Catalogue de logiciels AAP][14], changez la variable d'environnement de mode de suivi automatique `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` en `disabled` sur le service que vous souhaitez désactiver. Tous les modes n'affectent que l'instrumentation automatisée et nécessitent que la [Configuration à distance][15] soit activée.

Pour la configuration manuelle, vous pouvez définir la variable d'environnement `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED` sur `false` sur votre service et le redémarrer. Cela doit être défini sur l'application hébergeant la bibliothèque de traçage Datadog, et non sur l'agent Datadog.

[3]: /fr/tracing/trace_collection/custom_instrumentation/
[4]: /fr/security/default_rules/bl-rate-limiting/
[5]: /fr/security/default_rules/bl-privilege-violation-user/
[6]: /fr/security/default_rules/appsec-ato-groupby-ip/
[7]: /fr/security/default_rules/bl-signup-ratelimit/
[8]: /fr/security/default_rules/bl-account-deletion-ratelimit/
[9]: /fr/security/default_rules/bl-password-reset/
[10]: /fr/security/default_rules/bl-payment-failures/
[11]: https://guid.one/guid
[12]: /fr/security/default_rules/appsec-ato-bf/
[13]: /fr/security/default_rules/distributed-ato-ua-asn/
[14]: https://app.datadoghq.com/security/appsec/inventory/services?tab=capabilities
[15]: /fr/tracing/guide/remote_config