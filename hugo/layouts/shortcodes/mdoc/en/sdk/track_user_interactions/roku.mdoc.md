## Track RUM actions

RUM actions represent the interactions your users have with your channel. Forward actions to Datadog as follows:

```vb.net
    targetName = "playButton" ' the name of the SG Node the user interacted with
    actionType = "click" ' the type of interaction, should be one of "click", "back", or "custom"
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```
