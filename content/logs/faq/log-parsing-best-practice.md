---
title: Log Parsing - Best Practice
kind: faq
disable_toc: true
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
---

Datadog lets you define parsers to extract all relevant information from your logs. More information about the parsing language and possibilities is available in [our documentation][1].

At first sight, it can seem complicated to write a parsing rule. But once you have mastered a few tips, it becomes much easier.
In this article, we walk through parsing a log from the Datadog Agent's collector log :

```
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
```

1. **Always add the sample log you are working on as a comment in your rule**:  
    {{< img src="logs/faq/parsing_best_practice_1.png" alt="parsing_best_practice_1" responsive="true" >}}
    It is possible to test your parsing rule on a sample log. As it is very helpful when you first write the rule, it might be very important in the future when coming back to the parser to investigate an issue or support a new log format.

2. **Parse one attribute at a time thanks to the star trick**:  
    We do not expect you to write a parsing rule for the full log on the first draft. To make sure you check your rule one attribute at a time use a `.*` at the end of the rule. This matches anything that would follow the end of your rule.
    For example here, we first want to parse the log date, no matter what is next so we create the rule:
    {{< img src="logs/faq/parsing_best_practice_2.png" alt="parsing_best_practice_2" responsive="true" >}}
    So we know the date is correctly parsed. We can now move on to the next attribute, the severity.
    We first need to escape the pipe (special characters need to be escaped) and then match the word:
    {{< img src="logs/faq/parsing_best_practice_3.png" alt="parsing_best_practice_3" responsive="true" >}}
    And then we can keep on until we extract all the desired attributes from this log.
    
3. **Use the right matchers**:  
    The simpler the better. There is often no need to try to define a complex regex to match a specific pattern when the classic notSpace can do the job.
    It is important to keep in mind the following matcher when doing a parsing rule:
    
    * notSpace: matches everything until the next space
    * data: matches everything (equivalent to .*)
    * word: matches all coming alphanumeric characters.
    * integer
    
    Most of the rules can be written with those 4 matchers. You can see here the full list of available matchers.

4. **KeyValue**:
    Never forget that there is a keyvalue filter than can automatically extract all your attributes.
    Learn more about this with [our examples][2]

5. **How to skip some part of your log message that should not be extracted as attribute**:  
    Let's use our example again:
    ```
    2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
    ```
    Let's say that the information dd.collector is not of any value for me and I do not want to extract it as an attribute.
    To do that we need to remove the extract section of the rule:
    {{< img src="logs/faq/parsing_best_practice_4.png" alt="parsing_best_practice_4" responsive="true" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/parsing
[2]: /logs/processing/parsing/#key-value
