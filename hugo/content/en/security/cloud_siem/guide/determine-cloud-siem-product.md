---
title: Determine the Cloud SIEM product your organization is using
description: Cloud SIEM is available in Standalone, Add-on with Flex Logs, and Legacy products. Follow this guide to determine which product your organization is using and compare the features available in each.
---

## Overview
Cloud SIEM is available as the following products:
- Standalone
- Add-on with Flex Logs
- Legacy

Standalone is the default product for new Cloud SIEM organizations. In Standalone:
- Usage is measured in gigabytes of analyzed logs, rather than in millions of analyzed events.
- Ingestion of logs indexed in the Cloud SIEM index is included in the analyzed log cost, rather than billed separately.
- Data is retained for 365 days (12 months), rather than for 15 months.

Organizations that adopted Standalone before gigabyte-based usage was introduced have a 15-month retention period. Both are referred to as Standalone in the documentation, because they provide the same features.

There are two ways to see which Cloud SIEM product your organization is using:
- [Check the Plan & Usage page](#plan-usage)
- [Check the Cloud SIEM settings page](#settings)

To compare what each product includes, see [Features by Cloud SIEM product](#features).

## Check the Plan & Usage page{#plan-usage}

<div class="alert alert-info">You may not be able to use this option if:
  <ul>
    <li>You don't have access to this page</li>
    <li>Your organization has multi-org configured; the Plan & Usage page is a roll-up of all sub-orgs, so you might see multiple Cloud SIEM product tiles</li>
  </ul>
  In either case, follow the instructions in the <a href="#settings">Check the Cloud SIEM settings page</a> section to determine which product your organization is using.
</div>

1. In Datadog, go to {{< ui >}}Plan & Usage{{< /ui >}} > [**Usage & Cost**][1] page.
1. Scroll to the **Usage Summary** section and click the {{< ui >}}Security{{< /ui >}} tab.
1. Find the tile that indicates which Cloud SIEM product your organization is using:
   <table>
     <thead>
       <tr>
         <th style="width:60%">Tile</th>
         <th style="width:40%">Product</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>Security Analyzed and Indexed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_security_analyzed_indexed_logs.png" alt="Tile labelled with 'Security Analyzed and Indexed Logs,' in addition to a usage amount, and indication of whether that usage was on-demand" width="50%">}}
         </td>
         <td>Standalone</td>
       </tr>
       <tr>
         <td><strong>Cloud SIEM - Analyzed Logs (Add-On)</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs_add_on.png" alt="Tile labelled with 'Cloud SIEM - Analyzed Logs (Add-On),' in addition to a usage amount, and indication of whether that usage was on-demand" width="50%">}}
         </td>
         <td>Add-on with Flex Logs</td>
       </tr>
       <tr>
         <td><strong>SIEM - Analyzed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs.png" alt="Tile labelled with 'SIEM - Analyzed Logs,' in addition to a usage amount, and indication of whether that usage was on-demand" width="50%">}}
         </td>
         <td>Legacy</td>
       </tr>
     </tbody>
   </table>

## Check the Cloud SIEM settings page{#settings}

In Datadog, go to the [Cloud SIEM settings][2] page. The page shows either a {{< ui >}}Core Configuration{{< /ui >}} or {{< ui >}}Settings{{< /ui >}} section, which indicates the Cloud SIEM product your organization is using.
<table>
  <thead>
    <tr>
      <th style="width:80%">Settings section</th>
      <th style="width:20%">Product</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Index Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_index.png" alt="Configuration settings including a Core Configuration heading, which contains an Index Configuration section" width="80%">}}
      </td>
      <td>Standalone</td>
    </tr>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Security Filters Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_security_filters.png" alt="Configuration settings including a Core Configuration heading, which contains an Index Configuration section" width="80%">}}
      </td>
      <td>Add-on with Flex Logs</td>
    </tr>
    <tr>
      <td><strong>Sources</strong> table<br />
        {{< img src="security/cloud_siem/guide/config_sources.png" alt="Configuration settings including a Sources table" width="80%">}}
      </td>
      <td>Legacy</td>
    </tr>
  </tbody>
</table>

## Features by Cloud SIEM product{#features}

The following table lists the Cloud SIEM features available in each product.

| Feature | Standalone | Add-on with Flex Logs | Legacy |
|---------|:----------:|:---------------------:|:------:|
| [Content Packs][4] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Editing default detection rules][5] | {{< X >}} | {{< X >}} | {{< X >}} |
| [MITRE ATT&CK Map][6] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Security Filters][7] | | {{< X >}} | {{< X >}} |
| [Log index filters][8] | {{< X >}} | | |
| [MITRE ATT&CK Map compact view][6] | {{< X >}} | {{< X >}} | |
| [Scheduled rules][9] | {{< X >}} | {{< X >}} | |
| [Sequence detections][10] | {{< X >}} | {{< X >}} | |
| [Historical jobs][11] | {{< X >}} | {{< X >}} | |
| [Risk Insights][12] | {{< X >}} | {{< X >}} | |
| [Critical Assets][13] | {{< X >}} | {{< X >}} | |
| [Open Cybersecurity Schema Framework (OCSF)][14] | {{< X >}} | {{< X >}} | |
| [Threat intelligence][15] | {{< X >}} | {{< X >}} | |

For help identifying your product, or to use a feature your product does not include, contact your Datadog account team or [Datadog support][3].

[1]: https://app.datadoghq.com/billing/usage
[2]: https://app.datadoghq.com/security/configuration/siem/setup
[3]: /help/
[4]: /security/cloud_siem/ingest_and_enrich/content_packs/
[5]: /security/detection_rules/
[6]: /security/cloud_siem/detect_and_monitor/mitre_attack_map/
[7]: /security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#how-security-filters-work
[8]: /security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#cloud-siem-standalone-filter-the-cloud-siem-index
[9]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
[10]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence/
[11]: /security/cloud_siem/detect_and_monitor/historical_jobs/
[12]: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[13]: /security/cloud_siem/detect_and_monitor/critical_assets/
[14]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[15]: /security/cloud_siem/ingest_and_enrich/threat_intelligence/