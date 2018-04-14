---
title: Existe-t-il un moyen de partager (ou de révoquer) des graphiques?
kind: faq
---

Il existe trois façons de partager un graphique ou un ScreenBoard:

* Dans un TimeBoard, passez la souris sur un graphique du dashboard, cliquez sur l'icône en forme de crayon pour l'éditer et trouvez l'onglet ”share” qui génère un iFrame de ce graphique en utilisant n'importe quelle période, taille ou légende spécifiées.
* In a custom ScreenBoard, click on the cog to edit it and then click on 'Generate public URL'. This generates a URL which gives live and read-only access to just the contents of that ScreenBoard.
* Restrict access on a per-IP address basis: Email [the Datadog support team][1] to enable an IP address whitelisting feature that allows administrators to provide a list of IP addresses that have access to shared dashboards. These shared graphs can be embedded in external-facing tools using the provided iframe as well as shared directly using the source URL provided in the text box. This can be used externally without additional authorization required for access.
It's worth noting that if you've enabled Templating, the template variable drop-downs isn't present in the shared views so avoid using these if you intend on sharing the views outside of your organization.

For more details on the differences between these types of dashboards, see our [dedicated documentation][2]

To revoke the keys used to share your graphs [navigate][3] to 'Integrations / Embeds' to find a list of all the graphs that are shared, click on the 'Revoke' button for the graph you want to stop sharing. The graph moves then to the 'Revoked' list.

To revoke a shared ScreenBoard navigate to 'Dashboard / Dashboard List', select a ScreenBoard, click on the cog to edit it and click 'Revoke public URL'.

It's also possible to embed TimeBoards via [the API][4].

[1]: /help
[2]: /graphing/dashboards
[3]: https://app.datadoghq.com/account/settings#embeds
[4]: /api/#embeds
