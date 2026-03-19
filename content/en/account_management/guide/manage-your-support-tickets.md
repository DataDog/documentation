---
title: Manage Your Support Tickets
description: Learn how to create new support tickets and access your existing Datadog support tickets through the Zendesk portal.
aliases:
  - /developers/faq/access-your-support-ticket
  - /account_management/faq/access-your-support-ticket
  - /account_management/guide/access-your-support-ticket
further_reading:
- link: "/getting_started/support/"
  tag: "Documentation"
  text: "Getting Started with Datadog Support"
---

<div class="alert alert-info">Select your Datadog site to see instructions for your support portal.</div>

{{< site-region region="us,us3,us5,eu,ap1" >}}

<h2>Create a support ticket</h2>

<p>To create a new support ticket, navigate to the <a href="https://help.datadoghq.com/">Datadog support site</a>. At the bottom of the page, click <strong>Create a New Ticket</strong> to fill out a ticket form.</p>

<p>You can also access this form through Datadog. From the left navigation, mouse over <strong>Help</strong> and click <em>Support</em>. Alternatively, navigate to the <a href="https://app.datadoghq.com/help">Datadog help page</a> and click <strong>New Support Ticket</strong>.</p>

<h2>Access existing tickets</h2>

<p>If you have opened at least one Datadog support ticket, follow this process to access all your Datadog support tickets:</p>
<ol>
    <li>From the Support page click <strong>Sign in</strong> on the top right.</li>
    <li>If this is your first time signing into your Datadog Zendesk account, click the link by <strong>New to your Datadog Zendesk account? Sign up</strong>.</li>
    <li>If you have previously emailed Datadog support, click <strong>Emailed us for support? Get a password</strong> and enter the same email address you used to contact Datadog support.</li>
    <li>After you receive the password in your email, log in and click <strong>Manage your tickets</strong> to see your requests.</li>
    <li>If you don't see the <strong>My Activities</strong> page after logging in, click on your name in the upper right corner, and then click <strong>My Activities</strong>.</li>
    <li>If you would like to view your entire organization's tickets, submit a request to Datadog support.</li>
</ol>

{{< whatsnext desc="Support Page by Datadog Site:">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1, US3, US5, EU, AP1, AP2 {{< /nextlink >}}
    {{< nextlink href="https://govsupport.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

<h2>Password requirements</h2>

<p>To ensure the security of your account, any password used to sign in to Datadog's Zendesk support portal must meet the following requirements:</p>
<ol>
    <li>Password complexity:
        <ul>
            <li>Must include at least <strong>12 characters</strong>.</li>
            <li>Must contain <strong>uppercase and lowercase letters (A-Z)</strong>.</li>
            <li>Must include at least <strong>one number (0-9)</strong>.</li>
            <li>Must include at least <strong>one special character</strong> (for example, <code>!</code>, <code>@</code>, <code>#</code>, or <code>%</code>).</li>
            <li>Must <strong>not resemble an email address</strong>.</li>
            <li>Must <strong>not include the word "Zendesk"</strong>.</li>
        </ul>
    </li>
    <li>Failed attempts and lockout:
        <ul>
            <li>Users are allowed a maximum of <strong>5 attempts</strong> before the account is locked out temporarily.</li>
        </ul>
    </li>
    <li>Prohibited sequences:
        <ul>
            <li>Passwords cannot include more than a specified number of consecutive letters or numbers. For instance, if the limit is set to 4, the system rejects passwords like <code>admin12345</code>.</li>
        </ul>
    </li>
    <li>Previous passwords:
        <ul>
            <li>Users cannot reuse a certain number of their previously used passwords.</li>
        </ul>
    </li>
    <li>Expiration Policy:
        <ul>
            <li>Passwords must be updated at least <strong>every 90 days</strong>, or whenever prompted by the system.</li>
        </ul>
    </li>
</ol>

<h2>Troubleshooting</h2>

<h3>Error: Refused to connect</h3>

<p><strong>Refused to connect</strong> errors come from privacy settings that block third-party cookies. To solve this issue, make sure the browser allows third-party cookies from Zendesk. Find instructions on how to <a href="https://support.google.com/chrome/answer/95647">Clear, enable, and manage cookies in Chrome</a> in Google Chrome Help.</p>

<p>If your browser has ad-blockers, turn them off to see if this allows you to sign in. Some ad-blockers have their own list of exceptions. In this case, add <strong>datadog.zendesk.com</strong> to the allow list.</p>

<h2>Further reading</h2>

{{< partial name="whats-next/whats-next.html" >}}

{{< /site-region >}}

{{< site-region region="gov" >}}


<h2>Register on the portal</h2>

<p>If you are a first-time user, follow these steps to register an account:</p>

<ol>
    <li>Navigate to <a href="https://govsupport.ddog-gov.com">the Datadog GovCloud support portal</a>.</li>
    <li>Click <strong>Sign Up</strong>.</li>
    <li>Complete the registration form, using the email address associated with your existing GovCloud Datadog account.</li>
    <li>In a separate browser tab, navigate to your email. Open the verification email from <code>help@ddog-gov.com</code> and copy the verification code.</li>
    <li>In the Datadog GovCloud support portal, enter the verification code.</li>
    <li>Click <strong>Verify</strong>.
</ol>

<h2>Create a new case</h2>

<p>To create a new case:</p>

<ol>
    <li>Navigate to <a href="https://govsupport.ddog-gov.com">the Datadog GovCloud support portal</a>.</li>
    <li>Log in with the username format <code>[name]@[domain].ddgov.support</code>.</li>
    <li>Click <strong>Create a New Case</strong>.</li>
    <li>Complete the form.</li>
    <li>Click <strong>Submit & Upload Files</strong>.</li>
    <li>Optionally, upload supporting files. Accepted file types include <code>.txt</code>, <code>.csv</code>, <code>.xls</code>, <code>.xlsx</code>, <code>.doc</code>, <code>.otf</code>, <code>.yaml</code>, <code>.log</code>, <code>.conf</code>, <code>.tf</code>, <code>.zip</code>, and <code>.pcap</code>.</li>
    <li>Click <strong>Submit</strong>.</li>
</ol>

<h2>Access existing cases</h2>

<p>If you have opened at least one Datadog case, follow this process to access your cases:</p>

<ol>
    <li>Log in at <a href="https://govsupport.ddog-gov.com">the Datadog GovCloud support portal</a>.</li>
    <li>Change the filter from <strong>Recently Viewed</strong> to <strong>Cases</strong> to view all cases.</li>
    <li>Click <strong>Case Number</strong> or <strong>Subject</strong> to view details.</li>
</ol>

<p><strong>Note</strong>: Historical Zendesk cases are not migrated; legacy Zendesk is read-only.</p>

<h2>Troubleshooting</h2>

<h4>Cannot see new cases</h4>

<p>Change the filter from <strong>Recently Viewed</strong> to <strong>Cases</strong>.</p>

<h4>Login issues</h4>

<p>Ensure your full username includes the <code>.ddgov.support</code> suffix.</p>

<h4>Password reset not received</h4>

<p>Use your full username (with the <code>.ddgov.support</code> suffix) in the <strong>Forgot Password</strong> flow.</p>

<h4>Registration error</h4>

<p>Your account may already exist. Try the <strong>Forgot Password</strong> flow with your full username.</p>

{{< /site-region >}}
