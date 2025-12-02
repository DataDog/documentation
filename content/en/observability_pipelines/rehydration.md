---
title: Rehydration
description: Learn about using Rehydration to pull archived logs and processing them in Observability Pipelines.
disable_toc: false
private: true
further_reading:
- link: "/observability_pipelines/processors/"
  tag: "Documentation"
  text: "Learn more about processors"
- link: "/observability_pipelines/packs/"
  tag: "Documentation"
  text: "Learn more about Packs"
---

{{< callout url="https://www.datadoghq.com/product-preview/rehydration-for-observability-pipelines/"
 btn_hidden="false">}}
Rehydration is in Preview. Fill out the form to request access.
{{< /callout >}}

## Overview

Rehydration for Observability Pipelines enables you to pull archived logs from object storage and process them in Observability Pipelines, including with [Packs][1]. This gives you consistent access to historical context without having to rebuild workflows or modify ingestion pipelines.

Organizations often store large volumes of logs in cost-efficient, long-term archives to control spend and meet compliance requirements. However, historical data often becomes difficult to access when there is a security incident, audit request, or operational investigation. Retrieving archived logs from cold storage can be slow, manual, and disruptive, requiring ad-hoc scripts, decompression, or dedicated engineering effort. Rehydration for Observability Pipelines solves these issues.

{{< img src="observability_pipelines/rehydration_pipeline.png" alt="A pipeline with the Amazon S3 rehydration source" style="width:100%;" >}}

## How Rehydration works

Rehydration provides an automated workflow for retrieving and reprocessing archived logs stored in object stores, such as Amazon S3, Google Cloud Storage, and Azure Blob Storage. This helps you balance storage efficiency with quick access to historical data.

With Rehydration, you can:

### Retrieve archived logs on demand

Pull only the data you need for investigations, audits, troubleshooting, or pipeline testing, and eliminate long retrieval delays and manual extraction steps.

### Target specific time ranges or event slices

Specify the exact time frame or subset of events you need to prevent moving or processing data unnecessarily.

### Process historical logs with Observability Pipelines

Rehydrated logs go through the same parsing, enrichment, normalization, and routing logic applied to live log streams.

This ensures:

- Consistent formatting and field extraction
- Reliable enrichment (for example, user, geo-IP, and cloud metadata)
- Uniform security and compliance controls
- Identical behavior across historical and real-time data

### Route rehydrated data to any supported destination

You can send processed historical logs to SIEMs, data lakes, analytics platforms, or any Observability Pipelines destination.

### Eliminate manual handling

Rehydration provides a structured, predictable way to pull archived data back into your observability platform, so you don't have to use custom scripts, manual decompression, or ad-hoc retrieval processes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/packs/