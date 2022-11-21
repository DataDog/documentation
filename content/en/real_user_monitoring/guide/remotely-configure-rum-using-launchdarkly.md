---
title: Remotely configure RUM using LaunchDarkly
kind: guide
beta: false
private: true
description: Learn how to set up RUM with LaunchDarkly to remotely configure RUM sampling.
aliases:
- /real_user_monitoring/guide/remote-config-launchdarkly/
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the RUM Explorer'
---

## Overview
When instrumenting a [RUM application](/real_user_monitoring/browser#setup), you can remotely control the RUM initialization configurations based on your immediate needs, such as an ongoing incident where you might need higher fidelity data.

Instead of having to deploy the changes to your RUM initialization configurations, you can use feature flags. Feature flag management companies like [LaunchDarkly](https://launchdarkly.com/) evaluate feature flags on the server side and thus allow you to make changes to your code without needing to redeploy. 

## Setting up your flag in LaunchDarkly
To begin, you'll need to set up LaunchDarkly. Follow their documentation [here](https://docs.launchdarkly.com/home/getting-started/setting-up) to set up the SDK and get started. More information on the Client Side SDK is available in the LaunchDarkly [documentation](https://docs.launchdarkly.com/sdk/client-side).

LaunchDarkly supports multivariate flags, which allows you to customize the number and types of variations they return. Multivariate flag types include: 

- String flags: Frequently used to pass simple configuration values or even content.
- Number flags: Frequently used to pass simple numeric configuration values.
- JSON flags: Can be used to pass complex configuration objects or even structured content.

This guide covers two ways you can set up your feature flags to modify your RUM configuration remotely:

1. Create a feature flag for each individual parameter you'd like to configure.
2. Create a feature flag for the entire RUM configuration.

**Tip**: Using the first option to create individual flags for each parameter can give you more fine grained control over your RUM configuration. Creating a feature flag for the entire RUM configuration may result in lots of different variants that can be harder to keep track of and cause overhead for your developers to determine what the specific differences between the variants are.

### Option 1: Create a feature flag for a parameter of the RUM Configuration 
In this example, a feature flag for the SampleRate parameter of the RUM Configuration is created.

1. Create a new feature flag in LaunchDarkly and provide a name, and key. 

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-new-flag.png" alt="Create a new flag for the RUM sample rate in LaunchDarkly" style="width:75%;">}}

2. Specify the flag variations. For the Sample Rate, you'll want to pass a number value, so you can choose the flag type to be Number and add the Sample Rates you would like as the value.

**Note:** You can create multiple different flag variations if you'd like. Don't worry about adding all the possible Sample Rates that you might want, you can always go in and add a new variation of values whenever you want.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-flag-setup.png" alt="Add variants for the sample rate in LaunchDarkly" style="width:75%;">}}

3. Set your default rules. In the example below, the "Default Sample Rate" is set when the feature flag is off and the "High Fidelity Sample Rate" when the feature flag is on.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-flag-targeting-rules.png" alt="Set your default rules in LaunchDarkly" style="width:75%;">}}

### Option 2: Create a feature flag for the entire RUM Configuration
In this example, a feature flag for the entire RUM Configuration Object is created.

1. Create a new feature flag in LaunchDarkly and provide a name, and key. 

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-new-flag.png" alt="Create a new flag for the RUM configuration in LaunchDarkly" style="width:75%;">}}

2. Modify the Flag Variations. For the [RUM configuration](/real_user_monitoring/browser#setup), you'll want to pass an Object, so you can choose the flag type to be JSON, add the configurations you'd like as the values, and modify the JSON to an Object in our code later.

**Note:** You can create multiple different flag variations if you'd like. Don't worry about adding all possible configurations that you might want, you can always go in and add a new variation of values whenever you want.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-flag-setup.png" alt="Add variants for the RUM configuration in LaunchDarkly" style="width:75%;">}}

3. Set your default rules. The "Default Configuration" is set when the feature flag is off and the "High Fidelity Configuration" when the feature flag is on.

## Adding your feature flag to your RUM configuration
Once you've got set up with LaunchDarkly as mentioned [above](#setting-up-your-flag-in-launchdarkly), installed the dependencies, and [initialized the LaunchDarkly client](https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
), you can add the feature flag evaluation into our code. You can read more about evaluating flags in LaunchDarkly [here](https://docs.launchdarkly.com/sdk/features/evaluating).


### Option 1: Add a feature flag for a parameter of the RUM Configuration 
Before you initialize the RUM SDK, you need to first evaluate your LaunchDarkly feature flags. For example, in JS you can add an evaluation like the code snippet below.

```javascript
const RUM_sample_rate = client.variation('rum-sample-rate-configuration', false);
```
Then add this to your RUM initialization:

```javascript
datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  service: 'my-web-application',
  env: 'production',
  version: '1.0.0',
  sampleRate: RUM_sample_rate,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackLongTasks: true,
  trackInteractions: true,
})
```

### Option 2: Add a feature flag for the entire RUM Configuration

Before you initialize the RUM SDK, you need to first evaluate your LaunchDarkly feature flags. For example, in JS you can add an evaluation like this:

```javascript
const RUM_configuration = client.variation('rum-configuration', false);
```

However, before you can pass in the configuration to initialize RUM, you'll need to create an Object from the flag JSON value. Once you've done that you can initialize the RUM SDK.

```javascript
datadogRum.init(RUM_configuration_object)
```

## Embed LaunchDarkly's controls to configure RUM directly in your Dashboards
If you want to change your RUM configuration directly in your Datadog application, you can embed the LaunchDarkly UI into Datadog and switch your feature flag on/off. The feature flags are set up so you can keep them off, with the default values. When you want to have higher fidelity data, you can turn on your feature flag and the values you set for the ON variation will now be used for the RUM initialization. 

LaunchDarkly's Datadog App integration embeds the feature flag management UI as a dashboard widget. You can use this widget to toggle feature flags without ever leaving Datadog. You can embed the LaunchDarkly widget within a new or existing dashboard that displays key metrics. If there is an incident or spike in errors, you can quickly toggle the feature flag for your RUM configuration from within Datadog to begin sampling more data and ensuring your teams have access to the information they need to address and resolve your issue. 

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/datadog-launchdarkly-ui-widget.png" alt="Datadog and LaunchDarkly UI Integration Widget" style="width:100%;">}}

If you need to change the values that you originally set for your configuration, you can update your flag within LaunchDarkly at any time. After you save your change, all new flag evaluations will have your updated values. 

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser#setup
[2]: https://launchdarkly.com/
[3]: https://docs.launchdarkly.com/home/getting-started/setting-up
[4]: https://docs.launchdarkly.com/sdk/client-side
[5]: /real_user_monitoring/browser#setup
[6]: https://docs.launchdarkly.com/sdk/features/evaluating

