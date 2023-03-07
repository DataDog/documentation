---
title: Getting Started with Cloud Security Management
kind: documentation
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Cloud Security Management"
- link: "/security/cspm/custom_rules/schema/"
  tag: "Documentation"
  text: "CSPM cloud resources schema"
- link: "https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/"
  tag: "Blog"
  text: "Automate end-to-end processes with Datadog Workflows"
- link: "https://securitylabs.datadoghq.com/"
  tag: "Check out Security Labs"
  text: "Security research, reports, tips, and videos from Datadog"
---

## Overview

[Datadog Cloud Security Management][1] (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure. Powered by observability data, security teams can determine the impact of a threat quickly by tracing the full attack flow and identify the resource owner where a vulnerability was triggered. Engineers are able to actively monitor their security risks by incorporating security metrics into their existing workflow.

Cloud Security Management includes [Cloud Security Posture Management (CSPM)][2] and [Cloud Workload Security (CWS)][3].

This guide walks you through best practices for getting your team up and running with CSM.

## Phase 1: Deployment

1. Configure the Datadog Agent to turn on CSM. If you have not already, install the [Datadog Agent (version 7.40 or above)][4]:
    - [Kubernetes][5], [Docker][6], and [host-based CWS][7] configuration instructions
    - [Kubernetes][8] and [Docker][9] CSPM configuration instructions
2. Configure your Cloud Resources to turn on CSM
    - [AWS][10], [Azure][11], and [GCP][12] CSPM configuration instructions
3. Check out the [CSM homepage][13] to get an overview of your organization's risks and threats
4. Review [500+ OOTB CWS and CSPM detection rules][14] 
5. Explore [Security Signals][15]
    - Review [CSPM Findings][16]
    - Set up [notification rules][17] to alert via Slack, Jira, Email, etc when meaningful signals are generate.

In your first three days with Datadog CSM:
## Phase 2: Fine tuning

1. Fine tune your CSM experience
    - Set up [CWS suppression rules][18] to reduce noise.
2. Create custom detection rules
    - [CSPM rules][19]
    - [CWS Agent rules][20]

## Phase 3: Reporting & Response

1. Assess your organization's posture by reviewing [compliance reports][21].
2. Utilize OOTB dashboards or [create your own][22] for faster investigations, reporting, and monitoring.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/
[2]: /security/cspm/
[3]: /security/cloud_workload_security/
[4]: https://app.datadoghq.com/account/settings#agent
[5]: /security/cloud_workload_security/setup/?tab=kubernetes
[6]: /security/cloud_workload_security/setup/?tab=docker
[7]: /security/cloud_workload_security/setup/?tab=hostothers
[8]: /security/cspm/setup?tab=kubernetes
[9]: /security/cspm/setup?tab=docker
[10]: /security/cspm/setup?tab=aws
[11]: /security/cspm/setup?tab=azure
[12]: /security/cspm/setup?tab=gcp
[13]: https://app.datadoghq.com/security/csm
[14]: /security/default_rules/#cat-cloud-security-management
[15]: /security/cspm/signals_explorer/
[16]: /security/cspm/findings/
[17]: /security/configuration/notification-rules
[18]: /security/cloud_security_management/guide/tuning-rules/
[19]: /security/cspm/custom_rules
[20]: /security/cloud_workload_security/agent_expressions
[21]: /security/cspm/frameworks_and_benchmarks
[22]: /dashboards/#overview