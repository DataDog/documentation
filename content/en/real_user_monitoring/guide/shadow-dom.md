---
title: Enrich Your Session Replays With Shadow DOM Components
kind: guide
description: Guide about Shadow DOM compatibility with Session Replay.
further_reading:
- link: '/real_user_monitoring/session_replay/'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
---

## Overview

Shadow DOM helps developers build more modern websites by allowing them to incorporate isolated and reusable components into their code. Often used in order to keep a clean code structure and avoid style clashes, Shadow DOM usage has become more prominent in modern web development practices. 

Starting with `v4.31.0`, Datadog provides support of open Shadow DOM without any extra configuration required — components which are located inside a shadow root are automatically captured by Session Replay.

**Note**: The open Shadow DOM compatibility has been tested on popular frameworks. Closed and dynamic Shadow DOM, as well as change in the dynamic CSS style are not supported.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
