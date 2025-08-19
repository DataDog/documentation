---
title: Callouts
---

## Expected .md output

- Each callout is marked by `[BEGIN CALLOUT]` and `[END CALLOUT]`.
- Any attributes, such as the title or the URL, are included in the box contents:
    - The title is a heading at the top of the box.
    - The URL is included with verbiage at the bottom like "Visit this URL: <URL>".

## Example inputs

### Callout (preview / beta)

{{< callout url="https://www.datadoghq.com/">}}
  Datadog Apps are in Preview. Request access by using this form. Once approved, you can start getting creative and develop your App for you, your organization, or for publishing to the entire Datadog community alongside our other great Datadog Apps!
{{< /callout >}} 

### Learning center callout

{{< learning-center-callout header="Try Foundations in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/datadog-foundation">}}
  The Datadog Learning Center is full of hands-on courses to help you learn about this topic. Enroll today to learn more about Datadog Foundations.
{{< /learning-center-callout >}}