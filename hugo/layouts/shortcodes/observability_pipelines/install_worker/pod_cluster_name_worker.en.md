By default, a Worker's hostname is the machine's hostname, such as `COMP-JLXPKWTGJF`. If you run your pipeline across multiple clusters or containers, assign each Worker a unique hostname based on the Pod name and cluster name to make them easier to identify.

In the Helm chart [`values.yaml`][101]

1. Configure the environment variable `POD_NAME` to be automatically set to the Pod's name.
In the Helm chart:
    ```yaml
    env:
      - name: POD_NAME
        valueFrom:
         fieldRef:
            fieldPath: metadata.name
    ```
1. Set the `CLUSTER_NAME` environment variable in the Helm chart.
    ```
    env:
      - name: CLUSTER_NAME
        value: "<MY_CLUSTER_NAME>"
    ```
1. Set the `VECTOR_HOSTNAME` to the `POD_NAME` and `CLUSTER_NAME`.
    ```yaml
    env:
      - name: POD_NAME
        valueFrom:
          fieldRef:
            fieldPath: metadata.name

      - name: CLUSTER_NAME
        value: "<MY_CLUSTER_NAME>"

      - name: VECTOR_HOSTNAME
        value: "$(CLUSTER_NAME)_$(POD_NAME)"
    ```

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml