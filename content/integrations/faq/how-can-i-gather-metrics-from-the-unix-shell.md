---
title: How can I gather metrics from the UNIX shell?
kind: faq
---

To gather metrics from the UNIX command line, we can use the unannounced shell integration.

This integration has not yet been merged into the master branch, install this check as a custom check in the appropriate Datadog agent [directories](/developers/agent_checks/#directory).

You can find the integration files on GitHub:

* [Shell YAML Example](https://github.com/DataDog/dd-agent/blob/garner/shell-integration/conf.d/shell.yaml.example)
* [Shell checks.d](https://github.com/DataDog/dd-agent/blob/garner/shell-integration/checks.d/shell.py)

This solution is a good alternative to creating a custom check for data you can easily gather directly from the UNIX shell. For example, sending a metric with a value of the number of files in a certain directory.

Caveat: 

The user that the agent runs as may need sudo access for the shell command. Sudo access is not required when running the agent as root (not recommended).

 