Go embeds version control information in binaries since [version 1.18](https://tip.golang.org/doc/go1.18). The Datadog tracing library uses this information to tag your telemetry with the latest commit SHA and repository URL. 

Ensure your service meets the following requirements to use this approach:

* Go version is 1.18 or later.
* The service is built as a go module and the module path is your code's repository URL. 
