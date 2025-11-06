---
title: User Monitoring and Protection
aliases:
  - /security_platform/application_security/add-user-info
  - /security/application_security/add-user-info
---

## Overview

Instrument your services and track user activity to detect and block bad actors.

[Add authenticated user information on traces](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) to identify and block bad actors targeting your authenticated attack surface. To do this, set the user ID tag on the running APM trace, providing the necessary instrumentation for AAP to block authenticated attackers. This allows AAP to associate attacks and business logic events to users.

[Track user logins and activity](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) to detect account takeovers and business logic abuse with out-of-the-box detection rules, and to ultimately block attackers.

The custom user activity for which out-of-the-box detection rules are available are as follow:

| Built-in event names   | Required metadata                                    | Related rules                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [Rate limited activity from IP][4]<br>[Unauthorized activity detected][5] |
| `users.login.success`  | User ID is mandatory, optional metadata can be added | [Credential Stuffing attack][6]<br>[Bruteforce attack][12]<br>[Distributed Credential Stuffing][13]               |
| `users.login.failure`  | User ID and `usr.exists` are mandatory, optional metadata can be added | [Credential Stuffing attack][6]<br>[Bruteforce attack][12]<br>[Distributed Credential Stuffing][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [Excessive account creations from an IP][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [Excessive account deletion from an IP][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [Password reset brute force attempts][9]                                                                                                         |
| `payment.failure`      | None                                                 | [Excessive payment failures from IP][10]                                                                                                        |

## Adding authenticated user information to traces and enabling user blocking capability

<div class="alert alert-info">
<strong>Automated Detection of User Activity:</strong> Datadog Tracing Libraries attempt to detect and report user activity events automatically. For more information, see <a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">Disabling automatic user activity event tracking</a>.
</div>

You can [add custom tags to your root span][3], or use the instrumentation functions described below.

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Use the Java tracer's API for adding custom tags to a root span and add user information so that you can monitor authenticated requests in the application.

User monitoring tags are applied on the root span and start with the prefix `usr` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user's name.

**Note**: Check that you have added [necessary dependencies to your application][1].

The example below shows how to obtain the root span, add the relevant user monitoring tags, and enable user blocking capability:

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

[1]: /tracing/trace_collection/custom_instrumentation/opentracing/java#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

The .NET tracer package provides the `SetUser()` function, which allows you to monitor authenticated requests by adding user information to the trace.

The example below shows how to add the relevant user monitoring tags and enable user blocking capability:

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

For information and options, read [the .NET tracer documentation][1].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

The Go tracer package provides the `SetUser()` function, which allows you to monitor authenticated requests by adding user information to the trace. For more options, see [the Go tracer documentation][2] (or [v1 documentation][1]).

This example shows how to retrieve the current tracer span, use it to set user monitoring tags, and enable user blocking capability. {{% tracing-go-v2 %}}

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

Use one of the following APIs to add user information to a trace so that you can monitor authenticated requests in the application:

{{% collapse-content title="set_user" level="h4" expanded="true" %}}

Starting with `ddtrace` 1.1.0, the `Datadog::Kit::Identity.set_user` method is available. This is the recommended API for adding user information to traces:

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

If `Datadog::Kit::Identity.set_user` does not meet your needs, you can use `set_tag` instead.

User monitoring tags are applied on the trace and start with the prefix `usr.` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user's name.

The example below shows how to obtain the active trace and add relevant user monitoring tags:

**Notes**:
- Tag values must be strings.
- The `usr.id` tag is mandatory.

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

The PHP tracer provides the `\DDTrace\set_user()` function, which allows you to monitor and block authenticated requests.

`\DDTrace\set_user()` adds the relevant user tags and metadata to the trace and automatically performs user blocking.

The following example shows how to set user monitoring tags and enable user blocking:

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

The Node tracer package provides the `tracer.setUser(user)` function, which allows you to monitor authenticated requests by adding user information to the trace.

The example below shows how to add relevant user monitoring tags and enable user blocking capability:

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

For information and options, read [the Node.js tracer documentation][1].



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Starting in dd-trace-py v3.7, you can use the new Python tracer's SDK to track users and user events.

In previous versions, you can monitor authenticated requests by adding user information to the trace with the `set_user` function provided by the Python tracer package.

{{% collapse-content title="User Tracking SDK" level="h4" expanded="true" id="python-user-info-sdk" %}}

Starting in dd-trace-py v3.7, this example shows how to set user monitoring tags and enable user blocking capability:

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

{{% collapse-content title="Legacy API" level="h4" expanded="false" id="python-user-info-legacy" %}}

This example shows how to set user monitoring tags and enable user blocking capability using the legacy API; however, using the new User Tracking SDK, described above, is encouraged.

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

## Adding business logic information (login success, login failure, any business logic) to traces

<div class="alert alert-info">
<strong>A note on usr.id and usr.login:</strong> Investigation login abuse rely on two similar, but different concepts. usr.id contains the unique identifier of the user account in database. It's unique and immutable. It's unavailable when someone tries to log into a non-existant account. User blocking targets usr.id.</br>
The user generally isn't aware of their user ID. Instead, they rely on mutable identifiers (phone number, username, email address...). The string used by the user to log into an account should be reported as usr.login in login events.</br>
If no usr.login is provided, usr.id will be used instead.</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

Starting in dd-trace-java v1.8.0, you can use the Java tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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

{{% collapse-content title="Login failure" level="h4" expanded="false" id="java-login-failure" %}}
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

{{% collapse-content title="Custom business logic" level="h4" expanded="false" id="java-custom-business" %}}
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

Starting in dd-trace-dotnet v2.23.0, you can use the .NET tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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
{{% collapse-content title="Login failure" level="h4" expanded="false" id="dotnet-login-failure" %}}
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

{{% collapse-content title="Custom business logic" level="h4" expanded="false" id="dotnet-custom-business" %}}
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

Starting in dd-trace-go v1.47.0, you can use the Go tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example). {{% tracing-go-v2 %}}

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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
{{% collapse-content title="Login failure" level="h4" expanded="false" id="go-login-failure" %}}
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

{{% collapse-content title="Custom business logic" level="h4" expanded="false" id="go-custom-business" %}}
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

Starting in dd-trace-rb v1.9.0, you can use the Ruby tracer's API to track user events. Version v2.19.0 of dd-trace-rb introduces new methods under the `Datadog::Kit::AppSec::Events::V2` namespace. Existing event tracking methods are retained for compatibility.

The following examples show how to track login events or custom events (using signup as an example).

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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

{{% collapse-content title="Login failure" level="h4" expanded="false" id="ruby-login-failure" %}}
```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # the string used by the user to log in
user_exists = true      # if the user login exists in database for example
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="Custom business logic" level="h4" expanded="false" id="ruby-custom-business" %}}
```ruby
require 'datadog/kit/appsec/events'

span = nil
trace = Datadog::Tracing.active_trace
metadata = { 'usr.id': 'some-user-id' }
event_name = 'users.signup'

Datadog::Kit::AppSec::Events.track(event_name, trace, span, metadata)
```
{{% /collapse-content %}}

#### Migrating to the new login success and failure methods

The new methods in `Datadog::Kit::AppSec::Events::V2` introduce a more intuitive parameter order and clearer separation of concerns. Here are the key changes:

1. The login identifier (email, username) is the first parameter and is mandatory.
2. The user object/ID is optional in success events and has been removed from failure events.
3. Metadata has been simplified and no longer requires the `usr.login` field.
4. The trace and span parameters are no longer required and are automatically inferred.

**Note**: the legacy methods `track_login_success` and `track_login_failure` are deprecated in favor of the new methods `track_user_login_success` and `track_user_login_failure`, respectively.

In the following example, the commented code is no longer necessary.

{{% collapse-content title="Login success" level="h4" expanded="true" id="ruby-v2-migration-login-success" %}}
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

{{% collapse-content title="Login failure" level="h4" expanded="false" id="ruby-v2-migration-login-failure" %}}
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
Starting in dd-trace-php v0.84.0, you can use the PHP tracer's API to track user events. Version v1.11.0 of dd-trace-php introduces new methods under the `\datadog\appsec\v2\` namespace. Existing event tracking methods are retained for compatibility.

The following examples show how to track login events or custom events (using signup as an example).

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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

{{% collapse-content title="Login failure" level="h4" expanded="false" id="php-login-failure" %}}
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

{{% collapse-content title="Custom business logic" level="h4" expanded="false" id="php-custom-business" %}}
```php
<?php
$eventName = 'users.signup'; // custom event name
$metadata = ['usr.id' => $id]; // you can add arbitrary fields to metadata
\datadog\appsec\track_custom_event($eventName, $metadata);
?>
```
{{% /collapse-content %}}

#### Migrating to the new login success and failure methods

The new methods in `\datadog\appsec\v2\` namespace introduce a more intuitive parameter order and clearer separation of concerns. Here are the key changes:

1. The login identifier (email, username) is the first parameter and is mandatory.
2. The user array/ID is optional in success events and has been removed from failure events.
3. Metadata has been simplified and no longer requires the `usr.login` field.

**Note**: the legacy methods `\datadog\appsec\track_user_login_success_event` and `\datadog\appsec\track_user_login_failure_event` are deprecated in favor of the new methods `\datadog\appsec\v2\track_user_login_success` and `\datadog\appsec\v2\track_user_login_failure`, respectively.

In the following example, the commented code is no longer necessary.

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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

{{% collapse-content title="Login failure" level="h4" expanded="false" id="php-migration-login-failure" %}}
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

Starting in dd-trace-js v3.13.1, you can use the Node.js tracer API to track user events. Version v5.48.0 of dd-trace-js introduces new methods under the `eventTrackingV2` namespace. Existing event tracking methods are retained for compatibility.


The following examples show how to track login events or custom events (using signup as an example).

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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

{{% collapse-content title="Login failure" level="h4" expanded="false" id="nodejs-login-failure" %}}
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

{{% collapse-content title="Custom business logic" level="h4" expanded="false" id="nodejs-custom-business" %}}
```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

#### Migrating to the new login success and failure methods

The new methods in `eventTrackingV2` introduce a more intuitive parameter order and clearer separation of concerns. Here are the key changes:

1. The login identifier (email, username) is the first parameter and is mandatory.
2. The user object/ID is optional in success events and has been removed from failure events.
3. Metadata has been simplified and no longer requires the `usr.login` field.

**Note**: the legacy methods `trackUserLoginSuccessEvent` and `trackUserLoginFailureEvent` are deprecated in favor of the new methods `eventTrackingV2.trackUserLoginSuccess` and `eventTrackingV2.trackUserLoginFailure`, respectively.

In the following example, the commented code is no longer necessary.

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
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

{{% collapse-content title="Login failure" level="h4" expanded="false" id="nodejs-migration-login-failure" %}}
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


Starting in dd-trace-py v1.9.0, you can use the Python tracer's API to track user events.

Starting in dd-trace-py v3.7, you can use the new Python tracer's SDK to track users and user events.

The following examples show how to track login events, signup events, or custom events.

{{% collapse-content title="User Tracking SDK" level="h4" expanded="true" id="python-business-logic-sdk" %}}

Available since dd-trace-py v3.7, `track_user_sdk` provides 5 functions:

- `track_login_success`
- `track_login_failure`
- `track_signup`
- `track_custom_event`
- `track_user`

Available since dd-trace-py v3.17, `track_user_sdk` provides this additional function:

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

{{% collapse-content title="FastAPI Toy App with SDK" level="h4" expanded="false" id="python-business-logic-example" %}}

The following example is a fully functioning Toy application that uses the User Tracking SDK with a memory-based user database. This example illustrates the possible usage of the SDK but does not provide the necessary requirements of a real application, such as a persistent data model or a secure authentication system.

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


{{% collapse-content title="Legacy API" level="h4" expanded="false" id="python-business-logic-legacy" %}}

The preferred method is to use the new User Tracking SDK (available since dd-trace-py v1.9) instead of the Legacy API.

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

### Tracking business logic information without modifying the code

If your service has AAP enabled and [Remote Configuration][1] enabled, you can create a custom WAF rule to flag any request it matches with a custom business logic tag. This doesn't require any modification to your application, and can be done entirely from Datadog.

To get started, navigate to the [Custom WAF Rule page][2] and click on "Create New Rule".

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="Access the Custom WAF Rule Menu from the AAP homepage by clicking on Protection, then In-App WAF and Custom Rules" style="width:100%;" >}}

This will open a menu in which you may define your custom WAF rule. By selecting the "Business Logic" category, you will be able to configure an event type (for instance, `users.password_reset`). You can then select the service you want to track, and a specific endpoint. You may also use the rule condition to target a specific parameter to identify the codeflow you want to _instrument_. When the condition matches, the library tags the trace and flags it to be forwarded to AAP. If you don't need the condition, you may set a broad condition to match everything.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Screenshot of the form that appear when you click on the Create New Rule button" style="width:50%;" >}}

Once saved, the rule is deployed to instances of the service that have Remote Configuration enabled.


[1]: /tracing/guide/remote_config
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## Automatic user activity event tracking

When AAP is enabled, Datadog Tracing Libraries attempt to detect user activity events automatically.

The events that can be automatically detected are:

- `users.login.success`
- `users.login.failure`
- `users.signup`

### Automatic user activity event tracking modes

Automatic user activity tracking offers the following modes:

- `identification` mode (short name: `ident`):
  - This mode is the default and always collects the user ID or best effort.
  - The user ID is collected on login success and login failure. With failure, the user ID is collected regardless of whether the user exists or not.
  - When the instrumented framework doesn't clearly provide a user ID, but rather a structured user object, the user ID is determined on a best effort basis based on the object field names. This list of field names are considered, ordered by priority:
    - `id`
    - `email`
    - `username`
    - `login`
    - `user`
  - If no user ID is available or found, the user event is not emitted.
- `anonymization` mode (short name: `anon`):
  - This mode is the same as `identification`, but anonymizes the user ID by hashing (SHA256) it and cropping the resulting hash.
- `disabled` mode:
  - AAP libraries do *not* collect any user ID from their automated instrumentations.
  - User login events are not emitted.

<div class="alert alert-info">All modes only affect automated instrumentation. The modes don't apply to manual collection. Manual collection is configured using an SDK, and those settings are not overridden by automated instrumentation.</div>

### Manual configuration

Datadog libraries allow you to configure auto-instrumentation by using the `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` environment variable with the short name for the mode: `ident`|`anon`|`disabled`.

The default mode is `identification` mode (short name: `ident`).

For example, `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`.

### Deprecated modes

<div class="alert alert-info">Previous modes are deprecated, but compatibility will be maintained until the next major release.</div>

The following modes are deprecated:

- `safe` mode: The trace library does not include any PII information on the events metadata. The tracer library tries to collect the user ID, and only if the user ID is a valid [GUID][10]
- `extended` mode: The trace library tries to collect the user ID, and the user email. In this mode, Datadog does not check the type for the user ID to be a GUID. The trace library reports whatever value can be extracted from the event.

**Note**: There could be cases in which the trace library won't be able to extract any information from the user event. The event would be reported with empty metadata. In those cases, use the [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) to manually instrument the user events.

## Disabling user activity event tracking

To disable automated user activity detection through your [AAP Software Catalog][14], change the automatic tracking mode environment variable `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` to `disabled` on the service you want to deactivate. All modes only affect automated instrumentation and require [Remote Configuration][15] to be enabled.

For manual configuration, you can set the environment variable `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED` to `false` on your service and restart it. This must be set on the application hosting the Datadog Tracing Library, and not on the Datadog Agent.

[3]: /tracing/trace_collection/custom_instrumentation/
[4]: /security/default_rules/bl-rate-limiting/
[5]: /security/default_rules/bl-privilege-violation-user/
[6]: /security/default_rules/appsec-ato-groupby-ip/
[7]: /security/default_rules/bl-signup-ratelimit/
[8]: /security/default_rules/bl-account-deletion-ratelimit/
[9]: /security/default_rules/bl-password-reset/
[10]: /security/default_rules/bl-payment-failures/
[11]: https://guid.one/guid
[12]: /security/default_rules/appsec-ato-bf/
[13]: /security/default_rules/distributed-ato-ua-asn/
[14]: https://app.datadoghq.com/security/appsec/inventory/services?tab=capabilities
[15]: /tracing/guide/remote_config
