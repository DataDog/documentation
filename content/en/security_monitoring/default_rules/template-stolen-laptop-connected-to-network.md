---
title: TEMPLATE - Stolen Laptop Connected to Network
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/apache/
src_img: /images/integrations_logos/apache.png
security: threat-intel
scope: template

aliases:
- ded-e01-acd
---

## Overview

### Goal
Detect when a stolen laptop has been connected to the network.

### Strategy
Using the Datadog [Lookup Processor][1] you can maintain a blacklist of MAC addresses.
When a MAC address connects to the network, the @threat.stolen_laptop attribute is set to `true`.
This threat detection rule queries for `@threat.stolen_laptop:true` and generates a security signal. 

### Triage & Response
Enter your triage and response process for when a stolen laptop has connected to your network to help users responding to the security signal quickly triage and respond to the signal. 
[1]: https://docs.datadoghq.com/logs/processing/processors/?tab=ui#lookup-processor
