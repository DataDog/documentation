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

**Credential stuffing** is an automated cyberattack where stolen account credentials, typically usernames or email addresses and the corresponding passwords, are used to gain unauthorized access to user accounts through large-scale automated login requests directed against a web application.

Credential stuffing relies on credential dumps.

**Credential dumps** occur when stolen credentials from a security breach are posted publicly or sold on dark web markets, often resulting in a large compilation of usernames, passwords, and other account details being released.

**Credential Cracking** involves attempting to decipher a user's password by systematically trying different combinations of passwords until the correct one is found, often using software tools that apply various password-guessing techniques.

**Brute force** is a trial-and-error method used to obtain information such as a user password or personal identification number (PIN); in this attack, automation is used to generate consecutive guesses to gain unauthorized access to a system

# Onboarding

ASM provides managed detections for Account Takeover {show detection rules page}.

Effective ATO detection and prevention requires the following
1. Instrumenting your production login endpoints. This enables detection with ASM managed rules.
2. Remote configuration. This enables blocking attacks and pushing remote instrumentation from the Datadog user interface.
3. Notifications. Ensures you are notified of compromised accounts.
4. Reviewing your first detection. Understand how automated protection fits in with your attacks and escalation requirements.


## Instrumenting your production login endpoints

| Enrichment              | Auto-instrumented | Use Case                                     |
|-------------------------|-------------------|----------------------------------------------|
| users.login.success     | True              | Account takeover detection rule requirement       |
| users.login.failure     | True              | Account takeover detection rule requirement       |
| users.exists            | False             | Signal triage and determining if attack is targeted |
| user.password_reset     | False             | Detection rule requirement to identifying user enumeration through password reset |


The latest list of relevant detections and instrumentation requirements are available on the Detection Rules page. {link with filter}

Auto-instrumentation will provide login success and failure for most authentication implementations. It is recommended that users instrument their application for all recommended enrichments for the best efficacy.

You are not limited to these enrichments. Many platform products opt to add additional enrichments such as identifying the customer organization or user role.

## Remote Configuration
{ insert remote configuration onboarding }

## Notifications
{ insert notifications onboarding and best practices}

## Review your first detection

**Trusted Activity**

IP addresses can be trusted, preventing them from being automatically blocked. This is useful for 

Approved scanning sources that attempt to login
Corporate sites with large numbers of users behind single IP addresses

To configure Trusted IPs { instructions and link }

**Compromised Users**

Compromised and Targeted users can be reviewed and blocked within Signals.



1. Signals
2. IP address drawers
3. Attacker Explorer



# Best practices for Signal Review and Protection

## Have an Incident Response Plan

### What is your customer authentication profile

What networks do your customers authenticate from?
1. Mobile ISPs
2. Corporate VPNs
3. Residential IPs
4. Data centers

Understanding typical networks can inform your blocking strategy. For example, if you have a consumer application it is unexpected for customers to authenticate from data centers, you may have more leeway to block the IP addresses associated with that data center. However if your customers source entirely from Mobile ISPs, you may have significant impacts to legitimate traffic if you block those ISPs.

Who are your customers and what is their account name structure
1. Employees with an expected ID format such as integers, corporate domains, or combinations if numbers and text
2. SaaS customers, using domain names associated with the customer company
3. Consumers using free providers such as gMail, hotmail, or protonmail

Understanding your customers account name structure helps understand if attacks are targeted or blind attempts at credential stuffing.


### Distributed Attacks
Blocking advanced, distributed attacks is often business decision as the attack affects availability, may affect user funds, and may impact legitimate users. There are three critical components for success in these attacks
1. Proper onboarding: Are you configured for blocking with ASM.
2. Proper configuration: ensure that you have correctly set Client IPs and XFF headers
3. Internal communication plans: Communication with security teams, services owners, and product leads is critical to understanding the impact of mitigating large scale attacks.

Note: Responders can identify services owners via the tags in all ASM Signals.


## Signal Review

### Attackers

**IP Addresses**

Use short durations for blocking attackers. 15 minutes or less is recommended. It is rare for attackers to re-use IP addresses in distributed account takeovers.

**Data centers**

Some attacks launch attacks cheap VPS and hosting providers. Attackers are motivated by the low cost and automation which provides abilities to quickly access new IP addresses at the data center.

Many consumer applications have low occurrences of user authentication from data centers, especially low cost data centers and VPS providers. Consider blocking the entire data center or ASN when the network range is small, such as a /20 (4096 IP Addresses) , and not within your typical user authentication expecations.

{show IP pill} Datadog uses third parties such as IPinfo and Spur to determine if an IP is a hosting provider.

**Proxies**

There are two types of proxies frequently seen in distributed account takeovers; hosting and residential. 

Datadog uses Spur {link threat intel} to determine if an IP is proxy. Datadog correlating IOC's with account takeover attacks for faster detection with the ASM managed account takeover rules.

Datadog recommends never blocking solely on threat intelligence IOCs for IP addresses. See our threat intellince docs for details.

Hosting Proxies

These are proxies that exist at data centers, often the result of a compromised host at that data center. Guidance for interacting with hosting proxies is similar to data centers.

{show IP pill}

Residential Proxies

These are proxies that exist behind Residential IP addresses. Residential proxies are frequently enabled by mobile application SDKs or browser plugins. The user of the SDK or plugin is typically unaware that they are running a proxy. It is common to see benign traffic from IP addresses identified as residential proxies.

{show IP pill}

Mobile ISPs

Datadog uses third parties such as IPinfo and Spur to determine if an IP is a Mobile ISP.

Excercise caution when blocking Mobile ISPs.
Mobile ISPs use CGNAT {link wikipedia} and frequently have large numbers of phones behind single IP addresses. 


**Attacker Attributes**

Datadog identifies attributes of attackers using Attacker Similarity. Users can create custom WAF rules that block these attributes. 
1. Understand the impact to legitimate traffic by checking for benign traces that match the attributes.
2. Expect attackers to adjust their attack strategy to work around blocking efforts.

## Protection

### Automated Protection
Review the managed ruleset and determine which rules fit your internal policies for automated blocking. If you do not have a policy, review your existing detections or consider starting with automated blocking for rules such as 

{ insert rules }
* Pin Reset




### Users

In Signals, the What and Targeted User sections will provide examples of the attempted usernames.

The traces section will identify if the users exist. Understanding if users exist may influence your incident response decisions.

Have an incident response plan that includes the following post compromise steps
1. Monitoring compromised user accounts
2. Plan to invalidate credentials and contact users to update credentials
3. Consider blocking users using ASM

Attack motivation can influence post compromise activity. Attackers wanting to resell accounts are unlikely to use accounts immediately after compromise.
Attackers attempting to access stored funds will use accounts immediately after compromise.

Consider blocking compromised users in addition to blocking the attacker.



