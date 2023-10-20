---
title: Getting Started with Workflow Automation
kind: documentation
further_reading:
    - link: '/tracing/trace_collection/'
      tag: 'Documentation'
      text: 'Select your application language'
    - link: '/tracing/glossary/'
      tag: 'Documentation'
      text: 'Use the APM UI'
    - link: 'https://learn.datadoghq.com/courses/intro-to-apm'
      tag: 'Learning Center'
      text: 'Introduction to Application Performance Monitoring'
    - link: 'https://dtdg.co/fe'
      tag: 'Foundation Enablement'
      text: 'Join an interactive session to boost your APM understanding'
---
## Overview

Workflow Automation allows you to automate end-to-end processes in response to Datadog alerts and security signals. It is powered by real-time observability data, enabling you to resolve issues faster and proactively maintain the availability and security of your systems.

Follow this guide to create a custom workflow that is triggered from a monitor alert. When it is triggered, the workflow creates a task in Jira and sends a notification to Slack with a link to the Jira ticket. This guide covers passing data from one step in your workflow to another step,saving and publishing your workflow and viewing the run history.  
