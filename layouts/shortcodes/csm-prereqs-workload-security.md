Datadog Agent `7.46` or later installed on your hosts or containers. 

CSM Threats supports the following Linux distributions:
| Linux Distribution                 | Supported Versions                               |
| ---------------------------------- | ------------------------------------------------- |
| Ubuntu LTS                         | 18.04, 20.04, 22.04                              |
| Debian                             | 10 or later                                      |
| Amazon Linux 2                     | Kernels 4.15, 5.4, 5.10, and 2023                 |
| SUSE Linux Enterprise Server       | 12 and 15                                        |
| Red Hat Enterprise Linux           | 7, 8, and 9                                      |
| Oracle Linux                       | 7, 8, and 9                                      |
| CentOS                             | 7                                               |

**Notes**: 

* [CSM Threats on Windows is available in beta][103].
* Custom kernel builds are not supported.
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. 
* For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][102].

[102]: /security/cloud_security_management/troubleshooting
[103]: /security/cloud_security_management/setup/windows