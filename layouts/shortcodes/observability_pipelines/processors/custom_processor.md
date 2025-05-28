Use this processor with Vector Remap Language (VRL) to modify and enrich your logs. VRL is an expression-oriented, domain specific language designed for transforming logs. It features a simple syntax and built-in functions for observability use cases. You can use VRL in the following ways:

- Manipulate [arrays](#array), [strings](#string), and other data types.
- Encode and decode values using [Codec](#codec).
- [Encrypt](#encrypt) and [decrypt](#decrypt) values.
- [Coerce](#coerce) one datatype to another datatype (for example, from an integer to a string).
- [Convert syslog values](#convert) to read-able values.
- Enrich values by using [enrichment tables](#enrichment).
- [Manipulate IP values](#ip).
- [Parse](#parse) values with custom rules (for example, grok, regex, and so on) and out-of-the-box functions (for example, syslog, apache, VPC flow logs, and so on).
- Manipulate event [metadata](#event) and [paths](#path).

See [VRL functions][10191] for the full list of available functions.

[10191]: /observability_pipelines/processors/custom_processor#vrl-functions