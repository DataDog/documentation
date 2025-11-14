---
title: Troubleshooting
disable_toc: false
aliases:
   - /code_analysis/troubleshooting/
---

If you experience issues setting up or configuring Datadog Code Security, use this page to start troubleshooting. If you continue to have trouble, [contact Datadog Support][1].

## Static Code Analysis (SAST)

For issues with the Datadog static analyzer, include the following information in a bug report to Datadog Support.

- Your `static-analysis.datadog.yml` file
- The output of your static analysis tool (such as a CLI) that is run locally or in a CI/CD pipeline
- The SARIF file produced (if there are any available)
- The URL of your repository (public or private)
- The name of the branch you ran the analysis on
- The exact command line used to run the Datadog Static Analyzer

### Performance issues

If you are experiencing performance issues, you can enable the `--performance-statistics` flag when running the static analysis tool from the command line.

For performance issues, include the following information:

- Your `static-analysis.datadog.yml` file
- The output of your static analysis tool (such as a CLI) that is run locally or in a CI/CD pipeline
- The URL of your repository (public or private)

**Note:** If you are using [Static Analysis and GitHub Actions][2], set the [`enable_performance_statistics`][3] parameter to true.

### Blocking issues

If you are experiencing issues unrelated to performance or if the Datadog Static Analyzer fails to exit, run the Datadog Static Analyzer with the `--debug true --performance-statistics` flag.

### Getting a 403 error when running the analyzer

Ensure that the following variables are correctly specified: `DD_APP_KEY`, `DD_API_KEY`, and `DD_SITE` when running the analyzer and `datadog-ci`.

### Issues with SARIF uploads

<div class="alert alert-info">
  SARIF importing has been tested for Snyk, CodeQL, Semgrep, Checkov, Gitleaks, and Sysdig. Please reach out to <a href="/help">Datadog Support</a> if you experience any issues with other SARIF-compliant tools.
</div>

When uploading results from third-party static analysis tools to Datadog, ensure that they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][5]. Node.js version 14 or later is required.

To upload a SARIF report, follow the steps below:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Optionally, set a [`DD_SITE` variable][7] (this default to `datadoghq.com`).
3. Install the `datadog-ci` utility:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Run the third-party static analysis tool on your code and output the results in the SARIF format.
5. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

If reports are missing in Datadog, please define the following environment variables before invoking datadog-ci:
- `DD_GIT_REPOSITORY_URL`: URL of the repository
- `DD_GIT_BRANCH`: branch being committed to
- `DD_GIT_COMMIT_SHA`: commit sha

### SARIF file too large

We are filtering SARIF files that are too large. If your code is not being scanned because your SARIF file
is too large, consider the following options:

 - Update your configuration to scan only specific directories.
 - Configure the analyzer to run only the rulesets necessary for your codebase.

Updating the configuration is done either in the Datadog application or using the `static-analysis.datadog.yml` file.

### `GLIBC_X.YY not found` error message

If you run the static analyzer in your CI pipeline and get an error message similar to the following line:

```
version `GLIBC_X.YY' not found
```

It means that you are either:

- running your CI pipeline with a Linux distribution that contains an old version of the glibc. In this case, Datadog recommends upgrading to the latest version. The analyzer always runs with the latest of Ubuntu/Debian based-systems.
- running your CI pipeline with a Linux distribution that does not rely on the glibc (such as Alpine Linux). Instead,
  run your CI pipeline with a distribution that supports the latest version of the glibc (such as the stable version of Ubuntu).

### Services or teams in the SAST explorer or Repositories view are not updating

Results for services and teams in Static Code Analysis (SAST) are based on the `entity.datadog.yml` or `CODEOWNERS` files from your repository's default branch.
If you've made changes to these files in a feature branch, those updates are not reflected in the vulnerability for that branch.

After updating either file on your default branch, it may take up to six hours for the changes to appear in subsequent scan results.

### Results are not being surfaced in the Datadog UI

**If you are running Code Security on a non-GitHub repository**, ensure that the first scan is ran on your default branch. If your default branch is not one of `master`, `main`, `default`, `stable`, `source`, `prod`, or `develop`, you must attempt a SARIF upload for your repository and then manually override the default branch in-app under [Repository Settings][4]. Afterwards, uploads from your non-default branches will succeed.

If you are using Datadog's analyzer, [diff-aware scanning][6] is enabled by default. If you running the tool within your CI pipeline, make sure that `datadog-ci` runs **at the root** of the repository being analyzed.

### Diff-aware is not working

If diff-aware is not working with the Static Analyzer, ensure that:
 1. The default branch is specific to your repository.
 2. At least one revision with the same configuration (for example, same rulesets, same arguments, or only/ignore flags) has been pushed to the repository's default branch.
 3. The current user can read the repository metadata. If they do not have the correct permissions, run this command: `git config --global --add safe.directory <repo-path>`.

You can also run datadog-static-analyzer with the `--debug` option to get more information.

**Note**: Diff-aware works only on feature branches. For more information, learn about the [implementation details of diff-aware][13].

## Software Composition Analysis

For issues with Datadog Software Composition Analysis (SCA), include the following information in a bug report to Datadog Support.

- The output of your SCA tool (such as CLI) that is run locally or in a CI/CD pipeline
- The SBOM file produced (if there are any available)
- The URL of your repository (public or private)
- The name of the branch you ran the analysis on
- The list of dependency files in your repository (such as `package-lock.json`, `requirements.txt`, or `pom.xml`)

### Issues with SBOM uploads
While the [Datadog SBOM generator][7] is recommended, Datadog supports the ingestion of any SBOM files. Please ensure your files adhere to either the Cyclone-DX 1.4 or Cyclone-DX 1.5 formats.

Ingestion of SBOM files is verified for the following third-party tools:
- [trivy][8]

To ingest your SBOM file into Datadog, follow the steps below:

1. Install the `datadog-ci` CLI (requires that Node.js is installed).
2. Ensure that your `DD_SITE`, `DD_API_KEY` and `DD_APP_KEY` environment variables are set.
3. Invoke the tool to upload the file to Datadog.
Installing and invoking the tool can be done using these two commands:
```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SBOM file
datadog-ci sbom upload /path/to/sbom-file.json
```

### Services or teams in SCA libraries are not updating

Results for services and teams in SCA are based on the `entity.datadog.yml` or `CODEOWNERS` files from your repository's default branch.
If you've made changes to these files in a feature branch, those updates are not reflected in the vulnerability or library data for that branch.

After updating either file on your default branch, it may take up to six hours for the changes to appear in subsequent scan results.

### Results are not being surfaced in the Datadog UI

**If you are running Code Security on a non-GitHub repository**, ensure that the first scan is ran on your default branch. If your default branch is not one of `master`, `main`, `default`, `stable`, `source`, `prod`, or `develop`, you must attempt an SBOM upload for your repository and then manually override the default branch in-app under [Repository Settings][4]. Afterwards, uploads from your non-default branches will succeed.

### No package detected for C# projects

The Datadog SBOM generator, ([`datadog-sbom-generator`][7]), extracts dependencies from a `packages.lock.json` file. If you do not have
this file, you can update your project definition to generate it. Follow these [instructions to update your project definition][9] to generate a `packages.lock.json` file.

The generated lock file is used by [`datadog-sbom-generator`][7] to extract dependencies and generate an SBOM.

### No results from Datadog-hosted scans

Datadog-hosted SCA scans do **not** support repositories that:

- Use [Git Large File Storage][18] (`git-lfs`)
- Contain invalid or reserved file paths (such as `/` or `\\`)
- Contain file paths with parent directory traversal (`..`)
- Contain file names longer than 255 characters

If any of these conditions apply to your repository, and you cannot update your repository to account for these constraints, [set up the analysis in a CI pipeline][19] to run SCA and upload results to Datadog.

### Missing libraries

To ensure data quality, Datadog applies validation rules during SBOM processing. Libraries that meet any of the following criteria are excluded:

- **Missing version**: The library does not specify a version.
- **Non-ASCII name**: The library name contains characters outside the ASCII character set.
- **Empty purl**: The package URL (purl) field is missing or blank.
- **Invalid purl**: The package URL is present but not in a valid purl format.
- **Unsupported language**: The library is associated with a programming language that Datadog does not support.

## No vulnerabilities detected by Software Composition Analysis

There are a series of steps that must run successfully for vulnerability information to appear either in the [Software Catalog][16] **Security** view or in the [Vulnerabilities explorer][12]. It is important to check each step when investigating this issue.

### Confirming runtime detection is enabled

If you have enabled Runtime Software Composition Analysis (SCA) on your services, you can use the metric `datadog.appsec.risk_management.sca.host_instance` to check if it is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.appsec.risk_management.sca.host_instance`. If the metric doesn't exist, then there are no services running Runtime Software Composition Analysis (SCA). If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running AAP.

If you are not seeing `datadog.appsec.risk_management.sca.host_instance`, check the [in-app instructions][3] to confirm that all steps for the initial setup are complete.

Runtime application security data is sent with APM traces. See [APM troubleshooting][4] to [confirm APM setup][5] and check for [connection errors][6].

### Confirm tracer versions are updated

See the Application Security product set up documentation to validate you you are using the right version of the tracer. These minimum versions are required to start sending telemetry data that includes library information.

### Ensure the communication of telemetry data

Ensure the `DD_INSTRUMENTATION_TELEMETRY_ENABLED` environment variable (`DD_TRACE_TELEMETRY_ENABLED` for Node.js) is set to `true`, or the corresponding system property for your language is enabled. For example in Java: `-Ddd.instrumentation.telemetry.enabled=true`.

## Runtime Code Analysis (IAST)

### Confirm IAST is enabled
Ensure the `DD_IAST_ENABLED` environment variable is set to `true` or the corresponding system property for your language is enabled.

If you have enabled Runtime Code Analysis (IAST) on your services, you can use the metric `datadog.appsec.risk_management.iast.host_instance` to check if it is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.appsec.risk_management.iast.host_instance`. If the metric doesn't exist, then there are no services running Runtime Code Analysis (IAST). If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running AAP.

If you are not seeing `datadog.appsec.risk_management.iast.host_instance`, check the [in-app instructions][20] to confirm that all steps for the initial setup are complete.

Runtime application security data is sent with APM traces. See [APM troubleshooting][4] to [confirm APM setup][5] and check for [connection errors][6].

### Issues with Python and Flask instrumentation
If you're running a Flask application, ensure that you are calling the `ddtrace_iast_flask_patch()` function at the top level of the module and before calling `app.run()`. For more information, see the [Flask integration documentation][19].

## Disabling Code Security capabilities
### Disabling static repository scanning
To disable scanning Static Code Analysis (SAST) or static Software Composition Analysis:
- If you are scanning your repositories through Datadog-hosted scanning, navigate to Code Security [**Setup**][17], click **Enable scanning for your repositories**, and disable the toggles previously enabled for scanning either all connected repositories or each repository.
- If you are scanning source code repositories through your CI pipelines, remove the relevant job(s) from your CI pipelines.

### Disabling runtime SCA on your services

SCA can be enabled on your running services using one of the following two methods:
- From the Datadog UI.
- Manually, using the `DD_APPSEC_SCA_ENABLED` environment variable.

To disable SCA, you must use the *same method* you used to enable SCA.

{{< tabs >}}
{{% tab "Enabled in the UI" %}}
<div class="alert alert-danger">
If you enabled SCA through the <code>DD_APPSEC_SCA_ENABLED</code> environment variable, you cannot disable it using the UI.
</div>

To disable SCA through the UI, you can:

* Go to the [Code Security Setup page][1] and select **Activate runtime detection of library vulnerabilities"**. In this table, you can disable services that were previously activated.

or

* Go to [Services][2], select **Software Composition Analysis (SCA)**. Under **Coverage**, hover over a service's SCA icon and then click **Deactivate**.
* To disable Software Composition Analysis on your services in bulk, click the check box in the list header and then under **Bulk Actions** select **Deactivate Software Composition Analysis (SCA) on x services**.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://app.datadoghq.com/security/code-security/inventory/services
{{% /tab %}}
{{% tab "Enabled using environment variable" %}}
<div class="alert alert-danger">
If you enabled SCA through the UI, you cannot disable it by removing the <code>DD_APPSEC_SCA_ENABLED</code> environment variable.
</div>

* Remove the `DD_APPSEC_SCA_ENABLED=true` environment variable from your application configuration, and restart your service. This does not apply to PHP applications.

{{% /tab %}}

{{< /tabs >}}

### Disabling Runtime Code Analysis (IAST)

To disable IAST, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration or set it to `false` as `DD_IAST_ENABLED=false`, and restart your service.

[1]: /help/
[2]: /security/code_security/static_analysis/github_actions
[3]: /security/code_security/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/source-code/repositories
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: https://docs.datadoghq.com/security/code_security/static_analysis/setup/#diff-aware-scanning
[7]: https://github.com/DataDog/datadog-sbom-generator
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file
[12]: https://app.datadoghq.com/security/appsec/vm/library
[13]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/diff-aware.md
[17]: https://app.datadoghq.com/security/configuration/code-security/setup
[16]: https://app.datadoghq.com/services?&lens=Security
[18]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[19]: https://www.datadoghq.com/blog/monitoring-flask-apps-with-datadog/
[19]: https://docs.datadoghq.com/security/code_security/software_composition_analysis/setup_static/?tab=datadog#running-options
[20]: /security/configuration/code-security/setup?steps=iast
