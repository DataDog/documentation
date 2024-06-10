---
categories:
- log collection
- Security
description: Ingest and process your Alcide logs
doc_link: https://docs.datadoghq.com/integrations/alcide/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md"]
has_logo: true
integration_title: Alcide
is_public: true
custom_kind: integration 
name: alcide
public_title: Datadog-Alcide Integration
short_description: Ingest and process your Alcide logs
version: '1.0'
integration_id: "alcide"
---

## Overview

Alcide provides Kubernetes audit and anomaly monitoring services. This integration allows Datadog to ingest and process logs from Alcide.

## Setup

### Installation

Datadog automatically enables a logs processing pipeline when Alcide logs are detected. No installation steps are required.

### Configuration

In Alcide, select the _Integrations_ tab and go to the _Detections Integrations Configuration_ section, which is used to configure integrations for threat intel logs.

1. Select **HTTP API** as your target.

2. In the URL box, enter `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Replace the placeholder value `<DATADOG_SITE>` with `datadoghq.com` for the US site, or with `datadoghq.eu` for the EU site. Replace the placeholder value `<DATADOG_API_KEY>` with your [Datadog API key][1].

3. Under _Entities Types_, select the types that you want to forward threat intel about. Datadog recommends selecting all of these.

4. Under _Detection Categories_, select the categories you wish to forward. Datadog recommends selecting both _incidents_ and _anomalies_.

5. Under _Detection Confidence_, select your desired levels of confidence. Datadog recommends selecting at least _high_ and _medium_.

6. Optionally, you can create inclusion and exclusion filters on entities using the _Entities Matching_ and _Entities Not Matching_ boxes.

Then, go to the _Selected Audit Entries Integration Configuration_ section, located underneath the previous section. This section is used to configure integrations for audit logs.

1. Select **HTTP API** as your target.

2. In the URL box, enter `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Replace the placeholder value `<DATADOG_SITE>` with `datadoghq.com` for the US site, or with `datadoghq.eu` for the EU site. Replace the placeholder value `<DATADOG_API_KEY>` with your [Datadog API key][1].

## Troubleshooting

Need help? Contact [Datadog support][2].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /help/
