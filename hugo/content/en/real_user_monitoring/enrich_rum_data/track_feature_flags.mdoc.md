---
title: Track Feature Flags
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
description: "Track feature flag usage and performance impact in RUM to maintain release safety and optimize user experience with controlled rollouts."
beta: true
aliases:
- /real_user_monitoring/feature_flag_tracking/
- /real_user_monitoring/guide/getting-started-feature-flags/
- /real_user_monitoring/guide/setup-feature-flag-data-collection/
- /real_user_monitoring/feature_flag_tracking/setup/
- /real_user_monitoring/feature_flag_tracking/using_feature_flags/
further_reading:
- link: "/real_user_monitoring/investigate_problems/explore_retained_data/"
  tag: "Documentation"
  text: "Learn about the RUM Explorer"
- link: "https://www.datadoghq.com/blog/feature-flag-tracking/"
  tag: "Blog"
  text: "Ensure release safety with feature flag tracking in Datadog RUM"
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Create and manage feature flags in Datadog"
---

## Overview

{% alert level="info" %}
This page explains how to enrich RUM data to track feature flag usage and status. If you want to create feature flags directly in Datadog, see the [Datadog Feature Flags documentation](/feature_flags/).
{% /alert %}

Feature flag data provides greater visibility into user experience and performance monitoring. It allows you to determine which users are being shown a specific feature and assess if any changes introduced are impacting user experience or negatively affecting performance. You can use this information to determine whether or not to roll back the feature.

By enriching your RUM data with feature flag data, you can:

- Be confident that your feature successfully launches without unintentionally causing a bug or performance regression
- Correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster
- Simplify data collection and analysis and focus on troubleshooting

Feature flag tracking is available in the RUM Browser, iOS, Android, Flutter, and React Native SDK. You can create and track feature flags directly in Datadog, or track feature flags from one of Datadog's integration partners or your own [custom feature flag management solution](#custom-feature-flag-management).

Select your SDK for platform-specific instructions.

## Set up RUM monitoring

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/track_feature_flags/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/track_feature_flags/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/track_feature_flags/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/track_feature_flags/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/track_feature_flags/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_feature_flags/unavailable.mdoc.md" /%}
{% /if %}

<!-- C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/track_feature_flags/unavailable.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/track_feature_flags/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/track_feature_flags/unavailable.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
{% partial file="sdk/track_feature_flags/unavailable.mdoc.md" /%}
{% /if %}

## Set up a feature flag integration

You can start collecting feature flag data with [custom feature flag management solutions](#custom-feature-flag-management), or by using one of Datadog's integration partners listed below.

{% alert level="danger" %}
**Note**: The following special characters are not supported for Feature Flag Tracking: `.`, `:`, `+`, `-`, `=`, `&&`, `||`, `>`, `<`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `“`, `”`, `~`, `*`, `?`, `\`, and spaces. Datadog recommends avoiding these characters when possible in your feature flag names. If you are required to use one of these characters, replace the character before sending the data to Datadog. For example:

  ```javascript
  datadogRum.addFeatureFlagEvaluation(key.replaceAll(':', '_'), value);
  ```
{% /alert %}

{% card-grid card_width="200" %}
  {% image-card href="/feature_flags" src="integrations_logos/datadog_large.svg" alt="Datadog" /%}
  {% image-card href="#amplitude-integration" src="integrations_logos/amplitude_large.svg" alt="amplitude" /%}
  {% image-card href="#configcat-integration" src="integrations_logos/configcat_large.svg" alt="custom" /%}
  {% image-card href="#custom-feature-flag-management" src="integrations_logos/docs_custom_feature_flag_systems_card.png" alt="custom" /%}
  {% image-card href="#devcycle-integration" src="integrations_logos/devcycle_large.svg" alt="devcycle" /%}
  {% image-card href="#eppo-integration" src="integrations_logos/eppo_large.svg" alt="eppo" /%}
  {% image-card href="#flagsmith-integration" src="integrations_logos/flagsmith_large.svg" alt="flagsmith" /%}
  {% image-card href="#growthbook-integration" src="integrations_logos/growthbook_large.svg" alt="growthbook" /%}
  {% image-card href="#kameleoon-integration" src="integrations_logos/kameleoon.png" alt="kameleoon" /%}
  {% image-card href="#launchdarkly-integration" src="integrations_logos/launchdarkly_large.svg" alt="launchdarkly" /%}
  {% image-card href="#split-integration" src="integrations_logos/split_large.svg" alt="split" /%}
  {% image-card href="#statsig-integration" src="integrations_logos/statsig_large.svg" alt="statsig" /%}
{% /card-grid %}

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/track_feature_flags/browser_integrations.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/track_feature_flags/android_integrations.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/track_feature_flags/ios_integrations.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/track_feature_flags/flutter_integrations.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/track_feature_flags/react_native_integrations.mdoc.md" /%}
{% /if %}

## View and analyze your feature flags

After you set up your feature flag data collection, navigate to the [{% ui %}Feature Flag Tracking{% /ui %}](https://app.datadoghq.com/rum/feature-flags) tab within RUM.

From this view, you can investigate any questions you have about your feature flag's health and usage.
- Monitor the number of users experiencing each variant and see summary statistics of your feature flag.
- Check the [status](#feature-flag-status) of your feature flag to see if there are any that can be removed for code clean up.
- View which pages your feature flags are being evaluated against.

Feature flags show up in the context of events where they are evaluated, meaning they should show up on the views that the feature flag code logic is run on.

{% img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="View a list of your feature flags to investigate any questions you have about your feature flag's health and usage" style="width:90%;" /%}

### Search and filter
Search and filter your feature flags by typing in the search bar. You can also use the faceted search to narrow down, broaden, or shift your focus on subsets of feature flags you are interested in.

{% img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Feature Flag list search bar and filtering" style="width:90%;" /%}

### Feature flag status
There are three possible feature flag statuses:

Active
: The feature flag has evaluated different variants for the past 2 weeks.

Inactive
: For the past 2 weeks, there have only been feature flag evaluations for your control variant.

Out to 100%
: For the past 2 weeks, there have only been feature flag evaluations for one of your _non-control_ variants.

### Analyze your feature flags
To get more details about the health and performance of your feature flag, you can click the flag in the list to navigate to a dedicated Feature Flag analysis dashboard. The Feature Flag analysis dashboard provides an overview of the performance of your feature flag, displaying information about user sessions, changes in your Core Web Vitals, and error rates.

These out-of-the-box graphs are aggregated across your flag variants, helping you spot problems in your feature releases before they turn into serious issues. Use this dashboard to monitor your feature releases and roll back as soon as you spot an issue so you can avoid negative user experiences.

{% img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Feature Flag details page - Users overview" video="true" style="width:90%;" /%}

- The {% ui %}Users{% /ui %} tab provides some high level summary statistics of your feature flag and allows you to further analyze the users viewing each of your feature flag variants by any attribute. If you want to understand what it looks like for someone who experienced a certain variant versus another, you can watch a [Session Replay](/session_replay/) for each case.

- The {% ui %}Issues{% /ui %} tab gives you a view of the errors that are occurring in your application for user sessions that have your feature flag. Check if any issues detected by [Error Tracking](/real_user_monitoring/investigate_problems/triage_errors_and_crashes/explorer/#explore-your-issues) occurred for a specific variant of your feature flag and might be related to your changes.

- The {% ui %}Performance{% /ui %} tab allows you to understand if one of your feature flag variants have caused poor performance. You can view your Core Web Vitals and loading time for each variant to determine if one of your variants may be causing a negative impact on your application's performance.

### Build custom views from feature flag data using the RUM Explorer
Search through all the data collected by RUM in the [RUM Explorer](https://app.datadoghq.com/rum/explorer) to surface trends on feature flags, analyze patterns with greater context, or export them into [dashboards](/dashboards/) and [monitors](/monitors/#create-monitors).

You can search your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute to scope down and focus on events where users were shown a specific user experience.

You can compare important metrics to you and your teams by grouping your query by `@feature_flags.{flag_name}`. For example, if you want to understand how your new checkout flow is affecting the conversion rate from the checkout page to users making a purchase, you can add a "Group by" on the conversion rate graph.

{% img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Feature Flag list search bar and filtering" style="width:90%;" /%}

## Next step

Continue to [Define View Owners](/real_user_monitoring/enrich_rum_data/define_view_owners/).
