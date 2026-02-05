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

### Client-side SDKs

{{< partial name="feature_flags/feature_flags_client.html" >}}

### Server-side SDKs

{{< partial name="feature_flags/feature_flags_server.html" >}}

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

<div class="alert alert-info">LaunchDarkly and Datadog SDKs use strongly typed methods for flag evaluation (for example, <code>getBooleanValue</code>, <code>getStringValue</code>, <code>getIntegerValue</code>). The examples below demonstrate Boolean flag evaluation. You will need to create similar wrapper functions for each flag type used in your application.</div>

{{< tabs >}}
{{% tab "JavaScript (browser)" %}}
{{< code-block lang="javascript" filename="fallback-wrapper.js" >}}
import * as ld from 'launchdarkly-js-client-sdk';
import { OpenFeature } from '@openfeature/web-sdk';
import { DatadogProvider } from '@datadog/openfeature-browser';

class FallbackWrapper {
    private ldClient;
    private ddClient;
    async initialize(userId, evaluationContext = {}) {
        try {
            const ddProvider = new DatadogProvider({
                applicationId: 'YOUR_APP_ID',
                clientToken: 'YOUR_CLIENT_TOKEN',
                env: 'ENV_NAME',
            });

            await OpenFeature.setProviderAndWait(ddProvider, {
                targetingKey: userId,
                ...evaluationContext
            });

            this.ddClient = OpenFeature.getClient();
        } catch (e) {
            console.warn(`Unable to initialize Datadog feature flags client: ${e}. Flag evaluations will fall back to LaunchDarkly.`);
        }

        this.ldClient = ld.initialize('YOUR_LD_KEY', {
            key: userId,
            ...evaluationContext
        });
        await this.ldClient.waitForInitialization();
    }

    async getBooleanFeatureFlag(flagKey, defaultValue) {
        try {
            if (!this.ddClient) {
                throw new Error('Datadog feature flags client not initialized');
            }
            return this.ddClient.getBooleanValue(flagKey, defaultValue);
        } catch (e) {
            console.warn(`Falling back to LaunchDarkly for flag: ${flagKey});
            return this.ldClient.variation(flagKey, defaultValue);
        }
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

export async function getBooleanFeatureFlag(flagKey, userId, attributes, defaultValue) {
    const ddClient = OpenFeature.getClient();
    try {
        const ddContext = {
            targetingKey: userId,
            ...attributes
        };
        return ddClient.getBooleanValue(flagKey, defaultValue, ddContext);
    } catch (e) {
        console.warn(`Falling back to LaunchDarkly for flag: ${flagKey}`);
        const ldContext = { key: userId, ...attributes };
        return ldClient.variation(flagKey, ldContext, defaultValue);
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Python" %}}
{{< code-block lang="python" filename="fallback_wrapper.py" >}}
import ldclient
from ldclient import Context
from openfeature import api
from openfeature.evaluation_context import EvaluationContext

def get_boolean_feature_flag(flag_key, user_id, evaluation_context, default_value):
    ld_client = ldclient.get()
    dd_client = api.get_client()

    try:
        dd_context = EvaluationContext(
            targeting_key=user_id,
            attributes=evaluation_context
        )

        return dd_client.get_boolean_value(flag_key, default_value, dd_context)
    except Exception as e:
        print(f"Falling back to LaunchDarkly for flag: {flag_key}")
        cb = Context.builder(user_id)

        for key, value in evaluation_context.items():
            cb.set(key, value)

        return ld_client.variation(flag_key, cb.build(), default_value)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java" filename="FallbackWrapper.java" >}}
import java.util.Map;
import com.launchdarkly.sdk.ContextBuilder;
import com.launchdarkly.sdk.LDContext;
import com.launchdarkly.sdk.server.LDClient;
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;
import dev.openfeature.sdk.OpenFeatureAPI;

public class FallbackWrapper {
    private final LDClient ldClient;
    private final Client ddClient;

    public FallbackWrapper(String ldKey) {
        this.ldClient = new LDClient(ldKey);
        this.ddClient = OpenFeatureAPI.getInstance().getClient();
    }

    public boolean getBooleanFlag(String flagKey, String userId, Map<String, String> evaluationContext, boolean defaultValue) {
        try {
            EvaluationContext context = new MutableContext(userId);
            for (Map.Entry<String, String> entry : evaluationContext.entrySet()) {
                context.add(entry.getKey(), entry.getValue());
            }

            return ddClient.getBooleanValue(flagKey, defaultValue, context);
        } catch (Exception e) {
            System.out.println("Falling back to LaunchDarkly for flag: " + flagKey);
            ContextBuilder cb = LDContext.builder(userId);

            for (Map.Entry<String, String> entry : evaluationContext.entrySet()) {
                cb.set(entry.getKey(), entry.getValue());
            }

            return ldClient.boolVariation(flagKey, cb.build(), defaultValue);
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
    "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
    "github.com/open-feature/go-sdk/openfeature"
)

type FallbackWrapper struct {
    ldClient *ld.LDClient
    ddClient *openfeature.Client
}

func (fw *FallbackWrapper) GetBooleanFlag(
    ctx context.Context,
    flagKey string,
    userId string,
    evaluationContext map[string]string,
    defaultValue bool,
) bool {
    ofContext := openfeature.NewEvaluationContext(
        userId,
        evaluationContext,
    )

    ddValue, err := fw.ddClient.BooleanValue(ctx, flagKey, defaultValue, ofContext)
    if err != nil {
        log.Printf("Falling back to LaunchDarkly for flag: %s", flagKey)
        cb := ldcontext.NewBuilder(userId)

        for k, v := range evaluationContext {
            cb.SetString(k, v)
        }

        ldValue, _ := fw.ldClient.BoolVariation(flagKey, cb.Build(), defaultValue)
        return ldValue
    }

    return ddValue
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
    private readonly IFeatureClient ddClient;

    public FallbackWrapper()
    {
        var config = Configuration.Builder("YOUR_LD_KEY").Build();
        ldClient = new LdClient(config);
        ddClient = Api.Instance.GetClient("my-service");
    }

    public async Task<bool> GetBooleanFlagAsync(
        string flagKey,
        string userId,
        Dictionary<string, string> evaluationContext,
        bool defaultValue)
    {
        try
        {
            var evalCtx = EvaluationContext.Builder()
                .SetTargetingKey(userId);

            foreach (var attr in evaluationContext)
            {
                evalCtx.Set(attr.Key, attr.Value);
            }

            return await ddClient.GetBooleanValueAsync(
                flagKey, defaultValue, evalCtx.Build());
        }
        catch (Exception e)
        {
            Console.WriteLine($"Falling back to LaunchDarkly for flag: {flagKey}");

            var cb = Context.Builder(userId);

            foreach (var attr in evaluationContext)
            {
                cb.Set(attr.Key, attr.Value);
            }

            return ldClient.BoolVariation(flagKey, cb.Build(), defaultValue);
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
        @dd_client = OpenFeature::SDK.build_client
    end

    def get_boolean_flag(flag_key, user_id, evaluation_context, default_value)
        begin
            context_attrs = { targeting_key: user_id }
            context_attrs.merge!(evaluation_context)
            context = OpenFeature::SDK::EvaluationContext.new(context_attrs)

            @dd_client.fetch_boolean_value(
                flag_key: flag_key,
                default_value: default_value,
                evaluation_context: context
            )
        rescue => e
            puts "Falling back to LaunchDarkly for flag: #{flag_key}"
            ld_context_attrs = { key: user_id }
            ld_context_attrs.merge!(evaluation_context)
            ld_context = LaunchDarkly::LDContext.create(ld_context_attrs)
            @ld_client.variation(flag_key, ld_context, default_value)
        end
    end
end
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}
{{< code-block lang="swift" filename="FallbackWrapper.swift" >}}
import Foundation
import LaunchDarkly
import DatadogFlags
import DatadogCore

class FallbackWrapper {
    private let ldClient: LDClient
    private let ddClient: FlagsClient

    init(userId: String, evaluationContext: [String: AnyValue] = [:]) {
        let ldConfig = LDConfig(mobileKey: 'YOUR_LD_MOBILE_KEY', autoEnvAttributes: .enabled)
        var ldContext = LDContextBuilder(key: userId)
        for (key, value) in evaluationContext {
            ldContext.trySetValue(key, value)
        }
        LDClient.start(config: ldConfig, context: ldContext)

        self.ldClient = LDClient.get()!

        Datadog.initialize(
            with: Datadog.Configuration(
                clientToken: "<client token>",
                env: "<environment>",
                service: "<service name>"
            ),
            trackingConsent: .granted
        )

        Flags.enable()

        self.ddClient = FlagsClient.create()
        self.ddClient.setEvaluationContext(
            FlagsEvaluationContext(
                targetingKey: userId,
                attributes: evaluationContext
            )
        )
    }

    func getBooleanFlag(flagKey: String, defaultValue: Bool) -> Bool {
        do {
            return self.ddClient.resolveBooleanValue(
                flagKey: flagKey,
                defaultValue: defaultValue
            )
        } catch {
            print("Falling back to LaunchDarkly for flag: \(flagKey)")
            return self.ldClient.boolVariation(forKey: flagKey, defaultValue: defaultValue)
        }
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="FallbackWrapper.kt" >}}
import com.launchdarkly.sdk.LDContext
import com.launchdarkly.sdk.android.LDClient
import com.launchdarkly.sdk.android.LDConfig
import com.datadog.android.flags.Flags
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.EvaluationContext

class FallbackWrapper(
    userId: String,
    evaluationContext: Map<String, String>
) {
    private val ldClient: LDClient
    private val ddClient: FlagsClient

    init {
        val ldConfig = LDConfig.Builder()
            .mobileKey('YOUR_LD_MOBILE_KEY')
            .build()

        val cb = LDContext.builder(userId)
        for ((key, value) in evaluationContext) {
            cb.set(key, value)
        }
        val ldContext = cb.build()
        ldClient = LDClient.init(this@BaseApplication, ldConfig, ldContext, 5)

        val ddConfig = Configuration.Builder(
            clientToken = 'YOUR_DD_CLIENT_TOKEN',
            env = 'DD_ENV',
            variant = 'APP_VARIANT_NAME'
        )

        Flags.enable()

        ddClient = FlagsClient.Builder().build()
        ddClient.setEvaluationContext(
            EvaluationContext(
                targetingKey = userId,
                attributes = evaluationContext
            )
        )
    }

    fun getBooleanFlag(
        flagKey: String,
        defaultValue: Boolean
    ): Boolean {
        return try {
            ddClient.resolveBooleanValue(
                flagKey = flagKey,
                defaultValue = defaultValue
            )
        } catch (e: Exception) {
            println("Falling back to LaunchDarkly for flag: $flagKey")
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
2. Ensure that the flag configurations - such as rollout percentages, targeting rules, and variations - are accurately replicated in the new service.
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
