---
title: Testing code tabs
kind: Documentation
---

## varied content in code tab

Custom Tagging allows adding key-value pairs to specific spans. These key-value pairs (tags) are used to correlate traces with other Datadog products and to provide more details about specific spans.

{{< tabs >}}
{{% tab "Python" %}}

To begin tracing applications written in Python, first install and configure the Datadog Agent (see additional documentation for tracing Docker applications).

```python
pip install ddtrace
```

this is a list:

* item 1 
* item 2 
* item 3

This is a list within a list:

* item 1
    - subitem1
    - subitem2
* item 2
    - subitem1
    - subitem2

{{% /tab %}}
{{% tab "JavaScript" %}}

Datastore tracing provides:

* Timing request to response
* Query info (e.g. a sanitized query string)
* Error and stacktrace capturing

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

| Database       | Versions       |
| :------------- | :------------- |
| JDBC           | N/A            |
| MongoDB        | 3.0+           |
| Cassandra      | 3.2+           |
| Jedis          | 1.4+           |

`dd-java-agent` is also compatible with common JDBC drivers including:

*  Apache Derby
*  Firebird SQL
*  H2 Database Engine

Lorem ipsum dolor sit amet, in sit illum pericula, alterum detracto salutandi at nam. Cum debet veritus ne, mei ne solet alterum veritus. Enim laoreet ad mea. Pro te ferri ridens graeci. Eligendi antiopam no eam, virtute alienum laboramus nam no.

### example
Saperet quaestio duo in. Eam habemus commune accumsan ne. Cum platonem consetetur et, purto vide ut qui. Est at iriure alienum. Ad voluptaria interesset nec, eu nec sint prima menandri.

```javascript
console.log("hello tabs");
```

Oblique maluisset forensibus ad vel, vis mutat ipsum fabulas et. Aliquid omittam his ne, sit ut utamur liberavisse. Ius ea velit nominati perpetua, pro erat mollis aliquip id. Nec malis salutandi no, sed in omnis posse. Eirmod suscipit ad mea, oratio oporteat assentior per in. Ut iudico expetenda mea, quo tamquam instructior ea.

{{% /tab %}}
{{< /tabs >}}

Finally, import the tracer and instrument your code!

## just code in code tabs

{{< tabs >}}
{{% tab "Python" %}}
```python

from ddtrace import tracer

with tracer.trace("web.request", service="my_service") as span:
    span.set_tag("my_tag", "my_value")
```
{{% /tab %}}
{{% tab "JavaScript" %}}
```javascript
console.log("hello tabs");
```
{{% /tab %}}
{{< /tabs >}}


## problematic tabs

{{< tabs >}}
{{% tab "Other Frameworks" %}}

`dd-java-agent` includes support for automatically tracing the following other frameworks.

| Framework     | Versions | Support Type    | JVM Arg to enable                   |
| :------------ | :------- | :-------------- | :----------------                   |
| Hystrix       | 1.4+     | Fully Supported | N/A                                 |
| JSP Rendering | 2.3+     | Beta            | `-Ddd.integration.jsp.enabled=true` |

Don't see your desired framework? We're continually adding additional support, [check with our team][2] to see if we can help.

To improve visibility into applications using unsupported frameworks, consider:

* Adding custom instrumentation (with OpenTracing or the `@Trace` annotation).
* [Submitting a pull request][1] with instrumentation for inclusion in a future release.
* [Contact support][2] and submit a feature request.

[1]: https://github.com/DataDog/documentation#outside-contributors
[2]: /help

{{% /tab %}}
{{< /tabs >}}
