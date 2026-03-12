By default, a Worker's hostname is the machine's hostname, such as `COMP-JLXPKWTGJF`. If you run your pipeline across multiple clusters or containers, assign each Worker a unique hostname based on the Pod name and cluster name to make them easier to identify.

In the Helm chart:
1. Configure the environment variable [`POD_NAME`][101] to be automatically set to the Pod's name.
    ```yaml
    env:
      - name: POD_NAME
        valueFrom:
         fieldRef:
            fieldPath: metadata.name
    ```
1. Set the [`CLUSTER_NAME`][101] environment variable in the Helm chart.
    ```
    env:
      - name: CLUSTER_NAME
        value: "<MY_CLUSTER_NAME>"
    ```
1. To assign unique Worker names, configure [`VECTOR_HOSTNAME`][102] to the `POD_NAME` and `CLUSTER_NAME`.
    ```yaml
    command: ["/bin/sh", "-c"]
    args:
      - |
        export VECTOR_HOSTNAME="${CLUSTER_NAME}_${POD_NAME}";
        exec /usr/bin/observability-pipelines-worker run
    ```

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L142-L145
[102]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L138-L140