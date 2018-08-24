---
aliases:
- /ja/integrations/redis
description: '{{< get-desc-from-git >}}'
git_integration_title: redisdb
integration_title: Redis
kind: integration
newhlevel: true
placeholder: true
title: Datadog-Redis Integration
updated_for_agent: 5.8.5
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

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
metrics you want to see and what you want to see it over.  In the 'Over:' section
you can select multiple environments and then select "Save these tiles to: a new dashboard."

{{< img src="integrations/redis/metric-explorer-redis.png" >}}

//get-troubleshooting-from-git//

## Further Reading
//get-further-reading-from-git//
