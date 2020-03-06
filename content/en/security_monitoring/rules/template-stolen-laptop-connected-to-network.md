---
title: TEMPLATE - Stolen Laptop Connected to Network
kind: documentation
type: security_rules
parent: cloudtrail
security: threat-intel
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---
## **Goal:**
Detect when a stolen laptop has been connected to the network.

## **Strategy:**
Using the Datadog [Lookup Processor][1] you can maintain a blacklist of MAC addresses.
When a MAC address connects to the network, the @threat.stolen_laptop attribute will be set to `true`.
This threat detection rule queries for `@threat.stolen_laptop:true` and generates a security signal. 

## **Triage & Response:**
You should use this section to enter your triage and response process for when a stolen laptop has connected to your network.
This section helps users responding to the security signal quickly triage and respond to the signal. 
[1]: https://docs.datadoghq.com/logs/processing/processors/?tab=ui#lookup-processor
