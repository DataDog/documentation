---
title: Python Compatibility Requirements
code_lang: python
type: multi-code-lang
code_lang_weight: 50
---
## Application Security capabilities support

The following application security capabilities are supported in the Python library, for the specified tracer version:

| Application Security capability  | Minimum Python tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.9.0   |
| Threat Protection | 1.10.0  |
| Customize response to blocked requests | 1.19.0 |
| Software Composition Analysis (SCA) | 1.5.0  |
| Code Security         |  private beta  |
| Automatic user activity event tracking | 1.17.0 |
| API Security | 2.6.0 |

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.

### Supported deployment types
| Type        | Threat Detection support | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |


## Language and framework compatibility

### Supported Python versions

The Python Application Security Client library follows a [versioning policy][3] that specifies the support level for the different versions of the library and Python runtime.

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

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks

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

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks.
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.
-
The Python library supports the [database API specifications][4] and supports all generic SQL databases. This includes databases such as SQLite, Mysql, Postgres and MariaDB.

### User Authentication Frameworks compatibility

**Integrations to User Authentication Frameworks provide:**

- User login events, including the user IDs
- Account Takeover detection monitoring for user login events

| Framework         | Framework Versions   |
|-------------------| --------------------------- |
| Django            | 1.11, 2.2, 3.2, >= 4.0

[1]: /tracing/trace_collection/compatibility/python/
[2]: /agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/




