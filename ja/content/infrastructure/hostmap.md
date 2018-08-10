---
last_modified: 2015/06/25
translation_status: complete
autotocdepth: 2
language: ja
title: Host Map表示の入門
kind: documentation
aliases:
  - /ja/guides/hostmap
customnav: infrastructurenav
---

<!--
## Overview {#overview}

Host Maps let you see all of your hosts together on one screen, grouped however you want, filtered however you want, with metrics made instantly comprehensible via color and shape. This is a new and simple way to spot outliers, detect usage patterns, avoid resource problems, and make decisions about how to best manage your infrastructure. Host Maps work at any scale, whether you have 10, 100 or 10,000 hosts.

When you use Host Maps, we wanted the experience to be like waving a magic wand, and having every host leap to attention, telling you the high-level story instantly, ready to report further details on demand. The video above shows Host Maps in action. -->

## 概要 {#overview}

Host Mapを使うことで、全ホストを1つのスクリーンで見ることができるようになります。そして、ホストを自由にグループ化したり、フィルタリングすることもできます。Host Map内に表示されている各ホストは、注目しているメトリクスのステータスにより色付けされており、状況が瞬時にわかるようになっています。

Host Mapは、異常値の察知、利用パターンの把握、リソースの使い切り問題の回避など、インフラを最善の状態に保つための判断をサポートする、新しくて簡単な方法です。Host Mapは、運用しているインフラのサイズに関わらず活用できます。10でも、100でも、1000でも、インフラのサイズに合わせて有効利用することができます。

Host Mapを使っているときは、ユーザに魔法の杖を振っているような体験をしてもらいたいと考えています。したがって、全てのホストは指示にしたがって速やかに移動し、直ちに全体像を伝えられる位置につき、次の指示を待ちます。

<!-- ## Ways to use it

We built Host Maps for ultimate flexibility; with just a few clicks, you can ask innumerable infrastructure-level questions and get instant, visual answers. Below are some common uses, but we would also love to hear on twitter about the ways you use Host Maps at your company (@datadoghq). -->

## Host Mapの操作方法

Host Mapは、究極の柔軟性を持って実装されています。数回クリックするだけで、インフラレベルでの無数のフィルタリングと、そのフィルタリングに対する可視化を即座に実現してくれます。以下に紹介する内容は、一般的な用途の例です。それ以外にもHost Mapによって把握できる内容はたくさんあると思います。是非皆さんの会社で考えたHost Mapの使い方をTiwtter(@datadoghq)でシェアしてもらえると嬉しいです。

<!-- ### Resource Optimization

If you are an AWS user, you probably use a variety of instance types. Some instances are optimized for memory, some for compute, some are small, some are big. If you want to reduce your AWS spend, a great place to start is by figuring out what the expensive instances are used for. With Host Maps this is easy. First group by "instance-type" and then group by role or name. Take a look at your expensive instance types, such as c3.8xlarge. Are there any host roles whose CPU is underutilized? If so, you can zoom in to individual hosts and see whether all that computational horsepower has been needed in the last several months, or whether this group of hosts is a candidate for migrating to a cheaper instance type.

Below is a subset of Datadog's infrastructure. As you can see, c3.2xlarge instances are pretty heavily loaded.

{{< img src="infrastructure/hostmap/hostmappart1image2.png" alt="hostmap 2">}}

As seen below, by clicking on the c3.2xlarge group and then sub-grouping by role, we found that only some of the roles are loaded, while others are nearly idling. If we downgraded those 7 green nodes to a c3.xlarge, we would save almost $13K per year. That's worth investigating! ( $0.21 saved per hour per host x 24 hr/day * 365 days/year * 7 hosts = $12,877.20 / year )
{{< img src="infrastructure/hostmap/hostmappart1image3.png" alt="Datadog Host Maps Instance-Role Groups">}}
-->

### リソースの最適化

あなたがAWSユーザなら、様々なタイプのインスタンスを用途に合わせて使い分けていることでしょう。幾つかのインスタンスはメモリ用に最適化され、又幾つかのインスタンスは計算用に最適化されていることでしょう。そして、それらは大きなサイズから小さなものまでいろいろなサイズのインスタンスがあるでしょう。

あなたがAWSへの出費を削減したい場合は、まず最初に高価なインスタンスがどのように使われているかを把握するところから始めることです。Host Mapを使えば、これは簡単にできます。まず、"インスタンスタイプ"でグループ化し、その後ロールと名前で、グループ化します。そして、c3.8xlargeのような高価なインスタンスの状況を把握します。CPUが十分に活用されていないホストやロールが存在しないか調べてみます。そのようなホストを見つけたなら、個々のホストにズームインし、現状の計算力が必要であったかを過去数ヶ月の期間の情報を元に検証してみます。又、これらのグループのホストを、安価なホストに移せないかを検討してみることも必要でしょう。

以下は、Datadogで使用しているインスタンスの一部です。各グループの状態からc3.2xlargeグループには、かなりの負荷がかかっていることが分かります。

{{< img src="infrastructure/hostmap/hostmappart1image2.png" alt="dd hostmap 2">}}

c3.2xlargeグループをクリックし、ロールによってサブグループの状態を表示すると、一部の
ロールのホストに負荷が集中し、他のロールのホストは使われていないことが分かります。これらの緑色で表示されている7台のホストをc3.xlargeへ変更することで、約$13,000/年を削減することができます。この金額は、調査に値する価値があるのではないでしょうか。( $0.21/hr/host x 24 hr/day * 365 days/year * 7 hosts = $12,877.20/year )

{{< img src="infrastructure/hostmap/hostmappart1image3.png" alt="Datadog Host Maps Instance-Role Groups">}}

<!-- ### Availability Zone Placement

Host maps make it easy to see distributions of machines in each of your availability zones (AZ). Filter for the hosts you are interested in, group by AZ, and you can immediately see whether resources need rebalancing. As seen below, at Datadog we have an uneven distribution of hosts with role:daniels across availability zones. (Daniels is the name of one of our internal applications.)
{{< img src="infrastructure/hostmap/hostmappart1image4.png" alt="DD 4">}}
 -->

### アベイラビリティゾーン間でのホストの分布状態の把握

Host Mapを使うことにより、アベイラビリティゾーン（AZ）間でのホストの配置状況を把握することが簡単になります。注目しているホストを抽出し、アベイラビリティゾーン(AZ)間でグループ化します。このようにすることにより、リソースの再配置が必要かどうか一目でわかるようになります。以下の例のように、Datadogでは **role:daniels** ロールのホストが各アベイラビリティゾーン間に不均等に配置されていることがわかります。(danielsは、Datadog内のアプリケーションサーバについているロール名です。)

{{< img src="infrastructure/hostmap/hostmappart1image4.png" alt="Datadog Host Maps AZ Balance">}}

<!-- ### Problem Investigation

Imagine you are having a problem in production. Maybe the CPUs on some of your hosts are pegged, which is causing long response times. Host Maps can help you quickly see whether there is anything different about the loaded and not-loaded hosts. You can rapidly group by any dimension you would like to investigate, and visually determine whether the problem servers belong to a certain group. For example, you can group by availability zone, region, instance type, image, or any tag that you use at your company. You will either find a problem very quickly, or rule out these explanations before spending time on deeper investigations.

Below is a screenshot from a recent issue we had a Datadog. As you can see, some hosts had much less usable memory than others, despite being part of the same cluster. Why? We grouped by machine image in Host Maps, and the problem was immediately clear: there were in fact two different images in use, and one of them had become overloaded.

{{< img src="infrastructure/hostmap/hostmappart1image5.png" alt="Datadog Host Maps Two Memory Usage Bands">}}

![Datadog Host Maps Two Image Groups](guides/hostmap/hostmappart1image6.png) 
{{< img src="infrastructure/hostmap/hostmappart1image6.png" alt="Datadog Host Maps Two Image Groups">}}

-->

### 原因の特定の補助

運用しているインフラで障害が発生しているとします。例えば、幾つかのホストのCPU利用量が高負荷の状態のまま改善せず、長い応答時間の原因となっているとします。このような場合、Host Mapを使うことにより高い負荷のかかっているホストとそうでないホストの違いを素早く見分けられるようになります。Datadog ユーザは、違いを見分けるのに必要な切り口に基づいてホストを素早くグループ化し可視化することで、障害対象のホストが特定のグループに属しているかを検証することができます。例えば、アベイラビリティゾーン、リージョン、インスタンスタイプ、仮想マシンイメージ、各ホストに付与したタグなどでグループ化をすることができます。このHost Mapでのホストをグループ化することにより、障害の原因を迅速に発見することができ、この後に説明する、より高度な調査プロセスで、確認の必要ない項目を見つけ出すことができるようになります。

以下は、Datadogで発生した障害のスクリーンショットです。グラフからわかるように、同じクラスタに属しているにも関わらず、幾つかのホストでは他のホストより使用可能なメモリが少ない状態です。なぜこのような状況が発生するのでしょう。そこで、Host Mapを使って仮装マシンのイメージごとにホストを分類してみました。その結果、問題の原因は即座にわかりました。同一クラスタ内で2種類の異なる仮想マシンイメージがあり、その内の片方がオーバーロード状態になっていました。

{{< img src="infrastructure/hostmap/hostmappart1image5.png" alt="Datadog Host Maps Two Memory Usage Bands">}}

{{< img src="infrastructure/hostmap/hostmappart1image6.png" alt="Datadog Host Maps Two Image Groups">}}

<!-- ## More Details -->

## Host Mapの操作の解説

<!-- ### Tags

Your hosts probably have a lot of tags. Some tags are applied automatically by Datadog integrations, and some tags were probably applied by members of your team. Regardless of how the tags were created, you can use any of them to slice and dice your Host Maps.

If some of your hosts are running on AWS, the following AWS-specific tags are available to you right now:

* availability-zone
* region
* image
* instance-type
* security-group
* and any EC2 tags you might use, such as 'name' -->

### タグを使ってHost Mapを操作

ホストには、多くのタグが付与されています。幾つかのタグは、Datadogのインテグレーションを適用する際に自動的に付与されます。また幾つかのタグは、Datadog Agentをインストールする際に設定したり、チームメンバーがダッシュボードから設定しているケースもあります。どの段階でタグ付与されたかに関わらず、それらのタグを使いHost Mapを操作することができます。

AWS上でホストを起動している場合、以下の様なAWS固有のタグも利用することができます:

* availability-zone
* region
* image
* instance-type
* security-group
* 'name'のような、EC2インスタンスに付与したタグ

<!-- ### Filter by

'Filter by' limits the Host Maps to a specific subset of your infrastructure. Located in the top-left of Host Maps, the filter input bar lets you filter your map by any of your tags, plus the Datadog-provided attributes below. If your filter input bar is empty, then the map displays all hosts that are reporting metrics to Datadog. If you want to focus your attention on just a subset of your hosts, then add filters. Example: if you tag your hosts by the environment they are in, you can filter by 'production' to remove hosts in your staging and other environments from the map. If you want to eliminate all but one host role in production, then add that role to the filter, too-the filters will be ANDed together.

Filterable host attributes (automatically provided):

* up : the host is reporting a heartbeat
* down : the host is not reporting a heartbeat
* muted : Datadog alerts are muted for this host
* agent : the host is running the datadog agent
* agent_issue : often indicates an integration problem such failed access to a resource
* upgrade_required : the Datadog agent requires an upgrade -->

### タグによるホストの抽出 (Filter by)

'Filter by'は、インフラ全体からサブセットを抽出し、Host Map上に表示する際に利用します。画面の左上隅にあり、操作用の窓でそれぞれのタグ(自動でDatadogが付与しているものも含む)を選択することにより、Host Mapに表示するホストを抽出することができます。'Filter by'の窓に何も入力されていないと、インフラ内でDatadogにメトリクスを送信している全てのホストが表示されます。この状態で特定のサブセットのホストに注目したい場合、'Filter by'の窓にサブセットの条件を入力していきます。例えば、ホストが所属している環境('production', 'staging', etc.)に基づいて各ホストにタグ付けをしていたとします。この様な場合は、 **'production'** を使い表示する必要のない'staging'環境のホストをHost Mapから排除ことができます。更に、その'production'環境で特定のロールにフォーカスしたいなら、そのロール名を'Filter by'に追記します。追記した各フィルターはAND条件で判定され、サブセットが表示されます。

Datadogが特別に準備している抽出に利用できるホストの状態に関するタグ (自動的にホストに付与されます):

* up : ホストが、メトリクス(heartbeat)を報告している状態。
* down : ホストが、メトリクス(heartbeat)を報告していない状態。
* muted : Datadogのアラートが、このホストに対してミュートされている状態。
* agent : ホスト上でDatadog Agentが実行されている状態。
* agent_issue : リソース情報へのアクセスができなくなるなど、インテグレーションに問題が発生した状態。
* upgrade_required : Datadog Agentのアップグレートが必要な状態。

<!-- ### Group hosts by tags

'Group hosts by tags' spatially arranges your hosts into clusters, or groups. Any host in a group shares the tag or tags you group by. A simple example is grouping your hosts by AWS availability zone. If you add a second grouping tag, such as instance type, then the hosts will be further subdivided into groups, first by availability zone and then by instance type, as seen below.

 
{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="Datadog Host Maps AZ Instance Groups">}}
-->

### タグによるホストのグループ化 (Group by)

'Group by'は、タグを指定することによりホストをクラスタやグループへ立体的に配置し表示します。グループ化されたホストは、共通のタグが付与されています。簡単な例として、AWSのアベイラビリティゾーンによりグループ化してみます。この状態で第二のタグ(インスタンスタイプ)を設定することにより、ホストは、更に細かいグループに分類されていきます。以下の様に、大きなグループとしてアベイラビリティゾーンでグループ化され、その中で細分化されたグループとしてインスタンスタイプでグループ化されます。

{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="Datadog Host Maps AZ Instance Groups">}}

<!-- ### Zoom in

When you've identified a host that you want to investigate, click it for details. You will zoom in and see up to six integrations reporting metrics from that host. (If there are more than six integrations, they will be listed under the "Apps" header in the host's detail pane, as in the screenshot below.) Click the name of an integration, and you will get a condensed dashboard of metrics for that integration. In the screenshot below, we have clicked "system" to get system metrics such as CPU usage, memory usage, disk latency, etc.

{{< img src="infrastructure/hostmap/blog-host-maps-01.png" alt="Datadog Host Maps Zoom In">}}
-->

### ズームイン機能

調査対象のホストが特定できたら、そのホストをクリックし詳細を確認していきます。クリックすることで、そのホストにズームインし、メトリクスを送信している6種類のインテグレーションを表示します。(6種類以上のインテグレーションを導入している場合は、ホストの詳細ペインの"Apps"以下にリスト表示されます)　どれかのインテグレーション名をクリックすると、そのインテグレーションの簡易版のダッシュボードを表示することができます。下のスクリーンショットでは、"system"インテグレーションをクリックし、CPUの利用量、メモリーの利用量、ディスクレーテンシーなどの簡易版ダッシュボードを表示しています。

{{< img src="infrastructure/hostmap/blog-host-maps-01.png" alt="Datadog Host Maps Zoom In">}}

<!-- ### Shapes and colors

By default the color of each host (hexagon) is set to represent the percentage of CPU usage on each host, where the color ranges from green (0% utilized) to red (100% utilized). You can select different metrics from the 'Color by' selector. The Host Maps can also communicate an additional, optional metric with the size of the hexagon; use the 'Size by' selector. In the screenshot below the size of the hexagons is the 15 minute average load, normalized so that machines' workloads can be compared even if they have different numbers of cores.

![Datadog Host Maps Using Color And Size](guides/hostmap/hostmappart2image4.png)

Today the 'Color by' selector and 'Size by' selector contain only CPU-based metrics: load, idle, wait, etc. We will be adding additional metrics in the very near future.

Note that the "% CPU utilized" metric uses the most reliable and up-to-date measurement of CPU utilization, whether it is being reported by the Datadog agent, or directly by AWS, or vSphere. -->

### 6角形の型と色  (Size by)

各ホスト(六角形)の色は、デフォルトではCPU使用率を表現するように設定されています。色相は緑から赤の範囲に設定されており、CPU使用率0%から100%に対応しています。CPU利用率以外にも別のメトリクスを'Color by'窓で選択することが可能です。Host Mapでは、第二のスケール軸を表現するために、'Size by'窓で設定できる六角型のサイズを使っています。下のスクリーンショットでは六角形のサイズは、コアの数が異なる場合でも比較できるように正規化した15分間の平均負荷を表しています。

{{< img src="infrastructure/hostmap/hostmappart2image4.png" alt="Datadog Host Maps Using Color And Size">}}

注) "% CPU utilized"のメトリクスは、 Datadog Agentからか、AWS CloudWatchからか、vSphereからかに関わらず、**最も信頼性の高い最新のCPU使用率の測定値** を表示しています。

<!-- ### Data freshness and meaning

Data in the Host Maps is refreshed about once a minute-unless you are continuously interacting with the map. In that case it will not refresh because it can be disorienting to have colors and shapes spontaneously change while you are still investigating. The bottom right of your screen will tell you when data was last updated. -->

### 表示されているデータの更新のタイミング

Host Mapで表示しているデータは、基本的に1分に1回の頻度で自動的に更新されます。ただし、Host Map上で抽出やグループ化の作業をしている場合は、自動でのデータの更新はされません。この処置は、自動的にデータを更新することにより、調査の最中に、表示している色や形が変化していくことを避けるために実施しています。したがって、画面の右下にデータの最終更新時間を表示するようにしています。
