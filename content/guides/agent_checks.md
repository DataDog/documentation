---
title: Writing an Agent Check
kind: guide
listorder: 6
sidebar:
  nav:
    - header: Guide to Agent Checks
    - text: Overview
      href: "#overview"
    - text: Setup
      href: "#setup"
    - text: Agent Check Interface
      href: "#interface"
    - text: Configuration
      href: "#config"
    - text: Directory Structure
      href: "#directory"
    - text: Your First Check
      href: "#first"
    - text: An HTTP Check
      href: "#http"
---

<div class="alert alert-block">
This guide requires an Agent version >= 3.2.0. Older versions of the Agent do
not include the `AgentCheck` interface that we'll be using.
</div>


<!--
======================================================
OVERVIEW
======================================================
-->

<h3 id="overview">Overview</h3>
This guide details how to collect metrics and events from a new data source
by writing an Agent Check, a Python plugin to the Datadog Agent. We'll
look at the `AgentCheck` interface, and then write a simple Agent Check
that collects timing metrics and status events from HTTP services.

Any custom checks will be included in the main check run loop, meaning
they will run every check interval, which defaults to 15 seconds.

<!--
======================================================
SETUP
======================================================
-->

<h3 id="setup">Setup</h3>

First off, ensure you've properly
<a href="http://app.datadoghq.com/account/settings#agent">installed the
Agent</a> on your machine. If you run into any issues during the setup, pop by
our chatroom, <a href="irc://irc.freenode.net/datadog">#datadog on FreeNode</a>,
and we'll be happy to answer any questions you might have. (There's a
<a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
web chat client, too</a>.)

<!--
======================================================
INTERFACE
======================================================
-->

<h3 id="interface">Agent Check Interface</h3>

All custom checks inherit from the `AgentCheck` class found in `checks/__init__.py`
and require a `check()` method that takes one argument, `instance` which is a
`dict` having the configuration of a particular instance. The `check` method is
run once per instance defined in the check configuration (discussed later).

#### Sending metrics

Sending metrics in a check is easy. If you're already familiar with the
methods available in DogStatsD, then the transition will be very simple. If
you're not already familiar with that interface, you'll find sending metrics is
a breeze.

You have the following methods available to you:

    self.gauge( ... ) # Sample a gauge metric

    self.increment( ... ) # Increment a counter metric

    self.decrement( ... ) # Decrement a counter metric

    self.histogram( ... ) # Sample a histogram metric

    self.rate( ... ) # Sample a point, with the rate calculated at the end of the check

    self.count( ... ) # Sample a raw count metric

    self.monotonic_count( ... ) # Sample an increasing counter metric

All of these methods take the following arguments:

- `metric`: The name of the metric
- `value`: The value for the metric (defaults to 1 on increment, -1 on decrement)
- `tags`: (optional) A list of tags to associate with this metric.
- `hostname`: (optional) A hostname to associate with this metric. Defaults to the current host.
- `device_name`: (optional) A device name to associate with this metric.

These methods may be called from anywhere within your check logic. At the end of
your `check` function, all metrics that were submitted will be collected and
flushed out with the other Agent metrics.

#### Sending events

At any time during your check, you can make a call to `self.event(...)` with one argument: the payload of the event. Your event should be structured like this:

    {
        "timestamp": int, the epoch timestamp for the event,
        "event_type": string, the event name,
        "api_key": string, the api key for your account,
        "msg_title": string, the title of the event,
        "msg_text": string, the text body of the event,
        "aggregation_key": string, a key to use for aggregating events,
        "alert_type": (optional) string, one of ('error', 'warning', 'success', 'info');
            defaults to 'info',
        "source_type_name": (optional) string, the source type name,
        "host": (optional) string, the name of the host,
        "tags": (optional) list, a list of tags to associate with this event
    }

At the end of your check, all events will be collected and flushed with the rest
of the Agent payload.


#### Exceptions

If a check cannot run because of improper configuration,  programming error or
because it could not collect any metrics, it should raise a meaningful exception.
This exception will be logged, as well as be shown in the Agent info command for
easy debugging. For example:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: ConnectionError('Connection refused.',)
          - Collected 0 metrics & 0 events


#### Logging

As part of the parent class, you're given a logger at `self.log`, so you can do
things like `self.log.info('hello')`. The log handler will be `checks.{name}`
where `{name}` is the name of your check (based on the filename of the check
module).

<!--
======================================================
CONFIGURATION
======================================================
-->

<h3 id="config">Configuration</h3>

Each check will have a configuration file that will be placed in the `conf.d`
directory. Configuration is written using [YAML](http://www.yaml.org/). The
file name should match the name of the check module (e.g.: `haproxy.py` and
`haproxy.yaml`).

The configuration file has the following structure:

<%= console <<EOF
init_config:
    key1: val1
    key2: val2

instances:
    - username: jon_smith
      password: 1234

    - username: jane_smith
      password: 5678
EOF
%>

<div class="alert alert-block">Note: YAML files must use spaces instead of tabs.</div>

#### init_config

The *init_config* section allows you to have an arbitrary number of global
configuration options that will be available on every run of the check in
`self.init_config`.

#### instances

The *instances* section is a list of instances that this check will be run
against. Your actual `check()` method is run once per instance. This means that
every check will support multiple instances out of the box.

<!--
======================================================
DIRECTORY STRUCTURE
======================================================
-->

<h3 id="directory">Directory Structure</h3>

Before starting your first check it is worth understanding the checks directory
structure. There are two places that you will need to add files for your check.
The first is the `checks.d` folder, which lives in your Agent root.

For all Linux systems, this means you will find it at:

    /etc/dd-agent/checks.d/

For Windows Server >= 2008 you'll find it at:

    C:\Program Files (x86)\Datadog\Agent\checks.d\

    OR

    C:\Program Files\Datadog\Agent\checks.d\

For Mac OS X and source installations, you'll find it at:

    ~/.datadog-agent/agent/checks.d/

    OR

    ~/.pup/agent/checks.d/

    OR

    <sandbox_folder>/checks.d/

The other folder that you need to care about is `conf.d` which lives in the
Agent configuration root.

For Linux, you'll find it at:

    /etc/dd-agent/conf.d/

For Windows, you'll find it at:

    C:\ProgramData\Datadog\conf.d\

    OR

    C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\

For Mac OS X and source installations, you'll find it at:

    ~/.datadog-agent/agent/conf.d/

    OR

    ~/.pup/agent/conf.d/

    OR

    <sandbox_folder>/conf.d/

You can also add additional checks to a single directory, and point to it in `datadog.conf`:

    additional_checksd: /path/to/custom/checks.d/

<!--
======================================================
FIRST CHECK
======================================================
-->

<h3 id="first">Your First Check</h3>

<div class="alert alert-block">
The names of the configuration and check files must match. If your check
is called <code>mycheck.py</code> your configuration file <em>must</em> be
named <code>mycheck.yaml</code>.
</div>

To start off simple, we'll write a check that does nothing more than send a
value of 1 for the metric `hello.world`. The configuration file will be very
simple, including no real information. This will go into `conf.d/hello.yaml`:

<%= console <<EOF
init_config:

instances:
    [{}]

EOF
%>

The check itself will inherit from `AgentCheck` and send a gauge of `1` for
`hello.world` on each call. This will go in `checks.d/hello.py`:

<%= python <<EOF
from checks import AgentCheck
class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1)

EOF
%>

As you can see, the check interface is really simple and easy to get started
with. In the next section we'll write a more useful check that will ping HTTP
services and return interesting data.


<!--
======================================================
HTTP CHECK
======================================================
-->

<h3 id="http">An HTTP Check</h3>

Now we will guide you through the process of writing a basic check that will
check the status of an HTTP endpoint. On each run of the check, a GET
request will be made to the HTTP endpoint. Based on the response, one of the
following will happen:

  - If the response is successful (response is 200, no timeout) the response
  time will be submitted as a metric.
  - If the response times out, an event will be submitted with the URL and
  timeout.
  - If the response code != 200, an event will be submitted with the URL and
  the response code.

#### Configuration

First we will want to define how our configuration should look, so that we know
how to handle the structure of the `instance` payload that is passed into the
call to `check`.

Besides just defining a URL per call, it'd be nice to allow you to set a timeout
for each URL. We'd also want to be able to configure a default timeout if no
timeout value is given for a particular URL.

So our final configuration would look something like this:

<%= console <<EOF
init_config:
    default_timeout: 5

instances:
    -   url: https://google.com

    -   url: http://httpbin.org/delay/10
        timeout: 8

    -   url: http://httpbin.org/status/400

EOF
%>

#### The Check

Now we can start defining our check method. The main part of the check will make
a request to the URL and time the response time, handling error cases as it goes.

In this snippet, we start a timer, make the GET request using the
[requests library](http://docs.python-requests.org/en/latest/) and handle and
errors that might arise.

<%= python <<EOF
# Load values from the instance config
url = instance['url']
default_timeout = self.init_config.get('default_timeout', 5)
timeout = float(instance.get('timeout', default_time))

# Use a hash of the URL as an aggregation key
aggregation_key = md5(url).hexdigest()

# Check the URL
start_time = time.time()
try:
    r = requests.get(url, timeout=timeout)
    end_time = time.time()
except requests.exceptions.Timeout as e:
    # If there's a timeout
    self.timeout_event(url, timeout, aggregation_key)

if r.status_code != 200:
    self.status_code_event(url, r, aggregation_key)
EOF
%>

If the request passes, we want to submit the timing to Datadog as a metric. Let's
call it `http.response_time` and tag it with the URL.

<%= python <<EOF
timing = end_time - start_time
self.gauge('http.reponse_time', timing, tags=['http_check'])
EOF
%>

Finally, we'll want to define what happens in the error cases. We have already
seen that we call `self.timeout_event` in the case of a URL timeout and
we call `self.status_code_event` in the case of a bad status code. Let's
define those methods now.

First, we'll define `timeout_event`. Note that we want to aggregate all of these
events together based on the URL so we will define the aggregation_key as a hash
of the URL.

<%= python <<EOF
def timeout_event(self, url, timeout, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'URL timeout',
        'msg_text': '%s timed out after %s seconds.' % (url, timeout),
        'aggregation_key': aggregation_key
    })
EOF
%>


Next, we'll define `status_code_event` which looks very similar to the timeout
event method.

<%= python <<EOF
def status_code_event(self, url, r, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'Invalid reponse code for %s' % url,
        'msg_text': '%s returned a status of %s' % (url, r.status_code),
        'aggregation_key': aggregation_key
    })
EOF
%>

#### Putting It All Together

For the last part of this guide, we'll show the entire check. This module would
be placed into the `checks.d` folder as `http.py`. The corresponding
configuration would be placed into the `conf.d` folder as `http.yaml`.

Once the check is in `checks.d`, you can test it by running it as a python
script. **Make sure to change the conf.d path in the test method**. From your
Agent root, run:

    PYTHONPATH=. python checks.d/http.py

You'll see what metrics and events are being generated for each instance.

Here's the full source of the check:

<%= snippet_code_block("guides-agentchecks-ex-all.py", :nocomments => true) %>


<!--
======================================================
Troubleshooting
======================================================
-->

<h3 id="troubleshooting">Troubleshooting</h3>

Custom Agent checks can't be directly called from python and instead
 need to be called by the agent. To test this, run:

    sudo -u dd-agent dd-agent check my_check

If your issue continues, please reach out to Support with the help page that
 lists the paths it installs.

<h4>Testing Custom Checks on Windows</h4>

Testing custom checks on Windows is easy. The Agent install includes a file called shell.exe
in your Program Files directory for the Datadog Agent which you can use to run python within the Agent environment.

Once you're check (called "my_check") is written and you have the .py and .yaml files
in their correct places, you can run the following in shell.exe:

    >>> from checks import run_check
    >>> run_check('my_check')

This will output any metrics or events that the check will return.

