## Instrument your web views

1. Add `react-native-webview` to your application following the [official installation documentation][1].

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

[1]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md
