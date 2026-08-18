---
title: Browser Developer Extension
description: Browse your feature flags and override them locally in your browser with the Datadog Browser SDK developer extension.
further_reading:
- link: "/feature_flags/client/javascript/"
  tag: "Documentation"
  text: "JavaScript Feature Flags"
- link: "/feature_flags/implementation_patterns/local_flag_overrides/"
  tag: "Documentation"
  text: "Local Flag Overrides with the Multi-Provider Pattern"
- link: "/feature_flags/concepts/variants_and_flag_types/"
  tag: "Documentation"
  text: "Variants and Flag Types"
---

## Overview

The [Datadog Browser SDK developer extension][1] for Chrome includes a **Feature Flags** tab. The tab lists your organization's feature flags and lets you override them locally in your browser. Use it to see how your application behaves under different flag values, without changing flag configuration in Datadog.

Overrides apply only to your browser. They are never sent to Datadog and don't affect other users.

{{< img src="feature_flags/devtools_extension/flags-tab-overview.png" alt="The Feature Flags tab showing the Feature Flag Overrides heading, a Connected badge for US1, the filter row, and a list of flags with variant buttons." style="width:100%;" >}}

The extension includes other tabs for inspecting Browser SDK behavior. This page covers the **Feature Flags** tab.

## Prerequisites

Before you begin, you need:

- Google Chrome.
- Access to feature flags in a Datadog organization on the US1 site (`datadoghq.com`). Other [Datadog sites][2] are not supported.
- A browser application instrumented with the [Datadog Feature Flags SDK for JavaScript][3].
- The `DatadogDevtools` wrapper composed into your OpenFeature provider stack. See [Add the DatadogDevtools wrapper](#add-the-datadogdevtools-wrapper).

## Install the extension

Install the [Datadog Browser SDK developer extension][1] from the Chrome Web Store.

## Add the DatadogDevtools wrapper

`DatadogDevtools` is an OpenFeature provider that wraps another provider. It reads the overrides the extension sets, returns them for matching flag keys, and delegates every other evaluation to the provider it wraps. Without it, the tab shows a **DatadogDevtools not detected** notice. You can still set overrides, but they don't apply until the wrapper is in place.

Import `DatadogDevtools` from `@datadog/openfeature-browser`, pass your provider to it, and register the wrapper through the OpenFeature API:

{{< code-block lang="javascript" >}}
import { DatadogProvider, DatadogDevtools } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: 'datadoghq.com',
  env: '<ENV_NAME>',
});

await OpenFeature.setProviderAndWait(new DatadogDevtools(provider));
{{< /code-block >}}

The wrapper accepts any OpenFeature provider, so you can also use it over an `InMemoryProvider` in a local development build. If your application registers providers for multiple domains, wrap each one.

<div class="alert alert-warning">Local overrides bypass your flag configuration in Datadog, and anyone who can write to browser storage can set them. Restrict the wrapper to non-production builds so that end users cannot change flag behavior in your production application.</div>

### Confirm that an override applied

`DatadogDevtools` reads overrides once, when the provider initializes. Evaluate the flag with a details method to see where the value came from: an overridden flag resolves with a `reason` of `STATIC` and `flagMetadata.overridden` set to `true`.

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const details = client.getBooleanDetails('<FLAG_KEY>', false);

console.log(details.value, details.reason, details.flagMetadata.overridden);
{{< /code-block >}}

An override whose value doesn't match its declared type is ignored, and the wrapper logs a warning to the browser console. Integer overrides must be whole numbers.

## Open the Feature Flags tab

1. Open your application in Chrome.
2. Open Chrome DevTools (`Cmd+Opt+I` on Mac, `F12` on Windows or Linux).
3. Select the **Browser SDK** panel. If you don't see it, select the overflow menu (`»`) in the DevTools tab bar.
4. Select the **Feature Flags** tab.
5. Choose your Datadog site, then click **Sign in to Datadog**.

{{< img src="feature_flags/devtools_extension/flags-tab-connect.png" alt="The Feature Flags tab sign-in screen, showing the Datadog site dropdown set to US1 and the Sign in to Datadog button." style="width:100%;" >}}

Your credentials are stored for the browser session and clear when the session ends. To sign out and revoke the session, click **Disconnect**. You can also revoke the extension's access in Datadog under **Organization Settings > Authorized Applications**.

## Browse and filter flags

The tab shows a **Feature Flag Overrides** heading and a badge confirming which Datadog site you are connected to. Above the list is a count of the flags available to you. Each flag shows its name, key, description, and variant buttons.

To narrow the list, use the filter row:

| Filter | Description |
| --- | --- |
| **Filter your feature flags** | Match a flag name, key, or tag. |
| **My Feature Flags** | Show only flags you created. |
| **My Teams** | Show only flags tagged for teams you belong to. |
| **Type** | Show only Boolean, String, Integer, Number, or JSON flags. |
| **Tags** | Show only flags with one or more selected tags. |

## Override a flag

To override a flag from the list, click one of its variant buttons.

To set a value that isn't defined as a variant, expand **Add a custom override**. Enter the flag key, select the value type, and enter the value. Applying a key that already has an override replaces the existing value. A value that doesn't match the flag's type is rejected.

Overridden flags move into a highlighted **Local overrides** section at the top of the list, which shows how many are active. The selected variant is highlighted, and each row has a revert control to remove that single override. To remove every override at once, click **Clear all** at the bottom of the tab.

{{< img src="feature_flags/devtools_extension/flags-tab-local-overrides.png" alt="The Feature Flags tab with two active overrides highlighted in a Local overrides section at the top of the list, above the Clear all and Refresh Page buttons." style="width:100%;" >}}

## Apply overrides to your application

Overrides are saved as soon as you set them, but `DatadogDevtools` reads them once, when your provider initializes. Setting or reverting an override has no effect on the running page. Click **Refresh Page** at the bottom of the tab to reload so that the new values take effect.

## Manage overrides

Overrides persist independently of your Datadog sign-in. Signing out, closing DevTools, and restarting your browser all leave them in place. When a page has overrides and you are signed out, the connect screen shows how many are active.

Revert individual overrides or click **Clear all** when you finish testing, then refresh the page so that your application resolves flags from Datadog again.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chromewebstore.google.com/detail/datadog-browser-sdk-devel/boceobohkgenpcpogecpjlnmnfbdigda
[2]: /getting_started/site/
[3]: /feature_flags/client/javascript/
