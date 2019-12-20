---
title: Mute a monitor
type: apicontent
order: 27.10
external_redirect: /api/#mute-a-monitor
---

## Mute a monitor

**ARGUMENTS**:

* **`scope`** [*optional*, *default*=**None**]:
    The scope to apply the mute to, e.g. **role:db**.
    For example, if your alert is grouped by `{host}`, you might mute `host:app1`.
* **`end`** [*optional*, *default*=**None**]:
    A POSIX timestamp for when the mute should end.
