---
title: Identity Resolution
description: Automatically connect anonymous user activity to authenticated users in Product Analytics.
further_reading:
- link: "/product_analytics/charts/funnel_analysis/"
  tag: "Documentation"
  text: "Funnel Analysis"
- link: "/product_analytics/charts/retention_analysis/"
  tag: "Documentation"
  text: "Retention Analysis"
- link: "/real_user_monitoring/application_monitoring/browser/advanced_configuration/"
  tag: "Documentation"
  text: "RUM Browser Advanced Configuration"
---

## Overview

Identity Resolution enables Product Analytics to automatically connect anonymous user activity to authenticated users. When a user browses your application anonymously and later logs in, their pre-login behavior becomes associated with their authenticated identity. This gives you a complete view of the user journey without any additional instrumentation.

## Prerequisites

- Datadog RUM SDK instrumented in your application. Identity Resolution is supported on the Browser, iOS, and Android SDKs.
- `setUser()` called when users authenticate, with the `id` field set:

  ```javascript
  DD_RUM.setUser({ id: 'user-123' })
  ```

- Product Analytics enabled for your organization.

No additional SDK configuration is required. Identity Resolution uses the anonymous ID the RUM SDK already generates and the user ID set through `setUser()`.

## Feature behavior

After Identity Resolution is enabled, the following Product Analytics features automatically reflect resolved identity:

| Feature | Behavior |
|---------|----------|
| Funnels | Steps performed before login are attributed to the identified user |
| Unique user counts | Users who browsed anonymously are counted once, not twice |
| Retention | First visit, even if anonymous, is used as the cohort entry point |
| Pathways | Full path from anonymous first visit through post-login activity |

## Considerations

**Conflict handling**: If multiple users log in from the same device, the anonymous ID is mapped to the first user identified on that device. Subsequent users' pre-login activity on that device is not retroactively linked.

**Cross-device**: Identity Resolution operates at the device level. A user who browses anonymously on one device and logs in on another does not have their sessions linked across devices.

**Data retention**: Identity mappings are retained for 15 months, aligned with standard Product Analytics retention.

**Historical data**: After enablement, historical queries resolve identity for any mappings in the 15-month window, including activity before you enabled the feature.

## Privacy

Identity Resolution only links identifiers your application has already associated through `setUser()`. It does not perform probabilistic fingerprinting or cross-site tracking. The anonymous ID is a first-party, SDK-generated identifier scoped to your application. Standard Datadog data retention and deletion controls apply.

## Filter by authentication status

Identity Resolution expands the scope of user-based metrics to include anonymous activity not previously attributed to known users. As a result, you may see an increase in user counts, funnel volumes, and retention cohorts after enablement.

### Filter for authenticated users

To filter for authenticated users, set the User Id filter to `is not public`.

### Filter for anonymous users

To filter for anonymous users, set the User Id filter to `is public`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
