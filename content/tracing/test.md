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
{{% /tab %}}
{{% tab "JavaScript" %}}

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

