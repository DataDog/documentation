---
title: Rehydration
description: Learn more about using Rehydration to pull archived logs and processing them in Observability Pipelines.
disable_toc: false
private: true
---

## Overview

Organizations often store large volumes of logs in cost-efficient, long-term archives to control spend and meet compliance requirements. However, when there is a security incident, audit request, or operational investigation historical data often becomes difficult to access. Retrieving archived logs from cold storage can be slow, manual, and disruptive, requiring ad-hoc scripts, decompression, or dedicated engineering effort.

Rehydration for Observability Pipelines removes these barriers by enabling you to quickly pull archived logs from object storage and process them through the same processors. This gives teams fast, consistent access to historical context without rebuilding workflows or modifying ingestion pipelines. This gives you fast, consistent access to historical context without rebuilding workflows or modifying ingestion pipelines.

## How does Rehydration work?

Rehydration provides an automated workflow for retrieving and reprocessing archived logs stored in cost-optimized object stores, such as Amazon S3, Google Cloud Storage, and Azure Blob Storage. This helps you balance storage efficiency with rapid access to historical data.

With Rehydration, you can:

### Retrieve archived logs on demand

Pull only the data required for investigations, audits, troubleshooting, or pipeline testing, and eliminate long retrieval delays and manual extraction steps.

### Target specific time ranges or event slices

Specify the exact timeframe or subset of events needed to ensure fast access and prevent unnecessary data movement or processing.

### Process historical logs with Observability Pipelines and Packs

Rehydrated logs go through the same parsing, enrichment, normalization, and routing logic applied to live streams.

This ensures:
- Consistent formatting and field extraction
- Reliable enrichment (for example, user, geo-IP, and cloud metadata)
- Uniform security and compliance controls
- Identical behavior across historical and real-time data

### Route rehydrated data to any supported destination

Send processed historical logs to SIEMs, data lakes, analytics platforms, threat tools, or any destination connected to Observability Pipelines.

### Eliminate manual handling

Rehydration provides a structured, predictable way to pull archived data back into your tooling, when you need it and at the scale you choose. You don't have to use custom scripts, manual decompression, or ad-hoc retrieval processes.
