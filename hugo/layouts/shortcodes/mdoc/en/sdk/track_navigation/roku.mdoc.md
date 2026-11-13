## Automatically track views

The Roku SDK doesn't track views automatically. Track views manually as described in the following section.

## Manually track views

To split [user sessions][1] into logical steps, start a view using the following code. Every navigation to a new screen within your channel should correspond to a new view.

```vb.net
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

For the attributes collected, see [Data Collected][2].

[1]: /real_user_monitoring/rum_terms_and_concepts/
[2]: /real_user_monitoring/setup/data_collected/?platform=roku#view-attributes
