---
description: Collect metrics for your project and compare them across project versions.
git_integration_title: google_app_engine
integration_title: Google App Engine
kind: integration
placeholder: true
title: Datadog-Google App Engine Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Install the Google App Engine integration in your Python project to:

* See your Google App Engine services metrics: memcache, task queues, datastores
* See metrics about requests: display percentiles, latency, cost
* Tag Google App Engine metrics by version and compare the performance of different versions

You can also send custom metrics to Datadog.

## Setup
### Installation

Ensure that Billing is enabled on your Google App Engine project to collect all metrics

1. Change directory into to your project's application directory.
2. Clone our Google App Engine module

        git clone https://github.com/DataDog/gae_datadog

3. Edit your project's `app.yaml` file

    a. Add the Datadog handler to your app.yaml file:

        handlers:
          # Should probably be at the beginning of the list
          # so it's not clobbered by a catchall route
          - url: /datadog
            script: gae_datadog.datadog.app

    b. Set your API key. This should be at the top level of the file and not in the handler section.

        env_variables:
          DATADOG_API_KEY: 'YOUR_API_KEY_HERE'

    c. Since the dogapi module sends metrics and events through a secure TLS connection, add the ssl module in the app.yaml:

        libraries:
          - name: ssl
            version: "latest"

4. Add ```dogapi``` to the requirements.txt file.

        echo dogapi >> requirements.txt

5. Ensure the requirements are installed.

        pip install -r requirements.txt -t lib/

6. Deploy your application. Refer to the Google App Engine documentation for language specific deployment command. For Python apps, it's:

        appcfg.py -A <project id> update app.yaml

7. Enter the URL for your application in the first text box on the integration configuration screen. If you are using Task queues in the Google Developers Console, you can add them here as well.

At this point you will get a number of metrics for your environment. You can also choose to further instrument your app using the library for whatever language your app is written in.

See the [Libraries page](https://docs.datadoghq.com/libraries/) for a list of all official and community-contributed API and DogStatsD client libraries.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

-------------------------

*This documentation verified on November 3, 2015*
