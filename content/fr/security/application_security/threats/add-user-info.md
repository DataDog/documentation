---
aliases:
- /fr/security_platform/application_security/add-user-info
- /fr/security/application_security/add-user-info
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Se protéger des menaces avec la solution Application Security Management de
    Datadog
- link: /security/application_security/threats/library_configuration/
  tag: Documentation
  text: Éléments supplémentaires à prendre en compte lors de la configuration et autres
    options de configuration
title: Surveillance et protection des utilisateurs
---

## Présentation

Instrumentez vos services et surveillez les activités des utilisateurs pour détecter et bloquer les personnes malveillantes.

[Ajoutez les informations des utilisateurs authentifiés aux traces](#ajouter-les-informations-des-utilisateurs-authentifies-aux-traces-et-activer-la-fonctionnalite-de-blocage-des-utilisateurs) pour identifier et bloquer les personnes malveillantes prenant pour cible votre surface d'attaque après authentification. Pour ce faire, ajoutez le tag d'ID de l'utilisateur à la trace APM en cours d'exécution, offrant ainsi à ASM l'instrumentation nécessaire au blocage des personnes malveillantes authentifiées. Cela permet à ASM d'associer les attaques et les événements de logique opérationnelle à des utilisateurs.

[Surveillez les connexions et les activités des utilisateurs](#ajouter-des-informations-relatives-a-la-logique-operationnelle-connexion-reussie-echec-de-connexion-tout-evenement-de-logique-operationnelle-aux-traces) pour détecter les piratages de compte et les utilisations abusives de la logique opérationnelle grâce à des règles de détection prêtes à l'emploi dans le but de bloquer les personnes malveillantes.

<div class="alert alert-info">
<strong>Détection automatique des activités des utilisateurs :</strong> les bibliothèques de tracing de Datadog tentent de détecter et de signaler automatiquement les événements liés aux activités des utilisateurs. Pour en savoir plus, consultez la rubrique <a href="/security/application_security/threats/add-user-info/?tab=set_user#desactiver-le-suivi-automatique-des-evenements-lies-aux-activites-des-utilisateurs">Désactiver le suivi automatique des événements liés aux activités des utilisateurs</a>.
</div>

Les activités des utilisateurs pour lesquelles des règles de détection prêtes à l'emploi sont disponibles sont les suivantes :

| Noms par défaut des événements   | Métadonnées requises                                    | Règles associées                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [Activité à taux limité depuis une adresse IP][4]<br>[Activité non autorisée détectée][5] |
| `users.login.success`  | L'ID de l'utilisateur est obligatoire, des métadonnées facultatives peuvent être ajoutées | [Attaque par bourrage d'identifiants][6]                                                                                                              |
| `users.login.failure`  | L'ID de l'utilisateur est obligatoire, des métadonnées facultatives peuvent être ajoutées | [Attaque par bourrage d'identifiants][6]                                                                                                              |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [Trop de créations de compte depuis une adresse IP][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [Trop de suppressions de compte depuis une adresse IP][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "exists": true }`              | [Tentatives de réinitialisation de mot de passe par brute force][9]                                                                                                         |
| `payment.attempt`      | `{ "status": "failed" }`                             | [Trop d'échecs de paiement depuis une adresse IP][10]                                                                                                        |

## Ajouter les informations des utilisateurs authentifiés aux traces et activer la fonctionnalité de blocage des utilisateurs

Vous pouvez [ajouter des tags personnalisés à votre span racine][3] ou utiliser les fonctions d'instrumentation décrites ci-dessous. 

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Utilisez l'API du traceur Java pour ajouter des tags personnalisés à une span racine et ajoutez des informations utilisateur afin de pouvoir surveiller les requêtes authentifiées dans l'application.

Les tags de surveillance d'utilisateur sont appliqués au niveau de la span racine et se composent du préfixe `usr` suivi du nom du champ. Par exemple, `usr.name` est un tag de surveillance d'utilisateur permettant de suivre le nom de l'utilisateur.

**Remarque** : assurez-vous d'avoir ajouté les [dépendances nécessaires à votre application][1].

L'exemple ci-dessous montre comment récupérer la span racine, ajouter les tags de surveillance d'utilisateur appropriés et activer la fonctionnalité de blocage des utilisateurs :

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.appsec.api.blocking.Blocking;
import datadog.trace.api.interceptor.MutableSpan;

// Récupérer la span active
final Span span = GlobalTracer.get().activeSpan();
if ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // Définir le tag d'ID de l'utilisateur obligatoire
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // Définir les tags de surveillance d'utilisateur facultatifs
   localRootSpan.setTag("usr.name", "Jean Exemple");
   localRootSpan.setTag("usr.email", "jean.exemple@example.com");
   localRootSpan.setTag("usr.session_id", "987654321");
   localRootSpan.setTag("usr.role", "admin");
   localRootSpan.setTag("usr.scope", "read:message, write:files");
}

Blocking
    .forUser("d131dd02c56eec4")
    .blockIfMatch();
```

[1]: /fr/tracing/trace_collection/compatibility/java/#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

Le package du traceur .NET fournit la fonction `SetUser()`, qui vous permet de surveiller les requêtes authentifiées en ajoutant les informations utilisateur à la trace.

L'exemple ci-dessous montre comment ajouter les tags de surveillance d'utilisateur appropriés et activer la fonctionnalité de blocage des utilisateurs :

```csharp

using Datadog.Trace;

// ...

    var userDetails = new UserDetails()
    {
        // Identifiant interne de l'utilisateur dans le système
        Id = "d41452f2-483d-4082-8728-171a3570e930",
        // Adresse e-mail de l'utilisateur
        Email = "test@adventure-works.com",
        // Nom de l'utilisateur, tel qu'affiché par le système
        Name = "Alice Martin",
        // ID de session de l'utilisateur
        SessionId = "d0632156-132b-4baa-95b2-a492c5f9cb16",
        // Rôle sous lequel l'utilisateur effectue la requête
        Role = "standard",
    };
    Tracer.Instance.ActiveScope?.Span.SetUser(userDetails);
```

Pour en savoir plus et connaître les options disponibles, consultez [la documentation du traceur .NET][1].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Le package du traceur Go fournit la fonction `SetUser()`, qui vous permet de surveiller les requêtes authentifiées en ajoutant les informations utilisateur à la trace. Pour en savoir plus sur les options disponibles, consultez [la documentation du traceur Go][1].

L'exemple ci-dessous montre comment récupérer la span active du traceur, l'utiliser pour définir des tags de surveillance d'utilisateur et activer la fonctionnalité de blocage des utilisateurs :

```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"
func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "mon-uid") != nil {
    // L'utilisateur doit être bloqué en annulant immédiatement l'exécution du gestionnaire de requêtes.
    // La réponse de blocage est automatiquement gérée et envoyée par le middleware appsec.
    return 
  }
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Utilisez l'une des API suivantes pour ajouter des informations utilisateur à une trace afin de pouvoir surveiller les requêtes authentifiées dans l'application :

{{< tabs >}}

{{% tab "set_user" %}}

Depuis la version 1.1.0 de `ddtrace`, la méthode `Datadog::Kit::Identity.set_user` est disponible. Nous vous conseillons d'utiliser cette API pour ajouter des informations utilisateur aux traces :

```ruby
# Récupérer la trace active
trace = Datadog::Tracing.active_trace

# Définir le tag d'ID de l'utilisateur obligatoire
Datadog::Kit::Identity.set_user(trace, id: 'd131dd02c56eeec4')

# Ou définir n'importe lequel de ces tags de surveillance d'utilisateur facultatifs
Datadog::Kit::Identity.set_user(
  trace,

  # ID obligatoire
  id: 'd131dd02c56eeec4',

  # tags facultatifs avec une sémantique connue
  name: 'Jean Exemple',
  email:, 'jean.exemple@example.com',
  session_id:, '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # tags libres facultatifs
  autre_tag: 'autre_valeur',
)
```

{{% /tab %}}

{{% tab "set_tag" %}}

Si la méthode `Datadog::Kit::Identity.set_user` ne répond pas à vos besoins, vous pouvez utiliser `set_tag` à la place.

Les tags de surveillance d'utilisateur sont appliqués au niveau de la trace et se composent du préfixe `usr` suivi du nom du champ. Par exemple, `usr.name` est un tag de surveillance d'utilisateur permettant de suivre le nom de l'utilisateur.

L'exemple ci-dessous montre comment récupérer la trace active et ajouter les tags de surveillance d'utilisateur appropriés :

**Remarques** :
- Les valeurs des tags doivent correspondre à des chaînes.
- Le tag `usr.id` est obligatoire.

```ruby
# Récupérer la trace active
trace = Datadog::Tracing.active_trace

# Définir le tag d'ID de l'utilisateur obligatoire
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# Définir les tags de surveillance d'utilisateur facultatifs avec une sémantique connue
trace.set_tag('usr.name', 'Jean Exemple')
trace.set_tag('usr.email', 'jean.exemple@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')

# Définir des tags libres :
trace.set_tag('usr.autre_tag', 'autre_valeur')
```

{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

Le traceur PHP fournit la fonction `\DDTrace\set_user()`, qui vous permet de surveiller et de bloquer les requêtes authentifiées.

`\DDTrace\set_user()` ajoute les tags d'utilisateur et les métadonnées appropriés à la trace et procède automatiquement au blocage des utilisateurs.

L'exemple ci-dessous montre comment définir des tags de surveillance d'utilisateur et activer le blocage des utilisateurs :

```php
<?php
// Le blocage est effectué en interne via l'appel set_user.
\DDTrace\set_user(
    // Un identifiant unique de l'utilisateur est requis.
    '123456789',

    // Tous les autres champs sont facultatifs.
    [
        'name' =>  'Jean Exemple',
        'email' => 'jean.exemple@example.com',
        'session_id' => '987654321',
        'role' => 'admin',
        'scope' => 'read:message, write:files',
    ]
);
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Le package du traceur Node fournit la fonction `tracer.setUser(user)`, qui vous permet de surveiller les requêtes authentifiées en ajoutant les informations utilisateur à la trace.

L'exemple ci-dessous montre comment ajouter les tags de surveillance d'utilisateur appropriés et activer la fonctionnalité de blocage des utilisateurs :

```javascript
const tracer = require('dd-trace').init()

function handle () {
  tracer.setUser({
    id: '123456789', // *REQUIS* Identifiant unique de l'utilisateur.

    // Tous les autres champs sont facultatifs.
    email: 'alice.martin@example.com', // Adresse e-mail de l'utilisateur.
    name: 'Alice Martin', // Nom courant de l'utilisateur.
    session_id: '987654321', // ID de session de l'utilisateur.
    role: 'admin', // Rôle sous lequel l'utilisateur effectue la requête.
    scope: 'read:message, write:files', // Portées ou autorisations actuellement accordées à l'utilisateur.

    // Des champs personnalisés sont également acceptés pour associer des données personnalisées à l'utilisateur (RBAC, Oauth, etc.)
    tag_personnalisé: 'données personnalisées'
  })

// Définir l'utilisateur actuellement authentifié et vérifier s'il est bloqué
if (tracer.appsec.isUserBlocked(user)) {  // définit également l'utilisateur actuellement authentifié
  return tracer.appsec.blockRequest(req, res) // la réponse de blocage est envoyée
  }

}
```

Pour en savoir plus et connaître les options disponibles, consultez [la documentation du traceur Node.js][1].



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Surveillez les requêtes authentifiées en ajoutant les informations utilisateur à la trace à l'aide de la fonction `set_user` fournie par le package du traceur Python.

L'exemple ci-dessous montre comment définir des tags de surveillance d'utilisateur et activer la fonctionnalité de blocage des utilisateurs :

```python
from ddtrace.contrib.trace_utils import set_user
from ddtrace import tracer
# Appeler set_user() pour suivre l'ID de l'utilisateur actuellement authentifié
user_id = "un_id_utilisateur"
set_user(tracer, user_id, name="John", email="test@test.com", scope="une_portée",
         role="manager", session_id="id_session", propagate=True)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Ajouter des informations relatives à la logique opérationnelle (connexion réussie, échec de connexion, tout événement de logique opérationnelle) aux traces

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

Depuis la version 1.8.0 de dd-trace-java, l'API du traceur Java permet de surveiller les événements utilisateur. 

Les exemples suivants montrent comment surveiller les événements de connexion ou des événements personnalisés (comme ici, les inscriptions).

{{< tabs >}}
{{% tab "Connexion réussie" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userId, String password) {
        // L'utilisateur est récupéré à l'aide des identifiants userId/password
        User user = checkLogin(userId, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());

        // Suivre les événements d'authentification réussie
        GlobalTracer
            .getEventTracker()
            .trackLoginSuccessEvent(user.getId(), metadata);

    }
}

```
{{% /tab %}}

{{% tab "Échec de connexion" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userId, String password) {
        // L'utilisateur est récupéré à l'aide des identifiants userId/password
        User user = checkLogin(userId, password);

        // Si la fonction renvoie null, l'utilisateur n'existe pas
        boolean userExists = (user != null);
        Map<String, String> metadata = new HashMap<>();
        if (userExists != null) {
            metadata.put("email", user.getEmail());
        }

        // Suivre les événements d'échec d'authentification
        GlobalTracer
            .getEventTracker()
            .trackLoginFailureEvent(userId, userExists, metadata);
    }
}
```
{{% /tab %}}

{{% tab "Logique opérationnelle personnalisée" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doSignup(String userId, String email) {
        // Création du compte de l'utilisateur
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("id", user.getId());

        // Suivre les événements d'inscription
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

Depuis la version 2.23.0 de dd-trace-dotnet, l'API du traceur .NET permet de surveiller les événements utilisateur. 

Les exemples suivants montrent comment surveiller les événements de connexion ou des événements personnalisés (comme ici, les inscriptions).

{{< tabs >}}
{{% tab "Connexion réussie" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, ...)
{
    // Les métadonnées sont facultatives
    var metadata = new Dictionary<string, string>()
    {
        { "customKey", "customValue" }
    };
    EventTrackingSdk.TrackUserLoginSuccessEvent(userId, metadata);

    // ...
}

```
{{% /tab %}}
{{% tab "Échec de connexion" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonFailure(string userId, bool userExists, ...)
{
    // Les métadonnées sont facultatives
    var metadata = new Dictionary<string, string>()
    {
        { "customKey", "customValue" }
    };
    EventTrackingSdk.TrackUserLoginFailureEvent(userId, userExists, metadata);

    // ...
}
```

{{% /tab %}}

{{% tab "Logique opérationnelle personnalisée" %}}
```csharp
void OnUserSignupComplete(string userId, ...)
{
    // Le paramètre de métadonnées est facultatif, mais ajout de "usr.id"
    var metadata = new Dictionary<string, string>()
    {
        { "usr.id", userId }
    };
    // Utilisation du suivi de logique opérationnelle personnalisée pour suivre les inscriptions d'utilisateur
    EventTrackingSdk.TrackCustomEvent("users.signup", metadata);

    // ...
}
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Depuis la version 1.47.0 de dd-trace-go, l'API du traceur Go permet de surveiller les événements utilisateur. 

Les exemples suivants montrent comment surveiller les événements de connexion ou des événements personnalisés (comme ici, les inscriptions).

{{< tabs >}}
{{% tab "Connexion réussie" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := /* métadonnées d'événement supplémentaires facultatives */
  userdata := /* données utilisateur supplémentaires facultatives */

  // Suivre les connexions réussies
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "mon-uid", metadata, userdata) != nil {
    // L'ID de l'utilisateur transmis est bloqué et l'exécution du gestionnaire doit être annulée immédiatement.
    // La réponse de blocage sera envoyée par le middleware appsec.
    return
  }
}
```
{{% /tab %}}
{{% tab "Échec de connexion" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* indique si l'ID de l'utilisateur transmis existe ou non */
  metadata := /* métadonnées d'événement supplémentaires facultatives */ 
  appsec.TrackUserLoginFailureEvent(r.Context(), "mon-uid", exists, metadata)
}
```
{{% /tab %}}

{{% tab "Logique opérationnelle personnalisée" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "mon-uid"}

  // Utilisation du suivi de logique opérationnelle personnalisée pour suivre les inscriptions d'utilisateur
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Depuis la version 1.9.0 de dd-trace-rb, l'API du traceur Ruby permet de surveiller les événements utilisateur.

Les exemples suivants montrent comment surveiller les événements de connexion ou des événements personnalisés (comme ici, les inscriptions).

Les traces contenant des événements de réussite/échec de connexion peuvent être interrogées à l'aide de la requête `@appsec.security_activity:business_logic.users.login.success` ou `@appsec.security_activity:business_logic.users.login.failure`.

{{< tabs >}}
{{% tab "Connexion réussie" %}}
```ruby
require 'datadog/kit/appsec/events'

trace = Datadog::Tracing.active_trace
Datadog::Kit::AppSec::Events.track_login_success(trace, user: { id: 'mon_id_utilisateur' })
```
{{% /tab %}}

{{% tab "Échec de connexion" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Si l'ID de l'utilisateur existe
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'mon_id_utilisateur', user_exists: true)

# Si l'ID de l'utilisateur n'existe pas
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'mon_id_utilisateur', user_exists: false)
```
{{% /tab %}}

{{% tab "Logique opérationnelle personnalisée" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Utilisation du suivi de logique opérationnelle personnalisée pour suivre les inscriptions d'utilisateur
Datadog::Kit::AppSec::Events.track('users.signup', trace)
```
{{% /tab %}}
{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
Depuis la version 0.84.0 de dd-trace-php, l'API du traceur PHP permet de surveiller les événements utilisateur.

Les exemples suivants montrent comment surveiller les événements de connexion ou des événements personnalisés (comme ici, les inscriptions).

{{< tabs >}}
{{% tab "Connexion réussie" %}}
```php
<?php
\datadog\appsec\track_user_login_success_event($id, ['email' => $email])
?>
```
{{% /tab %}}

{{% tab "Échec de connexion" %}}
```php
<?php
\datadog\appsec\track_user_login_failure_event($id, $exists, ['email' => $email])
?>
```
{{% /tab %}}

{{% tab "Logique opérationnelle personnalisée" %}}
```php
<?php
\datadog\appsec\track_custom_event('users.signup', ['id' => $id, 'email' => $email]);
?>
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Depuis la version 3.13.1 de dd-trace-js, l'API du traceur NodeJS permet de surveiller les événements utilisateur.

Les exemples suivants montrent comment surveiller les événements de connexion ou des événements personnalisés (comme ici, les inscriptions).

{{< tabs >}}
{{% tab "Connexion réussie" %}}
```javascript
const tracer = require('dd-trace')

// Dans un contrôleur :
const user = {
  id: 'id-utilisateur', // L'ID est obligatoire
  email: 'utilisateur@email.com' // Les autres champs sont facultatifs
}
const metadata = { perso: 'valeur' } // Métadonnées facultatives avec des champs personnalisés

// Enregistrer un événement d'authentification réussie de l'utilisateur
tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // Les métadonnées sont facultatives
```
{{% /tab %}}

{{% tab "Échec de connexion" %}}
```javascript
const tracer = require('dd-trace')

// Dans un contrôleur :
const userId = 'id-utilisateur'
const userExists = true // Si l'utilisateur existe dans la base de données par exemple
const metadata = { perso: 'valeur' } // Métadonnées facultatives avec des champs personnalisés

// Les métadonnées sont facultatives
tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata)
```
{{% /tab %}}

{{% tab "Logique opérationnelle personnalisée" %}}
```javascript
const tracer = require('dd-trace')

// Dans un contrôleur :
const eventName = 'users.signup'
const metadata = { 'usr.id': 'id-utilisateur' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Depuis la version 1.9.0 de dd-trace-py, l'API du traceur Python permet de surveiller les événements utilisateur.

Les exemples suivants montrent comment surveiller les événements de connexion ou des événements personnalisés (comme ici, les inscriptions).

{{< tabs >}}

{{% tab "Connexion réussie" %}}

```python
from ddtrace.appsec.trace_utils import track_user_login_success_event
from ddtrace import tracer
metadata = {"perso": "valeurperso"}
# name, email, scope, role, session_id et propagate sont des arguments facultatifs 
# dont la valeur pas défaut est None, sauf propagate dont la valeur par défaut est 
# True. Ils seront transmis à la fonction set_user()
track_user_login_success_event(tracer, "userid", metadata)
```
{{% /tab %}}
{{% tab "Échec de connexion" %}}
```python
from ddtrace.appsec.trace_utils import track_user_login_failure_event
from ddtrace import tracer
metadata = {"perso": "valeurperso"}
# exists indique si l'utilisateur dont la connexion a échoué existe dans le système
exists = False
track_user_login_failure_event(tracer, "userid", exists, metadata)
```
{{% /tab %}}

{{% tab "Logique opérationnelle personnalisée" %}}

```python
from ddtrace.appsec.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.id": "12345"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Suivi automatique des événements liés aux activités des utilisateurs

Lorsque la solution ASM est activée, les récentes bibliothèques de tracing de Datadog tentent de détecter automatiquement les événements liés aux activités des utilisateurs.

Les événements pouvant être détectés automatiquement sont les suivants :

- `users.login.success`
- `users.login.failure`
- `users.signup`

### Mode de suivi automatique des événements liés aux activités des utilisateurs

Deux modes de suivi automatique des événements liés aux activités des utilisateurs sont disponibles : <code>safe</code> et <code>extended</code>.

En mode <code>safe</code>, la bibliothèque de tracing n'inclut aucune information personnelle dans les métadonnées des événements. Elle tente de collecter l'ID de l'utilisateur, mais uniquement si cet ID correspond à un [GUID][10] valide.

En mode <code>extended</code>, la bibliothèque de tracing tente de collecter l'ID de l'utilisateur et son adresse e-mail. Dans ce mode, elle ne vérifie pas si l'ID de l'utilisateur correspond à un GUID. Elle transmet toute valeur pouvant être extraite de l'événement.

Pour configurer le mode de suivi automatique des événements utilisateur à utiliser, vous pouvez définir la variable d'environnement <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> sur <code>safe</code> ou <code>extended</code>. Par défaut, la bibliothèque de tracing utilise le mode <code>safe</code>.

**Remarque** : il peut arriver que la bibliothèque de tracing ne puisse pas extraire d'informations de l'événement utilisateur. Ce dernier est alors transmis sans métadonnées. Dans ce cas, nous vous conseillons d'utiliser le [SDK](#ajouter-des-informations-relatives-a-la-logique-operationnelle-connexion-reussie-echec-de-connexion-tout-evenement-de-logique-operationnelle-aux-traces) pour instrumenter manuellement l'événement utilisateur.

## Désactiver le suivi automatique des événements liés aux activités des utilisateurs

Si vous souhaitez désactiver la détection de ces événements, vous pouvez définir la variable d'environnement <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> sur <code>disabled</code>. Cette variable doit être définie au niveau de l'application hébergeant la bibliothèque de tracing de Datadog, et non au niveau de l'Agent Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[3]: /fr/tracing/trace_collection/custom_instrumentation/
[4]: /fr/security/default_rules/bl-rate-limiting/
[5]: /fr/security/default_rules/bl-privilege-violation-user/
[6]: /fr/security/default_rules/appsec-ato-groupby-ip/
[7]: /fr/security/default_rules/bl-signup-ratelimit/
[8]: /fr/security/default_rules/bl-account-deletion-ratelimit/
[9]: /fr/security/default_rules/bl-password-reset/
[10]: /fr/security/default_rules/bl-payment-failures/
[11]: https://guid.one/guid