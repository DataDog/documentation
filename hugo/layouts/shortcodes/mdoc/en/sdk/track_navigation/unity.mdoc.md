## Automatically track views

To track scenes as views automatically, select {% ui %}Enable Automatic Scene Tracking{% /ui %} in the Datadog section of your {% ui %}Project Settings{% /ui %}. Datadog hooks into Unity's `SceneManager.activeSceneChanged` event to detect scenes loading and unloading, and starts RUM views accordingly.

## Manually track views

If you move between scenes without `SceneManager`, or want to track changes in views that occur within a scene, track views manually with the `StartView` and `StopView` methods:

```csharp
public void Start()
{
    DatadogSdk.Instance.Rum.StartView("My View", new()
    {
        { "view_attribute", "active" }
    });
}

public void OnDestroy()
{
    DatadogSdk.Instance.Rum.StopView("My View");
}
```

Starting a new view automatically ends the previous view.

For the attributes collected, see [Data Collected][1].

[1]: /real_user_monitoring/setup/data_collected/?platform=unity
