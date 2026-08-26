* Datadog Agent 7.44 以降
* データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.15.0 以降であるか、eBPF 機能がバックポートされたプラットフォームを必要とします。CSM Threats は以下の Linux ディストリビューションをサポートしています。
  * Ubuntu LTS (18.04、20.04、22.04)
  * Debian 10 以降
  * Amazon Linux 2 (カーネル 4.15、5.4、5.10) および 2023
  * SUSE Linux Enterprise Server 12 および 15
  * Red Hat Enterprise Linux 7、8、9
  * Oracle Linux 7、8、9
  * CentOS 7
  * カスタムカーネルビルドはサポートされていません。
* Cilium や Calico などのカスタム Kubernetes ネットワークプラグインとの互換性については、[トラブルシューティングページ][15]をご参照ください。

[15]: /security/cloud_security_management/troubleshooting