---
title: Getting Started with the Agent
kind: guide
listorder: 1
---

<div class="alert alert-info">
To get started using the Agent, please select your platform on the sidebar to the left.
</div>

<!--
======================================================
What is the Agent?
======================================================
-->

<h2 id="what_is_the_agent">What is the Agent?</h2>

The Datadog Agent is piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on
your behalf so that you can do something useful with your monitoring and performance data.

The source code for the Datadog Agent can be found <a href='https://github.com/DataDog/dd-agent'>here</a>.

For information on running the Agent through a proxy please see <a target="_blank" href="https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration">here</a>;
for which ranges to allow, please see <a target="_blank" href="https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration#open-ports">here</a>.


The Agent has three main parts: the collector, dogstatsd, and the forwarder.
<ul>
<li>The collector runs checks on the current machine for whatever integrations you have
and it will capture system metrics like memory and CPU.
</li>
<li>Dogstatsd is a statsd backend server you can send custom metrics to from an application.
</li>
<li>The forwarder retrieves data from both dogstatsd and the collector and then queues
it up to be sent to Datadog.
</li>
</ul>
This is all controlled by one supervisor process. We keep this separate so you don't have to have the
overhead of each application if you don't want to run all parts (though we generally recommend you do).



<!--
======================================================
Agent Troubleshooting
======================================================
-->

<h3 id="troubleshooting">Agent Troubleshooting</h3>
<p>
If you ended up at this page and have not yet installed the Datadog Agent, please go <a href="https://app.datadoghq.com/account/settings#agent" target="_blank">here</a> for installation instructions.
If you just installed the Agent, it might take a few moments before you start seeing metrics appear.
The first place you can check for metrics is the <a href="https://app.datadoghq.com/metric/explorer" target="_blank">Metrics Explorer</a>.
</p>
<p>
If you think you might be experiencing issues, the first thing to do is run the info command and check the Agent logs.
The info command and the log locations are dependent on your OS, which you can select from the navigation to the left for further information.
</p>

<h4 id="issue_installing">Issues getting the Agent installed</h4>

If you encountered an issue during the Agent installation that prevented any installation whatsoever from occurring, please reach out to <a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>.
Please let us know your OS and version, as well as how you are installing the Agent (and which agent version).
Also, please include the errors you encountered along the way.


<h4 id="issue_reporting">Issues getting the Agent reporting</h4>

If you get the Agent installed but are not seeing any data in Datadog, you can troubleshoot in the following manner.
First, run the info command. Select your OS in the nav column on the left of this page to see how to run this.
Does running the info command show any errors?

If not, you should also check the logs (location of the logs again depends on OS). Errors in the logs may also reveal the cause of any issues.

If not, please send both the full output of the info command and the logs as attachments to <a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>.



<h4 id="machine_time">Check your machine's time</h4>
We have also seen a few cases where machines have their clock set further in the future or the past, which can sometimes cause problems with metric submission.
To check for this, run:

<code>date -u && curl -s -v https://app.datadoghq.com 2>&1 | grep Date</code>
<p>
This will output the current system’s date, and then make a request to our endpoint and grab the date on our end.
If these are more than a few minutes apart, you may want to look at the time settings on your server.
</p>


<h4 id="integrations">Issues getting integrations working</h4>

Datadog has quite a few <a href="http://docs.datadoghq.com/integrations/" target="_blank">integrations</a> which are set
up through <a href="https://github.com/DataDog/dd-agent/tree/master/conf.d" target="_blank">YAML files in the Agent</a>.

Here is a quick guide for troubleshooting getting integrations installed:

1. Run the info command (find this based on your OS in the left column above).

2. Is the integration showing up in the info command?

	+ <strong>No, it's not.</strong>
		* Check the configuration file, make sure it is in the right location and named correctly.
		* Check it in a YAML parser to make sure it has the correct syntax. Example files can be found <a href="https://github.com/DataDog/dd-agent/tree/master/conf.d" target="_blank">here</a>.
		* If you moved or changed the file, restart the Agent and then rerun the info command to see if it is now showing up.
	+ <strong>Yes, it's there.</strong>
		* Check the <a href="https://app.datadoghq.com/metric/explorer" target="_blank">Metrics Explorer</a> to see if system metrics are showing up from the host. For example, look for system.cpu.user from the host that is running the Agent and has that integration setup.
		* If there are still no metrics, check the logs for errors and please send them along, with the info command output, to <a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>.
