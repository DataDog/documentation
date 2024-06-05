---
title: Getting Started with Device Profiles
kind: guide
is_beta: true
further_reading:
- link: "/network_monitoring/devices/guide/build-ndm-profile/"
  tag: "Documentation"
  text: "Build an NDM Profile (Advanced)"
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Read more about NDM Profiles"
---

<div class="alert alert-info">Device profile onboarding is in private beta. Please reach out to your Customer Service Manager to sign up.</div>


## Overview

High level overview - GUI based experience
Network Device Monitoring uses profiles to tell the Datadog Agent the metrics and associated tags to collect. A profile is a collection of OIDs associated with a device. 

## Prerequisites 

The minimum Agent version required is `7.55` or higher.

## Device profile onboarding

### Profile details

1. Build your own NDM profile by navigating to [Infrastructure > Network Devices > Configuration][1]. 
2. Click on SNMP Profiles > **Create New Profile**.

{{< img src="/network_device_monitoring/profiles/create_profile.png" alt="The Network Device profile creation page" style="width:100%;">}}

WAlk through this overview page - name, description, matching devices, Download all devices

Screenshot sysObjectID drop down

### Global Tags

Global Tags - using a "weight" to correspond to a metric
Advanced options - document - Modification - Mapping, Format that they don't like, change to regex etc

### Scalar metrics

Scalar metrics - document as well as Advanced options - percent and scale factor - extra guidance

### Tabular metrics

Tabular metrics - (table) - metrics structured as a table format  - also advanced options and tag on table level

 tag associated to metric

  Can't do a preview yet, but once they save the profile and add it to the Agent - Click Download all profiles - creates json.gzip
 then they upload that to custom profiles on the Agent

 Agent syncing is a big issue

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/