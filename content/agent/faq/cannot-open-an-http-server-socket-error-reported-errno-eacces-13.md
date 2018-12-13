---
title: Starting Datadog Agent (using supervisord) Error Cannot open an HTTP server socket.error reported errno.EACCES (13)
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

There are a number of issues that can cause the following error when you try starting your Datadog Agent:

```
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

At first glance, that might appear to indicate that the Agent is unable to connect to the appropriate sockets because they're already occupied. But if you've already double-checked that there are [no lingering Agent processes remaining][1], and if you can ensure that the [appropriate ports][2] are available to the Agent, sometimes this above error persists.

For linux hosts, the following directory must be owned by the `dd-agent` user in order for it to start correctly: /opt/datadog-agent/run

On rare occasions, the ownership of this directory can get changed to something other than `dd-agent`, this causes the above error the next time you try starting the Agent. You can double-check on the ownership of this directory by running the following command:
```
ls -al /opt/datadog-agent/run
```

And if the owner of the file is other than `dd-agent`, you can run the following command to fix this.
```
chown dd-agent -R /opt/datadog-agent/run
```
After making this change, the `/etc/init.d/datadog-agent start` command should successfully be able to start the Agent.

If you continue to see this issue despite having taken these steps, contact [us][3] for some additional direction.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/error-restarting-agent-already-listening-on-a-configured-port
[2]: /agent/network
[3]: /help
