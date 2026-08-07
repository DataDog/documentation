Datadog associates code and library scan results with Datadog services and teams to automatically route findings to the appropriate owners. This enables service-level visibility, ownership-based workflows, and faster remediation.

To determine the service where a vulnerability belongs, Datadog evaluates several mapping mechanisms in the order listed in this section. 

Each vulnerability is mapped with one method only: if a mapping mechanism succeeds for a particular finding, Datadog does not attempt the remaining mechanisms for that finding.

<div class="alert alert-danger">
Using service definitions that include code locations in the Software Catalog is the only way to explicitly control how static findings are mapped to services. The additional mechanisms described below, such as Error Tracking usage patterns and naming-based inference, are not user-configurable and depend on existing data from other Datadog products. Consequently, these mechanisms might not provide consistent mappings for organizations not using these products.
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
Services defined with a Software Catalog schema v2.x do not support codeLocations. Existing definitions can be upgraded to the v3 schema in the Software Catalog. After migration is completed, changes might take up to 24 hours to apply to findings. If you are unable to upgrade to v3, Datadog falls back to alternative linking techniques (described below). These rely on less precise heuristics, so accuracy might vary depending on the Code Security product and your use of other Datadog features.
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

If a library was declared in `github.com/org/myrepo` at `/go.mod`, then Datadog would not match it to `billing-service`. 

Instead, if it was declared in `github.com/org/billing-service` at `/go.mod`, then Datadog would match it to `billing-service` due to the `“**”` catch-all glob. Consequently, Datadog would link the finding to the `billing-team`.

<div class="alert alert-info">
Datadog attempts to map a single finding to as many services as possible. If no matches are found, Datadog continues onto the next linking method.
</div>

### When the Software Catalog cannot determine the service

If the Software Catalog does not provide a match, either because the finding's file path does not match any `codeLocations`, or because the service uses the v2.x schema, Datadog evaluates whether Error Tracking can identify the service associated with the code. Datadog uses only the last 30 days of Error Tracking data due to product [data-retention limits][103].

When Error Tracking processes stack traces, the traces often include file paths.
For example, if an error occurs in: `/foo/bar/baz.py`, Datadog inspects the directory: `/foo/bar`. Datadog then checks whether the finding's file path resides under that directory.

**If the finding file is under the same directory:**

  - Datadog treats this as a strong indication that the vulnerability belongs to the same service.
  - The finding inherits the *service* and *team* associated with that error in Error Tracking.

If this mapping succeeds, Datadog stops here.

### Service inference from file paths or repository names

When neither of the above strategies can determine the service, Datadog inspects naming patterns in the repository and file paths.

Datadog evaluates whether:

  - The file path contains identifiers matching a known service.
  - The repository name corresponds to a service name.

When using the finding's file path, Datadog performs a reverse search on each path segment until it finds a matching service or exhausts all options. 

For example, if a finding occurs in `github.com/org/checkout-service` at `/foo/bar/baz/main.go`, Datadog takes the last path segment, `main`, and sees if any Software Catalog service uses that name. If there is a match, the finding is attributed to that service. If not, the process continues with `baz`, then `bar`, and so on.

When all options have been tried, Datadog checks whether the repository name, `checkout-service`, matches a Software Catalog service name. If no match is found, Datadog is unsuccessful at linking your finding using Software Catalog.

This mechanism ensures that findings receive meaningful service attribution when no explicit metadata exists.

### Link findings to teams through Code Owners

If Datadog is able to link your finding to a service using the above strategies, then the team that owns that service (if defined) is associated with that finding automatically. 

Regardless of whether Datadog successfully links a finding to a service (and a Datadog team), Datadog uses the `CODEOWNERS` information from your finding's repository to link Datadog and GitHub teams to your findings.

<div class="alert alert-info">
You must accurately map your Git provider teams to your <a href="https://docs.datadoghq.com/account_management/teams/">Datadog Teams</a> for team attribution to function properly.
</div>

