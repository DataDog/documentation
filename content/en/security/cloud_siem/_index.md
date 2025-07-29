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

Datadog Cloud SIEM (Security Information and Event Management) is a security data analysis and correlation system that your entire security operations team can use to view, detect, investigate, and respond to security issues. Cloud SIEM is built for cloud environments and uses Datadog's platform to scale to the highest log volumes. And while Cloud SIEM is built for cloud scale, it can also detect threats in hybrid environments, where the Datadog Agent is installed on-premises and in the cloud.

In cloud-scale environments, effective security response demands speed, context, insight, and automation. Datadog helps you meet that need by collecting telemetry across cloud and on-premises systems using the Datadog Agent and API-based integrations. Cloud SIEM continuously analyzes this data, detecting threats in real time and generating security signals. These signals are enriched and correlated with numerous sources, empowering security teams to quickly understand what is happening and take action.

To keep your team on top of the latest attacks Datadog also has a team of threat researchers who analyze petabytes of telemetry across cloud and on-premises systems to identify emerging threats and attacker behaviors. See [Datadog Security Labs][1] to read articles about their recent investigations.

## Get started

If you don't already have a Datadog account, sign up for a [free trial][2]. After you log in to your Datadog account:

1. Navigate to [Cloud SIEM][3].
1. Click **Enable Cloud SIEM**.
1. Follow the onboarding steps.

See the [Getting Started Guide][4] for more detailed setup instructions.

## Key features

TKTK


## Cloud SIEM Overview Page

Navigate to the [Cloud SIEM Overview dashboard][2]. Use this dashboard to see key security insights and act on common workflows for security analysts, security and detection engineers, and Security Operations Center (SOC) managers. From the Overview page, you can:
- Access important signals, open cases, and high-risk entities.
- Complete onboarding tasks and review content‑pack health.
- View and investigate top signals by geography or ISP.
- Analyze signals and rules by MITRE ATT&CK tactics.
- Track detection performance (MTTD, false‑positive rates).
- Read the latest [Security Labs][1] research and release notes.

Click **Customize Page** to reorder or hide modules so you can see what is important to you.

Learn more below about each section of the Overview page.

### Security coverage

{{< img src="security/security_monitoring/landing/01_security_coverage.png" alt="Security coverage sections showing 11 active and 1 broken content packs and a bar graph of logs analyzed by Cloud SIEM" style="width:100%;" >}}

Remain aware of any data processing issues or coverage gaps.

- *Enabled Content Packs and Integrations:* View enabled content packs and integrations across the critical categories for providing comprehensive security coverage. Hover over each section of the horizontal bar to see which content packs are enabled in each category.
- *Content Pack and Logs Health KPIs:* See whether any content packs or integrations are in warning or broken states so that you can quickly resolve any coverage gaps. Click the KPIs to view the affected content packs.
- *Logs Analyzed by Cloud SIEM:* View logging trends across your top log sources and quickly identify any unusual spikes or drops. Click on the legend at the bottom to explore trends on a per source basis.

### Important signals and cases

{{< img src="security/security_monitoring/landing/02_important_signals_cases.png" alt="" style="width:100%;" >}}

See important events happening in your environment, such as:

- *Recent Open Signals Grouped By Rule:* Signals that are grouped by rule name and sorted by severity give you a quick overview of the most important signals in your environment. Click on the rows or on the severity pills to jump to a filtered view in the Signal Explorer for more details.
- *Recent Open Security Cases:* Use [Case Management][5] for signals of interest that require additional analysis. View the current security cases in your environment and click on a row to see more details about the case.

### Risk insights

{{< img src="security/security_monitoring/landing/03_risk_insights.png" alt="" style="width:100%;" >}}

Review the risky entities in your environment.

- *Top Risky Entities:* Shows which entities have the highest risk scores at this time, and includes risk score, entity name, entity type, last risk score update timestamp, and risk score change. Click on an entity to view more details and take action.
- *Entity Type Breakdown:* Shows which types of entities are most common in your environment. Click to view a list of entities filtered by that type.
- *Entities risk score breakdown:* View entities by severity. Click to view the entities explorer with a filtered view of entities by severity.

### Threat map

{{< img src="security/security_monitoring/landing/04_threat_map.png" alt="" style="width:100%;" >}}

Get insights from where the signals in your environment are getting generated.

- *Top IPs by Country Distribution:* See which IPs are generating the most signals with a breakdown of important and less important signals. Also, use the map to see a list of signals by country.
- *Signals by Country:* See the proportional breakdown from where signals are being generated. Click on the wedges to see signals by country and state/province, and spot signals being generated from unexpected countries.
- *Signals by ISP Provider:* Review from which ISPs the signals are coming. Drill in by provider and location.

### Security overview

{{< img src="security/security_monitoring/landing/05_security_overview.png" alt="" style="width:100%;" >}}

A high-level overview of all signals.
- *Signal Distribution:* On the left side of the page are a collection of KPIs showing signals by severity and trend over the selected time window.
On the right is a graph allowing users to see a break down of signal activity by severity, source, and resolution. Click on any area to drill into a filtered view of the signal explorer.
- *Mean Time to Respond to Signals:* Displays KPIs showing how quickly your team responds. Sets a signal to `under review` or `archive` by signal severity.

### MITRE ATT&CK coverage

{{< img src="security/security_monitoring/landing/06_mitre_coverage.png" alt="" style="width:100%;" >}}

Detection rule coverage and signal activity by MITRE ATT&CK tactics and techniques.

- *Techniques with at least 1 rule:* See how many techniques are covered by the detection rules currently enabled in your environment.
- *Rule Density KPIs*: See how many techniques have high, medium, or low density or no rules at all. Click to view a filtered MITRE map.
- *Signals per Tactic View:* See which MITRE ATT&CK tactics are generating signals. Click to view the signal explorer filtered by tactic. Use the toggle to show which tactics have the most rules mapped to it. When viewing by rule, clicking will create a filtered detection rule explorer view by that tactic.
- *Signals per Technique View:* See which MITRE ATT&CK techniques are generating signals. Click to view the signal explorer filtered by technique. Use the toggle to show which techniques have the most rules mapped to it. When viewing by rule, clicking will create a filtered detection rule explorer view by that technique.

### Detection rules performance

{{< img src="security/security_monitoring/landing/07_detection_rule_performance.png" alt="" style="width:100%;" >}}

Gain a deeper understanding of detection rule performance. This section works best if you triage signals in Cloud SIEM.

- *MTTD KPIs for Cloud SIEM:* See the Mean Time to Detect (MTTD) across all signals. The KPIs below show MTTD for critical, high, and medium signals.
- *Signal Activity:* View signal trends over the selected time window. Click the filters at the bottom to drill in by severity, which can be useful for identifying unusual spikes or drops.
- *Rules by Important Signal Change (1 week):* Shows which rules have increased important signal activity compared to the week prior. Clicking takes you to a filtered view of the Signal Explorer by that rule name.
- *Signals by severity change (1 week):* View how the severities across all signals have changed compared to the week prior. Click to view a filtered view of the signal explorer by that severity.
- *Important Signals by Archived Reason:* See how many signals were archived by each of the archive reasons. Click to view the Signal Explorer filtered by that archive reason.
- *Rules Archived with True Positive (Malicious):* See which rules were archived as `True Positive: Malicious`. Click to view the signals in the signal explorer.
- *Rules Archived with True Positive (Benign):* See which rules were archived as `True Positive: Benign`. Click to view the signals in the signal explorer.
- *Rules by False Positive Rate:* Shows which rules are the noisiest by calculating the percentage of signals that are marked as false positive out of all the signals generated by a rule. Click to view a filtered view of the signal explorer by that rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://securitylabs.datadoghq.com/
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://app.datadoghq.com/security/home?
[4]: /getting_started/security/cloud_siem/
[5]: /security/cloud_siem/investigate_security_signals/#case-management