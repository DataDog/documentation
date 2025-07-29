---
title: Cloud SIEM
aliases:
  - /security_monitoring/
  - /security_platform/cloud_siem/security_home/
  - /security_platform/cloud_siem/
  - /security/cloud_siem/security_home/
further_reading:
- link: "https://www.datadoghq.com/blog/track-issues-datadog-case-management/"
  tag: "Blog"
  text: "Proactively track, triage, and assign issues with Datadog Case Management"
- link: "https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/"
  tag: "Blog"
  text: "Automate common security tasks and stay ahead of threats with Datadog Workflows and Cloud SIEM"
- link: "https://www.datadoghq.com/blog/soar/"
  tag: "Blog"
  text: "Automate identity protection, threat containment, and threat intelligence with Datadog SOAR workflows"
- link: "https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/"
  tag: "Blog"
  text: "Build compliance, governance, and transparency across your teams with Datadog Audit Trail"
- link: "https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/"
  tag: "Blog"
  text: "AWS threat emulation and detection validation with Stratus Red Team and Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
  tag: "Blog"
  text: "Monitor 1Password with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/"
  tag: "Blog"
  text: "Build sufficient security coverage for your cloud environment"
- link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
  tag: "Blog"
  text: "Monitor DNS logs for network and security analysis"
- link: "https://www.datadoghq.com/blog/akamai-zero-trust-application-security/"
  tag: "Blog"
  text: "Monitor Akamai Zero Trust and Application Security with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/microsoft-365-detections/"
  tag: "Blog"
  text: "How attackers take advantage of Microsoft 365 services"
- link: "https://www.datadoghq.com/blog/monitor-security-metrics/"
  tag: "Blog"
  text: "Monitor your organization's security posture with Datadog"
- link: "https://www.datadoghq.com/blog/risky-behavior-cloud-environments/"
  tag: "Blog"
  text: "Identify risky behavior in cloud environments"
- link: "https://www.datadoghq.com/blog/detect-phishing-activity-amazon-ses/"
  tag: "Blog"
  text: "Amazon SES monitoring: Detect phishing campaigns in the cloud"
- link: "https://www.datadoghq.com/blog/detection-as-code-cloud-siem/"
  tag: "Blog"
  text: "Build, test, and scale detections as code with Datadog Cloud SIEM"
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Learn how Datadog Cloud SIEM and Cloud Security elevate your organization's threat detection and investigation for dynamic, cloud-scale environments.
{{< /learning-center-callout >}}

## Overview

{{< img src="05_security_overview.png" alt="The Cloud SIEM home page showing the Security Overview module with KPIs for signals by severity, a sankey graph for understanding signal activity across severity, sources, and resolution status, and mean time to respond (MTTR) metrics" >}}

Datadog Cloud SIEM (Security Information and Event Management) is a security data analysis and correlation system that your entire security operations team can use to view, detect, investigate, and respond to security issues. Cloud SIEM is built for cloud environments and uses Datadog's platform to scale to the highest log volumes. And while Cloud SIEM is built for cloud scale, it can also detect threats in hybrid environments, where the Datadog Agent is installed on-premises and in the cloud.

Ready to see how Cloud SIEM empowers your security engineering practice? Start your [free 14‑day trial][1] today and experience threat hunting with unmatched speed and precision—wherever your data lives.


### Run your program at Cloud scale

*Security + Observability*
In cloud-scale environments, effective security response requires speed, context, insight, and automation. As the leader in observability solutions, only Datadog can deliver a successful end-to-end solution.

Datadog uses a unified agent that collects telemetry across both cloud and on-premises systems—eliminating blind spots and reducing operational overhead.

Cloud SIEM embeds that telemetry directly into security workflows to accelerate investigation and response.

And with a shared platform that brings DevOps and Security teams together, organizations can break down silos and respond to threats more collaboratively and efficiently.

*Datadog Security Labs*
As a leader in cloud observability, Datadog is uniquely positioned to detect and understand threats that exploit cloud and hybrid environments.

Our [Security Labs][2] team—composed of over 40 dedicated threat researchers—analyzes petabytes of telemetry across cloud and on-prem systems to surface emerging threats and attacker behaviors.

This timeline highlights just a few of their recent investigations—ranging from cloud misconfigurations and malware campaigns to nation-state activity and software supply chain risks.

*Flexible Cost Control*
As organizations scale, controlling observability costs without compromising visibility is critical.

Datadog has invested heavily in these areas to offer a range of flexible, enterprise-grade cost control options.

*User Experience*
Datadog brings its product-first philosophy to the security domain, delivering a user experience that's fast, intuitive, and built for scale.

With Content Packs, customers can accelerate onboarding and detection without heavy configuration.

Dashboards are pre-built for actionable insights, and cloud context is automatically embedded in every security signal—ensuring investigations are both informed and efficient.

And with a powerful yet approachable log query language, teams can pivot, correlate, and investigate without writing complex code.

### Cloud SIEM Overview Page

The Cloud SIEM Overview is the dashboard to run your Security Ops program. It surfaces key security insights and lets you act on common workflows for security analysts, security and detection engineers, and SOC managers. On one page you can:

- Access important signals, open cases, and high-risk entities
- Complete onboarding tasks and review content‑pack health
- View and investigate top signals by geography or ISP
- Analyze signals and rules by MITRE ATT&CK tactics
- Track detection performance (MTTD, false‑positive rates)
- Read the latest [Security Labs][2] research and release notes

Customize your view via the Customize Page button to reorder or hide modules.

Learn more about each of the sections below

#### Security Coverage

Remain aware of any data processing issues or coverage gaps.

*Enabled Content Packs and Integrations*
View enabled content packs and integrations across the critical categories for providing comprehensive security coverage. Hover over each section to learn which content packs are enabled in each category.

*Content Pack and Logs Health KPIs*
See whether any content packs or integrations are in warning or broken states so that you can quickly resolve any coverage gaps. Click the KPIs to view the affected Content Packs.

*Logs Analyzed by Cloud SIEM*
View logging trends across your top log sources and quickly identify any unusual spikes or drops. Click on the legend at the bottom to explore trends on a per source basis.

#### Important Signals and Cases

What is most important that is happening in your environment right now.

*Recent Open Signals Grouped By Rule*
Signals, grouped by rule name and sorted by severity give you a quick overview of the most important signals in your environment. Click on the rows or on the severity pills to jump to a filtered view in the Signal Explorer for more details.

*Recent Open Security Cases*
Case Management is used for signals of interest that require additional analysis. View the current security cases in your environment and click on a row to dig into more detail on an individual case.

#### Risk Insights

Review the risky entities in your environment.

*Top Risky Entities*
Shows which entities have the highest risk scores at this time. Includes risk score, entity name, entity type, last risk score update timestamp, and risk score change. Click on the entity to view more detail and take action.

*Entity Type Breakdown*
Shows which types of entities are most common in your environment. Click to view a list of entities filtered by that type.

*Entities risk score breakdown*
A view of entities by severity. Click to view the entities explorer with a filtered view of entities by severity.

#### Threat Map

Get insights from where the signals in your environment are getting generated

*Top IPs by Country Distribution*
Shows which IPs are generating the most signals with a breakdown of important and less important signals. Also, use the map to drill in and see a filtered list of signals by country.

*Signals by Country*
See the proportional breakdown of where signals are being generated from. Click on the wedges to drill in by country and state/province. Spot signals being generated from unexpected countries.

*Signals by ISP Provider*
Review from which ISPs signals are coming. Drill in by provider and location.

#### Security Overview

A high-level overview of all signals

*Signal Distribution*
On the left side are a collection of KPIs showing signals by severity and trend over the selected time window.

On the right is a graph allowing users to see a break down of signal activity by severity, source, and resolution. Click on any area to drill into a filtered view of the signal explorer.

*Mean Time to Respond to Signals*

Displays KPIs showing how quickly your team responds - sets a signal to "under review" or "archive" – by signal severity.

#### MITRE ATT&CK Coverage

Detection rule coverage and signal activity by [MITRE ATT&CK][3] tactics and techniques.

*Techniques with at least 1 rule*
shows how many techniques are covered by the  detection rules currently enabled in your environment.

*Rule Density KPIs*
KPIs showing how many techniques have high, medium, or low density or no rules at all. Click to view a filtered MITRE map.

*Signals per Tactic*
View which MITRE ATT&CK tactics are generating signals. Click to view the signal explorer filtered by tactic. Use the toggle to show which tactics have the most rules mapped to it. When viewing by rule, clicking will create a filtered detection rule explorer view by that tactic.

*Signals per Technique*
View which MITRE ATT&CK techniques are generating signals. Click to view the signal explorer filtered by technique. Use the toggle to show which techniques have the most rules mapped to it. When viewing by rule, clicking will create a filtered detection rule explorer view by that technique.

#### Detection Rules Performance

Gain a deeper understanding of detection rule performance. This section works best if you triage signals in Cloud SIEM.

*MTTD KPIs for Cloud SIEM*
KPI for Mean Time to Detect (MTTD) across all signals. The KPIs below show MTTD for critical, high, and medium signals.

*Signal Activity*
View signal trends over the selected time window. Click the filters at the bottom to drill in by severity. Useful for identifying unusual spikes or drops.

*Rules by Important Signal Change (1 week)*
Shows which rules have increased important signal activity compared to the week prior. Clicking takes you to a filtered view of the signal explorer by that rule name.

*Signals by severity change (1 week)*
View how the severities across all signals have changed compared to the week prior. Click to view a filtered view of the signal explorer by that severity.

*Important Signals by Archived Reason*
See how many signals were archived by each of the archive reasons. Click to view the Signal Explorer filtered by that archive reason.

*Rules Archived with True Positive: Malicious*
Highlights which rules were archived as "True Positive: Malicious". Click to view the signals in the signal explorer.

*Rules Archived with True Positive: Benign*
Highlights which rules were archived as "True Positive: Benign". Click to view the signals in the signal explorer.

*Rules by False Positive Rate*
Shows which rules are the noisiest by calculating the percentage of signals that are marked False Positive out of all the signals generated by a rule. Click to view a filtered view of the signal explorer by that rule.

#### Dive Deeper

*Documentation*
Access to our documentation

*Release Notes*
Shows release notes for Cloud SIEM features released in the last three months.

*Research Feed*
Shows the latest Cloud SIEM-related research from Datadog Security labs.


## Get started

{{< whatsnext desc="See the following documents to get started with Cloud SIEM:" >}}
  {{< nextlink href="/getting_started/cloud_siem/">}}Getting started with Cloud SIEM guide{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/">}}Configure AWS for Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/">}}Configure Google Cloud for Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/">}}Configure Azure for Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/integrations/">}}Search for specific integrations to set up log collection for them{{< /nextlink >}}
  {{< nextlink href="/security/default_rules#cat-cloud-siem-log-detection">}}Start using out-of-the-box Cloud SIEM detection rules{{< /nextlink >}}
  {{< nextlink href="/security/detection_rules">}}Create your own custom detection rules{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product/cloud-siem/
[2]: https://securitylabs.datadoghq.com/
[3]: https://attack.mitre.org/
