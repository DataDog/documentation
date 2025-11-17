---
title: Live Tail Troubleshooting
description: 'Troubleshoot Logs Live Tail errors or issues'
---

If your Live Tail page shows an error, or the logs do not load, try the following troubleshooting steps:

* Open the Live tail view with your browser in Incognito mode, and see if you can view logs.
* Try a different browser, and check if Live Tail loads logs.
* Check whether other team members can see logs in the Live Tail view.
* Check for any network restrictions, VPN configurations, or antivirus software that may block the Live Tail from loading logs:
	- Ensure that your local or company network allows inbound traffic from `live.logs.datadoghq.com`.
	- Find the Datadog IP prefixes at the [IP ranges][1] endpoint.

## Trace requests

Traceroute is a tool that helps you test the path a packet takes from source to destination. You can use `traceroute` to identify any client-side network issues that may stop Live Tail from loading.

To examine the route for Live Tail logs on Linux or MacOS, run the following command:
{{< code-block lang="shell">}}
traceroute live.logs.datadoghq.com
{{< /code-block >}}

If at any point the request times out, that means the request is blocked somewhere between the client and Datadog servers. Check with your network administration team to address this issue.    

If a step in the route shows `* * *`, this could indicate a host did not reply to the traceroute, or a router does not reply to that protocol. The `* * *` pattern does not always indicate a timeout. Changing the discovery protocol to ICMP/PING using the `-I` option may provide more detailed results.

## Clear browser and DNS caches

### Browser cache

Clearing your browser cache may help with Live Tail problems. For example, to clear your cache in Google Chrome, see [Google account help][2].

### DNS cache

Clearing your DNS cache may help with Live Tail problems.

To clear your DNS cache using Google Chrome:
1. Launch the Google Chrome browser.
1. Type `chrome://net-internals/#dns` in the address bar, then click Enter.
1. Click **Clear host cache**.

## Check browser plugins and extensions

Browser plugins and extensions, including ad blockers, sometimes interfere with Live Tail: 
- Check if your browser or operating system has an ad blocker app installed. Uninstall or disable any ad blockers you find, and then check if you are able to see logs in Live Tail.
- Pause, stop, or uninstall any browser plugins and extensions.

## Check access

Verify that you have a role assigned to you which has the [`logs_live_tail`][3] permission. For more information, see [Datadog roles and permissions][4].

Determine whether an administrator configured a [logs restriction query (RBAC)][5] on your Datadog organization. If you lack the necessary permissions to access the logs you are querying in Live Tail, no logs are visible to you. If you believe you should have access to these logs, contact your Datadog account administrator to grant the required permissions.

{{< img src="logs/explorer/live_tail/logs_rbac_page.png" alt="Logs RBAC page" style="width:100%;" >}}

## Check log timestamps

If you are expecting logs to appear in Live Tail which are not visible, verify whether the timestamps of the logs are within the 15 minute period of Live Tail's window.
If log timestamps are aligned with UTC time, logs sent in real time should appear within the 15 minute period specified.

Often, if timestamps are sent from hosts with a different local time than UTC, the offset of these timezones can cause discrepancies in how these logs are represented in Datadog.

During processing, this may happen in two ways:
- If using a Date Remapper processor in a Logs Pipeline, verify that the attribute referenced by the processor is reflective of UTC time.
- If logs are sent as JSON, automatic parsing will extract the date attribute if it is reflected by a listed attribute in [JSON Preprocessing][10].

If the attribute used to reflect the timestamp of the log is in a different timezone to UTC, see [Parsing dates][9] with a Grok Parser to shift the timezone.
- This does not function for attributes parsed with JSON Preprocessing. These attributes must be modified outside of Preprocessing.

## Create a support ticket

If the above troubleshooting steps do not resolve the issue with Live Tail, create a [support ticket][6]. If possible, include the following information in your support ticket:

### Operating system and browser details

- Browser name and version 
- Plugins and/or extensions
- Operating system name and version

### HAR file

To generate a HAR file in Google Chrome, see [Capture web session traffic][7].

Attach the HAR file to your support ticket.

### Screenshots and recording
- Take a screenshot of the browser console.
    - In Google Chrome, see [DevTools][8] to open the browser console.
- Record a brief video demonstrating the issue's behavior.

[1]: https://ip-ranges.datadoghq.com
[2]: https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop
[3]: /logs/guide/logs-rbac-permissions/?tab=ui#logs_live_tail
[4]: /account_management/rbac/permissions/
[5]: /logs/guide/logs-rbac/?tab=ui
[6]: https://help.datadoghq.com/hc/en-us/requests/new
[7]: https://support.google.com/admanager/answer/10358597?hl=en
[8]: https://developer.chrome.com/docs/devtools/open
[9]: /logs/log_configuration/parsing/?tab=matchers#parsing-dates
[10]: /logs/log_configuration/pipelines/?tab=date#preprocessing
