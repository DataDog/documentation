---
title: Threat Detection for Linux Without eBPF Support
disable_toc: false
---

## Summary of agent options

### eBPF solution

Datadog has built all its security products around [eBPF (extended Berkeley Packet Filter)][1]. eBPF has the following benefits:

eBPF brings programs safety. Each program is validated through the linux kernel verifier, which will ensure that a program can’t crash, can’t fall into infinite loops, can’t harm the system etc.
eBPF is JIT (Just In Time) compiled and the output bytecode is executed on a eBPF VM sandbox, preventing any kernel crash and providing competitive performance.
It’s easiest to debug, maintain, can dynamically load programs and have access to all needed information to trace user space.

The Datadog eBPF agent code is [fully open source][2].

### eBPF-free solution

To support environments that have eBPF disabled, such as AWS Fargate, the ptrace solution is provided, tracing everything the application is doing by hooking on a subset of syscalls.

The ptrace solution has the same features as the eBPF agent:

- Security profiles, providing:
  - Anomaly detection
  - Auto-suppression of normal behavior for signal triaging
  - Malware detection
- Network detections

<div class="alert alert-info">The current implementation supports amd64 and arm64 architecture and ABIs but can be extended to 32-bit ABIs.</div>

## Selecting an agent solution




## Advantages of ptrace agent

By implementing a ptrace-based agent, Datadog achieves a balance between robust threat detection and unwavering service availability. This choice shows our commitment to providing secure and dependable solutions in a changing cybersecurity environment, while maintaining the performance our clients expect.

- Precise Process Control: ptrace provides detailed inspection of memory and registers, safeguarding critical application workloads. This granular visibility is essential for identifying sophisticated threats. Our procfs scanner monitors all system-wide executions, enabling the surgical termination of malicious processes. Together, these tools protect from malicious activity.
- Operational Stability: Operating in user space, ptrace avoids the complexities and risks of kernel space, providing a safer and more manageable approach. In the event of a failure, a ptrace-based agent defaults to a fail-open state at the OS layer, keeping the system unaffected, even if the application hangs.
- Performance Efficiency: Recent benchmarks conducted by Datadog's engineering team demonstrate that our ptrace-based implementation shows comparable performance to kernel-based solutions. Specifically, it introduces only a minimal overhead of around 3% for PostgreSQL workloads and negligible impacts for Redis operations, making it highly efficient for most use cases.
- Open Source Verification: We have open-sourced our ptrace-based and eBPF agent, allowing clients and the security community to verify its safety and effectiveness themselves, fostering transparency and trust in our solution.


[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent