---
title: Common Windows Agent Installation Error 1721
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

One of the most common errors we see with an [Agent installation on windows][1] is a 1721 error that looks something like this:

```
Product: Datadog Agent - Error 1721. There is a problem with this Windows Installer package. The program required for this install to complete could not be run. Contact your support personnel or package vendor.
```

We've found that this is generally due to one of two reasons:

1. Most frequently it is due to Anti-Virus software. In this case, Error 1721 is an Install Shield error code which indicates that the installation process has failed. To correct this:
    * Disable/Configure any anti-spyware or anti-virus software on your system during the Agent installation process; and
    * Check to see if any spyware or adware is installed on your system blocking the completion of install process.

2. Another reason is that in some instances, the Windows Installer can become unregistered and needs to be re-registered for installations to function. To correct this:
    * Click Start, click Run, type MSIEXEC /UNREGISTER, and then click OK. Even if you do this correctly, it may look like nothing occurs.
    * Click Start, click Run, type MSIEXEC /REGSERVER, and then click OK. Even if you do this correctly, it may look like nothing occurs, or you may briefly see an hourglass.
    * Try the installation once more

Hopefully if you encounter a 1721 Error, the above steps gets you running in no time!

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/windows
