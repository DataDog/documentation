---
title: OCSF Processor
description: "Normalize security logs according to the Open Cybersecurity Schema Framework"
processor_type: ocsf-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/"
  tag: "Documentation"
  text: "Learn about OCSF"
- link: "/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/"
  tag: "Documentation"
  text: "OCSF Processor setup guide"
---

## Overview

Use the OCSF processor to normalize your security logs according to the [Open Cybersecurity Schema Framework (OCSF)][11]. The OCSF processor allows you to create custom mappings that remap your log attributes to OCSF schema classes and their corresponding attributes, including enumerated (ENUM) attributes.

The processor enables you to:

- Map source log attributes to OCSF target attributes
- Configure ENUM attributes with specific numerical values
- Create sub-pipelines for different OCSF target event classes
- Pre-process logs before OCSF remapping

For detailed setup instructions, configuration examples, and troubleshooting guidance, see [OCSF Processor][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[11]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[12]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/

