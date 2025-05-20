---
title: User Monitoring and Protection
aliases:
  - /security_platform/application_security/add-user-info
  - /security/application_security/add-user-info
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against threats with Datadog App and API Protection"
- link: "/security/application_security/threats/library_configuration/"
  tag: "Documentation"
  text: "Other setup considerations and configuration options"
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

Starting in dd-trace-java v1.8.0, you can use the Java tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

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

### Login failure

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

### Custom business logic

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

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

Starting in dd-trace-dotnet v2.23.0, you can use the .NET tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

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

### Login failure

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

### Custom business logic

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

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Starting in dd-trace-go v1.47.0, you can use the Go tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
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

### Login failure

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* whether the given user id exists or not */
  metadata := make(map[string]string) /* optional extra event metadata */
  metadata["usr.login"] = "user-email"

  // Replace `my-uid` by a unique identifier of the user (numeric, username, email...)
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```

### Custom business logic

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // Leveraging custom business logic tracking to track user signups
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Starting in dd-trace-rb v1.9.0, you can use the Ruby tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

Traces containing login success/failure events can be queried using the following query `@appsec.security_activity:business_logic.users.login.success` or `@appsec.security_activity:business_logic.users.login.failure`.

### Login success

```ruby
require 'datadog/kit/appsec/events'

trace = Datadog::Tracing.active_trace
# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)
Datadog::Kit::AppSec::Events.track_login_success(trace, user: { id: 'my_user_id' }, { 'usr.login': 'my_user_email' })
```

### Login failure

```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)

# if the user exists
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: true, { 'usr.login': 'my_user_email' })

# if the user doesn't exist
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: false, { 'usr.login': 'my_user_email' })
```

### Custom business logic

```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)

# Leveraging custom business logic tracking to track user signups
Datadog::Kit::AppSec::Events.track('users.signup', trace, nil, { 'usr.id': 'my_user_id'})
```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
Starting in dd-trace-php v0.84.0, you can use the PHP tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

```php
<?php
\datadog\appsec\track_user_login_success_event($id, ['usr.login' => $email])
?>
```

### Login failure

```php
<?php
// If no numeric userId is available, you may use any unique string as userId instead (username, email...)
// Make sure that the value is unique per user (and not per attacker/IP)
\datadog\appsec\track_user_login_failure_event($id, $exists, ['usr.login' => $email])
?>
```

### Custom business logic

```php
<?php
\datadog\appsec\track_custom_event('users.signup', ['usr.id' => $id]);
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Starting in dd-trace-js v3.13.1, you can use the Node.js tracer API to track user events. Version v5.48.0 of dd-trace-js introduces new methods under the `eventTrackingV2` namespace. Existing event tracking methods are retained for compatibility.

### Login success

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

### Login failure

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

### Custom business logic

```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```

### Migrating to the new login success and failure methods

The new methods in `eventTrackingV2` introduce a more intuitive parameter order and clearer separation of concerns. Here are the key changes:

1. The login identifier (email, username) is the first parameter and is mandatory.
2. The user object/ID is optional in success events and has been removed from failure events.
3. Metadata has been simplified and no longer requires the `usr.login` field.

**Note**: the legacy methods `trackUserLoginSuccessEvent` and `trackUserLoginFailureEvent` are deprecated in favor of the new methods `eventTrackingV2.trackUserLoginSuccess` and `eventTrackingV2.trackUserLoginFailure`, respectively.

In the following example, the commented code is no longer necessary.

### Login Success Migration Example

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

### Login Failure Migration Example

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

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Starting in dd-trace-py v1.9.0, you can use the Python tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

```python
from ddtrace.contrib.trace_utils import track_user_login_success_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# name, email, scope, role, session_id and propagate are optional arguments which
# default to None except propagate that defaults to True. They'll be
# passed to the set_user() function
track_user_login_success_event(tracer, "userid", metadata)
```

### Login failure

```python
from ddtrace.contrib.trace_utils import track_user_login_failure_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# exists indicates if the failed login user exists in the system
exists = False
# if no numeric userId is available, any unique identifier will do (username, email...)
track_user_login_failure_event(tracer, "userid", exists, metadata)
```

### Custom business logic

```python
from ddtrace.contrib.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.id": "userid"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```

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

### Login success

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

### Login failure

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

### Custom business logic

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

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

Starting in dd-trace-dotnet v2.23.0, you can use the .NET tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

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

### Login failure

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

### Custom business logic

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

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Starting in dd-trace-go v1.47.0, you can use the Go tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
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

### Login failure

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* whether the given user id exists or not */
  metadata := make(map[string]string) /* optional extra event metadata */
  metadata["usr.login"] = "user-email"

  // Replace `my-uid` by a unique identifier of the user (numeric, username, email...)
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```

### Custom business logic

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // Leveraging custom business logic tracking to track user signups
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Starting in dd-trace-rb v1.9.0, you can use the Ruby tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

Traces containing login success/failure events can be queried using the following query `@appsec.security_activity:business_logic.users.login.success` or `@appsec.security_activity:business_logic.users.login.failure`.

### Login success

```ruby
require 'datadog/kit/appsec/events'

trace = Datadog::Tracing.active_trace
# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)
Datadog::Kit::AppSec::Events.track_login_success(trace, user: { id: 'my_user_id' }, { 'usr.login': 'my_user_email' })
```

### Login failure

```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)

# if the user exists
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: true, { 'usr.login': 'my_user_email' })

# if the user doesn't exist
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: false, { 'usr.login': 'my_user_email' })
```

### Custom business logic

```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)

# Leveraging custom business logic tracking to track user signups
Datadog::Kit::AppSec::Events.track('users.signup', trace, nil, { 'usr.id': 'my_user_id'})
```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
Starting in dd-trace-php v0.84.0, you can use the PHP tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

```php
<?php
\datadog\appsec\track_user_login_success_event($id, ['usr.login' => $email])
?>
```

### Login failure

```php
<?php
// If no numeric userId is available, you may use any unique string as userId instead (username, email...)
// Make sure that the value is unique per user (and not per attacker/IP)
\datadog\appsec\track_user_login_failure_event($id, $exists, ['usr.login' => $email])
?>
```

### Custom business logic

```php
<?php
\datadog\appsec\track_custom_event('users.signup', ['usr.id' => $id]);
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Starting in dd-trace-py v1.9.0, you can use the Python tracer's API to track user events.

The following examples show how to track login events or custom events (using signup as an example).

### Login success

```python
from ddtrace.contrib.trace_utils import track_user_login_success_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# name, email, scope, role, session_id and propagate are optional arguments which
# default to None except propagate that defaults to True. They'll be
# passed to the set_user() function
track_user_login_success_event(tracer, "userid", metadata)
```

### Login failure

```python
from ddtrace.contrib.trace_utils import track_user_login_failure_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# exists indicates if the failed login user exists in the system
exists = False
# if no numeric userId is available, any unique identifier will do (username, email...)
track_user_login_failure_event(tracer, "userid", exists, metadata)
```

### Custom business logic

```python
from ddtrace.contrib.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.id": "userid"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Tracking business logic information without modifying the code

If your service has AAP enabled and [Remote Configuration][1] enabled, you can create a custom WAF rule to flag any request it matches with a custom business logic tag. This doesn't require any modification to your application, and can be done entirely from Datadog.

To get started, navigate to the [Custom WAF Rule page][2] and click on "Create New Rule".

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="Access the Custom WAF Rule Menu from the AAP homepage by clicking on Protection, then In-App WAF and Custom Rules" style="width:100%;" >}}

This will open a menu in which you may define your custom WAF rule. By selecting the "Business Logic" category, you will be able to configure an event type (for instance, `users.password_reset`). You can then select the service you want to track, and a specific endpoint. You may also use the rule condition to target a specific parameter to identify the codeflow you want to _instrument_. When the condition matches, the library tags the trace and flags it to be forwarded to AAP. If you don't need the condition, you may set a broad condition to match everything.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Screenshot of the form that appear when you click on the Create New Rule button" style="width:50%;" >}}

Once saved, the rule is deployed to instances of the service that have Remote Configuration enabled.


[1]: /agent/remote_config?tab=configurationyamlfile#application-security-management-asm
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
