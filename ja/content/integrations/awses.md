---
description: Track key Amazon Elasticsearch metrics.
git_integration_title: amazon_es
integration_title: AWS ES
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS ES Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Amazon Elasticsearch Service is a managed service that makes it easy to deploy, operate, and scale Elasticsearch in the AWS Cloud.

Enable this integration to see custom tags and metrics for your ES clusters in Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). This integration requires the permissions `es:ListTags`, `es:ListDomainNames`  and `es:DescribeElasticsearchDomains` to be fully enabled.

### Configuration

In the Amazon Web Services integration tile, ensure that ES is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
