## Configure the session sample rate

Use the `sessionSampleRate` parameter of your RUM configuration to set the percentage of sessions the SDK sends to Datadog: `100` for all, `0` for none. Only tracked sessions send RUM events. The default is `100`:

```javascript
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
        rumConfiguration: {
            applicationId: '<APPLICATION_ID>',
            sessionSampleRate: 100,
        }
    }
);
```

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume. For the full parameter reference, see [Initialization parameters][2].

## Retrieve the session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime with:

```javascript
import { DdRum } from '@datadog/mobile-react-native';

const rumSessionId = await DdRum.getCurrentSessionId();
```

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[2]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=react_native#initialization-parameters
