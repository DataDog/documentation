---
title: Continuous Profiler Billing
kind: documentation
---

[Datadog Continuous Profiler][1] allows you to analyze code performance in production, across your entire stack with minimal overhead. You can leverage code profiling to quickly detect and optimize the most resource-consuming methods or classes in your application, which increases code efficiency and reduces cloud provider costs.

| Billing Parameter  | Price                                      | Containers                                                                 | Billing                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Profiler Host][2]      | $12 per [profiled host][2] per month | 4 profiled containers* per profiled host included in the price. Any additional profiled container is billed at $2 per container per month    | Datadog records the number of unique Continuous Profiler hosts you are concurrently monitoring with the Datadog Continuous Profiler service once per hour. These hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth-highest measurement (eighth-highest only in February).
Additionally, Datadog measures the total number of containers that are being profiled. Once every five minutes, Datadog records the number of unique containers you are monitoring in the Datadog Continuous Profiler service. Datadog charges monthly based on the fractional hours of monitored containers. For Continuous Profiler, Datadog only counts the containers that are running the Continuous Profiler service towards the total monitored container count. |


**Note:** 1 profiled container is a container that is running the Continuous Profiler service. This does not include containers that are not being profiled. For instance, a DNS service container that is NOT profiled, running concurrently with your application container that IS profiled, will not be counted towards the 4 profiler containers allotment.

## Sample Deployment Scenarios

**Sample cases illustrate annual billing rates. Contact Sales or your [Customer Success Manager][3] to discuss volume discounts for your account.**

### Case 1: Hosts with no Containers

Using 5 hosts running 1 application being profiled in each host. No containers.  

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 0 per host | $0 since there is no overage                                                              | 0 * $2        | $0                    |
| Total          |            |                                                                                                 | $60 + $0      | **$60 per month**    |


### Case 2: Hosts with 4 Profiled Containers

Using 5 hosts with 4 profiled containers. A profiled container is a container that is running the Continuous Profiler service. This does not include containers that are not being profiled – i.e sending profiling data from the container to the Datadog Agent.  

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 4 per host | $0 since 4 containers is right at the allotment limit, no overage charge is issued        | 0 * $2        | $0                    |
| Total          |            |                                                                                                 | $60 + $0      | **$60 per month**    |


### Case 3: Hosts with 6 Profiled Containers

Using 5 hosts with 6 profiled containers per each host. A profiled container is a container that is running the Continuous Profiler service. This does not include containers that are not being profiled – i.e sending profiling data from the container to the Datadog Agent.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 6 per host | $2 per overage container per host. In this case there are 6 - 4 = 2 overage containers for each host        | 2  * $2 * 5 hosts         | $20                   |
| Total          |            |                                                                                                 | $60 + $20      | **$80 per month**    |


### Case 4: Hosts with 5 Containers but only 2 are Profiled

Using 5 hosts with 5 containers per each host but only two of them are profiled containers . A profiled container is a container that is running the Continuous Profiler service. This does not include containers that are not being profiled – i.e sending profiling data from the container to the Datadog Agent.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 5 * $12       | $60                   |
| Profiled containers  | 2 per host | $0 since 2 containers is below the allotment limit, no overage charge is issued. The remaining 3 containers not reporting profile data are not counted towards the allotment.         | 0 * $2        | $0                    |
| Total          |            |                                                                                                 | $60 + $0      | **$60 per month**    |


### Case 5: Hosts with Varying Numbers of Profiled Containers

Using 2 profiled hosts - Host A and Host B.

* Host A is running 8 containers
* Host B is running 2 containers         

All 10 containers are running application instances that are being profiled, meaning Host A has an overage of 4 containers and Host B can add 2 more containers.

In this scenario, we aggregate all containers across all hosts (i.e. 2 hosts, 10 containers). Then we would have 8 containers included in price and an overage of 2 containers. Therefore, the breakdown would look as such:


| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $12 per host                                                                                    | 2 * $12       | $24                   |
| Profiled containers  | 10 in aggregate of host A + host B | $2 per overage container. In this case 2 hosts would allow up to 8 containers but we have 2 containers summed across two hosts: 10-8 = 2 overage containers        | 2 * $2 * 2 hosts        | $8                    |
| Total          |            |                                                                                                 | $24 + $8      | **$32 per month**    |


## FAQs
**1. What is classified as a Continuous Profiler host for billing?**

A host is a physical or virtual operating system instance. Datadog records the number of hosts you are concurrently monitoring in the Datadog Infrastructure service once an hour. For billing Continuous Profiler, number of hosts with a Profiler library installed and sending profiles are calculated every hour. These hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth-highest measurement (eighth-highest only in February).

**2. How is billing calculated if I deploy one agent per container?**

It is recommended to setup running one agent per underlying host for container deployment. If you still choose to run one agent per container, then each container is treated as a single host. The price is then (Price Per Profiled host) * (Number of containers)

**3. What happens to my bill if I have to suddenly scale my environment?**

Since the hourly measurements of top 99 percentile hosts are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth-highest measurement (eighth-highest only in February), it gives you a shield against being billed for unexpected spikes.

**4. Do I get charged for pause containers in Kubernetes?**

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+).

**5. How is the host billing related to my services?**

Continuous Profiler is billed on the basis of hosts deployed with agents sending profiles and not services.

**6. Can I use Continuous Profiling without APM?**

Not yet. We would love to hear from you if you are interested in using just Continuous Profiling without APM. Please reach out to us through your [Contact Sales][4] or your [Customer Success Manager][3].

[1]: /tracing/profiling/
[2]: /account_management/billing/pricing/#continuous-profiler
[3]: mailto:success@datadoghq.com
[4]: mailto:sales@datadoghq.com
