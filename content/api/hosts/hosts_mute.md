---
title: Mute A Host
type: apicontent
order: 12.1
---

## Mute A Host
##### ARGUMENTS
<ul class="arguments">
    {{< argument name="end" description="POSIX timestamp when the host will be unmuted. If omitted, the host will remain muted until explicitly unmuted." default="None" >}}
    {{< argument name="message" description="Message to associate with the muting of this host" default="None" >}}
    {{< argument name="override" description="If true and the host is already muted, will replace existing host mute settings." default="False" >}}
</ul>