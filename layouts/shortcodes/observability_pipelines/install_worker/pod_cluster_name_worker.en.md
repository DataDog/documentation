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
1. Set the [`CLUSTER_NAME`][102] environment variable in the Helm chart.
    ```
    env:
      - name: CLUSTER_NAME
        value: "<MY_CLUSTER_NAME>"
    ```
1. To assign unique Worker names, configure [`VECTOR_HOSTNAME`][103] to the `POD_NAME` and `CLUSTER_NAME`.
    ```yaml
    args:
      - >
        export VECTOR_HOSTNAME="${POD_NAME}.${CLUSTER_NAME}";
        exec /usr/bin/observability-pipelines-worker run
    ```
    
[101]: https://github.com/DataDog/helm-charts/blob/3cbc416fb81e5a733caf38bcc5a9f86f424187cc/charts/observability-pipelines-worker/values.yaml#L156C3-L159C33
[102]: https://github.com/DataDog/helm-charts/blob/3cbc416fb81e5a733caf38bcc5a9f86f424187cc/charts/observability-pipelines-worker/values.yaml#L154-L155
[103]: https://github.com/DataDog/helm-charts/blob/3cbc416fb81e5a733caf38bcc5a9f86f4103187cc/charts/observability-pipelines-worker/values.yaml#L141-L142