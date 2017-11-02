---
title: I have issues with my process check, it doesn't find my processes!
kind: faq
customnav: agentnav
---

Our process check uses the psutil python package to [check processes on your machine](https://github.com/DataDog/integrations-core/blob/master/process/check.py#L117-L134).

By default this process check works on exact match and looks at the process names only.

Would enabling a more flexible search help? https://github.com/DataDog/integrations-core/blob/master/process/conf.yaml.example#L21

By setting `exact_match` to **False** in your yaml file, the agent will look at the command used to launch your process and recognize every process that contains your keywords.

If you still have issues you can reach out to [us](/help) with the following files as attachments:

* your process.yaml
* the output of your agent [info](/agent/faq/agent-status-and-information)
* the output of ps auwx (Windows users: tasklist /v)