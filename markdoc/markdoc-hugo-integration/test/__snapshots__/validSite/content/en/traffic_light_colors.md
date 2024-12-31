---
title: Traffic Light Colors
---
<div id="cdoc-selector"><div><div class="cdoc-filter__container"><div class="cdoc-filter__label">Color</div><div class="cdoc-filter__option " data-filter-id="color" data-option-id="red">Red</div><div class="cdoc-filter__option " data-filter-id="color" data-option-id="yellow">Yellow</div><div class="cdoc-filter__option selected" data-filter-id="color" data-option-id="green">Green</div></div><div class="cdoc-filter__container"><div class="cdoc-filter__label">Item</div><div class="cdoc-filter__option selected" data-filter-id="item" data-option-id="grass">Grass</div><div class="cdoc-filter__option " data-filter-id="item" data-option-id="emerald">Emerald</div><div class="cdoc-filter__option " data-filter-id="item" data-option-id="lime">Lime</div><div class="cdoc-filter__option " data-filter-id="item" data-option-id="frog">Frog</div></div><hr /></div></div><div id="cdoc-content" class="customizable"><article>
  <div class="alert alert-info">
    <p>This is just a test page. It's not real.</p>
  </div>
  <p>
    This test page explores everyday items that are green, yellow, or red --
    which also happen to be the colors of the common traffic light. If this
    seems contrived and odd, that's only because test pages are often both of
    those things.
  </p>
  <div class="cdoc__toggleable" data-if="22">
    <h2 id="green">Green</h2>
    <p>
      Green is a color that is often associated with nature, growth, and
      renewal.
    </p>
    <div class="cdoc__toggleable" data-if="18">
      <h3 id="grass">Grass</h3>
      <p>
        Grass is a common plant found in many environments, from lawns and
        gardens to fields and meadows. It plays a crucial role in ecosystems by
        providing food and habitat for various animals, including insects,
        birds, and mammals.
      </p>
      <p>
        Grass is also important for soil health, as its roots help prevent
        erosion and retain moisture. In human landscapes, grass is often used
        for aesthetic and recreational purposes, creating green spaces for
        relaxation and play. Its lush, green appearance is a symbol of vitality
        and natural beauty.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="19">
      <h3 id="emerald">Emerald</h3>
      <p>
        Emeralds are a type of precious gemstone known for their rich green
        color, which is caused by trace amounts of chromium and vanadium. They
        have been prized for their beauty and rarity for thousands of years,
        often associated with royalty and luxury.
      </p>
      <p>
        Emeralds are typically found in countries like Colombia, Brazil, and
        Zambia. Despite their stunning appearance, emeralds are not as durable
        as some other gemstones, requiring careful handling and setting in
        jewelry. They are believed to symbolize rebirth, love, and prosperity.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="20">
      <h3 id="lime">Lime</h3>
      <p>
        Limes are small, green citrus fruits known for their tart and tangy
        flavor. They are commonly used in cooking and beverages to add a
        refreshing zest to dishes and drinks.
      </p>
      <p>
        Limes are rich in vitamin C and other antioxidants, making them a
        healthy addition to the diet. They are often used in marinades,
        dressings, and desserts, as well as in cocktails like margaritas and
        mojitos. The bright, acidic taste of limes can enhance the flavors of
        both sweet and savory dishes.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="21">
      <h3 id="frog">Frog</h3>
      <p>
        Frogs are amphibians known for their distinctive jumping abilities and
        croaking sounds. They are found in a variety of habitats, including
        ponds, forests, and wetlands.
      </p>
      <p>
        Frogs play an important role in the ecosystem by controlling insect
        populations and serving as prey for larger animals. They undergo a
        fascinating life cycle, starting as eggs, then developing into tadpoles,
        and finally maturing into adult frogs. Frogs are also indicators of
        environmental health, as they are sensitive to changes in their
        surroundings. Their diverse colors and patterns make them interesting
        subjects for study and observation.
      </p>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="23">
    <h2 id="yellow">Yellow</h2>
    <div class="cdoc__toggleable cdoc__hidden" data-if="25">
      <p>
        Bananas are a type of fruit. They're often eaten raw or used in baking.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="26">
      <p>
        Sunflowers are a type of flower. They're known for their large, yellow
        petals.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="27">
      <p>
        Lemons are a type of citrus fruit. They're often used in drinks and
        cooking.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="28">
      <p>
        School buses are a type of vehicle. They're often used to transport
        students to and from school.
      </p>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="24">
    <h2 id="red">Red</h2>
    <div class="cdoc__toggleable cdoc__hidden" data-if="29">
      <p>
        Rubies are a type of gemstone. They're known for their deep red color.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="30">
      <p>
        Apples are a type of fruit. They're often eaten raw or used in baking.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="31">
      <p>
        Firetrucks are a type of vehicle. They're often used to transport
        firefighters and equipment to emergency situations.
      </p>
    </div>
    <div class="cdoc__toggleable cdoc__hidden" data-if="32">
      <p>
        Stop signs are a type of traffic sign. They're used to indicate that
        drivers should stop their vehicles.
      </p>
    </div>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"18":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"grass"},"v":true,"r":"18"},"19":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"emerald"},"v":false,"r":"19"},"20":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"lime"},"v":false,"r":"20"},"21":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"frog"},"v":false,"r":"21"},"22":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"green"},"1":"green"},"v":true,"r":"22"},"23":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"green"},"1":"yellow"},"v":false,"r":"23"},"24":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"green"},"1":"red"},"v":false,"r":"24"},"25":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"banana"},"v":false,"r":"25"},"26":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"sunflower"},"v":false,"r":"26"},"27":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"lemon"},"v":false,"r":"27"},"28":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"school_bus"},"v":false,"r":"28"},"29":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"ruby"},"v":false,"r":"29"},"30":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"apple"},"v":false,"r":"30"},"31":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"firetruck"},"v":false,"r":"31"},"32":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"stop_sign"},"v":false,"r":"32"}},    filtersManifest: {"filtersById":{"color":{"config":{"display_name":"Color","id":"color","options_source":"traffic_light_color_options"},"defaultValsByOptionsSetId":{"traffic_light_color_options":"green"}},"item":{"config":{"display_name":"Item","id":"item","options_source":"<COLOR>_item_options"},"defaultValsByOptionsSetId":{"red_item_options":"stop_sign","yellow_item_options":"banana","green_item_options":"grass"}}},"defaultValsByFilterId":{"color":"green","item":"grass"},"optionSetsById":{"traffic_light_color_options":[{"display_name":"Red","id":"red"},{"display_name":"Yellow","id":"yellow"},{"display_name":"Green","default":true,"id":"green"}],"red_item_options":[{"display_name":"Ruby","id":"ruby"},{"display_name":"Apple","id":"apple"},{"display_name":"Firetruck","id":"firetruck"},{"display_name":"Stop sign","default":true,"id":"stop_sign"}],"yellow_item_options":[{"display_name":"Banana","default":true,"id":"banana"},{"display_name":"Sunflower","id":"sunflower"},{"display_name":"Lemon","id":"lemon"},{"display_name":"School bus","id":"school_bus"}],"green_item_options":[{"display_name":"Grass","default":true,"id":"grass"},{"display_name":"Emerald","id":"emerald"},{"display_name":"Lime","id":"lime"},{"display_name":"Frog","id":"frog"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>