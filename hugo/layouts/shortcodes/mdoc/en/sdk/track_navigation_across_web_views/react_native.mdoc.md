Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications. You can track user journeys across web and native components, scope the root cause of latency to web pages or native components, and support users that have difficulty loading web pages on mobile devices.

You can also record the entire user journey across both web and native views and watch it in a single Session Replay. See [Web View Instrumentation][1] to learn more.

### Prerequisites

Set up the RUM Browser SDK on the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][2].

### Instrument your web views

1. Add `react-native-webview` to your application following the [official installation documentation][3].

2. Import `WebView` from `@datadog/mobile-react-native-webview` instead of `react-native-webview`:

   ```javascript
   import { WebView } from '@datadog/mobile-react-native-webview';
   // or
   import WebView from '@datadog/mobile-react-native-webview';
   ```

3. You can use all existing functionalities from `react-native-webview` as the `WebView` component from `@datadog/mobile-react-native-webview` wraps the `react-native-webview` component.

4. Provide the list of hosts to be tracked by Datadog inside the web view by using the `allowedHosts` prop of your `WebView` component:

   ```javascript
   <WebView
       source={ { uri: 'https://www.example.com' } }
       allowedHosts={['example.com']}
   />
   ```

`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

### Access your web views

Your web views appear in the [RUM Explorer][4] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform.

To access your web views:

1. Navigate to {% ui %}Digital Experiences{% /ui %} > {% ui %}Real User Monitoring{% /ui %} > {% ui %}(Sessions) Explorer{% /ui %}.
2. Create a query to filter on the following:
   - Your React Native applications using either `application.id` or `application.name`
   - The web component using `service`
   - The platform using `source`

   **Note**: If you see unrecognized version numbers reporting in your mobile app, they might belong to the Browser SDK version. In that case, you can filter out the Browser platform session, for example, `source: react-native`.
3. Click a session. A side panel with a list of events in the session appears. Any service with the web icon indicates a web view.

From here, you can hover over a session event and click {% ui %}Open View waterfall{% /ui %} to navigate from the session to a resource waterfall visualization in the view's {% ui %}Performance{% /ui %} tab.

### Billing implications

See [RUM & Session Replay Billing][5] for details on how web views in mobile applications impact session recordings and billing.

[1]: /session_replay/setup_and_configuration/#web-view-instrumentation
[2]: /real_user_monitoring/application_monitoring/browser/setup/#npm
[3]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md
[4]: https://app.datadoghq.com/rum/explorer
[5]: /account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing
