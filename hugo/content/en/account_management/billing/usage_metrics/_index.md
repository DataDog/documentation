---
title: Usage Metrics
further_reading:
    - link: "/account_management/billing/usage_metrics/finalized_usage_metrics/"
      tag: "Documentation"
      text: "Finalized Usage Metrics"
    - link: "/account_management/billing/usage_metrics/estimated_usage_metrics/"
      tag: "Documentation"
      text: "Estimated Usage Metrics"
---

<script>
  // The estimated usage metrics content moved to its own page. Send links to its old anchors there.
  (function () {
    var movedAnchors = ["overview", "types-of-usage", "setting-tags-for-your-by_tag-estimated-usage-metrics", "dashboards", "multi-org-usage", "troubleshooting"];
    var anchor = window.location.hash.slice(1);
    if (movedAnchors.indexOf(anchor) !== -1) {
      window.location.replace("estimated_usage_metrics/" + window.location.search + "#" + anchor);
    }
  })();
</script>

The two primary sources for exploring usage as metrics at Datadog are finalized usage metrics and estimated usage metrics (EUMs).

## Finalized Usage Metrics

<!-- TODO: Add the image from the source doc that appears under the "Finalized Usage Metrics" heading. -->

Processed usage that reflects the values you are billed on. Use finalized usage metrics in dashboards and usage monitors to view your usage trends over time and to keep your usage on track with what you expect. May have 2-20 hours of latency depending on the product.

[Finalized Usage Metrics][1]

## Estimated Usage Metrics

<!-- TODO: Add the image from the source doc that appears under the "Estimated Usage Metrics" heading. -->

Near real-time estimated usage with a margin of error (typically 5-20% off from billed usage). Use EUMs to quickly view how your changes impact your usage and to catch unexpected spikes early.

[Estimated Usage Metrics][2]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/usage_metrics/finalized_usage_metrics/
[2]: /account_management/billing/usage_metrics/estimated_usage_metrics/
