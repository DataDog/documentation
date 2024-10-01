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

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}} in action.

Here's an example of a {{< tooltip text="tooltip" tooltip="This is additional information that appears in the tooltip" >}}.

**Glossary shortcode (no short)**

By default, the {{< tooltip glossary="agent" >}} is installed in a sandbox located at `/opt/datadog-agent`.

By default, the {{< tooltip glossary="agent" >}}.

Test space {{< tooltip glossary="apm" >}} space.

Test space {{< tooltip glossary="alert graph" >}} space.


**Glossary shortcode (short)**

Testing {{< tooltip glossary="trace root span" >}} in the middle.

{{< tooltip glossary="trace root span" case="sentence">}} is ...

Define the retention query by adding any span tag. Choose to retain all spans with the defined tags, only service entry spans (selected by default), or only a {{< tooltip glossary="Trace root span" >}}.

To the flux capacitor, add 10 mL of {{< tooltip glossary="quantumfizzle" >}}.

**Glossary shortcode (not found)**

Testing {{< tooltip glossary="quantumfizzle" >}} in the middle.
To the flux capacitor, add 10 mL of {{< tooltip glossary="quantumfizzle" >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}