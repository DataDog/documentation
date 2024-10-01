---
title: Test Page (Delete Before Merging)
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=APM"
    tag: "Release Notes"
    text: "Check out the latest Datadog APM releases! (App login required)"
  - link: "https://www.datadoghq.com/blog/span-based-metrics/"
    tag: "Blog"
    text: "Test"
---
**Custom tooltip shortcode**

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}}.

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}}.

**Glossary shortcode (no short_definition)**

By default, the {{< tooltip glossary="agent" >}} is installed in a sandbox located at `/opt/datadog-agent`.

Test end of sentence {{< tooltip glossary="agent" >}}.

Test {{< tooltip glossary="alert graph" >}}.

*Testing cases*:

{{< tooltip glossary="alert graph" >}} at the beginning. (original)

{{< tooltip glossary="alert graph" case="title">}} at the beginning. (title)

{{< tooltip glossary="alert graph" case="lower">}} at the beginning. (lower)

{{< tooltip glossary="alert graph" case="upper">}} at the beginning. (upper)

{{< tooltip glossary="alert graph" case="sentence">}} at the beginning. (sentence)

**Glossary shortcode (short)**

Testing {{< tooltip glossary="trace root span" >}} in the middle.

Define the retention query by adding any span tag. Choose to retain all spans with the defined tags, only service entry spans (selected by default), or only a {{< tooltip glossary="Trace root span" >}}.

*Testing cases*:

{{< tooltip glossary="trace root span" >}} at the beginning. (original)

{{< tooltip glossary="trace root span" case="title">}} at the beginning. (title)

{{< tooltip glossary="trace root span" case="lower">}} at the beginning. (lower)

{{< tooltip glossary="trace root span" case="upper">}} at the beginning. (upper)

{{< tooltip glossary="trace root span" case="sentence">}} at the beginning. (sentence)

*Testing cases*:

{{< tooltip glossary="apm" >}} at the beginning. (original)

{{< tooltip glossary="apm" case="title">}} at the beginning. (title)

{{< tooltip glossary="apm" case="lower">}} at the beginning. (lower)

{{< tooltip glossary="apm" case="upper">}} at the beginning. (upper)

{{< tooltip glossary="apm" case="sentence">}} at the beginning. (sentence)

**Glossary shortcode (not found)**

Testing {{< tooltip glossary="quantumfizzle" >}} in the middle.

To the flux capacitor, add 10 mL of {{< tooltip glossary="quantumfizzle" >}}.

**Formatting**

`Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.`

*Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.*

**Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.**

|      | Required    | {{< tooltip text="Description" tooltip="More info here" >}} |
| ---  | ----------- | ----------- |
| Test | {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} | Test |

{{< collapse-content title="Tooltip HTML" level="h4" >}}
Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.
{{< /collapse-content  >}}

{{% collapse-content title="Tooltip Markdown" level="h4" %}}
Here's an example of a {{% tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" %}} in action.
{{% /collapse-content  %}}

{{< tabs >}}
{{< tab "Test Tooltip HTML" >}}

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.

Other **markdown**.

{{< /tab >}}

{{% tab "Test Tooltip Markdown" %}}

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.

Other **markdown**.

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}