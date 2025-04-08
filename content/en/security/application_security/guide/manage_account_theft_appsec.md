---
title: Managing Account Theft with ASM
disable_toc: false
---

Users are trusted entities in your systems with access to sensitive information and the ability to perform sensitive actions. Malicious actors have identified users as an opportunity to target websites and steal valuable data and resources.

Datadog Application Security Management (ASM) provides [built-in][1] detection and protection capabilities to help you manage this threat. 

This guide describes how to use ASM to prepare for and respond to account takeover (ATO) campaigns. This guide is divided into three phases:

1. [Collecting login information](#phase-1-collecting-login-information):
   - Enable and verify login activity collection in Datadog ASM using automatic or manual instrumentation methods.
   - Use remote configuration options if you cannot modify your service code.
   - Troubleshoot missing or incorrect data.
2. [Preparing for account takeover campaigns](#phase-2-preparing-for-ato-campaigns):
   - Prepare for ATO campaigns detected by ASM. 
   - Configure notifications for attack alerts.
   - Validate proper data propagation for accurate attacker identification.
   - Set up automatic IP blocking for immediate mitigation.
   - Learn about the importance of temporary blocking due to dynamic attacker IPs.
3. [Reacting to account takeover campaigns](#phase-3-reacting-to-ato-campaigns):
   - Learn how to react to ATO campaigns, including attacker strategies, triage, response, investigation, monitoring, and cleanup.

## Phase 1: Collecting login information

To detect malicious patterns, ASM requires visibility into your users' login activity. This phase describes how to enable and validate this visibility. 

### Step 1.1: Ensure ASM is enabled on your identity service

This step describes how to set up your service to use ASM.

<div class="alert alert-info">If your service is already using ASM, you can go to <a href="#step-1.3:-validating-login-information-is-automatically-collected">Step 1.3: Validating whether login information is automatically collected</a>.</div>

1. Go to [**Software Catalog**][2], click the **Security** lens, and search for your login service name. 

   <!-- ![][image1] -->

2. Click on the service to open its details. If the **Threat management** pill is green, ASM is enabled and you may move to [Step 1.3: Validating whether login information is automatically collected](#step-1.3:-validating-login-information-is-automatically-collected).
   
   <!-- ![][image2] -->

   If ASM isn't enabled, the panel displays the **Discover ASM** button.

   <!-- ![][image3] -->

   To set up ASM, move to [Step 1.2: Enabling ASM on login service](#step-12-enabling-asm-on-your-login-service).

### Step 1.2: Enabling ASM on your login service

To enable ASM on your login service, ensure you meet the following requirements:

* Similarly to Datadog APM, ASM requires a library integration in your services and a running Datadog Agent.  
* ASM generally benefits from using the newest library possible; however, minimum supported versions are documented in [Compatibility Requirements][3].   
* At a minimum, **Threat Detection** must be enabled. Ideally, **Automatic user activity event tracking** should be enabled as well.

To enable ASM using a new deployment, use the `APPSEC_ENABLED` environment variable/library configuration or [Remote Configuration][11]. You can use either method, but Remote Configuration can be set up using the Datadog UI.

**To enable ASM using Remote Configuration**, and without having to restart your services, do the following:

1. Go to [ASM onboarding][5].  
2. Click **Get Started with ASM**.   
3. In **Activate on services already monitored by Datadog**, click **Select Services.**
4. Select your service(s), and then click **Next** and proceed with the setup instructions.

When you see traces from your service in [ASM Traces][6], move to [Step 1.3: Validating login information is automatically collected](#step-1.3:-validating-login-information-is-automatically-collected).

For more detailed instructions on using a new deployment, see [Enabling ASM Threat Detection using Datadog Tracing Libraries][7].

### Step 1.3: Validating login information is automatically collected

After you have enabled ASM, you can validate that login information is collected by Datadog.

**Note:** After ASM is enabled on a service, wait a few minutes for users to log into the service or log into the service yourself.

To validate login information is collected, do the following:

1. Go to [Traces][8] in ASM.   
2. Look for traces tagged with login activity from your login service. For example, in **Search for**, you might have `@appsec.security\activity:business\logic.users.login.*`.  
3. Check if all your login services are reporting login activity. You can see this in the **Service** facet.

<!-- ![][image4] -->

**If you don't see login activity from a service**, go to [Step 1.5: Manually instrumenting your services](#step-15-manually-instrumenting-your-services).

### Step 1.4: Validating login metadata is automatically collected

To validate that login metadata is collected, do the following:

1. Go to [Traces][8] in ASM.   
2. Look for traces tagged with successful and failed login activity from your login service. You can update the search query in **Search for** to filter `business_logic.users.login.success` or `business_logic.users.login.failure`. 
3. Open a trace.  
4. On the **Security** tab, review the **Business Logic Event**.
5. Check if the event has a false user.

<!-- ![][image5] -->

Review a few traces, both login successes and login failures. For login failures, look for traces with `usr.exists` as `true` (failed login attempt by an existing user) and `false`.

The checks must be done whether or not the user exists.

In the event of a **false** user (`usr.exists:false`), look for the following issues:

- A single event: if the trace contains multiple login events, such as both successes and failures, this might be caused by incorrect auto-instrumentation. To change auto-instrumentation, go to [Step 1.5: Manually instrumenting your services](#step-15-manually-instrumenting-your-services).  
- Does the event contain the mandatory metadata? It might appear as a user attribution section in the case of a login success. The mandatory metadata is `usr.login` and `usr.exists` in the case of login failure, and `usr.login` and `usr.id` in the case of login success. If some metadata is missing, go to [Step 1.5: Manually instrumenting your services](#step-15-manually-instrumenting-your-services).

**If the instrumentation is correct, go to [Phase 2: Preparing for Account Takeover campaigns](#phase-2-preparing-for-ato-campaigns).**

### Step 1.5: Manually instrumenting your services

ASM collects login information and metadata using an SDK embedded in the Datadog libraries. Instrumentation is performed by calling the SDK when a user login is successful/fails and by providing the SDK with the metadata of the login. The SDK attaches the login and the metadata to the trace and sends it to Datadog where it is retained.

<div class="alert alert-info">For an alternative to modifying the service's code, go to <a href="#step-16-remote-instrumentation-of-your-services">Step 1.6: Remote instrumentation of your services</a>.</div>

To manually instrument your services, do the following:

1. If auto-instrumentation is providing incorrect data (multiple events in a single trace), see [Disable auto-instrumentation][9].
2. For detailed instrumentation instructions for each language, go to [Adding business logic information (login success, login failure, any business logic) to traces][10]. Make sure to add the following metadata:
   * `usr.login`: **Mandatory for login success and failure**. This field contains the *name* used to log into the account. The name might be an email address, a phone number, a username, or something else. The purpose of this field is to identify targeted accounts even if they don't exist in your systems because a user might be able to change those accounts. Also, this field provides information on the location of the database used by the attacker. This value shouldn't be confused with `usr.id`.
   * `usr.exists`: **Mandatory for login failures**. This field is required for some default detections. The field helps to lower the priority of attempts targeted at accounts that don't exist in your systems.  
   * `usr.exists`: **Mandatory for login failures**. This field is required for some default detections. The field helps to lower the priority of attempts targeted at accounts that don't exist in your systems.  

**After deploying the code, validate the instrumentation is correct by following the steps in** [Step 1.4: Validating login metadata is automatically collected](#step-1.4:-validating-login-metadata-is-automatically-collected).

### Step 1.6: Remote instrumentation of your services

ASM can use custom In-App WAF rules to flag login attempts and extract the metadata from the request needed by detection rules.

This approach requires that [Remote Configuration][11] is enabled and working. Verify Remote Configuration is running for this service in [Remote Configuration][12].

To use custom In-App WAF rules, do the following:

1. Open the [In-App WAF custom rule creation form][24].   
2. Name your rule and select the **Business Logic** category.   
3. Set the rule type as `users.login.failure` for login failures and `users.login.success` for login successes.
   <!-- ![][image7] -->
4. Select your service and write the rule to match the login attempts. Typically, you match the method (`POST`), the URI with a regex (`^/login`), and the status code (403 for failures, 302 or 200 for success).  
5. Collect the tags required by detection rules. The most important tag is `usr.login`. Assuming the login was provided in the request, you can add a condition and set `store value as tag` as the operator.
   <!-- ![][image8] -->
6. Select a specific user parameter as an input, either in the body or the query.   
7. Set the `Tag` field to the name of the tag where you want to save the value captured using `usr.login`.
   <!-- ![][image9] -->
8. Click **Save**. The rule is automatically sent to every instance of the service and then begins capturing login failures. 

**To validate that the instrumentation is correct**, see [Step 1.4: Validating login metadata is automatically collected](#step-1.4:-validating-login-metadata-is-automatically-collected).

For more details, see [Tracking business logic information without modifying the code][13].

## Phase 2: Preparing for ATO campaigns

After setting up instrumentation for your services, ASM monitors for attack campaigns. You can review the traffic in the [Attacks overview][14] **Business logic** section. 

<!-- ![][image10] -->

ASM detects [multiple attacker strategies][15]. Upon detecting an attack with a high level of confidence, the [built-in detection rules][16] generate a signal. 

The severity of the signal is set based on the urgency of the threat: from **Low** in case of unsuccessful attacks to **Critical** in case of successful account compromises.

The actions covered in the next sections help you to identify and leverage detections faster.

### Step 2.1: Configuring notifications

[Notifications][17] provide a warning on your preferred channel when a signal is triggered. To create a notification rule, do the following:

1. Open [Create a new rule][18].  
2. Enter a name for the rule.
3. Select **Signal** and remove all entries except **Application Security**.
4. Restrict the rule to `category:account_takeover`, and expand the severities to include `Medium`.
5. Add notification recipients (Slack, Teams, PagerDuty).
   To learn more, see [Notification channels][19].  
6. Test, and then save the rule.
   <!-- ![][image11] -->
   The notification is sent the next time a signal is generated.

### Step 2.2: Validate proper data propagation

In microservice environments, services are generally reached by internal hosts running other services. This internal environment makes it challenging to identify the unique traits of the original attacker's request, such as IP, user agent, fingerprint, etc.

[ASM Traces][20] can help you validate that the login event is properly tagged with the source IPs, user agent, etc. To validate, review login traces in [Traces][21] and check for the following:
 
* Source IPs (`@http.client_ip`) are varied and public IPs.  
  * **Problem:** If login attempts are coming from a few IPs only, this might be a proxy that you can't block without risking availability.  
  * **Solution:** Forward the client IP of the initial request through a HTTP header, such as `X-Forwarded-For`. You can use a custom header for [better security][22] and configure the tracer to read it using the `DD_TRACE_CLIENT_IP_HEADER` environment variable.  
* The user agent (`@http.user_agent`) is consistent with the expected traffic (web browser, mobile app, etc.)  
  * **Problem:** The user agent could be replaced by the user agent in the calling microservice network library.  
  * **Solution:** Use the client user agent when calling subsequent services.
* Multiple headers are populated. You can see this in a trace's **See more details** in the **Request** block.
  * **Problem:** Normal request headers (for example, `accept-encoding`) aren't forwarded to the instrumented service. This impairs the generation of fingerprints (`@appsec.fingerprint.*`) and degrades the signal's ability to isolate an attacker's activity.
  * **Solution:** Forward those headers when calling a subsequent microservice.

### Step 2.3: Configure automatic blocking

<div class="alert alert-info">Before you begin: Verify that the IP addresses are properly configured, as described in <a href="#step-22-validate-proper-data-propagation">Step 2.2: Validate proper data propagation</a>.</div>

ASM automatic blocking can be used to block attacks at any time of the day. Automatic blocking can help block attacks before your team members are online, providing security during off hours. Within an ATO, automatic blocking can help mitigate the load issues caused by the increase in failed login attempts or prevent the attacker from using compromised accounts.

You can configure automatic blocking to block IPs identified as part of an attack. This is only a partial remediation because attackers can change IPs; however, it can give you more time to implement comprehensive remediation.

To configure automatic blocking, do the following:

1. Go to **ASM** > **Protection** > [Detection Rules][23].  
2. In **Search**, enter `tag:"category:account_takeover"`.   
3. Open the rules where you want to turn on blocking. Datadog recommends turning IP blocking on for **High** or **Critical** severity.  
4. In the rule, in **Define Conditions**, in **Security Responses**, enable **IP automated blocking**. You may also enable **User automated blocking**.  
   You can control the blocking behavior per condition. Each rule can have multiple conditions based on your confidence and the attack success. 

**Datadog does not recommend permanent blocking of IP addresses**. Attackers are unlikely to reuse IPs and permanent blocking could result in blocking users. Moreover, ASM has a limit of how many IPs it can block (`~10000`), and this could fill this list with unnecessary IPs.

<!-- ![][image12] -->

## Phase 3: Reacting to ATO campaigns

This section describes common account takeover hacker behavior and how to triage, investigate, and monitor detections.

### How attackers run their campaigns 

Eventually, your systems come under attack. The wave of malicious login attempts can often eclipse the volume of normal login activity the service is expecting. The load might increase causing availability problems and the attacker could at any time successfully log into an account. 

The actions the attackers take depend on their strategy and the configurations of your systems. Some attackers might decide to immediately abuse their access to extract value before you've had time to freeze their compromised accounts. Others might keep the accounts dormant until a later time. 

Many strategies are available, but it's important to understand that the value chain of attacks is often carefully divided:

1. The actor who initiates the attack often buys a database of credentials from a vendor (likely acquired by the compromise of another service).
2. The actor procures a script designed to automate login attempts while evading detection (randomizing headers, trying to look as similar to normal traffic as possible).
3. The actor buys access to a botnet, letting them leverage many different IPs to run their attack. There are extreme cases where large campaigns with 500k+ attempts were so distributed that Datadog saw an average of 1.01 requests per IP and a single attempt per account.
4. When valid credentials are discovered, they might be sold downstream to another actor to leverage them to some end such as financial theft, spam, abuse, etc.

When an attack begins against your systems, the system generates signals labeled **Credential Stuffing**, **Distributed Credential Stuffing**, or **Bruteforce**, depending on the attacker's strategy.

### Step 3.1: Triage

The first step is to confirm that the detection is correct. Certain behaviors, such as a security scan on a login endpoint or a lot of token rotation, might appear to the detection as an attack. The analysis depends on the signal, and the following examples provide general guidance that should be customized for your situation.

{{< tabs >}}
{{% tab "Bruteforce" %}}

The signal is looking for an attempt to steal a user account by trying many different passwords for this account. Generally, a small number of accounts are targeted by these campaigns.

Review the accounts flagged as compromised. Click on a user to open a summary of recent activity.

Questions for triage:

* Has there been a sharp increase of activity?   
* Is it the first time those IPs are attempting logins?   
* Are they flagged by threat intelligence?

If the answer to those questions is yes, the signal is likely legitimate.

You can adapt your response based on the sensitivity of the account. For example, a free account with limited access versus an admin account.

{{% /tab %}}

{{% tab "Credential Stuffing" %}}

This signal is looking for a large number of accounts with failed logins coming from a small number of IPs. This is often caused by unsophisticated attackers.

Review the accounts flagged as targeted.

If they share attributes, such as all coming from one institution, check whether the IP might be a proxy for this institution by reviewing its past activity by hovering over it and opening the side panel.

Questions for triage:

* Has there been a sharp increase of activity?   
* Are the accounts uncorrelated?   
* Are IPs flagged by threat intelligence?   
* Are there many more login failures than successes ?

If the answer to those questions is yes, the signal is likely legitimate.  
You can adapt your response based on the scale of the attack and whether accounts are being compromised.

{{% /tab %}}

{{% tab "Distributed Credential Stuffing" %}}

This signal is looking for a large increase in the overall number of login failures on a service. This is caused by sophisticated attackers leveraging a botnet.

Datadog tries to identify common attributes between the login failures in your service. This can surface defects in the attacker script that can be used to isolate the malicious activity. When found, a section called **Attacker Attributes** is shown. If present, review whether this is legitimate activity by selecting the cluster and clicking on **Explore clusters**.

If accurate, the activity of the cluster should closely match the increase in login failures while also being low/nonexistent before.  
If no cluster is available, click **Investigate in full screen** and review the targeted users/IPs for outliers. 

If the list is truncated, click **View in ASM Protection Trace Explorer** and run the investigation with the Traces explorer. For additional tools, see [Step 3.3: Investigation](#step-33-investigation).

{{% /tab %}}
{{< /tabs >}}


If the conclusion of the triage is that the signal is a false positive, you can flag it as a false positive and close it. 

If the false positive was caused by a unique setting in your service, you can add suppression filters to silence false positives.

**If the signal is legitimate**, move to step [Step 3.2: Preliminary response](#step-32-disrupting-the-attacker-as-a-preliminary-response).

### Step 3.2: Disrupting the attacker as a preliminary response

If the attack is ongoing, you might want to disrupt the attacker as you investigate further. Disrupting the attacker slows down the attack and reduce the number of compromised accounts. 

<div class="alert alert-info"> <strong>Note</strong>: This is a common step, although you might want to skip this step in the following circumstances:

* The accounts have little immediate value. You can block these post-compromise without causing harm.  
* You want to maintain maximum visibility into the attack by avoiding any action that alerts the attacker to the investigation and causes them to change tactics.
</div>

Enforcing this preliminary response requires that [Remote Configuration][11] is enabled for your services.

If you want to initiate a partial response, do the following:

{{< tabs >}}
{{% tab "Bruteforce or Credential Stuffing" %}}

The attackers are likely using a small number of IPs. To block them, open the signal and use Next Steps. You can set the duration of blocking. 

Datadog recommends **12h**, which is enough for the attack to stop and avoid blocking legitimate users when, after the attack, those IPs get recycled to legitimate users. Datadog does not recommend permanent blocking.  
You can also block compromised users, although a better approach would be to extract them and reset their credentials using your own systems.

Finally, you can enable automated IP blocking from the Next Step section so that new IPs are automatically blocked while you're running your investigation.

{{% /tab %}}

{{% tab "Distributed Credential Stuffing" %}}

These attacks often use a large number of disposable IPs. Due to Datadog's latency, it's impractical to block login attempts by blocking the IP before the attacker drops it from their pool.

Instead, block traits of the request that are unique to the malicious attempt (a user agent, a specific header, a fingerprint, etc.).

In a **Distributed Credential Stuffing campaign** signal, Datadog automatically identifies clear traits and presents them as **Attacker Attributes**. 

Before blocking, Datadog recommends that you review the activity from the cluster to confirm that the activity is indeed malicious.

The questions you're trying to answer are:

- Is the traffic malicious? Did this traffic exist before the beginning of th attack?  
- Can a meaningful volume of legitimate traffic be caught?  
- Can blocking based on this cluster be effective?

To do so, select your cluster and click on **Explore clusters**.

The **Investigate** explorer appears and provides cluster traffic indicators: a large share of the traffic from the attack and a high proportion of IPs flagged by Threat Intelligence. 

Those are two important indicators: 

- Threat Intel %  
- Traffic Distribution

Click an indicator to see further information about the cluster traffic. 

In **Cluster Activity**, there is a visualization of the volume of the overall APM traffic matching this cluster. While comparing it to the ASM data, beware the scale, since APM data may be sampled while ASM's isn't.

In the following example, a lot of traffic comes from before the attack. This means a legitimate activity matches this cluster in normal traffic and it would get blocked if you were to take action. You don't need to escalate or click **Block All Attacking IPs** in the signal.

In a different example, the activity from the cluster started with the attack. This means there shouldn't be collateral damage and you can proceed to block.

<!-- screenshot to be sourced -->

After confirming that the traits match the attackers, you can push an In-App WAF rule to block requests matching those traits. This is supported for user agent-based traits only.

To create the rule, do the following:

1. Go to **ASM** > **In-App WAF** > [Custom Rules](https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules).
2. Click **Create New Rule** and complete the configuration. 
3. Select your login service (or a service where you want to block the requests). You can target blocking to the login route also.
4. Configure the conditions of the rule. In this example, the user agent is used. If you want to block a specific user agent, you can paste it with the operator `matches value in list`. If you want more flexibility, you can also use a regex.
5. Use the **Preview matching traces** section as a final review of the impact of the rule. 

If no unexpected traces are shown, select a blocking mode and proceed to save the rule. The response is automatically pushed to tracers. Blocked traces appear in the Trace Explorer.

Multiple blocking actions are available. Depending on the sophistication of the attackers, you might want a more stealthy answer so that they don't immediately realize they were blocked.


{{% /tab %}}
{{< /tabs >}}

### Step 3.3: Investigation

When you have [disrupted the attacker as a preliminary response](#step-32-disrupting-the-attacker-as-a-preliminary-response), you can identify the following:

- Accounts compromised by the attackers so you can reset their credentials.  
- Hints about the source of the targeted accounts, which you can use for proactive password resets or higher scrutiny.
- Data on the attacker infrastructure, which you can use to catch future attempts or other malicious activity (credit card stuffing, abuse, etc.).

The first step is to isolate the attacker activity from the overall traffic of the application. 

#### Isolate attacker activity

While isolating attacker activity, ensure that your current filters are exhaustive through two tests:  
 

1. Go to [Traces][25], and then *exclude* traces based on the filters you identify. The goal is to have the remaining traffic volume similar to your normal traffic volume. If you're still seeing a spike of logins during the attack, it means further filters are necessary to comprehensively isolate the attack.
2. Look at the traffic matching your filters over an expanded time frame (for example, if the attack lasted an hour, use one day). Any traffic matched before or after the attack is likely be a false positive.

Next, start by isolating the attack's activity.

{{< tabs >}}
{{% tab "Bruteforce" %}}

Extract the list of targeted users by going to [Signals][1].

<!-- screenshot -->

From this list of users, you can craft a [Traces][25] query to review all the activity from targeted users. Follow this template: 

`@appsec.security_activity:business_logic.users.login.* @appsec.events_data.usr.login:(<users>)` 

Successful logins should be considered suspicious.

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A"Application%20Security"%20category%3Aaccount_takeover&product=appsec

{{% /tab %}}

{{% tab "Credential Stuffing" %}}

This signal flagged a lot of activity coming from a few IPs and is closely related to its distributed variant. You might need to use the distributed credential stuffing method.

Start by extracting a list of suspicious IPs from the signal side panel

<!-- screenshot -->

From the list of IPs, you can craft a [Traces][25] query to review all the activity from suspected IPs. Follow this template:

`@appsec.security_activity:business_logic.users.login.* @http.client_ip:(<IPs>)`

Successful logins should be considered suspicious.

{{% /tab %}}

{{% tab "Distributed Credential Stuffing" %}}

This signal flagged a large increase in login failures in one service. If the attack is large enough, this signal might also trigger either the Bruteforce or Credential Stuffing signals. The signal is also able to detect diffuse attacks more comprehensively.

In the diffuse attacks case, attacker attributes are available in the signal.

<!-- screenshot -->

1. After opening the signal in the side panel, click **Investigate in full screen**.   
2. In **Attacker Attributes**, select the cluster and click on **Filter this signal by selection**, then, in **Traces**, click **View in ASM Protection Trace Explorer**.

This gets you to the trace explorer with filters set to the flagged attributes. You can start the investigation with the current query, but you should expand it to also match login successes on top of the failures. You can do that by replacing `@appsec.security_activity:business_logic.users.login.failure` with `@appsec.security_activity:business_logic.users.login.*`. Review the exhaustiveness and accuracy of the filter using [the technique described above](#isolate-attacker-activity).

<!-- sceenshot -->

In the case those attributes are inaccurate or incomplete, you may try to identify further traits to isolate the attacker activity. The most useful traits are:

1. User agent: `@http.user_agent`  
2. ASN: `@http.client_ip_details.as.domain`  
3. Threat intelligence: `@threat_intel.results.category`  
4. URL: `@http.url`  
5. Fingerprint, when available: `@appsec.fingerprint.*`

<!-- sceenshot -->

You may use Top List or Timeseries to identify the traits whose distribution most closely matches the attack.

You may need multiple sets of filters, each possibly including multiple traits. Behind the scenes, the attacker may be using multiple randomized templates. This work identifies the constants in those templates.

{{% /tab %}}
{{< /tabs >}}

#### Review login successes and failures

Reviewing login successes and failures helps to identify the following:

* What the attackers are after so that you can block them.  
* What the attackers are doing so that you can catch them, even if they change their scripts.   
* How successful the attackers are so that you can take back the accounts they took control of and see how much time you have to react.

When attacker activity is isolated, review login successes and consider the following questions: 

* Have any accounts been compromised?   
* Are attackers doing something with their compromised accounts or are they leaving them dormant?   
* Are the accounts then accessed by a different infrastructure?   
* Is there any past activity from this infrastructure?

For the login failures, consider the following questions:

* Are attackers targeting a specific subset of users?  
* How successful are they? The accuracy of the attacks should be in the 1/100-1/1000 range.   
* Are they defeating captchas or multifactor authentication?

As your investigation progresses, you can go back and forth between this step and the next as you're ready to enforce a response based on your findings.

### Step 3.4: Response

Datadog's investigation capabilities are enriched by data from its backend, which isn't available to the library running the response. Because of that, not all fields are compatible with enforcing a response.

Motivated attackers try to circumvent your response as soon as they become aware of it. In anticipation of this approach, do the following:

1. Ensure you don't lose visibility on the attack.  
2. Make blocking as hard as possible to *identify* by the attacker. For example, make the blocking response the same as your login failure. This can confuse attackers and lead them to believe their attack is still successful.  
3. Make blocking as hard as possible to *circumvent* by the attacker. Use subtle traits, such as specific header values, instead of IPs.

You can either use Datadog's built-in blocking capabilities to deny any request that matches some criteria, or export the data automatically to one of your systems to perform a response (credentials reset, mimic login failures upon blocking, etc.).

### Datadog blocking

Users that are part of the traffic blocked by Datadog see a **You're blocked** page, or receive a custom status code, such as a redirection. Blocking can be applied through two mechanisms, each with different performance characteristics: the Denylist and custom WAF rules. 

<!-- ![][image31] -->

#### Denylist

The [Denylist][27] is an efficient way to block a large number of entries, but is limited to IPs and users. If your investigation uncovered a small set of IPs responsible for the attack (`<1000`), blocking these IPs is the best course of action. 

The Denylist can be managed and automated using the Datadog platform by clicking **Automate Attacker Blocking** in the signal. 

Use the **Automate Attacker Blocking** or **Block All Attacking IPs** signal options to block all attacking IPs for a few hours, a week, or permanently. Similarly, you can block compromised users. As a reminder, Datadog doesn't recommend blocking IPs permanently due to risks of blocking legitimate traffic after IPs get recycled into public pools.  

<!-- ![][image32] -->

The blocking can be rescinded or extended from the [Denylist][27].

<!-- ![][image33] -->

If the signal wasn't accurate, you can extract the list or users or IPs and add it to the Denylist manually.

<!-- ![][image34] -->

#### In-App WAF rules

If the Denylist isn't sufficient, you can create a WAF rule. A WAF rule evaluates slower than the Denylist, but it is more flexible. To create the rule, go to **ASM** > **Protection** > **In-App WAF** > [Custom Rules][28].

<!-- ![][image35] -->

To create a new rule, do the following:

1. Go to **ASM** > **Protection** > **In-App WAF** > [Custom Rules][28].  
2. Click **Create New Rule**.   
3. Follow the steps in **Define your custom rule**.   
4. In **Select the services you want this rule to apply to**, select your login service, or whichever services where you want to block requests. You can also target the blocking to the login route.
   <!-- ![][image36] -->
1. In **If incoming requests match these conditions**, configure the conditions of the rule. <!-- The following example uses the user agent. -->   
   1. If you want to block a specific user agent, you can paste it in **Values**. In **Operator**, you can use **matches value in list**, or if you want more flexibility, you can also use a **Matches RegEx**.
   2. Use the **Preview matching traces** section as a final review of the rule's impact. If no unexpected traces are shown, select a blocking mode and save the rule. 

The response is pushed to tracers automatically and blocked traces appear in the [Traces explorer][25].

<!-- ![][image38] -->

Multiple blocking actions are available. Depending on the sophistication of the attackers, you might want a stealthier response so that attackers don't immediately realize they were blocked.

For more information, see [In-App WAF Rules][30].

### Step 3.5: Monitor

After the attacker introduces the response, they might suspend or adapt their attack. Keep monitoring the rate of login attempts after introducing the response, especially failures. Attacks might drop off only to resume after a few minutes, hours, or days. 

If a large-scale attack resumes, the Distributed Credential Stuffing signal should re-execute. In this case, review the following considerations:

* Persistent attackers often require multiple iterations of defensive measures before giving up.
* The ideal defense is a robust blocking strategy that the attacker cannot circumvent.
* Attackers frequently attempt to evade detection by altering IPs and user agents. They're less likely to deeply modify the script they procured to send their login attempts so headers are a more resilient target.
* Effective strategies include fingerprint-based or correlation methods that identify rare header combinations.
* Monitor blocked traffic resulting from previous defensive responses.
* Blocking attacker traffic may inadvertently block legitimate traffic. Implement mechanisms to unblock legitimate traffic, either adapt the Datadog response or ensure it is unblocked post attack.

### Step 3.6: Cleanup

After a few days with no significant attacker activity, you might consider the attack over and move to a cleanup phase. 

The goals of the cleanup phase are the following:

- Disable any mitigations that were added.  
- Ensure no legitimate traffic is blocked.  
- Identify opportunities to harden services against future attacks.  
- Identify the source of the data the attacker used against users.

#### Disabling mitigations

User blocking should be based on the timer you set when you selected **Block All Attacking IPs** in the signal. This user blocking configuration doesn't require any further action.

If you configured permanent blocking, unblock users and IPs from the Denylist by doing the following: 

1. Open the [Denylist][27].  
2. Click **Blocked IPs** or **Blocked users**.  
3. In the entity list, locate the IP or user, and then click **Unblock**.

<!-- <insert up to date screenshot\> -->

#### Disable or delete any custom In-App WAF rule(s)

To disable or delete In-App WAF rule(s), go to the [custom In-App WAF rules page][28] and disable the rules by clicking on **Monitoring** or **Blocking**, and selecting **Disable Rule**. 

If the rule is no longer relevant, you can delete it by clicking more options (**...**) and selecting **Delete**.

<!-- ![][image35] -->

#### Validate no legitimate traffic is blocked

To validate that no legitimate traffic is blocked, the volume of traffic should match that of the attack closely, with virtually no blocked traces outside the main waves.

To validate that no legitimate traffic is blocked, do the following:

1. Go to [Traces][25] and search for blocked traces with the search `@appsec.blocked:true`.   
2. If you see significant traffic blocked on an ongoing basis, the traffic is likely legitimate users.
   1. Disable the incorrect blocking rule to avoid blocking further users. 
   2. Prioritize unblocking that traffic from the [Denylist][27].

#### Hardening your services

Large ATO campaigns are rarely an isolated occurrence. You might want to leverage the time between attacks to harden your services and establish configurations you can leverage during subsequent attacks.

Here are some common hardening examples:

* **Rate limit login attempt per IP/user/network range/user agent:** This soft-blocking feature lets you aggressively curtail the scale of the attack in some circumstances with minimal impact on normal users, even if they happen to share traits with the attacker  
* **Adding friction at login:** To break attackers' automation without significantly impacting users, use captchas or modifying the login flow during an attack (for example, require that a token is fetched from a new endpoint).
* **Enforce multi-factor authentication (MFA):** Datadog found MFA extremely effective in stopping account compromise. You could require your most privileged users to use MFA, especially during attacks. 
* **Limiting sensitive actions for users:** If your services allow users to perform sensitive actions (spending money, accessing sensitive information, changing contact information, etc.), you might want to prohibit high risk users with suspicious logins until they are reviewed manually or through multifactor authentication. Suspicious logins can be programmatically fed to your systems by Datadog through a webhook.  
* **Ability to consume signal findings programmatically:** Create an endpoint to consume Datadog webhooks and automatically take action against suspected users/IPs/traits.

#### Identifying the attacker data source

Attackers acquire lists of compromised accounts in bulk. By identifying the source of their database, you can proactively identify users at risk. 

To identify the source of their database, export users impacted by the attack using one of these options:

* In the signal details, in **Targeted users**, click **Export to CSV**. This option exports up to 10k users.   
* If you need to export more than 10k users, manually paginate your query by performing manual [API calls][31]. The Traces explorer performs similar calls, so you can base your requests on the call it's performing by grouping by `@appsec.events_data.usr.login`. Set the limit to 10000 and use smaller time ranges to avoid the backend cap.

<!-- ![][image41] -->

When you have a list, review it for common attributes: 
- If all users are coming from one region or one customer. 
- A large majority of users share any known compromise (use the [Have I Been Pwned][32] API).

When the source of the database is identified, proactively force a password reset of those customers or flag them as higher risk. This increases confidence that future suspicious logins were indeed compromised.

#### Review additional attacker activity

Leveraging the signature from the attacker, expand filters to look at what non-login activity they performed. 

This filter can be less accurate. For example, a filter that matches the signature of a mobile application with legitimate traffic but that was cloned by the attacker for their attack. The filter might show research done by the attacker ahead of time, and share hints on what the attacker may be looking to do next.

You can also pivot on the infrastructure used by the attacker. Did those malicious IPs do anything but logins? Are they accessing other sensitive APIs?

## Conclusion

Account theft is a common threat but also much more complex than traditional injection exploits. Catching them requires tight integration with your systems and involves enough uncertainty that automated responses aren't possible for the most advanced attacks.  

In this guide, you did the following: 
- Learned what account takeover campaigns can look like, how to triage them, and how to counter them.
- Instrumented your login services to provide Datadog ASM with all the context it needs.
- Configured your login services to provide every capability at the time of the attack. 

This is general guidance. Depending on your applications and environments, there might be a need for additional response strategies.

[1]: /security/account_takeover_protection/
[2]: https://app.datadoghq.com/services?query=service%3Auser-auth&env=%2A&fromUser=false&hostGroup=%2A&lens=Security&sort=-fave%2C-team&start=1735636008863&end=1735639608863
[3]: /security/application_security/threats/setup/compatibility/
[4]: /agent/remote_config/?tab=configurationyamlfile
[5]: https://app.datadoghq.com/security/appsec/onboarding
[6]: https://app.datadoghq.com/security/appsec/traces?query=&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036043639&end=1735640843639&paused=false
[7]: /security/application_security/threats/setup/threat_detection/
[8]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036164646&end=1735640964646&paused=false
[9]: /security/application_security/threats/add-user-info/?tab=set_user#disabling-user-activity-event-tracking
[10]: /security/application_security/threats/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[11]: /agent/remote_config/?tab=configurationyamlfile
[12]: https://app.datadoghq.com/organization-settings/remote-config?resource_type=agents
[13]: /security/application_security/threats/add-user-info/?tab=set_user#tracking-business-logic-information-without-modifying-the-code
[14]: https://app.datadoghq.com/security/appsec/threat
[15]: /security/account_takeover_protection/#attacker-strategies
[16]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[17]: /security/notifications/
[18]: https://app.datadoghq.com/security/configuration/notification-rules/new?notificationData=
[19]: /security/notifications/#notification-channels
[20]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[21]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[22]: https://securitylabs.datadoghq.com/articles/challenges-with-ip-spoofing-in-cloud-environments/#what-should-you-do
[23]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[24]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules
[25]: https://app.datadoghq.com/security/appsec/traces
[26]: https://app.datadoghq.com/security
[27]: https://app.datadoghq.com/security/appsec/denylist
[28]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules
[30]: /security/application_security/threats/inapp_waf_rules/
[31]: /api/latest/spans/#aggregate-spans
[32]: https://haveibeenpwned.com/