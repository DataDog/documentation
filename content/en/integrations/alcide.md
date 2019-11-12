---
categories:
- log collection
- Security
dependencies: []
description: Ingest and process your Alcide logs
doc_link: https://docs.datadoghq.com/integrations/alcide/
has_logo: true
integration_title: Alcide
is_public: true
kind: integration
name: alcide
public_title: Datadog-Alcide Integration
short_description: Ingest and process your Alcide logs
version: '1.0'
---

## Overview

Alcide provides Kubernetes audit and anomaly monitoring services. This integration allows Datadog to ingest and process logs from Alcide.

## Setup


### Installation

Datadog automatically enables a logs processing pipeline when Alcide logs are detected. No installation steps are required.

### Configuration

In Alcide, select the *Integrations* tab and go to the *Detections Integrations Configuration* section, which is used to configure integrations for threat intel logs.

1. Select **HTTP API** as your target.

2. In the URL box, enter `https://http-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>?ddsource=alcide`. Make sure you replace the placeholder value `<DATADOG_API_KEY>` with your [Datadog API key][1].

3. Under *Entities Types*, select the types that you want to forward threat intel about. Datadog recommends selecting all of these.

4. Under *Detection Categories*, select the categories you wish to forward. Datadog recommends selecting both *incidents* and *anomalies*.

5. Under *Detection Confidence*, select your desired levels of confidence. Datadog recommends selecting at least *high* and *medium*.

6. Optionally, you can create whitelist and blacklist filters on entities using the *Entities Matching* and *Entities Not Matching* boxes.

Then, go to the *Selected Audit Entries Integration Configuration* section, located underneath the previous one. This section is used to configure integrations for audit logs.

1. Select **HTTP API** as your target.

2. In the URL box, enter `https://http-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>?ddsource=alcide`. Make sure you replace the placeholder value `<DATADOG_API_KEY>` with your [Datadog API key][1].

## Troubleshooting

Need help? Contact [Datadog support][2].

[1]: https://app.datadoghq.com/account/settings#api
[2]: /help
