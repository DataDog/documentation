---
title: Agentless Scanning
kind: documentation
further_reading:
- link: "/security/cloud_security_management/setup/"
  tag: "Documentation"
  text: "Setting up Agentless Scanning"
---

<div class="alert alert-info">Agentless Scanning is in beta.</div>

## Overview

Agentless scanning helps you gain insights into security risks across your cloud infrastructure, without needing to install the Datadog Agent.
It is available only for vulnerabilities detected across your container images and hosts. 
(Will add more info)

## Availability

| Cloud provider       | Use cases           |
| -------------------  | --------------------|
| AWS (beta)           |                     |
| Azure (private beta)         |                     |


## How it works

Datadog Agentless Vulnerability scanning does .. need more info here. (Very high level since we'll add more than vulnerabilities down the road.)

**Note**: The actual data that is scanned remains within your infrastructure, and only the findings are reported back to Datadog.

Scans occur every 12 hours.

## Security considerations

- Address security risks
  - List top three security risks

## Agentless Scanning with Existing Agent Coverage
- Explain exclusion of scans on Agent-based resources with VM enabled
The Agentless Scanner will scan all compute instances (e.g. EC2s, Lambdas, containers) that are not running the Datadog Agent AND have not been explicitly excluded from scanning by the customer.

**Diagram Coming March 1st**

## Cloud Service Provider Cost
- Make it clear that customers need to pay cloud providers to run Agentless Scanning
We plan to stay simple in our wording to avoid giving any concrete figures


## Next Steps (Links)
- Agentless Scanning Set Up
- AWS Setup
- Azure Private Beta
- Agentless Scanning Setup Reference

Give links to break down by cloud provider (AWS only at this time)
Direct customers to sign up form for Azure private beta

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
