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

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/roku/setup
