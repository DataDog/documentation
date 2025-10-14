---
title: Python App and API Protection Compatibility
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
  - link: "/security/application_security/how-it-works/"
    tag: "Documentation"
    text: "How App and API Protection Works"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

## App and API Protection capabilities support

The following App and API Protection capabilities are supported in the Python library, for the specified tracer version:

{{< partial name="app_and_api_protection/python/capabilities.html" >}}

<div class="alert alert-danger">Datadog strongly encourages you to always use the last stable release of the tracer.</div>

<div class="alert alert-info">Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.</div>

### Supported deployment types

| Type        | Threat Detection support |
|-------------|--------------------------|
| Docker      | {{< X >}}                |
| Kubernetes  | {{< X >}}                |
| Amazon ECS  | {{< X >}}                |
| AWS Fargate | {{< X >}}                |
| AWS Lambda  | {{< X >}}                |


## Language and framework compatibility

### Supported Python versions

The Python App and API Protection Client library follows a [versioning policy][3] that specifies the support level for the different versions of the library and Python runtime.

Two release branches are supported:

{{< partial name="trace_collection/python/supported_versions.html" >}}

And the library supports the following runtimes:

{{< partial name="trace_collection/python/supported_runtimes.html" >}}

### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

### Supported frameworks

| Framework | Versions   | Threat Detection supported? | Threat Protection supported? |
|-----------|------------|-----------------------------|------------------------------|
| Django    | 2.2        | {{< X >}}                   | {{< X >}}                    |
| FastAPI   | 0.86       | {{< X >}}                   | {{< X >}}                    |
| Flask     | 1.1        | {{< X >}}                   | {{< X >}}                    |


<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility


**Datastore tracing provides:**

- timing request to response
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### App and API Protection Capability Notes

- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.
-
The Python library supports the [database API specifications][4] and supports all generic SQL databases. This includes databases such as SQLite, MySQL, PostgreSQL, and MariaDB.

### User Authentication Frameworks compatibility

**Integrations to User Authentication Frameworks provide:**

- User login events, including the user IDs
- Account Takeover detection monitoring for user login events

| Framework        | Framework Versions     |
|------------------|------------------------|
| Django           | 1.11, 2.2, 3.2, >= 4.0 |

[1]: /tracing/trace_collection/compatibility/python/
[2]: /agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/
