Add the following instructions and arguments to your Dockerfile.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Install the Datadog Python tracer.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-python).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint, launched by the Datadog trace library. Adapt this line to your needs.
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```

#### Alternative configuration {#alt-python}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application