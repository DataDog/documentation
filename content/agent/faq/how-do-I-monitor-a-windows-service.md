---
title: How do I monitor a Windows Service?
kind: faq
customnav: agentnav
---

On your target host, first launch the Datadog Agent Manager and select the "Windows Service" integration from the list (see below)

For the Windows Service Integration, there is an out-of-the-box example, however, in this example we'll use dhcp.

First, to get the name of the service, open services.msc and locate your target service. Using dhcp as our target, you can see the service name at the top of the service properties window:

{{< img src="agent/faq/DHCP.png" alt="DHCP" responsive="true" >}}

When adding your own services, be sure to follow the formatting exactly as shown - if formatting is not correct it will cause the Integration to fail

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" responsive="true" >}}

Also, any time you modify an Integration you’ll need to restart the Datadog Service. You can do this from services.msc or right from the UI via Actions.

For Services, Datadog doesn't track the metrics, only their availability. (For metrics you’ll want to use [Process](/agent/faq/how-do-i-monitor-windows-processes/) or [WMI Integration](/integrations/wmi)). To set up a Monitor, select the "Integration" then "Windows Service" monitor type. There you can "Pick Monitor Scope" and choose the service you would like to monitor.