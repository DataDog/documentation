---
title: Continuous Profiler Billing
kind: documentation
---

[Datadog Continuous Profiler][1] allows you to analyze code performance in production, across your entire stack with minimal overhead. You can leverage code profiling to quickly detect and optimize the most resource-consuming methods or classes in your application, which increases code efficiency and reduces cloud provider costs.

| Billing Parameter  | Price                                      | Containers                                                                 | Billing                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Profiler Host][2]      | $12 per [profiled host][2] per month | Four profiled containers* per profiled host included in the price. Any additional profiled container is billed at $2 per container per month    | Datadog records the number of unique Continuous Profiler hosts you are concurrently monitoring with the Datadog Continuous Profiler service once per hour. These hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth-highest measurement (eighth-highest only in February). <br> Additionally, Datadog measures the total number of containers that are being profiled. Once every five minutes, Datadog records the number of unique containers you are monitoring in the Datadog Continuous Profiler service. Datadog charges monthly based on the fractional hours of monitored containers. For Continuous Profiler, Datadog only counts the containers that are running the Continuous Profiler service towards the total monitored container count. |


**Note:** One profiled container is a container that is running the Continuous Profiler service. This does not include containers that are not being profiled. For instance, a DNS service container that is NOT profiled, running concurrently with your application container that IS profiled, will not be counted towards the four profiler containers allotment.

## Deployment scenarios

These sample cases demonstrate common use cases using annual billing rates. Contact Sales or your [Customer Success Manager][3] to discuss volume discounts for your account.

### Hosts with no containers

Using five hosts running one application being profiled in each host. No containers.  

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 0 per host | $0 since there is no additional containers                                                              | 0 * $2        | $0                    |
| Total          |            |                                                                                                 | $60 + $0      | **$60 per month**    |


### Hosts with four profiled containers

Using five hosts with four profiled containers each. A profiled container is a container that is running the Continuous Profiler service by sending profiling data from the container to the Datadog Agent. This does not include containers that are not being profiled.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 4 per host | $0 since 4 containers is right at the allotment limit, no additional charge is issued        | 0 * $2        | $0                    |
| Total          |            |                                                                                                 | $60 + $0      | **$60 per month**    |


### Hosts with six profiled containers

Using five hosts with six profiled containers per each host. A profiled container is a container that is running the Continuous Profiler service by sending profiling data from the container to the Datadog Agent. This does not include containers that are not being profiled.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 6 per host | $2 per additional container per host. In this case there are 6 - 4 = 2 additional containers for each host        | 2  * $2 * 5 hosts         | $20                   |
| Total          |            |                                                                                                 | $60 + $20      | **$80 per month**    |


### Hosts with five containers but only two are profiled

Using four hosts with five containers per host but only two of them are profiled containers . A profiled container is a container that is running the Continuous Profiler service by sending profiling data from the container to the Datadog Agent. This does not include containers that are not being profiled.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 2 per host | $0 since 2 containers is below the allotment limit, no additional charge is issued. The remaining 3 containers not reporting profile data are not counted towards the allotment.         | 0 * $2        | $0                    |
| Total          |            |                                                                                                 | $60 + $0      | **$60 per month**    |


### Hosts with varying numbers of profiled containers

Using two profiled hosts - Host A and Host B.

* Host A is running eight containers
* Host B is running two containers         

All 10 containers are running application instances that are being profiled, meaning Host A has an four additional containers over the price and Host B can add two more containers.

In this scenario, we aggregate all containers across all hosts (so two hosts, 10 containers). Then we would have eight containers included in price and an addition of two containers. Therefore, the breakdown would be:


| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 2 * $12       | $24                   |
| Profiled containers  | 10 in aggregate of host A + host B | $2 per additional container. In this case 2 hosts would allow up to 8 containers but we have 2 containers summed across two hosts: 10-8 = 2 additional containers        | $2 * 2 hosts        | $4                    |
| Total          |            |                                                                                                 | $24 + $4      | **$28 per month**    |


## FAQ
**1. What is classified as a Continuous Profiler host for billing?**

A host is a physical or virtual operating system instance. Datadog records the number of hosts you are concurrently monitoring in the Datadog Infrastructure service once an hour. For billing a Continuous Profiler, the number of hosts with a Profiler library installed and sending profiles are calculated every hour. These hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth-highest measurement (eighth-highest only in February).

**2. How is billing calculated if I deploy one agent per container?**

Datadog recommends setting up one Agent per underlying host for container deployment. If you still choose to run one Agent per container, then each container is treated as a single host. The price is then (Price Per Profiled host) * (Number of containers).

**3. What happens to my bill if I have to suddenly scale my environment?**

Since the hourly measurements of top 99 percentile hosts are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth-highest measurement (eighth-highest only in February), it gives you a shield against being billed for unexpected spikes.

**4. Do I get charged for pause containers in Kubernetes?**

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+).

**5. How is the host billing related to my services?**

A Continuous Profiler is billed on the basis of hosts deployed with Agents sending profiles and not services.

**6. Can I use Continuous Profiling without APM?**

No. Let us know if you are interested in using Continuous Profiling without enabling APM. Please reach out to us by contacting [Sales][4] or through your [Customer Success Manager][3].

[1]: /tracing/profiling/
[2]: /account_management/billing/pricing/#continuous-profiler
[3]: mailto:success@datadoghq.com
[4]: mailto:sales@datadoghq.com
