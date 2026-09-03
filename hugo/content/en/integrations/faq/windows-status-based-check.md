---
title: Windows Status Based Check

---
This guide outlines the workflow for creating a status based check on Windows.

1. Configure the Agent using the Agent Manager: Edit the "Windows Service" configuration in the Agent Manager.

2. [Restart the Agent][1] using the Agent Manager (or restart the service)

3. Check the info page in the Agent Manager and verify that the integration check has passed. It should display a section similar to the following:

    ```
    Checks
    ======

    [...]

    windows_service
    ---------------
        - instance #0 [OK]
        - Collected 0 metrics 0 events & 1 service check
    ```

4. Install the integration by clicking "Install" [on your Datadog application dedicated page][2]:

5. Follow [those steps][3] to create an Integration Monitor.

You should now have a monitor based on your Windows Service Integration.


[1]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[2]: https://app.datadoghq.com/account/settings#integrations/windows_service
[3]: /monitors/types/integration/
