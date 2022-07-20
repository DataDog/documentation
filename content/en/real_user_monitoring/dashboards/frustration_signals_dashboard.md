---
title: RUM Frustration Signals Dashboard
kind: documentation
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/real_user_monitoring/frustration_signals/'
  tag: 'Documentation'
  text: 'Learn about Frustration Signals'
---

## Overview

The frustration signals dashboard provides insight into elements where users experience the most friction in your application. It shows:

- **Rage clicks**: Measures when a user clicks the same button more than three times in a one-second sliding window.
- **Error clicks**: Measures when a user clicks on a static element, thinking it is interactive.
- **Dead clicks**: Measures when a user clicks an element and encounters a JavaScript error.

{{< img src="real_user_monitoring/dashboards/frustration_signals_ootb_dashboard.png" alt="Frustration signals dashboard" style="width:100%;" >}}

For more information about the data displayed, see [RUM Browser Data Collected][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/
