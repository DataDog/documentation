## Peer Benchmarks

Peer Benchmarks compare your application's TTID to the performance of comparable applications monitored by Datadog. Get visibility into your relative performance against other organizations using Datadog.

### Use Peer Benchmarks

{% alert level="info" %}
To use this feature, your organization must use [RUM without Limits](/real_user_monitoring/rum_without_limits/).
{% /alert %}

Peer Benchmarks are displayed on the Explore Vitals page.

Benchmarks adapt to the filters you apply on metric dimensions in the UI, letting you compare your performance for a specific end-user base. Filtering on `env`, `service`, or `version` has no effect.

### How it works

Peer applications are selected to share a similar audience base, combining development platform and user session traffic.

### Data privacy

Peer Benchmarks data is fully anonymized: only aggregated indicators are displayed, so no individual application can be isolated.

Benchmarks are only shown when the number of peer applications is large enough to ensure statistical significance and strict anonymity.
