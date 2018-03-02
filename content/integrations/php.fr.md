---
categories:
- languages
ddtype: crawler
description: Send custom metrics from your PHP applications using the DogStatsD PHP
  client.
doc_link: https://docs.datadoghq.com/integrations/php/
git_integration_title: php
has_logo: true
integration_title: PHP
is_public: true
kind: integration
manifest_version: '1.0'
name: php
public_title: Datadog-PHP Integration
short_description: Send custom metrics from your PHP applications using the DogStatsD
  PHP client.
version: '1.0'
---

{{< img src="integrations/php/phpgraph.png" alt="PHP Graph" responsive="true" popup="true">}}

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

        # Require the datadogstatsd.php library file
        require './libraries/datadogstatsd.php';


        # Increment a counter.
        DataDogStatsD::increment('your.data.point');

1.  Go to the Metrics explorer page and see that it works!

## Data Collected
### Metrics

The PHP integration does not include any metric at this time.

### Events
The PHP integration does not include any event at this time.

### Service Checks
The PHP integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

