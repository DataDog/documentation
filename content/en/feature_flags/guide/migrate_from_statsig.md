---
title: Migrate Your Feature Flags from Statsig
description: Learn how to migrate feature flags from Statsig to Datadog.
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This guide walks you through the process of migrating feature flags from Statsig to Datadog. Follow these general steps:

1. [Install the SDK.](#install-sdk)
2. [Create a feature flag in Datadog and verify its functionality.](#set-up-flag)
3. [Identify critical feature flags in Statsig.](#identify-critical-flags)
4. [For all non-critical flags, remove existing code.](#remove-non-critical-flags)
5. [For critical flags, create a fallback value in a wrapper.](#create-fallback-values)
6. [Recreate critical feature flags in Datadog.](#recreate-critical-flags)
7. [Switch existing flags to the new application.](#switch-to-new-app)

<div class="alert alert-info"><strong>Note</strong>: Unless otherwise specified, all code examples are in TypeScript.</div>

## 1. Install the Eppo SDK {#install-sdk}

1. Login to Eppo with your work email: <https://eppo.cloud/>.
1. Generate an SDK key by navigating to "SDK Keys" under Configuration.
1. Define a logging function for the Eppo SDK to log assignments so they end up in your data warehouse.

    {{< code-block lang="typescript" >}}
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    analytics.track({
      userId: assignment.subject,
      event: "Eppo Randomization Event",
      type: "track",
      properties: { ...assignment },
    });
  },
};
    {{< /code-block >}}

1. Initialize the SDK in your code using the SDK guides for your language here.

    {{< code-block lang="typescript" >}}
await init({
  apiKey: EPPO_SDK_KEY,
  assignmentLogger,
});
   {{< /code-block >}}


## 2. Set up and verify a new flag {#set-up-flag}

1. Create a new flag in Eppo by navigating to "Feature Flags" under Configuration.
1. Implement the flag in your application code.
1. Test the flag in your local development environment to ensure it works as expected.

    {{< code-block lang="typescript" >}}
const variation = getInstance().getBooleanAssignment(
  'show-new-feature',
  user.id,
  {
    'country': user.country,
    'device': user.device
  },
  false
);
    {{< /code-block >}}

1. Deploy the application to your staging or testing environments and verify the flag's functionality.
1. Once verified, deploy the application to your production environment and test the flag again.

## 3. Identify critical flags in Statsig {#identify-critical-flags}

1. Make a list of all the feature flags currently in use within your application using the provided template.
1. Categorize the flags as critical or non-critical based on their importance and impact on your application's functionality.
1. Flags that are disabled or are rolled out to 100% can be categorized as non-critical.

## 4. Remove non-critical flag code {#remove-non-critical-flags}
1. For the non-critical flags identified in the previous step, remove the flag code from your application and from Statsig. They are no longer relevant.
1. Test your application thoroughly to ensure that the removal of these flags does not introduce any regressions or unintended behavior.

## 5. Create fallback values for critical flags {#create-fallback-values}
1. Implement a function that wraps calling Eppo's SDK to have a fallback mechanism to use the Statsig flag values if the new service is unavailable or experiences issues.
1. When attempting to retrieve a flag value from Eppo, catch any exceptions or errors that may occur due to service unavailability or issues and return the old value.
1. Eppo SDKs only strongly typed assignment functions (e.g `getBooleanAssignment`), whereas Statsig SDKs use specific evaluation functions for different types. For such SDKs, we recommend creating wrappers for each type. Uses  of the Statsig functions can then be replaced with the typed wrappers in your application. Here are examples:

    {{< code-block lang="typescript" >}}
// After initialization, turn off graceful failure so exceptions are rethrown
getInstance().setIsGracefulFailureMode(false);

// Drop-in wrapper replacement for getting a boolean Statsig gate.
// Replace boolean calls to checkGate() with getBoolVariationWrapper() in the code.
export function getBoolVariationWrapper(
  gateKey: string,
  user: StatsigUser,
  attributes?: Record<string, string | number | boolean | null>
) {
  let assignment = false;
      
  try {
    assignment = getInstance().getBooleanAssignment(
      user.userID,
      gateKey,
      attributes,
      false
    );
  } catch (e) {
    logger.warn(
      'Error encountered evaluating boolean assignment from Eppo SDK; falling back to Statsig',
      { gateKey, user, attributes }
    );
        
    // Fallback to Statsig gate check
    assignment = statsig.checkGate(user, gateKey);
  }
  return assignment;
}

// Drop-in wrapper replacement for getting a string Statsig config.
// Replace string calls to getConfig() with getStringVariationWrapper() in the code.
export function getStringVariationWrapper(
  configKey: string,
  parameterName: string,
  user: StatsigUser,
  attributes?: Record<string, string | number | boolean | null>
) {
  let assignment = 'default';
      
  try {
    assignment = getInstance().getStringAssignment(
      user.userID,
      configKey,
      attributes,
      'default'
    );
  } catch (e) {
    logger.warn(
      'Error encountered evaluating string assignment from Eppo SDK; falling back to Statsig',
      { configKey, parameterName, user, attributes }
    );
        
    // Fallback to Statsig config parameter
    const config = statsig.getConfig(user, configKey);
    assignment = config.get(parameterName, 'default');
  }
  return assignment;
}

// Drop-in wrapper replacement for getting a numeric Statsig config parameter.
// Replace numeric calls to getConfig() with getNumericVariationWrapper() in the code.
export function getNumericVariationWrapper(
  configKey: string,
  parameterName: string,
  user: StatsigUser,
  attributes?: Record<string, string | number | boolean | null>
) {
  let assignment = 0;
      
  try {
    assignment = getInstance().getNumericAssignment(
      user.userID,
      configKey,
      attributes,
      0
    );
  } catch (e) {
    logger.warn(
      'Error encountered evaluating numeric assignment from Eppo SDK; falling back to Statsig',
      { configKey, parameterName, user, attributes }
    );
        
    // Fallback to Statsig config parameter
    const config = statsig.getConfig(user, configKey);
    assignment = config.get(parameterName, 0);
  }
  return assignment;
}

// Drop-in wrapper replacement for getting experiment assignments.
// Replace calls to getExperiment() with getExperimentVariationWrapper() in the code.
export function getJSONVariationWrapper(
  experimentKey: string,
  parameterName: string,
  user: StatsigUser,
  attributes?: Record<string, string | number | boolean | null>
) {
  let assignment: any = null;
      
  try {
    // For experiments with multiple parameters, use JSON assignment
    const experimentResult = getInstance().getJSONAssignment(
      user.userID,
      experimentKey,
      attributes,
      {}
    );
    assignment = experimentResult?.[parameterName];
  } catch (e) {
    logger.warn(
      'Error encountered evaluating experiment assignment from Eppo SDK; falling back to Statsig',
      { experimentKey, parameterName, user, attributes }
    );
        
    // Fallback to Statsig experiment
    const experiment = statsig.getExperiment(user, experimentKey);
    assignment = experiment.get(parameterName, null);
  }
  return assignment;
}
    {{< /code-block >}}

## 6. Recreate critical flags in Eppo {#recreate-critical-flags}

<div class="alert alert-info"><strong>Note</strong>: Datadog can help with migrating flags to the Eppo dashboard. Contact <a href="https://docs.datadoghq.com/help/">Support</a> for assistance.</div>
 
1. In the Eppo dashboard, recreate the critical flags from Statsig. This can be done programmatically using [Statsig’s](https://docs.statsig.com/console-api/introduction/) and [Eppo’s](https://docs.geteppo.com/reference/api/) REST APIs.
1. Ensure that the flag configurations, such as rollout percentages, targeting rules, and variations, are accurately replicated in the new service.


## 7. Switch existing flags to the new application {#switch-to-new-app}
1. Once you have verified that the Eppo flags are working correctly, switch your application to use the function that checks Eppo for flags instead of the Statsig ones.
1. Remove the fallback mechanism and the Statsig flag code once you have confirmed that the Eppo flags are working as expected in production.
1. It's recommended to keep the wrapper as a facade to make future changes easier, as they will typically only need to be made to the wrapper.

{{< code-block lang="typescript" filename="FeatureHelper.ts" >}}
export function isFeatureEnabled(
  featureKey: string,
  userId: string,
  attributes?: Record<string, string | number | boolean | null>
) {
  return getInstance().getBooleanAssignment(userId, featureKey, attributes, false);
}

export function getFeatureConfig(
  configKey: string,
  userId: string,
  attributes?: Record<string, string | number | boolean | null>
) {
  return getInstance().getJSONAssignment(userId, configKey, attributes, {});
}
{{< /code-block >}}

{{< code-block lang="typescript" filename="PlaceUsingFlags.ts" >}}
const useBigButtons = isFeatureEnabled(userId, 'use-big-buttons', userAttributes);
const buttonConfig = getFeatureConfig(userId, 'button-configuration', userAttributes);
{{< /code-block >}}

## Appendix: TypeScript implementation comparison

Statsig and Eppo have similar interfaces for feature flag evaluation, making the transition straightforward with some key differences in how they handle different data types.

_Note: Above each code example is a link to its respective documentation source._

### Initialization

{{< tabs >}}
{{% tab "Statsig" %}}
Statsig docs: [Getting Started](https://docs.statsig.com/client/javascript-sdk#getting-started)
{{< code-block lang="typescript" >}}
await statsig.initialize('client-key', user, { environment: { tier: 'production' } });
{{< /code-block >}}
{{% /tab %}}

{{% tab "Eppo" %}}
Eppo docs: [Initialization](https://docs.geteppo.com/sdks/client-sdks/javascript/Initialization/)
{{< code-block lang="typescript" >}}
await init({
 apiKey: EPPO_SDK_KEY,
 assignmentLogger,
});
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Wire up assignment logger

{{< tabs >}}
{{% tab "Statsig" %}}
Statsig docs: [Logging an Event](https://docs.statsig.com/client/javascript-sdk/#event-logging)
{{< code-block lang="typescript" >}}
// Statsig automatically logs assignments, but you can add custom logging by 
// subscribing to client events like gate_evaluation or experiment_evaluation.

statsig.on('gate_evaluation', (event) => {
  // Your custom logging logic here
  console.log(event);
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "Eppo" %}}
Eppo docs: [Assignment logging](https://docs.geteppo.com/sdks/event-logging/assignment-logging/)
{{< code-block lang="typescript" >}}
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    // Send data to analytics provider/warehouse here
    analytics.track({
      userId: assignment.subject,
      event: "Eppo Randomization Event",
      type: "track",
      properties: { ...assignment },
    });
  }
};
getInstance().setLogger(assignmentLogger);   // Can also be set in init()
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Get a Boolean flag (Feature Gate)

For example, checking if a feature is enabled

{{< tabs >}}
{{% tab "Statsig" %}}
Statsig docs: [Checking a Feature Flag/Gate](https://docs.statsig.com/client/javascript-sdk/#feature-gates)
{{< code-block lang="typescript" >}}
const enabled = statsig.checkGate('new_feature_gate');
{{< /code-block >}}

{{% /tab %}}
{{% tab "Eppo" %}}
Eppo docs: [Boolean Assignments](https://docs.geteppo.com/sdks/server-sdks/node/assignments/#boolean-assignments)
{{< code-block lang="typescript" >}}
const enabled = getInstance().getBooleanAssignment(
  user.userID,
  'new_feature_gate',
  userAttributes,
  false
);
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Get configuration values

{{< tabs >}}
{{% tab "Statsig" %}}
Statsig docs: [Reading a Dynamic Config](https://docs.statsig.com/client/javascript-sdk#dynamic-configs)
{{< code-block lang="typescript" >}}
const config = statsig.getConfig('product_config');
{{< /code-block >}}

{{% /tab %}}
{{% tab "Eppo" %}}
Eppo docs: [Assignments](https://docs.geteppo.com/sdks/server-sdks/node/assignments/)
{{< code-block lang="typescript" >}}
// If it's part of a multi-valued configuration (how Statsig organizes values),
// you will have to figure out the type of each parameter, as Eppo uses different 
// calls for each variant type.

// For a JSON configuration with multiple parameters:
const config = getInstance().getJSONAssignment(user.userID, 'product_config', userAttributes, {});
const buttonColor = config?.button_color || 'blue';
const maxItems = config?.max_items || 10;

// For individual string parameters:
const buttonColor = getInstance().getStringAssignment(
  user.userID,
  'button_color_flag',
  userAttributes,
  'blue'
);

// For individual numeric parameters:
const maxItems = getInstance().getNumericAssignment(
  user.userID,
  'max_items_flag',
  userAttributes,
  10
);
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Get experiment values

For example, getting experiment parameter values

{{< tabs >}}
{{% tab "Statsig" %}}
Statsig docs: [Getting a Layer/Experiment](https://docs.statsig.com/client/javascript-sdk/#layers)
{{< code-block lang="typescript" >}}
// Values using getLayer

const layer = statsig.getLayer("user_promo_experiments");

const promoTitle = layer.get("title", "Welcome to Statsig!");
const discount = layer.get("discount", 0.1);

// or, using getExperiment

const titleExperiment = statsig.getExperiment("new_user_promo_title");
const priceExperiment = statsig.getExperiment("new_user_promo_price");

const promoTitle = titleExperiment.value["title"] ?? "Welcome!";
const discount = priceExperiment.value["discount"] ?? 0.1;
{{< /code-block >}}
{{% /tab %}}

{{% tab "Eppo" %}}
Eppo docs: [Assignments](https://docs.geteppo.com/sdks/server-sdks/node/assignments/)
{{< code-block lang="typescript" >}}
// For experiments with multiple parameters, use JSON assignment.
const variation = getInstance().getJSONAssignment(
  user.userID,
  'checkout_flow_test',
  userAttributes,
  {}
);
const checkoutVersion = experiment?.checkout_version || 'control';
const showUpsell = experiment?.show_upsell || false;

// Alternatively, for individual experiment parameters:
const checkoutVersion = getInstance().getStringAssignment(
  user.userID,
  'checkout_version',
  userAttributes,
  'control'
);
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### User context and attributes

{{< tabs >}}
{{% tab "Statsig" %}}
Statsig docs: [Statsig User](https://docs.statsig.com/client/javascript-sdk/#statsig-user)
{{< code-block lang="typescript" >}}
const user = new StatsigUser({
  userID: '12345',
  email: 'user@example.com',
  country: 'US',
  custom: {
    plan: 'premium',
    signup_date: '2023-01-15'
  }
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "Eppo" %}}
Eppo docs: [Subject attributes](https://docs.geteppo.com/sdks/sdk-features/subject-attributes/)
{{< code-block lang="typescript" >}}
const userAttributes = {
  email: 'user@example.com',
  country: 'US',
  plan: 'premium',
  signup_date: '2023-01-15'
};

// Used in assignment calls
const variation = getInstance().getBooleanAssignment(
  '12345', // userID as separate parameter
  'feature_flag',
  userAttributes,
  false
);
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}
