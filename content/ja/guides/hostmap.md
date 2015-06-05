---
last_modified: 2015/05/22
translation_status: complete
language: ja
title: Host Map の概要
kind: guide
listorder: 3
---

<!--
## Overview {#overview}

Host Maps let you see all of your hosts together on one screen, grouped however you want, filtered however you want, with metrics made instantly comprehensible via color and shape. This is a new and simple way to spot outliers, detect usage patterns, avoid resource problems, and make decisions about how to best manage your infrastructure. Host Maps work at any scale, whether you have 10, 100 or 10,000 hosts.

When you use Host Maps, we wanted the experience to be like waving a magic wand, and having every host leap to attention, telling you the high-level story instantly, ready to report further details on demand. The video above shows Host Maps in action. -->

## 概要 {#overview}

Host Mapを使うことにより、全ホストを、1つのスクリーンで見ることができるようになります。そして、それらのホストを自由にグループ化したり、フィルタリンングすることもできます。Host Map内に表示されている各ホストは、注目しているメトリクスのステータスにより色付けされており、状況が瞬時にわかるようになっています。

Host Mapは、異常値を察知したり、利用パターンを把握したり、リソースの使い切りの問題を回避したり、インフラを最善の状態に保っていくための決断をするための新しくて簡単な方法です。Host Mapは、運用しているインフラのサイズに関わらず活用できます。10でも、100でも、1000でも、インフラサイズに合わせて有効利用することができます。

Host Mapを使っているときは、ユーザに魔法の杖を振っているような体験をしてもらいたいと考えています。したがって、全てのホストは指示にしたがって速やかに移動し、直ちに全体像を伝えられる位置につき、次の指示を待ちます。


<!-- ## Ways to use it

We built Host Maps for ultimate flexibility; with just a few clicks, you can ask innumerable infrastructure-level questions and get instant, visual answers. Below are some common uses, but we would also love to hear on twitter about the ways you use Host Maps at your company (@datadoghq). -->

## Host Mapの操作方法

Host Mapは、究極の柔軟性を持って実装されています。数回クリックするだけで、インフラレベルでの無数のフィルタリングと、そのフィルタリングに対する可視化を即座に実現してくれます。以下に紹介する内容は、一般的な用途の例です。それ以外にもHost Mapによって把握できるよう内容はたくさんあると思います。是非皆さんの会社で考えたHost Mapの使い方をTiwtter(@datadoghq)でシェアしてもらえると嬉しいです。


<!-- ### Resource Optimization

If you are an AWS user, you probably use a variety of instance types. Some instances are optimized for memory, some for compute, some are small, some are big. If you want to reduce your AWS spend, a great place to start is by figuring out what the expensive instances are used for. With Host Maps this is easy. First group by “instance-type” and then group by role or name. Take a look at your expensive instance types, such as c3.8xlarge. Are there any host roles whose CPU is underutilized? If so, you can zoom in to individual hosts and see whether all that computational horsepower has been needed in the last several months, or whether this group of hosts is a candidate for migrating to a cheaper instance type.

Below is a subset of Datadog’s infrastructure. As you can see, c3.2xlarge instances are pretty heavily loaded.

![](/static/images/hostmappart1image2.png)

As seen below, by clicking on the c3.2xlarge group and then sub-grouping by role, we found that only some of the roles are loaded, while others are nearly idling. If we downgraded those 7 green nodes to a c3.xlarge, we would save almost $13K per year. That’s worth investigating! ( $0.21 saved per hour per host x 24 hr/day * 365 days/year * 7 hosts = $12,877.20 / year )

![Datadog Host Maps Instance-Role Groups](/static/images/hostmappart1image3.png) -->

### リソースの最適化

もしもあなたがAWSユーザなら、おそらく様々なタイプのインスタンスを用途に合わせて使い分けていることでしょう。幾つかのインスタンスはメモリー用に最適化され、又幾つかのインスタンスは計算用に最適化されていることでしょう。そして、それらは大きなサイズから小さなものまでいろいろなサイズのインスタンスがあるでしょう。

もしもあなたがAWSへの出費を削減したい場合は、まず最初に高価なインスタンスがどのように使われているかを把握するところから始めることです。Host Mapを使えば、これは簡単にできます。まず、"インスタンスタイプ"でグループ化し、その後ロールと名前で、グループ化します。その後、c3.8xlargeのような高価なインスタンスの状況を把握します。CPUが十分に活用されていないホストやロールは、存在しないか調べてみます。そのようなホストを見つけたなら、個々のホストにズームインし、現状の計算力が必要であったかを過去数ヶ月の期間の情報を元に検証してみます。又、これらのグループのホストは、安価なホストに移せないかを検討してみるのも必要でしょう。

以下は、Datadogで使用しているインスタンスの一部です。各グループの状態からc3.2xlargeグループには、かなりの負荷がかかっていることが分かります。

![](/static/images/hostmappart1image2.png)

c3.2xlargeグループをクリックし、ロールによってサブグループの状態を表示すると、一部の
ロールのホストに負荷が集中し、他のロールのホストは使われていないことが分かります。これらの緑色で表示されている7台のホストをc3.xlargeへ変更したなら、約$13,000/年を削減することができます。この金額は、調査に値する価値があるのではないでしょうか。( $0.21/hr/host x 24 hr/day * 365 days/year * 7 hosts = $12,877.20/year )

![Datadog Host Maps Instance-Role Groups](/static/images/hostmappart1image3.png)


<!-- ### Availability Zone Placement

Host maps make it easy to see distributions of machines in each of your availability zones (AZ). Filter for the hosts you are interested in, group by AZ, and you can immediately see whether resources need rebalancing. As seen below, at Datadog we have an uneven distribution of hosts with role:daniels across availability zones. (Daniels is the name of one of our internal applications.)

![Datadog Host Maps AZ Balance](/static/images/hostmappart1image4.png) -->

### アベイラビリティゾーン間でのホスト分布状態の把握

Host Mapを使うことにより、アベイラビリティゾーン（AZ）間での
ホストマップは、それが簡単にあなたのアベイラビリティゾーン（AZ）のそれぞれに機械の分布を参照することを可能にします。あなたはAZでグループ、に興味を持っているホスト用のフィルタと、あなたはすぐにリソースがリバランスが必要かどうかを確認することができます。ダニエルズアベイラビリティゾーン間：下図のように、Datadogで私たちは役割を持つホストの不均一な分布を有します。 （ダニエルズは、社内アプリケーションのいずれかの名前です。）

![Datadog Host Maps AZ Balance](/static/images/hostmappart1image4.png)


<!-- ### Problem Investigation

Imagine you are having a problem in production. Maybe the CPUs on some of your hosts are pegged, which is causing long response times. Host Maps can help you quickly see whether there is anything different about the loaded and not-loaded hosts. You can rapidly group by any dimension you would like to investigate, and visually determine whether the problem servers belong to a certain group. For example, you can group by availability zone, region, instance type, image, or any tag that you use at your company. You will either find a problem very quickly, or rule out these explanations before spending time on deeper investigations.

Below is a screenshot from a recent issue we had a Datadog. As you can see, some hosts had much less usable memory than others, despite being part of the same cluster. Why? We grouped by machine image in Host Maps, and the problem was immediately clear: there were in fact two different images in use, and one of them had become overloaded.

![Datadog Host Maps Two Memory Usage Bands](/static/images/hostmappart1image5.png)

![Datadog Host Maps Two Image Groups](/static/images/hostmappart1image6.png) -->

### 問題の調査

あなたは生産の問題が発生している想像してみてください。たぶん、あなたのホストのいくつかのCPUは、釘付けにされている長い応答時間の原因となっています。ホストマップは、あなたはすぐにロードされていないロードされたホストの異なるものがあるかどうかを確認することができます。あなたは急速にグループ任意の次元によってあなたが調査し、視覚的に問題のサーバーが特定のグループに属しているかどうかを確認したいことができます。たとえば、することができますアベイラビリティゾーン、地域、インスタンスタイプ、画像、またはあなたがあなたの会社で使用しているすべてのタグでグループ。あなたはどちらか非常に迅速に問題を発見するか、より深い調査に時間を費やす前に、これらの説明を除外します。

下はDatadogを持っていた最新号からのスクリーンショットです。あなたが見ることができるように、いくつかのホストが同じクラスタの一部であるにも関わらず、他のものよりはるかに少ない使用可能なメモリを持っていました。なぜでしょうか？私たちは、ホストマップでマシンイメージでグループ化され、問題はすぐに明らかであった。使用されている2つの異なる画像は実際には存在したが、その一つになっオーバーロードしていました。

![Datadog Host Maps Two Memory Usage Bands](/static/images/hostmappart1image5.png)

![Datadog Host Maps Two Image Groups](/static/images/hostmappart1image6.png)


<!-- ## More Details -->

## Host Mapの各操作の解説

<!-- ### Tags

Your hosts probably have a lot of tags. Some tags are applied automatically by Datadog integrations, and some tags were probably applied by members of your team. Regardless of how the tags were created, you can use any of them to slice and dice your Host Maps.

If some of your hosts are running on AWS, the following AWS-specific tags are available to you right now:

* availability-zone
* region
* image
* instance-type
* security-group
* and any EC2 tags you might use, such as ‘name’ -->

### Tags

あなたのホストは、おそらくタグがたくさんあります。一部のタグはDatadog統合によって自動的に適用され、いくつかのタグは、おそらくあなたのチームのメンバーによって適用されました。かかわらず、タグが作成されたかの、あなたのホストマップをスライスアンドダイスするためにそれらのいずれかを使用することができます。

あなたのホストの一部はAWS上で実行している場合は、次のAWS固有のタグは今おります：

* アベイラビリティゾーン
* 地域
* 画像
* インスタンス型
* セキュリティグループ
* そして、このような「名前」として使用する可能性のあるEC2タグ、


<!-- ### Filter by

‘Filter by’ limits the Host Maps to a specific subset of your infrastructure. Located in the top-left of Host Maps, the filter input bar lets you filter your map by any of your tags, plus the Datadog-provided attributes below. If your filter input bar is empty, then the map displays all hosts that are reporting metrics to Datadog. If you want to focus your attention on just a subset of your hosts, then add filters. Example: if you tag your hosts by the environment they are in, you can filter by ‘production’ to remove hosts in your staging and other environments from the map. If you want to eliminate all but one host role in production, then add that role to the filter, too—the filters will be ANDed together.

Filterable host attributes (automatically provided):

* up : the host is reporting a heartbeat
* down : the host is not reporting a heartbeat
* muted : Datadog alerts are muted for this host
* agent : the host is running the datadog agent
* agent_issue : often indicates an integration problem such failed access to a resource
* upgrade_required : the Datadog agent requires an upgrade -->

### Filter by

'でフィルタ」は、インフラストラクチャの特定のサブセットにホストマップを制限します。ホストマップの左上に位置し、フィルタ入力バーは、あなたのタグのいずれかによって、マップにフィルタを適用することができ、加えてDatadogが提供する以下の属性を指定します。あなたのフィルタ入力バーが空の場合、マップはDatadogにメトリックを報告しているすべてのホストが表示されます。あなたのホストのサブセットだけに注意を集中したい場合は、フィルタを追加します。例：あなたは彼らがしている環境によって、あなたのホストにタグを付ける場合は、マップからステージングおよび他の環境でホストを削除するには、「生産」でフィルタすることができます。あなたは生産のすべてが、1つのホストの役割を排除する場合は、フィルタにその役割を追加し、あまりにもフィルタはANDで結合されます。

フィルター可能なホストの属性（自動的に提供されます）：

* アップ：ホストがハートビートを報告しています
* ダウン：ホストがハートビートを報告していません
* ミュート：Datadogアラートは、このホストのミュートされています
* エージェント：ホストがdatadogエージェントを実行しています
* agent_issue：多くの場合、リソースへのアクセスに失敗した統合の問題を示しています
* upgrade_required：Datadogエージェントはアップグレードが必要

<!-- ### Group hosts by tags

‘Group hosts by tags’ spatially arranges your hosts into clusters, or groups. Any host in a group shares the tag or tags you group by. A simple example is grouping your hosts by AWS availability zone. If you add a second grouping tag, such as instance type, then the hosts will be further subdivided into groups, first by availability zone and then by instance type, as seen below.

![Datadog Host Maps AZ Instance Groups](/static/images/hostmappart2image2.png) -->

### Group hosts by tags

「タグによるグループのホストが「空間的にクラスタ、またはグループにあなたのホストを配置します。グループ内の任意のホストは、タグやタグによってあなたのグループを共有しています。簡単な例では、AWSの利用可能ゾーンにより、あなたのホストをグループ化したものです。あなたは、このようなインスタンス·タイプとして、第二のグループ化タグを追加する場合は下図のように、その後、ホストは、第1アベイラビリティゾーンによって、その後、インスタンスタイプによって、グループに細分化されます。

![Datadog Host Maps AZ Instance Groups](/static/images/hostmappart2image2.png)


<!-- ### Zoom in

When you’ve identified a host that you want to investigate, click it for details. You will zoom in and see up to six integrations reporting metrics from that host. (If there are more than six integrations, they will be listed under the “Apps” header in the host’s detail pane, as in the screenshot below.) Click the name of an integration, and you will get a condensed dashboard of metrics for that integration. In the screenshot below, we have clicked “system” to get system metrics such as CPU usage, memory usage, disk latency, etc.

![Datadog Host Maps Zoom In](/static/images/blog-host-maps-01.png) -->

### Zoom in

あなたが調査するホストを特定したら、詳細については、それをクリックします。あなたはズームインしてそのホストからのメトリックを報告6統合まで表示されます。統合の名前をクリックします（そこに半年以上の統合は。それらは以下のスクリーンショットのように、ホストの詳細ペインにある「アプリ」ヘッダーの下に表示されます、している場合）、あなたはそのためのメトリックの要約ダッシュボードを取得します統合。下のスクリーンショットでは、などのCPU使用率、メモリ使用率、ディスクの待ち時間、などのシステムメトリックを取得するための「システム」をクリックしました

![Datadog Host Maps Zoom In](/static/images/blog-host-maps-01.png)


<!-- ### Shapes and colors

By default the color of each host (hexagon) is set to represent the percentage of CPU usage on each host, where the color ranges from green (0% utilized) to red (100% utilized). You can select different metrics from the ‘Color by’ selector. The Host Maps can also communicate an additional, optional metric with the size of the hexagon; use the ‘Size by’ selector. In the screenshot below the size of the hexagons is the 15 minute average load, normalized so that machines’ workloads can be compared even if they have different numbers of cores.

![Datadog Host Maps Using Color And Size](/static/images/hostmappart2image4.png)

Today the ‘Color by’ selector and ‘Size by’ selector contain only CPU-based metrics: load, idle, wait, etc. We will be adding additional metrics in the very near future.

Note that the “% CPU utilized” metric uses the most reliable and up-to-date measurement of CPU utilization, whether it is being reported by the Datadog agent, or directly by AWS, or vSphere. -->

### Shapes and colors

デフォルトでは、各ホスト（六角形）の色が緑から赤に色の範囲が（0％が利用）、各ホスト上のCPU使用率（使用率が100％）を表すように設定されています。あなたは、セレクタ」でカラー」から異なるメトリックを選択することができます。ホストマップはまた、六角形の大きさの追加、オプションのメトリックを通信することができます。セレクタ」でサイズ'を使用します。六角形のサイズは以下のスクリーンショットではマシンのワークロードが、彼らは、コアの数が異なる場合であっても比較できるように正規化し、15分間の平均負荷です。

![Datadog Host Maps Using Color And Size](/static/images/hostmappart2image4.png)

負荷、アイドル、我々は非常に近い将来に追加メトリックを追加するなど、お待ち：今日セレクター」によりサイズ]セレクタと 'によって色が「唯一のCPUベースのメトリックが含まれています。

メトリック「利用％のCPUは「最も信頼性の高い最新のCPU使用率の測定、それはDatadogエージェントによって報告されているかどうか、あるいは直接AWS、またはvSphereによって使用することに注意してください。


<!-- ### Data freshness and meaning

Data in the Host Maps is refreshed about once a minute—unless you are continuously interacting with the map. In that case it will not refresh because it can be disorienting to have colors and shapes spontaneously change while you are still investigating. The bottom right of your screen will tell you when data was last updated. -->

### Data freshness and meaning

ホストマップのデータは分が-ない限り、あなたが継続的にマップと対話している1回程度更新されます。その場合、それは色を持つように方向感覚を失わせることができ、あなたはまだ調査している間に自然に変化する形状ため、更新されません。データが最後に更新されたときに画面の右下には、あなたに教えてくれます。
