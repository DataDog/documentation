---
title: Can I backup Dashboards or Monitors?
kind: faq
customnav: main_references
---

Using our [APIs](/api) it's possible to write a script to backup monitor and dashboard definitions as code. Doing so not only allows for version control, but also allows those users with multiple Datadog accounts to create a set of baseline monitors and dashboards to be deployed in each new account.

See the following projects as examples of how these backups can be accomplished:

* https://github.com/brightcove/dog-watcher
* https://github.com/Shopify/doggy

Special thanks to [Brightcove](https://www.brightcove.com/) and [Shopify](https://www.shopify.com/) for sharing these projects!

There are Monitor specific examples [here](/developers/faq/can-i-programmatically-maintain-or-manipulate-my-datadog-monitors-alerts) as well. 

