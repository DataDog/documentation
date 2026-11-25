Datadog associates code and library scan results with Datadog services and teams to automatically route findings to the appropriate owners. This enables service-level visibility, ownership-based workflows, and faster remediation. For Static Code Analysis, Software Composition Analysis, Secret Scanning, and IaC Security findings, mapped services also provide [runtime context](/security/code_security/runtime_context/).

To determine the services that a finding belongs to, Datadog combines the results of several mapping sources. Each source can map a finding to one or more services, and Datadog keeps every valid mapping instead of selecting a single source or service:

- **Software Catalog code locations (recommended)**: The `codeLocations` field in your service definitions. See [Mapping using the Software Catalog](#mapping-using-the-software-catalog-recommended).
- **Runtime data from your services**: The directories that your services load code from, which the Datadog tracer reports when [Dynamic Instrumentation autocomplete and search](/dynamic_instrumentation/symdb/) is enabled. Available for Java, Python, and .NET services.
- **Repository analysis**: Datadog analyzes the repositories linked to your services to detect each service's entry points and dependencies. Datadog also reads deployment files that reference a service, such as Dockerfiles and YAML manifests.
- **Error Tracking**: File paths in the stack traces that Error Tracking collected from your services in the last 30 days. Files in the same directory as a file in a stack trace map to the service that reported the error.
- **Service inference from file paths or repository names**: Used only when none of the other sources returns a mapping. See [Service inference from file paths or repository names](#service-inference-from-file-paths-or-repository-names).

A mapping means that the finding's file is related to the service. It does not confirm that the file is part of the deployed version of the service. Mappings apply at the directory level, so files in the same directory map to the same services. For repositories that Datadog identifies as forks, Datadog uses only Software Catalog code locations.

<div class="alert alert-danger">
Using service definitions that include code locations in the Software Catalog is the only way to explicitly control how findings are mapped to services. Code locations add mappings; they do not remove mappings from the other sources. The other sources are not user-configurable and depend on data from other Datadog products, such as APM and Source Code Integration.
</div>

### Mapping using the Software Catalog (recommended)

Services in the Software Catalog identify their codebase content using the `codeLocations` field. This field is available in the **Software Catalog [schema version `v3`][101]** and allows a service to specify:

* a repository URL

```yaml
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
```

* one or more code paths inside that repository

```yaml
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
```

If you want all the files in a repository to be associated with a service, you can use the glob `**` as follows:

```yaml
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
    - repositoryURL: https://github.com/org/billing-service.git
      paths:
        - "**"
```

The schema for this field is described in the [Software Catalog entity model][102].

Datadog goes through all Software Catalog definitions and checks whether the finding's file path matches. For a finding to be mapped to a service through `codeLocations`, it must contain a file path. 

Some findings might not contain a file path. In those cases, Datadog cannot evaluate `codeLocations` for that finding, and this mechanism is skipped.

<div class="alert alert-danger">
Services defined with a Software Catalog schema v2.x do not support codeLocations. Existing definitions can be upgraded to the v3 schema in the Software Catalog. After migration is completed, changes might take up to 24 hours to apply to findings. If you are unable to upgrade to v3, Datadog maps findings with the other sources described in this section. These rely on less precise heuristics, so accuracy might vary depending on the Code Security product and your use of other Datadog features.
</div>

#### Example (v3 schema)

```yaml
apiVersion: v3
kind: service
metadata:
  name: billing-service
  owner: billing-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
    - repositoryURL: https://github.com/org/billing-service.git
      paths:
        - "**"
```

#### SAST finding

If a vulnerability appeared in `github.com/org/myrepo` at `/src/billing/models/payment.py`, then using the `codeLocations` for `billing-service` Datadog would add `billing-service` as an owning service. If your service defines an `owner` (see above), then Datadog links that team to the finding too. In this case, the finding would be linked to the `billing-team`.

#### SCA finding

If a library was declared in `github.com/org/myrepo` at `/go.mod`, then Datadog would not match it to `billing-service` through code locations.

Instead, if it was declared in `github.com/org/billing-service` at `/go.mod`, then Datadog would match it to `billing-service` due to the `“**”` catch-all glob. Consequently, Datadog would link the finding to the `billing-team`.

<div class="alert alert-info">
Datadog maps a finding to every service whose code locations match the finding's file path.
</div>

### Service inference from file paths or repository names

When none of the other mapping sources returns a service, Datadog inspects naming patterns in the repository and file paths.

Datadog evaluates whether:

  - The file path contains identifiers matching a known service.
  - The repository name corresponds to a service name.

When using the finding's file path, Datadog performs a reverse search on each path segment until it finds a matching service or exhausts all options. 

For example, if a finding occurs in `github.com/org/checkout-service` at `/foo/bar/baz/main.go`, Datadog takes the last path segment, `main`, and sees if any Software Catalog service uses that name. If there is a match, the finding is attributed to that service. If not, the process continues with `baz`, then `bar`, and so on.

When all options have been tried, Datadog checks whether the repository name, `checkout-service`, matches a Software Catalog service name. If no match is found, Datadog is unsuccessful at linking your finding using Software Catalog.

This mechanism helps findings receive a service attribution when no other mapping source applies.

### Link findings to teams through Code Owners

If Datadog links your finding to a service, then the team that owns that service (if defined) is associated with that finding automatically. 

Regardless of whether Datadog successfully links a finding to a service (and a Datadog team), Datadog uses the `CODEOWNERS` information from your finding's repository to link Datadog and GitHub teams to your findings.

<div class="alert alert-info">
You must accurately map your Git provider teams to your <a href="https://docs.datadoghq.com/account_management/teams/">Datadog Teams</a> for team attribution to function properly.
</div>

