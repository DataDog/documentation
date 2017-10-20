---
title: Agent
kind: documentation
customnav: agentnav
---

{{< partial name="platforms/platform-select-desktop.html" >}}

## What is the Agent?

The Datadog Agent is a piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on
your behalf so that you can do something useful with your monitoring and performance data.

The source code for the Datadog Agent can be found [here](https://github.com/DataDog/dd-agent).

For information on running the Agent through a proxy please see [here](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration); for which ranges to allow, please see [here](https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration#open-ports).

The Agent has three main parts: the collector, dogstatsd, and the forwarder:

* The collector runs checks on the current machine for whatever integrations you have and it will capture system metrics like memory and CPU.

* Dogstatsd is a statsd backend server you can send custom metrics to from an application.

* The forwarder retrieves data from both dogstatsd and the collector and then queues it up to be sent to Datadog.

This is all controlled by one supervisor process. We keep this separate so you don't have to have the overhead of each application if you don't want to run all parts (though we generally recommend you do).

## Agent Troubleshooting

If you ended up at this page and have not yet installed the Datadog Agent, please go [here](https://app.datadoghq.com/account/settings#agent) for installation instructions. If you just installed the Agent, it might take a few moments before you start seeing metrics appear. The first place you can check for metrics is the [Metrics Explorer](https://app.datadoghq.com/metric/explorer).

If you think you might be experiencing issues, the first thing to do is run the info command and check the Agent logs. The info command and the log locations are dependent on your OS, which you can select from the navigation to the left for further information.


## Issues getting the Agent installed

If you encountered an issue during the Agent installation that prevented any installation whatsoever from occurring, please reach out to [datadog support team](/help). Please let us know your OS and version, as well as how you are installing the Agent (and which agent version). Also, please include the errors you encountered along the way.

## Issues getting the Agent reporting

If you get the Agent installed but are not seeing any data in Datadog, you can troubleshoot in the following manner.
First, run the info command. Select your OS in the nav column on the left of this page to see how to run this. Does running the info command show any errors?

If not, you should also check the logs (location of the logs again depends on OS). Errors in the logs may also reveal the cause of any issues.

If not, please send both the full output of the info command and the logs with a flare as attachments to the [datadog support team](mailto:support@datadoghq.com?Subject=Agent%20issues).


### Check your machine's time
We have also seen a few cases where machines have their clock set further in the future or the past, which can sometimes cause problems with metric submission.
To check for this, run:

```
date -u && curl -s -v https://app.datadoghq.com 2>&1 | grep Date
```
This will output the current system’s date, and then make a request to our endpoint and grab the date on our end.
If these are more than a few minutes apart, you may want to look at the time settings on your server.

## Issues getting integrations working

Datadog has quite a few [integrations](http://docs.datadoghq.com/integrations/) which are set up through [YAML files in the Agent](https://github.com/DataDog/dd-agent/tree/master/conf.d).

Here is a quick guide for troubleshooting getting integrations installed:

1. Run the info command (find this based on your OS in the left column above).

2. Is the integration showing up in the info command?

    + **No, it's not.**
        * Check the configuration file, make sure it is in the right location and named correctly.
        * Check it in a YAML parser to make sure it has the correct syntax. Example files can be found [here](https://github.com/DataDog/dd-agent/tree/master/conf.d).
        * If you moved or changed the file, restart the Agent and then rerun the info command to see if it is now showing up.
    + **Yes, it's there.**
        * Check the [Metrics Explorer](https://app.datadoghq.com/metric/explorer) to see if system metrics are showing up from the host. For example, look for system.cpu.user from the host that is running the Agent and has that integration setup.
        * If there are still no metrics, check the logs for errors and please send them along, with the info command output, to [the datadog support team](mailto:support@datadoghq.com?Subject=Agent%20issues)