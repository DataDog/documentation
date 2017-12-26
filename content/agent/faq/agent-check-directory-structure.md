---
title: Agent check directory structure
kind: faq
---

The `checks.d` folder lives in your Agent root:

For all Linux systems, find it at:

    /etc/dd-agent/checks.d/

For Windows Server >= 2008, find it at:

    C:\Program Files (x86)\Datadog\Agent\checks.d\

OR

    C:\Program Files\Datadog\Agent\checks.d\

For Mac OS X and source installations, find it at:

    ~/.datadog-agent/agent/checks.d/

OR

    ~/.pup/agent/checks.d/

OR

    <sandbox_folder>/checks.d/

The other folder that you need to care about is `conf.d` which lives in the
Agent configuration root.

For Linux, find it at:

    /etc/dd-agent/conf.d/

For Windows, find it at:

    C:\ProgramData\Datadog\conf.d\

OR

    C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\

For Mac OS X and source installations, find it at:

    ~/.datadog-agent/agent/conf.d/

OR

    ~/.pup/agent/conf.d/

OR

    <sandbox_folder>/conf.d/

You can also add additional checks to a single directory, and point to it in `datadog.conf`:

    additional_checksd: /path/to/custom/checks.d/