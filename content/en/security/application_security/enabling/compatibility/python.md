---
title: Python Compatibility Requirements 
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 50
---
## ASM capabilities support

The following ASM capabilities are supported in the Python library, for the specified tracer version:

| ASM capability                   | Minimum Python tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.9.0   |
| Threat Protection | 1.10.0  |
| Vulnerability Management for Open Source Software (OSS) | 1.5.0  |
| Vulnerability Management for Code-level (beta)  |  private beta  |

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version. 

### Supported deployment types
|Type | Threat Detection support | Vulnerability Management for OSS support |
| ---           |   ---             |           ----            |
| Docker        | {{< X >}}         | {{< X >}}                 |
| Kubernetes    | {{< X >}}         | {{< X >}}                 | 
| AWS ECS       | {{< X >}}         | {{< X >}}                 |
| AWS Fargate   | {{< X >}}         | {{< X >}}                 |
| AWS Lambda    | {{< X >}}         |                           |   


## Language and framework compatibility

### Supported Python versions

The Python ASM Client library follows a [versioning policy][3] that specifies the support level for the different versions of the library and Python runtime.

Two release branches are supported:

| Release    | Support level        |
|------------|----------------------|
| `<1`       | Maintenance           |
| `>=1.0,<2` | General Availability |

And the library supports the following runtimes:

| OS      | CPU                   | Runtime | Runtime version | Support ddtrace versions |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64, i686, AArch64 | CPython | 2.7, 3.5-3.11   | `<2`                     |
| MacOS   | Intel, Apple Silicon  | CPython | 2.7, 3.5-3.11   | `<2`                     |
| Windows | 64bit, 32bit          | CPython | 2.7, 3.5-3.11   | `<2`                     |


### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### ASM Capability Notes
- **Vulnerability Management for OSS** is supported on all frameworks

### Supported frameworks


| Framework                | Versions    | Threat Detection supported? | Threat Protection supported? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | 
| Django    | 1.8   |  {{< X >}} | {{< X >}}  |
| Flask     | 0.10  |  {{< X >}} | {{< X >}}  |

Support for query strings is not available for Flask.

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility


**Datastore tracing provides:**

- timing request to response
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### ASM Capability Notes
- **Vulnerability Management for OSS** is supported on all frameworks.
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.
- 
The Python library supports the [database API specifications][4] and supports all generic SQL databases. This includes databases such as SQLite, Mysql, Postgres and MariaDB.

[1]: /tracing/trace_collection/compatibility/python/
[2]: /agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/




