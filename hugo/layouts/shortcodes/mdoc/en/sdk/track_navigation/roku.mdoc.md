## Custom views

The Roku SDK does not automatically instrument your channel, so views must be tracked manually. To split [user sessions][1] into logical steps, start a view using the following code. Every navigation to a new screen within your channel should correspond to a new view.

```vb.net
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

For more advanced configuration options, see [Advanced Configuration][2].

[1]: /getting_started/tagging/using_tags/#rum--session-replay
[2]: /real_user_monitoring/application_monitoring/roku/advanced_configuration/
