---
title: Packs
description: Learn more about Observability Pipelines Packs
disable_toc: false
private: true
cascade:
    private: true

further_reading:
  - link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
    tag: Blog
    text: Rehydrate archived logs in any SIEM or logging vendor with Observability Pipelines

---

## Overview

{{< img src="observability_pipelines/packs/packs.png" alt="The packs section of Observability Pipelines" style="width:100%;" >}}

When setting up a pipeline to send logs from a specific source to Observability Pipelines, you often need to decide how to process and manage those logs.

Questions such as the following might come up:

- Which logs from this source are important?
- Which logs can safely be dropped?
- Should repetitive logs be sampled?
- Which fields should be parsed or formatted for the destination?

Making these decisions typically requires coordination across multiple teams and detailed knowledge of each log source.

Observability Pipelines Packs provide predefined configurations to help you make these decisions quickly and consistently. Packs apply Datadog-recommended best practices for specific log sources such as Akamai, AWS CloudTrail, Cloudflare, Fastly, Palo Alto Firewall, and Zscaler.

### What Packs do

Each Pack includes source-specific configurations that defines:

- **Fields that can safely be removed** to reduce payload size
- **Logs that can be dropped**, such as duplicate events or health checks
- **Logs that should be retained or parsed**, such as errors or security detections
- **Formatting and normalization rules** to align logs across different destinations and environments

By using Packs, you can apply consistent parsing, filtering, and routing logic for each log source without creating configurations manually.

### Why use Packs

Packs help teams:

- **Reduce ingestion volume and costs** by filtering or sampling repetitive, low-value events
- **Maintain consistency** in parsing and field mapping across environments and destinations
- **Accelerate setup** by applying ready-to-use configurations for common sources

## Packs

These packs are available:

- [Abnormal.ai - Abuse Campaigns][4]
- [Abnormal.ai - Abuse Mailbox Messages Not Analyzed][5]
- [Abnormal.ai - Audit Logs][6]
- [Abnormal.ai - Threats][7]
- [Active Directory][8]
- [Akamai CDN][9]
- [AlphaSOC Findings][10]
- [Amazon Connect][11]
- [Amazon VPC Flow Logs][12]
- [Argo CD][13]
- [Auth0][14]
- [Aviatrix Controller API Audit][15]
- [Aviatrix FQDN Firewall][16]
- [Aviatrix Gateway Network Stats][17]
- [Aviatrix Gateway System Stats][18]
- [Aviatrix L4 Microsegmentation][19]
- [Aviatrix L7/TLS Inspection][20]
- [Aviatrix Suricata IDS/IPS][21]
- [Aviatrix Tunnel Status][22]
- [Aviatrix VPN Session][23]
- [AWS Application Load Balancer Logs][24]
- [AWS CloudFront][25]
- [AWS CloudTrail][26]
- [AWS CloudWatch Logs][27]
- [AWS Config][28]
- [AWS Elastic Load Balancer Logs][29]
- [AWS GuardDuty][30]
- [AWS Lambda][31]
- [AWS Network Load Balancer Logs][32]
- [AWS Route 53][33]
- [AWS Security Hub][34]
- [AWS WAF][35]
- [Azure NSG][36]
- [BlueCat DNS][37]
- [Check Point][38]
- [Cisco ACI][39]
- [Cisco ASA][40]
- [Cisco ASA - Google SecOps][41]
- [Cisco ASA - Microsoft Sentinel][42]
- [Cisco FTD][43]
- [Cisco IOS][44]
- [Cisco IOS Traceback][45]
- [Cisco Meraki][46]
- [Cisco Meraki - Microsoft Sentinel][47]
- [Cloudflare][48]
- [CrowdStrike FDR][49]
- [DNS Stream][50]
- [Exabeam - Cisco ASA][51]
- [Exabeam - CrowdStrike FDR][52]
- [Exabeam - Fortinet FortiGate][53]
- [Exabeam - Palo Alto][54]
- [Exabeam - SentinelOne Cloud Funnel][55]
- [Exabeam - Windows][56]
- [Exabeam - Zscaler][57]
- [ExtraHop][58]
- [ExtraHop - Microsoft Sentinel][59]
- [F5][60]
- [Fastly][61]
- [Fortinet - Microsoft Sentinel][62]
- [Fortinet Firewall][63]
- [GCP Firewall][64]
- [Google Cloud Audit][65]
- [Google SecOps - AWS VPC][66]
- [Google SecOps - Fortinet Firewall][67]
- [Google SecOps - Palo Alto Firewall][68]
- [Google SecOps - Windows Event Log][69]
- [HAProxy Ingress][70]
- [Infoblox][71]
- [Istio Proxy][72]
- [Juniper SRX Firewall Traffic Logs][73]
- [Kube Proxy][74]
- [Microsoft DNS][75]
- [MITRE ATT&CK AWS WAF Enrichment][76]
- [MITRE ATT&CK CloudTrail Enrichment][77]
- [MITRE ATT&CK FortiGate Enrichment][78]
- [MITRE ATT&CK Okta Enrichment][79]
- [MITRE ATT&CK Palo Alto Enrichment][80]
- [MITRE ATT&CK Windows Enrichment][81]
- [Netskope][82]
- [NGINX][83]
- [Okta][84]
- [OpenAI - Audit Logs][85]
- [OpenTelemetry Logs][86]
- [Orca Security][87]
- [Palo Alto Cortex][88]
- [Palo Alto Firewall][89]
- [Palo Alto Networks - Microsoft Sentinel][90]
- [Palo Alto Networks - XSIAM][91]
- [Proofpoint Email Security][92]
- [Qualys Detections][93]
- [SentinelOne Cloud Funnel EDR][94]
- [Syslog][95]
- [Windows DNS Log][96]
- [Windows Office 365][97]
- [Windows XML][98]
- [WinEventLog][99]
- [ZScaler ZIA DNS][100]
- [Zscaler ZIA Firewall][101]
- [Zscaler ZIA Tunnel][102]
- [Zscaler ZIA Web Logs][103]
- [Zscaler ZPA][104]

## Setup

To set up packs:

1. Navigate to the [Pipelines][1] page.
1. Click {{< ui >}}Packs{{< /ui >}}.
1. Click the pack you want to set up.
1. You can either create a new pipeline from the pack or add the pack to an existing pipelines.
    - If you clicked {{< ui >}}Add to New Pipeline{{< /ui >}}, in the new pipeline that was created:
        - Click the processor group that was added to see the individual processors that the pack added and edit them as needed. See [Processors][2] for more information.
        - See [Set Up Pipelines][3] for information on setting up the rest of the pipeline.
    - If you clicked {{< ui >}}Add to Existing Pipeline{{< /ui >}}:
        1. Select the pipeline you want to add the pack to.
        1. Click {{< ui >}}Add to Existing Pipeline{{< /ui >}}.
            1. The pack is added to the last processor group in your pipeline.
            1. Click on the group to review the individual processors and edit them as needed. See [Processors][2] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/set_up_pipelines/
[4]: /observability_pipelines/packs/abnormal_ai_abuse_campaigns/
[5]: /observability_pipelines/packs/abnormal_ai_abuse_mailbox_messages/
[6]: /observability_pipelines/packs/abnormal_ai_audit_logs/
[7]: /observability_pipelines/packs/abnormal_ai_threats/
[8]: /observability_pipelines/packs/active_directory/
[9]: /observability_pipelines/packs/akamai_cdn/
[10]: /observability_pipelines/packs/alphasoc_findings/
[11]: /observability_pipelines/packs/amazon_connect/
[12]: /observability_pipelines/packs/amazon_vpc_flow_logs/
[13]: /observability_pipelines/packs/argo_cd/
[14]: /observability_pipelines/packs/auth0/
[15]: /observability_pipelines/packs/aviatrix_controller_api_audit/
[16]: /observability_pipelines/packs/aviatrix_fqdn_firewall/
[17]: /observability_pipelines/packs/aviatrix_gateway_network_stats/
[18]: /observability_pipelines/packs/aviatrix_gateway_system_stats/
[19]: /observability_pipelines/packs/aviatrix_l4_microsegmentation/
[20]: /observability_pipelines/packs/aviatrix_l7_tls_inspection/
[21]: /observability_pipelines/packs/aviatrix_suricata_ids_ips/
[22]: /observability_pipelines/packs/aviatrix_tunnel_status/
[23]: /observability_pipelines/packs/aviatrix_vpn_session/
[24]: /observability_pipelines/packs/aws_alb/
[25]: /observability_pipelines/packs/amazon_cloudfront/
[26]: /observability_pipelines/packs/aws_cloudtrail/
[27]: /observability_pipelines/packs/aws_cloudwatch_logs/
[28]: /observability_pipelines/packs/aws_config/
[29]: /observability_pipelines/packs/aws_elb/
[30]: /observability_pipelines/packs/aws_guardduty/
[31]: /observability_pipelines/packs/aws_lambda/
[32]: /observability_pipelines/packs/aws_nlb/
[33]: /observability_pipelines/packs/aws_route_53/
[34]: /observability_pipelines/packs/aws_security_hub/
[35]: /observability_pipelines/packs/aws_waf/
[36]: /observability_pipelines/packs/azure_nsg/
[37]: /observability_pipelines/packs/bluecat_dns/
[38]: /observability_pipelines/packs/checkpoint/
[39]: /observability_pipelines/packs/cisco_aci/
[40]: /observability_pipelines/packs/cisco_asa/
[41]: /observability_pipelines/packs/cisco_asa_google_secops/
[42]: /observability_pipelines/packs/cisco_asa_microsoft_sentinel/
[43]: /observability_pipelines/packs/cisco_ftd/
[44]: /observability_pipelines/packs/cisco_ios/
[45]: /observability_pipelines/packs/cisco_ios_traceback/
[46]: /observability_pipelines/packs/cisco_meraki/
[47]: /observability_pipelines/packs/cisco_meraki_microsoft_sentinel/
[48]: /observability_pipelines/packs/cloudflare/
[49]: /observability_pipelines/packs/crowdstrike/
[50]: /observability_pipelines/packs/dns_stream/
[51]: /observability_pipelines/packs/exabeam_cisco_asa/
[52]: /observability_pipelines/packs/exabeam_crowdstrike_fdr/
[53]: /observability_pipelines/packs/exabeam_fortinet_fortigate/
[54]: /observability_pipelines/packs/exabeam_palo_alto/
[55]: /observability_pipelines/packs/exabeam_sentinelone_cloud_funnel/
[56]: /observability_pipelines/packs/exabeam_windows/
[57]: /observability_pipelines/packs/exabeam_zscaler/
[58]: /observability_pipelines/packs/extrahop/
[59]: /observability_pipelines/packs/extrahop_microsoft_sentinel/
[60]: /observability_pipelines/packs/f5/
[61]: /observability_pipelines/packs/fastly/
[62]: /observability_pipelines/packs/fortinet_microsoft_sentinel/
[63]: /observability_pipelines/packs/fortinet_firewall/
[64]: /observability_pipelines/packs/gcp_firewall/
[65]: /observability_pipelines/packs/google_cloud_audit/
[66]: /observability_pipelines/packs/google_secops_aws_vpc/
[67]: /observability_pipelines/packs/google_secops_fortinet_firewall/
[68]: /observability_pipelines/packs/google_secops_palo_alto_firewall/
[69]: /observability_pipelines/packs/google_secops_windows_event_log/
[70]: /observability_pipelines/packs/haproxy_ingress/
[71]: /observability_pipelines/packs/infoblox/
[72]: /observability_pipelines/packs/istio_proxy/
[73]: /observability_pipelines/packs/juniper_srx_traffic/
[74]: /observability_pipelines/packs/kube_proxy/
[75]: /observability_pipelines/packs/microsoft_dns/
[76]: /observability_pipelines/packs/mitre_attack_aws_waf_enrichment/
[77]: /observability_pipelines/packs/mitre_attack_cloudtrail_enrichment/
[78]: /observability_pipelines/packs/mitre_attack_fortigate_enrichment/
[79]: /observability_pipelines/packs/mitre_attack_okta_enrichment/
[80]: /observability_pipelines/packs/mitre_attack_palo_alto_enrichment/
[81]: /observability_pipelines/packs/mitre_attack_windows_enrichment/
[82]: /observability_pipelines/packs/netskope/
[83]: /observability_pipelines/packs/nginx/
[84]: /observability_pipelines/packs/okta/
[85]: /observability_pipelines/packs/openai_audit_logs/
[86]: /observability_pipelines/packs/opentelemetry_logs/
[87]: /observability_pipelines/packs/orca_security/
[88]: /observability_pipelines/packs/palo_alto_cortex/
[89]: /observability_pipelines/packs/palo_alto_firewall/
[90]: /observability_pipelines/packs/palo_alto_microsoft_sentinel/
[91]: /observability_pipelines/packs/palo_alto_xsiam/
[92]: /observability_pipelines/packs/proofpoint_email_security/
[93]: /observability_pipelines/packs/qualys_detections/
[94]: /observability_pipelines/packs/sentinel_one/
[95]: /observability_pipelines/packs/syslog/
[96]: /observability_pipelines/packs/windows_dns_log/
[97]: /observability_pipelines/packs/windows_office_365/
[98]: /observability_pipelines/packs/windows_xml/
[99]: /observability_pipelines/packs/wineventlog/
[100]: /observability_pipelines/packs/zscaler_zia_dns/
[101]: /observability_pipelines/packs/zscaler_zia_firewall/
[102]: /observability_pipelines/packs/zscaler_zia_tunnel/
[103]: /observability_pipelines/packs/zscaler_zia_web_logs/
[104]: /observability_pipelines/packs/zscaler_zpa/
