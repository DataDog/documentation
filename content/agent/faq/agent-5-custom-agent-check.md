---
title: Custom check, Agent v5 example
kind: faq
---

## An HTTP Check

Let's write a basic check that checks the status of an HTTP endpoint. On each run of the check, a *GET* request is made to the HTTP endpoint. Based on the response, one of the following happens:

* If the response is successful (response is 200, no timeout) the response time is submitted as a metric.
* If the response times out, an event is submitted with the URL and timeout.
* If the response code != 200, an event is submitted with the URL and the response code.

### Configuration

First let's define how the configuration should look so that we know
how to handle the structure of the `instance` payload that is passed into the
call to `check`.

Besides just defining a URL per call, it'd be nice to allow you to set a timeout for each URL. We'd also want to be able to configure a default timeout if no timeout value is given for a particular URL.

So our final configuration looks something like this:

```yaml
init_config:
    default_timeout: 5

instances:
    -   url: https://google.com

    -   url: http://httpbin.org/delay/10
        timeout: 8

    -   url: http://httpbin.org/status/400

```

### The Check

Now let's define our check method. The main part of the check makes
a request to the URL and time the response time, handling error cases as it goes.

In this snippet, we start a timer, make the GET request using the
[requests library](http://docs.python-requests.org/en/latest/) and handle and
errors that might arise.

```python
# Load values from the instance config
url = instance['url']
default_timeout = self.init_config.get('default_timeout', 5)
timeout = float(instance.get('timeout', default_timeout))

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
```

If the request passes, we want to submit the timing to Datadog as a metric. Let's call it `http.response_time` and tag it with the URL.

```python
timing = end_time - start_time
self.gauge('http.response_time', timing, tags=['http_check'])
```

Finally, define what happens in the error cases. We have already
seen that we call `self.timeout_event` in the case of a URL timeout and
we call `self.status_code_event` in the case of a bad status code. Let's
define those methods now.

First, define `timeout_event`. Note that we want to aggregate all of these events together based on the URL so we define the aggregation_key as a hash of the URL.

```python
def timeout_event(self, url, timeout, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'URL timeout',
        'msg_text': '%s timed out after %s seconds.' % (url, timeout),
        'aggregation_key': aggregation_key
    })
```

Next, define `status_code_event` which looks very similar to the timeout event method.

```python
def status_code_event(self, url, r, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'Invalid response code for %s' % url,
        'msg_text': '%s returned a status of %s' % (url, r.status_code),
        'aggregation_key': aggregation_key
    })
```

### Putting It All Together

The entire check would be placed into the `checks.d` folder as `http.py`. The corresponding configuration would be placed into the `conf.d` folder as `http.yaml`.

Once the check is in `checks.d`, test it by running it as a python script. [Restart the Agent](/agent/faq/agent-commands) for the changes to be enabled. **Make sure to change the conf.d path in the test method**. From your Agent root, run:

    PYTHONPATH=. python checks.d/http.py

And confirm what metrics and events are being generated for each instance.

Here's the full source of the check:

```python
import time
import requests

from checks import AgentCheck
from hashlib import md5

class HTTPCheck(AgentCheck):
    def check(self, instance):
        if 'url' not in instance:
            self.log.info("Skipping instance, no url found.")
            return

        # Load values from the instance configuration
        url = instance['url']
        default_timeout = self.init_config.get('default_timeout', 5)
        timeout = float(instance.get('timeout', default_timeout))

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
            return

        if r.status_code != 200:
            self.status_code_event(url, r, aggregation_key)

        timing = end_time - start_time
        self.gauge('http.response_time', timing, tags=['http_check'])

    def timeout_event(self, url, timeout, aggregation_key):
        self.event({
            'timestamp': int(time.time()),
            'event_type': 'http_check',
            'msg_title': 'URL timeout',
            'msg_text': '%s timed out after %s seconds.' % (url, timeout),
            'aggregation_key': aggregation_key
        })

    def status_code_event(self, url, r, aggregation_key):
        self.event({
            'timestamp': int(time.time()),
            'event_type': 'http_check',
            'msg_title': 'Invalid response code for %s' % url,
            'msg_text': '%s returned a status of %s' % (url, r.status_code),
            'aggregation_key': aggregation_key
        })

if __name__ == '__main__':
    check, instances = HTTPCheck.from_yaml('/path/to/conf.d/http.yaml')
    for instance in instances:
        print "\nRunning the check against url: %s" % (instance['url'])
        check.check(instance)
        if check.has_events():
            print 'Events: %s' % (check.get_events())
        print 'Metrics: %s' % (check.get_metrics())
```