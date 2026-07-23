---
title: Set up ServiceNow Service Graph Connector
further_reading:
- link: "/integrations/servicenow/"
  tag: "Documentation"
  text: "ServiceNow integration"
---

## Overview

The [Service Graph Connector for Observability - Datadog][1] integration allows Datadog to automatically populate server and database Configuration Items (CIs) in your ServiceNow CMDB for newly discovered resources. You can obtain this connector from the ServiceNow [store][2].

For initial setup, follow the guided setup instructions included in the integration.

The connector supports the following CI types:
- Server
- Amazon RDS

### Notes for existing ITOM/ITSM configurations

If you already have the integration configured for ServiceNow ITOM/ITSM:

- The Service Graph Connector does not use the `Target table` and `Custom table` values from the configuration tile. You can save the integration with the Target table default values.
- You can reuse your existing ITOM/ITSM user, but you must grant them the `cmdb_import_api_admin` role. This is outlined in the Service Graph Connector's guided setup instructions.

## Setup

Before configuring the integration, ensure you have the [ServiceNow tile configured][4] with your ServiceNow instance in Datadog.

## Customize CI fields

In Datadog, in the [ServiceNow integration tile][3], click the **Configure** tab, then the **Service Graph Connector** tab. Expand the **Customize CI** fields section. The following options are available:

CI Type
: The type of CI this field applies to.

ServiceNow Field
: The field in ServiceNow to apply it to.

Datadog Tag
: The tag to send from Datadog resources. (If multiple tags are found with the same name, they'll be comma-separated.)<br />For example, to add a CI field with a CI Type of `Host` and a ServiceNow Field of `Host Name`, add any host tag attribute to the `Datadog Tag` field.<br />**Note**: The `Datadog Tag` field must be a host tag that exists on Datadog hosts, not an attribute tag on a host.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/c877cb86687e0050f8774bfad236c950/1.2.1
[2]: https://store.servicenow.com/
[3]: https://app.datadoghq.com/integrations/servicenow
[4]: /integrations/servicenow/#configure-the-servicenow-tile-in-datadog