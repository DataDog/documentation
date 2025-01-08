---
title: Live Tail Troubleshooting
description: 'Troubleshoot Logs Live Tail errors or issues'
aliases:
    - /logs/troubleshooting/livetail_troubleshoot
---

If you are seeing an error in your Live Tail page or logs not loading, follow the troubleshooting process below - 

* Open your browser in Incognito mode and verify if you can view logs in the Live Tail view.
* Try a different browser and check if Live Tail is loading logs.
* Confirm whether other team members can see logs in the Live Tail view.
* Check for any network restrictions, VPN configurations, or antivirus software that might be blocking the Live Tail from loading logs.
   - Open your browser in Incognito mode and verify if you can view logs in the Live Tail view.
   - Confirm whether other team members can see logs in the Live Tail view.
   - Check for any network restrictions, VPN configurations, or antivirus software that might be blocking the Live Tail from loading logs.
	   - ensure that `live.logs.datadoghq.com` is allowed on inbound traffic to your local or company network.
	   - Available IP ranges can also be found at `https://ip-ranges.datadoghq.com` or similar for your Datadog environment.

## Tracing requests:

Traceroute can be used for network diagnostics to track the path of a packet taken from source to destination. This can be used to identify any client-side network issues that may stop Live Tail from being loaded, between the Datadog user and the destination live stream of logs.

-   for example, a command to perform this on Linux or MacOS is as follows:
```
traceroute live.logs.datadoghq.com
```

-   If at any point, the request times out, this is an indication that the request has been blocked between the client and Datadog servers. Checking with your network administration team can help to address these issues.    
-   If a hop (a step in the route) indicates `* * *` - this indicates that a host did not reply to the traceroute, or a router does not provide replies for that protocol. This does not always indicate that a timeout has occurred, but changing the discovery protocol to ICMP/PING using the `-I` option could provide more detailed results.

## Clear browser cache:

### Browser cache:

Here is how to do it in Google Chrome - [link](https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop).

### DNS cache:

Launch chrome browser. Type `chrome://net-internals/#dns` in the address bar, then press Enter. Click on “Clear host cache” button. Chrome Browser DNS cache will be cleared.

## Browser plugins / extensions:

-   Check if your browser / OS has any ad-blocker app installed. Uninstall it and then check if you are able to see logs in the live tail.
-   Pause / stop / uninstall any browser plugins / extensions.

## Check access (RBAC):

Verify if your Datadog account has a [logs restriction query (RBAC)](https://docs.datadoghq.com/logs/guide/logs-rbac/?tab=ui) configured. If you don’t have the necessary permissions to access the logs you are querying in Live Tail, no logs will be visible. If you believe you should have access to these logs, please contact your Datadog account administrator to grant the required permissions.

Moreover, check if you have a role assigned which has logs [live tail permission](https://docs.datadoghq.com/logs/guide/logs-rbac-permissions/?tab=ui#logs_live_tail).

{{< img src="logs/explorer/live_tail/logs_rbac_page.png" alt="Logs RBAC page" style="width:100%;" >}}

[More information on Datadog Roles and Permissions](https://docs.datadoghq.com/account_management/rbac/permissions/).

## Create a support ticket:

If the above troubleshooting steps doesn’t resolve the issue with logs live tail, please create a [support ticket](https://help.datadoghq.com/hc/en-us/requests/new?_gl=1*glz742*_gcl_aw*R0NMLjE3Mjc2ODY1MTEuQ2owS0NRandtT20zQmhDOEFSSXNBT1NiYXBWWkYyLXNtNWhxNXZEZWMyYzRKOWdHallUOGlnVmxFbGlnVmxGSGZRT2NKdkJubnU4TC1Ld2FBcXByRUFMd193Y0I.*_gcl_au*MTc4Nzg4NDk2NC4xNzMwODc5MjQw*_ga*MTM3Njg5NDYzMy4xNzIyOTAyNDI2*_ga_KN80RDFSQK*MTczMjY3MzYzMy42OC4xLjE3MzI2NzM2NDMuMC4wLjIwNjg5ODUwOTA.*_fplc*OXFtRVFHUzdxUDhwUDRxbVBhS05lUlR3V0tWUXFEcEoyVWNQd0h1cWZ0JTJGTHFZcGxtZ3lLVjFsQ3g5OCUyQjJoN3FmU012SXhjSktuNmNCQkxNczVJNXFNU1NYJTJGblpLU0ZxNngyTlFkV0I3SyUyQmJWMHUxMDdycGdLRXdwRndOdUElM0QlM0Q.). Please collect the following information before creating a support ticket.

### OS/Browser details:

1.  Browser name and version. 
2.  Plugins and/or extensions.
3.  Operating system name and version.

### DevTools ([Google Chrome](https://developer.chrome.com/docs/devtools/open)):

#### Get HAR file

This is how you can generate a HAR file Google Chrome - [Link](https://support.google.com/admanager/answer/10358597?hl=en)

-   Right-click in the browser window or tab, and select **Inspect**.
-   Click the **Network** tab in the panel that appears.
-   Start capturing HTTP traffic by clicking ("Reload this page") to reproduce your issue.
-   Click the download button (as you hover over the download button, "Export HAR" appears).
-   Name the file.
-   Click **Save**.
-   Upload the file from your local storage to your support ticket.

#### Screenshot of the browser console

### Record a brief video demonstrating the issue's behavior.
