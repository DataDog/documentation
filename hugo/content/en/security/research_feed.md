---
title: Security Research Feed
description: "Understand the Datadog Security Research Feed, including the criteria for emerging vulnerabilities and threats, and use Bits Chat to investigate how they affect your environment."
---

The Datadog Security Research Feed provides continuously updated security-related content to help organizations stay ahead of emerging threats and vulnerabilities. Managed by Datadog's Security Research and Detection Engineering teams, the feed delivers timely insights into critical security developments, including:

- **Emerging vulnerabilities and threats**: Updates on newly discovered vulnerabilities and active attack campaigns that could impact your infrastructure. These updates help security teams assess detection coverage, identify affected systems, and determine potential impact.
- **New detection content**: The latest detections released by Datadog's Detection Engineering team, including new tactics, techniques, and procedures (TTPs), and supported detection packs.
- **Product updates**: Enhancements to Datadog's security capabilities that improve your ability to monitor and protect your environment.

{{< img src="security/security_research_feed.png" alt="The Security Research Feed displaying security updates, including blog posts, product updates, emerging vulnerabilities, and new detections" width="100%">}}

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

## Investigate emerging vulnerabilities and threats with Bits Chat

**Requirements:** The **Bits Chat Access** permission

The Security Research Feed can use [Bits Chat][1] to investigate how an emerging vulnerability or emerging threat affects your environment. Bits Chat reads the article and checks the data sources it lists, such as vulnerability findings, security signals, APM services, and container images, for affected resources. Bits Chat then summarizes which resources are affected and suggests remediation steps for them.

The {{< ui >}}Investigate with Bits{{< /ui >}} button is available only for Emerging Vulnerability and Emerging Threat articles.

To investigate an article with Bits Chat:

1. In the Security Research Feed, open an Emerging Vulnerability or Emerging Threat article.
2. In the {{< ui >}}Impact Assessment{{< /ui >}} section of the side panel, click {{< ui >}}Investigate with Bits{{< /ui >}}. Bits Chat opens a new conversation with the article attached as context. During the investigation, the button displays {{< ui >}}Bits is investigating…{{< /ui >}}.
3. Review the Bits Chat response. The response includes a coverage table that lists each data source Bits Chat checked, what it queried, and the result.

{{< img src="security/research_feed_investigate_with_bits.png" alt="A Security Research Feed article about an emerging PHP vulnerability open in the side panel, with the Investigate with Bits button in the Impact Assessment section" width="100%">}}

<div class="alert alert-info">Bits Chat bases its results only on data in Datadog. Resources that Datadog does not monitor, such as hosts without the Datadog Agent or services without APM, do not appear in the results. Review the results before you act on them.</div>

After you investigate an article, the side panel displays two buttons:

- {{< ui >}}View existing investigation{{< /ui >}}: Reopens the previous Bits Chat conversation for the article.
- {{< ui >}}Start a new investigation{{< /ui >}}: Starts a new Bits Chat conversation for the article.

Investigations run in Bits Chat and consume [AI Credits][2].

### Ask Bits Chat about a Security Research Feed article

When a Security Research Feed article is open, Bits Chat attaches the article as context automatically. To ask Bits Chat about the article, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> while the article is open in the side panel. This works for all article types.

[1]: /bits_ai/bits_chat/
[2]: /account_management/billing/ai_credits/
