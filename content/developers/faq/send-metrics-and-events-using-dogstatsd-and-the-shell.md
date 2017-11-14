---
title: Send metrics and events using dogstatsd and the shell
kind: faq
customnav: developersnav
---

[Dogstatsd](/developers/dogstatsd) is Datadog's extension to the [statsd](https://github.com/etsy/statsd) protocol written by Etsy. It's a very efficient way for your applications to send metrics and events to Datadog, via an agent acting as a proxy on the network.

Even though Datadog and the Community provide many [libraries](/developers/libraries) that implement Dogstatsd, you might want to leverage tools that are native to your operating system. Fortunately you can use Bash and Powershell to do the job!

For Linux and other Unix-like OS, we'll just need Bash. For Windows we'll need Powershell and [powershell-statsd](https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1), a simple Powershell function that will take care of the network bits for us.

The idea behind Dogstatsd is simple: create a message that will contain information about your metric/event, and send it to a collector over UDP on port 8125. The message format can be found [here](/developers/dogstatsd/#datagram-format).

## Sending metrics

The format for sending metrics is metric.name:value|type|@sample_rate|#tag1:value,tag2, so let's go ahead and send datapoints for a gauge metric called custom_metric with the shell tag. We'll use a locally installed agent as a collector, so the destination IP address is 127.0.0.1.

On Linux:

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

or

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

On Windows:
```
PS C:\vagrant> .\send-statsd.ps1 "custom_metric:123|g|#shell"
PS C:\vagrant>
```

On any platform with Python (on Windows, the agent's embedded Python interpreter can be used, which is located at `C:\Program Files\Datadog\Datadog Agent\embedded\python.exe`):

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

## Sending events

The format for sending events is:
```
_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2. 
```
Here we need to calculate the size of the event's title and body.

On Linux:
```
vagrant@vagrant-ubuntu-14-04:~$ title="Event from the shell"
vagrant@vagrant-ubuntu-14-04:~$ text="This was sent from Bash!"
vagrant@vagrant-ubuntu-14-04:~$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```
On Windows:

```
PS C:\vagrant> $title = "Event from the shell"
PS C:\vagrant> $text = "This was sent from Powershell!"
PS C:\vagrant> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,powershell"
```