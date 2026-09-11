---
title: BYOC Logs Releases and Updates
description: Learn how Datadog versions, publishes, and recommends deploying BYOC Logs updates.
disable_toc: false
further_reading:
- link: "/byoc-logs/release_notes/"
  tag: "Documentation"
  text: "BYOC Logs release notes"
- link: "/observability_pipelines/guide/upgrade_worker/"
  tag: "Documentation"
  text: "Upgrade the Observability Pipelines Worker"
- link: "/byoc-logs/install/"
  tag: "Documentation"
  text: "Install or upgrade BYOC Logs"
---

BYOC (Bring Your Own Cloud) Logs includes two customer-deployed components:

- The BYOC Logs engine, distributed through the `datadog/cloudprem` Helm chart
- The Observability Pipelines Worker (OPW)

The components are versioned independently. Each BYOC Logs release is a validated version pair, consisting of one version of each component and its corresponding Helm chart. Datadog recommends deploying this version pair; other combinations are not validated as a BYOC Logs release.

## Release cadence

Datadog publishes at least one BYOC Logs engine release per month. Releases may occur more frequently, and patch releases are published as needed. Each engine release includes a corresponding Helm chart and release notes.

A BYOC Logs release is published when the engine changes or when Datadog adds an OPW update to the validated pair. One component can remain unchanged between releases.

## Versioning

Each component uses a `MAJOR.MINOR.PATCH` version number. The version number communicates the expected impact of an update:

| Release type | Expected impact |
|--------------|-----------------|
| **Major** | Contains a breaking change or required migration. The release notes provide an upgrade path. |
| **Minor** | Adds backward-compatible features or enhancements. |
| **Patch** | Adds backward-compatible fixes, security updates, or incremental improvements. |

Minor and patch updates are intended to remain backward compatible. Datadog does not guarantee that fixes are backported to older releases. Stay on the latest major version and apply minor and patch updates at least monthly.

## Release communication

Each BYOC Logs release communication includes:

- The release date, release type, and recommended update timeline
- Changes, fixes, known issues, and release-specific upgrade instructions

The release communication identifies the version pair in the following format:

| Component | Version |
|-----------|---------|
| BYOC Logs engine | `<ENGINE_VERSION>` (`datadog/cloudprem` Helm chart `<ENGINE_CHART_VERSION>`) |
| OPW | `<OPW_VERSION>` (`datadog/observability-pipelines-worker` Helm chart `<OPW_CHART_VERSION>`) |

Use the exact versions listed in the release communication. A component or chart version might not change in every release.

## Production freezes

You control when updates are deployed and can keep versions pinned during a production freeze. Routine updates can wait for an approved change window. For a critical security issue, stability risk, or severe defect, Datadog might recommend applying an update during the freeze. The release communication identifies the urgency and any required action.

## Plan an update

1. Use the validated version pair. Review the release notes for the target version and any versions you skip, including known issues, required intermediate versions, and rollback limitations.
2. Test representative log traffic, processing rules, ingestion, queries, integrations, and monitoring in a preproduction environment. Verify backup and recovery procedures before the update.
3. Follow the release-specific instructions and deploy in stages. Monitor component health, errors, and processing backlogs. Avoid running mixed versions longer than necessary.
4. Roll back only when the release notes confirm that it is supported. Otherwise, contact [Datadog Support][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
