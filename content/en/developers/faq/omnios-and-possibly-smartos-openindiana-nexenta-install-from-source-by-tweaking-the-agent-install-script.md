---
title: OmniOS Install From Source

---

OmniOS is not supported by Datadog, and the [install from source][1] doesn't directly work.

A Datadog user managed to tweak the install from source script to have the Agent work in OmniOS v11 r151018. Additionally, this might work with similar operating systems (SmartOS/OpenIndiana/Nexenta).
**Note**: The memory metrics may not be captured.

[Instructions][2] were provided courtesy of Joseph Boren, that may help you install the Datadog Agent.

**Note**: This is not supported or tested by Datadog. OmniOS remains an OS not supported by Datadog.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=source
[2]: /resources/txt/omnis_os_instructions.txt
