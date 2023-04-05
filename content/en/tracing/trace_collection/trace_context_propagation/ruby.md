---
title: Propagating Ruby Trace Context
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

### B3 headers extraction and injection

Datadog APM tracer supports [B3 headers extraction][6] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently two styles are supported:

- Datadog: `Datadog`
- B3: `B3`

Injection styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

The value of the environment variable is a comma separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The value of the environment variable is a comma separated list of header styles that are enabled for extraction. By default Datadog and B3 extraction style are enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.


[6]: https://github.com/openzipkin/b3-propagation
