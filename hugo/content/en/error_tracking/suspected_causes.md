---
title: Suspected Causes
description: Learn about suspected causes in backend Error Tracking.
further_reading:
- link: '/error_tracking/monitors'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'

---

## Overview

Datadog assigns a suspected cause label to issues at creation time. The suspected cause label represents the first hypothesis a developer may have about the root cause of an error. This initial classification helps teams streamline their troubleshooting efforts and enhance their understanding of recurring problems.

The suspected cause can be one of the following categories:

- {{< ui >}}Code Exception{{< /ui >}}: An error was caused by a flaw in the code.
- {{< ui >}}Failed Request{{< /ui >}}: An API endpoint responded with an error status code.
- {{< ui >}}Illegal Object Access{{< /ui >}}: The code accessed an object that was null or undefined.
- {{< ui >}}Invalid Argument{{< /ui >}}: A function was called with an invalid argument.
- {{< ui >}}Network{{< /ui >}}: A server took long to respond, or the network was slow.

Suspected causes can be used as filters in search, enabling you to locate relevant issues.

{{< img src="/error_tracking/suspected-cause.png" alt="Filter your search by the suspected cause." >}}

### Updating suspected cause labels

Suspected causes can be manually edited if they are deemed incorrect, allowing for continuous improvement of the labeling process.

To update the suspected cause, click the label and select a different one.

{{< img src="/error_tracking/suspected-cause-labels.png" alt="Update the suspected cause label." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
