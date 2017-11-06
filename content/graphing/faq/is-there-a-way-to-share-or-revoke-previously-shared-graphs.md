---
title: Is there a way to share (or revoke previously shared) graphs?
kind: faq
customnav: graphingnav
---

There are three ways to share a graph or ScreenBoard:

* In a TimeBoard, mouse over a graph on a dashboard, click on the pencil icon to edit it and you’ll find the “share” tab that will generate an iFrame of just that graph using whatever timeframe, size or legend you specify here.
* In a custom ScreenBoard, click on the cog to edit it and then click on 'Generate public URL'. This will generate a URL which gives live and read-only access to just the contents of that ScreenBoard.
* Restrict access on a per-IP address basis: Email [the Datadog support team](/help) to enable an IP address whitelisting feature that will allow admins to provide a list of IP addresses that will have access to shared dashboards. These shared graphs can be embedded in external-facing tools using the provided iframe as well as shared directly using the source URL provided in the text box. This can be used externally without additional authorization required for access.
It's worth noting that if you've enabled Templating, the template variable drop-downs will not be present in the shared views so avoid using these if you intend on sharing the views outside of your organization.

For more details on the differences between these types of dashboards, please see our [article here](/graphing/dashboards)

To revoke the keys used to share your graphs [navigate](https://app.datadoghq.com/account/settings#embeds) to 'Integrations / Embeds'. You will find a list of all the graphs that are shared, simply click on the 'Revoke' button for the graph you want to stop sharing. The graph will move to the 'Revoked' list.

To revoke a shared ScreenBoard navigate to 'Dashboard / Dashboard List', select a ScreenBoard, click on the cog to edit it and click 'Revoke public URL'.

It's also possible to embed TimeBoards via [the API](http://docs.datadoghq.com/api/#embeds). 