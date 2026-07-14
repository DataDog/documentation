Datadog Agent `7.46` 以降がホストまたはコンテナにインストールされていること。

CSM Threats は、以下の Linux ディストリビューションをサポートしています。
| Linux ディストリビューション                 | 対応バージョン                               |
| ---------------------------------- | ------------------------------------------------- |
| Ubuntu LTS                         | 18.04, 20.04, 22.04                              |
| Debian                             | 10 以降                                      |
| Amazon Linux 2                     | カーネル 4.15、5.4、5.10、および 2023                 |
| SUSE Linux Enterprise Server       | 12 および 15                                        |
| Red Hat Enterprise Linux           | 7、8、および 9                                      |
| Oracle Linux                       | 7、8、および 9                                      |
| CentOS                             | 7                                               |

**注**: 

* [Windows 上の CSM Threats はベータ版として利用可能です][103]。
* カスタムカーネルビルドはサポートされていません。
* データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.15.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。
* Cilium や Calico などのカスタム Kubernetes ネットワークプラグインとの互換性については、[トラブルシューティングページ][102]をご参照ください。

[102]: /security/cloud_security_management/troubleshooting
[103]: /security/cloud_security_management/setup/windows