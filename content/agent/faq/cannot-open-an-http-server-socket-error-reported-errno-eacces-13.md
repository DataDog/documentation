---
title: Starting Datadog Agent (using supervisord) Error Cannot open an HTTP server socket.error reported errno.EACCES (13)
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
---

There are a number of issues that can cause the following error when you try starting your Datadog agent:

```
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

At first glance, that might appear to indicate that the agent is unable to connect to the appropriate sockets because they're already occupied. But if you've already double-checked that there are [no lingering agent processes remaining](/agent/faq/error-restarting-agent-already-listening-on-a-configured-port), and if you can ensure that the [appropriate ports](/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service) are available to the agent, sometimes this above error persists.

For linux hosts, the following directory must be owned by the dd-agent user in order for it to start correctly: /opt/datadog-agent/run

On rare occasions, the ownership of this directory can get changed to something other than dd-agent, this causes the above error the next time you try starting the agent. You can double-check on the ownership of this directory by running the following command:
```
ls -al /opt/datadog-agent/run
```

And if the owner of the file is other than dd-agent, you can run the following command to fix this.
```
chown dd-agent -R /opt/datadog-agent/run
```
After making this change, the `/etc/init.d/datadog-agent start` command should successfully be able to start the agent.

If you continue to see this issue despite having taken these steps, contact [us](/help) for some additional direction.

{{< partial name="whats-next/whats-next.html" >}}