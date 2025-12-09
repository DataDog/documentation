---
title: Ingest and Enrich
disable_toc: false
further_reading:
- link: "https://docs.datadoghq.com/getting_started/security/cloud_siem/"
  tag: "Documentation"
  text: "Getting Started with Cloud SIEM"
- link: "https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/"
  tag: "Blog"
  text: "Best practices for monitoring AWS CloudTrail logs"
- link: "https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/"
  tag: "Blog"
  text: "Best practices for monitoring authentication logs"
- link: "https://www.datadoghq.com/blog/ocsf-common-data-model//"
  tag: "Blog"
  text: "Normalize your data with the OCSF Common Data Model in Datadog Cloud SIEM"
---

## Overview

Cloud SIEM detection rules analyze logs and security data to generate security signals when threats are detected. After you have enabled Cloud SIEM, configure Datadog to ingest and enrich logs from sources that you want to monitor.

## Ingest security data
The easiest way to send data to Datadog is by using [Content Packs][1], which are integrations specifically designed for Cloud SIEM. Each content pack contains instructions on how to configure the integration to ingest those logs and provides information on what is included, such as:

- Detections rules
- Out-of-the-box interactive dashboards
- Parsers
- SOAR workflows

[Content packs][1] are available for many popular security technologies.

If you have custom logs or have a data source not listed on Cloud SIEM's [Content Pack][2] page, check whether the integration is available in Datadog's extensive [integration library][3]. If it isn't available, you can send those logs as [custom logs][4] to Cloud SIEM for analysis.

## Enrich logs

### Threat intelligence

Datadog provides built-in [Threat Intelligence][5] for Cloud SIEM logs and also supports enriching and searching using threat intelligence indicators of compromise (IoCs) stored in Datadog reference tables. See [Bring Your Own Threat Intelligence][6] for more information.

### Open Cybersecurity Framework (OCSF)

[Open Cybersecurity Framework (OCSF)][7] is integrated directly into Cloud SIEM, so incoming security logs are automatically enriched with OCSF-compliant attributes through out-of-the-box pipelines.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/content_packs/
[2]: https://app.datadoghq.com/security/content-packs
[3]: /integrations/
[4]: /logs/log_collection/
[5]: /security/threat_intelligence/#threat-intelligence-sources
[6]: /security/cloud_siem/threat_intelligence#bring-your-own-threat-intelligence
[7]: /security/cloud_siem/open_cybersecurity_schema_framework
