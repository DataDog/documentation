---
categories:
- cloud
- network
- google cloud
ddtype: crawler
description: Monitor VPN tunnel status, throughput, session counts, and more.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_vpn/
git_integration_title: google_cloud_vpn
has_logo: true
integration_title: Google VPN
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_vpn
public_title: Datadog-Google VPN Integration
short_description: Monitor VPN tunnel status, throughput, session counts, and more.
version: '1.0'
---

## Overview
Google Cloud VPN securely connects your existing network to your Google Cloud Platform network.

Get metrics from Google VPN to:

* Visualize the performance of your VPNs
* Correlate the performance of your VPNs with your applications

## Setup
### Installation

If you haven't already, set up the [Google Cloud Platform integration first](https://docs.datadoghq.com/integrations/google_cloud_platform/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "google_cloud_vpn" >}}


### Events
The Google Cloud VPN integration does not include any event at this time.

### Service Checks
The Google Cloud VPN integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
