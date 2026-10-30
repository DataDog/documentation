Use a supported release of the tooling for the application's deployment framework. The versions below describe historical Git-tagging capability, rather than the recommended release to install.

[Datadog CLI tool][102]
: Git tagging is available in `datadog-ci` 2.3.0 and later. Run `datadog-ci lambda instrument` inside the application's Git checkout with source code integration enabled. Older releases require a clean checkout with changes pushed to the remote. If metadata upload is enabled, configure the Datadog API key and site as described in the [Lambda instrumentation instructions][105].

[Datadog Serverless Plugin][103]
: Git tagging is available in version 5.17.0 and later. Keep `enableSourceCodeIntegration` enabled and run deployment inside the application's Git checkout. Configure the API key and metadata-upload options for the installed plugin version as described in the [plugin instructions][103].

[Datadog CDK Construct][104]
: Follow the source code integration setup for the installed construct version. Run synthesis inside the application's Git checkout. Legacy `datadog-cdk-constructs` 0.8.5 for CDK v1 and `datadog-cdk-constructs-v2` 1.4.0 for CDK v2 require an explicit setup step:

  ```typescript
  import * as datadogCi from "@datadog/datadog-ci";

  const [gitRepoUrl, gitHash] = await datadogCi.gitMetadata.getGitCommitInfo();
  // Pass these values into the stack, then call the construct:
  datadog.addGitCommitMetadata(lambdaFunctions, gitHash, gitRepoUrl);
  ```

  In these legacy versions, use `@datadog/datadog-ci` 2.4.1 for this legacy API and obtain the values in an async entry point before constructing the stack. See the [versioned legacy setup][106]. Installing the construct alone does not enable Git tagging in these versions.

[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: /serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs#source-code-integration
[105]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-lambda#instrument
[106]: https://github.com/DataDog/datadog-cdk-constructs/blob/v0.8.5/README.md#basic-usage
