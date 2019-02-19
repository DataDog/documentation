---
title: OmniOS (and possibly SmartOS/OpenIndiana/Nexenta), install from source by tweaking the Agent install script 
kind: faq
---

OmnisOS is not supported by Datadog, and the [install from source][1] doesn't directly work.

A Datadog user managed to tweak the install from source script to have the Agent work in OmniOS v11 r151018. Additionally, this might work with similar operating systems (SmartOS/OpenIndiana/Nexenta).  
**Note**: The memory metrics may not be captured.

In this [attachment][2] are instructions, courtesy of Joseph Boren, that may help you install the Datadog Agent.

**Note**: This is not supported or tested by Datadog. OmnisOS remains an OS not supported by Datadog.

[1]: https://app.datadoghq.com/account/settings#agent/source
[2]: /txt/omnis_os_instructions.txt
