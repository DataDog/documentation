---
title: Security Research Feed
description: "Understand the Datadog Security Research Feed and the criteria for emerging vulnerabilities and threats, and assess exposure to them in your environment, including with Bits Chat."
---

The Datadog Security Research Feed provides continuously updated security-related content to help organizations stay ahead of emerging threats and vulnerabilities. Managed by Datadog's Security Research and Detection Engineering teams, the feed delivers timely insights into critical security developments, including:

- **Emerging vulnerabilities and threats**: Updates on newly discovered vulnerabilities and active attack campaigns that could impact your infrastructure. These updates help security teams assess detection coverage, identify affected systems, and determine potential impact.
- **New detection content**: The latest detections released by Datadog's Detection Engineering team, including new tactics, techniques, and procedures (TTPs), and supported detection packs.
- **Product updates**: Enhancements to Datadog's security capabilities that improve your ability to monitor and protect your environment.

{{< img src="security/security_research_feed.png" alt="The Security Research Feed displaying security updates, including blog posts, product updates, emerging vulnerabilities, and new detections" width="100%">}}

<div class="alert alert-tip">While a Security Research Feed article is open in the side panel, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> to ask Bits Chat about the article. Bits Chat attaches the article as context automatically, for every article type. Bits Chat conversations consume <a href="/account_management/billing/ai_credits/">AI Credits</a> and require the <strong>Bits Chat Access</strong> permission.</div>

## How it works

The Security Research and Detection Engineering teams continuously monitor the threat landscape and publish updates as soon as new threats emerge. This ensures security professionals have access to:

- Expert analysis on the latest security trends.
- Contextual information to assess the impact of a vulnerability or threat.
- Guidance on implementing effective detection and response strategies.

## Criteria for emerging vulnerabilities

An emerging vulnerability is a security weakness in a technology that significantly threatens business operations and is defined by one or more of the following criteria:

- **Widespread impact**: The vulnerability affects a large number of systems or organizations, creating a broad attack surface.
- **High severity**: Its exploitability and potential damage make it an immediate security concern.
- **Significant visibility**: The issue is widely discussed in security communities and mainstream news, increasing awareness and urgency.

## Criteria for emerging threats

An emerging threat is a new or evolving attack campaign or supply-chain attack that has disrupted or poses a significant threat to business operations. It is defined by one or more of the following criteria:

- **Widespread impact**: The threat has already affected a large number of systems or organizations, either through broad, opportunistic attacks, or targeted campaigns.
- **Imminent threat**: The threat has already caused impact or is expected to escalate, with near-term attacks likely to affect many organizations.
- **Significant visibility**: The issue is widely discussed in security communities and mainstream news, increasing awareness and urgency.

## Assess exposure to an emerging vulnerability or threat

Emerging articles in the Security Research Feed combine analysis, matches in your environment, and remediation guidance, so you can assess exposure from one place.

1. In {{< ui >}}Security{{< /ui >}} > {{< ui >}}Research Feed{{< /ui >}}, in the {{< ui >}}Article type{{< /ui >}} filter, select {{< ui >}}Emerging Vulns & Threats{{< /ui >}}. The feed shows both emerging vulnerabilities and emerging threats.
1. Open the article for the vulnerability or threat. Each article includes:
   - A description of the vulnerability or threat.
   - An {{< ui >}}Impact Assessment{{< /ui >}} section with matches in your environment.
   - Remediation guidance.

   Most articles also include steps to find affected resources with Datadog.

### Investigate emerging vulnerabilities and threats with Bits Chat

Bits Chat checks every data source an emerging vulnerability or emerging threat article lists, so you can find affected resources without querying each source yourself.

The data sources Bits checks include vulnerability findings, security signals, APM services, and container images. Bits Chat results include only data in Datadog. Resources that Datadog doesn't monitor, such as hosts without the Datadog Agent or services without APM, don't appear in the results. 

After the investigation, Bits Chat summarizes the affected resources and suggests remediation steps. Review the results before you act on them.

Investigations run in [Bits Chat][1] and consume [AI Credits][2].

You must have the **Bits Chat Access** permission to complete this task.

1. Open an emerging vulnerability or emerging threat article. Other article types don't support investigations.
1. In the {{< ui >}}Impact Assessment{{< /ui >}} section, click {{< ui >}}Investigate with Bits{{< /ui >}}. Bits Chat opens a new conversation with the article attached as context.
1. Review the Bits Chat response. The response includes a coverage table that lists each data source Bits Chat checked, the Bits Chat query for each data source, and the result.

{{< img src="security/research_feed_investigate_with_bits.png" alt="A Security Research Feed article about an emerging PHP vulnerability open in the side panel, with the Investigate with Bits button in the Impact Assessment section" width="100%">}}

[1]: /bits_ai/bits_chat/
[2]: /account_management/billing/ai_credits/
