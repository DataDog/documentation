---
title: Will past anomalies affect the current predictions?
kind: faq
customnav: monitornav
---

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="anomalous_history" responsive="true">}}

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="no effect" responsive="true">}}