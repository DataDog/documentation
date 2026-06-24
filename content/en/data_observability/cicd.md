---
title: CI/CD
description: Prevent data-quality issues before they're merged.
further_reading:
    - link: '/data_observability/'
      tag: 'Documentation'
      text: 'Data Observability Overview'
    - link: '/data_observability/data_catalog/'
      tag: 'Documentation'
      text: 'Data Catalog'
    - link: '/data_observability/lineage/'
      tag: 'Documentation'
      text: 'Lineage'
    - link: '/data_observability/quality_monitoring/'
      tag: 'Documentation'
      text: 'Quality Monitoring'
    - link: '/data_observability/jobs_monitoring/'
      tag: 'Documentation'
      text: 'Jobs Monitoring'
    - link: '/data_observability/jobs_monitoring/dbt/?tab=dbtcloud'
      tag: 'Documentation'
      text: 'dbt Cloud'
    - link: '/data_observability/jobs_monitoring/dbt/?tab=dbtcore'
      tag: 'Documentation'
      text: 'dbt Core'
    - link: 'integrations/#cat-source-control'
      tag: 'Documentation'
      text: 'Source Control'
---

## Overview

Data Observability CI/CD checks run automatically when you open a pull request that modifies dbt models. The checks give you the information you need to decide whether a change is safe to merge.

Datadog posts the results as a comment on your pull request, and the comment updates each time you push new changes to the PR. A full report is also available in the Datadog app, and you'll get a link to it in the PR comment.

## Check types

### Impact Lineage

Impact Lineage builds a graph of everything downstream of your changed dbt models. Use it to assess the blast radius of a change before merging. See which tables, dashboards, and other consumers depend on the models you modified, and route review to the right owners.

See [Lineage][1] for more detail on how Datadog builds and navigates lineage graphs.

### Drift Detection

Drift Detection compares the data produced by your models before and after your changes using a series of statistical checks. Use it to confirm that a model change produces the expected output or to catch unintended side effects such as significant row-count changes, null-rate shifts, or cardinality changes in a column's values.

## Setup

### 1. Connect your source control provider and dbt project

- Connect your [source-control provider][7]. CI/CD Checks currently support Github and GitLab.
- Connect your [dbt Cloud][5] or [dbt Core][6] project to Datadog. You can also connect your dbt project as part of setting up your CI/CD checks.

From the CI/CD settings, click to "Add CI/CD Checks". Pick the dbt project you want to add checks for, as well as the main job for the project: this is the job that has the most knowledge of your dbt schema. Datadog will automatically infer the repository for your dbt project from your source-control provider, but if it doesn't, you can manually select it.

{{< img src="data_observability/cicd/cicd-connection.png" alt="The CI/CD feature creation page" style="width:100%;" >}}

#### Advanced settings

If your dbt project doesn't live at the root of your repository, you can specify the path to your dbt project in the advanced settings.

### 2. Configure checks

Each of the available checks can be enabled independently. Enabling all checks will yield the richest reports.

#### Impact Lineage

Impact lineage generates a graph of the downstream assets that may be affected by your model changes.

**General Settings**
| Setting | Description |
| - | - |
| `Run on Draft Pull/Merge Requests` | if you prefer to run this check on draft pull/merge requests, enable this option |

#### Drift Detection

Drift detection compares the current state of your data to a baseline and flags any deviations. Its additional settings are:

**General Settings**
| Setting | Description |
| - | - |
| `Run on Draft Pull/Merge Requests` | if you prefer to run this check on draft pull/merge requests, enable this option |
| `Threshold` | the threshold for drift detection (e.g., 0.1 for 10% drift). If a metric exceeds this threshold, it'll show up as a warning in check results |
| `Downstream Checks` | when a dbt model changes, drift detection checks will be generated for it and any downstream dbt models. This setting controls how far downstream checks will be run |

**dbt cloud**
| Setting | Description |
| - | - |
| `CI Job URL` | the locator for your dbt cloud ci job. These typically look like `https://cloud.getdbt.com/...` |

**dbt core**
| Setting | Description |
| - | - |
| `CI Job Name` | if the open-lineage job that kicks off your ci process is different from the one you selected before, specify its name here |
| `CI Job Namespace` | this is the `OPENLINEAGE_NAMESPACE` associated with the ci job above |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/lineage/
