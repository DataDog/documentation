---
title: Code Analysis Frequently Asked Questions
description: What are the frequently asked questions about Datadog Code Analysis
further_reading:
- link: "/code_analysis/"
  tag: "Documentation"
  text: "Learn about Code Analysis"
- link: "/code_analysis/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "/code_analysis/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
---

## Common questions

### What are Datadog-hosted scans?

With Datadog-hosted scans, your code is scanned within Datadog's infrastructure as opposed to within your CI pipeline.
Datadog clones your code, runs the static analyzer to perform Static Analysis and/or Software Composition Analysis, and uploads the results for you.


The benefit of Datadog-hosted scans is that no configuration is needed in your CI pipeline(s) to use Code Analysis.


### How are services associated with code violations and libraries?

Datadog aims to associate code violations or libraries with the relevant service by using the following mechanisms:

1. Identifying the code location associated with a service using the Service Catalog.
2. Detecting usage patterns of files within additional Datadog products.
3. Searching for the service name in the file path or repository.

If one method succeeds, no further matching attempts are made. Each mapping method is detailed below.

#### Identifying the code location in the Service Catalog

The schema version `v3` and later of the Service Catalog allows you
to add the mapping of your code location for your service. The `codeLocations`
section specifies the locations of the code with the repository that
contains the code and its associated `paths`.

The `paths` attribute is a list of [globs](https://en.wikipedia.org/wiki/Glob_(programming))
that should match paths in the repository.

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - /path/to/service/code/**
{{< /code-block >}}


#### Detecting file usage patterns

Datadog detects file usage in additional products such as Error Tracking and associate
files with the runtime service. For example, if a service called `foo` has
a log entry or a stack trace containing a file with a path `/modules/foo/bar.py`,
it associates files `/modules/foo/bar.py` to service `foo`.

#### Detecting service name in paths and repository names

Datadog detects service name in paths and repository names and associates
the file with the service if it finds a match.

For a repository match, if there is a service called `myservice` and
the repository URL is `https://github.com/myorganization/myservice.git`, then,
it associates `myservice` to all files in the repository.

If no repository match is found, Datadog attempts to find a match in the
`path` of the file. If there is a service `myservice` and the path is
`/path/to/myservice/foo.py`, it associates the file with `myservice` because
the name of the service is part of the path. If two services are present
in the path, the service name the closest to the filename is selected.


### How are teams associated with code violations and libraries?

When Datadog detects the service for your code violation or library, it automatically
associates the team attached to the service. For example, if the file `domains/ecommerce/apps/myservice/foo.py`
is associated with `myservice`, then the team `myservice` will be associated to any violation
detected in this file.

If no services or teams are found, Datadog uses the `CODEOWNERS` [file][8]
in your repository. The `CODEOWNERS` file determines which team owns a file in your Git provider. You need
to correctly define the mapping between your Git provider teams and your Datadog teams for this feature to work.

## Static Analysis

### Can results be imported into Datadog from other analyzers?

While the [Datadog Static Analyzer][4] is recommended, Datadog supports the ingestion of files that adhere to SARIF format.

Ingestion of SARIF files is verified for the following third-party tools:

 - [gitleaks][1]
 - [semgrep][2]
 - [eslint][3]

To ingest your SARIF file into Datadog:
1. Install the `datadog-ci` CLI (requires that Node.js is installed).
2. Ensure that your `DD_SITE`, `DD_API_KEY`, and `DD_APP_KEY` environment variables are set.
3. Invoke the tool to upload the file to Datadog.

Installing and invoking the tool can be done with the two following commands:

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SARIF file
datadog-ci sarif upload --service "your-app" --env "ci" /path/to/sarif-file.json
```

If you want to import using a tool that is not supported, contact your Customer Success Manager.

### Can custom rules be used?

Custom rule availability is planned for all beta customers at the end of Q3 2024.

### Do you always scan all the files at every push or commit?

By default, scans on non-default branches use *diff-aware*. With diff-aware scans, the analyzer only
scans the files that changed between the current branch and the default branch. Diff-aware scans
last seconds, while full-scans may take a few minutes (depending on the codebase).

You must be using Datadog's analyzer to enable diff-aware scans.

### What is Datadog's OWASP benchmark score for Static Analysis?

Datadog's static analyzer has been tested against the OWASP benchmark with a score of 44.
The analyzer is periodically checked against the benchmark and updated results are published to the [static analyzer documentation][5].

### Is the analyzer open source?

Datadog's static analyzer is available under an open source license and the code is [available on GitHub][4].

### Does the analyzer runs on Windows?

The Datadog Static Analyzer version 0.4.1 or higher is supported on Windows.

## Software Composition Analysis

### What SBOM format Datadog supports?

While the [Datadog SBOM generator][6] is recommended, Datadog supports the ingestion of any SBOM files.
Datadog only supports SBOM files with the Cyclone-DX 1.4 and Cyclone-DX 1.5 formats.

Ingestion of SBOM files is verified for the following third-party tools:

- [osv-scanner][6]
- [trivy][7]

To ingest your SBOM file into Datadog:
1. Install the `datadog-ci` CLI (requires that Node.js is installed).
2. Ensure that your `DD_SITE`, `DD_API_KEY` and `DD_APP_KEY` environment variables are set.
3. Invoke the tool to upload the file to Datadog.

Installing and invoking the tool can be done using these two commands:

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SBOM file
datadog-ci sbom upload --service "your-app" --env "ci" /path/to/sbom-file.json
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/gitleaks/gitleaks
[2]: https://github.com/semgrep/semgrep
[3]: https://github.com/eslint/eslint
[4]: https://github.com/DataDog/datadog-static-analyzer
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/owasp-benchmark.md
[6]: https://github.com/DataDog/osv-scanner
[7]: https://github.com/aquasecurity/trivy
[8]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
