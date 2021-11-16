---
title: How to investigate a log parsing issue
kind: faq
further_reading:
- link: "/logs/faq/log-parsing-best-practice/"
  tag: "FAQ"
  text: "Log Parsing - Best Practice"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

Integration Pipelines support the default log format for a given technology. So if you have customized the log format or written a custom parser which is not working, your logs might not get properly parsed.
Here are some guidelines on how to find the root cause of the issue and correct the parser.

Before troubleshooting your parser, read the Datadog log [processors][1] and [parsing][2] documentation, and the [parsing best practice article][3].

1. **Identify your log's pipeline**:
    Thanks to the Pipeline filters, you can easily find the processing Pipeline your log went through. Integration Pipeline take the source as filter, so check that your log source is correctly set.

    {{< img src="logs/faq/integrationpipeline.png" alt="integrationpipeline"  >}}

    For integration pipeline, clone them and troubleshoot on the clone.

2. **Spot obvious differences if any**:
    In most of the cases, you should have examples or log samples in your parsers. Compare your log with the sample to find simple differences such as a missing element, a different order or extra elements.
    Also check the timestamp format as this is very often the culprit.

    Let's illustrate this with an apache log. In your integration parser you have examples such as:
    ```
    127.0.0.1 - frank [13/Jul/2016:10:55:36 +0000] "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

    Let's say that your log is:
    ```
    [13/Jul/2016:10:55:36 +0000] 127.0.0.1 - frank "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

    We can see that the timestamp is not at the same place. Therefore we need to change the parsing rule to reflect that difference.

3. **Find the culprit attribute**:
    There are no obvious differences in the format? Let's start the actual troubleshooting on the parsing rule. Let's use a shortened format of an ELB log to illustrate a real case.

    The parsing rule is the following:
    ```
    elb.http %{date("yyyy-MM-dd'T'HH:mm:ss.SSSSSSZ"):date_access} %{notSpace:elb.name} "(?>%{word:http.method} |- )%{notSpace:http.url:nullIf("-")}(?> HTTP\/%{regex("\\d+\\.\\d+"):http.version}| - )" "%{notSpace:http.useragent:nullIf("-")}" %{notSpace:elb.ssl.cipher} %{notSpace:elb.ssl.protocol}
    ```

    And we have the following log:
    ```
    2015-05-13T23:39:43.945958Z my-loadbalancer "GET http://www.example.com:80/ HTTP/1.1" "Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0" - -
    ```

    From the provided sample we can see that there are no obvious differences and that the parser works fine for the sample:
    {{< img src="logs/faq/sampleparsing.png" alt="sampleparsing"  >}}

    But when we test with our log, it is not working. So let's start to remove attribute one by one from the end until we find the culprit. To do so, we add `.*` at the end of the rule and then we remove the attributes.

    On the below image, we can see that the rule starts working once we have remove everything up to the user Agent:
    {{< img src="logs/faq/Troubleshootparsing.png" alt="Troubleshootparsing"  >}}

    This means that the issue is in the user Agent attribute.

4. **Fix the issue**:
    Now that the culprit attribute is identified, let's look at it more closely.

    The user Agent we have in our log is:

    * Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0.

    And our parsing rule is using:

    * `%{notSpace:http.useragent:nullIf("-")}`

    The first thing to check is the matcher (as a reminder a matcher describes what element the rule expects such as integer, notSpace, regex, ...). Here we have notSpace. But our useragent contains spaces and even specific characeters. Therefore notSpace is not going to work here.
    The matcher to use is: regex("[^\\\"]*")

    In other situation it might be the rule expecting an "integer" whereas the values are double so the matcher should be changed to "number".

5. **Ask for help**:
    We are always here to help you! If you did not manage to find the cause of the parsing error, [contact us][4].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors
[2]: /logs/log_configuration/parsing
[3]: /logs/faq/log-parsing-best-practice/
[4]: /help/
