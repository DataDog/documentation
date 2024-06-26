---
title: User Monitoring and Protection
aliases:
  - /security_platform/application_security/add-user-info
  - /security/application_security/add-user-info
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against threats with Datadog Application Security Management"
- link: "/security/application_security/threats/library_configuration/"
  tag: "Documentation"
  text: "Other setup considerations and configuration options"
---

## Overview

Instrument your services and track user activity to detect and block bad actors.

[Add authenticated user information on traces](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) to identify and block bad actors targeting your authenticated attack surface. To do this, set the user ID tag on the running APM trace, providing the necessary instrumentation for ASM to block authenticated attackers. This allows ASM to associate attacks and business logic events to users.

[Track user logins and activity](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) to detect account takeovers and business logic abuse with out-of-the-box detection rules, and to ultimately block attackers.

<div class="alert alert-info">
<strong>Automated Detection of User Activity:</strong> Datadog Tracing Libraries attempt to detect and report user activity events automatically. For more information, read <a href="/security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">Disabling automatic user activity event tracking</a>.
</div>

The custom user activity for which out-of-the-box detection rules are available are as follow:

| Built-in event names   | Required metadata                                    | Related rules                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [Rate limited activity from IP][4]<br>[Unauthorized activity detected][5] |
| `users.login.success`  | User ID is mandatory, optional metadata can be added | [Credential Stuffing attack][6]<br>[Bruteforce attack][12]<br>[Distributed Credential Stuffing][13]               |
| `users.login.failure`  | User ID and `usr.exists` are mandatory, optional metadata can be added | [Credential Stuffing attack][6]<br>[Bruteforce attack][12]<br>[Distributed Credential Stuffing][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [Excessive account creations from an IP][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [Excessive account deletion from an IP][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "exists": true }`              | [Password reset brute force attempts][9]                                                                                                         |
| `payment.attempt`      | `{ "status": "failed" }`                             | [Excessive payment failures from IP][10]                                                                                                        |

## Adding authenticated user information to traces and enabling user blocking capability

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

The Go tracer package provides the `SetUser()` function, which allows you to monitor authenticated requests by adding user information to the trace. For more options, see [the Go tracer documentation][1].

This example shows how to retrieve the current tracer span, use it to set user monitoring tags, and enable user blocking capability:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"
func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "my-uid") != nil {
    // The user must be blocked by aborting the request handler asap.
    // The blocking response is automatically handled and sent by the appsec middleware.
    return 
  }
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Use one of the following APIs to add user information to a trace so that you can monitor authenticated requests in the application:

{{< tabs >}}

{{% tab "set_user" %}}

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

{{% /tab %}}

{{% tab "set_tag" %}}

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

{{% /tab %}}

{{< /tabs >}}

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

Monitor authenticated requests by adding user information to the trace with the `set_user` function provided by the Python tracer package.

This example shows how to set user monitoring tags and enable user blocking capability:

```python
from ddtrace.contrib.trace_utils import set_user
from ddtrace import tracer
# Call set_user() to trace the currently authenticated user id
user_id = "some_user_id"
set_user(tracer, user_id, name="John", email="test@test.com", scope="some_scope",
         role="manager", session_id="session_id", propagate=True)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Adding business logic information (login success, login failure, any business logic) to traces

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

Starting in dd-trace-java v1.8.0, you can use the Java tracer's API to track user events. 

The following examples show how to track login events or custom events (using signup as an example).

{{< tabs >}}
{{% tab "Login success" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());

        // track user authentication success events
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
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        // if function returns null - user doesn't exist
        boolean userExists = (user != null);
        String userId = null;
        Map<String, String> metadata = new HashMap<>();
        if (userExists != null) {
            userId = getUserId(userName)
            metadata.put("email", user.getEmail());
        } else {
            userId = user.getEmail();
        }

        // track user authentication error events
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
        // this is where you create your user account
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("id", user.getId());

        // track user signup events
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

Starting in dd-trace-dotnet v2.23.0, you can use the .NET tracer's API to track user events. 

The following examples show how to track login events or custom events (using signup as an example).

{{< tabs >}}
{{% tab "Login success" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, ...)
{
    // metadata is optional
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
    // If no userId can be provided, any unique user identifier (username, email...) may be used
    // metadata is optional
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
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Starting in dd-trace-go v1.47.0, you can use the Go tracer's API to track user events. 

The following examples show how to track login events or custom events (using signup as an example).

{{< tabs >}}
{{% tab "Login success" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := /* optional extra event metadata */
  userdata := /* optional extra user data */

  // Track login success, replace `my-uid` by a unique identifier of the user (numeric, username, email...)
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "my-uid", metadata, userdata) != nil {
    // The given user id is blocked and the handler should be aborted asap.
    // The blocking response will be sent by the appsec middleware.
    return
  }
}
```
{{% /tab %}}
{{% tab "Login failure" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* whether the given user id exists or not */
  metadata := /* optional extra event metadata */ 
  // Replace `my-uid` by a unique identifier of the user (numeric, username, email...)
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // Leveraging custom business logic tracking to track user signups
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Starting in dd-trace-rb v1.9.0, you can use the Ruby tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

Traces containing login success/failure events can be queried using the following query `@appsec.security_activity:business_logic.users.login.success` or `@appsec.security_activity:business_logic.users.login.failure`.

{{< tabs >}}
{{% tab "Login success" %}}
```ruby
require 'datadog/kit/appsec/events'

trace = Datadog::Tracing.active_trace
# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)
Datadog::Kit::AppSec::Events.track_login_success(trace, user: { id: 'my_user_id' })
```
{{% /tab %}}

{{% tab "Login failure" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)

# if the user exists
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: true)

# if the user doesn't exist
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: false)
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Leveraging custom business logic tracking to track user signups
Datadog::Kit::AppSec::Events.track('users.signup', trace)
```
{{% /tab %}}
{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
Starting in dd-trace-php v0.84.0, you can use the PHP tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

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
// If no numeric userId is available, you may use any unique string as userId instead (username, email...)
// Make sure that the value is unique per user (and not per attacker/IP)
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
Starting in dd-trace-js v3.13.1, you can use the NodeJS tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

{{< tabs >}}
{{% tab "Login success" %}}
```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
  id: 'user-id', // id is mandatory, if no numeric ID is available, any unique identifier will do (username, email...)
  email: 'user@email.com' // other fields are optional
}
const metadata = { custom: 'value' } // optional metadata with arbitrary fields

// Log a successful user authentication event
tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // metadata is optional
```
{{% /tab %}}

{{% tab "Login failure" %}}
```javascript
const tracer = require('dd-trace')

// in a controller:
const userId = 'user-id' // if no numeric ID is available, any unique identifier will do (username, email...)
const userExists = true // if the user login exists in database for example
const metadata = { custom: 'value' } // optional metadata with arbitrary fields

// metadata is optional
tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata)
```
{{% /tab %}}

{{% tab "Custom business logic" %}}
```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Starting in dd-trace-py v1.9.0, you can use the Python tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

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
# exists indicates if the failed login user exists in the system
exists = False
# if no numeric userId is available, any unique identifier will do (username, email...)
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

### Tracking business logic information without modifying the code

If your service has ASM enabled and [Remote Configuraton][1] enabled, you can create a custom WAF rule to flag any request it matches with a custom business logic tag. This doesn't require any modification to your application, and can be done entirely from Datadog.

To get started, navigate to the [Custom WAF Rule page][2] and click on "Create New Rule".

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="Access the Custom WAF Rule Menu from the ASM homepage by clicking on Protection, then In-App WAF and Custom Rules" style="width:100%;" >}}

This will open a menu in which you may define your custom WAF rule. By selecting the "Business Logic" category, you will be able to configure an event type (for instance, `users.password_reset`). You can then select the service you want to track, and a specific endpoint. You may also use the rule condition to target a specific parameter to identify the codeflow you want to _instrument_. When the condition matches, the library tags the trace and flags it to be forwarded to ASM. If you don't need the condition, you may set a broad condition to match everything.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Screenshot of the form that appear when you click on the Create New Rule button" style="width:50%;" >}}

Once saved, the rule is deployed to instances of the service that have Remote Configuration enabled.


[1]: /agent/remote_config?tab=configurationyamlfile#application-security-management-asm
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## Automatic user activity event tracking

When ASM is enabled, recent Datadog Tracing Libraries attempt to detect user activity events automatically.

The events that can be automatically detected are:

- `users.login.success`
- `users.login.failure`
- `users.signup`

### Automatic user activity event tracking mode

Automatic user activity tracking offers two modes: <code>safe</code>, and <code>extended</code>

In <code>safe</code> mode, the trace library does not include any PII information on the events metadata. The tracer library tries to collect the user ID, and only if the user ID is a valid [GUID][10]

In <code>extended</code> mode, the trace library tries to collect the user ID, and the user email. In this mode, we do not check the type for the user ID to be a GUID. The trace library reports whatever value can be extracted from the event.

To configure automatic user event tracking mode, you can set the environment variable <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> to <code>safe</code> or <code>extended</code>. By default, the tracer library uses the <code>safe</code> mode.

**Note**: There could be cases in which the trace library won't be able to extract any information from the user event. The event would be reported with empty metadata. In those cases, we recommend using the [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) to manually instrument the user events.

## Disabling automatic user activity event tracking

If you wish to disable the detection of these events, you should set the environment variable <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> to <code>disabled</code>. This should be set on the application hosting the Datadog Tracing Library, and not on the Datadog Agent.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

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
