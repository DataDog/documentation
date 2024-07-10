---
title: Using Session Replay As A Key Tool In Post-Mortems

further_reading:
- link: 'https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/'
  tag: 'blog'
  text: 'Detect user pain points with Datadog Frustration Signals'
- link: 'https://docs.datadoghq.com/notebooks/'
  tag: 'documentation'
  text: 'Notebooks'
---

## Overview

Session Replay bridges the gap between user analysis and visually reproducing errors. This guide walks through an example of how developers can leverage Session Replay as a visual aid on documenting post-mortems.

## Use RUM to identify how widespread a user issue is

In this example, we noticed that a lot of users were complaining about getting an issue upon clicking the **Checkout** button. After investigating the [RUM frustration signals dashboard][1], we confirmed in the RUM Explorer that there were nearly 3,000 instances of this error type occurring in just one week:

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/identify-widespread-user-issue-1.png" alt="Use RUM to identify how many instances of an error type occurred in a week" style="width:100%;">}}

## Watch the user issue in a Session Replay
After clicking into a session from the above query, we can watch a Session Replay to see this error occur live, and observe what users did before and after:

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/watch-user-issue.png" alt="Review the user's experience the issue in a Session Replay" style="width:100%;">}}

## Share to a Notebook
To ensure other team members investigating this issue can see this context, we can share this particular Session Replay to a notebook via the share button:

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/share-to-notebook.png" alt="Share the Session Replay video by saving it to a post-mortem notebook" style="width:60%;">}}

By sending the Session Replay to a notebook, we can add commentary, analyze other telemetry data from this incident, and document our post-mortem.

**Note**: A template for post-mortem notebooks is available [here][2].

## Documenting the post-mortem
After sharing the replay to a notebook, we can begin documenting the investigation.

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/document-the-post-mortem.png" alt="In Notebooks, add context about behavior in the replay, include appropriate graphs, or tag stakeholders in a comment" style="width:100%;">}}

We can add context about behavior in the replay, and bring in appropriate graphs to best represent the issue, such as the total number of users affected.

In addition, by adding a comment in Notebooks, we can tag stakeholders who should take a look. In this case, we've tagged the product manager responsible for this feature to confirm a fix has been added to the backlog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
[2]: https://app.datadoghq.com/notebook/template/7/postmortem-ir-xxxx-outage-name
