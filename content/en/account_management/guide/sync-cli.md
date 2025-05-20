---
title: Sync resources across Datadog organizations
disable_toc: false
further_reading:
- link: "/agent/guide/"
  tag: "Documentation"
  text: "Agent guides"
---

## Overview 
Use the `datadog-sync-cli` tool to copy your dashboards, monitors and other configurations from your primary Datadog account to your secondary Datadog account. 

You can determine the frequency and timing of syncing based on your business requirements. However, regular syncing is essential to ensure that your secondary account is up-to-date in the event of an outage. 

Datadog recommends performing this operation on a daily basis.

<div class="alert alert-info"> The <code>datadog-sync-cli</code> tool is used to migrate resources across organizations, regardless of datacenter. It cannot, nor is it intended to, transfer any ingested data, such as logs, metrics etc. The source organization will not be modified, but the destination organization will have resources created and updated by the <code>sync</code> command.</div>

## Setup

The `datadog-sync-cli` tool can be installed from source, from Releases, or from using Docker and builing an image. 

### Installing from source

### Installing from releases

### Installing using Docker


## Usage 