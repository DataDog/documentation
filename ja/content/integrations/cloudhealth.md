---
description: Enrich and improve CloudHealth's right sizing and reservation recommendations
  with Datadog metrics.
git_integration_title: cloudhealth
integration_title: Cloudhealth
kind: integration
newhlevel: true
placeholder: true
title: Datadog-Cloudhealth Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

If you use both Cloudhealth and Datadog, you can configure your Cloudhealth account to collect per-instance resource usage metrics from Datadog. This helps CloudHealth gives you more accurate recommendations for adjusting your cloud resources.

This integration does **NOT** pull anything from Cloudhealth into Datadog. It just helps Cloudhealth poll your Datadog account for metrics.

## Setup
### Configuration

If you have not yet started optimizing your cloud with CloudHealth, first sign up for a [risk-free 14 day trial](https://www.cloudhealthtech.com/). For existing CloudHealth customers, all you need to do is take these four simple steps to setup your Datadog integration in CloudHealth and to improve visibility across every dimension of their cloud environment.

1. In the CloudHealth Platform, Go to Setup -> Accounts -> Datadog and click New Account button on the top right corner.
{{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="Cloudhealth Config 2" >}}

2. Fill out the form with information from the Datadog account that you want to integrate:
    * Name - friendly name, you can update this at any time.

    * API Key - API keys are unique to your organization.

    * Application Key - Application keys, in conjunction with your organization's API key, give access to Datadog's API. CloudHealth only queries Datadog for host and metric information, and does not write anything to Datadog.

    * Import Tags - This will allow you to import Datadog tags into the platform

3. Allowed tags - if "Import tags" is toggled on, tags will be actively collected and you will see an additional field to whitelist the tags that you want to import into CloudHealth. Select the tags that should be allowed to imported within the CloudHealth platform.
{{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="Cloudhealth Config 1" >}}

4. When finished click Save Account
