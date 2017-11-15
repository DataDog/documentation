---
title: How do I setup (or remove) a team member in Datadog?
kind: faq
customnav: accountmanagementnav
---

The admin of the account should enter the email addresses of team members here. Some team best practices are as follows:

* When the team member receives the confirmation email, they will be provided with a link to log in directly. The user should not click ‘sign up’ during this process.
* If multiple users from the same organization sign up separately, this will register as different organizations in Datadog. Please reach out to support to have these merged, but please note that all information contained in the account getting merged will not be transferred over.
* The only access controls we have right now are around admin activities (adding/removing users, billing, etc.). As far as data goes (hosts, metrics, dashboards, etc.) all users have access to everything; more robust access controls are in our pipeline, but not something we’ve focused a lot of attention on yet.
* To remove a team member use the “disable” button on the same ‘team’ page (only available for admins). You cannot permanently remove users, just disable; disabled users will only be visible to admins on the team page and can’t log in and any session they have open is invalidated. We don’t fully delete them because they might own events, dashboards, etc. which are not supposed to be removed.
* Note: Disabled users/team members will disappear from the admin's team page UI automatically after one month.