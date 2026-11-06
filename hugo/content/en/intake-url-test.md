---
title: Intake URL Shortcode Test
app_id: render
---

Test page for the `integration-intake-url` shortcode (PR 41316). Do not commit.

Change the site selector at the top of the page. Every logs URL below should update. Then click each copy button and paste the result somewhere to check it.

## Logs intake

### 1. Default (no parameters)

Expected: the logs URL with no `ddsource` query string.

{{< integration-intake-url >}}

### 2. With a source

Expected: the logs URL ending in `?ddsource=render`.

{{< integration-intake-url source="render" >}}

### 3. Explicit `intake="logs"`

Expected: same as test 2.

{{< integration-intake-url intake="logs" source="render" >}}

### 4. Source with characters that need URL encoding

Expected: the value appears as written, not encoded. Check what the copied text contains.

{{< integration-intake-url source="my source&x=1" >}}

## Events intake

### 5. Default (uses `app_id` and page title from frontmatter)

Expected: a sentence linking to `https://app.datadoghq.com/integrations/render`, with "Intake URL Shortcode Test" as the link text.

{{< integration-intake-url intake="events" >}}

### 6. Override `id` and `title`

Expected: a sentence linking to `https://app.datadoghq.com/integrations/argocd`, with "Argo CD" as the link text.

{{< integration-intake-url intake="events" id="argocd" title="Argo CD" >}}

## Layout in context

### 7. Inside a numbered list (the Render Logs pattern)

Expected: the shortcode is a `<div>`, so check how it sits inside a list item.

1. In Render, open the log stream settings.
1. In the **Endpoint** field, paste the Datadog intake URL:
   {{< integration-intake-url source="render" >}}
1. In the **Token** field:
   {{< integration-api-key-picker type="api-key" >}}
1. Save the log stream.

### 8. Inline in a sentence

Expected: probably breaks onto its own line, because the wrapper is a `<div>`.

Send logs to {{< integration-intake-url source="render" >}} with your API key.

### 9. Existing key picker, both modes, for comparison

{{< integration-api-key-picker >}}

{{< integration-api-key-picker type="api-key" >}}

## Not included

An invalid value, such as `intake="metrics"`, fails the whole build on purpose. To check the error message, add `{{</* integration-intake-url intake="metrics" */>}}` without the `/*` and `*/` markers, and watch the Hugo server output.


