---
title: Dimensioning your Private Locations
kind: documentation
description: Dimensioning requirements for your Private Locations
further_reading:
- link: "synthetics/private_location_monitoring"
  tag: "Documentation"
  text: "Monitor your Private Locations"
- link: "synthetics/private_locations/dimensioning"
  tag: "Documentation"
  text: "Dimensioning your Private Locations"
---

## Dimension your private location

### Types of test runs

Private locations can run [API][1], [Multistep API][2], and [Browser tests][3]. A same private location can run several types of tests. However, for dimensioning reasons, it can prove helpful to split test assignments based on test types and for instance have some private locations run only API and Multistep API tests and others run only Browser tests, which are more resource intensive than other test types. 

### Maximum number of test runs

Resource requirements depend on the maximum number of test runs your private location might have to execute in parallel. When defining that number, make sure to take into account spikes that might happen when performing on demand testing (for example, when running tests as part of your [CI/CD pipelines][5]).

The maximum number of test runs allows you to define the [`concurrency` parameter][4] of your private location (it defaults to `10`). This parameter allows you to adjust the number of test runs your private location workers can run concurrently.

### Private location total hardware requirements

Once you know the [type of tests](#types-of-test-runs) you want your private location to execute and the [maximum number of test runs](#maximum-number-of-test-runs) that needs to be executed in parallel, you can define the **total** hardware requirements for your private location. 

* Base requirements: 
  * CPU: 150mCores
  * Memory: 150MiB

* Additional requirements are based on the type of tests run by the private location:

| Test type                                     | CPU/Memory/Disk recommendation    |
| --------------------------------------------- | --------------------------------- |
| [API tests][1] and [Multistep API tests][2] | 20mCores/5MiB/1MiB per test run   |
| [Browser tests][3]                           | 150mCores/1GiB/10MiB per test run |

**Example:** For a private location running only Browser tests, with a maximum number of concurrent test runs of `10`, the recommendation for a safe usage is 
~ 1.5Core CPU `(150mCores + (150mCores*10 test runs))`, ~ 10GiB memory `(150MiB + (1GiB*10 test runs))`, and ~ 100MiB disk `(10MiB*10 test runs)`.

**Note:** Resources requirements may vary based on the application being tested (size and number of assets to be loaded, etc.).

**Note:** When running both API or Multistep API tests and Browser tests on a single private location, the recommendation is to perform computation using Browser tests resource requirements.

### Assign resources to your private location

Once you know about the [**total** requirements for your private location](#private-location-total-hardware-requirements), you can decide how you want these resources to be distributed:

* You can assign all resources to a single worker. In this case:
  * Set the [`concurrency` parameter][4] to `maximum number of test runs that can be executed in parallel on your private location`.
  * Assign your [total private location resource requirements](#private-location-total-hardware-requirements) to your unique container.
* You can distribute resources across several workers by running several containers for one private location with a single configuration file in order to spread the load. In this case:
  * Set the [`concurrency` parameter][4] to `maximum number of test runs that can be executed on your private location / number of workers associated with your private location`.
  * Assign `total private location resource requirements / number of workers` resources to each private location container.


**Example:** For a private location running only Browser tests, with a maximum number of concurrent test runs of `10`, your private location requires ~ 1.5 core CPU, ~ 10GiB memory, and ~ 100MiB disk. If you want to distribute these resources across two workers, the [`concurrency` parameter][4] should be set to `5`, and each worker should be allocated ~ 750mCores CPU, ~ 5GiB memory, and ~ 50MiB disk.

#### Queueing mechanism

When there are several workers associated with a private location, each worker requests a few tests to run that depends on its [`concurrency` parameter][4] and on the number of additional test runs that can be assigned to it.   

**Example:** Ten tests are scheduled to run simultaneously on a private location that has two workers running. If worker 1 is running two tests, it can request three additional tests to run. If worker 2 is not running any tests, it can request the five following tests. The remaining two tests can be requested by which ever worker has finished running its test first (which ever worker has available slots).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /synthetics/api_tests/
[2]: /synthetics/multistep?tab=requestoptions
[3]: /synthetics/browser_tests/?tab=requestoptions
[4]: /synthetics/private_locations/configuration#advanced-configuration
[5]: /synthetics/ci