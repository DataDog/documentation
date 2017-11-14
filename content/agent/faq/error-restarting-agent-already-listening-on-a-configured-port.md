---
title: Error Restarting Agent, Already Listening on a Configured Port
kind: faq
customnav: agentnav
---

When attempting to restart the agent, you may encounter this error if the agent didn't shut down correctly:  

Starting Datadog Agent (using supervisord) datadog-agent
```
Error: Another program is already listening on a port that one of our HTTP servers is configured to use. Shut this program down first before starting supervisord.
```

To resolve this issue, please take the following steps: 

1. Stop the agent:
    ```
    sudo /etc/init.d/datadog-agent stop
    ```
2. Confirm that there are no processes running for the user dd-agent after stopping:
    ```
    top -U dd-agent
    ```

If you do find processes running under dd-agent, please kill them.

After the above steps, please start the agent:
```
sudo /etc/init.d/datadog-agent start
```

If this doesn't solve your issue, please reach out to [us](/help).