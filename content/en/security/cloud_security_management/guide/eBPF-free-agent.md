---
title: Threat Detection for Linux Without eBPF Support
disable_toc: false
---

This guide describes how to set up the CMS Threats eBPF-free solution for eBPF disabled environments such as AWS Fargate. The eBPF-free solution uses a ptrace-based Datadog agent.

This guide also describes some advantages of the ptrace solution.

## Summary of agent options

CMS Threats includes two agent options for threat detection and response:

- eBPF solution
- eBPF-free solution with ptrace

### eBPF solution

Datadog has built all its security products around [eBPF (extended Berkeley Packet Filter)][1]. Some of the benfits of eBPF are:

- eBPF improves safety by validating each program through the Linux kernel verifier. This ensures that a program can’t crash, fall into infinite loops, harm the system, etc.
- eBPF is JIT (Just In Time) compiled and the output bytecode is executed on a eBPF VM sandbox. This prevents any kernel crash and provides competitive performance.
- Easy to debug and maintain, can dynamically load programs, and has access to all information needed to trace the user space.

The Datadog eBPF agent code is [fully open source][2].

### eBPF-free solution with ptrace

Some environments have eBPF disabled, such as serverless compute engines that abstract away the underlying infrastructure, including the kernel, like AWS Fargate. The ptrace solution is provided for these environments.

The ptrace solution has the same features as the eBPF agent:

- Security profiles, providing:
  - Anomaly detection
  - Auto-suppression of normal behavior for signal triaging
  - Malware detection
- Network detections

<div class="alert alert-info">The current implementation supports amd64 and arm64 architecture and ABIs but can be extended to 32-bit ABIs.</div>

## Selecting an agent solution




## Advantages of ptrace solution

A ptrace-based solution achieves a balance between robust threat detection and unwavering service availability. Some of the advantages of the ptrace-based solution are:

- Precise process control: ptrace provides detailed inspection of memory and registers, safeguarding critical application workloads. This granular visibility is essential for identifying sophisticated threats. Our procfs (Process Filesystem) scanner monitors all system-wide executions, enabling the surgical termination of malicious processes. Together, these tools protect from malicious activity.
- Operational stability: Operating in user space, ptrace avoids the complexities and risks of kernel space, providing a safer and more manageable approach. In the event of a failure, a ptrace-based agent defaults to a fail-open state at the OS layer, keeping the system unaffected, even if the application hangs.
- Performance efficiency: Recent benchmarks conducted by Datadog's engineering team demonstrate that our ptrace-based implementation shows comparable performance to kernel-based solutions. Specifically, it introduces only a minimal overhead of around 3% for PostgreSQL workloads and negligible impacts for Redis operations, making it highly efficient for most use cases.
- Open source verification: We have open-sourced our ptrace-based and eBPF agent, allowing clients and the security community to verify its safety and effectiveness themselves, fostering transparency and trust in our solution.


[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent