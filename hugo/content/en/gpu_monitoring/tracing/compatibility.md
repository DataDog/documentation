---
title: GPU Tracing Compatibility
is_beta: true
private: true
description: Review supported CUDA, CUPTI, tracer, and framework versions for GPU tracing.
further_reading:
- link: "/gpu_monitoring/tracing"
  tag: "Documentation"
  text: "Set up continuous tracing with GPU Monitoring"
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
---

{{< callout url="#" btn_hidden="true" >}}
<a href="/gpu_monitoring/tracing/">Continuous tracing</a> with GPU Monitoring is in Early Access Preview.
{{< /callout >}}

GPU tracing supports CUDA 13.x with CUPTI 13.x. CUDA 12.x and earlier are not supported.

## Tracer versions

| C tracer version | CUDA | CUPTI | Framework coverage | Important changes |
|---|---|---|---|---|
| 0.18.0 | 13.x | 13.x | PyTorch, vLLM, and TensorRT-LLM | Adds vLLM request correlation and improves profiling efficiency for short workloads. |
| 0.19.0 | 13.x | 13.x | PyTorch, vLLM, and TensorRT-LLM | Improves startup reliability across PyTorch and CUDA environments. |
| 0.19.1 | 13.x | 13.x | PyTorch, vLLM, and TensorRT-LLM | Improves completeness and accuracy of NCCL activity metrics. |
| 0.20.0 | 13.x | 13.x | PyTorch, vLLM, TensorRT-LLM, and SGLang | Adds SGLang inference-step GPU tracing. |
| 0.21.0 | 13.x | 13.x | PyTorch, vLLM, TensorRT-LLM, and SGLang | Adds CUDA Graph identity to kernel spans and reduces sampling overhead. |
| 0.21.1 | 13.x | 13.x | PyTorch, vLLM, TensorRT-LLM, and SGLang | Reduces workload overhead and improves GPU tracing reliability across x86_64 and ARM64. **Recommended.** |

## Minimum framework versions

| Framework | Minimum version | C tracer version | Coverage |
|---|---|---|---|
| PyTorch | 2.8.0 | 0.18.0+ | Training, inference, CUDA, and NCCL activity |
| vLLM | 0.11.0 | 0.18.0+ | Prefill and decode boundaries with request correlation |
| TensorRT-LLM | 1.2.0 | 0.18.0+ | PyTorch executor prefill and decode tracing |
| SGLang | 0.5.10.post1 | 0.20.0+ | Prefill, decode, and mixed inference tracing |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
