---
title: Account management FAQ
kind: documentation
autotocdepth: 2
customnav: accountmanagementnav
---

### How do I setup my team in Datadog?

The admin of the account should enter the email addresses of team members
[here][other-1]. Some team best practices are as follows:

* When the team member receives the confirmation email, they will be provided with a link to log in directly. The user should not click ‘sign up’ during this process.
* If multiple users from the same organization sign up separately, this will register as different organizations in Datadog. Please reach out to support to have these merged, but please note that all information contained in the account getting merged will not be transferred over.
* The only access controls we have right now are around admin activities (adding/removing users, billing, etc.). As far as data goes (hosts, metrics, dashboards, etc.) all users have access to everything; more robust access controls are in our pipeline, but not something we’ve focused a lot of attention on yet.
* To remove a team member use the “disable” button on the same ‘team’ page (only available for admins). You cannot permanently remove users, just disable; disabled users will only be visible to admins on the team page and can’t log in and any session they have open is invalidated. We don’t fully delete them because they might own events, dashboards, etc. which are not supposed to be removed.


### Are my data and credentials safe?

* Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
* All traffic is sent over SSL.
* All communication to Datadog is via HTTPS.
* The full license agreement can be found [here][other-2].
* The agent is entirely open source and can be found [here][other-3].
* Some installations (for example, installing the agent on CentOS 5), will request your password. The password is needed because it's installing packages - Datadog does not retain it in anyway. You can also use the step-by-step directions if you prefer to see exactly what the script is doing.

### What is the difference between an Admin and a User in Datadog?

Admins have just a few extra capabilities that standard users do not have. This includes access to billing info, the ability to revoke API keys, removing users, and can configure read-only dashboards. They can also promote standard users to Admins.
