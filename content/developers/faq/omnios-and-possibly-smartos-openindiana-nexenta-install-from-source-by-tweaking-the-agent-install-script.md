---
title: OmniOS (and possibly SmartOS/OpenIndiana/Nexenta), install from source by tweaking the agent install script 
kind: faq
---

OmnisOS isn't an OS supported by Datadog, and the [install from source](https://app.datadoghq.com/account/settings#agent/source) doesn't directly work.

A Datadog user managed to tweak the install from source script to have the agent work in OmniOS v11 r151018, and this could possibly work with similar OSes (SmartOS/OpenIndiana/Nexenta). But note the memory metrics may not be captured.

In attachment are the instructions, courtesy of Joseph Boren, if this can help you install the datadog-agent.

Note that this is not supported by Datadog nor has not been tested by Datadog. OmnisOS remains an OS not supported by Datadog.