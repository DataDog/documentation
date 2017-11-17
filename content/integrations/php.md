---
aliases: []
description: Send custom metrics from your PHP applications using the DogStatsD PHP
  client.
git_integration_title: php
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-PHP Integration
---

{{< img src="integrations/php/phpgraph.png" alt="PHP Graph" responsive="true" >}}

## Overview

Connect your PHP applications to Datadog to:

* Visualize their performance
* Correlate their performance with the rest of your applications
* Monitor any relevant metric

## Setup
### Installation

The PHP integration enables you to monitor any custom metric by instrumenting a few lines of code.
For instance, you can have a metric that returns the number of page views or the time of any function call.
For additional information about the PHP integration, please refer to this guide on submitting metrics.
For advanced usage, please refer to the documentation in the repository.

1.  Install the library by cloning the Git repository:

        git clone git@github.com:DataDog/php-datadogstatsd.git

1.  Start instrumenting your code:
 the datadogstatsd.php library file
        require './libraries/datadogstatsd.php';
 a counter.
        DataDogStatsD::increment('your.data.point');

1.  Go to the Metrics explorer page and see that it works!

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The PHP integration does not include any event at this time.

### Service Checks
The PHP integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
