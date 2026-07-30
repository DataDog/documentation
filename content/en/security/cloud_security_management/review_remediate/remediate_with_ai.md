---
title: Remediate with AI
description: Turn a Cloud Security misconfiguration finding into a code fix with Bits Code, or copy a fix prompt into your own coding agent.
further_reading:
- link: "/security/cloud_security_management/code_locations/"
  tag: "Documentation"
  text: "Code Locations"
- link: "/bits_ai/bits_code/"
  tag: "Documentation"
  text: "Bits Code"
- link: "/bits_ai/bits_code/automations/"
  tag: "Documentation"
  text: "Create Bits Code Automations"
- link: "/security/cloud_security_management/review_remediate/workflows/"
  tag: "Documentation"
  text: "Automate remediation with Workflow Automation"
products:
  - name: Cloud Security Misconfigurations
    url: /security/cloud_security_management/misconfigurations/
    icon: cloud-security-management
---

{{< product-availability >}}

## Overview

A misconfiguration finding tells you what is wrong with a cloud resource. **Remediate with AI** turns that finding into a code change: Datadog builds a prompt that describes the finding, the affected resource, and the fix. Then, it either hands it off to [Bits Code][1] to open a pull request, or gives you the prompt to paste into your own coding agent.

{{< img src="security/csm/remediate_with_ai_button.png" alt="The Next Steps section of a finding side panel, showing a Remediate with AI button under Remediation" style="width:50%;" >}}

## Prerequisites

Copying a fix prompt for your own coding agent requires no setup. To have Bits Code generate the fix, you need:

- The **Bits Code Write** (`bits_dev_write`) permission in Datadog.
- Bits Code [set up][5] for your source control provider.

Bits Code resolves fixes most reliably when Datadog knows where the affected resource is defined in your code. See [Code Locations][6] for how that mapping is established.

Bits Code usage is billed through [AI Credits][7].

## Remediate a finding

1. Navigate to the [Misconfigurations findings][2] page.
2. Search for `@code_location.filename:*` to limit the results to findings with a resolved [code location][6]. The fix is generated from that code location, so start from one of these findings.
3. Select a finding to open its side panel.
4. Under **Next Steps** > **Remediation**, click **Remediate with AI**.
5. Do one of the following:
   - On the **Coding agent** tab, click **Copy**, then paste the prompt into the coding agent you already use. The prompt describes the finding and the change required, so the agent can make the fix in your repository.
   - On the **Bits Code** tab, click either button:
     - **Fix with Bits**: Bits Code starts a [session][3], locates the code that defines the resource, generates the fix, and opens a pull or merge request in your source control provider for review.
     - **Create Automation**: Bits Code fixes similar findings for you as they appear, without you opening each one. For more information, see [Bits Code Automations][4].

{{< img src="security/csm/remediate_with_ai_coding_agent.png" alt="The Remediate with AI dialog on the Coding agent tab, showing a Copy fix prompt option" style="width:100%;" >}}

{{< img src="security/csm/remediate_with_ai_bits_code.png" alt="The Remediate with AI dialog on the Bits Code tab, showing a Fix with Bits button and a Create Automation button" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_code/
[2]: https://app.datadoghq.com/security/csm/misconfigurations-and-attack-paths
[3]: /bits_ai/bits_code/#sessions
[4]: /bits_ai/bits_code/automations/
[5]: /bits_ai/bits_code/setup/
[6]: /security/cloud_security_management/code_locations/
[7]: /account_management/billing/ai_credits/
