# Account Takeover Protection

Account takeover (ATO) protection detects and mitigates account takeover attacks.

Benefits

* Block attackers and disable users
* Identify targeted and compromised users
* Differentiates existing users from non-existing users
* Cluster attackers into logical groups for mitigation


# Account Takeover

Account takeover occurs when an attacker gains access to a user's account credentials and assumes control of the account.

**Attacker Motivation by Business**

| Monetary Theft                           | Reselling Accounts              |
|------------------------------------------|---------------------------------|
| Consumer banking apps                    | SaaS Platforms                  |
| Financial service apps that issue credit cards | Consumer platforms with stored gift cards |

## Attacker Strategies
Attacks use publicly available automated tools for compromise. The tools and their configurations have varying capabilities for sophistication and scale.

### Credential stuffing

An automated cyberattack where stolen account credentials, typically usernames or email addresses and the corresponding passwords, are used to gain unauthorized access to user accounts through large-scale automated login requests directed against a web application.

Credential stuffing relies on credential dumps.

### Credential dumps

Occur when stolen credentials from a security breach are posted publicly or sold on dark web markets, often resulting in a large compilation of usernames, passwords, and other account details being released.

### Credential cracking

Involves attempting to decipher a user's password by systematically trying different combinations of passwords until the correct one is found, often using software tools that apply various password-guessing techniques.

### Brute force

A trial-and-error method used to obtain information such as a user password or personal identification number (PIN); in this attack, automation is used to generate consecutive guesses to gain unauthorized access to a system

# Onboarding

ASM provides managed detections for Account Takeover attacks.

Effective ATO detection and prevention requires the following
1. Instrumenting your production login endpoints. This enables detection with ASM managed rules.
2. Remote configuration. This enables blocking attacks and pushing remote instrumentation from the Datadog user interface.
3. Notifications. Ensures you are notified of compromised accounts.
4. Reviewing your first detection. Understand how automated protection fits in with your attacks and escalation requirements.


## Instrumenting your production login endpoints

| Enrichment              | Auto-instrumented | Use Case                                     |
|-------------------------|-------------------|----------------------------------------------|
| `users.login.success`     | True              | Account takeover detection rule requirement       |
| `users.login.failure`     | True              | Account takeover detection rule requirement       |
| `users.exists`            | False             | Signal review and determining if attack is targeted |
| `user.password_reset`     | False             | Detection rule requirement to identifying user enumeration through password reset |


The latest list of relevant detections and instrumentation requirements are available on the [Detection Rules](https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name) page.


[Auto-instrumentation](https://docs.datadoghq.com/security/application_security/threats/add-user-info/?tab=set_user#automatic-user-activity-event-tracking)
 is a Datadog capability that automatically identifies user login success and failure for most authentication implementations. It is recommended that applications are additionally instrumented for all recommended enrichments, such as `users.exists`, for the best efficacy.

You are not limited to Datadog defined these enrichments. Many platform products opt to add additional enrichments such as identifying the customer organization or user role.

## Remote Configuration
[Remote Configuration](https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration)

Remote configuration enables ASM users to instrument apps with with enrichments such as `users.exists` or custom [business logic](https://app.datadoghq.com/security/appsec/business-logic)
 data in near real time.


## Notifications

[Notifications](https://docs.datadoghq.com/security/notifications/rules/)
 are a flexible way ensure the correct team members are contacted when an attack occurs. [Integrations](https://app.datadoghq.com/integrations?category=Collaboration)
 with common communication methods are available out of the box including Datadog CoScreen.


## Review your first detection

{{<img src="security/ato/review_first_detection.png" alt="An Account Takeover signal showing different highlighted areas of interest" style="width:100%;">}}

**Compromised Users**

Compromised and Targeted users can be reviewed and blocked within Signals, Traces, and Attacker Explorer.

**Signals:**

{{<img src="security/ato/compromised_users_signals.png" alt="Compromised users shown on a security signal" style="width:100%;">}}

**Traces:**

{{<img src="security/ato/compromised_users_traces.png" alt="Compromised users shown in the security trace explorer" style="width:100%;">}}

**Blocking**

ASM suggests actions to take based on the detection type and indicates what actions have been taken.

{{<img src="security/ato/review_suggested_steps.png" alt="Suggested actions on an ASM Account Takeover signal" style="width:100%;">}}

# Best practices for Signal Review and Protection

## Have an Incident Response Plan

### Do you use authenticated scanners

IP addresses can be trusted, preventing them from being automatically blocked. This is useful for 

1. Approved scanning sources that attempt to login
2. Corporate sites with large numbers of users behind single IP addresses

To configure Trusted IPs, visit the [Passlist](https://app.datadoghq.com/security/appsec/passlist) page and add a `Monitored` entry. Monitored entries are excluded from automated blocking.

{{<img src="security/ato/passlist.png" alt="Monitored passlist" style="width:100%;">}}

### What is your customer authentication profile

What networks do your customers authenticate from?
1. Mobile ISPs
2. Corporate VPNs
3. Residential IPs
4. Data centers

Understanding typical networks can inform your blocking strategy. For example, if you have a consumer application it may be unexpected for customers to authenticate from data centers, you may have more leeway to block the IP addresses associated with that data center. However if your customers source entirely from Mobile ISPs, you may have significant impacts to legitimate traffic if you block those ISPs.

Who are your customers and what is their account name structure
1. Employees with an expected ID format such as integers, corporate domains, or combinations if numbers and text
2. SaaS customers, using domain names associated with the customer company
3. Consumers using free providers such as gMail, hotmail, or protonmail

Understanding your customers account name structure helps understand if attacks are targeted or blind attempts at credential stuffing.


### Distributed Attacks

Blocking advanced, distributed attacks is often business decision as the attack affects availability, may affect user funds, and may impact legitimate users. There are three critical components for success in these attacks
1. Proper onboarding: Are you configured for blocking with ASM?
2. Proper configuration: ensure that you have correctly set Client IPs and XFF headers
3. Internal communication plans: Communication with security teams, services owners, and product leads is critical to understanding the impact of mitigating large scale attacks.

Note: Responders can identify services owners via the tags in all ASM Signals.


## Signal Review

### Attackers

#### IP Addresses

Use short durations for blocking attackers. 15 minutes or less is recommended. It is rare for attackers to re-use IP addresses in distributed account takeovers.

#### Data centers

Some attacks launch attacks cheap VPS and hosting providers. Attackers are motivated by the low cost and automation which provides abilities to quickly access new IP addresses at the data center.

Many consumer applications have low occurrences of user authentication from data centers, especially low cost data centers and VPS providers. Consider blocking the entire data center or ASN when the network range is small, such as a /20 (4096 IP Addresses) , and not within your typical user authentication expectations.

<span style="color:red">
{show IP pill} Datadog uses third parties such as IPinfo and Spur to determine if an IP is a hosting provider.
</span>

#### Proxies

There are two types of proxies frequently seen in distributed account takeovers; hosting and residential. 

Datadog uses [Spur](https://docs.datadoghq.com/security/threat_intelligence#threat-intelligence-sources)
 to determine if an IP is proxy. Datadog correlating indicators of compromise (IOCs) with account takeover attacks for faster detection with the ASM managed account takeover rules.

Datadog recommends never blocking solely on threat intelligence IOCs for IP addresses. See our threat intelligence [best practices](https://docs.datadoghq.com/security/threat_intelligence#best-practices-in-threat-intelligence) for details.

Details on IP Addresses, including ownership and threat intelligence is available in the IP address drawers. Click on  IP addresses to view.

Hosting Proxies
: These are proxies that exist at data centers, often the result of a compromised host at that data center. Guidance for interacting with hosting proxies is similar to data centers.

Residential Proxies
: These are proxies that exist behind Residential IP addresses. Residential proxies are frequently enabled by mobile application SDKs or browser plugins. The user of the SDK or plugin is typically unaware that they are running a proxy. It is common to see benign traffic from IP addresses identified as residential proxies.

#### Mobile ISPs

Datadog uses third parties such as IPinfo and Spur to determine if an IP is a Mobile ISP.

Excercise caution when blocking Mobile ISPs.
Mobile ISPs use CGNAT {link wikipedia} and frequently have large numbers of phones behind single IP addresses. 

#### Attacker Attributes

Use attacker attributes to target response actions.

Datadog clusters attackers using Attacker Similarity and identifies attributes of those attackers. Responders can use custom rules to block to attributes of persistent attackers.


## Protection

### Automated Protection
Review the managed ruleset and determine which rules fit your internal policies for automated blocking. If you do not have a policy, review your existing detections and start with the suggested responses in Signals. Build your policy based on the most relevant actions taken over time.


### Users

In Signals, the **What Happened** and **Targeted Users** sections will provide examples of the attempted usernames.

The traces section will identify if the users exist. Understanding if users exist may influence your incident response decisions.

Have an incident response plan that includes the following post compromise steps
1. Monitoring compromised user accounts
2. Plan to invalidate credentials and contact users to update credentials
3. Consider blocking users using ASM

Attack motivation can influence post compromise activity. Attackers wanting to resell accounts are unlikely to use accounts immediately after compromise.
Attackers attempting to access stored funds will use accounts immediately after compromise.

Consider blocking compromised users in addition to blocking the attacker.
