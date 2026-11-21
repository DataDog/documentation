## Automatically track user interactions

To track user interactions automatically, set `trackInteractions` to `true` in your RUM configuration, and set up the Datadog React Native Babel Plugin (`@datadog/mobile-react-native-babel-plugin`). The plugin automatically enriches React components with contextual metadata, improving interaction tracking accuracy and enabling a range of configuration options.

### Install the Babel plugin

To install with npm, run:

```shell
npm install @datadog/mobile-react-native-babel-plugin
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native-babel-plugin
```

### Configure Babel

Add the plugin to your Babel configuration file (`babel.config.js`, `.babelrc`, or similar):

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['@datadog/mobile-react-native-babel-plugin']
};
```

For Expo applications, use the Expo preset instead:

```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['@datadog/mobile-react-native-babel-plugin']
};
```

After the plugin is installed and configured, it automatically tracks interactions on standard React Native components. No additional code changes are required for basic usage.

## Manually track actions and send custom events

You can manually track RUM actions:

```javascript
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
```

To track a continuous action:

```javascript
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
//...
DdRum.stopAction({}, Date.now());
```

For the attributes collected for actions, see [Data Collected][1].

[1]: /real_user_monitoring/setup/data_collected/?platform=react_native
