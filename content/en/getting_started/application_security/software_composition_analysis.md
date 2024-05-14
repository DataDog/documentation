---
title: Getting Started with Software Composition Analysis
kind: documentation
aliases:
- /getting_started/application_security/vulnerability_management
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-software-composition-analysis/"
  tag: "Blog"
  text: "Mitigate vulnerabilities from third-party libraries with Datadog Software Composition Analysis"
- link: "/code_analysis/software_composition_analysis/"
  tag: "Documentation"
  text: "Read more about Software Composition Analysis in source code"
- link: "/security/application_security/software_composition_analysis"
  tag: "Documentation"
  text: "Read more about Software Composition Analysis in ASM libraries"
- link: "/security/application_security/how-appsec-works"
  tag: "Documentation"
  text: "How Application Security Management works"
- link: "/security/application_security/getting_started"
  tag: "Documentation"
  text: "Enabling ASM"
- link: "https://securitylabs.datadoghq.com/"
  tag: "Security Labs"
  text: "Security research, reports, tips, and videos from Datadog"
---


## Overview

Datadog [Software Composition Analysis][1] (SCA) continuously monitors your production environment for vulnerabilities in the open source libraries your applications rely on. You can identify and prioritize the remediation of the highest vulnerabilities by business impact.

This guide walks you through best practices for getting your team up and running with SCA.

## Phase 1: Enable
1. Check [ASM Compatibility][2] to see if your service is supported.
2. Enable Software Composition Analysis on your services. 
   - Navigate to the [Quick Start Guide][4].
   - Expand **Enable Vulnerability Detection**.
   - Click **Start Activation**.
   - Choose services to secure with ASM.

   OR
   
   - Navigate to the [Setup][9] page.
   - To enable Software Composition Analysis for static analysis in source code, in **Software Composition Analysis**, click **Get Started**.
     - In **SCA static analysis in source code**, click **See Instructions**.
     - In **SCA runtime analysis in running services**, click **Select Services**.

## Phase 2: Identify
1. **Identify Vulnerabilities**: Navigate to [Vulnerabilities][5].  
   - Sort by `Status`, `Vulnerability Source`, and `Severity`.
   - To switch to the code repository commit point of view, click on the **static** button. To switch to the real-time point of view to the applications already running, click on the **runtime** button.

   {{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities_2.png" alt="Software Composition Analysis (SCA) explorer page showing vulnerabilities sorted by static or runtime." style="width:100%;" >}}

   Each vulnerability has its own status to help prioritize and manage findings:

   | Status         | Description                                                                                   |
   | -------------- | ----------------------------------------------------------------------------------------------| 
   |  Open          |  The vulnerability has been detected by Datadog.                                              |
   |  In Progress   |  A user has marked the vulnerability as In Progress, but Datadog still detects it.            |
   |  Muted         |  A user has ignored the vulnerability, making it no longer visible on the Open list, but Datadog still detects it. |
   |  Remediated    |  A user has marked the vulnerability as resolved, but Datadog still sees the vulnerability.   |
   |  Auto-Closed   |  The vulnerability is no longer detected by Datadog.                                          |                              

   **Note**: Remediated and Auto-Closed vulnerabilities re-open if the vulnerability is detected again by Datadog.

3. View additional details by clicking on the vulnerability. This opens a panel which includes information about:
    - Which services are affected.
    - The date on which the vulnerability was last detected.
    - A description of the vulnerability.
    - Recommended remediation steps.
    - Vulnerability score. </br> </br>

      {{< img src="getting_started/appsec/appsec-vuln-explorer_3.png" alt="Application Vulnerability Management detailed view of the vulnerability." style="width:100%;" >}}

      **Note**: The severity of a vulnerability within SCA is modified from the base score to take into account the presence of attacks and the business sensitivity of the environment where the vulnerability is detected. For example, if no production environment is detected, the severity is reduced.</br> </br>

      The adjusted vulnerability score includes the full context of each service:
        - The original vulnerability severity.
        - Evidence of suspicious requests.
        - Sensitive or internet-exposed environments.

      Severities are scored by the following:
      | CVSS Score    | Qualitative Rating
      | --------------| -------------------|  
      |   `0.0`         | None                |
      |   `0.1 - 3.9`   | Low                 |
      |   `4.0 - 6.9`   | Medium              |
      |   `7.0 – 8.9`   | High                |
      |   `9.0 – 10.0`  | Critical            |

4. Optionally, download the library inventory (list of libraries and versions in CycloneDX format) for your service. While viewing the details of a vulnerability, click on [View in Service Catalog][6]. From here you can navigate to the [Security view][7] of your service, and download the library inventory under the [libraries tab][8]. 

## Phase 3: Remediate
1. **Prioritize Response and Remediate**: While on the [Vulnerability Explorer][5], take action:

    - Change the status of a vulnerability.
    - Assign it to a team member for further review.
    - Create a Jira issue. To create Jira issues for SCA vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][11] documentation, as well as the [Role Based Access Control][10] documentation.
    - Review recommended remediation steps.
    - View links and information sources to understand the context behind each vulnerability.

   **Note**: Adding an assignee to the vulnerability does not generate a notification regarding the assignment. This action only lists their name as an annotation of the vulnerability.

   {{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Application Vulnerability Management recommended remediation steps of the vulnerability." style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/vulnerability_management/
[2]: /security/application_security/enabling/compatibility/
[3]: /security/application_security/enabling/
[4]: https://app.datadoghq.com/security/configuration/asm/onboarding
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: https://app.datadoghq.com/services
[7]: /tracing/service_catalog/#security-view
[8]: /tracing/service_catalog/#investigate-a-service
[9]: https://app.datadoghq.com/security/configuration/asm/setup
[10]: /account_management/rbac/permissions/#integrations
[11]: /integrations/jira/
