---
title: Track Users and Accounts
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

Add user and account information to your RUM sessions to:

- Follow the activity of a given user
- Know which users and accounts are the most impacted by errors
- Monitor performance for your most important users and accounts

Select your SDK for platform-specific instructions.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/track_user_ids/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/track_user_ids/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/track_user_ids/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/track_user_ids/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/track_user_ids/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_user_ids/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/track_user_ids/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
{% partial file="sdk/track_user_ids/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/track_user_ids/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/track_user_ids/unity.mdoc.md" /%}
{% /if %}

## Next step

Continue to [Modify or Drop RUM Events Client-Side](/real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/).
