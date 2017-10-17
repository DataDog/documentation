---
title: Post A Check Run
type: apicontent
order: 7.1
---

## Post A Check Run

##### ARGUMENTS
<ul class="arguments">
    {{< argument name="check" description="The text for the message" >}}
    {{< argument name="host_name" description="The name of the host submitting the check" >}}
    {{< argument name="status" description="An integer for the status of the check. <div>Options: '0': OK, '1': WARNING, '2': CRITICAL, '3': UNKNOWN  </div>" default="None" >}}
    {{< argument name="timestamp" description="POSIX timestamp of the event." default="None" >}}
    {{< argument name="message" description="A description of why this status occurred" default="None" >}}
    {{< argument name="tags" description="A list of key:val tags for this check" default="None" >}}
</ul>