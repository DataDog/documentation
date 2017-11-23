---
title: Can I send extra parameters to my custom parsing function?
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
- link: "/agent/tagging"
  tag: "Documentation"
  text: Learn more about Tagging
- link: "/logs"
  tag: "Documentation"
  text: Learn more about Loggin with Datadog
---

Yes you can send extra parameters to your parsing function.
If you haven’t already setup your custom parser to send metric or events to your platform, you can find the setup guide [here](/agent/logs).

Once you have done this, you should have something like this in your `datadog.conf`:

```
 dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser
```

And in your parsers_module.py a function defined as:  
```python

def custom_parser(logger, line)
```

You can now change the arity of your function to take extra parameter as shown [here](https://github.com/DataDog/dd-agent/blob/5.13.x/checks/datadog.py#L210)

So if you change your configuration file to:

```
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser:customvar1:customvar2
```

And your parsing function as:

```python

def custom_parser(logger, line, parser_state, *parser_args):
```

You will then have a tuple parameter in **parser_args** as (customvar1, customvar2) which is ready to use in your code by using parser_args[0] and parser_args[1].

**Note**: the parameter parser_state does not have to be used but it has to be in the signature of the function. And if you have only one parameter, you will have to use parser_args[1] to get it.

As an example, if we have the same parser as in the documentation but this time we do not want to extract the metric name from the log but to set it thanks to this parameter:

In my configuration file I would have: 

```
dogstreams: /Users/Documents/Parser/test.log:/Users/Documents/Parser/myparser.py:parse_web:logmetric
```

{{< partial name="whats-next/whats-next.html" >}}