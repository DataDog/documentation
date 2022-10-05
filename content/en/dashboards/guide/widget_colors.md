# Selecting the right colors for your graphs

In Datadog graphs, color is one the main affordances used to distinguish different series of data. Selecting the right color for your graph is critical to ensuring that your teammates can parse data in your graphs, draw insights, and troubleshoot effectively. 

<img width="600" style="text-align:center" alt="image" src="https://user-images.githubusercontent.com/19559239/194149975-b0ad4fb9-5521-42a3-955d-eea0c07a0fbf.png">

## Types of color palettes

### Classic Palette

The default classic color palette is a set of six distinct colors optimized for readability. Colors assigned to series repeat if the number of series exceeds six. The classic palette ensures that adjacent series have distinct colors.

<img width="500" alt="image" src="https://user-images.githubusercontent.com/19559239/194169295-3ed655a6-e463-42c2-ae89-7b8a38a97e9d.png">

### Categorical (Consistent or Semantic)

The categorical palette allows you to assign the same color consistently to a series of data, making it easier to correlate data across charts. Like the classic palette, this is a set of 16 colors. However, the categorical palette does not guarantee that adjacent data series use the same color.

<img width="1100" alt="image" src="https://user-images.githubusercontent.com/19559239/194154617-3e225f2c-a3d1-4663-871a-be777430a047.png">

For a small subset of compatible tags, Datadog will automatically recognize the *meaning* behind each series of data. In these cases, a 'semantic' color palette will appear rather than consistent, which will use color to represent meaning - i.e. red = error code, green = success code.

<img width="1100" alt="image" src="https://user-images.githubusercontent.com/19559239/194159572-8c04fa54-9507-43c9-8b8b-1c07457d72b3.png">

### Two-Hue Gradient Palettes

The cool and warm color palettes use a gradient color scheme composed of two colors. The cool palette is made from green and blue, and the warm palette from yellow and orange. Example of cool color palette below.

<img width="580" alt="image" src="https://user-images.githubusercontent.com/19559239/194169698-e36639cb-3354-465b-bccd-7ce475f1bda5.png">

### Single-Hue Gradient Palettes

Single-hue gradient palettes assign different shades of a single color to your data. Options include: purple, orange, gray, red, green, and blue.

<img width="1064" alt="image" src="https://user-images.githubusercontent.com/19559239/194169489-9c1a5944-8117-47e2-87be-48e998814bc4.png">

Single-hue gradient palettes assign different shades of a single color to your data. Options include: purple, orange, gray, red, green, and blue.

## Which color palette should I use?

In Datadog, **color is used to distinguish categories of data rather than values**. Scales, size, and labels and instead use to glean proportions and magnitude.

We recommend using either classic, categorical, warm, or cool palettes to visualize data with multiple series or categories:
- Use the categorical palette when your charts use the same data grouper across multiple charts, as it allows you to draw quick correlations.
- If you are not correlating data between adjacent charts, the classic palette may be a better choice. The classic palette is optimized for readability, as it ensures that adjacent data series use distinct, complementary colors.
- The warm and cool palettes can also be used to distinguish multiple groups of data. We recommend using these palettes only when you have three or fewer  data series, as it has fewer distinct colors compared to classic.

We recommend using single-hue palettes when tracking the values on a chart are more important than distinguishing distinct groups. Parsing color takes visual attention, so removing it as a variable helps user focus on values and trends rather than categories. 

When combined with **color overrides**, the single-hue palette is a great tool for distinguishing the results from multiple queries in a single chart (see 'Color overrides' section below)

## Color overrides

Color overrides allow you to assign a single color of your choice to each query. In the example below, each series of data (linked to a specific account) has been assigned its own unique color.
<img width="968" alt="image" src="https://user-images.githubusercontent.com/19559239/194158463-475e4571-0322-489f-a9a6-d7e753f8314e.png">

## Accessibility settings

Datadog offers accessible color modes for graphs to cater to visual needs like **color vision deficiency**, **low visual acuity**, and **contrast sensitivity**. Selecting an accessible color mode will render all graphs with the 'classic' color palette in a set of accessible colors catered to a specific vision need. You can set an accessible color mode from the [User Preferences page](https://app.datadoghq.com/personal-settings/preferences).

![image](https://user-images.githubusercontent.com/19559239/194154147-9c951d22-ff7f-49ca-ab65-9cda271ffa40.png)

