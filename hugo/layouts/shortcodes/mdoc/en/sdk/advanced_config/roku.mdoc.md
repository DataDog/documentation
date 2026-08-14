<!--
This partial contains advanced configuration instructions for the Roku SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or see the [Roku RUM setup documentation][2].

## Track RUM resources

### roUrlTransfer

Network requests made directly with a `roUrlTransfer` node must be tracked.

For *synchronous requests*, you can use Datadog's `datadogroku_DdUrlTransfer` wrapper to track the resource automatically. This wrapper supports most features of the `roUrlTransfer` component, but does not support anything related to async network calls.

For example, here's how to do a `GetToString` call:

```text
    ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
    ddUrlTransfer.SetUrl(url)
    ddUrlTransfer.EnablePeerVerification(false)
    ddUrlTransfer.EnableHostVerification(false)
    result = ddUrlTransfer.GetToString()
```

For *asynchronous requests*, automatic instrumentation is not supported. You need to track the resource manually. The following code snippet shows how to report the request as a RUM Resource:

```text
sub performRequest()

    m.port = CreateObject("roMessagePort")
    request = CreateObject("roUrlTransfer")
    ' setup the node url, headers, …

    timer = CreateObject("roTimespan")
    timer.Mark()
    request.AsyncGetToString()

    while (true)
        msg = wait(1000, m.port)
        if (msg <> invalid)
            msgType = type(msg)
            if (msgType = "roUrlEvent")
                if (msg.GetInt() = 1) ' transfer complete
                    durationMs& = timer.TotalMilliseconds()
                    transferTime# = datadogroku_millisToSec(durationMs&)
                    httpCode = msg.GetResponseCode()
                    status = "ok"
                    if (httpCode < 0)
                        status = msg.GetFailureReason()
                    end if
                    resource = {
                        url: requestUrl
                        method: "GET"
                        transferTime: transferTime#
                        httpCode: httpCode
                        status: status
                    }
                    m.global.datadogRumAgent.callfunc("addResource", resource)
                end if
            end if
        end if
    end while
end sub
```

### Streaming resources

Whenever you use a `Video` or an `Audio` node to stream media, you can forward all `roSystemLogEvent` you receive to Datadog as follows:

```text
    sysLog = CreateObject("roSystemLog")
    sysLog.setMessagePort(m.port)
    sysLog.enableType("http.error")
    sysLog.enableType("http.complete")

    while(true)
        msg = wait(0, m.port)
        if (type(msg) = "roSystemLogEvent")
            m.global.datadogRumAgent.callfunc("addResource", msg.getInfo())
        end if
    end while
```

## Enrich user sessions

After your Roku channel is instrumented with RUM, you can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

In addition to the default RUM attributes captured by the RUM Roku SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your RUM events to enrich your observability within Datadog. Custom attributes allow you to filter and group information about observed user behavior (such as cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, or network health).

### Identifying your users

See [Manage sessions](/real_user_monitoring/setup/enable_rum/manage_sessions/?platform=roku) for instructions on adding user information to your RUM sessions.

### Track custom global attributes

In addition to the default attributes captured by the SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your Logs and RUM events to enrich your observability within Datadog. Custom attributes allow you to filter and group information about observed user behavior (for example by cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

```text
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/roku/setup
