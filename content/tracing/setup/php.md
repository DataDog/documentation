---
title: Tracing PHP Applications
kind: Documentation
further_reading:
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

PHP APM is currently in **alpha**** and not officially supported by Datadog. The officially supported PHP Beta will launch as early as September 2018.  To be notified of the beta launch, [submit this form][1].

The unstable alpha tracer can be [accessed today on Github][2].
**We do not recommend running the alpha tracer in production.**

## Automatic Instrumentation

APM PHP support is currently in alpha and does not yet provide any automatic instrumentation.  Beta support is planned for September 2018 and will provide automatic instrumentation for popular frameworks and libraries.  See some of these listed below.  
Don’t see your desired frameworks or libraries? Please let us know more about your needs through [this survey][1].

### Web Frameworks

| Module         | Versions    | Support Type    |
| :-----------   | :---------- | :-------------- |
| Laravel        |             | Coming soon     |
| Symfony        |             | Coming soon     |
| Zend Framework |             | Coming soon     |

Don’t see your desired web frameworks? Please let us know more about your needs through [this survey][1].

### Data Stores

| Module     | Versions    | Support Type |
| :----------| :---------- | :----------- |
| MYSQL      |             | Coming Soon  |
| Redis      |             | Coming Soon  |
| MongoDB    |             | Coming Soon  |
| Postgres   |             | Coming Soon  |

Don’t see your desired data stores? Please let us know more about your needs through [this survey][1].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://goo.gl/forms/rKjH2J6nJ585KXri2
[2]: https://github.com/DataDog/dd-trace-php