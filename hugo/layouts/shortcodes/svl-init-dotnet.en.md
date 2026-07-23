Add the following instructions and arguments to your Dockerfile.

```dockerfile
# For alpine or arm64 builds, refer to the explanation section
COPY --from=datadog/serverless-init:1 / /app/
RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
    chmod +x /app/dotnet.sh && /app/dotnet.sh

ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 / /app/
   ```

2. Copy the Datadog .NET tracer into your Docker image. If the GitHub requests made by the script are rate limited, pass a GitHub token saved in the environment variable
   `GITHUB_TOKEN` as a [Docker build secret][2] `--secret id=github-token,env=GITHUB_TOKEN`.
   For linux/amd64, include the following:
   ```dockerfile
   RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
       chmod +x /app/dotnet.sh && /app/dotnet.sh
   ```

   For other architecture types, configure your Dockerfile like so:
   ```dockerfile
   # For arm64 use datadog-dotnet-apm-2.57.0.arm64.tar.gz
   # For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
   ARG TRACER_VERSION
   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

   RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-dotnet).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```

#### Alternative configuration {#alt-dotnet}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
# For alpine or arm64 builds, refer to tracer installation of the explanation section
COPY --from=datadog/serverless-init:1 / /app/
RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
    chmod +x /app/dotnet.sh && /app/dotnet.sh

ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
```

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

```dockerfile
# For alpine or arm64 builds, refer to tracer installation of the explanation section
COPY --from=datadog/serverless-init:1 / /app/
RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
    chmod +x /app/dotnet.sh && /app/dotnet.sh

ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
```

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
[2]: https://docs.docker.com/build/building/secrets/
