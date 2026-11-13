To enable feature flag data collection for the Browser SDK:

1. Set up [RUM browser monitoring][1]. You need the Browser RUM SDK version >= 4.25.0.

By default, feature flag data is collected on view and error events. To collect feature flag data on additional event types, set the `trackFeatureFlagsForEvents` initialization parameter to a list including `vital`, `action`, `long_task`, or `resource`.

[1]: /real_user_monitoring/setup/install/?platform=browser
