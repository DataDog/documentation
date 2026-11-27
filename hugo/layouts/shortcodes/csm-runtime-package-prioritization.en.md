[301]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[302]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[303]: /security/workload_protection/setup/

Runtime package prioritization identifies which packages in a container image are used at runtime, so you can prioritize vulnerabilities in code that runs over vulnerabilities in packages that are installed but never executed.

When you enable runtime package prioritization, the Agent uses eBPF to observe file access on your workloads and adds these signals to vulnerability findings for that image:

| Signal | What it tells you |
|--------|-------------------|
| Package is running | The Agent observed a running process accessing the package's files. |
| Accessed by root process | A process running as root (UID 0) accessed the package. |
| SUID binary present | The package contains a binary with the SUID bit set, which can enable privilege escalation. |

*Package is running* feeds the **Reachability** dimension of the [Runtime Prioritization Engine][301]. To query these signals directly, see [Filter findings by runtime signals][302].

Runtime signals apply to packages installed by an operating system package manager (`apt`, `yum`, or `apk`) in container image vulnerability findings.

**Requirements**:
- Datadog Agent **7.79.0 or later**.
- Linux only (eBPF dependency). See [Workload Protection setup][303] for supported distributions and kernel versions.