---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: 監査証跡について
- link: /account_management/audit_trail/events/
  tag: ドキュメント
  text: 監査証跡イベントについて
products:
- icon: cloud-security-management
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Datadog Security イベントの監査
---

{{< product-availability >}}

管理者またはセキュリティチームのメンバーであれば、[監査証跡][1]を使用して、チームが Datadog Security でどのようなアクションを実行しているかを確認することができます。個人としては、自分のアクションのストリームを見ることができます。セキュリティ管理者や情報セキュリティチームにとって、監査証跡イベントはコンプライアンスの確認や、Datadog リソースでいつ誰が何をしたのかを記録する監査証跡を保持する助けになります。

Datadog Security で実行されたアクションによって生成された監査ログを表示するには、Datadog の [**Audit Trail**][2] ページに移動します。Datadog Security では、以下の製品固有のイベントが利用できます。

## Cloud Security Platform

{{% audit-trail-security-platform %}}

## Application Security Management

{{% audit-trail-asm %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/audit_trail
[2]: https://app.datadoghq.com/audit-trail
