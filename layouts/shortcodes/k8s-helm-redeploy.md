After making your changes, upgrade your Datadog Helm chart using the following command: 

```shell
helm upgrade -f values.yaml <RELEASE NAME> datadog/datadog
```

If you did not set your operating system in `values.yaml`, add `--set targetSystem=linux` or `--set targetSystem=windows` to this command.