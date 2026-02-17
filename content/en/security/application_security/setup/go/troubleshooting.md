---
title: Troubleshooting App and API Protection for Go
---

## Common Issues

### No security signals appearing

#### Outdated Datadog Agent version

When security signals don't appear, this could be due to an incompatible Agent version:

- **Error**: No security events in the Datadog UI, despite App and API Protection being enabled
- **Solution**: Upgrade to Datadog Agent v7.41.1 or higher
- **Verification**: Check Agent status with `datadog-agent status`

#### Outdated Go tracer version

Older Go tracer versions may not support App and API Protection features:

- **Error**: Security monitoring not working despite proper configuration
- **Solution**: Upgrade to Go tracer v1.53.0 or higher: `go get github.com/DataDog/dd-trace-go/v2@latest`
- **Verification**: Check your `go.mod` file for the current version

#### Missing or incorrect environment variables

App and API Protection requires specific environment variables to be set:

- **Error**: Application starts normally but no security monitoring occurs
- **Solution**: Set `DD_APPSEC_ENABLED=true` in your deployment environment
- **Additional**: Ensure `DD_SERVICE` and `DD_ENV` are properly configured for proper event attribution

#### Unsupported Go version

Outdated Go versions are not compatible with the latest security features:

- **Error example**: 
  ```
  unsupported Go version: go1.21 (try running `go get github.com/DataDog/go-libddwaf@latest`)
  ```
- **Solution**: Upgrade to one of the latest two Go versions following the [Official Release Policy][8]
- **Alternative**: Update go-libddwaf dependency: `go get github.com/DataDog/go-libddwaf@latest`

#### Missing build tags or CGO configuration

When CGO is disabled, special build configuration is required:

- **Error example** (when running with `DD_TRACE_DEBUG=true`):
  ```
  go-libddwaf is disabled when cgo is disabled unless you compile with the go build tag `appsec`. It will require libdl.so.2. libpthread.so.0 and libc.so.6 shared libraries at run time on linux
  ```
- **Solution**: Build with the `appsec` tag: `CGO_ENABLED=0 go build -tags=appsec`
- **Alternative**: Enable CGO: `CGO_ENABLED=1 go build`

#### File system permission issues

The application may lack necessary file system access:

- **Error**: Application starts but security monitoring fails silently
- **Solution**: Ensure the application has write access to `/tmp` (on non-Linux systems)
- **Verification**: Check container/pod security context and file permissions

#### Incompatible framework or libraries

Not all Go frameworks and libraries are supported:

- **Error**: No instrumentation despite proper setup
- **Solution**: Review the [Go compatibility requirements][1] to ensure your framework and libraries are supported
- **Alternative**: Consider switching to a supported framework or adding manual instrumentation.

### Application fails to start

#### Linker & shared libraries issues

When your application fails to start with errors related to missing shared libraries, this is typically caused by:

1. **Missing runtime dependencies**: The Datadog WAF requires `libc.so.6`, `libpthread.so.0` and `libdl.so.2` at runtime
   - **Error**: `libdl.so.2: No such file or directory`.
   - **Solution**: Install glibc package: `apt-get install libc6` (Debian/Ubuntu) or `yum install glibc` (RHEL/CentOS)
   - For minimal containers, see the [library extraction approach in the Dockerfile guide][4]

2. **CGO disabled builds missing libraries**: When using `CGO_ENABLED=0`, the binary still requires shared libraries
   - **Solution**: Use the `-tags=appsec` build flag: `CGO_ENABLED=0 go build -tags=appsec`
   - **Alternative**: Enable CGO and ensure runtime libraries are available

3. **Cross-compilation issues**: Building on one architecture/OS and running on another
   - **Solution**: Ensure the target runtime environment has compatible shared libraries
   - See the [cross-compilation Dockerfile example][4] for proper setup

#### Incompatible libc version

This occurs when your binary was built against a different libc version than what's available at runtime:

1. **glibc version mismatch**: Binary built with newer glibc running on older glibc
   - **Error**: `version 'GLIBC_2.32' not found`
   - **Solution**: Build with an older base image or upgrade the runtime environment
   - **Alternative**: Use Alpine-based builds with musl libc

2. **musl vs glibc incompatibility**: Alpine (musl) binary running on Debian/Ubuntu (glibc) or vice versa
   - **Error**: Plain `No such file or directory`
   - **Solution for musl→glibc**: Install `musl` package: `apt-get install musl`
   - **Solution for glibc→musl**: Install `libc6-compat` package: `apk add libc6-compat`
   - See [glibc-built and Alpine runtime example][4] for details

### Build failures

For detailed examples and best practices, see the [Building your Go application with Datadog's WAF guide][4].

#### Bazel build issues

If you're using Bazel with [rules_go][5], Orchestrion is not compatible with it. Instead:

1. **Use manual instrumentation**: Follow the [manual instrumentation guide][6] with the Datadog Go Tracer library

For complete Bazel setup instructions, see the [Building with Bazel section][7] in the setup guide.

### Still having issues?

If you're still experiencing problems:
1. Check the [Application Security Monitoring troubleshooting guide][1]
2. Review the [Go tracer documentation][2]
3. For Docker-specific issues, consult the [Dockerfile guide][4]
4. Contact [Datadog support][3]

[1]: /security/application_security/troubleshooting
[2]: /tracing/trace_collection/compatibility/go
[3]: /help
[4]: /security/application_security/setup/go/dockerfile
[5]: https://github.com/bazel-contrib/rules_go
[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#add-the-tracer-library-to-your-application
[7]: /security/application_security/setup/go/setup#building-with-bazel
[8]: https://go.dev/doc/devel/release#policy
[8]: https://go.dev/doc/devel/release#policy
