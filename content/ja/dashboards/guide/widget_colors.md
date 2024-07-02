---
title: Selecting the right colors for your graphs
---

In Datadog graphs, color is the primary method by which you can distinguish between series of data. Selecting the right color for your graph ensures that your teammates can parse data in your graphs, draw insights, and troubleshoot effectively.

{{< img src="dashboards/guide/colors/colors_top.png" alt="'Graph your data' の見出しで、ユーザーはカラーパレットのリストから選択している。" style="width:90%;" >}}

## カラーパレットの種類

### Categorical パレット

Categorical パレットは、差別化が必要でありながら、自然な順序に従わないデータ (たとえば、アベイラビリティゾーンなど) に使用するのが最適です。

{{< img src="dashboards/guide/colors/2_alphabet.png" alt="A B C D E F G の文字が表示されたパレットで、それぞれの文字が異なる色相で表示されています。" style="width:40%;" >}}

#### Classic

デフォルトの Classic パレットは、読みやすさを考慮して最適化された 6 色のセットを使用します。系列の数が 6 を超えると、系列に割り当てられた色が繰り返されます。隣接する系列は通常、異なる色を持ちます。ただし、まれに、中間系列が部分的な時間枠の値を持たない場合、隣接する系列が同じ色を使用することがあります。

Classic カラーパレットは、視覚的なアクセシビリティをサポートしています。

{{< img src="dashboards/guide/colors/3_classic_palette.png" alt="ドーナツグラフと積み上げ棒グラフの Classic パレットがどのようなものかを説明する概要。" style="width:80%;" >}}

#### Consistent/Semantic

Consistent パレットを使用すると、データ系列に一貫して同じ色を割り当てることができ、チャート間でデータを簡単に相関付けることができます。Consistent パレットでは隣り合うデータ系列が同じ色を使うことを防げない場合があり、アクセシビリティ対応もされていません。


{{< img src="dashboards/guide/colors/4_consistent_palette.png" alt="Consistent/Semantic パレットのカラーパレット。" style="width:70%;" >}}

{{< img src="dashboards/guide/colors/5_consistent_interface.png" alt="Consistent パレットの棒グラフ。" style="width:90%;" >}}

For a small subset of compatible tags, Datadog automatically recognizes the meaning behind each series of data. In this case, the Consistent color palette appears as a Semantic color palette, which uses color to represent meaning. For instance, the color red may represent an error. See [Compatible Semantic Tags][2] for a list of supported tags.

{{< img src="dashboards/guide/colors/6_semantic_interface.png" alt="Semantic パレットの棒グラフ。" style="width:90%;" >}}

### Diverging パレット

Use a Diverging palette when you need to emphasize the difference in values within a data set. Diverging palettes are best suited to data that has a natural order and a natural midpoint. For example: the amount of change in memory utilization, from -100% to +100%, with a natural midpoint at 0%.

Diverging パレットには、Cool (緑と青)、Warm (黄色とオレンジの中間) の 2 種類があります。

{{< img src="dashboards/guide/colors/7_divergent_palette.png" alt="3 -2 -1 0 1 2 3 を示すパレットで、両端に異なる色のグラデーションがある。" style="width:40%;" >}}
{{< img src="dashboards/guide/colors/8_divergent_graphs.png" alt="Diverging パレットのグラフ。" style="width:80%;" >}}

### Sequential パレット

Sequential パレットは、データセット内の異なる系列に共通点があることを強調する必要がある場合に使用します。このパレットは、ホスト群の CPU 使用率 (0％ から 100％ まで) のような自然な順序を持つデータに適しています。

カラーバリエーションは、パープル、オレンジ、グレー、レッド、グリーン、ブルーの 5 色です。

[カラーオーバーライド](#color-overrides)と組み合わせると、Sequential パレットは、1 つのグラフで複数のクエリを実行した結果を区別するために役立ちます。

{{< img src="dashboards/guide/colors/9_sequential_palette.png" alt="1 2 3 4 5 6 7 を示すパレットで、色はグラデーションになっている。" style="width:r0%;" >}}
{{< img src="dashboards/guide/colors/10_sequential_graphs.png" alt="Sequential パレットのグラフ。" style="width:80%;" >}}

## カラーオーバーライド

カラーオーバーライドを使うと、各クエリに好きな色を 1 つずつ割り当てることができます。これは、1 つのグラフで複数のクエリを実行した結果を区別する場合に特に有効です。

{{< img src="dashboards/guide/colors/11_overrides.png" alt="カラーオーバーライドを構成するためのパネル。" style="width:80%;" >}}

**注**: タグで集計する場合 (例えば 'sum by' や 'avg by' を使用)、パレットオーバーライドしか選択できません。これにより、異なるシリーズが同じ色を使用することを防ぎ、可読性を維持することができます。

{{< img src="dashboards/guide/colors/12_palette_and_color_override_comparison.png" alt="カラーオーバーライドとパレットオーバーライドのドロップダウンパネルを並べて比較したものです。" style="width:80%;" >}}

## アクセシビリティの設定

Datadog では、色覚異常、視力低下、コントラスト感度などの視覚的ニーズに対応するため、グラフにアクセシブルカラーモードを提供しています。アクセシブルカラーモードを選択すると、Classic パレットを使用しているすべてのグラフが、特定の視覚的ニーズに対応したアクセシブルな色でレンダリングされます。アクセシブルカラーモードは、[User Preferences ページ][1]で設定することができます。

{{< img src="dashboards/guide/colors/visual_accessibility.png" alt="利用可能な視覚的アクセシビリティオプション: デフォルト、プロタノピア (緑と赤の区別がつきにくい)、デュータノピア (赤、緑、黄の区別がつきにくい)、トリタノピア (青と緑の区別がつきにくい)、ハイコントラスト (低視力用に色の区切りを増やす)、低彩度 (視覚化するためにコントラストを下げる)。" style="width:90%;" >}}

[1]: https://app.datadoghq.com/personal-settings/preferences
[2]: /dashboards/guide/compatible_semantic_tags
