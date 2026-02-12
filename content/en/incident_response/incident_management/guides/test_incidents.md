---
title: Using Test Incidents
description: "Learn how to use test incidents to safely train your team, test automations, and validate your incident response process without affecting production data or triggering real notifications."
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/information#test-incidents"
  tag: "Documentation"
  text: "Configure test incident settings"
- link: "/incident_response/incident_management/setup_and_configuration/automations#testing-automations"
  tag: "Documentation"
  text: "Testing incident automations"
- link: "/incident_response/incident_management/investigate/declare"
  tag: "Documentation"
  text: "Declare an incident"
---

## Overview

{{< img src="/incident_response/incident_management/guides/test_incidents/example_test_incident.png" alt="Example of a test incident with a purple banner" style="width:100%;" >}}

Test incidents are a type of incident designed for training, testing, and validation purposes. When enabled, test incidents allow your team to practice incident response workflows, validate automations, and familiarize new team members with your incident management process—all without impacting production analytics or triggering real notifications.

Test incidents are visually distinguished by a **purple banner** and are isolated from your production incident data by default.

## Default behavior

By default, test incidents:
- Do not appear in search results
- Do not appear in analytics
- Do not execute integrations
- Do not execute notification rules

During declaration, you can optionally enable any of these behaviors if needed for your testing purposes. For example, enable "Execute integrations" when testing workflows, or enable "Include in analytics" when validating reporting.

## Use cases

**Onboarding new responders**: Train new team members on your incident response process by declaring a test incident and assigning them as incident commander. Walk through the full lifecycle—declaration, investigation, communication, and resolution—allowing them to practice using the timeline, adding responders, and updating stakeholders.

**Testing incident automations and notifications rules**: Before deploying new [incident automations][1] or after setting up a [notification rules][2], declare a test incident that matches your automation's trigger conditions or notification rules. Verify that it executes correctly by checking the incident timeline, confirm it performs expected actions (Slack messages, task creation), and iterate on your configuration without disrupting production workflows.

**Validating integrations**: When configuring integrations like Jira, ServiceNow, or Slack, create a test incident to verify tickets or channels are created correctly. Check that bidirectional syncing works as expected, incident updates propagate properly to external systems, and notification formatting appears correctly.

**Running incident response drills**: Use test incidents to simulate realistic scenarios. Practice escalation procedures and communication protocols, test your on-call rotation's responsiveness, evaluate team coordination, and review performance afterward without the data appearing in team metrics.

## Enabling test incidents

<div class="alert alert-danger">Only users with the appropriate Datadog administrative permissions can enable test incidents. After it's enabled, any user with the <strong>Incidents Write</strong> permission can declare test incidents</div>

Test incidents must be enabled before use. To enable them:

1. Navigate to [**Incidents** > **Settings** > **Information**][3]
2. Scroll to the **Test incidents** section
3. Toggle the setting to **Enabled** for your incident type
4. Click **Save Changes**

## Declaring a test incident

### From the Incidents page

1. Navigate to the [Incidents page][4].
2. Click the dropdown next to Declare Incident and select **Declare Test Incident**.
3. Fill in the required incident details.
4. (Optional) Configure test incident options to change [default behavior](#default-behavior).
5. Click **Declare Test Incident**.

### From Slack

If you have the [Slack integration][5] configured:

1. In any Slack channel, type `/datadog incident test`.
2. Fill out the incident creation form in Slack.
3. Submit to create the test incident.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/setup_and_configuration/automations
[2]: /incident_response/incident_management/setup_and_configuration/notification_rules
[3]: https://app.datadoghq.com/incidents/settings#Information
[4]: https://app.datadoghq.com/incidents
[5]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
