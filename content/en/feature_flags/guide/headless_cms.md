---
title: Integrate Feature Flags with a Headless CMS
description: Learn how to integrate Datadog Feature Flags with a headless CMS (such as Contentful, Builder.io, or Strapi) to control content delivery.
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
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/real_user_monitoring/browser/tracking_user_actions/"
  tag: "Documentation"
  text: "RUM Custom Actions"
- link: "/product_analytics/experimentation/"
  tag: "Documentation"
  text: "Experimentation"
---

## Overview

This guide explains how to use Datadog Feature Flags to run Experiments with a headless CMS such as Contentful, Builder.io, or Strapi. Instead of hardcoding content into your flag variants, you author all content variations directly in your CMS. Use a string or JSON flag to map each variant to a content or model ID, which your frontend resolves at render time. This keeps content management in editors' hands while giving engineers full observability through Datadog.

**The core pattern:**

1. Content authors create multiple content entries (variants) in the CMS.
2. Engineers create a Datadog feature flag whose variants are strings (such as a Contentful Entry ID) or JSON objects (for example, `{ "entryId": "abc123", "label": "spring-promotion" }`).
3. On page load, the flag is evaluated for the current user and the returned value is used to fetch the matching CMS content.
4. User interactions are tracked as RUM custom actions and surfaced in Datadog Product Analytics Experiments.

## Prerequisites

* A Datadog account with Feature Flags and Product Analytics enabled
* The Datadog RUM Browser SDK installed in your frontend application
* A headless CMS account such as: Contentful, Builder.io, or Strapi
* Node.js / React (examples below use the React SDK; vanilla JavaScript and other frameworks are also supported)

## Step 1: Author content variants in your CMS

Before creating a flag, set up your content variants in your CMS. Each variant should be a *separate content entry*—do not try to pack multiple variants into a single entry. Datadog flags also allow for multiple variations on a flag, enabling A/B/n and multivariate tests. The following section provides vendor-specific examples for Contentful, [Builder.io][1], and Strapi; these patterns can be extended to any headless or API-based CMS.

{{< tabs >}}
{{% tab "Contentful" %}}

Create two or more entries of the same content type (for example, `HeroBanner`). Note the Entry ID for each, which is visible in the entry URL or the Contentful web app sidebar.

{{< code-block lang="text" >}}
Entry A (Control):  Entry ID = "1a2b3c4d5e6f"  → "Shop the Spring Collection"
Entry B (Variant):  Entry ID = "7g8h9i0j1k2l"  → "Up to 40% Off — Limited Time"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Builder.io" %}}

Create two pages or sections in Builder.io targeting the same URL path or component slot. Note the model ID or page ID for each entry, accessible from the Builder.io Content tab or API explorer.

{{< code-block lang="text" >}}
Entry A (Control):  Page ID = "builder-page-control-001"
Entry B (Variant):  Page ID = "builder-page-variant-001"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Strapi" %}}

Create two entries of the same collection type (for example, `homepage-hero`). Note the document ID (integer or UID) from the Strapi admin panel.

{{< code-block lang="text" >}}
Entry A (Control):  Document ID = 42
Entry B (Variant):  Document ID = 43
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Step 2: Install the Datadog Feature Flags SDK

The following examples use the React SDK for illustration purposes. For other frameworks and languages, see [Client-Side Feature Flags][2].

Install the required packages:

{{< code-block lang="shell" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/react-sdk
{{< /code-block >}}

Initialize the Datadog provider early in your application's life cycle (for example, in `index.tsx` or `_app.tsx`):

{{< code-block lang="typescript" filename="providers/datadogFeatureFlags.ts" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<YOUR_APPLICATION_ID>',
  clientToken: '<YOUR_CLIENT_TOKEN>',
  site: 'datadoghq.com',        // or datadoghq.eu, us3.datadoghq.com, etc.
  env: '<YOUR_ENVIRONMENT>',    // For example: 'production', 'staging'
});

const evaluationContext = {
  targetingKey: 'user-123', // Used for randomization when bucketing
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

// Set evaluation context with user attributes used for targeting rules
OpenFeature.setProvider(provider, evaluationContext);
{{< /code-block >}}

Wrap your application with the `OpenFeatureProvider`:

{{< code-block lang="typescript" filename="App.tsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

export default function App() {
  return (
    <OpenFeatureProvider>
      <YourAppRoutes />
    </OpenFeatureProvider>
  );
}
{{< /code-block >}}

## Step 3: Create the feature flag in Datadog

1. Navigate to **Feature Flags** in the Datadog UI and click **\+ Create Feature Flag**.
2. Configure the flag:
   * **Name**: for example, `cms_homepage_hero_variant`
   * **Key**: `cms_homepage_hero_variant`
   * **Variant type**: `string` (for simple entry ID mapping) or `JSON` (for multi-attribute mapping)
   * **Distribution channels**: `Client-side`
   <div class="alert alert-info">The flag key cannot be changed after creation.</div>
3. Add variants:

**String flag example:**

| Variant Key | Variant Value |
| :---- | :---- |
| `control` | `"1a2b3c4d5e6f"` |
| `treatment` | `"7g8h9i0j1k2l"` |

**JSON flag example (recommended for richer metadata):**

| Variant Key | Variant Value |
| ----- | ----- |
| `control` | `{ "entryId": "1a2b3c4d5e6f", "label": "spring-hero-control" }` |
| `treatment` | `{ "entryId": "7g8h9i0j1k2l", "label": "spring-hero-discount" }` |

4. Set up targeting rules (for example, roll out to 50% of users, or target by `tier: premium`).
5. Save and activate the flag in your target environment.

## Step 4: Evaluate the flag and fetch CMS content

### Using a string flag (simple entry ID)

{{< code-block lang="typescript" filename="components/HeroBanner.tsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';
import { useEffect, useState } from 'react';
import { datadogRum } from '@datadog/browser-rum';

const DEFAULT_ENTRY_ID = '1a2b3c4d5e6f'; // Fallback / control entry ID

export function HeroBanner() {
  const flagDetails = useStringFlagDetails('cms_homepage_hero_variant', DEFAULT_ENTRY_ID);
  const entryId = flagDetails.value;
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!entryId) return;

    // Fetch the content entry from Contentful using the resolved entry ID
    fetchContentfulEntry(entryId).then((data) => {
      setContent(data);
    });
  }, [entryId]);

  if (!content) return <div>Loading...</div>;

  return (
    <section className="hero-banner">
      <h1>{content.headline}</h1>
      <p>{content.subheadline}</p>
      <a href={content.ctaUrl} onClick={() => trackCtaClick(entryId, flagDetails.variant)}>
        {content.ctaText}
      </a>
    </section>
  );
}

// RUM custom action: track CTA clicks, variation context is automatically enriched in RUM events
function trackCtaClick(entryId: string, variant: string | undefined) {
  datadogRum.addAction('hero_cta_click', {
    cms_entry_id: entryId,
    component: 'HeroBanner',
  });
}
{{< /code-block >}}

### Using a JSON flag (richer metadata)

{{< code-block lang="typescript" filename="components/HeroBanner.tsx" >}}
import { useObjectFlagDetails } from '@openfeature/react-sdk';
import { datadogRum } from '@datadog/browser-rum';

interface CmsVariant {
  entryId: string;
  label: string;
}

const DEFAULT_VARIANT: CmsVariant = {
  entryId: '1a2b3c4d5e6f',
  label: 'spring-hero-control',
};

export function HeroBanner() {
  const flagDetails = useObjectFlagDetails<CmsVariant>(
    'cms_homepage_hero_variant',
    DEFAULT_VARIANT
  );
  const { entryId, label } = flagDetails.value;
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchCmsContent(entryId).then(setContent);
  }, [entryId]);

  if (!content) return <div>Loading...</div>;

  return (
    <section className="hero-banner" data-variant={label}>
      <h1>{content.headline}</h1>
      <a
        href={content.ctaUrl}
        onClick={() => trackCtaClick(label, flagDetails.variant)}
      >
        {content.ctaText}
      </a>
    </section>
  );
}
{{< /code-block >}}

## Step 5: Track conversion events with Datadog RUM

To measure experiment results in Product Analytics, trigger RUM custom actions at key moments in the user journey. These become the metrics used in your experiment.

{{< code-block lang="typescript" filename="lib/tracking.ts" >}}
import { datadogRum } from '@datadog/browser-rum';

// Called on component mount / content impression
export function trackContentImpression(entryId: string, variantLabel: string) {
  datadogRum.addAction('cms_content_impression', {
    cms_entry_id: entryId,
    variant_label: variantLabel,
  });
}

// Called when the user clicks the primary CTA
export function trackCtaClick(entryId: string, variantLabel: string) {
  datadogRum.addAction('cms_cta_click', {
    cms_entry_id: entryId,
    variant_label: variantLabel,
  });
}

// Called on a successful conversion event (for example, form submit, checkout, signup)
export function trackConversion(entryId: string, variantLabel: string, conversionType: string) {
  datadogRum.addAction('form_conversion', {
    cms_entry_id: entryId,
    variant_label: variantLabel,
    conversion_type: conversionType,  // For example: 'newsletter_signup', 'add_to_cart'
  });
}
{{< /code-block >}}

## Step 6: Create experiment metrics in Product Analytics

After your RUM actions are flowing, define the metrics your experiment measures.

1. In Datadog, navigate to **Digital Experience \> Product Analytics \> Metrics**.
2. Click **\+ Create Metric**.
3. Select the relevant RUM action as the event (for example, `cms_cta_click`).
4. Choose an aggregation method:
   * **Unique subjects**: Users who clicked at least once; best for conversion rate
   * **Total events**: Total clicks; best for engagement volume
5. Optionally add filters (for example, `@context.component: HeroBanner`).
6. Name the metric (for example, `hero_cta_click_rate`).
7. Repeat for each metric in your experiment (for example, `hero_conversion_rate`, `page_engagement_time`).

<div class="alert alert-tip">Metrics are normalized by the number of enrolled subjects automatically. You can also set an outlier truncation threshold (for example, 99th percentile) and configure whether an increase or decrease is the desired outcome.</div>

## Step 7: Launch the experiment

1. Navigate to **Digital Experience \> Product Analytics \> Experiments**.
2. Click **\+ Create Experiment**.
3. Enter a name and hypothesis, for example:

    *"Showing a discount-led hero banner (Treatment) increases CTA click-through rate compared to the seasonal collection banner (Control)."*

4. Click **Set up experiment on feature flag** and select `cms_homepage_hero_variant`.
5. Choose rollout strategy: all traffic or a gradual percentage rollout.
6. Assign your primary metric (`hero_cta_click_rate`) and optional guardrail metrics (for example, `page_load_error_rate`).
7. Launch the experiment.

## Step 8: Monitor and read results

Use the following tools in Datadog to monitor and analyze your experiment results:

- **Real-time flag health**: From the **Feature Flag details page**, monitor:
  * Exposure counts per variant
  * Error rates per variant
  * Page load time per variant

- **Experiment results**: Navigate to **Experiments \> \[your experiment\]** to see:
  * Statistical significance of results
  * Per-variant metric breakdowns
  * Guardrail metric status

- **RUM Explorer analysis**: Use the RUM Explorer to filter by flag variant:<br /><br />

  {{< code-block lang="text" >}}@feature_flags.cms_homepage_hero_variant:treatment{{< /code-block >}}

  Group by `@feature_flags.cms_homepage_hero_variant` to compare conversion rates, session duration, or error counts across control and treatment.

## Summary

| Step | What You Do | Where |
| :---- | :---- | :---- |
| 1 | Author content variants | Contentful / Builder.io / Strapi |
| 2 | Install Datadog Feature Flags SDK | Your frontend codebase |
| 3 | Create string or JSON flag with CMS entry IDs as variant values | Datadog Feature Flags |
| 4 | Evaluate flag and fetch CMS content by resolved ID | Your frontend codebase |
| 5 | Trigger RUM custom actions on impressions and conversions | Your frontend codebase |
| 6 | Define experiment metrics from RUM actions | Datadog Product Analytics |
| 7 | Launch experiment linked to your feature flag | Datadog Experiments |
| 8 | Monitor results and roll out winning variant | Datadog Feature Flags \+ Experiments |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.builder.io
[2]: /feature_flags/client/
