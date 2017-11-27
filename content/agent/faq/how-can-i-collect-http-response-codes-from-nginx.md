---
title: How can I collect HTTP response codes from Nginx?
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
- link: "/integrations/nginx"
  tag: "Integration"
  text: Learn more about Datadog-Nginx integration
---
The Datadog integration collects HTTP response codes and more for NGINX Plus, however, to collect similar metrics for non-Plus parse the access logs.

The following script was provided by a Datadog customer (Credit: Ganesh Swami), it shows how it's possible to collect 5XX codes: https://gist.github.com/gane5h/78cd17c742e618e2c606

This article is intended to serve as an example for those that are interested in parsing the NGINX access.log using the parser built into the Datadog agent.


## Configuration steps

First, let's copy the code from the gist in a file that's accessible by the agent, here we'll use: `/usr/share/datadog/agent/dogstream/nginx.py`:

Be certain this file is accessible by the agent:
```
$ sudo chown dd-agent /usr/share/datadog/agent/dogstream/nginx.py
$ sudo ls -al /usr/share/datadog/agent/dogstream/nginx.py
-rw-r--r-- 1 dd-agent root 2313 Oct 22 14:02 /usr/share/datadog/agent/dogstream/nginx.py
```

Now we must edit NGINX's log format to be compatible with this parser, more information about this here:
```
$ grep 'log_format' -A 3 /etc/nginx/nginx.conf
    log_format time_log '$time_local "$request" S=$status $bytes_sent T=$request_time R=$http_x_forwarded_for';
    access_log /var/log/nginx/access.log time_log ;
    error_log /var/log/nginx/error.log;
```
Then we restart the service, generate a request using curl and check the log file to make sure the log format has changed:
```
$ sudo service nginx restart
 * Restarting nginx nginx    [ OK ]
$ curl localhost > /dev/null
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   612  100   612    0     0  57357      0 --:--:-- --:--:-- --:--:-- 61200
$ cat /var/log/nginx/access.log
127.0.0.1 - - [22/Oct/2015:13:50:23 +0000] "GET / HTTP/1.1" 200 612 "-" "curl/7.35.0"
22/Oct/2015:13:54:43 +0000 "GET / HTTP/1.1" S=200 858 T=0.000 R=-
```

The dd-agent user may be unable to read the log file. You need to add the dd-agent user to the adm group:
```
$ sudo usermod -a -G adm dd-agent
```
You can check that the dd-agent user has access now.
```
$ ls -al /var/log/nginx/access.log
 -rw-r--r-- 1 root root 1044 Oct 22 15:24 /var/log/nginx/access.log
$ sudo -u dd-agent wc -l /var/log/nginx/access.log
 2 /var/log/nginx/access.log
```
We can now configure the agent to use the parser's parse function on the `access.log` file:

```
$ grep '^dogstream' /etc/dd-agent/datadog.conf
dogstreams: /var/log/nginx/access.log:/usr/share/datadog/agent/dogstream/nginx.py:parse
```

Let's restart the agent and check the /var/log/datadog/collector.log file to make sure that the log file is beeing read:
```
$ cat /var/log/datadog/collector.log
[...]
2015-10-22 15:34:15 UTC | INFO | dd.collector | collector(agent.py:174) | Exiting. Bye bye.
2015-10-22 15:34:17 UTC | INFO | dd.collector | utils.pidfile(pidfile.py:31) | Pid file is: /opt/datadog-agent/run/dd-agent.pid
2015-10-22 15:34:17 UTC | INFO | dd.collector | collector(agent.py:256) | Agent version 5.5.1
[...]
2015-10-22 15:34:17 UTC | INFO | dd.collector | checks.collector(datadog.py:144) | Instantiating function-based dogstream
2015-10-22 15:34:17 UTC | INFO | dd.collector | checks.collector(datadog.py:151) | dogstream: parsing /var/log/nginx/access.log with <function parse at 0x7fbef0250488> (requested /usr/share/datadog/agent/dogstream/nginx.py:parse)
2015-10-22 15:34:17 UTC | INFO | dd.collector | checks.collector(datadog.py:48) | Dogstream parsers: [<checks.datadog.Dogstream object at 0x7fbef0237d10>]
```
Everything looks good, so let's generate some HTTP requests using the curl command seen above.

## Visualizing metrics

As you can see from the code, the parser will generate a nginx.net.avg_response gauge metric for each request. Let's make sure that the metric was received by Datadog, by browsing the [Metric Summary](https://app.datadoghq.com/metric/summary) page:
{{< img src="agent/faq/metric_summary_page_nginx.png" alt="Metric summary Page" responsive="true" popup="true">}}

We can now plot the metric in Metric Explorer:
{{< img src="agent/faq/plot_nginx_metric.png" alt="Plot Nginx metric" responsive="true" popup="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}