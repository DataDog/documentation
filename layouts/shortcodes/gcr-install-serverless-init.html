Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD [{{ .Get "cmd" }}]
```

{{% collapse-content title="Explanation" level="h4" %}}

1. Install `serverless-init`, and stay on the latest major version with the `:1` tag. Alternatively, you can pin to a specific version tag or use `:latest`.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD [{{ .Get "cmd" }}]
   ```

{{% /collapse-content %}}

{{% collapse-content title="Alternative configuration" level="h4" id="alt" %}}

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", {{ .Get "cmd" }}]
```

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", {{ .Get "cmd" }}]
```

As long as your command to run is passed as an argument to datadog-init, you will receive full instrumentation.

{{% /collapse-content %}}
