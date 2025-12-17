---
title: Cloud SIEM
aliases:
  - /security_monitoring/
  - /security_platform/cloud_siem/security_home/
  - /security_platform/cloud_siem/
  - /security/cloud_siem/security_home/
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-siem-enterprise-security"
  tag: "Blog"
  text: "Datadog Cloud SIEM: Driving innovation in security operations"
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

Datadog Cloud SIEM (Security Information and Event Management) is a security data analysis and correlation system. It enables your entire security operations team to view, detect, investigate, and respond to security issues. Leveraging Datadog's scalable platform, Cloud SIEM ingests telemetry from both cloud and on‑premises systems using the Datadog Agent and API-based integrations.

Effective security response requires speed, context, insight, and automation. Cloud SIEM continuously analyzes incoming data to detect threats, generate actionable security signals, and correlate them across multiple sources. This empowers your team to investigate incidents and respond quickly.

To keep your team on top of the latest attacks, Datadog also has a team of threat researchers who analyze petabytes of telemetry across cloud and on-premises systems to identify emerging threats and attacker behaviors. See [Datadog Security Labs][1] to read articles about their recent investigations.

### Security and observability

Cloud SIEM embeds both cloud and on-premises telemetry directly into security workflows to accelerate investigation and response. And with a shared platform that brings DevOps and Security teams together, organizations can break down silos and respond to threats collaboratively and efficiently.

### Flexible cost control for security data

As your organization scales, controlling the ingestion cost of security logs without compromising visibility is critical. Cloud SIEM is integrated with Datadog Log Management so you can choose the appropriate retention and querying capability for  your security logs. This flexibility helps you balance cost efficiency with your threat detection needs.

Store logs using one of the available options:
- [Standard indexing][6] for logs that need to be queried frequently with the most compute.
- [Flex Logs][7] for logs that need to be retained long-term, but sometimes need to be queried urgently.
- [Log Archives][8] for logs that are infrequently queried and need to be stored long-term.

### Guided security data onboarding

Cloud SIEM [Content Packs][9] are a curated set of Datadog integrations designed for security teams. Each content pack has instructions on how to configure the integration and what is included, such as detection rules, out-of-the-box interactive dashboards, parsers, and SOAR workflows. Content Packs highlight actionable insights specific to each integration to help you investigate security issues.

### Content pack health monitoring

After a content pack is activated, it gives you the integration's health status and provides troubleshooting steps if something goes wrong so you can get back up and operational as fast as possible.

### Log search and analysis

Build searches in the Log Explorer using facets or by clicking fields directly in the logs. Or use Bits AI and natural language search to find important security events. With built-in group-by and table lookup functions as well as pattern analysis and visualizations, security teams can get security insights from their data. See [Log Explorer][11] and [Log Search Syntax][10] for more information.

## Get started

If you don't already have a Datadog account, sign up for a [free trial][2]. After you log in to your Datadog account:

1. Navigate to [Cloud SIEM][3].
1. Click **Enable Cloud SIEM**.
1. Follow the onboarding steps.

See the [Getting Started Guide][4] for more detailed setup instructions.

## Cloud SIEM Overview page

Navigate to the [Cloud SIEM Overview page][3]. Use this page to see key security insights and act on common workflows for security analysts, security and detection engineers, and Security Operations Center (SOC) managers. From the Overview page, you can:
- Access important signals, open cases, and high-risk entities.
- Complete onboarding tasks and review content‑pack health.
- View and investigate top signals by geography or internet service provider (ISP).
- Analyze signals and rules by MITRE ATT&CK tactics.
- Track detection performance (Mean Time to Detect (MTTD), false‑positive rates).
- Read the latest [Security Labs][1] research and release notes.

Click **Customize Page** to reorder or hide modules so you can see what is important to you.

Learn more about each Cloud SIEM Overview page section below.

### Security coverage

{{< img src="security/security_monitoring/landing/01_security_coverage.png" alt="Security coverage sections showing 11 active and 1 broken content packs and a bar graph of logs analyzed by Cloud SIEM" style="width:100%;" >}}

Remain aware of any data processing issues or coverage gaps.

#### Enabled content packs and integrations

View enabled content packs and integrations across the critical categories to provide comprehensive security coverage. Hover over each section of the horizontal bar to see which content packs are enabled in each category.

#### Content pack and logs health KPIs

See whether any content packs or integrations are in warning or broken states so that you can resolve any coverage gaps. Click a status tile to view the affected content packs.

#### Logs analyzed

View logging trends across your top log sources and identify any unusual spikes or drops. Click on the legend at the bottom to explore trends on a per source basis.

### Important signals and cases

{{< img src="security/security_monitoring/landing/02_important_signals_cases.png" alt="" style="width:100%;" >}}

See important events happening in your environment, such as:

#### Recent open signals grouped by rule

See signals grouped by rule name and sorted by severity to get an overview of the most important signals in your environment. Click on a signal or a severity pill to see more details in a filtered view in the Signal Explorer.

#### Recent open security cases

Use [Case Management][5] to track signals that require further analysis. View active security cases in your environment and click a case to see more details.

### Risk insights

{{< img src="security/security_monitoring/landing/03_risk_insights.png" alt="" style="width:100%;" >}}

Review the risky entities in your environment.

#### Top risky entities

See the entities with the highest risk scores. Click an entity to view more details and take action.

#### Entity type breakdown

View the most common entity types in your environment. Click a pie chart wedge to filter the list of entities by type.

#### Entities risk score breakdown

View entities by severity. Click a severity tile to see a list of entities with that severity.

### Threat map

{{< img src="security/security_monitoring/landing/04_threat_map.png" alt="" style="width:100%;" >}}

Get insights from where the signals in your environment are getting generated.

#### Top IPs by country distribution

See which IPs are generating the most signals with a breakdown of important and less important signals. Also, use the map to see a list of signals by country.

#### Signals by country

See the proportional breakdown of where signals originate. Click a pie chart wedge to filter by country and state or province, and identify signals from unexpected locations.

#### Signals by ISP provider

Review which ISPs are sending signals. Click on a pie chart wedge to scope down by provider and location.

### Security overview

{{< img src="security/security_monitoring/landing/05_security_overview.png" alt="" style="width:100%;" >}}

A high-level overview of all signals.

#### Signal Distribution

On the left side of the section, see signals grouped by severity and trend over the selected time window.
On the right side, see a break down of signal activity by severity, source, and resolution. Click on a node in the sankey diagram to see signals in the Signal Explorer filtered to the specifics of that node.

#### Mean Time to Respond to Signals

See KPIs of how quickly your team responds. Click a severity tile to view signals set to `under review` or `archive` and filtered to the selected severity.

### MITRE ATT&CK coverage

{{< img src="security/security_monitoring/landing/06_mitre_coverage.png" alt="" style="width:100%;" >}}

Detection rule coverage and signal activity by MITRE ATT&CK tactics and techniques.

#### Techniques with at least 1 rule

See how many techniques are covered by the detection rules enabled in your environment.

#### Rule density KPIs

See how many techniques have high, medium, or low density or no rules at all. Click on a tile to view a filtered MITRE map.

#### Signals per tactic view

See which MITRE ATT&CK tactics are generating signals. Click a pie chart wedge to view the Signal Explorer filtered by that tactic. Click the dropdown and select **Rules count** to see which tactics have the most rules mapped to it. When viewing by rule count, clicking on a pie chart wedge creates a detection rule explorer view filtered by that tactic.

#### Signals per technique view

See which MITRE ATT&CK techniques are generating signals. Click on a pie chart wedge to view the Signal Explorer filtered by technique. Click the dropdown and select **Rules count** to see which techniques have the most rules mapped to it. When viewing by rule count, click on a pie chart wedge to see the detection rule explorer filtered by that technique.

### Detection rules performance

{{< img src="security/security_monitoring/landing/07_detection_rule_performance.png" alt="" style="width:100%;" >}}

Gain a deeper understanding of detection rule performance. This section works best if you triage signals in Cloud SIEM.

#### MTTD KPIs for Cloud SIEM

See the Mean Time to Detect (MTTD) across all signals. The tiles below show MTTD for critical, high, and medium signals. Click a tile to see signals with that severity in the Signal Explorer.

#### Signal activity

View signal trends over the selected time window. Select the severity checkboxes at the bottom of the bar graph to scope by severity, which can be useful for identifying unusual spikes or drops.

#### Rules by important signal change (1 week)

See which rules have increased important signal activity compared to the week prior. Click a rule name to view signals in the Signal Explorer filtered by that rule name.

#### Signals by severity change (1 week)

View how the severities across all signals have changed compared to the week prior. Click on a severity to view signals with that severity in the Signal Explorer.

#### Important signals by archived reason

See how many signals were archived by archive reason. Click on a reason to view the Signal Explorer filtered by that archive reason.

#### Rules archived with true positive (malicious)

See which rules were archived as `True Positive: Malicious`. Click on a rule to view the signals in the Signal Explorer.

#### Rules archived with true positive (benign)

See which rules were archived as `True Positive: Benign`. Click on a rule to view the signals in the Signal Explorer.

#### Rules by false positive rate

See which rules are the noisiest by calculating the percentage of signals that are marked as false positive out of all the signals generated by a rule. Click on a rule to view signals for that rule in the Signal Explorer.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://securitylabs.datadoghq.com/
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://app.datadoghq.com/security/siem/home?
[4]: /getting_started/security/cloud_siem/
[5]: /security/cloud_siem/investigate_security_signals/#case-management
[6]: /logs/log_configuration/indexes
[7]: /logs/log_configuration/flex_logs/
[8]: /logs/log_configuration/archives/
[9]: /security/cloud_siem/content_packs/
[10]: /logs/explorer/search_syntax/
[11]: /logs/explorer/
