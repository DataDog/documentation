## Automatically track user interactions

The Roku SDK doesn't track user interactions automatically. Track actions manually as described in the following section.

## Manually track actions and send custom events

RUM actions represent the interactions your users have with your channel. Forward actions to Datadog as follows:

```vb.net
    targetName = "playButton" ' the name of the SG Node the user interacted with
    actionType = "click" ' the type of interaction, should be one of "click", "back", or "custom"
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```

For the attributes collected, see [Data Collected][1].

[1]: /real_user_monitoring/setup/data_collected/?platform=roku#action-timing-attributes
