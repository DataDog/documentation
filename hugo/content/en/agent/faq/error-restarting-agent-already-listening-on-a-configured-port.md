---
title: Error Restarting Agent, Already Listening on a Configured Port
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

When attempting to restart the Agent, you may encounter this error:

```text
Error: Another program is already listening on a port that one of our HTTP servers is configured to use. Shut this program down first before starting supervisord.
```

This indicates that the Agent did not shut down correctly.

To resolve this issue, take the following steps:

1. Stop the Agent:

    ```text
    sudo /etc/init.d/datadog-agent stop
    ```

2. Confirm that there are no processes running for the user `dd-agent` after stopping:

    ```text
    top -U dd-agent
    ```

    Kill any processes running under `dd-agent`, if you find any.

3. Start the Agent again.

    ```text
    sudo /etc/init.d/datadog-agent start
    ```

If this doesn't solve your issue, reach out to [Datadog Support][1].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
