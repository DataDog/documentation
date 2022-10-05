# Selecting the right colors for your graphs

In Datadog graphs, color is one the main affordances used to distinguish different series of data. Selecting the right color for your graph is critical to ensuring that your teammates can parse data in your graphs, draw insights, and troubleshoot effectively. 

<img width="600" style="text-align:center" alt="image" src="https://user-images.githubusercontent.com/19559239/194149975-b0ad4fb9-5521-42a3-955d-eea0c07a0fbf.png">

## Types of color palettes

### Classic Palette

The default classic color palette is a set of (5) distinct colors optimized for readability. These colors repeat if the number of series exceeds (x). The classic palette ensures that adjacent series have distinct colors.

### Categorical (Consistent or Semantic)

The categorical palette allows you to assign the same color consistently to a series of data, making it easier to correlate data across charts. 

<img width="1100" alt="image" src="https://user-images.githubusercontent.com/19559239/194154617-3e225f2c-a3d1-4663-871a-be777430a047.png">

For a small subset of compatible tags, Datadog will automatically recognize the *meaning* behind each series of data. In these cases, a 'semantic' color palette will appear rather than consistent, which will use color to represent meaning - i.e. red = error code, green = success code.

<img width="1100" alt="image" src="https://user-images.githubusercontent.com/19559239/194159572-8c04fa54-9507-43c9-8b8b-1c07457d72b3.png">

### Two-Hue Gradient Palettes

The cool and warm color palettes use a gradient color scheme composed of two colors. The cool palette is made from green and blue, and the warm palette from yellow and orange.

### Single-Hue Gradient Palettes

Single-hue gradient palettes assign different shades of a single color to your data. Options include: purple, orange, gray, red, green, and blue.

### Which color palette should I use?

We recommend using the classic and categorical palettes to visualize data with multiple series or categories. The classic palette is a suitable choice when you have many series of data (8+) in a single chart, as it ensures that adjacent groups have different colors. The consistent palette does not guarantee that adjacent series of data use different colors. However, it does ensure that each data series uses the same color across charts, and is useful when correlating data from multiple adjacent charts.

The single-hue palette applies different shades of a single color for each series of data (if using a grouped query).  We recommend using single-hue palettes when tracking values are more important than distinguishing different series of data. Parsing color takes visual attention, so removing it as a variable helps user focus on values and trends rather than categories.

When combined with **color overrides**, the single-hue palette is a great tool for distinguishing multiple queries in a single chart. Each query can be assigned a single color of your choice. In the example below, each series of data (linked to a specific account) has been assigned its own unique color.
<img width="968" alt="image" src="https://user-images.githubusercontent.com/19559239/194158463-475e4571-0322-489f-a9a6-d7e753f8314e.png">

## Color overrides

## Accessibility settings

Datadog offers accessible color modes for graphs to cater to visual needs like **color vision deficiency**, **low visual acuity**, and **contrast sensitivity**. Selecting an accessible color mode will render all graphs with the 'classic' color palette in a set of accessible colors catered to a specific vision need. You can set an accessible color mode from the [User Preferences page](https://app.datadoghq.com/personal-settings/preferences).

![image](https://user-images.githubusercontent.com/19559239/194154147-9c951d22-ff7f-49ca-ab65-9cda271ffa40.png)

