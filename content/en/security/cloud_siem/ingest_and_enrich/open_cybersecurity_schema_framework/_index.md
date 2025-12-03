---
title: Open Cybersecurity Schema Framework (OCSF) Common Data Model in Datadog
disable_toc: false
aliases:
  - /security/cloud_siem/open_cybersecurity_schema_framework
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: Datadog Cloud SIEM: Driving innovation in security operations
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "https://www.datadoghq.com/blog/ocsf-common-data-model/"
  tag: "Blog"
  text: "Normalize your data with the OCSF Common Data Model in Datadog Cloud SIEM"
---

## Overview

Cloud SIEM collects and analyzes data from a wide range of sources such as cloud services, firewalls, networks, applications, and IT systems. Since these services emit data in different formats, it often requires significant effort to normalize and prepare logs before meaningful threat analysis can occur.

The Open Cybersecurity Schema Framework (OCSF) is an open-source, vendor-neutral standard for organizing and classifying security event data. It is designed to simplify and unify how security logs are structured across platforms and products, enabling consistent threat detection and faster investigation.

At Datadog, OCSF support is integrated directly into Datadog Cloud SIEM so you get standardized, normalized log data without manual configuration. Incoming security logs are automatically enriched with OCSF-compliant attributes at ingestion time through out-of-the-box (OOTB) pipelines. All OCSF values are contained in the dedicated `OCSF` attribute, and are in addition to the other processes that transform and enrich logs. See [Supported out-of-the-box OCSF pipelines](#supported-out-of-the-box-ocsf-pipelines) to see a list of Log Management integrations that support OCSF. 

OCSF integration in Datadog's Cloud SIEM enables:

* **Simplified detection rules**: A unified attribute structure means detection logic can be written once and applied across multiple sources.
* **Streamlined investigations**: Analysts no longer need to remember source-specific formats because one schema enables a single-query triage across providers.
* **Cross-source correlation**: Detection logic can correlate events across disparate services (for example, phishing and privilege escalation).
* **Scalable integration maintenance**: OCSF allows consistent schema expectations, even as new data sources are added.

## OCSF model

To normalize your security data, OCSF remaps your data based on the following components:

1. [Data types, attributes, objects and arrays](#data-types-attributes-objects-and-arrays)
1. [Event classes and categories](#event-categories-and-classes)
1. [Profiles](#profiles)
1. [Extensions](#extensions)

### Data types, attributes, objects, and arrays

Data types, attributes, objects, and arrays are the main components of the OCSF model.

| Name | Description |
| ---- | ----------- |
| Data types | Data types define data elements as integers, strings, floating-point numbers, and boolean values.  |
| Attributes | Attributes are the building blocks of the framework. They are used to provide the common language for your data, regardless of the source. See the [attribute dictionary][1] for a list of all attributes.  |
| Objects | Objects are collections of related attributes that represent the entities, such as a process, device, user, malware, or file.  |
| Arrays | Arrays support any of the data types, including complex types.  |

### Event categories and classes

Security events within the OCSF model are organized into categories, which are high-level groupings that sort events based on their data type. See [OCSF Categories][2] for more information and a list of available categories. Categories are further divided up into event classes. For example, there are [six classes][3] for the Identity & Access Management category. See [OCSF Event Classes][4] for more information.

### Profiles

Profiles are a class of attributes that you can optionally overlay onto event classes and the objects that reference them. It adds additional information to an existing event class and is independent of event categories. See [OCSF Profiles][5] for a list of profiles and the [OCSF Profiles documentation][6] for more information.

### Extensions

You can optionally add extensions, such as new attributes, objects, categories, profiles, and event classes, to the OCSF schemas. See [OCSF Extensions][7] for more information.

## Supported out-of-the-box OCSF pipelines

The following Log Management integrations support out-of-the-box OCSF pipelines:

{{% cloud-siem-supported-ocsf %}}

## View Security Pipelines \- OCSF

Cloud SIEM OCSF remaps log data in Log Management's [integration pipelines][8]. See [Supported out-of-the-box OCSF pipelines](#supported-out-of-the-box-ocsf-pipelines) for details.

To view the Integration Pipeline Library for a source:

1. Navigate to [Logs Pipelines][9].
1. Click **Browse Pipeline Library**.
1. Search and click on the integration you are interested in (for example, Okta).
1. To view the OCSF pipelines for Okta, scroll down to the end of the list of processors for the Okta integration.

To view the read-only OCSF pipeline for a source integration:
1. Navigate to [Logs Pipelines][9].
1. Select your pipeline.
1. Scroll to the OCSF pipelines at end of the pipeline's processors.
1. Click the OCSF pipeline to view the associated remap processors.
1. Click the eye icon on the OCSF pipeline to view information such as the following:
    - OCSF schema version
    - Class
    - Profile

**Note**: Cloning the main pipeline converts OCSF pipelines into log pipelines rather than Security pipelines.

## View OCSF data in logs

To view OCSF data in logs:
1. Navigate to [Logs Explorer][10].
1. Enter a search for your logs.
1. Click on a log.
1. In the side panel, scroll down to the \`ocsf\` JSON attributes to see the OCSF data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/ocsf/ocsf-schema/blob/4a8ad2fa4a1908f1cad2cbf331a1b49efd5001c2/dictionary.json
[2]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#categories
[3]: https://schema.ocsf.io/1.4.0/categories/iam?extensions=
[4]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#event-classes
[5]: https://schema.ocsf.io/1.4.0/profiles
[6]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#profiles
[7]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#extensions
[8]: /logs/log_configuration/pipelines/?tab=source#integration-pipelines
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://app.datadoghq.com/logs
