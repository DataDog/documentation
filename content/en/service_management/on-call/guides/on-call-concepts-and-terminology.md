---
title: On-Call Concepts and Terminology

description: "Still need to figure this one out."
aliases:
- /on-call/guides/on-call-concepts-and-terminology
further_reading:
- link: "https://docs.datadoghq.com/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
---

## Introduction
Welcome to our knowledge base series on effective on-call practices. If you’re new to Datadog On-Call or looking to solidify your understanding, this article will introduce the foundational concepts and common terms you’ll encounter. By the end, you’ll have the basic groundwork to confidently dive into on-call planning, scheduling, and incident resolution.

**Why This Matters:**
- An on-call system ensures that you respond quickly and effectively to issues, minimizing service disruptions.
Understanding standard on-call terms helps align your entire organization around common practices and language, reducing confusion and improving collaboration.

## Essential On-Call Terminology
Below is a list of critical terms you’ll need to know. We’ve only included **keywords** here; stay tuned for more detailed explanations in future updates or additional KB articles:

### On-Call Engineer / On-Call Team
The individual(s) designated to respond to critical alerts and incidents during a defined period—-often called an “on-call shift.” Their job is to acknowledge issues promptly, troubleshoot or mitigate them, and escalate if needed. Teams usually rotate these responsibilities to ensure fair coverage and avoid burnout.

Every On-Call Engineer needs to know why they are performing this duty. Most of the time, it’s about the continuation of your business. Whether that’s through ensuring customer satisfaction, maintaining brand reputation, or safeguarding revenue streams from disruptions, the on-call engineer plays a vital role in keeping services stable and customers happy.

### Schedule
Schedules define the specific times when team members are available to respond to Pages. Schedules organize and manage the availability of team members across different timezones and shifts.

### Escalation Policy
An escalation policy ensures that every Page receives the attention it needs, when it’s needed. If an on-call engineer doesn’t acknowledge an alert within a set time frame, the Page is automatically forwarded to the next tier or designated responder. This chain continues until the issue is actively addressed, so nothing slips through the cracks.

### Page
A Page is a signal indicating that an on-call engineer needs to investigate something. It can originate from a variety of sources—such as Datadog Monitors, security alerts, user-submitted incidents, or other third-party tools—and may vary in urgency. Some pages require immediate attention (even waking someone up if necessary), while others are lower-priority tasks that can be scheduled during regular working hours. Regardless of urgency, the primary purpose of a page is to make sure potential issues are seen, acknowledged, and addressed so that nothing slips through the cracks.

### Incident
An incident is a significant disruption or imminent risk to your normal operations that typically requires multi-team coordination to investigate, mitigate, and resolve. Unlike a single-page issue handled by one on-call engineer, an incident often spans multiple domains, triggers multiple pages, and may involve an “incident commander” or centralized coordinator. Incidents can directly impact customer experience, business continuity, or security posture, making swift and collaborative action crucial to minimize damage and prevent recurrence.

### Notification
A notification is the mechanism by which users are informed about relevant events—be it a page, an incident, or any other important occurrence. These messages can be delivered through various channels (email, chat, voice calls, SMS, push notifications, etc.).

### Runbook / Playbook
Runbooks (or playbooks) are concise, step-by-step guides for responding to both routine alerts and larger-scale incidents, capturing the key actions, tools, and escalation paths needed for speedy, consistent resolutions. Alert runbooks focus on repetitive issues—such as performance spikes or disk usage—providing quick checks, standard fixes, and clear handoff criteria. By contrast, incident runbooks address more complex problems like outages or security breaches, emphasizing multi-team coordination, communication protocols, and thorough follow-up steps once the situation is under control.

### SLA (Service-Level Agreement) and SLO (Service-Level Objective)
SLA (Service Level Agreement) and SLO (Service Level Objective) refer to key reliability metrics that help teams maintain consistent performance. An SLA is a formal commitment to customers (e.g., guaranteeing 99.9% uptime), while an SLO is an internal target—-often set slightly higher than the SLA—-that guides engineering efforts to meet or exceed those promises. Both reinforce trust by clearly defining expectations and tracking service health.

### MTTA (Mean Time to Acknowledge) and MTTR (Mean Time to Resolve)
MTTA (Mean Time to Acknowledge) and MTTR (Mean Time to Resolve) track how quickly an On-Call team detects and fixes incidents. MTTA measures the time from when an alert is triggered to when it’s first acknowledged, while MTTR measures how long it takes to fully resolve the issue. Reducing both leads to faster recovery, less downtime, and a more reliable experience for customers.

### Postmortem (a.k.a. Incident Retrospective)
Postmortem (aka. Incident Retrospective) is a structured review that happens after an incident is resolved, examining what happened, how it was handled, and how to prevent it from happening again. Conducted in a blameless environment, postmortems foster open discussion, root cause analysis, and continuous improvement by identifying the steps needed to enhance reliability and refine on-call processes.

Note: We will provide detailed definitions and best practices for each of these terms in a future article. For now, consider this a handy reference list to familiarize yourself with key on-call vocabulary.

## Who Typically Owns On-Call?
Different organizations structure their on-call responsibilities in various ways. Some have a dedicated Site Reliability Engineering (SRE) team, others utilize DevOps teams, and smaller companies might have rotating product teams sharing the load. Regardless of your structure:

- Ownership and Accountability: Ensure each service or system has a clearly defined owner who understands its architecture and troubleshooting procedures.

- Clarity in Roles: If multiple teams share on-call duties, define which team handles which types of incidents or services.

Having a clear understanding of who is responsible -- and at which point -- removes ambiguity when an incident occurs.

## Quick Tips for Getting Started

### Identify Critical Services
- Focus on the systems that directly impact your customers or core business functions.

### Establish Basic SLAs/SLOs
- Even simple internal targets (e.g., response within 15 minutes) can guide on-call processes.

### Create Escalation Policies
- Define how an incident transitions from the primary on-call to other teams or stakeholders if not resolved.

### Communicate Thoroughly
- Make sure everyone knows who’s on-call, when, and what their responsibilities are.

With these basics in place, you’ll be well on your way to running a more efficient and less stressful on-call operation.

Next Step: Check out our next KB article, “[Setting Up an On-Call Rotation in Our Product],” for a detailed walkthrough on scheduling your first rotation and customizing alert rules.
