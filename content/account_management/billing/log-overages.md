---
title: Log management overages
kind: faq
---

With Datadog Log Management, you define a monthly commitment on indexed log events. However, during troubling times the number of logs can spike and you may go above your commitment. Because it's important to keep visibility on your infrastructure health, you are not limited to your monthly commitment.

Since commitments are monthly, if you over-generate log events for 1 day it may not cause overages if your average daily log consumption is close to expectations for your commitment.

## Overage computation

At the end of the month, we compute the total number of log events that have been indexed:

- If you are below commitment, your bill stays the same.
- If you over-consume, we subtract the committed amount and the **overages** are charged with a 50% premium.

## Troubleshooting
For technical questions, contact [Datadog support][1].

For billing questions, contact your Customer Success Manager.

[1]: /help
