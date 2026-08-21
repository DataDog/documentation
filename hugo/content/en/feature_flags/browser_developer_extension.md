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
- Access to feature flags in a Datadog organization on a commercial [Datadog site][2]: US1 (`datadoghq.com`), US3 (`us3.datadoghq.com`), US5 (`us5.datadoghq.com`), EU1 (`datadoghq.eu`), AP1 (`ap1.datadoghq.com`), or AP2 (`ap2.datadoghq.com`). Datadog for Government sites are not supported.
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
  site: '<DATADOG_SITE>',
  env: '<ENV_NAME>',
});

await OpenFeature.setProviderAndWait(new DatadogDevtools(provider));
{{< /code-block >}}

Set `site` to the [Datadog site][2] your organization uses. Use the same site you select in the extension's dropdown. If they differ, you browse and pick variants from one organization's flag catalog while your application resolves flags against another.

The wrapper accepts any OpenFeature provider, so you can also use it over an `InMemoryProvider` in a local development build. If your application registers providers for multiple domains, wrap each one.

<div class="alert alert-warning">Local overrides bypass your flag configuration in Datadog, and anyone who can write to browser storage can set them. Restrict the wrapper to non-production builds so that end users cannot change flag behavior in your production application.</div>

### Confirm that an override applied

`DatadogDevtools` reads overrides once, when the provider initializes. Evaluate the flag with a details method to see where the value came from: an overridden flag resolves with a `reason` of `STATIC` and `flagMetadata.overridden` set to `true`.

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const details = client.getBooleanDetails('<FLAG_KEY>', false);

console.log(details.value, details.reason, details.flagMetadata.overridden);
{{< /code-block >}}

An override whose value doesn't match its declared type is ignored when the wrapper reads it at initialization, and the wrapper logs a warning to the browser console. Integer overrides must be whole numbers.

## Open the Feature Flags tab

1. Open your application in Chrome.
2. Open Chrome DevTools (`Cmd+Opt+I` on Mac, `F12` on Windows or Linux).
3. Select the **Browser SDK** panel. If you don't see it, select the overflow menu (`»`) in the DevTools tab bar.
4. Select the **Feature Flags** tab.
5. Select your Datadog site from the dropdown, then click **Sign in to Datadog**. Select the site before you sign in: it determines which Datadog organization the sign-in and the flag list come from.

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

To set a value that isn't defined as a variant, expand **Add a custom override**. Enter the flag key, select the value type, and enter the value. Applying a key that already has an override replaces the existing value. A value that doesn't match the flag's type is rejected in the extension UI before it's saved.

Overridden flags move into a highlighted **Local overrides** section at the top of the list, which shows how many are active. The selected variant is highlighted, and each row has a revert control to remove that single override. To remove overrides in bulk, click **Clear all** at the bottom of the tab. See [Clear all overrides](#clear-all-overrides).

An override row can also carry a warning:

| Warning | Description |
| --- | --- |
| Row highlighted in red | The stored override's type doesn't match the flag's type, so the override doesn't apply. Type-mismatched overrides are ignored when the provider initializes and logged as a browser console warning; the tab surfaces the mismatch before you reload. |
| Dimmed note under the flag key | The flag is no longer in your organization's flag catalog, because it was archived or deleted after the override was set. The override still resolves. The note is informational. |

{{< img src="feature_flags/devtools_extension/flags-tab-local-overrides.png" alt="The Feature Flags tab with two active overrides highlighted in a Local overrides section at the top of the list, above the Clear all and Refresh Page buttons." style="width:100%;" >}}

## Apply overrides to your application

Overrides are saved as soon as you set them, but `DatadogDevtools` reads them once, when your provider initializes. Setting or reverting an override has no effect on the running page. Click **Refresh Page** at the bottom of the tab to reload so that the new values take effect.

## Manage overrides

Overrides persist independently of your Datadog sign-in. Signing out, closing DevTools, and restarting your browser all leave them in place. When a page has overrides and you are signed out, the connect screen shows how many overrides are stored for the page. It also offers **Clear all**, so that you can remove them without signing in.

Revert individual overrides or click **Clear all** when you finish testing, then refresh the page so that your application resolves flags from Datadog again.

### Overrides are scoped to a Datadog site

Overrides are stored separately for each Datadog site. An override you set while connected to one site doesn't apply while you are connected to another.

Selecting a different site in the dropdown changes which overrides apply. The tab shows a **Reload to apply `<SITE>`'s overrides** banner: the page keeps using the overrides it loaded with until you reload it. Selecting the original site again restores that site's overrides. Switching sites doesn't delete any overrides.

### Clear all overrides

**Clear all** removes overrides in bulk and asks you to confirm first. What it removes depends on whether you are signed in:

| State | Scope |
| --- | --- |
| Signed in | Removes the overrides for the connected site only. Other sites' overrides are left in place. |
| Signed out | Removes every site's overrides, because there is no connected site to scope the action to. The confirmation message states this. |

After you clear overrides, the tab prompts you to reload. The page keeps applying the cleared overrides until you do.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chromewebstore.google.com/detail/datadog-browser-sdk-devel/boceobohkgenpcpogecpjlnmnfbdigda
[2]: /getting_started/site/
[3]: /feature_flags/client/javascript/
