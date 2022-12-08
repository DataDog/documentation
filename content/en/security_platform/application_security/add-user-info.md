---
title: Tracking User Activity
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Protect against threats with Datadog Application Security Management"
- link: "/security_platform/application_security/setup_and_configure/"
  tag: "Documentation"
  text: "Other setup considerations and configuration options"
---

## Overview

Instrument your services with the standardized user tags to track authenticated user activity, whether you're tracking application performance or application security.

This way, you can identify bad actors that are generating suspicious security activity, review all their activity around this time frame, and prioritize handling the most advanced attacks and signals targeting your authenticated attack surface.

You can [add custom tags to your root span][1], or use the instrumentation functions described below.

## Adding user information to traces

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Use the the Java tracer's API for adding custom tags to a root span and add user information so that you can monitor authenticated requests in the application.

User monitoring tags are applied on the root span and start with the prefix `usr` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user’s name.

**Note**: Check that you have added [necessary dependencies to your application][1].

The example below shows how to obtain the root span and add the relevant user monitoring tags:

```java
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
```


[1]: /tracing/trace_collection/compatibility/java/#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

The .NET tracer package provides the `SetUser()` function, which allows you to monitor authenticated requests by adding user information to the trace.

The example below shows how to add the relevant user monitoring tags:

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

This example shows how to retrieve the current tracer span and use it to set user monitoring tags:

```go
// Retrieve the current tracer span from an HTTP request's context
if span, ok := tracer.SpanFromContext(request.Context()); ok {
    // Record user information in the trace the span belongs to
    tracer.SetUser(span, usr.id, tracer.WithUserEmail(usr.email), tracer.WithUserName(usr.name))
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

User monitoring tags are applied on the trace and start with the prefix `usr.` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user’s name.

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

Use the the PHP tracer's API for adding custom tags to a root span, and add user information so that you can monitor authenticated requests in the application.

User monitoring tags are applied to the `meta` section of the root span and start with the prefix `usr` followed by the name of the field. For example, `usr.name` is a user monitoring tag that tracks the user’s name.

The example below shows how to obtain the root span and add the relevant user monitoring tags:

```php
<?php
$rootSpan = \DDTrace\root_span();

 // Required unique identifier of the user.
$rootSpan->meta['usr.id'] = ‘123456789’;

// All other fields are optional.
$rootSpan->meta['usr.name'] = ‘Jean Example’;
$rootSpan->meta['usr.email'] = ‘jean.example@example.com’;
$rootSpan->meta['usr.session_id'] = ‘987654321’;
$rootSpan->meta['usr.role'] = ‘admin’;
$rootSpan->meta['usr.scope'] = ‘read:message, write:files’;
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

The Node tracer package provides the `tracer.setUser(user)` function, which allows you to monitor authenticated requests by adding user information to the trace.

The example below shows how to add relevant user monitoring tags:

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
}
```

For information and options, read [the NodeJS tracer documentation][1].



[1]: https://github.com/DataDog/dd-trace-js/blob/master/docs/API.md#user-identification
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Monitor authenticated requests by adding user information to the trace with the `set_user` function provided by the Python tracer package.

This example shows how to set user monitoring tags:

```python
from ddtrace import tracer
from ddtrace.contrib.trace_utils import set_user

@app.route("/")
def view():
    # Record user information in the trace the span belongs to
    set_user(
        tracer,
        user_id="usr.id",
        email="usr.email",
        name="usr.name",
        session_id="usr.session_id",
        role="usr.role",
        scope="usr.scope"
    )
    return "OK"
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/
