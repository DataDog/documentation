---
title: Log Archives
kind: documentation
description: Forward all your ingested logs to storage.
further_reading:
- link: "logs/explorer"
  tag: "Documentation"
  text: "Log Explorer"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Logging without Limits*"
---

## Archives

Configure your Datadog account to forward all the logs ingested to a cloud storage system. This allows you to keep in long-term storage all the logs that you used Datadog to aggregate. You can then opt to rehydrate these archived log events in order to analyze them with the Log Explorer.


Note: only Datadog users with admin status can create, modify, or delete log archive configurations.

{{< img src="logs/archives/log_archives_s3_overview.png" alt="Archive page view" responsive="true" style="width:75%;">}}

## Overview

{{< whatsnext desc="This section includes the following topics:" >}}
    {{< nextlink href="/logs/archives/s3" >}}<u>Archive to S3</u>: Set up forwarding logs to your Amazon S3 bucket.{{< /nextlink >}}
    {{< nextlink href="/logs/archives/gcs" >}}<u>Archive to GCS</u>: Set up forwarding logs to your Google Cloud Storage.{{< /nextlink >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>Rehydrate from Archives</u>: Capture log events from your archives back into Datadog's Log Explorer.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.
