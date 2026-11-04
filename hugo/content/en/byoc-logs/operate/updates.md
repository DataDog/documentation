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

- The BYOC Logs engine
- The Observability Pipelines Worker (OPW)

The components are versioned independently. Deploy them with the Datadog Operator or their separate Helm charts. For Helm deployments, each BYOC Logs release identifies a validated version pair and corresponding chart versions. For Operator deployments, the Operator supplies the default engine and Worker images.

## Operator-managed deployments

BYOC requires Operator v1.33.0 or later. Upgrading the Operator also updates the default container images for the BYOC engine and Observability Pipelines Workers. Treat an Operator upgrade as a potential workload update: review the Operator, engine, and Worker changes and test ingestion and queries before upgrading production.

| Image configuration | Effect of an Operator upgrade |
|---|---|
| Default image | Uses the default image version supplied by the upgraded Operator. |
| Repository override without a tag or digest | Uses the overridden repository with the Operator's default version. |
| Explicit tag or digest in `spec.imageOverrides` | Keeps the corresponding image version pinned. Other images that use defaults can still update. |

To pin image versions, merge the following into the existing `DatadogBYOCCluster` manifest:

```yaml
spec:
  imageOverrides:
    byoc:
      tag: "<BYOC_IMAGE_TAG>"
    observabilityPipelinesWorker:
      tag: "<OPW_IMAGE_TAG>"
```

Use `digest` instead of `tag` to pin an image by digest. Verify engine and Worker compatibility when overriding versions. Remove a version override to return that image to the Operator's default; doing so can trigger a workload rollout.

For an Operator installed with Helm, retain the existing release name, namespace, values, and enabled CRDs when upgrading. Update the Operator image version in the values file and use a compatible Operator chart and CRDs:

```shell
helm repo update
helm upgrade <OPERATOR_RELEASE_NAME> datadog/datadog-operator \
  --namespace <OPERATOR_NAMESPACE> \
  --values operator-values.yaml
```

After the update, inspect `Reconciled` and `Available` on the `DatadogBYOCCluster`, the running workload images, Worker buffers, and ingestion and query results. Do not run `helm upgrade datadog/cloudprem` or a separate Worker chart upgrade for these Operator-managed workloads. See the [installation guide][2] for the Operator values and [CRD reference][3] for image settings.

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

For deployments using separate Helm charts, the release communication identifies the version pair in the following format:

| Component | Version |
|-----------|---------|
| BYOC Logs engine | `<ENGINE_VERSION>` (`datadog/cloudprem` Helm chart `<ENGINE_CHART_VERSION>`) |
| OPW | `<OPW_VERSION>` (`datadog/observability-pipelines-worker` Helm chart `<OPW_CHART_VERSION>`) |

Use the exact versions listed in the release communication. A component or chart version might not change in every release.

## Production freezes

You control when updates are deployed and can keep versions pinned during a production freeze. For Operator deployments, postponing an Operator upgrade also postpones changes to its default workload images; explicit image tags or digests keep those images pinned across Operator upgrades. Routine updates can wait for an approved change window. For a critical security issue, stability risk, or severe defect, Datadog might recommend applying an update during the freeze. The release communication identifies the urgency and any required action.

## Plan an update

1. Review the target versions for your deployment method: the validated engine and Worker pair for separate Helm releases, or the Operator and its default or overridden workload images. Review release notes for the target versions and any versions you skip, including known issues, required intermediate versions, and rollback limitations.
2. Test representative log traffic, processing rules, ingestion, queries, integrations, and monitoring in a preproduction environment. Verify backup and recovery procedures before the update.
3. Follow the release-specific instructions and deploy in stages. Monitor component health, errors, and processing backlogs. Avoid running mixed versions longer than necessary.
4. Roll back only when the release notes confirm that it is supported. Otherwise, contact [Datadog Support][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /byoc-logs/install/datadog_operator/
[3]: /containers/datadog_operator/crd_byoccluster/#image-overrides
