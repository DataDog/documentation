---
title: How are my bills calculated each month?
kind: faq
customnav: accountmanagementnav
---

The billing cycle begins the first of the month, regardless of when you sign up. Your first month will be pro-rated based on your actual signup date.

Datadog meters the count of hosts, containers and custom metrics hourly. The billable count of hosts and containers is calculated at the end of the month using the maximum count (high-water mark) of the lower 99 percent of usage for those hours. We exclude the top 1% to reduce the impact of spikes in usage on your bill. The billable count of custom metrics is based on the average number of custom metric hours for the month.

Note: Hosts are defined as any instances with the Datadog agent installed plus any AWS EC2s or vSphere VMs monitored via our integrations. Any EC2s or VMs with the agent installed will count as a single instance and will not be double-billed.