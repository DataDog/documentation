---
title: Datadog-PHP Integration
integration_title: PHP
kind: integration
doclevel: basic
newhlevel: true
---
## Overview

{{< img src="phpgraph.png" alt="PHP Graph" >}}

Connect your PHP applications to Datadog to:

* Visualize their performance
* Correlate their performance with the rest of your applications
* Monitor any relevant metric

## Installation

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
