{{ $showSetup := .Get "showSetup" | default "true" | eq "true" }}

## Overview

App and API Protection works by leveraging the [Datadog Ruby library](https://github.com/DataDog/dd-trace-rb/) to monitor and secure your Ruby service. The library integrates seamlessly with your existing application without requiring code changes.

For detailed compatibility information, including supported Ruby versions, frameworks, and deployment environments, see [Ruby Compatibility Requirements](/security/application_security/setup/ruby/compatibility).

{{ if $showSetup }}
This guide explains how to set up App and API Protection (AAP) for Ruby applications. The setup involves:

1. <a href="#1-installing-the-datadog-agent">Installing the Datadog Agent</a>
2. <a href="#2-enabling-app-and-api-protection-monitoring">Enabling App and API Protection monitoring</a>
3. <a href="#3-run-your-application">Run Your Application</a>
4. <a href="#4-verify-setup">Verifying the setup</a>
{{ end }}
