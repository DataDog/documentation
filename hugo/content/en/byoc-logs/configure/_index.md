---
title: Configure BYOC Logs
description: Learn how to configure and customize your BYOC Logs deployment for optimal performance and security
further_reading:
- link: "/byoc-logs/install/"
  tag: "Documentation"
  text: "Install BYOC Logs"
- link: "/byoc-logs/operate/sizing/"
  tag: "Documentation"
  text: "Size your cluster"
aliases:
  - /cloudprem/configure/
---

## Overview

After installing BYOC (Bring Your Own Cloud) Logs, you can configure your deployment to meet your environment, security, and performance requirements. Key configuration areas include account integration, cloud resource setup, cluster sizing, ingress, and processing options. These settings allow you to tailor {{< prodname >}}BYOC Logs{{< /prodname >}} for your specific needs.

If you don't see the {{< prodname >}}BYOC Logs{{< /prodname >}} entry in the Logs menu, it means {{< prodname >}}BYOC Logs{{< /prodname >}} is not activated on your account. Contact your Datadog account team to activate {{< prodname >}}BYOC Logs{{< /prodname >}} on your account.

{{< whatsnext desc="Customize your BYOC Logs deployment:">}}
   {{< nextlink href="/byoc-logs/configure/indexes/" >}}Configure indexes{{< /nextlink >}}
   {{< nextlink href="/byoc-logs/configure/ingress/" >}}Configure Ingress{{< /nextlink >}}
   {{< nextlink href="/byoc-logs/configure/lambda/" >}}Lambda Search Offloading{{< /nextlink >}}
   {{< nextlink href="/byoc-logs/configure/metastore_read_replicas/" >}}Metastore Read Replicas{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

