Use this processor with Vector Remap Language (VRL) to modify and enrich your logs. VRL is an expression-oriented, domain specific language designed for transforming logs. It features a simple syntax and built-in functions for observability use cases. You can use custom functions in the following ways:

- Manipulate [arrays](#array), [strings](#string), and other data types.
- Encode and decode values using [Codec](#codec).
- [Encrypt](#encrypt) and [decrypt](#decrypt) values.
- [Coerce](#coerce) one datatype to another datatype (for example, from an integer to a string).
- [Convert syslog values](#convert) to read-able values.
- Enrich values by using [enrichment tables](#enrichment).
- [Manipulate IP values](#ip).
- [Parse](#parse) values with custom rules (for example, grok, regex, and so on) and out-of-the-box functions (for example, syslog, apache, VPC flow logs, and so on). See [Parsing][10194] for information about regex log parsing.
- Manipulate event [metadata](#event) and [paths](#path).

See [Custom functions][10191] for the full list of available functions.

See [Remap Reserved Attributes][10193] on how to use the Custom Processor to manually and dynamically remap attributes.

To set up this processor:

- If you have not created any functions yet, click **Add custom processor** and follow the instructions in [Add a function](#add-a-function) to create a function.
- If you have already added custom functions, click **Manage custom processors**. Click on a function in the list to edit or delete it. You can use the search bar to find a function by its name. Click **Add Custom Processor** to [add a function](#add-a-function).

##### Add a function

1. Enter a name for your custom processor.
1. Add your script to modify your logs using [custom functions][10191]. You can also click **Autofill with Example** and select one of the common use cases to get started. Click the copy icon for the example script and paste it into your script. See [Get Started with the Custom Processor][10192] for more information.
1. Optionally, check **Drop events on error** if you want to drop events that encounter an error during processing.
1. Enter a sample log event.
1. Click **Run** to preview how the functions process the log. After the script has run, you can see the output for the log.
1. Click **Save**.

[10191]: /observability_pipelines/processors/custom_processor#custom-functions
[10192]: /observability_pipelines/guide/get_started_with_the_custom_processor
[10193]: /observability_pipelines/guide/remap_reserved_attributes
[10194]: /logs/guide/regex_log_parsing/