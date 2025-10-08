---
title: Python Compatibility Requirements
code_lang: python
type: multi-code-lang
code_lang_weight: 50
---
## Code Security capabilities support

The following code security capabilities are supported in the Python library, for the specified tracer version:

| Code Security capability                    | Minimum Python tracer version |
| ------------------------------------------- |-------------------------------|
| Runtime Software Composition Analysis (SCA) | 1.5.0                         |
| Runtime Code Analysis (IAST)                | Preview (`>=2.21.0`)          |

### Supported deployment types
| Type        | Threat Detection support | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |

| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | {{< X >}}                                   | Preview                             |
| Kubernetes        | {{< X >}}                                   | Preview                             |
| Amazon ECS        | {{< X >}}                                   | Preview                             |
| AWS Fargate       | {{< X >}}                                   | Preview                             |
| AWS Lambda        |                                             |                                     |

## Language and framework compatibility

### Supported Python versions

The Python Application Security Client library follows a [versioning policy][3] that specifies the support level for the different versions of the library and Python runtime.

Two release branches are supported:

{{< partial name="trace_collection/python/supported_versions.html" >}}

And the library supports the following runtimes:

{{< partial name="trace_collection/python/supported_runtimes.html" >}}


### Web framework compatibility

- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Application Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### Supported frameworks

| Framework     | Versions    | Runtime Code Analysis (IAST) |
|---------------|-------------|------------------------------|
| Django        | `1.8`       | {{< X >}}                    |
| FastAPI       | `0.86`      | {{< X >}}                    |
| Flask         | `0.10`      | {{< X >}}                    |

Support for query strings is not available for Flask.

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

**Datastore tracing provides:**

- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.

The Python library supports the [database API specifications][4] and supports all generic SQL databases. This includes databases such as SQLite, Mysql, Postgres and MariaDB.

[1]: /tracing/trace_collection/compatibility/python/
[2]: /remote_configuration#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/




