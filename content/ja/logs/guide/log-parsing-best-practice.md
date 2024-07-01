---
title: Log Parsing - Best Practices
kind: guide
aliases:
  - /logs/faq/log-parsing-best-practice
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Learn how to process your logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: Learn more about parsing
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: How to investigate a log parsing issue?
---

Datadog lets you define parsers to extract all relevant information from your logs. More information about the parsing language and possibilities is available in [our documentation][1].

This article walks through parsing a log from the Datadog Agent's collector log:

```text
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
```

1. **Always add the sample log you are working on as a comment in your rule**:
    {{< img src="logs/faq/parsing_best_practice_1.png" alt="parsing_best_practice_1" >}}
    It is possible to test your parsing rule on a sample log. As it is helpful when you first write the rule, it might be important when coming back to the parser to investigate an issue or support a new log format.

2. **Parse one attribute at a time thanks to the star trick**:
    You do not need to write a parsing rule for the full log on the first draft. Check your rule one attribute at a time using a `.*` at the end of the rule. This matches anything that would follow the end of your rule.
    For example here, say that you first want to parse the log date, no matter what is next. Create the rule:
    {{< img src="logs/faq/parsing_best_practice_2.png" alt="parsing_best_practice_2" >}}
    So you know the date is correctly parsed. You can now move on to the next attribute, the severity.
    You first need to escape the pipe (special characters need to be escaped) and then match the word:
    {{< img src="logs/faq/parsing_best_practice_3.png" alt="parsing_best_practice_3" >}}
    And then you can keep on until you extract all the desired attributes from this log.

3. **Use the right matchers**:
    The simpler the better. There is often no need to try to define a complex regex to match a specific pattern when the classic `notSpace` can do the job.
    Keep in mind the following matchers when writing a parsing rule:

    * notSpace: matches everything until the next space
    * data: matches everything (equivalent to .*)
    * word: matches all coming alphanumeric characters
    * integer: matches a decimal integer number and parses it as an integer number

    Most of the rules can be written with those four matchers. You can see the full list of available matchers [in the parsing documentation][2].

4. **KeyValue**:
    Note that there is a key-value filter that can automatically extract all your attributes.
    Learn more about this with [some examples][3].

5. **How to skip some parts of your log message that should not be extracted as attributes**:
    Use the example again:
    ```
    2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
    ```
    Assume that the information from `dd.collector` is not of any value for you, and you do not want to extract it as an attribute.
    To do this, remove the extract section of the rule:
    {{< img src="logs/faq/parsing_best_practice_4.png" alt="parsing_best_practice_4" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/parsing
[2]: /logs/log_configuration/parsing/#matcher-and-filter
[3]: /logs/log_configuration/parsing/#key-value-or-logfmt
