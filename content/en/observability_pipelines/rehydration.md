---
title: Rehydration
description: Learn about using Rehydration to pull archived logs and processing them in Observability Pipelines.
disable_toc: false
private: true
---

## Overview

Rehydration for Observability Pipelines enables you to pull archived logs from object storage and process them in Observability Pipelines. This gives you consistent access to historical context without having to rebuild workflows or modify ingestion pipelines.

Organizations often store large volumes of logs in cost-efficient, long-term archives to control spend and meet compliance requirements. However, when there is a security incident, audit request, or operational investigation historical data often becomes difficult to access. Retrieving archived logs from cold storage can be slow, manual, and disruptive, requiring ad-hoc scripts, decompression, or dedicated engineering effort. Rehydration for Observability Pipelines resolves these issues.

## How does Rehydration work?

Rehydration provides an automated workflow for retrieving and reprocessing archived logs stored in cost-optimized object stores, such as Amazon S3, Google Cloud Storage, and Azure Blob Storage. This helps you balance storage efficiency with quick access to historical data.

With Rehydration, you can:

### Retrieve archived logs on demand

Pull only the data you need for investigations, audits, troubleshooting, or pipeline testing, and eliminate long retrieval delays and manual extraction steps.

### Target specific time ranges or event slices

Specify the exact time frame or subset of events you need to prevent moving or processing data unnecessarily.

### Process historical logs with Observability Pipelines and Packs

Rehydrated logs go through the same parsing, enrichment, normalization, and routing logic applied to live log streams.

This ensures:

- Consistent formatting and field extraction
- Reliable enrichment (for example, user, geo-IP, and cloud metadata)
- Uniform security and compliance controls
- Identical behavior across historical and real-time data

### Route rehydrated data to any supported destination

You can send processed historical logs to SIEMs, data lakes, analytics platforms, or any Observability Pipelines destinations.

### Eliminate manual handling

Rehydration provides a structured, predictable way to pull archived data back into your observability platform, so you don't have to use custom scripts, manual decompression, or ad-hoc retrieval processes.
