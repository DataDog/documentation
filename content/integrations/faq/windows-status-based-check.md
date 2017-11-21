---
title: Windows Status Based Check
kind: faq
customnav: integrationsnav
---
This guide outlines the workflow for creating a status based check on Windows.

1. Configure the Agent using the Agent Manager: Edit the "Windows Service" configuration in the Agent Manager.

2. [Restart the Agent](/agent/faq/start-stop-restart-the-datadog-agent) using the Agent Manager (or restart the service)

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

4. Install the integration by clicking "Install" [here](https://app.datadoghq.com/account/settings#integrations/windows_service):

5. Follow [those steps](/monitors/monitor_types/integration) to create an Integration Monitor.

You should now have a monitor based on your Windows Service Integration.

If you are looking at configuring the Windows Event Log Integration, please follow this article:

[How to monitor events from the Windows Event Logs](/integrations/faq/how-to-monitor-events-from-the-windows-event-logs)