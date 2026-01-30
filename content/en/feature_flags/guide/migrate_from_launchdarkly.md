---
title: Migrate Your Feature Flags from LaunchDarkly
description: Learn how to migrate feature flags from LaunchDarkly to Datadog Feature Flags.
further_reading:
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Feature Flags Overview"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This guide walks you through the process of migrating feature flags from LaunchDarkly to [Datadog Feature Flags][1]. Follow these general steps:

1. [Install the Datadog SDK.](#install-sdk)
2. [Create a feature flag in Datadog and verify its functionality.](#set-up-flag)
3. [Identify critical feature flags in LaunchDarkly.](#identify-critical-flags)
4. [For all non-critical flags, remove existing code.](#remove-non-critical-flags)
5. [For critical flags, create a fallback value in a wrapper.](#create-fallback-values)
6. [Recreate critical feature flags in Datadog.](#recreate-critical-flags)
7. [Switch existing flags to the new application.](#switch-to-new-app)

## Migration process

### 1. Install the Datadog SDK {#install-sdk}

Datadog Feature Flags are built on the [OpenFeature][2] standard, which provides vendor-agnostic feature flag APIs. You need to install both the OpenFeature SDK and the Datadog provider for your platform.

Follow the installation instructions for your platform:

**Client-side SDKs:**
- [JavaScript][3]
- [React][10]
- [Android][11]
- [iOS][12]

**Server-side SDKs:**
- [Node.js][4]
- [Python][5]
- [Java][6]
- [Go][7]
- [.NET][8]
- [Ruby][9]

After installation, ensure you have initialized the Datadog provider with your credentials and set up an evaluation context that includes user attributes for targeting.

### 2. Set up and verify a new flag {#set-up-flag}

1. Create a flag in Datadog by navigating to **Software Delivery** > **Feature Flags**, then clicking **Create Flag**.
2. Implement the flag in your application code.
3. Test the flag in your local development environment to ensure it works as expected.
4. Deploy the application to your staging or testing environments and verify the flag's functionality.
5. Once verified, deploy the application to your production environment and test the flag again.

{{< tabs >}}
{{% tab "JavaScript (browser)" %}}
{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

// Context is set on the provider, not passed to getBooleanValue
const showNewFeature = client.getBooleanValue(
  'show-new-feature',
  false  // default value
);

if (showNewFeature) {
  // Feature is enabled
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "React" %}}
{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function MyComponent() {
  const showNewFeature = useBooleanFlagValue('show-new-feature', false);

  if (showNewFeature) {
    return <NewFeature />;
  }

  return <OldFeature />;
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js (server)" %}}
{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

const evaluationContext = {
  targetingKey: req.session?.userID,
  companyID: req.session?.companyID,
  country: user.country
};

const showNewFeature = client.getBooleanValue(
  'show-new-feature',
  false,
  evaluationContext
);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Python" %}}
{{< code-block lang="python" >}}
from openfeature import api
from openfeature.evaluation_context import EvaluationContext

client = api.get_client()

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "country": "US",
        "tier": "premium"
    }
)

show_new_feature = client.get_boolean_value(
    "show-new-feature",
    False,
    eval_ctx
)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java" >}}
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;
import dev.openfeature.sdk.OpenFeatureAPI;

Client client = OpenFeatureAPI.getInstance().getClient();

EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

boolean showNewFeature = client.getBooleanValue(
    "show-new-feature",
    false,
    context
);
{{< /code-block >}}
{{% /tab %}}

{{% tab "Go" %}}
{{< code-block lang="go" >}}
import (
    "context"
    "github.com/open-feature/go-sdk/openfeature"
)

client := openfeature.NewClient("my-service")

ctx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "country": "US",
        "tier": "premium",
    },
)

showNewFeature, _ := client.BooleanValue(
    context.Background(),
    "show-new-feature",
    false,
    ctx,
)
{{< /code-block >}}
{{% /tab %}}

{{% tab ".NET" %}}
{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Model;

var client = Api.Instance.GetClient("my-service");

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")
    .Set("country", "US")
    .Set("tier", "premium")
    .Build();

var showNewFeature = await client.GetBooleanValueAsync(
    "show-new-feature",
    false,
    evalCtx
);

if (showNewFeature)
{
    // Feature is enabled
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Ruby" %}}
{{< code-block lang="ruby" >}}
require 'openfeature/sdk'

client = OpenFeature::SDK.build_client

context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',
  country: 'US',
  tier: 'premium'
)

show_new_feature = client.fetch_boolean_value(
  flag_key: 'show-new-feature',
  default_value: false,
  evaluation_context: context
)

if show_new_feature
  # Feature is enabled
end
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}
{{< code-block lang="swift" >}}
import DatadogFlags

let flagsClient = FlagsClient.shared()

// Set evaluation context
flagsClient.setEvaluationContext(
    FlagsEvaluationContext(
        targetingKey: "user-123",
        attributes: [
            "country": .string("US"),
            "tier": .string("premium")
        ]
    )
)

// Evaluate flag
let showNewFeature = flagsClient.resolveBooleanValue(
    flagKey: "show-new-feature",
    defaultValue: false
)

if showNewFeature {
    // Feature is enabled
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Android" %}}
{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.EvaluationContext

val flagsClient = FlagsClient.getDefault()

// Set evaluation context
flagsClient.setEvaluationContext(
    EvaluationContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "country" to "US",
            "tier" to "premium"
        )
    )
)

// Evaluate flag
val showNewFeature = flagsClient.resolveBooleanValue(
    flagKey = "show-new-feature",
    defaultValue = false
)

if (showNewFeature) {
    // Feature is enabled
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 3. Identify critical flags in LaunchDarkly {#identify-critical-flags}

1. Make a list of all the feature flags currently in use within your application.
2. Categorize the flags as critical or non-critical based on their importance and impact on your application's functionality.
3. Flags that are disabled or are rolled out to 100% can be categorized as non-critical.

### 4. Remove non-critical flag code {#remove-non-critical-flags}

1. For the non-critical flags identified in the previous step, remove the flag code from your application and from LaunchDarkly. They are no longer relevant.
2. Test your application thoroughly to ensure that the removal of these flags does not introduce any regressions or unintended behavior.

### 5. Create fallback values for critical flags {#create-fallback-values}

Implement a wrapper function that provides a fallback mechanism to use the LaunchDarkly flag values if the application experiences issues fetching the Datadog flag.

{{< tabs >}}
{{% tab "JavaScript (browser)" %}}
{{< code-block lang="javascript" filename="fallback-wrapper.js" >}}
import * as ld from 'launchdarkly-js-client-sdk';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize both clients
const ldClient = ld.initialize('YOUR_LD_KEY', ldContext);
const ddClient = OpenFeature.getClient();

// Wrapper with fallback
export async function getFeatureFlag(flagKey, defaultValue, type = 'boolean') {
  try {
    switch (type) {
      case 'boolean':
        return ddClient.getBooleanValue(flagKey, defaultValue);
      case 'string':
        return ddClient.getStringValue(flagKey, defaultValue);
      case 'number':
        return ddClient.getNumberValue(flagKey, defaultValue);
      case 'object':
        return ddClient.getObjectValue(flagKey, defaultValue);
    }
  } catch (e) {
    console.warn(`Falling back to LaunchDarkly for flag: ${flagKey}`);
    await ldClient.waitForInitialization();
    return ldClient.variation(flagKey, defaultValue);
  }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "React" %}}
{{< code-block lang="jsx" filename="FallbackWrapper.jsx" >}}
import * as React from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useFlag } from '@openfeature/react-sdk';

export function useFeatureFlagWithFallback(flagKey, defaultValue) {
  const ldClient = useLDClient();

  const { value: ddFlagValue, errorMessage: ddError } = useFlag(flagKey, defaultValue);

  return React.useMemo(() => {
    if (ddError) {
      console.warn(`Falling back to LaunchDarkly for flag: ${flagKey}`);
      return ldClient.variation(flagKey, defaultValue);
    }

    return ddFlagValue;
  }, [ddFlagValue, ddError, ldClient]);
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js (server)" %}}
{{< code-block lang="javascript" filename="fallback-wrapper.js" >}}
import * as LaunchDarkly from '@launchdarkly/node-server-sdk';
import { OpenFeature } from '@openfeature/server-sdk';

const ldClient = LaunchDarkly.initialize('YOUR_LD_SDK_KEY');

export async function getFeatureFlag(flagKey, user, defaultValue, type = 'boolean') {
  const ddClient = OpenFeature.getClient();
  try {
    const context = {
      targetingKey: user.key,
      ...user.custom
    };

    switch (type) {
      case 'boolean':
        return ofClient.getBooleanValue(flagKey, defaultValue, context);
      case 'string':
        return ofClient.getStringValue(flagKey, defaultValue, context);
      case 'number':
        return ofClient.getNumberValue(flagKey, defaultValue, context);
      case 'object':
        return ofClient.getObjectValue(flagKey, defaultValue, context);
      default:
        throw new Error(`Unsupported flag type: ${type}`);
    }
  } catch (e) {
    console.warn(`Falling back to LaunchDarkly for flag: ${flagKey}`);
    return ldClient.variation(flagKey, user, defaultValue);
  }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Python" %}}
{{< code-block lang="python" filename="fallback_wrapper.py" >}}
import ldclient
from openfeature import api
from openfeature.evaluation_context import EvaluationContext

# Initialize both clients
ldclient.set_config(ldclient.Config("YOUR_LD_SDK_KEY"))
ld_client = ldclient.get()
of_client = api.get_client()

def get_feature_flag(flag_key, user, default_value, flag_type='boolean'):
    try:
        # Map LaunchDarkly user to OpenFeature context
        context = EvaluationContext(
            targeting_key=user.get('key'),
            attributes=user.get('custom', {})
        )

        if flag_type == 'boolean':
            return of_client.get_boolean_value(flag_key, default_value, context)
        elif flag_type == 'string':
            return of_client.get_string_value(flag_key, default_value, context)
        elif flag_type == 'number':
            return of_client.get_number_value(flag_key, default_value, context)
        elif flag_type == 'object':
            return of_client.get_object_value(flag_key, default_value, context)
    except Exception as e:
        print(f"Falling back to LaunchDarkly for flag: {flag_key}")
        return ld_client.variation(flag_key, user, default_value)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java" filename="FallbackWrapper.java" >}}
import com.launchdarkly.sdk.LDUser;
import com.launchdarkly.sdk.LDValue;
import com.launchdarkly.sdk.server.LDClient;
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;
import dev.openfeature.sdk.OpenFeatureAPI;

public class FallbackWrapper {
    private final LDClient ldClient;
    private final Client ofClient;

    public FallbackWrapper(String ldKey) {
        this.ldClient = new LDClient(ldKey);
        this.ofClient = OpenFeatureAPI.getInstance().getClient();
    }

    public boolean getBooleanFlag(String flagKey, LDUser user, boolean defaultValue) {
        try {
            EvaluationContext context = new MutableContext(user.getKey());
            user.getCustom().forEach((k, v) -> context.add(k, v.stringValue()));

            return ofClient.getBooleanValue(flagKey, defaultValue, context);
        } catch (Exception e) {
            System.out.println("Falling back to LaunchDarkly for flag: " + flagKey);
            return ldClient.boolVariation(flagKey, user, defaultValue);
        }
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Go" %}}
{{< code-block lang="go" filename="fallback_wrapper.go" >}}
package main

import (
    "context"
    "log"

    ld "github.com/launchdarkly/go-server-sdk/v6"
    "github.com/open-feature/go-sdk/openfeature"
)

type FallbackWrapper struct {
    ldClient *ld.LDClient
    ofClient *openfeature.Client
}

func (fw *FallbackWrapper) GetBooleanFlag(
    flagKey string,
    user ld.User,
    defaultValue bool,
) bool {
    ctx := context.Background()

    // Try Datadog first
    ofContext := openfeature.NewEvaluationContext(
        user.GetKey(),
        user.GetCustom(),
    )

    value, err := fw.ofClient.BooleanValue(ctx, flagKey, defaultValue, ofContext)
    if err != nil {
        log.Printf("Falling back to LaunchDarkly for flag: %s", flagKey)
        result, _ := fw.ldClient.BoolVariation(flagKey, user, defaultValue)
        return result
    }

    return value
}
{{< /code-block >}}
{{% /tab %}}

{{% tab ".NET" %}}
{{< code-block lang="csharp" filename="FallbackWrapper.cs" >}}
using OpenFeature;
using OpenFeature.Model;
using LaunchDarkly.Sdk;
using LaunchDarkly.Sdk.Server;

public class FallbackWrapper
{
    private readonly LdClient ldClient;
    private readonly IFeatureClient ofClient;

    public FallbackWrapper(string ldKey)
    {
        var config = Configuration.Builder(ldKey).Build();
        ldClient = new LdClient(config);
        ofClient = Api.Instance.GetClient("my-service");
    }

    public async Task<bool> GetBooleanFlagAsync(
        string flagKey,
        string userId,
        bool defaultValue,
        Dictionary<string, object> attributes)
    {
        try
        {
            var evalCtx = EvaluationContext.Builder()
                .SetTargetingKey(userId);

            foreach (var attr in attributes)
            {
                evalCtx.Set(attr.Key, attr.Value);
            }

            return await ofClient.GetBooleanValueAsync(
                flagKey, defaultValue, evalCtx.Build());
        }
        catch (Exception e)
        {
            Console.WriteLine($"Falling back to LaunchDarkly for flag: {flagKey}");
            var user = User.Builder(userId)
                .Custom(attributes)
                .Build();
            return await ldClient.BoolVariationAsync(flagKey, user, defaultValue);
        }
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Ruby" %}}
{{< code-block lang="ruby" filename="fallback_wrapper.rb" >}}
require 'ldclient-rb'
require 'openfeature/sdk'

class FallbackWrapper
  def initialize(ld_key)
    @ld_client = LaunchDarkly::LDClient.new(ld_key)
    @of_client = OpenFeature::SDK.build_client
  end

  def get_boolean_flag(flag_key, user, default_value)
    begin
      # Try Datadog first
      context_attrs = { targeting_key: user[:key] }
      context_attrs.merge!(user[:custom]) if user[:custom]
      context = OpenFeature::SDK::EvaluationContext.new(context_attrs)

      @of_client.fetch_boolean_value(
        flag_key: flag_key,
        default_value: default_value,
        evaluation_context: context
      )
    rescue => e
      puts "Falling back to LaunchDarkly for flag: #{flag_key}"
      @ld_client.variation(flag_key, user, default_value)
    end
  end

  def get_string_flag(flag_key, user, default_value)
    begin
      context_attrs = { targeting_key: user[:key] }
      context_attrs.merge!(user[:custom]) if user[:custom]
      context = OpenFeature::SDK::EvaluationContext.new(context_attrs)

      @of_client.fetch_string_value(
        flag_key: flag_key,
        default_value: default_value,
        evaluation_context: context
      )
    rescue => e
      puts "Falling back to LaunchDarkly for flag: #{flag_key}"
      @ld_client.variation(flag_key, user, default_value)
    end
  end
end
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}
{{< code-block lang="swift" filename="FallbackWrapper.swift" >}}
import LaunchDarkly
import DatadogFlags

class FallbackWrapper {
    private let ldClient: LDClient
    private let flagsClient: FlagsClient

    init(ldMobileKey: String) {
        // Initialize LaunchDarkly
        let ldConfig = LDConfig(mobileKey: ldMobileKey, autoEnvAttributes: .enabled)
        LDClient.start(config: ldConfig, user: nil)
        self.ldClient = LDClient.get()!

        // Get Datadog Flags client
        self.flagsClient = FlagsClient.shared()
    }

    func getBooleanFlag(
        flagKey: String,
        user: LDUser,
        defaultValue: Bool
    ) -> Bool {
        do {
            // Try Datadog first
            flagsClient.setEvaluationContext(
                FlagsEvaluationContext(
                    targetingKey: user.key ?? "anonymous",
                    attributes: user.custom?.mapValues {
                        .string(String(describing: $0))
                    } ?? [:]
                )
            )

            return flagsClient.resolveBooleanValue(
                flagKey: flagKey,
                defaultValue: defaultValue
            )
        } catch {
            print("Falling back to LaunchDarkly for flag: \(flagKey)")
            ldClient.identify(user: user)
            return ldClient.boolVariation(forKey: flagKey, defaultValue: defaultValue)
        }
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="FallbackWrapper.kt" >}}
import com.launchdarkly.sdk.LDUser
import com.launchdarkly.sdk.android.LDClient
import com.launchdarkly.sdk.android.LDConfig
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.EvaluationContext

class FallbackWrapper(private val ldMobileKey: String) {
    private lateinit var ldClient: LDClient
    private val flagsClient = FlagsClient.getDefault()

    init {
        // Initialize LaunchDarkly
        val ldConfig = LDConfig.Builder()
            .mobileKey(ldMobileKey)
            .build()

        val user = LDUser.Builder("anonymous").build()
        ldClient = LDClient.init(application, ldConfig, user, 5)
    }

    fun getBooleanFlag(
        flagKey: String,
        user: LDUser,
        defaultValue: Boolean
    ): Boolean {
        return try {
            // Try Datadog first
            flagsClient.setEvaluationContext(
                EvaluationContext(
                    targetingKey = user.key,
                    attributes = user.custom.orEmpty()
                )
            )

            flagsClient.resolveBooleanValue(
                flagKey = flagKey,
                defaultValue = defaultValue
            )
        } catch (e: Exception) {
            println("Falling back to LaunchDarkly for flag: $flagKey")
            ldClient.identify(user).get()
            ldClient.boolVariation(flagKey, defaultValue)
        }
    }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 6. Recreate critical flags in Datadog {#recreate-critical-flags}

<div class="alert alert-info">Datadog can help with migrating flags. Contact <a href="https://docs.datadoghq.com/help/">Support</a> for assistance.</div>

1. In the Datadog UI, recreate the critical flags from LaunchDarkly by navigating to **Software Delivery** > **Feature Flags**.
2. Ensure that the flag configurations—such as rollout percentages, targeting rules, and variations—are accurately replicated in the new service.
3. For complex targeting rules, use the evaluation context attributes to implement equivalent logic.

### 7. Switch existing flags to the new application {#switch-to-new-app}

1. After you have verified that the Datadog flags are working correctly, switch your application to use the function that checks Datadog for flags instead of the LaunchDarkly ones.
2. Remove the fallback mechanism and the LaunchDarkly flag code after you have confirmed that the Datadog flags are working as expected in production.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/
[2]: https://openfeature.dev/
[3]: /feature_flags/client/javascript/
[4]: /feature_flags/server/nodejs/
[5]: /feature_flags/server/python/
[6]: /feature_flags/server/java/
[7]: /feature_flags/server/go/
[8]: /feature_flags/server/dotnet/
[9]: /feature_flags/server/ruby/
[10]: /feature_flags/client/react/
[11]: /feature_flags/client/android/
[12]: /feature_flags/client/ios/
