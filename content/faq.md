---
title: Frequently Asked Questions
kind: documentation
sidebar:
  nav:
    - header: FAQ Topics
    - text: Agent
      href: "/faq/#agent"
    - text: Alerts
      href: "/faq/#alerts"
    - text: API
      href: "/faq/#api"
    - text: Architecture
      href: "/faq/#architecture"
    - text: AWS
      href: "/faq/#aws"
    - text: Billing
      href: "/faq/#billing"
    - text: Graphing
      href: "/faq/#graph"
    - text: Integrations
      href: "/faq/#integrations"
    - text: Metrics
      href: "/faq/#metrics"
    - text: Events
      href: "/faq/#events"
    - text: Other
      href: "/faq/#other"

---

<!--
===============================================================================
    Agent
===============================================================================
-->

### Agent
{: #agent}

<!-- this is not currently true
<h4 id="dogstatsd-flush-interval">Is the DogStatsD flush interval configurable?</h4>
<p>
Yes, it is!  You can change the flush interval by updating your agent’s configuration file called datadog.conf and replacing the value for the “dogstatsd_interval” key.  Use the following link, select your OS in the left column, and go to the Configuration section to find the location of your agent’s configuration file: <a href="http://docs.datadoghq.com/guides/basic_agent_usage/">http://docs.datadoghq.com/guides/basic_agent_usage/</a>
</p>
-->

#### Is the agent necessary to use Datadog?
{: #agent-optional}

* No, it is not. You don't have to install an agent if you only want to submit
metrics via our API. You can read more about our API [here][api].
* In general, most folks find a lot of value in installing an agent because
they get system metrics for free and metrics on common software like mysql,
postgres, etc. with just a little bit of configuration. Another advantage is
that there is a small statsd server built-in to the agent. 


#### Can I use my own StatsD client? 
{: #statsd}

Any StatsD client will work just fine, but using the Datadog DogStatsD client
will give you a few extra features. You can read more about our clients extra
features [here][dogstatsd].


#### How can I change the hostname 
{: #hostname-change}

You can change the hostname by updating your agent’s configuration file called
datadog.conf and replacing the value for the “hostname” key.  Use the following
link, select your OS in the left column, and go to
the [Configuration section][basic_agent_usage] to find the location of your
agent’s configuration file.

#### How do I uninstall the agent 
{: #agent-uninstall}

* Mac OS:

  ~~~
  $ launchctl unload -w ~/Library/LaunchAgents/com.datadoghq.Agent.plist
  $ rm -r ~/.datadog-agent
  $ rm ~/Library/LaunchAgents/com.datadoghq.Agent.plist
  ~~~

* Windows: You can uninstall the agent in Add/Remove Programs
* Linux: ```$ sudo apt-get remove datadog-agent -y```
* CentOS 5: ```$ sudo yum remove datadog-agent-base```
* CentOS 6: ```$ sudo yum remove datadog-agent```




#### I stopped my agent but I’m still seeing the host in my Datadog account. Why is that? 
{: #agent-stopped}

It can take up to 24h for the host to disappear from the infrastructure page,
but it will only be part of the host count for billing purposes if we're
actually receiving data.

#### Other Agent-related questions? 
{: #agent-other}

Please refer to the [Basic Agent Usage Guide][basic_agent_usage].

[api]: /api/
[dogstatsd]: /guides/dogstatsd/
[basic_agent_usage]: /guides/basic_agent_usage/
<!--
===============================================================================
    Alerts
===============================================================================
-->

### Alerts 
{: #alerts}

#### I set up an alert with one of my integration metrics. Why am I getting so many No Data alerts? 
{: #no-data}

For the AWS No Data errors, the issue here has to do with how frequently we
receive AWS metrics. Because our crawlers are rate-limited by the Cloudwatch
APIs, data is often delayed by 10 or more minutes, so we generally recommend
that an alert for an AWS metric be set to have a threshold window of at least
30 minutes or an hour (you can see this in step 3 of alert creation, “during
the last…”). Switching the time frame on this alert will resolve this issue, or
you can install the agent on some AWS hosts to get more up-to-date data to
alert on. Overall, we’re always working towards getting data more efficiently
from AWS.

#### Is it possible to set up alerts based on % utilisation? For example alerting when 50% of memory has been used or 80% of disk space is used? 
{: #alert-disk-utilization}

* Yes, this can be done! Here is an example for creating a disk space in use
alert when at 80% or above:
  1. Select a metric like "system.disk.in_use".
  2. Select the "threshold alert" type.
  3. For set alert grouping, select "simple alert".
  4. Set alert conditions: Select Above and for the value put 0.8.
  5. Add a custom message for alert if you'd like.
* You can read more about setting up monitors [here][monitoring].

[monitoring]: /guides/monitoring/
<!--
===============================================================================
    API
===============================================================================
-->

### API
{: #api}

#### What are valid metric names? 
{: #api-metric-names}

Metric names must start with a letter, and after that may contain ascii alphanumerics, underscore and periods.
Other characters will get converted to underscores. There is no max length. Unicode is not supported.
We recommend avoiding spaces.
Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. http.nginx.response_time).
We say pseudo-hierarchical because we’re not actually enforcing a hierarchy or doing anything with it,
but we have aspirations to use it to infer things about servers (e.g. “hey, I see hostA and hostB are
reporting ‘http.nginx.*’, those must be web frontends”).


#### What are valid tags? 
{: #api-tags}

Tags must start with a letter, and after that may contain alphanumerics,
underscores, minuses, colons, periods and slashes. Other characters will get
converted to underscores. Tags can be up to 200 characters long and support
unicode. Tags will be converted to lowercase as well.

#### I'm submitting points to the API- anything I should know? 
{: #api-else}
We store metric points at the 1 second resolution, but we’d prefer if you only
submitted points every 15 seconds. Any metrics with fractions of a second timestamps
will get rounded to the nearest second, and if any points have the same timestamp,
the latest point will overwrite the previous ones.

We have a soft limit of 100 time series per host, where a time series is
defined as a unique combination of metric name and tag.

<!--
===============================================================================
    Architecture
===============================================================================
-->

### Architecture 
{: #architecture}

#### Is Datadog a cloud service or server application? 
{: #arch-cloud-or-server}

It's primarily a cloud service, but if you want to collect data on your servers,
there is an Agent you'll need to install. We never make any direct connections
to your infrastructure. For cloud integrations, we connect to them using the
credentials you provide to us.

#### How do I delete a host or metric? 
{: #arch-delete}

All hosts or metrics that have not seen data in 24 hours will disappear from the UI;
you can still query against them, but it will not appear in drop downs or infrastructure.
There is not a way to immediately delete a metric.

#### What's the difference between Graphite's query language and Datadog's? 
{: #arch-graphite-differences}

In terms of metric naming, we differ a little with Graphite in that a metric
query is defined by a metric name and a scope, where a scope is one or more tags.
To translate:

~~~
<application>.requests.<HTTP Method>.<HTTP Method>.<Handler Method>.mean_90
~~~

into Datadog, we'd probably say:

~~~
<application>.requests.mean_90{http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>}
~~~


Where ```<application>.requests.mean_90``` is the metric name, and
  ```http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>```
    are tags, so a concrete example might look like:

~~~
foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

To do aggregation, we can specify an aggregator as part of the metric query:

~~~
avg:foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

This will graph a single series that's the average of that metric across the
intersection of those tags. We support avg, sum, min, max aggregators. If you
wanted to see all the possible series for a given tag facet, you can say:

~~~
avg:foo.requests.mean_90{handler_class:ThingHandler, handler_method:list} by {http_method}
~~~

Which would graph stacked area series for each http_method value like GET, POST, etc.

#### How are hostnames determined? 
{: #arch-hostnames}

The hostnames are determined by what the Datadog Agent detects; this is fully
documented [here][hostnames]. You can see all names being detected by the Agent by running the info command:
 ```/etc/init.d/datadog-agent info```


#### Tell me about tagging! 
{: #tagging}

Tagging within Datadog is a powerful way to easily gather your metrics
and makes scaling your infrastructure a breeze.

For a quick example to demonstrate the power of tagging, perhaps you're
looking for a sum of two metrics, which you might normally define as follows:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
~~~

What we recommend doing is leaving off the hostname; it will then default to the host
that is sending that point, since they’re different hosts it will be treated as different points:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
~~~

With these tags you can then do:

~~~
sum:page.views{domain:example.com}
~~~
which should give the desired result.

To get a breakdown by host, you can do:

~~~
sum:page.views{domain:example.com} by {host}
~~~

Further tagging info can be found [here][tags].

For information on AWS tagging, please see [here][integration-aws].


[hostnames]: /hostnames/
[tags]: /guides/metrics/#tags
[integration-aws]: /integrations/aws/

<!-- ====================================================================== -->

<!--
===============================================================================
    AWS
===============================================================================
-->

### AWS 
{: #aws}

#### I just set up my AWS integration. Why am I seeing duplicate hosts? 
{: #duplicate-hosts}

A single host running in EC2 might have an instance ID (i-abcd1234), a generic
hostname provided by EC2 based on the host’s IP address (ip-192-0-0-1), and a
meaningful host name provided by an internal DNS server or a config-managed hosts
file (myhost.mydomain). Datadog creates aliases for host names when there are multiple
uniquely identifiable names for a single host.  It takes about 10-20 minutes for the
single host’s duplicate names to be aliased. You can read more about
hostnames [here][hostnames].


#### What metrics will I get from the AWS integration? 
{: #aws-metrics}

* Our crawlers use the Cloudwatch API, and we collect everything available from it.
* You can read in detail about our AWS integration [here][integration-aws].

#### I can’t filter out my ELB instances - will I be charged for them? 
{: #aws-elb}

We do not charge for ELBs (as they can’t be filtered out).

#### Why is there a delay in receiving my data? 
{: #aws-delay}

If you receive 5-minute metrics from Cloudwatch, there can be up to ~15-20 min delay in 
receiving your metrics. This is because Cloudwatch makes your data available with a 5-10 
minute latency, and we run the crawler every 5 minutes. In addition, queuing and 
Cloudwatch API limitations can add up to another 5 minutes. If you receive 1-minute 
metrics with Cloudwatch, then their availability delay is about 2 minutes so total 
latency to view your metrics may be ~10-12 minutes.


#### Can I get my postgres data from RDS? 
{: #aws-rds}

Yes you can! Follow the steps below to set this up:

1. Install the agent on an ec2 instance that can connect to the RDS instance
2. Use the RDS endpoint in <code>conf.d/postgres.yaml</code> (host and port)
3. Add tags in postgres.yaml: <code>dbinstanceidentifier:(rds-instance-id), enginename:postgres</code>
4. Restart the agent



<!--
===============================================================================
    Billing
===============================================================================
-->


### Billing 
{: #billing}


#### How can I change the Billing contact? 
{: #billing-contact}

You can set a specific email address to receive invoices, even if that address
is not a team member within Datadog (invoices@yourcompany.com) [here][app-billing].


#### Where can I get a copy of the invoice? 
{: #billing-invoice}

As an admin you can check out past invoices [here][app-billing-history].


***You can read more about billing [here][billing].***

[app-billing]: https://app.datadoghq.com/account/billing
[app-billing-history]: https://app.datadoghq.com/account/billing_history
[billing]: /guides/billing/
<!--
===============================================================================
    Graphing
===============================================================================
-->

### Graphing 
{: #graph}

#### How do I do arithmetic with grouped metrics? 
{: #graph-sum-grouped}

To graph the sum of ```app.foo.bar{env:staging}``` and ```app.foo.baz{env:staging}```
grouped ```by {host}```, write a graph query that looks like:

~~~
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
~~~


#### What's the syntax to sum multiple datapoints into a single line? 
{: #graph-mult-points}

You can switch commas separating the queries into plus signs, from:

~~~
"q": "sum:system.io.rkb_s{device:sda}*1024, sum:system.io.rkb_s{device:sdb}
*1024, sum:system.io.rkb_s{device: sdc}*1024"
~~~

to:

~~~
"q": "sum:system.io.rkb_s{device:sda}*1024 + sum:system.io.rkb_s{device:sdb}
*1024 + sum:system.io.rkb_s{device: sdc}*1024"
~~~

#### How do I do graph smoothing? 
{: #graph-smoothing}

You can apply smoothing averages to your series by droping to the JSON editor and
adding ‘ewma’, for example:
add any of ewma_x(…) where x can be 5, 10, 20 around your series, e.g.
```ewma_20(exception.invalid{*})```.
ewma stands for exponentially-moving average and the full list of functions
you can apply is <a href="http://docs.datadoghq.com/graphing/#functions">here</a>.


<h4>Can I stack CPU metrics on the same graph?</h4>
<p>
Check out our documentation on <a href="http://docs.datadoghq.com/graphing/">stacked series</a>.
The metric explorer just does one metric per graph, but you can see a stacked CPU graph
on the overview page by clicking any host <a href="https://app.datadoghq.com/infrastructure">here</a>.
</p>

<h4>Is there a way to share graphs?</h4>
<p>
There are two ways to share a graph or screenboard
<ul>
<li>In a time board, pick a graph on a dashboard,
click on the cog to edit it and you’ll find the “share” tab that will generate an IFRAME of just that graph.
</li>
<li>
In a custom screenboard, the middle button in the upper right will generate a URL which gives
live and read-only access to just the contents of that screenboard.
</li>
</ul>
</p>

<h4>How do I track cron jobs?</h4>

Often, you set cron jobs that trigger some meaningful script that you want to monitor and
correlate with other metrics. For example, you might have a cron'd script to vacuum a Postgres table every day:

    0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1

Vacuum is particularly resource-intensive though, so you might want Datadog events for
each time they run so you can correlate metrics and other events with vacuums.
You can do this with the dogwrap command line tool provided by the <a href="https://github.com/DataDog/datadogpy">datadog python client library</a>:

    dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table'" 2>&1 /var/log/postgres_vacuums.log


This will call the command at the end of the script and
send Datadog events if it exits with a non-zero exit code (i.e. an error). <code>--submit_mode all</code>
will send events on every run.

(To get the python client lib you can install it with <code>easy_install datadog</code> or <code>pip install datadog</code>).


<!-- ====================================================================== -->


<!--
===============================================================================
    Integrations
===============================================================================
-->
<h3><a name="integrations" href="#integrations">Integrations</a></h3>

<h4 id="integration-metrics">I set up my integration. Why am I not seeing metrics?</h4>
<p>
There a several problems that could cause this.  Send a message to support (support@datadoghq.com) describing the issue and include the agent info, the logs, and the configuration file as attachments to that message.  You can find the location of these in the following link and selecting your OS: <a href="http://docs.datadoghq.com/guides/basic_agent_usage/">http://docs.datadoghq.com/guides/basic_agent_usage/</a>
</p>

<h4 id="integration-data">How is Datadog retrieving my data?</h4>
<p>
<ul>
<li>Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.</li>
<li>All traffic is sent over SSL.</li>
<li>All communication to Datadog is via HTTPS.</li>
<li>The full license agreement can be found <a href="https://app.datadoghq.com/policy/license">here</a>.</li>
</ul>
</p>

<h4 id="integration-edit">I’d like to tweak an integration or write up a new one. Do you accept pull requests?</h4>
<p>
Yes! The agent is entirely open source and can be found <a href="https://github.com/DataDog/dd-agent/">here</a>.
</p>


<!--
===============================================================================
    Metrics
===============================================================================
-->

### Metrics
{: #metrics}

#### How do I submit custom metrics?

You can submit your custom metrics with the DogStatsD client. You can read more about this [here][1]. 


#### Why is my counter metric showing decimal values?

StatsD counters are normalized over the flush interval to report per-second units. You can read more about this [here][2]. 


#### Is there a way to submit metrics from my log data?

Yes there is! We detail log parsing [here][3]. 


#### I’d like to add historical data to my account. Is there a way to do that?

Unfortunately, we do not allow adding historical data at this time. 

#### Correct metric syntax (JSON)?

This depends on the medium you use to send metrics. 

  * For an Agent Check, see this [link][4].
  * For DogStatsD, see this [link][5].
  * For the API, see this [link][6].


#### Is there a way I can get metric reports?

We offer reporting in a variety of ways so far, which include: 

  * The ability to embed any chart anywhere. Pick a graph on a dashboard, click on the cog to edit it and you’ll find the “share” tab that will generate an IFRAME.
  * For certain sources (e.g. pagerduty), you’ll get a report in your mailbox once a week to go over past alerts.
  * Metric alerts provide a way to report changes that are outside of what you define as “normal”.

#### How do I get disk usage as a percentage instead of in bytes?

The Datadog Agent emits a metric named `system.disk.in_use` which will give you disk usage as a percentage. 

#### How is data aggregated in graphs
{: #metric-aggregation}

Within Datadog, a graph can only contain a set number of points and, as the timeframe over which a metric is viewed increases, aggregation between points will occur to stay below that set number.

Thus, if you are querying for larger timeframes of data, the points
returned will be more aggregated. The max granularity within Datadog
is one point per second, so if you had submitted points at that interval
and requested a very small time interval (in this case, probably less
than two minutes), you could end up getting all of those exact points
displayed. Otherwise, you'll see coarser and coarser granularity as the
amount of time requested increases. We do this time aggregation via
average,sum,  min, max, or count.

#### What's the difference between system.load.1, system.load.5, and system.load.15?
{: #systemload1-5-15}

When you run uptime on a *nix system, the three numbers at the end represent system.load.1, system.load.5, and system.load.15. System.load.1 is the system load for the past 1 minute for a single core. Related to these is system.load.norm.1, which is the system.load for the past 1 minute on divided by the number of cores on that machine.

<h4 id="metric-other">Any other things about metrics?</h4>
<p>
When using the 'sum/min/max/avg' aggregator, we're looking across series, not at points within a single series. So if it is scoped to it's most granular level, it's possible that switching between those aggregators will not change the values you're seeing.
</p>
<p>
For example, let's say you break down used memory by host, you'll get one
time series for each host. If you don't break down by host,
by default you'll get the average across all hosts.
</p>


<!--
===============================================================================
    Events
===============================================================================
-->
<h3><a name="events" href="#other">Events</a></h3>

<h4 id="notify">What do @ notifications do in Datadog?</h4>
<p>
<ul>
<li><code>@support</code> – this will reach Datadog support directly when posted in your stream.</li>
<li><code>@all</code> – this will send a notification to all members of your organization.</li>
<li><code>@yourname</code> – this will notify the specific user named ‘yourname’.</li>
<li><code>@test@test.com</code> this will send an email to test@test.com.</li>
<li>If you have HipChat, Slack, Webhooks, Pagerduty or VictorOps you can use:
<ul>
<li><code>@hipchat-[room-name]</code> or <code>@slack-[room-name]</code> – posts the event or graph to that chat room.</li>
<li><code>@webhook</code> – alerts or triggers whatever is attached to that webhook. Check out
<a target="_blanks" href="https://www.datadoghq.com/2014/07/send-alerts-sms-customizable-webhooks-twilio/">this blogpost</a> on Webhooks!</li>
<li><code>@pagerduty</code> or <code>@oncall</code>
– sends an alert to Pagerduty. You can also use <code>@pagerduty-acknowledge</code> and <code>@pagerduty-resolve</code>.</li>
</ul>

</li>
</ul>
</p>

<h4>Searching Events Help</h4>

<p>Your query runs a full text search of events and their comments.
You can also target certain event properties, such as the event source or status, by using the following search prefixes:</p>

<ul>
<li>
<p>
<code class="no-highlight"><strong>user:</strong>pup@datadoghq.com</code>
Find all events with comments by pup@datadoghq.com. </p>
</li>

<li>
<p>
<code class="no-highlight"><strong>sources:</strong>github,chef</code>
Show events from Github and Chef.</p>
</li>

<li>
<p><code class="no-highlight"><strong>tags:</strong>env-prod,db</code>
Show events tagged with #env-prod AND #db.</p>
</li>

<li>
<p><code class="no-highlight"><strong>hosts:</strong>db1.myapp.com,db2.myapp.com</code>
Show events from db1.myapp.com OR db2.myapp.com.</p>
</li>

<li>
<p><code class="no-highlight"><strong>status:</strong>error</code>
Show only error status events. (<strong>supports:</strong> 'error', 'warning', 'success')</p>
</li>

<li>
<p><code class="no-highlight"><strong>priority:</strong>low</code>
Show only low-priority events. (<strong>supports:</strong> 'low' or 'normal'. defaults to 'all')</p>
</li>

<li>
<p><code class="no-highlight"><strong>incident:</strong>claimed</code>
Show only claimed incidents. (supports: 'open', 'claimed', 'resolved', or 'all')</p>
</li>
</ul>

<p>Prefixes can easily be combined to make much more complex searches.
For example, if you wanted to find all open chef or nagios errors that mention cassandra, you'd have a search like:
</p>
<p><code>sources:nagios,chef status:error cassandra </code>.</p>

<p>
Note: no spaces after the colon or commas in these lists and anything not attached to a prefix goes to full text search.
</p>


<h4>Is it possible to submit events via email?</h4>
<p>
Yes!
To get started you need to go the API tab in the
<a target="_blank" href="https://app.datadoghq.com/account/settings#api">settings page</a>,
create one or more API emails.
For a monitoring tool that does not allow you to edit the body of the email you need to create a plain-text email,
and have that system or tool send alarms or notifications to this email.
For systems that allow you to edit the content
of the notification emails, you may use a JSON email. In the body of an email sent to a JSON API email you need
to include a well formatted JSON event request as per our existing events API (which you can find more details
about on <a target="_blank" href="http://docs.datadoghq.com/api/">here</a>).
</p>

<p>
Here is an example:
<pre><code>{
"title": “Host CPU above 75% for 5 minutes",
"text": "Host CPU has been above 75% for the last 5 minutes …etc",
"priority": "normal",
"tags": ["vsphere", "env:prod", "host:i-a4f761f0", "role:admin"],
"alert_type": "error"
}</code></pre>
</p>

#### What formatting is available for event text?
{: #eventformat}

We have adopted Daring Fireball's Markdown throughout the site. To find out more about Markdown, visit the [Markdown docs](http://daringfireball.net/projects/markdown/syntax).

<!--
===============================================================================
    Other
===============================================================================
-->
<h3><a name="other" href="#other">Other</a></h3>

<h4 id="team">How do I setup my team in Datadog?</h4>
<p>
The admin of the account should enter the email addresses of team members
<a href="https://app.datadoghq.com/account/team">here</a>. Some team best practices are as follows:
<ul>
<li>When the team member receives the confirmation email, they will be provided
with a link to log in directly. The user should not click ‘sign up’ during this process.</li>
<li>If multiple users from the same organization sign up separately, this will
register as different organizations in Datadog. Please reach out to support to
have these merged, but please note that all information contained in the
account getting merged will not be transferred over.</li>
<li>The only access controls we have right now are around admin activities
(adding/removing users, billing, etc.). As far as data goes (hosts, metrics, dashboards, etc.)
all users have access to everything; more robust access controls are in our
pipeline, but not something we’ve focused a lot of attention on yet.</li>
<li>To remove a team member use the “disable” button on the same ‘team’ page (only available
for admins). You cannot permanently remove users, just disable; disabled users will
only be visible to admins on the team page and can’t log in and any session they have
open is invalidated. We don’t fully delete them because they might own events,
dashboards, etc. which are not supposed to be removed.</li>
</ul>
</p>


<h4 id="security">Are my data and credentials safe?</h4>
<p>
<ul>
<li>Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.</li>
<li>All traffic is sent over SSL.</li>
<li>All communication to Datadog is via HTTPS.</li>
<li>The full license agreement can be found <a href="https://app.datadoghq.com/policy/license">here</a>.</li>
<li>The agent is entirely open source and can be found <a href="https://github.com/DataDog/dd-agent/">here</a>.</li>
<li>Some installations (for example, installing the agent on CentOS 5), will request your password. The password is needed because it's installing packages - Datadog does not retain it in anyway. You can also use the step-by-step directions if you prefer to see exactly what the script is doing.</li>
</ul>
</p>

<h4 id="feature-request">I have a feature request. How can I submit it?</h4>
<p>
You can send the request to support@datadoghq.com and we will add it to our feature request log.
</p>

   [1]: http://docs.datadoghq.com/guides/metrics/
   [2]: http://docs.datadoghq.com/guides/metrics/#counters
   [3]: http://docs.datadoghq.com/guides/logs/
   [4]: http://docs.datadoghq.com/guides/agent_checks/#sending-metrics
   [5]: http://docs.datadoghq.com/guides/dogstatsd/#metrics
   [6]: http://docs.datadoghq.com/api/#metrics-post
