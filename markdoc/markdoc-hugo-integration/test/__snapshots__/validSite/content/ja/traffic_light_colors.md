---
title: Traffic Light Colors (ja)
---
<div id="mdoc-selector"><div><div class="mdoc-filter__container"><div class="mdoc-filter__label">Color</div><div class="mdoc-filter__pill " data-filter-id="color" data-option-id="red">Red (ja)</div><div class="mdoc-filter__pill " data-filter-id="color" data-option-id="yellow">Yellow (ja)</div><div class="mdoc-filter__pill selected" data-filter-id="color" data-option-id="green">Green (ja)</div></div><div class="mdoc-filter__container"><div class="mdoc-filter__label">Item</div><div class="mdoc-filter__pill selected" data-filter-id="item" data-option-id="grass">Grass</div><div class="mdoc-filter__pill " data-filter-id="item" data-option-id="emerald">Emerald</div><div class="mdoc-filter__pill " data-filter-id="item" data-option-id="lime">Lime</div><div class="mdoc-filter__pill " data-filter-id="item" data-option-id="frog">Frog</div></div><hr /></div></div><div id="mdoc-content" class="customizable"><article>
  <div class="alert alert-info">
    <p>This is just a test page. It's not real.</p>
  </div>
  <p>
    This test page explores everyday items that are green, yellow, or red --
    which also happen to be the colors of the common traffic light. If this
    seems contrived and odd, that's only because test pages are often both of
    those things.
  </p>
  <div class="mdoc__toggleable" data-if="136">
    <h2 id="green">Green</h2>
    <p>
      Green is a color that is often associated with nature, growth, and
      renewal.
    </p>
    <div class="mdoc__toggleable" data-if="132">
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
    <div class="mdoc__toggleable mdoc__hidden" data-if="133">
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
    <div class="mdoc__toggleable mdoc__hidden" data-if="134">
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
    <div class="mdoc__toggleable mdoc__hidden" data-if="135">
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
  <div class="mdoc__toggleable mdoc__hidden" data-if="137">
    <h2 id="yellow">Yellow</h2>
    <div class="mdoc__toggleable mdoc__hidden" data-if="139">
      <p>
        Bananas are a type of fruit. They're often eaten raw or used in baking.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="140">
      <p>
        Sunflowers are a type of flower. They're known for their large, yellow
        petals.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="141">
      <p>
        Lemons are a type of citrus fruit. They're often used in drinks and
        cooking.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="142">
      <p>
        School buses are a type of vehicle. They're often used to transport
        students to and from school.
      </p>
    </div>
  </div>
  <div class="mdoc__toggleable mdoc__hidden" data-if="138">
    <h2 id="red">Red</h2>
    <div class="mdoc__toggleable mdoc__hidden" data-if="143">
      <p>
        Rubies are a type of gemstone. They're known for their deep red color.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="144">
      <p>
        Apples are a type of fruit. They're often eaten raw or used in baking.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="145">
      <p>
        Firetrucks are a type of vehicle. They're often used to transport
        firefighters and equipment to emergency situations.
      </p>
    </div>
    <div class="mdoc__toggleable mdoc__hidden" data-if="146">
      <p>
        Stop signs are a type of traffic sign. They're used to indicate that
        drivers should stop their vehicles.
      </p>
    </div>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    pageFiltersConfig: [{"n":"Color","i":"color","o":"traffic_light_color_options"},{"n":"Item","i":"item","o":"<COLOR>_item_options"}],    filterOptionsConfig: {"traffic_light_color_options":[{"n":"Red (ja)","i":"red"},{"n":"Yellow (ja)","i":"yellow"},{"n":"Green (ja)","d":true,"i":"green"}],"red_item_options":[{"n":"Ruby","i":"ruby"},{"n":"Apple (ja)","d":true,"i":"apple"},{"n":"Ja firetruck","i":"firetruck"},{"n":"Stop sign (ja)","i":"stop_sign"}],"yellow_item_options":[{"n":"Banana","d":true,"i":"banana"},{"n":"Sunflower","i":"sunflower"},{"n":"Lemon","i":"lemon"},{"n":"School bus","i":"school_bus"}],"green_item_options":[{"n":"Grass","d":true,"i":"grass"},{"n":"Emerald","i":"emerald"},{"n":"Lime","i":"lime"},{"n":"Frog","i":"frog"}]},    selectedValsByFilterId: {"color":"green","item":"grass"},    ifFunctionsByRef: {"132":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"grass"},"v":true,"r":"132"},"133":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"emerald"},"v":false,"r":"133"},"134":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"lime"},"v":false,"r":"134"},"135":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"frog"},"v":false,"r":"135"},"136":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"green"},"1":"green"},"v":true,"r":"136"},"137":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"green"},"1":"yellow"},"v":false,"r":"137"},"138":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"green"},"1":"red"},"v":false,"r":"138"},"139":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"banana"},"v":false,"r":"139"},"140":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"sunflower"},"v":false,"r":"140"},"141":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"lemon"},"v":false,"r":"141"},"142":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"school_bus"},"v":false,"r":"142"},"143":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"ruby"},"v":false,"r":"143"},"144":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"apple"},"v":false,"r":"144"},"145":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"firetruck"},"v":false,"r":"145"},"146":{"m":"F","n":"e","p":{"0":{"m":"V","p":["item"],"v":"grass"},"1":"stop_sign"},"v":false,"r":"146"}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>