Use this processor with Vector Remap Language (VRL) to modify and enrich your logs. VRL is an expression-oriented, domain specific language designed for transforming logs. It features a simple syntax and built-in functions for observability use cases. You can use custom functions in the following ways:

- Manipulate [arrays](#array), [strings](#string), and other data types.
- Encode and decode values using [Codec](#codec).
- [Encrypt](#encrypt) and [decrypt](#decrypt) values.
- [Coerce](#coerce) one datatype to another datatype (for example, from an integer to a string).
- [Convert syslog values](#convert) to read-able values.
- Enrich values by using [enrichment tables](#enrichment).
- [Manipulate IP values](#ip).
- [Parse](#parse) values with custom rules (for example, grok, regex, and so on) and out-of-the-box functions (for example, syslog, apache, VPC flow logs, and so on).
- Manipulate event [metadata](#event) and [paths](#path).

See [Custom functions][10191] for the full list of available functions.

To set up this processor:

Click **Manage custom processors**.

- If you have already added custom functions, click on a function in the list to edit or delete it. You can use the search bar to find a function by its name. Click **Add Custom Processor** to [add a function](#add-a-function).
- If you have not created any functions yet, follow the instructions in [Add a function](#add-a-function) to create a function.

##### Add a function

1. Enter a name for the function.
1. Add your script to modify your logs using [custom functions][10191].
1. Optionally, check **Drop events on error** if you want to drop events that encounter an error during processing.
1. Enter a sample log event.
1. Click **Run** to process the log and see the output.
1. Click **Save**.

[10191]: /observability_pipelines/processors/custom_processor#custom-functions