---
title: Dimensioning Private Locations
kind: documentation
description: Dimensioning requirements for your containerized private locations.
aliases:
- /synthetics/private_locations/dimensioning
further_reading:
- link: "/synthetics/private_locations/monitoring"
  tag: "Documentation"
  text: "Monitor your Private Locations"
---

<div class="alert alert-info">The dimensioning recommendations are for the containerized private location.</div>

## Overview 

Private locations can run [API][1], [multistep API][2], and [browser tests][3]. Browser tests are more resource intensive than API and multistep API tests. One private location can also run several types of tests.

By defining a test type, maximum number of test runs, and total hardware requirements, you can calculate your private locations' dimensions and distribute resources across multiple workers to improve the efficiency of your test runs.

To improve dimensioning, split your test assignments based on test types. For example, you can have some private locations run only API and multistep API tests while other private locations run only browser tests.

### Prerequisites

To get started with dimensioning your private locations, you need the following:

1. A basic understanding of container orchestration and the particular option you are using to run your private location.
2. The private location configuration file mounted with your orchestrator of choice and is accessible to your underlying private location containers.
3. If you are using [browser tests with IP blocking][4], `sudo` access may be required.

### Define your maximum number of test runs

Resource requirements depend on the maximum number of test runs your private location may execute in parallel and the application(s) you want to test. Take into account spikes that may happen with on-demand testing (for example, when running tests as part of your [CI/CD pipelines][5]) as well as the size and number of assets that need to be loaded.

Define the `concurrency` parameter of your private location with the maximum number of test runs. By default, the maximum number of tests executed in parallel is 10.

For more information, see [Advanced configuration][4].

### Define your total hardware requirements

Once you know which test type you want to execute and the maximum number of test runs you want to execute in parallel, define the total hardware requirements for your private location.  

The base requirement for CPU is 150mCores and for memory, is 150 MiB.

Additional requirements vary based on the test type for the private location.

| Test type                                     | CPU/Memory/Disk recommendation    |
| --------------------------------------------- | --------------------------------- |
| [API tests][1] and [Multistep API tests][2] | 100mCores/200MiB/100MiB per test run   |
| [Browser tests][3]                           | 800mCores/1GiB/500MiB per test run |

For example, Datadog recommends ~ 8 cores CPU `(150mCores + (800mCores*10 test runs))`, ~ 10GiB memory `(150MiB + (1GiB*10 test runs))`, and ~ 5GiB disk `(500MiB*10 test runs)` for a private location running only Browser tests with a maximum number of concurrent test runs of `10`.

**Note:** If you want to run API or multistep API tests and Browser tests on a private location, Datadog recommends computing the total hardware requirements with the Browser tests requirements.

### Assign resources to your private location

Once you have determined the [total requirements for your private location](#define-your-total-hardware-requirements), decide how you want these resources to be distributed: by assigning all resources to a single worker or by distributing all resources across multiple workers.
To assign all resources to a single worker, run one container for a private location with a configuration file.
1. Set the [`concurrency` parameter][4] to `maximum number of test runs that can be executed in parallel on your private location`.
2. Assign your [total private location resource requirements](#define-your-total-hardware-requirements) to your unique container.
  
To distribute resources across multiple workers, run multiple containers for a private location with a configuration file.
 
 1. Set the [`concurrency` parameter][4] to `maximum number of test runs that can be executed on your private location / number of workers associated with your private location`.
 2. Assign `total private location resource requirements / number of workers` resources to every private location container.


For example, Datadog recommends ~ 8 cores CPU, ~ 10GiB memory, and ~ 5GiB disk for a private location running only Browser tests with a maximum number of concurrent test runs of `10`. To distribute these resources across two workers, set the [`concurrency` parameter][4] to 5 and allocate ~ 4 cores CPU, ~ 5GiB memory, and ~ 2.5GiB disk to each worker.

#### Queueing mechanism

When multiple workers are associated with a private location, each worker requests a couple test runs, which depend on the [`concurrency` parameter][4] and on the number of additional test runs that can be assigned.   

For example, ten tests are scheduled to run simultaneously on a private location that has two workers running. If Worker 1 is running two tests, Worker 1 can request three additional tests to run. If Worker 2 is not running any tests, Worker 2 can request the five following tests. 

The remaining two tests can be requested by whichever worker has finished running its test first (any worker that has available slots).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/multistep?tab=requestoptions
[3]: /synthetics/browser_tests/?tab=requestoptions
[4]: /synthetics/private_locations/configuration#advanced-configuration
[5]: /synthetics/cicd_integrations
