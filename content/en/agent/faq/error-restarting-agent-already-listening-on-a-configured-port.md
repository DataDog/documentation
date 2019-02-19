---
title: Error Restarting Agent, Already Listening on a Configured Port
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

When attempting to restart the Agent, you may encounter this error if the Agent didn't shut down correctly:

Starting Datadog Agent (using supervisord) datadog-agent
```
Error: Another program is already listening on a port that one of our HTTP servers is configured to use. Shut this program down first before starting supervisord.
```

To resolve this issue, take the following steps:

1. Stop the Agent:
    ```
    sudo /etc/init.d/datadog-agent stop
    ```
2. Confirm that there are no processes running for the user `dd-agent` after stopping:
    ```
    top -U dd-agent
    ```

If you do find processes running under `dd-agent`, kill them.

After the above steps, start the Agent:
```
sudo /etc/init.d/datadog-agent start
```

If this doesn't solve your issue, reach out to [us][1]!

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
