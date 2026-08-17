### Automated resource collection

For synchronous requests made with a `roUrlTransfer` node, use Datadog's `datadogroku_DdUrlTransfer` wrapper to track the resource automatically. This wrapper supports most features of the `roUrlTransfer` component, but doesn't support asynchronous network calls.

```text
ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
ddUrlTransfer.SetUrl(url)
ddUrlTransfer.EnablePeerVerification(false)
ddUrlTransfer.EnableHostVerification(false)
result = ddUrlTransfer.GetToString()
```

### Manual resource collection

Asynchronous `roUrlTransfer` requests aren't automatically instrumented. Track the resource manually by forwarding the `roUrlEvent` to `addResource`:

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
            if (type(msg) = "roUrlEvent")
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

For media streaming, forward `roSystemLogEvent` from a `Video` or `Audio` node's `roSystemLog` the same way:

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
