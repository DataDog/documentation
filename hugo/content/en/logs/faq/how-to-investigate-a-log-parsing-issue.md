---
title: How to investigate a log parsing issue

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
    Because of the Pipeline filters, you can find the processing Pipeline that your log went through. Integration Pipeline takes the source as filter, so check that your log source is correctly set.

    {{< img src="logs/faq/integrationpipeline.png" alt="integrationpipeline" >}}

    For integration pipeline, clone them and troubleshoot on the clone.

2. **Spot obvious differences if any**:
    In most of the cases, you should have examples or log samples in your parsers. Compare your log with the sample to find simple differences such as a missing element, a different order or extra elements.
    Also check the timestamp format as this is often the culprit.

    You can illustrate this with an apache log. In your integration parser you have examples such as:
    ```
    127.0.0.1 - frank [13/Jul/2016:10:55:36 +0000] "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

    Say that your log is:
    ```
    [13/Jul/2016:10:55:36 +0000] 127.0.0.1 - frank "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

    The timestamp is not at the same place. Therefore, you need to change the parsing rule to reflect that difference.

3. **Find the culprit attribute**:
    There are no obvious differences in the format? Start the actual troubleshooting on the parsing rule. Here is a shortened format of an ELB log to illustrate a real case.

    The parsing rule is the following:
    ```
    elb.http %{date("yyyy-MM-dd'T'HH:mm:ss.SSSSSSZ"):date_access} %{notSpace:elb.name} "(?>%{word:http.method} |- )%{notSpace:http.url:nullIf("-")}(?> HTTP\/%{regex("\\d+\\.\\d+"):http.version}| - )" "%{notSpace:http.useragent:nullIf("-")}" %{notSpace:elb.ssl.cipher} %{notSpace:elb.ssl.protocol}
    ```

    It contains the following log:
    ```
    2015-05-13T23:39:43.945958Z my-loadbalancer "GET http://www.example.com:80/ HTTP/1.1" "Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0" - -
    ```

    From the provided sample, there are no obvious differences and the parser works fine for the sample:
    {{< img src="logs/faq/sampleparsing.png" alt="sampleparsing" >}}

    But when tested with the log, it is not working. The next step is to start to remove attributes one by one from the end until you find the culprit. To do so, add `.*` at the end of the rule and then remove the attributes.

   The image below illustrates the rule starting to work after you have removed everything up to the user Agent:
    {{< img src="logs/faq/Troubleshootparsing.png" alt="Troubleshootparsing" >}}

    This means that the issue is in the user Agent attribute.

4. **Fix the issue**:
    After identifying the culprit attribute, look at it more closely.

    The user Agent in the log is:

    * Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0.

    And the parsing rule is using:

    * `%{notSpace:http.useragent:nullIf("-")}`

    The first thing to check is the matcher (as a reminder, a matcher describes what element the rule expects such as integer, notSpace, regex, ...). Here, it expects `notSpace`. But the useragent contains spaces and even specific characters. Therefore `notSpace` is not going to work here.
    
    The matcher to use is: regex("[^\\\"]*")

    In other situation it might be the rule expecting an "integer" whereas the values are double so the matcher should be changed to "number".

5. **Ask for help**:
    Datadog is always here to help you! If you did not manage to find the cause of the parsing error, [contact the support team][4].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors
[2]: /logs/log_configuration/parsing
[3]: /logs/faq/log-parsing-best-practice/
[4]: /help/
