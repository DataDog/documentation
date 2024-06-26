---
title: Account Takeover Protection
kind: documentation
disable_toc: false
further_reading:
- link: "security/application_security/terms/"
  tag: "Documentation"
  text: "ASM Terms and Concepts"
- link: "security/application_security/threats/add-user-info/?tab=set_user"
  tag: "Documentation"
  text: "User Monitoring and Protection"
- link: "security/application_security/guide/"
  tag: "Documentation"
  text: "Application Security Management Guides"
---

ASM provides account takeover (ATO) protection to detect and mitigate account takeover attacks.

ATO protection has the following benefits:

* Block attackers and disable users.
* Identify targeted and compromised users.
* Differentiate existing users from non-existing users.
* Cluster attackers into logical groups for mitigation.

## Account takeover protection overview

Account takeover occurs when an attacker gains access to a user's account credentials and assumes control of the account.

The following tables lists the *attacker motivation by business*:

| Monetary Theft                           | Reselling Accounts              |
|------------------------------------------|---------------------------------|
| Consumer banking apps                    | SaaS Platforms                  |
| Financial service apps that issue credit cards | Consumer platforms with stored gift cards |

## Attacker strategies

Attacks use publicly available automated tools to compromise a user's account credentials. The sophistication and scale of these tools have varying capabilities.

Here are some common strategies:

Credential stuffing
: An automated cyberattack where stolen account credentials (usernames, email addresses, passwords, and so on) are used to gain unauthorized access to user accounts. Access is gained through large scale automated login requests directed against a web application.
: Credential stuffing relies on credential dumps.

Credential dumps
: Credential dumps occur when stolen credentials from a security breach are posted publicly or sold on dark web markets. This often results in the release of a large number of usernames, passwords, and other account details.

Credential cracking
: Credential cracking involves attempting to decipher a user's password by systematically trying different combinations of passwords until the correct one is found. This method often uses software tools that apply various password guessing techniques.

Brute force
: Brute force is a trial-and-error method used to obtain information such as a user password or personal identification number (PIN). In this attack, automation is used to generate consecutive guesses and gain unauthorized access to a system.

## Setting up ATO detection and prevention

ASM provides managed detections of ATO attacks.

Effective ATO detection and prevention requires the following:

1. Instrumenting your production login endpoints. This enables detection with ASM-managed rules.
2. Remote configuration. This enables blocking attacks and pushing remote instrumentation from the Datadog user interface.
3. Notifications. Ensures you are notified of compromised accounts.
4. Reviewing your first detection. Understand how automated protection fits in with your attacks and escalation requirements.


## Instrumenting your production login endpoints

The following user activity events are used for ATO tracking.

| Enrichment              | Auto-instrumented | Use case                                     |
|-------------------------|-------------------|----------------------------------------------|
| `users.login.success`     | True              | Account takeover detection rule requirement       |
| `users.login.failure`     | True              | Account takeover detection rule requirement       |
| `users.exists`            | False             | Signal review and determining if attack is targeted |
| `users.password_reset`     | False             | Detection rule requirement to identify user enumeration through password reset |

For steps on enabling tracking for events that are not automatically instrumented, go to [User Monitoring and Protection][1].

For the latest list of relevant detections and instrumentation requirements, go to [Detection Rules][2] page.


[Automatic instrumentation][3] is a Datadog capability that automatically identifies user login success and failure for most authentication implementations. We recommend that applications are additionally instrumented for all recommended enrichments, such as `users.exists`.

You are not limited to how Datadog defines these enrichments. Many platform products opt to add additional enrichments, such as identifying the customer organization or user role.

## Remote Configuration

[Remote Configuration][4] enables ASM users to instrument apps with enrichments such as `users.exists` or custom [business logic][5] data in near real time.


## Notifications

[Notifications][6] are a flexible method to ensure the correct team members are informed of an attack. Collaboration [Integrations][7] with common communication methods are available out of the box.


## Review your first detection

ASM highlights the most relevant information and suggests actions to take based on the detection type. It also indicates what actions have been taken.

{{<img src="security/ato/review_first_detection2.png" alt="An Account Takeover signal showing different highlighted areas of interest" style="width:100%;">}}

**Compromised Users**

Compromised and targeted users can be reviewed and blocked within **Signals** and **Traces**.

**Signals**

Individual users can be blocked in **Signals** using **Targeted Users**.

{{<img src="security/ato/compromised_users_signals2.png" alt="Compromised users shown on a security signal" style="width:100%;">}}

**Traces**

Individual users can be blocked on **Traces**, in **User**. Click on any user to show this option.

{{<img src="security/ato/traces_block_user.png" alt="Compromised users shown in the security trace explorer" style="width:100%;">}}

## Best practices for signal review and protection

Review the following best practices to help you detect and mitigate account takeover attacks.

### Develop an incident response plan

Review the following sections to help you develop an incident response plan.

#### Do you use authenticated scanners?

Identify trusted IPs, preventing them from being automatically blocked. This step is useful for the following: 

- Approved scanning sources that attempt to log in.
- Corporate sites with large numbers of users behind single IP addresses.

To configure trusted IPs, use [Passlist][12] and add a `Monitored` entry. Monitored entries are excluded from automated blocking.

{{<img src="security/ato/passlist2.png" alt="Monitored passlist" style="width:100%;">}}

#### Know your customer authentication profile

Review the networks your customers authenticate from, such as:

- Mobile ISPs
- Corporate VPNs
- Residential IPs
- Data centers

Understanding authentication sources can inform your blocking strategy. 

For example, you might *not* expect customers to authenticate with your consumer application from data centers. Consequently, you might have more freedom to block the IPs associated with that data center. 

Nevertheless, if your customers source entirely from Mobile ISPs, you might have an impact to legitimate traffic if you block those ISPs.

Consider who your customers are, and their account name structure.

Do your customers match these attributes?

- Employees with an expected ID format such as integers, corporate domains, or combinations of numbers and text.
- SaaS customers using domain names associated with the customer company.
- Consumers using free providers such as Gmail or Proton Mail.

Understanding your customers' account name structure helps you determine if attacks are targeted or blind attempts at credential stuffing.


### Distributed attacks

Blocking advanced distributed attacks is often a business decision because attacks can impact availability, user funds, and legitimate users. 

Here are three critical components for success in mitigating these attacks:

1. Proper onboarding: Are you configured for blocking with ASM?
2. Proper configuration: Ensure you have correctly set client IPs and X-Forwarded-For (XFF) HTTP headers.
3. Internal communication plans: Communication with security teams, service owners, and product leads is critical to understanding the impact of mitigating large scale attacks.

<div class="alert alert-info">Responders can identify service owners using the tags in all ASM signals.</div>

### Know your trends

Use the [Threats Overview][11] to monitor business logic trends, such as spikes in failed logins against your services.

{{<img src="security/ato/threats_overview2.png" alt="Threats Overview" style="width:100%;">}}


### Signal review

Review the following best practices for signals.

#### IP addresses

Use short durations for blocking attackers. 15 minutes or less is recommended. It is uncommon for attackers to reuse IP addresses in distributed account takeovers.

#### Data centers

Some attacks are launched using inexpensive virtual private servers (VPS) and hosting providers. Attackers are motivated by how their low cost and automation enables access to new IP addresses at the data center.

Many consumer applications have low occurrences of user authentication from data centers, especially low cost data centers and VPS providers. Consider blocking the entire data center or ASN when the network range is small, and not within your expected user authentication behavior.

<div class="alert alert-info">Datadog uses third party data sources such as IPinfo and Spur to determine if an IP is a hosting provider. Datadog processes this data within Datadog infrastructure.</div>

#### Proxies

Datadog uses [Spur][8] to determine if an IP is a proxy. Datadog correlates indicators of compromise (IOCs) with account takeover attacks for faster detection with the ASM-managed account takeover rules.

Datadog recommends never blocking IP addresses solely based on threat intelligence IOCs for IP addresses. See our threat intelligence [best practices][9] for details.

Details on IPs, including ownership and threat intelligence, are available in the IP address details. Click on an IP addresses to view these details.

Two types of proxies are frequently seen in distributed account takeovers:

- Hosting proxies: Proxies that exist at data centers, and are often the result of a compromised host at that data center. Guidance for interacting with hosting proxies is similar to data centers.

- Residential proxies: Proxies that exist behind residential IPs. Residential proxies are frequently enabled by mobile application SDKs or browser plugins. The user of the SDK or plugin is typically unaware that they are running a proxy. It is common to see benign traffic from IP addresses identified as residential proxies.

#### Mobile ISPs

Datadog uses third parties such as IPinfo and Spur to determine if an IP is a Mobile ISP.

Exercise caution when blocking Mobile ISPs. Mobile ISPs use [CGNAT][10] and frequently have large numbers of phones behind each IP address. 

#### Attacker attributes

Use attacker attributes to target response actions.

Datadog clusters attackers by the similarity of their attributes. Responders can use custom rules to block the attributes of persistent attackers.


### Protection

Review the following best practices for protection.

#### Automated protection

Evaluate the managed ruleset to determine which rules fit your internal automated blocking policies. 

If you do not have a policy, review your existing detections and start with the suggested responses in **Signals**. Build your policy based on the most relevant actions taken over time.

#### Users

In **Signals**, the **What Happened** and **Targeted Users** sections provide examples of the attempted usernames.

The **Traces** section identifies if the users exist. Understanding if users exist can influence your incident response decisions.

Develop an incident response plan using the following post compromise steps:

1. Monitoring compromised user accounts.
2. Plan to invalidate credentials and contact users to update credentials.
3. Consider blocking users using ASM.

Attack motivation can influence post-compromise activity. Attackers wanting to resell accounts are unlikely to use accounts immediately after a compromise.
Attackers attempting to access stored funds will use accounts immediately after compromise.

Consider blocking compromised users in addition to blocking the attacker.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security/application_security/threats/add-user-info/
[2]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[3]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[4]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec/business-logic
[6]: https://docs.datadoghq.com/security/notifications/rules/
[7]: https://app.datadoghq.com/integrations?category=Collaboration
[8]: https://docs.datadoghq.com/security/threat_intelligence#threat-intelligence-sources
[9]: https://docs.datadoghq.com/security/threat_intelligence#best-practices-in-threat-intelligence
[10]: https://en.wikipedia.org/wiki/Carrier-grade_NAT
[11]: https://app.datadoghq.com/security/appsec/threat
[12]: https://app.datadoghq.com/security/appsec/passlist