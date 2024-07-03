---
aliases:
- /ja/synthetics/testing_tunnel
- /ja/continuous_testing/testing_tunnel
description: Learn about using Continuous Testing in local and remote environments.
further_reading:
- link: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
  tag: Blog
  text: Best practices for shift-left testing
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Incorporate Datadog Synthetic tests into your CI/CD pipeline
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: ラーニングセンター
  text: Learn how to run tests in a CI/CD pipeline
- link: /continuous_testing/environments/multiple_env
  tag: Documentation
  text: Learn about testing in multiple environments
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: Documentation
  text: Learn about testing while using proxies, firewalls, or VPNs
- link: /synthetics/private_locations
  tag: Documentation
  text: Learn about private locations
title: Testing Local and Staging Environments
---

## 概要

[CI/CD パイプライン内のテスト (別名シフトレフトテスト)][1] の文脈では、本番環境は通常、プロセスの最終段階です。アプリケーションは、この段階に到達する前に、いくつかの段階を経るでしょう。

{{< img src="continuous_testing/environments.png" alt="Continuous Testing は、ローカルの開発環境からステージング、本番まで、開発サイクルのすべてで使用できます。" width="100%" >}}

[スケジュールされた Synthetic テストは、主に一般に公開された本番環境に焦点を当てます][2]が、Continuous Testing では、開発サイクル全体を通じて、デプロイされたあらゆる環境でアプリケーションをテストすることができます。

## 複数の環境でのテスト

Continuous Testing では、本番環境に対してスケジュールされたテストと同じシナリオを再利用して、一般に公開された本番前の環境をテストすることができます。

[ブルーグリーンデプロイメント][3]であれ、専用のステージング環境であれ、Continuous Testing では、既存のシナリオを別の環境にルート変更することができます。詳細については、[複数環境のテスト][4]を参照してください。

## プロキシ、ファイアウォール、VPN 使用中のテスト

Continuous Testing は、プロキシ、ファイアウォール、VPN で保護されたプライベートネットワークの裏側など、開発サイクルの初期段階でアプリケーションをテストすることができます。

開発環境 (開発用ラップトップなど) で稼働しているローカルサーバーにデプロイされた変更に対して、スケジュールされた Synthetic テストで同一のシナリオを実行することができます。また、CI/CD ジョブと同じ時間だけ持続する一時的な環境にデプロイされたアプリケーションを持つ CI/CD パイプラインや、プライベートなステージング環境でも同様に実行することができます。

Continuous Testing は、Synthetic が管理するロケーションからプライベート環境にアクセスできるようにする[テストトンネル][5]を提供します。詳しくは、[プロキシ、ファイアウォール、VPN 使用中のテスト][6]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
[2]: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
[3]: https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment
[4]: /ja/continuous_testing/environments/multiple_env
[5]: /ja/continuous_testing/environments/proxy_firewall_vpn/#what-is-the-testing-tunnel
[6]: /ja/continuous_testing/environments/proxy_firewall_vpn