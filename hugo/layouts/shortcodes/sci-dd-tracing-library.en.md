Go 1.18 and later can embed version control information in binaries. The Datadog SDK reads the commit SHA and Go package path from this information.

To use this approach:

- Build with Go 1.18 or later inside the Git checkout. Make the `.git` directory and the Git executable available to the build.
- Build the main package and its containing module from the same repository. Use a module path that identifies the source repository.
- Keep VCS stamping enabled. Do not pass `-buildvcs=false`.
- Check the deployed binary with `go version -m <binary>` and confirm that it includes `vcs=git` and `vcs.revision`.

For builds without VCS metadata, set `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` explicitly. For details on VCS stamping, see the [Go 1.18 release notes](https://go.dev/doc/go1.18#go-version).
