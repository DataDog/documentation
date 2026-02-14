---
title: Agent Rules
disable_toc: false
---

## Overview

- agent events are the telemetry pilar for both threats detection and runtime security posture evaluation
- the overall philosophy is to send to the backend only the runtime events that are relevant for security monitoring, filtering benign activity as early as possible to limit the performance impact on the host where the agent is deployed
- Workload protection has a custom query language (called SecL) to define which events should be sent to the backend
- Rules are deployed using policies which can be managed in the app with Remote Configuration or manually by modifying the agent configuration files, or using Terraform.



Don't forget to talk about:
- OOTB rules
- Writing your own rules