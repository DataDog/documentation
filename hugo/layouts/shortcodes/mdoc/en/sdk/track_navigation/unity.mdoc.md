### Automatic view tracking

If you select `Enable Automatic Scene Tracking`, Datadog hooks into Unity's `SceneManager` to detect scenes loading and unloading, and start RUM Views appropriately. If you are using methods to move between scenes other than `SceneManager`, or would like to track changes in views that occur without `SceneManager`, you need to track views manually using `DdRum.StartView` and `DdRum.StopView`.

[1]: https://app.datadoghq.com/rum/application/create
