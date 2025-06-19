# Datadog Documentation Overview

{{ with .Site.Title }}Welcome to {{ . }}!{{ end }}

This is a high-level overview of Datadog's documentation, designed for easy navigation and quick reference.

## Main Sections

{{ range where .Site.Sections "Section" "en" }}
{{ range .Sections }}

### [{{ .Title }}]({{ .RelPermalink | replaceRE "^/|/$" "" }}.md)

{{ with .Description }}{{ . }}{{ end }}

{{ $topPages := first 5 .Pages }}
{{ if $topPages }}
Key pages:
{{ range $topPages }}

-   [{{ .Title }}]({{ .RelPermalink | replaceRE "^/|/$" "" }}.md)
    {{ end }}
    {{ end }}

{{ end }}
{{ end }}

---

## How to Use This Documentation

1. Each section has its own markdown file with detailed documentation
2. Links are provided to related topics and subsections
3. All content is available in markdown format for easy reading and processing
4. Navigation follows the same structure as the web documentation

## Additional Resources

-   [API Documentation](en/api.md)
-   [Getting Started Guides](en/getting_started.md)
-   [Reference Documentation](en/reference.md)

---

Generated from Datadog's documentation source. For the most up-to-date web version, visit https://docs.datadoghq.com
