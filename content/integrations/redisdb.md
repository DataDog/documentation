---
title: Datadog-Redis Integration
integration_title: Redis
newhlevel: true
kind: integration
git_integration_title: redisdb
updated_for_agent: 5.8.5
aliases:
  - /integrations/redis
description: "{{< get-desc-from-git >}}"
---

{{< img src="integrations/redis/redis.png" alt="Redis default dashboard" >}}

## Overview
//get-overview-from-git//

## Setup
//get-setup-from-git//

## Data Collected
//get-data-collected-from-git//

## Troubleshooting
### How do I filter to look at the stats for a particular DB in a particular environment?

Prebuilt dashboards only allow you to filter on a single tag
(these are the dashboards you see when
clicking [Overview](https://app.datadoghq.com/account/overview)). If you go to the [Metrics Explorer](https://app.datadoghq.com/metric/explorer), you can select which
metrics you want to see and what you want to see it over.  In the ‘Over:’ section
you can select multiple environments and then select “Save these tiles to: a new dashboard.”

{{< img src="integrations/redis/metric-explorer-redis.png" >}}

//get-troubleshooting-from-git//

## Further Reading
//get-further-reading-from-git//