---
disable_toc: false
further_reading:
- link: agent/basic_agent_usage/
  tag: ドキュメント
  text: Agent の基本的な使い方
title: サポート対象のプラットフォーム
---

Datadog Agent は、広く使われているオペレーティングシステムとプラットフォームでサポートされています。ご利用のオペレーティングシステムが以下のリストに掲載されていない場合、[ソースからのインストール][1]でうまくいく可能性があります。

{{< tabs >}}
{{% tab "Linux" %}}

## 64 ビット X86

<table>
  <thead>
    <th>オペレーティングシステム</th>
    <th>OS バージョン</th>
    <th>Agent 5 バージョン</th>
    <th>Agent 6 バージョン</th>
    <th>Agent 7 バージョン</th>
  </thead>
  <tr>
    <th rowspan='3'><a href='/agent/basic_agent_usage/amazonlinux/'>Amazon Linux</a></th>
    <td>2</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <td>2022</td>
    <td></td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <td>2023</td>
    <td></td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/deb/'>Debian</a> (systemd)</th>
    <td>7.0 (wheezy)</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.35.2</td>
    <td><= 7.35.2</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='2'>Debian (SysVinit)</th>
    <td>7.0 (wheezy)</td>
    <td></td>
    <td>6.6.0 - 6.35.2</td>
    <td><= 7.35.2</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/ubuntu/'>Ubuntu</a></th>
    <td>12.04</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 14.04</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='3'><a href='/agent/basic_agent_usage/redhat/'>RedHat/<br>CentOS/</a><br>
    <a href="/agent/basic_agent_usage/oracle">Oracle Linux</a><br></th>
    <td>5.0</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 6.0</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.51.1</td>
    <td><= 7.51.1</td>
  </tr>
  <tr>
    <td>>= 7.0</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>AlmaLinux /<br>Rocky</a></th>
    <td>>= 8.0</td>
    <td></td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/suse/'>SUSE Enterprise Linux (systemd)</a></th>
    <td>11 SP4</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.32.4</td>
    <td><= 7.32.4</td>
  </tr>
  <tr>
    <td>>= 12.0</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th>SUSE Enterprise Linux (SysVinit)</th>
    <td>11 SP4</td>
    <td></td>
    <td>6.16.0 - 6.33.0</td>
    <td>7.16.0 - 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/suse/'>OpenSUSE (systemd)</a></th>
    <td>>= 15.0</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/fedora/'>Fedora</a></th>
    <td>>= 26</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
</table>

チェックマーク ({{< X >}}) は、すべてのマイナーバージョンおよびパッチバージョンがサポートされていることを示します。

## 64 ビット ARM V8

<table>
  <thead>
    <th>オペレーティングシステム</th>
    <th>OS バージョン</th>
    <th>Agent 6 バージョン</th>
    <th>Agent 7 バージョン</th>
  </thead>
  <tr>
    <th rowspan=3><a href='/agent/basic_agent_usage/amazonlinux/'>Amazon Linux</a></th>
    <td>2</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <td>2022</td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <td>2023</td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/deb/'>Debian</a> (systemd)</th>
    <td>>= 9.0 (stretch)</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/ubuntu/'>Ubuntu</a></th>
    <td>>= 16.04</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>RedHat /<br>CentOS/</a><br>
    <a href='/agent/basic_agent_usage/oracle/'>Oracle Linux<br></a></th>
    <td>>= 8.0</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>AlmaLinux /<br>Rocky</a></th>
    <td>>= 8.0</td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/fedora/'>Fedora</a></th>
    <td>>= 27</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
</table>

[1]: /ja/agent/basic_agent_usage/amazonlinux/
[2]: /ja/agent/basic_agent_usage/deb/
[3]: /ja/agent/basic_agent_usage/ubuntu/
[4]: /ja/agent/basic_agent_usage/redhat/
[7]: /ja/agent/basic_agent_usage/fedora/

{{% /tab %}}
{{% tab "Windows" %}}

<table>
  <thead>
    <th>Operating system</th>
    <th>OS versions</th>
    <th>Agent 5 versions</th>
    <th>Agent 6 versions</th>
    <th>Agent 7 versions</th>
    <th>Notes</th>
  </thead>
  <tr>
    <th rowspan=4><a href='/agent/basic_agent_usage/windows/'>Windows Server</a></th>
    <td>2008 R2</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.45.1</td>
    <td><= 7.45.1</td>
    <td>Server 2008 R2 is affected by a <a href="https://github.com/golang/go/issues/24489">known issue with clock drift and Go</a>.</td>
  </tr>
  <tr>
    <td>2012</td>
    <td></td>
    <td><= 6.46.0</td>
    <td><= 7.46.0</td>
    <td></td>
  </tr>
  <tr>
    <td>2012 R2</td>
    <td></td>
    <td><= 6.49.0</td>
    <td><= 7.49.0</td>
    <td></td>
  </tr>
  <tr>
    <td>>= 2016</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan=4>Windows</td>
    <td>7</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>8.1</td>
    <td></td>
    <td><= 6.46.0</td>
    <td><= 7.46.0</td>
    <td></td>
  </tr>
  <tr>
    <td>10</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
  <tr>
    <td>11</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
</table>

チェックマーク ({{< X >}}) は、すべてのマイナーバージョンおよびパッチバージョンがサポートされていることを示します。

Windows Agent の特定のバージョンをインストールするには、[インストーラーリスト][8]を参照してください。

[8]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json

{{% /tab %}}
{{% tab "macOS" %}}

## 64 ビット X86

| macOS バージョン | Agent 5 | Agent 6 | Agent 7 |
|---------------|---------|---------|---------|
| 10.10 - 10.11 | <= 5.11.3 |||
| 10.12 || <= 6.34.0 | <= 7.34.0 |
| 10.13 || <= 6.38.2 | <= 7.38.2 |
| >= 10.14 ||           | >= 7.39.0 |

## Apple ARM64

| macOS バージョン  | Agent 7 |
|----------------|---------|
| >= 11.0 | >= 7.39.0 |

{{% /tab %}}

{{% tab "クラウドとコンテナ" %}}

## 64 ビット X86 のサポート

| Agent | [Docker][5] | [Kubernetes][6] | [Azure Stack HCI OS][7]  |
|-------|-------------|-----------------|--------------------------|
| 5 | >= 1.14 | 1.3 - 1.8 ||
| 6 | >= 1.14 | 1.3 以降 | すべてのバージョン |
| 7 | >= 1.14 | 1.3 以降 | すべてのバージョン |


## 64 ビット ARM V8 のサポート

Agent 6 および 7 は、以下の 64 ビット ARM V8 プラットフォームをサポートしています。

| プラットフォーム    | サポートされるバージョン | 64 ビット ARM V8 のサポート | 64 ビット X86 のサポート |
|-------------|--------------------|-----------------------|--------------------|
| [Docker][5] | >= 1.14     | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Kubernetes][6] | 1.3 以降   | <i class='icon-check-bold'> | <i class='icon-check-bold'> |


[5]: /ja/agent/docker/
[6]: /ja/agent/basic_agent_usage/kubernetes/
[7]: /ja/agent/basic_agent_usage/windows/

{{% /tab %}}

{{% tab "Unix" %}}

Agent 6 および 7 は、以下の [AIX][1] バージョンをサポートしています。

- 6.1 TL9 SP6
- 7.1 TL5 SP3
- 7.2 TL3 SP0


[1]: /ja/agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/basic_agent_usage/source/