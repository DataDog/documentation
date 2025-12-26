---
title: Dimensioning Private Locations
description: Dimensioning requirements for your containerized private locations.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Platform > Run Synthetic Tests from
  Private Locations > Dimensioning Private Locations
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/platform/private_locations/dimensioning/index.html
---

# Dimensioning Private Locations

{% alert level="info" %}
The dimensioning recommendations are for the containerized private location.
{% /alert %}

## Overview{% #overview %}

Private locations can run [API](https://docs.datadoghq.com/synthetics/api_tests/), [multistep API](https://docs.datadoghq.com/synthetics/multistep?tab=requestoptions), and [browser tests](https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions). Browser tests are more resource intensive than API and multistep API tests. One private location can also run several types of tests.

By defining a test type, maximum number of test runs, and total hardware requirements, you can calculate your private locations' dimensions and distribute resources across multiple workers to improve the efficiency of your test runs.

To improve dimensioning, split your test assignments based on test types. For example, you can have some private locations run only API and multistep API tests while other private locations run only browser tests.

### Prerequisites{% #prerequisites %}

To get started with dimensioning your private locations, you need the following:

1. A basic understanding of container orchestration and the particular option you are using to run your private location.
1. The private location configuration file mounted with your orchestrator of choice and is accessible to your underlying private location containers.
1. If you are using [browser tests with IP blocking](https://docs.datadoghq.com/synthetics/private_locations/configuration#advanced-configuration), `sudo` access may be required.

### Define your maximum number of test runs{% #define-your-maximum-number-of-test-runs %}

Resource requirements depend on the maximum number of test runs your private location may execute in parallel and the application(s) you want to test. Take into account spikes that may happen with on-demand testing (for example, when running tests as part of your [CI/CD pipelines](https://docs.datadoghq.com/synthetics/cicd_integrations)) as well as the size and number of assets that need to be loaded.

Define the `concurrency` parameter of your private location with the maximum number of test runs. By default, the maximum number of tests executed in parallel is 10.

For more information, see [Advanced configuration](https://docs.datadoghq.com/synthetics/private_locations/configuration#advanced-configuration).

### Define your total hardware requirements{% #define-your-total-hardware-requirements %}

Once you know which test type you want to execute and the maximum number of test runs you want to execute in parallel, define the total hardware requirements for your private location.

The base requirement for CPU is 150mCores (that is, 0.15 of a CPU core), and for memory, it is 150 MiB.

Additional requirements vary based on the test type for the private location.

| Test type                                                                                                                                                   | CPU/Memory/Disk recommendation       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [API tests](https://docs.datadoghq.com/synthetics/api_tests/) and [Multistep API tests](https://docs.datadoghq.com/synthetics/multistep?tab=requestoptions) | 100mCores/200MiB/100MiB per test run |
| [Browser tests](https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions)                                                                    | 800mCores/1GiB/500MiB per test run   |

For example, Datadog recommends ~ 8 cores CPU `(150mCores + (800mCores*10 test runs))`, ~ 10GiB memory `(150MiB + (1GiB*10 test runs))`, and ~ 5GiB disk `(500MiB*10 test runs)` for a private location running only Browser tests with a maximum number of concurrent test runs of `10`.

**Note:** If you want to run API or multistep API tests and Browser tests on a private location, Datadog recommends computing the total hardware requirements with the Browser tests requirements.

### Assign resources to your private location{% #assign-resources-to-your-private-location %}

Once you have determined the total requirements for your private location, decide how you want these resources to be distributed: by assigning all resources to a single worker or by distributing all resources across multiple workers. To assign all resources to a single worker, run one container for a private location with a configuration file.

1. Set the [`concurrency` parameter](https://docs.datadoghq.com/synthetics/private_locations/configuration#advanced-configuration) to `maximum number of test runs that can be executed in parallel on your private location`.
1. Assign your total private location resource requirements to your unique container.

To distribute resources across multiple workers, run multiple containers for a private location with a configuration file.

1. Set the [`concurrency` parameter](https://docs.datadoghq.com/synthetics/private_locations/configuration#advanced-configuration) to `maximum number of test runs that can be executed on your private location / number of workers associated with your private location`.
1. Assign `total private location resource requirements / number of workers` resources to every private location container.

For example, Datadog recommends ~ 8 cores CPU, ~ 10GiB memory, and ~ 5GiB disk for a private location running only Browser tests with a maximum number of concurrent test runs of `10`. To distribute these resources across two workers, set the [`concurrency` parameter](https://docs.datadoghq.com/synthetics/private_locations/configuration#advanced-configuration) to 5 and allocate ~ 4 cores CPU, ~ 5GiB memory, and ~ 2.5GiB disk to each worker.

#### Queueing mechanism{% #queueing-mechanism %}

When multiple workers are associated with a private location, each worker requests a couple test runs, which depend on the [`concurrency` parameter](https://docs.datadoghq.com/synthetics/private_locations/configuration#advanced-configuration) and on the number of additional test runs that can be assigned.

For example, ten tests are scheduled to run simultaneously on a private location that has two workers running. If Worker 1 is running two tests, Worker 1 can request three additional tests to run. If Worker 2 is not running any tests, Worker 2 can request the five following tests.

The remaining two tests can be requested by whichever worker has finished running its test first (any worker that has available slots).

## Further Reading{% #further-reading %}

- [Monitor your Private Locations](https://docs.datadoghq.com/synthetics/private_locations/monitoring)
