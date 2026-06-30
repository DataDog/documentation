---
title: Use Bean regexes to filter your JMX metrics and supply additional tags

aliases:
  - /integrations/faq/how-to-use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags
further_reading:
- link: "/integrations/java/"
  tag: "Documentation"
  text: "Java integration"
- link: "/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/"
  tag: "Documentation"
  text: "View JMX data in jConsole and set up your jmx.yaml to collect them"
---

Datadog supports regexes to match JMX Mbean names and domain names to configure your `include` and `exclude` filters. The regexes must conform to [Java's regular expression format][1]. Note that these filters were added in version 5.5.0.

Capture groups from the provided regex can be used to supply additional tag values for your metrics.

This article provides one example of how to use the `bean_regex` from the [Java integration][2], and how to reference such capture groups to set additional tags.

Suppose you have the following Mbean name: `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`. There is some information you could use as tags once the Agent has collected the metric. For instance, you could export a metric with the following tags:

* `env`: `dev`
* `region`: `eu-central-1`
* `method`: `GET`
* `status`: `200`

Bean regexes can be supplied as a single regex or a list of regex expressions. For the latter, only the first entry of the list that matches will be taken into account. See an example of a configuration file to export your custom metrics with some additional tags:

```yaml
init_config:
  is_jmx: true

instances:
  - host: "<JMX_ENDPOINT>"
    port: "<JMX_PORT>"

    conf:
      - include:
          domain: domain.example.com
          bean_regex:
            - "domain.example.com:name=my.metric.name.*(?:\\.env\\.)([a-z]+)(?:.*\\.region\\.)([a-z-]+[0-9])(?:.*\\.method\\.)([A-Z]+)(?:.*\\.status\\.)([0-9]+)(?:.*)"
          attribute:
            attribute1:
              metric_type: gauge
              alias: "my.jmx.metric"
          tags:
              env: $1
              region: $2
              method: $3
              status_code: $4
              optional: tag
```

Each capture group is stored in a Java Map. The first capture group starts at position `0`. After you have determined which capture group you want to export as a tag, you need to reference them in the `tags` section of your `include` or `exclude` filter, as well as to the number of the group (for example, the position inside the Map).

For the provided example in `bean_regex`, the capture groups are:

* `$0`: `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`
* `$1`: `dev`
* `$2`: `eu-central-1`
* `$3`: `GET`
* `$4`: `200`

Using the [Metrics Explorer][3], you are able to query your metrics and filter them by the tags you have just created.

## Bean name property ordering

JMX MBean names have the form `domain:key1=value1,key2=value2,...`. The JMX specification does not guarantee the order of key properties in the bean name string. By default, `bean_regex` matches against the string returned by `ObjectName.toString()`, which preserves registration order. The same MBean may therefore appear as `my.app:type=MyType,name=MyName,scope=MyScope` or `my.app:name=MyName,scope=MyScope,type=MyType` depending on the application.

To make `bean_regex` matching deterministic, set `use_canonical_bean_name` to `true`. The Agent then matches against the canonical form of the MBean name (`ObjectName.getCanonicalName()`), where key properties are sorted alphabetically. For new setups, setting `use_canonical_bean_name: true` is recommended. The default is `false` for backward compatibility.

The parameter can be set at three levels (highest precedence first):

1. **`include`/`exclude` filter** — applies only to that filter's `bean_regex` and `bean_name` matching. Useful for gradual migration when some filters depend on the old property order.
2. **Instance** — applies to all filters in the instance.
3. **`init_config`** — applies to all instances.

Example with canonical bean names globally (write your `bean_regex` so that key properties are in alphabetical order):

```yaml
init_config:
  is_jmx: true
  use_canonical_bean_name: true

instances:
  - host: "<JMX_ENDPOINT>"
    port: "<JMX_PORT>"

    conf:
      - include:
          domain: my.app
          bean_regex:
            - "my.app:name=(.*),scope=(.*),type=MyType"
          attribute:
            SomeAttribute:
              metric_type: gauge
              alias: "my.app.some_metric"
          tags:
              name: $1
              scope: $2
```

Example with per-filter override — useful when migrating incrementally:

```yaml
init_config:
  is_jmx: true

instances:
  - host: "<JMX_ENDPOINT>"
    port: "<JMX_PORT>"

    conf:
      # This filter uses canonical order
      - include:
          use_canonical_bean_name: true
          bean_regex:
            - "my.app:name=(.*),scope=(.*),type=MyType"
          attribute:
            SomeAttribute:
              metric_type: gauge
              alias: "my.app.some_metric"
          tags:
              name: $1
              scope: $2
      # This filter keeps the old toString() order
      - include:
          bean_regex:
            - "my.app:type=Legacy,name=(.*)"
          attribute:
            LegacyAttribute:
              metric_type: gauge
              alias: "my.app.legacy_metric"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[2]: /integrations/java/
[3]: /metrics/explorer/
