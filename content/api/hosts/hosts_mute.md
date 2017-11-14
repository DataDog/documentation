---
title: Mute A Host
type: apicontent
order: 12.1
---

## Mute A Host
##### ARGUMENTS

* `end` [*optional*, *default*=**None**]:  
    POSIX timestamp when the host will be unmuted. If omitted, the host will remain muted until explicitly unmuted.
* `message` [*optional*, *default*=**None**]:  
    Message to associate with the muting of this host.
* `override` [*optional*, *default*=**False**]:  
    If true and the host is already muted, will replace existing host mute settings.