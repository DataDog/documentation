 ## Overview

Error Tracking processes errors collected from the browser by the Browser SDK. 
Whenever a source, custom, report, or console error containing a stack trace is collected, Error Tracking processes and groups it under an issue, or group of similar errors to be found in the Error Tracking Explorer.
 
## Setup

{% partial file="sdks/setup/browser-setup.mdoc.md" /%}

### Link errors with your source code (optional)

In addition to sending source maps, the [Datadog CLI][23] reports Git information such as the commit hash, repository URL, and a list of tracked file paths in the code repository.

Error Tracking can use this information to correlate errors with your [source code][27], allowing you to pivot from any stack trace frame to the related line of code in [GitHub][24], [GitLab][25] and [Bitbucket][26].

<div class="alert alert-info">Linking from stack frames to source code is supported in the <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> version <code>0.12.0</code> and later.</div>

For more information, see the [Datadog Source Code Integration][27].
  