---
title: Quickstart to GPU Monitoring
---
This page demonstrates how to configure and start using Datadog's GPU Monitoring product.

### Prerequisites

In order to begin using Datadog's GPU Monitoring, you must meet the following critieria:
- Already a Datadog customer  (you have active Datadog infrastructure hosts)
- You have already installed and deployed[1] the latest version[2] of the Datadog agent on all of your GPU-enabled hosts that you'd like to monitor
- Uses Kubernetes and NVIDIA's device plugin for Kubernetes (either directly or through NVIDIA's GPU Operator) 

The minimum version requirements are: 
- Datadog Agent: version 7.70+
- If using the datadog-operator: version 1.18
- If using helm chart: version 3.130.1
- Operating System: Linux. (optional: For advanced eBPF metrics, minimal version is 5.8)
- NVIDIA driver: version 450.51
- Kubernetes: 1.22 with PodResources API active

### Installation Instructions
Your installation method depends on your deployment type (uniform or mixed): 
- Uniform clusters are those where all the nodes have GPU devices
- Mixed clusters have some nodes with GPU devices and others without. 

{{< tabs >}}
{{% tab "Uniform Clusters" %}}

Uniform clusters are those where all the nodes have GPU devices

1. Install and deploy the Datadog Agent on Kubernetes (instructions here[1])
2. Include the additional parameter, `gpu.enabled:true` to the `/etc/datadog-agent/datadog.yaml` configuration file. If you would like to opt-in for more advanced eBPF metrics such as [METRIC NAME HERE], also include the additional parameter of `gpu.privilegedMode:true` as shown in the example snippet below

Example snippet from configuration file: 
   ```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    gpu:
      enabled: true
      privilegedMode: true # Only for advanced eBPF metrics
      patchCgroupPermissions: true # Only for GKE 
      requiredRuntimeClassName: "" # Only for AWS EKS or Oracle Cloud

   ```
3. Restart the Agent
{{% /tab %}}

{{% tab "Mixed Clusters" %}}
Mixed clusters have some nodes with GPU devices and others without. If you have a mixed cluster, you'll need to leverage the Datadog Operator's Datadog Agent Profiles feature to enable GPU monitoring only on your nodes with GPUs.

1. Install and deploy the Datadog Agent on Kubernetes (instructions here[1])
2. Modify your existing DatadogAgent resource with the following changes that can safely be applied to all agents, regardless of whether they run on GPU nodes or not:
3. ```
   spec:
  features:
    oomKill:
      # Only enable this feature if there is nothing else that requires the system-probe container in all Agent pods
      # Examples of system-probe features are npm, cws, usm
      enabled: true
      
override:
    nodeAgent:
      volumes:
        - name: nvidia-devices
          hostPath:
            path: /dev/null
        - name: pod-resources
          hostPath:
            path: /var/lib/kubelet/pod-resources
      containers:
        agent:
          env:
            - name: NVIDIA_VISIBLE_DEVICES
              value: "all"
          volumeMounts:
            - name: nvidia-devices
              mountPath: /dev/nvidia-visible-devices
            - name: pod-resources
              mountPath: /var/lib/kubelet/pod-resources
        system-probe:
          env:
            - name: NVIDIA_VISIBLE_DEVICES
              value: "all"
          volumeMounts:
            - name: nvidia-devices
              mountPath: /dev/nvidia-visible-devices
            - name: pod-resources
              mountPath: /var/lib/kubelet/pod-resources
   ```
3. Once the Datadog Agent configuration is changed, a profile needs to be created so that the GPU feature is enabled only on nodes with GPUs. The profileNodeAffinity selector is a suggestion based on a tag that’s commonly present in nodes with the NVIDIA GPU operator, but any other tag can be used. 


{{% /tab %}}
{{< /tabs >}}

### View traces

Make requests to your application triggering LLM calls and then view traces in the **Traces** tab [of the **LLM Observability** page][3] in Datadog. If you don't see any traces, make sure you are using a supported library. Otherwise, you may need to instrument your application's LLM calls manually.


### Next steps

After traces are being submitted from your application, you can:

- [Configure evaluations][4] that you can use to assess the effectiveness of your LLM application.
- Add [custom instrumentation][5] to your application and extract data that automatic instrumentation cannot.


## Example "Hello World" application

See below for a simple application that can be used to begin exploring the LLM Observability product.


{{< tabs >}}
{{% tab "Python" %}}

1. Install OpenAI with `pip install openai`.

2. Save example script `app.py`.

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
   completion = oai_client.chat.completions.create(
       model="gpt-4o-mini",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. Run the application:

   ```shell
   # Make sure you have the required environment variables listed above
   DD_...= \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install OpenAI `npm install openai`.

2. Save example script `app.js`

   ```js
   const { OpenAI } = require('openai');
   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   async function main () {
       const completion = await oaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
             { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
             { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
          ]
       });
       return completion;
   }

   main().then(console.log)

3. Run the application:

   ```
   # Make sure you have the required environment variables listed above
   DD_...= \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```
{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases?page=1
