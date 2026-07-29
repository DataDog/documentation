---
title: Remediate with AI
further_reading:
- link: "/security/cloud_security_management/code_locations/"
  tag: "Documentation"
  text: "Code Locations"
- link: "/bits_ai/bits_code/"
  tag: "Documentation"
  text: "Bits Code"
- link: "/bits_ai/bits_code/automations/"
  tag: "Documentation"
  text: "Create Bits Code automations"
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

A misconfiguration finding tells you what is wrong with a cloud resource. **Remediate with AI** turns that finding into a code change: Datadog builds a prompt that describes the finding, the affected resource, and the fix, then either hands it to [Bits Code][1] to open a pull request, or gives you the prompt to paste into your own coding agent.

{{< img src="security/csm/remediate_with_ai_button.png" alt="The Next Steps section of a finding side panel, showing a Remediate with AI button under Remediation" style="width:70%;" >}}

## Remediate a finding

1. Navigate to the [Misconfigurations findings][2] page.
2. Select a finding to open its side panel.
3. Under **Next Steps** > **Remediation**, click **Remediate with AI**.
4. Choose **Bits Code** to have Datadog generate the fix, or **Coding agent** to copy the prompt and run it yourself.

### Fix with Bits Code

On the **Bits Code** tab, click **Fix with Bits**. Bits Code starts a [session][3], locates the code that defines the resource, generates the fix, and opens a pull or merge request in your source control provider for review.

{{< img src="security/csm/remediate_with_ai_bits_code.png" alt="The Remediate with AI dialog on the Bits Code tab, showing a Fix with Bits button and a Create Automation button" style="width:100%;" >}}

To apply the same fix to future findings without opening each one, click **Create Automation**. For more information, see [Bits Code automations][4].

### Copy the prompt for your own coding agent

On the **Coding agent** tab, click **Copy** to copy the fix prompt to your clipboard, then paste it into the coding agent you already use. The prompt describes the finding and the change required, so the agent can make the fix in your repository.

{{< img src="security/csm/remediate_with_ai_coding_agent.png" alt="The Remediate with AI dialog on the Coding agent tab, showing a Copy fix prompt option" style="width:100%;" >}}

## Prerequisites

To fix a finding with Bits Code, you need:

- The **Bits Code Write** (`bits_dev_write`) permission in Datadog.
- Bits Code [set up][5] for your source control provider.

Copying the prompt for your own coding agent has no Bits Code prerequisites.

Bits Code resolves fixes most reliably when Datadog knows where the affected resource is defined in your code. See [Code Locations][6] for how that mapping is established.

Bits Code usage is billed through [AI Credits][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_code/
[2]: /security/cloud_security_management/misconfigurations/findings/
[3]: /bits_ai/bits_code/#sessions
[4]: /bits_ai/bits_code/automations/
[5]: /bits_ai/bits_code/setup/
[6]: /security/cloud_security_management/code_locations/
[7]: /account_management/billing/ai_credits/
