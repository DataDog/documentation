---
title: Learning Center Course Catalog
description: Self-paced Datadog Learning Center courses grouped by product area, with a short description of each course.
---

## Overview

The [Datadog Learning Center][1] offers free, self-paced courses with hands-on labs. Each entry below links to the course page on the Learning Center, where you can enroll. For curated sequences of courses, see [Learning Center Learning Paths][2].

## Datadog fundamentals

- [Datadog Quick Start][3]: Explore data and insights in Dashboards, Logs, Software Catalog, and Monitors for a live application environment. Become confident finding your way around Datadog features you'll use everyday.
- [Getting Started with DDSQL Editor][4]: Query and join metrics, logs, and traces across sources using Datadog's DDSQL Editor.
- [Managing Services with Catalog][5]: Understand Datadog Catalog, part of the Internal Developer Portal (IDP). Create and modify entity metadata with the UI, YAML, the Catalog API, and Terraform.
- [Metrics Governance in Datadog][6]: Learn how to monitor, investigate, and optimize custom metrics usage in Datadog. Respond to a metrics usage alert, identify high-cardinality tags, apply Metrics without Limits, identify unused metrics, and implement governance safeguards.
- [Tagging Best Practices][7]: This course gives an overview of tagging concepts in Datadog, introducing the main use cases for tagging and providing recommendations for best practices.

## Agent and integrations

- [Create an Agent Integration][8]: This course guides you through the development process for a sample Datadog integration, presenting the associated tooling along with the coding and configuration steps, all with a view to helping you start building your own integrations.
- [Getting Started with Integrations][9]: Learn how Datadog's 800+ integrations collect and report data from an expansive list of outside tools, platforms, programming languages, and more.
- [Getting Started with the Datadog Agent on Amazon EC2][10]: Install the Datadog Agent on EC2 instances using two different methods, SSH and AWS Systems Manager, and compare the tradeoffs between them. Use Fleet Automation to view Agent status, push configuration changes, and upgrade Agents across your fleet.
- [Monitoring a Postgres Database with Datadog DBM][11]: Identify inefficiencies and optimize your database. View query metrics, explain plans, and visualizations from all of your databases in a single place.
- [Process Logs Out of the Box with Integration Pipelines][12]: Structure and enrich ingested logs from common sources using out-of-the-box and modified Integration Pipelines.
- [The Agent on a Host][13]: Introduction to running the Datadog Agent on a host. Hands-on activities walk you through running and configuring the Agent to collect events, metrics, and logs from other services.
- [The Agent on Docker][14]: Introduction to running the Datadog Agent in a container. Hands-on activities walk you through running and configuring the Agent container to collect metrics and logs from other services.
- [Using the Datadog Distribution of OpenTelemetry Collector][15]: Combine your OpenTelemetry (OTel) configuration with the Datadog Agent to have OTel flexibility alongside advanced Datadog functionality.

## Cloud and serverless

- [Configure AWS Lambda for Serverless Monitoring with Datadog][16]: Learn to integrate Datadog Lambda Extension into serverless applications, analyze function performance using Serverless View and APM, and diagnose issues like cold starts and bottlenecks in AWS Lambda functions.
- [Getting Started with Observability in Google Cloud with Datadog][17]: Install Datadog's Google Cloud Platform integration and configure log collection with Google Cloud Dataflow using Terraform. Install the Datadog Agent on a Compute Engine VM instance. Validate that metrics, logs, and traces are flowing from Google Cloud to Datadog.

## Containers and Kubernetes

- [Configuring Single Step Instrumentation on Kubernetes][18]: Accelerate APM instrumentation time of your application in Kubernetes without editing code.
- [Getting Started with Kubernetes Observability][19]: Explore Datadog's observability capabilities for Kubernetes by navigating built-in dashboards, then using metrics and events to diagnose performance issues in real-time.
- [Monitoring a Kubernetes Cluster: Installing the Agent][20]: To monitor your Kubernetes cluster with Datadog, you must install the Datadog Agent. This course will walk you through the most common ways of installing Cluster and Node Agents on Kubernetes: the Helm chart and The Datadog Operator.
- [Monitoring a Kubernetes Cluster: The Control Plane][21]: This course will walk you through monitoring the control plane of a Kubernetes cluster with Datadog. It will focus on troubleshooting configuration issues, identifying useful dashboards and views in Datadog, and identifying cluster health issues.
- [Monitoring a Kubernetes Cluster: Troubleshooting Workloads][22]: This course will present hands-on scenarios in which you will use Datadog to identify, fix, and monitor common Kubernetes workload issues.

## Metrics, dashboards, and notebooks

- [Create Custom Metrics with DogStatsD][23]: Learn how to use DogStatsD to send custom metrics to Datadog.
- [Discovering Graph Widgets][24]: In this course, you'll learn how to create, configure, and utilize Datadog dashboard graph widgets. You'll track the metrics and performance of a web application and discover how to present important data using these popular widget types.
- [Discovering Table, List, SLO, and Architecture Widgets][25]: In this course, you'll learn how to create, configure, and utilize Datadog dashboard table, list, SLO, and architecture widgets. You'll track the metrics and performance of a web application and discover how to present important data using these popular widget types.
- [Introduction to Dashboards][26]: This course will demonstrate how to use the fundamental tools of the Dashboard product. You will explore widgets, Integration Dashboards, and template variables. Along the way you'll learn about the importance of creating a well constructed and easy to understand Dashboard.
- [Using Datadog Notebooks for Centralized Reporting][27]: In this lab, you learn how to use Datadog and the Datadog API to build a notebook that holds, over a 5-day span, both metric data and software release notes for an application.

## Monitors, SLOs, and incident management

- [Customize Alert Monitor Notifications][28]: Craft dynamic and descriptive notification messages for alert monitors using conditional, tag, and template variables. In the hands-on lab, you'll gain practical experience by drafting and testing notification messages, ensuring your notification messages are clear and actionable.
- [Getting Started with Incident Management][29]: Learn how to manage incidents using Datadog Incident Management. By the end of this course, you'll know how to set up Incident Management, detect and declare incidents, and guide your team through resolution.
- [Getting Started with Monitors][30]: Create, configure, and use Datadog Monitors to stay ahead of issues. Explore various monitor types and examine the monitor status page to detect issues early and keep systems running smoothly.
- [Getting Started with Service Level Objectives (SLOs)][31]: In this course, you'll deepen your understanding of Service Level Objectives (SLOs) and gain hands-on experience using them to solve issues in a web application. This builds on the concepts covered in Understanding Service Level Objectives.
- [Understanding Service Level Objectives (SLOs)][32]: In this course, you'll learn how to create, configure, and apply Service Level Objectives (SLOs) in Datadog to monitor the health and performance of your services. SLOs are critical for defining the expected reliability of your applications.

## Logs

- [Advanced Log Configuration][33]: Learn to fix common log collection issues, such as multi-line logs, log parsing, and filtering.
- [Build and Manage Log Pipelines][34]: Build a custom log pipeline to extract attributes and assign log statuses. Use the Pipeline Scanner to check how logs are processed, and learn how Standard Attributes normalize attribute names across sources.
- [Configure Log Collection for a Containerized Application][35]: Learn how to set up logging and log ingestion for an app that is built with Ruby and Python services in a Docker environment. The concepts are applicable to other languages, frameworks, and environments.
- [Debugging Logs Pipelines][36]: Identify the signs of problems in your log pipelines. Use the Pipeline Scanner to locate where processed logs have been modified. Locate and correct patterns defined in Grok Processors to make sure your logs are parsed correctly.
- [Dive Deeper into Log Queries and Aggregations][37]: Create visualizations for counts and statistics of log attributes. Build multiple queries and formulas simultaneously. Use functions to transform data in visualizations. Aggregate logs based on patterns and transactions (related sequences of events).
- [Enhance Log Querying and Analytics with Reference Tables, Subqueries, and Calculated Fields][38]: Combine metadata with your logs using Reference Tables. Filter one set of logs against another set of logs using Subqueries. Create new fields using existing tags and attributes at query time using Calculated Fields.
- [Getting Started with Log Explorer][39]: Query logs from all of your log sources. Investigate log details. Build visualizations with Fields Aggregations. Create Saved Views. Add facets and measures.
- [Manage and Monitor Indexed Log Volumes][40]: Control and track retention and volumes of indexed logs to maintain costs using Indexes with Exclusion Filters, Logs Monitors, and the Log Management - Estimated Usage dashboard. Learn about Flex Logs vs Standard Indexing.
- [Track Logs for Alerting and Investigations][41]: Set up alerts for logs using Log Monitors. Investigate error logs using Error Tracking. Create metrics from logs using Generate Metrics. Visualize log data in Dashboards alongside related data and insights.

## APM and profiling

- [APM Monitors and Alerting][42]: Learn to create and modify effective APM monitors and alerts so your systems are properly monitored and the correct teams notified when something goes wrong.
- [APM Rate Limiting and Retention][43]: Control APM trace retention and rate limiting for your applications. Add ingestion and retention filters, create metrics from traces, and monitor trace usage to better manage your APM data.
- [Configure and manage the APM SDK for your applications][44]: Configure and manage the APM SDK for your applications. Apply recommended practices and build confidence when adding APM to your applications.
- [Diagnose Code Performance Issues with Continuous Profiler][45]: Investigate and improve application code performance in production with Datadog Continuous Profiler.
- [Diagnosing Application Bugs with Datadog APM][46]: Leverage several features of the Datadog APM product to identify bugs within application code. Using insights gained from APM, fix those bugs and verify your fixes have made a difference in stability and performance.
- [Optimize Request Latency with Profiling Timeline][47]: Pinpoint causes of poor request latency using Timeline in Continuous Profiler. View the distribution of thread activity and runtime activity over every request for full visibility into multithreaded applications.
- [Troubleshooting APM Instrumentation on a Host][48]: This course provides hands-on experience in troubleshooting Datadog Application Performance Monitoring (APM) for applications running on the same host as the Datadog Agent.

## OpenTelemetry

- [Create Custom Metrics with OTel][49]: Inspect custom metrics from your OTel applications, add new metrics, and examine tradeoffs in their types and attributes.
- [Introduction to OpenTelemetry with Datadog][50]: Configure your OpenTelemetry (OTel) instrumented system so that you can explore OTel collected metrics, traces, and logs all in Datadog.
- [Sample Traces from OTel][51]: Configure tail-based sampling in an OTel Collector gateway to reduce trace volume while preserving errors, slow traces, and full-fidelity service metrics.
- [Understanding OpenTelemetry][52]: Discover the fundamentals of OpenTelemetry (OTel), an open-source standard for telemetry data collection. This course provides an overview of OTel's capabilities and benefits, preparing you for integrating observability into your applications.

## Digital experience

- [Configure Real User Monitoring (RUM) for JavaScript web applications][53]: Learn about the different configuration options when setting up Datadog RUM on your JavaScript web applications.
- [Define User Behavior with Labeled Actions in Product Analytics][54]: Learn how to define meaningful user behavior with Labeled Actions in Datadog Product Analytics.
- [Getting Started with Synthetic Monitoring & Browser Testing][55]: Simulate user sessions to proactively test and monitor application frontends from different locations, browsers, and devices using Datadog Synthetic Monitoring.
- [Intro to Real User Monitoring (RUM)][56]: How does your user experience impact operational success? Use data from real end-users to track UX, performance, deployments, and errors—all while gaining visibility into precisely how users interact with your apps.
- [Optimizing Frontend Performance with RUM Browser Monitoring][57]: In this course, you'll learn how Datadog RUM Browser monitoring can help you find frontend performance issues before a customer complains, help you see what real users experienced on your site, and give you the data you need to pinpoint and address issues.
- [RUM Retention Filters][58]: Control your RUM session retention volume while maintaining visibility into valuable sessions. Create retention filters, understand how RUM events are evaluated against retention filters, and learn how to troubleshoot retention filter configurations.
- [Synthetic Tests in a CI/CD Pipeline][59]: In this course, you learn how to incorporate Datadog's synthetic tests into a CI/CD pipeline to help you catch bugs in code before deployment.

## Security

- [Automate Threat Investigation and Remediation with Security Workflows][60]: Automate security investigation and remediation tasks with Datadog Workflow Automation and Cloud SIEM. Create security workflows using Cloud SIEM Content Packs and SOAR blueprints. Automate threat remediation in AWS using security workflows.
- [Block Application Attacks with Application & API Protection][61]: Block application-level attacks using App & API Protection. Thwart attackers by blocking malicious IP addresses and users directly from security signals within the Datadog UI. Use the In-App WAF to block attack tools and suspicious traffic. After taking this course, you'll be equipped to defend your applications using Datadog.
- [Configure Cloud SIEM for AWS][62]: Secure your cloud environments with Datadog Cloud SIEM. Enable Cloud SIEM, ingest cloud audit logs, and install a Content Pack. The lab and examples in this course feature AWS. The concepts are applicable to multiple cloud providers.
- [Detect and Investigate Threats with Cloud SIEM][63]: Secure your cloud environments with Datadog Cloud SIEM and cloud provider Content Packs. Explore out-of-the-box threat detection rules. Investigate incoming threats using Security Signals, Signals Explorer, and Cloud SIEM Investigator.
- [Detect Host and Container Compromises with Workload Protection][64]: Monitor file, network,process, and kernel activity with Workload Protection. Detect and investigate intrusions and running malware in real-time. Secure containerized and host-based workloads.
- [Enable and Manage Workload Protection][65]: Enable Datadog Workload Protection. Manage security agent rules and detection rules in Datadog.
- [Find and Remediate Vulnerable Cloud Resources with Cloud Security Misconfigurations][66]: Secure your cloud environments with Datadog Cloud Security Misconfigurations. Enable continuous misconfiguration scanning across your entire cloud infrastructure. Detect, prioritize, and remediate insecure cloud resources in multiple cloud providers.
- [Introduction to Cloud SIEM][67]: In this course, you learn the fundamentals about how to use Cloud SIEM in Datadog to detect different types of security threats and attacks.
- [Write Custom Cloud SIEM Detection Rules][68]: Create custom detection rules for Datadog Cloud SIEM. Write detection rule queries using key log attributes and create notification rules to automatically alert stakeholders. Write suppression queries and manage detection rules as code.

## Code security and software delivery

- [Detect and Block Leaked Secrets with Datadog][69]: Detect and block leaked secrets before they reach production. Scan your repositories with Datadog Code Security (Secret Scanning), use live validation to confirm whether a leaked credential is still active, remediate the secret, and establish automated quality gates that block merges introducing new secrets.
- [Detect and Remediate IaC Misconfigurations with Datadog][70]: Detect and fix Infrastructure as Code misconfigurations before they reach production. Scan Terraform, Kubernetes manifests, and CI/CD pipeline definitions with Datadog Code Security (IaC Security), triage findings in context, remediate misconfigurations, tune the ruleset in configuration as code, and write a custom rule in Rego.
- [Find and Fix Code Vulnerabilities with Datadog Static Code Analysis (SAST)][71]: Find and fix vulnerabilities in your first-party code with Datadog Static Code Analysis (SAST). Triage findings, assess exploitability, and block insecure code from merging.
- [Getting Started with Test Optimization][72]: Accelerate your CI pipelines by implementing Datadog Test Optimization. Set up test monitoring, identify flaky tests, and leverage Test Impact Analysis to run only the tests that matter. Gain hands-on experience with flaky test management and intelligent test selection.

## LLM Observability

- [Getting Started with Agent Observability][73]: Learn to build, instrument, and monitor AI-powered applications using Datadog's Agent Observability. This course covers integrating Large Language Models into applications, implementing comprehensive observability, and troubleshooting performance issues. You'll work hands-on with a chatbot application, learning to track costs, monitor performance, and ensure quality in production LLM applications.
- [Investigate with Agent Observability][74]: Investigate AI application issues using metrics and traces. Move from high-level dashboard metrics to individual traces to identify the root cause of latency problems, silent pipeline failures, and quality issues hiding behind successful operational metrics.
- [Tracing AI Applications][75]: Learn to build, instrument, and monitor AI-powered applications using Datadog's Agent Observability. This course covers integrating Large Language Models into applications, implementing comprehensive observability, and troubleshooting performance issues. You'll work hands-on with a chatbot application, learning to track costs, monitor performance, and ensure quality in production AI applications.

## Automation and App Builder

- [Automating Meaningful Actions with Datadog Workflow Automation][76]: Learn how to automate security responses and operational remediation using Datadog Workflow Automation, from fixing cloud misconfigurations to rolling back faulty deployments and maintaining tag hygiene.
- [Build Self-Serve Apps with App Builder for Third-Party Integrations][77]: Learn how to build a Datadog App Builder app that interacts with GitHub. Use tables, modals, and forms to create issues, list pull requests (PRs), and post comments on the PRs-all from your app.
- [Datadog API: Automation and Infrastructure as Code][78]: In this course, you'll take a hands-on tour of the Datadog API and its capabilities. You'll also learn a variety of ways to communicate with the Datadog API, with an emphasis on automated methods.
- [Getting Started with App Builder][79]: Learn the basics of App Builder by creating an app using a blueprint. Set up a connection, add actions and components, and explore how App Builder helps teams take action directly from Datadog.

[1]: /getting_started/learning_center/
[2]: /getting_started/learning_center/learning_paths/
[3]: https://learn.datadoghq.com/courses/course-quickstart
[4]: https://learn.datadoghq.com/courses/getting-started-ddsql-editor
[5]: https://learn.datadoghq.com/courses/managing-software-catalog
[6]: https://learn.datadoghq.com/courses/metrics-governance
[7]: https://learn.datadoghq.com/courses/tagging-best-practices
[8]: https://learn.datadoghq.com/courses/intro-to-integrations
[9]: https://learn.datadoghq.com/courses/getting-started-integrations
[10]: https://learn.datadoghq.com/courses/install-agent-amazon-ec2
[11]: https://learn.datadoghq.com/courses/database-monitoring
[12]: https://learn.datadoghq.com/courses/integration-pipelines
[13]: https://learn.datadoghq.com/courses/agent-on-host
[14]: https://learn.datadoghq.com/courses/agent-on-docker
[15]: https://learn.datadoghq.com/courses/using-ddot
[16]: https://learn.datadoghq.com/courses/visibility-aws-lambda
[17]: https://learn.datadoghq.com/courses/getting-started-gcp
[18]: https://learn.datadoghq.com/courses/configuring-ssi-k8s
[19]: https://learn.datadoghq.com/courses/getting-started-k8s
[20]: https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent
[21]: https://learn.datadoghq.com/courses/k8s-cluster-control-plane
[22]: https://learn.datadoghq.com/courses/monitoring-a-kubernetes-cluster-troubleshooting-workloads
[23]: https://learn.datadoghq.com/courses/create-custom-metrics-dogstatsd
[24]: https://learn.datadoghq.com/courses/dashboard-graph-widgets
[25]: https://learn.datadoghq.com/courses/discovering-table-list-widgets
[26]: https://learn.datadoghq.com/courses/intro-dashboards
[27]: https://learn.datadoghq.com/courses/using-datadog-notebooks-lab
[28]: https://learn.datadoghq.com/courses/alert-monitor-notifications
[29]: https://learn.datadoghq.com/courses/getting-started-incident-management
[30]: https://learn.datadoghq.com/courses/getting-started-monitors
[31]: https://learn.datadoghq.com/courses/getting-started-slos
[32]: https://learn.datadoghq.com/courses/understanding-slos
[33]: https://learn.datadoghq.com/courses/advanced-log-configuration
[34]: https://learn.datadoghq.com/courses/log-pipelines
[35]: https://learn.datadoghq.com/courses/log-config-docker
[36]: https://learn.datadoghq.com/courses/debugging-log-pipelines
[37]: https://learn.datadoghq.com/courses/log-queries-aggregations
[38]: https://learn.datadoghq.com/courses/enhance-log-querying
[39]: https://learn.datadoghq.com/courses/log-explorer
[40]: https://learn.datadoghq.com/courses/log-indexes
[41]: https://learn.datadoghq.com/courses/log-investigations
[42]: https://learn.datadoghq.com/courses/apm-monitors-and-alerting
[43]: https://learn.datadoghq.com/courses/apm-rate-limit-retention
[44]: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
[45]: https://learn.datadoghq.com/courses/continuous-profiler-course
[46]: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
[47]: https://learn.datadoghq.com/courses/profiling-timeline
[48]: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
[49]: https://learn.datadoghq.com/courses/create-custom-metrics-otel
[50]: https://learn.datadoghq.com/courses/otel-with-datadog
[51]: https://learn.datadoghq.com/courses/sample-traces-otel
[52]: https://learn.datadoghq.com/courses/understanding-opentelemetry
[53]: https://learn.datadoghq.com/courses/configure-rum-javascript
[54]: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
[55]: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
[56]: https://learn.datadoghq.com/courses/intro-to-rum
[57]: https://learn.datadoghq.com/courses/rum-optimize-frontend-performance
[58]: https://learn.datadoghq.com/courses/rum-retention-filters
[59]: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
[60]: https://learn.datadoghq.com/courses/cloud-siem-automated-remediation
[61]: https://learn.datadoghq.com/courses/app-protection-block-attacks
[62]: https://learn.datadoghq.com/courses/cloud-siem-configure-aws
[63]: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
[64]: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
[65]: https://learn.datadoghq.com/courses/workload-protection-enable-manage
[66]: https://learn.datadoghq.com/courses/csm-misconfigurations
[67]: https://learn.datadoghq.com/courses/intro-to-cloud-siem
[68]: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
[69]: https://learn.datadoghq.com/courses/code-security-secrets
[70]: https://learn.datadoghq.com/courses/code-security-iac
[71]: https://learn.datadoghq.com/courses/code-security-static-analysis
[72]: https://learn.datadoghq.com/courses/getting-started-test-optimization
[73]: https://learn.datadoghq.com/courses/llm-obs-getting-started
[74]: https://learn.datadoghq.com/courses/llm-obs-investigations
[75]: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
[76]: https://learn.datadoghq.com/courses/automating-meaningful-actions
[77]: https://learn.datadoghq.com/courses/app-builder-integration
[78]: https://learn.datadoghq.com/courses/dd-api-automation-iac
[79]: https://learn.datadoghq.com/courses/getting-started-app-builder
