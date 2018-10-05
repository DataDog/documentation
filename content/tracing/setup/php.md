---
title: Tracing PHP Applications (Coming Soon)
kind: Documentation
further_reading:
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "https://goo.gl/forms/rKjH2J6nJ585KXri2"
  tag: "Survey"
  text: Request Beta Access
---

<div class="alert alert-warning">
The APM tracer for PHP applications is in alpha and not officially supported by Datadog. The officially supported beta will launch as early as October 2018. We do not recommend running the alpha tracer in production.
</div>

{{< whatsnext desc="To be notified of the beta launch, submit this form:">}}
    {{< nextlink href="https://goo.gl/forms/rKjH2J6nJ585KXri2" tag="Survey" >}}PHP Beta Access Survey{{< /nextlink >}}
{{< /whatsnext >}}

<br>

The unstable alpha tracer can be [accessed today on Github][2].

## Compatibility

PHP APM includes support for the following PHP versions:

| Version | Support type |
| -----   | ------------ |
| 5.6.x   | Alpha        |
| 7.0.x   | Alpha        |
| 7.1.x   | Alpha        |
| 7.2.x   | Alpha        |

### Integrations

APM PHP support is in alpha and provides limited automatic instrumentation. Planned beta support will provide automatic instrumentation for popular frameworks and libraries. See some of these listed below.
Don't see your desired frameworks or libraries? Let Datadog know more about your needs through [this survey][1].

#### Framework Compatibility

| Module         | Versions    | Support Type       |
| :-----------   | :---------- | :----------------- |
| Laravel        | 5.x         | Alpha              |
| Symfony        | 3.x         | Alpha              |
| Magento        | 2.x         | Coming Soon [beta] |
| Zend Framework | 3.x         | Coming Soon [beta] |
| CakePHP        | 3.x         | Coming Soon [beta] |
| Drupal         | 7.x         | Coming Soon [beta] |
| Wordpress      | 4.x         | Coming Soon [beta] |
| Slim           | 3.x         | Coming Soon [beta] |

Don't see your desired web frameworks? Let Datadog know more about your needs through [this survey][1].

[1]: https://goo.gl/forms/rKjH2J6nJ585KXri2

#### Library Compatibility

| Module        | Versions              | Support Type       |
| :------------ | :-------------------- | :----------------- |
| Memcached     | *(Any Supported PHP)* | Alpha              |
| Mysqli        | *(Any Supported PHP)* | Alpha              |
| PDO           | *(Any Supported PHP)* | Alpha              |
| Predis        | 1.1                   | Alpha              |
| pgsql         | *(Any Supported PHP)* | Coming Soon [beta] |
| MongoDB       | 1.x                   | Coming Soon [beta] |
| Doctrine      | 2.6                   | Coming Soon [beta] |

Don't see your desired libraries? Let Datadog know more about your needs through [this survey][1].

[1]: https://goo.gl/forms/rKjH2J6nJ585KXri2

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://goo.gl/forms/rKjH2J6nJ585KXri2
[2]: https://github.com/DataDog/dd-trace-php
