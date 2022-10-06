# Selecting the right colors for your graphs

In Datadog graphs, color is the primary affordances used to distinguish between series of data. Selecting the right color for your graph is critical to ensuring that your teammates can parse data in your graphs, draw insights, and troubleshoot effectively. 

<img width="500" alt="image" src="https://user-images.githubusercontent.com/19559239/194149975-b0ad4fb9-5521-42a3-955d-eea0c07a0fbf.png">

## Types of color palettes

### Categorical Palettes 

- Categorical palettes are best used for data that lacks a natural order and needs differentiation, such as AWS availability zones. 
- Use these palettes to help differentiate many different series of data.

<img width="300" alt="image" src="https://user-images.githubusercontent.com/19559239/194394992-87aefa6e-5774-45a5-8632-b9751d6d7924.png">

#### Classic Palette

The default Classic palette uses a set of six distinct colors optimized for readability. Colors assigned to series repeat if the number of series exceeds six. The Classic palette ensures that adjacent series have distinct colors. Note that this color palette has **visual accessibility support**.

<img width="500" alt="image" src="https://user-images.githubusercontent.com/19559239/194170680-fc860aef-e916-47ac-8872-2228caad3c11.png">

#### Consistent/Semantic

The Consistent palette allows you to assign the same color consistently to a series of data, making it **easier to correlate data across charts**. The Consistent palette does not guarantee that adjacent data series use the same color, and does not have accessibility support.

<img width="500" alt="image" src="https://user-images.githubusercontent.com/19559239/194396077-0e2858b5-57dd-4710-9c0a-91e0d3c4d910.png">

<img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194404128-d46d53dd-8072-4922-a958-35bbad77ed10.png">

For a small subset of compatible tags, Datadog will automatically recognize the *meaning* behind each series of data. In these cases, a 'semantic' color palette will appear rather than consistent, which will use color to represent meaning - i.e. red = error code, green = success code.

<img width="600" alt="image" src="https://user-images.githubusercontent.com/19559239/194404072-253cf0cd-fc6a-4080-ac8c-f2e931e7680c.png">

### Diverging Palettes

- Use a diverging palette when you need to emphasize the difference in values within a dataset. Diverging palettes are suited to data that has a natural order and a natural midpoint, such as the amount of change in memory utilization (from -100% to +100%, for example, with a natural midpoint at 0%). 
- There are two diverging palette options: the cool palette is composed of green and blue, and the warm palette interpolates between yellow and orange
<img width="300" alt="image" src="https://user-images.githubusercontent.com/19559239/194396296-2024a00a-3091-4439-8ff9-175ba134a5f5.png">
<img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194403795-b6835f46-a12e-4f80-9d04-c3f7d577c82c.png">

### Sequential Palettes

- Use sequential palettes when you need to emphasize that different series in your dataset have something in common. This palette works well for data has a natural order, such as the CPU utilization (from 0% to 100%) of a group of hosts
- Color options include: purple, orange, gray, red, green, and blue
- When combined with **color overrides**, the sequential palettes are a great tool for distinguishing the results from multiple queries in a single chart (see 'Color overrides' section below)

<img width="300" alt="image" src="https://user-images.githubusercontent.com/19559239/194396351-71af5084-a78b-4b39-b23f-79d4a26d495a.png">
<img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194399372-2ba161d8-7965-485a-aea0-e021641e974a.png">

## Color overrides

Color overrides allow you to assign a single color of your choice to each query. This is particularly useful when distinguishing the results from multiple queries in a single chart.

<img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194158463-475e4571-0322-489f-a9a6-d7e753f8314e.png">

## Accessibility settings

Datadog offers accessible color modes for graphs to cater to visual needs like **color vision deficiency**, **low visual acuity**, and **contrast sensitivity**. Selecting an accessible color mode will render all graphs with the 'classic' color palette in a set of accessible colors catered to a specific vision need. You can set an accessible color mode from the [User Preferences page](https://app.datadoghq.com/personal-settings/preferences).

![image](https://user-images.githubusercontent.com/19559239/194154147-9c951d22-ff7f-49ca-ab65-9cda271ffa40.png)

