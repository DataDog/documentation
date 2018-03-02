---
creates_events: false
ddtype: crawler
display_name: VNS3
doc_link: https://docs.datadoghq.com/integrations/vns3/
git_integration_title: vns3
has_logo: true
integration_title: VNS3
is_public: true
kind: integration
manifest_version: 1.0.2
metric_prefix: vns3.
metric_to_check: vns3.peering
name: vns3
public_title: Datadog-VNS3 Integration
short_description: Cloud network appliance for application connectivity and security.
---

## Overview

Get state information regarding your VNS3 topology's IPSec endpoints/tunnels, VNS3 Peers, and overlay clients.

*   Peering links Status Check:

    ![peering](https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/peering.png)

*   Overlay Clients Status Check:

    ![clients](https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/clients.png)

*   IPSec tunnels Status Check:

    ![ipsec](https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/ipsec.png)

## Setup

### Configuration

To capture metrics, you need to deploy Cohesive Networks' DataDog container, set up the VNS3 firewall, and configure the container.

Read the guide [here](https://cohesive.net/dnld/Cohesive-Networks_VNS3-DataDog-Container-Guide.pdf).

Watch the video [here](https://youtu.be/sTCgCG3m4vk).

## Data Collected
### Metrics
{{< get-metrics-from-git "vns3" >}}


### Events
The VNS3 check does not include any events at this time.

### Service Checks
The VNS3 check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
