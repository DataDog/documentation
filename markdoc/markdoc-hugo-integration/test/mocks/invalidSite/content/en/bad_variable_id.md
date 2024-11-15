---
title: The Primary Colors of the Color Wheel
---
<div id="mdoc-selector"><div><div class="mdoc-filter__container"><div class="mdoc-filter__label">Color</div><div class="mdoc-filter__pill " data-filter-id="color" data-option-id="red">Red</div><div class="mdoc-filter__pill " data-filter-id="color" data-option-id="yellow">Yellow</div><div class="mdoc-filter__pill selected" data-filter-id="color" data-option-id="blue">Blue</div></div><div class="mdoc-filter__container"><div class="mdoc-filter__label">Item</div><div class="mdoc-filter__pill " data-filter-id="item" data-option-id="ocean">Ocean</div><div class="mdoc-filter__pill selected" data-filter-id="item" data-option-id="sky">Sky</div><div class="mdoc-filter__pill " data-filter-id="item" data-option-id="jeans">Jeans</div><div class="mdoc-filter__pill " data-filter-id="item" data-option-id="blueberry">Blueberry</div></div><hr /></div></div><div id="mdoc-content" class="customizable"><article>
  <p>
    This test page explores everyday items that are blue, yellow, or red --
    which also happen to be the primary colors of the color wheel. If this seems
    contrived and odd, that's only because test pages are often both of those
    things.
  </p>
  <h2>sky: Your blue item of choice</h2>
  <div class="mdoc__toggleable mdoc__hidden" data-if="94">
    <div class="mdoc__toggleable mdoc__hidden" data-if="90">
      <p>
        The ocean is a large body of saltwater. It covers about 70% of the
        Earth's surface.
      </p>
    </div>
    <div class="mdoc__toggleable" data-if="91">
      <p>
        The sky is the atmosphere as seen from the Earth's surface. It appears
        blue during the day.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="92">
      <p>
        Jeans are a type of clothing. They're often made from denim and are
        known for their durability.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="93">
      <p>
        Blueberries are a type of fruit. They're often eaten raw or used in
        baking.
      </p>
    </div>
  </div>
  <div class="mdoc__toggleable mdoc__hidden" data-if="95">
    <div class="mdoc__toggleable mdoc__hidden" data-if="97">
      <p>
        Bananas are a type of fruit. They're often eaten raw or used in baking.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="98">
      <p>
        Sunflowers are a type of flower. They're known for their large, yellow
        petals.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="99">
      <p>
        Lemons are a type of citrus fruit. They're often used in drinks and
        cooking.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="100">
      <p>
        School buses are a type of vehicle. They're often used to transport
        students to and from school.
      </p>
    </div>
  </div>
  <div class="mdoc__toggleable mdoc__hidden" data-if="96">
    <div class="mdoc__toggleable mdoc__hidden" data-if="101">
      <p>
        Rubies are a type of gemstone. They're known for their deep red color.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="102">
      <p>
        Apples are a type of fruit. They're often eaten raw or used in baking.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="103">
      <p>
        Firetrucks are a type of vehicle. They're often used to transport
        firefighters and equipment to emergency situations.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="104">
      <p>
        Stop signs are a type of traffic sign. They're used to indicate that
        drivers should stop their vehicles.
      </p>
    </div>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    pageFiltersConfig: [{"n":"Color","i":"color","o":"primary_color_options"},{"n":"Item","i":"item","o":"<COLOR>_item_options"}],    filterOptionsConfig: {"primary_color_options":[{"n":"Red","i":"red"},{"n":"Yellow","i":"yellow"},{"n":"Blue","d":true,"i":"blue"}],"red_item_options":[{"n":"Ruby","i":"ruby"},{"n":"Apple","d":true,"i":"apple"},{"n":"Firetruck","i":"firetruck"},{"n":"Stop sign","i":"stop_sign"}],"yellow_item_options":[{"n":"Banana","d":true,"i":"banana"},{"n":"Sunflower","i":"sunflower"},{"n":"Lemon","i":"lemon"},{"n":"School bus","i":"school_bus"}],"blue_item_options":[{"n":"Ocean","i":"ocean"},{"n":"Sky","d":true,"i":"sky"},{"n":"Jeans","i":"jeans"},{"n":"Blueberry","i":"blueberry"}]},    selectedValsByFilterId: {"color":"blue","item":"sky"},    ifFunctionsByRef: {"90":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"ocean"},"v":false,"r":"90"},"91":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"sky"},"v":true,"r":"91"},"92":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"jeans"},"v":false,"r":"92"},"93":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"blueberry"},"v":false,"r":"93"},"94":{"m":"F","n":"e","p":{"0":{"m":"V","p":["colour"]},"1":"blue"},"v":false,"r":"94"},"95":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"yellow"},"v":false,"r":"95"},"96":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"red"},"v":false,"r":"96"},"97":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"banana"},"v":false,"r":"97"},"98":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"sunflower"},"v":false,"r":"98"},"99":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"lemon"},"v":false,"r":"99"},"100":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"school_bus"},"v":false,"r":"100"},"101":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"ruby"},"v":false,"r":"101"},"102":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"apple"},"v":false,"r":"102"},"103":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"firetruck"},"v":false,"r":"103"},"104":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"sky"},"1":"stop_sign"},"v":false,"r":"104"}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>