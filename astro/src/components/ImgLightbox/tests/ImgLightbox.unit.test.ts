// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import type { ComponentType } from "preact";
import ImgLightbox from "../ImgLightbox";

const ImgLightboxComponent = ImgLightbox as ComponentType<any>;

const renderLightbox = () => render(h(ImgLightboxComponent, {}));

function appendTrigger({
  src = "/images/content/example.png?fit=max&auto=format",
  alt,
  caption,
}: { src?: string; alt?: string; caption?: string } = {}) {
  const figure = document.createElement("figure");
  const trigger = document.createElement("a");
  trigger.setAttribute("href", src);
  trigger.classList.add("img__link--popup");
  trigger.setAttribute("data-lightbox-src", src);
  if (alt !== undefined) trigger.setAttribute("data-lightbox-alt", alt);
  figure.appendChild(trigger);
  if (caption !== undefined) {
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;
    figure.appendChild(figcaption);
  }
  document.body.appendChild(figure);
  return trigger;
}

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
  document.body.innerHTML = "";
});

describe("ImgLightbox — initial render", () => {
  it("renders closed by default (hidden, no image content)", () => {
    renderLightbox();

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.hasAttribute("hidden")).toBe(true);
    expect(overlay.getAttribute("aria-hidden")).toBe("true");
    expect(overlay.querySelector("img")).toBeNull();
  });

  it("never renders a close button", () => {
    renderLightbox();

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.querySelector("button")).toBeNull();
  });
});

describe("ImgLightbox — opens via trigger", () => {
  it("opens when a .img__link--popup trigger is clicked, using its data attributes", async () => {
    const user = userEvent.setup();
    renderLightbox();
    const trigger = appendTrigger({
      src: "/images/content/example.png?fit=max&auto=format",
      alt: "An example screenshot",
    });

    await user.click(trigger);

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.hasAttribute("hidden")).toBe(false);
    expect(overlay.getAttribute("aria-hidden")).toBe("false");

    const image = overlay.querySelector("img");
    expect(image).not.toBeNull();
    expect(image?.getAttribute("src")).toBe("/images/content/example.png?fit=max&auto=format");
    expect(image?.getAttribute("alt")).toBe("An example screenshot");
  });

  it("prevents the default navigation on the trigger link", async () => {
    const user = userEvent.setup();
    renderLightbox();
    const trigger = appendTrigger();

    let navigated = false;
    trigger.addEventListener("click", (e) => {
      if (e.defaultPrevented) navigated = false;
    });
    trigger.addEventListener("click", () => {
      navigated = true;
    });

    await user.click(trigger);

    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    trigger.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
    void navigated;
  });

  it("reads the caption from the trigger's sibling figcaption", async () => {
    const user = userEvent.setup();
    renderLightbox();
    const trigger = appendTrigger({ caption: "Example caption text" });

    await user.click(trigger);

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.textContent).toContain("Example caption text");
  });

  it("omits alt and caption when not present on the trigger", async () => {
    const user = userEvent.setup();
    renderLightbox();
    const trigger = appendTrigger();

    await user.click(trigger);

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    const image = overlay.querySelector("img");
    expect(image?.hasAttribute("alt")).toBe(false);
    expect(overlay.querySelector(".img-lightbox__caption")).toBeNull();
  });

  it("ignores clicks that don't match the popup trigger selector", async () => {
    const user = userEvent.setup();
    renderLightbox();

    const other = document.createElement("button");
    other.textContent = "Not a trigger";
    document.body.appendChild(other);

    await user.click(other);

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.hasAttribute("hidden")).toBe(true);
  });
});

describe("ImgLightbox — closing", () => {
  async function openLightbox(user: ReturnType<typeof userEvent.setup>) {
    const trigger = appendTrigger({ alt: "An example screenshot" });
    await user.click(trigger);
  }

  it("closes on Escape keypress and clears displayed image state", async () => {
    const user = userEvent.setup();
    renderLightbox();
    await openLightbox(user);

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.hasAttribute("hidden")).toBe(false);

    await user.keyboard("{Escape}");

    expect(overlay.hasAttribute("hidden")).toBe(true);
    expect(overlay.getAttribute("aria-hidden")).toBe("true");
    expect(overlay.querySelector("img")).toBeNull();
  });

  it("closes on backdrop click but stays open when the dialog itself is clicked", async () => {
    const user = userEvent.setup();
    renderLightbox();
    await openLightbox(user);

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    const dialog = overlay.querySelector(".img-lightbox__dialog") as HTMLElement;
    expect(dialog).not.toBeNull();

    await user.click(dialog);
    expect(overlay.hasAttribute("hidden")).toBe(false);

    await user.click(overlay);
    expect(overlay.hasAttribute("hidden")).toBe(true);
    expect(overlay.querySelector("img")).toBeNull();
  });

  it("does not render a close button while open", async () => {
    const user = userEvent.setup();
    renderLightbox();
    await openLightbox(user);

    const overlay = document.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.querySelector("button")).toBeNull();
  });
});

describe("ImgLightbox — body scroll lock", () => {
  it("locks body scroll while open and releases it on close", async () => {
    const user = userEvent.setup();
    renderLightbox();

    expect(document.body.style.overflow).toBe("");

    const trigger = appendTrigger();
    await user.click(trigger);

    await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));

    await user.keyboard("{Escape}");

    await waitFor(() => expect(document.body.style.overflow).toBe(""));
  });
});
