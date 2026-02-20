---
title: RUM Browser Monitoring
description: "Monitor real user data and frontend performance with Datadog RUM Browser SDK to optimize web experiences and identify issues across the stack."
aliases:
  - /real_user_monitoring/browser/
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

## Start monitoring Browser applications

To get started with RUM for Browser, create an application and configure the Browser SDK.

{{< whatsnext desc="This section includes the following topics:" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Client-Side</u>: Instrument each of your browser-based web applications, deploy the application, then configure the initialization parameters you want to track, and use advanced configuration to further manage data and context that RUM collects.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-Instrumentation</u>: Inject a RUM SDK JavaScript scriptlet into the HTML responses of your web applications being served through a web server or proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">}}<u>Agentic Onboarding</u>: (In Preview) Perform an AI-guided setup that detects your project's framework and adds the RUM SDK with a single prompt. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>Advanced configuration</u>: Configure RUM Browser SDK to modify data collection, override view names, manage user sessions, and control sampling for your application's needs.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>Data Collected</u>: Review data that the Browser SDK collects.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>Monitoring Page Performance</u>: Monitor view timings to understand your application's performance from a user's perspective. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>Optimizing Performance</u>: Use the RUM Optimization page to identify and troubleshoot browser performance issues with Core Web Vitals analysis and user experience visualization.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>Monitoring Resource Performance</u>: Monitor browser resource performance and link RUM data with backend traces for full end-to-end visibility.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>Collecting Browser Errors</u>: Learn how to collect and track frontend errors from multiple sources using RUM Browser SDK, including manual error collection and React error boundaries.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>Tracking User Actions</u>: Track and analyze user interactions in your browser application with automatic click detection and action performance insights.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>Frustration Signals</u>: Identify user friction points with RUM frustration signals (including rage clicks, dead clicks, and error clicks) to improve user experience and reduce abandonment.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>Troubleshooting</u>: Common troubleshooting Browser SDK issues.{{< /nextlink >}}
{{< /whatsnext >}}
